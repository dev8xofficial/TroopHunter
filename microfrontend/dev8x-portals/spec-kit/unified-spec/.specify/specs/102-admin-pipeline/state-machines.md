# Admin Pipeline - State Machines

> **Module ID**: `102-admin-pipeline`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Recruiting Pipeline Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| applied | Application submitted and waiting for review. | No |
| shortlisted | Passed initial review. | No |
| interview | Interview activity is underway. | No |
| selected | Candidate selected pending join. | No |
| joined | Candidate joined the organization. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| applied | shortlisted | move_card() | Screening review complete | Emit admin.pipeline.stage_changed |
| shortlisted | interview | move_card() | Interview slot exists | Notify interview scheduling |
| interview | selected | move_card() | Evaluation complete | Mark selection readiness |
| selected | joined | move_card() | Joining confirmed | Close active pipeline card |

### State Diagram

```
[applied] -- move_card() --> [shortlisted]
[shortlisted] -- move_card() --> [interview]
[interview] -- move_card() --> [selected]
[selected] -- move_card() --> [joined]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-102-01 | Cards may move only one approved recruiting stage at a time. |
| INV-102-02 | Joined is terminal for the active pipeline board. |
