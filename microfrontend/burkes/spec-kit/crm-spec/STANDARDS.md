# Writing Standards - CRM Spec-Kit

These standards apply to every specification, plan, task list, schema, and declarative contract in this repository.

---

## 1. Audience

All artifacts in this spec-kit are written for a shared audience:

- Product managers who approve scope and priorities
- Architects who translate requirements into system design
- Developers who implement the product
- QA engineers who validate release readiness
- Operations and compliance reviewers who verify retention and audit behavior

Write so that a new contributor can understand the intent without extra translation.

---

## 2. Language and Tone

- Clear over clever. Prefer plain language and short sentences.
- Present tense. Use "The CRM displays..." not "The CRM will display..."
- Active voice. Use "The agent transfers a lead" not "A lead is transferred..."
- Definitive statements. Use "must" for required behavior and "does not" for exclusions.
- Technology-agnostic specs. `spec.md` files describe what and why, not framework or vendor implementation details.
- Technology-aware plans. `plan.md`, YAML contracts, API definitions, and schemas may describe technical structure when needed.

---

## 3. Required Structure

### Spec files (`spec.md`)

Every `spec.md` must contain these sections in this order:

1. Title
2. Frontmatter
3. Overview
4. Problem Statement
5. Goals
6. Non-Goals
7. Actors
8. User Scenarios
9. Functional Requirements
10. Data & State
11. Edge Cases & Error States
12. Assumptions
13. Success Criteria
14. Open Questions
15. Dependencies

### Supporting artifacts

Each feature directory must also contain:

| File | Purpose |
| --- | --- |
| `changelog.md` | Version history for the feature spec |
| `validation-schema.json` | Machine-readable contract for the feature payload |
| `test-scenarios.md` | Functional, accessibility, and failure-path validation |
| `rollout.md` | Release strategy and rollback guidance |
| `metrics.md` | Success KPIs and alert thresholds |
| `risks.md` | Risk register with mitigations |
| `plan.md` | Technical implementation architecture and phases |
| `tasks.md` | Dependency-ordered developer work breakdown |

---

## 4. Naming Conventions

### Feature IDs

- Format: `NNN-kebab-case`
- Zero-padded three digits
- Sequential, never reused
- Reserved Phase 1 IDs:
  - `000-foundation`
  - `001-dashboard`
  - `002-contacts`
  - `003-pipeline`
  - `006-calls`
  - `007-sms`
  - `008-email`

### Requirement IDs

- Format: `FR-NN-NN`
- First pair maps to feature number
- Second pair is the sequential requirement within the feature
- Example: `FR-02-07`

### Role abbreviations

| Role | Abbreviation |
| --- | --- |
| Department Owner | OW |
| Insurance Agent | IA |
| Mortgage Liaison | ML |
| Real Estate Agent | RA |
| Platform Administrator | PA |
| Client Portal User | CL |
| Service Partner | SP |

### Entity IDs

| Entity | Format | Example |
| --- | --- | --- |
| Contact | `CNT-NNNNN` | `CNT-10247` |
| Lead | `LED-NNNNN` | `LED-00391` |
| Activity | `ACT-NNNNNN` | `ACT-000812` |
| User | `USR-[ROLE]-NNN` | `USR-OW-001` |
| Recording | `REC-NNNNNN` | `REC-002981` |

### File naming

- Specs and supporting artifacts: lowercase, kebab-case
- Top-level documents: uppercase file names such as `ARCHITECTURE.md`
- ADRs: `adr-NNN-kebab-case.md`
- Schemas: `*.schema.json`
- Declarative contracts: `*.yaml`

---

## 5. Tables and Lists

- Use Markdown tables for structured reference data.
- Always include header rows.
- Use `-` for list items and `1.` style numbering for ordered steps.
- Use `-` for empty values instead of blank cells.

---

## 6. Status Values

### Spec lifecycle

| Status | Meaning |
| --- | --- |
| `draft` | Actively being authored |
| `review` | Ready for PM and architecture review |
| `approved` | Signed off for implementation planning |
| `implemented` | Released in production |
| `deprecated` | No longer valid |

### Delivery priority

| Priority | Meaning |
| --- | --- |
| `P0` | Required for Phase 1 launch |
| `P1` | Important follow-on capability |
| `P2` | Planned post-launch enhancement |
| `P3` | Future or exploratory |

---

## 7. Cross-References

- Link to sibling feature specs using relative paths.
- Link to the constitution with `[constitution.md](./.specify/memory/constitution.md)` at the repository root and `../../memory/constitution.md` from feature directories.
- Link to supporting artifacts using local relative links.
- Use design token names, not raw hex values, inside specs and plans wherever possible.

---

## 8. Versioning

This spec-kit uses semantic versioning:

- MAJOR for breaking changes to shared principles, schemas, or phase boundaries
- MINOR for new features, new contracts, or materially expanded requirements
- PATCH for clarifications, corrections, and non-breaking improvements

Every feature `changelog.md` and the root `CHANGELOG.md` must record version changes with date and summary.

---

## 9. CRM-Specific Rules

- The platform owner is always Burkes Group Marketing LLC.
- The unified contact record is the source of truth across all departments.
- Activity history is append-only and must never be described as editable.
- Compliance behaviors must be automatic by default, not user-optional.
- Mortgage and insurance data ownership must never be described as co-owned by their operators.
- Specs must call out cross-department read access and department-scoped write access where relevant.
- Phase 1 specs must preserve the three core communications pillars: calls, SMS, and email.

---

## 10. Review Checklist

Before submitting changes:

- [ ] Required sections are present
- [ ] Requirement IDs follow `FR-NN-NN`
- [ ] Cross-links resolve correctly
- [ ] Changelog is updated
- [ ] Supporting artifacts match the spec
- [ ] No conflicting statements against the constitution
- [ ] Compliance and retention behavior are explicit where applicable
- [ ] No sensitive secrets or credentials appear in the repository

---

**Version**: 1.0
**Last Updated**: 2026-04-13
