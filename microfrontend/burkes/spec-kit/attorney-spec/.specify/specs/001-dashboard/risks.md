# Risk Register: Dashboard (001)

### R-01-01: KPI Data Staleness
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Polling with 30s refresh; cache invalidation on state change |
| **Status** | OPEN |

### R-01-02: Missed Deadline Alert
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Critical |
| **Mitigation** | Alert banner threshold at 7 days; push notifications |
| **Status** | OPEN |

### R-01-03: Asset Split Display Errors
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | High |
| **Mitigation** | Server-side validation of split amounts; display validation |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero critical incidents in first 30 days.
