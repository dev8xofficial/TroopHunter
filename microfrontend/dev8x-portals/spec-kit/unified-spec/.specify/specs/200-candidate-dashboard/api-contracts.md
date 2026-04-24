# Candidate Dashboard - API Contracts

> **Module ID**: `200-candidate-dashboard`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/candidate/dashboard/summary

| Field | Value |
| --- | --- |
| **Description** | Return candidate progress summary. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| overall_completion_pct | number | Completion percentage |
| current_step | string | Current active step |
| quick_action_count | integer | Available actions |
| generated_at | datetime | Snapshot timestamp |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/candidate/dashboard/deadlines

| Field | Value |
| --- | --- |
| **Description** | Return candidate deadlines. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| overall_completion_pct | number | Completion percentage |
| current_step | string | Current active step |
| quick_action_count | integer | Available actions |
| generated_at | datetime | Snapshot timestamp |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/candidate/dashboard/quick-actions

| Field | Value |
| --- | --- |
| **Description** | Return currently available quick actions. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| overall_completion_pct | number | Completion percentage |
| current_step | string | Current active step |
| quick_action_count | integer | Available actions |
| generated_at | datetime | Snapshot timestamp |

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
