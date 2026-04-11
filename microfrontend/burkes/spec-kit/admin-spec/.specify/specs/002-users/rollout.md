# Rollout Plan: Users (002)

## Phase 1: Data & API (Week 1)
**Feature Flag**: `ADMIN_USERS_V1`
- User listing API with pagination, search, role/status filters
- User creation endpoint with role-based permission assignment
- User approval/suspension endpoints
- Audit log integration for user actions

## Phase 2: UI (Week 2-3)
- User statistics grid (6 cards)
- Filter bar with search, role, and status dropdowns
- Users table with avatars, badges, and action buttons
- Add New User modal with role-adaptive sections
- View/Edit User modal with toggle
- Password auto-generate component
- Pagination component

## Phase 3: GA (Week 4)
- Load testing (1,247+ users, concurrent admin sessions)
- Permission matrix validation (all 6 roles)
- Accessibility audit
- Rollout: Internal QA → 2 pilot admins → All admins/TCs

## Rollback
Feature flag OFF hides Users screen; admins manage users via legacy system.

## Dependencies
- 000-foundation must be GA
- Auth service must support role-based account creation
