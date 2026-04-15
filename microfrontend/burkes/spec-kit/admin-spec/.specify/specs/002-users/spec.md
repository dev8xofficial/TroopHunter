---
title: 002 Users Spec
description: User directories, role assignments, onboarding details, and administrative user controls.
schema_version: 1.0.0
---

# 1. Module Overview
The Users module handles the CRUD operations for platform users, including Clients, Admins, and specialized professional roles (Attorneys, CPAs, Agents, Lenders). It governs role-specific metadata like licenses, bar numbers, and service area mappings.

# 2. Core Data Models & Entities

### 2.1 Extended User Entity (`User`)
Inherits from the base identity.
* **professional_info**: `jsonb` (Nullable, depending on Role)
  * `license_number`: `string`
  * `company_name`: `string`
  * `office_address`: `string`
  * `attorney_type`: `enum` [ `closing`, `divorce` ] (For Attorney Role)
  * `service_area_zips`: `array[string]`
* **client_info**: `jsonb` (Nullable, For Client Role)
  * `property_address`: `string`
  * `transaction_type`: `string`
  * `assigned_agent_id`: `uuid` (Foreign Key referencing an Agent User)
* **insurance_info**: `jsonb` (Nullable, For Client Role)
  * `auto_insurance_provider`: `string`
  * `vin_number`: `string`
  * `home_insurance_provider`: `string`
  * `home_warranty_provider`: `string`
* **internal_notes**: `string` (Visible to Admins only)

### 2.2 Permissions Entity (`UserPermissionOverride`)
* **user_id**: `uuid` (Foreign Key -> User.id)
* Overriding boolean flags for each role permission (e.g., `perm_manage_users`, `perm_view_docs`).

# 3. API Endpoints

### 3.1 List Users
#### `GET /api/v1/users`
Returns a paginated list of users, with filtering.
* **Query Parameters**:
  * `search`: `string` (Searches `first_name`, `last_name`, `email`)
  * `role`: `enum`
  * `status`: `enum`
  * `page`: `int`, `limit`: `int`
* **Response Schema**:
  ```json
  {
    "data": [ { "id": "uuid", "name": "...", "role": "...", "status": "active", "joined_date": "ISO8601" } ],
    "pagination": { "total": 1247, "page": 1, "last_page": 208 }
  }
  ```

### 3.2 Admin: Add New User
#### `POST /api/v1/users`
Creates a user manually, circumventing standard public registration workflows.
* **Payload Validation Schema**:
  * `first_name`, `last_name`, `email`, `role`, `account_status` (Required)
  * If `role` IN (`agent`, `attorney`, `cpa`, `lender`):
    * `license_number` (Required)
    * `company_name` (Required)
  * If `role` === `client`:
    * Client-specific structures allowed.

### 3.3 Admin: View / Edit User
#### `GET /api/v1/users/:user_id`
Retrieves complete user entity structure, including internal notes and permission overrides.

#### `PATCH /api/v1/users/:user_id`
Updates user details. Admins can update roles, status, and custom permissions directly.
* **Payload**: Partial update fields.

# 4. State Machines & Transitions

### 4.1 User Status Transitions
* `pending` ➔ `active` (Triggered via Admin Verification)
* `active` ➔ `suspended` / `inactive` (Triggered via Admin Override)

# 5. Security & RBAC Considerations
* `POST /api/v1/users` and `PATCH /api/v1/users/:user_id` require strictly the `admin` role.
* `GET /api/v1/users/:user_id` requires `admin` OR `auth.user.id === requested_user_id`.
