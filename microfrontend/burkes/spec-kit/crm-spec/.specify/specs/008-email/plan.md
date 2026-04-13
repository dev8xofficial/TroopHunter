# Implementation Plan: CRM Email

**Feature ID**: 008-email
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: M

---

## Summary

Email implementation focuses on Outlook-linked operational workflows: inbox summaries, compose and reply actions, contact resolution, and CRM activity writing without assuming mailbox storage ownership.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Email inbox workspace | Triage recent messages and unresolved senders | New |
| Compose surface | New, reply, and forward actions | New |
| Message linker | Associates provider messages to contacts and leads | New |
| Activity bridge | Writes email metadata to CRM activity history | New |

---

## Implementation Phases

### Phase 1 - Message model and Outlook boundary

**Goal**: Define CRM email records and the provider boundary.
**Dependencies**: Contacts approved

#### Tasks

- [ ] Define CRM email fields and Outlook identifiers
- [ ] Define inbound and outbound status states
- [ ] Define message-to-contact linkage behavior

**Exit Criteria**: Email data shape and provider boundary are stable.

---

### Phase 2 - Inbox and compose workflows

**Goal**: Define triage and send/reply behavior.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define inbox list behavior
- [ ] Define compose, reply, and forward workflows
- [ ] Define attachment-awareness behavior

**Exit Criteria**: Operators can triage and act on email from the CRM.

---

### Phase 3 - Resolution and degraded states

**Goal**: Define unresolved senders, activity writing, and provider exception handling.

#### Tasks

- [ ] Define unknown-sender resolution flow
- [ ] Define auto-log activity writing
- [ ] Define degraded Outlook state behavior

**Exit Criteria**: Email remains operationally safe under both normal and exception conditions.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Email record | provider_id, contact_id, subject, direction, status | CRM operational email reference |
| Unresolved email | provider_id, sender, received_at, resolution_status | Contact-linking exception queue |
| Email activity entry | email_id, direction, participants, timestamp | Timeline visibility |

### Data Migrations

No historical mailbox migration is required for Phase 1.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| Outlook | Both | Send, receive, and metadata sync | Remains mailbox system of record |
| Contacts | Both | Match sender and recipient context | Address-based matching |
| Activity service | Outbound | Timeline logging | Append-only model |
| Notification service | Outbound | New inbound email alerts | Shared shell integration |

---

## Security & Access Control

- CRM users only see messages within their permitted operational context.
- Provider failures must not silently drop activity linkage.
- Unresolved emails should remain visible for authorized review rather than disappearing.

---

## Testing Strategy

### Unit Tests

- Email status transitions
- Address-to-contact matching
- Attachment indicator handling

### Integration Tests

- Send email from a contact profile
- Receive inbound email to a matched contact
- Resolve an unknown sender into a new contact

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| CRM-native email operations | Compose and reply within the CRM workspace |
| Activity linkage | Verify inbound and outbound email entries in contact history |
| Unknown sender resolution | Link unresolved email to existing or new contact |
| Outlook failure visibility | Simulate provider outage and verify degraded behavior |

---

## Rollout & Observability

- **Feature flag**: Yes - email workspace
- **Rollout strategy**: Controlled operator pilot with linked Outlook accounts
- **Key metrics to monitor**: sync success, send success, unresolved-email backlog, activity-log completion rate
- **Rollback plan**: Disable compose/send while keeping read-only CRM email references if provider issues occur

---

## Open Questions

1. Should message threading behavior be represented by provider thread IDs only, or also by CRM conversation grouping rules?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Outlook sync instability confuses operators | Medium | High | Clear degraded state and read-only fallback |
| Unknown senders pile up | Medium | Medium | Provide visible resolution queue |
| Operators expect full mailbox parity | Medium | Medium | Keep feature positioned as operational email, not mailbox replacement |
