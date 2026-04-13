# Tasks: CRM Integrations

**Feature ID**: 014-integrations
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-14

---

## Overview

This task set defines the connector registry, dependency mapping, remediation flows, and audit visibility for integrations.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-014-01 -> TASK-014-02 -> TASK-014-04
TASK-014-01 -> TASK-014-03 -> TASK-014-05
TASK-014-03 -> TASK-014-06
```

---

## Tasks

### TASK-014-01 - Define connector registry model

**Status**: Complete
**Effort**: M
**Depends on**: 000-foundation
**Blocks**: TASK-014-02, TASK-014-03

**Description**:
Define connector inventory fields, status states, ownership, and affected-feature mapping.

**Acceptance Criteria**:
- [x] Connector registry fields are documented
- [x] Status vocabulary is explicit

### TASK-014-02 - Define integration inventory views

**Status**: Complete
**Effort**: S
**Depends on**: TASK-014-01
**Blocks**: TASK-014-04

**Description**:
Define list, detail, and filtering views for connectors and their dependencies.

**Acceptance Criteria**:
- [x] Inventory and detail views are documented
- [x] Priority and status filters are included

### TASK-014-03 - Define remediation and privileged access workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-014-01
**Blocks**: TASK-014-05, TASK-014-06

**Description**:
Define test, retry, reconnect, and privilege-gated action behavior.

**Acceptance Criteria**:
- [x] Supported action behavior is documented
- [x] Privileged visibility rules are included

### TASK-014-04 - Define dependency and impact mapping

**Status**: Complete
**Effort**: S
**Depends on**: TASK-014-02
**Blocks**: None

**Description**:
Define how affected screens and workflows are surfaced from each connector.

**Acceptance Criteria**:
- [x] Impact mapping is documented

### TASK-014-05 - Define alert and audit visibility

**Status**: Complete
**Effort**: S
**Depends on**: TASK-014-03
**Blocks**: None

**Description**:
Define failure, recovery, and reconnect event visibility in activity and audit surfaces.

**Acceptance Criteria**:
- [x] Audit and alert behavior is documented
- [x] Failure and recovery visibility is included

### TASK-014-06 - Define rollout and metrics

**Status**: Complete
**Effort**: S
**Depends on**: TASK-014-03
**Blocks**: None

**Description**:
Define rollout constraints, metrics, and success indicators for integration management.

**Acceptance Criteria**:
- [x] Rollout strategy is documented
- [x] Metrics and risks are included
