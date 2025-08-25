# ✅ Global entrypoint

module "connect_ops" {
  source         = "./modules/proxmox_vm"

  vm_definitions = local.connect_ops
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_coid
}

module "docker_registry" {
  source         = "./modules/proxmox_vm"

  vm_definitions = local.docker_registry
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_drid
}

module "k8s_vms" {
  source = "./modules/proxmox_vm"

  vm_definitions = local.vm_definitions_combined
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_vmid
}
