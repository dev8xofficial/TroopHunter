# Feature Specification: CRM Video Meetings

**Feature ID**: 010-video-meetings
**Status**: approved
**Created**: 2026-04-14
**Parent Spec**: [005-calendar](../005-calendar/spec.md)
**Screen / Module**: Video Meetings - meeting launch, history, and retention guidance

---

## Overview

The Video Meetings feature gives operators a CRM workspace for launching, logging, and reviewing customer video meetings through Teams or Google Meet. It links meetings to contacts and leads, captures meeting notes and outcomes, and surfaces recording-retention guidance for recorded sessions.

---

## Problem Statement

Burkes Group will continue using external meeting providers rather than building native video inside the CRM. Even so, meetings are important customer touchpoints that affect follow-up, compliance, and scheduling. If meetings remain only in provider calendars and chat tools, the CRM loses context that matters to operators. Video Meetings solves that by turning provider meetings into CRM-aware operational events with special attention to notes, outcomes, and 90-day recording-retention visibility.

---

## Goals

- Provide quick-launch access to external meeting providers from the CRM.
- Link meetings to contacts, leads, and calendar events.
- Capture meeting notes, outcomes, and follow-up tasks.
- Surface recording-retention and export guidance.

---

## Non-Goals

- The feature does not implement native video conferencing.
- It does not replace provider recording storage.
- It does not cover webinars or large-event hosting workflows.

---

## Actors

| Actor | Role in This Feature |
| --- | --- |
| Department Owner (OW) | Launches customer meetings and reviews outcomes |
| Mortgage Liaison (ML) | Uses meetings for lender and borrower coordination |
| Platform Administrator (PA) | Reviews recording-retention reminders and launch reliability |

---

## User Scenarios

### Scenario 1 - Operator launches a customer meeting from the CRM

**Actor**: Mortgage Liaison
**Precondition**: A calendar-linked meeting exists or needs to be created.
**Flow**:
1. The operator opens Video Meetings.
2. The CRM shows upcoming meetings with customer context.
3. The operator launches the meeting in Teams or Google Meet.
4. After the meeting, the operator records notes and next steps.

**Success**: The meeting starts through the provider but remains visible in the CRM workflow.

---

### Scenario 2 - Administrator reviews a recorded meeting nearing purge

**Actor**: Platform Administrator
**Precondition**: A recorded meeting is approaching the 90-day retention window.
**Flow**:
1. The administrator filters the meeting log by recording-retention window.
2. The entry shows expiry context and export guidance.
3. The administrator tracks the required follow-up before purge.

**Success**: Recording-related operational risk is visible before automatic purge.

---

## Functional Requirements

### FR-10-01 - Meeting List and Launch Surface

The feature must show upcoming and recent meetings with quick-launch actions for supported providers.

### FR-10-02 - Contact and Calendar Linkage

Meetings must display related contact, lead, and calendar context where available.

### FR-10-03 - Meeting Notes and Outcomes

Operators must be able to record notes, outcomes, and follow-up actions after a meeting.

### FR-10-04 - Provider and Recording Visibility

The feature must show provider type, recording presence, and recording-retention guidance.

### FR-10-05 - Retention Reminder Behavior

Recorded meetings must surface the 90-day purge and export rule clearly.

---

## Data & State

| Field | Type | Description |
| --- | --- | --- |
| `meeting.id` | string | Meeting identifier |
| `meeting.provider` | string | Teams or Google Meet |
| `meeting.contact_id` | string | Linked contact if present |
| `meeting.lead_id` | string | Linked lead if present |
| `meeting.starts_at` | string | Start time |
| `meeting.recorded` | boolean | Recording state |
| `meeting.recording_expires_at` | string | 90-day retention marker |

---

## Edge Cases & Error States

- **Meeting has no linked contact**: The meeting remains visible but lacks CRM pivots.
- **Provider launch fails**: The meeting stays in the log with launch failure messaging.
- **Recording state unknown**: The entry shows unknown rather than assuming not recorded.

---

## Assumptions

1. Providers remain the actual meeting hosts.
2. Recording retention is operationally important even when CRM does not store media itself.
3. Meeting notes are often more useful than raw launch history alone.

---

## Success Criteria

1. Operators can launch and log meetings from the CRM.
2. Meeting notes and outcomes become part of the customer record.
3. Recording-retention risk is visible before purge windows are missed.

---

## Open Questions

1. Should meeting notes support attendee-role tagging in Phase 2?

---

## Dependencies

- **Depends on**: [005-calendar](../005-calendar/spec.md), [004-activities](../004-activities/spec.md)
- **Required by**: 015-reports
