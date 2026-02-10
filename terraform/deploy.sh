#!/bin/bash
# Deployment script for GCP infrastructure using Terraform

set -e

echo "=========================================="
echo "DevOps AI Agents - GCP Deployment Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo -e "${RED}Error: Terraform is not installed${NC}"
    echo "Please install Terraform from: https://www.terraform.io/downloads"
    exit 1
fi

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}Error: gcloud CLI is not installed${NC}"
    echo "Please install gcloud from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo -e "${YELLOW}Warning: terraform.tfvars not found${NC}"
    echo "Creating from example..."
    cp terraform.tfvars.example terraform.tfvars
    echo -e "${YELLOW}Please edit terraform.tfvars with your values and run this script again${NC}"
    exit 1
fi

# Get project ID from terraform.tfvars
PROJECT_ID=$(grep "project_id" terraform.tfvars | cut -d'"' -f2)

if [ -z "$PROJECT_ID" ]; then
    echo -e "${RED}Error: project_id not found in terraform.tfvars${NC}"
    exit 1
fi

echo -e "${GREEN}Using GCP Project: $PROJECT_ID${NC}"
echo ""

# Set gcloud project
echo "Setting gcloud project..."
gcloud config set project $PROJECT_ID

# Enable required APIs
echo ""
echo "Enabling required GCP APIs..."
gcloud services enable compute.googleapis.com
gcloud services enable servicenetworking.googleapis.com
gcloud services enable sqladmin.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable monitoring.googleapis.com
gcloud services enable logging.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com

echo -e "${GREEN}APIs enabled successfully${NC}"
echo ""

# Initialize Terraform
echo "Initializing Terraform..."
terraform init

# Validate configuration
echo ""
echo "Validating Terraform configuration..."
terraform validate

if [ $? -ne 0 ]; then
    echo -e "${RED}Terraform validation failed${NC}"
    exit 1
fi

echo -e "${GREEN}Validation successful${NC}"
echo ""

# Plan deployment
echo "Planning infrastructure deployment..."
terraform plan -out=tfplan

echo ""
echo -e "${YELLOW}Review the plan above carefully${NC}"
read -p "Do you want to proceed with deployment? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Deployment cancelled"
    exit 0
fi

# Apply configuration
echo ""
echo "Deploying infrastructure..."
terraform apply tfplan

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo "Deployment completed successfully!"
    echo "==========================================${NC}"
    echo ""
    echo "Infrastructure details:"
    terraform output
    echo ""
    echo -e "${GREEN}Access your application at:${NC}"
    echo "http://$(terraform output -raw load_balancer_ip)"
    echo ""
    echo -e "${YELLOW}Note: It may take a few minutes for instances to become healthy${NC}"
else
    echo -e "${RED}Deployment failed${NC}"
    exit 1
fi
