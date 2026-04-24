# MFA - Risks

> **Module ID**: `003-mfa`
> **Version**: 1.0.0

---

## Risk Register

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Identity security regression | High | Protect with rate limits, replay protection, and lockout controls. |
| Role leakage between portals | High | Enforce portal-scoped claims and route validation. |
| Incomplete audit coverage | Medium | Verify every authentication branch emits an event. |

---

## Escalation Triggers

- Contract drift between module artifacts and shared YAML contracts.
- Missing audit events on state-changing operations.
- Any permission result that exceeds the RBAC matrix.