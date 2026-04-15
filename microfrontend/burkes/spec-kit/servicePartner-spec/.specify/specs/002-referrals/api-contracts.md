# API Contracts — 002 Referrals

---

## REF-001 · List Referrals

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/referrals`
**Auth Requirement**: `service_partner` (own)

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | enum | no | Filter by `referral_status` |
| `service_type` | enum | no | Filter by service category |
| `search` | string | no | Full-text search on `client_name` or `transaction_ref`; max 100 chars |
| `page` | integer | no | Default 1 |
| `per_page` | integer | no | Default 20, max 100 |

### Response Body (200 OK)
```json
{
  "data": [
    {
      "referral_id": "uuid",
      "transaction_ref": "string",
      "client_name": "string",
      "property_address": "string",
      "service_type": "enum",
      "budget_min": "decimal | null",
      "budget_max": "decimal | null",
      "budget_is_open": "boolean",
      "timeline_urgency": "enum",
      "referral_status": "enum",
      "posted_at": "ISO 8601"
    }
  ],
  "pagination": {
    "total": "integer",
    "page": "integer",
    "per_page": "integer"
  }
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | List returned |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 422 | Invalid filter parameter |

---

## REF-002 · Get Referral Detail

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/referrals/{referral_id}`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "referral_id": "uuid",
  "transaction_ref": "string",
  "client_name": "string",
  "property_address": "string",
  "property_zip_code": "string",
  "service_type": "enum",
  "service_description": "string",
  "budget_min": "decimal | null",
  "budget_max": "decimal | null",
  "budget_is_open": "boolean",
  "timeline_urgency": "enum",
  "referral_status": "enum",
  "posted_at": "ISO 8601",
  "referred_by_agent_id": "uuid | null"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Referral returned |
| 401 | Unauthenticated |
| 403 | Referral not assigned to this partner |
| 404 | Referral not found |

---

## REF-003 · Contact Homeowner (Respond to Referral)

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/referrals/{referral_id}/contact`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "contact_method": "string (enum: phone, email, platform_message)",
  "contact_note": "string (optional, max 500 chars)"
}
```

### Response Body (200 OK)
```json
{
  "referral_id": "uuid",
  "referral_status": "contacted",
  "contacted_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Status updated to `contacted` |
| 400 | Referral already in terminal state |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Referral not found |
| 422 | Payload validation failure |

---

## REF-004 · Decline Referral

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/referrals/{referral_id}/decline`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "decline_reason": "string (optional, max 300 chars)"
}
```

### Response Body (200 OK)
```json
{
  "referral_id": "uuid",
  "referral_status": "declined",
  "declined_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Status updated to `declined` |
| 400 | Referral already in terminal state |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Referral not found |
