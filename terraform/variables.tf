# ✅ Global shared variables

variable "pm_api_url" {}
variable "pm_user" {}
variable "pm_api_token_id" {}
variable "pm_api_token_secret" {}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vm_template" {
  type = string
}

variable "target_node" {
  type = string
}

variable "ssh_keys_dir" {
  type    = string
  default = "secrets/"
}

variable "connect_ops_name" {
  type = string
}

variable "docker_registry_name" {
  type = string
}

variable "k8s_controller_name" {
  type = string
}

variable "k8s_nodes_name" {
  type = string
}

variable "connect_ops_ip" {
  type = string
}

variable "docker_registry_ip" {
  type = string
}

variable "k8s_controller_ip" {
  type = string
}

variable "k8s_nodes_ip" {
  type = string
}

variable "base_coid" {
  type = number
}

variable "base_drid" {
  type = number
}

variable "base_vmid" {
  type = number
}

variable "kasm_name" {
  type = string
}

variable "kasm_ip" {
  type = string
}

variable "base_kasmid" {
  type = number
}

# Kasm runs on its own template (Debian 12) — Ubuntu 22.04/kernel 5.15 has a
# Proxmox-virtio container-egress bug that no Docker/iptables tuning fixes.
variable "kasm_template" {
  type = string
}

# ── backbone (the ecosystem spine — DB VM + K3s stateless VM) ─────────────────
# Built ONLY in the development workspace, scoped via -target=module.backbone_*.
# Defaults are provided so prod/staging tfvars stay valid WITHOUT edits (these
# tiers are never instantiated there — they're never targeted).
variable "backbone_db_name" {
  type    = string
  default = "backbone-db"
}

variable "backbone_db_ip" {
  type        = string
  description = "LAN static IP for the Postgres VM (resolves as backbone-db.local)"
  default     = "192.168.1.227" # in the dev .22x range (after node .226); confirm free
}

variable "base_backbonedbid" {
  type    = number
  default = 7140 # → vmid 7141 (base + index + 1); avoids the 71xx tiers above
}

variable "backbone_k3s_name" {
  type    = string
  default = "backbone-k3s"
}

variable "backbone_k3s_ip" {
  type        = string
  description = "LAN static IP for the K3s stateless VM"
  default     = "192.168.1.228" # in the dev .22x range; confirm free
}

variable "base_backbonek3sid" {
  type    = number
  default = 7150 # → vmid 7151
}
# ── llm-host ──────────────────────────────────────────────────────────────────
# VM that serves llama.cpp for the Dev8X local-AI layer
# (forge/infrastructure/reconciler/). Built on the dev8x cluster (dell3 / pve),
# so it is driven by secrets/dev8x.tfvars + the `dev8x` workspace, and applied
# scoped: -target=module.llm_host

variable "llm_name" {
  type    = string
  default = "llm-host"
}

variable "llm_ip" {
  type        = string
  description = "LAN static IP for the LLM host"
  default     = "192.168.1.40"
}

variable "base_llmid" {
  type    = number
  default = 8000 # → vmid 8001
}

variable "llm_cores" {
  type        = number
  description = "CPU inference is compute-bound during prefill. Cap = the node's physical cores (Proxmox rejects more): dell3 i5-7500 = 4."
  default     = 4
}

variable "llm_memory" {
  type        = number
  description = "MB. Must hold model + KV cache; 24576 fits a 21GB GGUF in dell3's 29GB free"
  default     = 24576
}

variable "llm_disk_size" {
  type        = string
  description = "Room for several GGUF files (~21GB each) plus the OS"
  default     = "80G"
}
