# Mortgage State Machines

## Entity: `MortgageApplication`

**States:**
- `INCOMPLETE`: Initial state. `progress_percent == 0`.
- `IN_PROGRESS`: Client has provided partial data. `progress_percent > 0` but `< 100`.
- `SUBMITTED`: Data is complete (`progress_percent == 100`) and has been explicitly dispatched to the lender. Data is now read-only for the client.

**Transitions:**
| From State | To State | Trigger | Actor | Guard | Side Effects |
|------------|----------|---------|-------|-------|--------------|
| `INCOMPLETE` | `IN_PROGRESS` | `SAVE_SECTION` | `ROLE_CLIENT` | None | Recomputes progress % |
| `IN_PROGRESS` | `SUBMITTED` | `SUBMIT_APP` | `ROLE_CLIENT` | `progress_percent == 100` | Fires activity event |

**Invariants:**
- Once `SUBMITTED`, no `PATCH` endpoints will accept data changes from `ROLE_CLIENT`.
- Financial documents required for the mortgage (W-2, Bank Statements) must be uploaded via the `002-documents` endpoints with the `FINANCIAL` category, but the Mortgage engine uses those documents' presence to calculate the true `progress_percent`.
