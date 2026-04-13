# Tasks: CRM Pipeline

**Feature ID**: 003-pipeline
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set defines the shared lead workflow surfaces for the CRM.

**Total Tasks**: 6
**Estimated Effort**: L

---

## Dependency Order

```text
TASK-003-01 -> TASK-003-02 -> TASK-003-04
TASK-003-01 -> TASK-003-03 -> TASK-003-05
TASK-003-04 -> TASK-003-06
TASK-003-05 -> TASK-003-06
```

---

## Tasks

### TASK-003-01 - Define shared lead model

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts
**Blocks**: TASK-003-02, TASK-003-03

**Description**:
Define the lead schema, six shared stages, ownership, and priority fields.

**Acceptance Criteria**:
- [x] Shared stage model is explicit
- [x] Ownership and priority are defined

### TASK-003-02 - Define kanban and list views

**Status**: Complete
**Effort**: M
**Depends on**: TASK-003-01
**Blocks**: TASK-003-04

**Description**:
Define card and row summaries, filters, search, and view switching.

**Acceptance Criteria**:
- [x] Kanban and list behavior are defined
- [x] Filters are documented

### TASK-003-03 - Define forecast view

**Status**: Complete
**Effort**: S
**Depends on**: TASK-003-01
**Blocks**: TASK-003-05

**Description**:
Define the operational forecast summary and conversion indicators.

**Acceptance Criteria**:
- [x] Forecast summary fields are explicit
- [x] Forecast remains operational rather than analytical

### TASK-003-04 - Define lead drawer workflows

**Status**: Complete
**Effort**: M
**Depends on**: TASK-003-02
**Blocks**: TASK-003-06

**Description**:
Define stage updates, notes, contact open, and communication shortcuts from lead detail.

**Acceptance Criteria**:
- [x] Drawer actions are documented
- [x] Communication shortcuts are included

### TASK-003-05 - Define transfer and notification behavior

**Status**: Complete
**Effort**: S
**Depends on**: TASK-003-03
**Blocks**: TASK-003-06

**Description**:
Define transfer behavior, notification writing, and history preservation.

**Acceptance Criteria**:
- [x] Transfer workflow is explicit
- [x] History and notifications are preserved

### TASK-003-06 - Define validation and degraded states

**Status**: Complete
**Effort**: S
**Depends on**: TASK-003-04, TASK-003-05
**Blocks**: None

**Description**:
Define failure handling, empty states, and success metrics for the pipeline feature.

**Acceptance Criteria**:
- [x] Error and empty states are documented
- [x] Metrics and risks are defined
