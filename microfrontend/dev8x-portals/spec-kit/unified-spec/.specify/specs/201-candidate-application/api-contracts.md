# Candidate Application - API Contracts

> **Module ID**: `201-candidate-application`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/candidate/application/timeline

| Field | Value |
| --- | --- |
| **Description** | Return the candidate application timeline. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| step_key | string | Step identifier |
| status | string | Step status |
| step_date | datetime | When the step changed |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/candidate/application/status

| Field | Value |
| --- | --- |
| **Description** | Return the current application status summary. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| step_key | string | Step identifier |
| status | string | Step status |
| step_date | datetime | When the step changed |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/candidate/application/acknowledge-step

| Field | Value |
| --- | --- |
| **Description** | Record acknowledgement of a candidate-facing step. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| step_key | string | Yes | Existing step key | Acknowledged step |
| acknowledged | boolean | Yes | Must be true | Acknowledgement flag |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| step_key | string | Step identifier |
| status | string | Step status |
| step_date | datetime | When the step changed |

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
