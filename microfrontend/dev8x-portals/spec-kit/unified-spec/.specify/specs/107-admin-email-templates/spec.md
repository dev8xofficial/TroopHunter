# Admin Email Templates

> **Module ID**: `107-admin-email-templates`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Email Templates module stores reusable recruiting communications, validates variable placeholders, and supports preview or test-send workflows.

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

### FR-107-01: Store reusable templates

**Description**: The system shall maintain template records grouped by recruiting use case.

**Acceptance Criteria**:
- [ ] Each template includes a subject, body, and allowed variables.
- [ ] Templates may be draft, approved, or retired.
- [ ] Template list can be filtered by status and use case.

### FR-107-02: Validate variable placeholders

**Description**: The system shall validate that template variables belong to the approved variable catalog.

**Acceptance Criteria**:
- [ ] Unsupported placeholders are rejected.
- [ ] Preview output replaces known variables with sample values.
- [ ] Variable validation occurs before approval.

### FR-107-03: Preview and test templates

**Description**: The system shall let admins preview or send a controlled test of a template.

**Acceptance Criteria**:
- [ ] Preview leaves the template unchanged.
- [ ] Test send targets a controlled recipient only.
- [ ] Preview and test actions emit audit events.

---

## Data Model

### EmailTemplate

Reusable email template for recruiting workflows.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| template_key | string | Yes | unique | Template identifier |
| channel | string | Yes | enum: email | Delivery channel |
| status | string | Yes | draft, approved, retired | Template lifecycle state |
| variable_names | array | Yes | Approved placeholders | Allowed variable names |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-107-01: Approved variable catalog

**Condition**: When a template is created or updated
**Action**: Reject placeholders outside the approved variable catalog.
**Rationale**: Prevents malformed communications

### BR-107-02: Retired template safety

**Condition**: When a template is retired
**Action**: Block it from future preview-for-send or workflow usage.
**Rationale**: Avoids accidental reuse

---

## State Machine

See [state-machines.md](state-machines.md) for the template lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/templates`
- `POST /api/v1/admin/templates`
- `POST /api/v1/admin/templates/{id}/preview`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.template.created` (EVT-107-01)
- `admin.template.updated` (EVT-107-02)
- `admin.template.previewed` (EVT-107-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 101-admin-applicants | Related | Template variables often reference applicant and job context |
| 205-candidate-messages | Downstream | Outbound communications may surface back into candidate communications history |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)