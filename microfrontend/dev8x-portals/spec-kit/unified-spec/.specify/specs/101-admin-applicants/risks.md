# Admin Applicants - Risks

> **Module ID**: `101-admin-applicants`
> **Version**: 1.0.0

---

## Risk Register

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Permission drift | High | Validate role mapping against the RBAC contract on every release. |
| Validation gaps | Medium | Keep request schemas aligned with contract changes. |
| Incomplete event payloads | Medium | Reconcile module events with the shared event schema. |

---

## Escalation Triggers

- Contract drift between module artifacts and shared YAML contracts.
- Missing audit events on state-changing operations.
- Any permission result that exceeds the RBAC matrix.