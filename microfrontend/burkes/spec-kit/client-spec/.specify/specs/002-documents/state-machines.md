# Documents State Machines

## Entity: `Document`

**States:**
- `NEEDS_SIGNATURE`: Document requires explicit electronic signature.
- `UNDER_REVIEW`: Document requires manual reading/approval without form signing.
- `APPROVED`: Document is final, immutable, and accepted.

**Transitions:**
| From State | To State | Trigger | Actor | Guard | Side Effects |
|------------|----------|---------|-------|-------|--------------|
| `NEEDS_SIGNATURE` | `APPROVED` | `SIGN_DOCUMENT` | `ROLE_CLIENT` | Valid signature token | Fires activity event |
| `UNDER_REVIEW` | `APPROVED` | `APPROVE_DOCUMENT`| Authorized Reader | Document must exist | Fires activity event |

**Invariants:**
- An `APPROVED` document cannot return to `NEEDS_SIGNATURE`.
- If a document is rejected or found invalid during review, it is marked softly deleted or supplanted by a new document; it does not regress its state machine natively unless specific review flow is expanded. 
