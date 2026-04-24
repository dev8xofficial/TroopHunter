# Password Reset - API Contracts

> **Module ID**: `004-password-reset`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### POST /api/v1/auth/password/request

| Field | Value |
| --- | --- |
| **Description** | Request a reset token for the supplied email. |
| **Auth** | None |
| **Rate Limit** | 5 requests/minute per IP |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| email | string | Yes | RFC 5322, max 254 | Email address |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| accepted | boolean | Request accepted |
| token_valid | boolean | Whether token is valid |
| sessions_revoked | integer | Number of revoked sessions |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/password/verify-token

| Field | Value |
| --- | --- |
| **Description** | Verify that a reset token is valid and unexpired. |
| **Auth** | None |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| token | string | Yes | opaque token | Reset token |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| accepted | boolean | Request accepted |
| token_valid | boolean | Whether token is valid |
| sessions_revoked | integer | Number of revoked sessions |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/password/reset

| Field | Value |
| --- | --- |
| **Description** | Complete the password reset flow. |
| **Auth** | None |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| token | string | Yes | opaque token | Reset token |
| password | string | Yes | min 8 with complexity | New password |
| password_confirmation | string | Yes | Must match password | Confirmation |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| accepted | boolean | Request accepted |
| token_valid | boolean | Whether token is valid |
| sessions_revoked | integer | Number of revoked sessions |

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
