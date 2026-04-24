# Client Dashboard

> **Module ID**: `300-client-dashboard`
> **Domain**: Client Portal (3xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Client Dashboard provides a client-scoped summary of projects, invoices, support tickets, and recent account activity.

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

### FR-300-01: Aggregate client KPIs

**Description**: The system shall show top-level client account metrics.

**Acceptance Criteria**:
- [ ] Metrics include active projects, total invoiced, open tickets, and team size.
- [ ] Values are scoped to the current client or managed client account.
- [ ] Snapshot timestamp is included with the response.

### FR-300-02: List project health overview

**Description**: The system shall summarize active projects and their current health.

**Acceptance Criteria**:
- [ ] Each project row includes current health, progress, and project manager context.
- [ ] Projects are ordered by recent activity.
- [ ] Project detail routing leads to the project module.

### FR-300-03: Publish recent account activity

**Description**: The system shall show the latest account-level events.

**Acceptance Criteria**:
- [ ] Activity includes file uploads, invoices, ticket updates, and project milestones.
- [ ] Activity stays within the current client account scope.
- [ ] Dashboard reads emit an audit event.

---

## Data Model

### ClientDashboardSnapshot

Aggregated client account summary.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| client_id | uuid | Yes | Client account id | Client identifier |
| active_project_count | integer | Yes | min 0 | Number of active projects |
| open_ticket_count | integer | Yes | min 0 | Open support tickets |
| total_invoiced_amount | number | Yes | min 0 | Total invoiced amount |
| team_size | integer | Yes | min 0 | Visible team size |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-300-01: Client account isolation

**Condition**: When querying dashboard data
**Action**: Filter all summaries to the active client account or managed account list.
**Rationale**: Constitution G-04

### BR-300-02: Support-only super admin access

**Condition**: When the actor is super_admin
**Action**: Allow read-only or support access from the dashboard.
**Rationale**: Prevents accidental mutation

---

## State Machine

See [state-machines.md](state-machines.md) for the client snapshot lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/client/dashboard/summary`
- `GET /api/v1/client/dashboard/projects-overview`
- `GET /api/v1/client/dashboard/activity`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `client.dashboard.viewed` (EVT-300-01)
- `client.dashboard.project_drilldown_opened` (EVT-300-02)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 301-client-projects | Upstream | Provides project health and progress data |
| 302-client-invoices | Upstream | Provides invoicing summaries |
| 306-client-support | Upstream | Provides ticket counts and recent updates |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-008-clockify-integration-strategy.md](../../decisions/adr-008-clockify-integration-strategy.md)