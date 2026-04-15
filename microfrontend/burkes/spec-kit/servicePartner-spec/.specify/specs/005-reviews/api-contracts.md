# API Contracts — 005 Reviews

---

## REV-001 · List Reviews for Partner

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/reviews`
**Auth Requirement**: `service_partner` (own)

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `responded` | boolean | no | Filter: `true` = reviews with response, `false` = without |
| `page` | integer | no | Default 1 |
| `per_page` | integer | no | Default 20, max 100 |

### Response Body (200 OK)
```json
{
  "data": [
    {
      "review_id": "uuid",
      "job_id": "uuid",
      "transaction_ref": "string",
      "client_name": "string",
      "rating": "integer (1–5)",
      "review_text": "string",
      "review_date": "ISO 8601",
      "partner_response": "string | null",
      "partner_responded_at": "ISO 8601 | null"
    }
  ],
  "aggregate": {
    "overall_rating": "decimal",
    "total_reviews": "integer",
    "response_rate": "decimal (0.0–1.0)"
  },
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
| 200 | Reviews returned |
| 401 | Unauthenticated |
| 403 | Forbidden |

---

## REV-002 · Submit Review Response

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/reviews/{review_id}/respond`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "response_text": "string (required, min 1 char, max 1000 chars)"
}
```

### Response Body (201 Created)
```json
{
  "review_id": "uuid",
  "partner_response": "string",
  "partner_responded_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 201 | Response submitted |
| 401 | Unauthenticated |
| 403 | Review does not belong to this partner |
| 404 | Review not found |
| 409 | Response already exists for this review |
| 422 | Payload validation failure |

---

## REV-003 · Get Review Aggregate Statistics

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/reviews/stats`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "overall_rating": "decimal (1.0–5.0)",
  "total_reviews": "integer",
  "response_rate": "decimal (0.0–1.0)",
  "rating_distribution": {
    "5": "integer",
    "4": "integer",
    "3": "integer",
    "2": "integer",
    "1": "integer"
  }
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Stats returned |
| 401 | Unauthenticated |
| 403 | Forbidden |
