# ✅ Global data maps/lists

locals {
  connect_ops = [
    {
      name          = "connect-ops"
      cores         = 1
      memory        = 512
      ip            = "192.168.1.200"
      hostname      = "connect-ops"
      startup_order = 0
      up_delay      = 0
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_connect_ops.pub"
      disk_size     = "3G"
    }
  ]

  docker_registry = [
    {
      name          = "docker-registry"
      cores         = 1
      memory        = 1024
      ip            = "192.168.1.201"
      hostname      = "docker-registry"
      startup_order = 10
      up_delay      = 30
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_registry.pub"
      disk_size     = "40G"
    }
  ]

  k8s_controller = [
    {
      name          = "k8s-ctrlr"
      cores         = 2
      memory        = 2048
      ip            = "192.168.1.205"
      hostname      = "k8s-ctrlr"
      startup_order = 0
      up_delay      = 0
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_ctrlr.pub"
      disk_size     = "40G"
    }
  ]

  k8s_nodes = [
    for i in range(1, 2) : {
      name          = "k8s-node-${i}"
      cores         = 4
      memory        = 8192
      ip            = "192.168.1.20${i + 5}"
      hostname      = "k8s-node-${i}"
      startup_order = i
      up_delay      = 15
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_node.pub"
      disk_size     = "40G"
    }
  ]

  vm_definitions_combined = concat(local.k8s_controller, local.k8s_nodes)
}
