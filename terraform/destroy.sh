#!/bin/bash
# Destroy script for GCP infrastructure

set -e

echo "=========================================="
echo "DevOps AI Agents - Infrastructure Destroy"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${RED}WARNING: This will destroy all infrastructure resources!${NC}"
echo -e "${RED}This action cannot be undone!${NC}"
echo ""

read -p "Are you absolutely sure you want to destroy all resources? (type 'yes' to confirm): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "Destroy cancelled"
    exit 0
fi

echo ""
read -p "Type the project name to confirm: " PROJECT_NAME

if [ "$PROJECT_NAME" != "devops-ai-agents" ]; then
    echo -e "${RED}Project name does not match. Destroy cancelled${NC}"
    exit 1
fi

echo ""
echo "Destroying infrastructure..."
terraform destroy

if [ $? -eq 0 ]; then
    echo ""
    echo "Infrastructure destroyed successfully"
else
    echo -e "${RED}Destroy failed. Please check the errors above${NC}"
    exit 1
fi
