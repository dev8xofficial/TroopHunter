# [Module Name]

> **Module ID**: `NNN-module-name`
> **Domain**: [Auth | Admin | Candidate | Client | CRM]
> **Version**: 1.0.0
> **Last Updated**: YYYY-MM-DD

---

## Overview

Brief description of what this module does (2-3 sentences).

---

## Actors

| Actor | Role | Interaction |
|-------|------|-------------|
| actor_name | `role_id` | What they do with this module |

---

## Functional Requirements

### FR-NNN-01: [Requirement Name]

**Description**: What the system shall do.

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

### FR-NNN-02: [Requirement Name]

**Description**: What the system shall do.

**Acceptance Criteria**:
- [ ] Criterion 1
- [ ] Criterion 2

---

## Data Model

### [Entity Name]

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| id | uuid | Yes | Primary key | Unique identifier |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-generated | Last update timestamp |

---

## Business Rules

### BR-NNN-01: [Rule Name]

**Condition**: When [condition is met]
**Action**: The system shall [action]
**Rationale**: [Why this rule exists]

---

## State Machine

See [state-machines.md](state-machines.md) for full lifecycle definition.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions.

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for event definitions.

---

## Dependencies

| Module | Dependency Type | Description |
|--------|----------------|-------------|
| `NNN-module-name` | Required | Why this dependency exists |

---

## References

- [Constitution](../../memory/constitution.md)
- [API Contract](../../../contracts/api.yaml)
- [Access Control](../../../contracts/access-control.yaml)
