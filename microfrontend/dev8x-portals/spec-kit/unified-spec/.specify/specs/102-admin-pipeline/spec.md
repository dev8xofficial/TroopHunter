# Admin Pipeline

> **Module ID**: `102-admin-pipeline`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Pipeline module manages the recruiting kanban board, stage transitions, age-in-stage signals, and the conversion logic behind the hiring funnel.

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

### FR-102-01: Render stage-based board

**Description**: The system shall group active applicants into the approved recruiting stages.

**Acceptance Criteria**:
- [ ] Board stages follow the approved order from applied through joined.
- [ ] Each card shows candidate, role, age in stage, and urgency indicators.
- [ ] Stage counts update after every valid transition.

### FR-102-02: Support stage changes

**Description**: The system shall allow HR admins to move applicants between valid stages.

**Acceptance Criteria**:
- [ ] Only valid stage moves are accepted.
- [ ] Invalid moves return a validation error and do not mutate the card.
- [ ] Stage changes update both the board and the applicant record.

### FR-102-03: Flag stale work

**Description**: The system shall identify cards that exceed stage-age thresholds.

**Acceptance Criteria**:
- [ ] Stale cards are highlighted consistently.
- [ ] Thresholds may vary by stage.
- [ ] Stale flagging writes an audit event for monitoring.

---

## Data Model

### PipelineCard

Recruiting pipeline card attached to an applicant.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| applicant_id | uuid | Yes | FK -> Applicant.id | Applicant identifier |
| stage | string | Yes | Recruiting stage | Board stage |
| age_in_stage_days | integer | Yes | min 0 | Days in current stage |
| urgent | boolean | Yes | default false | Urgency indicator |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-102-01: Approved lane order

**Condition**: When a card moves
**Action**: Apply only stage transitions present in the approved pipeline lifecycle.
**Rationale**: ADR-007

### BR-102-02: Board and record consistency

**Condition**: When a card moves successfully
**Action**: Persist the same resulting stage to the applicant record.
**Rationale**: Avoids divergent truth between roster and board

---

## State Machine

See [state-machines.md](state-machines.md) for the recruiting pipeline lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/pipeline`
- `PATCH /api/v1/admin/pipeline/cards/{applicant_id}/stage`
- `GET /api/v1/admin/pipeline/metrics`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.pipeline.stage_changed` (EVT-102-01)
- `admin.pipeline.stale_flagged` (EVT-102-02)
- `admin.pipeline.metrics_viewed` (EVT-102-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 101-admin-applicants | Shared | Shares applicant identity and lifecycle state |
| 100-admin-dashboard | Downstream | Publishes aggregate counts back to the dashboard |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)