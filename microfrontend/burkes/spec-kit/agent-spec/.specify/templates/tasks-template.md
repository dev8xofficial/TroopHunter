# Tasks: [FEATURE NAME]

**Feature ID**: [NNN-short-name]
**Spec**: [Link to spec.md]
**Plan**: [Link to plan.md]
**Status**: Not Started | In Progress | Complete
**Created**: [YYYY-MM-DD]

---

## Overview

[One sentence on what this task set delivers.]

**Total Tasks**: [N]
**Estimated Effort**: [XS / S / M / L / XL]

---

## Dependency Order

```
[Task-01] ──► [Task-02] ──► [Task-04]
                         ──► [Task-05]
[Task-03] ──► [Task-05]
```

*Tasks with no listed dependencies can begin immediately.*

---

## Tasks

---

### TASK-[NNN]-01 — [Task Name]

**Status**: Not Started | In Progress | Blocked | Complete
**Effort**: [XS / S / M / L]
**Depends on**: None
**Blocks**: [TASK-NNN-02, ...]

**Description**:
[Clear, implementation-level description of what must be done. Written for a developer. May reference spec section FR-XX-YY.]

**Acceptance Criteria**:
- [ ] [Specific, verifiable condition that must be true when this task is done]
- [ ] [Condition]
- [ ] [Condition]

**Notes**:
[Any implementation hints, constraints, or context that will save the developer time.]

---

### TASK-[NNN]-02 — [Task Name]

**Status**: Not Started
**Effort**: [XS / S / M / L]
**Depends on**: TASK-[NNN]-01
**Blocks**: [TASK-NNN-03]

**Description**:
[Description]

**Acceptance Criteria**:
- [ ] [Condition]
- [ ] [Condition]

**Notes**:
[Notes]

---

### TASK-[NNN]-03 — [Task Name]

**Status**: Not Started
**Effort**: [XS / S / M / L]
**Depends on**: TASK-[NNN]-02
**Blocks**: None

**Description**:
[Description]

**Acceptance Criteria**:
- [ ] [Condition]
- [ ] [Condition]

---

## Completion Checklist

- [ ] All tasks marked Complete
- [ ] All acceptance criteria verified
- [ ] Spec success criteria met (see [spec.md](./spec.md))
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Deployed to staging
- [ ] Product sign-off received
