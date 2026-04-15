---
title: 001 Dashboard Spec
description: Backend data aggregation endpoints and orchestration for the Admin Dashboard metrics and pending records.
schema_version: 1.0.0
---

# 1. Module Overview
The Dashboard module acts as an orchestration and aggregation layer. It queries independent services (Users, Transactions, Partners, Documents) to compile high-level Platform Key Metrics, pending queues, and recent activity logs. 

# 2. Aggregation Data Models (DTOs)

### 2.1 Dashboard Stats DTO (`DashboardMetricsDTO`)
* **total_users**: `integer`
* **user_breakdown**: `{ clients: integer, attorneys: integer, cpas: integer }`
* **active_transactions**: `integer`
* **transaction_status**: `{ closing_soon: integer, delayed: integer }`
* **service_partners**: `integer`
* **partner_breakdown**: `{ plumbing: integer, roofing: integer, electrical: integer }`
* **documents_pending**: `integer`
* **document_status**: `{ urgent: integer, standard: integer }`

### 2.2 Recent Activity DTO (`ActivityLogDTO`)
* **id**: `uuid`
* **event_type**: `enum` [ `USER_REGISTRATION`, `DOCUMENT_UPLOAD`, `PARTNER_APPLICATION`, `TRANSACTION_COMPLETED` ]
* **description**: `string`
* **metadata**: `json` (Context specific: email, value, locations)
* **timestamp**: `timestamp`
* **status**: `enum` [ `PENDING_REVIEW`, `ACTION_REQUIRED`, `COMPLETED` ]

# 3. API Endpoints

### 3.1 Fetch High-level Dashboard Metrics
#### `GET /api/v1/dashboard/metrics`
Retrieves aggregated statistics across all entities.
* **Authorization**: Admin Only (`role === 'admin'`)
* **Query Parameters**: None. (Aggregates system-wide data or uses a 30-day trailing window depending on metric).
* **Response**: `200 OK` (Returns `DashboardMetricsDTO`).

### 3.2 Fetch Pending Approvals Summaries
#### `GET /api/v1/dashboard/pending-approvals`
Retrieves categorized pending approvals requiring Admin orchestration.
* **Response Data Format**:
  ```json
  {
    "urgent_documents": 8,
    "partner_applications": 15,
    "user_registrations": 24
  }
  ```

### 3.3 Fetch Recent Activity Feed
#### `GET /api/v1/dashboard/activity`
Retrieves a paginated list of the most recent critical system events.
* **Query Parameters**:
  * `limit`: default `10`
  * `offset`: default `0`
* **Response**: Array of `ActivityLogDTO`.

# 4. Payload Validation
* Strict UUID validation on any specific lookups originating from dashboard clicks.
* Query parameter bounds checking (`limit` max 50).

# 5. Business Logic & Cache Strategies

### 5.1 Dashboard Cache invalidation
* Querying core databases extensively for dashboards can cause performance spikes.
* A caching mechanism (e.g., Redis) is utilized for the `/dashboard/metrics` endpoint.
* **Cache TTL**: 5 minutes.
* **Event-Driven Cache Invalidation**: Emitting a `TRANSACTION_COMPLETED` or `USER_CREATED` event from their respective downstream services will partially flush or increment the relevant aggregate metrics.
