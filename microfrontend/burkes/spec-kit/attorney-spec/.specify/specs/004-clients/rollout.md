# Rollout Plan: Clients (004)

## Phase 1: Data (Week 1)
**Feature Flag**: `ATTORNEY_CLIENTS_V1`
- Client list API
- Add client endpoint
- Message service integration

## Phase 2: UI (Week 2-3)
- Client table, detail modal, add modal
- Overview sidebar, messaging form
- Responsive layouts

## Phase 3: GA (Week 3)
- Privacy audit, accessibility check
- Rollout: Internal QA -> All attorneys

## Rollback
Feature flag OFF hides Clients tab.

## Dependencies
- 000-foundation must be GA
