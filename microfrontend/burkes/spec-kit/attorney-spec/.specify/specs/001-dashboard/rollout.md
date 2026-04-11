# Rollout Plan: Dashboard (001)

## Phase 1: Data & KPIs (Week 1)
**Feature Flag**: `ATTORNEY_DASHBOARD_V1`
- KPI aggregation endpoints
- Activity feed API
- Dashboard data model

## Phase 2: UI (Week 2-3)
- Stat cards, alert banner, asset split cards, transaction table
- Activity feed sidebar, quick actions, deadlines
- Responsive layouts

## Phase 3: GA (Week 4)
- Load testing, accessibility audit
- Rollout: Internal QA -> 2 pilot attorneys -> All attorneys

## Rollback
Feature flag OFF hides Dashboard; attorneys land on Transactions screen.

## Dependencies
- 000-foundation must be GA
