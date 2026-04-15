# Activity Log Events — 008 Profile

---

### EVT-P-001 · profile_updated

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner saves business information changes |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `updated_fields` | string[] |
| `updated_at` | ISO 8601 |

---

### EVT-P-002 · credential_submitted

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner submits or resubmits a credential field (`license_number`, insurance fields) |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `credential_type` | enum (`license`, `insurance`) |
| `submitted_at` | ISO 8601 |

---

### EVT-P-003 · license_verified

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin verifies license credential |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `admin_id` | UUID |
| `verified_at` | ISO 8601 |

---

### EVT-P-004 · license_rejected

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin rejects license credential |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `admin_id` | UUID |
| `rejection_reason` | string |
| `rejected_at` | ISO 8601 |

---

### EVT-P-005 · insurance_verified

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin verifies insurance credential |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `admin_id` | UUID |
| `policy_type` | enum |
| `coverage_amount` | string |
| `verified_at` | ISO 8601 |

---

### EVT-P-006 · insurance_rejected

| Field | Value |
|---|---|
| **Triggering Actor** | `admin` |
| **Trigger** | Admin rejects insurance credential |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `admin_id` | UUID |
| `rejection_reason` | string |
| `rejected_at` | ISO 8601 |

---

### EVT-P-007 · service_categories_updated

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner updates their service category list |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `previous_categories` | string[] |
| `new_categories` | string[] |
| `updated_at` | ISO 8601 |

---

### EVT-P-008 · notification_preferences_updated

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner changes notification preferences |
| **Entity Type** | `partner` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `partner_id` | UUID |
| `previous_preferences` | object |
| `new_preferences` | object |
| `updated_at` | ISO 8601 |

**Immutability Rule**: All events are insert-only.
