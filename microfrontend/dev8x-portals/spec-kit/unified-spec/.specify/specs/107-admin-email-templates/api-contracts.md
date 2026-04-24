# Admin Email Templates - API Contracts

> **Module ID**: `107-admin-email-templates`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/templates

| Field | Value |
| --- | --- |
| **Description** | Return the recruiting email template library. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| template_id | uuid | Template identifier |
| status | string | Current status |
| variable_count | integer | Number of allowed variables |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/templates

| Field | Value |
| --- | --- |
| **Description** | Create or update a recruiting email template. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| template_key | string | Yes | unique | Template identifier |
| subject | string | Yes | max 255 | Email subject |
| body | string | Yes | max 10000 | Email body |
| status | string | Yes | draft \| approved \| retired | Template status |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| template_id | uuid | Template identifier |
| status | string | Current status |
| variable_count | integer | Number of allowed variables |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/templates/{id}/preview

| Field | Value |
| --- | --- |
| **Description** | Render a preview of a template with sample values. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| sample_candidate_name | string | No | max 100 | Sample candidate name |
| sample_position_title | string | No | max 150 | Sample position title |
| sample_company_name | string | No | max 150 | Sample company name |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| template_id | uuid | Template identifier |
| status | string | Current status |
| variable_count | integer | Number of allowed variables |

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
