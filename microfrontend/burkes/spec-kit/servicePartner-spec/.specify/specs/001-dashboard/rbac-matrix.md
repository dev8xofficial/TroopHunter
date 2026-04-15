# RBAC Matrix — 001 Dashboard

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` |
|---|---|---|---|
| Dashboard Summary (own) | R | R (all) | — |
| Performance Metrics (own) | R | R (all) | — |

## Field-Level Ownership

| Field | Writer | Reader |
|---|---|---|
| `new_referral_count` | `system` (computed) | `service_partner` (own), `admin` |
| `active_job_count` | `system` (computed) | `service_partner` (own), `admin` |
| `average_rating` | `system` (computed) | `service_partner` (own), `admin` |
| `current_month_revenue` | `system` (computed) | `service_partner` (own), `admin` |
| `quote_acceptance_rate` | `system` (computed) | `admin` only |
| `average_response_time_hours` | `system` (computed) | `admin` only |

## Conditions on Access

- A `service_partner` can only retrieve their own dashboard (`partner_id` in path
  must match session `partner_id`); any other `partner_id` returns HTTP 403.
- `quote_acceptance_rate` and `average_response_time_hours` are performance
  intelligence fields exposed to `admin` only; they are not returned in the
  partner-facing dashboard endpoint (`DASH-001`) but are available in the
  admin-facing metrics endpoint.
