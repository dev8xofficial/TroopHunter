# Admin Documents - API Contracts

> **Module ID**: `106-admin-documents`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/documents

| Field | Value |
| --- | --- |
| **Description** | Return documents for the supplied applicant or filter set. |
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

### POST /api/v1/admin/documents/requests

| Field | Value |
| --- | --- |
| **Description** | Create a new applicant document request. |
| **Auth** | Bearer token |
| **Rate Limit** | 30 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| applicant_id | uuid | Yes | Applicant id | Applicant identifier |
| document_type | string | Yes | employment \| identity \| tax \| education \| other | Requested document type |
| deadline | date | No | Optional due date | Submission deadline |


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

### PATCH /api/v1/admin/documents/{id}/review

| Field | Value |
| --- | --- |
| **Description** | Record the admin review outcome for an uploaded document. |
| **Auth** | Bearer token |
| **Rate Limit** | 20 requests/minute |
| **Idempotent** | No |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| status | string | Yes | verified \| rejected \| archived | Review outcome |
| reason | string | No | max 1000 | Review notes |


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

### GET /api/v1/admin/documents/{id}

| Field | Value |
| --- | --- |
| **Description** | Return document metadata and access handle. |
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

## Common Headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization` | Yes (authenticated endpoints) | `Bearer {token}` |
| `Content-Type` | Yes | `application/json` |
| `X-Request-ID` | Recommended | Request tracing identifier |
| `X-Portal` | Optional | Portal context |
