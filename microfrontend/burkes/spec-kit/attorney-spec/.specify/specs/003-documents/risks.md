# Risk Register: Documents (003)

### R-03-01: Upload Failure on Large Files
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Chunked uploads; progress indicator; retry mechanism |
| **Status** | OPEN |

### R-03-02: Incorrect Document-Transaction Association
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | High |
| **Mitigation** | Required transaction selection; confirmation before upload |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero critical incidents in first 30 days.
