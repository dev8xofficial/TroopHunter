# Admin Jobs

> **Module ID**: `103-admin-jobs`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Jobs module manages job posting records, their lifecycle from draft to closed, and the aggregate applicant counts associated with each opening.

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

### FR-103-01: Create and maintain job records

**Description**: The system shall allow HR admins to create and edit job posting details.

**Acceptance Criteria**:
- [ ] Each job stores title, department, employment type, and posting status.
- [ ] Draft jobs are editable before publication.
- [ ] Applicant counts remain linked to the active job record.

### FR-103-02: Publish and pause jobs

**Description**: The system shall support the approved job lifecycle.

**Acceptance Criteria**:
- [ ] Draft jobs can be published to live.
- [ ] Live jobs may be paused and later resumed.
- [ ] Closed jobs remain immutable and cannot be reopened.

### FR-103-03: Expose job summaries

**Description**: The system shall return a filtered list of jobs for administrative review.

**Acceptance Criteria**:
- [ ] Result list supports status and department filtering.
- [ ] Each row includes applicant count and last updated time.
- [ ] Job detail links route to the full record.

---

## Data Model

### JobPosting

Recruiting job opening tracked by the admin portal.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| title | string | Yes | max 150 | Job title |
| department | string | Yes | max 100 | Owning department |
| status | string | Yes | draft, live, paused, closed | Posting status |
| applicant_count | integer | Yes | min 0 | Number of linked applicants |
| employment_type | string | Yes | max 50 | Employment type |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-103-01: Closed is terminal

**Condition**: When a job reaches closed
**Action**: Block any later transition back to live or paused.
**Rationale**: Constitution G-06

### BR-103-02: Draft isolation

**Condition**: When a job remains in draft
**Action**: Exclude it from public candidate discovery surfaces.
**Rationale**: Preserves unpublished work

---

## State Machine

See [state-machines.md](state-machines.md) for the job posting lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/jobs`
- `POST /api/v1/admin/jobs`
- `PATCH /api/v1/admin/jobs/{id}/status`
- `GET /api/v1/admin/jobs/{id}`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.job.created` (EVT-103-01)
- `admin.job.status_changed` (EVT-103-02)
- `admin.job.closed` (EVT-103-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 101-admin-applicants | Related | Applicant counts attach to the active job record |
| 100-admin-dashboard | Downstream | Dashboard uses live job counts |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)