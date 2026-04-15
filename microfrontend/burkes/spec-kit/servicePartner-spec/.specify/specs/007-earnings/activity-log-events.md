# Activity Log Events — 007 Earnings

---

### EVT-E-001 · payment_initiated

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Job marked complete; payment processing initiated |
| **Entity Type** | `earnings_record` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `earnings_record_id` | UUID |
| `job_id` | UUID |
| `transaction_ref` | string |
| `partner_id` | UUID |
| `job_value` | decimal |
| `platform_fee_amount` | decimal |
| `partner_net_earnings` | decimal |
| `initiated_at` | ISO 8601 |

---

### EVT-E-002 · payment_disbursed

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Payment processor confirms successful disbursement |
| **Entity Type** | `earnings_record` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `earnings_record_id` | UUID |
| `partner_id` | UUID |
| `partner_net_earnings` | decimal |
| `paid_at` | ISO 8601 |
| `payment_reference` | string |

---

### EVT-E-003 · payment_failed

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Payment processor returns failure |
| **Entity Type** | `earnings_record` |
| **Visibility** | `admin` only |

**Payload Fields**
| Field | Type |
|---|---|
| `earnings_record_id` | UUID |
| `partner_id` | UUID |
| `failure_reason` | string |
| `failed_at` | ISO 8601 |
| `retry_scheduled_at` | ISO 8601 (nullable) |

---

### EVT-E-004 · payment_retried

| Field | Value |
|---|---|
| **Triggering Actor** | `system` (admin-triggered) |
| **Trigger** | Admin triggers payment retry |
| **Entity Type** | `earnings_record` |
| **Visibility** | `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `earnings_record_id` | UUID |
| `partner_id` | UUID |
| `admin_id` | UUID |
| `retried_at` | ISO 8601 |

**Immutability Rule**: All events are insert-only.
