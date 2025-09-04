terraform {
  required_providers {
    proxmox = {
      source = "Telmate/proxmox"
    }
  }
}

resource "proxmox_vm_qemu" "k8s" {
  for_each = {
    for idx, vm in var.vm_definitions :
    vm.name => {
      data = vm
      index = idx
    }
  }

  name        = each.value.data.name
  target_node = var.target_node
  vmid        = var.base_vmid + (each.value.index + 1)
  clone       = var.vm_template
  full_clone  = true

  cpu { 
    cores     = each.value.data.cores
  }
  memory      = each.value.data.memory
  agent       = 1
  os_type     = "cloud-init"

  ipconfig0   = "ip=${each.value.data.ip}/24,gw=192.168.1.1"

  ciuser      = each.value.data.name
  sshkeys     = file(each.value.data.ssh_key_path)

  boot        = "order=scsi0;net0"
  onboot      = true
  startup     = "order=${each.value.data.startup_order},up=${lookup(each.value.data, "up_delay", 0)}"
  scsihw      = "virtio-scsi-pci"

  # Main OS Disk
  disk {
    slot      = "scsi0"
    type      = "disk"
    storage   = "local"
    size      = each.value.data.disk_size
    discard   = true
  }

  # Cloud-Init Drive
  disk {
    slot      = "ide2"
    type      = "cloudinit"
    storage   = "local"
  }

  network {
    id        = 0
    model     = "virtio"
    bridge    = "vmbr0"
    firewall  = false
    link_down = false
  }

  lifecycle {
    prevent_destroy = true
    ignore_changes  = [
      sshkeys,
      network,
    ]
  }
}
