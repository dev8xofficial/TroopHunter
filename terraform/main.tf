# ✅ Global entrypoint

module "connect_ops" {
  source = "./modules/proxmox_vm"

  vm_definitions = local.connect_ops
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_coid
}

module "docker_registry" {
  source = "./modules/proxmox_vm"

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

module "kasm" {
  source = "./modules/proxmox_vm_workspace"

  vm_definitions = local.kasm
  vm_template    = var.kasm_template
  target_node    = var.target_node
  base_vmid      = var.base_kasmid
}

# backbone-db — Postgres+pgvector VM. Base module → keeps prevent_destroy (data).
# Build only in `development`, scoped: -target=module.backbone_db
module "backbone_db" {
  source = "./modules/proxmox_vm"

  vm_definitions = local.backbone_db
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_backbonedbid
}

# backbone-k3s — single-node K3s (stateless layer). Workspace module → no
# prevent_destroy (rebuildable). Scoped: -target=module.backbone_k3s
module "backbone_k3s" {
  source = "./modules/proxmox_vm_workspace"

  vm_definitions = local.backbone_k3s
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_backbonek3sid
}

# llm-host — llama.cpp server for the local-AI layer (forge/infrastructure/reconciler).
# Lives on the dev8x cluster, NOT the hub: use the `dev8x` workspace + secrets/dev8x.tfvars.
# Workspace module → no prevent_destroy (models are re-downloadable).
#   terraform workspace select dev8x || terraform workspace new dev8x
#   terraform apply -var-file=secrets/dev8x.tfvars -target=module.llm_host
module "llm_host" {
  source = "./modules/proxmox_vm_workspace"

  vm_definitions = local.llm_host
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_llmid
}
