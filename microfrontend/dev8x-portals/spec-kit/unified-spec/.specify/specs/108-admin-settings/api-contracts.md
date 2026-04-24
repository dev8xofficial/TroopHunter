# Admin Settings - API Contracts

> **Module ID**: `108-admin-settings`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/settings

| Field | Value |
| --- | --- |
| **Description** | Return effective admin settings. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| record_id | uuid | Record identifier |
| status | string | Current status |
| changed_by | uuid | Last editor |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/admin/settings

| Field | Value |
| --- | --- |
| **Description** | Apply or approve an admin setting change. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| setting_key | string | Yes | Existing setting id | Setting identifier |
| value | string | Yes | Serialized value | New value |
| approver_id | uuid | No | Required for sensitive changes | Approver |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| record_id | uuid | Record identifier |
| status | string | Current status |
| changed_by | uuid | Last editor |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/settings/users

| Field | Value |
| --- | --- |
| **Description** | Provision a new admin user. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| name | string | Yes | min 1, max 255 | Display name |
| email | string | Yes | RFC 5322, max 254 | Email address |
| role | string | Yes | hr_admin \| super_admin | Administrative role |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| record_id | uuid | Record identifier |
| status | string | Current status |
| changed_by | uuid | Last editor |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/admin/settings/users/{id}/role

| Field | Value |
| --- | --- |
| **Description** | Change an existing admin user role. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| name | string | Yes | min 1, max 255 | Display name |
| email | string | Yes | RFC 5322, max 254 | Email address |
| role | string | Yes | hr_admin \| super_admin | Administrative role |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| record_id | uuid | Record identifier |
| status | string | Current status |
| changed_by | uuid | Last editor |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

## Common Headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization` | Yes (authenticated endpoints) | `Bearer {token}` |
| `Content-Type` | Yes | `application/json` |
| `X-Request-ID` | Recommended | Request tracing identifier |
| `X-Portal` | Optional | Portal context |
