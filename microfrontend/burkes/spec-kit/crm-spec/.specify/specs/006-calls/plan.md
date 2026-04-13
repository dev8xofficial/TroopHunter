# Implementation Plan: CRM Calls

**Feature ID**: 006-calls
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: L

---

## Summary

Calls implementation focuses on a provider-agnostic telephony workflow that keeps call sessions, recordings, retention metadata, and post-call outcomes tied to contacts and leads.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Dialer surface | Outbound calling and active-call controls | New |
| Call log | Searchable list of call history | New |
| Recording metadata store | Retention and provider reference tracking | New |
| Unknown-number resolver | Contact matching or quick create | New |

---

## Implementation Phases

### Phase 1 - Call session and log model

**Goal**: Define call session fields, history, and contact linkage.
**Dependencies**: Contacts and Pipeline approved

#### Tasks

- [ ] Define call schema and log fields
- [ ] Define contact and lead linkage behavior
- [ ] Define active-call status expectations

**Exit Criteria**: Call records have stable structure and linkage.

---

### Phase 2 - Recording and retention behavior

**Goal**: Define recording references and compliance metadata.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define recording metadata schema
- [ ] Define department retention rules in the call workflow
- [ ] Define playback visibility and restricted access

**Exit Criteria**: Recorded calls are compliance-aware and auditable.

---

### Phase 3 - Resolution and degraded states

**Goal**: Define unmatched-number handling and provider failures.

#### Tasks

- [ ] Define unknown-number resolution flow
- [ ] Define provider degraded-state messaging
- [ ] Define post-call note/disposition behavior

**Exit Criteria**: Calls can be operationally used even when contact data is incomplete.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Call session | contact_id, direction, timestamps, owner, duration | Business call record |
| Recording reference | provider_id, uri, recorded_at, expires_at | Compliance tracking |
| Call disposition | outcome, notes, follow_up_required | Post-call workflow context |

### Data Migrations

No legacy call migration is assumed in Phase 1; only forward-looking CRM-originated call records are required.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| VOIP provider | Both | Session events, calling, recording references | Vendor remains TBD |
| Contacts | Both | Match or create contact during calls | Number-based matching |
| Activity service | Outbound | Append call events to history | Includes recording metadata |

---

## Security & Access Control

- Recording access must respect department and role scope.
- Unmatched calls must still produce an auditable record.
- Provider failures must be visible rather than silently dropped.

---

## Testing Strategy

### Unit Tests

- Retention-date calculation
- Unknown-number matching behavior
- Disposition validation

### Integration Tests

- Outbound call from a contact
- Inbound unmatched call to quick-create contact
- Recording failure handling

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| CRM-native calling | Place and complete sample calls from the CRM |
| Recording visibility | Verify recorded call entries show playback metadata |
| Post-call notes | Save outcomes without leaving the workflow |
| Unknown number resolution | Resolve or create contact from unmatched number |

---

## Rollout & Observability

- **Feature flag**: Yes - telephony workflow
- **Rollout strategy**: Controlled operator group after provider validation
- **Key metrics to monitor**: call connection success, recording success, unmatched-call resolution rate, playback errors
- **Rollback plan**: Disable dialing while preserving read-only log visibility if provider issues emerge

---

## Open Questions

1. Does any department require explicit disclosure text before recording begins in the CRM workflow?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Provider behavior differs from assumptions | Medium | High | Keep internal contracts provider-agnostic |
| Recording failures create compliance gaps | Medium | High | Log failures explicitly and alert admins |
| Unknown numbers remain unresolved | Medium | Medium | Provide review queue and quick-create flow |
