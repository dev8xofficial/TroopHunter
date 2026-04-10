# Feature Specification: Dashboard

**Feature ID**: 001-dashboard
**Status**: review
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Dashboard — default landing screen

---

## Overview

The Dashboard is the first screen the client sees after logging in. It provides a real-time summary of the entire transaction: outstanding actions, key statistics, mortgage and insurance mini-trackers, an 11-stage progress timeline, recent documents, a live activity feed, the transaction team roster, and quick-action shortcuts. The goal is that the client can understand their full transaction status and identify exactly what to do next — all from this single screen.

---

## Problem Statement

Without a centralised overview, clients must check multiple places (email, lender portal, attorney messages) to piece together where their transaction stands. The Dashboard eliminates this by surfacing all critical status in one view, reducing client anxiety and the volume of inbound "what's the status?" contacts to the agent.

---

## Goals

- Surface the single most important outstanding action as the first thing the client sees.
- Give the client a numeric and visual sense of overall progress (percentage, stage).
- Show mortgage and insurance sub-progress without requiring navigation to those screens.
- Provide instant navigation to any in-progress area via widgets and quick-action buttons.
- Display the last six activity events so the client can orient themselves after any absence.

---

## Non-Goals

- The Dashboard does not allow editing any data — it is read-only. All editing happens in the dedicated screen for each module.
- It does not display the full document list (that is spec 002).
- It does not host the full message threads (that is spec 003).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Primary viewer of all dashboard content |
| All professional roles | Their actions (uploads, messages, reviews) feed the activity log and document widgets shown here |

---

## User Scenarios

### Scenario 1 — Client Reviews Status on Login

**Actor**: Client
**Precondition**: Transaction is Under Contract; mortgage is 60% complete; one insurance type is pending.
**Flow**:
1. Client lands on the Dashboard.
2. An action-required banner is visible at the top listing two outstanding items: mortgage employment history and insurance auto/warranty forms.
3. Two CTA buttons in the banner navigate directly to the Mortgage and Insurance screens.
4. Four stat cards render below the banner with current values.
5. Client reads the Mortgage mini-card: 60% progress, outstanding section name, loan figures.
6. Client reads the Insurance mini-card: Home = Complete, Auto = Pending, Warranty = Not Started.
7. Client scrolls the timeline to see the current in-progress stage and its sub-badges.

**Success**: Client knows their exact status and pending actions within 60 seconds without navigating away.

---

### Scenario 2 — Client Uses Quick Actions to Navigate

**Actor**: Client
**Precondition**: Client is on the Dashboard.
**Flow**:
1. Client clicks "Continue Mortgage App" in the Quick Actions widget.
2. Portal navigates to the Mortgage screen with the active nav button updated.

**Success**: Navigation is instant; correct screen and nav state appear.

---

### Scenario 3 — Client Reviews Transaction Team and Messages a Member

**Actor**: Client
**Precondition**: Four team members are assigned (agent, lender, attorney, CPA).
**Flow**:
1. Client locates the Transaction Team sidebar card.
2. Client clicks "Message" next to the lender's name.
3. Portal navigates to the Messages screen with the lender's thread pre-selected.

**Success**: Client is in the lender's conversation thread in one click.

---

## Functional Requirements

### FR-01-01 — Action-Required Banner

- The banner must appear at the top of Dashboard content whenever there is at least one outstanding client action.
- The banner must list outstanding items in plain language (e.g., "Complete mortgage employment history section", "Add auto insurance and home warranty information").
- Each outstanding item must have a corresponding navigation CTA button (labelled with the destination screen).
- When all outstanding actions are resolved, the banner must disappear.

### FR-01-02 — Stat Cards Grid

- Four stat cards must be displayed in a 4-column grid (collapses to 2-column below 1100 px).
- Card 1 — **Transaction Status**: percentage complete + label (e.g., "Under Contract").
- Card 2 — **Documents**: total document count + count needing client signature.
- Card 3 — **Insurance Status**: fraction complete (e.g., "1/3") + short label ("Home complete, 2 pending").
- Card 4 — **Next Appointment**: date + appointment type.
- Each card must have an associated emoji icon.
- Cards must have a hover state (lift + border highlight).

### FR-01-03 — Mortgage Mini-Card

- Displayed above the Transaction Progress timeline in the main column.
- Must show: title ("Mortgage Application"), subtitle (lender institution name), a progress percentage, a progress bar (gradient fill), the name of the outstanding section, and count of remaining sections.
- Must show three key figures: Property Value, Loan Amount, Estimated Rate.
- Must include a "Continue →" button that navigates to the Mortgage screen.
- Background: light blue gradient (`#f0f7ff` to `#e0f0ff`) with a blue border.

### FR-01-04 — Insurance Mini-Card

- Displayed below the Mortgage mini-card.
- Must show three coverage-type tiles: Home, Auto, Warranty — each with a label and a colour-coded status indicator.
  - Complete: `success-green` text + ✓
  - Pending: `warning-orange` text + ⏱
  - Not Started: `neutral-400` text
- Must include an "Update →" button navigating to the Insurance screen.
- Background: light green gradient (`#f0fdf4` to `#dcfce7`) with a green border.

### FR-01-05 — Transaction Progress Timeline

- Renders all 11 canonical stages from the constitution in vertical order.
- Each stage has a left-side marker icon:
  - Completed: green rounded square with ✓
  - In-Progress: amber rounded square with ⏱
  - Pending: neutral rounded square with the stage number
- Completed and in-progress stages have a connector line between them. The connector for completed stages is green; for in-progress-to-pending it fades from amber to neutral.
- In-progress stages must display sub-badges for their sub-tasks (e.g., "Personal Info ✓", "Employment History ⏱", "Documents Pending").
- Pending stages must show a projected date or scheduled date if known.
- A "Step N of 11" badge must appear in the timeline card header.

### FR-01-06 — Recent Documents Widget (Sidebar)

- Shows the three most recently added or updated documents across all categories.
- Each entry shows: document name (with file emoji), uploading role + relative timestamp, status badge, and contextual action buttons (Sign Now / View / Download based on status).
- A "View All" button navigates to the Documents screen.

### FR-01-07 — Recent Activity Feed (Sidebar)

- Shows the six most recent activity log events (newest first).
- Each event shows: label with emoji, relative time (e.g., "2h ago"), and description text.
- Events are clickable (hover highlight); clicking an event navigates to the relevant screen.
- Events must cover all activity types: document uploads, data shares, attorney reviews, insurance updates, milestone completions, and access grants.

### FR-01-08 — Transaction Team Widget (Sidebar)

- Lists all assigned professionals in the current transaction.
- Each entry shows: role-coloured avatar with initials, full name, role label, and a "Message" button.
- Clicking "Message" navigates to the Messages screen with that contact's thread active.
- Team composition is dynamic (reflects however many professionals are assigned).

### FR-01-09 — Quick Actions Widget (Sidebar)

- Six action buttons displayed in a vertical list:
  1. Upload Documents → Documents screen
  2. Message Your Agent → Messages screen (agent thread)
  3. Schedule Appointment → (future: calendar integration)
  4. Continue Mortgage App → Mortgage screen
  5. Update Insurance Info → Insurance screen
  6. Find Service Providers → Services screen
- Each button has an emoji prefix and a full-width hover state (navy background, white text).

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `transaction.completion_percentage` | number | Drives stat card and timeline header |
| `transaction.current_stage` | number | Which of 11 stages is active |
| `transaction.stages[]` | array | Full stage list with status and dates |
| `documents.total_count` | number | Total documents in portal |
| `documents.needs_signature_count` | number | Documents awaiting client signature |
| `insurance.home_status` | string | not-started / pending / completed |
| `insurance.auto_status` | string | not-started / pending / completed |
| `insurance.warranty_status` | string | not-started / pending / completed |
| `mortgage.completion_percentage` | number | Drives mortgage mini-card progress bar |
| `mortgage.outstanding_section` | string | Name of the first incomplete section |
| `mortgage.property_value` | number | Drives the "Property Value" figure |
| `mortgage.loan_amount` | number | Drives the "Loan Amount" figure |
| `mortgage.estimated_rate` | number | Drives the "Est. Rate" figure |
| `next_appointment.date` | date | Drives the "Next Appointment" stat card |
| `next_appointment.type` | string | Description of appointment |
| `activity_log[]` | array | Latest 6 events (from foundation contract) |
| `team_members[]` | array | Assigned professionals |
| `recent_documents[]` | array | Latest 3 documents |

---

## Edge Cases & Error States

- **No outstanding actions**: The action-required banner is hidden; the screen still renders all widgets normally.
- **No documents yet**: The recent documents widget shows an empty state ("No documents yet — your agent will upload soon").
- **No activity yet**: The activity feed shows an empty state message.
- **Appointment not yet scheduled**: The "Next Appointment" stat card shows "TBD" instead of a date.
- **Fewer than 4 team members**: The Transaction Team widget renders whatever members are assigned; no empty slot placeholders.

---

## Assumptions

1. All data displayed on the Dashboard is derived from the transaction record and its sub-records (mortgage, insurance, documents, messages). No manual Dashboard-specific data entry is required.
2. Relative timestamps (e.g., "2h ago") are calculated from the client's local timezone.
3. The "Schedule Appointment" quick action button is a placeholder; its target (calendar integration) is deferred.

---

## Success Criteria

1. Client can identify the highest-priority outstanding action within 60 seconds of landing on the Dashboard.
2. All four stat cards reflect the current transaction state accurately on every page load.
3. The 11-stage timeline renders correctly for all combinations of stage status (all pending, mixed, all complete).
4. Clicking any navigation CTA (banners, mini-cards, team member Message buttons, quick-action buttons) lands the client on the correct screen with the correct nav state.
5. The activity feed accurately reflects the six most recent events across all portal screens.

---

## Open Questions

1. Should the action-required banner prioritise items (show the most critical first) or list all outstanding items with equal weight?
2. Is there a maximum number of in-progress stages that can coexist, or is it possible for stages 5, 6, and 7 to all be "in-progress" simultaneously (as shown in the current UI)?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, activity log contract)
- **Required by**: All other screens link back to Dashboard via logo or breadcrumb
