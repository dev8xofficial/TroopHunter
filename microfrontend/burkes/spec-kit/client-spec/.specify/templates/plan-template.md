# Implementation Plan: [FEATURE NAME]

**Feature ID**: [NNN-short-name]
**Spec**: [Link to spec.md]
**Status**: Draft | In Review | Approved
**Created**: [YYYY-MM-DD]
**Estimated Effort**: [XS / S / M / L / XL]

---

## Summary

[2–3 sentences describing the implementation approach at a high level. Technology-aware but not code-level.]

---

## Architecture Overview

[Describe the major components, layers, or services involved. A diagram reference can go here.]

### Components

| Component | Responsibility | New / Modified / Existing |
|-----------|---------------|--------------------------|
| [Name] | [What it does] | New |
| [Name] | [What it does] | Modified |

---

## Implementation Phases

### Phase 1 — [Name]

**Goal**: [What this phase delivers]
**Dependencies**: [What must exist before this phase starts]

#### Tasks

- [ ] [Task description]
- [ ] [Task description]
- [ ] [Task description]

**Exit Criteria**: [How do we know Phase 1 is done?]

---

### Phase 2 — [Name]

**Goal**: [What this phase delivers]
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] [Task description]
- [ ] [Task description]

**Exit Criteria**: [How do we know Phase 2 is done?]

---

### Phase 3 — [Name] *(if applicable)*

**Goal**: [What this phase delivers]

#### Tasks

- [ ] [Task description]

**Exit Criteria**: [How do we know Phase 3 is done?]

---

## Data Design

### New Data Structures

[Describe any new tables, collections, or data shapes. No SQL or code — describe intent.]

| Entity | Key Fields | Purpose |
|--------|-----------|---------|
| [Name] | field1, field2 | [Why it exists] |

### Data Migrations

[List any existing data that needs to be transformed or migrated.]

---

## Integration Points

| System | Direction | Purpose | Notes |
|--------|-----------|---------|-------|
| [System name] | Inbound / Outbound / Both | [Why] | [Constraints or caveats] |

---

## Security & Access Control

- [Access rule 1]
- [Access rule 2]
- [Data sensitivity notes]

---

## Testing Strategy

### Unit Tests

[What logic must have isolated tests?]

### Integration Tests

[What end-to-end flows must be covered?]

### Acceptance Tests (from Spec)

Map each Success Criterion from the spec to a verifiable test:

| Success Criterion | Test Approach |
|-------------------|--------------|
| [Criterion from spec] | [How to verify] |

---

## Rollout & Observability

- **Feature flag**: [Yes / No — name if yes]
- **Rollout strategy**: [Full release / Percentage rollout / Internal first]
- **Key metrics to monitor**: [List 2–4 metrics]
- **Rollback plan**: [How to revert if issues arise]

---

## Open Questions

1. [Any unresolved technical question blocking implementation decisions]

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| [Risk description] | Low / Med / High | Low / Med / High | [How to address] |
