# Admin Evaluations - API Contracts

> **Module ID**: `105-admin-evaluations`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/evaluations/{applicant_id}

| Field | Value |
| --- | --- |
| **Description** | Return evaluation history for an applicant. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| evaluation_id | uuid | Evaluation identifier |
| status | string | Current status |
| recommendation | string | Recommendation |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/evaluations/{applicant_id}

| Field | Value |
| --- | --- |
| **Description** | Save or submit an evaluation. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| applicant_id | uuid | Yes | Applicant id | Applicant identifier |
| status | string | Yes | draft \| submitted | Requested lifecycle state |
| technical_score | number | Yes | 0-5 | Technical score |
| communication_score | number | Yes | 0-5 | Communication score |
| notes | string | No | max 2000 | Evaluator notes |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| evaluation_id | uuid | Evaluation identifier |
| status | string | Current status |
| recommendation | string | Recommendation |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/admin/evaluations/{applicant_id}/decision

| Field | Value |
| --- | --- |
| **Description** | Record a calibrated or finalized decision. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| status | string | Yes | calibrated \| finalized | Lifecycle state |
| recommendation | string | Yes | advance \| hold \| reject | Decision recommendation |
| decision_notes | string | No | max 2000 | Decision notes |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| evaluation_id | uuid | Evaluation identifier |
| status | string | Current status |
| recommendation | string | Recommendation |

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
