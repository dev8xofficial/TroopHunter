# Rollout Plan: Dashboard (001)

## Phase 1: Data & KPIs (Week 1)
**Feature Flag**: `ADMIN_DASHBOARD_V1`
- KPI aggregation endpoints (total users, active transactions, service partners, documents pending)
- Activity feed API (platform-wide events)
- Pending approvals count aggregation
- Dashboard data model

## Phase 2: UI (Week 2-3)
- KPI stat cards with breakdown tags
- Quick Management Access grid with gradient tiles
- Recent Platform Activity feed with action buttons
- Pending Approvals summary with Review Now buttons
- Today's Stats sidebar
- Admin Quick Actions sidebar
- Responsive layouts

## Phase 3: GA (Week 4)
- Load testing, accessibility audit, performance optimization
- Rollout: Internal QA → 2 pilot admins → All admins/TCs

## Rollback
Feature flag OFF hides Dashboard; admins land on Users screen instead.

## Dependencies
- 000-foundation must be GA
- KPI aggregation endpoints must be operational
