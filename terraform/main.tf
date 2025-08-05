# ✅ Global entrypoint

module "k8s_vms" {
  source = "./modules/proxmox_vm"

  vm_definitions = local.vm_definitions_combined
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_vmid
}
