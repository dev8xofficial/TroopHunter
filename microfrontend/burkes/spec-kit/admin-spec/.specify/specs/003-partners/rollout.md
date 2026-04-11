# Rollout Plan: Partners (003)

## Phase 1: Data & API (Week 1)
**Feature Flag**: `ADMIN_PARTNERS_V1`
- Partner listing API with pagination, search, category/zip/status filters
- Partner creation endpoint with zip code validation
- Partner approval/suspension endpoints
- File upload API for license, insurance, logo
- Audit log integration for partner actions

## Phase 2: UI (Week 2-3)
- Partner statistics grid (6 cards)
- Filter bar with search, category, zip code, and status dropdowns
- Partners table with contact rows, category badges, star ratings, status badges
- Add New Service Partner modal (7 sections)
- Zip code tag input component
- View/Edit Partner modal with toggle
- Pagination component

## Phase 3: GA (Week 4)
- Load testing (156+ partners, concurrent admin sessions)
- Zip code validation accuracy testing
- File upload testing (various sizes and formats)
- Rollout: Internal QA → 2 pilot admins → All admins/TCs

## Rollback
Feature flag OFF hides Partners screen; partner management via legacy system.

## Dependencies
- 000-foundation must be GA
- File storage service must be operational
