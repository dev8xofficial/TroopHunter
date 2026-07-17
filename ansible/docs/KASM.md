# ------------------------------------------------------------------------------------------------------------
# ------------ Kasm Workspaces | Dev Proxmox (192.168.1.125, node "pve") -------------------------------------
# ------------------------------------------------------------------------------------------------------------
#
# Kasm Workspaces runs as an IaC-managed tier: Terraform provisions the VM (module "kasm" ->
# modules/proxmox_vm_workspace, which has NO prevent_destroy so it is freely rebuildable), and
# Ansible installs + configures Kasm. Access: https://192.168.1.223  (admin@kasm.local / user@kasm.local).
# Full design + rationale: ../../KASM_DEPLOYMENT_PLAN.md
#
# Tier facts:
#   VM            kasm-dev @ 192.168.1.223   (vmid 7004, 4 vCPU / 8GB / 80G)
#   TF env        workspace "development", secrets/development.tfvars
#   Inventory     [kasm_dev] in inventories/combined/hosts.ini
#   Playbook      playbooks/main.kasm.yml   (roles: common, kasm)
#   Vault         secrets/kasm.yml  (kasm_admin_password, kasm_user_password) — separate password
#   Catalog       lean/browser-only: Chrome, Firefox, Chromium, Brave (kasm_enabled_workspaces)

# ------------------------------------------------------------------------------------------------------------
# ------------ One-time Proxmox host prep (only on a fresh Proxmox install) -----------------------------------
# ------------------------------------------------------------------------------------------------------------
# Run as root ON the Proxmox host. See KASM_DEPLOYMENT_PLAN.md §4 for the full runbook. Summary:

# 1) Terraform API user + token
pveum role add TerraformProv --privs "Datastore.AllocateSpace Datastore.AllocateTemplate Datastore.Audit \
Pool.Allocate Pool.Audit Sys.Audit Sys.Console Sys.Modify VM.Allocate VM.Audit VM.Clone \
VM.Config.CDROM VM.Config.Cloudinit VM.Config.CPU VM.Config.Disk VM.Config.HWType \
VM.Config.Memory VM.Config.Network VM.Config.Options VM.Migrate VM.Monitor VM.PowerMgmt SDN.Use"
pveum user add terraform@pam
pveum acl modify / --user terraform@pam --role TerraformProv
pveum user token add terraform@pam terraform --privsep 0      # copy the token secret into development.tfvars

# 2) Let `local` storage hold VM disks
pvesm set local --content images,rootdir,iso,vztmpl,backup,snippets

# 3) Build the template WITH qemu-guest-agent (so Terraform's agent=1 doesn't hang)
cd /var/lib/vz/template/iso
wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img
apt-get update && apt-get install -y libguestfs-tools
virt-customize -a jammy-server-cloudimg-amd64.img --install qemu-guest-agent
qm create 9000 --name ubuntu-22.04-minimal-template --memory 1024 --balloon 0 --cores 1 \
  --net0 virtio,bridge=vmbr0 --agent enabled=1 --ostype l26
qm importdisk 9000 jammy-server-cloudimg-amd64.img local
qm set 9000 --scsihw virtio-scsi-pci --scsi0 local:9000/vm-9000-disk-0.raw
qm set 9000 --ide2 local:cloudinit
qm set 9000 --boot c --bootdisk scsi0
qm resize 9000 scsi0 2.5G
qm template 9000

# ------------------------------------------------------------------------------------------------------------
# ------------ Deploy (from inside the devops container: `npm run start:devops`) ------------------------------
# ------------------------------------------------------------------------------------------------------------

# 1) Provision the VM
cd /workspace/terraform
terraform init
terraform workspace select development
terraform apply -var-file="secrets/development.tfvars" -target=module.kasm

# 2) (first time only) create the Kasm vault — its own password, NOT the connect_ops/github one
cd /workspace/ansible
ansible-vault create --vault-id kasm@prompt secrets/kasm.yml
#   kasm_admin_password: "..."
#   kasm_user_password:  "..."

# 3) Install + configure Kasm (Docker reuse -> download -> install -> trim to browsers)
cd /workspace/ansible
ansible-playbook -i inventories/combined/hosts.ini playbooks/main.kasm.yml \
  --limit kasm_dev --vault-id kasm@prompt
#   Idempotent: install is guarded by `creates:`; re-running is a no-op on the install step.
#   First launch of each browser pulls its image on-demand (~1-2 min once).

# ------------------------------------------------------------------------------------------------------------
# ------------ Use ------------------------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------
# Browse to https://192.168.1.223 (accept the self-signed cert), log in as admin@kasm.local.
# LAUNCH from the user dashboard (Kasm logo, top-left) — NOT Admin -> Workspaces (that page only
# Edits/Clones/Deletes). Click Chrome, then Firefox -> two isolated concurrent sessions.
# Concurrency is governed by the "All Users" group setting max_kasms_per_user (default 5).

# ------------------------------------------------------------------------------------------------------------
# ------------ Manage the catalog ----------------------------------------------------------------------------
# ------------------------------------------------------------------------------------------------------------
# Add/remove browsers by editing kasm_enabled_workspaces in playbooks/main.kasm.yml and re-running the
# playbook (the provision_workspaces task enables exactly that set, disables the rest; the agent pulls
# newly-enabled images and prunes disabled ones). friendly_names available from the default seed include:
#   Chrome, Firefox, Chromium, Brave, Edge, Tor-Browser, Terminal, Ubuntu Jammy, Ubuntu Noble,
#   Libre Office, Only Office, Postman, Insomnia, Signal, Zoom
# Inspect state on the box:
ssh -i terraform/secrets/id_rsa_kasm kasm-dev@192.168.1.223
sudo docker ps --filter name=kasm --format '{{.Names}}'
sudo docker exec kasm_db psql -U kasmapp -d kasm -tAc \
  "select friendly_name, enabled, available from images where enabled = true order by 1;"

# ------------------------------------------------------------------------------------------------------------
# ------------ Destroy / Recreate (fully IaC — module has no prevent_destroy) ---------------------------------
# ------------------------------------------------------------------------------------------------------------
cd /workspace/terraform
terraform workspace select development
terraform destroy -var-file="secrets/development.tfvars" -target=module.kasm     # only the Kasm VM
terraform apply   -var-file="secrets/development.tfvars" -target=module.kasm
# then re-run the Ansible playbook (step 3 above). The vault (secrets/kasm.yml) persists, so the admin
# password is unchanged. If you SSH to .223 manually afterward: ssh-keygen -R 192.168.1.223

# Kasm-only teardown (keep the VM):
ssh -i terraform/secrets/id_rsa_kasm kasm-dev@192.168.1.223 'sudo bash /opt/kasm_release/install.sh --uninstall'

# ------------------------------------------------------------------------------------------------------------
# ------------ Troubleshooting (issues hit during bring-up) --------------------------------------------------
# ------------------------------------------------------------------------------------------------------------
# * install.sh aborts instantly / "ASYNC FAILED jid=None": it needs --accept-eula (and --swap-size on a
#   0-swap VM). These are already in roles/kasm/tasks/install_kasm.yml. The installer's own log lives at
#   /home/kasm-dev/kasm_install_*.log (Ansible hides passwords via no_log, so read that log to debug).
# * No launch button: you're on Admin -> Workspaces (config only). Launch from the user dashboard.
# * Workspace stuck "installing": its image is still being pulled by the agent (kasm_agent check_images).
#   Watch: sudo docker images | grep kasmweb   — or pre-pull: sudo docker pull kasmweb/firefox:1.17.0
# * Disk filling up: only browser workspaces should be enabled; confirm kasm_enabled_workspaces and that
#   disabled images were pruned (never `docker image prune -a` — it would delete idle workspace images).
