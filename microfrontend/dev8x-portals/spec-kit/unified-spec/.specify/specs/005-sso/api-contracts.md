# SSO - API Contracts

> **Module ID**: `005-sso`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/auth/sso/google/init

| Field | Value |
| --- | --- |
| **Description** | Create a signed Google SSO handshake. |
| **Auth** | None |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| portal | string | Yes | candidate \| client | Target portal |
| return_to | string | No | Optional route override | Preferred return route |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| token | string | Issued session token |
| provider | string | Identity provider |
| linked_account | boolean | Link result |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/sso/google/callback

| Field | Value |
| --- | --- |
| **Description** | Validate the Google callback and issue a platform session. |
| **Auth** | None |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| state | string | Yes | signed opaque token | Provider state value |
| authorization_code | string | Yes | provider authorization code | Provider code |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| token | string | Issued session token |
| provider | string | Identity provider |
| linked_account | boolean | Link result |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/sso/google/link

| Field | Value |
| --- | --- |
| **Description** | Link a Google identity to an existing eligible account. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| state | string | Yes | signed opaque token | Provider state value |
| authorization_code | string | Yes | provider authorization code | Provider code |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| token | string | Issued session token |
| provider | string | Identity provider |
| linked_account | boolean | Link result |

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
