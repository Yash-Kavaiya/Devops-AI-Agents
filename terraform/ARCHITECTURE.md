# GCP Infrastructure Architecture

## Overview

This document describes the architecture of the DevOps AI Agents platform deployed on Google Cloud Platform.

## Architecture Diagram

```
                                    Internet
                                       |
                                       v
                            [Global Load Balancer]
                                       |
                    +------------------+------------------+
                    |                                     |
                    v                                     v
            [Health Check]                        [Cloud Armor]
                    |                                     |
                    v                                     v
            [Backend Service] ----------------------> [Firewall Rules]
                    |
                    v
        +-----------+-----------+
        |                       |
        v                       v
    [Instance Group]      [Instance Group]
    (us-central1-a)       (us-central1-b)
        |                       |
        +----------+------------+
                   |
                   v
            [VPC Network]
                   |
        +----------+----------+
        |          |          |
        v          v          v
    [Subnet]   [Cloud NAT]  [Router]
        |
        +----------+----------+
        |          |          |
        v          v          v
    [Storage]  [Cloud SQL]  [Monitoring]
```

## Components

### 1. Network Layer

#### VPC Network
- **Purpose**: Isolated network environment
- **CIDR**: 10.0.0.0/24 (customizable)
- **Features**:
  - Custom subnet configuration
  - Private Google Access enabled
  - VPC Flow Logs for monitoring

#### Subnet
- **Primary Range**: 10.0.0.0/24
- **Secondary Ranges**:
  - Services: 10.1.0.0/16
  - Pods: 10.2.0.0/16 (for future Kubernetes)

#### Cloud NAT
- **Purpose**: Outbound internet access for private instances
- **Configuration**: Auto-allocated IPs
- **Logging**: Enabled for troubleshooting

#### Firewall Rules
1. **HTTP/HTTPS**: Allow ports 80, 443 from internet
2. **SSH**: Allow port 22 from specified IPs
3. **Internal**: Allow all traffic within VPC
4. **Health Checks**: Allow Google health check ranges

### 2. Compute Layer

#### Instance Template
- **Machine Type**: e2-medium (2 vCPU, 4GB RAM)
- **Boot Disk**: Ubuntu 22.04 LTS, 50GB SSD
- **Network**: Private IP only
- **Startup Script**: Automated application deployment
- **Service Account**: Custom SA with minimal permissions

#### Managed Instance Group (MIG)
- **Type**: Regional
- **Zones**: Multi-zone for high availability
- **Target Size**: 2 instances (configurable)
- **Auto-healing**: Enabled with health checks
- **Update Policy**: Rolling updates

#### Auto-scaling (Optional)
- **Min Instances**: 2
- **Max Instances**: 10
- **Target CPU**: 70%
- **Cooldown**: 60 seconds

### 3. Load Balancing

#### Global HTTP(S) Load Balancer
- **Type**: External, managed
- **Protocol**: HTTP (HTTPS ready)
- **Features**:
  - Global anycast IP
  - SSL termination ready
  - Cloud CDN ready
  - Cloud Armor integration ready

#### Backend Service
- **Protocol**: HTTP
- **Port**: 3000
- **Health Check**: HTTP on /
- **Session Affinity**: None (stateless)
- **Timeout**: 30 seconds

#### Health Check
- **Type**: HTTP
- **Port**: 3000
- **Path**: /
- **Interval**: 10 seconds
- **Timeout**: 5 seconds
- **Healthy Threshold**: 2
- **Unhealthy Threshold**: 3

### 4. Storage Layer

#### Cloud Storage
- **Purpose**: Application data, backups
- **Location**: Regional
- **Features**:
  - Versioning enabled
  - Lifecycle management (90 days)
  - Uniform bucket-level access

#### Cloud SQL (Optional)
- **Engine**: PostgreSQL 15
- **Type**: Regional
- **Tier**: db-f1-micro (customizable)
- **Features**:
  - Automated backups
  - Point-in-time recovery
  - Private IP only
  - High availability option

### 5. Security Layer

#### Service Account
- **Purpose**: Instance identity
- **Permissions**:
  - Logging writer
  - Monitoring metric writer
  - Cloud Trace agent

#### IAM Roles
- Principle of least privilege
- Separate service accounts per component
- No default service account usage

#### Network Security
- Private instances (no external IPs)
- Firewall rules with source restrictions
- Cloud NAT for outbound only
- VPC Service Controls ready

### 6. Monitoring & Logging

#### Cloud Monitoring
- **Metrics**:
  - CPU utilization
  - Memory usage
  - Disk I/O
  - Network traffic
  - Application metrics

#### Cloud Logging
- **Logs**:
  - System logs
  - Application logs
  - Access logs
  - Audit logs

#### Alerting
- **Policies**:
  - High CPU (>80%)
  - Instance health
  - Load balancer errors
  - Custom application metrics

## Data Flow

### Request Flow
1. User request → Global Load Balancer
2. Load Balancer → Health check validation
3. Load Balancer → Backend service
4. Backend service → Instance group
5. Instance → Application (port 3000)
6. Response ← Same path reversed

### Outbound Flow
1. Instance → Cloud NAT
2. Cloud NAT → Internet
3. Response ← Cloud NAT ← Instance

### Logging Flow
1. Application → Cloud Logging API
2. Metrics → Cloud Monitoring API
3. Traces → Cloud Trace API

## High Availability

### Multi-Zone Deployment
- Instances distributed across zones
- Automatic failover
- Zone-independent health checks

### Auto-Healing
- Unhealthy instances automatically replaced
- Health check based detection
- Configurable grace period

### Load Distribution
- Global load balancing
- Automatic traffic distribution
- Session affinity options

## Scalability

### Horizontal Scaling
- Manual: Adjust instance_count variable
- Automatic: Configure autoscaler
- Rolling updates for zero downtime

### Vertical Scaling
- Change machine_type variable
- Requires instance recreation
- Minimal downtime with MIG

## Security Best Practices

### Network Security
- ✅ Private instances only
- ✅ Restricted SSH access
- ✅ Firewall rules with source restrictions
- ✅ VPC isolation

### Access Control
- ✅ Service accounts with minimal permissions
- ✅ No default service account
- ✅ IAM roles properly scoped
- ✅ Audit logging enabled

### Data Protection
- ✅ Encryption at rest (default)
- ✅ Encryption in transit (HTTPS ready)
- ✅ Backup and versioning
- ✅ Lifecycle management

## Cost Optimization

### Compute
- Use appropriate machine types
- Consider preemptible instances for dev
- Implement auto-scaling
- Use committed use discounts

### Network
- Minimize egress traffic
- Use Cloud CDN for static content
- Optimize load balancer configuration

### Storage
- Implement lifecycle policies
- Use appropriate storage classes
- Regular cleanup of unused data

## Disaster Recovery

### Backup Strategy
- Terraform state in GCS
- Database automated backups
- Application data versioning
- Configuration as code

### Recovery Procedures
1. Restore Terraform state
2. Restore database from backup
3. Redeploy infrastructure
4. Restore application data

### RTO/RPO
- **RTO**: ~30 minutes
- **RPO**: ~5 minutes (database)
- **RPO**: ~0 minutes (stateless app)

## Future Enhancements

### Planned Improvements
- [ ] HTTPS with managed certificates
- [ ] Cloud CDN integration
- [ ] Cloud Armor for DDoS protection
- [ ] GKE migration for container orchestration
- [ ] Multi-region deployment
- [ ] Advanced monitoring dashboards
- [ ] CI/CD pipeline integration
- [ ] Secret Manager integration

### Scalability Roadmap
- [ ] Auto-scaling implementation
- [ ] Database read replicas
- [ ] Caching layer (Memorystore)
- [ ] Message queue (Pub/Sub)
- [ ] Microservices architecture

## Compliance

### Standards
- CIS GCP Foundations Benchmark
- NIST Cybersecurity Framework
- SOC 2 Type II ready
- GDPR compliant architecture

### Audit
- Cloud Audit Logs enabled
- Access transparency
- Data residency controls
- Compliance reporting

## Maintenance

### Regular Tasks
- Security patches (automated)
- Dependency updates
- Configuration reviews
- Cost optimization reviews
- Performance tuning

### Monitoring
- Daily health checks
- Weekly performance reviews
- Monthly cost analysis
- Quarterly security audits

## Support

For architecture questions or improvements:
- GitHub Issues: https://github.com/Yash-Kavaiya/Devops-AI-Agents/issues
- Documentation: See README.md
- GCP Support: https://cloud.google.com/support

---

**Last Updated**: February 2026
**Version**: 1.0.0
