# Tasks: CRM Calendar

**Feature ID**: 005-calendar
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines the CRM scheduling workspace and provider-linked calendar visibility.

**Total Tasks**: 5
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-005-01 -> TASK-005-02 -> TASK-005-04
TASK-005-01 -> TASK-005-03 -> TASK-005-05
```

---

## Tasks

### TASK-005-01 - Define calendar event model

**Status**: Complete
**Effort**: M
**Depends on**: 001-dashboard, 002-contacts
**Blocks**: TASK-005-02, TASK-005-03

**Description**:
Define event payloads, provider markers, and contact/lead linkage.

**Acceptance Criteria**:
- [x] Event fields are explicit
- [x] Provider context is documented

### TASK-005-02 - Define schedule views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-005-01
**Blocks**: TASK-005-04

**Description**:
Define day, week, and month views with clear event presentation rules.

**Acceptance Criteria**:
- [x] View modes are documented
- [x] Event navigation is included

### TASK-005-03 - Define sync and degraded states

**Status**: Complete
**Effort**: S
**Depends on**: TASK-005-01
**Blocks**: TASK-005-05

**Description**:
Define sync-state surfaces, freshness indicators, and provider-failure behavior.

**Acceptance Criteria**:
- [x] Sync-state behavior is explicit
- [x] Degraded states are documented

### TASK-005-04 - Define event actions and pivots

**Status**: Complete
**Effort**: S
**Depends on**: TASK-005-02
**Blocks**: None

**Description**:
Define event open, create, and CRM pivot actions.

**Acceptance Criteria**:
- [x] Event actions are documented
- [x] Contact/lead pivots are included

### TASK-005-05 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-005-03
**Blocks**: None

**Description**:
Define release, monitoring, and success indicators for calendar usage.

**Acceptance Criteria**:
- [x] Metrics and rollout are documented
