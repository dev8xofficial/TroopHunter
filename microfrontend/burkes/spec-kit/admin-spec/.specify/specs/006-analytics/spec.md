# Feature Specification: Analytics & Reports

**Feature ID**: 006-analytics
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Analytics — platform-wide performance metrics and reporting

---

## Overview

The Analytics & Reports screen gives administrators a comprehensive view of platform business performance: six KPI stat cards, a transaction volume chart (v1 placeholder), a revenue breakdown by transaction type with progress bars, a user growth matrix by role, a top performing partners sidebar, a 24-hour platform activity sidebar, and quick report generation buttons.

---

## Problem Statement

Without consolidated analytics, administrators cannot evaluate platform health, identify underperforming areas, or support business planning discussions. The Analytics screen surfaces the metrics that matter most for a real estate transaction platform — revenue, transaction volume, user growth, average close time, and partner performance — in one unified view.

---

## Goals

- Present six core platform KPIs with period-over-period comparison.
- Show revenue breakdown by transaction type with visual progress bars.
- Show user growth by role for the selected time period.
- Surface top performing service partners.
- Display 24-hour platform activity metrics in a sidebar.
- Provide quick access to common report generation actions.

---

## Non-Goals

- Report file generation (PDF/CSV export) is an implementation concern.
- Real-time chart rendering is deferred; the chart area is a v1 placeholder.
- Agent-level performance comparisons (individual agent analytics) are a separate admin concern.

---

## Actors

| Actor              | Role in This Feature                            |
| ------------------ | ----------------------------------------------- |
| Administrator (TC) | Views all platform analytics; generates reports |

---

## User Scenarios

### Scenario 1 — Admin Reviews Quarterly Performance

**Actor**: Administrator
**Precondition**: Admin has selected "Last 90 Days" time period.
**Flow**:

1. Admin navigates to Analytics.
2. Six KPI cards render with current values and period-over-period changes.
3. Admin reads: Total Revenue $3.2M (+23.5%), Closed Transactions 147 (+18.2%).
4. Admin scrolls to Revenue Breakdown: Purchase transactions dominate at 56.2%.
5. Admin checks User Growth: New Users 284, up 31.4%.

**Success**: Admin understands full platform performance for the period within 60 seconds.

---

### Scenario 2 — Admin Generates a Monthly Summary Report

**Actor**: Administrator
**Flow**:

1. Admin clicks "Monthly Summary" in the Generate Reports sidebar.
2. Report is generated and made available for download.

**Success**: Report is delivered; admin can share with stakeholders.

---

## Functional Requirements

### FR-06-01 — Page Header with Time Period Selector

- Title: "Analytics & Reports."
- Subtitle: "Platform performance metrics and insights."
- **Time Period Selector** (right-aligned select): Last 7 Days, Last 30 Days, Last 90 Days (default selected), Last Year, All Time.
- Layout: `display: flex; justify-content: space-between; margin-bottom: 24px`.

### FR-06-02 — KPI Stat Cards Grid

- Six stat cards in `repeat(auto-fit, minmax(280px, 1fr))`.

**Reference KPI Cards (Last 90 Days)**:

| Card | Label                 | Value   | Period Change          | Icon |
| ---- | --------------------- | ------- | ---------------------- | ---- |
| 1    | Total Revenue         | $3.2M   | ↑ 23.5% vs last period | 💰   |
| 2    | Closed Transactions   | 147     | ↑ 18.2% vs last period | ✅   |
| 3    | Avg Transaction Value | $412K   | ↑ 5.8% vs last period  | 📈   |
| 4    | New Users (90 days)   | 284     | ↑ 31.4% vs last period | 👥   |
| 5    | Avg Close Time        | 42 days | ↓ 12.5% vs last period | ⏱️   |
| 6    | Partner Referrals     | 523     | ↑ 45.3% vs last period | 🤝   |

- Period change text: `color: success-green` for all items (positive or improvement).

### FR-06-03 — Transaction Volume Chart Card

- Card with title "Transaction Volume Over Time" and subtitle "Monthly transaction trends (Last 12 months)."
- Body: `neutral-50` background, `border-radius: 12px`, `padding: 32px`, `min-height: 320px`, centred placeholder.
- Placeholder: 📊 icon (64px) + "Chart Visualization" (16px/600) + "Line chart showing monthly transaction volume trends" (14px `neutral-500`).
- This is a v1 placeholder; chart rendering is deferred.

### FR-06-04 — Revenue Breakdown Card

- Card with title "Revenue by Transaction Type" and subtitle "Revenue distribution across different transaction categories."
- Three breakdown rows in a `display: grid; gap: 16px` container.
- Each row: `neutral-50` background, `border-radius: 8px`, `padding: 20px`.
  - Top: emoji + title (16px/600 `primary-navy`) + transaction count (13px `neutral-600`) — left; revenue amount (20px/700 `primary-navy`) + share % (12px `success-green`/600) — right.
  - Progress bar: `neutral-200` background, `height: 8px`, `border-radius: 4px`; fill: gradient, width = share %.

**Reference Revenue Breakdown**:

| Type         | Title                  | Transactions | Revenue | Share | Bar Gradient        |
| ------------ | ---------------------- | ------------ | ------- | ----- | ------------------- |
| Purchase 🏠  | Purchase Transactions  | 68           | $1.8M   | 56.2% | `#2563eb → #3b82f6` |
| Sale 🏘️      | Sale Transactions      | 53           | $1.1M   | 34.4% | `#d97706 → #f59e0b` |
| Refinance 💰 | Refinance Transactions | 26           | $300K   | 9.4%  | `#16a34a → #10b981` |

### FR-06-05 — User Growth by Role Card

- Card with title "User Growth by Role" and subtitle "New user registrations over the last 90 days."
- `grid-template-columns: repeat(3, 1fr); gap: 16px`.
- Each role cell: `neutral-50` background, `border-radius: 8px`, `padding: 20px`, `text-align: center`.
  - Emoji (32px) + count (24px/700 `primary-navy`) + role label (13px `neutral-600`) + growth % (12px `success-green`/600 with ↑ arrow).

**Reference User Growth**:

| Role      | Icon | New Users | Growth |
| --------- | ---- | --------- | ------ |
| Clients   | 🏠   | 124       | ↑ 35%  |
| Attorneys | ⚖️   | 47        | ↑ 28%  |
| CPAs      | 💼   | 31        | ↑ 42%  |
| Agents    | 🏡   | 52        | ↑ 18%  |
| Lenders   | 🏦   | 19        | ↑ 52%  |
| Partners  | 🤝   | 11        | ↑ 22%  |

### FR-06-06 — Top Performing Partners Sidebar Card

- Card with title "Top Performing Partners."
- Three `.activity-card` items (`neutral-50`, `border-radius: 10px`, `padding: 16px`).
- Each item: partner name (16px/700 `primary-navy`, left) + star rating (right, `primary-gold`); referrals count below (13px `neutral-600`).

**Reference Partners**:

| Partner                   | Rating | Referrals              |
| ------------------------- | ------ | ---------------------- |
| Premium Roofing Solutions | ⭐ 4.9 | 89 referrals completed |
| Elite Plumbing Services   | ⭐ 4.8 | 76 referrals completed |
| Credit Solutions Plus     | ⭐ 5.0 | 64 referrals completed |

### FR-06-07 — Platform Activity (24h) Sidebar Card

- Card with title "Platform Activity (24h)."
- Four data rows, each: label (13px `neutral-600`, left) + value (13px/600 `primary-navy` or `success-green`, right); separated by 1px `neutral-200` bottom border.

**Reference 24h Activity**:

| Metric             | Value | Text Colour     |
| ------------------ | ----- | --------------- |
| Active Users       | 847   | `primary-navy`  |
| Documents Uploaded | 142   | `primary-navy`  |
| New Transactions   | 8     | `success-green` |
| Partner Referrals  | 23    | `primary-navy`  |

### FR-06-08 — Generate Reports Sidebar Card

- Card with title "Generate Reports."
- Six `.action-btn` buttons (full-width, icon + label).

**Reference Report Buttons**:

| Icon | Label               |
| ---- | ------------------- |
| 📊   | Monthly Summary     |
| 💰   | Revenue Report      |
| 👥   | User Growth         |
| 📋   | Transaction Report  |
| 🤝   | Partner Performance |
| 📈   | Custom Report       |

---

## Data & State

| Field                        | Type   | Description                              |
| ---------------------------- | ------ | ---------------------------------------- |
| `selected_period`            | string | `7d`, `30d`, `90d`, `1y`, `all`          |
| `kpis.total_revenue`         | number | Total revenue in USD (ref: 3,200,000)    |
| `kpis.revenue_change_pct`    | number | Period-over-period change (ref: 23.5)    |
| `kpis.closed_transactions`   | number | Count of closed transactions (ref: 147)  |
| `kpis.closed_change_pct`     | number | Period-over-period change (ref: 18.2)    |
| `kpis.avg_transaction_value` | number | Average transaction value (ref: 412,000) |
| `kpis.avg_value_change_pct`  | number | Period-over-period change (ref: 5.8)     |
| `kpis.new_users`             | number | New users in period (ref: 284)           |
| `kpis.new_users_change_pct`  | number | Period-over-period change (ref: 31.4)    |
| `kpis.avg_close_time_days`   | number | Average close time in days (ref: 42)     |
| `kpis.avg_close_change_pct`  | number | Improvement vs last period (ref: -12.5)  |
| `kpis.partner_referrals`     | number | Total referrals in period (ref: 523)     |
| `revenue_breakdown[]`        | array  | Revenue split by transaction type        |
| `user_growth[]`              | array  | New user counts by role                  |
| `top_partners[]`             | array  | Top 3 partners by referral count         |
| `activity_24h`               | object | 24-hour operational counts               |

---

## Edge Cases & Error States

- **No data for selected period**: KPI cards show "—"; revenue breakdown shows "No data available."
- **Chart placeholder always visible in v1**: Never replaced with real data until chart library is integrated.
- **Report generation fails**: Show inline error on the button; retry option.
- **Partner data unavailable**: Top Partners section shows "Partner data is loading."

---

## Success Criteria

1. All 6 KPI stat cards render with exact reference values and period-change percentages in `success-green`.
2. Revenue breakdown shows 3 rows with correct transaction counts, revenue amounts, share percentages, and gradient-coloured progress bars at correct widths (56.2%, 34.4%, 9.4%).
3. User growth grid shows 6 role cells with correct new-user counts and growth percentages.
4. Top Performing Partners sidebar shows 3 partners with correct names, ratings, and referral counts.
5. Platform Activity (24h) sidebar shows 4 metrics with correct values; "8 New Transactions" renders in `success-green`.
6. Generate Reports sidebar shows all 6 report buttons with correct icons and labels.
7. Time Period Selector defaults to "Last 90 Days."

---

## Open Questions

1. When a time period is changed, should all data on the page update simultaneously or sequentially?
2. Should "Custom Report" open a configuration modal or route to a dedicated report builder screen?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, card pattern, stat card pattern)
- **Supplies data to**: No downstream screens depend on this screen's data
