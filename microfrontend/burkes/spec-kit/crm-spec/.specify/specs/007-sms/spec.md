# Feature Specification: CRM SMS

**Feature ID**: 007-sms
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: SMS - two-way text messaging workspace

---

## Overview

The SMS feature provides a CRM-native workspace for two-way text messaging tied to contacts and departmental ownership. It organizes messages into conversation threads, supports outbound messaging from contact and lead context, records inbound replies, and keeps unread and opt-out state visible so text communication becomes part of the same customer record as calls, email, and pipeline activity.

---

## Problem Statement

SMS is one of the three non-negotiable CRM communication pillars, but text messaging is often the easiest channel to fragment because people fall back to personal devices or isolated business-phone apps. That breaks continuity, hides follow-up, and makes ownership unclear. Burkes Group needs SMS to feel as native and reliable as calling: threads must resolve to contacts, unread replies must reach the right owner, and texting state must be visible from the CRM rather than trapped in a provider dashboard. At the same time, the Phase 1 SMS feature should stay focused on operational conversations, not marketing automation or campaign tooling.

---

## Goals

- Provide one CRM-native threaded SMS workspace.
- Keep outbound and inbound messages attached to contacts and departmental ownership.
- Surface unread, last-response, and opt-out state clearly.
- Support fast messaging from contact and pipeline context.

---

## Non-Goals

- SMS does not replace future email-blast or campaign tooling.
- It does not define full marketing automation workflows.
- Advanced MMS/media libraries are out of scope for Phase 1.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Insurance Agent (IA) | Sends customer follow-up texts and handles replies |
| Real Estate Agent (RA) | Coordinates lead follow-up and transaction updates by text |
| Department Owner (OW) | Monitors thread ownership and unresolved inbound replies |
| Platform Administrator (PA) | Reviews provider health and messaging exceptions |

---

## User Scenarios

### Scenario 1 - Agent sends a text from a contact profile

**Actor**: Insurance Agent
**Precondition**: A contact exists with a valid phone number.
**Flow**:
1. The agent opens SMS from the contact record.
2. The compose panel opens in the correct thread or creates a new thread.
3. The agent sends the message and the thread updates immediately.

**Success**: Messaging starts from the CRM without leaving the contact workflow.

---

### Scenario 2 - Customer replies to an existing thread

**Actor**: Real Estate Agent
**Precondition**: A contact has an active text thread.
**Flow**:
1. An inbound SMS arrives from the contact's number.
2. The CRM marks the thread unread and notifies the owner.
3. The agent opens the thread and replies from the same workspace.

**Success**: Inbound replies are visible, attributable, and easy to action.

---

### Scenario 3 - Number is unmatched or opted out

**Actor**: Department Owner
**Precondition**: An outbound or inbound SMS number is unmatched or marked opt-out.
**Flow**:
1. The SMS workspace shows the number state.
2. The operator can match or create a contact when appropriate.
3. If the number is opted out, sending controls are blocked and the reason is visible.

**Success**: Texting stays operationally safe and attached to the right record.

---

## Functional Requirements

### FR-07-01 - Threaded Conversation Workspace

The SMS feature must organize messages as contact-linked conversation threads.

### FR-07-02 - Contact and Department Linkage

Each thread must resolve to a contact and show department ownership or active context.

### FR-07-03 - Send and Receive Messaging

Operators must be able to send outbound texts and receive inbound replies from inside the CRM.

### FR-07-04 - Unread and Recency State

Threads must show unread count, latest message preview, and last-response timing.

### FR-07-05 - Opt-Out and Messaging Safety

The feature must visibly indicate opt-out or send-blocked state and prevent inappropriate outbound messaging.

### FR-07-06 - Unknown Number Resolution

Threads with unmatched numbers must support contact lookup or minimal contact creation.

### FR-07-07 - Activity and Notification Writing

Inbound and outbound SMS events must produce activity entries and notification signals in the shared shell.

### FR-07-08 - Degraded Provider State

The feature must show clear degraded-state behavior when SMS transport is unavailable.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `thread.id` | string | Conversation thread identifier |
| `thread.contact_id` | string | Linked contact |
| `thread.department` | string | Department context |
| `thread.unread_count` | number | New messages awaiting review |
| `thread.last_message_at` | string | Latest message timestamp |
| `thread.opt_out` | boolean | Messaging permission state |
| `message.id` | string | Individual SMS identifier |
| `message.direction` | string | Inbound or outbound |
| `message.status` | string | Sent, delivered, failed, received |

---

## Edge Cases & Error States

- **Provider outage**: Sending is blocked with explicit degraded-state messaging.
- **Inbound unmatched message**: The thread is kept in an unmatched queue until resolved.
- **Opted-out contact**: Compose remains visible but send is blocked with explanation.
- **Duplicate contact candidates**: The operator must resolve the correct contact before continuing.

---

## Assumptions

1. SMS transport is provider-mediated, but thread context belongs in the CRM.
2. Phone number is the core thread-to-contact matching key.
3. Opt-out state may come from provider signals or CRM-managed rules.

---

## Success Criteria

1. Operators can manage customer text conversations from the CRM.
2. Threads stay attached to contacts and owners instead of fragmenting into provider inboxes.
3. Inbound replies generate clear unread and notification state.
4. Send-blocked or opt-out conditions are visible and enforced.

---

## Open Questions

1. Should templates for common follow-up messages be included in Phase 1 or wait for later communications work?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [002-contacts](../002-contacts/spec.md), [006-calls](../006-calls/spec.md)
- **Required by**: 008-email
