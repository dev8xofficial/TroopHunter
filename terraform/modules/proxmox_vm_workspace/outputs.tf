# ✅ Workspace VM outputs

output "vm_names" {
  value = [for vm in proxmox_vm_qemu.vm : vm.name]
}

output "vm_ips" {
  value = [for vm in proxmox_vm_qemu.vm : vm.ipconfig0]
}
