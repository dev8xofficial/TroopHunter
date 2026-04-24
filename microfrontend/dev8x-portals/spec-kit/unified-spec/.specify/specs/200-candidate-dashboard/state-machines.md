# Candidate Dashboard - State Machines

> **Module ID**: `200-candidate-dashboard`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Candidate Snapshot Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| requested | Dashboard snapshot requested. | No |
| assembled | Module data aggregated for the candidate. | No |
| published | Snapshot delivered. | Yes |
| stale | Snapshot exceeded freshness window. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| requested | assembled | assemble() | Dependent modules respond | Compose personalized summary |
| assembled | published | publish() | Candidate scope validated | Emit candidate.dashboard.viewed |
| published | stale | age_out() | Freshness window exceeded | Regenerate on next request |

### State Diagram

```
[requested] -- assemble() --> [assembled]
[assembled] -- publish() --> [published]
[published] -- age_out() --> [stale]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-200-01 | Published snapshots remain candidate-scoped. |
| INV-200-02 | Stale snapshots are never shown as current data. |
