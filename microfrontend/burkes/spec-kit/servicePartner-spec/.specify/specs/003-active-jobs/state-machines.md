# State Machines — 003 Active Jobs

## SM-JOB · Job Status

Jobs are created when a quote transitions to `quote_accepted`. The job lifecycle
runs concurrently with the referral lifecycle from that point.

### States

| State | Description |
|---|---|
| `scheduled` | Appointment confirmed; work not started |
| `in_progress` | Service partner has started work on-site |
| `completed` | Partner has marked the job as finished |
| `awaiting_payment` | Platform has initiated payment processing |
| `paid` | Net earnings disbursed to partner |
| `cancelled` | Cancelled before work commenced (terminal) |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(created)_ | `scheduled` | `appointment_confirmed` | `service_partner` | Quote accepted; `scheduled_date` provided | Activity log: `job_scheduled`; client notification sent |
| `scheduled` | `in_progress` | `job_started` | `service_partner` | `scheduled_date` ≤ current date | Activity log: `job_started` |
| `in_progress` | `completed` | `job_completed` | `service_partner` | — | Activity log: `job_completed`; payment initiation triggered by `system` |
| `completed` | `awaiting_payment` | `payment_initiated` | `system` | Job `completed` | Activity log: `payment_initiated`; earnings record created |
| `awaiting_payment` | `paid` | `payment_disbursed` | `system` | Payment cleared | Activity log: `payment_disbursed`; earnings record `partner_net_earnings` set |
| `scheduled` | `cancelled` | `job_cancelled` | `service_partner` or `client` | Job not `in_progress` | Activity log: `job_cancelled`; referral status → `cancelled` |
| `in_progress` | `cancelled` | — | — | NOT ALLOWED | Return HTTP 400 |

### Invariants

- A job in `in_progress` CANNOT be cancelled; it must be completed first.
- `job_value` is locked at the value of the accepted quote and cannot be modified
  after job creation.
- `completed` → `awaiting_payment` transition must be atomic with earnings record creation.
- `paid` is terminal; no state regression.
- `cancelled` is terminal; no state regression.
