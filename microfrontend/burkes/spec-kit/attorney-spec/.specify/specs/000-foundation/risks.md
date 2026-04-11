# Risk Register: Foundation (000)

### R-00-01: Session Expiry Data Loss
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Auto-save form state; prompt before session timeout |
| **Status** | OPEN |

### R-00-02: Design Token Drift
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Medium |
| **Mitigation** | CI validation of token usage; no raw hex values |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero critical incidents in first 30 days.
