# State Machines — 000 Foundation

## SM-ACCOUNT · Service Partner Account Status

### States

| State | Description |
|---|---|
| `pending_verification` | Registered but awaiting admin credential review |
| `active_verified` | Fully verified; eligible for referral routing |
| `suspended` | Temporarily inactive; no referrals routed |
| `deactivated` | Permanently removed; terminal state |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `pending_verification` | `partner_registered` | `system` | Registration payload valid | Activity log: `account_created`; notification dispatched to admin |
| `pending_verification` | `active_verified` | `admin_approves_credentials` | `admin` | License verified AND insurance verified | Activity log: `account_verified`; notification to partner |
| `active_verified` | `suspended` | `admin_suspends_account` OR `partner_self_suspends` | `admin` or `service_partner` | Account must be `active_verified` | Activity log: `account_suspended`; referral routing halted |
| `suspended` | `active_verified` | `admin_reinstates_account` | `admin` | Admin confirms reinstatement | Activity log: `account_reinstated`; routing resumed |
| `active_verified` | `deactivated` | `admin_deactivates_account` | `admin` | No pending payments | Activity log: `account_deactivated`; all active referrals re-routed |
| `suspended` | `deactivated` | `admin_deactivates_account` | `admin` | No pending payments | Activity log: `account_deactivated` |

### Invariants

- A `deactivated` account can never transition to any other state.
- All API calls from `suspended` or `deactivated` accounts MUST return HTTP 403.
- The session token of a `suspended` account is invalidated at the next request
  even if the token has not expired.

---

## SM-REFERRAL · Referral-to-Job Transaction Lifecycle

### States

| State | Description |
|---|---|
| `new_lead` | Routed to partner; no response yet |
| `contacted` | Partner has contacted homeowner |
| `quoted` | Formal quote submitted |
| `quote_accepted` | Homeowner accepted the quote |
| `scheduled` | Appointment confirmed |
| `in_progress` | Work underway |
| `completed` | Job finished |
| `awaiting_payment` | Payment processing initiated |
| `paid` | Net earnings disbursed |
| `declined` | Terminal — declined by partner or client |
| `cancelled` | Terminal — cancelled before work started |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| `new_lead` | `contacted` | `partner_contacts_homeowner` | `service_partner` | Account `active_verified` | Activity log: `referral_contacted` |
| `new_lead` | `quoted` | `quote_submitted` | `service_partner` | Account `active_verified` | Activity log: `quote_submitted`; notification to client |
| `new_lead` | `declined` | `partner_declines_referral` | `service_partner` | — | Activity log: `referral_declined`; routing_priority_score decremented |
| `contacted` | `quoted` | `quote_submitted` | `service_partner` | — | Activity log: `quote_submitted` |
| `contacted` | `declined` | `partner_declines_referral` | `service_partner` | — | Activity log: `referral_declined` |
| `quoted` | `quote_accepted` | `client_accepts_quote` | `client` | — | Activity log: `quote_accepted`; job record created |
| `quoted` | `declined` | `client_rejects_quote` | `client` | — | Activity log: `quote_rejected` |
| `quote_accepted` | `scheduled` | `appointment_confirmed` | `service_partner` | — | Activity log: `job_scheduled` |
| `scheduled` | `in_progress` | `job_started` | `service_partner` | — | Activity log: `job_started` |
| `in_progress` | `completed` | `job_completed` | `service_partner` | — | Activity log: `job_completed`; payment processing triggered |
| `completed` | `awaiting_payment` | `payment_initiated` | `system` | Job status `completed` | Activity log: `payment_initiated` |
| `awaiting_payment` | `paid` | `payment_disbursed` | `system` | Payment cleared | Activity log: `payment_disbursed`; earnings record updated |
| `scheduled` | `cancelled` | `job_cancelled` | `service_partner` or `client` | Job not started | Activity log: `job_cancelled` |
| `quote_accepted` | `cancelled` | `job_cancelled` | `service_partner` or `client` | — | Activity log: `job_cancelled` |

### Invariants

- `declined` and `cancelled` are terminal; no transition out of these states.
- `paid` cannot revert to `awaiting_payment`.
- A quote cannot be submitted against a `declined` or `cancelled` referral.
