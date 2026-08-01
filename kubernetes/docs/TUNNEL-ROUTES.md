# Public hostnames — how to add, change or remove one

**Short version: edit a YAML file and run one command. Never open the Cloudflare dashboard.**

---

## ⚠️ Do NOT delete your "manual" routes

They are not separate from the Terraform ones. On 2026-07-31 Terraform **adopted the
existing 17 DNS records** into its state (`terraform import`) and took ownership of the
tunnel's ingress config. The rules you created by hand *are* the rules Terraform now
manages — there is no duplicate set to clean up.

Deleting one in the dashboard would just mean Terraform puts it back on the next apply,
and in the meantime the hostname is down. If you want a route gone, delete it from the YAML
and apply. That is the only correct way now.

---

## Where the routes live

```
dev8x/forge/infrastructure/desired-state/network/cloudflare-tunnel.yaml
```

That file is the **source of truth**. It holds every public hostname, which environment it
belongs to, and where each environment's ingress gateway is.

```yaml
origins:
  prod:    "http://192.168.1.205:30080"   # k8s-ctrlr-prod
  stag:    "http://192.168.1.215:30080"   # k8s-ctrlr-stag  (NOT BUILT → 502)
  dev:     "http://192.168.1.225:30080"   # k8s-ctrlr-dev   (NOT BUILT → 502)
  sandbox: "http://127.0.0.1"

routes:
  - { host: troophunter.com,      zone: troophunter.com, env: prod }
  - { host: www.troophunter.com,  zone: troophunter.com, env: prod }
  - { host: stag.dev8x.com,       zone: dev8x.com,       env: stag }
  ...
```

## To add a hostname

1. Add a line to `routes:` — host, its zone, and which environment serves it.
2. Apply:

```sh
cd dev8x/forge/infrastructure/implementation/terraform/cloudflare
terraform apply -var-file=secrets/cloudflare.tfvars
```

That creates **both** the tunnel ingress rule **and** the DNS CNAME. They are generated
from the same list, which is the point: maintained separately they drift, and you get a
hostname that resolves but 404s — invisible until someone tries the URL.

## To move an environment to a different machine

Change **one line** under `origins:`. Every hostname for that environment follows.

When the staging cluster is finally built and lands on some other address, that is a
one-line edit — not four separate dashboard clicks.

## To remove a hostname

Delete its line and apply. Terraform removes the ingress rule and the DNS record together.

---

## Things that will bite you

**Applying is authoritative.** It *replaces* the tunnel's whole ingress configuration. Any
rule added by hand in the dashboard is removed on the next apply. That is deliberate — one
source of truth — but it means the dashboard is effectively read-only now.

**Always read the plan before applying.** On the very first run Terraform planned
`14 to destroy` — it wanted to delete and recreate 14 live production CNAMEs, because the
Cloudflare provider stores a record's name **relative** to its zone (`"www"`), not as the
full hostname. The config now computes that correctly, but the habit is worth keeping:
`0 to destroy` is what a routine change should say.

**`stag.*` and `dev.*` return 502 today**, and that is not a tunnel fault. The routes are
correct; the clusters at `.215` and `.225` were never built. They stay published so nothing
needs changing when those clusters appear.

---

## Where the pieces are

| | |
|---|---|
| the routes (edit this) | `dev8x/forge/infrastructure/desired-state/network/cloudflare-tunnel.yaml` |
| the Terraform that applies them | `dev8x/forge/infrastructure/implementation/terraform/cloudflare/` |
| the API token | `dev8x/forge/infrastructure/secrets/cloudflare-api-token` — a directory that ignores itself, so it is never committed |
| the box running the tunnel | `connect-ops-prod`, VM 5001 on the hub — `desired-state/services/connect-ops.yaml` |
| why that box fell over once | [`OUTAGE-2026-07-31.md`](OUTAGE-2026-07-31.md) |

The **API token** manages the tunnel; the **tunnel token** on connect-ops only runs it.
Two different credentials — the second cannot create or change anything.
