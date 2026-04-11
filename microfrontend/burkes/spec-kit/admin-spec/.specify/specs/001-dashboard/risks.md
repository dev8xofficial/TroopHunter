# Risk Register: Dashboard (001)

### R-01-01: KPI Data Staleness
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Polling with 30s refresh; cache invalidation on state change; stale indicator after 2 min |
| **Status** | OPEN |

### R-01-02: Pending Approval Count Inconsistency
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Real-time count aggregation from source tables; no cached counters; eventual consistency < 5s |
| **Status** | OPEN |

### R-01-03: Activity Feed Performance with Large Datasets
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Paginated feed (4 most recent events); lazy load older events; indexed timestamp column |
| **Status** | OPEN |

### R-01-04: Quick Action Navigation Failure
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Medium |
| **Mitigation** | Client-side routing for all Quick Management tiles; fallback to full page reload |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero critical incidents in first 30 days; admin situational awareness achieved within 30 seconds.
