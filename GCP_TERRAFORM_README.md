# 🚀 Deploy DevOps AI Agents on GCP with Terraform

Complete infrastructure-as-code solution for deploying the DevOps AI Agents platform on Google Cloud Platform.

## 📦 What's Included

A production-ready Terraform configuration that deploys:

- ✅ **VPC Network** with custom subnet and firewall rules
- ✅ **Compute Engine** instances with auto-healing
- ✅ **Global Load Balancer** with health checks
- ✅ **Cloud NAT** for outbound internet access
- ✅ **Cloud Storage** for application data
- ✅ **Cloud SQL** PostgreSQL (optional)
- ✅ **Monitoring & Alerting** with Cloud Monitoring
- ✅ **IAM** service accounts with minimal permissions

## 🎯 Quick Start

### 1. Prerequisites

```bash
# Install Terraform
choco install terraform

# Install gcloud CLI
# Download from: https://cloud.google.com/sdk/docs/install

# Verify installations
terraform version
gcloud version
```

### 2. Configure GCP

```bash
# Authenticate
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable compute.googleapis.com \
  servicenetworking.googleapis.com \
  storage-api.googleapis.com \
  monitoring.googleapis.com
```

### 3. Configure Terraform

```bash
# Navigate to terraform directory
cd terraform

# Copy example variables
copy terraform.tfvars.example terraform.tfvars

# Edit with your values
notepad terraform.tfvars
```

**Required configuration in terraform.tfvars:**
```hcl
project_id      = "your-gcp-project-id"
region          = "us-central1"
allowed_ssh_ips = ["YOUR_IP/32"]
```

### 4. Deploy

```bash
# Option 1: Using deploy script (recommended)
bash deploy.sh

# Option 2: Manual deployment
terraform init
terraform plan
terraform apply
```

### 5. Access Your Application

```bash
# Get the load balancer IP
terraform output load_balancer_ip

# Open in browser
start http://$(terraform output -raw load_balancer_ip)
```

## 📁 Project Structure

```
terraform/
├── main.tf                      # Main infrastructure configuration
├── variables.tf                 # Input variables
├── outputs.tf                   # Output values
├── backend.tf                   # Remote state configuration
├── terraform.tfvars.example     # Example variables
├── deploy.sh                    # Deployment script
├── destroy.sh                   # Cleanup script
├── .gitignore                   # Git ignore rules
├── scripts/
│   └── startup.sh              # Instance startup script
└── Documentation/
    ├── README.md               # Complete setup guide
    ├── DEPLOYMENT_GUIDE.md     # Detailed deployment guide
    ├── ARCHITECTURE.md         # Architecture documentation
    ├── QUICK_REFERENCE.md      # Quick command reference
    ├── COMMANDS.md             # Complete command reference
    └── DEPLOYMENT_CHECKLIST.md # Deployment checklist
```

## 📚 Documentation

### Essential Guides

1. **[terraform/README.md](terraform/README.md)**
   - Complete setup and configuration guide
   - Prerequisites and installation
   - Configuration options
   - Troubleshooting

2. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**
   - Detailed step-by-step deployment instructions
   - Post-deployment verification
   - Monitoring and logging
   - Cost management
   - Security best practices

3. **[terraform/ARCHITECTURE.md](terraform/ARCHITECTURE.md)**
   - Infrastructure architecture overview
   - Component descriptions
   - Data flow diagrams
   - High availability design
   - Security architecture

4. **[terraform/QUICK_REFERENCE.md](terraform/QUICK_REFERENCE.md)**
   - Quick command reference
   - Common operations
   - Useful shortcuts

5. **[terraform/COMMANDS.md](terraform/COMMANDS.md)**
   - Complete Terraform command reference
   - GCP CLI commands
   - Debugging commands
   - Automation scripts

6. **[terraform/DEPLOYMENT_CHECKLIST.md](terraform/DEPLOYMENT_CHECKLIST.md)**
   - Pre-deployment checklist
   - Deployment steps
   - Post-deployment verification
   - Troubleshooting checklist

## 🏗️ Infrastructure Overview

### Network Architecture
```
Internet → Load Balancer → Backend Service → Instance Group → Instances
                                                    ↓
                                              VPC Network
                                                    ↓
                                    Cloud NAT → Cloud Router
```

### Components

| Component | Description | Configuration |
|-----------|-------------|---------------|
| **VPC Network** | Isolated network | Custom subnet, firewall rules |
| **Compute Instances** | Application servers | Ubuntu 22.04, e2-medium |
| **Instance Group** | Managed instances | Auto-healing, multi-zone |
| **Load Balancer** | Global HTTP(S) LB | Health checks, static IP |
| **Cloud NAT** | Outbound internet | Auto-allocated IPs |
| **Cloud Storage** | Application data | Versioning, lifecycle |
| **Cloud SQL** | PostgreSQL DB | Optional, automated backups |
| **Monitoring** | Observability | Metrics, logs, alerts |

## ⚙️ Configuration Options

### Basic Configuration

```hcl
# terraform.tfvars
project_id      = "your-project-id"
project_name    = "devops-ai-agents"
region          = "us-central1"
zone            = "us-central1-a"
machine_type    = "e2-medium"
instance_count  = 2
```

### Advanced Configuration

```hcl
# Enable database
enable_database = true
db_tier         = "db-f1-micro"

# Security
allowed_ssh_ips = ["YOUR_IP/32"]

# Scaling
instance_count = 5
machine_type   = "e2-standard-2"
```

## 💰 Cost Estimation

### Monthly Costs (us-central1)

| Resource | Configuration | Monthly Cost |
|----------|--------------|--------------|
| Compute Engine | 2x e2-medium | ~$50 |
| Load Balancer | Global HTTP(S) | ~$20 |
| Cloud Storage | 10GB | ~$0.20 |
| Cloud NAT | Standard | ~$45 |
| Network Egress | 100GB | ~$12 |
| **Total** | | **~$127** |

Use the [GCP Pricing Calculator](https://cloud.google.com/products/calculator) for accurate estimates.

## 🔧 Common Operations

### View Infrastructure
```bash
terraform output                 # Show all outputs
terraform show                   # Show current state
gcloud compute instances list    # List instances
```

### Scale Instances
```bash
terraform apply -var="instance_count=5"
```

### Update Configuration
```bash
# Edit terraform.tfvars
terraform plan
terraform apply
```

### Monitor
```bash
# View logs
gcloud logging read "resource.type=gce_instance" --limit=50

# Check health
gcloud compute backend-services get-health devops-ai-agents-backend --global
```

### Destroy Infrastructure
```bash
bash destroy.sh
# or
terraform destroy
```

## 🛡️ Security Features

### Implemented
- ✅ Private instances (no external IPs)
- ✅ Restricted SSH access
- ✅ Service accounts with minimal permissions
- ✅ VPC isolation
- ✅ Firewall rules
- ✅ Encryption at rest
- ✅ Audit logging

### Recommended for Production
- [ ] Enable HTTPS with SSL certificates
- [ ] Implement Cloud Armor
- [ ] Use Secret Manager
- [ ] Enable VPC Service Controls
- [ ] Implement Cloud KMS
- [ ] Set up Security Command Center

## 📊 Monitoring

### Available Metrics
- Instance CPU utilization
- Memory usage
- Network traffic
- Load balancer requests
- Error rates
- Response times

### Access Monitoring
```bash
# Cloud Console
start https://console.cloud.google.com/monitoring

# View logs
gcloud logging read --limit=50
```

## 🐛 Troubleshooting

### Common Issues

**API Not Enabled**
```bash
gcloud services enable compute.googleapis.com
```

**Insufficient Permissions**
```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:YOUR_EMAIL" \
  --role="roles/editor"
```

**Instances Not Healthy**
```bash
# Check logs
gcloud compute instances get-serial-port-output INSTANCE_NAME

# SSH and debug
gcloud compute ssh INSTANCE_NAME
sudo systemctl status devops-ai-agents
```

**Load Balancer Issues**
```bash
# Check backend health
gcloud compute backend-services get-health devops-ai-agents-backend --global
```

### Debug Mode
```bash
set TF_LOG=DEBUG
terraform apply
```

## 🚀 Next Steps

### After Deployment
1. Configure HTTPS with SSL certificates
2. Set up custom domain
3. Implement auto-scaling
4. Configure backup strategy
5. Set up CI/CD pipeline

### Production Readiness
1. Enable HTTPS
2. Configure Cloud Armor
3. Set up monitoring dashboards
4. Implement disaster recovery
5. Security audit
6. Performance testing
7. Cost optimization

## 📞 Support

### Resources
- **Documentation**: See terraform/README.md
- **Troubleshooting**: See DEPLOYMENT_GUIDE.md
- **Commands**: See terraform/COMMANDS.md
- **Architecture**: See terraform/ARCHITECTURE.md

### Links
- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [GCP Best Practices](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations)
- [GCP Console](https://console.cloud.google.com)
- [Project Repository](https://github.com/Yash-Kavaiya/Devops-AI-Agents)

### Community
- GitHub Issues: https://github.com/Yash-Kavaiya/Devops-AI-Agents/issues
- GCP Support: https://cloud.google.com/support

## ✅ Deployment Checklist

- [ ] Prerequisites installed (Terraform, gcloud)
- [ ] GCP project created and billing enabled
- [ ] Required APIs enabled
- [ ] terraform.tfvars configured
- [ ] terraform init completed
- [ ] terraform plan reviewed
- [ ] terraform apply successful
- [ ] Application accessible
- [ ] Monitoring configured
- [ ] Budget alerts set up

## 📝 License

MIT License - See [LICENSE](LICENSE) for details

---

## 🎉 Ready to Deploy?

```bash
cd terraform
bash deploy.sh
```

**Estimated Time**: 10-15 minutes
**Estimated Cost**: ~$127/month

For detailed instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

**Version**: 1.0.0
**Last Updated**: February 2026
**Maintained By**: DevOps AI Agents Team
