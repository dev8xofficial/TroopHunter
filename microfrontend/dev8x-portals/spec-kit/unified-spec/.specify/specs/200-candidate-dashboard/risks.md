# Candidate Dashboard - Risks

> **Module ID**: `200-candidate-dashboard`
> **Version**: 1.0.0

---

## Risk Register

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Stale insights | Medium | Publish snapshot timestamps and refresh jobs. |
| Calculation drift | High | Centralize formula definitions and regression tests. |
| Cross-account leakage | High | Filter aggregates by the current account or book of business. |

---

## Escalation Triggers

- Contract drift between module artifacts and shared YAML contracts.
- Missing audit events on state-changing operations.
- Any permission result that exceeds the RBAC matrix.