# Implementation Plan: CRM Real Estate

**Feature ID**: 013-real-estate
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Real Estate implementation defines a department workspace for property-aware deal tracking, closing visibility, and external contract-readiness without abandoning the shared CRM customer model.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Real estate workspace shell | Deal queue and stage views | New |
| Property detail panel | Show property, party, and commission context | New |
| Closing milestone tracker | Highlight pending-close readiness | New |
| External link ribbon | Show HAR and DotLoop linkage state | New |

---

## Implementation Phases

### Phase 1 - Transaction model and workspace views

**Goal**: Define transaction records and deal-oriented views.
**Dependencies**: Contacts, Pipeline, and Calendar complete

#### Tasks

- [ ] Define transaction fields and stage states
- [ ] Define list and board views for active deals
- [ ] Define filters for agent, closing window, and status

**Exit Criteria**: Real estate transaction models and views are stable.

---

### Phase 2 - Closing workflow and risk visibility

**Goal**: Define how operators see progress, risk, and next actions.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define milestone and closing-date behavior
- [ ] Define risk flags for stale follow-up and overdue steps
- [ ] Define contact, calendar, and communications pivots

**Exit Criteria**: Real estate records clearly communicate closing readiness.

---

### Phase 3 - External link readiness

**Goal**: Surface external context without forcing the user out of the CRM first.
**Dependencies**: Phase 2 complete

#### Tasks

- [ ] Define HAR-linked reference behavior
- [ ] Define DotLoop-ready external link states
- [ ] Define audit expectations for date and stage changes

**Exit Criteria**: Operators can tell whether outside transaction tooling is linked, pending, or missing.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Transaction record | contact_id, property_address, stage, closing_date, agent_id | Real estate department state |
| Closing milestone | milestone, due_at, completed_at, owner_id | Deal-progress visibility |
| External link state | provider, external_id, status, last_checked_at | HAR or DotLoop reference state |

### Data Migrations

Migration requires property addresses, transaction identifiers, closing dates, and agent ownership to be normalized from historical real estate records.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Contacts | Both | Shared customer identity and enrichment | CRM source of truth |
| Pipeline | Both | Shared lead lifecycle | Real estate interpretation overlay |
| Calendar | Both | Open houses, closing dates, and appointments | Time-based pivots |
| HAR | Inbound | Listing or license reference context | Phase 2 priority |
| DotLoop | Reference-ready | Transaction-link visibility and future automation readiness | Deeper automation may follow later |

---

## Security & Access Control

- Real estate edits are limited to real-estate-scoped users and platform-wide admins.
- Closing-date and stage changes must emit shared activity events.
- External-link visibility should not leak unauthorized transaction details across tenants or roles.

---

## Testing Strategy

### Unit Tests

- Real estate stage mapping
- Risk-flag rendering
- External-link status display

### Integration Tests

- Open real estate record from shared contact
- Show pending-close record with overdue milestone
- Display linked and unlinked external contract states

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Dedicated deal workspace | Run listing-to-close review workflow |
| Reduced spreadsheet dependence | Validate property and milestone context in one view |
| External-link visibility | Confirm HAR/DotLoop state is clear and actionable |

---

## Rollout & Observability

- **Feature flag**: Yes - real estate workspace
- **Rollout strategy**: Real estate team pilot with active transaction set first
- **Key metrics to monitor**: closing-date slip rate, overdue milestone count, external-link coverage, agent follow-up latency
- **Rollback plan**: Hide real estate workspace and continue using shared contacts and pipeline while issues are resolved

---

## Open Questions

1. Should open-house events appear primarily in Calendar or as first-class cards inside Real Estate?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Property detail becomes stale without sync discipline | Medium | High | Show source freshness and require visible update paths |
| Users expect full transaction automation immediately | Medium | Medium | Clarify external-link readiness versus deeper automation |
| Stage definitions diverge across agents | Medium | Medium | Keep one canonical milestone model with explicit labels |
