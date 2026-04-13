# Tasks: CRM Real Estate

**Feature ID**: 013-real-estate
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines the real estate workspace, property-aware transaction views, closing risk visibility, and external-link readiness.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-013-01 -> TASK-013-02 -> TASK-013-04
TASK-013-01 -> TASK-013-03 -> TASK-013-05
TASK-013-03 -> TASK-013-06
```

---

## Tasks

### TASK-013-01 - Define real estate transaction model

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts, 003-pipeline
**Blocks**: TASK-013-02, TASK-013-03

**Description**:
Define real estate transaction fields, property context, and stage states.

**Acceptance Criteria**:
- [x] Transaction fields and lifecycle states are documented
- [x] Shared contact linkage is explicit

### TASK-013-02 - Define real estate workspace views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-013-01
**Blocks**: TASK-013-04

**Description**:
Define list and board views, filters, and closing-window visibility.

**Acceptance Criteria**:
- [x] Workspace views are documented
- [x] Closing and agent filters are included

### TASK-013-03 - Define closing-readiness and risk workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-013-01
**Blocks**: TASK-013-05, TASK-013-06

**Description**:
Define milestone tracking, risk flags, and next-action visibility for deals.

**Acceptance Criteria**:
- [x] Milestone and risk behavior are documented
- [x] Closing-readiness logic is included

### TASK-013-04 - Define shared CRM pivots

**Status**: Complete
**Effort**: S
**Depends on**: TASK-013-02
**Blocks**: None

**Description**:
Define pivots from Real Estate into contacts, calendar, activities, calls, SMS, and email.

**Acceptance Criteria**:
- [x] Cross-feature pivots are documented

### TASK-013-05 - Define external-link visibility

**Status**: Complete
**Effort**: S
**Depends on**: TASK-013-03
**Blocks**: None

**Description**:
Define HAR-linked context and DotLoop-ready link states for transaction records.

**Acceptance Criteria**:
- [x] External-link behavior is documented
- [x] Missing-link states are included

### TASK-013-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-013-03
**Blocks**: None

**Description**:
Define rollout constraints, metrics, and success indicators for real estate usage.

**Acceptance Criteria**:
- [x] Rollout strategy is documented
- [x] Metrics and risks are included
