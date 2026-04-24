# Candidate Interviews - API Contracts

> **Module ID**: `202-candidate-interviews`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/candidate/interviews/availability

| Field | Value |
| --- | --- |
| **Description** | Return available interview slots for the candidate. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| interview_id | uuid | Interview identifier |
| status | string | Current status |
| reserved_for | datetime | Reserved slot |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/candidate/interviews/reservations

| Field | Value |
| --- | --- |
| **Description** | Reserve an available interview slot. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| slot_id | uuid | Yes | Available slot id | Requested slot |
| confirmation_note | string | No | max 500 | Optional note |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| interview_id | uuid | Interview identifier |
| status | string | Current status |
| reserved_for | datetime | Reserved slot |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/candidate/interviews/reservations/{id}

| Field | Value |
| --- | --- |
| **Description** | Confirm, cancel, or reschedule an interview reservation. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| status | string | Yes | confirmed \| cancelled | Requested status |
| reason | string | No | max 500 | Update reason |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| interview_id | uuid | Interview identifier |
| status | string | Current status |
| reserved_for | datetime | Reserved slot |

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
