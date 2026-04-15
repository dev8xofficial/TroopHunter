# API Contracts — 006 Service Areas

---

## SA-001 · List Service Areas

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/service-areas`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "active_areas": [
    {
      "service_area_id": "uuid",
      "zip_code": "string",
      "city": "string",
      "area_status": "active",
      "referral_count_this_month": "integer",
      "earned_this_month": "decimal",
      "added_at": "ISO 8601"
    }
  ],
  "paused_areas": [
    {
      "service_area_id": "uuid",
      "zip_code": "string",
      "city": "string",
      "area_status": "paused",
      "referral_count_this_month": "integer",
      "earned_this_month": "decimal",
      "added_at": "ISO 8601"
    }
  ]
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Service areas returned |
| 401 | Unauthenticated |
| 403 | Forbidden |

---

## SA-002 · Add Service Area

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/service-areas`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "zip_code": "string (required, 5-digit numeric)"
}
```

### Response Body (201 Created)
```json
{
  "service_area_id": "uuid",
  "zip_code": "string",
  "city": "string",
  "area_status": "active",
  "added_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 201 | Service area added |
| 400 | Account not `active_verified` |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 409 | Zip code already registered for this partner |
| 422 | Invalid zip code format |

---

## SA-003 · Pause Service Area

**HTTP Method**: `PATCH`
**Resource Pattern**: `/service-partner/{partner_id}/service-areas/{service_area_id}/pause`
**Auth Requirement**: `service_partner` (own)

### Request Body
None

### Response Body (200 OK)
```json
{
  "service_area_id": "uuid",
  "zip_code": "string",
  "area_status": "paused"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Paused |
| 400 | Area already paused |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Service area not found |

---

## SA-004 · Resume Service Area

**HTTP Method**: `PATCH`
**Resource Pattern**: `/service-partner/{partner_id}/service-areas/{service_area_id}/resume`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "service_area_id": "uuid",
  "zip_code": "string",
  "area_status": "active"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Resumed |
| 400 | Area already active |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Service area not found |

---

## SA-005 · Get Recommended Service Areas

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/service-areas/recommendations`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "recommendations": [
    {
      "zip_code": "string",
      "city": "string",
      "demand_level": "enum",
      "average_referral_value": "decimal"
    }
  ]
}
```

`demand_level` enum: `high`, `medium`, `low`.

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Recommendations returned |
| 401 | Unauthenticated |
| 403 | Forbidden |
