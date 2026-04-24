# [Module Name] — API Contracts

> **Module ID**: `NNN-module-name`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### [METHOD] /api/v1/[resource]

| Field | Value |
|-------|-------|
| **Description** | What this endpoint does |
| **Auth** | Required role(s) |
| **Rate Limit** | NN requests/minute |
| **Idempotent** | Yes / No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| field_name | string | Yes | min: 1, max: 255 | Field description |

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| page | integer | 1 | Page number |
| limit | integer | 20 | Items per page (max: 100) |

**Response (200 OK):**

| Field | Type | Description |
|-------|------|-------------|
| data | array | Result items |
| meta.total | integer | Total count |
| meta.page | integer | Current page |

**Error Codes:**

| Code | Condition | Response Body |
|------|-----------|--------------|
| 400 | Validation failure | `{ error: "VALIDATION_ERROR", details: [...] }` |
| 401 | Not authenticated | `{ error: "UNAUTHORIZED" }` |
| 403 | Insufficient permissions | `{ error: "FORBIDDEN" }` |
| 404 | Resource not found | `{ error: "NOT_FOUND" }` |
| 409 | Conflict (duplicate) | `{ error: "CONFLICT" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

## Common Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer {jwt_token}` |
| `Content-Type` | Yes (POST/PUT/PATCH) | `application/json` |
| `X-Request-ID` | Recommended | UUID for request tracing |
