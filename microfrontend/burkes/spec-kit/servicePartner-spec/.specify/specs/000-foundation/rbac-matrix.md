# RBAC Matrix — 000 Foundation

## Role-by-Resource CRUD Table

| Resource | `service_partner` | `admin` | `system` | `client` | `agent` |
|---|---|---|---|---|---|
| SessionContext (own) | R | — | RW | — | — |
| AccountStatus | — | RW | — | — | — |
| ActivityLog (own events) | R | R (all) | W | — | — |
| NotificationEvent (own) | R | R (all) | W | — | — |
| RoutingPriorityScore | R (own) | R (all) | W | — | — |

## Field-Level Ownership Rules

| Entity | Field | Writer | Reader |
|---|---|---|---|
| `SessionContext` | `partner_id` | `system` (at registration) | `service_partner`, `admin` |
| `SessionContext` | `account_status` | `admin` | `service_partner`, `admin`, `system` |
| `SessionContext` | `routing_priority_score` | `system` | `admin` |
| `SessionContext` | `service_categories` | `service_partner` | `service_partner`, `admin`, `system` |
| `SessionContext` | `service_area_zip_codes` | `system` (derived from registrations) | `service_partner`, `admin`, `system` |
| `ActivityLogEvent` | all fields | `system` (insert only) | `service_partner` (own), `admin` (all) |
| `NotificationEvent` | all fields | `system` | `service_partner` (own), `admin` (all) |

## Conditions on Access

- `service_partner` can only read their own `ActivityLogEvent` records
  (filtered by `actor_id = session.partner_id OR entity_id = session.partner_id`).
- `admin` can read all `ActivityLogEvent` records across all partners.
- `service_partner` cannot read `routing_priority_score`; this field is
  `admin`-readable only. The partner experiences it indirectly as referral
  frequency.
- Notification delivery status (`delivery_status`) is readable by `admin` only,
  not by `service_partner`.
