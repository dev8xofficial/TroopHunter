# Feature Specification: CRM Calendar

**Feature ID**: 005-calendar
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Calendar - operator schedule and cross-system sync view

---

## Overview

The Calendar feature is the CRM workspace for operator scheduling and appointment visibility. It consolidates Outlook-linked and Google-linked events, surfaces follow-up tasks and customer appointments, and provides a time-based planning view that connects directly back to contacts, leads, and communication workflows.

---

## Problem Statement

Phase 1 exposed only a lightweight schedule card on the Dashboard. That is not enough once the CRM becomes the team's day-to-day operational center. Operators need a dedicated place to understand today, this week, and upcoming commitments, especially when appointments and reminders may originate from different calendars. Without a CRM calendar workspace, time-based work remains fragmented across Outlook, Google, and informal reminders, which weakens follow-through and makes ownership less visible. The Calendar feature solves this by making time a first-class operational dimension while still respecting that external providers remain the calendar systems of record.

---

## Goals

- Provide day, week, and month schedule views for CRM operators.
- Reflect Outlook and Google calendar-linked activity in one operational workspace.
- Link events back to contacts, leads, and meeting actions.
- Surface sync conflicts and provider state clearly.

---

## Non-Goals

- Calendar does not replace the providers as the master systems of record.
- It does not implement advanced resource booking or room scheduling.
- It is not a full project-management or task-planning product.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Reviews upcoming appointments and follow-up commitments |
| Insurance Agent (IA) | Manages quote calls, renewals, and customer appointments |
| Real Estate Agent (RA) | Tracks showings, walkthroughs, closings, and follow-up blocks |
| Platform Administrator (PA) | Reviews sync health and scheduling exceptions |

---

## User Scenarios

### Scenario 1 - Agent plans the week from the CRM calendar

**Actor**: Real Estate Agent
**Precondition**: Outlook or Google-linked events exist for the operator.
**Flow**:
1. The agent opens the Calendar in week view.
2. The CRM shows appointments, follow-ups, and linked customer context.
3. The agent opens an event and navigates into the related contact or lead.

**Success**: The agent can plan time and customer work from one operational schedule.

---

### Scenario 2 - Administrator reviews sync issues

**Actor**: Platform Administrator
**Precondition**: One provider has stale or failed sync state.
**Flow**:
1. The administrator opens Calendar and sees a sync warning.
2. The warning identifies the affected provider and timeframe.
3. The administrator uses the issue to investigate or route support work.

**Success**: Schedule reliability issues become visible before they silently affect operations.

---

## Functional Requirements

### FR-05-01 - Calendar Views

The Calendar feature must support at least day, week, and month schedule views.

### FR-05-02 - Multi-Provider Event Visibility

The feature must show Outlook-linked and Google-linked events within one operational calendar workspace.

### FR-05-03 - Contact and Lead Context

Events tied to customers or internal workflow must show related contact or lead context.

### FR-05-04 - Event Creation and Quick Actions

Operators must be able to create or trigger calendar-relevant actions such as new events or meeting launches from the workspace.

### FR-05-05 - Sync State Visibility

The feature must show sync freshness, degraded state, or provider exceptions clearly.

### FR-05-06 - Navigation to Related Work

Operators must be able to open contacts, leads, or communication workflows from event detail.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `calendar_event.id` | string | Calendar event identifier |
| `calendar_event.provider` | string | Outlook or Google |
| `calendar_event.starts_at` | string | Event start |
| `calendar_event.ends_at` | string | Event end |
| `calendar_event.contact_id` | string | Linked contact if present |
| `calendar_event.lead_id` | string | Linked lead if present |
| `calendar_sync.status` | string | Healthy, stale, failed |

---

## Edge Cases & Error States

- **Conflicting provider events**: The CRM shows overlapping items rather than hiding one source.
- **Stale sync**: The workspace marks freshness clearly and does not misrepresent stale data as live.
- **No linked contact**: The event remains visible as a calendar item without CRM pivot context.

---

## Assumptions

1. The CRM calendar is an operational mirror, not the authoritative calendar store.
2. Some events will be customer-linked while others remain internal-only.
3. Meeting-launch behavior may connect to future video workflows.

---

## Success Criteria

1. Operators can plan work from the CRM without losing customer context.
2. Sync state is visible enough to prevent silent calendar drift.
3. Calendar events connect naturally to contacts, leads, and communications.

---

## Open Questions

1. Should provider-specific color coding remain visible, or should CRM event type color coding take precedence?

---

## Dependencies

- **Depends on**: [000-foundation](../000-foundation/spec.md), [001-dashboard](../001-dashboard/spec.md), [002-contacts](../002-contacts/spec.md)
- **Required by**: 010-video-meetings
