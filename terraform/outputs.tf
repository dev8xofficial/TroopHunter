# ✅ Global outputs

output "deployed_vm_names" {
  value = module.k8s_vms.vm_names
}

output "deployed_vm_ips" {
  value = module.k8s_vms.vm_ips
}
