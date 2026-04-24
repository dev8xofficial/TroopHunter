# Authentication — API Contracts

> **Module ID**: `001-authentication`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### POST /api/v1/auth/login

| Field | Value |
|-------|-------|
| **Description** | Authenticate user with email and password |
| **Auth** | None (public endpoint) |
| **Rate Limit** | 10 requests/minute per IP |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| email | string | Yes | format: email, max: 254 | User's email address |
| password | string | Yes | min: 8 | User's password |
| portal | string | Yes | enum: candidate, client, admin | Target portal |
| totp_code | string | Conditional | pattern: `^[0-9]{6}$` | Required for Admin portal |
| remember_me | boolean | No | default: false | Extend session to 30 days |

**Response (200 OK):**

| Field | Type | Description |
|-------|------|-------------|
| token | string | JWT access token |
| user.id | uuid | User identifier |
| user.email | string | User email |
| user.first_name | string | First name |
| user.last_name | string | Last name |
| user.role | string | Platform role |
| portal | string | Authenticated portal |
| expires_at | datetime | Token expiry timestamp |
| mfa_required | boolean | Whether MFA verification is pending |

**Error Codes:**

| Code | Condition | Response Body |
|------|-----------|--------------|
| 400 | Missing required fields | `{ error: "VALIDATION_ERROR", details: [...] }` |
| 401 | Invalid credentials | `{ error: "INVALID_CREDENTIALS" }` |
| 403 | MFA required but not provided | `{ error: "MFA_REQUIRED" }` |
| 423 | Account locked | `{ error: "ACCOUNT_LOCKED", locked_until: "datetime" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED", retry_after: 60 }` |

---

### POST /api/v1/auth/register

| Field | Value |
|-------|-------|
| **Description** | Create a new candidate account |
| **Auth** | None (public endpoint) |
| **Rate Limit** | 5 requests/minute per IP |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| first_name | string | Yes | min: 1, max: 100 | First name |
| last_name | string | Yes | min: 1, max: 100 | Last name |
| email | string | Yes | format: email, max: 254, unique | Email address |
| password | string | Yes | min: 8, 1 upper, 1 lower, 1 digit | Password |
| password_confirmation | string | Yes | must match password | Password confirmation |

**Response (201 Created):**

| Field | Type | Description |
|-------|------|-------------|
| user.id | uuid | Created user identifier |
| user.email | string | Registered email |
| message | string | "Verification email sent" |

**Error Codes:**

| Code | Condition | Response Body |
|------|-----------|--------------|
| 400 | Validation failure | `{ error: "VALIDATION_ERROR", details: [...] }` |
| 409 | Email already registered | `{ error: "EMAIL_EXISTS" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/auth/logout

| Field | Value |
|-------|-------|
| **Description** | Terminate the current session |
| **Auth** | Bearer token (any role) |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| all_devices | boolean | No | default: false | If true, invalidate all sessions |

**Response (200 OK):**

| Field | Type | Description |
|-------|------|-------------|
| message | string | "Session terminated" |
| sessions_revoked | integer | Number of sessions invalidated |

**Error Codes:**

| Code | Condition | Response Body |
|------|-----------|--------------|
| 401 | Invalid or expired token | `{ error: "UNAUTHORIZED" }` |

---

### POST /api/v1/auth/verify-email

| Field | Value |
|-------|-------|
| **Description** | Verify email address with token |
| **Auth** | None (public, token-based) |
| **Rate Limit** | 10 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| token | string | Yes | UUID format, valid for 24h | Verification token from email |

**Response (200 OK):**

| Field | Type | Description |
|-------|------|-------------|
| message | string | "Email verified successfully" |

**Error Codes:**

| Code | Condition | Response Body |
|------|-----------|--------------|
| 400 | Invalid or expired token | `{ error: "INVALID_TOKEN" }` |
| 409 | Already verified | `{ error: "ALREADY_VERIFIED" }` |

---

## Common Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes (authenticated endpoints) | `Bearer {jwt_token}` |
| `Content-Type` | Yes | `application/json` |
| `X-Request-ID` | Recommended | UUID for request tracing |
| `X-Portal` | Required for login | Portal identifier |
