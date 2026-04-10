# Governance: Decision-Making & Approval Process

This document defines how specs are prioritized, reviewed, approved, and merged into the specification kit.

---

## 🎯 Decision-Making Authority

### Roles & Responsibilities

| Role                                | Responsibility                                                                      | Examples                                                        |
| ----------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Product Lead (PM)**               | Prioritizes features; approves product-level specs (clarity, value, scope)          | "Is this feature worth building? Does it solve a user problem?" |
| **Technical Architect**             | Reviews spec feasibility; approves technical consistency (data model, architecture) | "Is this implementable? Does it conflict with other specs?"     |
| **Product Manager (Feature Owner)** | Writes/owns specific spec; responsible for answering clarifying questions           | "Can you clarify what user scenario 2 means?"                   |
| **Engineering Lead**                | Translates approved specs into plans & tasks; flags implementation concerns         | "We'll need a database migration for this data model"           |
| **Portal Steering Committee**       | Escalates tough prioritization calls; resolves conflicts between specs              | Annual roadmap planning; major pivots                           |

### Code Ownership (CODEOWNERS)

Spec ranges are assigned to product teams:

```
# In .github/CODEOWNERS

# MVP Screens (Phase 1)
.specify/specs/000-foundation/ @pm-lead @tech-architect
.specify/specs/001-dashboard/ @pm-lead @tech-architect
.specify/specs/002-documents/ @pm-features @tech-architect
.specify/specs/003-messages/ @pm-features @tech-architect
.specify/specs/004-insurance/ @pm-lending @tech-architect
.specify/specs/005-mortgage/ @pm-lending @tech-architect
.specify/specs/006-services/ @pm-partners @tech-architect

# Advanced Features (Phase 2)
.specify/specs/007-closing/ @pm-lead @tech-architect
.specify/specs/008-*/ @pm-features @tech-architect
```

CODEOWNERS automatically requests review from assigned teams. Override requires escalation.

---

## 📋 Spec Approval Process

### Step 1: Submission (Spec Status = "Ready")

Product Manager submits spec.md with status = "Ready":

- All required sections complete
- No TODOs or placeholders
- Self-reviewed against [STANDARDS.md](STANDARDS.md)

### Step 2: Product Lead Review (SLA: 2 business days)

**Product Lead** reads spec and answers:

- ✅ Does this solve a real user problem?
- ✅ Is the scope appropriate?
- ✅ Does it align with roadmap?
- ✅ Are requirements clear and testable?
- ✅ Does it align with core principles?

**Possible Outcomes**:

| Outcome                  | Next Step                                                      |
| ------------------------ | -------------------------------------------------------------- |
| ✅ **Approved**          | Requests Tech review (proceed to Step 3)                       |
| 🔄 **Requested Changes** | Author revises; resubmits (max 2 iterations before escalation) |
| ❌ **Not Approved**      | Provide rationale; offer to rescope or defer                   |

### Step 3: Technical Architect Review (SLA: 2 business days)

**Architect** reads spec and answers:

- ✅ Is this implementable?
- ✅ Any conflicts with existing specs?
- ✅ Data model reasonable?
- ✅ Performance targets achievable?
- ✅ Any blockers or dependencies?

**Possible Outcomes**:

| Outcome                     | Next Step                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| ✅ **Approved**             | Proceed to Step 4                                                                                         |
| 🔄 **Requested Changes**    | Author revises; resubmits (max 2 iterations)                                                              |
| ⚠️ **Conditional Approval** | Approved if author agrees to constraints (e.g., "Document search only searches titles, not full content") |
| ❌ **Not Approved**         | Provide technical rationale; offer to rescope                                                             |

### Step 4: Final Approval

Once **both** Product Lead and Architect approve:

1. Spec status changes to **"Approved"**
2. PR is merged to `main`
3. Spec is ready for planning phase

**Total SLA**: 4 business days (2 product + 2 tech, can overlap)

---

## 🚨 Escalation & Conflict Resolution

### When Product & Tech Disagree

**Scenario**: Architect says feature is too complex for ROI; Product Lead wants it badly.

**Process**:

1. Both lead calls to align (15 min)
2. If unresolved: escalate to **Steering Committee**
   - VP Product + VP Engineering
   - Review tradeoffs
   - Make final call (majority vote)
3. Decision is binding; spec moves forward or is deferred

**SLA**: Escalation resolved within 3 business days

### When Multiple Specs Conflict

**Scenario**: Spec 007 and Spec 008 both require incompatible data model changes.

**Process**:

1. Architecture team identifies conflict
2. Flag both specs as "Blocked"
3. Schedule sync with spec authors
4. Propose resolution (merge requirements, reorder specs, scope adjustment)
5. Update both specs; move forward

**SLA**: Conflict resolution within 2 business days

---

## 📅 Spec Versioning & Updates

### Major Changes (Breaking)

**Trigger**: New FRs, data model changes, removal of existing functionality

**Process**:

1. Open [spec-update.md](.github/ISSUE_TEMPLATE/spec-update.md) issue
2. Product + Tech leads review as "breaking change"
3. Version bumps to X+1.0 (e.g., 1.0 → 2.0)
4. All dependent specs must be reviewed for impact
5. Change logged in changelog.md

### Minor Changes (New, backward-compatible)

**Trigger**: Additional FRs, new scenarios, expanded edge cases

**Process**:

1. Create branch `feature/update-NNN-name`
2. Edit spec; update changelog
3. Version bumps to X.Y+1 (e.g., 1.0 → 1.1)
4. Product lead review (tech lead can skip if no data model changes)
5. Merge + close issue

### Patch Changes (Clarifications)

**Trigger**: Typos, clarifications, link fixes

**Process**:

1. Create branch `feature/patch-NNN-name`
2. Make minimal edits
3. Version bumps to X.Y.Z+1 (e.g., 1.0 → 1.0.1)
4. Can be auto-approved (no formal review needed)

---

## 🗳️ Steering Committee

**Members**: VP Product, VP Engineering, Lead Product Manager, Lead Architect

**Meets**: Monthly + as-needed for escalations

**Responsibilities**:

- Approve annual roadmap
- Settle spec conflicts
- Allocate resources to specs
- Approve major pivots

**Decisions are binding** (no further appeals)

---

## 🎯 Prioritization Framework

Specs are prioritized using this scorecard:

| Criterion          | Weight | Scoring                                                                           |
| ------------------ | ------ | --------------------------------------------------------------------------------- |
| **User Impact**    | 30%    | How many users affected? How critical is the need? (1–10)                         |
| **Business Value** | 25%    | Revenue impact? Strategic alignment? Competitive advantage? (1–10)                |
| **Effort**         | 20%    | Dev effort (XS/S/M/L/XL) converted to points (1–10 inverse: larger = lower score) |
| **Dependencies**   | 15%    | Can we start now, or are we blocked? (1–10: unblocked = higher)                   |
| **Technical Debt** | 10%    | Does this reduce technical debt or create it? (1–10)                              |

**Calculation**: Sum of (criterion score × weight) = overall priority score

**Example**:

- Dashboard (before): User Impact=10, Business=10, Effort=9, Dependencies=8, Debt=5 → Score= 9.2 **HIGH**
- Analytics (after): User Impact=5, Business=7, Effort=2, Dependencies=1, Debt=8 → Score= 4.8 **LOW** (defer)

---

## 📊 Success Metrics

To ensure the governance process is working:

| Metric                       | Target                      | Cadence       |
| ---------------------------- | --------------------------- | ------------- |
| **Spec approval SLA**        | 4 business days             | Per-spec      |
| **Escalation resolution**    | 3 business days             | Per-spec      |
| **Spec rejection rate**      | < 10% (majority approved)   | Quarterly     |
| **Cross-spec conflicts**     | 0 unresolved                | Quarterly     |
| **Stakeholder satisfaction** | > 8/10 on approval fairness | Annual survey |

---

## 📝 Decision Log

Every significant decision about specs is logged:

**Format**: [DECISION_NNN] Feature | Decision | Rationale | Owner | Date

**Examples**:

- [DECISION_001] 001-Dashboard | Should timeline show all 11 stages or just pending? | Decided: show all (context matters) | @pm-lead | 2026-04-01
- [DECISION_002] 005-Mortgage | Should pre-approval be on its own screen or within Mortgage? | Decided: within Mortgage (related workflow) | @pm-lending | 2026-04-03

**Storage**: Logged in `.specify/decisions/decisions-log.md` for institutional memory

---

## 🔄 Feedback Loop

### Post-Launch Review

30 days after launch, specs are reviewed:

- ✅ Did implementation match spec?
- ✅ Did users behave as expected (per spec scenarios)?
- ✅ Were any edge cases missed?
- ✅ Should spec be updated based on learnings?

**Outcome**: Update spec with patch/minor changes; log lessons learned

### Annual Governance Review

Once per year:

- Review approval SLA achievement
- Analyze prioritization accuracy (did high-priority specs deliver expected value?)
- Assess escalation frequency (too many conflicts?)
- Adjust process if needed

---

## 🚀 Future Considerations

As the spec-kit grows:

- **Automated validation**: CI checks spec format, links, schema compliance
- **AI-assisted review**: Flagging tone/clarity issues, suggesting improvements
- **Dependency graph**: Visual display of which specs block which
- **Impact analysis**: When a spec changes, automatically flag affected specs
- **Metrics dashboard**: Real-time view of approval SLAs, bottlenecks, etc.

---

**Version**: 1.0  
**Last Updated**: April 10, 2026  
**Authority**: Product & Engineering Leadership

**Questions?** See [FAQ.md](FAQ.md) or [CONTRIBUTING.md](CONTRIBUTING.md)
