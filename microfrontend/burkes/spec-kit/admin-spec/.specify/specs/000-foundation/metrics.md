# Success Metrics: Foundation (000)

## Overview

Foundation is the base layer for the Admin Portal. Success metrics focus on **availability, performance, security, and audit integrity** — every feature depends on it.

---

## Key Performance Indicators

### 1. Navigation & UI Performance

| KPI | Target | Owner | Alert |
|-----|--------|-------|-------|
| Nav bar render time (p50) | < 50ms | Frontend Team | > 100ms |
| Nav bar render time (p99) | < 100ms | Frontend Team | > 200ms |
| LCP (Largest Contentful Paint) | < 2.5s | Frontend Team | > 4s |
| FID (First Input Delay) | < 100ms | Frontend Team | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | Frontend Team | > 0.25 |

### 2. Authentication & Session

| KPI | Target | Owner | Alert |
|-----|--------|-------|-------|
| Auth success rate | > 99.8% | Backend Team | < 99% for 10 min |
| Session creation latency (p99) | < 500ms | Backend Team | > 1000ms |
| Session timeout errors | < 0.1% of sessions | Backend Team | > 1 error/hour |
| Role resolution accuracy | 100% (ADMIN vs TC) | Backend Team | Any mismatch = incident |

### 3. Audit Log

| KPI | Target | Owner | Alert |
|-----|--------|-------|-------|
| Event creation latency (p99) | < 500ms | Backend Team | > 1000ms |
| Events recorded | 100% of admin actions | Backend Team | < 99.9% |
| Data immutability violations | 0 forever | Database Team | > 0 = incident |
| Audit trail completeness | 100% (all destructive actions logged) | Compliance Team | Any gap = incident |

### 4. Design System Compliance

| KPI | Target | Owner | Alert |
|-----|--------|-------|-------|
| Design token consistency | 100% (no hardcoded values) | Design System Team | Non-compliant PR |
| Typography compliance | 100% (Archivo/Manrope only) | Design System Team | Non-compliant font |
| Colour contrast (WCAG AA) | 100% of text/bg combos | Design System Team | < 4.5:1 = fail |

### 5. Availability

| KPI | Target | Alert |
|-----|--------|-------|
| Foundation layer uptime | > 99.9% | > 5 minutes down |
| Auth provider availability | > 99.9% (per SLA) | Inherited from provider |
| Modal system responsiveness | < 200ms open/close | > 500ms = investigate |

---

## Success Definition

Foundation is **successful** when for 30 days post-GA:

- ✅ Auth success rate > 99.8%
- ✅ Uptime > 99.9%
- ✅ Zero security violations
- ✅ Audit log immutability enforced (0 breaches)
- ✅ LCP < 2.5s, FID < 100ms, CLS < 0.1 (95% of admin users)
- ✅ Design token compliance 100%
- ✅ All 6 nav items render correctly with proper active states
