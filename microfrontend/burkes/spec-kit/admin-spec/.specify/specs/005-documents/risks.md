# Risk Register: Documents (005)

### R-05-01: Document Approved Without Proper Review
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | Critical |
| **Mitigation** | Approve requires confirmation step; audit log records reviewer ID and timestamp; view action opens preview before approval |
| **Status** | OPEN |

### R-05-02: Rejection Without Reason
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Reject button reveals textarea; submission blocked until reason provided (minLength: 10); reason stored immutably in audit log |
| **Status** | OPEN |

### R-05-03: Document Queue Backlog
| Property | Value |
|----------|-------|
| **Probability** | High | **Impact** | High |
| **Mitigation** | Dashboard pending count alerts admin; urgent documents flagged; category filters help triage; future: bulk approve/reject |
| **Status** | OPEN |

### R-05-04: Incorrect Status Filter Returns
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Medium |
| **Mitigation** | Server-side exclusive filtering; approved documents never appear in "Needs Review" filter; integration tests for filter accuracy |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero documents approved without review; zero rejections without documented reason; queue backlog < 48 hours.
