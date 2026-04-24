# Admin Dashboard

> **Module ID**: `100-admin-dashboard`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Dashboard aggregates recruiting KPIs, funnel conversion counts, and exception queues so HR administrators can prioritize day-to-day hiring work from a single entry point.

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

### FR-100-01: Aggregate recruiting KPIs

**Description**: The system shall calculate and display top-level recruiting metrics.

**Acceptance Criteria**:
- [ ] Counts include total applicants, active jobs, interviews this week, and average time to hire.
- [ ] Metrics may be filtered by date range.
- [ ] Each metric publishes the snapshot timestamp used for calculation.

### FR-100-02: Display funnel performance

**Description**: The system shall show the recruiting funnel from applied through joined.

**Acceptance Criteria**:
- [ ] Each stage shows the current count and conversion rate from the previous stage.
- [ ] Joined and rejected records are excluded from active-stage counts.
- [ ] Users can drill into the underlying queue for a selected stage.

### FR-100-03: Surface priority queues

**Description**: The system shall present stale, urgent, or blocked recruiting work items.

**Acceptance Criteria**:
- [ ] Urgent applicant cards and overdue interview scheduling requests appear in the priority queue.
- [ ] Items are ordered by urgency and age.
- [ ] Queue selection routes to the owning downstream module.

---

## Data Model

### AdminDashboardSnapshot

Aggregated recruiting summary for the current filter scope.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| applicant_count | integer | Yes | min 0 | Total applicants |
| active_job_count | integer | Yes | min 0 | Open jobs |
| interviews_this_week | integer | Yes | min 0 | Upcoming interviews this week |
| average_time_to_hire_days | number | Yes | min 0 | Average days to join |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

### FunnelMetric

Recruiting funnel stage aggregate.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| stage | string | Yes | Recruiting stage | Stage name |
| count | integer | Yes | min 0 | Records in stage |
| conversion_rate | number | Yes | 0-100 | Conversion from prior stage |

---

## Business Rules

### BR-100-01: Snapshot freshness

**Condition**: When metrics are shown
**Action**: Expose the timestamp used for the calculation.
**Rationale**: Prevents stale operational decisions

### BR-100-02: Manager read-only oversight

**Condition**: When the actor role is manager
**Action**: Allow drilldown visibility but block any mutation paths from the dashboard.
**Rationale**: Constitution P-05

---

## State Machine

See [state-machines.md](state-machines.md) for the recruiting snapshot lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/dashboard/summary`
- `GET /api/v1/admin/dashboard/funnel`
- `GET /api/v1/admin/dashboard/priority-queue`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.dashboard.viewed` (EVT-100-01)
- `admin.dashboard.drilldown_opened` (EVT-100-02)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 101-admin-applicants | Upstream | Provides applicant counts and queue details |
| 102-admin-pipeline | Upstream | Provides funnel stage counts and stale-stage indicators |
| 104-admin-interviews | Upstream | Provides upcoming interview metrics |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)