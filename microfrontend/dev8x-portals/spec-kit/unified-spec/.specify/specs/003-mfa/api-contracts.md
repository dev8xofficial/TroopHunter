# MFA - API Contracts

> **Module ID**: `003-mfa`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### POST /api/v1/auth/mfa/challenge

| Field | Value |
| --- | --- |
| **Description** | Issue or rotate an MFA challenge for a pending session. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| session_id | uuid | Yes | Pending session id | Pending session identifier |
| challenge_type | string | No | totp \| recovery_code \| step_up | Requested challenge type |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| challenge_id | uuid | Challenge identifier |
| status | string | Challenge outcome |
| session_activated | boolean | Whether the session became active |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/mfa/verify

| Field | Value |
| --- | --- |
| **Description** | Verify the submitted MFA code. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| challenge_id | uuid | Yes | Existing issued challenge id | Challenge identifier |
| code | string | Yes | 6 digits or recovery token | Submitted second factor |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| challenge_id | uuid | Challenge identifier |
| status | string | Challenge outcome |
| session_activated | boolean | Whether the session became active |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/mfa/recovery

| Field | Value |
| --- | --- |
| **Description** | Verify a recovery code for a pending session. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| challenge_id | uuid | Yes | Existing issued challenge id | Challenge identifier |
| code | string | Yes | 6 digits or recovery token | Submitted second factor |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| challenge_id | uuid | Challenge identifier |
| status | string | Challenge outcome |
| session_activated | boolean | Whether the session became active |

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
| `X-Portal` | Yes for auth flows | Portal context |
