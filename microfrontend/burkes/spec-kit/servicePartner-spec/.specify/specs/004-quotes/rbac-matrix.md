# RBAC Matrix — 004 Quotes

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` | `client` |
|---|---|---|---|---|
| Quote (own) | C, R | R (all), W | W (computed fields) | R |
| `total_quote_amount` | R | R | W (computed, immutable after accepted) | R |
| `quote_status` | — (read only) | W (override) | W (expiry) | W (accept/decline) |
| Quote statistics | R (own) | R (all) | W (computed) | — |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `quote_id` | `system` (at creation) | `service_partner`, `admin`, `client` |
| `referral_id` | `system` | all assigned |
| `service_description` | `service_partner` | `service_partner`, `admin`, `client` |
| `labor_cost` | `service_partner` (at creation, locked on accept) | `service_partner`, `admin` |
| `materials_cost` | `service_partner` (at creation, locked on accept) | `service_partner`, `admin` |
| `total_quote_amount` | `system` (computed, immutable on accept) | all assigned |
| `estimated_completion_time` | `service_partner` (at creation) | all assigned |
| `additional_notes` | `service_partner` | `service_partner`, `admin` |
| `quote_status` | `client` (accept/decline), `system` (expire) | all assigned |
| `submitted_at` | `system` | all assigned |
| `responded_at` | `system` (on client decision) | all assigned |

## Conditions on Access

- `labor_cost` and `materials_cost` are not exposed to the `client`; only
  `total_quote_amount` is visible to clients.
- `additional_notes` (warranty terms, payment conditions) are visible to `admin`
  and `service_partner`; not to `client` in the standard flow unless explicitly
  included in the quote communication.
- Statistics (`acceptance_rate`, `total_quotes_sent`, `average_response_time_hours`)
  are partner-aggregated and visible to `service_partner` (own) and `admin`.
