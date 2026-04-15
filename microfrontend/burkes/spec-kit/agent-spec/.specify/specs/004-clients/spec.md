# Feature Specification: Client Management

**Feature ID**: 004-clients
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Accounts & Customers

---

## Overview
Houses the data models, API endpoints, and onboarding flows for clients managed by agents.

---

## Core Data Models

### 1. Client Entity
- `id`: UUID (Primary Key)
- `agent_id`: UUID (Foreign Key -> Agent.id)
- `first_name`: String
- `last_name`: String
- `email`: String (Unique constraint)
- `phone`: String
- `status`: Enum `[`ACTIVE`, `INACTIVE`]`
- `transaction_type`: Enum `[`PURCHASE`, `SALE`, `REFINANCE`, `BOTH`]`
- `preferred_comm_method`: Enum `[`EMAIL`, `PHONE`, `SMS`, `ANY`]`
- `password_hash`: String

---

## API Design & Endpoints

- **`GET /api/v1/clients`**: List all agent-specific clients.
- **`POST /api/v1/clients`**: Provision new client and trigger invite workflows.
- **`GET /api/v1/clients/{id}`**: Fetch client details.
- **`PUT /api/v1/clients/{id}`**: Mutate client metadata.

---

## Payload Validation Schema

```json
{
  "first_name": "string (Required, max 100)",
  "last_name": "string (Required, max 100)",
  "email": "string (Required, email)",
  "phone": "string (Required)",
  "password": "string (Required, min 16 chars)",
  "status": "enum: [ACTIVE, INACTIVE]",
  "transaction_type": "enum",
  "preferred_comm_method": "enum"
}
```

---

## Business Logic & Background Jobs

- **Password Generation Rules**: Minimum 16 characters, must enforce strict entropy for initial client invites (complex permutations of alnum and specials). 
- **Email Triggers**: 
  - `POST /api/v1/clients` successful completion MUST fire an async queue message to the Mailer service to dispatch the client welcome email with portal coordinates.
- **Partitioning**: Clients are strictly horizontally partitioned to their owning `agent_id`; queries crossing this boundary are hard-rejected with 403 Forbidden.
