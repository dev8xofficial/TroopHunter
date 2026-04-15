# RBAC Matrix — 002 Referrals

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` | `client` | `agent` |
|---|---|---|---|---|---|
| Referral (own assignments) | R | R (all), W | W (routing) | R (own requests) | R (own referrals) |
| Referral status transition | W (limited actions) | W (all) | W | W (limited: accept/reject quote) | — |
| Referral `referred_by_agent_id` | R | R | W | — | — |
| Referral `routing_priority_score` context | — | R | W | — | — |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `referral_id` | `system` | all assigned parties |
| `transaction_ref` | `system` (at creation, immutable) | all assigned parties |
| `client_name` | `system` (from client profile) | `service_partner` (own), `admin` |
| `property_address` | `agent` or `client` (at submission) | `service_partner` (own), `admin` |
| `service_type` | `client` or `agent` | all |
| `service_description` | `client` or `agent` | all |
| `budget_min`, `budget_max`, `budget_is_open` | `client` or `agent` | `service_partner`, `admin` |
| `timeline_urgency` | `client` or `agent` | all |
| `referral_status` | `system`, `service_partner` (limited), `client` (limited) | all assigned |
| `posted_at` | `system` (immutable) | all |
| `referred_by_agent_id` | `system` (from routing) | `service_partner` (own), `admin` |

## Conditions on Access

- A `service_partner` can only READ referrals where `partner_id` matches their
  session. Cross-partner referral access returns HTTP 403.
- `client_name` and `property_address` are revealed to the service partner only
  after the referral has been accepted for routing (any status post `new_lead`
  is accessible; `new_lead` also exposes address since partner must be able to
  assess geography).
- `referred_by_agent_id` is readable by the service partner for context but the
  partner may not contact the agent directly through this field.
