# State Machines: Documents

## Document Approval State Machine

**States:** `needs_review`, `under_review`, `approved`, `needs_revision`

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| `needs_review` | `under_review` | `StartReview` | `closing_attorney` | None | None |
| `needs_review` | `approved` | `ApproveDocument` | `closing_attorney` | None | Updates transaction readiness checklist |
| `under_review` | `approved` | `ApproveDocument` | `closing_attorney` | None | Updates transaction readiness checklist |
| `under_review` | `needs_revision` | `RejectDocument` | `closing_attorney` | Payload includes `rejection_reason` | Notifies uploader |
| `needs_review` | `needs_revision` | `RejectDocument` | `closing_attorney` | Payload includes `rejection_reason` | Notifies uploader |

**Invariants:**
* `needs_revision` is a terminal state for that explicitly uploaded entity; new uploads generate a distinct `document_id`.
