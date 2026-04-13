# Feature Specification: CRM Admin Settings

**Feature ID**: 016-admin-settings
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Admin Settings - users, roles, retention policies, entitlements, and governance controls

---

## Overview

The Admin Settings feature is the governance workspace for the CRM. It gives authorized administrators one place to manage users, roles, department assignments, retention policies, notification defaults, feature entitlements, and tenant-ready operating metadata without exposing unsafe controls to standard users.

---

## Problem Statement

As the CRM grows beyond the Phase 1 core workflows, Burkes needs a formal operational control surface for user access, retention obligations, and product configuration. Without Admin Settings, governance would be fragmented across hidden configuration files, provider consoles, and ad hoc manual changes. That weakens auditability, increases permission risk, and slows onboarding. Admin Settings solves that by making platform governance explicit, role-aware, and reviewable inside the CRM itself.

---

## Goals

- Provide administrator workflows for user, role, and department management.
- Surface retention-policy controls for recordings, documents, and related CRM data.
- Show feature entitlements and tenant-ready subscription context without forcing full billing implementation.
- Define safe defaults for notifications, permissions, and operational governance.
- Preserve audit visibility for sensitive changes.

---

## Non-Goals

- This feature does not implement a full billing processor or subscription checkout flow.
- It does not replace the shared identity provider.
- It does not expose raw infrastructure configuration or secrets in the CRM UI.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Platform Administrator (PA) | Manages users, roles, retention, and platform-level settings |
| Department Owner (OW) | Reviews limited team settings where delegated by policy |
| Compliance Reviewer | Audits policy changes and retention configuration where authorized |

---

## User Scenarios

### Scenario 1 - Administrator assigns a new operator

**Actor**: Platform Administrator
**Precondition**: A new CRM user needs platform access.
**Flow**:
1. The administrator opens Admin Settings.
2. The CRM shows the user directory and invite or assignment workflow.
3. The administrator assigns role and department scope, then confirms the change.

**Success**: The new operator is onboarded with explicit, auditable access boundaries.

---

### Scenario 2 - Administrator updates a retention policy

**Actor**: Platform Administrator
**Precondition**: A retention rule needs to be reviewed or updated.
**Flow**:
1. The administrator opens the retention section.
2. The CRM shows current retention values by data type and department.
3. The administrator proposes a change, reviews impact, and confirms it.

**Success**: Governance changes are deliberate, visible, and auditable.

---

## Functional Requirements

### FR-16-01 - User Directory and Assignment

The feature must provide an administrator-visible user directory with role, department, and status assignment controls.

### FR-16-02 - Role and Scope Management

Administrators must be able to manage role mappings and department-scoped access within the CRM governance model.

### FR-16-03 - Retention Policy Management

The feature must expose retention settings for recordings, documents, and related CRM data in a department-aware manner.

### FR-16-04 - Feature Entitlements and Tier Visibility

The screen must show which features are enabled, limited, or future-gated by internal entitlement or tenant-ready subscription context.

### FR-16-05 - Notification and Operational Defaults

Administrators must be able to review default notification behavior and other safe operational settings relevant to the CRM.

### FR-16-06 - Audit and Change Visibility

Sensitive administrative changes must create visible audit entries with actor, timestamp, and change summary.

### FR-16-07 - Privileged Access Protection

Only authorized roles may view or edit administrative settings, and destructive actions must require confirmation.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `admin_user.id` | string | Managed user identifier |
| `admin_user.role` | string | Assigned CRM role |
| `admin_user.department_scope` | array | Department write scope |
| `retention_policy.id` | string | Retention policy identifier |
| `retention_policy.data_type` | string | Recordings, documents, messages, or related data |
| `entitlement.code` | string | Feature or tier gate identifier |
| `setting.audit_required` | boolean | Whether change requires audit event and confirmation |

---

## Edge Cases & Error States

- **User role conflict**: The CRM blocks incompatible scope assignments and explains why.
- **Retention rule overlap**: Conflicting retention definitions are flagged before save.
- **Delegated owner limits**: Owners can see limited team context without accessing platform-wide governance controls.
- **Future entitlement**: Features that are planned but not active remain visible as unavailable rather than silently hidden.

---

## Assumptions

1. Platform administrators remain the primary actors for settings changes in Phase 2.
2. Tenant-ready entitlement visibility is valuable before full billing automation exists.
3. Governance actions must remain auditable even when the downstream implementation lives outside the CRM UI.

---

## Success Criteria

1. Administrators can manage users, roles, and retention policies from one governed workspace.
2. Feature entitlement and readiness state is visible without exposing unsafe billing complexity.
3. Sensitive configuration changes are auditable and confirmation-gated.

---

## Open Questions

1. Which settings should be delegable to department owners without creating governance drift?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [014-integrations](../014-integrations/spec.md)
