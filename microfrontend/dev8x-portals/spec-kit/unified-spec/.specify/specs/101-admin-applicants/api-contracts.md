# Admin Applicants - API Contracts

> **Module ID**: `101-admin-applicants`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/applicants

| Field | Value |
| --- | --- |
| **Description** | Return the applicant roster for the current filters. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| page | integer | No | min 1, default 1 | Page number |
| page_size | integer | No | min 1, max 100, default 25 | Page size |
| status | string | No | Applicant stage | Status filter |
| position_title | string | No | Optional exact or partial match | Position filter |
| department | string | No | Optional department id | Department filter |
| date_from | date | No | Inclusive lower bound | Reporting range start |
| date_to | date | No | Inclusive upper bound | Reporting range end |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| applicant_id | uuid | Applicant identifier |
| status | string | Applicant status |
| evaluation_score | number | Current evaluation score |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/admin/applicants/{id}

| Field | Value |
| --- | --- |
| **Description** | Return the detailed applicant record. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| applicant_id | uuid | Applicant identifier |
| status | string | Applicant status |
| evaluation_score | number | Current evaluation score |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/admin/applicants/{id}/status

| Field | Value |
| --- | --- |
| **Description** | Update applicant status along the approved lifecycle. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| status | string | Yes | Approved applicant lifecycle value | New status |
| reason | string | No | Required for rejected and future_hire | Status reason |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| applicant_id | uuid | Applicant identifier |
| status | string | Applicant status |
| evaluation_score | number | Current evaluation score |

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
