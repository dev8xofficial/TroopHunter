# API Contracts - 007-partner-referrals

## Endpoints

### 1. Retrieve Entity Collection
- **Operation**: `List007partnerreferrals`
- **Method**: `GET`
- **Resource**: `/api/v1/partner-referrals`
- **Request Body**: None (Uses pagination query parameters limit/offset).
- **Response**: Paginated array conforming to `#/definitions/CollectionResponse`
- **Auth**: Require `Bearer` token; Role IN (agent, admin, attorney)
- **Status Codes**: 
  - `200`: Collection returned successfully
  - `401`: Malformed session

### 2. Mutate Entity State
- **Operation**: `Update007partnerreferrals`
- **Method**: `PATCH`
- **Resource**: `/api/v1/partner-referrals/{id}`
- **Request Body**: Conforms to `#/definitions/UpdatePayload`
- **Response**: `204 No Content`
- **Auth**: Target record `owner_id` must match `session.agent_id`
- **Status Codes**: 
  - `204`: Mutated
  - `403`: RBAC boundary violation
  - `409`: State invariant collision
  - `422`: Schema validation failure
