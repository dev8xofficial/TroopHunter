# Feature Specification: Quotes & Estimates

> **Feature ID**: `004-quotes`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Quotes

---

## Overview

The Quotes screen provides service partners with a structured quote creation form and a view of previously sent quotes with their acceptance status. Partners select a referral, describe the service, enter labor and materials costs that are auto-totalled, specify an estimated completion time, and add notes. The screen also displays quote statistics (acceptance rate, average response time, total quotes sent) and a sidebar of recent quotes with status indicators.

---

## Problem Statement

Partners currently provide quotes informally via phone or text, leading to pricing inconsistencies, lost quote records, and no visibility into acceptance rates. Without a structured quoting system, partners cannot track which quotes are pending, accepted, or declined, and have no data to optimise their pricing strategy. The Quotes screen centralises all quoting activity with structured forms and analytics.

---

## Goals

- Provide a structured form for creating professional quotes linked to specific referrals
- Auto-calculate total quote amount from labor and materials costs
- Track quote statuses (Pending, Accepted, Declined)
- Display quote acceptance statistics for business intelligence
- Show a sidebar of recent quotes with status indicators

## Non-Goals

- Automated pricing recommendations
- Quote template library
- Multi-service bundled quotes

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Creates quotes, tracks status, reviews statistics |
| Client | CL | Receives quotes, accepts or declines (indirect) |

---

## User Scenarios

### Scenario 1: Partner Creates a New Quote

- **Actor**: SP
- **Goal**: Send a professional quote to a homeowner
- **Flow**:
  1. Partner navigates to Quotes screen
  2. Partner selects a referral from the dropdown
  3. Partner enters service description
  4. Partner enters labor cost ($800) and materials cost ($300)
  5. Total auto-calculates to $1,100
  6. Partner selects estimated completion time (3-5 days)
  7. Partner adds notes about warranty
  8. Partner clicks "Send Quote to Homeowner"
- **Success**: Quote is sent; status set to "Pending"; activity log event created

### Scenario 2: Partner Reviews Quote Statistics

- **Actor**: SP
- **Goal**: Understand quote performance
- **Flow**:
  1. Partner navigates to Quotes screen
  2. Partner views statistics section: 94% acceptance rate, 4.2h avg response, 47 total
- **Success**: Partner understands their quoting performance

---

## Functional Requirements

### FR-04-01 — Quote Creation Form

The Quotes screen displays a form for creating new quotes.

**Acceptance Criteria**:
- Referral selector dropdown (shows available referrals by client name)
- Service description text area
- Labor cost input (numeric, USD)
- Materials cost input (numeric, USD)
- Auto-calculated total (labor + materials, displayed in real-time)
- Estimated completion time dropdown: Same Day, 1-2 Days, 3-5 Days, 1-2 Weeks, 2-4 Weeks
- Notes text area for additional details
- "Send Quote to Homeowner" submit button (`success-green` background)

### FR-04-02 — Recent Quotes Sidebar

The screen displays recent quotes with their current status.

**Acceptance Criteria**:
- Each quote shows: client name, service type, amount, status badge, sent date
- Status badges: Accepted (green), Pending (orange), Declined (red)
- Reference data: Emily Davis ($1,100, Accepted, 2 days ago), Michael Brown ($195, Pending, 1 day ago), James Taylor ($350, Declined, 3 days ago)

### FR-04-03 — Quote Statistics

The screen displays aggregate quote performance metrics.

**Acceptance Criteria**:
- Acceptance Rate: percentage (e.g., 94%)
- Average Response Time: hours (e.g., 4.2h)
- Total Quotes Sent: count (e.g., 47)
- Stats display in a 3-column grid

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| referral_id | string | Yes | TRX-NNNNN | "TRX-10247" |
| service_description | string | Yes | min 10 chars | "Kitchen sink drain clearing..." |
| labor_cost | number | Yes | min 0, USD | 800 |
| materials_cost | number | Yes | min 0, USD | 300 |
| total_amount | number | Yes | auto-calculated | 1100 |
| estimated_completion | string | Yes | enum | "3-5-days" |
| notes | string | No | max 500 chars | "Includes 1-year warranty..." |
| quote_status | string | Yes | enum | "pending" |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| Labor and materials both zero | Disable submit; show validation: "Quote amount must be greater than zero" |
| No referrals available | Disable referral dropdown; show: "No referrals available to quote" |
| Quote for already-quoted referral | Display warning: "A quote was already sent for this referral" |

---

## Success Criteria

1. Quote creation form submits successfully with auto-calculated total
2. Recent quotes sidebar displays with correct status badges
3. Quote statistics show accurate aggregate data
4. Activity log event created on quote submission
5. Total amount updates in real-time as labor/materials values change

---

## Dependencies

**Depends on**: [000-foundation](../000-foundation/spec.md), [002-referrals](../002-referrals/spec.md)
**Required by**: [003-active-jobs](../003-active-jobs/spec.md)
**Cross-links**: [constitution.md](../../memory/constitution.md) — Section 8

---

**Version**: 1.0
**Last Updated**: 2026-04-12
