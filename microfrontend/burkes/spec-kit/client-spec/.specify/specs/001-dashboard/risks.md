# Risk Register: Dashboard Spec

---

## Identified Risks

### Risk D-001: Activity Feed Data Sync Lag

| Property        | Value                                                           |
| --------------- | --------------------------------------------------------------- |
| **Risk ID**     | D-001                                                           |
| **Title**       | Real-time activity updates delayed > 5s; client sees stale data |
| **Condition**   | Activity log service under load; event queue backlog            |
| **Probability** | Medium (30-40%)                                                 |
| **Impact**      | High — confusing UX; client thinks action didn't submit         |
| **Mitigation**  | Event queue monitoring; alert if delay > 2s                     |
| **Status**      | OPEN — needs implementation                                     |

**Action**: Implement real-time latency monitoring (p99 < 5s)

---

### Risk D-002: Stats Widget Data Inconsistency

| Property        | Value                                                                  |
| --------------- | ---------------------------------------------------------------------- |
| **Risk ID**     | D-002                                                                  |
| **Title**       | Stats show different counts than Document Service (mismatched sources) |
| **Condition**   | Document table updated; stats cache not invalidated; async race        |
| **Probability** | Low (10-20%)                                                           |
| **Impact**      | Medium — client confusion; support questions                           |
| **Mitigation**  | Cache invalidation on document change; eventual consistency < 2s       |
| **Status**      | MITIGATED — cache TTL set to 60s                                       |

**Action**: Add integration tests verifying stats match source systems within 2s

---

### Risk D-003: Performance Degradation Under Load

| Property        | Value                                                  |
| --------------- | ------------------------------------------------------ |
| **Risk ID**     | D-003                                                  |
| **Title**       | Dashboard load time > 2s when 1000+ concurrent users   |
| **Condition**   | Unoptimized activity feed queries; N+1 problem         |
| **Probability** | Medium (40-50%)                                        |
| **Impact**      | High — user frustration; support tickets spike         |
| **Mitigation**  | Query optimization; caching; load testing (5000 users) |
| **Status**      | OPEN — needs load testing                              |

**Action**: Run load test with 5000 concurrent users; measure p95 latency

---

### Risk D-004: Missing Role-Based View Gates

| Property        | Value                                            |
| --------------- | ------------------------------------------------ |
| **Risk ID**     | D-004                                            |
| **Title**       | Client sees attorney-only notes in activity feed |
| **Condition**   | Bug in visibility_rules enforcement              |
| **Probability** | Low (10-15%)                                     |
| **Impact**      | Critical — data privacy violation                |
| **Mitigation**  | Code review; 100+ test cases for visibility      |
| **Status**      | MITIGATED — tests written; code approved         |

**Action**: Maintain test coverage; review every activity feed change

---

### Risk D-005: Progress Widget Stage Mismatch

| Property        | Value                                                             |
| --------------- | ----------------------------------------------------------------- |
| **Risk ID**     | D-005                                                             |
| **Title**       | Progress shows stage 5 while transaction_status says stage 9      |
| **Condition**   | Data sync issue between progress service and transaction table    |
| **Probability** | Low (5-15%)                                                       |
| **Impact**      | Medium — confusing UI; audit concerns                             |
| **Mitigation**  | Transaction of truth = transaction_status field (read from there) |
| **Status**      | MITIGATED — centralized calculation                               |

**Action**: Verify progress widget reads from transaction_status field

---

## Risk Heat Map

```
         Probability
         Low   Medium   High
Impact
Critical             D-4

High          D-2    D-1
                     D-3
Medium        D-5
```

**CRITICAL**: D-4
**HIGH**: D-1, D-3, D-2  
**MEDIUM**: D-5

---

## Success Criteria

✅ All HIGH/CRITICAL mitigations in place before Phase 1
✅ Dashboard load time consistently < 1.5s (p95)
✅ Activity feed real-time delay < 5s (99% of updates)
✅ Stats widget accurate (no mismatches > 2s)
✅ Zero privacy violations (visibility rules enforced 100%)
