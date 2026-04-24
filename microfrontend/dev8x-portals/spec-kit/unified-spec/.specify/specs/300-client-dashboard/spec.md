# Client Dashboard

> **Module ID**: `300-client-dashboard`
> **Domain**: Client Portal (3xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Client Dashboard serves as the landing page for authenticated Client users. It aggregates high-level KPIs across all of a client's active projects, recent invoices, unread messages, and overall budget burn.

---

## Actors

| Actor | Role | Interaction |
|-------|------|-------------|
| Client | `client` | Views aggregated project data, navigates to specific projects |
| Manager | `manager` | Views client-specific dashboards for accounts they manage |
| Super Admin | `super_admin` | Has read-only access to all client dashboards |

---

## Functional Requirements

### FR-300-01: KPI Aggregation

**Description**: The system shall calculate and display key performance indicators across all active projects owned by the client.

**Acceptance Criteria**:
- [ ] Displays Total Active Projects count
- [ ] Displays Total Budget Burn (percentage across all projects)
- [ ] Displays Unpaid Invoices (count and total amount due)
- [ ] Displays Open Support Tickets count

### FR-300-02: Project Health Overview

**Description**: The system shall list active projects with their current health status.

**Acceptance Criteria**:
- [ ] Lists projects sorted by recently updated
- [ ] Displays health status indicator (On Track, At Risk, Delayed)
- [ ] Displays progress percentage bar for each project
- [ ] Clicking a project routes to `301-client-projects` detail view

### FR-300-03: Recent Activity Feed

**Description**: The system shall display a chronological feed of recent events related to the client's account.

**Acceptance Criteria**:
- [ ] Includes recent file uploads, new invoices, and ticket updates
- [ ] Limited to the 10 most recent events
- [ ] Events are pulled from the central activity log filtered by `actor.user_id` or `entity.client_id`

---

## Data Model

The Dashboard does not own any exclusive entities; it aggregates data from:
- `Project` (Module 301)
- `Invoice` (Module 302)
- `Ticket` (Module 306)

---

## Business Rules

### BR-300-01: Client Data Isolation

**Condition**: When querying dashboard data
**Action**: Enforce `client_id = current_user.id` or `manager_id = current_user.id`
**Rationale**: Constitution G-04 (Never allow a client to view other clients' projects)

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /client/dashboard/kpis`
- `GET /client/dashboard/activity`

---

## References

- [Constitution](../../memory/constitution.md) — G-04 (Client data isolation)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
