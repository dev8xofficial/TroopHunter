# Risk Register: Transactions (002)

### R-02-01: Search Performance Degradation
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Indexed search; debounced input; pagination |
| **Status** | OPEN |

### R-02-02: Stale Transaction Status
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Real-time status sync; polling fallback |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero critical incidents in first 30 days.
