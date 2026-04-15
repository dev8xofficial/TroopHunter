# State Machines — 002 Referrals

## SM-REFERRAL · Referral Status (Partner View)

### States

| State | Description |
|---|---|
| `new_lead` | Referral routed to partner; no partner action taken |
| `contacted` | Partner has performed a contact action |
| `quoted` | Quote submitted (see 004-quotes) |
| `quote_accepted` | Client accepted the quote |
| `scheduled` | Appointment confirmed |
| `in_progress` | Work underway |
| `completed` | Job marked done |
| `awaiting_payment` | Platform payment processing |
| `paid` | Earnings disbursed |
| `declined` | Terminal — partner declined |
| `cancelled` | Terminal — cancelled |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| `new_lead` | `contacted` | `partner_contacts_homeowner` | `service_partner` | Referral assigned to this partner; account `active_verified` | Activity log: `referral_contacted`; `response_time_recorded` |
| `new_lead` | `quoted` | `quote_submitted` | `service_partner` | — | Activity log: `quote_submitted`; notification to client |
| `new_lead` | `declined` | `partner_declines_referral` | `service_partner` | — | Activity log: `referral_declined`; routing score decremented |
| `contacted` | `quoted` | `quote_submitted` | `service_partner` | — | Activity log: `quote_submitted` |
| `contacted` | `declined` | `partner_declines_referral` | `service_partner` | — | Activity log: `referral_declined` |
| `quoted` → ... | see 004-quotes | — | — | — | — |

### Invariants

- A referral in `declined` or `cancelled` cannot accept further partner actions.
- `new_lead` referrals must receive a partner response (contact, quote, or decline)
  within the platform's defined response window; breach degrades `routing_priority_score`.
- The `transaction_ref` value is set at routing time and must never change.

---

## SM-SERVICE-AREA · Service Area Status

### States

| State | Description |
|---|---|
| `active` | Partner is receiving referrals in this zip code |
| `paused` | Partner has temporarily halted referral routing for this zip code |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `active` | `service_area_added` | `service_partner` | Zip code valid 5-digit; partner `active_verified` | Activity log: `service_area_added`; routing matrix updated |
| `active` | `paused` | `service_area_paused` | `service_partner` | Partner retains ≥0 other active areas | Activity log: `service_area_paused`; routing matrix updated |
| `paused` | `active` | `service_area_resumed` | `service_partner` | — | Activity log: `service_area_resumed`; routing matrix updated |
| `active` or `paused` | _(deleted)_ | `service_area_removed` | `service_partner` | Soft-delete only; no pending referrals in that area | Activity log: `service_area_removed` |

### Invariants

- A partner with zero `active` service areas receives no referral routing,
  but their account remains `active_verified`.
- Soft-deletes must set `deleted_at`; the record is not physically removed.
