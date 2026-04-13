# Implementation Plan: CRM Insurance

**Feature ID**: 011-insurance
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Insurance implementation layers a department-specific workspace onto the shared CRM model so quoting, policy status, renewals, and legacy sync visibility can be handled without forking customer data.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Insurance workspace shell | Insurance board and list views | New |
| Policy detail panel | Show policy summary and renewal state | New |
| Missing data checklist | Highlight quote-readiness gaps | New |
| Legacy sync ribbon | Show source, freshness, and sync exceptions | New |

---

## Implementation Phases

### Phase 1 - Insurance record model and views

**Goal**: Define the insurance data surface and operational views.
**Dependencies**: Contacts, Pipeline, and Activities complete

#### Tasks

- [ ] Define insurance record fields and status states
- [ ] Define list and board visibility rules
- [ ] Define quote-readiness and renewal indicators

**Exit Criteria**: Insurance workspace states and core views are stable.

---

### Phase 2 - Quote and policy workflow

**Goal**: Define quoting, binding, issuing, and renewal behavior.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define quote, bind, issue, and lost state transitions
- [ ] Define policy summary and renewal timing display
- [ ] Define missing-intake prompts and CRM pivots

**Exit Criteria**: Insurance operators can understand what to do next from one screen.

---

### Phase 3 - Legacy sync and compliance visibility

**Goal**: Surface interim integration context while the team transitions off prior tools.
**Dependencies**: Phase 2 complete

#### Tasks

- [ ] Define sync-state rendering for Vertafore and Agency Zoom context
- [ ] Define exception behavior for stale or conflicting records
- [ ] Define audit expectations for insurance lifecycle changes

**Exit Criteria**: Insurance records expose enough source context for transition and audit review.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Insurance record | contact_id, line_of_business, status, carrier, renewal_at | Insurance department state |
| Quote readiness | missing_fields, last_reviewed_at, owner_id | Highlight progress blockers |
| Insurance sync state | provider, source_id, last_synced_at, status | Legacy integration visibility |

### Data Migrations

Historical insurance records may need source tagging and renewal-date normalization during migration from legacy tools.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Contacts | Both | Shared customer identity and enrichment | CRM source of truth |
| Pipeline | Both | Shared lifecycle visibility | Insurance interpretation only |
| Activities | Outbound | Audit events for quote and policy changes | Immutable history |
| Vertafore / Agency Zoom | Both | Interim source reference and sync freshness | Transition-state integration |

---

## Security & Access Control

- Insurance changes are limited to users with insurance write scope or platform-wide access.
- Sensitive policy details should follow department-scoped visibility rules.
- Renewal and policy state changes must emit audit-visible activity entries.

---

## Testing Strategy

### Unit Tests

- Insurance status mapping and transition rules
- Missing-field checklist rendering
- Legacy sync-state badge behavior

### Integration Tests

- Open insurance record from shared contact
- Advance quote to bound or issued state
- Show stale or conflicting legacy sync markers

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Insurance work from one workspace | Run quoting and renewal review flow end to end |
| Missing intake visibility | Validate quote-readiness blocking markers |
| Transition support | Confirm sync source and freshness are visible |

---

## Rollout & Observability

- **Feature flag**: Yes - insurance workspace
- **Rollout strategy**: Insurance team pilot before broader owner/admin access
- **Key metrics to monitor**: quote-readiness completion rate, renewal follow-up latency, sync freshness, insurance stage-cycle time
- **Rollback plan**: Hide insurance workspace and keep shared Contacts/Pipeline access active while issues are corrected

---

## Open Questions

1. Should carrier-specific fields be standardized now or deferred until direct quoting integrations are chosen?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Insurance states drift from shared pipeline language | Medium | Medium | Keep shared lead model with insurance-specific overlays |
| Missing data becomes ignored noise | Medium | High | Emphasize quote-readiness blockers and renewal urgency |
| Legacy sync creates operator confusion | Medium | High | Show source labels, freshness, and conflict states explicitly |
