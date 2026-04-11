# Risk Register: Transactions (004)

### R-04-01: Approval Queue Bottleneck
| Property | Value |
|----------|-------|
| **Probability** | High | **Impact** | High |
| **Mitigation** | Collapsible pending approvals with URGENT badge; filter by request type; bulk review actions in future |
| **Status** | OPEN |

### R-04-02: Stage Update Without Attorney Verification
| Property | Value |
|----------|-------|
| **Probability** | Low | **Impact** | Critical |
| **Mitigation** | Server-side enforcement: stage transitions requiring verification cannot bypass approval queue; audit log immutability |
| **Status** | OPEN |

### R-04-03: Transaction Data Inconsistency Across Portals
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Single source of truth database; admin edits propagate to agent and client views; optimistic locking on concurrent edits |
| **Status** | OPEN |

### R-04-04: Rejection Without Reason
| Property | Value |
|----------|-------|
| **Probability** | Medium | **Impact** | High |
| **Mitigation** | Reject button reveals textarea; submission blocked until reason provided; reason stored in audit log |
| **Status** | OPEN |

## Success Criterion
All risks mitigated before GA; zero stage transitions without proper approval; zero rejections without documented reason.
