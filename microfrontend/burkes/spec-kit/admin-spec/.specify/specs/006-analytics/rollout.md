# Rollout Plan: Analytics (006)

## Phase 1: Data Aggregation (Week 1-2)
**Feature Flag**: `ADMIN_ANALYTICS_V1`
- KPI aggregation endpoints (revenue, transactions, users, close time, referrals)
- Revenue breakdown by transaction type
- User growth by role aggregation
- Top partners by referral count
- 24-hour activity counters
- Time period parameterized queries

## Phase 2: UI (Week 3-4)
- Time Period Selector component
- KPI stat cards with period-over-period change indicators
- Transaction Volume Chart placeholder
- Revenue Breakdown card with gradient progress bars
- User Growth by Role grid
- Top Performing Partners sidebar
- Platform Activity (24h) sidebar
- Generate Reports sidebar with 6 buttons
- Report generation integration

## Phase 3: GA (Week 5)
- Load testing (aggregation queries under peak load)
- Data accuracy validation against raw transaction data
- Time period switching performance testing
- Rollout: Internal QA → 2 pilot admins → All admins/TCs

## Rollback
Feature flag OFF hides Analytics screen; reporting via legacy system.

## Dependencies
- 000-foundation must be GA
- 002-users, 003-partners, 004-transactions must be operational (data sources)
