# Feature Specification: Attorney Dashboard

**Feature ID**: 001-dashboard
**Status**: approved
**Created**: 2026-04-12
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Dashboard — default landing screen

---

## Overview

The Attorney Dashboard is the first screen the attorney sees after logging in. It provides a real-time command-centre view of the attorney's caseload: four KPI stat cards, an urgent closing alert, asset split review cards, a client transactions table, recent activity feed, quick-action shortcuts, and upcoming deadline tracking. The goal is that the attorney can understand their complete verification pipeline and identify exactly what requires attention — all from this single screen.

---

## Problem Statement

Without a centralised overview, closing attorneys must check multiple systems (email, paper files, phone calls) to determine which transactions need verification, which documents are pending review, and which deadlines are approaching. The Dashboard eliminates this by surfacing all critical status in one view, enabling the attorney to prioritise work upon login and never miss a closing deadline.

---

## Goals

- Surface the four most important KPIs as stat cards at the top of the screen.
- Display an urgent alert banner for approaching closing deadlines.
- Provide asset split review panels for transactions requiring verification.
- Show the attorney's active client transactions with key details and direct actions.
- Show a live activity feed so the attorney can orient after any absence.
- Provide quick-action shortcuts to the most-used workflows.
- Display upcoming deadlines with visual urgency indicators.

---

## Non-Goals

- The Dashboard does not display all transactions — it shows only active/recent ones. The full list is in spec 002.
- It does not show the full document library (spec 003).
- It does not host the verification workflow (spec 005).
- Dashboard stat cards are read-only; no editing happens here.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Attorney (AT) | Primary user; views all dashboard content, reviews splits, navigates to verification |
| Admin (TC) | May view attorney dashboard in admin oversight mode |

---

## User Scenarios

### Scenario 1 — Attorney Reviews Morning Dashboard

**Actor**: Attorney (Sarah Mitchell)
**Precondition**: Attorney is authenticated; there are 12 active transactions.
**Flow**:
1. Attorney lands on the Dashboard (default screen).
2. Four stat cards render: Active Transactions (12), Pending Verification (3), Asset Splits (2), Total Value Managed ($2.1M).
3. An urgent alert warns about the Smith closing deadline (Feb 15, 4 days remaining).
4. Two asset split review cards show pending split reviews.
5. Client transactions table shows 3 active deals with status badges and verify/flag actions.
6. Activity feed shows recent events (document uploaded, review started, client added, message received).

**Success**: Attorney has a complete picture of their caseload and pending actions within 60 seconds.

---

### Scenario 2 — Attorney Initiates Verification from Dashboard

**Actor**: Attorney
**Precondition**: Dashboard is visible with pending verification items.
**Flow**:
1. Attorney clicks "Verify" button on the John Smith table row.
2. The Verify Confirm modal opens showing amounts (sale price, closing costs, cash to close).
3. Attorney enters their signature and clicks "Confirm & Sign."
4. The system records the verification and writes an activity event.
5. The dashboard stat cards update to reflect the verification.

**Success**: Attorney can verify a transaction directly from the Dashboard without navigating away.

---

### Scenario 3 — Attorney Reviews Asset Split

**Actor**: Attorney
**Precondition**: Dashboard shows asset split review cards.
**Flow**:
1. Attorney reviews split card showing TRX-10247 sale price ($485,000) and loan amount ($388,000).
2. Attorney clicks "✅ Verify Amounts" to open the verification modal.
3. Alternatively, attorney clicks "🚩 Flag" to flag a discrepancy.
4. Attorney can also click "👁 View Documents" to review supporting docs.

**Success**: Attorney can take action on asset splits directly from the Dashboard.

---

## Functional Requirements

### FR-01-01 — KPI Stat Cards Grid

- Four stat cards displayed in a 4-column responsive grid.
- Each card has: label (13px `neutral-600` font-weight: 600), large value (34px/800 `font-display` `primary-navy`), delta description (12px font-weight: 600), and emoji icon (28px, right-aligned).
- Cards have hover state (translateY(-2px) + `shadow-lg` + `accent-blue` border).
- Reference values:

  | Card | Label                 | Value | Description          | Icon |
  |------|-----------------------|-------|----------------------|------|
  | 1    | Active Transactions   | 12    | ↑ 2 from last month  | 🔄   |
  | 2    | Pending Verification  | 3     | Requires attention   | ⏳   |
  | 3    | Asset Splits          | 2     | 2 awaiting approval  | ⚖️   |
  | 4    | Total Value Managed   | $2.1M | Across all cases     | 💰   |

### FR-01-02 — Urgent Closing Alert

- Displayed as an `alert-warning` banner below the stat cards.
- Contains: warning icon (⚠️), title ("Urgent: Closing Deadline Approaching"), description with transaction details and days remaining, and a "Review Now" primary button.
- Reference: "Smith transaction at 123 Main Street requires verification before Feb 15 closing date. 4 days remaining."

### FR-01-03 — Asset Split Review Cards

- Displayed in a card with header "⚖️ Asset Split Reviews" and subtitle "Divorce cases awaiting distribution approval."
- Badge showing pending count ("2 Pending").
- Each split card shows: transaction ID, client name, property, value, closing date, status badge.
- Split grid: two columns showing Sale Price and Loan Amount with party details.
- Action buttons per card: "✅ Verify Amounts", "👁 View Documents", "🚩 Flag".

### FR-01-04 — Client Transactions Table

- Card title "Your Client Transactions" with subtitle "All real estate transactions under your review."
- "View All" secondary button linking to Transactions screen.
- Columns: Client (with avatar), Property, Transaction Type, Contract Amount, Status, Action.
- Reference rows from attorney.html (3 active transactions).

### FR-01-05 — Recent Activity Feed (Sidebar)

- White sidebar card with title "Recent Activity."
- Shows 4 recent activity events with icon, title, description, and relative timestamp.
- Reference events: Document Uploaded, Review Started, Client Added, Message Received.

### FR-01-06 — Quick Actions Widget (Sidebar)

- Four action buttons displayed vertically:
  1. 📋 Review Pending Transactions
  2. ✅ Manage Verifications
  3. 📄 View All Documents
  4. 📊 Generate Reports

### FR-01-07 — Upcoming Deadlines Widget (Sidebar)

- Displays 3 upcoming deadlines with priority colour coding.
- Each deadline: transaction name, property address, date badge.
- Colour-coded left borders: `error-red` (urgent), `warning-orange` (soon), `success-green` (comfortable).

---

## Data & State

| Field                         | Type   | Description                                      |
|-------------------------------|--------|--------------------------------------------------|
| `stats.active_transactions`   | number | Count of non-completed transactions (ref: 12)    |
| `stats.pending_verification`  | number | Count awaiting verification (ref: 3)             |
| `stats.asset_splits`          | number | Count of pending asset splits (ref: 2)           |
| `stats.total_value_managed`   | number | Total value across all cases (ref: 2,100,000)    |
| `active_transactions[]`       | array  | List of active transaction objects                |
| `activity_log[]`              | array  | Latest 4 activity events for this attorney       |
| `upcoming_deadlines[]`        | array  | Deadlines sorted by date                         |
| `asset_splits[]`              | array  | Pending split review objects                     |

---

## Edge Cases & Error States

- **No active transactions**: Table shows empty state row ("No active transactions assigned to you").
- **No activity yet**: Activity card shows "No recent activity."
- **No upcoming deadlines**: Deadlines card shows "No upcoming deadlines."
- **Stat card data unavailable**: Show "—" as value; description reads "Data unavailable."

---

## Success Criteria

1. All four stat cards display correct reference values on load.
2. The urgent alert banner displays when a closing deadline is within 7 days.
3. Asset split review cards render with correct sale price and loan amount data.
4. Clicking "Verify" on a table row opens the verification confirmation modal.
5. Quick actions navigate to their respective screens.
6. Upcoming deadlines display with correct urgency colour coding.

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, activity log, modal pattern)
- **Cross-links**: 002-transactions (View All button), 003-documents (View Documents button), 005-verification (Verify button, Manage Verifications quick action)
