# Admin Settings

> **Module ID**: `108-admin-settings`
> **Domain**: HR Admin Panel (1xx)
> **Version**: 1.0.0
> **Last Updated**: 2026-04-24

---

## Overview

The Admin Settings module manages administrative users, recruiting configuration toggles, and policy settings for the admin portal.

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

### FR-108-01: Maintain administrative users

**Description**: The system shall provision admin users and assign their platform roles.

**Acceptance Criteria**:
- [ ] Provisioning records the assigned role and activation state.
- [ ] Role changes are auditable.
- [ ] Only permitted actors may change another admin user role.

### FR-108-02: Update recruiting configuration

**Description**: The system shall store recruiting-related settings such as thresholds and toggles.

**Acceptance Criteria**:
- [ ] Settings capture the previous and new value.
- [ ] Sensitive changes require an approver.
- [ ] Rollback remains available when the setting is reversible.

### FR-108-03: Expose current policy state

**Description**: The system shall return the latest effective settings for the admin portal.

**Acceptance Criteria**:
- [ ] Read responses show the effective value and last editor.
- [ ] History is retained for audit review.
- [ ] Settings align with shared constitutional guardrails.

---

## Data Model

### AdminSetting

Administrative portal configuration setting.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| setting_key | string | Yes | unique | Setting identifier |
| value_type | string | Yes | toggle, text, select, number | Stored value type |
| value | string | Yes | Serialized effective value | Effective value |
| status | string | Yes | proposed, approved, applied, rolled_back | Change lifecycle state |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

### AdminUser

Administrative user allowed into the admin portal.

| Field | Type | Required | Constraints | Description |
| --- | --- | --- | --- | --- |
| id | uuid | Yes | Primary key, immutable | Unique identifier |
| name | string | Yes | min 1, max 255 | Display name |
| email | string | Yes | RFC 5322, max 254 | Email address |
| role | string | Yes | hr_admin \| super_admin | Administrative role |
| status | string | Yes | active \| suspended | User status |
| created_at | datetime | Yes | Auto-generated | Creation timestamp |
| updated_at | datetime | Yes | Auto-updated on mutation | Last update timestamp |

---

## Business Rules

### BR-108-01: Super admin control for role changes

**Condition**: When another admin user is provisioned or re-roled
**Action**: Allow only a super admin to complete the action.
**Rationale**: Limits privilege escalation

### BR-108-02: Sensitive change approval

**Condition**: When a high-impact setting changes
**Action**: Require an approver id before the setting reaches approved or applied.
**Rationale**: Reduces configuration risk

---

## State Machine

See [state-machines.md](state-machines.md) for the administrative setting lifecycle.

---

## API Surface

See [api-contracts.md](api-contracts.md) for endpoint definitions:
- `GET /api/v1/admin/settings`
- `PATCH /api/v1/admin/settings`
- `POST /api/v1/admin/settings/users`
- `PATCH /api/v1/admin/settings/users/{id}/role`

---

## Access Control

See [rbac-matrix.md](rbac-matrix.md) for role permissions.

---

## Audit Events

See [activity-log-events.md](activity-log-events.md) for:
- `admin.setting.updated` (EVT-108-01)
- `admin.user.provisioned` (EVT-108-02)
- `admin.user.role_changed` (EVT-108-03)

---

## Dependencies

| Module | Dependency Type | Description |
| --- | --- | --- |
| 003-mfa | Related | MFA policies are administered through settings |
| 000-foundation | Shared | Role definitions come from the canonical registry |

---

## References

- [Constitution](../../memory/constitution.md)
- [contracts/access-control.yaml](../../../contracts/access-control.yaml)
- [contracts/api.yaml](../../../contracts/api.yaml)
- [contracts/events.yaml](../../../contracts/events.yaml)
- [adr-007-pipeline-kanban-state-machine.md](../../decisions/adr-007-pipeline-kanban-state-machine.md)