variable "vm_definitions" {
  type = list(object({
    name          = string
    cores         = number
    memory        = number
    ip            = string
    hostname      = string
    startup_order = number
    up_delay      = number
    ssh_key_path  = string
    disk_size     = string
  }))
}

variable "vm_template" {
  type = string
}

variable "target_node" {
  type = string
}

variable "base_coid" {
  type    = number
  default = 8000
}

variable "base_drid" {
  type    = number
  default = 8001
}

variable "base_vmid" {
  type    = number
  default = 9000
}