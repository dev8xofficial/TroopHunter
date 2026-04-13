# Tasks: CRM Contacts

**Feature ID**: 002-contacts
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set defines the unified directory, profile, intake, import, and transfer workflows for CRM contacts.

**Total Tasks**: 6
**Estimated Effort**: L

---

## Dependency Order

```text
TASK-002-01 -> TASK-002-02 -> TASK-002-04
TASK-002-01 -> TASK-002-03 -> TASK-002-05
TASK-002-04 -> TASK-002-06
TASK-002-05 -> TASK-002-06
```

---

## Tasks

### TASK-002-01 - Define canonical contact model

**Status**: Complete
**Effort**: M
**Depends on**: 000-foundation
**Blocks**: TASK-002-02, TASK-002-03

**Description**:
Define the contact schema, core sections, and department ownership model.

**Acceptance Criteria**:
- [x] Contact fields are explicit
- [x] Department and ownership structure are defined

### TASK-002-02 - Define directory and filters

**Status**: Complete
**Effort**: S
**Depends on**: TASK-002-01
**Blocks**: TASK-002-04

**Description**:
Define the contact list, search, filters, summary columns, and missing-data state.

**Acceptance Criteria**:
- [x] Search and filter behavior is documented
- [x] Missing-data state is visible

### TASK-002-03 - Define contact profile workflows

**Status**: Complete
**Effort**: M
**Depends on**: TASK-002-01
**Blocks**: TASK-002-05

**Description**:
Define minimal-data creation, enrichment, and source/consent visibility within the contact profile.

**Acceptance Criteria**:
- [x] Minimal-data creation is allowed
- [x] Source and consent fields are visible

### TASK-002-04 - Define transfer and ownership updates

**Status**: Complete
**Effort**: S
**Depends on**: TASK-002-02
**Blocks**: TASK-002-06

**Description**:
Define contact-level transfer actions that update departmental ownership without duplicating contacts.

**Acceptance Criteria**:
- [x] Transfer action is documented
- [x] Ownership change preserves history

### TASK-002-05 - Define import and portal-intake behavior

**Status**: Complete
**Effort**: M
**Depends on**: TASK-002-03
**Blocks**: TASK-002-06

**Description**:
Define how legacy CRM imports and portal-originated contacts enter the unified directory.

**Acceptance Criteria**:
- [x] Import flows are defined
- [x] Portal-origin contact behavior is explicit

### TASK-002-06 - Define integrity and exception handling

**Status**: Complete
**Effort**: S
**Depends on**: TASK-002-04, TASK-002-05
**Blocks**: None

**Description**:
Define duplicate warnings, exception states, and observable success metrics.

**Acceptance Criteria**:
- [x] Duplicate awareness is documented
- [x] Exception states and metrics are defined
