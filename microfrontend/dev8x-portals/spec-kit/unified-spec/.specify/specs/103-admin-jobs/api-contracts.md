# Admin Jobs - API Contracts

> **Module ID**: `103-admin-jobs`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/jobs

| Field | Value |
| --- | --- |
| **Description** | Return the filtered job roster. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| job_id | uuid | Job identifier |
| status | string | Current status |
| applicant_count | integer | Linked applicants |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/jobs

| Field | Value |
| --- | --- |
| **Description** | Create a new job posting. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| title | string | Yes | max 150 | Job title |
| department | string | Yes | max 100 | Owning department |
| employment_type | string | Yes | max 50 | Employment type |
| status | string | Yes | draft \| live \| paused \| closed | Job status |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| job_id | uuid | Job identifier |
| status | string | Current status |
| applicant_count | integer | Linked applicants |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/admin/jobs/{id}/status

| Field | Value |
| --- | --- |
| **Description** | Update the job posting lifecycle state. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| status | string | Yes | live \| paused \| closed | Requested status |
| reason | string | No | max 500 | Lifecycle transition reason |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| job_id | uuid | Job identifier |
| status | string | Current status |
| applicant_count | integer | Linked applicants |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/admin/jobs/{id}

| Field | Value |
| --- | --- |
| **Description** | Return the detailed job posting. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| job_id | uuid | Job identifier |
| status | string | Current status |
| applicant_count | integer | Linked applicants |

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
