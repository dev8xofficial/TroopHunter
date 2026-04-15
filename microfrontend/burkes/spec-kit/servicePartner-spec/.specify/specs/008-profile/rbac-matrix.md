# RBAC Matrix — 008 Profile

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` |
|---|---|---|---|
| Profile (own) | R, U (limited fields) | R (all), U | R |
| `license_verification_status` | R | R, W | — |
| `insurance_verification_status` | R | R, W | — |
| `account_status` | R | R, W | — |
| `membership_type` | R | R, W | — |
| `member_since` | R | R | W (at account creation) |
| `notification_preferences` | R, W | R | — |
| `service_categories` | R, W | R, W | R |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `partner_id` | `system` (immutable) | `service_partner`, `admin` |
| `company_name` | `service_partner` | `service_partner`, `admin` |
| `contact_name` | `service_partner` | `service_partner`, `admin` |
| `phone_number` | `service_partner` | `service_partner`, `admin` |
| `email_address` | `service_partner` | `service_partner`, `admin` |
| `business_address` | `service_partner` | `service_partner`, `admin` |
| `license_number` | `service_partner` (triggers re-verify) | `service_partner`, `admin` |
| `license_verification_status` | `admin` | `service_partner`, `admin` |
| `years_in_business` | `service_partner` | `service_partner`, `admin` |
| `insurance_policy_type` | `service_partner` (triggers re-verify) | `service_partner`, `admin` |
| `coverage_amount` | `service_partner` (triggers re-verify) | `service_partner`, `admin` |
| `policy_number` | `service_partner` (triggers re-verify) | `service_partner`, `admin` |
| `insurance_verification_status` | `admin` | `service_partner`, `admin` |
| `service_categories` | `service_partner`, `admin` | all |
| `membership_type` | `admin` | `service_partner`, `admin` |
| `account_status` | `admin` | `service_partner`, `admin` |
| `member_since` | `system` (at creation, immutable) | `service_partner`, `admin` |
| `notification_preferences.*` | `service_partner` | `service_partner`, `admin` |

## Conditions on Access

- `service_partner` cannot modify `membership_type`, `account_status`,
  `member_since`, or either verification status field.
- Any change to `license_number`, `insurance_policy_type`, `coverage_amount`,
  or `policy_number` by `service_partner` MUST atomically reset the corresponding
  `*_verification_status` to `pending_verification` in the same database transaction.
- `admin` can update `service_categories` on behalf of a partner (e.g., during
  onboarding), but this does not trigger a verification reset.
