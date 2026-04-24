# Client Projects

> **Module ID**: `301-client-projects`
> **Domain**: Client Portal (3xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Client Projects module exposes the client project roster, health indicators, progress, and project detail information for client-owned or managed accounts.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| Client | client | Views and manages their own account data |
| Manager | manager | Operates on managed client accounts |
| Super Admin | super_admin | Provides read-only or support access |
| System | system | Publishes summaries, sync status, and lifecycle events |

---

## Functional Requirements

### FR-301-01: List projects

**Description**: The system shall return all visible projects for the active client account scope.

**Acceptance Criteria**:
- [ ] Projects can be filtered by health and payment type.
- [ ] Each row includes progress, health, and project manager context.
- [ ] Only projects linked to the active client account are returned.

### FR-301-02: Provide project detail

**Description**: The system shall provide detail for a selected project.

**Acceptance Criteria**:
- [ ] Detail includes progress, milestones, team roster, and payment type.
- [ ] Missing optional fields return empty states instead of errors.
- [ ] Project detail is accessible from the dashboard.

### FR-301-03: Preserve project lifecycle state

**Description**: The system shall expose the current project lifecycle state and protect terminal states.

**Acceptance Criteria**:
- [ ] Projects can be active, at_risk, delayed, completed, or archived.
- [ ] Completed or archived projects are not shown as active.
- [ ] Lifecycle changes emit audit events.

---

## Data Model

### Project

Client project visible in the client portal.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| client_id | uuid | Yes | Client account id | Owning client account |
| status | string | Yes | active, at_risk, delayed, completed, archived | Project status |
| progress_pct | number | Yes | 0-100 | Project progress percentage |
| payment_type | string | Yes | fixed, hourly, monthly | Billing model |
| project_manager_name | string | Yes | max 255 | Project manager display name |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-301-01: Client scope only

**Condition**: When listing or reading projects
**Action**: Restrict visibility to the current client account or managed accounts.
**Rationale**: Constitution G-04

### BR-301-02: Archived visibility

**Condition**: When a project is archived
**Action**: Keep it available for historical reads but exclude it from active summaries.
**Rationale**: Prevents stale active counts

---

## State Machine

See [state-machines.md](state-machines.md) for the project lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/client/projects`
- `GET /api/v1/client/projects/{id}`
- `GET /api/v1/client/projects/{id}/milestones`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `client.project.viewed` (EVT-301-01)
- `client.project.lifecycle_changed` (EVT-301-02)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 300-client-dashboard | Downstream | Dashboard uses project health summaries |
| 303-client-files | Related | Project detail links to project-scoped file assets |
| 304-client-working-hours | Related | Project budget burn and team hours roll into detail |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-008-clockify-integration-strategy.md](../../decisions/adr-008-clockify-integration-strategy.md)