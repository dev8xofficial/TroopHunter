# Feature Specification: Active Jobs

> **Feature ID**: `003-active-jobs`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Active Jobs

---

## Overview

The Active Jobs screen displays all currently scheduled and in-progress service jobs for the partner. Each job is represented as a card containing the client name, property address, service type, scheduled date, job value, scope description, and action buttons. Partners can filter jobs by status (All Jobs, Scheduled, In Progress, Awaiting Payment) and search by keyword to quickly locate specific engagements.

---

## Problem Statement

Once a quote is accepted and a job is scheduled, partners need a dedicated view to manage their active workload. Without this screen, partners would need to mentally track which jobs are scheduled, which are in progress, and which are completed but awaiting payment. The Active Jobs screen provides a clear, card-based layout optimised for at-a-glance job management.

---

## Goals

- Display all active jobs as visual cards with key details
- Enable filtering by job status (Scheduled, In Progress, Awaiting Payment)
- Provide search functionality across client name and service type
- Show job value, scheduled date, and scope description on each card
- Provide action buttons (Contact Client, Reschedule, View Details) per job

## Non-Goals

- Quote creation (handled by 004-quotes)
- Payment processing (handled by 007-earnings)
- Historical job archive

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Views active jobs, contacts clients, manages schedule |
| Client | CL | Receives service on scheduled date (indirect) |

---

## User Scenarios

### Scenario 1: Partner Reviews Today's Jobs

- **Actor**: SP
- **Goal**: See what jobs are scheduled for today
- **Flow**:
  1. Partner navigates to Active Jobs screen
  2. Partner views job cards sorted by scheduled date
  3. Partner finds today's scheduled job
  4. Partner clicks "Contact Client" to confirm appointment
- **Success**: Partner confirms appointment with homeowner

### Scenario 2: Partner Filters Completed Jobs Awaiting Payment

- **Actor**: SP
- **Goal**: Check which jobs are awaiting payment
- **Flow**:
  1. Partner navigates to Active Jobs screen
  2. Partner selects "Awaiting Payment" from status filter
  3. Only completed jobs pending payment are displayed
- **Success**: Partner sees list of jobs awaiting payment

---

## Functional Requirements

### FR-03-01 — Job Filter Section

The Active Jobs screen displays a filter section with status filter and search bar.

**Acceptance Criteria**:
- Status filter dropdown: All Jobs, Scheduled, In Progress, Awaiting Payment
- Search bar with placeholder: "Search jobs..."
- Filters apply immediately on selection

### FR-03-02 — Job Cards

The screen displays each active job as a card with visual header and details.

**Acceptance Criteria**:
- Card header: Service type + status badge (Scheduled=blue, In Progress=orange, Completed=green)
- Card body: Client name, property address, scheduled date, job value, scope description
- Action buttons: "Contact Client", "View Details"
- Reference data: Drain Cleaning ($195, Michael Brown, Scheduled), Water Heater Repair ($450, Sarah Williams, Completed), Plumbing Inspection ($3,200, John Smith, Completed)
- Cards display in a responsive grid (3-column at ≥1200px, 2-column at ≥768px, 1-column below)

### FR-03-03 — Job Count Header

The screen displays the total number of jobs matching the current filter.

**Acceptance Criteria**:
- Header text: "Active Jobs" or filtered label
- Subtitle: "Showing X jobs"

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| referral_id | string | Yes | TRX-NNNNN | "TRX-10156" |
| client_name | string | Yes | max 100 chars | "Michael Brown" |
| property_address | string | Yes | full address | "321 Elm Street, Spring, TX 77382" |
| service_type | string | Yes | — | "Drain Cleaning" |
| job_value | number | Yes | USD, min 0 | 195 |
| scheduled_date | date | Yes | — | "2026-02-20" |
| scope_description | string | No | — | "Kitchen sink drain clearing and inspection..." |
| job_status | string | Yes | enum | "scheduled" |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| No active jobs | Display: "No active jobs. New jobs appear here when quotes are accepted." |
| All jobs completed | Show all as completed with "Awaiting Payment" badge where applicable |
| Job date in the past | Mark as overdue with warning indicator |

---

## Success Criteria

1. Job cards render with correct data and status badges
2. Status filter correctly filters displayed jobs
3. Search filters by client name and service type
4. Action buttons are functional and contextual to job status
5. At least 3 job cards display in the reference implementation

---

## Dependencies

**Depends on**: [000-foundation](../000-foundation/spec.md)
**Required by**: None
**Cross-links**: [constitution.md](../../memory/constitution.md) — Section 7

---

**Version**: 1.0
**Last Updated**: 2026-04-12
