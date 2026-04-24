# Candidate Documents - API Contracts

> **Module ID**: `203-candidate-documents`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/candidate/documents

| Field | Value |
| --- | --- |
| **Description** | Return the candidate document queue. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:** None


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| document_id | uuid | Document identifier |
| status | string | Current status |
| version | integer | Current version |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/candidate/documents/{id}/sign

| Field | Value |
| --- | --- |
| **Description** | Apply an electronic signature to a signable document. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| signature_type | string | Yes | typed_name \| drawn | Signature method |
| signed_name | string | Yes | max 255 | Rendered signature name |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| document_id | uuid | Document identifier |
| status | string | Current status |
| version | integer | Current version |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### POST /api/v1/candidate/documents/uploads

| Field | Value |
| --- | --- |
| **Description** | Upload a requested or supplemental document. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| document_type | string | Yes | max 100 | Document type |
| file_name | string | Yes | max 255 | Uploaded file name |
| file_size_bytes | integer | Yes | min 1 | Uploaded file size |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| document_id | uuid | Document identifier |
| status | string | Current status |
| version | integer | Current version |

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
