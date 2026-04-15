# Activity Log Events — 003 Active Jobs

---

### EVT-J-001 · job_scheduled

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Appointment confirmed after quote acceptance |
| **Entity Type** | `job` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `job_id` | UUID |
| `referral_id` | UUID |
| `transaction_ref` | string |
| `scheduled_date` | ISO 8601 |
| `job_value` | decimal |
| `scheduled_by_partner_id` | UUID |

---

### EVT-J-002 · job_rescheduled

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner reschedules the appointment |
| **Entity Type** | `job` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `job_id` | UUID |
| `previous_scheduled_date` | ISO 8601 |
| `new_scheduled_date` | ISO 8601 |
| `reschedule_reason` | string (nullable) |
| `rescheduled_at` | ISO 8601 |

---

### EVT-J-003 · job_started

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner marks job as in progress |
| **Entity Type** | `job` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `job_id` | UUID |
| `started_at` | ISO 8601 |
| `partner_id` | UUID |

---

### EVT-J-004 · job_completed

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner marks job as completed |
| **Entity Type** | `job` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `job_id` | UUID |
| `transaction_ref` | string |
| `job_value` | decimal |
| `completion_notes` | string (nullable) |
| `completed_at` | ISO 8601 |

**Side Effect**: System initiates payment_initiated event within the same transaction.

---

### EVT-J-005 · job_cancelled

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` or `client` |
| **Trigger** | Job cancelled before `in_progress` |
| **Entity Type** | `job` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `job_id` | UUID |
| `cancelled_by_role` | enum |
| `cancelled_by_id` | UUID |
| `cancellation_reason` | string |
| `cancelled_at` | ISO 8601 |

**Immutability Rule**: All events are insert-only.
