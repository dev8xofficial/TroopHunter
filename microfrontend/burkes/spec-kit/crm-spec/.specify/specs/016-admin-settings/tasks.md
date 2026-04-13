# Tasks: CRM Admin Settings

**Feature ID**: 016-admin-settings
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines user administration, role scoping, retention governance, entitlements, and audit protections for Admin Settings.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-016-01 -> TASK-016-02 -> TASK-016-04
TASK-016-01 -> TASK-016-03 -> TASK-016-05
TASK-016-03 -> TASK-016-06
```

---

## Tasks

### TASK-016-01 - Define admin governance model

**Status**: Complete
**Effort**: M
**Depends on**: 000-foundation
**Blocks**: TASK-016-02, TASK-016-03

**Description**:
Define administrative user, role, department-scope, and audit data models.

**Acceptance Criteria**:
- [x] Governance model is documented
- [x] Role and scope semantics are explicit

### TASK-016-02 - Define user and role management views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-016-01
**Blocks**: TASK-016-04

**Description**:
Define user-directory, invite, assignment, and role-editing views.

**Acceptance Criteria**:
- [x] User and role views are documented
- [x] Scope assignment behavior is included

### TASK-016-03 - Define retention and entitlement workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-016-01
**Blocks**: TASK-016-05, TASK-016-06

**Description**:
Define retention-policy updates, entitlement visibility, and safe-change confirmations.

**Acceptance Criteria**:
- [x] Retention workflow is documented
- [x] Entitlement behavior is included

### TASK-016-04 - Define delegated and privileged access rules

**Status**: Complete
**Effort**: S
**Depends on**: TASK-016-02
**Blocks**: None

**Description**:
Define which settings are admin-only and which can be delegated to owners.

**Acceptance Criteria**:
- [x] Privileged and delegated visibility is documented

### TASK-016-05 - Define audit and confirmation behavior

**Status**: Complete
**Effort**: S
**Depends on**: TASK-016-03
**Blocks**: None

**Description**:
Define audit events, confirmation prompts, and change-review expectations for sensitive settings.

**Acceptance Criteria**:
- [x] Audit and confirmation behavior is documented
- [x] Sensitive-change handling is included

### TASK-016-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-016-03
**Blocks**: None

**Description**:
Define rollout constraints, metrics, and success indicators for administrative governance.

**Acceptance Criteria**:
- [x] Rollout strategy is documented
- [x] Metrics and risks are included
