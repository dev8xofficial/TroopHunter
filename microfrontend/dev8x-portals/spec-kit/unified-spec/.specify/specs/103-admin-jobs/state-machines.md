# Admin Jobs - State Machines

> **Module ID**: `103-admin-jobs`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Job Posting Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| draft | Job is being prepared and is not yet active. | No |
| live | Job accepts applicants. | No |
| paused | Job is temporarily inactive. | No |
| closed | Job is complete and terminal. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| draft | live | publish() | Required job fields complete | Emit admin.job.status_changed |
| live | paused | pause() | Hiring temporarily paused | Retain existing applicants |
| paused | live | resume() | Hiring resumed | Restore active visibility |
| live | closed | close() | Hiring complete | Emit admin.job.closed |
| paused | closed | close() | Hiring complete | Emit admin.job.closed |

### State Diagram

```
[draft] -- publish() --> [live]
[live] -- pause() --> [paused]
[paused] -- resume() --> [live]
[live] -- close() --> [closed]
[paused] -- close() --> [closed]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-103-01 | Closed jobs are terminal and cannot be reopened. |
| INV-103-02 | Only live jobs may accept new applicants. |
