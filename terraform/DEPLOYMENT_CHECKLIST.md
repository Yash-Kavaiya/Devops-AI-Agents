# GCP Deployment Checklist

Use this checklist to ensure a smooth deployment of the DevOps AI Agents platform on GCP.

## Pre-Deployment Checklist

### 1. Prerequisites
- [ ] GCP account created
- [ ] Billing enabled on GCP account
- [ ] GCP project created (note Project ID: _______________)
- [ ] Terraform installed (version >= 1.0)
- [ ] gcloud CLI installed
- [ ] Git installed (for cloning repository)

### 2. Local Setup
- [ ] Repository cloned locally
- [ ] Navigated to terraform directory
- [ ] Reviewed README.md documentation
- [ ] Reviewed DEPLOYMENT_GUIDE.md

### 3. GCP Configuration
- [ ] Authenticated with GCP: `gcloud auth login`
- [ ] Set project: `gcloud config set project PROJECT_ID`
- [ ] Verified project: `gcloud config list`
- [ ] Enabled Compute Engine API
- [ ] Enabled Service Networking API
- [ ] Enabled Cloud SQL Admin API
- [ ] Enabled Cloud Storage API
- [ ] Enabled Cloud Monitoring API
- [ ] Enabled Cloud Logging API

### 4. Terraform Configuration
- [ ] Copied terraform.tfvars.example to terraform.tfvars
- [ ] Updated project_id in terraform.tfvars
- [ ] Updated region and zone if needed
- [ ] Updated allowed_ssh_ips with your IP address
- [ ] Reviewed machine_type and instance_count
- [ ] Decided on database enablement (enable_database)
- [ ] Reviewed all other variables

### 5. Security Review
- [ ] SSH access restricted to specific IPs
- [ ] Service account permissions reviewed
- [ ] Firewall rules reviewed
- [ ] Network configuration reviewed

## Deployment Checklist

### 1. Initialize Terraform
- [ ] Run: `terraform init`
- [ ] Verify: No errors in initialization
- [ ] Check: .terraform directory created
- [ ] Check: Provider plugins downloaded

### 2. Validate Configuration
- [ ] Run: `terraform validate`
- [ ] Verify: Configuration is valid
- [ ] Run: `terraform fmt` (optional, for formatting)

### 3. Plan Deployment
- [ ] Run: `terraform plan`
- [ ] Review: All resources to be created
- [ ] Verify: No unexpected changes
- [ ] Check: Resource counts match expectations
- [ ] Save plan: `terraform plan -out=tfplan` (optional)

### 4. Deploy Infrastructure
- [ ] Run: `terraform apply` or `bash deploy.sh`
- [ ] Review: Plan output one more time
- [ ] Confirm: Type 'yes' to proceed
- [ ] Wait: ~10-15 minutes for deployment
- [ ] Monitor: Watch for any errors

### 5. Verify Deployment
- [ ] Check: terraform apply completed successfully
- [ ] Run: `terraform output`
- [ ] Note: Load balancer IP address: ______________
- [ ] Verify: All expected outputs present

## Post-Deployment Checklist

### 1. Infrastructure Verification
- [ ] List instances: `gcloud compute instances list`
- [ ] Verify: Expected number of instances running
- [ ] Check: Instance health status
- [ ] Verify: Load balancer created
- [ ] Check: Backend service health

### 2. Application Access
- [ ] Open browser to load balancer IP
- [ ] Verify: Application is accessible
- [ ] Test: Basic functionality works
- [ ] Check: No error messages
- [ ] Test: From different network (optional)

### 3. Monitoring Setup
- [ ] Access Cloud Monitoring dashboard
- [ ] Verify: Metrics are being collected
- [ ] Check: Alert policies created
- [ ] Test: Alert notifications (optional)
- [ ] Review: Log entries in Cloud Logging

### 4. Security Verification
- [ ] Verify: Instances have no external IPs
- [ ] Check: Firewall rules are active
- [ ] Verify: SSH access restricted
- [ ] Check: Service account permissions
- [ ] Review: IAM roles and bindings

### 5. Cost Management
- [ ] Set up billing alerts
- [ ] Configure budget: $_______ per month
- [ ] Enable billing export (optional)
- [ ] Review: Current cost estimate
- [ ] Set up: Cost anomaly detection (optional)

## Operational Checklist

### Daily Tasks
- [ ] Check instance health
- [ ] Review error logs
- [ ] Monitor resource utilization
- [ ] Check application availability

### Weekly Tasks
- [ ] Review monitoring dashboards
- [ ] Check for security updates
- [ ] Review cost reports
- [ ] Verify backup status (if database enabled)

### Monthly Tasks
- [ ] Review and optimize costs
- [ ] Security audit
- [ ] Performance review
- [ ] Update documentation
- [ ] Review and update firewall rules

## Troubleshooting Checklist

### If Deployment Fails

#### API Errors
- [ ] Verify all required APIs are enabled
- [ ] Check: `gcloud services list --enabled`
- [ ] Enable missing APIs

#### Permission Errors
- [ ] Verify IAM permissions
- [ ] Check: User has required roles
- [ ] Grant necessary permissions

#### Quota Errors
- [ ] Check current quotas
- [ ] Request quota increase if needed
- [ ] Consider reducing resource sizes

#### Resource Errors
- [ ] Check for naming conflicts
- [ ] Verify resource availability in region
- [ ] Review Terraform state

### If Application Not Accessible

#### Load Balancer Issues
- [ ] Check backend service health
- [ ] Verify firewall rules
- [ ] Check instance health
- [ ] Review load balancer configuration

#### Instance Issues
- [ ] SSH into instance
- [ ] Check application service status
- [ ] Review application logs
- [ ] Verify startup script execution

#### Network Issues
- [ ] Verify VPC configuration
- [ ] Check subnet configuration
- [ ] Verify Cloud NAT setup
- [ ] Review firewall rules

## Cleanup Checklist

### Before Destroying Infrastructure
- [ ] Backup important data
- [ ] Export Terraform state
- [ ] Document any manual changes
- [ ] Notify team members
- [ ] Verify no production traffic

### Destroy Process
- [ ] Run: `terraform plan -destroy`
- [ ] Review: Resources to be destroyed
- [ ] Backup: Terraform state file
- [ ] Run: `terraform destroy` or `bash destroy.sh`
- [ ] Confirm: Type 'yes' to proceed
- [ ] Wait: For all resources to be deleted
- [ ] Verify: All resources removed

### Post-Destroy Verification
- [ ] Check: No instances running
- [ ] Verify: Load balancer deleted
- [ ] Check: VPC network removed
- [ ] Verify: Storage buckets handled appropriately
- [ ] Check: No unexpected charges

## Documentation Checklist

### Required Documentation
- [ ] Architecture diagram created/updated
- [ ] Configuration documented
- [ ] Custom changes documented
- [ ] Runbook created
- [ ] Disaster recovery plan documented

### Team Knowledge Transfer
- [ ] Team trained on infrastructure
- [ ] Access credentials shared securely
- [ ] Monitoring dashboards shared
- [ ] Alert procedures documented
- [ ] Escalation paths defined

## Compliance Checklist

### Security Compliance
- [ ] Encryption at rest enabled
- [ ] Encryption in transit configured
- [ ] Access controls implemented
- [ ] Audit logging enabled
- [ ] Security scanning configured

### Operational Compliance
- [ ] Backup strategy implemented
- [ ] Disaster recovery tested
- [ ] Change management process defined
- [ ] Incident response plan created
- [ ] Regular security audits scheduled

## Success Criteria

### Deployment Success
- [ ] All Terraform resources created successfully
- [ ] Application accessible via load balancer
- [ ] No errors in logs
- [ ] Monitoring and alerting functional
- [ ] Cost within expected range

### Operational Success
- [ ] Application performance meets requirements
- [ ] High availability verified
- [ ] Auto-healing working
- [ ] Monitoring provides adequate visibility
- [ ] Team comfortable with operations

## Notes

### Deployment Date: _______________
### Deployed By: _______________
### Project ID: _______________
### Region: _______________
### Load Balancer IP: _______________

### Issues Encountered:
_______________________________________
_______________________________________
_______________________________________

### Resolutions:
_______________________________________
_______________________________________
_______________________________________

### Additional Notes:
_______________________________________
_______________________________________
_______________________________________

---

## Quick Reference

### Essential Commands
```bash
# Deploy
terraform init
terraform plan
terraform apply

# Verify
terraform output
gcloud compute instances list

# Monitor
gcloud logging read --limit=50

# Destroy
terraform destroy
```

### Support Resources
- Documentation: See README.md
- Troubleshooting: See DEPLOYMENT_GUIDE.md
- Commands: See COMMANDS.md
- Architecture: See ARCHITECTURE.md

---

**Version**: 1.0.0
**Last Updated**: February 2026
