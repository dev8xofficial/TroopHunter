# Insurance API Contracts

## `GET /transactions/{transaction_id}/insurance`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/insurance`
- **Auth**: Required (`ROLE_CLIENT`, `ROLE_LENDER`, `ROLE_ATTORNEY`, `ROLE_ADMIN`)
- **Response**: Array of `insurance_policy` objects for the transaction.

## `GET /transactions/{transaction_id}/insurance/{policy_type}`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/insurance/{policy_type}`
- **Auth**: Required
- **Response**: A single `insurance_policy` object.

## `PUT /transactions/{transaction_id}/insurance/{policy_type}`
- **Method**: PUT
- **Resource**: `/api/v1/transactions/{transaction_id}/insurance/{policy_type}`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: `insurance_update_req` schema object.
- **Response**: `200 OK` with updated `insurance_policy`.

## `POST /transactions/{transaction_id}/insurance/{policy_type}/documents`
- **Method**: POST
- **Resource**: `/api/v1/transactions/{transaction_id}/insurance/{policy_type}/documents`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: `{ "document_id": "uuid" }`
- **Response**: `200 OK` (Links an uploaded document to the policy).
