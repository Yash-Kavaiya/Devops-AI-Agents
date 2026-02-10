# Terraform GCP Infrastructure

This directory contains Terraform configuration for deploying the DevOps AI Agents platform on Google Cloud Platform (GCP).

## Architecture Overview

The infrastructure includes:

- **VPC Network**: Custom VPC with subnet and firewall rules
- **Compute Engine**: Managed Instance Group with auto-scaling
- **Load Balancer**: Global HTTP(S) Load Balancer
- **Cloud NAT**: For outbound internet access
- **Cloud Storage**: Bucket for application data
- **Cloud SQL**: PostgreSQL database (optional)
- **Monitoring**: Cloud Monitoring with alerts
- **IAM**: Service accounts with least privilege

## Prerequisites

1. **GCP Account**: Active GCP account with billing enabled
2. **GCP Project**: Create a new project or use existing one
3. **Terraform**: Install Terraform >= 1.0
4. **gcloud CLI**: Install and configure gcloud CLI

### Install Prerequisites

```bash
# Install Terraform
# Windows (using Chocolatey)
choco install terraform

# Or download from: https://www.terraform.io/downloads

# Install gcloud CLI
# Download from: https://cloud.google.com/sdk/docs/install
```

## Setup Instructions

### 1. Authenticate with GCP

```bash
# Login to GCP
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable compute.googleapis.com
gcloud services enable servicenetworking.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
```

### 2. Configure Terraform Variables

```bash
# Copy the example variables file
copy terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
notepad terraform.tfvars
```

Required variables:
- `project_id`: Your GCP project ID
- `region`: GCP region (e.g., us-central1)
- `zone`: GCP zone (e.g., us-central1-a)

### 3. Initialize Terraform

```bash
# Navigate to terraform directory
cd terraform

# Initialize Terraform
terraform init
```

### 4. Plan the Deployment

```bash
# Review the infrastructure changes
terraform plan

# Save the plan to a file
terraform plan -out=tfplan
```

### 5. Deploy Infrastructure

```bash
# Apply the configuration
terraform apply

# Or apply the saved plan
terraform apply tfplan
```

The deployment will take approximately 10-15 minutes.

### 6. Access Your Application

After deployment completes, Terraform will output the load balancer IP:

```bash
# Get the load balancer IP
terraform output load_balancer_ip

# Access the application
# Open http://<LOAD_BALANCER_IP> in your browser
```

## Configuration Options

### Instance Scaling

Adjust the number of instances:

```hcl
instance_count = 3  # Default: 2
```

### Machine Type

Change the instance size:

```hcl
machine_type = "e2-standard-2"  # Default: e2-medium
```

### Enable Database

Enable Cloud SQL PostgreSQL:

```hcl
enable_database = true
db_tier         = "db-f1-micro"
```

### SSH Access

Restrict SSH access to specific IPs:

```hcl
allowed_ssh_ips = ["YOUR_IP/32"]
```

## Managing Infrastructure

### View Current State

```bash
# Show current infrastructure
terraform show

# List all resources
terraform state list

# Show specific resource
terraform state show google_compute_instance_template.app_template
```

### Update Infrastructure

```bash
# Modify terraform.tfvars or *.tf files
# Then apply changes
terraform plan
terraform apply
```

### Scale Instances

```bash
# Update instance_count in terraform.tfvars
instance_count = 5

# Apply the change
terraform apply -var="instance_count=5"
```

### Destroy Infrastructure

```bash
# Destroy all resources (WARNING: This is irreversible)
terraform destroy

# Destroy specific resource
terraform destroy -target=google_compute_instance_template.app_template
```

## Monitoring and Logs

### View Logs

```bash
# View instance logs
gcloud logging read "resource.type=gce_instance" --limit 50

# View load balancer logs
gcloud logging read "resource.type=http_load_balancer" --limit 50
```

### Check Instance Health

```bash
# List instances
gcloud compute instances list

# SSH into an instance
gcloud compute ssh INSTANCE_NAME --zone=us-central1-a

# Check application status
systemctl status devops-ai-agents
```

### Monitoring Dashboard

Access Cloud Monitoring:
```bash
# Open monitoring dashboard
gcloud monitoring dashboards list
```

Or visit: https://console.cloud.google.com/monitoring

## Troubleshooting

### Common Issues

**Issue**: Terraform fails with "API not enabled"
```bash
# Solution: Enable required APIs
gcloud services enable compute.googleapis.com
```

**Issue**: Insufficient permissions
```bash
# Solution: Grant required roles
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:YOUR_EMAIL" \
  --role="roles/editor"
```

**Issue**: Quota exceeded
```bash
# Solution: Request quota increase
# Visit: https://console.cloud.google.com/iam-admin/quotas
```

**Issue**: Instances not healthy
```bash
# Check instance logs
gcloud compute instances get-serial-port-output INSTANCE_NAME

# SSH and check service
gcloud compute ssh INSTANCE_NAME
systemctl status devops-ai-agents
journalctl -u devops-ai-agents -f
```

### Debug Mode

```bash
# Enable Terraform debug logging
set TF_LOG=DEBUG
terraform apply
```

## Cost Estimation

Approximate monthly costs (us-central1):

| Resource | Configuration | Monthly Cost |
|----------|--------------|--------------|
| Compute Engine | 2x e2-medium | ~$50 |
| Load Balancer | Global HTTP(S) | ~$20 |
| Cloud Storage | 10GB | ~$0.20 |
| Cloud NAT | Standard | ~$45 |
| Cloud SQL (optional) | db-f1-micro | ~$10 |
| **Total** | | **~$125** |

Use the [GCP Pricing Calculator](https://cloud.google.com/products/calculator) for accurate estimates.

## Security Best Practices

1. **Restrict SSH Access**: Update `allowed_ssh_ips` with your IP
2. **Enable HTTPS**: Configure SSL certificates for production
3. **Use Secret Manager**: Store sensitive data in Secret Manager
4. **Enable VPC Flow Logs**: Monitor network traffic
5. **Regular Updates**: Keep instances and dependencies updated
6. **Backup Strategy**: Enable automated backups for databases
7. **IAM Policies**: Follow principle of least privilege

## Remote State Management

For team collaboration, use GCS backend:

```bash
# Create state bucket
gsutil mb -p YOUR_PROJECT_ID -l us-central1 gs://your-terraform-state-bucket
gsutil versioning set on gs://your-terraform-state-bucket

# Update backend.tf with your bucket name
# Then reinitialize
terraform init -migrate-state
```

## CI/CD Integration

Integrate with Cloud Build:

```yaml
# cloudbuild.yaml
steps:
  - name: 'hashicorp/terraform'
    args: ['init']
  - name: 'hashicorp/terraform'
    args: ['plan']
  - name: 'hashicorp/terraform'
    args: ['apply', '-auto-approve']
```

## Additional Resources

- [Terraform GCP Provider Documentation](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [GCP Best Practices](https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices/index.html)

## Support

For issues or questions:
- Check the [main README](../README.md)
- Open an issue on GitHub
- Consult GCP documentation

## License

MIT License - See [LICENSE](../LICENSE) for details
