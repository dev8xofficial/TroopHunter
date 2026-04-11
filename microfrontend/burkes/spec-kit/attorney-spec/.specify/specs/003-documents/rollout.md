# Rollout Plan: Documents (003)

## Phase 1: Backend (Week 1)
**Feature Flag**: `ATTORNEY_DOCUMENTS_V1`
- Document list API
- Review/approve/reject endpoints
- Upload service

## Phase 2: UI (Week 2-3)
- Document tabs, doc items, upload zone
- Approval/rejection modals
- Summary sidebar, recent uploads

## Phase 3: GA (Week 4)
- Upload stress testing, accessibility audit
- Rollout: Internal QA -> All attorneys

## Rollback
Feature flag OFF hides Documents tab; documents accessible via transaction detail only.

## Dependencies
- 000-foundation must be GA
