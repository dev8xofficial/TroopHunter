# Feature Specification: Admin Dashboard

**Feature ID**: 001-dashboard
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Dashboard — default admin landing screen

---

## Overview

The Admin Dashboard is the first screen the administrator sees after logging in. It provides a real-time command-centre view of the entire platform: four KPI stat cards, a Quick Management Access panel linking to all entity types, a Recent Platform Activity feed, a Pending Approvals summary, a Today's Stats sidebar, and quick Admin Action buttons. The goal is that the admin can understand the full platform health and identify exactly what requires action — all within 30 seconds.

---

## Problem Statement

Without a centralised admin overview, platform administrators must navigate individually to each section to discover pending registrations, document approvals, partner applications, or transaction issues. The Dashboard eliminates this by surfacing all critical action items in one unified view, enabling the admin to triage work immediately upon login.

---

## Goals

- Surface the four most critical platform KPIs as stat cards.
- Provide a Quick Management Access grid linking to all key entity management areas.
- Display recent platform-wide activity with actionable buttons.
- Summarise pending approvals by category (documents, partners, users).
- Provide a sidebar with today's operational stats and quick admin actions.

---

## Non-Goals

- The Dashboard does not show full entity lists — those live in their respective screens (002–006).
- Individual entity detail management does not happen on the Dashboard.
- The Dashboard is read-optimised; all mutations happen in dedicated screens or modals.

---

## Actors

| Actor              | Role in This Feature                                                |
| ------------------ | ------------------------------------------------------------------- |
| Administrator (TC) | Primary user; views all dashboard content and acts on quick actions |

---

## User Scenarios

### Scenario 1 — Admin Reviews Morning Platform Status

**Actor**: Administrator (Sarah Burke)
**Precondition**: Admin is authenticated; platform has 1,247 users, 324 active transactions, 47 pending documents.
**Flow**:

1. Admin lands on Dashboard (default screen).
2. Four KPI stat cards render: Total Users (1,247), Active Transactions (324), Service Partners (156), Documents Pending (47).
3. Quick Management Access grid shows all four entity categories with live counts.
4. Recent Activity shows four most recent platform events with action buttons.
5. Pending Approvals section highlights 8 urgent documents, 15 partner applications, 24 user registrations.

**Success**: Admin has complete platform situational awareness within 30 seconds.

---

### Scenario 2 — Admin Approves a Pending User from Dashboard

**Actor**: Administrator
**Precondition**: Lisa Anderson has registered and appears in Recent Activity.
**Flow**:

1. Admin sees "New User Registration: Lisa Anderson" in the Recent Activity section.
2. Admin clicks "Approve Account" button.
3. Account is approved; activity feed updates; audit log records the action.

**Success**: Admin can approve a user without navigating away from the Dashboard.

---

### Scenario 3 — Admin Navigates to Pending Partner Review

**Actor**: Administrator
**Precondition**: ABC Plumbing Co. has applied and appears in Recent Activity.
**Flow**:

1. Admin sees "New Service Partner Application: ABC Plumbing Co." in Recent Activity.
2. Admin clicks "Review Application."
3. Admin is routed to the Partners screen with the ABC Plumbing Co. record highlighted.

**Success**: Admin can navigate directly to the pending partner record in one click.

---

## Functional Requirements

### FR-01-01 — KPI Stat Cards Grid

- Four stat cards in `repeat(auto-fit, minmax(280px, 1fr))` grid with `gap: 24px`.
- Each card: label (14px `neutral-600`), value (36px/700 `font-display` `primary-navy`), description (13px `neutral-500`), emoji icon (42px, right-aligned).
- Cards have hover state (translateY(-4px) + `shadow-lg`).
- Breakdown tags appear below the value on relevant cards.

**Reference KPI Cards**:

| Card | Label               | Value | Description           | Icon | Breakdown Tags                           |
| ---- | ------------------- | ----- | --------------------- | ---- | ---------------------------------------- |
| 1    | Total Users         | 1,247 | +47 this month        | 👥   | Clients: 856 · Attorneys: 142 · CPAs: 89 |
| 2    | Active Transactions | 324   | Across all clients    | 📋   | 89 Closing Soon · 12 Delayed             |
| 3    | Service Partners    | 156   | Across all categories | 🤝   | 42 Plumbing · 38 Roofing · 35 Electrical |
| 4    | Documents Pending   | 47    | Awaiting approval     | 📄   | 8 Urgent · 39 Standard                   |

### FR-01-02 — Quick Management Access Grid

- A card with title "Quick Management Access" and subtitle "Manage key areas of your platform."
- Body: `grid-template-columns: repeat(4, 1fr)`, `gap: 16px`.
- Four gradient tiles, each with: large emoji, title, description, count (large/bold), label (small).
- Each tile has a hover state (translateY(-4px)) and a `cursor: pointer`.

**Reference Quick Management Tiles**:

| Tile             | Gradient            | Icon | Title            | Description                                 | Count | Label              |
| ---------------- | ------------------- | ---- | ---------------- | ------------------------------------------- | ----- | ------------------ |
| Service Partners | `#f59e0b → #d97706` | 🤝   | Service Partners | Manage plumbing, roofing, electrical & more | 156   | Total Partners     |
| Agents & Lenders | `#3b82f6 → #2563eb` | 🏡   | Agents & Lenders | Real estate agents & mortgage lenders       | 89    | Active Agents      |
| Attorneys        | `#8b5cf6 → #7c3aed` | ⚖️   | Attorneys        | Closing & divorce attorneys                 | 142   | Licensed Attorneys |
| CPAs             | `#10b981 → #059669` | 💼   | CPAs             | Certified public accountants                | 89    | Registered CPAs    |

### FR-01-03 — Recent Platform Activity Feed

- A card with title "Recent Platform Activity" and subtitle "Latest actions across all portals."
- Each activity item rendered as a `.document-item` (white, `border: 1px solid neutral-200`, `border-radius: 12px`, `padding: 20px`).
- Item structure: document name (15px/600 `primary-navy`), meta row (email, timestamp), status badge (right-aligned), action buttons row below.

**Reference Activity Items**:

| Event                                                      | Meta                                                | Status           | Actions                                             |
| ---------------------------------------------------------- | --------------------------------------------------- | ---------------- | --------------------------------------------------- |
| 👤 New User Registration: Lisa Anderson (Client Portal)    | jennifer.martinez@email.com · 5 min ago             | Action Required  | Approve Account · View Details · Send Welcome Email |
| 📄 Document Uploaded: Purchase Agreement – 123 Main Street | By: Sarah Anderson (Agent) · TRX-10247 · 22 min ago | Pending Review   | Review Document · View Transaction                  |
| 🤝 New Service Partner Application: ABC Plumbing Co.       | Service Areas: 77380, 77381, 77382 · 1h ago         | Pending Approval | Review Application · Contact Partner · View License |
| ✅ Transaction Completed: 654 Maple Drive – TRX-10089      | $467,500 · 3h ago                                   | Completed        | —                                                   |

### FR-01-04 — Pending Approvals Summary

- A card with title "Pending Approvals" and subtitle "Documents and requests awaiting your review."
- Three stat blocks in `grid-template-columns: repeat(3, 1fr)`, `gap: 16px`.
- Each block: count (32px/700 coloured), label (14px `neutral-600`), "Review Now" `.btn-primary` button (full width, 8px padding, 13px font).

**Reference Approval Blocks**:

| Count | Label                | Border Colour    | Text Colour      |
| ----- | -------------------- | ---------------- | ---------------- |
| 8     | Urgent Documents     | `error-red`      | `error-red`      |
| 15    | Partner Applications | `warning-orange` | `warning-orange` |
| 24    | User Registrations   | `accent-blue`    | `accent-blue`    |

### FR-01-05 — Today's Stats Sidebar Card

- A sidebar card with title "Today's Stats."
- Three `.activity-card` items (`neutral-50` background, `border-radius: 10px`, `padding: 16px`).
- Each item: label (13px `neutral-600`), count (24px/700 `primary-navy`), emoji icon (32px, right-aligned).

**Reference Today's Stats**:

| Metric              | Count | Icon |
| ------------------- | ----- | ---- |
| New Users           | 12    | 👥   |
| Documents Processed | 87    | 📄   |
| Transactions Closed | 5     | ✅   |

### FR-01-06 — Admin Quick Actions Sidebar

- A sidebar card with title "Admin Actions."
- Two `.action-btn` buttons (full-width, flex row with icon + label).

**Reference Quick Actions**:

| Icon | Label               |
| ---- | ------------------- |
| ➕   | Add New User        |
| 🤝   | Add Service Partner |

---

## Data & State

| Field                                    | Type   | Description                                   |
| ---------------------------------------- | ------ | --------------------------------------------- |
| `kpis.total_users`                       | number | 1,247                                         |
| `kpis.user_breakdown`                    | object | `{clients: 856, attorneys: 142, cpas: 89}`    |
| `kpis.active_transactions`               | number | 324                                           |
| `kpis.transaction_breakdown`             | object | `{closing_soon: 89, delayed: 12}`             |
| `kpis.service_partners`                  | number | 156                                           |
| `kpis.partner_breakdown`                 | object | `{plumbing: 42, roofing: 38, electrical: 35}` |
| `kpis.documents_pending`                 | number | 47                                            |
| `kpis.document_breakdown`                | object | `{urgent: 8, standard: 39}`                   |
| `pending_approvals.urgent_documents`     | number | 8                                             |
| `pending_approvals.partner_applications` | number | 15                                            |
| `pending_approvals.user_registrations`   | number | 24                                            |
| `today_stats.new_users`                  | number | 12                                            |
| `today_stats.docs_processed`             | number | 87                                            |
| `today_stats.transactions_closed`        | number | 5                                             |
| `activity_feed[]`                        | array  | Latest platform activity events               |

---

## Edge Cases & Error States

- **No pending approvals**: Approval summary shows all zeros; "All clear!" message below.
- **No recent activity**: Activity feed shows "No recent platform activity."
- **KPI data unavailable**: Show "—" as value; description reads "Data unavailable."
- **Approve action fails (server error)**: Inline error in activity item; retry button available.

---

## Success Criteria

1. All four KPI stat cards display correct reference values with breakdown tags.
2. Quick Management Access grid renders all four tiles with correct gradients, counts, and labels.
3. All four reference activity items render with correct status badges and action buttons.
4. Pending Approvals shows three blocks with correct counts and border colours.
5. Today's Stats sidebar shows three items with correct counts and icons.
6. Admin Quick Actions shows two buttons ("Add New User", "Add Service Partner").

---

## Open Questions

1. Should clicking a Quick Management Access tile navigate directly to the corresponding screen or open a summary modal?
2. Should the "Review Now" buttons in Pending Approvals navigate to the respective screen with filters pre-applied?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, badge system, card pattern)
- **Cross-links**: 002-users (Add New User, User Registrations), 003-partners (Add Service Partner, Partner Applications), 004-transactions (Transactions), 005-documents (Urgent Documents)
