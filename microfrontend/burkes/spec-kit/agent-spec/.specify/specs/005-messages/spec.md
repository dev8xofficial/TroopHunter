# Feature Specification: Unified Messaging

**Feature ID**: 005-messages
**Status**: approved
**Created**: 2026-04-15
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Module**: Communications

---

## Overview
Governs asynchronous threaded messaging between Agents, Clients, and mapped external partners (Attorneys, Lenders). 

---

## Core Data Models

### 1. Message Entity
- `id`: UUID (Primary Key)
- `sender_id`: UUID (Polymorphic Foreign Key -> User/Agent/Partner)
- `recipient_id`: UUID (Polymorphic Foreign Key -> User/Agent/Partner)
- `transaction_id`: UUID (Foreign Key, Optional scoping)
- `subject`: String
- `body`: Text
- `is_read`: Boolean (Default false)
- `sent_at`: Timestamp (UTC)

---

## API Design & Endpoints

- **`GET /api/v1/messages`**
  - Query Filters: `?status=unread`, `?type=client|attorney|lender`
- **`POST /api/v1/messages`**
  - Submits a transactional message chunk to the pipeline.
- **`PUT /api/v1/messages/{id}/read`**
  - Mutates `is_read` flag.

---

## Payload Validation Schema

```json
{
  "recipient_id": "uuid (Required)",
  "transaction_id": "uuid (Optional)",
  "subject": "string (Required, max 255)",
  "body": "string (Required)"
}
```

---

## Business Logic & Constraints

- **Thread Grouping**: Backend constructs threads locally partitioned based on identical `{sender_id, recipient_id, transaction_id}` keys.
- **Notifications**: Message creation triggers Real-time delivery hooks (Websockets/Push).
- **Access Rule**: Agents can read unread counts (`COUNT WHERE recipient_id = JWT.agent_id AND is_read = FALSE`).
