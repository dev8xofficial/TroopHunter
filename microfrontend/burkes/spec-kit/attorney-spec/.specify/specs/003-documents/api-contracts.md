# API Contracts: Documents

## Upload Document
* **Operation:** `CreateDocument`
* **Method:** `POST`
* **Resource Path:** `/api/v1/documents`
* **Request Body Schema:** `multipart/form-data` (binary chunk + `{ transaction_id, category, notes }`)
* **Response Body Schema:** `document_base`
* **HTTP Status Codes:** `201 Created`, `400 Bad Request` (Invalid mime type), `403 Forbidden` (Role violated category constraints)
* **Auth Requirement:** All roles (category access scoped per role)

## Change Document Status
* **Operation:** `UpdateDocumentStatus`
* **Method:** `PATCH`
* **Resource Path:** `/api/v1/documents/{document_id}/status`
* **Request Body Schema:** `{ "status": "string(enum)", "rejection_reason": "string(optional)" }`
* **Response Body Schema:** `document_base`
* **HTTP Status Codes:** `200 OK`, `400 Bad Request` (Missing reason for rejection)
* **Auth Requirement:** `closing_attorney`

## Get Documents by Transaction
* **Operation:** `ListTransactionDocuments`
* **Method:** `GET`
* **Resource Path:** `/api/v1/transactions/{transaction_id}/documents`
* **Response Body Schema:** Array of `document_base`
* **HTTP Status Codes:** `200 OK`
* **Auth Requirement:** `closing_attorney`, `real_estate_agent`, `mortgage_lender` (role checks mapping per transaction assignment)
