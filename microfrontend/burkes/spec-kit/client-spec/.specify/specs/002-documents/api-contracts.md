# Documents API Contracts

## `GET /transactions/{transaction_id}/documents`
- **Method**: GET
- **Resource**: `/api/v1/transactions/{transaction_id}/documents`
- **Auth**: Required (Any authorized transaction participant)
- **Query Params**: `status` (optional), `category` (optional)
- **Response**: Array of `document` objects. (Filtered by the caller's RBAC matrix).

## `POST /transactions/{transaction_id}/documents/upload`
- **Method**: POST (multipart/form-data)
- **Resource**: `/api/v1/transactions/{transaction_id}/documents/upload`
- **Auth**: Required
- **Request Metadata**: `document_upload_req` schema representation.
- **Response**: The created `document` object.

## `GET /documents/{document_id}/download`
- **Method**: GET
- **Resource**: `/api/v1/documents/{document_id}/download`
- **Auth**: Required (Role must have READ explicit permission for the document category)
- **Response**: `302 Found` with a signed URL, or stream of binary data.

## `POST /documents/{document_id}/sign`
- **Method**: POST
- **Resource**: `/api/v1/documents/{document_id}/sign`
- **Auth**: Required (`ROLE_CLIENT`)
- **Request Body**: `document_sign_req` schema object.
- **Response**: `200 OK` (Document status updated).
