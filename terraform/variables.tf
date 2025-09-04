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
  type    = string
}

variable "target_node" {
  type    = string
}

variable "ssh_keys_dir" {
  type    = string
  default = "secrets/"
}

variable "connect_ops_name" {
  type    = string
}

variable "docker_registry_name" {
  type    = string
}

variable "k8s_controller_name" {
  type    = string
}

variable "k8s_nodes_name" {
  type    = string
}

variable "connect_ops_ip" {
  type    = string
}

variable "docker_registry_ip" {
  type    = string
}

variable "k8s_controller_ip" {
  type    = string
}

variable "k8s_nodes_ip" {
  type    = string
}

variable "base_coid" {
  type    = number
}

variable "base_drid" {
  type    = number
}

variable "base_vmid" {
  type    = number
}