# Activity Log Events — 006 Service Areas

---

### EVT-SA-001 · service_area_added

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner registers a new zip code |
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

### EVT-SA-002 · service_area_paused

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner pauses referral receipt for a zip code |
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

### EVT-SA-003 · service_area_resumed

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner resumes referral receipt for a paused zip code |
| **Entity Type** | `service_area` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `service_area_id` | UUID |
| `partner_id` | UUID |
| `zip_code` | string |
| `resumed_at` | ISO 8601 |

---

### EVT-SA-004 · service_area_removed

| Field | Value |
|---|---|
| **Triggering Actor** | `service_partner` |
| **Trigger** | Partner soft-deletes a service area registration |
| **Entity Type** | `service_area` |
| **Visibility** | `service_partner` (own), `admin` |

**Payload Fields**
| Field | Type |
|---|---|
| `service_area_id` | UUID |
| `partner_id` | UUID |
| `zip_code` | string |
| `removed_at` | ISO 8601 |

**Immutability Rule**: All events are insert-only.
