# RBAC Matrix — 006 Service Areas

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` |
|---|---|---|---|
| ServiceArea (own) | C, R, U (status), D (soft) | R (all), U | W (stats) |
| `area_status` transitions | W (pause/resume/delete) | W (override) | — |
| `referral_count_this_month` | R | R | W (computed) |
| `earned_this_month` | R | R | W (computed) |
| Recommendations | R | R | W (computed) |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `service_area_id` | `system` (at creation) | `service_partner`, `admin` |
| `zip_code` | `service_partner` (at creation, immutable) | `service_partner`, `admin`, `system` |
| `city` | `system` (resolved from zip at creation) | `service_partner`, `admin` |
| `area_status` | `service_partner` (pause/resume), `admin` (override) | all |
| `referral_count_this_month` | `system` (computed) | `service_partner`, `admin` |
| `earned_this_month` | `system` (computed from `paid` earnings) | `service_partner`, `admin` |
| `added_at` | `system` | `service_partner`, `admin` |
| `deleted_at` | `system` (on soft delete) | `admin` |

## Conditions on Access

- `delete` operation (soft-delete) is blocked if there are open referrals
  (`referral_status ∈ {new_lead, contacted, quoted, quote_accepted, scheduled, in_progress}`)
  in the target zip code assigned to this partner.
- `recommendations` are derived from platform-wide demand data and do not expose
  other partner's specific referral data.
- `city` is resolved server-side from the US ZIP code database; partners cannot
  supply or override the city value.
