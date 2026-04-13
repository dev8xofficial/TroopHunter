# Implementation Plan: CRM Admin Settings

**Feature ID**: 016-admin-settings
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Admin Settings implementation defines the CRM governance workspace for user administration, role scoping, retention policy visibility, and entitlement-aware operational controls.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| User administration table | Manage operator roster, status, and assignments | New |
| Role and scope editor | Configure role and department access | New |
| Retention policy panel | Show and update policy values by data type | New |
| Entitlement and settings matrix | Show feature gates and platform defaults | New |

---

## Implementation Phases

### Phase 1 - User and role governance model

**Goal**: Define administrative user management and access-scoping behavior.
**Dependencies**: Foundation and access-control contracts complete

#### Tasks

- [ ] Define user-directory fields and states
- [ ] Define role and department assignment workflow
- [ ] Define delegated versus platform-wide administrative visibility

**Exit Criteria**: User and role governance semantics are stable.

---

### Phase 2 - Retention and operational settings

**Goal**: Define policy controls and safe-change behavior.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define retention policy views and change confirmation behavior
- [ ] Define notification and operational default settings
- [ ] Define impact and validation behavior for administrative changes

**Exit Criteria**: Governance changes are explicit and safe to review.

---

### Phase 3 - Entitlement and tenant-ready controls

**Goal**: Expose feature gating and future subscription readiness without requiring full billing implementation.
**Dependencies**: Phase 2 complete

#### Tasks

- [ ] Define feature entitlement and tier visibility
- [ ] Define unavailable or future-gated feature presentation
- [ ] Define audit requirements for entitlement-affecting changes

**Exit Criteria**: Admin Settings can support governance today and tenant readiness tomorrow.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Admin user | user_id, role, department_scope, status | Managed operator state |
| Retention policy | data_type, department, retention_window, source | Governance controls |
| Entitlement | code, state, scope, effective_at | Feature-gating visibility |
| Admin audit event | actor_id, action, target_id, created_at, summary | Sensitive change visibility |

### Data Migrations

Existing users, permission mappings, and retention defaults must be normalized into one administrative model before the workspace can be fully trusted.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Foundation access control | Both | Shared role and scope vocabulary | Canonical permission model |
| Integrations | Inbound | Show settings affected by provider dependency | Contextual only |
| Notification system | Both | Manage default alert behavior | Operational setting surface |
| Future tenant systems | Reference-ready | Support entitlement and subscription visibility | Full automation can follow later |

---

## Security & Access Control

- Administrative settings are restricted to authorized roles and must require confirmation for sensitive changes.
- Destructive or high-impact updates must create audit entries automatically.
- Delegated owner visibility must never expose platform-wide secrets or unrelated tenant data.

---

## Testing Strategy

### Unit Tests

- Role-assignment validation
- Retention policy conflict detection
- Entitlement state rendering

### Integration Tests

- Assign a new user with department scope
- Update a retention policy with confirmation and audit event
- Restrict privileged settings from non-admin roles

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Govern users and roles in one place | Run new-user assignment workflow |
| Retention visibility and control | Validate policy review and update flow |
| Audit sensitive changes | Confirm change events are recorded and reviewable |

---

## Rollout & Observability

- **Feature flag**: Yes - admin settings
- **Rollout strategy**: Platform-admin-only first, then limited owner visibility if approved
- **Key metrics to monitor**: admin task completion time, failed permission changes, retention-policy change audit coverage, unauthorized access attempts
- **Rollback plan**: Revert to read-only admin visibility while configuration workflows are corrected

---

## Open Questions

1. Which entitlement changes should require a secondary approval before taking effect?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Governance surface becomes too powerful too quickly | Medium | High | Limit write actions, confirm destructive changes, and audit everything |
| Role assignment mistakes create access drift | Medium | High | Validate conflicts and show effective scope before save |
| Users confuse entitlement visibility with live billing controls | Medium | Medium | Clearly label readiness versus active subscription automation |
