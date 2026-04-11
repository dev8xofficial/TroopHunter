# Feature Specification: Referrals

> **Feature ID**: `002-referrals`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Referrals

---

## Overview

The Referrals screen is the service partner's primary pipeline management tool. It displays all referrals received from real estate agents, organised in a filterable, searchable table with columns for client name, property address, service type, budget, timeline, and current status. Partners can filter by referral status and service type, search by keyword, and take action on individual referrals (respond, send quote, follow up). This screen provides the complete lifecycle view of every referral the partner has received.

---

## Problem Statement

Without a centralised referral management screen, service partners rely on phone calls, text messages, and emails from agents to track incoming leads. This fragmented approach leads to delayed responses (average 12+ hours), missed referrals (estimated 15% loss rate), and no clear view of pipeline status. Partners cannot easily distinguish between new leads requiring immediate action and referrals already in progress. The Referrals screen solves this by presenting every referral in a single, filterable, actionable table.

---

## Goals

- Display all referrals in a structured table with sortable columns
- Enable filtering by referral status (All, New Lead, Contacted, Quoted, Scheduled, Completed, Declined)
- Enable filtering by service type
- Provide keyword search across client name and property address
- Allow partners to take action on referrals (Respond, Send Quote, Follow Up, View Details)
- Show referral status badges with canonical colours

## Non-Goals

- Quote creation (handled by 004-quotes)
- Job scheduling (handled by 003-active-jobs)
- Payment tracking (handled by 007-earnings)

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Views referrals, filters, searches, responds, sends quotes |
| Agent | AG | Source of referral submissions (indirect) |
| Client | CL | Source of service request (indirect) |

---

## User Scenarios

### Scenario 1: Partner Reviews New Referrals

- **Actor**: SP
- **Goal**: Identify and respond to new referral leads
- **Flow**:
  1. Partner navigates to Referrals screen
  2. Partner selects "New Lead" from the status filter
  3. Table updates to show only new referrals
  4. Partner clicks "Respond" on a referral row
  5. Partner initiates contact with the homeowner
- **Success**: Referral status updates from "New Lead" to "Contacted"

### Scenario 2: Partner Searches for a Specific Client

- **Actor**: SP
- **Goal**: Find a referral for a specific client by name
- **Flow**:
  1. Partner navigates to Referrals screen
  2. Partner types client name in the search bar
  3. Table filters to show matching referrals
- **Success**: Partner sees only referrals matching the search query

---

## Functional Requirements

### FR-02-01 — Referral Filter Section

The Referrals screen displays a filter section at the top with status filter, service type filter, and search bar.

**Acceptance Criteria**:
- Status filter dropdown: All Referrals, New Lead, Contacted, Quoted, Scheduled, Completed, Declined
- Service type filter dropdown: All Services, Emergency Repairs, Installations, Inspections, Maintenance
- Search bar with placeholder: "Search referrals..."
- Filters apply immediately on selection

### FR-02-02 — Referral Table

The screen displays a table with all referrals matching the current filters.

**Acceptance Criteria**:
- Columns: Client Name, Property Address, Service Type, Budget, Timeline, Status, Action
- Status column shows canonical badge (new=blue, contacted=orange, quoted=blue, scheduled=blue, completed=green, declined=red)
- Action column shows contextual button: "Respond" for new leads, "Send Quote" for contacted, "Follow Up" for quoted, "View Details" for scheduled/completed
- Table uses zebra striping for readability
- Reference data from constitution Section 6

### FR-02-03 — Referral Count Header

The screen displays the total number of referrals matching the current filter.

**Acceptance Criteria**:
- Header text: "All Referrals" or filtered label (e.g., "New Leads")
- Subtitle shows count: "Showing X referrals"

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| referral_id | string | Yes | TRX-NNNNN format | "TRX-10247" |
| client_name | string | Yes | max 100 chars | "John Smith" |
| property_address | string | Yes | full address | "123 Main Street, The Woodlands, TX 77380" |
| service_type | string | Yes | — | "Plumbing Inspection" |
| budget | string | No | price range or "Open" | "$200-$400" |
| timeline | string | No | — | "Within 1 week" |
| referral_status | string | Yes | enum | "new-lead" |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| No referrals match filter | Display "No referrals match your filters" with reset button |
| Search returns no results | Display "No referrals found for '[query]'" |
| Very long property address | Truncate with ellipsis at 60 characters |
| Referral without budget | Display "Open to quote" in budget column |

---

## Success Criteria

1. Referral table displays all referrals with correct data and status badges
2. Status filter correctly filters the table by referral status
3. Search bar filters by client name and property address
4. Action buttons show correct labels based on referral status
5. At least 5 referral rows display in the reference implementation

---

## Dependencies

**Depends on**:
- [000-foundation](../000-foundation/spec.md)

**Required by**:
- [001-dashboard](../001-dashboard/spec.md) — referral cards reference this screen

**Cross-links**:
- [constitution.md](../../memory/constitution.md) — Section 6 (Reference Data — Referrals)

---

**Version**: 1.0
**Last Updated**: 2026-04-12
