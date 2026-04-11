# Contributing to the Admin Portal Spec-Kit

Thank you for contributing! This document explains how to propose, write, and submit changes to the spec-kit.

---

## Quick Start

1. **Read the constitution** — `.specify/memory/constitution.md`
2. **Read the standards** — `STANDARDS.md`
3. **Pick an issue** or open a new one using the appropriate template
4. **Create a branch** — `spec/NNN-feature-name` (e.g., `spec/001-dashboard-update`)
5. **Make your changes** — Follow the templates in `.specify/templates/`
6. **Submit a PR** — Use the PR template; complete all checklists

---

## What Can I Contribute?

| Contribution Type | How |
|-------------------|-----|
| **New feature spec** | Open a "New Feature" issue → get approval → write spec.md → PR |
| **Spec update** | Open a "Spec Update" issue → make changes → update changelog → PR |
| **Bug fix** (incorrect info, contradictions) | Open a "Bug Report" issue → fix → PR |
| **Clarity improvement** | Directly submit a PR with explanation |
| **Template improvement** | Submit PR targeting `.specify/templates/` |
| **Governance/process change** | Open a discussion issue first → get consensus → PR |

---

## Writing a Spec

### Use the Template

All specs must use the spec template at `.specify/templates/spec-template.md`. Do not create ad-hoc formats.

### Required Sections

See `STANDARDS.md` Section 3 for the full list. At minimum, every spec.md must include:

1. Title + Frontmatter
2. Overview
3. Problem Statement
4. Goals / Non-Goals
5. Actors
6. User Scenarios
7. Functional Requirements (FR-NN-NN format)
8. Data & State
9. Edge Cases
10. Success Criteria
11. Dependencies

### Supporting Artifacts

When creating or modifying a spec, you must also update:

- **changelog.md** — Log your version bump
- **validation-schema.json** — If data model changes
- **test-scenarios.md** — If new requirements or edge cases added
- **rollout.md** — If deployment strategy changes
- **metrics.md** — If success criteria changes
- **risks.md** — If new risks identified

---

## Code Review Process

1. **Author** submits PR with all checklists completed
2. **PM Team** reviews business requirements and priority
3. **Technical Architecture** reviews feasibility, dependencies, and pattern compliance
4. Both must approve before merge
5. After merge, the changelog is updated automatically by CI

---

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Branch | `spec/NNN-feature-name` | `spec/001-dashboard-update` |
| Feature ID | `NNN-kebab-case` | `007-partner-referrals` |
| Requirement ID | `FR-NN-NN` | `FR-07-03` |
| Commit message | `spec(NNN): description` | `spec(001): add upload zone requirement` |
| Version | Semantic (`MAJOR.MINOR.PATCH`) | `1.2.0` |

---

## Definition of Done (for a Spec PR)

- [ ] All required sections present (per STANDARDS.md)
- [ ] changelog.md updated
- [ ] No implementation details (per P-06)
- [ ] All FR IDs follow FR-NN-NN format
- [ ] Design tokens referenced by name
- [ ] Cross-references use relative paths
- [ ] PM + Architecture approval obtained

---

**Version**: 1.0
**Last Updated**: April 11, 2026

