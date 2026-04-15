# State Machines — 008 Profile

## SM-CREDENTIAL-VERIFICATION · License and Insurance Verification Status

Profile fields related to licensing and insurance have their own independent
verification lifecycle managed by administrators.

### States (applied to `license_verification_status` and `insurance_verification_status`)

| State | Description |
|---|---|
| `pending_verification` | Field value submitted; awaiting admin review |
| `verified` | Admin has confirmed the credential is valid |
| `rejected` | Admin has determined the credential is invalid or insufficient |

### Transition Table (License)

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `pending_verification` | `license_submitted` | `service_partner` or `system` (at registration) | Non-empty value provided | Activity log: `credential_submitted`; admin notification |
| `pending_verification` | `verified` | `admin_verifies_license` | `admin` | — | Activity log: `license_verified`; partner notified |
| `pending_verification` | `rejected` | `admin_rejects_license` | `admin` | — | Activity log: `license_rejected`; partner notified; account may remain `active_verified` if previously verified |
| `verified` | `pending_verification` | `partner_updates_license` | `service_partner` | New value differs from stored | Activity log: `credential_resubmitted`; admin notification |
| `rejected` | `pending_verification` | `partner_resubmits_license` | `service_partner` | — | Activity log: `credential_resubmitted` |

The same state machine applies identically to `insurance_verification_status`
with corresponding triggers (`admin_verifies_insurance`, `admin_rejects_insurance`,
`partner_updates_insurance`).

### Invariants

- Updating `license_number`, `insurance_policy_type`, `coverage_amount`, or
  `policy_number` always resets the corresponding verification status to
  `pending_verification`.
- An account can remain `active_verified` even if a credential update puts
  verification into `pending_verification`, but the admin is notified and may
  suspend the account at their discretion.
- `service_categories` changes do not trigger a verification workflow.
- `notification_preferences` changes take effect immediately; no verification.

## SM-NOTIFICATION-PREFERENCE · (Stateless)

Notification preferences are boolean toggles with no state lifecycle.
Changes are persisted and applied immediately. No state machine applies.
