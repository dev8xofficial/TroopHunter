# Candidate Dashboard

> **Module ID**: `200-candidate-dashboard`
> **Domain**: Candidate Portal (2xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Candidate Dashboard summarizes the current application state, progress tracker, upcoming deadlines, and quick actions for an individual candidate.

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

### FR-200-01: Summarize progress

**Description**: The system shall display the current application progress and overall completion status.

**Acceptance Criteria**:
- [ ] Progress reflects completed, current, and pending steps.
- [ ] Overall completion percentage updates after each completed requirement.
- [ ] Progress links to the relevant underlying module.

### FR-200-02: Surface deadlines and actions

**Description**: The system shall list urgent deadlines and available actions.

**Acceptance Criteria**:
- [ ] Deadlines are ordered by due date and urgency.
- [ ] Quick actions only include actions currently available to the candidate.
- [ ] Completed or unavailable actions are not presented as actionable.

### FR-200-03: Publish a personalized snapshot

**Description**: The system shall scope dashboard data to the current candidate only.

**Acceptance Criteria**:
- [ ] No cross-candidate records are exposed.
- [ ] Snapshot publishes the timestamp of the latest refresh.
- [ ] Dashboard refresh emits an audit event.

---

## Data Model

### CandidateProgress

Aggregated progress tracker for a candidate.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| candidate_id | uuid | Yes | Candidate profile id | Candidate identifier |
| overall_completion_pct | number | Yes | 0-100 | Completion percentage |
| current_step | string | Yes | Current workflow step | Current active step |
| deadline_count | integer | Yes | min 0 | Visible deadlines |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-200-01: Candidate isolation

**Condition**: When dashboard data is queried
**Action**: Scope all data to the current candidate record.
**Rationale**: Constitution G-03

### BR-200-02: Action availability

**Condition**: When showing quick actions
**Action**: Return only actions whose prerequisites are currently satisfied.
**Rationale**: Avoids dead-end actions

---

## State Machine

See [state-machines.md](state-machines.md) for the candidate snapshot lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/candidate/dashboard/summary`
- `GET /api/v1/candidate/dashboard/deadlines`
- `GET /api/v1/candidate/dashboard/quick-actions`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `candidate.dashboard.viewed` (EVT-200-01)
- `candidate.dashboard.quick_action_opened` (EVT-200-02)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 201-candidate-application | Upstream | Provides current application step and status |
| 202-candidate-interviews | Upstream | Provides upcoming interview reminders |
| 203-candidate-documents | Upstream | Provides pending document actions |
| 204-candidate-onboarding | Upstream | Provides onboarding completion status |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
