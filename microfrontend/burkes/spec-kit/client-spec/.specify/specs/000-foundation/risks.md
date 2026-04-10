# Risk Register: Foundation Spec

## Risk Assessment Matrix

Foundation (000) is the **critical dependency** for all features. Risks here cascade to all features.

---

## Identified Risks

### Risk R-001: Auth Provider Downtime

| Property          | Value                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Risk ID**       | R-001                                                                                  |
| **Title**         | External identity provider (Okta, Auth0) becomes unavailable                           |
| **Condition**     | Identity provider SLA is 99.9%; avg 8.76 hours downtime per month                      |
| **Probability**   | Medium (50-75%) — happened twice in industry 2024                                      |
| **Impact**        | Critical — all users locked out; 100% of transactions cannot proceed                   |
| **Overall (P×I)** | **CRITICAL** (RED)                                                                     |
| **Mitigation**    | Local cache of auth tokens expired < 1 hour; fallback auth mechanism (emergency codes) |
| **Owner**         | Backend Team Lead                                                                      |
| **Review Date**   | Monthly                                                                                |
| **Status**        | OPEN — needs fallback auth implementation                                              |

**Mitigation Action Plan**:

1. Implement token caching (Redis) with 1-hour TTL
2. Develop emergency auth bypass (ops team can issue 1-time codes)
3. Test failover weekly
4. Post-mortem: 30-min max downtime before fallback; notify users and support

---

### Risk R-002: Session Context Corruption

| Property          | Value                                                                             |
| ----------------- | --------------------------------------------------------------------------------- |
| **Risk ID**       | R-002                                                                             |
| **Title**         | Session context gets corrupted or stale; user sees wrong transaction/role         |
| **Condition**     | Concurrent updates to session store; clock skew across services                   |
| **Probability**   | Low (10-25%) — rare but has occurred in production                                |
| **Impact**        | Critical — user could view/act on wrong transaction; compliance violation         |
| **Overall (P×I)** | **HIGH** (ORANGE)                                                                 |
| **Mitigation**    | Optimistic locking on session updates; version field in session token; strict TTL |
| **Owner**         | Backend Architect                                                                 |
| **Review Date**   | Quarterly                                                                         |
| **Status**        | MITIGATED — version field added v1.1; needs testing                               |

**Mitigation Action Plan**:

1. Add `session_version` field (increments on each change)
2. On read: verify version matches local version; if stale, refresh from server
3. Load test: 5000 concurrent users with rapid role/transaction changes
4. Test suite: 100 test cases covering concurrent updates

---

### Risk R-003: Activity Log Data Loss

| Property          | Value                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Risk ID**       | R-003                                                                                  |
| **Title**         | Activity events lost due to database failure, not appended, or corruption              |
| **Condition**     | Database transaction rolls back; events batched improperly; replication lag            |
| **Probability**   | Low (5-10%) — modern DBs are reliable but data loss is catastrophic                    |
| **Impact**        | Critical — audit trail broken; compliance failure; unmatchable transactions            |
| **Overall (P×I)** | **CRITICAL** (RED)                                                                     |
| **Mitigation**    | Write-ahead logging (WAL); redo logs; multi-region replication; daily backups verified |
| **Owner**         | Database Administrator                                                                 |
| **Review Date**   | Quarterly                                                                              |
| **Status**        | MITIGATED — PostgreSQL WAL + streaming replication configured                          |

**Mitigation Action Plan**:

1. Verify WAL is enabled (PostgreSQL default)
2. Test recovery: restore from backup, verify all events present
3. Monthly backup validation (restore to test DB, query events)
4. Alert on replication lag > 1 second
5. Document RTO/RPO (Recovery Time Objective / Recovery Point Objective)

---

### Risk R-004: Role Scoping Vulnerability

| Property          | Value                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| **Risk ID**       | R-004                                                                                                   |
| **Title**         | Client (CL) bypasses role restrictions; views attorney/CPA/lender data                                  |
| **Condition**     | SQL injection; JWT tampering; missing authorization check in API                                        |
| **Probability**   | Low (10-20%) — common attack vector but we have input validation                                        |
| **Impact**        | Critical — data breach; regulatory violation; lawsuit                                                   |
| **Overall (P×I)** | **CRITICAL** (RED)                                                                                      |
| **Mitigation**    | Role-based access control (RBAC) on every query; row-level security (RLS); API authorization middleware |
| **Owner**         | Security Team                                                                                           |
| **Review Date**   | Monthly                                                                                                 |
| **Status**        | MITIGATED — RBAC implemented; OWASP ZAP tested                                                          |

**Mitigation Action Plan**:

1. Code review: every API endpoint must check user.role before returning data
2. Database: enable Row-Level Security (PostgreSQL RLS policies)
3. Test: 50 test cases covering unauthorized access attempts
4. Penetration test: external security firm (quarterly)
5. Security Scanner: OWASP ZAP runs on every deployment

---

### Risk R-005: Session Hijacking / XSS Attack

| Property          | Value                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------- |
| **Risk ID**       | R-005                                                                                   |
| **Title**         | Attacker steals session token (XSS, MITM); impersonates user                            |
| **Condition**     | Token stored in localStorage; no HTTPS; no CSP header; DOM-based XSS                    |
| **Probability**   | Medium (25-50%) — XSS is common; MITM possible on public WiFi                           |
| **Impact**        | Critical — attacker can view/modify user's transactions                                 |
| **Overall (P×I)** | **CRITICAL** (RED)                                                                      |
| **Mitigation**    | httpOnly cookies (not JS-accessible); HTTPS everywhere; CSP headers; input sanitization |
| **Owner**         | Frontend Security Lead                                                                  |
| **Review Date**   | Monthly                                                                                 |
| **Status**        | MITIGATED — httpOnly cookies + CSP configured; input sanitized                          |

**Mitigation Action Plan**:

1. All session tokens in httpOnly, Secure, SameSite=Strict cookies
2. CSP header: script-src 'self' (no inline scripts)
3. Input sanitization: DOMPurify on all user-provided content
4. Monthly dependency updates (socket, npm audit)
5. Monthly OWASP Top 10 review

---

### Risk R-006: Clock Skew / Timestamp Mismatch

| Property          | Value                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **Risk ID**       | R-006                                                                                            |
| **Title**         | Server & client clock drift; JWT expiry calculated incorrectly                                   |
| **Condition**     | NTP sync failed; VM clock not synced; leap second                                                |
| **Probability**   | Low (5-15%) — NTP is standard but rare sync issues occur                                         |
| **Impact**        | Medium — users logged out prematurely; or session extends too long                               |
| **Overall (P×I)** | **MEDIUM** (YELLOW)                                                                              |
| **Mitigation**    | NTP sync on all servers; clock skew tolerance (±5 min) in JWT validation; time server monitoring |
| **Owner**         | DevOps / Infrastructure Team                                                                     |
| **Review Date**   | Semi-annually                                                                                    |
| **Status**        | MITIGATED — NTP configured; monitoring enabled                                                   |

**Mitigation Action Plan**:

1. Ensure chrony/NTP running on all servers
2. Alert if clock skew > 1 second detected
3. JWT validation allows ±5 minute skew (nbf, exp claims)
4. Test: stop NTP, verify system behavior doesn't break

---

### Risk R-007: Performance Degradation Under Load

| Property          | Value                                                                            |
| ----------------- | -------------------------------------------------------------------------------- |
| **Risk ID**       | R-007                                                                            |
| **Title**         | Auth, session context, or activity log queries become slow under peak load       |
| **Condition**     | 1000+ concurrent sessions; activity log table grows to 100M rows                 |
| **Probability**   | Medium (40-60%) — load will increase over time                                   |
| **Impact**        | High — users timeout or get errors; frustration; support tickets spike           |
| **Overall (P×I)** | **HIGH** (ORANGE)                                                                |
| **Mitigation**    | Query optimization (indexes); caching (Redis); connection pooling; read replicas |
| **Owner**         | Database Performance Team                                                        |
| **Review Date**   | Monthly                                                                          |
| **Status**        | OPEN — needs baseline testing and optimization                                   |

**Mitigation Action Plan**:

1. Create indexes on activity_event (transaction_id, created_date)
2. Query optimization: activity log queries should use index, not full table scan
3. Redis caching: session context cached 5 minutes
4. Load test: Simulate 5000 concurrent users; measure p99 latencies
5. Read replicas: Activity log queries can read from replica (async)

---

### Risk R-008: Design Token Inconsistency

| Property          | Value                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------- |
| **Risk ID**       | R-008                                                                                        |
| **Title**         | Developers hardcode colours/spacing instead of using design tokens                           |
| **Condition**     | No enforcement in code review; no ESLint rule; designers not monitoring                      |
| **Probability**   | High (60-80%) — convenience to hardcode; tokens seem like overhead                           |
| **Impact**        | Medium — UI inconsistency; rebranding impossible; tech debt                                  |
| **Overall (P×I)** | **MEDIUM-HIGH** (ORANGE)                                                                     |
| **Mitigation**    | ESLint rule blocking hardcoded values; code review gate; design system team reviews every PR |
| **Owner**         | Design Systems Team                                                                          |
| **Review Date**   | Quarterly                                                                                    |
| **Status**        | MITIGATED — ESLint rule created; needs enforcement                                           |

**Mitigation Action Plan**:

1. Add ESLint rule: disallow hardcoded hex colours (force token use)
2. Block PR merge if rule violated (CI check)
3. Monthly design system audit (scan codebase for hardcoded values)
4. Design review: every spec must show token usage, not hardcoded values

---

### Risk R-009: Activity Log Visibility Leakage

| Property          | Value                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| **Risk ID**       | R-009                                                                                                 |
| **Title**         | Activity events visible to wrong roles (e.g., client sees attorney notes)                             |
| **Condition**     | Bug in visibility_rules logic; missing authorization check; data included in event                    |
| **Probability**   | Low-Medium (20-30%) — tricky logic; easy to miss edge case                                            |
| **Impact**        | High — client privacy violation; confidential info leaked                                             |
| **Overall (P×I)** | **HIGH** (ORANGE)                                                                                     |
| **Mitigation**    | Unit tests for visibility rules (100 test cases); whitelist approach (default deny); code review gate |
| **Owner**         | Backend Team Lead                                                                                     |
| **Review Date**   | Monthly                                                                                               |
| **Status**        | OPEN — needs comprehensive test coverage                                                              |

**Mitigation Action Plan**:

1. Write 100 test cases: role × event_type × visibility (6 roles × 20 types = 120 cases)
2. Whitelist approach: activity_log.visible_to_roles must be explicitly set (no defaults)
3. Code review: every activity log event creation requires reviewer sign-off
4. Monthly audit: sample activity events, verify visibility rules enforced

---

### Risk R-010: Invalid Badge Variant Rendering

| Property          | Value                                                                             |
| ----------------- | --------------------------------------------------------------------------------- |
| **Risk ID**       | R-010                                                                             |
| **Title**         | New status not mapped to badge system; renders without colour/icon                |
| **Condition**     | Spec adds new status (e.g., "hold"); implementation forgets to add badge variant  |
| **Probability**   | Medium (40-50%) — easy to miss when adding new statuses                           |
| **Impact**        | Low — UI looks broken; user confusion; not a blocker                              |
| **Overall (P×I)** | **LOW-MEDIUM** (YELLOW)                                                           |
| **Mitigation**    | Validation schema includes badge variants; PR template checklist for new statuses |
| **Owner**         | Frontend Team Lead                                                                |
| **Review Date**   | Quarterly                                                                         |
| **Status**        | OPEN — needs implementation                                                       |

**Mitigation Action Plan**:

1. Add validation schema check: any new status_enum value must have badge variant defined
2. PR template: checklist item "[ ] Updated badge_system for new statuses"
3. Visual regression test: every badge variant renders correctly (Chromatic)
4. Code review gate: design system team must approve new badge variants

---

## Risk Heat Map

```
         Probability
         Low   Medium   High
Impact
Critical   R-3   R-1    R-4
              R-2    R-5

High            R-9    R-7
         R-6         R-8

Medium                R-10
```

**CRITICAL Risks (RED)**: R-1, R-2, R-4, R-5, R-3
**HIGH Risks (ORANGE)**: R-7, R-8, R-9
**MEDIUM Risks (YELLOW)**: R-6, R-10

---

## Risk Monitoring & Review Cadence

| Review Cadence | Action                                                               |
| -------------- | -------------------------------------------------------------------- |
| **Weekly**     | Check status of CRITICAL risks (R-1, R-2, R-4, R-5, R-3)             |
| **Monthly**    | Review HIGH risks; ops team reports incidents                        |
| **Quarterly**  | Full risk register review; reassess probabilities based on incidents |
| **Annually**   | Risk assessment workshop with cross-functional team                  |

---

## Escalation Path

**If CRITICAL risk occurs**:

1. Page on-call engineer immediately
2. Declare incident (notify Slack #incidents)
3. 5-minute response target; 15-minute MTTR target
4. Post-mortem within 24 hours
5. Root cause analysis + remediation plan within 48 hours

**Example Incident**: Auth provider down (R-001)

- Discovery: Auth API returns 500 for 5 consecutive requests
- Alert triggers: MTTD < 1 minute
- Response: On-call switches to emergency auth codes (pre-generated)
- Post-mortem: Why wasn't token caching enabled? Add it now.

---

## Success Criterion

Foundation risk register is **successful** when:
✅ All CRITICAL mitigation actions implemented before GA
✅ Zero security breaches in first 90 days
✅ Zero data loss incidents in first year
✅ MTTR < 15 minutes for HIGH/CRITICAL incidents
✅ Review cadence followed (weekly for critical, monthly for high)
