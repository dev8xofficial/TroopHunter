# Feature Specification: Reports & Analytics

**Feature ID**: 008-reports
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Reports — performance analytics and business intelligence

---

## Overview

The Reports screen gives the agent a comprehensive view of their business performance: four YTD KPI stat cards, a monthly sales performance chart placeholder, a transaction pipeline funnel, geographic performance rankings with progress bars, and quick-access report generation buttons. This screen is read-only and data-driven, allowing agents to understand their business health at a glance.

---

## Problem Statement

Agents need to understand their own business performance — how much volume they've closed, what their commission income is, how quickly deals close, and which geographic markets are strongest. Without consolidated analytics, agents have no basis for business planning, coaching conversations, or goal-setting.

---

## Goals

- Present four core YTD performance KPIs clearly.
- Provide a transaction pipeline funnel showing deal counts at each stage.
- Show geographic area performance with comparative progress bars.
- Provide quick-access buttons to generate common reports.
- Reserve a chart area for monthly sales volume visualisation (placeholder in v1).

---

## Non-Goals

- Report generation (PDF export, email delivery) is an implementation concern.
- Real-time chart rendering (the chart area is a v1 placeholder).
- Comparative data vs. other agents is an admin-only report type.
- Client satisfaction data collection is not managed here.

---

## Actors

| Actor      | Role in This Feature                                   |
| ---------- | ------------------------------------------------------ |
| Agent (AG) | Views own performance analytics; generates own reports |
| Admin (TC) | Can view all-agent reporting (admin mode)              |

---

## User Scenarios

### Scenario 1 — Agent Reviews YTD Performance

**Actor**: Agent
**Precondition**: Agent has closed 18 properties YTD.
**Flow**:

1. Agent navigates to Reports.
2. Four KPI stat cards render: Total Sales ($5.2M), Total Commission ($156K), Avg. Days to Close (42), Client Satisfaction (4.9).
3. Agent reads the commission card: "$156K — +23% from last year."
4. Agent checks the pipeline funnel: Closing Prep has 4 deals.

**Success**: Agent understands their full YTD performance in under 60 seconds.

---

### Scenario 2 — Agent Identifies Top Geographic Market

**Actor**: Agent
**Precondition**: Three geographic areas are tracked.
**Flow**:

1. Agent scrolls to "Top Performing Areas."
2. The Woodlands, TX leads at $1.8M (90% bar); Spring, TX is second at $1.2M (70%); Conroe/Tomball is third at $950K (55%).
3. Agent notes The Woodlands dominates and plans to focus marketing there.

**Success**: Agent can identify their best market in one glance.

---

## Functional Requirements

### FR-08-01 — KPI Stat Cards Grid

- Same four-card grid pattern as 001-dashboard (FR-01-01), `repeat(auto-fit, minmax(280px, 1fr))`.
- Same card structure: label, value, description, emoji icon.

**Reference YTD KPI Cards (from agent.html)**:

| Card | Label               | Value | Description           | Icon |
| ---- | ------------------- | ----- | --------------------- | ---- |
| 1    | Total Sales (YTD)   | $5.2M | 18 properties closed  | 💰   |
| 2    | Total Commission    | $156K | +23% from last year   | 💵   |
| 3    | Avg. Days to Close  | 42    | 5 days faster than Q4 | 📊   |
| 4    | Client Satisfaction | 4.9   | Based on 47 reviews   | ⭐   |

### FR-08-02 — Monthly Sales Performance Card

- White card with title "Monthly Sales Performance" and subtitle "Sales volume by month."
- Body: `padding: 40px`, `text-align: center`, `color: neutral-500`.
- Placeholder content: "📈 Chart visualization would appear here."
- This is a v1 placeholder; the chart rendering implementation is deferred.

### FR-08-03 — Transaction Pipeline Funnel Card

- White card with title "Transaction Pipeline" and subtitle "Current status of active deals."
- Five pipeline stage rows, each rendered as a `neutral-50` background rounded card (`padding: 16px`, `border-radius: 10px`).
- Row structure: stage name (16px/600 `neutral-800`) + stage description (14px `neutral-600`) on the left; count (24px/700 `primary-navy`) on the right.

**Reference Pipeline Rows (from agent.html)**:

| Stage Name      | Description                   | Count |
| --------------- | ----------------------------- | ----- |
| Initial Contact | Prospecting & Lead Generation | 12    |
| Property Search | Active house hunting          | 6     |
| Offer Stage     | Negotiations in progress      | 3     |
| Under Contract  | Due diligence & inspection    | 2     |
| Closing Prep    | Final documentation           | 4     |

### FR-08-04 — Quick Reports Widget (Sidebar)

- White card with title "Quick Reports."
- Five action buttons displayed vertically as `.action-btn` elements (same pattern as 001 Quick Actions).

**Reference Quick Report Buttons**:

| Icon | Label             |
| ---- | ----------------- |
| 📄   | Monthly Summary   |
| 📊   | YTD Performance   |
| 💰   | Commission Report |
| 👥   | Client List       |
| 🏠   | Property Report   |

### FR-08-05 — Top Performing Areas Card (Sidebar)

- White card with title "Top Performing Areas."
- Three area rows, each in a `neutral-50` background `border-radius: 8px` container (`padding: 12px`).
- Row structure:
  - Top line: area name (16px/600) left; sales volume (16px/700 `primary-navy`) right.
  - Progress bar below: `.progress-bar` (full width, `height: 8px`, `neutral-200` background, `border-radius: 4px`) with `.progress-fill` (gradient from `success-green` to `primary-navy`).

**Reference Area Rows (from agent.html)**:

| Area                 | Sales Volume | Progress Bar Width |
| -------------------- | ------------ | ------------------ |
| The Woodlands, TX    | $1.8M        | 90%                |
| Spring, TX           | $1.2M        | 70%                |
| Conroe / Tomball, TX | $950K        | 55%                |

Progress bar gradient: `linear-gradient(90deg, success-green, primary-navy)`.

---

## Data & State

| Field                            | Type   | Description                                    |
| -------------------------------- | ------ | ---------------------------------------------- |
| `ytd.total_sales_volume`         | number | Total closed sales volume YTD (ref: 5,200,000) |
| `ytd.properties_closed`          | number | Count of closed transactions YTD (ref: 18)     |
| `ytd.total_commission`           | number | Total commission earned YTD (ref: 156,000)     |
| `ytd.commission_growth_pct`      | number | YoY commission growth percentage (ref: 23)     |
| `ytd.avg_days_to_close`          | number | Average days from offer to close (ref: 42)     |
| `ytd.days_faster_than_q4`        | number | Days improvement vs Q4 (ref: 5)                |
| `ytd.client_satisfaction_rating` | number | Average client satisfaction rating (ref: 4.9)  |
| `ytd.review_count`               | number | Total reviews used for rating (ref: 47)        |
| `pipeline[]`                     | array  | Deal count per pipeline stage                  |
| `areas[]`                        | array  | Geographic area performance data               |
| `area.name`                      | string | Display name of geographic area                |
| `area.sales_volume`              | number | Total sales volume in USD                      |
| `area.progress_pct`              | number | Progress bar width percentage (0–100)          |

---

## Edge Cases & Error States

- **No transactions yet (new agent)**: All KPI cards show "—" or "0"; pipeline shows all zeros; areas show empty state.
- **YoY commission growth cannot be calculated (first year)**: Commission card description shows "First full year" instead of "+23%."
- **Client satisfaction from 0 reviews**: Show "No reviews yet" instead of a rating number.
- **Quick Report button clicked**: Implementation-defined; at minimum, show a "Coming soon" notification or trigger a download.

---

## Success Criteria

1. All 4 YTD KPI stat cards render with exact reference values, descriptions, and icons.
2. The chart placeholder card renders with the correct placeholder text.
3. All 5 pipeline stage rows render with correct stage names, descriptions, and counts.
4. All 5 quick report buttons render with correct emoji icons and labels.
5. All 3 geographic area rows render with correct names, volumes, and progress bar widths (90%, 70%, 55%).
6. Progress bar fill uses the `success-green → primary-navy` gradient.

---

## Open Questions

1. When an agent clicks a Quick Report button (e.g., "Commission Report"), should it trigger a modal, navigate to a sub-view, or initiate a file download?
2. Should the monthly sales chart display real data in v1 (e.g., using a charting library) or remain a placeholder?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, stat card pattern, progress bar pattern)
- **Supplies data to**: No downstream specs depend on this screen's data
