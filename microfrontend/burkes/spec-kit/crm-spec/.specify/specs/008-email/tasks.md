# Tasks: CRM Email

**Feature ID**: 008-email
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Status**: Complete
**Created**: 2026-04-13

---

## Overview

This task set defines the Outlook-linked operational email workflow for the CRM.

**Total Tasks**: 6
**Estimated Effort**: M

---

## Dependency Order

```text
TASK-008-01 -> TASK-008-02 -> TASK-008-04
TASK-008-01 -> TASK-008-03 -> TASK-008-05
TASK-008-04 -> TASK-008-06
TASK-008-05 -> TASK-008-06
```

---

## Tasks

### TASK-008-01 - Define CRM email model and provider boundary

**Status**: Complete
**Effort**: M
**Depends on**: 002-contacts, 007-sms
**Blocks**: TASK-008-02, TASK-008-03

**Description**:
Define CRM email records, provider identifiers, and the Outlook-as-system-of-record boundary.

**Acceptance Criteria**:
- [x] Email fields and status values are explicit
- [x] Provider boundary is documented

### TASK-008-02 - Define inbox workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-008-01
**Blocks**: TASK-008-04

**Description**:
Define inbox list behavior, triage state, and contact-linked navigation.

**Acceptance Criteria**:
- [x] Inbox behavior is documented
- [x] Contact-linked actions are included

### TASK-008-03 - Define compose and reply workflows

**Status**: Complete
**Effort**: M
**Depends on**: TASK-008-01
**Blocks**: TASK-008-05

**Description**:
Define compose, reply, forward, and attachment-awareness behavior.

**Acceptance Criteria**:
- [x] Compose and reply actions are explicit
- [x] Attachment-awareness is included

### TASK-008-04 - Define unresolved sender workflow

**Status**: Complete
**Effort**: S
**Depends on**: TASK-008-02
**Blocks**: TASK-008-06

**Description**:
Define how unknown senders are linked to existing or new contacts.

**Acceptance Criteria**:
- [x] Unknown-sender behavior is documented
- [x] Unresolved queue concept is included

### TASK-008-05 - Define activity and notification writing

**Status**: Complete
**Effort**: S
**Depends on**: TASK-008-03
**Blocks**: TASK-008-06

**Description**:
Define CRM activity logging and notification behavior for inbound and outbound email.

**Acceptance Criteria**:
- [x] Activity behavior is explicit
- [x] Notification behavior is included

### TASK-008-06 - Define rollout and degraded states

**Status**: Complete
**Effort**: S
**Depends on**: TASK-008-04, TASK-008-05
**Blocks**: None

**Description**:
Define provider degraded-state handling, metrics, and rollout constraints.

**Acceptance Criteria**:
- [x] Provider degraded behavior is documented
- [x] Metrics and rollout constraints are defined
