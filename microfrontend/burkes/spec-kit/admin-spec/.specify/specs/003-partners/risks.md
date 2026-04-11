# Risk Register: Partners (003)

### R-03-01: Partner Visible Without Approval
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Critical |
| **Mitigation** | Default status "Pending Approval"; partner only visible in agent referral list when status = "Active"; server-side enforcement |
| **Status** | OPEN |

### R-03-02: Invalid Zip Code Coverage
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Client-side 5-digit validation; server-side USPS zip code verification; duplicate detection in tag input |
| **Status** | OPEN |

### R-03-03: File Upload Failure (License/Insurance)
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Medium |
| **Mitigation** | Retry logic; file size limit enforcement (10MB); clear error messages; drag-and-drop + click-to-browse fallback |
| **Status** | OPEN |

### R-03-04: Low-Rated Partner Not Suspended
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Dashboard alert when partner rating drops below 3.5; auto-flag for review; admin notification |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero unapproved partners visible to agents; zero invalid zip code assignments.
