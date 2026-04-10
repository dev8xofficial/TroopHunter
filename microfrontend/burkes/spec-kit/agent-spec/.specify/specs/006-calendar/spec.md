# Feature Specification: Calendar & Appointments

**Feature ID**: 006-calendar
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Calendar — appointment scheduling and agenda view

---

## Overview

The Calendar screen gives the agent a structured view of their scheduled appointments — today's agenda and upcoming appointments this week — alongside a form to schedule new appointments. Each appointment is linked to a client and an optional transaction, providing full context without requiring the agent to look elsewhere.

---

## Problem Statement

Agents schedule multiple appointment types daily: property showings, client consultations, closing meetings, home inspections, mortgage meetings, and final walkthroughs. Without a centralised calendar view tied to transactions, agents lose context for why an appointment was scheduled and with whom, leading to preparation gaps and missed meetings.

---

## Goals

- Display today's appointments in a clear time-ordered list with client and transaction context.
- Display upcoming week appointments with date labels.
- Provide a compose-style form to schedule new appointments.
- Link every appointment to a client and optionally to a transaction.

---

## Non-Goals

- Full calendar grid view (month/week calendar) is deferred to a future spec revision.
- Integration with external calendar services (Google Calendar, Outlook) is an implementation concern.
- The "Schedule Appointment" action button in other screens (e.g., Quick Actions on Dashboard) is a placeholder pending this spec's implementation.

---

## Actors

| Actor        | Role in This Feature                                |
| ------------ | --------------------------------------------------- |
| Agent (AG)   | Creates, views, and manages their own appointments  |
| Clients (CL) | May receive appointment confirmations (future spec) |

---

## User Scenarios

### Scenario 1 — Agent Reviews Today's Schedule

**Actor**: Agent
**Precondition**: Three appointments exist for today (February 2026).
**Flow**:

1. Agent navigates to Calendar.
2. Page title renders "Calendar & Appointments" with subtitle.
3. Under "Today's Appointments," three appointment cards render in time order.
4. Agent reads the 2:00 PM closing meeting: client is John Smith, attorney is Sarah Mitchell.
5. Agent confirms the location of the 10:00 AM showing: 321 Elm Street, Spring, TX (TRX-10156).

**Success**: Agent can read all appointment details for today without navigating away.

---

### Scenario 2 — Agent Schedules a New Appointment

**Actor**: Agent
**Precondition**: Agent needs to schedule a property showing for a new client.
**Flow**:

1. Agent fills in the Schedule New Appointment form (sidebar).
2. Selects Appointment Type: "Property Showing."
3. Selects Client: "Michael Brown."
4. Enters date and time.
5. Enters location: "789 Pine Road, The Woodlands, TX 77381."
6. Adds notes: "Bring latest inspection report."
7. Clicks "Schedule Appointment."
8. Activity event written: "Appointment Scheduled – Property Showing – Michael Brown."

**Success**: Appointment is created and would appear in the agenda; activity log updated.

---

## Functional Requirements

### FR-06-01 — Page Layout

- Two-column content layout: main column (appointment lists) + sidebar column (schedule form).
- Collapses to single column below 1200 px.

### FR-06-02 — Calendar Header

- Title in main column: "February 2026" (rendered as `.calendar-month` in `font-display`, 24px/700, `primary-navy`).
- Navigation buttons: "← Previous" and "Next →" as `.btn-secondary` buttons (right-aligned in the calendar header row).

### FR-06-03 — Today's Appointments Section

- Heading: "Today's Appointments" (20px/700 `primary-navy`, margin-bottom 16px).
- Each appointment rendered as an `.appointment-card` (`padding: 20px`, `background: neutral-50`, `border-left: 4px solid primary-navy`, `border-radius: 10px`).
- Card structure: appointment time (16px/700 `primary-navy`), appointment title (15px/600 `neutral-900`), appointment details (14px `neutral-600`).

**Reference Today's Appointments (from agent.html)**:

| Time                | Title                             | Details                                                                        |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| 10:00 AM – 11:00 AM | Property Showing – 789 Pine Road  | Client: Michael Brown · Location: 321 Elm Street, Spring, TX 77382 (TRX-10156) |
| 2:00 PM – 3:00 PM   | Closing Meeting – 123 Main Street | Client: John Smith · Attorney: Sarah Mitchell – Mitchell Law Group             |
| 4:30 PM – 5:30 PM   | Client Consultation – New Buyer   | Prospective Client: Lisa Anderson · Phone Meeting                              |

### FR-06-04 — Upcoming This Week Section

- Heading: "Upcoming This Week" (20px/700 `primary-navy`, margin-bottom 16px).
- Same `.appointment-card` component as today's appointments.
- Time field shows day label (e.g., "Thu, Feb 19 – 11:00 AM").

**Reference Upcoming Appointments (from agent.html)**:

| Time                   | Title                              | Details                                                                               |
| ---------------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| Thu, Feb 19 – 11:00 AM | Home Inspection – 123 Main Street  | Client: John Smith · Inspector: HomePro Inspection Services (TRX-10247)               |
| Fri, Feb 20 – 3:00 PM  | Mortgage Application Meeting       | Client: Michael Brown · Lender: James Carter – First National Bank (TRX-10156)        |
| Mon, Feb 23 – 10:00 AM | Final Walkthrough – 456 Oak Avenue | Client: Sarah Williams · Property: 789 Pine Road, The Woodlands, TX 77381 (TRX-10198) |

### FR-06-05 — Schedule New Appointment Form (Sidebar)

- Container: white card with title "Schedule New Appointment."
- Displayed as a vertical flex form.

**Form Fields**:

1. **Appointment Type** (label, select): Property Showing, Client Consultation, Closing Meeting, Home Inspection, Final Walkthrough, Other.
2. **Client** (label, select): John Smith, Sarah Williams, Michael Brown, Michael Brown, Lisa Anderson.
3. **Date** (label, date input).
4. **Time** (label, time input).
5. **Location** (label, text input): placeholder "Enter location."
6. **Notes** (label, textarea): placeholder "Add notes or details...", `min-height: 120px`.
7. **"Schedule Appointment"** `.btn-primary` submit button (full width).

---

## Data & State

| Field                        | Type   | Description                                          |
| ---------------------------- | ------ | ---------------------------------------------------- |
| `appointments.today[]`       | array  | Appointments for today's date                        |
| `appointments.upcoming[]`    | array  | Appointments in the next 7 days                      |
| `appointment.time`           | string | Display time string (e.g., "10:00 AM – 11:00 AM")    |
| `appointment.title`          | string | Appointment title                                    |
| `appointment.details`        | string | Free-text details including client and location info |
| `appointment.client`         | string | Associated client name                               |
| `appointment.transaction_id` | string | Optional associated transaction ID                   |
| `calendar.month_label`       | string | Display month label (e.g., "February 2026")          |

---

## Edge Cases & Error States

- **No appointments today**: Show empty state under "Today's Appointments" — "No appointments scheduled for today."
- **No upcoming appointments**: Show empty state under "Upcoming This Week" — "No upcoming appointments this week."
- **Schedule appointment without date or time**: Validation error on submit.
- **Schedule appointment without client selected**: Validation error — client selection required.

---

## Success Criteria

1. The calendar header renders "February 2026" with Previous/Next navigation buttons.
2. All 3 today's appointments render with exact time, title, and detail strings from the reference data.
3. All 3 upcoming appointments render with exact day-prefixed times, titles, and detail strings.
4. The "Schedule Appointment" form contains all 6 reference appointment types and all 5 reference client names.
5. All form fields render correctly (select, date, time, text, textarea).
6. Appointment type dropdown defaults to "Property Showing" (first option).

---

## Open Questions

1. When the agent clicks "← Previous" or "Next →", should the current month label update (full calendar month navigation)?
2. Should today's appointments and upcoming appointments be combined into a single date-sorted list?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, card pattern)
- **Depends on**: 004-clients (client dropdown populated from Clients list)
- **Cross-links**: 001-dashboard (Quick Actions "Schedule Appointment" placeholder routes here)
