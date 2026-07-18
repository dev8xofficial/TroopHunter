# Ansible / Infra Memory — hard-won lessons

Operational notes that are NOT obvious from the code. Read this before debugging
networking or Docker on the Proxmox VMs.

---

## 🔴 Docker containers can't reach the internet on Ubuntu 22.04 + Proxmox (the multi-day bug)

**This is the recurring "Docker + Ubuntu + Proxmox never works" problem.** It has cost
days before. Root cause and the permanent fix are below.

### Symptom
- A container can reach the **LAN** (the Proxmox host, `192.168.1.1`, other LAN IPs) but
  **cannot reach the internet** (`1.1.1.1`, `8.8.8.8`, any public IP) — connections just
  **time out**.
- Apps inside containers (e.g. a Kasm browser session) show pages "stuck loading" / no
  DNS results, and logs show `[Errno 101] Network is unreachable` or timeouts.
- The **host itself has full internet**, and **`docker pull` works** — which misleads you
  into thinking networking is fine. It isn't: `docker pull` runs in the **daemon** on the
  **host** network; only traffic originating **inside a container** is broken.

### How it was proven (tcpdump on eth0)
```
container SYN  ->  192.168.1.223 > 1.1.1.1:443   [S]     (masquerade works, leaves host)
reply          ->  1.1.1.1 > 192.168.1.223:443   [S.]    (SYN-ACK returns to the host)
container       (never receives it, keeps retrying the SYN -> timeout)
```
The return packet reaches the host but is **not forwarded back into the container**.

### Root cause
- Ubuntu 22.04 points the `iptables` command at the **nft backend** (`iptables v1.8.7 (nf_tables)`).
- On kernel 5.15, Docker's nft-generated FORWARD / conntrack rules **silently drop the
  container's return traffic**. The rules *look* correct (`DOCKER-CT` has the
  `RELATED,ESTABLISHED` accept), but they don't take effect — adding a manual
  `iptables -I DOCKER-USER ... ESTABLISHED -j ACCEPT` does **nothing**.
- **Docker version made it worse, not the sole cause.** It was originally broken on Docker
  **29.6.1** (pulled by `state: latest`). Downgrading to **27.5.1 did NOT fix it by itself**
  — the nft *backend* is the real problem. Docker **28+/29 default to the nft firewall
  backend**, so they reintroduce the break even after switching the alternatives.

### Fixes tried (in `roles/kasm/tasks/configure_docker_networking.yml`) — NECESSARY but NOT SUFFICIENT
Applied **before** Docker is installed. These are correct hygiene and stay in place, but on
this host they DID NOT restore container egress on their own (verified: all applied, egress
still timed out):
1. **Legacy iptables backend**: `update-alternatives --set iptables /usr/sbin/iptables-legacy` (+ ip6tables).
2. **`br_netfilter` + `nf_conntrack`** persisted via `/etc/modules-load.d/kasm-docker.conf`
   (NOT loaded by default on the minimal cloud image; vanish on reboot — a Terraform resize
   reboot silently re-breaks things if not persisted).
3. **Sysctls** (`/etc/sysctl.d/99-kasm-docker.conf`): `net.ipv4.ip_forward=1`,
   `net.bridge.bridge-nf-call-iptables=1`, `net.bridge.bridge-nf-call-ip6tables=1`.
4. **Pin `docker-ce`/`docker-ce-cli` to 27.x** (`/etc/apt/preferences.d/docker-ce.pref`,
   Pin-Priority 1001) to keep 28+/29's nft-default backend out. Validated present: 27.5.1.

### Deeper diagnosis (2026-07-16): conntrack tracks it, reply is un-NAT'd, but never delivered
`conntrack -L` during a failed connection shows `tcp SYN_RECV src=172.17.0.2 dst=1.1.1.1 ...
[reply] src=1.1.1.1 dst=192.168.1.223 dport=<sport>` — i.e. netfilter SEES the SYN-ACK and
has the right NAT mapping, but the un-NAT'd reply is not delivered to `docker0`/the container.
This points BELOW iptables config, at packet delivery.

### PRIME remaining suspect: NIC checksum/GSO offload on Proxmox virtio
Symptom (packet flows, conntrack tracks, un-NAT'd reply silently dropped) matches the classic
Proxmox/KVM virtio offload bug: a VM has no real NIC to compute checksums, so forwarded/NAT'd
packets get bad checksums and are dropped. **Next thing to try** (bake into Ansible if it works):
```bash
ethtool -K eth0 tx off        # and/or: ethtool -K eth0 tx-checksum-ip-generic off
ethtool -K docker0 tx off
systemctl restart docker && test container egress
```

### VERDICT (2026-07-17): it is a kernel/virtualization bug — change the OS
Ruled out EVERYTHING at the config level on Ubuntu 22.04, egress still timed out:
iptables-legacy, docker-ce 27.5.1, br_netfilter+nf_conntrack+sysctls, checksum/GSO offload
(`ethtool -K eth0/docker0 tx off`), AND `iptables -P FORWARD ACCEPT` + `rp_filter=0`
(firewall fully open). Conntrack tracks the flow and un-NATs the reply, but the kernel does
not deliver it to the container. This is below the firewall — a kernel 5.15 / Proxmox virtio
defect. **Do NOT keep tuning Docker/iptables on 22.04. Rebuild the VM on a newer-kernel OS.**

### UPDATE (2026-07-17): it is NOT the guest OS — it's the Proxmox host / network
Rebuilt on **Debian 12 (kernel 6.1)** with Docker 29.6.2: container→internet egress FAILS
identically to Ubuntu 22.04 (kernel 5.15). Return SYN-ACK arrives at the VM with a CORRECT
checksum, conntrack tracks it (SYN_RECV), but it is never delivered to `docker0`/the container.
Container→LAN works; container→internet does not. Two unrelated kernels fail identically ⇒ the
drop is BELOW the guest, in the Proxmox host bridge / virtualization / physical network, on the
FORWARDED (NAT'd) sub-flow only (the VM's OWN internet works fine).

**Everything the VM-scoped IaC (Terraform+Ansible) controls has been ruled out.** The remaining
investigation is HOST-side (needs Proxmox host access), in priority order:
1. Proxmox host firewall — `pve-firewall status`; `/etc/pve/firewall/cluster.fw`. Disable/inspect.
2. Offload on the HOST bridge + physical NIC (disabling it IN the guest does nothing — the
   coalescing/segmentation happens on the host):
   ```bash
   ls /sys/class/net/vmbr0/brif/                 # find the physical NIC
   ethtool -K vmbr0 gro off gso off tso off tx off rx off sg off
   ethtool -K <physical-nic> gro off gso off tso off tx off rx off sg off
   ```
3. Confirm the VM's NIC "firewall" flag is off in the Proxmox GUI (TF sets firewall=false).
4. On the host, tcpdump `vmbr0` and the physical NIC during a container→1.1.1.1 attempt to see
   where the un-NAT'd reply is lost between the wire and the VM.
NOTE: the whole Kasm IaC (Terraform tier, Ansible role, image seeding, lean catalog) is complete
and correct; this egress issue is the ONLY blocker and it is environmental, not a Kasm/IaC bug.

### HANDOFF (2026-07-17): unresolved — narrowed to host virtualization / home-network layer
Paused after exhaustive diagnosis WITH root SSH on the Proxmox host. Below is a complete,
shareable write-up (post this to the Proxmox and/or MikroTik forums to find others).

**Topology:** Dell T7500 (Proxmox 8.2, kernel 6.8, host IP .125) → 8-port switch →
MikroTik RB750Gr3 (hEX, gateway 192.168.1.1) → modem. VM `kasm-dev` (192.168.1.223) is
BRIDGED on vmbr0 (virtio NIC). User reports the SAME failure historically on a second
bare-metal Proxmox (HP Mini PC) — suspects MikroTik or modem.

**Exact symptom:** a Docker container inside the VM can reach ANY LAN host (gateway .1, the
Proxmox host .125, etc.) but CANNOT reach the internet. The VM's OWN internet works, and
`docker pull` works (daemon uses host net). Only container traffic (extra masquerade/NAT hop)
to the internet fails.

**Packet-level proof (all captured):**
- Container SYN leaves masqueraded: `192.168.1.223:P > 1.1.1.1:443 [S]` (correct cksum).
- `1.1.1.1:443 > 192.168.1.223:P [S.]` returns to the VM's eth0 with a **correct checksum**.
- conntrack tracks it: `SYN_RECV ... [reply] src=1.1.1.1 dst=192.168.1.223 dport=P`, **0 invalid**.
- Inside the container's netns: it sends SYN ×3, receives **nothing**.
- The VM shows `TcpInErrs` incrementing = the reply is delivered LOCALLY and errored, i.e. it
  is NOT being un-NAT'd/forwarded to the container — for internet replies only; LAN replies work.

**Ruled out (verified, no effect):** Ubuntu 22.04 (k5.15) AND Debian 12 (k6.1); Docker 27 & 29;
iptables nft & legacy; `iptables -P FORWARD ACCEPT`; `rp_filter=0`; `br_netfilter`+conntrack+
sysctls; ALL guest offloads off; **Proxmox host firewall is OFF, no per-VM fw**; **host NIC/
bridge/tap offload disabled**; `nf_conntrack_checksum=0`; `nf_conntrack_tcp_be_liberal=1`.
`e1000` NIC test blocked: the Debian *cloud* kernel lacks the e1000 driver (interface absent).

**Leading hypotheses to pursue next:**
1. **virtio NIC offload** on this host mangling forwarded/NAT'd return traffic (guest
   `rx-checksumming` is `[fixed] on`, cannot be disabled). Next: install FULL Debian kernel
   (`linux-image-amd64`, has e1000) → switch NIC to `e1000` → retest. If that fixes it, the
   template must use the full kernel + e1000 (not virtio, not the cloud kernel).
2. **MikroTik RB750Gr3** interaction with the double-NAT flow (VM masquerade + MikroTik NAT) —
   check MikroTik: IP→Settings→`RP Filter`, `Fasttrack`/hardware-offload, and connection
   tracking. Test by temporarily bypassing the MikroTik or disabling fasttrack.
3. Reproduce on the HP-Mini Proxmox and on a DIFFERENT network (no MikroTik) to isolate
   host-virtualization vs. the MikroTik/modem.

**Community references (same class of issue):**
- https://forum.proxmox.com/threads/docker-container-inside-proxmox-vm-cannot-access-the-internet.152822/
- https://forum.proxmox.com/threads/containers-have-no-internet-connection.131113/

**Repro/diagnostic one-liner (run in the VM):**
`docker run --rm python:3-alpine python3 -c "import socket;s=socket.socket();s.settimeout(8);s.connect(('1.1.1.1',443));print('OK')"`  → hangs/TimeoutError when broken.

### The guest OS change (kept for reference — did NOT resolve egress)
Ubuntu 22.04 + **kernel 5.15** is the common thread in the multi-day failures. **Debian 12
(kernel 6.1)** or **Ubuntu 24.04 (kernel 6.8)** have newer netfilter/virtio handling and
usually run Docker container networking correctly out of the box. Small IaC change: swap the
Proxmox cloud-init template. Try this before spending more days on 22.04.

### Also seen: the VM can hang under heavy image pulls
Pulling Kasm's default catalog (Ubuntu desktop images are 8–12GB each) can saturate/fill the
VM and make it unresponsive (needs a Proxmox-side reset). Only enable the browser images you
actually use, and BEFORE first Kasm start (see the seeding note below) so the agent never
starts pulling the big ones.

### Diagnostics cheat-sheet (run on the VM)
```bash
iptables --version                                   # want: (legacy), not (nf_tables)
lsmod | grep -E 'br_netfilter|nf_conntrack'          # both must be present
sysctl net.bridge.bridge-nf-call-iptables            # must be 1 (missing => br_netfilter unloaded)
docker --version                                     # want: 27.x
# container egress test (host reaches internet != container reaches internet):
docker run --rm --network bridge --entrypoint python3 kasmweb/chrome:1.17.0 \
  -c "import socket;s=socket.socket();s.settimeout(8);s.connect(('1.1.1.1',443));print('OK')"
```

### Historical workaround (for context)
Before this fix, the only way to get a container's app onto the internet was a **Cloudflare
Tunnel** in a sidecar container — that works because the tunnel makes an *outbound* control
connection and never needs inbound port-forwarding, sidestepping (but not fixing) the
broken bridge egress. With the iptables-legacy fix, plain Docker egress works, so the tunnel
is no longer required for connectivity.

---

## Docker version policy
- **Pin `docker-ce` to 27.x on Ubuntu 22.04 VMs** (see above). Do NOT use `state: latest`
  for Docker on these hosts — it pulls 28/29 which break container egress via nftables.
- The shared `roles/docker/tasks/install_docker.yml` still uses `state: latest`; the Kasm
  role constrains the version via the apt-preferences pin created in
  `configure_docker_networking.yml`, so prod k8s/registry installs are left untouched.

## Reboots re-break kernel modules
- `br_netfilter` / `nf_conntrack` are not auto-loaded on the minimal Ubuntu cloud image.
  Any reboot (including a Terraform resize that changes cores/memory) drops them unless
  persisted via `/etc/modules-load.d`. Always persist, never rely on a one-off `modprobe`.

## Kasm specifics
- Kasm's `install.sh` blocks on interactive prompts with no TTY — always pass
  `--accept-eula` and `--no-swap-check` (see `roles/kasm/tasks/install_kasm.yml`).
- Kasm's own `--swap-size` proved unreliable; swap is owned in `configure_swap.yml`.
- `docker restart` / `systemctl restart docker` stops the Kasm stack and it does NOT always
  come back on its own — bring it up with `sudo /opt/kasm/current/bin/start`.
- Launch workspaces from the **user dashboard** (Kasm logo), not Admin → Workspaces.
