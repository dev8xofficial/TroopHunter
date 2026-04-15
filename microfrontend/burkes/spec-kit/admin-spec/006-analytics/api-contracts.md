# Analytics API Contracts

## Get Aggregated Metrics
- **Operation Name**: `GetAnalyticsMetrics`
- **Method**: GET
- **Resource Path**: `/admin/analytics/metrics`
- **Query Parameters**:
  - `period` (enum: `last_7_days`, `last_30_days`, `last_90_days`, `last_year`, `all_time`)
- **Response Body**: `#/definitions/AnalyticsMetrics`
- **Status Codes**: 200 OK, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Get Transaction Volume Time-Series
- **Operation Name**: `GetTransactionVolumeSeries`
- **Method**: GET
- **Resource Path**: `/admin/analytics/series/transactions`
- **Query Parameters**:
  - `period` (enum)
  - `interval` (enum: `daily`, `weekly`, `monthly`)
- **Response Body**: `#/definitions/TimeSeriesData`
- **Status Codes**: 200 OK, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`
