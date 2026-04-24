# Admin Applicants

> **Module ID**: `101-admin-applicants`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Applicants module owns the applicant roster, filtering, detail views, and approved status changes across the recruiting lifecycle.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| HR Admin | hr_admin | Runs recruiting, hiring, and operational workflows |
| Super Admin | super_admin | Maintains global oversight and escalations |
| Manager | manager | Has read-only oversight for managed teams |
| System | system | Publishes calculations, alerts, and audit entries |

---

## Functional Requirements

### FR-101-01: List and filter applicants

**Description**: The system shall provide filterable and pageable access to the applicant roster.

**Acceptance Criteria**:
- [ ] Filters support status, position, department, source, and applied date.
- [ ] Pagination is stable and sortable by key recruiting columns.
- [ ] Result counts reflect the active filter set.

### FR-101-02: Show applicant detail

**Description**: The system shall provide a full applicant detail view with recruiting context.

**Acceptance Criteria**:
- [ ] Detail view includes profile, current status, timeline, evaluation summary, and documents.
- [ ] Missing sections are shown as empty states rather than causing an error.
- [ ] Detail view is accessible from dashboard and pipeline drilldowns.

### FR-101-03: Apply approved status changes

**Description**: The system shall allow HR admins to update applicant status along the approved lifecycle.

**Acceptance Criteria**:
- [ ] Status changes must respect the approved applicant lifecycle.
- [ ] Rejected and future hire require a reason.
- [ ] Every status change emits an audit event.

---

## Data Model

### Applicant

Candidate application record in the recruiting system.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | FK -> Candidate profile | Linked candidate |
| position_title | string | Yes | max 150 | Applied position |
| status | string | Yes | applied, shortlisted, interview, selected, joined, rejected, future_hire | Current applicant stage |
| source | string | Yes | max 100 | Applicant source |
| department | string | Yes | max 100 | Hiring department |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-101-01: No lifecycle skip

**Condition**: When changing applicant status
**Action**: Reject transitions that skip required intermediate stages.
**Rationale**: Constitution G-05

### BR-101-02: Terminal join and reject semantics

**Condition**: When an applicant reaches joined, rejected, or future_hire
**Action**: Treat the current workflow as complete and prevent return to earlier active stages.
**Rationale**: Preserves recruiting history

---

## State Machine

See [state-machines.md](state-machines.md) for the applicant lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/applicants`
- `GET /api/v1/admin/applicants/{id}`
- `PATCH /api/v1/admin/applicants/{id}/status`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.applicant.viewed` (EVT-101-01)
- `admin.applicant.status_changed` (EVT-101-02)
- `admin.applicant.exported` (EVT-101-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 102-admin-pipeline | Related | Shares approved applicant stage definitions |
| 105-admin-evaluations | Related | Displays latest evaluation summary in applicant detail |
| 106-admin-documents | Related | Displays required and submitted documents |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)