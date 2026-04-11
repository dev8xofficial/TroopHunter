# Governance — Admin Portal Spec-Kit

## Decision-Making Framework

All specification decisions are made through a structured process that ensures quality, consistency, and accountability.

---

## 1. Roles & Authorities

| Role | Authority | Scope |
|------|-----------|-------|
| **Product Manager** | Approve/reject feature specs; set priorities | All specs |
| **Product Lead** | Constitutional changes; principle additions | Constitution, governance |
| **Tech Lead / Architect** | Validate technical feasibility; approve schemas | Architecture, schemas, integration |
| **Feature Team Lead** | Author specs for their assigned feature(s) | Individual specs |
| **Design System Lead** | Approve design token changes; validate UX patterns | Foundation, design system |
| **Any Team Member** | Propose changes via issues and PRs | Any spec (with review) |

---

## 2. Approval Requirements by Change Type

| Change Type | Required Approvers | Min Approvals |
|-------------|-------------------|:---:|
| New feature spec | PM + Tech Lead | 2 |
| Spec update (non-breaking) | PM or Tech Lead | 1 |
| Spec update (breaking) | PM + Tech Lead + Product Lead | 3 |
| Constitutional change | PM + Product Lead | 2 |
| Template change | Tech Lead | 1 |
| Schema change | Tech Lead + Data Architect | 2 |
| ADR (decision record) | PM + Tech Lead | 2 |
| Documentation fix (typo, clarity) | Any reviewer | 1 |

---

## 3. Change Process

### For New Features

```
1. Open "New Feature" issue → Discussion → PM approval to proceed
2. Author creates branch: spec/NNN-feature-name
3. Write spec.md using template → Add supporting artifacts
4. Submit PR → Complete checklist
5. PM reviews → Tech Lead reviews → Both approve
6. Merge to main
```

### For Updates to Existing Specs

```
1. Open "Spec Update" issue (or skip if minor fix)
2. Author creates branch: spec/NNN-update-description
3. Update spec.md → Update changelog.md → Bump version
4. Submit PR → Complete checklist
5. Required approvers review → Approve
6. Merge to main
```

### For Breaking Changes

A change is "breaking" if it:
- Adds, removes, or renames a canonical role
- Changes the transaction lifecycle stages
- Modifies a constitutional principle
- Removes a functional requirement
- Changes a global schema in a backwards-incompatible way

Breaking changes require:
1. A detailed impact analysis in the PR description
2. A migration/deprecation plan documented in rollout.md
3. All feature specs that depend on the changed spec must be updated in the same PR
4. Three approvals (PM + Tech Lead + Product Lead)

---

## 4. Conflict Resolution

If reviewers disagree:

1. **Discussion**: Attempt to resolve in PR comments
2. **Meeting**: Schedule a 30-min sync between disagreeing parties
3. **Escalation**: Product Lead makes the final call
4. **Record**: Document the decision in an ADR

---

## 5. Review SLA

| Priority | Review Target |
|----------|:---:|
| P0 (Critical) | 1 business day |
| P1 (High) | 2 business days |
| P2 (Medium) | 5 business days |
| P3 (Low) | 10 business days |

---

## 6. Versioning Authority

- **PATCH** (1.0.x): Any approved reviewer can merge
- **MINOR** (1.x.0): PM or Tech Lead must approve
- **MAJOR** (x.0.0): PM + Tech Lead + Product Lead must approve

---

**Version**: 1.0
**Last Updated**: April 11, 2026

