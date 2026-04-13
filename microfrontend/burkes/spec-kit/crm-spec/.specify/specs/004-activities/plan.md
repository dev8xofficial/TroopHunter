# Implementation Plan: CRM Activities

**Feature ID**: 004-activities
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Activities turns the Phase 1 activity contract into a complete operational timeline with filtering, contact scoping, and audit-oriented pivots.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Global timeline view | Full event stream across the CRM | New |
| Contact timeline view | Timeline scoped to one customer | New |
| Filter/query layer | Date, actor, type, department, contact filtering | New |
| Event pivot links | Open linked workflow or entity | New |

---

## Implementation Phases

### Phase 1 - Timeline model and query behavior

**Goal**: Define event list structure and filtering semantics.
**Dependencies**: Phase 1 activity-producing features complete

#### Tasks

- [ ] Define timeline row schema and sorting
- [ ] Define filter controls and date scoping
- [ ] Define pagination or incremental loading

**Exit Criteria**: Large timelines are queryable and understandable.

---

### Phase 2 - Audit and pivot behavior

**Goal**: Make the timeline actionable and audit-friendly.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define linked-entity pivots
- [ ] Define compliance metadata rendering
- [ ] Define restricted-content visibility rules

**Exit Criteria**: Activities is useful for both operational continuity and audit review.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Activity timeline item | id, type, actor, contact, department, occurred_at | Full event presentation |
| Activity query | filters, sort, page | Timeline retrieval and scaling |

### Data Migrations

No separate migration is required; the screen consumes existing activity events.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Activity service | Inbound | Full event retrieval | Builds on Phase 1 contract |
| Contacts | Both | Contact scoping and pivots | Customer timeline entry point |
| Calls, SMS, Email, Pipeline | Both | Linked workflow pivots | Read-only relationship from Activities |

---

## Security & Access Control

- Activity visibility follows role and department rules.
- Restricted playback or protected fields must remain governed by source-feature permissions.

---

## Testing Strategy

### Unit Tests

- Filter serialization and query building
- Activity sort ordering
- Restricted-content rendering

### Integration Tests

- Open contact-scoped timeline
- Filter by date/type/department
- Pivot from event row into source workflow

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| One-screen history review | Validate full contact timeline review from Activities |
| Reduced cross-feature hopping | Verify pivots cover source workflows |
| Scale and readability | Load large event sets and ensure narrowing works |

---

## Rollout & Observability

- **Feature flag**: Yes - full activity timeline
- **Rollout strategy**: Internal rollout after event producers are stable
- **Key metrics to monitor**: query latency, filter usage, empty-result rate, pivot success rate
- **Rollback plan**: Fall back to contact-scoped timeline only if global timeline performance is poor

---

## Open Questions

1. Should administrators be able to export filtered timelines in Phase 2 or wait for Reports?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Timeline volume hurts usability | Medium | Medium | Strong filters and pagination |
| Users misread audit data without context | Medium | Medium | Include source and pivot details on each item |
