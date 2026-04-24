# Admin Pipeline - Risks

> **Module ID**: `102-admin-pipeline`
> **Version**: 1.0.0

---

## Risk Register

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Invalid lifecycle skip | High | Block transitions that bypass required stages. |
| Stale decision data | Medium | Add freshness indicators and escalation rules. |
| Manager read access overreach | Medium | Keep managers in read-only or managed scopes only. |

---

## Escalation Triggers

- Contract drift between module artifacts and shared YAML contracts.
- Missing audit events on state-changing operations.
- Any permission result that exceeds the RBAC matrix.