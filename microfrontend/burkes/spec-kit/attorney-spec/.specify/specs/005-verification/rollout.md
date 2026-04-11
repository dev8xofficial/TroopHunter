# Rollout Plan: Verification (005)

## Phase 1: Core Workflow (Week 1-2)
**Feature Flag**: `ATTORNEY_VERIFICATION_V1`
- Verification data model
- Verify/flag endpoints
- Report generation service
- Notification dispatch for flags

## Phase 2: UI (Week 3-4)
- Verification panels, progress steps, verify grid
- Confirm and Flag modals
- Checklist, report modal, summary sidebar

## Phase 3: GA (Week 5)
- Legal compliance review, penetration testing
- Rollout: Internal QA -> 1 pilot attorney (high-volume) -> All attorneys

## Rollback
Feature flag OFF hides Verification tab; verification reverts to manual process.

## Dependencies
- 000-foundation must be GA
- 003-documents should be available (View Documents links)
