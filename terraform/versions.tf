# ✅ Terraform + provider versions

terraform {
  required_version = ">= 1.4.0"

  required_providers {
    proxmox = {
      source  = "Telmate/proxmox"
      version = "3.0.1-rc6"
    }
  }
}
