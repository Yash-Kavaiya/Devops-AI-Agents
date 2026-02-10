# Main Terraform configuration for GCP infrastructure
terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# VPC Network
resource "google_compute_network" "vpc_network" {
  name                    = "${var.project_name}-vpc"
  auto_create_subnetworks = false
  description             = "VPC network for DevOps AI Agents platform"
}

# Subnet
resource "google_compute_subnetwork" "subnet" {
  name          = "${var.project_name}-subnet"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.vpc_network.id

  secondary_ip_range {
    range_name    = "services-range"
    ip_cidr_range = "10.1.0.0/16"
  }

  secondary_ip_range {
    range_name    = "pod-ranges"
    ip_cidr_range = "10.2.0.0/16"
  }
}

# Firewall rules
resource "google_compute_firewall" "allow_http" {
  name    = "${var.project_name}-allow-http"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["http-server", "https-server"]
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "${var.project_name}-allow-ssh"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = var.allowed_ssh_ips
  target_tags   = ["ssh-server"]
}

resource "google_compute_firewall" "allow_internal" {
  name    = "${var.project_name}-allow-internal"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "udp"
    ports    = ["0-65535"]
  }

  allow {
    protocol = "icmp"
  }

  source_ranges = [var.subnet_cidr]
}

# Cloud NAT for outbound internet access
resource "google_compute_router" "router" {
  name    = "${var.project_name}-router"
  region  = var.region
  network = google_compute_network.vpc_network.id
}

resource "google_compute_router_nat" "nat" {
  name                               = "${var.project_name}-nat"
  router                             = google_compute_router.router.name
  region                             = google_compute_router.router.region
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
}

# Static IP for load balancer
resource "google_compute_global_address" "lb_ip" {
  name = "${var.project_name}-lb-ip"
}

# Instance template for application servers
resource "google_compute_instance_template" "app_template" {
  name_prefix  = "${var.project_name}-app-"
  machine_type = var.machine_type
  region       = var.region

  tags = ["http-server", "https-server", "ssh-server"]

  disk {
    source_image = var.boot_image
    auto_delete  = true
    boot         = true
    disk_size_gb = 50
  }

  network_interface {
    network    = google_compute_network.vpc_network.id
    subnetwork = google_compute_subnetwork.subnet.id
  }

  metadata = {
    startup-script = file("${path.module}/scripts/startup.sh")
  }

  service_account {
    email  = google_service_account.app_sa.email
    scopes = ["cloud-platform"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

# Service Account for application
resource "google_service_account" "app_sa" {
  account_id   = "${var.project_name}-app-sa"
  display_name = "Service Account for DevOps AI Agents"
}

resource "google_project_iam_member" "app_sa_roles" {
  for_each = toset([
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/cloudtrace.agent",
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.app_sa.email}"
}

# Managed Instance Group
resource "google_compute_region_instance_group_manager" "app_mig" {
  name               = "${var.project_name}-mig"
  base_instance_name = "${var.project_name}-app"
  region             = var.region

  version {
    instance_template = google_compute_instance_template.app_template.id
  }

  target_size = var.instance_count

  named_port {
    name = "http"
    port = 3000
  }

  auto_healing_policies {
    health_check      = google_compute_health_check.app_health.id
    initial_delay_sec = 300
  }
}

# Health check
resource "google_compute_health_check" "app_health" {
  name                = "${var.project_name}-health-check"
  check_interval_sec  = 10
  timeout_sec         = 5
  healthy_threshold   = 2
  unhealthy_threshold = 3

  http_health_check {
    port         = 3000
    request_path = "/"
  }
}

# Backend service
resource "google_compute_backend_service" "app_backend" {
  name                  = "${var.project_name}-backend"
  protocol              = "HTTP"
  port_name             = "http"
  timeout_sec           = 30
  health_checks         = [google_compute_health_check.app_health.id]
  load_balancing_scheme = "EXTERNAL_MANAGED"

  backend {
    group           = google_compute_region_instance_group_manager.app_mig.instance_group
    balancing_mode  = "UTILIZATION"
    capacity_scaler = 1.0
  }
}

# URL map
resource "google_compute_url_map" "app_lb" {
  name            = "${var.project_name}-lb"
  default_service = google_compute_backend_service.app_backend.id
}

# HTTP proxy
resource "google_compute_target_http_proxy" "app_proxy" {
  name    = "${var.project_name}-http-proxy"
  url_map = google_compute_url_map.app_lb.id
}

# Forwarding rule
resource "google_compute_global_forwarding_rule" "app_forwarding_rule" {
  name                  = "${var.project_name}-forwarding-rule"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL_MANAGED"
  port_range            = "80"
  target                = google_compute_target_http_proxy.app_proxy.id
  ip_address            = google_compute_global_address.lb_ip.id
}

# Cloud Storage bucket for application data
resource "google_storage_bucket" "app_bucket" {
  name          = "${var.project_id}-${var.project_name}-data"
  location      = var.region
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  lifecycle_rule {
    condition {
      age = 90
    }
    action {
      type = "Delete"
    }
  }
}

# Cloud SQL PostgreSQL instance (optional, for database)
resource "google_sql_database_instance" "postgres" {
  count            = var.enable_database ? 1 : 0
  name             = "${var.project_name}-db"
  database_version = "POSTGRES_15"
  region           = var.region

  settings {
    tier              = var.db_tier
    availability_type = "REGIONAL"
    disk_size         = 20
    disk_type         = "PD_SSD"

    backup_configuration {
      enabled            = true
      start_time         = "03:00"
      point_in_time_recovery_enabled = true
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc_network.id
    }
  }

  deletion_protection = true
}

resource "google_sql_database" "database" {
  count    = var.enable_database ? 1 : 0
  name     = var.database_name
  instance = google_sql_database_instance.postgres[0].name
}

# Monitoring and logging
resource "google_monitoring_alert_policy" "high_cpu" {
  display_name = "${var.project_name}-high-cpu-alert"
  combiner     = "OR"

  conditions {
    display_name = "CPU usage above 80%"

    condition_threshold {
      filter          = "resource.type = \"gce_instance\" AND metric.type = \"compute.googleapis.com/instance/cpu/utilization\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 0.8

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }

  notification_channels = var.notification_channels

  alert_strategy {
    auto_close = "1800s"
  }
}
