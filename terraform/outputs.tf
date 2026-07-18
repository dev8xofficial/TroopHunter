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

output "deployed_backbone_db_names" {
  value = module.backbone_db.vm_names
}

output "deployed_backbone_db_ips" {
  value = module.backbone_db.vm_ips
}

output "deployed_backbone_k3s_names" {
  value = module.backbone_k3s.vm_names
}

output "deployed_backbone_k3s_ips" {
  value = module.backbone_k3s.vm_ips
}
