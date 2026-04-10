# Risk Register: Dashboard (001)

### R-01-01: KPI Data Staleness
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Polling with 30s refresh; cache invalidation on state change |
| **Status** | OPEN |

### R-01-02: Upload Zone File Validation Bypass
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | High |
| **Mitigation** | Server-side validation; client-side is convenience only |
| **Status** | OPEN |

### R-01-03: Activity Feed Performance with Large Datasets
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Paginated feed (10 events); lazy load older events |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero critical incidents in first 30 days.
