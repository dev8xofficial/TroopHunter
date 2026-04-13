# Tasks: CRM Mortgage

**Feature ID**: 012-mortgage
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines the mortgage workspace, loan milestone visibility, missing-data guidance, and Arive sync handling.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-012-01 -> TASK-012-02 -> TASK-012-04
TASK-012-01 -> TASK-012-03 -> TASK-012-05
TASK-012-03 -> TASK-012-06
```

---

## Tasks

### TASK-012-01 - Define mortgage record model

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts, 003-pipeline
**Blocks**: TASK-012-02, TASK-012-03

**Description**:
Define mortgage record fields, milestone states, lender context, and Arive linkage.

**Acceptance Criteria**:
- [x] Mortgage fields and lifecycle stages are documented
- [x] Shared contact linkage is explicit

### TASK-012-02 - Define mortgage workspace views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-012-01
**Blocks**: TASK-012-04

**Description**:
Define mortgage list and board views, filters, and milestone visibility.

**Acceptance Criteria**:
- [x] Mortgage views are documented
- [x] Stage and lender filters are included

### TASK-012-03 - Define blocker and close-readiness workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-012-01
**Blocks**: TASK-012-05, TASK-012-06

**Description**:
Define missing-data, document, and clear-to-close workflow behavior.

**Acceptance Criteria**:
- [x] Missing-item logic is documented
- [x] Close-readiness visibility is included

### TASK-012-04 - Define shared CRM pivots

**Status**: Complete
**Effort**: S
**Depends on**: TASK-012-02
**Blocks**: None

**Description**:
Define pivots from Mortgage into contacts, activities, calls, SMS, and email.

**Acceptance Criteria**:
- [x] Cross-feature pivots are documented

### TASK-012-05 - Define Arive sync visibility

**Status**: Complete
**Effort**: S
**Depends on**: TASK-012-03
**Blocks**: None

**Description**:
Define source identifiers, freshness state, and degraded-sync handling for Arive-linked records.

**Acceptance Criteria**:
- [x] Arive sync-state behavior is documented
- [x] Exception states are included

### TASK-012-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-012-03
**Blocks**: None

**Description**:
Define rollout constraints, metrics, and success indicators for mortgage usage.

**Acceptance Criteria**:
- [x] Rollout strategy is documented
- [x] Metrics and risks are included
