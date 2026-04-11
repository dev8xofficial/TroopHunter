# ADR-005: Technology-Agnostic Specifications

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-005

## Title

We WILL keep all feature specifications technology-agnostic, describing only what the system does and why, never how it is implemented.

## Context

The Burkes Group's multi-portal ecosystem may evolve its technology stack over time. Tying specifications to specific frameworks, APIs, or databases would require spec rewrites whenever the stack changes.

## Decision

1. No framework names (React, Next.js, Vue, Angular) in spec files.
2. No API specification details (REST, GraphQL, endpoint paths) in spec files.
3. No database technologies (PostgreSQL, MongoDB, Redis) in spec files.
4. No code patterns (hooks, middleware, services) in spec files.
5. Implementation details belong in `plan.md` and `tasks.md` files, generated from specs.

## Rationale

- **Longevity**: Specs outlive any individual technology choice.
- **Clarity**: Product and business stakeholders can review specs without technical translation.
- **Flexibility**: Development teams can choose the best tools without spec conflicts.
- **Consistency**: All portals (Agent, Service Partner, Client, Admin) share the same spec methodology.

## Consequences

1. Developers must reference `plan.md` for implementation guidance, not `spec.md`.
2. Technology decisions are recorded in ADRs, not in feature specs.

---

**See Also**: constitution.md (Section 2 — P-06), STANDARDS.md (Section 2)
