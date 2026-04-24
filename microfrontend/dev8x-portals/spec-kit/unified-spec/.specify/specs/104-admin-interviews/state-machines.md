# Admin Interviews - State Machines

> **Module ID**: `104-admin-interviews`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Interview Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| scheduled | Interview created and awaiting confirmation. | No |
| confirmed | Interview confirmed by the relevant actors. | No |
| completed | Interview concluded. | Yes |
| cancelled | Interview cancelled before completion. | Yes |
| no_show | Interview did not occur because a participant failed to attend. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| scheduled | confirmed | confirm() | Candidate and interviewer availability confirmed | Emit admin.interview.status_changed |
| confirmed | completed | complete() | Interview occurred | Release evaluation workflow |
| scheduled | cancelled | cancel() | Cancellation reason supplied | Free the interview slot |
| confirmed | no_show | mark_no_show() | Attendance not recorded | Emit admin.interview.status_changed |

### State Diagram

```
[scheduled] -- confirm() --> [confirmed]
[confirmed] -- complete() --> [completed]
[scheduled] -- cancel() --> [cancelled]
[confirmed] -- mark_no_show() --> [no_show]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-104-01 | Completed, cancelled, and no_show are terminal. |
| INV-104-02 | Only scheduled or confirmed interviews may be rescheduled. |
