# Tasks: CRM SMS

**Feature ID**: 007-sms
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set defines the CRM-native text messaging workflow for Phase 1.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-007-01 -> TASK-007-02 -> TASK-007-04
TASK-007-01 -> TASK-007-03 -> TASK-007-05
TASK-007-04 -> TASK-007-06
TASK-007-05 -> TASK-007-06
```

---

## Tasks

### TASK-007-01 - Define thread and message model

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts, 006-calls
**Blocks**: TASK-007-02, TASK-007-03

**Description**:
Define thread, message, and ownership fields used by the SMS workspace.

**Acceptance Criteria**:
- [x] Thread and message fields are explicit
- [x] Contact linkage is documented

### TASK-007-02 - Define workspace and unread behavior

**Status**: Complete
**Effort**: S
**Depends on**: TASK-007-01
**Blocks**: TASK-007-04

**Description**:
Define conversation list behavior, unread indicators, and recency cues.

**Acceptance Criteria**:
- [x] Unread state is visible
- [x] Thread summaries are defined

### TASK-007-03 - Define send and receive workflows

**Status**: Complete
**Effort**: M
**Depends on**: TASK-007-01
**Blocks**: TASK-007-05

**Description**:
Define outbound compose and inbound reply handling within the CRM.

**Acceptance Criteria**:
- [x] Send and receive behavior is documented
- [x] Activities and notifications are included

### TASK-007-04 - Define safety and restriction rules

**Status**: Complete
**Effort**: S
**Depends on**: TASK-007-02
**Blocks**: TASK-007-06

**Description**:
Define opt-out, send-blocked, and restricted-role behavior.

**Acceptance Criteria**:
- [x] Safety rules are explicit
- [x] Send-blocked state is enforced

### TASK-007-05 - Define unknown-number resolution

**Status**: Complete
**Effort**: S
**Depends on**: TASK-007-03
**Blocks**: TASK-007-06

**Description**:
Define how unmatched numbers become linked to contacts without losing thread continuity.

**Acceptance Criteria**:
- [x] Unknown-number workflows are documented
- [x] Duplicate-risk handling is called out

### TASK-007-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-007-04, TASK-007-05
**Blocks**: None

**Description**:
Define observability, degraded-state handling, and rollout constraints for SMS.

**Acceptance Criteria**:
- [x] Metrics are defined
- [x] Rollout and degraded-state behavior are documented
