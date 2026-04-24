# Admin Evaluations - State Machines

> **Module ID**: `105-admin-evaluations`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Evaluation Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| draft | Evaluation in progress. | No |
| submitted | Evaluation submitted for review. | No |
| calibrated | Evaluation aligned across reviewers. | No |
| finalized | Evaluation locked with final recommendation. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| draft | submitted | submit() | Required scores present | Emit admin.evaluation.submitted |
| submitted | calibrated | calibrate() | Reviewer discussion complete | Store calibration notes |
| calibrated | finalized | finalize() | Recommendation selected | Emit admin.evaluation.finalized |

### State Diagram

```
[draft] -- submit() --> [submitted]
[submitted] -- calibrate() --> [calibrated]
[calibrated] -- finalize() --> [finalized]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-105-01 | Finalized evaluations are immutable. |
| INV-105-02 | Recommendation may be empty until finalization. |
