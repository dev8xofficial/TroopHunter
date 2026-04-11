# Feature Specification: Dashboard

> **Feature ID**: `001-dashboard`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Dashboard

---

## Overview

The Dashboard is the service partner's primary landing screen and command centre. It provides an at-a-glance overview of the partner's business through four KPI stat cards, surfaces new referral requests requiring immediate action, displays the partner's active service areas with performance metrics, shows recent customer reviews, and offers quick-action buttons to navigate to the most frequently used screens. The Dashboard answers the question: "What do I need to action right now?"

---

## Problem Statement

Service partners juggle multiple communication channels — phone calls, texts, emails — to track new referrals, monitor their job pipeline, and stay on top of customer feedback. Without a centralised dashboard, partners must manually check each channel for updates, leading to delayed responses to referrals (which reduces acceptance rates), missed review follow-ups (which damages reputation), and a lack of real-time visibility into revenue and performance. The Dashboard solves this by presenting the most critical, actionable information in a single screen that loads immediately upon login.

---

## Goals

- Provide at-a-glance KPI visibility (new referrals, active jobs, average rating, monthly revenue)
- Surface new referral requests with one-click response actions
- Display active service area performance (referrals/month, earnings by zip code)
- Show recent customer reviews for reputation awareness
- Offer quick-action navigation to the most-used screens

## Non-Goals

- Full referral management (handled by 002-referrals)
- Quote creation or editing (handled by 004-quotes)
- Detailed earnings breakdown (handled by 007-earnings)
- Profile editing (handled by 008-profile)

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Views dashboard, responds to referrals, clicks quick actions |

---

## User Scenarios

### Scenario 1: Partner Checks Morning KPIs

- **Actor**: SP
- **Goal**: Understand current business status at a glance
- **Flow**:
  1. Partner logs in and lands on Dashboard
  2. Partner views 4 KPI stat cards (New Referrals, Active Jobs, Average Rating, This Month Revenue)
  3. Partner sees 1 new referral requiring response
  4. Partner clicks "View Details" on the referral card
- **Success**: Partner understands their business status within 30 seconds and knows what needs action

### Scenario 2: Partner Navigates via Quick Actions

- **Actor**: SP
- **Goal**: Navigate to Referrals screen quickly
- **Flow**:
  1. Partner views Dashboard
  2. Partner clicks "View All Referrals" quick action button
  3. Portal switches to Referrals screen
- **Success**: Partner reaches the Referrals screen in one click

---

## Functional Requirements

### FR-01-01 — KPI Stat Cards

The Dashboard displays a grid of 4 KPI stat cards at the top of the page. Each card shows a label, a value, and a subtitle description.

**Acceptance Criteria**:
- Card 1: "New Referrals" — value from referral count, subtitle "Awaiting response"
- Card 2: "Active Jobs" — value from active job count, subtitle "In progress"
- Card 3: "Average Rating" — value from review average (1 decimal), subtitle "Based on N reviews"
- Card 4: "This Month Revenue" — value in USD, subtitle "From platform"
- Cards display in a 4-column grid at ≥ 1200px, 2-column at ≥ 768px, 1-column below 768px
- Each card uses `shadow-md`, `16px` border-radius, `primary-navy` stat value text

### FR-01-02 — New Referral Request Cards

The Dashboard displays new referral requests as cards in the main content area, requiring partner action.

**Acceptance Criteria**:
- Each card shows: client name, property address, service type, budget range, timeline
- Each card has two action buttons: "View Details" and "Provide Quote"
- Cards display with `shadow-md` and `16px` border-radius
- Referral ID badge shows (`primary-navy` background, gold text)
- Reference data: John Smith (TRX-10247, Plumbing Inspection, $200-$400, Within 1 week), Sarah Williams (TRX-10198, Water Heater Repair, Open, ASAP)

### FR-01-03 — Service Areas Grid

The Dashboard displays the partner's active service areas in a grid layout.

**Acceptance Criteria**:
- Each area card shows: zip code, city name, referrals per month, total earned
- Reference areas: 77380 (The Woodlands, 8 referrals, $12,400), 77381 (The Woodlands, 5 referrals, $7,800), 77382 (Spring, 3 referrals, $4,200)
- Grid is 3-column at ≥ 1200px, stacking at smaller widths

### FR-01-04 — Recent Reviews

The Dashboard displays recent customer reviews in a sidebar or dedicated section.

**Acceptance Criteria**:
- Each review shows: reviewer name, star rating (1–5 stars), date, and review excerpt
- Reviews are sorted by most recent first
- Reference reviews: Michael Brown (5 stars), Lisa Anderson (5 stars)

### FR-01-05 — Quick Actions

The Dashboard displays 4 quick-action buttons for common navigation shortcuts.

**Acceptance Criteria**:
- Buttons: "View All Referrals" → Referrals screen, "Manage Service Areas" → Service Areas screen, "View Reviews" → Reviews screen, "Update Profile" → Profile screen
- Each button uses `primary-navy` background with white text
- Buttons display in a 2×2 grid at ≥ 768px, stacking to 1-column below

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| new_referral_count | number | Yes | min 0 | 1 |
| active_job_count | number | Yes | min 0 | 1 |
| average_rating | number | Yes | 1.0–5.0, 1 decimal | 4.8 |
| monthly_revenue | number | Yes | USD, min 0 | 9840 |
| pending_referrals | array | No | list of referral objects | — |
| active_service_areas | array | No | list of area objects | — |
| recent_reviews | array | No | list of review objects | — |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| Zero new referrals | Display empty state: "No new referrals — check back soon!" |
| Zero active jobs | KPI card shows "0" with subtitle "No active jobs" |
| No reviews yet | Reviews section shows: "No reviews yet. Complete your first job to start receiving feedback." |
| No service areas configured | Show banner: "Add service areas to start receiving referrals" with link to Service Areas screen |

---

## Success Criteria

1. Dashboard loads within 2 seconds with all 4 KPI cards populated
2. New referral request cards display with correct client data and action buttons
3. Service areas grid shows performance metrics for each active zip code
4. Quick action buttons navigate to correct screens on click
5. Dashboard is the default landing screen after login

---

## Dependencies

**Depends on**:
- [000-foundation](../000-foundation/spec.md)

**Required by**:
- None (Dashboard is a leaf screen)

**Cross-links**:
- [constitution.md](../../memory/constitution.md) — Section 11 (Dashboard KPIs)

---

**Version**: 1.0
**Last Updated**: 2026-04-12
