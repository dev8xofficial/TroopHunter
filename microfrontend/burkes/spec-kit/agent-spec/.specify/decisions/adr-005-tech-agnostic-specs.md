# ADR-005: Technology-Agnostic Specifications

**Status**: Accepted (April 2026)
**Decision ID**: ADR-005

## Title

We WILL keep all specifications technology-agnostic, per constitutional Principle P-06.

## Context

Specifications should outlive implementation choices. The portal may be built in React today and migrated to another framework tomorrow. Specs that reference implementation details become stale and misleading.

## Decision

1. No framework names (React, Next.js, Vue, Angular) in any spec.md
2. No API names (REST, GraphQL, gRPC) in any spec.md
3. No database technologies (PostgreSQL, MongoDB, Redis) in any spec.md
4. No code patterns (hooks, middleware, reducers) in any spec.md
5. Implementation guidance goes in `plan.md` and `tasks.md` (generated artifacts), not in specs
6. CI workflow checks for implementation-specific terms and warns on detection

## Rationale

- Specs define *what* and *why*; plans define *how*
- Decoupling specs from implementation allows reuse across different tech stacks
- New team members focus on business requirements, not legacy tech choices

## Consequences

- Spec reviews must actively reject implementation language
- `plan.md` and `tasks.md` become the bridge between specs and code
- Developers may initially find specs "too abstract" — plan.md fills the gap

---

**See Also**: constitution.md (P-06 — Technology-Agnostic Specification)
