# Messages API Contracts

## `GET /transactions/{transaction_id}/conversations`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/conversations`
- **Auth**: Required (`ROLE_CLIENT`)
- **Response**: Array of `conversation` schemas.

## `GET /conversations/{conversation_id}/messages`
- **Method**: GET
- **Resource**: `/api/v1/conversations/{conversation_id}/messages`
- **Auth**: Required (User must be in the `participants` array)
- **Response**: Array of `message` schemas, ordered by `created_at` ASC.

## `POST /conversations/{conversation_id}/messages`
- **Method**: POST
- **Resource**: `/api/v1/conversations/{conversation_id}/messages`
- **Auth**: Required (User must be in `participants` array)
- **Request Body**: `send_message_req` object.
- **Response**: `201 Created` with the new `message` object.

## `PATCH /conversations/{conversation_id}/read`
- **Method**: PATCH
- **Resource**: `/api/v1/conversations/{conversation_id}/read`
- **Auth**: Required
- **Request Body**: None
- **Response**: `200 OK` (Updates `read_at` for all unread messages where caller is NOT the sender).
