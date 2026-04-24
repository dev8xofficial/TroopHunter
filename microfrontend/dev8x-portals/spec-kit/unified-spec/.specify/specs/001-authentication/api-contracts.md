# Authentication - API Contracts

> **Module ID**: `001-authentication`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### POST /api/v1/auth/login

| Field | Value |
| --- | --- |
| **Description** | Authenticate a user into the selected portal. |
| **Auth** | None |
| **Rate Limit** | 10 requests/minute per IP |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| email | string | Yes | RFC 5322, max 254 | Email address |
| password | string | Yes | min 8 | Submitted password |
| portal | string | Yes | enum: candidate, client, admin, crm | Requested portal |
| remember_me | boolean | No | default false | Extend non-admin session lifetime |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| token | string | Issued access token |
| portal | string | Session portal |
| expires_at | datetime | Session expiry |
| mfa_required | boolean | Indicates whether MFA is pending |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/register

| Field | Value |
| --- | --- |
| **Description** | Create a new candidate account. |
| **Auth** | None |
| **Rate Limit** | 5 requests/minute per IP |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| first_name | string | Yes | min 1, max 100 | First name |
| last_name | string | Yes | min 1, max 100 | Last name |
| email | string | Yes | RFC 5322, max 254 | Email address |
| password | string | Yes | min 8 with complexity | Password |
| password_confirmation | string | Yes | Must match password | Password confirmation |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| user_id | uuid | Created user |
| email | string | Registered email |
| message | string | Registration result message |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/logout

| Field | Value |
| --- | --- |
| **Description** | Terminate the current or all active sessions. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| all_devices | boolean | No | default false | Revoke all active sessions for the current user |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| message | string | Logout result |
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
