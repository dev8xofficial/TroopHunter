# API Contracts: Dashboard

## Get Attorney Dashboard Aggregates
* **Operation:** `GetDashboardAggregates`
* **Method:** `GET`
* **Resource Path:** `/api/v1/attorneys/{attorney_id}/dashboard-aggregates`
* **Request Body:** None
* **Response Body Schema:** `validation-schema.json`
* **HTTP Status Codes:**
  * `200 OK`: Aggregates returned successfully.
  * `401 Unauthorized`: Missing or invalid token.
  * `403 Forbidden`: Token does not possess `closing_attorney` role or `attorney_id` does not match session.
  * `500 Internal Server Error`: Aggregation timeout.
* **Auth Requirement:** `closing_attorney`, `admin`
