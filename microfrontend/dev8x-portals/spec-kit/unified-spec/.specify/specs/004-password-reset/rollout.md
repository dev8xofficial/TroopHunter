# Password Reset - Rollout

> **Module ID**: `004-password-reset`
> **Version**: 1.0.0

---

## Rollout Stages

| Stage | Goal | Exit Criteria |
| --- | --- | --- |
| Phase 1 | Contract readiness | Validate 4 schemas, permissions, and event payloads in non-production review. |
| Phase 2 | Pilot release | Enable password reset for a limited audience with event and error monitoring. |
| Phase 3 | General availability | Promote to all intended roles after lifecycle, permissions, and audit checks pass. |

---

## Rollback Criteria

- Repeated validation failures on required payloads.
- Unauthorized access beyond the matrix defined in rbac-matrix.md.
- Missing or malformed append-only audit events.