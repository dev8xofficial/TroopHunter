# State Machines — 006 Service Areas

## SM-SERVICE-AREA · Service Area Registration Status

### States

| State | Description |
|---|---|
| `active` | Partner is actively receiving referrals for this zip code |
| `paused` | Partner has temporarily halted referrals for this zip code |
| `deleted` | Soft-deleted; record retained for audit; routing excluded |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `active` | `service_area_registered` | `service_partner` | Zip code valid; partner `active_verified`; zip not already registered | Activity log: `service_area_added`; routing matrix refreshed |
| `active` | `paused` | `service_area_paused` | `service_partner` | Area currently `active` | Activity log: `service_area_paused`; routing matrix updated; no new referrals routed to this zip |
| `paused` | `active` | `service_area_resumed` | `service_partner` | Area currently `paused` | Activity log: `service_area_resumed`; routing matrix updated |
| `active` | `deleted` | `service_area_removed` | `service_partner` | No open referrals pending in this zip | Activity log: `service_area_removed`; `deleted_at` set |
| `paused` | `deleted` | `service_area_removed` | `service_partner` | No open referrals pending | Activity log: `service_area_removed`; `deleted_at` set |

### Invariants

- A zip code cannot be registered twice for the same partner (unique constraint:
  `partner_id + zip_code + deleted_at = null`).
- Deletion is soft-delete only; `deleted_at` is set; physical row is retained for audit.
- A partner with zero `active` service areas receives no referrals but remains
  `active_verified`.
- The routing matrix must be refreshed within 60 seconds of any service area
  status change.

## SM-ZIP-RECOMMENDATION · Recommended Area Demand Level

Demand levels are computed by the system periodically and are informational only;
they do not gate partner actions.

| Level | Meaning |
|---|---|
| `high` | ≥10 unfulfilled referrals per month in that zip |
| `medium` | 4–9 unfulfilled referrals per month |
| `low` | 1–3 unfulfilled referrals per month |
