# ✅ Proxmox VM outputs

output "vm_names" {
  value = [for vm in proxmox_vm_qemu.k8s : vm.name]
}

output "vm_ips" {
  value = [for vm in proxmox_vm_qemu.k8s : vm.ipconfig0]
}
