# ✅ Global data maps/lists

locals {
  k8s_nodes = [
    for i in range(1, 2) : {
      name          = "k8s-node-${i}"
      cores         = 2
      memory        = 2048
      ip            = "192.168.1.20${i + 6}"
      hostname      = "k8s-node-${i}"
      startup_order = i
      up_delay      = 15
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_node.pub"
      disk_size     = "8G"
    }
  ]

  k8s_controller = [
    {
      name          = "k8s-ctrlr"
      cores         = 2
      memory        = 4096
      ip            = "192.168.1.206"
      hostname      = "k8s-ctrlr"
      startup_order = 0
      up_delay      = 0
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_ctrlr.pub"
      disk_size     = "8G"
    }
  ]

  vm_definitions_combined = concat(local.k8s_controller, local.k8s_nodes)
}
