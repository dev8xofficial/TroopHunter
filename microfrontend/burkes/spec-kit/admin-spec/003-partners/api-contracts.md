# Partners API Contracts

## List Partners
- **Operation Name**: `ListPartners`
- **Method**: GET
- **Resource Path**: `/admin/partners`
- **Query Parameters**:
  - `page` (int)
  - `size` (int)
  - `search` (string)
  - `category` (enum)
  - `zip_code` (string)
  - `status` (enum)
- **Request Body**: None
- **Response Body**: Paginated array of `#/definitions/PartnerEntity`
- **Status Codes**: 200 OK, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Get Partner Details
- **Operation Name**: `GetPartnerDetails`
- **Method**: GET
- **Resource Path**: `/admin/partners/{partner_id}`
- **Response Body**: `#/definitions/PartnerEntity`
- **Status Codes**: 200 OK, 404 Not Found, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Update Partner
- **Operation Name**: `UpdatePartnerState`
- **Method**: PATCH
- **Resource Path**: `/admin/partners/{partner_id}`
- **Request Body**: `#/definitions/PartnerUpdatePayload`
- **Response Body**: `#/definitions/PartnerEntity`
- **Status Codes**: 200 OK, 400 Bad Request, 404 Not Found, 409 Conflict
- **Auth Requirement**: `admin`
