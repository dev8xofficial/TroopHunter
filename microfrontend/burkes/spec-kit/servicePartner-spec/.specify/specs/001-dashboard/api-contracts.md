# API Contracts — 001 Dashboard

---

## DASH-001 · Get Dashboard Summary

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/dashboard`
**Auth Requirement**: `service_partner` (own `partner_id` only)

### Request Parameters
| Parameter | Location | Type | Required |
|---|---|---|---|
| `partner_id` | path | UUID | yes |

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "new_referral_count": "integer",
  "active_job_count": "integer",
  "average_rating": "decimal (1.0–5.0)",
  "review_count": "integer",
  "current_month_revenue": "decimal",
  "recent_referrals": [
    {
      "referral_id": "uuid",
      "transaction_ref": "string",
      "client_name": "string",
      "property_address": "string",
      "service_type": "enum",
      "referral_status": "enum",
      "posted_at": "ISO 8601"
    }
  ],
  "active_service_areas": [
    {
      "service_area_id": "uuid",
      "zip_code": "string",
      "city": "string",
      "area_status": "enum"
    }
  ],
  "recent_reviews": [
    {
      "review_id": "uuid",
      "client_name": "string",
      "rating": "integer",
      "review_date": "ISO 8601"
    }
  ],
  "computed_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Dashboard data returned |
| 401 | Unauthenticated |
| 403 | `partner_id` does not match session; or account suspended/deactivated |
| 404 | Partner not found |

---

## DASH-002 · Get Performance Metrics (Dashboard KPIs)

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/metrics`
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
  "new_referral_count": "integer",
  "active_job_count": "integer",
  "completed_job_count": "integer",
  "total_revenue": "decimal",
  "average_rating": "decimal",
  "quote_acceptance_rate": "decimal (0.0–1.0)",
  "average_response_time_hours": "decimal"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Metrics returned |
| 401 | Unauthenticated |
| 403 | Forbidden |
