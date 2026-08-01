# The databases are not in Kubernetes any more

**Removed 2026-07-31.** If you are looking for `*-db-statefulset.yaml` or `*-db-secret.yml`, they are
gone on purpose — 42 files across `prod`, `stag`, `dev`, `loc` and the kustomization bases.

## Where the databases are now

One Postgres server, outside the cluster:

```
192.168.1.203:5432     VM 110 on the hub — Postgres 16 + PostGIS
```

It holds **15 databases**: five services × `prod`/`stag`/`dev`, named `<service>_<env>`
(`businesses_prod`, `auth_stag`, …). One role per service, shared across environments.

| | |
|---|---|
| declared in | `dev8x/forge/infrastructure/desired-state/services/postgres.yaml` |
| built by | `ansible-playbook setup-postgres.yml` (one command, from nothing) |
| the migration write-up | [`../docs/DATABASE-MIGRATION-2026-07-31.md`](../docs/DATABASE-MIGRATION-2026-07-31.md) |

## Why they left

Abdul, 2026-07-31: *"I was learning to build and use microservice and I believe that architectural
decision was wrong… 20 Postgres instances is something a bad architectural decision being a numb at
that time."*

The numbers agreed. The `businesses` database is **514 MB** and ran with a **150 Mi** container limit —
it could not hold a third of its own data in cache, so nearly every query went to disk. That is what
"troophunter runs extremely slow" actually was, and no amount of tuning fixes a database given a
twentieth of the memory its working set needs.

The whole production estate is ~550 MB. One 4 GB server holds all of it, every index and every
environment, several times over.

**And they had no backup at all.** Five StatefulSets on 1 Gi PVCs on a single node, no dumps, nothing
off-box. That was the real reason this could not wait. There is now a verified nightly dump with a
second copy on the file server.

> **A StatefulSet with a PVC pinned to one node is a database with extra steps** — all of the
> complexity of Kubernetes, none of the benefit it exists to provide, and backups, tuning and upgrades
> all made harder. Kubernetes is for stateless things it can reschedule freely. Keep it that way.

## The `<service>-db-secret` objects still exist — and they are still needed

The deployments read their connection details from a Secret of that name. Only the **StatefulSets**
were deleted; the Secrets remain, now pointing at `192.168.1.203`.

**They are no longer committed, and that is deliberate.** The old files shipped
`password: mysecretpassword` in plaintext in this repository. The Secrets are now created from
ansible-vault by the repoint playbook, so no real password touches a committed file:

```sh
cd dev8x/forge/infrastructure/implementation/ansible
ansible-playbook repoint-services.yml
```

That playbook is also how you move the services to a different database server, or to a different
database — it reads the mapping from `postgres.yaml` and nothing else.

## Restoring the old data, if it is ever needed

The pre-migration contents of all five StatefulSets were dumped and **verified with `pg_restore --list`
before anything was deleted**. Two copies:

```
192.168.1.203  /var/backups/postgres/pre-migration-k8s-2026-07-31/
fileserver     /mnt/hgst/001/backups/postgres/pre-migration-k8s-2026-07-31/
```

```sh
pg_restore -d <target> --no-owner --no-privileges <service>.dump
```
