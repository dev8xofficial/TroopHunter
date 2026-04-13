# Tasks: CRM Activities

**Feature ID**: 004-activities
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines the full CRM activity timeline and audit review workspace.

**Total Tasks**: 5
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-004-01 -> TASK-004-02 -> TASK-004-04
TASK-004-01 -> TASK-004-03 -> TASK-004-05
```

---

## Tasks

### TASK-004-01 - Define timeline model

**Status**: Complete
**Effort**: M
**Depends on**: 006-calls, 007-sms, 008-email
**Blocks**: TASK-004-02, TASK-004-03

**Description**:
Define the event list structure, ordering, and contact/global modes.

**Acceptance Criteria**:
- [x] Timeline structure is explicit
- [x] Contact and global scope are documented

### TASK-004-02 - Define filtering and scaling

**Status**: Complete
**Effort**: S
**Depends on**: TASK-004-01
**Blocks**: TASK-004-04

**Description**:
Define filters, date scoping, and large-timeline handling.

**Acceptance Criteria**:
- [x] Filters are documented
- [x] Scaling behavior is explicit

### TASK-004-03 - Define pivot and audit behavior

**Status**: Complete
**Effort**: S
**Depends on**: TASK-004-01
**Blocks**: TASK-004-05

**Description**:
Define linked-entity pivots and compliance metadata presentation.

**Acceptance Criteria**:
- [x] Source pivots are documented
- [x] Audit metadata is included

### TASK-004-04 - Define permission handling

**Status**: Complete
**Effort**: S
**Depends on**: TASK-004-02
**Blocks**: None

**Description**:
Define restricted-content behavior for users without source-feature access.

**Acceptance Criteria**:
- [x] Permission behavior is explicit

### TASK-004-05 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-004-03
**Blocks**: None

**Description**:
Define rollout, observability, and usage-success indicators.

**Acceptance Criteria**:
- [x] Metrics and rollout are documented
