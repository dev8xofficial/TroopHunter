# Kasm Workspaces — Infrastructure-as-Code Deployment Plan

> **Single source of truth** for adding Kasm Workspaces to the TroopHunter monorepo as an
> IaC-managed tier (Terraform provisions the VM, Ansible configures Kasm). Work from this
> document; it captures every locked decision, every manual step you must perform, and every
> file Claude will author. Update the checkboxes as we progress.

**Legend**
- `[YOU]` — a manual step you perform (Proxmox host, secrets, running pipelines).
- `[CLAUDE]` — a file/change Claude authors in the repo (no infra side effects).
- `[GATE]` — a validation checkpoint; do not proceed until it passes.

---

## 0. Progress tracker

| # | Milestone | Owner | Status |
|---|-----------|-------|--------|
| P0 | Proxmox host prep (role/user/token, storage, template) | `[YOU]` | ☑ done |
| P0 | Report `hostname` (`pve`) + regenerated token secret | `[YOU]` | ☑ done |
| M1 | Terraform: workspace VM module + `kasm-dev` tier | `[CLAUDE]` build ☑ → `[YOU]` apply ☑ | ✅ VM up @ .223, SSH OK |
| M2 | Ansible: inventory group + skeleton playbook (`common`) | `[CLAUDE]` build ☑ → `[YOU]` run ☑ | ✅ `common` green, sudo OK |
| M3 | Ansible: Docker reuse + guarded Kasm install | `[CLAUDE]` build ☑ → `[YOU]` run ☑ | ✅ 10 containers up, admin login OK |
| M4 | Workspace images (installer seed) + lean browser-only trim | `[CLAUDE]` build ☑ → `[YOU]` run ☑ | ✅ Chrome+Firefox+Chromium+Brave; 2 concurrent verified |
| M5 | Lifecycle (destroy/recreate) + [docs/KASM.md](ansible/docs/KASM.md) | `[CLAUDE]` build ☑ → `[YOU]` verify ☑ | ✅ rebuild proven, runbook written |
| M6 | Container-egress fix (iptables-legacy + module/sysctl persistence + docker-ce 27.x pin) — see [ansible/memory.md](ansible/memory.md) | `[CLAUDE]` build ☑ → `[YOU]` clean rebuild ☐ | 🔨 built; validates on rebuild |

---

## 1. Locked decisions

| Item | Value | Rationale |
|------|-------|-----------|
| Proxmox host | `192.168.1.125` (dev box, fresh install) | Same IP as existing `development.tfvars`; box was reinstalled |
| Terraform env | workspace `development`, `secrets/development.tfvars` | The `.125` endpoint already maps to this env |
| `target_node` | **`pve`** | New box's hostname is `pve`; renaming a PVE node is risky and unnecessary |
| Kasm VM | `kasm-dev` @ `192.168.1.223` | Matches repo's `-dev` suffix + dev IP block (`.220/.221/.225/.226`) |
| VMID | `base_kasmid = 7003` → vmid `7004` | Free; dev already uses `7001/7002/7101/7102` |
| Sizing | 8 vCPU / 16384 MB / 80 GB | Each Chrome workspace = 2 cores/2.77GB; 2 concurrent + video + Kasm core saturated 4 vCPU, so bumped to 8/16 |
| TF module | new `modules/proxmox_vm_workspace` (no `prevent_destroy`) | Workspace hosts are disposable cattle; must be destroy/recreate-able via IaC |
| Docker install | reuse existing task-files via `include_tasks` (not the `docker` role) | The `docker` role also runs registry/verdicco setup — wrong for Kasm |
| Provider auth | `terraform@pam!terraform` API token, regenerated on this box | Old token (`82dc0c09…`) belonged to the previous install and is dead |
| Workspaces | Chrome **+** Firefox images, sized/limited for ≥2 concurrent sessions | "Two images" and "two concurrent sessions" are both satisfied |
| Vault | **separate** vault password for `secrets/kasm.yml` (`--vault-id kasm@prompt`) | Isolated from `connect_ops.yml` / `github_token` per your request |

---

## 2. Architecture overview

```
Terraform (development workspace, target_node=pve)
    │  module "kasm" → modules/proxmox_vm_workspace
    ▼
Proxmox VM  kasm-dev @ 192.168.1.223  (clone of ubuntu-22.04-minimal-template)
    │  outputs: name / ip   (manually reflected into the static Ansible inventory)
    ▼
Ansible  playbooks/main.kasm.yml   (--limit kasm_dev)
    ├─ role: common            → sudo, update, base packages
    └─ role: kasm
         ├─ install_dependencies.yml → include docker install task-files (REUSE)
         ├─ download_kasm.yml        → get_url + unarchive (pinned version)
         ├─ install_kasm.yml         → install.sh, vault passwords, GUARDED by marker
         ├─ configure_kasm.yml       → Admin API: settings + session limits (idempotent)
         └─ provision_workspaces.yml → Admin API: enable Chrome + Firefox (check-then-create)
    ▼
Kasm Workspaces  https://192.168.1.223  → 2 isolated browser sessions concurrently
```

**Responsibility split (unchanged repo philosophy)**
- **Terraform** = the VM only (clone, CPU/RAM/disk, IP, cloud-init user, SSH key, boot order).
- **Ansible** = OS prep → Docker (reused) → download → install (idempotent) → configure → provision.
- **Kasm installer** = owns the container topology (postgres/redis/api/manager/agent/proxy/guac). We drive it, then use its **API** for everything repeatable.

**Access:** Kasm serves HTTPS/443 (self-signed). On-LAN reachable at `https://192.168.1.223`; also reachable over your tailnet because `connect_ops` already advertises `192.168.1.0/24` — **no Tailscale install on the Kasm box.**

---

## 3. Allocation reference (all envs)

To keep every Terraform workspace valid (the new variables have no defaults), `kasm_*` values are
added to **all** env tfvars. Only `development` is built now (via `-target=module.kasm`).

| Env / tfvars | kasm_name | kasm_ip | base_kasmid → vmid | Built now? |
|--------------|-----------|---------|--------------------|-----------|
| development | `kasm-dev` | `192.168.1.223` | `7003` → `7004` | **Yes** |
| production | `kasm-prod` | `192.168.1.203` | `5003` → `5004` | No (defined only) |
| staging | `kasm-stag` | `192.168.1.213` | `6003` → `6004` | No — *confirm staging block* |
| default (`terraform.tfvars`) | `kasm` | `192.168.1.223` | `8003` → `8004` | No |

> ⚠️ Staging values are a proposal — confirm against your `staging.tfvars` IP/VMID scheme before M1 lands.

---

## 4. `[YOU]` Prerequisite: Proxmox host preparation (192.168.1.125)

Run as `root` on the Proxmox host. **Steps 1–3 execute locally on the host (no IP needed).**

### 4.1 Terraform role, user, token, ACL
```bash
pveum role add TerraformProv --privs "Datastore.AllocateSpace Datastore.AllocateTemplate Datastore.Audit \
Pool.Allocate Pool.Audit Sys.Audit Sys.Console Sys.Modify VM.Allocate VM.Audit VM.Clone \
VM.Config.CDROM VM.Config.Cloudinit VM.Config.CPU VM.Config.Disk VM.Config.HWType \
VM.Config.Memory VM.Config.Network VM.Config.Options VM.Migrate VM.Monitor VM.PowerMgmt SDN.Use"

pveum user add terraform@pam
pveum acl modify / --user terraform@pam --role TerraformProv
pveum user token add terraform@pam terraform --privsep 0
```
The last command prints a **`value`** — that is your `pm_api_token_secret`, shown **once**. Save it.
Your `pm_api_token_id` is `terraform@pam!terraform`.
> `@pam` token auth needs no Linux user. If your PVE build objects, `terraform@pve` behaves identically for tokens.

### 4.2 Allow `local` storage to hold VM disks
```bash
pvesm set local --content images,rootdir,iso,vztmpl,backup,snippets
```

### 4.3 Build the `ubuntu-22.04-minimal-template` (with guest agent)
```bash
cd /var/lib/vz/template/iso
wget https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img

apt-get update && apt-get install -y libguestfs-tools
virt-customize -a jammy-server-cloudimg-amd64.img --install qemu-guest-agent   # so agent=1 doesn't hang apply

qm create 9000 --name ubuntu-22.04-minimal-template --memory 1024 --balloon 0 --cores 1 \
  --net0 virtio,bridge=vmbr0 --agent enabled=1 --ostype l26
qm importdisk 9000 jammy-server-cloudimg-amd64.img local
qm set 9000 --scsihw virtio-scsi-pci --scsi0 local:9000/vm-9000-disk-0.raw
qm set 9000 --ide2 local:cloudinit
qm set 9000 --boot c --bootdisk scsi0
qm resize 9000 scsi0 2.5G           # Terraform grows the clone to 80G
qm template 9000
```
Confirm the default bridge exists: `ip link show vmbr0`.

### 4.4 `[GATE]` Verify before Terraform
```bash
curl -k -H "Authorization: PVEAPIToken=terraform@pam!terraform=PASTE_SECRET" \
  https://192.168.1.125:8006/api2/json/version      # → JSON version, not 401
qm list | grep 9000                                  # template present
pvesm status | grep local                            # storage active
hostname                                             # expected: pve
```

### 4.5 Report back to Claude
- `hostname` output (expected `pve` — already assumed in the plan).
- Token secret: paste it, or say "saved" and Claude leaves `PASTE_HERE` in `development.tfvars` for you.

---

## 5. Milestones

### M1 — `[CLAUDE]` Terraform VM tier → `[YOU]` apply

**New file: `terraform/modules/proxmox_vm_workspace/main.tf`** — identical to
`modules/proxmox_vm/main.tf` **except the `lifecycle` block drops `prevent_destroy`:**
```hcl
  lifecycle {
    ignore_changes = [sshkeys, network]   # prevent_destroy intentionally REMOVED
  }
```
Plus `variables.tf` / `outputs.tf` copied verbatim from `modules/proxmox_vm`.

**Edit `terraform/locals.tf`** — add:
```hcl
  kasm = [
    {
      name          = "${var.kasm_name}"
      cores         = 4
      memory        = 8192
      ip            = "${var.kasm_ip}"
      hostname      = "${var.kasm_name}"
      startup_order = 15
      up_delay      = 30
      ssh_key_path  = "${var.ssh_keys_dir}id_rsa_kasm.pub"
      disk_size     = "80G"
    }
  ]
```

**Edit `terraform/variables.tf`** — add `kasm_name`, `kasm_ip`, `base_kasmid` (typed, no defaults).

**Edit `terraform/main.tf`** — add:
```hcl
module "kasm" {
  source         = "./modules/proxmox_vm_workspace"
  vm_definitions = local.kasm
  vm_template    = var.vm_template
  target_node    = var.target_node
  base_vmid      = var.base_kasmid
}
```

**Edit `terraform/outputs.tf`** — add `deployed_kasm_names` / `deployed_kasm_ips` from `module.kasm`.

**Edit tfvars** — add `kasm_name/kasm_ip/base_kasmid` per §3 to `development.tfvars`,
`production.tfvars`, `staging.tfvars`, `terraform.tfvars`; in `development.tfvars` also set
`target_node = "pve"` and refresh `pm_api_token_secret`.

**New secret: `terraform/secrets/id_rsa_kasm[.pub]`** — `ssh-keygen -t rsa -b 4096 -f terraform/secrets/id_rsa_kasm -N ""` (gitignored by `secrets/id_rsa*`).

**`[YOU]` Execute (inside the ansible/terraform container, `/workspace`):**
```bash
cd terraform/
terraform init
terraform workspace select development
terraform plan  -var-file="secrets/development.tfvars" -target=module.kasm
terraform apply -var-file="secrets/development.tfvars" -target=module.kasm
```
**`[GATE]`** Plan shows exactly **one** new VM (`kasm-dev`), **zero** changes to other tiers;
after apply, `ssh -i secrets/id_rsa_kasm kasm-dev@192.168.1.223` succeeds.

---

### M2 — `[CLAUDE]` Inventory + skeleton playbook → `[YOU]` run

**Edit `ansible/inventories/combined/hosts.ini`** — add:
```ini
[kasm_dev]
kasm-dev ansible_host=192.168.1.223 ansible_user=kasm-dev ansible_ssh_private_key_file=~/.ssh/id_rsa_kasm env=dev
```
**New file: `ansible/playbooks/main.kasm.yml`** — `roles: [common]` only (skeleton).
**New secret: mirror `id_rsa_kasm[.pub]` into `ansible/secrets/`** (the repo keeps keys in both trees).

**`[YOU]` Execute:**
```bash
cd ansible/
ansible-playbook -i inventories/combined/hosts.ini playbooks/main.kasm.yml --limit kasm_dev
```
**`[GATE]`** Host reachable; base packages installed; playbook green.

---

### M3 — `[CLAUDE]` Docker reuse + guarded Kasm install → `[YOU]` run

**New role `ansible/roles/kasm/`:**
```
tasks/
  main.yml                  # include_tasks: install_dependencies, download_kasm, install_kasm
  install_dependencies.yml  # include ../../docker/tasks/install_docker.yml
                            #         ../../docker/tasks/install_docker_compose.yml
                            #         ../../docker/tasks/add_user_to_docker_group.yml
  download_kasm.yml         # get_url {{ kasm_release_url }} → unarchive to /opt/kasm_release
  install_kasm.yml          # marker-guarded install.sh with vault passwords
handlers/main.yml
```
Key snippets (blueprint):
```yaml
# download_kasm.yml
- name: Check if Kasm already installed
  stat: { path: /opt/kasm/current/docker/docker-compose.yaml }
  register: kasm_installed

- name: Download + extract Kasm release
  when: not kasm_installed.stat.exists
  block:
    - get_url:    { url: "{{ kasm_release_url }}", dest: /tmp/kasm_release.tar.gz }
    - unarchive:  { src: /tmp/kasm_release.tar.gz, dest: /opt/, remote_src: true }

# install_kasm.yml (only when not kasm_installed.stat.exists)
- command: >
    bash /opt/kasm_release/install.sh
    --admin-password {{ kasm_admin_password }}
    --user-password  {{ kasm_user_password }}
    --db-password    {{ kasm_db_password }}
    --redis-password {{ kasm_redis_password }}
  args: { creates: /opt/kasm/current/docker/docker-compose.yaml }
```
Config vars live in the **playbook `vars:`** (repo convention — roles carry no `defaults/`);
secrets come from the vault file (§6). Pin `kasm_release_url` to a specific release from
`https://www.kasmweb.com/downloads` (the URL carries a version+hash — confirm current value).

**`[YOU]` Execute:**
```bash
ansible-playbook -i inventories/combined/hosts.ini playbooks/main.kasm.yml \
  --limit kasm_dev --vault-id kasm@prompt
```
**`[GATE]`** `https://192.168.1.223` loads the Kasm login; **re-running the playbook is a no-op** (idempotency proof).

---

### M4 — `[CLAUDE]` Workspace images via installer seeding → `[YOU]` run

**Pivot from the original plan.** Live inspection of the running instance showed:
- `images` table was **empty** — Kasm 1.17 does not seed workspaces unless asked.
- The public API uses `api_key`+`api_key_secret` and **registry-based install is undocumented** — scripting `create_image` blind would be fragile and break on Kasm upgrades.
- `max_kasms_per_user = 5` already → **2 concurrent sessions need no session-limit change.**
- Kasm ships its own tested seeding: `db_init` + `conf/database/seed_data/default_images_amd64.yaml`, invoked by the installer's `--default-images` flag.

**Decision:** seed via the installer, not the API. In [install_kasm.yml](ansible/roles/kasm/tasks/install_kasm.yml) the install command now carries:
```
--default-images --no-pull-images
```
`--default-images` (`SEED_IMAGES=true`) registers Chrome, Firefox, Chromium, Brave, Edge, Tor, Terminal, Ubuntu desktops, office apps — all enabled. `--no-pull-images` (which must follow it) skips the ~30GB bulk pull; the agent pulls each image **on-demand at first launch** (~1–2 min once). Core service images always install regardless. The role also prints the seeded image list for the gate.

Because the current box was installed *before* this flag and the install is `creates:`-guarded, M4 is applied by the **M5 destroy/recreate** (below) — one clean rebuild installs images via Kasm's native path and validates the full IaC lifecycle at once.

> Future custom/GPU images and API-driven creation remain the extensibility surface (Kasm Admin API / UI), layered on top of this solid default baseline.

**`[GATE]`** After the rebuild: log into `https://192.168.1.223`, and the **Workspaces** view lists Chrome/Firefox/etc. Launch **Chrome and Firefox together** → two isolated sessions run concurrently.

---

### M5 — `[CLAUDE]` Lifecycle + docs → `[YOU]` verify

- **New file `ansible/docs/KASM.md`** — deploy/destroy runbook in the existing `HELP.md` style.
- Document destroy/recreate (works because `proxmox_vm_workspace` has no `prevent_destroy`).

**`[GATE]`** Full cycle reproduces the system:
```bash
# destroy
cd terraform/ && terraform destroy -var-file="secrets/development.tfvars" -target=module.kasm
# recreate
terraform apply  -var-file="secrets/development.tfvars" -target=module.kasm
cd ../ansible/ && ansible-playbook -i inventories/combined/hosts.ini \
  playbooks/main.kasm.yml --limit kasm_dev --vault-id kasm@prompt
```

---

## 6. Secrets & vault workflow (separate vault)

Kasm secrets are isolated from existing vault files under their **own password**:
```bash
cd ansible/
ansible-vault create --vault-id kasm@prompt secrets/kasm.yml
```
Contents (only these two — Kasm auto-generates its internal db/redis passwords, which we never consume externally):
```yaml
kasm_admin_password: "..."
kasm_user_password:  "..."
```
Run any Kasm playbook with `--vault-id kasm@prompt`. `secrets/` is fully gitignored in `ansible/`.
Terraform secrets (`pm_api_token_secret`, SSH keys) stay in `terraform/secrets/` (plaintext tfvars, gitignored) — unchanged from repo convention.

---

## 7. End-to-end execution order

1. `[YOU]` §4 Proxmox prep → §4.4 gate → §4.5 report.
2. `[CLAUDE]` M1 files → `[YOU]` `terraform apply -target=module.kasm` → gate.
3. `[CLAUDE]` M2 files → `[YOU]` playbook (`common`) → gate.
4. `[CLAUDE]` M3 files → `[YOU]` playbook (install) → gate.
5. `[CLAUDE]` M4 files → `[YOU]` playbook (provision) → gate: two concurrent browsers.
6. `[CLAUDE]` M5 docs → `[YOU]` destroy/recreate cycle → gate.

Each `[CLAUDE]` step is reviewed before the corresponding `[YOU]` execution.

---

## 8. Validation strategy

- **Per milestone gates** above are mandatory; no milestone starts until the prior gate passes.
- **Idempotency** is proven by re-running each Ansible milestone and observing `changed=0` on the Kasm-owned tasks.
- **Isolation** is proven by two concurrent sessions with independent cookies/state.

## 9. Rollback / destroy-and-recreate

- Terraform: `-target=module.kasm` destroy works (no `prevent_destroy`); other tiers untouched.
- Kasm only: `sudo bash /opt/kasm_release/install.sh --uninstall` or container teardown, then re-run M3–M4.
- Nothing in this plan modifies the existing k8s / registry / connect-ops tiers.

## 10. Future enhancements (already accommodated)

- More images → more entries in `provision_workspaces.yml`.
- Persistent profiles → Kasm persistent volume mapping (additive task).
- GPU workspaces → a `proxmox_vm_workspace` def with PCI passthrough + GPU image.
- API-driven workspace creation → the Admin API is already wired at M4.
- Dynamic inventory from TF outputs → optional replacement for the static inventory entry.

## 11. Open items still needed from you

- [x] `hostname` confirmation → `pve` (tfvars updated).
- [x] Regenerated `pm_api_token_secret` → pasted in `development.tfvars`.
- [x] Staging kasm values → `kasm-stag` / `.213` / base `6003` (fits staging block `.210/.211/.215`).
- [x] `192.168.1.223` free → VM applied and reachable.
- [x] `kasm_release_url` pinned → `kasm_release_1.17.0.7f020d.tar.gz` (sha256 `22a293ea…`).
