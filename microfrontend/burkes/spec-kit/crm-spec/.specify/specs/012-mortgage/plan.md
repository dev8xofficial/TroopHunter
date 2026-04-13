# Implementation Plan: CRM Mortgage

**Feature ID**: 012-mortgage
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Mortgage implementation defines a department workspace centered on loan milestones, missing-document visibility, and Arive-linked sync awareness while preserving the CRM as the shared customer context.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Mortgage workspace shell | Mortgage queue and stage views | New |
| Loan milestone panel | Show progress from inquiry to funded | New |
| Missing items checklist | Highlight blocked progress | New |
| Arive sync banner | Surface source freshness and exception state | New |

---

## Implementation Phases

### Phase 1 - Mortgage record model and stage views

**Goal**: Define the mortgage data model and department-visible views.
**Dependencies**: Contacts, Pipeline, and Activities complete

#### Tasks

- [ ] Define mortgage fields and stage states
- [ ] Define list and board views for loan progress
- [ ] Define lender and owner filters

**Exit Criteria**: Mortgage records and core views are stable.

---

### Phase 2 - Missing-data and loan progress workflow

**Goal**: Define the operational workflow for moving a loan forward.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define pre-approval, application, processing, and close-readiness behavior
- [ ] Define missing-data and document blockers
- [ ] Define communication and activity pivots

**Exit Criteria**: Operators can identify blockers and next actions from the workspace.

---

### Phase 3 - Arive sync and exception handling

**Goal**: Make Arive dependency visible without losing CRM workflow value.
**Dependencies**: Phase 2 complete

#### Tasks

- [ ] Define Arive identifier and freshness display
- [ ] Define conflict and degraded-sync behavior
- [ ] Define observability and audit requirements for stage changes

**Exit Criteria**: Mortgage records clearly communicate whether external sync data is healthy.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Mortgage record | contact_id, loan_stage, lender, arive_id | Mortgage department state |
| Loan blocker set | missing_items, owner_id, severity | Progress blocker visibility |
| Mortgage sync state | provider, last_synced_at, status, error_code | Arive health and freshness |

### Data Migrations

Mortgage migration requires Arive identifiers, lender associations, and milestone timestamps to be normalized into the CRM model.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Contacts | Both | Shared customer identity and enrichment | CRM source of truth |
| Pipeline | Both | Shared lead visibility | Mortgage interpretation overlay |
| Activities | Outbound | Audit trail for stage progression and follow-up | Immutable |
| Arive | Both | Loan status, identifiers, and sync freshness | Required integration |

---

## Security & Access Control

- Mortgage edits are restricted to mortgage-scoped users and platform-wide admins.
- Loan progress changes must remain auditable in the shared activity history.
- Provider-originated data should not override manually corrected CRM context without explicit conflict visibility.

---

## Testing Strategy

### Unit Tests

- Mortgage stage mapping
- Missing-item checklist logic
- Arive sync-state rendering

### Integration Tests

- Open mortgage record from shared contact
- Display stalled record with missing documents
- Handle stale or failed Arive sync gracefully

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Mortgage work in CRM context | Run a stalled-loan recovery workflow |
| Early blocker visibility | Validate missing-data indicators |
| Arive-aware visibility | Simulate fresh and stale provider sync states |

---

## Rollout & Observability

- **Feature flag**: Yes - mortgage workspace
- **Rollout strategy**: Mortgage pilot with Arive-linked records first
- **Key metrics to monitor**: stalled-record rate, document-completion rate, sync freshness, stage-cycle time
- **Rollback plan**: Hide mortgage workspace while leaving shared contact and pipeline access available

---

## Open Questions

1. Should clear-to-close and funded states roll up separately in Dashboard and Reports from the first release?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Mortgage users ignore CRM because Arive feels primary | Medium | High | Center customer context and action pivots in CRM |
| Sync failures hide real blockers | Medium | High | Show explicit exception states and freshness timestamps |
| Too many stage labels reduce clarity | Medium | Medium | Keep a canonical milestone model with lender notes as supplemental context |
