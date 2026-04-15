# Feature Specification: Foundation & Identity

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-15
**Module**: Core API & Identity

---

## Overview
The Foundation module establishes the core data structures, shared primitives, and identity management rules for the Agent component. It defines the base `Agent` entity, cross-cutting RBAC constraints, and the system authentication schema required to securely serve all subsequent endpoints.

---

## Core Data Models

### 1. Agent Form
The primary authenticated user in the system.
- `id`: UUID (Primary Key)
- `first_name`: String (Required, max: 100)
- `last_name`: String (Required, max: 100)
- `email`: String (Required, unique, valid email constraint)
- `phone`: String (Optional, pattern context)
- `role`: Enum `[`AGENT`, `ADMIN`]`
- `status`: Enum `[`ACTIVE`, `INACTIVE`]`
- `password_hash`: String (Argon2id default)
- `created_at`: Timestamp (UTC)
- `updated_at`: Timestamp (UTC)

### 2. Base API Context Constraints
Every authenticated API request must inject the following into its context:
- `user_id`: UUID
- `role`: Enum
- `tenant_id` / `org_id`: UUID (Implicit scoping based on agency)

---

## API Design & Endpoints

### Identity Management
- **`POST /api/v1/auth/login`**: Authenticates an Agent and issues a short-lived access JWT and a HttpOnly refresh cookie.
- **`POST /api/v1/auth/logout`**: Invalidates the current session.
- **`GET /api/v1/auth/me`**: Returns the current agent profile information securely.

### Global Constraints
- All subsequent `/api/v1/*` endpoints MUST require a valid JWT.
- Responses conform strictly to standard data wrappers:
```json
{
  "data": { ... },
  "meta": {
    "timestamp": "ISO-8601",
    "request_id": "UUID"
  }
}
```

---

## Authentication & RBAC

| Entity Access | Agent Role | Admin Role |
|---------------|------------|------------|
| Auth Login    | Execute    | Execute    |
| Override Data | Deny       | Execute    |
| Other Agent Data| Deny      | Execute    |

- **Data Partitioning**: By default, Agents can only SELECT, UPDATE, or DELETE records where `agent_id == JWT.agent_id`. Admin role circumvents partitioned checks.
