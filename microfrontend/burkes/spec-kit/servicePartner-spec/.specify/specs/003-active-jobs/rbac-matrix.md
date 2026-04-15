# RBAC Matrix — 003 Active Jobs

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` | `client` |
|---|---|---|---|---|
| Job (own) | R, limited W | R (all), W | W | R (own) |
| Job status transitions | W (see constraints) | W (override) | W | W (cancel only) |
| `job_value` | R | R | W (at creation, immutable after) | R |
| `scope_of_work` | R | R, W | — | R |
| `scheduled_date` | R, W (reschedule) | R, W | — | R |
| `completion_notes` | W, R | R | — | — |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `job_id` | `system` (at creation) | all assigned parties |
| `referral_id` | `system` | all assigned parties |
| `transaction_ref` | `system` | all assigned parties |
| `job_value` | `system` (from accepted quote, immutable) | `service_partner`, `admin` |
| `job_status` | `service_partner` (limited transitions), `system`, `admin` | all assigned |
| `scheduled_date` | `service_partner` (via reschedule), initially from quote | all assigned |
| `scope_of_work` | `admin`, `service_partner` (notes only) | all assigned |
| `completed_at` | `system` (set on job_completed event) | all assigned |
| `client_phone` | `system` (from client profile) | `service_partner` (after `quote_accepted`) |

## Conditions on Access

- `client_phone` is only exposed to the service partner once the referral status
  is `quote_accepted` or later. It is withheld in `new_lead` and `contacted` states.
- A `service_partner` may only call cancel (`JOB-005`) when `job_status ∈ {scheduled}`;
  `in_progress` or later returns HTTP 400.
- `admin` overrides can force any status transition but must produce an activity
  log event with `actor_role = admin`.
