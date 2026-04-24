# Candidate Onboarding - State Machines

> **Module ID**: `204-candidate-onboarding`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Onboarding Item Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| not_started | Item exists but work has not begun. | No |
| in_progress | Work has begun. | No |
| blocked | Prerequisite missing. | No |
| completed | Item is complete. | Yes |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| not_started | in_progress | start() | Prerequisites available | Expose action to candidate or system |
| in_progress | completed | complete() | Required work done | Emit candidate.onboarding.item_completed when candidate-owned |
| not_started | blocked | block() | Prerequisite missing | Surface blocking reason |
| blocked | in_progress | unblock() | Prerequisite satisfied | Re-open work item |

### State Diagram

```
[not_started] -- start() --> [in_progress]
[in_progress] -- complete() --> [completed]
[not_started] -- block() --> [blocked]
[blocked] -- unblock() --> [in_progress]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-204-01 | Completed items are terminal for the current onboarding plan. |
| INV-204-02 | Blocked items cannot be completed until they re-enter in_progress. |
