# Tasks: CRM Reports

**Feature ID**: 015-reports
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines KPI reporting, comparison views, communication analytics, and drill-down navigation for CRM reporting.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-015-01 -> TASK-015-02 -> TASK-015-04
TASK-015-01 -> TASK-015-03 -> TASK-015-05
TASK-015-03 -> TASK-015-06
```

---

## Tasks

### TASK-015-01 - Define reporting model and KPI vocabulary

**Status**: Complete
**Effort**: M
**Depends on**: 001-dashboard, 003-pipeline
**Blocks**: TASK-015-02, TASK-015-03

**Description**:
Define report scopes, filters, metric definitions, and freshness semantics.

**Acceptance Criteria**:
- [x] Report model is documented
- [x] KPI vocabulary is explicit

### TASK-015-02 - Define report workspace views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-015-01
**Blocks**: TASK-015-04

**Description**:
Define summary, comparison, and detail-report views plus filter behavior.

**Acceptance Criteria**:
- [x] Workspace views are documented
- [x] Filter behavior is included

### TASK-015-03 - Define drill-down and scoped access workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-015-01
**Blocks**: TASK-015-05, TASK-015-06

**Description**:
Define report drill-down routes and access-scoped visibility across roles.

**Acceptance Criteria**:
- [x] Drill-down behavior is documented
- [x] Access-scoped reporting rules are included

### TASK-015-04 - Define funnel and comparison analytics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-015-02
**Blocks**: None

**Description**:
Define department, stage, and agent comparison outputs for leadership review.

**Acceptance Criteria**:
- [x] Funnel and comparison behavior is documented

### TASK-015-05 - Define communication and campaign analytics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-015-03
**Blocks**: None

**Description**:
Define how call, SMS, email, and campaign outcomes appear in reporting.

**Acceptance Criteria**:
- [x] Communication metric behavior is documented
- [x] Lag and freshness expectations are included

### TASK-015-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-015-03
**Blocks**: None

**Description**:
Define rollout constraints, adoption metrics, and success indicators for reporting.

**Acceptance Criteria**:
- [x] Rollout strategy is documented
- [x] Metrics and risks are included
