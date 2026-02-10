# Outputs for GCP infrastructure

output "load_balancer_ip" {
  description = "External IP address of the load balancer"
  value       = google_compute_global_address.lb_ip.address
}

output "load_balancer_url" {
  description = "URL to access the application"
  value       = "http://${google_compute_global_address.lb_ip.address}"
}

output "vpc_network_name" {
  description = "Name of the VPC network"
  value       = google_compute_network.vpc_network.name
}

output "vpc_network_id" {
  description = "ID of the VPC network"
  value       = google_compute_network.vpc_network.id
}

output "subnet_name" {
  description = "Name of the subnet"
  value       = google_compute_subnetwork.subnet.name
}

output "subnet_cidr" {
  description = "CIDR range of the subnet"
  value       = google_compute_subnetwork.subnet.ip_cidr_range
}

output "instance_group_name" {
  description = "Name of the managed instance group"
  value       = google_compute_region_instance_group_manager.app_mig.name
}

output "instance_group_url" {
  description = "URL of the managed instance group"
  value       = google_compute_region_instance_group_manager.app_mig.instance_group
}

output "service_account_email" {
  description = "Email of the service account"
  value       = google_service_account.app_sa.email
}

output "storage_bucket_name" {
  description = "Name of the Cloud Storage bucket"
  value       = google_storage_bucket.app_bucket.name
}

output "storage_bucket_url" {
  description = "URL of the Cloud Storage bucket"
  value       = google_storage_bucket.app_bucket.url
}

output "database_instance_name" {
  description = "Name of the Cloud SQL instance"
  value       = var.enable_database ? google_sql_database_instance.postgres[0].name : "N/A - Database not enabled"
}

output "database_connection_name" {
  description = "Connection name for Cloud SQL instance"
  value       = var.enable_database ? google_sql_database_instance.postgres[0].connection_name : "N/A - Database not enabled"
}

output "nat_ip_addresses" {
  description = "NAT IP addresses for outbound traffic"
  value       = google_compute_router_nat.nat.nat_ips
}

output "project_id" {
  description = "GCP Project ID"
  value       = var.project_id
}

output "region" {
  description = "GCP Region"
  value       = var.region
}

output "zone" {
  description = "GCP Zone"
  value       = var.zone
}
