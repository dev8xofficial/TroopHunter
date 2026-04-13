# Implementation Plan: CRM SMS

**Feature ID**: 007-sms
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-13
**Estimated Effort**: M

---

## Summary

SMS implementation focuses on thread modeling, contact linkage, unread handling, and provider-safe outbound messaging rather than advanced marketing or media workflows.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
| --- | --- | --- |
| Thread list | Shows conversation summaries and unread state | New |
| Message panel | Displays message history and compose | New |
| Number resolver | Matches or creates contacts for unknown threads | New |
| Messaging safety layer | Handles opt-out and send-blocked state | New |

---

## Implementation Phases

### Phase 1 - Thread model and contact linkage

**Goal**: Define thread, message, and contact-resolution behavior.
**Dependencies**: Contacts and Calls approved

#### Tasks

- [ ] Define thread and message schemas
- [ ] Define contact linkage and ownership state
- [ ] Define unread and recency behavior

**Exit Criteria**: Threads are stable CRM entities, not raw provider messages.

---

### Phase 2 - Outbound, inbound, and safety behaviors

**Goal**: Define send, receive, opt-out, and unknown-number workflows.
**Dependencies**: Phase 1 complete

#### Tasks

- [ ] Define outbound send flow
- [ ] Define inbound reply flow
- [ ] Define opt-out and send-blocked behavior

**Exit Criteria**: Messaging is operationally safe and actionable.

---

### Phase 3 - Notifications and degraded states

**Goal**: Define unread routing and provider exception handling.

#### Tasks

- [ ] Define notification behavior for inbound replies
- [ ] Define degraded provider messaging
- [ ] Define observability and support metrics

**Exit Criteria**: SMS failures or exceptions are visible and manageable.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
| --- | --- | --- |
| Thread | contact_id, department, unread_count, opt_out | Conversation summary |
| Message | thread_id, direction, body, status, created_at | Individual text record |
| Messaging restriction | reason, source, effective_at | Send safety metadata |

### Data Migrations

No historic SMS migration is assumed for Phase 1.

---

## Integration Points

| System | Direction | Purpose | Notes |
| --- | --- | --- | --- |
| SMS provider | Both | Send/receive transport and delivery state | Vendor-agnostic contract |
| Contacts | Both | Match threads to the unified contact model | Number-based matching |
| Notification service | Outbound | Unread and inbound alerts | Shared shell integration |
| Activity service | Outbound | Message history in the CRM timeline | Append-only behavior |

---

## Security & Access Control

- Operators may only send from allowed departmental context.
- Opt-out or send-blocked state must be enforced before outbound send.
- Unmatched threads remain visible for review even if not yet resolved.

---

## Testing Strategy

### Unit Tests

- Thread unread count behavior
- Opt-out enforcement
- Unknown-number resolution

### Integration Tests

- Send text from contact profile
- Receive reply into existing thread
- Block send to opted-out contact

### Acceptance Tests (from Spec)

| Success Criterion | Test Approach |
| --- | --- |
| CRM-native text management | Send and receive within thread workspace |
| Contact-linked ownership | Verify thread resolves to contact and owner |
| Inbound visibility | Validate unread counts and notifications |
| Send safety | Verify blocked send conditions are enforced |

---

## Rollout & Observability

- **Feature flag**: Yes - SMS workspace
- **Rollout strategy**: Controlled operator pilot after provider validation
- **Key metrics to monitor**: send success, delivery failure rate, unread aging, unmatched-thread backlog
- **Rollback plan**: Preserve read-only thread history while disabling outbound send if needed

---

## Open Questions

1. Should unread routing always follow current lead owner, or should some threads route by last responder?

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Texts drift away from the CRM into personal devices | Medium | High | Make CRM thread workflow the fastest path |
| Opt-out handling is incomplete | Medium | High | Enforce visible send restrictions |
| Inbound replies route to the wrong owner | Medium | Medium | Define owner-routing rules clearly |
