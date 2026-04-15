# Services API Contracts

## `GET /service-providers`
- **Method**: GET
- **Resource**: `/api/v1/service-providers`
- **Auth**: Required (`ROLE_CLIENT`)
- **Query Params**: `zip_code` (required), `category` (optional)
- **Response**: Array of `service_provider` objects.
- **Notes**: The `zip_code` can be implicitly resolved from the backend using the client's `transaction_id` property details if omitted in the request.

## `GET /service-providers/categories`
- **Method**: GET
- **Resource**: `/api/v1/service-providers/categories`
- **Auth**: Required (`ROLE_CLIENT`)
- **Response**: Active enum array and count of providers per category in the specified zip radius dynamically.
