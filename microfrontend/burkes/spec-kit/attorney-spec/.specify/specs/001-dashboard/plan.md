# Implementation Plan: Attorney Dashboard

**Feature ID**: 001-dashboard
**Spec**: [spec.md](./spec.md)
**Status**: Approved
**Created**: 2026-04-12
**Estimated Effort**: M

---

## Summary

The Dashboard is the default landing screen. Implementation delivers seven UI regions: four KPI stat cards, an urgent closing alert, asset split review cards, a client transactions table, a recent activity feed, a quick-actions widget, and an upcoming deadlines widget. All content is driven by the attorney's session context and transaction data.

---

## Architecture Overview

### Components

| Component | Responsibility | New / Modified / Existing |
|-----------|---------------|--------------------------|
| KPI Stat Cards Grid | Four read-only cards showing aggregate attorney metrics | New |
| Urgent Closing Alert | Warning banner triggered when a deadline is ≤ 7 days away | New |
| Asset Split Review Cards | Pending split items with verify/flag/view-documents actions | New |
| Client Transactions Table | Filterable table of active transactions with inline actions | New |
| Activity Feed | Real-time list of the 4 most recent activity events | New |
| Quick Actions Widget | Four shortcuts to high-frequency workflows | New |
| Upcoming Deadlines Widget | Three deadlines with urgency colour coding | New |
| Verify Confirm Modal | Confirmation dialog for verifying amounts from Dashboard | Modified (shared) |

---

## Implementation Phases

### Phase 1 — Static Layout and Data Binding

**Goal**: Render all seven Dashboard regions with reference data from the constitution.
**Dependencies**: 000-foundation complete (tokens, session context, nav, modal system).

#### Tasks

- [ ] Build Dashboard screen container inside the Foundation layout shell
- [ ] Render KPI Stat Cards grid (4 cards, reference values from constitution §10)
- [ ] Render Urgent Closing Alert banner with reference transaction details
- [ ] Render Asset Split Review cards (2 cards) with reference data
- [ ] Render Client Transactions Table with 3 reference rows (Smith, Williams, Brown)
- [ ] Render Activity Feed with 4 seed events from Foundation activity log
- [ ] Render Quick Actions widget with 4 action buttons
- [ ] Render Upcoming Deadlines widget with 3 deadlines and urgency borders

**Exit Criteria**: All seven regions render with correct reference values on Dashboard load; no placeholder content remains.

---

### Phase 2 — Interactions and Live Data

**Goal**: Wire all interactive elements: verify action from table row, split review actions, quick action navigation, and activity feed live updates.
**Dependencies**: Phase 1 complete.

#### Tasks

- [ ] Wire "Verify" table row button → opens Verify Confirm modal (Foundation modal system)
- [ ] Wire "Review Now" alert button → navigates to Verification screen
- [ ] Wire "✅ Verify Amounts" on split card → opens Verify Confirm modal
- [ ] Wire "🚩 Flag" on split card → opens Flag Discrepancy modal
- [ ] Wire "👁 View Documents" on split card → navigates to Documents screen
- [ ] Wire "View All" transactions button → navigates to Transactions screen
- [ ] Wire Quick Actions: Review Transactions → Transactions, Manage Verifications → Verification, View All Documents → Documents, Generate Reports → Report modal
- [ ] Subscribe activity feed to Foundation activity log (auto-updates when new events are written)
- [ ] Update stat cards on verification completion (pending count decrements)

**Exit Criteria**: All buttons navigate or open the correct target; activity feed shows new events within the current session without page refresh.

---

### Phase 3 — Edge Cases and Responsive Polish

**Goal**: Implement empty states, error states, and responsive layout behaviour.
**Dependencies**: Phase 2 complete.

#### Tasks

- [ ] Empty state for transactions table: "No active transactions assigned to you."
- [ ] Empty state for activity feed: "No recent activity."
- [ ] Empty state for upcoming deadlines: "No upcoming deadlines."
- [ ] Stat card data unavailable: show "—" as value
- [ ] Validate 4-column stat grid collapses to 2-column at 768–1199px and single-column at <768px
- [ ] Validate split cards and table are readable at all breakpoints

**Exit Criteria**: All edge cases render without layout breakage; responsive validation passes at all three breakpoints.

---

## Data Design

### New Data Structures

| Entity | Key Fields | Purpose |
|--------|-----------|---------|
| DashboardStats | activeTransactions, pendingVerification, assetSplits, totalValueManaged | Aggregate KPI values displayed in stat cards |
| AssetSplitCard | transactionId, clientName, property, salePrice, loanAmount, closingDate, status | Single asset split item for review |
| DeadlineItem | label, property, date, urgency (urgent/soon/comfortable) | Single upcoming deadline |

---

## Integration Points

| System | Direction | Purpose | Notes |
|--------|-----------|---------|-------|
| Transaction API | Inbound | Load active transactions and KPI aggregates | Scoped to assigned transaction IDs |
| Activity Log | Inbound | Populate activity feed with recent events | Use Foundation feed reader |
| Verification API | Outbound | Submit verification on "Confirm & Sign" | Handled via shared Verify Confirm modal |

---

## Security & Access Control

- Dashboard data is filtered server-side to the attorney's assigned transaction IDs — no client-side filtering only.
- KPI aggregates must reflect only AT-assigned transactions, never global data.
- Verify and Flag actions enforce AT role authorization server-side.

---

## Testing Strategy

### Acceptance Tests

| Success Criterion | Test Approach |
|-------------------|--------------| 
| All four stat cards display correct reference values | Assert card values against reference data |
| Urgent alert renders when closing is ≤ 7 days away | Set reference date within 7 days; assert banner visible |
| Clicking Verify opens confirmation modal | Click Verify on Smith row; assert modal present |
| Quick actions navigate to correct screens | Click each; assert nav active state |
| Upcoming deadlines show correct urgency colours | Assert border colour class per urgency level |

---

## Rollout & Observability

- **Feature flag**: No — Dashboard is the default landing screen
- **Rollout strategy**: Releases with Foundation (prerequisite)
- **Key metrics**: Dashboard load time p95 < 2s, stat card data error rate, activity feed update latency
- **Rollback plan**: Revert to previous build; no data owned by Dashboard

---

## Open Questions

1. Should stat card KPI aggregates be pre-computed by the backend or calculated client-side?
2. What is the auto-refresh interval for the Dashboard (stat cards, activity feed)?
