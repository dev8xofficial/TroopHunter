# API Contracts — 003 Active Jobs

---

## JOB-001 · List Active Jobs

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/jobs`
**Auth Requirement**: `service_partner` (own)

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | enum | no | `scheduled`, `in_progress`, `awaiting_payment` |
| `search` | string | no | Match on `client_name` or `transaction_ref`; max 100 chars |
| `page` | integer | no | Default 1 |
| `per_page` | integer | no | Default 20, max 100 |

### Response Body (200 OK)
```json
{
  "data": [
    {
      "job_id": "uuid",
      "referral_id": "uuid",
      "transaction_ref": "string",
      "client_name": "string",
      "property_address": "string",
      "service_type": "enum",
      "job_status": "enum",
      "scheduled_date": "ISO 8601 | null",
      "job_value": "decimal",
      "scope_of_work": "string",
      "referred_by_agent_name": "string | null"
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
| 422 | Invalid filter |

---

## JOB-002 · Get Job Detail

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/jobs/{job_id}`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "job_id": "uuid",
  "referral_id": "uuid",
  "transaction_ref": "string",
  "client_name": "string",
  "client_phone": "string",
  "property_address": "string",
  "service_type": "enum",
  "scope_of_work": "string",
  "scheduled_date": "ISO 8601 | null",
  "job_value": "decimal",
  "job_status": "enum",
  "completed_at": "ISO 8601 | null",
  "referred_by_agent_id": "uuid | null",
  "referred_by_agent_name": "string | null"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Job detail returned |
| 401 | Unauthenticated |
| 403 | Job does not belong to this partner |
| 404 | Job not found |

---

## JOB-003 · Reschedule Job

**HTTP Method**: `PATCH`
**Resource Pattern**: `/service-partner/{partner_id}/jobs/{job_id}/reschedule`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "new_scheduled_date": "ISO 8601 (required)",
  "reschedule_reason": "string (optional, max 300 chars)"
}
```

### Response Body (200 OK)
```json
{
  "job_id": "uuid",
  "new_scheduled_date": "ISO 8601",
  "job_status": "scheduled"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Rescheduled |
| 400 | Job in terminal state; cannot reschedule |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Job not found |
| 422 | `new_scheduled_date` in the past |

---

## JOB-004 · Mark Job Complete

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/jobs/{job_id}/complete`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "completion_notes": "string (optional, max 500 chars)"
}
```

### Response Body (200 OK)
```json
{
  "job_id": "uuid",
  "job_status": "completed",
  "completed_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Job marked complete; payment processing initiated |
| 400 | Job not in `in_progress` status |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Job not found |

---

## JOB-005 · Cancel Job

**HTTP Method**: `POST`
**Resource Pattern**: `/service-partner/{partner_id}/jobs/{job_id}/cancel`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "cancellation_reason": "string (required, max 300 chars)"
}
```

### Response Body (200 OK)
```json
{
  "job_id": "uuid",
  "job_status": "cancelled",
  "cancelled_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Job cancelled |
| 400 | Job already `in_progress` or `completed`; cancellation forbidden |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Job not found |
| 422 | Missing required `cancellation_reason` |
