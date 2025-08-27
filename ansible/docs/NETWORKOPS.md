# Objective

Turn the entire office + lab network into **Network-as-Code (NaC)**: every router, switch/VLAN, IP range, DNS/DHCP entry, server NIC, VM, and Kubernetes gateway is defined in Git and applied by CI.

---

## High‑Level Architecture

* **Source of Truth (SoT):** NetBox (IPAM/DCIM) — holds sites, racks, devices, IP ranges, VLANs, prefixes, VRFs, and DNS names.
* **Provisioning:**

  * **Terraform**: Proxmox VMs, MikroTik RouterOS config (via provider), MetalLB/Cloud resources (optional), NetBox data.
  * **Ansible**: OS-level config on VMs/PCs, RouterOS idempotent tasks, Kubernetes add-ons (Istio, CoreDNS customizations), app deploys.
* **Kubernetes Networking:** Cilium CNI (or Calico), **MetalLB** for L2/BGP load balancing, **Istio** for mesh/ingress.
* **Ingress Strategy:** Istio IngressGateway (LoadBalancer IP from MetalLB). Optionally **Cloudflare Tunnel** terminating at the gateway.
* **Observability/SecOps:** Prometheus + grafana, Loki + promtail, mikrotik\_exporter, NetFlow/sFlow (optional), system logs to a central sink, Vault/step-ca for PKI & secrets.

---

## Repository Layout (Monorepo-friendly)

```
net-as-code/
├─ README.md
├─ environments/
│  ├─ prod/
│  │  ├─ terraform.tfvars
│  │  ├─ inventory.ini
│  │  └─ values-overrides.yaml
│  └─ lab/
│     ├─ terraform.tfvars
│     ├─ inventory.ini
│     └─ values-overrides.yaml
├─ netbox/
│  ├─ docker-compose.yaml
│  ├─ init-data/ (sites, vlans, prefixes as YAML)
│  └─ terraform/ (netbox provider — optional)
├─ terraform/
│  ├─ providers.tf
│  ├─ proxmox/
│  │  ├─ vms.tf
│  │  ├─ networks.tf
│  │  └─ cloudinit/
│  ├─ mikrotik/
│  │  ├─ routeros.tf
│  │  └─ firewall.tf
│  ├─ metallb/
│  │  └─ metallb.tf
│  └─ dns/ (CoreDNS configmaps via helm_release or kubectl_manifest)
├─ ansible/
│  ├─ inventory/
│  │  └─ hosts.ini (your provided inventory)
│  ├─ group_vars/ all.yaml
│  ├─ roles/
│  │  ├─ routeros/
│  │  ├─ linux-desktop/
│  │  ├─ windows-desktop/
│  │  ├─ kubernetes/
│  │  │  ├─ cilium
│  │  │  ├─ metallb
│  │  │  └─ istio
│  │  └─ observability/
│  └─ playbooks/
│     ├─ bootstrap.yml (install deps, create users, ssh hardening)
│     ├─ router.yml (MikroTik config)
│     ├─ desktops.yml (Windows & Linux PCs)
│     ├─ servers.yml (Ubuntu nodes)
│     └─ k8s.yml (CNI, MetalLB, Istio)
├─ k8s/
│  ├─ base/
│  │  ├─ istio-system/
│  │  ├─ gateways/
│  │  └─ coredns-overrides/
│  └─ apps/
│     ├─ microservices/
│     └─ microfrontends/
└─ ci/
   ├─ github-actions/
   └─ gitlab-ci/
```

---

## IP Plan & VLANs (example — adjust to reality)

| VLAN | Name      | Subnet        | Purpose                                  |
| ---- | --------- | ------------- | ---------------------------------------- |
| 10   | mgmt      | 10.10.10.0/24 | infra mgmt: Proxmox, NetBox, out-of-band |
| 20   | servers   | 10.10.20.0/24 | Ubuntu servers/registries                |
| 30   | k8s-nodes | 10.10.30.0/24 | control plane + workers                  |
| 31   | k8s-svcs  | 10.10.31.0/24 | MetalLB VIPs/virtual IPs                 |
| 40   | desktops  | 10.10.40.0/23 | office PCs                               |
| 50   | guest     | 10.10.50.0/24 | isolated internet-only                   |
| 60   | storage   | 10.10.60.0/24 | NAS/backup                               |
| 70   | iot       | 10.10.70.0/24 | cameras/printers/etc                     |

> Maintain these in **NetBox** and generate DHCP/DNS/Firewall configs from it.

---

## MikroTik as Code

### Options

* **Terraform**: `ddelnano/routeros` provider (recommended for static/structured config).
* **Ansible**: `community.routeros` collection for procedural tasks and backups.

### Example: Terraform provider & basics

```hcl
terraform {
  required_providers {
    routeros = {
      source  = "ddelnano/routeros"
      version = ">= 1.77.0"
    }
  }
}

provider "routeros" {
  host     = var.routeros_host        # 192.168.1.1
  username = var.routeros_user
  password = var.routeros_password
  insecure = true
}

resource "routeros_interface_vlan" "vlan_servers" {
  interface = "bridge1"
  name      = "vlan20"
  vlan_id   = 20
}

resource "routeros_ip_address" "servers_gw" {
  interface = routeros_interface_vlan.vlan_servers.name
  address   = "10.10.20.1/24"
}
```

### DHCP (reservations generated from NetBox)

```hcl
resource "routeros_ip_pool" "servers_pool" {
  name   = "pool_servers"
  ranges = ["10.10.20.50-10.10.20.250"]
}

resource "routeros_ip_dhcp_server" "srv" {
  name       = "dhcp_servers"
  interface  = routeros_interface_vlan.vlan_servers.name
  address_pool = routeros_ip_pool.servers_pool.name
  lease_time = "12h"
}
```

### Multi‑WAN (failover + load-balance sketch)

```hcl
# Mark primary/backup with check-gateway
resource "routeros_ip_route" "wan1" { dst_address = "0.0.0.0/0" gateway = "ISP1_GW" distance = 1 check_gateway = "ping" }
resource "routeros_ip_route" "wan2" { dst_address = "0.0.0.0/0" gateway = "ISP2_GW" distance = 2 check_gateway = "ping" }

# NAT masquerade for each WAN
resource "routeros_ip_firewall_nat" "masq_wan1" { chain = "srcnat" out_interface = "wan1" action = "masquerade" }
resource "routeros_ip_firewall_nat" "masq_wan2" { chain = "srcnat" out_interface = "wan2" action = "masquerade" }
```

### Firewall policy (minimal zero-trust baseline)

```hcl
# Default drop input, allow established/related and mgmt VLAN
resource "routeros_ip_firewall_filter" "est_rel" { chain = "input" connection_state = ["established","related"] action = "accept" }
resource "routeros_ip_firewall_filter" "from_mgmt" { chain = "input" src_address = "10.10.10.0/24" action = "accept" }
resource "routeros_ip_firewall_filter" "drop_input" { chain = "input" action = "drop" }

# Inter-VLAN rules (servers ↔ desktops allowed HTTP/HTTPS; others denied by default)
resource "routeros_ip_firewall_filter" "srv_to_desktops" {
  chain = "forward"
  src_address = "10.10.20.0/24"
  dst_address = "10.10.40.0/23"
  protocol = "tcp"
  dst_port = "80,443"
  action = "accept"
}
```

### Backups (Ansible)

```yaml
- name: Backup MikroTik config
  hosts: routeros
  gather_facts: no
  tasks:
    - name: Export running config
      community.routeros.command:
        commands:
          - /export hide-sensitive
      register: cfg
    - copy:
        content: "{{ cfg.stdout[0] }}"
        dest: "backups/routeros/{{ inventory_hostname }}-{{ ansible_date_time.date }}.rsc"
```

---

## Proxmox as Code (Terraform + cloud-init)

```hcl
provider "proxmox" {
  pm_api_url      = var.pm_url
  pm_user         = var.pm_user
  pm_password     = var.pm_pass
  pm_tls_insecure = true
}

resource "proxmox_vm_qemu" "k8s_ctrlr" {
  name        = "k8s-ctrlr"
  target_node = "pve01"
  clone       = "ubuntu-24.04-cloudinit"
  cores       = 4
  memory      = 8192

  network {
    model  = "virtio"
    bridge = "vmbr0"
    tag    = 30              # VLAN k8s-nodes
  }

  ipconfig0 = "ip=10.10.30.6/24,gw=10.10.30.1"
  sshkeys   = file("~/.ssh/id_rsa.pub")
  ciuser    = "k8s-ctrlr"
}
```

---

## Kubernetes Networking

### CNI (Cilium)

Use Helm/Ansible to install Cilium with eBPF (encapsulation off if L2 stable), enable Hubble for observability.

### MetalLB

* **IP Pool:** allocate from VLAN 31 `10.10.31.100-10.10.31.150`.
* **Mode:** L2 (simple) or **BGP** to MikroTik (advanced). If MikroTik supports BGP, prefer BGP for deterministic routing.

Example (L2 mode):

```yaml
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata: { name: default, namespace: metallb-system }
spec:
  addresses:
    - 10.10.31.100-10.10.31.150
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata: { name: l2, namespace: metallb-system }
```

### Istio Ingress & mTLS

```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata: { name: public-gw, namespace: istio-system }
spec:
  selector: { istio: ingressgateway }
  servers:
    - port: { number: 80, name: http, protocol: HTTP }
      hosts: ["*.corp.local", "*.example.com"]
---
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata: { name: default, namespace: istio-system }
spec:
  mtls: { mode: STRICT }
```

### Example VirtualService for a microfrontend

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata: { name: webapp }
spec:
  hosts: ["web.corp.local"]
  gateways: ["istio-system/public-gw"]
  http:
    - route:
        - destination:
            host: webapp.frontend.svc.cluster.local
            port: { number: 80 }
```

> **Avoid NodePort** in production; prefer LoadBalancer (MetalLB) + Istio. Keep NodePort disabled at cluster level except for emergency break-glass.

---

## DNS & DHCP Strategy

* **DHCP:** MikroTik per-VLAN servers with reservations pulled from NetBox (export YAML → Terraform/Ansible render → apply).
* **DNS:**

  * **Internal:** CoreDNS in Kubernetes authoritative for `corp.local`. Stub/forward to MikroTik for legacy names, and to public resolvers for internet.
  * **External:** Cloudflare DNS for internet names. Use external-dns controller in cluster to create/update public records.

CoreDNS override example:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
  labels: { eks.amazonaws.com/component: coredns }
data:
  Corefile: |
    .:53 {
      errors
      health
      kubernetes cluster.local in-addr.arpa ip6.arpa {
        pods insecure
        fallthrough in-addr.arpa ip6.arpa
      }
      forward . 1.1.1.1 9.9.9.9
      cache 30
      reload
    }
    corp.local:53 {
      k8s_external
      forward . 10.10.31.10    # MikroTik or AD DNS if present
    }
```

---

## Managing Office PCs via Code

* **Windows PCs:** Ansible over WinRM (HTTPS). Baseline: set hostname, local admin policy, firewall, install agents (osquery/FleetDM), join domain (Samba AD/FreeIPA optional), configure NIC to DHCP on correct VLAN.
* **Linux PCs:** Ansible over SSH. Baseline: users/SSH keys, unattended-upgrades, FleetDM/osquery, NTP, tailscale/wireguard (optional ZT access).

Example playbook skeleton:

```yaml
- name: Baseline desktops
  hosts: desktops
  gather_facts: yes
  roles:
    - role: windows-desktop  # runs only when ansible_os_family == Windows
    - role: linux-desktop    # runs only when ansible_os_family == Debian
```

---

## Observability & Logging

* **Prometheus**: node\_exporter on servers/PCs, kube-state-metrics, cilium/istio metrics.
* **MikroTik**: `mikrotik_exporter` in Kubernetes scraping router; RouterOS → remote syslog to Loki via promtail/syslog-ng.
* **Grafana**: dashboards for WAN health, BGP/MetalLB, Istio requests, app SLIs (latency, error rate).
* **Blackbox**: probe HTTP(S) through both WANs to verify MultiWAN and alert on failover.

---

## Security & Access

* **VLAN Isolation**: deny inter-VLAN by default; allow least-privilege flows by service.
* **Zero Trust Admin**:

  * Bastion host (mgmt VLAN) with SSH CA (step-ca). No direct router/Proxmox logins from desktops.
  * WireGuard admin VPN for remote work (Terraform renders server+peers).
* **Kubernetes**: Istio mTLS **STRICT**, network policies via Cilium, external-dns access limited by DNS zones.
* **Secrets**: sops + age (Git-committed encrypted), or HashiCorp Vault.

---

## Backups & DR

* **RouterOS**: daily `/export hide-sensitive` to Git (private) via Ansible + offsite copy.
* **Proxmox**: `vzdump` nightly to NAS (VLAN 60). Keep 7 daily, 4 weekly, 3 monthly.
* **NetBox**: Postgres dumps nightly + media backups.
* **Kubernetes**: Velero to NAS/S3; etcd snapshots for control plane.

---

## CI/CD Flow

1. Developer changes NetBox YAML (new VLAN/subnet), MikroTik HCL, or K8s manifests.
2. GitHub Action:

   * `terraform fmt && validate`
   * `terraform plan` -> PR comment
   * `ansible-lint` and `yamllint`
3. On merge to `main`:

   * `terraform apply` with environment approval
   * `ansible-playbook` against `router`, `servers`, `desktops`
   * `kubectl apply` (or ArgoCD sync) for K8s.

---

## Runbooks (Ops-as-Code)

### Add a New Office PC

1. Create device in NetBox with MAC & intended VLAN.
2. Commit DHCP reservation YAML.
3. CI renders MikroTik DHCP lease and applies.
4. Plug PC — gets correct IP + baseline via Ansible.

### Publish a New Microservice

1. Add Helm chart or K8s manifests in `k8s/apps/microservices/<svc>`.
2. Expose via `VirtualService` + `DestinationRule`.
3. External DNS creates public record; Istio Gateway already listening.

### Add a Public DNS name via Cloudflare Tunnel (optional)

1. Create `Ingress`/`VirtualService` with host `app.example.com`.
2. External-dns commits the DNS record; Cloudflare Tunnel routes to Ingress VIP.

---

## Mapping to Your Current Inventory

Use your existing groups:

```
[scraper]
192.168.1.202 ansible_user=ubuntu-server

[connect_ops]
192.168.1.200 ansible_user=connect-ops

[docker]
192.168.1.201 ansible_user=docker-registry

[k8s_controller]
192.168.1.205 ansible_user=k8s-ctrlr

[k8s_workers]
192.168.1.206 ansible_user=k8s-node-1
```

* Add a new group `[routeros] 192.168.1.1 ansible_user=admin ansible_password=***` for MikroTik tasks.
* Tag server NICs in Proxmox to the right VLANs (e.g., controller/workers to VLAN 30).
* Allocate a MetalLB VIP range in VLAN 31 (e.g., `10.10.31.100-150`).

---

## Next Steps (Concrete)

1. **Spin up NetBox** (docker-compose) and import initial sites/VLANs/prefixes.
2. **Commit a first Terraform stack** for MikroTik: create VLANs 10/20/30/31/40 and gateway IPs.
3. **Move Proxmox VMs to VLAN tagging** via Terraform; re-IP using cloud-init.
4. **Install Cilium + MetalLB + Istio** using Ansible role `kubernetes/`.
5. **Cut traffic** to Istio Ingress VIP and deprecate NodePorts.
6. **Bring Observability online** (Prometheus, Grafana, Loki) and dashboards.
7. **Automate backups** (RouterOS export, Proxmox vzdump, NetBox DB, Velero).

---

## Notes & Alternatives

* If BGP with MikroTik is overkill, start with **MetalLB L2**. Upgrade to BGP later.
* If NetBox is heavy for now, begin with YAML in Git as SoT, then migrate to NetBox.
* Consider **FreeIPA/Samba AD** for centralized auth for Windows/Linux.
* For office app access control, adopt per-VLAN **DNS sinkhole** and **L7 proxy** (e.g., Traefik/Envoy) instead of blanket firewall blocks.

---

## Checklists

* [ ] NetBox running, SoT populated
* [ ] RouterOS managed by TF/Ansible
* [ ] Proxmox VMs created by Terraform
* [ ] Cilium + MetalLB + Istio installed
* [ ] CoreDNS overrides applied
* [ ] Observability live with alerts
* [ ] Backups & DR tested
* [ ] CI with plan/apply gates and secrets hygiene

---

## Appendix: Ansible Inventory Example (merged)

```ini
[routeros]
router ansible_host=192.168.1.1 ansible_user=admin ansible_password=__vault__

[servers:children]
docker
k8s_controller
k8s_workers

[desktops]
pc01 ansible_host=10.10.40.21 ansible_user=localadmin
pc02 ansible_host=10.10.40.22 ansible_user=localadmin
```

> With this blueprint, you can drive **every** network element from Git: change a VLAN/DNS/mTLS rule, open a PR, and let CI roll it out safely with audit trails.
