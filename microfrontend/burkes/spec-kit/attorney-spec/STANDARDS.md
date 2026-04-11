# Writing Standards — Attorney Portal Spec-Kit

These standards apply to every specification, plan, and task document in this repository.

---

## 1. Audience

All specs are written for a combined audience of:

- **Product Managers** who approve features
- **Architects** who plan technical implementation
- **Developers** who build features
- **QA Engineers** who validate against acceptance criteria

Write so that all four groups can read the same document without translation.

---

## 2. Language & Tone

- **Clear over clever**: Use plain language. Avoid jargon that a new team member couldn't understand in context.
- **Present tense**: "The portal displays…" not "The portal will display…"
- **Active voice**: "The attorney verifies the amount" not "The amount is verified by the attorney."
- **No implementation language**: Never reference frameworks (React, Next.js), APIs (REST, GraphQL), databases (PostgreSQL, Redis), or code patterns (hooks, middleware) in specs. These belong in implementation plans, not specifications.
- **Definitive statements**: "The nav bar must be sticky" not "The nav bar should probably be sticky."

---

## 3. Document Structure

### Spec Files (spec.md)

Every `spec.md` must contain these sections in this order:

1. **Title** — `# Feature Specification: [Feature Name]`
2. **Frontmatter** — Feature ID, Status, Created date, Parent Spec, Screen/Module
3. **Overview** — One paragraph of business context (min 50 words)
4. **Problem Statement** — What pain point this spec addresses (min 100 words)
5. **Goals** — Bulleted list of what this spec accomplishes
6. **Non-Goals** — What is explicitly out of scope
7. **Actors** — Table of roles and their responsibilities in this feature
8. **User Scenarios** — At least 2 actor-goal-flow-success scenarios
9. **Functional Requirements** — Numbered FR-NNN-NN requirements
10. **Data & State** — Table of data fields with types and descriptions
11. **Edge Cases & Error States** — Exception handling
12. **Assumptions** — Numbered list (optional but recommended)
13. **Success Criteria** — Numbered acceptance criteria
14. **Open Questions** — Unresolved items (optional)
15. **Dependencies** — Depends on / Required by / Cross-links

### Supporting Artifacts

Each feature directory must also contain:

| File | Purpose |
|------|---------|
| `changelog.md` | Version history for this spec |
| `validation-schema.json` | JSON Schema for this feature's data model |
| `test-scenarios.md` | Test matrix, edge cases, accessibility, performance |
| `rollout.md` | Phased rollout strategy with feature flags |
| `metrics.md` | KPIs, monitoring, success definition |
| `risks.md` | Risk register with mitigations |

---

## 4. Naming Conventions

### Feature IDs

- Format: `NNN-kebab-case` (e.g., `000-foundation`, `005-verification`)
- Zero-padded three digits
- Sequential, never reused

### Requirement IDs

- Format: `FR-NN-NN` (e.g., `FR-01-03`)
- First two digits = feature number (01 = Dashboard, 02 = Transactions, …)
- Second two digits = sequential requirement within that feature

### Role Abbreviations

| Role | Abbreviation |
|------|-------------|
| Real Estate Agent | AG |
| Admin / Transaction Coordinator | TC |
| Client (Buyer/Seller) | CL |
| Mortgage Lender | LN |
| Closing Attorney | AT |
| CPA / Tax Advisor | CP |

### Transaction IDs

- Format: `TRX-NNNNN` (e.g., `TRX-10247`)
- Always uppercase prefix
- Five-digit numeric suffix

### File Naming

- Specs: `spec.md` (always lowercase)
- Supporting artifacts: `changelog.md`, `test-scenarios.md`, `validation-schema.json` (always lowercase, kebab-case)
- Top-level docs: `UPPERCASE.md` (e.g., `STANDARDS.md`, `ARCHITECTURE.md`)
- ADRs: `adr-NNN-kebab-case.md` (e.g., `adr-001-role-model.md`)

---

## 5. Tables

- Use Markdown tables for structured data (actors, data models, reference values).
- Always include a header row.
- Align columns for readability.
- Use `—` for empty/not-applicable cells (not blank).

---

## 6. Status Values

### Spec Lifecycle

| Status | Meaning |
|--------|---------|
| `draft` | Being written; not ready for review |
| `review` | Ready for approval by PM + Architecture |
| `approved` | Signed off; ready for implementation planning |
| `implemented` | Feature is live in production |
| `deprecated` | Retired; no longer in use |

### Badge Classes (from Foundation spec)

| Class | Usage |
|-------|-------|
| `success` | Verified, Approved, Completed |
| `warning` | Needs Verification, In Progress, Needs Review |
| `error` | Urgent, Needs Verification (overdue), Flagged |
| `info` | Under Review, In Progress (informational) |
| `neutral` | General count displays |

---

## 7. Cross-References

- Link to other specs using relative paths: `[000-foundation](../000-foundation/spec.md)`
- Link to constitution: `[constitution.md](/.specify/memory/constitution.md)`
- Never use absolute URLs for internal spec-kit links
- Reference design tokens by name (e.g., `primary-navy`), never by hex value

---

## 8. Versioning

All specs use **Semantic Versioning** (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes (new stage, new role, principle change)
- **MINOR**: New features (new component, new data field, new requirement)
- **PATCH**: Fixes (clarifications, corrections, non-breaking improvements)

Each `changelog.md` records version bumps with dates and categories (Added, Changed, Deprecated, Removed, Fixed).

---

## 9. Review Checklist

Before submitting a spec for review:

- [ ] All required sections present (see Section 3)
- [ ] No implementation details (no code, no framework names)
- [ ] All FR IDs follow `FR-NN-NN` format
- [ ] All role references use canonical abbreviations (AG, TC, CL, LN, AT, CP)
- [ ] Design tokens referenced by name, not hex values
- [ ] Cross-references use relative paths and resolve correctly
- [ ] Changelog updated with version and date
- [ ] No sensitive data (passwords, API keys, tokens)
- [ ] Spell-checked and Markdown formatting correct

---

**Version**: 1.0
**Last Updated**: April 12, 2026
