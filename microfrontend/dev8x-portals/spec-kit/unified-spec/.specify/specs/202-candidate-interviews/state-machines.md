# Candidate Interviews - State Machines

> **Module ID**: `202-candidate-interviews`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Candidate Interview Reservation Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| scheduled | Reservation exists but is not yet confirmed. | No |
| confirmed | Candidate confirmed attendance. | No |
| completed | Interview concluded. | Yes |
| cancelled | Reservation cancelled. | Yes |
| no_show | Candidate failed to attend. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| scheduled | confirmed | confirm() | Candidate accepts reservation | Emit candidate.interview.confirmed |
| scheduled | cancelled | cancel() | Cancellation reason allowed | Free the slot |
| confirmed | completed | complete() | Interview recorded as finished | Update timeline progress |
| confirmed | no_show | mark_no_show() | Attendance absent | Close reservation as no_show |

### State Diagram

```
[scheduled] -- confirm() --> [confirmed]
[scheduled] -- cancel() --> [cancelled]
[confirmed] -- complete() --> [completed]
[confirmed] -- mark_no_show() --> [no_show]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-202-01 | Completed, cancelled, and no_show are terminal for a reservation. |
| INV-202-02 | Only scheduled reservations can be confirmed by the candidate. |
