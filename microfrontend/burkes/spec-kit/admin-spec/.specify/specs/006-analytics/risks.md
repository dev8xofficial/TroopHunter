# Risk Register: Analytics (006)

### R-06-01: KPI Data Inaccuracy
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Aggregation queries validated against raw data; automated reconciliation checks; data freshness indicator |
| **Status** | OPEN |

### R-06-02: Analytics Query Performance at Scale
| Property | Value |
|----------|-------|
| **Probability** | High | **Impact** | High |
| **Mitigation** | Pre-computed aggregation tables (materialized views); time period queries use indexed date ranges; caching layer for 24h activity |
| **Status** | OPEN |

### R-06-03: Report Generation Failure
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Async report generation with progress indicator; retry logic; email delivery fallback; error notification to admin |
| **Status** | OPEN |

### R-06-04: Misleading Period-Over-Period Comparisons
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Clear labeling of comparison periods; tooltip explaining calculation methodology; handling edge cases (first period with no baseline) |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero data accuracy incidents; analytics queries respond within SLA under peak load.
