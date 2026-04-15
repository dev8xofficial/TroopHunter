# API Contracts — 008 Profile

---

## PRF-001 · Get Partner Profile

**HTTP Method**: `GET`
**Resource Pattern**: `/service-partner/{partner_id}/profile`
**Auth Requirement**: `service_partner` (own)

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "company_name": "string",
  "contact_name": "string",
  "phone_number": "string",
  "email_address": "string",
  "business_address": "string",
  "license_number": "string",
  "license_verification_status": "enum",
  "years_in_business": "integer",
  "insurance_policy_type": "enum",
  "coverage_amount": "string",
  "policy_number": "string",
  "insurance_verification_status": "enum",
  "service_categories": "string[]",
  "membership_type": "enum",
  "member_since": "ISO 8601",
  "account_status": "enum",
  "notification_preferences": {
    "email_new_referrals": "boolean",
    "sms_urgent_requests": "boolean",
    "weekly_performance_reports": "boolean"
  }
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Profile returned |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 404 | Partner not found |

---

## PRF-002 · Update Business Information

**HTTP Method**: `PATCH`
**Resource Pattern**: `/service-partner/{partner_id}/profile/business`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "company_name": "string (optional, max 150 chars)",
  "contact_name": "string (optional, max 200 chars)",
  "phone_number": "string (optional, E.164 format)",
  "email_address": "string (optional, email format)",
  "business_address": "string (optional, max 300 chars)",
  "license_number": "string (optional, max 50 chars)",
  "years_in_business": "integer (optional, min 1, max 100)",
  "insurance_policy_type": "enum (optional)",
  "coverage_amount": "string (optional, max 20 chars)",
  "policy_number": "string (optional, max 50 chars)"
}
```

Fields not included in the request are not modified.

When `license_number`, `insurance_policy_type`, `coverage_amount`, or
`policy_number` are updated, the corresponding verification status resets to
`pending_verification` and an admin notification is dispatched.

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "updated_fields": ["string"],
  "license_verification_status": "enum",
  "insurance_verification_status": "enum",
  "updated_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Profile updated |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 422 | Validation failure |

---

## PRF-003 · Update Service Categories

**HTTP Method**: `PUT`
**Resource Pattern**: `/service-partner/{partner_id}/profile/service-categories`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "service_categories": ["enum (min 1 item, max 10 items)"]
}
```

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "service_categories": ["string"],
  "updated_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Categories updated |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 422 | Must include at least 1 category; invalid enum value |

---

## PRF-004 · Update Notification Preferences

**HTTP Method**: `PUT`
**Resource Pattern**: `/service-partner/{partner_id}/profile/notification-preferences`
**Auth Requirement**: `service_partner` (own)

### Request Body
```json
{
  "email_new_referrals": "boolean (required)",
  "sms_urgent_requests": "boolean (required)",
  "weekly_performance_reports": "boolean (required)"
}
```

### Response Body (200 OK)
```json
{
  "partner_id": "uuid",
  "notification_preferences": {
    "email_new_referrals": "boolean",
    "sms_urgent_requests": "boolean",
    "weekly_performance_reports": "boolean"
  },
  "updated_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Preferences updated |
| 401 | Unauthenticated |
| 403 | Forbidden |
| 422 | Validation failure |
