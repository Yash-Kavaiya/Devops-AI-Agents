#!/bin/bash
# Startup script for DevOps AI Agents application instances

set -e

# Update system packages
apt-get update
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
usermod -aG docker ubuntu

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install Python 3.11
apt-get install -y python3.11 python3.11-venv python3-pip

# Install monitoring agent
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
bash add-google-cloud-ops-agent-repo.sh --also-install

# Create application directory
mkdir -p /opt/devops-ai-agents
cd /opt/devops-ai-agents

# Clone the application (replace with your repository)
# git clone https://github.com/Yash-Kavaiya/Devops-AI-Agents.git .

# For now, create a simple health check endpoint
cat > /opt/devops-ai-agents/server.js << 'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'healthy', 
      service: 'DevOps AI Agents',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOF

# Create systemd service
cat > /etc/systemd/system/devops-ai-agents.service << 'EOF'
[Unit]
Description=DevOps AI Agents Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/devops-ai-agents
ExecStart=/usr/bin/node /opt/devops-ai-agents/server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl daemon-reload
systemctl enable devops-ai-agents
systemctl start devops-ai-agents

# Configure firewall
ufw allow 22/tcp
ufw allow 3000/tcp
ufw --force enable

echo "Startup script completed successfully"
