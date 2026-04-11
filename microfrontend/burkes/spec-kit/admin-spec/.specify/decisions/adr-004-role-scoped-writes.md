# ADR-004: Role-Scoped Write Operations

**Status**: Accepted (April 2026)
**Decision ID**: ADR-004

## Title

We WILL enforce role-scoped write operations for all destructive admin actions.

## Context

The Admin Portal serves two administrative personas: System Administrators (ADMIN) and Transaction Coordinators (TC). While both need read access to all platform data, their write permissions must differ to prevent accidental or unauthorised changes. TCs should be able to approve documents and transaction stage updates, but should NOT be able to create/suspend user accounts, manage partner zip code coverage, or override system locks.

## Decision

1. All destructive write operations (create, update, delete, approve, reject, suspend) must check the actor's role before execution
2. Server-side enforcement is mandatory — client-side hiding is convenience only, never security
3. The Admin Portal UI must hide or disable controls that exceed the current actor's role permissions
4. Audit log entries must record the actor's role alongside the action, creating an immutable record of who did what
5. Role escalation (TC attempting ADMIN-only actions) must be logged as a security event

## Role-Permission Matrix

| Action                    | ADMIN | TC  |
|---------------------------|-------|-----|
| View all entities         | ✅    | ✅  |
| Approve documents         | ✅    | ✅  |
| Approve stage updates     | ✅    | ✅  |
| Reject with reason        | ✅    | ✅  |
| Create user accounts      | ✅    | ❌  |
| Suspend user accounts     | ✅    | ❌  |
| Add service partners      | ✅    | ❌  |
| Manage partner zip codes  | ✅    | ❌  |
| Override system locks      | ✅    | ❌  |
| Access system settings    | ✅    | ❌  |
| Generate reports          | ✅    | ✅  |
| Create transactions       | ✅    | ✅  |

## Consequences

- **Positive**: Clear separation of duties reduces risk of accidental destructive actions by TCs.
- **Positive**: Audit trail enables post-incident forensics and compliance reporting.
- **Negative**: Requires role-checking middleware on every write endpoint.
- **Negative**: TC may be blocked when the sole ADMIN is unavailable — escalation procedures needed.

---

**See Also**: ADR-001 (Admin Role Model), constitution.md (P-03 — Role-Gated Operations)
