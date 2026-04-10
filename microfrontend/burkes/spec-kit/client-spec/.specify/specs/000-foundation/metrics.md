# Success Metrics: Foundation Spec

## Overview

Foundation (000) is the base layer. Success metrics are **availability, performance, and security** — because every feature depends on it.

---

## Key Performance Indicators (KPIs)

### 1. Authentication & Session Management

| KPI                                     | Baseline  | Target             | Owner        | Frequency | Alert                |
| --------------------------------------- | --------- | ------------------ | ------------ | --------- | -------------------- |
| **Auth success rate**                   | N/A       | > 99.8%            | Backend Team | Real-time | < 99% for 10 min     |
| **Session creation latency (p50)**      | N/A       | < 100ms            | Backend Team | Daily     | > 200ms              |
| **Session creation latency (p99)**      | N/A       | < 500ms            | Backend Team | Daily     | > 1000ms             |
| **Session timeout errors**              | N/A       | < 0.1% of sessions | Backend Team | Real-time | > 1 error/hour       |
| **Concurrent session limit (per user)** | Unlimited | 2 (or config)      | Backend Team | Monthly   | Excess logins logged |

**Measurement Method**:

- Auth API response codes (200 = success, 4xx/5xx = failure)
- Session table: measure time from login request to token issued
- Monitor JWT/cookie expiration errors in logs

**Success Criterion**: Auth success rate sustained > 99.8% for 30 days post-launch

---

### 2. Navigation & UI Performance

| KPI                            | Baseline | Target  | Owner         | Frequency | Alert   |
| ------------------------------ | -------- | ------- | ------------- | --------- | ------- |
| **Nav bar render time (p50)**  | N/A      | < 50ms  | Frontend Team | Daily     | > 100ms |
| **Nav bar render time (p99)**  | N/A      | < 100ms | Frontend Team | Daily     | > 200ms |
| **Interaction to Paint (ITI)** | N/A      | < 100ms | Frontend Team | Daily     | > 300ms |
| **Core Web Vitals: LCP**       | N/A      | < 2.5s  | Frontend Team | Weekly    | > 4s    |
| **Core Web Vitals: FID**       | N/A      | < 100ms | Frontend Team | Weekly    | > 300ms |
| **Core Web Vitals: CLS**       | N/A      | < 0.1   | Frontend Team | Weekly    | > 0.25  |

**Measurement Method**:

- React profiler / performance.measure() for component render
- Real User Monitoring (RUM) via Sentry or similar
- Lighthouse CI on critical pages

**Success Criterion**: 95% of users experience LCP < 2.5s; FID < 100ms; CLS < 0.1

---

### 3. Activity Log & Audit Trail

| KPI                                         | Baseline | Target                | Owner         | Frequency | Alert            |
| ------------------------------------------- | -------- | --------------------- | ------------- | --------- | ---------------- |
| **Event creation latency (p50)**            | N/A      | < 50ms                | Backend Team  | Daily     | > 200ms          |
| **Event creation latency (p99)**            | N/A      | < 500ms               | Backend Team  | Daily     | > 1000ms         |
| **Events recorded**                         | 0        | 100% of state changes | Backend Team  | Real-time | < 99.9% recorded |
| **Data immutability violations**            | 0        | 0 forever             | Database Team | Real-time | > 0 = incident   |
| **Activity log query latency (100 events)** | N/A      | < 200ms               | Database Team | Weekly    | > 500ms          |

**Measurement Method**:

- Logs: Record event timestamp (created) vs. logged timestamp (actual recording)
- Database: Row-level audit (no UPDATE on activity_event table)
- Monitoring: Alert if DELETE attempted on activity_event table

**Success Criterion**: 100% of state changes recorded; zero immutability breaches

---

### 4. Role-Based Access & Security

| KPI                              | Baseline | Target                 | Owner         | Frequency | Alert          |
| -------------------------------- | -------- | ---------------------- | ------------- | --------- | -------------- |
| **Unauthorized access attempts** | 0        | 0                      | Security Team | Real-time | > 0 = incident |
| **Role scoping violations**      | 0        | 0                      | Security Team | Real-time | > 0 = incident |
| **Session hijacking attempts**   | 0        | 0                      | Security Team | Real-time | > 0 = incident |
| **Auth provider downtime**       | N/A      | < 0.1% (< 9 min/month) | Operations    | Monthly   | > 1 minute     |
| **Password reset success rate**  | N/A      | > 99%                  | Support Team  | Daily     | < 95%          |

**Measurement Method**:

- SIEM logs: Track 403 Forbidden responses (unauthorized access)
- Session comparison: Verify user_role in session == role in request
- Identity provider SLA monitoring (Okta, Auth0, etc.)

**Success Criterion**: Zero security violations before GA; < 1 incident in first 30 days

---

### 5. Session Context Availability

| KPI                                         | Baseline | Target                     | Owner         | Frequency | Alert                   |
| ------------------------------------------- | -------- | -------------------------- | ------------- | --------- | ----------------------- |
| **Session context retrieval latency (p99)** | N/A      | < 100ms                    | Backend Team  | Daily     | > 300ms                 |
| **Session data completeness**               | N/A      | 100% (all required fields) | Backend Team  | Daily     | < 99.9%                 |
| **Transaction context availability**        | N/A      | Ever available (not lost)  | Backend Team  | Real-time | Context lost = incident |
| **Multi-transaction context switch**        | N/A      | < 500ms latency            | Frontend Team | Weekly    | > 1s = degradation      |

**Measurement Method**:

- API response time for session context endpoint
- Verify required fields present on every response (transaction_id, role, user_id, auth_token)
- Monitor for "no active transaction" errors

**Success Criterion**: Transaction context never lost; avg context switch < 300ms

---

### 6. Design System Compliance

| KPI                           | Baseline | Target                             | Owner              | Frequency   | Alert                        |
| ----------------------------- | -------- | ---------------------------------- | ------------------ | ----------- | ---------------------------- |
| **Design token consistency**  | 0%       | 100% (no hardcoded values)         | Design System Team | Code review | Non-compliant PR detected    |
| **Badge variant correctness** | N/A      | 100% (correct colour + icon)       | Frontend Team      | Weekly      | > 5% incorrect badges        |
| **Role colour accuracy**      | N/A      | 100% (each role = assigned colour) | Frontend Team      | Weekly      | Role colour mismatch = issue |
| **Typography compliance**     | N/A      | 100% (Archivo/Manrope only)        | Design System Team | Weekly      | Non-compliant font detected  |
| **Colour contrast (WCAG AA)** | N/A      | 100% of text / bg combos           | Design System Team | Automated   | < 4.5:1 = fail               |

**Measurement Method**:

- ESLint rule: disallow hardcoded colours (force use of design tokens)
- Visual regression testing (Chromatic)
- axe-core accessibility audit (automated on every deployment)

**Success Criterion**: 100% design token compliance pre-merge; zero colour violations in production

---

### 7. Availability & Uptime

| KPI                            | Baseline | Target                              | Owner      | Frequency | Alert                     |
| ------------------------------ | -------- | ----------------------------------- | ---------- | --------- | ------------------------- |
| **Foundation layer uptime**    | N/A      | > 99.9% (8.76 hours downtime/month) | Operations | Real-time | > 5 minutes down          |
| **Nav bar availability**       | N/A      | > 99.95% (< 2 minutes down/month)   | Operations | Real-time | Nav inaccessible = P1     |
| **Activity log availability**  | N/A      | > 99.99% (< 26 seconds down/month)  | Operations | Real-time | Cannot create events = P1 |
| **Auth provider availability** | N/A      | > 99.9% (per SLA)                   | Operations | Real-time | Inherited from provider   |

**Measurement Method**:

- Synthetic monitoring (ping every 60 seconds)
- Real User Monitoring (RUM) via Sentry
- Database uptime from infrastructure metrics

**Success Criterion**: Sustained > 99.9% uptime for 30 days post-GA

---

## Operational Metrics

| Metric                          | Target                  | Owner               |
| ------------------------------- | ----------------------- | ------------------- |
| **Mean Time to Detect (MTTD)**  | < 2 minutes             | Operations          |
| **Mean Time to Resolve (MTTR)** | < 15 minutes            | Operations          |
| **On-call response time**       | < 5 minutes             | Operations          |
| **Incident post-mortems**       | 100% for severity P0/P1 | Engineering Manager |

---

## Customer Experience Metrics

| Metric                                    | Baseline | Target                                | Frequency      |
| ----------------------------------------- | -------- | ------------------------------------- | -------------- |
| **User session completion rate**          | N/A      | > 95% (users can complete their task) | Daily          |
| **Session timeout complaints**            | N/A      | < 5 per month                         | Weekly         |
| **Support tickets related to Foundation** | N/A      | < 1% of all tickets                   | Monthly        |
| **User satisfaction (NPS)**               | N/A      | > 50                                  | Monthly survey |

**Measurement Method**:

- Session analytics: Count completed transactions vs. abandoned
- Support ticket categorization (tag "foundation-related")
- In-app survey after logout: "How easy was authentication?"

---

## Data Quality Metrics

| Metric                          | Target                                        | Owner         | Alert              |
| ------------------------------- | --------------------------------------------- | ------------- | ------------------ |
| **Activity log event accuracy** | 100% (no duplicates, no mutations)            | Database Team | Audit daily        |
| **Transaction_ID consistency**  | 100% (never NULL, always matches user intent) | Backend Team  | Validate on write  |
| **Role assignment accuracy**    | 100% (CL sees only their data, etc.)          | Backend Team  | Query audit logs   |
| **Timestamp synchronization**   | < 100ms drift across services                 | DevOps Team   | > 500ms = incident |

---

## Dashboard Configuration

### Real-Time Ops Dashboard (Updated Every 5 Seconds)

```
[Auth Success Rate]          [Nav Render p99]           [Activity Log Latency]
    99.87% ✅                    45ms ✅                      120ms ✅

[Session Errors]             [Unauthorized Access]      [Auth Provider Status]
    0 in last 5 min ✅        0 attempts ✅              Okta: UP ✅

[Core Web Vitals (Last Hour)]
LCP: 1.8s ✅  |  FID: 45ms ✅  |  CLS: 0.05 ✅

[Incidents This Week]
None ✅
```

### Weekly Business Review Dashboard

```
Auth Success Rate: 99.82% (Target: >99.8%)    ✅
Uptime: 99.92% (Target: >99.9%)               ✅
Support tickets: 3 (Target: <5)                ✅
Session timeout complaints: 1 (Target: <5)    ✅
```

---

## Success Definition

Foundation rollout is **successful** when these conditions hold for **30 days post-GA**:

✅ Auth success rate > 99.8%
✅ Uptime > 99.9%
✅ Zero security violations
✅ Activity log immutability enforced (0 breaches)
✅ LCP < 2.5s, FID < 100ms, CLS < 0.1 (95% of users)
✅ Support tickets < 1% Foundation-related
✅ MTTR < 15 minutes for any incidents
✅ Design token compliance 100% (no hardcoded values)
