# Tasks: CRM Dashboard

**Feature ID**: 001-dashboard
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set defines the command-center experience for the CRM landing screen.

**Total Tasks**: 5
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-001-01 -> TASK-001-02 -> TASK-001-04
TASK-001-01 -> TASK-001-03 -> TASK-001-05
```

---

## Tasks

### TASK-001-01 - Define dashboard summary model

**Status**: Complete
**Effort**: M
**Depends on**: 000-foundation
**Blocks**: TASK-001-02, TASK-001-03

**Description**:
Document the KPI, pipeline, activity, schedule, integration, and task contracts that populate the Dashboard.

**Acceptance Criteria**:
- [x] Dashboard data groups are explicit
- [x] Cross-department summaries are defined

### TASK-001-02 - Define KPI and funnel behavior

**Status**: Complete
**Effort**: S
**Depends on**: TASK-001-01
**Blocks**: TASK-001-04

**Description**:
Describe KPI cards and shared pipeline-funnel behavior, including role-agnostic usefulness and degraded states.

**Acceptance Criteria**:
- [x] KPI cards are defined
- [x] Pipeline funnel behavior is defined

### TASK-001-03 - Define list-card summaries

**Status**: Complete
**Effort**: S
**Depends on**: TASK-001-01
**Blocks**: TASK-001-05

**Description**:
Define recent leads, activity feed, schedule, integrations, and tasks as condensed summary surfaces with next-step navigation.

**Acceptance Criteria**:
- [x] Summary cards route to next workflows
- [x] Empty and degraded states are documented

### TASK-001-04 - Define compliance and communication visibility

**Status**: Complete
**Effort**: S
**Depends on**: TASK-001-02
**Blocks**: None

**Description**:
Specify the Calls & Compliance card so operators can spot communication risk from the landing screen.

**Acceptance Criteria**:
- [x] Compliance summary fields are explicit
- [x] Retention reminders are surfaced

### TASK-001-05 - Validate operational usefulness

**Status**: Complete
**Effort**: S
**Depends on**: TASK-001-03
**Blocks**: None

**Description**:
Confirm the Dashboard remains action-oriented rather than becoming a passive report.

**Acceptance Criteria**:
- [x] Success criteria emphasize actionability
- [x] Task and navigation outcomes are measurable
