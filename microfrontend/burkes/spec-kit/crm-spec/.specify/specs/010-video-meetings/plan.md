# Implementation Plan: CRM Video Meetings

**Feature ID**: 010-video-meetings
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-14
**Estimated Effort**: M

---

## Summary

Video Meetings implementation focuses on provider launch coordination, CRM linkage, post-meeting notes, and recording-retention reminders without replacing external meeting providers.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Meeting list | Upcoming and past meeting visibility | New |
| Launch actions | Provider handoff to Teams or Meet | New |
| Meeting detail panel | Notes, outcomes, and follow-up fields | New |
| Retention reminder layer | Recording expiry visibility | New |

---

## Implementation Phases

### Phase 1 - Meeting model and launch behavior

**Goal**: Define meetings as CRM-linked operational entities.
**Dependencies**: Calendar complete

#### Tasks

- [ ] Define meeting schema and provider markers
- [ ] Define launch actions and failure states
- [ ] Define contact and calendar linkage

**Exit Criteria**: Meetings are visible and launchable from CRM context.

---

### Phase 2 - Notes and retention behavior

**Goal**: Define post-meeting workflow and recording reminders.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define meeting notes and outcomes
- [ ] Define recording-retention guidance
- [ ] Define activity linkage

**Exit Criteria**: Meetings contribute usable customer history and retention awareness.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Meeting | provider, starts_at, contact_id, recorded | CRM-linked meeting record |
| Meeting note | meeting_id, summary, follow_up_required | Post-meeting operational context |

### Data Migrations

No historical meeting migration is required in Phase 2.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Microsoft Teams | Both | Launch and provider visibility | External host |
| Google Meet | Both | Launch and provider visibility | External host |
| Calendar | Both | Schedule linkage | Primary upstream source |
| Activity service | Outbound | Meeting history and notes | Append-only linkage |

---

## Security & Access Control

- Meeting launch respects user account and provider permissions.
- Notes follow CRM role and department visibility rules.

---

## Testing Strategy

### Unit Tests

- Provider state rendering
- Recording-expiry calculation display
- Note and outcome validation

### Integration Tests

- Launch from meeting list
- Save notes after meeting
- Show recorded-meeting retention reminder

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| Launch and log meetings | Verify launch and post-meeting save flow |
| Customer record enrichment | Check notes and outcomes in activity history |
| Purge visibility | Validate retention reminder display |

---

## Rollout & Observability

- **Feature flag**: Yes - video meeting workspace
- **Rollout strategy**: Internal-only after provider link validation
- **Key metrics to monitor**: launch success, note completion, recorded-meeting visibility, retention reminder interaction rate
- **Rollback plan**: Keep calendar event links while disabling the dedicated workspace if needed

---

## Open Questions

1. Should export-to-Outlook or OneDrive be an explicit CRM action or an admin guidance flow only?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Users expect native video behavior | Medium | Medium | Keep provider boundaries explicit |
| Recorded meeting state is inconsistent | Medium | High | Show unknown state instead of assumptions |
