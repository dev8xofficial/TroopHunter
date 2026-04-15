# Dashboard API Contracts

## `GET /transactions/{transaction_id}/dashboard/metrics`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/dashboard/metrics`
- **Auth**: Required (`ROLE_CLIENT` owning `transaction_id`, or `ROLE_ADMIN`)
- **Request Body**: None
- **Response**: Returns `dashboard_metrics` schema object.
- **Possible Responses**:
  - `200 OK`: Successfully aggregated.
  - `403 Forbidden`: Client does not own transaction.
  - `404 Not Found`: Transaction UUID invalid.

## `GET /transactions/{transaction_id}/dashboard/alerts`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/dashboard/alerts`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: None
- **Response**: Array of `notification_alert` objects.
- **Possible Responses**:
  - `200 OK`: Successfully returned active alerts.

## `GET /transactions/{transaction_id}/dashboard/timeline`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/dashboard/timeline`
- **Auth**: Required (`ROLE_CLIENT`)
- **Response**: Array containing 11 stage status objects.
