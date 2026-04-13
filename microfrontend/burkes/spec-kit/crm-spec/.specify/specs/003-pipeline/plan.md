# Implementation Plan: CRM Pipeline

**Feature ID**: 003-pipeline
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: L

---

## Summary

Pipeline implementation centers on a shared lead model, multiple operational views, and fast action loops for stage updates, transfers, and communication handoffs.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Lead board | Kanban view and stage columns | New |
| Lead list | Table view with sorting and filters | New |
| Forecast summary | Operational rollup and conversion indicators | New |
| Lead drawer | Detail, stage update, transfer, and shortcuts | New |

---

## Implementation Phases

### Phase 1 - Lead model and shared stages

**Goal**: Define lead payloads and stage semantics.
**Dependencies**: 002-contacts complete

#### Tasks

- [ ] Define lead schema and shared stage usage
- [ ] Define owner and priority fields
- [ ] Define stage update expectations

**Exit Criteria**: Lead shape and stage semantics are stable.

---

### Phase 2 - View behaviors

**Goal**: Define kanban, list, and forecast behavior over the same lead model.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define filter and search behavior
- [ ] Define card and row summaries
- [ ] Define forecast rollup structure

**Exit Criteria**: All views are consistent and role-safe.

---

### Phase 3 - Workflow actions

**Goal**: Define transfer, communication shortcuts, and failure handling.

#### Tasks

- [ ] Define lead drawer actions
- [ ] Define transfer notifications and history writing
- [ ] Define stage-update error handling and metrics

**Exit Criteria**: Pipeline supports day-to-day operator action, not just viewing.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Lead | contact_id, department, stage, priority, owner | Shared pipeline record |
| Forecast summary | totals, likely_close, at_risk, conversion_rates | Operational planning summary |
| Transfer event | from_agent, to_agent, department, created_at | Ownership change audit |

### Data Migrations

Legacy CRM data must map source stages into the shared six-stage model or be flagged for manual review.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Contacts | Both | Resolve lead-to-contact linkage | Contacts remain system of record |
| Activity service | Inbound | Show recent lead activity | Stage changes must emit activity |
| Notification service | Outbound | Transfer and stage notifications | Shared shell contract |

---

## Security & Access Control

- Operators may view cross-department lead context but only update allowed departments.
- Transfers must respect destination-role eligibility.
- Stage changes must be auditable.

---

## Testing Strategy

### Unit Tests

- Stage transition validation
- Filter behavior
- Forecast summary calculations

### Integration Tests

- Update stage from board and drawer
- Transfer ownership from pipeline
- Open contact and communication shortcuts from lead detail

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Shared board use | Move work through kanban and list surfaces |
| Connected ownership/actions | Verify shortcuts and transfer behavior |
| Forecast usefulness | Validate summary outputs for admin users |
| Stage model consistency | Compare department-specific context under shared labels |

---

## Rollout & Observability

- **Feature flag**: Yes - pipeline views
- **Rollout strategy**: Internal-only pilot with department owners first
- **Key metrics to monitor**: stage-update success rate, transfer latency, filter usage, forecast-view adoption
- **Rollback plan**: Keep read-only pipeline visible while disabling write actions if stage-change issues occur

---

## Open Questions

1. Should transfer eligibility differ for mortgage liaisons in later phases?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Shared stages feel too generic | Medium | Medium | Use clear department badges and descriptions |
| Forecast misread as final reporting | Medium | Medium | Keep labels operational, not financial-booking language |
| Unauthorized stage edits | Low | High | Enforce access rules centrally |
