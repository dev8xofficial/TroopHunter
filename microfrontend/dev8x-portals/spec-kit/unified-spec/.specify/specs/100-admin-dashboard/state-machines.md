# Admin Dashboard - State Machines

> **Module ID**: `100-admin-dashboard`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Recruiting Snapshot Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| requested | Dashboard summary requested. | No |
| aggregated | Counts and metrics calculated. | No |
| published | Snapshot delivered to the actor. | Yes |
| stale | Snapshot exceeded freshness window. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| requested | aggregated | aggregate() | Source modules respond successfully | Compose cross-module metrics |
| aggregated | published | publish() | Metrics pass validation | Emit admin.dashboard.viewed |
| published | stale | age_out() | Freshness window exceeded | Require regeneration on next request |

### State Diagram

```
[requested] -- aggregate() --> [aggregated]
[aggregated] -- publish() --> [published]
[published] -- age_out() --> [stale]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-100-01 | Published snapshots are immutable for audit purposes. |
| INV-100-02 | Stale snapshots cannot be reused as current operational truth. |
