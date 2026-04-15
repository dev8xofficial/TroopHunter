# Documents State Machines

## Verification Flow

**Entity**: Document
**States**: `needs_review`, `under_review`, `approved`, `rejected`

| From State | To State | Trigger (Operation) | Actor | Guard Condition | Side Effects |
| --- | --- | --- | --- | --- | --- |
| `[None]` | `needs_review` | Submitter Uploads | Any Role | Valid payload | Dispatch `document_uploaded` event |
| `needs_review`| `under_review`| Admin clicks review | `admin` | None | Assign UI lock to specific admin |
| `under_review`| `approved` | System approves | `admin` | Valid permissions | Notify origin submittor; Check Tx Stage preconditions |
| `under_review`| `rejected` | System rejects | `admin` | `rejection_reason` MUST be provided | Notify origin submittor |
| `rejected` | `needs_review`| Submitter replaces | Any Role | Replacement payload valid | Clear `rejection_reason` |

### Core Invariants
- An Administrator may forcefully transition a document from `needs_review` straight to `approved` (e.g., bulk approvals) thereby shortcutting the ephemeral `under_review` flag used for UI locks.
- A document bound to a transaction in `completed` stage cannot have its status reverted from `approved`.
