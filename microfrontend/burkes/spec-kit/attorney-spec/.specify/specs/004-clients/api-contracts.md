# API Contracts: Clients

## Get Client Profile
* **Operation:** `GetClient`
* **Method:** `GET`
* **Resource Path:** `/api/v1/clients/{client_id}`
* **Response Body Schema:** `client_base`
* **HTTP Status Codes:** `200 OK`, `404 Not Found`, `403 Forbidden` (If no shared transactions)
* **Auth Requirement:** `closing_attorney`, `client` (self)

## Send Secure Message
* **Operation:** `SendClientMessage`
* **Method:** `POST`
* **Resource Path:** `/api/v1/clients/{client_id}/messages`
* **Request Body Schema:** `message_payload` (without `message_id`, `sender_id`)
* **Response Body Schema:** `{ status: "queued" }`
* **HTTP Status Codes:** `201 Created`
* **Auth Requirement:** `closing_attorney`
