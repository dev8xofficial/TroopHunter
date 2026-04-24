# Admin Interviews - API Contracts

> **Module ID**: `104-admin-interviews`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/interviews/calendar

| Field | Value |
| --- | --- |
| **Description** | Return the interview calendar. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| interview_id | uuid | Interview identifier |
| status | string | Current status |
| scheduled_for | datetime | Scheduled time |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/interviews

| Field | Value |
| --- | --- |
| **Description** | Create a new interview record. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| applicant_id | uuid | Yes | Applicant id | Applicant identifier |
| interviewer_id | uuid | Yes | Interviewer id | Assigned interviewer |
| scheduled_for | datetime | Yes | ISO-8601 | Interview start |
| type | string | Yes | screening \| technical \| final | Interview type |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| interview_id | uuid | Interview identifier |
| status | string | Current status |
| scheduled_for | datetime | Scheduled time |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/admin/interviews/{id}/status

| Field | Value |
| --- | --- |
| **Description** | Update interview status. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| status | string | Yes | confirmed \| completed \| cancelled \| no_show | New interview status |
| reason | string | No | max 500 | Update reason |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| interview_id | uuid | Interview identifier |
| status | string | Current status |
| scheduled_for | datetime | Scheduled time |

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
