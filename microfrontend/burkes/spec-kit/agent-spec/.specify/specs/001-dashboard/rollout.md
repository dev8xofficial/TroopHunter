# Rollout Plan: Dashboard (001)

## Phase 1: Data & KPIs (Week 1)
**Feature Flag**: `AGENT_DASHBOARD_V1`
- KPI aggregation endpoints (active transactions count, pending offers, monthly sales, commission)
- Activity feed API
- Dashboard data model

## Phase 2: UI (Week 2-3)
- Stat cards, quick actions, upload zone, transaction table, activity feed sidebar
- Integration with backend APIs
- Responsive layouts

## Phase 3: GA (Week 4)
- Load testing, accessibility audit, performance optimization
- Rollout: Internal QA → 5 pilot agents → All agents

## Rollback
Feature flag OFF hides Dashboard; agents land on Transactions screen instead.

## Dependencies
- 000-foundation must be GA
