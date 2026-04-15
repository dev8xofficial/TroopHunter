# Users API Contracts

## List Users
- **Operation Name**: `ListUsers`
- **Method**: GET
- **Resource Path**: `/admin/users`
- **Query Parameters**:
  - `page` (int)
  - `size` (int)
  - `search` (string)
  - `role_filter` (enum)
  - `status_filter` (enum)
- **Request Body**: None
- **Response Body**: Paginated array of `#/definitions/UserEntity`
- **Status Codes**: 200 OK, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Get User Details
- **Operation Name**: `GetUserDetails`
- **Method**: GET
- **Resource Path**: `/admin/users/{user_id}`
- **Response Body**: `#/definitions/UserEntity`
- **Status Codes**: 200 OK, 404 Not Found, 401 Unauthorized, 403 Forbidden
- **Auth Requirement**: `admin`

## Create New User (Admin Provision)
- **Operation Name**: `ProvisionUser`
- **Method**: POST
- **Resource Path**: `/admin/users`
- **Request Body**: `#/definitions/UserCreatePayload`
- **Response Body**: `#/definitions/UserEntity`
- **Status Codes**: 201 Created, 400 Bad Request, 409 Conflict
- **Auth Requirement**: `admin`

## Update User Status
- **Operation Name**: `UpdateUserStatus`
- **Method**: PATCH
- **Resource Path**: `/admin/users/{user_id}/status`
- **Request Body**: `#/definitions/UserStatusUpdatePayload`
- **Response Body**: `#/definitions/UserEntity`
- **Status Codes**: 200 OK, 400 Bad Request, 404 Not Found, 409 Conflict (Invalid Transition)
- **Auth Requirement**: `admin`
