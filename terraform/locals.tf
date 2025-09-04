# ✅ Global data maps/lists

locals {
  connect_ops = [
    {
      name          = "${var.connect_ops_name}"
      cores         = 1
      memory        = 512
      ip            = "${var.connect_ops_ip}"
      hostname      = "${var.connect_ops_name}"
      startup_order = 0
      up_delay      = 0
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_connect_ops.pub"
      disk_size     = "3G"
    }
  ]

  docker_registry = [
    {
      name          = "${var.docker_registry_name}"
      cores         = 1
      memory        = 1024
      ip            = "${var.docker_registry_ip}"
      hostname      = "${var.docker_registry_name}"
      startup_order = 10
      up_delay      = 30
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_registry.pub"
      disk_size     = "60G"
    }
  ]

  k8s_controller = [
    {
      name          = "${var.k8s_controller_name}"
      cores         = 2
      memory        = 2048
      ip            = "${var.k8s_controller_ip}"
      hostname      = "${var.k8s_controller_name}"
      startup_order = 0
      up_delay      = 0
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_ctrlr.pub"
      disk_size     = "40G"
    }
  ]

  k8s_nodes = [
    for i in range(1, 2) : {
      name          = "${var.k8s_nodes_name}-${i}"
      cores         = 4
      memory        = 8192
      ip            = "${var.k8s_nodes_ip}${i + 5}"
      hostname      = "${var.k8s_nodes_name}-${i}"
      startup_order = i
      up_delay      = 15
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_node.pub"
      disk_size     = "40G"
    }
  ]

  vm_definitions_combined = concat(local.k8s_controller, local.k8s_nodes)
}
