# Transactions API Contracts

## List Transactions
- **Operation Name**: `ListTransactions`
- **Method**: GET
- **Resource Path**: `/admin/transactions`
- **Query Parameters**:
  - `page` (int)
  - `size` (int)
  - `search` (string)
  - `stage` (enum)
  - `type` (enum)
  - `health_status` (enum)
- **Response Body**: Paginated array of `#/definitions/TransactionEntity`
- **Status Codes**: 200 OK, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Get Transaction Details
- **Operation Name**: `GetTransactionDetails`
- **Method**: GET
- **Resource Path**: `/admin/transactions/{transaction_id}`
- **Response Body**: `#/definitions/TransactionEntity`
- **Status Codes**: 200 OK, 404 Not Found, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Update Transaction Attributes
- **Operation Name**: `UpdateTransactionDetails`
- **Method**: PATCH
- **Resource Path**: `/admin/transactions/{transaction_id}`
- **Request Body**: `#/definitions/TransactionUpdatePayload`
- **Response Body**: `#/definitions/TransactionEntity`
- **Status Codes**: 200 OK, 400 Bad Request, 404 Not Found, 403 Forbidden
- **Auth Requirement**: `admin`

## Override Transaction Stage
- **Operation Name**: `OverrideTransactionStage`
- **Method**: POST
- **Resource Path**: `/admin/transactions/{transaction_id}/stage-override`
- **Request Body**: `#/definitions/TransactionStageOverridePayload`
- **Response Body**: `#/definitions/TransactionEntity`
- **Status Codes**: 200 OK, 400 Bad Request, 404 Not Found, 403 Forbidden (Only Admin allowed)
- **Auth Requirement**: `admin`
