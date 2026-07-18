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

  kasm = [
    {
      name          = "${var.kasm_name}"
      cores         = 8
      memory        = 16384
      ip            = "${var.kasm_ip}"
      hostname      = "${var.kasm_name}"
      startup_order = 15
      up_delay      = 30
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_kasm.pub"
      disk_size     = "80G"
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

  # backbone-db — Postgres 17 + pgvector on a dedicated VM (D-HW1/D5/B10: the DB is NOT in k8s).
  # Uses the base proxmox_vm module (keeps prevent_destroy — this host holds data).
  backbone_db = [
    {
      name          = "${var.backbone_db_name}"
      cores         = 2
      memory        = 4096
      ip            = "${var.backbone_db_ip}"
      hostname      = "${var.backbone_db_name}"
      startup_order = 5
      up_delay      = 15
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_node.pub" # reuse a container-mounted key (test bench)
      disk_size     = "40G"
    }
  ]

  # backbone-k3s — single-node K3s running the STATELESS layer (pgbouncer + ollama-embed → the DB VM).
  # Uses proxmox_vm_workspace (no prevent_destroy) so the cluster is rebuildable during M1 testing.
  backbone_k3s = [
    {
      name          = "${var.backbone_k3s_name}"
      cores         = 4
      memory        = 8192
      ip            = "${var.backbone_k3s_ip}"
      hostname      = "${var.backbone_k3s_name}"
      startup_order = 6
      up_delay      = 15
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_k8s_node.pub"
      disk_size     = "40G"
    }
  ]

  vm_definitions_combined = concat(local.k8s_controller, local.k8s_nodes)
}
