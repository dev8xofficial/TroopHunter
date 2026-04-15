# Activity Log Events — 005 Reviews

---

### EVT-RV-001 · review_submitted

| Field | Value |
|---|---|
| **Triggering Actor** | `client` |
| **Trigger** | Client submits a review for a completed job |
| **Entity Type** | `review` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `review_id` | UUID |
| `job_id` | UUID |
| `partner_id` | UUID |
| `client_id` | UUID |
| `rating` | integer (1–5) |
| `review_date` | ISO 8601 |

**Side Effect**: `average_rating` recomputed; routing priority score updated.

---

### EVT-RV-002 · review_response_submitted

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner submits a response to a published review |
| **Entity Type** | `review` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `review_id` | UUID |
| `partner_id` | UUID |
| `response_text` | string |
| `responded_at` | ISO 8601 |

**Side Effect**: `response_rate` recomputed.

---

### EVT-RV-003 · review_rating_computed

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | `average_rating` recomputed after new review |
| **Entity Type** | `partner` |
| **Visibility** | `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `previous_average_rating` | decimal |
| `new_average_rating` | decimal |
| `total_reviews` | integer |
| `computed_at` | ISO 8601 |

**Immutability Rule**: All events are insert-only.
