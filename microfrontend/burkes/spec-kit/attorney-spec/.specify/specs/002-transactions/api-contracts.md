# API Contracts: Transactions

## List Transactions
* **Operation:** `ListTransactions`
* **Method:** `GET`
* **Resource Path:** `/api/v1/transactions`
* **Query Parameters:** `status` (optional), `case_type` (optional), `client_id` (optional)
* **Response Body Schema:** Array of `transaction_base`
* **HTTP Status Codes:** `200 OK`, `401 Unauthorized`
* **Auth Requirement:** All roles (scoped exclusively to owned/assigned models by backend middleware)

## Get Transaction
* **Operation:** `GetTransaction`
* **Method:** `GET`
* **Resource Path:** `/api/v1/transactions/{transaction_id}`
* **Response Body Schema:** `transaction_base`
* **HTTP Status Codes:** `200 OK`, `404 Not Found`, `401 Unauthorized`
* **Auth Requirement:** All roles (scoped appropriately)

## Create Transaction
* **Operation:** `CreateTransaction`
* **Method:** `POST`
* **Resource Path:** `/api/v1/transactions`
* **Request Body Schema:** `transaction_base` (without `transaction_id`, `transaction_status` defaults to `document_gathering`)
* **Response Body Schema:** `transaction_base`
* **HTTP Status Codes:** `201 Created`, `400 Bad Request`
* **Auth Requirement:** `real_estate_agent`, `closing_attorney`

## Update Transaction Status
* **Operation:** `UpdateTransactionStatus`
* **Method:** `PATCH`
* **Resource Path:** `/api/v1/transactions/{transaction_id}/status`
* **Request Body Schema:** `{ "status": "string (enum)" }`
* **Response Body Schema:** `transaction_base`
* **HTTP Status Codes:** `200 OK`, `409 Conflict` (invalid state transition), `403 Forbidden`
* **Auth Requirement:** `closing_attorney`
