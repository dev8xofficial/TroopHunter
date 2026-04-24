# Admin Interviews - Implementation Plan

> **Module ID**: `104-admin-interviews`
> **Version**: 1.0.0

---

## Objective

Implement the admin interviews specification for the hr admin panel domain with contract-first validation, RBAC enforcement, and append-only audit coverage.

---

## Prerequisites

| Prerequisite | Status |
| --- | --- |
| Functional requirements approved | Complete (spec.md) |
| Validation models defined | Complete (validation-schema.json) |
| RBAC contract defined | Complete (rbac-matrix.md) |
| Shared contracts aligned | Complete (contracts/*.yaml) |

---

## Implementation Tasks

### Task 1: Model Interview

**Complexity**: M
**Priority**: P0

**Description**: Finalize canonical data structures, validation rules, and ownership boundaries for admin interviews.

### Task 2: Deliver core API surface

**Complexity**: L
**Priority**: P0

**Description**: Implement the request and response contracts for GET /api/v1/admin/interviews/calendar, POST /api/v1/admin/interviews, PATCH /api/v1/admin/interviews/{id}/status.

### Task 3: Enforce RBAC and data scoping

**Complexity**: M
**Priority**: P0

**Description**: Apply the role gates, own-data constraints, and managed-account boundaries defined in the RBAC matrix.

### Task 4: Implement interview lifecycle

**Complexity**: M
**Priority**: P1

**Description**: Carry the approved lifecycle into state transitions, guard conditions, and invalid transition handling.

### Task 5: Wire audit events

**Complexity**: S
**Priority**: P1

**Description**: Emit 3 append-only events with payloads aligned to contracts/events.yaml.

### Task 6: Add validation and regression coverage

**Complexity**: S
**Priority**: P1

**Description**: Cover positive, negative, permission, and lifecycle regression cases before implementation closes.

---

## Cross-Domain Dependencies

| Contract | Update Required | Description |
| --- | --- | --- |
| api.yaml | Yes | Registers 3 endpoints |
| access-control.yaml | Yes | Captures 3 permission operations |
| events.yaml | Yes | Registers 3 append-only audit events |
| interactions.yaml | Yes | Publishes Interview Lifecycle transitions |

---

## Estimated Timeline

| Phase | Duration | Tasks |
| --- | --- | --- |
| Phase 1 | 1-2 days | Model Interview, Deliver core API surface, Enforce RBAC and data scoping |
| Phase 2 | 2-3 days | Implement interview lifecycle, Wire audit events, Add validation and regression coverage |
| Phase 3 | 3-4 days | Regression, observability, and rollout checks |