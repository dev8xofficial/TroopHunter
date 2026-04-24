# Admin Interviews

> **Module ID**: `104-admin-interviews`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Interviews module schedules interviews, assigns interviewers, and tracks interview outcomes without allowing conflicting reservations.

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

### FR-104-01: Schedule interviews

**Description**: The system shall create interview records for applicants and interviewers.

**Acceptance Criteria**:
- [ ] Interview creation requires applicant, interviewer, type, and scheduled time.
- [ ] Conflicting interviewer slots are rejected.
- [ ] Successful scheduling publishes a candidate-facing confirmation path.

### FR-104-02: Manage status changes

**Description**: The system shall update interviews through their approved statuses.

**Acceptance Criteria**:
- [ ] Interviews can be confirmed, completed, cancelled, or marked no_show.
- [ ] Status changes record the actor and reason where applicable.
- [ ] Candidate reschedules remain linked to the same interview thread.

### FR-104-03: Expose calendar and queue views

**Description**: The system shall present time-based and list-based interview views.

**Acceptance Criteria**:
- [ ] Calendar view groups interviews by date and interviewer.
- [ ] Queue view highlights unconfirmed or overdue interviews.
- [ ] Filters support interviewer and status.

---

## Data Model

### Interview

Scheduled interview between an applicant and interviewer.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| applicant_id | uuid | Yes | FK -> Applicant.id | Linked applicant |
| interviewer_id | uuid | Yes | FK -> Admin user | Assigned interviewer |
| scheduled_for | datetime | Yes | ISO-8601 | Interview start |
| type | string | Yes | screening \| technical \| final | Interview type |
| status | string | Yes | scheduled, confirmed, completed, cancelled, no_show | Interview status |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-104-01: No interviewer conflicts

**Condition**: When scheduling or rescheduling an interview
**Action**: Reject the request if the interviewer already has an overlapping interview.
**Rationale**: Maintains scheduling integrity

### BR-104-02: Candidate visibility

**Condition**: When an interview is scheduled or rescheduled
**Action**: Expose the resulting reservation to the candidate portal immediately.
**Rationale**: Keeps both portals in sync

---

## State Machine

See [state-machines.md](state-machines.md) for the interview lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/interviews/calendar`
- `POST /api/v1/admin/interviews`
- `PATCH /api/v1/admin/interviews/{id}/status`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.interview.scheduled` (EVT-104-01)
- `admin.interview.rescheduled` (EVT-104-02)
- `admin.interview.status_changed` (EVT-104-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 101-admin-applicants | Upstream | Interview records belong to applicants |
| 202-candidate-interviews | Downstream | Candidate portal reflects scheduling availability and confirmations |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)