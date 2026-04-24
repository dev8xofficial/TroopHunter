# Client Projects

> **Module ID**: `301-client-projects`
> **Domain**: Client Portal (3xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Client Projects module manages the lifecycle and tracking of active and completed client engagements. It provides transparency into project health, team allocation, and progress.

---

## Actors

| Actor | Role | Interaction |
|-------|------|-------------|
| Client | `client` | Views their assigned projects, checks progress |
| Manager | `manager` | Creates/updates projects, assigns team members, updates health |

---

## Functional Requirements

### FR-301-01: Project Listing

**Description**: The system shall list all projects associated with a client.

**Acceptance Criteria**:
- [ ] Displays project name, status, PM, and progress
- [ ] Allows filtering by status (On Track, At Risk, Delayed, Completed)
- [ ] Supports pagination (20 per page)

### FR-301-02: Project Details

**Description**: The system shall provide a detailed view of a specific project.

**Acceptance Criteria**:
- [ ] Displays overall progress percentage
- [ ] Lists assigned team members (names and roles)
- [ ] Displays payment type (Fixed, Hourly, Monthly)
- [ ] Shows recent files and associated invoices

### FR-301-03: Health Status Updates

**Description**: The system shall allow authorized roles to update project health.

**Acceptance Criteria**:
- [ ] `manager` can change status between On Track, At Risk, Delayed
- [ ] Status change requires an optional "reason" note
- [ ] Emits `client.project.health_changed` event

---

## Data Model

### Project

Defined in [schemas/project.schema.json](../../../schemas/project.schema.json).

---

## Business Rules

### BR-301-01: Completed Project Immutability

**Condition**: When a project status is `completed`
**Action**: Prevent further time entries or file uploads; allow only invoice generation
**Rationale**: Finalized projects should be archived for auditing

---

## API Surface

- `GET /client/projects`
- `GET /client/projects/{id}`
- `PUT /client/projects/{id}/status` (Manager only)

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md).
