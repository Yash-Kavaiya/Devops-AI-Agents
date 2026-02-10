# DevOps AI Agents - GCP Deployment Guide

Complete guide for deploying the DevOps AI Agents platform on Google Cloud Platform using Terraform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Configuration](#configuration)
5. [Deployment](#deployment)
6. [Post-Deployment](#post-deployment)
7. [Monitoring](#monitoring)
8. [Troubleshooting](#troubleshooting)
9. [Cost Management](#cost-management)

## Prerequisites

### Required Tools

1. **GCP Account**
   - Active Google Cloud Platform account
   - Billing enabled
   - Project created

2. **Terraform** (>= 1.0)
   ```bash
   # Windows (Chocolatey)
   choco install terraform
   
   # Or download from: https://www.terraform.io/downloads
   ```

3. **gcloud CLI**
   ```bash
   # Download from: https://cloud.google.com/sdk/docs/install
   ```

4. **Git**
   ```bash
   # Windows
   choco install git
   ```

### GCP Permissions

Your GCP account needs these roles:
- `roles/compute.admin`
- `roles/iam.serviceAccountAdmin`
- `roles/storage.admin`
- `roles/monitoring.admin`

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Yash-Kavaiya/Devops-AI-Agents.git
cd Devops-AI-Agents/terraform

# 2. Authenticate with GCP
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 3. Configure variables
copy terraform.tfvars.example terraform.tfvars
notepad terraform.tfvars

# 4. Deploy
bash deploy.sh
```

## Detailed Setup

### Step 1: GCP Project Setup

```bash
# Login to GCP
gcloud auth login

# Create a new project (optional)
gcloud projects create YOUR_PROJECT_ID --name="DevOps AI Agents"

# Set the project
gcloud config set project YOUR_PROJECT_ID

# Enable billing (required)
# Visit: https://console.cloud.google.com/billing
```

### Step 2: Enable Required APIs

```bash
# Enable all required APIs
gcloud services enable compute.googleapis.com
gcloud services enable servicenetworking.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

### Step 3: Configure Terraform

```bash
# Navigate to terraform directory
cd terraform

# Copy example variables
copy terraform.tfvars.example terraform.tfvars

# Edit with your values
notepad terraform.tfvars
```

**Required Configuration:**

```hcl
# terraform.tfvars
project_id   = "your-gcp-project-id"
project_name = "devops-ai-agents"
region       = "us-central1"
zone         = "us-central1-a"

# Security: Restrict SSH to your IP
allowed_ssh_ips = ["YOUR_IP_ADDRESS/32"]

# Compute configuration
machine_type   = "e2-medium"
instance_count = 2

# Optional: Enable database
enable_database = false
```

### Step 4: Initialize Terraform

```bash
# Initialize Terraform
terraform init

# Validate configuration
terraform validate
```

## Configuration

### Network Configuration

```hcl
# Custom VPC CIDR
subnet_cidr = "10.0.0.0/24"

# SSH access restriction
allowed_ssh_ips = ["YOUR_IP/32"]
```

### Compute Configuration

```hcl
# Instance type
machine_type = "e2-medium"  # 2 vCPU, 4GB RAM

# Number of instances
instance_count = 2

# Boot image
boot_image = "ubuntu-os-cloud/ubuntu-2204-lts"
```

### Database Configuration (Optional)

```hcl
# Enable Cloud SQL
enable_database = true
db_tier         = "db-f1-micro"
database_name   = "devops_ai_agents"
```

### Environment Labels

```hcl
environment = "dev"

labels = {
  managed_by  = "terraform"
  project     = "devops-ai-agents"
  environment = "dev"
}
```

## Deployment

### Option 1: Using Deploy Script (Recommended)

```bash
# Run the deployment script
bash deploy.sh
```

The script will:
1. Validate prerequisites
2. Enable required APIs
3. Initialize Terraform
4. Plan the deployment
5. Apply the configuration

### Option 2: Manual Deployment

```bash
# Plan the deployment
terraform plan -out=tfplan

# Review the plan
terraform show tfplan

# Apply the configuration
terraform apply tfplan
```

### Deployment Time

- Initial deployment: ~10-15 minutes
- Instance provisioning: ~5 minutes
- Load balancer setup: ~5 minutes

## Post-Deployment

### Verify Deployment

```bash
# Get outputs
terraform output

# Get load balancer IP
terraform output load_balancer_ip

# Test the application
curl http://$(terraform output -raw load_balancer_ip)
```

### Access the Application

```bash
# Get the URL
echo "Application URL: http://$(terraform output -raw load_balancer_ip)"

# Open in browser
start http://$(terraform output -raw load_balancer_ip)
```

### SSH into Instances

```bash
# List instances
gcloud compute instances list

# SSH into an instance
gcloud compute ssh devops-ai-agents-app-XXXX --zone=us-central1-a

# Check application status
sudo systemctl status devops-ai-agents
```

### View Logs

```bash
# Application logs
gcloud logging read "resource.type=gce_instance" --limit 50

# Load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 50

# SSH into instance and check logs
sudo journalctl -u devops-ai-agents -f
```

## Monitoring

### Cloud Monitoring Dashboard

```bash
# Open monitoring console
gcloud monitoring dashboards list

# Or visit
start https://console.cloud.google.com/monitoring
```

### Key Metrics to Monitor

1. **Instance Health**
   - CPU utilization
   - Memory usage
   - Disk I/O

2. **Load Balancer**
   - Request count
   - Latency
   - Error rate

3. **Network**
   - Ingress/Egress traffic
   - NAT gateway usage

### Alerts

The deployment includes:
- High CPU alert (>80%)
- Instance health checks
- Load balancer health

### Custom Alerts

```bash
# Create custom alert
gcloud alpha monitoring policies create \
  --notification-channels=CHANNEL_ID \
  --display-name="Custom Alert" \
  --condition-display-name="Condition" \
  --condition-threshold-value=0.9 \
  --condition-threshold-duration=300s
```

## Troubleshooting

### Common Issues

#### 1. API Not Enabled

**Error:** `Error 403: ... API has not been used`

**Solution:**
```bash
gcloud services enable compute.googleapis.com
```

#### 2. Insufficient Permissions

**Error:** `Error 403: Required 'compute.xxx' permission`

**Solution:**
```bash
# Grant required roles
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:YOUR_EMAIL" \
  --role="roles/editor"
```

#### 3. Quota Exceeded

**Error:** `Quota 'CPUS' exceeded`

**Solution:**
- Request quota increase: https://console.cloud.google.com/iam-admin/quotas
- Or reduce instance count/size

#### 4. Instances Not Healthy

**Check instance logs:**
```bash
# Get serial port output
gcloud compute instances get-serial-port-output INSTANCE_NAME

# SSH and check service
gcloud compute ssh INSTANCE_NAME
sudo systemctl status devops-ai-agents
sudo journalctl -u devops-ai-agents -n 100
```

#### 5. Load Balancer Not Working

**Check backend health:**
```bash
# Check backend service
gcloud compute backend-services get-health devops-ai-agents-backend \
  --global

# Check firewall rules
gcloud compute firewall-rules list
```

### Debug Mode

```bash
# Enable Terraform debug logging
set TF_LOG=DEBUG
terraform apply
```

### Get Help

```bash
# Terraform state
terraform show

# List resources
terraform state list

# Show specific resource
terraform state show google_compute_instance_template.app_template
```

## Cost Management

### Estimated Monthly Costs

| Resource | Configuration | Monthly Cost (USD) |
|----------|--------------|-------------------|
| Compute Engine | 2x e2-medium | $50 |
| Load Balancer | Global HTTP(S) | $20 |
| Cloud Storage | 10GB | $0.20 |
| Cloud NAT | Standard | $45 |
| Network Egress | 100GB | $12 |
| **Total** | | **~$127** |

### Cost Optimization Tips

1. **Use Preemptible Instances**
   ```hcl
   # In instance template
   scheduling {
     preemptible = true
   }
   ```

2. **Auto-scaling**
   ```hcl
   # Add autoscaler
   resource "google_compute_region_autoscaler" "autoscaler" {
     name   = "app-autoscaler"
     target = google_compute_region_instance_group_manager.app_mig.id
     
     autoscaling_policy {
       max_replicas    = 5
       min_replicas    = 1
       cooldown_period = 60
       
       cpu_utilization {
         target = 0.7
       }
     }
   }
   ```

3. **Committed Use Discounts**
   - Purchase 1-year or 3-year commitments
   - Save up to 57% on compute costs

4. **Budget Alerts**
   ```bash
   # Create budget alert
   gcloud billing budgets create \
     --billing-account=BILLING_ACCOUNT_ID \
     --display-name="DevOps AI Agents Budget" \
     --budget-amount=150
   ```

### Monitor Costs

```bash
# View current costs
gcloud billing accounts list

# Export billing data
# Visit: https://console.cloud.google.com/billing/export
```

## Scaling

### Manual Scaling

```bash
# Update instance count
terraform apply -var="instance_count=5"
```

### Auto-scaling

Add to `main.tf`:

```hcl
resource "google_compute_region_autoscaler" "autoscaler" {
  name   = "${var.project_name}-autoscaler"
  region = var.region
  target = google_compute_region_instance_group_manager.app_mig.id

  autoscaling_policy {
    max_replicas    = 10
    min_replicas    = 2
    cooldown_period = 60

    cpu_utilization {
      target = 0.7
    }
  }
}
```

## Backup and Disaster Recovery

### Backup Strategy

1. **Terraform State**
   ```bash
   # Enable remote state
   terraform {
     backend "gcs" {
       bucket = "your-terraform-state-bucket"
       prefix = "terraform/state"
     }
   }
   ```

2. **Database Backups** (if enabled)
   - Automated daily backups
   - Point-in-time recovery
   - 7-day retention

3. **Application Data**
   - Cloud Storage versioning enabled
   - 90-day lifecycle policy

### Disaster Recovery

```bash
# Backup current state
terraform state pull > terraform.tfstate.backup

# Restore from backup
terraform state push terraform.tfstate.backup
```

## Security Best Practices

1. **Network Security**
   - Restrict SSH to known IPs
   - Use private IPs for internal communication
   - Enable VPC Flow Logs

2. **IAM**
   - Use service accounts with minimal permissions
   - Enable audit logging
   - Regular access reviews

3. **Data Protection**
   - Enable encryption at rest
   - Use Secret Manager for sensitive data
   - Regular security scans

4. **Compliance**
   - Enable Cloud Security Command Center
   - Regular vulnerability assessments
   - Compliance monitoring

## Cleanup

### Destroy Infrastructure

```bash
# Using destroy script
bash destroy.sh

# Or manually
terraform destroy
```

**Warning:** This will delete all resources permanently!

## Next Steps

1. **Configure HTTPS**
   - Set up SSL certificates
   - Configure HTTPS load balancer

2. **Set up CI/CD**
   - Integrate with Cloud Build
   - Automate deployments

3. **Enable Monitoring**
   - Set up custom dashboards
   - Configure alerting

4. **Implement Backup**
   - Regular state backups
   - Database backup strategy

## Additional Resources

- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [GCP Best Practices](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations)
- [GCP Pricing Calculator](https://cloud.google.com/products/calculator)
- [Project Repository](https://github.com/Yash-Kavaiya/Devops-AI-Agents)

## Support

For issues or questions:
- GitHub Issues: https://github.com/Yash-Kavaiya/Devops-AI-Agents/issues
- Documentation: See [README.md](README.md)
- GCP Support: https://cloud.google.com/support

---

**License:** MIT - See [LICENSE](LICENSE) for details
