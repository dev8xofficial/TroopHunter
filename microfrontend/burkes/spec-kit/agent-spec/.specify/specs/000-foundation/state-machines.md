# State Machines - 000-foundation

## Core Entity FSM
Defines the valid transition graph for the primary entity logic of this module.

### Enumerated States
1. `DRAFT` - Initial ingestion.
2. `PENDING_REVIEW` - Awaiting external validation.
3. `ACTIVE` - Validated and operational.
4. `TERMINATED` - End of lifecycle.

### Invariants
- Entity cannot transition to `ACTIVE` unless all relation constraints are resolved.
- `TERMINATED` is a terminal node; mutability falls to purely administrative escalation.

### Transition Matrix
| Current State | Target State | Trigger Method | Required Actor | Side Effects |
|---|---|---|---|---|
| `DRAFT` | `PENDING_REVIEW` | `SubmitForReview` | Agent | Emit `ReviewRequested` |
| `PENDING_REVIEW` | `ACTIVE` | `ApproveEntity` | System | Emit `EntityActivated` |
