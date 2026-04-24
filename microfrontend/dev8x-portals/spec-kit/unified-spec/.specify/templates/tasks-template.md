# [Module Name] — Tasks

> **Module ID**: `NNN-module-name`
> **Version**: 1.0.0

---

## Task Breakdown

### P0 — Critical Path

- [ ] **T-NNN-01**: [Task Name] — [Brief description] `[Complexity: S/M/L/XL]`
- [ ] **T-NNN-02**: [Task Name] — [Brief description] `[Complexity: S/M/L/XL]`

### P1 — High Priority

- [ ] **T-NNN-03**: [Task Name] — [Brief description] `[Complexity: S/M/L/XL]`

### P2 — Medium Priority

- [ ] **T-NNN-04**: [Task Name] — [Brief description] `[Complexity: S/M/L/XL]`

### P3 — Low Priority

- [ ] **T-NNN-05**: [Task Name] — [Brief description] `[Complexity: S/M/L/XL]`

---

## Dependency Graph

```
T-NNN-01 → T-NNN-02 → T-NNN-03
                     ↘ T-NNN-04
```

---

## Validation Tasks

- [ ] **V-NNN-01**: Verify spec.md coverage — all FRs have implementation tasks
- [ ] **V-NNN-02**: Verify RBAC — all 6 roles tested
- [ ] **V-NNN-03**: Verify state machine — all transitions tested
- [ ] **V-NNN-04**: Verify API contracts — all endpoints tested
- [ ] **V-NNN-05**: Verify validation schema — all fields validated
