# API Contracts: Verification

## Verify Closing Amounts
* **Operation:** `ConfirmVerification`
* **Method:** `POST`
* **Resource Path:** `/api/v1/transactions/{transaction_id}/verify`
* **Request Body Schema:** `verification_payload`
* **Response Body Schema:** `{ "verified_date": "datetime", "status": "verified" }`
* **HTTP Status Codes:** `200 OK`, `400 Bad Request` (Amounts do not reconcile), `403 Forbidden`
* **Auth Requirement:** `closing_attorney`

## Flag Discrepancy
* **Operation:** `FlagDiscrepancy`
* **Method:** `POST`
* **Resource Path:** `/api/v1/transactions/{transaction_id}/flag`
* **Request Body Schema:** `discrepancy_flag`
* **Response Body Schema:** `{ status: "flagged" }`
* **HTTP Status Codes:** `201 Created`
* **Auth Requirement:** `closing_attorney`

## Update Asset Split
* **Operation:** `UpdateAssetSplit`
* **Method:** `PUT`
* **Resource Path:** `/api/v1/transactions/{transaction_id}/asset-split`
* **Request Body Schema:** `asset_split_payload`
* **Response Body Schema:** `asset_split_payload`
* **HTTP Status Codes:** `200 OK`, `422 Unprocessable Entity` (Percentages != 100)
* **Auth Requirement:** `closing_attorney`
