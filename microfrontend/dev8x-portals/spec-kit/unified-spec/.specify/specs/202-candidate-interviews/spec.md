# Candidate Interviews

> **Module ID**: `202-candidate-interviews`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Interviews module lets candidates review available interview slots, reserve or reschedule interviews, and confirm their upcoming interview commitments.

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

### FR-202-01: Show available slots

**Description**: The system shall present interview slots that match candidate and interviewer availability.

**Acceptance Criteria**:
- [ ] Unavailable slots are excluded or marked as taken.
- [ ] Availability is refreshed before final reservation.
- [ ] Displayed slots remain scoped to the candidate application.

### FR-202-02: Reserve and reschedule interviews

**Description**: The system shall create or update the candidate reservation for an interview.

**Acceptance Criteria**:
- [ ] Reservation requires a valid open slot.
- [ ] Rescheduling releases the previous slot only after the new slot is secured.
- [ ] Candidate confirmation is auditable.

### FR-202-03: Publish interview status

**Description**: The system shall show the current interview reservation state to the candidate.

**Acceptance Criteria**:
- [ ] Status includes scheduled, confirmed, completed, cancelled, or no_show.
- [ ] Latest reservation details are returned on refresh.
- [ ] Updates stay synchronized with admin interview records.

---

## Data Model

### InterviewReservation

Candidate-facing interview reservation.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| interview_id | uuid | Yes | Admin interview id | Linked interview |
| reserved_for | datetime | Yes | ISO-8601 | Reserved slot |
| status | string | Yes | scheduled, confirmed, completed, cancelled, no_show | Reservation status |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-202-01: Single active reservation

**Condition**: When the candidate reschedules
**Action**: Hold the new slot before releasing the previous reservation.
**Rationale**: Avoids losing a valid reservation

### BR-202-02: Admin sync

**Condition**: When a reservation changes
**Action**: Update the linked admin interview record in the same workflow.
**Rationale**: Prevents drift between portals

---

## State Machine

See [state-machines.md](state-machines.md) for the candidate interview reservation lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/interviews/availability`
- `POST /api/v1/candidate/interviews/reservations`
- `PATCH /api/v1/candidate/interviews/reservations/{id}`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.interview.reserved` (EVT-202-01)
- `candidate.interview.rescheduled` (EVT-202-02)
- `candidate.interview.confirmed` (EVT-202-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 104-admin-interviews | Upstream | Admin interview records own scheduling truth |
| 200-candidate-dashboard | Downstream | Dashboard shows interview reminders and action state |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
