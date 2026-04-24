# Admin Evaluations

> **Module ID**: `105-admin-evaluations`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Evaluations module captures structured candidate assessments, scoring dimensions, and final decision readiness after interviews complete.

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

### FR-105-01: Capture structured assessments

**Description**: The system shall store dimension-based evaluation scores and notes.

**Acceptance Criteria**:
- [ ] Each evaluation references the applicant and evaluator.
- [ ] Scores are captured for multiple named dimensions.
- [ ] Evaluators may save drafts before submission.

### FR-105-02: Support calibration and decisioning

**Description**: The system shall support final assessment decisions after review.

**Acceptance Criteria**:
- [ ] Submitted evaluations may enter calibration before finalization.
- [ ] Final decisions record a recommendation outcome.
- [ ] Decision readiness is visible on the applicant record.

### FR-105-03: Preserve evaluation history

**Description**: The system shall keep submitted and finalized evaluations immutable.

**Acceptance Criteria**:
- [ ] Finalized evaluations cannot be edited in place.
- [ ] New revisions create a new record rather than mutating the finalized one.
- [ ] All submissions emit audit events.

---

## Data Model

### Evaluation

Structured assessment of an applicant.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| applicant_id | uuid | Yes | FK -> Applicant.id | Linked applicant |
| evaluator_id | uuid | Yes | Admin user id | Evaluator |
| status | string | Yes | draft, submitted, calibrated, finalized | Evaluation lifecycle state |
| recommendation | string | No | advance \| hold \| reject | Final recommendation |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-105-01: Immutable finalized records

**Condition**: When an evaluation is finalized
**Action**: Prevent in-place edits and require a new revision for further changes.
**Rationale**: Preserves auditability

### BR-105-02: Decision traceability

**Condition**: When a final recommendation is recorded
**Action**: Store evaluator identity and timestamp with the recommendation.
**Rationale**: Supports downstream hiring decisions

---

## State Machine

See [state-machines.md](state-machines.md) for the evaluation lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/evaluations/{applicant_id}`
- `POST /api/v1/admin/evaluations/{applicant_id}`
- `POST /api/v1/admin/evaluations/{applicant_id}/decision`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.evaluation.saved` (EVT-105-01)
- `admin.evaluation.submitted` (EVT-105-02)
- `admin.evaluation.finalized` (EVT-105-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 104-admin-interviews | Upstream | Evaluations typically begin after interviews complete |
| 101-admin-applicants | Downstream | Applicant detail shows evaluation summaries and readiness |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)