# Admin Dashboard - API Contracts

> **Module ID**: `100-admin-dashboard`
> References: [contracts/api.yaml](../../../contracts/api.yaml)

---

## Endpoints

### GET /api/v1/admin/dashboard/summary

| Field | Value |
| --- | --- |
| **Description** | Return recruiting KPI summary. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| date_from | date | No | Inclusive lower bound | Reporting range start |
| date_to | date | No | Inclusive upper bound | Reporting range end |
| department | string | No | Optional department id | Department filter |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| snapshot_id | uuid | Snapshot identifier |
| applicant_count | integer | Total applicants |
| priority_item_count | integer | Priority queue size |
| generated_at | datetime | Snapshot timestamp |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/admin/dashboard/funnel

| Field | Value |
| --- | --- |
| **Description** | Return recruiting funnel counts and conversion rates. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| date_from | date | No | Inclusive lower bound | Reporting range start |
| date_to | date | No | Inclusive upper bound | Reporting range end |
| department | string | No | Optional department id | Department filter |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| snapshot_id | uuid | Snapshot identifier |
| applicant_count | integer | Total applicants |
| priority_item_count | integer | Priority queue size |
| generated_at | datetime | Snapshot timestamp |

**Error Codes:**

| Code | Condition | Response Body |
| --- | --- | --- |
| 400 | Validation failure | `{ error: "VALIDATION_ERROR" }` |
| 401 | Unauthorized | `{ error: "UNAUTHORIZED" }` |
| 403 | Forbidden | `{ error: "FORBIDDEN" }` |
| 429 | Rate limit exceeded | `{ error: "RATE_LIMITED" }` |

---

### GET /api/v1/admin/dashboard/priority-queue

| Field | Value |
| --- | --- |
| **Description** | Return urgent recruiting work items. |
| **Auth** | Bearer token |
| **Rate Limit** | 60 requests/minute |
| **Idempotent** | Yes |

**Request Body:**

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| date_from | date | No | Inclusive lower bound | Reporting range start |
| date_to | date | No | Inclusive upper bound | Reporting range end |
| department | string | No | Optional department id | Department filter |


**Response (200 OK):**

| Field | Type | Description |
| --- | --- | --- |
| snapshot_id | uuid | Snapshot identifier |
| applicant_count | integer | Total applicants |
| priority_item_count | integer | Priority queue size |
| generated_at | datetime | Snapshot timestamp |

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
