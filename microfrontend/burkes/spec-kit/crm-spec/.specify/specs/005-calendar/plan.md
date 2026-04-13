# Implementation Plan: CRM Calendar

**Feature ID**: 005-calendar
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Calendar implementation focuses on provider-linked event visibility, time-based planning views, and pivots back to CRM work rather than replacing full provider scheduling behavior.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Calendar shell | Day/week/month schedule workspace | New |
| Event detail panel | Context and pivot actions | New |
| Sync status layer | Provider freshness and failure state | New |

---

## Implementation Phases

### Phase 1 - Event model and views

**Goal**: Define event payloads and schedule views.
**Dependencies**: Dashboard and Contacts complete

#### Tasks

- [ ] Define event schema and provider markers
- [ ] Define day/week/month view expectations
- [ ] Define linked contact and lead presentation

**Exit Criteria**: Event data and schedule views are stable.

---

### Phase 2 - Sync and event actions

**Goal**: Define provider sync visibility and quick actions.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define sync-state rendering
- [ ] Define event-create and event-open actions
- [ ] Define pivots to CRM work

**Exit Criteria**: Calendar is operationally useful and not just visual.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Calendar event | provider, starts_at, ends_at, contact_id, lead_id | Time-based operational item |
| Calendar sync state | provider, last_synced_at, status | Reliability surface |

### Data Migrations

No CRM-owned migration is required; the workspace consumes provider-linked events.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Outlook Calendar | Both | Event visibility and scheduling | Priority provider |
| Google Calendar | Both | Event visibility and scheduling | Secondary provider in Phase 2 |
| Contacts | Both | Customer-linked event context | Supports pivots |
| Video meetings | Both | Meeting launch and event linkage | Shared with 010-video-meetings |

---

## Security & Access Control

- Users see their permitted event contexts, not unrestricted provider data.
- Internal notes or restricted invite details remain governed by linked provider/account rules.

---

## Testing Strategy

### Unit Tests

- Event rendering across views
- Sync-state freshness handling
- Event-to-contact pivot mapping

### Integration Tests

- Show Outlook and Google events in one workspace
- Open related contact or lead from event
- Degrade gracefully when one provider fails

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Operational planning from CRM | Validate weekly planning workflow |
| Sync visibility | Simulate stale/failed provider state |
| Natural CRM linkage | Verify events open related work correctly |

---

## Rollout & Observability

- **Feature flag**: Yes - calendar workspace
- **Rollout strategy**: Internal-only after provider sync validation
- **Key metrics to monitor**: sync freshness, event render latency, event-to-contact pivot rate, provider error rate
- **Rollback plan**: Fall back to Dashboard schedule card and provider links if full calendar fails

---

## Open Questions

1. Should Google sync ship simultaneously with Outlook or shortly after an Outlook-first release?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Stale events create false confidence | Medium | High | Explicit freshness markers |
| Calendar becomes a thin provider copy with little CRM value | Medium | Medium | Emphasize pivots and customer context |
