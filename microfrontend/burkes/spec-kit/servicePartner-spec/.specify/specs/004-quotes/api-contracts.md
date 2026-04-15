# API Contracts — 004 Quotes

---

## QT-001 · List Quotes

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/quotes`
**Auth Requirement**: `service_partner` (own)

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | enum | no | `pending`, `accepted`, `declined` |
| `page` | integer | no | Default 1 |
| `per_page` | integer | no | Default 20, max 100 |

### Response Body (200 OK)
```json
{
  "data": [
    {
      "quote_id": "uuid",
      "referral_id": "uuid",
      "transaction_ref": "string",
      "client_name": "string",
      "service_type": "enum",
      "labor_cost": "decimal",
      "materials_cost": "decimal",
      "total_quote_amount": "decimal",
      "estimated_completion_time": "enum",
      "quote_status": "enum",
      "submitted_at": "ISO 8601"
    }
  ],
  "pagination": {
    "total": "integer",
    "page": "integer",
    "per_page": "integer"
  },
  "statistics": {
    "acceptance_rate": "decimal (0.0–1.0)",
    "average_response_time_hours": "decimal",
    "total_quotes_sent": "integer"
  }
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Quotes returned |
| 401 | Unauthenticated |
| 403 | Forbidden |

---

## QT-002 · Submit Quote

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/referrals/{referral_id}/quote`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "service_description": "string (required, min 10 chars, max 2000 chars)",
  "labor_cost": "decimal (required, min 0.01)",
  "materials_cost": "decimal (required, min 0.00)",
  "estimated_completion_time": "enum (required)",
  "additional_notes": "string (optional, max 1000 chars)"
}
```

`total_quote_amount` is computed server-side as `labor_cost + materials_cost`.
Partners MUST NOT submit `total_quote_amount`; the field is rejected if present.

### Response Body (201 Created)
```json
{
  "quote_id": "uuid",
  "referral_id": "uuid",
  "total_quote_amount": "decimal",
  "quote_status": "pending",
  "submitted_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 201 | Quote created |
| 400 | Referral in terminal state (`declined`/`cancelled`) |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Referral not found |
| 409 | Quote already submitted for this referral by this partner |
| 422 | Payload validation failure |

---

## QT-003 · Get Quote Detail

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/quotes/{quote_id}`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "quote_id": "uuid",
  "referral_id": "uuid",
  "transaction_ref": "string",
  "client_name": "string",
  "property_address": "string",
  "service_description": "string",
  "labor_cost": "decimal",
  "materials_cost": "decimal",
  "total_quote_amount": "decimal",
  "estimated_completion_time": "enum",
  "additional_notes": "string | null",
  "quote_status": "enum",
  "submitted_at": "ISO 8601",
  "responded_at": "ISO 8601 | null"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Quote returned |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Quote not found |
