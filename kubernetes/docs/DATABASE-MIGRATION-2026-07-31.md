# The databases moved out of Kubernetes — and what that uncovered

**2026-07-31.** The five Postgres StatefulSets were replaced by one server at
`192.168.1.203` (VM 110 on the hub). Moving the data was the easy part. Getting the services
to *use* it exposed four separate defects, every one of which had been sitting in the
startup path for months.

The pattern in all four: **something reported success while doing nothing.** That is worth
more attention than the individual bugs.

---

## Where things stand

| | |
|---|---|
| the database server | `192.168.1.203:5432` — Postgres 16 + PostGIS, 15 databases |
| declared in | `dev8x/forge/infrastructure/desired-state/services/postgres.yaml` |
| repoint / rollback | `ansible-playbook repoint-services.yml` (see "Rolling back") |
| the old StatefulSets | **still running, still holding their data** — they are the rollback |
| images | `192.168.1.201/<service>-prod:2026-07-31-envfix2` |

---

## Defect 1 — the deployment set environment variables the application never read

The manifests set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` from the
service's Secret.

The application reads `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`,
`POSTGRES_PASSWORD` (`microservices/<name>/src/config/database.ts`). It has never read
`DB_*` — a grep across all five services finds zero references.

So the Secret could be changed to anything at all and nothing would happen. Every pod would
faithfully report the new `DB_HOST` and carry on using the old database.

**Fixed:** the five prod deployments now set `POSTGRES_*`.

## Defect 2 — the entrypoint overwrote the container's environment

```sh
export $(grep -v '^#' "$ENV_FILE" | xargs)     # the old line
```

`.env.production` is baked into the image (`COPY microservices/<name> ...`), and this line
exported it **over** whatever Kubernetes had set. Even after Defect 1 was fixed, the image's
own values won.

Correct precedence is the other way round: an image is a template, and the environment it
runs in decides. The entrypoint now treats the file as **defaults** and never overwrites a
variable that is already set.

**Verified both ways** before rebuilding: with nothing set the file supplies everything (so
local development is unchanged); with Kubernetes supplying the database values, those win
and unrelated keys like `JWT_SECRET` still come from the file.

## Defect 3 — every service start depended on downloading a package from the internet

The entrypoint runs `npm run migrate:$ENVIRONMENT`, which is:

```
cross-env NODE_ENV=production npx sequelize-cli db:migrate
```

**`sequelize-cli` is not a dependency of any of these services** — not in `dependencies`,
not in `devDependencies`, not in the image. So `npx` tries to fetch it from
registry.npmjs.org on every single start. Pods in this cluster cannot reach the npm
registry, so `npx` did not fail — it retried, indefinitely.

The result in production: the container reported `Running`, the readiness check passed, the
Service had an endpoint — and the process never reached the point of listening. Every
request to `/businesses/` returned **503 from a pod that looked completely healthy.**

It survived only because nothing had restarted it in months. **The restart did not break it;
the restart revealed it.** (Precisely the connect-ops lesson from the same day.)

**Fixed:** the migration is now bounded by `timeout 120` and cannot block startup. A failed
migration is reported loudly and the server still starts.

> **Still worth doing:** add `sequelize-cli` to `dependencies` so migrations actually run
> instead of timing out. As it stands they have effectively never run automatically — the
> schema is whatever the last manual migration left. That is a bigger change than this
> incident warranted, and it should be done deliberately rather than at 2am.

## Defect 4 — cluster DNS accepted connections and answered nothing

CoreDNS forwarded to `/etc/resolv.conf`, which named `8.8.8.8` and `1.1.1.1`.

**Outbound UDP/53 to public resolvers does not work from the pod network.** It works fine
from the nodes — which is why it looked healthy from every shell anyone tried, and why
`kubectl get pods` showed CoreDNS `1/1 Running` throughout. TCP to port 53 connected. The
queries simply timed out.

Cluster-internal names (`*.cluster.local`) kept resolving because CoreDNS answers those
itself, so the fault was invisible until something needed an external name.

**Fixed:** CoreDNS now forwards to `192.168.1.1` (the MikroTik), which pods can reach and
which answers. Same reasoning as the connect-ops DNS fix: prefer the local resolver over a
dependency that can vanish silently.

The previous ConfigMap is saved if it is ever needed; the change is one `kubectl patch` plus
a rollout restart of `deployment/coredns` in `kube-system`.

---

## Rolling back

**The old StatefulSets were never stopped or deleted.** They are still running with their
data. To send everything back to them:

```
# dev8x/forge/infrastructure/desired-state/services/postgres.yaml
consumers:
  kubernetes:
    target: kubernetes        # was: postgres
```

then:

```sh
cd dev8x/forge/infrastructure/implementation/ansible
ansible-playbook repoint-services.yml
```

To roll back the **images** as well, set each deployment back to the previous tag. Do not
rely on `:latest` meaning what it used to — these deployments use `imagePullPolicy:
IfNotPresent`, so a re-pushed `:latest` is never fetched. That is why the new images carry a
dated tag, and why rollback should name a tag explicitly.

⚠ **Do not delete the StatefulSets** until the services have run on the new server long
enough to trust it. They cost almost nothing to keep and they are the only fast way back.

---

## What was verified, not assumed

| Check | Result |
|---|---|
| Row counts vs. numbers measured **before** the move | 120,333 businesses · 92,518 phones · 14,566 postal codes — exact |
| The app's own log line naming its database | `192.168.1.203 5432 businesses_prod businesses` |
| Live site traffic increasing commit counts on the new server | `xact_commit` 655 → 689 while hitting `/businesses/` |
| `/businesses/` through the public tunnel | **200** |
| Internal and external DNS from inside a pod | both resolve |

The commit-count check is the one that mattered. Reading `DB_HOST` out of a pod proved
nothing — that variable was never used. Watching the database's own counters move while
driving traffic at the public URL is the only check here that could not have passed by
accident.
