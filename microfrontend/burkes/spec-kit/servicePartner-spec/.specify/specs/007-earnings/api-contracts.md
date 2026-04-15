# API Contracts — 007 Earnings

---

## ERN-001 · Get Earnings Summary

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/earnings/summary`
**Auth Requirement**: `service_partner` (own)

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `period` | enum | no | `current_month` (default), `ytd`, `last_30_days` |

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "period": "string",
  "total_earnings": "decimal",
  "average_job_value": "decimal",
  "pending_payment_amount": "decimal",
  "completed_job_count": "integer",
  "pending_job_count": "integer",
  "next_payout_date": "ISO 8601 | null"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Summary returned |
| 401 | Unauthenticated |
| 403 | Forbidden |

---

## ERN-002 · List Earnings Records (Payment History)

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/earnings`
**Auth Requirement**: `service_partner` (own)

### Query Parameters
| Parameter | Type | Required | Description |
|---|---|---|---|
| `payment_status` | enum | no | `paid`, `awaiting_payment` |
| `page` | integer | no | Default 1 |
| `per_page` | integer | no | Default 20, max 100 |

### Response Body (200 OK)
```json
{
  "data": [
    {
      "earnings_record_id": "uuid",
      "job_id": "uuid",
      "transaction_ref": "string",
      "client_name": "string",
      "service_type": "enum",
      "completed_date": "ISO 8601",
      "job_value": "decimal",
      "platform_fee_amount": "decimal",
      "partner_net_earnings": "decimal",
      "payment_status": "enum"
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
| 200 | Earnings list returned |
| 401 | Unauthenticated |
| 403 | Forbidden |

---

## ERN-003 · Get Single Earnings Record

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/earnings/{earnings_record_id}`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "earnings_record_id": "uuid",
  "job_id": "uuid",
  "transaction_ref": "string",
  "client_name": "string",
  "service_type": "enum",
  "scope_of_work": "string",
  "completed_date": "ISO 8601",
  "job_value": "decimal",
  "platform_fee_rate": "decimal",
  "platform_fee_amount": "decimal",
  "partner_net_earnings": "decimal",
  "payment_status": "enum",
  "paid_at": "ISO 8601 | null"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Record returned |
| 401 | Unauthenticated |
| 403 | Does not belong to this partner |
| 404 | Not found |
