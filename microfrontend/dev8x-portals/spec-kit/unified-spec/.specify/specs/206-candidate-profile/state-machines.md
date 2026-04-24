# Candidate Profile - State Machines

> **Module ID**: `206-candidate-profile`
> References: [contracts/interactions.yaml](../../../contracts/interactions.yaml)

---

## Candidate Profile Verification Lifecycle

### States

| State | Description | Terminal |
| --- | --- | --- |
| incomplete | Required profile fields are missing. | No |
| submitted | Profile has been submitted for support review. | No |
| verified | Profile data confirmed. | Yes |
| needs_revision | Profile data requires candidate changes. | No |

### Transitions

| From | To | Trigger | Guard | Side Effects |
| --- | --- | --- | --- | --- |
| incomplete | submitted | submit() | Required fields complete | Expose profile for review |
| submitted | verified | verify() | Support review passed | Emit candidate.profile.verification_changed |
| submitted | needs_revision | request_revision() | Review found an issue | Return feedback to candidate |
| needs_revision | submitted | resubmit() | Candidate corrected issues | Restart review |

### State Diagram

```
[incomplete] -- submit() --> [submitted]
[submitted] -- verify() --> [verified]
[submitted] -- request_revision() --> [needs_revision]
[needs_revision] -- resubmit() --> [submitted]
```

### Invariants

| Invariant | Description |
| --- | --- |
| INV-206-01 | Verified profiles remain authoritative until a new revision is requested. |
| INV-206-02 | Needs_revision requires candidate action before verification can proceed. |
