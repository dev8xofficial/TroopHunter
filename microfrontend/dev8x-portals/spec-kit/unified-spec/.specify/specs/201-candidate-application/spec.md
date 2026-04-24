# Candidate Application

> **Module ID**: `201-candidate-application`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Application module exposes the application timeline, step-by-step status updates, and acknowledgement paths for candidate-facing recruiting progress.

---

## Actors

| Actor | Role | Interaction |
| --- | --- | --- |
| Candidate | candidate | Acts on their own application, interviews, and onboarding |
| HR Admin | hr_admin | Supports candidate progress and exception handling |
| Super Admin | super_admin | Reviews escalations and compliance issues |
| Manager | manager | Has limited read-only oversight for managed placements |
| System | system | Calculates progress, deadlines, and audit events |

---

## Functional Requirements

### FR-201-01: Display timeline status

**Description**: The system shall show the candidate timeline from application through final outcome.

**Acceptance Criteria**:
- [ ] Timeline steps include state, date, and step details where available.
- [ ] Current step is visually distinguishable from done and pending steps in functional data terms.
- [ ] Skipped or unavailable steps do not break the sequence.

### FR-201-02: Provide step detail

**Description**: The system shall allow a candidate to read the detail for a timeline step.

**Acceptance Criteria**:
- [ ] Each step detail explains the current state and next expected action.
- [ ] Detail access is limited to the owning candidate record.
- [ ] Viewed steps emit an audit event.

### FR-201-03: Record acknowledgements

**Description**: The system shall allow the candidate to acknowledge required application notices.

**Acceptance Criteria**:
- [ ] Acknowledgement records the step and timestamp.
- [ ] Duplicate acknowledgements do not create duplicate state changes.
- [ ] Acknowledgement does not move the application to a new recruiting stage by itself.

---

## Data Model

### ApplicationStep

Candidate-visible step in the application timeline.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| step_key | string | Yes | unique per application | Step identifier |
| status | string | Yes | done, current, pending, skipped, not_selected, offer | Candidate-facing step state |
| step_date | datetime | No | Optional timestamp | When the step changed |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-201-01: Read-only recruiting state

**Condition**: When the candidate acknowledges a step
**Action**: Do not advance the core recruiting stage without an admin-side event.
**Rationale**: Prevents candidate self-promotion

### BR-201-02: Timeline continuity

**Condition**: When a step is skipped or not applicable
**Action**: Keep the ordered timeline intact and mark the step accordingly.
**Rationale**: Supports transparent progress communication

---

## State Machine

See [state-machines.md](state-machines.md) for the candidate application lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/application/timeline`
- `GET /api/v1/candidate/application/status`
- `POST /api/v1/candidate/application/acknowledge-step`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.application.timeline_viewed` (EVT-201-01)
- `candidate.application.step_acknowledged` (EVT-201-02)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 101-admin-applicants | Upstream | Primary recruiting stage source of truth |
| 200-candidate-dashboard | Downstream | Dashboard progress tracker reflects timeline status |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
