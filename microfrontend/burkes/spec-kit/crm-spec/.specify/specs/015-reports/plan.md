# Implementation Plan: CRM Reports

**Feature ID**: 015-reports
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Reports implementation defines the CRM's analytical workspace for performance review, conversion analysis, and drill-down navigation across departments and agents.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Reports shell | Filter bar, summary modules, and drill-down navigation | New |
| KPI summary modules | Revenue, conversion, throughput, and communication metrics | New |
| Comparison panels | Department and agent comparisons | New |
| Drill-down bridge | Open underlying CRM workflows from report output | New |

---

## Implementation Phases

### Phase 1 - Report model and base KPI views

**Goal**: Define report filters, metrics, and summary views.
**Dependencies**: Dashboard, Pipeline, and Activities complete

#### Tasks

- [ ] Define report scopes and filter dimensions
- [ ] Define KPI summary modules and freshness semantics
- [ ] Define data availability behavior for sparse metrics

**Exit Criteria**: Report model and baseline KPIs are stable.

---

### Phase 2 - Department comparisons and drill-downs

**Goal**: Turn analytics into actionable operational insight.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define department and agent comparison views
- [ ] Define funnel and stage analysis expectations
- [ ] Define drill-down routes into CRM workflows

**Exit Criteria**: Users can move from trend to action without leaving the CRM.

---

### Phase 3 - Communication and campaign analytics

**Goal**: Bring communication and outreach effectiveness into reporting.
**Dependencies**: Phase 2 complete

#### Tasks

- [ ] Define call, SMS, email, and campaign metric surfaces
- [ ] Define lag or freshness behavior for analytics fed by other features
- [ ] Define observability and adoption expectations

**Exit Criteria**: Reporting covers both operational throughput and communication effectiveness.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Report definition | scope, filters, metrics, generated_at | Shared reporting query model |
| Metric block | metric_id, value, delta, freshness | KPI summary rendering |
| Drill-down mapping | metric_id, target_route, filter_payload | Actionable navigation from analytics |

### Data Migrations

No separate migration is required, but implementation must reconcile metric definitions across operational modules to avoid inconsistent reporting.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Dashboard | Inbound | Reuse KPI vocabulary and summary expectations | Snapshot-oriented |
| Pipeline | Inbound | Stage and conversion analytics | Cross-department and scoped |
| Activities | Inbound | Throughput and follow-up indicators | Audit-backed |
| Email Blast | Inbound | Campaign performance metrics | Summary-level in Phase 2 |
| Department workspaces | Inbound | Insurance, mortgage, and real estate outcomes | Department-specific overlays |

---

## Security & Access Control

- Reports must inherit role and department access controls rather than bypassing them.
- Cross-department comparison is restricted to authorized owner and admin roles.
- Drill-downs must preserve the same scope as the source metric.

---

## Testing Strategy

### Unit Tests

- Filter-state derivation
- KPI freshness rendering
- Drill-down target generation

### Integration Tests

- Compare departments over a shared date range
- Drill into a funnel metric and open underlying records
- Restrict unauthorized cross-department report access

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Answer leadership questions in CRM | Run department-performance review workflow |
| Trace metrics to source operations | Validate drill-down navigation from multiple KPIs |
| Preserve role boundaries | Verify scoped and blocked report views by role |

---

## Rollout & Observability

- **Feature flag**: Yes - reports workspace
- **Rollout strategy**: Owner and admin launch first, then scoped agent views where approved
- **Key metrics to monitor**: report load time, drill-down usage rate, freshness lag, report adoption by role
- **Rollback plan**: Reduce to summary-only reporting if drill-down behavior or metric consistency becomes unstable

---

## Open Questions

1. Which metrics require daily refresh and which are acceptable as near-real-time or lagged aggregates?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Metric definitions drift across teams | Medium | High | Centralize KPI vocabulary and source mappings |
| Users over-trust sparse or lagged data | Medium | Medium | Show freshness and availability markers explicitly |
| Reports become too broad too early | Medium | Medium | Prioritize a focused KPI set with drill-downs over report sprawl |
