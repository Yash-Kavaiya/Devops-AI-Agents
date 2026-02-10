# Terraform Commands Reference

Complete reference for all Terraform and GCP commands used in this project.

## Prerequisites Setup

### Install Terraform (Windows)
```powershell
# Using Chocolatey
choco install terraform

# Verify installation
terraform version
```

### Install gcloud CLI
```powershell
# Download installer from:
# https://cloud.google.com/sdk/docs/install

# Verify installation
gcloud version
```

## Initial Configuration

### GCP Authentication
```bash
# Login to GCP
gcloud auth login

# Login with application default credentials (for Terraform)
gcloud auth application-default login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Verify configuration
gcloud config list
```

### Enable Required APIs
```bash
# Enable all required APIs at once
gcloud services enable \
  compute.googleapis.com \
  servicenetworking.googleapis.com \
  sqladmin.googleapis.com \
  storage-api.googleapis.com \
  monitoring.googleapis.com \
  logging.googleapis.com \
  cloudresourcemanager.googleapis.com

# Verify enabled services
gcloud services list --enabled
```

## Terraform Workflow

### Initialize
```bash
# Initialize Terraform (first time)
terraform init

# Reinitialize (after adding providers)
terraform init -upgrade

# Reconfigure backend
terraform init -reconfigure
```

### Validate
```bash
# Validate configuration
terraform validate

# Format code
terraform fmt

# Format and check
terraform fmt -check

# Format recursively
terraform fmt -recursive
```

### Plan
```bash
# Create execution plan
terraform plan

# Save plan to file
terraform plan -out=tfplan

# Plan with specific variable
terraform plan -var="instance_count=3"

# Plan with variable file
terraform plan -var-file="prod.tfvars"

# Detailed plan output
terraform plan -json | jq
```

### Apply
```bash
# Apply configuration (interactive)
terraform apply

# Apply saved plan
terraform apply tfplan

# Apply with auto-approve
terraform apply -auto-approve

# Apply specific resource
terraform apply -target=google_compute_instance_template.app_template

# Apply with variable
terraform apply -var="instance_count=3"
```

### Destroy
```bash
# Destroy all resources (interactive)
terraform destroy

# Destroy with auto-approve
terraform destroy -auto-approve

# Destroy specific resource
terraform destroy -target=google_compute_instance.example

# Destroy with variable
terraform destroy -var="instance_count=0"
```

## State Management

### View State
```bash
# Show current state
terraform show

# Show in JSON format
terraform show -json

# List all resources
terraform state list

# Show specific resource
terraform state show google_compute_network.vpc_network
```

### Modify State
```bash
# Remove resource from state
terraform state rm google_compute_instance.example

# Move resource in state
terraform state mv google_compute_instance.old google_compute_instance.new

# Pull state to local file
terraform state pull > terraform.tfstate.backup

# Push state from local file
terraform state push terraform.tfstate.backup

# Replace provider
terraform state replace-provider hashicorp/google registry.terraform.io/hashicorp/google
```

### Import Resources
```bash
# Import existing resource
terraform import google_compute_network.vpc_network projects/PROJECT_ID/global/networks/NETWORK_NAME

# Import with module
terraform import module.network.google_compute_network.vpc_network RESOURCE_ID
```

## Output Management

### View Outputs
```bash
# Show all outputs
terraform output

# Show specific output
terraform output load_balancer_ip

# Output in JSON
terraform output -json

# Output raw value (no quotes)
terraform output -raw load_balancer_ip
```

## Workspace Management

### Workspaces
```bash
# List workspaces
terraform workspace list

# Create new workspace
terraform workspace new dev

# Select workspace
terraform workspace select dev

# Show current workspace
terraform workspace show

# Delete workspace
terraform workspace delete dev
```

## GCP Resource Management

### Compute Instances
```bash
# List instances
gcloud compute instances list

# List instances in specific zone
gcloud compute instances list --zones=us-central1-a

# Describe instance
gcloud compute instances describe INSTANCE_NAME --zone=us-central1-a

# SSH into instance
gcloud compute ssh INSTANCE_NAME --zone=us-central1-a

# Stop instance
gcloud compute instances stop INSTANCE_NAME --zone=us-central1-a

# Start instance
gcloud compute instances start INSTANCE_NAME --zone=us-central1-a

# Delete instance
gcloud compute instances delete INSTANCE_NAME --zone=us-central1-a

# Get serial port output
gcloud compute instances get-serial-port-output INSTANCE_NAME --zone=us-central1-a
```

### Instance Groups
```bash
# List instance groups
gcloud compute instance-groups managed list

# Describe instance group
gcloud compute instance-groups managed describe GROUP_NAME --region=us-central1

# List instances in group
gcloud compute instance-groups managed list-instances GROUP_NAME --region=us-central1

# Set autoscaling
gcloud compute instance-groups managed set-autoscaling GROUP_NAME \
  --region=us-central1 \
  --max-num-replicas=10 \
  --min-num-replicas=2 \
  --target-cpu-utilization=0.7

# Resize instance group
gcloud compute instance-groups managed resize GROUP_NAME \
  --region=us-central1 \
  --size=5

# Update instances
gcloud compute instance-groups managed rolling-action start-update GROUP_NAME \
  --region=us-central1 \
  --version=template=NEW_TEMPLATE
```

### Load Balancers
```bash
# List forwarding rules
gcloud compute forwarding-rules list

# Describe forwarding rule
gcloud compute forwarding-rules describe RULE_NAME --global

# List backend services
gcloud compute backend-services list

# Get backend health
gcloud compute backend-services get-health BACKEND_NAME --global

# List URL maps
gcloud compute url-maps list

# Describe URL map
gcloud compute url-maps describe URL_MAP_NAME
```

### Networks
```bash
# List networks
gcloud compute networks list

# Describe network
gcloud compute networks describe NETWORK_NAME

# List subnets
gcloud compute networks subnets list

# Describe subnet
gcloud compute networks subnets describe SUBNET_NAME --region=us-central1

# List firewall rules
gcloud compute firewall-rules list

# Describe firewall rule
gcloud compute firewall-rules describe RULE_NAME
```

### Storage
```bash
# List buckets
gsutil ls

# List bucket contents
gsutil ls gs://BUCKET_NAME

# Copy file to bucket
gsutil cp FILE gs://BUCKET_NAME/

# Copy from bucket
gsutil cp gs://BUCKET_NAME/FILE ./

# Sync directory
gsutil rsync -r LOCAL_DIR gs://BUCKET_NAME/

# Set bucket versioning
gsutil versioning set on gs://BUCKET_NAME

# Delete bucket
gsutil rm -r gs://BUCKET_NAME
```

### Cloud SQL
```bash
# List instances
gcloud sql instances list

# Describe instance
gcloud sql instances describe INSTANCE_NAME

# Connect to instance
gcloud sql connect INSTANCE_NAME --user=postgres

# Create backup
gcloud sql backups create --instance=INSTANCE_NAME

# List backups
gcloud sql backups list --instance=INSTANCE_NAME

# Restore from backup
gcloud sql backups restore BACKUP_ID --backup-instance=INSTANCE_NAME --backup-id=BACKUP_ID
```

## Monitoring & Logging

### Logs
```bash
# Read recent logs
gcloud logging read --limit=50

# Read logs for specific resource
gcloud logging read "resource.type=gce_instance" --limit=50

# Read logs with filter
gcloud logging read "severity>=ERROR" --limit=50

# Read logs for specific instance
gcloud logging read "resource.labels.instance_id=INSTANCE_ID" --limit=50

# Stream logs
gcloud logging read --format=json --freshness=5m

# Export logs
gcloud logging read --format=json > logs.json
```

### Monitoring
```bash
# List metrics
gcloud monitoring metrics-descriptors list

# List alert policies
gcloud alpha monitoring policies list

# Describe alert policy
gcloud alpha monitoring policies describe POLICY_NAME

# List notification channels
gcloud alpha monitoring channels list
```

## Debugging

### Terraform Debug
```bash
# Enable debug logging
set TF_LOG=DEBUG
terraform apply

# Enable trace logging
set TF_LOG=TRACE
terraform apply

# Log to file
set TF_LOG=DEBUG
set TF_LOG_PATH=terraform.log
terraform apply

# Disable logging
set TF_LOG=
```

### GCP Debug
```bash
# Verbose output
gcloud compute instances list --verbosity=debug

# Show HTTP requests
gcloud compute instances list --log-http

# Trace API calls
gcloud compute instances list --trace-token=TOKEN
```

## Cost Management

### Billing
```bash
# List billing accounts
gcloud billing accounts list

# Link project to billing account
gcloud billing projects link PROJECT_ID --billing-account=ACCOUNT_ID

# View project billing info
gcloud billing projects describe PROJECT_ID
```

### Cost Estimation
```bash
# Use Terraform cost estimation (requires Terraform Cloud)
terraform plan -out=tfplan
terraform show -json tfplan | infracost breakdown --path=-
```

## Cleanup

### Remove Resources
```bash
# Destroy all Terraform resources
terraform destroy -auto-approve

# Delete specific resources
gcloud compute instances delete INSTANCE_NAME --zone=us-central1-a --quiet

# Delete instance group
gcloud compute instance-groups managed delete GROUP_NAME --region=us-central1 --quiet

# Delete network (must delete all resources first)
gcloud compute networks delete NETWORK_NAME --quiet

# Delete firewall rules
gcloud compute firewall-rules delete RULE_NAME --quiet
```

### Clean Terraform
```bash
# Remove .terraform directory
rm -rf .terraform

# Remove state files (careful!)
rm terraform.tfstate*

# Remove plan files
rm tfplan
```

## Backup & Recovery

### Backup State
```bash
# Backup state locally
terraform state pull > terraform.tfstate.backup

# Backup to GCS
gsutil cp terraform.tfstate gs://BACKUP_BUCKET/terraform.tfstate.$(date +%Y%m%d)
```

### Restore State
```bash
# Restore from local backup
terraform state push terraform.tfstate.backup

# Restore from GCS
gsutil cp gs://BACKUP_BUCKET/terraform.tfstate.YYYYMMDD terraform.tfstate
terraform state push terraform.tfstate
```

## Automation

### Scripts
```bash
# Deploy script
bash deploy.sh

# Destroy script
bash destroy.sh

# Custom script
bash -c "terraform init && terraform plan && terraform apply -auto-approve"
```

### CI/CD Integration
```bash
# Cloud Build
gcloud builds submit --config=cloudbuild.yaml

# GitHub Actions (in workflow file)
# - terraform init
# - terraform plan
# - terraform apply -auto-approve
```

## Useful Aliases

Add to your shell profile:

```bash
# Terraform aliases
alias tf='terraform'
alias tfi='terraform init'
alias tfp='terraform plan'
alias tfa='terraform apply'
alias tfd='terraform destroy'
alias tfo='terraform output'
alias tfs='terraform show'

# GCP aliases
alias gci='gcloud compute instances'
alias gcn='gcloud compute networks'
alias gcs='gcloud compute ssh'
alias glog='gcloud logging read'
```

## Quick Reference

### Most Used Commands
```bash
# Deploy
terraform init
terraform plan
terraform apply

# Update
terraform plan
terraform apply

# Scale
terraform apply -var="instance_count=5"

# Check status
terraform output
gcloud compute instances list

# View logs
gcloud logging read --limit=50

# Destroy
terraform destroy
```

## Additional Resources

- [Terraform CLI Documentation](https://www.terraform.io/cli)
- [gcloud CLI Reference](https://cloud.google.com/sdk/gcloud/reference)
- [GCP Console](https://console.cloud.google.com)

---

**Tip**: Use `terraform -help` or `gcloud help` for command-specific help.
