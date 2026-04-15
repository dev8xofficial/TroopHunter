# Documents API Contracts

## List Documents
- **Operation Name**: `ListDocuments`
- **Method**: GET
- **Resource Path**: `/admin/documents`
- **Query Parameters**:
  - `page` (int)
  - `size` (int)
  - `search` (string)
  - `category` (enum)
  - `status` (enum)
  - `transaction_id` (string)
- **Response Body**: Paginated array of `#/definitions/DocumentEntity`
- **Status Codes**: 200 OK, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Update Document Status
- **Operation Name**: `UpdateDocumentStatus`
- **Method**: PATCH
- **Resource Path**: `/admin/documents/{document_id}/status`
- **Request Body**: `#/definitions/DocumentStatusUpdatePayload`
- **Response Body**: `#/definitions/DocumentEntity`
- **Status Codes**: 200 OK, 400 Bad Request, 404 Not Found, 403 Forbidden
- **Auth Requirement**: `admin`
