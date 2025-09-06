# Monitoring Stack Deployment Guide

This guide explains how to deploy Prometheus and Grafana monitoring stack across different Kubernetes environments (dev, staging, production) using Ansible automation.

## Architecture Overview

The monitoring setup uses:
- **Prometheus**: Metrics collection and storage
- **Grafana**: Visualization and dashboards
- **Node Exporter**: Node-level metrics
- **Kube State Metrics**: Kubernetes cluster metrics
- **Metrics Server**: Kubernetes resource usage metrics (CPU/Memory)

## Environment-Specific Configuration

### Development Environment
- **Replicas**: 1 (single instance)
- **Storage**: EmptyDir (no persistence)
- **Retention**: 3 days
- **Resources**: Minimal (128Mi-256Mi memory, 50m-100m CPU)
- **NodePorts**: 
  - Prometheus: 30092
  - Grafana: 30302

### Staging Environment
- **Replicas**: 1 (single instance)
- **Storage**: PVC (5Gi for Grafana, 20Gi for Prometheus)
- **Retention**: 7 days
- **Resources**: Medium (256Mi-512Mi memory, 100m-250m CPU)
- **NodePorts**:
  - Prometheus: 30091
  - Grafana: 30301

### Production Environment
- **Replicas**: 2 (high availability)
- **Storage**: PVC (10Gi for Grafana, 50Gi for Prometheus)
- **Retention**: 30 days
- **Resources**: High (512Mi-1Gi memory, 250m-500m CPU for Grafana; 2Gi-4Gi memory, 1000m-2000m CPU for Prometheus)
- **NodePorts**:
  - Prometheus: 30090
  - Grafana: 30300

## Deployment Process

### Prerequisites

1. **Kubernetes clusters** running on separate VMs:
   - Dev: `k8s-ctrlr-dev` (192.168.1.225)
   - Staging: `k8s-ctrlr-stag` (192.168.1.215)
   - Production: `k8s-ctrlr-prod` (192.168.1.205)

2. **SSH access** configured with proper keys
3. **kubeconfig** files available at `/home/{user}/.kube/config` on each controller

### How `deploy_env` Works

The `deploy_env` variable is crucial for environment separation:

1. **Ansible Playbook Level**: 
   ```yaml
   deploy_env: "{{ env }}"  # Set from command line: -e "env=prod"
   ```

2. **Manifest Selection**:
   ```yaml
   src: "{{ manifests_dir }}/prometheus-{{ deploy_env }}.yaml"
   src: "{{ manifests_dir }}/grafana-{{ deploy_env }}.yaml"
   ```

3. **Environment-Specific Features**:
   - Different resource limits
   - Different storage configurations
   - Different retention policies
   - Different NodePort assignments

### Deployment Commands

#### Deploy to Development
```bash
cd /Users/abdulrehman/Workstation/Dev8X/TroopHunter/ansible
./scripts/deploy-monitoring-dev.sh apply
```

#### Deploy to Staging
```bash
cd /Users/abdulrehman/Workstation/Dev8X/TroopHunter/ansible
./scripts/deploy-monitoring-stag.sh apply
```

#### Deploy to Production
```bash
cd /Users/abdulrehman/Workstation/Dev8X/TroopHunter/ansible
./scripts/deploy-monitoring-prod.sh apply
```

#### Manual Deployment (Alternative)
```bash
# For any environment
ansible-playbook \
  -i inventories/combined/hosts.ini \
  -e "env=dev" \
  -e "cluster_action=apply" \
  playbooks/main.yml \
  --limit k8s_controller_dev
```

### Verification

After deployment, verify the services are running:

```bash
# SSH to the controller node
ssh k8s-ctrlr-dev@192.168.1.225

# Check pods
kubectl get pods -n monitoring

# Check services
kubectl get svc -n monitoring

# Check NodePorts
kubectl get svc -n monitoring -o wide
```

### Access URLs

Once deployed, access the services via NodePort:

#### Development
- Prometheus: http://192.168.1.225:30092
- Grafana: http://192.168.1.225:30302 (admin/admin123)

#### Staging
- Prometheus: http://192.168.1.215:30091
- Grafana: http://192.168.1.215:30301 (admin/admin123)

#### Production
- Prometheus: http://192.168.1.205:30090
- Grafana: http://192.168.1.205:30300 (admin/admin123)

## Cleanup

To remove monitoring stack:

```bash
# Development
./scripts/deploy-monitoring-dev.sh delete

# Staging
./scripts/deploy-monitoring-stag.sh delete

# Production
./scripts/deploy-monitoring-prod.sh delete
```

### Delete Operation Details

The delete operation removes all monitoring components in the correct order:

1. **Grafana** (deployment, service, datasource)
2. **Grafana Dashboards** (ConfigMaps)
3. **Prometheus** (deployment, service, configmap)
4. **Kube State Metrics** (deployment, service)
5. **Node Exporter** (daemonset, service)
6. **RBAC Components** (ClusterRoles, ClusterRoleBindings, ServiceAccounts)
7. **Persistent Volume Claims** (prometheus-pvc, grafana-pvc)
8. **Monitoring Namespace** (final cleanup)

### Testing Delete Functionality

```bash
# Test delete operation
./scripts/test-monitoring-delete.sh dev
./scripts/test-monitoring-delete.sh stag
./scripts/test-monitoring-delete.sh prod
```

The test script will:
- Check resources before deletion
- Run the delete operation
- Verify all resources are removed
- Check for any remaining monitoring components
- Provide a comprehensive cleanup report

### Testing Metrics Server

```bash
# Test metrics-server deployment
./scripts/test-metrics-server.sh dev apply
./scripts/test-metrics-server.sh stag apply
./scripts/test-metrics-server.sh prod apply

# Test metrics-server deletion
./scripts/test-metrics-server.sh dev delete
./scripts/test-metrics-server.sh stag delete
./scripts/test-metrics-server.sh prod delete
```

The metrics-server test script will:
- Check metrics-server deployment status
- Verify pods are running
- Test `kubectl top` commands
- Check logs for any errors
- Provide deployment status report

## Troubleshooting

### Common Issues

1. **kubeconfig not found**:
   ```bash
   # Ensure kubeconfig exists
   ls -la /home/k8s-ctrlr-dev/.kube/config
   ```

2. **Manifests not found**:
   ```bash
   # Check manifest files exist
   ls -la /workspace/ansible/kubernetes/monitoring/prometheus-dev.yaml
   ls -la /workspace/ansible/kubernetes/monitoring/grafana-dev.yaml
   ```

3. **Pods not starting**:
   ```bash
   # Check pod logs
   kubectl logs -n monitoring deployment/prometheus
   kubectl logs -n monitoring deployment/grafana
   ```

4. **Storage issues** (staging/prod):
   ```bash
   # Check PVC status
   kubectl get pvc -n monitoring
   
   # Check storage class
   kubectl get storageclass
   ```

### Logs and Debugging

```bash
# Check Ansible execution logs
ansible-playbook -i inventories/combined/hosts.ini \
  -e "env=dev" -e "cluster_action=apply" \
  playbooks/main.yml --limit k8s_controller_dev -vvv

# Check Kubernetes events
kubectl get events -n monitoring --sort-by='.lastTimestamp'

# Check resource usage
kubectl top pods -n monitoring
kubectl top nodes
```

## Security Considerations

1. **Change default passwords** in production
2. **Use proper RBAC** (already configured)
3. **Network policies** for service isolation
4. **TLS/SSL** for external access
5. **Backup strategies** for persistent data

## Monitoring Best Practices

1. **Set up alerts** in Prometheus
2. **Create dashboards** in Grafana
3. **Monitor resource usage** regularly
4. **Set up log aggregation** (consider ELK stack)
5. **Regular backup** of Grafana dashboards and Prometheus data

## Next Steps

1. Configure Prometheus alerting rules
2. Import Grafana dashboards for Kubernetes
3. Set up log aggregation
4. Configure external access (LoadBalancer/Ingress)
5. Implement backup and disaster recovery procedures
