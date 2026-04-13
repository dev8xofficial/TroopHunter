# Implementation Plan: CRM Dashboard

**Feature ID**: 001-dashboard
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: M

---

## Summary

Dashboard implementation focuses on aggregation and navigation rather than raw complexity. The work centers on stable summary contracts, list-card rendering, and actionable links into downstream workflows.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| KPI aggregator | Provides counts and deltas | New |
| Pipeline summary block | Provides cross-stage counts and dept breakdown | New |
| Activity digest | Returns recent events for Dashboard display | New |
| Task digest | Returns current operator task slice | New |

---

## Implementation Phases

### Phase 1 - Summary data contracts

**Goal**: Define the payloads for KPI, funnel, activity, schedule, and tasks.
**Dependencies**: 000-foundation complete

#### Tasks

- [ ] Define KPI and pipeline summary contracts
- [ ] Define recent-leads and activity-feed payloads
- [ ] Define schedule, compliance, integrations, and task slices

**Exit Criteria**: All Dashboard cards have stable data shapes.

---

### Phase 2 - Card behavior and navigation

**Goal**: Define how Dashboard cards and rows route into downstream workflows.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define per-card empty and degraded states
- [ ] Define click-through targets for each summary area
- [ ] Define role-aware visibility for admin-heavy panels

**Exit Criteria**: Dashboard actions consistently send operators to the right next surface.

---

### Phase 3 - Validation and observability

**Goal**: Make the Dashboard safe for day-one operational use.

#### Tasks

- [ ] Define loading expectations and latency targets
- [ ] Define degraded integration behavior
- [ ] Define success metrics and alert thresholds

**Exit Criteria**: Dashboard behavior is measurable and testable.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| KPI summary | active_leads, calls_today, transactions, revenue_mtd | Operator headline metrics |
| Pipeline summary | stage counts, department counts | Shared funnel view |
| Dashboard activity digest | type, title, entity_id, department, timestamp | Actionable recent events |

### Data Migrations

No data migrations are required at the spec layer.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Pipeline service | Inbound | Funnel and lead counts | Shared across Dashboard and Pipeline |
| Communications services | Inbound | Calls/compliance summary | Depends on provider availability |
| Outlook calendar | Inbound | Schedule context | Linked, not deeply managed in Phase 1 |
| Integrations registry | Inbound | Health indicators | Future integrations screen deepens this |

---

## Security & Access Control

- Dashboard must respect department-scoped visibility for sensitive cards when required.
- Admin-focused panels may be shown in summary form to non-admin operators if no restricted data is exposed.

---

## Testing Strategy

### Unit Tests

- KPI summary rendering
- Degraded-state handling for individual cards
- Navigation target resolution

### Integration Tests

- Dashboard load with mixed success and failure card responses
- Click-through from recent leads and activity feed

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Priority work visible quickly | Validate operator can identify next action from sample data |
| Direct workflow links | Verify all summary areas route correctly |
| Communication and integration health visible | Simulate provider state changes |
| Useful across roles | Review visibility for owner and admin roles |

---

## Rollout & Observability

- **Feature flag**: Yes - dashboard summaries
- **Rollout strategy**: Internal first with role-based review
- **Key metrics to monitor**: dashboard load time, click-through rate, stale-data frequency, degraded-card rate
- **Rollback plan**: Disable summary cards individually if one data source becomes unstable

---

## Open Questions

1. Should task completion happen directly from the Dashboard in Phase 1 or route to a detail surface?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Dashboard becomes too dense | Medium | Medium | Limit to top-priority summaries |
| Mixed data freshness across cards | Medium | Medium | Surface timestamps and degraded states |
| Operators over-rely on summaries | Low | Medium | Preserve clear navigation to dedicated screens |
