# Rollout Plan: Foundation (000)

## Overview

Foundation is the critical dependency for all admin screens. It must be deployed and stable before any feature screens go live.

---

## Phase 1: Design System & Navigation (Week 1–2)

**Feature Flag**: `ADMIN_PORTAL_FOUNDATION_V1`

| Deliverable | Owner | Target |
|-------------|-------|--------|
| Design token CSS variables | Frontend Team | Week 1 |
| Global navigation bar (6 screens) | Frontend Team | Week 1 |
| Card, badge, button components | Frontend Team | Week 2 |
| Modal/overlay system | Frontend Team | Week 2 |
| Responsive breakpoint system | Frontend Team | Week 2 |

**Rollout**: Internal team only (QA + development)

---

## Phase 2: Session, Audit Log & Role System (Week 3–4)

**Feature Flag**: `ADMIN_PORTAL_AUTH_V1`

| Deliverable | Owner | Target |
|-------------|-------|--------|
| Auth provider integration (ADMIN/TC roles) | Backend Team | Week 3 |
| Session context endpoint (pending counts) | Backend Team | Week 3 |
| Audit log event table + API | Backend Team | Week 4 |
| Role-gated operation layer | Backend Team | Week 4 |
| Notification bell integration | Frontend Team | Week 4 |

**Rollout**: Internal team → 2 pilot admins (Sarah Burke + Mark Davis)

---

## Phase 3: GA Readiness (Week 5)

| Deliverable | Owner | Target |
|-------------|-------|--------|
| Load testing (500 concurrent admin sessions) | QA Team | Week 5 |
| Accessibility audit (WCAG AA) | QA Team | Week 5 |
| Security penetration test (role escalation) | Security Team | Week 5 |
| Performance baseline (LCP < 2.5s) | Frontend Team | Week 5 |
| Audit log immutability verification | Database Team | Week 5 |

**Rollout**: All admins (GA)

---

## Rollback Strategy

1. Feature flag `ADMIN_PORTAL_FOUNDATION_V1` → OFF reverts to previous system
2. Database: Audit log table is append-only — no rollback needed
3. Auth: Fallback to existing auth mechanism
4. Runbook: Ops team can disable within 5 minutes

---

## Success Criteria for GA

- ✅ Uptime > 99.9% for 14 days
- ✅ LCP < 2.5s for 95% of admin users
- ✅ Zero security violations
- ✅ All 6 nav items render correctly
- ✅ Audit log captures 100% of admin actions
- ✅ Role-gated operations prevent TC privilege escalation
