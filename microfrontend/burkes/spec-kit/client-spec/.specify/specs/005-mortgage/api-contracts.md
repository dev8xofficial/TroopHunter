# Mortgage API Contracts

## `GET /transactions/{transaction_id}/mortgage-application`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/mortgage-application`
- **Auth**: Required (`ROLE_CLIENT`, `ROLE_LENDER`)
- **Response**: The `mortgage_application` object containing all sections. Note: Lender receives a 403 or filtered object if status != `SUBMITTED` depending on system business rules (spec infers Lender waits for submission).

## `PATCH /transactions/{transaction_id}/mortgage-application/personal-info`
- **Method**: PATCH
- **Resource**: `/api/v1/transactions/{transaction_id}/mortgage-application/personal-info`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: Partial `personal_info_schema`.
- **Response**: `200 OK` returning updated application payload. Updates `progress_percent`.

## `PATCH /transactions/{transaction_id}/mortgage-application/property-details`
- **Method**: PATCH
- **Resource**: `/api/v1/transactions/{transaction_id}/mortgage-application/property-details`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: Partial `property_details_schema`.
- **Response**: `200 OK`

## `PUT /transactions/{transaction_id}/mortgage-application/employment-history`
- **Method**: PUT
- **Resource**: `/api/v1/transactions/{transaction_id}/mortgage-application/employment-history`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: Array of `employer_schema` objects.
- **Response**: `200 OK`

## `POST /transactions/{transaction_id}/mortgage-application/submit`
- **Method**: POST
- **Resource**: `/api/v1/transactions/{transaction_id}/mortgage-application/submit`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: None (server evaluates current state).
- **Response**: `200 OK` (Transitions status to `SUBMITTED`).
