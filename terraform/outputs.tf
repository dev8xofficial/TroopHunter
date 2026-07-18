# ✅ Global outputs

output "deployed_vm_names" {
  value = module.k8s_vms.vm_names
}

output "deployed_vm_ips" {
  value = module.k8s_vms.vm_ips
}

output "deployed_kasm_names" {
  value = module.kasm.vm_names
}

output "deployed_kasm_ips" {
  value = module.kasm.vm_ips
}
