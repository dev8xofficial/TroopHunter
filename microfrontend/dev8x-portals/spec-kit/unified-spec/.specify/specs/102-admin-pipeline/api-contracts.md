# Admin Pipeline - API Contracts

> **Module ID**: `102-admin-pipeline`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/pipeline

| Field | Value |
| --- | --- |
| **Description** | Return the recruiting pipeline board. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| department | string | No | Optional department id | Department filter |
| urgent_only | boolean | No | default false | Only urgent cards |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| stage | string | Lane name |
| card_count | integer | Cards in lane |
| stale_count | integer | Cards over SLA |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/admin/pipeline/cards/{applicant_id}/stage

| Field | Value |
| --- | --- |
| **Description** | Move an applicant to a new pipeline stage. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| to_stage | string | Yes | Approved recruiting stage | Destination stage |
| reason | string | No | max 500 | Optional move rationale |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| stage | string | Lane name |
| card_count | integer | Cards in lane |
| stale_count | integer | Cards over SLA |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/admin/pipeline/metrics

| Field | Value |
| --- | --- |
| **Description** | Return aggregate board and funnel metrics. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| department | string | No | Optional department id | Department filter |
| urgent_only | boolean | No | default false | Only urgent cards |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| stage | string | Lane name |
| card_count | integer | Cards in lane |
| stale_count | integer | Cards over SLA |

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
