# Candidate Profile - API Contracts

> **Module ID**: `206-candidate-profile`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/candidate/profile

| Field | Value |
| --- | --- |
| **Description** | Return the current candidate profile. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| profile_id | uuid | Profile identifier |
| verification_state | string | Verification state |
| updated_at | datetime | Latest profile update time |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### PATCH /api/v1/candidate/profile

| Field | Value |
| --- | --- |
| **Description** | Update editable candidate profile fields. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| phone | string | No | max 30 | Phone number |
| address | string | No | max 500 | Address |
| emergency_contact_name | string | No | max 255 | Emergency contact name |
| emergency_contact_phone | string | No | max 30 | Emergency contact phone |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| profile_id | uuid | Profile identifier |
| verification_state | string | Verification state |
| updated_at | datetime | Latest profile update time |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/candidate/profile/emergency-contacts

| Field | Value |
| --- | --- |
| **Description** | Create or replace the primary emergency contact. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| phone | string | No | max 30 | Phone number |
| address | string | No | max 500 | Address |
| emergency_contact_name | string | No | max 255 | Emergency contact name |
| emergency_contact_phone | string | No | max 30 | Emergency contact phone |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| profile_id | uuid | Profile identifier |
| verification_state | string | Verification state |
| updated_at | datetime | Latest profile update time |

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
