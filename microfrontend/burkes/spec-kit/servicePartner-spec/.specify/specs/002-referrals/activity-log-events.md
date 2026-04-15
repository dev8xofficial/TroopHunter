# Activity Log Events — 002 Referrals

---

### EVT-R-001 · referral_routed

| Field | Value |
|---|---|
| **Triggering Actor** | `system` |
| **Trigger** | Referral matched and routed to service partner |
| **Entity Type** | `referral` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `referral_id` | UUID |
| `transaction_ref` | string |
| `partner_id` | UUID |
| `service_type` | enum |
| `property_zip_code` | string |
| `routed_at` | ISO 8601 |

---

### EVT-R-002 · referral_contacted

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner triggers contact action on referral |
| **Entity Type** | `referral` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `referral_id` | UUID |
| `partner_id` | UUID |
| `contact_method` | enum |
| `contacted_at` | ISO 8601 |
| `response_time_minutes` | integer |

---

### EVT-R-003 · referral_declined

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner declines referral |
| **Entity Type** | `referral` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `referral_id` | UUID |
| `partner_id` | UUID |
| `decline_reason` | string (nullable) |
| `declined_at` | ISO 8601 |

**Side Effect**: System recomputes `routing_priority_score`; may re-route referral to next-ranked partner.

---

### EVT-R-004 · service_area_added

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner registers a new service area zip code |
| **Entity Type** | `service_area` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `service_area_id` | UUID |
| `partner_id` | UUID |
| `zip_code` | string |
| `city` | string |
| `added_at` | ISO 8601 |

---

### EVT-R-005 · service_area_paused

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner pauses a service area |
| **Entity Type** | `service_area` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `service_area_id` | UUID |
| `partner_id` | UUID |
| `zip_code` | string |
| `paused_at` | ISO 8601 |

---

### EVT-R-006 · service_area_resumed

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner resumes a paused service area |
| **Entity Type** | `service_area` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `service_area_id` | UUID |
| `partner_id` | UUID |
| `zip_code` | string |
| `resumed_at` | ISO 8601 |

**Immutability Rule**: All activity log events are insert-only.
