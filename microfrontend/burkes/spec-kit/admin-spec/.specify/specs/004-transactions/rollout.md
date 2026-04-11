# Rollout Plan: Transactions (004)

## Phase 1: Data & API (Week 1-2)
**Feature Flag**: `ADMIN_TRANSACTIONS_V1`
- Transaction listing API with pagination, search, stage/type/status filters
- Pending approvals aggregation endpoint
- Approval/rejection endpoints with reason capture
- Transaction creation endpoint (auto-approved for admin)
- Audit log integration for transaction actions

## Phase 2: UI (Week 2-4)
- Transaction statistics grid (6 cards)
- Pending Approvals collapsible section with animated expand/collapse
- Attorney Verification approval items with approve/reject flow
- Filter bar with 12-stage dropdown, type, and status filters
- Transactions table with multi-badge columns
- Create New Transaction modal (4 sections)
- View/Edit Transaction modal with toggle
- Pagination component

## Phase 3: GA (Week 5)
- Load testing (324+ active transactions, concurrent admin sessions)
- Approval workflow end-to-end testing
- Rejection reason capture validation
- Rollout: Internal QA → 2 pilot admins → All admins/TCs

## Rollback
Feature flag OFF hides Transactions screen; transaction management via legacy system.

## Dependencies
- 000-foundation must be GA
- 002-users must be operational (agent/client references)
