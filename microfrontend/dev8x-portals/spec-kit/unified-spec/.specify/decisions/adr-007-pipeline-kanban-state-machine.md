# ADR-007: Pipeline Kanban State Machine

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect, HR Domain Owner, Sales Domain Owner

---

## Context

Two domains use kanban-style pipeline boards with similar but distinct semantics:

**HR Admin Pipeline** (Module 102):
- 5 stages: Applied → Shortlisted → Interview → Selected → Joined
- Exit states: Rejected (from any stage), Future Hire (from any non-terminal stage)
- Cards represent applicants with urgency indicators

**CRM Deal Pipeline** (Module 402):
- 5 stages: New Lead → Contacted → Meeting Set → Proposal → Won
- Exit state: Lost (from any stage)
- Cards represent deals with stale indicators (warning at 7 days, critical at 14 days)

Both use similar card-based UI patterns but have fundamentally different business rules, invariants, and event definitions.

---

## Decision

Define **two separate state machines** in `contracts/interactions.yaml` with shared structural conventions but domain-specific rules:

### Shared Conventions

1. Both use a **linear primary path** with exit transitions from any non-terminal state
2. Both emit domain-scoped events on every transition
3. Both enforce RBAC guards on transitions
4. Both track **time-in-stage** (days) for operational metrics
5. Both define **invariants** preventing backward movement and re-entry to terminal states

### Domain-Specific Rules

| Aspect | HR Applicant | CRM Deal |
|--------|-------------|----------|
| Primary path | Applied → Shortlisted → Interview → Selected → Joined | New Lead → Contacted → Meeting Set → Proposal → Won |
| Exit states | Rejected, Future Hire | Lost |
| Stage skipping | Prohibited (INV-APPL-01) | Prohibited |
| Re-entry | Rejected is terminal; Future Hire is terminal | Won/Lost are terminal |
| Stale indicators | Not defined | Warning (7d), Critical (14d) |
| Guard conditions | Status-based (e.g., "all docs signed" for join) | Value-based (e.g., "deal value confirmed" for win) |

---

## Consequences

### Positive

- **Pattern reuse**: Both pipelines follow a predictable "linear path + terminal exits" pattern
- **Domain integrity**: HR and CRM rules don't bleed into each other
- **Auditable**: Every stage transition emits a domain-scoped event
- **Measurable**: Time-in-stage enables conversion rate and velocity metrics

### Negative

- **No shared pipeline abstraction**: A generic "Pipeline" component would need domain-specific configuration
- **Duplication**: The structural pattern (linear + exits) is repeated, not abstracted

---

## Alternatives Considered

### Alternative 1: Generic Pipeline State Machine

**Description**: Define one abstract pipeline state machine parameterized by domain.
**Rejected Because**: The invariants, guards, and side effects are too different. An abstraction layer would add complexity without reducing spec content.

---

## References

- [102-admin-pipeline](../specs/102-admin-pipeline/spec.md)
- [402-crm-pipeline](../specs/402-crm-pipeline/spec.md)
- [contracts/interactions.yaml](../../contracts/interactions.yaml) — Applicant and Deal state machines
