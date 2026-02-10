# Terraform GCP - Quick Reference

## Essential Commands

### Initial Setup
```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Initialize Terraform
cd terraform
terraform init
```

### Deploy
```bash
# Quick deploy
bash deploy.sh

# Manual deploy
terraform plan
terraform apply
```

### Manage
```bash
# View outputs
terraform output

# Show state
terraform show

# List resources
terraform state list

# Update specific variable
terraform apply -var="instance_count=3"
```

### Monitor
```bash
# Get load balancer IP
terraform output load_balancer_ip

# List instances
gcloud compute instances list

# SSH into instance
gcloud compute ssh INSTANCE_NAME --zone=us-central1-a

# View logs
gcloud logging read "resource.type=gce_instance" --limit 50
```

### Destroy
```bash
# Destroy all
bash destroy.sh

# Or manually
terraform destroy
```

## Common Variables

```hcl
project_id      = "your-project-id"
region          = "us-central1"
zone            = "us-central1-a"
machine_type    = "e2-medium"
instance_count  = 2
enable_database = false
```

## Useful GCP Commands

```bash
# Enable APIs
gcloud services enable compute.googleapis.com

# List projects
gcloud projects list

# Set project
gcloud config set project PROJECT_ID

# List instances
gcloud compute instances list

# SSH to instance
gcloud compute ssh INSTANCE_NAME

# View logs
gcloud logging read --limit 50

# Check quotas
gcloud compute project-info describe --project=PROJECT_ID
```

## Troubleshooting

```bash
# Debug mode
set TF_LOG=DEBUG

# Validate config
terraform validate

# Format code
terraform fmt

# Check instance health
gcloud compute backend-services get-health devops-ai-agents-backend --global

# View serial console
gcloud compute instances get-serial-port-output INSTANCE_NAME
```

## Cost Monitoring

```bash
# View billing
gcloud billing accounts list

# Set budget
gcloud billing budgets create --billing-account=ACCOUNT_ID --budget-amount=150
```

## Quick Links

- [GCP Console](https://console.cloud.google.com)
- [Terraform Docs](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Pricing Calculator](https://cloud.google.com/products/calculator)
