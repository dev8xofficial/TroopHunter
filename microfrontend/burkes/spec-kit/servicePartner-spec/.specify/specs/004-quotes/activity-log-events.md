# Activity Log Events — 004 Quotes

---

### EVT-Q-001 · quote_submitted

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner submits a quote for a referral |
| **Entity Type** | `quote` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `quote_id` | UUID |
| `referral_id` | UUID |
| `transaction_ref` | string |
| `partner_id` | UUID |
| `total_quote_amount` | decimal |
| `estimated_completion_time` | enum |
| `submitted_at` | ISO 8601 |

---

### EVT-Q-002 · quote_accepted

| Field | Value |
|---|---|
| **Triggering Actor** | `client` |
| **Trigger** | Homeowner accepts a submitted quote |
| **Entity Type** | `quote` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `quote_id` | UUID |
| `referral_id` | UUID |
| `partner_id` | UUID |
| `total_quote_amount` | decimal (locked) |
| `accepted_at` | ISO 8601 |
| `job_id` | UUID (created) |

---

### EVT-Q-003 · quote_rejected

| Field | Value |
|---|---|
| **Triggering Actor** | `client` |
| **Trigger** | Homeowner declines a submitted quote |
| **Entity Type** | `quote` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `quote_id` | UUID |
| `referral_id` | UUID |
| `partner_id` | UUID |
| `rejection_reason` | string (nullable) |
| `rejected_at` | ISO 8601 |

---

### EVT-Q-004 · quote_expired

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Decision window elapses without client response |
| **Entity Type** | `quote` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `quote_id` | UUID |
| `referral_id` | UUID |
| `partner_id` | UUID |
| `expired_at` | ISO 8601 |

**Immutability Rule**: All events are insert-only.
