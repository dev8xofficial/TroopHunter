# Feature Specification: Earnings & Payments

> **Feature ID**: `007-earnings`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Earnings

---

## Overview

The Earnings screen provides the service partner with a comprehensive view of their revenue, payment history, and platform fees. It features a hero earnings card with total revenue displayed prominently, three KPI stat cards (Year to Date, Average Job Value, Pending Payment), and a detailed payment history table showing each completed job's value, platform fee deduction, net earnings, and payment status. This screen enables partners to track their financial performance and identify pending payments.

---

## Problem Statement

Partners need financial transparency to trust the platform and manage their business. Without a centralised earnings view, partners must manually track payments, calculate platform fees, and reconcile individual job earnings. This creates confusion about pending payments and total revenue. The Earnings screen provides full financial transparency with every number clearly visible.

---

## Goals

- Display total earnings in a visually prominent hero card
- Show financial KPIs (YTD earnings, average job value, pending payments)
- Provide detailed payment history table with fee transparency
- Track payment status per job (Paid, Awaiting Payment, Processing)

## Non-Goals

- Tax reporting or 1099 generation
- Payment method configuration
- Invoice generation
- Payout scheduling preferences

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Views earnings, reviews payment history, tracks pending payments |
| Admin | AD | Processes payments (indirect) |

---

## User Scenarios

### Scenario 1: Partner Reviews Monthly Earnings

- **Actor**: SP
- **Goal**: Understand total revenue and pending payments
- **Flow**:
  1. Partner navigates to Earnings screen
  2. Partner sees hero card: Total Earnings $9,840
  3. Partner views KPI cards: YTD $9,840, Avg Job $703, Pending $5,200
  4. Partner scrolls to payment history table
- **Success**: Partner has full picture of financial status

### Scenario 2: Partner Checks Pending Payments

- **Actor**: SP
- **Goal**: See which jobs are awaiting payment
- **Flow**:
  1. Partner views payment history table
  2. Partner identifies rows with "Awaiting Payment" status
  3. Partner sees Michael Brown (Drain Cleaning, $175 net) is pending
- **Success**: Partner knows which payments to expect

---

## Functional Requirements

### FR-07-01 — Earnings Hero Card

The screen displays a hero card with total earnings in a visually prominent format.

**Acceptance Criteria**:
- Large earnings value (e.g., "$9,840") displayed centrally
- Gradient background using `primary-navy` to `accent-blue`
- "Total Earnings" label above the value
- Subtitle: "Your total earnings from the platform"

### FR-07-02 — Earnings KPI Cards

The screen displays 3 financial KPI cards below the hero.

**Acceptance Criteria**:
- Card 1: "Year to Date" — cumulative earnings in USD with "N jobs completed" subtitle
- Card 2: "Average Job Value" — USD average with "+X% from last month" subtitle
- Card 3: "Pending Payment" — USD total with "N jobs awaiting payment" subtitle
- 3-column grid at ≥1200px, stacking at smaller widths

### FR-07-03 — Payment History Table

The screen displays a detailed table of all payment transactions.

**Acceptance Criteria**:
- Columns: Date, Client, Service, Job Value, Platform Fee, Your Earnings, Status
- Status badges: Paid (green), Awaiting Payment (orange), Processing (blue)
- Platform fee calculated and displayed transparently
- Reference data from constitution Section 11
- Table sorted by date (most recent first)

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| total_earnings | number | Yes | USD, min 0 | 9840 |
| ytd_earnings | number | Yes | USD | 9840 |
| avg_job_value | number | Yes | USD | 703 |
| pending_payment | number | Yes | USD | 5200 |
| completed_jobs_count | number | Yes | min 0 | 14 |
| pending_jobs_count | number | Yes | min 0 | 2 |
| payment_date | date | Yes | — | "2026-02-05" |
| client_name | string | Yes | — | "Sarah Williams" |
| service_type | string | Yes | — | "Water Heater Repair" |
| job_value | number | Yes | USD | 580 |
| platform_fee | number | Yes | USD | 58 |
| net_earnings | number | Yes | USD | 522 |
| payment_status | string | Yes | enum | "paid" |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| No earnings yet | Hero shows "$0"; KPIs show zero; table shows "No payments yet" |
| All payments pending | Pending Payment KPI highlighted with warning badge |
| Platform fee calculation | Fee always visible — never hidden or merged with job value |

---

## Success Criteria

1. Hero card displays total earnings prominently with gradient background
2. KPI cards show accurate financial summaries
3. Payment history table displays with correct fee calculations
4. Status badges render correctly for all payment states
5. All amounts display in USD format with proper formatting

---

## Dependencies

**Depends on**: [000-foundation](../000-foundation/spec.md)
**Required by**: None
**Cross-links**: [constitution.md](../../memory/constitution.md) — Section 11

---

**Version**: 1.0
**Last Updated**: 2026-04-12
