# Portal Routing - API Contracts

> **Module ID**: `002-portal-routing`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/portals/config

| Field | Value |
| --- | --- |
| **Description** | Return enabled portals and their default destinations. |
| **Auth** | None |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| resolved_route | string | Chosen route |
| decision | string | Resolution result |
| portal_label | string | Human-readable portal name |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/portals/resolve

| Field | Value |
| --- | --- |
| **Description** | Resolve the destination route for the authenticated session. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| portal_key | string | Yes | candidate \| client \| admin \| crm | Requested portal |
| role | string | Yes | platform role id | Authenticated role |
| last_route | string | No | Optional URL path | Last successful route |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| resolved_route | string | Chosen route |
| decision | string | Resolution result |
| portal_label | string | Human-readable portal name |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/portals/last-destination

| Field | Value |
| --- | --- |
| **Description** | Return the most recent permitted destination for the current session. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| resolved_route | string | Chosen route |
| decision | string | Resolution result |
| portal_label | string | Human-readable portal name |

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
