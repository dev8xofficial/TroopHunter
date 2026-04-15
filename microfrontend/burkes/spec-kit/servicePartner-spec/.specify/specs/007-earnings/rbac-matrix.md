# RBAC Matrix — 007 Earnings

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` |
|---|---|---|---|
| EarningsRecord (own) | R | R (all), W (admin override) | W (create, update status) |
| EarningsSummary (own) | R | R (all) | W (computed) |
| `platform_fee_rate` | — | R, W | W (apply at creation) |
| `platform_fee_amount` | R (result only) | R | W (computed, immutable) |
| Payment status transitions | — | W (retry trigger) | W |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `earnings_record_id` | `system` | `service_partner`, `admin` |
| `job_id` | `system` | `service_partner`, `admin` |
| `job_value` | `system` (from accepted quote) | `service_partner`, `admin` |
| `platform_fee_rate` | `admin` (config), `system` (apply) | `admin` only |
| `platform_fee_amount` | `system` (computed, immutable) | `service_partner`, `admin` |
| `partner_net_earnings` | `system` (computed, immutable) | `service_partner`, `admin` |
| `payment_status` | `system` (transitions) | `service_partner`, `admin` |
| `paid_at` | `system` | `service_partner`, `admin` |
| `next_payout_date` | `system` (schedule) | `service_partner`, `admin` |

## Conditions on Access

- `platform_fee_rate` is visible to `admin` only; the partner sees only the
  computed `platform_fee_amount` and `partner_net_earnings`.
- EarningsRecords are read-only for `service_partner`; no edits permitted.
- `admin` write access is limited to triggering payment retries; admin cannot
  modify `job_value`, `platform_fee_amount`, or `partner_net_earnings` directly.
  These fields require a formal reconciliation workflow (out of scope for this module).
