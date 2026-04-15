---
title: 000 Foundation Spec
description: Global authentication, RBAC definitions, and system-wide core schemas for the Admin Portal.
schema_version: 1.0.0
---

# 1. Module Overview
The Foundation Module establishes the architectural groundwork for the Admin Portal. It strictly isolates standard identity, role-based access control (RBAC), and global models such that feature modules (Dashboard, Transactions, Partners, etc.) can operate safely without redefining these core capabilities.

# 2. Core Data Models

### 2.1 Identity & User Base Model (`UserBase`)
The foundational user entity extended across the system.
* **id**: `uuid` (Primary Key)
* **first_name**: `string`
* **last_name**: `string`
* **email**: `string` (Unique, Indexed)
* **phone**: `string`
* **role**: `enum` [ `admin`, `agent`, `client`, `attorney`, `cpa`, `lender` ]
* **account_status**: `enum` [ `active`, `pending`, `suspended`, `inactive` ]
* **created_at**: `timestamp`
* **last_login_at**: `timestamp`

# 3. Role-Based Access Control (RBAC)

### 3.1 Role Definitions
* **`admin`**: System administrator. Has full read, write, and approval authority across all modules and settings. Can impersonate or manage other users.
* **`agent`**: Real Estate Agent. Has visibility into assigned transactions, client data, and related documents.
* **`client`**: Homeowner/Buyer. Restricted to their own profile, assigned transactions, and messaging.
* **`attorney`**: Closing/Divorce Attorney. Scoped to transactions where they are explicitly added. Manages title and closing approvals.
* **`cpa`**: Certified Public Accountant. Scoped strictly to related financial data and documents.
* **`lender`**: Mortgage Lender. Restricted to loan integrations and document upload for associated clients.

### 3.2 Granular Permission Matrix (Admin Override)
Admins enforce permission overrides via a boolean matrix attached to a user record. Fields mapping from `rolePermissions`:
* `perm_view_docs`
* `perm_upload_docs`
* `perm_create_clients`
* `perm_view_transactions`
* `perm_manage_transactions`
* `perm_review_docs`
* `perm_share_with_title`
* `perm_messaging`
* `perm_mortgage_access`
* `perm_manage_users`
* `perm_view_reports`
* `perm_system_settings`

# 4. Global API Definitions

### 4.1 Authentication Endpoints
#### `POST /api/v1/auth/login`
Authenticates a user and provisions an access token (JWT).
* **Payload Schema**:
  ```json
  {
    "email": "string(email)",
    "password": "string"
  }
  ```
* **Response**: `200 OK` (token), `401 Unauthorized`.

#### `POST /api/v1/auth/logout`
Invalidates the current session.

#### `POST /api/v1/auth/mfa/verify`
(If 2FA is required per System Settings, verifies OTP before granting session).
* **Payload Schema**:
  ```json
  {
    "otp_code": "string(length:6)"
  }
  ```

### 4.2 System Health Endpoints
#### `GET /api/v1/health`
Returns system status.
* **Response**: `200 OK`
  ```json
  {
    "server_status": "operational",
    "database": "healthy",
    "api_response_time_ms": 124,
    "active_sessions": 847,
    "uptime": "99.97%"
  }
  ```

# 5. Core Business Logic & Interceptors

### 5.1 Authorization Interceptor
* Each incoming request is intercepted to validate the JWT.
* The system checks the token payload to determine the `role` and validates against the RBAC policy attached to the requested endpoint.
* Admin operations strictly ensure the `role === 'admin'`. Evaluates granular boolean permutations if required.

### 5.2 Event & Audit Logic
* All state mutations (e.g., changes to Users, Partners, Transactions) trigger an event (e.g., `USER_UPDATED`).
* These events are consumed by an asynchronous `AuditService` that writes to a `SystemLogs` table storing: `action_type`, `user_id`, `timestamp`, `resource_id`, and `diff`.
