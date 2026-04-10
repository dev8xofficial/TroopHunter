# Feature Specification: Agent Dashboard

**Feature ID**: 001-dashboard
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Dashboard — default landing screen

---

## Overview

The Agent Dashboard is the first screen the agent sees after logging in. It provides a real-time command-centre view of the agent's business: four KPI stat cards, a purchase agreement upload zone, active transaction table, recent activity feed, and quick-action shortcuts. The goal is that the agent can understand their full portfolio status and identify exactly what to action next — all from this single screen.

---

## Problem Statement

Without a centralised overview, agents must check multiple systems (email, MLS, spreadsheets) to piece together transaction status across their book of business. The Dashboard eliminates this by surfacing all critical status in one view, reducing context-switching and enabling the agent to prioritise work immediately upon login.

---

## Goals

- Surface the four most important KPIs as stat cards at the top of the screen.
- Provide a fast path to upload purchase agreements without navigating away.
- Display the agent's active transactions with key details and direct View actions.
- Show a live activity feed so the agent can orient after any absence.
- Provide quick-action shortcuts to the most-used workflows.

---

## Non-Goals

- The Dashboard does not display all transactions — it shows only active/recent ones. The full list is in spec 002.
- It does not show the full document library (spec 003).
- It does not host message threads (spec 005).
- Dashboard stat cards are read-only; no editing happens here.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Agent (AG) | Primary user; views all dashboard content and uses quick upload |
| Admin (TC) | May view agent dashboard in admin oversight mode |

---

## User Scenarios

### Scenario 1 — Agent Reviews Morning Dashboard

**Actor**: Agent (Sarah Anderson)
**Precondition**: Agent is authenticated; there are 8 active transactions and 3 pending offers.
**Flow**:
1. Agent lands on the Dashboard (default screen).
2. Four stat cards render: Active Transactions (8), Pending Offers (3), This Month Sales ($1.2M), Commission Earned ($36K).
3. The upload zone and transaction selector are visible for quick agreement uploads.
4. The active transactions table shows 3 in-progress deals with status badges.
5. Agent scans recent activity to see the offer accepted 2 hours ago.

**Success**: Agent has a complete picture of their pipeline status and pending items within 60 seconds.

---

### Scenario 2 — Agent Uploads a Purchase Agreement from Dashboard

**Actor**: Agent
**Precondition**: A purchase agreement PDF is ready on the agent's device.
**Flow**:
1. Agent clicks the upload zone or drags a file onto it.
2. Agent selects the target transaction from the dropdown (e.g., TRX-10247 – 123 Main Street – Smith Purchase).
3. Agent clicks "Upload Agreement."
4. The system stores the document and writes an activity event ("Agreement Uploaded – TRX-10247").
5. Recent Activity updates to show the new upload.

**Success**: Document is associated with the correct transaction; activity feed reflects the upload immediately.

---

### Scenario 3 — Agent Views a Transaction from Dashboard Table

**Actor**: Agent
**Precondition**: Active transactions table is visible with at least one row.
**Flow**:
1. Agent clicks the "View" button on the John Smith row.
2. A transaction detail modal opens showing: property address, client name, transaction type, price, current stage, status badge, and associated documents.
3. Agent clicks "Message Client" to navigate to the Messages screen.
4. Agent closes the modal by clicking ✕ or clicking outside.

**Success**: Agent can access full transaction context without leaving the dashboard; navigation buttons work correctly.

---

## Functional Requirements

### FR-01-01 — KPI Stat Cards Grid

- Four stat cards must be displayed in a responsive grid (`repeat(auto-fit, minmax(280px, 1fr))`).
- Each card has: a label (14px `neutral-600`), a large value (36px/700 `font-display` `primary-navy`), a description (13px `neutral-500`), and an emoji icon (32px, right-aligned).
- Cards must have a hover state (translateY(-4px) + `shadow-lg`).
- Reference values from agent.html:

  | Card | Label                 | Value | Description          | Icon |
  |------|-----------------------|-------|----------------------|------|
  | 1    | Active Transactions   | 8     | 2 under contract     | 🏠   |
  | 2    | Pending Offers        | 3     | Awaiting response    | 📝   |
  | 3    | This Month Sales      | $1.2M | 4 properties sold    | 💰   |
  | 4    | Commission Earned     | $36K  | This month           | 💵   |

### FR-01-02 — Purchase Agreement Upload Zone

- The upload zone must be a dashed-border card (`border: 3px dashed neutral-300`) displayed inside a white card component.
- Card title: "Upload Purchase & Sales Agreement"; subtitle: "Share agreements with title company and attorney."
- Upload zone inner label: "Click to Upload Agreement"; description: "Drag and drop or click to select PDF, DOC, or DOCX files."
- Below the upload zone: a "Select Transaction" dropdown pre-populated with all active transactions in the format `TRX-NNNNN – [Address] – [Client] [Type]`.
- Reference dropdown values:
  - TRX-10247 – 123 Main Street – Smith Purchase
  - TRX-10198 – 789 Pine Road – Williams Sale
  - TRX-10156 – 321 Elm Street – Brown Purchase
  - TRX-10155 – 555 Oak Avenue – Brown Purchase
- A full-width "Upload Agreement" `.btn-primary` button below the dropdown.
- On successful upload, write an activity event and refresh the Recent Activity widget.

### FR-01-03 — Active Transactions Table

- Displayed as a `table-container` (white card with `border-radius: 16px`, `shadow-md`).
- Table header: "Your Active Transactions"; subtitle: "Manage your client real estate deals."
- Columns: Client Name, Property Address, Transaction Type, Contract Amount, Stage, Closing Date, Status, Action.
- All stage values use `.table-status` badges (active/pending/completed).
- Action column: single "View" `.table-action-btn` button per row.
- Reference rows (3 active transactions from agent.html):

  | Client Name     | Property Address                         | Type     | Amount   | Stage                   | Closing Date | Status       |
  |-----------------|------------------------------------------|----------|----------|-------------------------|--------------|--------------|
  | John Smith      | 123 Main Street, The Woodlands, TX 77380 | Purchase | $485,000 | Attorney / Title Review | Feb 15, 2026 | Closing Soon |
  | Sarah Williams  | 789 Pine Road, The Woodlands, TX 77381   | Sale     | $389,500 | Under Contract          | Mar 1, 2026  | On Track     |
  | Michael Brown   | 789 Pine Road, The Woodlands, TX 77381   | Purchase | $512,000 | Inspection / Appraisal  | Mar 8, 2026  | Delayed      |

- "John Smith" and "Michael Brown" client name cells must use `<strong>` rendering.

### FR-01-04 — Transaction Detail Modal

- Triggered by clicking any "View" button in the dashboard table or other transaction tables.
- Modal title: property address or "Transaction Details."
- Modal sections: Status & Progress (badge + optional progress bar), Key Details (client, property, type, price, transaction ID), Documents section (list or empty state with "Upload Document" button).
- Footer buttons: "View in Transactions" (navigates to Transactions screen) and "Message Client" (navigates to Messages screen).
- Close: ✕ button in header or clicking outside modal overlay.

### FR-01-05 — Recent Activity Feed (Sidebar)

- Displayed in a white card with title "Recent Activity."
- Shows the three most recent activity log events, each as an `.activity-card` (left border 4px `primary-navy`, `neutral-50` background).
- Each event: emoji icon + title (15px/600) on the left, relative timestamp (13px `neutral-500`) on the right; description text (14px `neutral-600`) indented below.
- Reference events:
  1. ✅ Offer Accepted — 2h ago — "TRX-10247 – John Smith offer accepted at 123 Main Street"
  2. 📄 Agreement Uploaded — 5h ago — "Purchase agreement uploaded for TRX-10247 – Smith transaction"
  3. 🏡 New Listing — 1d ago — "789 Pine Road listed at $389,500 – TRX-10198 (Williams Sale)"

### FR-01-06 — Quick Actions Widget (Sidebar)

- Displayed in a white card with title "Quick Actions."
- Four action buttons displayed vertically as `.action-btn` elements (full-width, `neutral-50` background, `neutral-200` border, 2px; hover: white background, `primary-navy` border, translateX(4px)).
- Reference actions:
  1. 📤 Upload Agreement
  2. 🏡 Add New Listing
  3. 📝 Create Offer
  4. 💬 Message Clients

---

## Data & State

| Field                         | Type   | Description                                      |
|-------------------------------|--------|--------------------------------------------------|
| `stats.active_transactions`   | number | Count of non-completed transactions (ref: 8)     |
| `stats.pending_offers`        | number | Count of offers awaiting response (ref: 3)       |
| `stats.month_sales_volume`    | number | Total sales this month in USD (ref: 1,200,000)   |
| `stats.month_commission`      | number | Total commission earned this month (ref: 36,000) |
| `active_transactions[]`       | array  | List of active transaction objects (max display: 5) |
| `activity_log[]`              | array  | Latest 3 activity events for this agent          |
| `transaction_dropdown_options[]` | array | All active transaction IDs and labels           |

---

## Edge Cases & Error States

- **No active transactions**: Table shows an empty state row ("No active transactions — create your first transaction").
- **No activity yet**: Activity card shows "No recent activity."
- **Upload without transaction selected**: Validation error on "Upload Agreement" click; transaction selection is required.
- **Upload fails (server error)**: Display inline error within the upload card; do not navigate away.
- **Stat card data unavailable**: Show "—" as value; description reads "Data unavailable."

---

## Assumptions

1. The dashboard stat cards reflect real-time counts from the agent's transaction database.
2. The "Upload Agreement" on the dashboard functions identically to the document upload on the Documents screen (spec 003).
3. Quick Action buttons navigate to their respective screens; they are not standalone workflow triggers.

---

## Success Criteria

1. All four stat cards display correct reference values on load.
2. The upload zone accepts drag-and-drop and click-to-browse interactions.
3. The transaction dropdown is pre-populated with all active transactions.
4. Clicking "View" on any table row opens the transaction detail modal with correct data.
5. The modal's footer navigation buttons route to the correct screens and close the modal.
6. Recent activity feed displays the three reference events with correct relative timestamps and layout.

---

## Open Questions

1. Should the KPI stat cards be clickable (e.g., clicking "Active Transactions" navigates to Transactions page with a filter applied)?
2. Should the dashboard table be limited to 3 rows or show all active transactions with a "View All" link?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, activity log, modal pattern)
- **Cross-links**: 002-transactions (View in Transactions button), 003-documents (Upload Agreement), 005-messages (Message Client button)
