# Backend configuration for Terraform state
# Uncomment and configure after creating the GCS bucket

# terraform {
#   backend "gcs" {
#     bucket = "your-terraform-state-bucket"
#     prefix = "terraform/state"
#   }
# }

# To create the state bucket, run:
# gsutil mb -p YOUR_PROJECT_ID -l us-central1 gs://your-terraform-state-bucket
# gsutil versioning set on gs://your-terraform-state-bucket
