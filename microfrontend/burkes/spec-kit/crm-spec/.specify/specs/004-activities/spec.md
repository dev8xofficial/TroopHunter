# Feature Specification: CRM Activities

**Feature ID**: 004-activities
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Activities - full audit trail and customer activity timeline

---

## Overview

The Activities feature is the full audit and timeline workspace for the CRM. It expands the Phase 1 condensed activity feed into a searchable, filterable history of calls, SMS, email, portal intake, notes, transfers, uploads, and stage changes so operators and administrators can reconstruct what happened for a customer or department without leaving the CRM.

---

## Problem Statement

Phase 1 intentionally kept activity visibility lightweight so the CRM could ship the core workflow quickly. Phase 2 needs the complete operational memory. Without a dedicated Activities screen, operators must jump between Contacts, Calls, SMS, Email, and Pipeline to piece together what happened. That slows follow-up, weakens coaching and compliance review, and makes it harder to investigate disputes or missing work. Burkes Group also needs a trustworthy audit surface where portal submissions, lead transfers, and communications appear in one place. Activities solves this by turning the append-only activity contract into a first-class workspace for search, review, and operational analysis.

---

## Goals

- Provide one full timeline for CRM activity across contacts and departments.
- Support filtering by contact, department, activity type, date range, and actor.
- Preserve immutable audit semantics while making the history operationally useful.
- Allow operators to pivot from an activity item into the underlying workflow quickly.

---

## Non-Goals

- Activities does not allow editing or deleting history.
- It does not replace the Dashboard or Reports screen.
- It is not a data warehouse or BI export surface.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Reviews customer history, coaching examples, and handoff quality |
| Platform Administrator (PA) | Audits compliance-sensitive workflows and investigates issues |
| Insurance Agent (IA) | Uses detailed history to continue conversations without context loss |
| Real Estate Agent (RA) | Reviews multi-step deal progression and communication history |

---

## User Scenarios

### Scenario 1 - Agent reviews a full customer timeline

**Actor**: Real Estate Agent
**Precondition**: A contact has multiple calls, texts, emails, and stage changes.
**Flow**:
1. The agent opens Activities and filters to the contact.
2. The timeline shows events in descending time order.
3. The agent opens a related contact, lead, call, or email from the activity row.

**Success**: The agent reconstructs recent history from one screen instead of several.

---

### Scenario 2 - Administrator audits a transfer and communication chain

**Actor**: Platform Administrator
**Precondition**: A lead was transferred between departments and has later communication events.
**Flow**:
1. The administrator filters by contact and date range.
2. The activity list shows transfer, communication, and follow-up events in sequence.
3. The administrator confirms the handoff and compliance trail.

**Success**: The CRM provides a clear audit sequence for operational review.

---

## Functional Requirements

### FR-04-01 - Full Activity Timeline

The Activities feature must display the complete append-only event stream for CRM work.

### FR-04-02 - Search and Filters

Operators must be able to filter by contact, department, actor, type, and date range.

### FR-04-03 - Contact-Centric and Global Views

The feature must support both a global operations view and a contact-specific timeline view.

### FR-04-04 - Immutable Event Presentation

Each activity item must make it clear that the history is factual and append-only rather than editable.

### FR-04-05 - Event Pivot Actions

Activity rows must offer direct pivots into the relevant contact, lead, call, SMS, or email context.

### FR-04-06 - Compliance Metadata Visibility

Call recordings, portal intake, and transfer events must show the metadata needed for compliance or audit review.

### FR-04-07 - Volume Management

The feature must support pagination, date-range narrowing, or equivalent mechanisms to handle large timelines.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `activity.id` | string | Immutable event identifier |
| `activity.type` | string | Canonical event type |
| `activity.contact_id` | string | Linked contact if present |
| `activity.department` | string | Department context |
| `activity.actor_id` | string | Initiating user or system actor |
| `activity.occurred_at` | string | Event timestamp |
| `activity.metadata` | object | Event-specific details |

---

## Edge Cases & Error States

- **Huge result set**: The screen requires narrowing or pagination rather than loading everything at once.
- **Missing linked entity**: The event remains visible even if the underlying entity cannot be opened.
- **Restricted content**: Users can see permitted summary context but not restricted playback or protected details.

---

## Assumptions

1. Activity volume will grow quickly once Calls, SMS, Email, and portal intake are live.
2. Operators need both narrative context and direct workflow pivots.
3. Audit review requires event visibility even if the source workflow later changes.

---

## Success Criteria

1. Operators can review full customer or department history from one screen.
2. Audit investigations no longer require hopping across multiple features.
3. Immutable history remains readable and actionable at operational scale.

---

## Open Questions

1. Should note-only entries be collapsible by default when timelines become dense?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [006-calls](../006-calls/spec.md), [007-sms](../007-sms/spec.md), [008-email](../008-email/spec.md)
- **Required by**: 015-reports
