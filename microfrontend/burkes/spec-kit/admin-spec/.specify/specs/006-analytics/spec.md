---
title: 006 Analytics Spec
description: Analytics engine aggregating and exporting transaction volumes, demographics, and platform financials.
schema_version: 1.0.0
---

# 1. Module Overview
The Analytics module generates deep statistical outputs for Admins to view macro trends over specified periods. It evaluates business performance, transaction revenues, and onboarding velocities across cohorts.

# 2. Aggregations & Query Structures

### 2.1 Revenue Metrics Endpoint
#### `GET /api/v1/analytics/financials`
Compiles transactional volumes over defined time series brackets.
* **Query Parameters**:
  * `period_start`: `timestamp`
  * `period_end`: `timestamp`
  * `resolution`: `enum` [ `daily`, `weekly`, `monthly`, `quarterly`, `yearly` ]
* **Response Output Structure**:
  ```json
  {
    "total_transaction_volume": 4500000.00,
    "average_transaction_size": 350000.00,
    "time_series": [
      { "bucket": "2024-Q1", "volume": 1200000, "count": 4 },
      { "bucket": "2024-Q2", "volume": 3300000, "count": 10 }
    ]
  }
  ```

### 2.2 Operational Metrics Endpoint
#### `GET /api/v1/analytics/operations`
Analyzes cycle times (e.g., average time from `consultation` to `completed` stage) and bottleneck monitoring.
* **Response Output Fields**:
  * `avg_days_to_close`: `float`
  * `stage_bottleneck`: `string(stage_name)` (The stage where transactions stall the longest mathematically).

### 2.3 User Growth & Acquisition Endpoint
#### `GET /api/v1/analytics/cohorts`
Calculates platform adoption.
* **Response Output Fields**:
  * `new_users`: `int`
  * `churned_users`: `int`
  * `cohort_breakdown`: List split by `role` percentages.

# 3. Data Warehouse / Export Options

### 3.1 Report Generation Webhook
#### `POST /api/v1/analytics/reports/export`
Triggers an asynchronous worker process to compile heavy historical data into CSV or PDF format.
* **Payload**:
  * `report_type`: `enum` [ `financials`, `operations`, `audit_logs` ]
  * `filters`: `json`
* **Workflow**: System queues the job. When completed, dispatches the report download link via Email to the requesting Admin.
