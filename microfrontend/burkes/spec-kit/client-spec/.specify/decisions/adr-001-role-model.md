# ADR-001: Role-Based Access Control Model

**Status**: Accepted (April 2026)
**Decision Date**: January 2026
**Last Modified**: April 2026
**Decision ID**: ADR-001

## Title

We WILL implement role-based access control (RBAC) with 6 canonical roles (CL, AG, LN, AT, CP, TC) instead of a permissions-per-user model.

## Context

The Burkes Group portal involves multiple stakeholders in a single transaction:

- **CL** (Client): The buyer; wants visibility into progress but limited access to team notes
- **AG** (Agent): The real estate agent; needs full read/write on transaction
- **AT** (Attorney): The closing attorney; needs confidential legal notes hidden from client
- **LN** (Lender/Mortgage company): Needs insurance/appraisal/underwriting data but not attorney notes
- **CP** (CPA): Needs tax/financial data but limited operational access
- **TC** (Coordinator\*\*: Administrative team; coordinates document collection and deadlines

Traditional permission-based models (read_documents, write_messages, approve_insurance, etc.) would explode into 50+ unique permissions, making it hard to reason about "what can this user do?"

## Decision

1. Define 6 immutable roles representing the transaction structure
2. Assign permissions at the **role level**, not per-user
3. Each spec defines role-scoped views:
   - Dashboard: Client sees only client-visible activity
   - Messages: Each role sees only messages sent to them
   - Documents: Attorneys can request/review; clients upload
   - Insurance: Agent requests, client approves, lender validates

4. Role **cannot** change mid-transaction (no "promote user to attorney")
5. All role-role communication flows through structured workflows, not free-form access

## Rationale

**Benefits**:

- **Simplicity**: 6 roles × 10 features = 60 access rules (vs 50+ permissions per feature)
- **Auditability**: Every action tagged with role; easy to audit "what did agents do?"
- **Compliance**: Clear role boundaries satisfy regulatory audits (Fannie Mae, FDIC require clear roles)
- **Onboarding**: New team members get role → automatic permissions (no setup per-user)
- **Consistency**: All transactions use same 6 roles (no custom per-org roles)

**Drawbacks**:

- No ad-hoc "give this user extra permission" (would require role change)
- If role definition wrong, all users in that role affected
- Future roles (e.g., "home inspector") require new spec

## Consequences

1. **Implementation**:
   - API middleware must enforce role checks on every request
   - Database queries must filter by user.role
   - Cannot grant permissions outside these 6 roles without architecture change

2. **Maintenance**:
   - If a new stakeholder needed (e.g., insurance appraiser), would need new spec for 7th role
   - All existing code would need role switch logic updated

3. **User Experience**:
   - Users cannot see "across roles" (attorney cannot view agent's notes)
   - Simplifies UX (fewer buttons, focused views per role)
   - But limits flexibility (cannot give client read-only access to attorney notes)

## Alternatives Considered

1. **Permissions-per-user** (rejected): Too granular; audit nightmare; no clear boundaries
2. **Role + custom permissions** (rejected): Adds complexity; defeats purpose of RBAC
3. **Create 20 roles instead of 6** (rejected): Overkill; role proliferation makes maintenance hard

## Validation

✅ Accepted by Product, Legal, and Operations teams
✅ Aligns with Fannie Mae transaction guidelines (agent, attorney, lender all have clear roles)
✅ Current 6 roles handle 100% of transaction workflows (no unmet stakeholder)
✅ All specs define role boundaries (visibility, write access, approval authority)

## When to Revisit

- If new stakeholder type needed (e.g., home inspector, insurance agent) **before Phase 3 GA**
- If we encounter transaction requiring shared role (e.g., 2 attorneys) — may need role expansion
- If user feedback indicates frustration with role rigidity — consider alternatives

---

**See Also**: constitution.md (role definitions), 000-foundation spec (role colours), GOVERNANCE.md (approval authority per role)
