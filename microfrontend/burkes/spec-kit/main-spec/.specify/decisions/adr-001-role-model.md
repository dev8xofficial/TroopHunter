# ADR-001: Agent-Centric Role-Based Access Control

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-001

## Title

We WILL implement role-based access control (RBAC) with the Agent (AG) as the primary portal user, scoped to their own transactions, with Transaction Coordinator (TC) as the admin role.

## Context

The Agent Portal serves a single primary user type — real estate agents — but interacts with multiple professional roles through shared transaction data. Key considerations:

- **AG (Agent)**: Manages their own transactions, clients, documents. This is the primary persona.
- **TC (Transaction Coordinator)**: Admin role; approves stage updates; accesses all transactions.
- **CL (Client)**: Has their own portal (Client Portal); data flows indirectly.
- **LN, AT, CP**: Linked to specific transactions; interact through documents and messages.

The portal must scope data tightly to the authenticated agent's transactions while enabling admin oversight.

## Decision

1. The Agent Portal is scoped to role AG as the primary user
2. TC has elevated access (all transactions, approval authority)
3. Agents see only their own transactions, clients, and messages
4. Stage updates from agents require TC approval before being applied
5. All six canonical roles (AG, TC, CL, LN, AT, CP) are referenced in specs for cross-role interactions

## Rationale

- **Simplicity**: One primary user type simplifies the UI and reduces permission complexity
- **Data Integrity**: Stage update approvals prevent accidental or premature lifecycle changes
- **Auditability**: Every state change is attributable to a specific role
- **Compliance**: Clear role boundaries satisfy regulatory audit requirements

## Consequences

1. Portal UI is optimised for AG workflows; TC admin features are a separate future spec
2. Stage updates have a two-step flow (submit → approve), adding latency but improving accuracy
3. Cross-role communication (agent ↔ attorney) goes through the Messages screen, not direct data access

## When to Revisit

- If TC needs a dedicated admin portal (spec 010)
- If multi-agent collaboration on a single transaction is required
- If role hierarchy changes (e.g., senior agent can approve stage updates)

---

**See Also**: constitution.md (Section 3 — Actors & Permission Matrix), 000-foundation spec
