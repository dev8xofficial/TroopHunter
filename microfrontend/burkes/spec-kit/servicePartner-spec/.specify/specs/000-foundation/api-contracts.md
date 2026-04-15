# API Contracts — 000 Foundation

The foundation module has no direct API endpoints. It defines shared schemas and
contracts referenced by all feature modules (001–008).

All API operations across the portal MUST enforce the following baseline
requirements derived from this foundation:

---

## AUTH-001 · Authenticate Service Partner

**HTTP Method**: `POST`
**Resource Pattern**: `/auth/service-partner/login`
**Auth Requirement**: None (public endpoint)

### Request Body
```json
{
  "email": "string (email format, required)",
  "password": "string (min 8 chars, required)"
}
```

### Response Body (200 OK)
```json
{
  "access_token": "string (JWT)",
  "refresh_token": "string",
  "session_context": { "$ref": "SessionContext" },
  "expires_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Authentication successful |
| 401 | Invalid credentials |
| 403 | Account suspended or deactivated |
| 422 | Payload validation failure |

---

## AUTH-002 · Refresh Session

**HTTP Method**: `POST`
**Resource Pattern**: `/auth/service-partner/refresh`
**Auth Requirement**: Valid refresh token

### Request Body
```json
{ "refresh_token": "string (required)" }
```

### Response Body (200 OK)
```json
{
  "access_token": "string",
  "session_context": { "$ref": "SessionContext" },
  "expires_at": "ISO 8601"
}
```

### Status Codes
| Code | Meaning |
|---|---|
| 200 | Token refreshed; updated session context returned |
| 401 | Refresh token invalid or expired |
| 403 | Account status changed to suspended/deactivated since last refresh |

---

## AUTH-003 · Logout

**HTTP Method**: `POST`
**Resource Pattern**: `/auth/service-partner/logout`
**Auth Requirement**: `service_partner`

### Request Body
None

### Response Body (204 No Content)
None

### Status Codes
| Code | Meaning |
|---|---|
| 204 | Session invalidated server-side |
| 401 | Token already expired or invalid |

---

## Global Error Response Schema

All APIs return errors in the following shape:

```json
{
  "error_code": "string (machine-readable)",
  "error_message": "string (human-readable)",
  "details": "object | null"
}
```
