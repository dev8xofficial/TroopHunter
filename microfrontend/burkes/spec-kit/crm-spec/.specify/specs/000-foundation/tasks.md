# Tasks: CRM Foundation

**Feature ID**: 000-foundation
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set delivers the global shell, contracts, and constraints that every CRM surface depends on, including the Phase 2 installable shell behavior.

**Total Tasks**: 7
**Estimated Effort**: L

---

## Dependency Order

```text
TASK-000-01 -> TASK-000-02 -> TASK-000-04
TASK-000-01 -> TASK-000-03 -> TASK-000-05
TASK-000-04 -> TASK-000-06
TASK-000-05 -> TASK-000-06
TASK-000-01 -> TASK-000-07
```

---

## Tasks

### TASK-000-01 - Define operator shell and navigation

**Status**: Complete
**Effort**: M
**Depends on**: None
**Blocks**: TASK-000-02, TASK-000-03

**Description**:
Define the shared shell, navigation groups, top-bar actions, and VOIP status pattern referenced by all Phase 1 features.

**Acceptance Criteria**:
- [x] Navigation groups and quick actions are documented
- [x] Top-bar behavior is explicit
- [x] Shell references align with `layout.yaml`

### TASK-000-02 - Define session and permission context

**Status**: Complete
**Effort**: M
**Depends on**: TASK-000-01
**Blocks**: TASK-000-04

**Description**:
Define the operator session payload, department access semantics, and read-vs-write behavior.

**Acceptance Criteria**:
- [x] Role abbreviations and access expectations are explicit
- [x] Session state fields are documented
- [x] Dependencies on `access_control.yaml` are captured

### TASK-000-03 - Define shared interaction patterns

**Status**: Complete
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: TASK-000-05

**Description**:
Standardize drawer, modal, and confirmation behavior for communications-heavy workflows.

**Acceptance Criteria**:
- [x] Interaction patterns are described in the spec and supporting contracts
- [x] Error and empty-state expectations are documented

### TASK-000-04 - Define activity and notification contracts

**Status**: Complete
**Effort**: M
**Depends on**: TASK-000-02
**Blocks**: TASK-000-06

**Description**:
Publish the append-only activity payload and shell notification requirements used by later features.

**Acceptance Criteria**:
- [x] Activity fields are explicit
- [x] Notification scenarios cover intake, transfer, inbound communication, and integration failures

### TASK-000-05 - Define portal-bridge visibility rules

**Status**: Complete
**Effort**: S
**Depends on**: TASK-000-03
**Blocks**: TASK-000-06

**Description**:
Specify how portal-originated work appears in the CRM shell and how duplicate-safe intake should be surfaced.

**Acceptance Criteria**:
- [x] Portal-origin labeling is documented
- [x] Merge-safe duplicate handling is called out

### TASK-000-06 - Validate downstream readiness

**Status**: Complete
**Effort**: S
**Depends on**: TASK-000-04, TASK-000-05
**Blocks**: None

**Description**:
Confirm that all Phase 1 feature specs can reference the foundation without redefining shell behavior.

**Acceptance Criteria**:
- [x] Feature dependencies are documented
- [x] Shared supporting artifacts exist
- [x] Root contracts are ready to be authored against the spec

### TASK-000-07 - Define PWA installability behavior

**Status**: Complete
**Effort**: S
**Depends on**: TASK-000-01
**Blocks**: None

**Description**:
Define install prompt, installed-session, and offline notice expectations for the supported CRM PWA shell.

**Acceptance Criteria**:
- [x] Install prompt surfaces are documented
- [x] Installed-session behavior is explicit
- [x] Foundation contracts reference mobile installability
