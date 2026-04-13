# Tasks: CRM Insurance

**Feature ID**: 011-insurance
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines the insurance workspace, lifecycle states, renewal visibility, and interim sync context.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-011-01 -> TASK-011-02 -> TASK-011-04
TASK-011-01 -> TASK-011-03 -> TASK-011-05
TASK-011-03 -> TASK-011-06
```

---

## Tasks

### TASK-011-01 - Define insurance record model

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts, 003-pipeline
**Blocks**: TASK-011-02, TASK-011-03

**Description**:
Define insurance record fields, statuses, policy summary, and renewal timing.

**Acceptance Criteria**:
- [x] Insurance fields and lifecycle states are documented
- [x] Shared contact linkage is explicit

### TASK-011-02 - Define insurance workspace views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-011-01
**Blocks**: TASK-011-04

**Description**:
Define insurance list and board views, filters, and key status markers.

**Acceptance Criteria**:
- [x] Workspace views are documented
- [x] Filter and renewal markers are included

### TASK-011-03 - Define quote-readiness and lifecycle workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-011-01
**Blocks**: TASK-011-05, TASK-011-06

**Description**:
Define quote, bind, issue, renewal, and lost-state workflows plus missing-data prompts.

**Acceptance Criteria**:
- [x] Quote-readiness logic is documented
- [x] Lifecycle transitions are included

### TASK-011-04 - Define shared CRM pivots

**Status**: Complete
**Effort**: S
**Depends on**: TASK-011-02
**Blocks**: None

**Description**:
Define pivots from Insurance into contact, activity, calls, SMS, and email workflows.

**Acceptance Criteria**:
- [x] Cross-feature pivots are documented

### TASK-011-05 - Define legacy sync visibility

**Status**: Complete
**Effort**: S
**Depends on**: TASK-011-03
**Blocks**: None

**Description**:
Define how Vertafore or Agency Zoom source context, freshness, and conflicts appear.

**Acceptance Criteria**:
- [x] Legacy sync behavior is documented
- [x] Conflict states are included

### TASK-011-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-011-03
**Blocks**: None

**Description**:
Define rollout constraints, metrics, and success indicators for insurance usage.

**Acceptance Criteria**:
- [x] Rollout strategy is documented
- [x] Metrics and risks are included
