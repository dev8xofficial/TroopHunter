# Activity Log Events — 000 Foundation

## Event Catalogue

---

### EVT-F-001 · account_created

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Service partner completes registration |
| **Entity Type** | `partner` |
| **Visibility** | `admin` |

**Payload Fields**
| Field | Type | Description |
|---|---|---|
| `partner_id` | UUID | Newly created partner |
| `company_name` | string | Business name at registration |
| `email` | string | Contact email |
| `registered_at` | ISO 8601 | UTC timestamp |

**Immutability Rule**: Immutable from insert.

---

### EVT-F-002 · account_verified

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin approves license and insurance |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type | Description |
|---|---|---|
| `partner_id` | UUID | Partner being verified |
| `admin_id` | UUID | Admin performing verification |
| `verified_at` | ISO 8601 | UTC timestamp |
| `license_verified` | boolean | Confirmed |
| `insurance_verified` | boolean | Confirmed |

**Immutability Rule**: Immutable from insert.

---

### EVT-F-003 · account_suspended

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` or `service_partner` |
| **Trigger** | Account suspended |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type | Description |
|---|---|---|
| `partner_id` | UUID | Partner suspended |
| `suspended_by_role` | enum | `admin` or `service_partner` |
| `suspended_by_id` | UUID | Actor ID |
| `reason` | string | Optional admin note |
| `suspended_at` | ISO 8601 | UTC timestamp |

**Immutability Rule**: Immutable from insert.

---

### EVT-F-004 · account_reinstated

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin reinstates suspended account |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type | Description |
|---|---|---|
| `partner_id` | UUID | Partner reinstated |
| `admin_id` | UUID | Admin performing reinstatement |
| `reinstated_at` | ISO 8601 | UTC timestamp |

**Immutability Rule**: Immutable from insert.

---

### EVT-F-005 · account_deactivated

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin permanently deactivates account |
| **Entity Type** | `partner` |
| **Visibility** | `admin` only |

**Payload Fields**
| Field | Type | Description |
|---|---|---|
| `partner_id` | UUID | Partner deactivated |
| `admin_id` | UUID | Admin |
| `deactivated_at` | ISO 8601 | UTC timestamp |
| `reason` | string | Required admin note |

**Immutability Rule**: Immutable from insert.

---

### EVT-F-006 · priority_score_updated

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Any event that recalculates routing_priority_score |
| **Entity Type** | `partner` |
| **Visibility** | `admin` |

**Payload Fields**
| Field | Type | Description |
|---|---|---|
| `partner_id` | UUID | Partner |
| `previous_score` | integer | Score before update |
| `new_score` | integer | Score after update |
| `trigger_event` | string | Event name that caused recalculation |
| `computed_at` | ISO 8601 | UTC timestamp |

**Immutability Rule**: Immutable from insert.
