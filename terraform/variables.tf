# ✅ Global shared variables

variable "pm_api_url" {}
variable "pm_user" {}
variable "pm_api_token_id" {}
variable "pm_api_token_secret" {}

variable "vm_template" {
  default = "ubuntu-22.04-minimal-template"
}

variable "target_node" {
  default = "abdul"
}

variable "base_vmid" {
  type    = number
  default = 9000
}

variable "ssh_keys_dir" {
  default = "secrets/"
}