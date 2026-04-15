# State Machines: Transactions

## Transaction Lifecycle State Machine

**States:** `document_gathering`, `agent_review`, `under_attorney_review`, `split_pending`, `flagged`, `title_review`, `verified`, `completed`

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| `document_gathering` | `agent_review` | `SubmitForReview` | `real_estate_agent` | All required preliminary docs persist | Notification sent |
| `agent_review` | `under_attorney_review` | `ApproveAgent` | `real_estate_agent` | None | Priority queue updated |
| `under_attorney_review` | `split_pending` | `RequiresSplit` | System | `case_type == 'divorce_asset_split'` & `status == 'under_attorney_review'` | - |
| `under_attorney_review` | `verified` | `VerifyAmounts` | `closing_attorney` | `case_type != 'divorce_asset_split'` & 0 docs in `needs_review` | Immutable lock |
| `split_pending` | `verified` | `ApproveSplit` | `closing_attorney` | Split data validated | Immutable lock |
| `Any` | `flagged` | `FlagDiscrepancy` | `closing_attorney` | None | Halts closing |
| `flagged` | `under_attorney_review` | `ResolveFlag` | `closing_attorney` | Resolution notes provided | Unpauses state |
| `verified` | `completed` | `FinalizeClosing` | System/Cron | Date >= `closing_date` AND Funds settled | Irreversible |

**Invariants:**
* A transaction can never leave `flagged` without an explicit resolution payload.
* `completed` is a terminal state. No transitions exit `completed`.
