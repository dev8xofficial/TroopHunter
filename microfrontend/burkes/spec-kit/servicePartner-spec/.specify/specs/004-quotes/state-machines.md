# State Machines — 004 Quotes

## SM-QUOTE · Quote Status

### States

| State | Description |
|---|---|
| `pending` | Quote submitted by partner; awaiting homeowner decision |
| `accepted` | Homeowner accepted the quote; job created |
| `declined` | Homeowner rejected the quote (terminal) |
| `expired` | No homeowner response within the decision window (terminal) |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `pending` | `quote_submitted` | `service_partner` | Referral not in terminal state; one quote per partner per referral | Activity log: `quote_submitted`; referral status → `quoted`; notification to client |
| `pending` | `accepted` | `client_accepts_quote` | `client` | Quote in `pending` state | Activity log: `quote_accepted`; job record created; `total_quote_amount` locked |
| `pending` | `declined` | `client_rejects_quote` | `client` | — | Activity log: `quote_rejected`; referral status → `declined` |
| `pending` | `expired` | `quote_expiry_timer` | `system` | Decision window elapsed | Activity log: `quote_expired`; referral may be re-routed |

### Invariants

- One partner may submit only one quote per referral. Duplicate submission returns HTTP 409.
- `total_quote_amount` is server-computed: `labor_cost + materials_cost`. Partners
  cannot supply this field.
- Once `accepted`, `total_quote_amount`, `labor_cost`, and `materials_cost` are
  **immutable**; no amendment is possible.
- An `expired` quote cannot be resubmitted against the same referral by the same partner.
