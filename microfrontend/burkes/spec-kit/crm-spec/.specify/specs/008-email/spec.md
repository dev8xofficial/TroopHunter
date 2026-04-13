# Feature Specification: CRM Email

**Feature ID**: 008-email
**Status**: approved
**Created**: 2026-04-13
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Email - operational inbox and compose workspace

---

## Overview

The Email feature gives Burkes Group operators a CRM-native workspace for operational email linked to Microsoft Outlook. It supports inbox triage, contact-linked message history, compose and reply actions, metadata auto-log, unknown-sender resolution, and clear provider-state visibility so email becomes part of the same operational record as contacts, calls, SMS, and pipeline work.

---

## Problem Statement

Email remains central to Burkes Group operations, but the CRM should not become a self-hosted email platform. The business explicitly wants Outlook to remain the storage system of record while the CRM adds workflow visibility and customer context. Without an email workspace in the CRM, operators would continue bouncing between inboxes and the contact record, losing time and context. Without clear linkage between Outlook and the CRM, inbound and outbound email would remain invisible to pipeline and contact workflows. The Email feature solves this by making email operationally visible and actionable in the CRM while respecting the boundary that Outlook owns mailbox storage and delivery.

---

## Goals

- Provide one operational email workspace tied to contacts and leads.
- Support outbound compose and inbound reply handling with Outlook linkage.
- Auto-log email metadata into the CRM activity model.
- Resolve unknown senders into the unified contact model.

---

## Non-Goals

- Email does not self-host mailbox storage.
- It does not replace the future email-blast or campaign feature.
- Deep calendar management is out of scope for this feature.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Insurance Agent (IA) | Sends and replies to customer emails with CRM context |
| Real Estate Agent (RA) | Uses email for transaction and lead follow-up |
| Department Owner (OW) | Monitors reply backlog and contact-linked communication history |
| Platform Administrator (PA) | Reviews provider health and unresolved email-linkage exceptions |

---

## User Scenarios

### Scenario 1 - Agent sends an email from a contact record

**Actor**: Real Estate Agent
**Precondition**: The contact exists and has an email address.
**Flow**:
1. The agent opens Email from the contact workflow.
2. Compose opens with the contact prefilled.
3. The email is sent through Outlook-linked delivery.
4. The CRM logs the message metadata to the contact history.

**Success**: Outbound email starts in the CRM and remains connected to the customer record.

---

### Scenario 2 - Inbound email is triaged in the CRM

**Actor**: Insurance Agent
**Precondition**: A customer replies through Outlook-linked email.
**Flow**:
1. The inbound message appears in the CRM inbox workspace.
2. The message is associated with the matching contact.
3. The operator can open the related contact or reply from the same surface.

**Success**: Inbound email becomes operational work, not just mailbox content.

---

### Scenario 3 - Unknown sender needs resolution

**Actor**: Platform Administrator
**Precondition**: An inbound email arrives from an address not matched to a contact.
**Flow**:
1. The message appears in an unresolved state.
2. The operator searches for an existing contact or creates a minimal record.
3. The CRM links the email history once resolved.

**Success**: Email stays connected to the unified contact model instead of living outside it.

---

## Functional Requirements

### FR-08-01 - Operational Inbox

The Email feature must provide an inbox-style workspace showing recent inbound and outbound communication relevant to CRM users.

### FR-08-02 - Contact and Lead Linkage

Emails must resolve to contacts and, when possible, active lead or department context.

### FR-08-03 - Compose, Reply, and Forward

Operators must be able to compose new messages and respond to existing ones from the CRM workspace.

### FR-08-04 - Outlook as System of Record

The feature must treat Outlook as the provider of mailbox storage and transport while the CRM stores operational linkage and metadata.

### FR-08-05 - Auto-Log to Activity

Inbound and outbound email events must write CRM activity entries containing message metadata and references.

### FR-08-06 - Unknown Sender Resolution

Messages without confident contact matches must support contact lookup or minimal contact creation.

### FR-08-07 - Attachment Awareness

The CRM must show that a message includes attachments and preserve the association without taking over mailbox storage semantics.

### FR-08-08 - Degraded Provider State

The feature must show clear degraded behavior when Outlook connectivity is unavailable.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `email.id` | string | CRM email record identifier |
| `email.provider_id` | string | Outlook message identifier |
| `email.contact_id` | string | Linked contact |
| `email.department` | string | Department context |
| `email.direction` | string | Inbound or outbound |
| `email.subject` | string | Subject line |
| `email.sent_at` | string | Send or receive timestamp |
| `email.has_attachments` | boolean | Attachment indicator |
| `email.status` | string | Draft, sent, received, failed, unresolved |

---

## Edge Cases & Error States

- **Provider unavailable**: Compose and sync states clearly show degraded behavior.
- **Unknown sender remains unresolved**: The message stays visible in an unresolved queue.
- **Contact has no email address**: Compose is blocked until an address exists.
- **Attachment metadata unavailable**: The message remains visible but flags missing attachment detail.

---

## Assumptions

1. Outlook metadata and message identifiers are available for CRM linkage.
2. The CRM needs headers, subject, participants, and timestamps, but not full ownership of mailbox storage.
3. Email linkage may rely on address-based matching plus operator review.

---

## Success Criteria

1. Operators can send and triage operational email from the CRM.
2. Email activity appears in the customer timeline without duplicating mailbox storage responsibility.
3. Unknown senders are resolvable into the contact model.
4. Outlook failures are visible without corrupting CRM history.

---

## Open Questions

1. Should shared mailbox behavior be part of Phase 1, or should the CRM assume one primary linked mailbox per operator initially?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [002-contacts](../002-contacts/spec.md), [007-sms](../007-sms/spec.md)
- **Required by**: Phase 2 email blast work
