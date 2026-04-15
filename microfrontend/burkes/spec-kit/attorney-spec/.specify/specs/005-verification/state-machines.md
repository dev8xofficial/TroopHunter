# State Machines: Verification

## Verification Execution State Machine (Transaction Sub-State)

**States:** `unverified`, `flagged_paused`, `amounts_locked`

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| `unverified` | `amounts_locked` | `ConfirmVerification` | `closing_attorney` | Check math constraints & signature | Parent trans -> `verified` |
| `unverified` | `flagged_paused` | `FlagDiscrepancy` | `closing_attorney` | None | Parent trans -> `flagged` |
| `amounts_locked` | `unverified` | `UpdateAssetSplit` | `closing_attorney` | None | Parent trans -> `split_pending` |
| `flagged_paused` | `unverified` | `ResolveFlag` | `closing_attorney` | Resolution mapped | Parent trans -> `under_attorney_review` |

**Invariants:**
* Verification math assertion: `(party_a_percent + party_b_percent) == 100` must ALWAYS hold true for `amounts_locked` on divorce cases.
