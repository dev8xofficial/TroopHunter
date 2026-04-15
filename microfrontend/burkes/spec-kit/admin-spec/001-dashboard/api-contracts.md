# Dashboard API Contracts

## Get Dashboard Metrics
- **Operation Name**: `GetDashboardMetrics`
- **Method**: GET
- **Resource Path**: `/admin/dashboard/metrics`
- **Request Body**: None
- **Response Body**: `#/definitions/DashboardMetrics`
- **Status Codes**:
  - `200 OK`: Metrics successfully aggregated.
  - `401 Unauthorized`: Session invalid.
  - `403 Forbidden`: Insufficient role permissions.
- **Auth Requirement**: Administrator role.

## Get Recent Activity Feed
- **Operation Name**: `GetRecentActivityFeed`
- **Method**: GET
- **Resource Path**: `/admin/dashboard/activity`
- **Query Parameters**:
  - `limit` (int, default=10, max=50)
- **Request Body**: None
- **Response Body**: Array of `#/definitions/RecentActivityItem`
- **Status Codes**:
  - `200 OK`: Feed retrieved.
  - `401 Unauthorized`: Session invalid.
  - `403 Forbidden`: Insufficient role permissions.
- **Auth Requirement**: Administrator role.
