# Risk Register: Users (002)

### R-02-01: Duplicate User Account Creation
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Server-side unique email constraint; client-side pre-check on email blur; clear error messaging |
| **Status** | OPEN |

### R-02-02: Permission Misconfiguration on Role Selection
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Critical |
| **Mitigation** | Auto-configure permissions from canonical role-permission matrix; manual override requires confirmation dialog |
| **Status** | OPEN |

### R-02-03: Password Security (Auto-Generate)
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Critical |
| **Mitigation** | 16-char minimum with uppercase, lowercase, digit, special char; password masked after 3s; never logged |
| **Status** | OPEN |

### R-02-04: Users Table Performance at Scale
| Property | Value |
|----------|-------|
| **Probability** | High | **Impact** | Medium |
| **Mitigation** | Server-side pagination (25 per page); indexed search on name, email, ID; debounced search input |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero permission escalation incidents; zero duplicate accounts in first 90 days.
