# Tasks: CRM Calls

**Feature ID**: 006-calls
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set defines the CRM-native calling workflow, recording model, and compliance-aware call log.

**Total Tasks**: 6
**Estimated Effort**: L

---

## Dependency Order

```text
TASK-006-01 -> TASK-006-02 -> TASK-006-04
TASK-006-01 -> TASK-006-03 -> TASK-006-05
TASK-006-04 -> TASK-006-06
TASK-006-05 -> TASK-006-06
```

---

## Tasks

### TASK-006-01 - Define call session model

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts, 003-pipeline
**Blocks**: TASK-006-02, TASK-006-03

**Description**:
Define call session fields, direction, contact linkage, and log expectations.

**Acceptance Criteria**:
- [x] Call session fields are explicit
- [x] Log behavior is defined

### TASK-006-02 - Define dialer and active-call workflow

**Status**: Complete
**Effort**: M
**Depends on**: TASK-006-01
**Blocks**: TASK-006-04

**Description**:
Define how operators place and manage calls from the CRM.

**Acceptance Criteria**:
- [x] Dialer behavior is documented
- [x] Contact-linked calling is supported

### TASK-006-03 - Define recording and retention model

**Status**: Complete
**Effort**: M
**Depends on**: TASK-006-01
**Blocks**: TASK-006-05

**Description**:
Define recording visibility, playback references, and expiration metadata.

**Acceptance Criteria**:
- [x] Recording fields are explicit
- [x] Retention behavior is documented

### TASK-006-04 - Define post-call workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-006-02
**Blocks**: TASK-006-06

**Description**:
Define notes, disposition, and follow-up behavior after a call ends.

**Acceptance Criteria**:
- [x] Post-call outcomes are captured
- [x] Activity writing is included

### TASK-006-05 - Define unknown-number and degraded-state handling

**Status**: Complete
**Effort**: S
**Depends on**: TASK-006-03
**Blocks**: TASK-006-06

**Description**:
Define inbound unmatched call handling and provider-failure behavior.

**Acceptance Criteria**:
- [x] Unknown-number resolution is documented
- [x] Degraded provider states are explicit

### TASK-006-06 - Define validation and observability

**Status**: Complete
**Effort**: S
**Depends on**: TASK-006-04, TASK-006-05
**Blocks**: None

**Description**:
Define metrics, risks, and rollout constraints for the calling workflow.

**Acceptance Criteria**:
- [x] Operational metrics are defined
- [x] Compliance risks are documented
