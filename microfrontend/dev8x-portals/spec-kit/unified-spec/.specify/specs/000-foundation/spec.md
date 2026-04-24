# Foundation

> **Module ID**: `000-foundation`
> **Domain**: Cross-Cutting (0xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-22

---

## Overview

The Foundation module defines cross-cutting platform primitives shared by all domains: the canonical User entity, system-wide notification model, audit log schema, and the base error response contract. It has no endpoints of its own but is a dependency of every other module.

---

## Actors

| Actor | Role | Interaction |
|-------|------|-------------|
| All roles | All | Inherit foundation data models and contracts |

---

## Functional Requirements

### FR-000-01: Canonical User Entity

**Description**: The system shall maintain a single User entity schema shared across all domains, with role-based polymorphism (candidate profile fields, client billing fields, etc.) handled via domain-specific extension tables.

**Acceptance Criteria**:
- [ ] User entity defined with id, email, first_name, last_name, role, status, created_at, updated_at
- [ ] All domain modules reference this schema — never re-define it
- [ ] UUID v4 used for all entity identifiers platform-wide

### FR-000-02: Unified Error Response Contract

**Description**: The system shall return errors in a consistent JSON structure across all endpoints.

**Acceptance Criteria**:
- [ ] All errors return: `{ error: "ERROR_CODE", message: "Human-readable", details: [...] }`
- [ ] HTTP status codes follow REST conventions (400, 401, 403, 404, 409, 422, 429, 500)

### FR-000-03: Audit Log Schema

**Description**: The system shall define a canonical audit event schema referenced by all domains.

**Acceptance Criteria**:
- [ ] Event schema: event_id, event_name, timestamp, actor, entity, payload, metadata
- [ ] Events are append-only and immutable (Constitution G-01)
- [ ] All modules emit events using this schema

### FR-000-04: System Notifications

**Description**: The system shall support typed notifications (success, error, warning, info) delivered to specific users.

**Acceptance Criteria**:
- [ ] Notification entity: id, type, message, timestamp, read, user_id
- [ ] Notifications are user-scoped (only the target user can read them)
- [ ] Mark-as-read operation available

---

## Data Model

### User (Canonical)

Defined in [schemas/user.schema.json](../../../schemas/user.schema.json).

### Notification

Defined in [schemas/notification.schema.json](../../../schemas/notification.schema.json).

### Audit Event

Defined in [contracts/events.yaml](../../../contracts/events.yaml).

### Error Response

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| error | string | Yes | Machine-readable error code (SCREAMING_SNAKE) |
| message | string | Yes | Human-readable description |
| details | array | No | Field-level validation errors |
| request_id | uuid | Yes | Echoed from X-Request-ID header |

---

## Business Rules

### BR-000-01: UUID Everywhere

**Condition**: When any entity is created
**Action**: Assign a UUID v4 as the primary key
**Rationale**: Non-enumerable, globally unique, prevents IDOR

### BR-000-02: Timestamps Are Immutable

**Condition**: When created_at is set
**Action**: Never modify. Only updated_at changes on mutation.
**Rationale**: Audit integrity

---

## Dependencies

| Module | Dependency Type | Description |
|--------|----------------|-------------|
| All modules | Upstream | Every module depends on foundation data models |

---

## References

- [Constitution](../../memory/constitution.md) — Section 6: Global Data Vocabulary
- [schemas/user.schema.json](../../../schemas/user.schema.json)
- [schemas/notification.schema.json](../../../schemas/notification.schema.json)
