# RBAC Matrix — 005 Reviews

## Role-by-Resource CRUD

| Resource | `service_partner` | `admin` | `system` | `client` |
|---|---|---|---|---|
| Review | R (own) | R (all), W (moderation) | W (creation) | C, R (own), limited W |
| `review_text` | R | R, W (moderation flag) | — | W (72h edit window) |
| `rating` | R | R | — | W (immutable after 72h) |
| `partner_response` | C (once), R | R, W (moderation) | — | R |
| Review aggregate stats | R (own) | R (all) | W (computed) | — |

## Field-Level Ownership Rules

| Field | Writer | Reader |
|---|---|---|
| `review_id` | `system` (at creation) | `service_partner`, `admin`, `client` |
| `job_id` | `system` (from job record) | `service_partner`, `admin` |
| `client_name` | `system` (from client profile) | `service_partner`, `admin` |
| `rating` | `client` (immutable after 72h) | `service_partner`, `admin`, `client` |
| `review_text` | `client` (immutable after 72h) | `service_partner`, `admin`, `client` |
| `review_date` | `system` | all |
| `partner_response` | `service_partner` (once, immutable) | all |
| `partner_responded_at` | `system` (at response submission) | all |
| `overall_rating` | `system` (computed) | `service_partner`, `admin` |
| `response_rate` | `system` (computed) | `service_partner`, `admin` |

## Conditions on Access

- `partner_response` can only be written once per `review_id`. Any attempt to
  overwrite returns HTTP 409.
- `client_name` is exposed to the service partner once the review is published.
  The partner cannot identify the client's personal details beyond name.
- `admin` moderation write access allows flagging or suppressing review text
  without deleting the record (soft moderation only).
