# Contributing Guidelines

Thank you for contributing to The Burkes Group Client Portal specification kit. This document outlines how to propose, write, and review specs.

---

## 🎯 Before You Start

1. **Read the existing specs** — Understand the structure and tone (see [examples](/.specify/specs/))
2. **Review STANDARDS.md** — Learn writing standards and conventions
3. **Check the Glossary** — Use consistent terminology
4. **Check the Roadmap** — Is your feature already planned or in progress?

---

## 🔄 Spec Lifecycle

```
Idea → Issue → Draft → Review → Approved → Planned → Development
  ↓       ↓       ↓       ↓        ↓         ↓         ↓
 (You) → (PM)  → (You) → (Both)  → Merge  → Planning  → Dev
                         Review         Branch    Phase
```

### Step 1: Open an Issue

Use the appropriate GitHub issue template:

- **[spec-new.md](.github/ISSUE_TEMPLATE/spec-new.md)** — Request a new feature spec (e.g., "Add Closing Checklist screen")
- **[spec-update.md](.github/ISSUE_TEMPLATE/spec-update.md)** — Propose changes to an existing spec
- **[bug-report.md](.github/ISSUE_TEMPLATE/bug-report.md)** — Report issues with spec clarity/inconsistency
- **[question.md](.github/ISSUE_TEMPLATE/question.md)** — Ask about spec-kit or portal design

**Product lead** triages and provides feedback. For new specs heading to approval, they'll greenlight moving to Draft stage.

---

### Step 2: Create a Feature Branch

Once Product Lead gives the go-ahead:

```bash
git checkout -b feature/007-closing-checklist
```

Branch naming: `feature/NNN-short-name` (NNN assigned by product lead or auto-increment).

---

### Step 3: Draft the Spec

#### Using the Scaffolding Command

```bash
# In GitHub Copilot Chat, run:
/speckit.specify Create a new feature spec for [FEATURE DESCRIPTION]
```

This will:

- Auto-assign feature ID
- Create `.specify/specs/NNN-short-name/` directory
- Populate `spec.md` with template
- Create branch and PR automatically (or guide you)

#### Manual Creation

If not using the command:

1. Create directory: `.specify/specs/NNN-short-name/`
2. Copy [spec-template.md](/.specify/templates/spec-template.md) → `spec.md`
3. Fill in all required sections (see template)
4. Commit: `git add .specify/specs/NNN-short-name/spec.md && git commit -m "Initial spec draft for feature NNN"`

#### Writing the Spec

- Follow [STANDARDS.md](STANDARDS.md) for tone and structure
- Use canonical terms from [GLOSSARY.md](GLOSSARY.md)
- Reference canonical data fields from [constitution.md](/.specify/memory/constitution.md)
- Link to related specs and architecture docs
- Include at least 2 user scenarios
- Number functional requirements (FR-NN-XX)
- Define success criteria that are measurable and testable
- List dependencies explicitly
- Identify open questions (these must be resolved before approval)

---

### Step 4: Self-Review Checklist

Before requesting review:

- [ ] All required sections completed (see [STANDARDS.md](STANDARDS.md#-specification-completeness-checklist))
- [ ] No framework, database, or API names mentioned
- [ ] Canonical field names used (from constitution)
- [ ] All cross-references are valid relative links
- [ ] Scenarios have clear preconditions and success outcomes
- [ ] Functional requirements are numbered and testable
- [ ] Dependencies section is complete
- [ ] Open questions are documented (if any)
- [ ] Tone is clear and non-technical (suitable for non-technical stakeholders)
- [ ] No typos or grammatical errors
- [ ] Status field set to "Ready" (for product review)

---

### Step 5: Create a Pull Request

Push your branch:

```bash
git push origin feature/007-closing-checklist
```

Create a PR with title: `[SPEC] 007 — Closing Checklist`

**PR Description** (use template from [pull_request_template.md](.github/pull_request_template.md)):

```markdown
## Feature Spec: 007-closing-checklist

**Overview**: This spec defines the Closing Checklist feature for clients to track closing day tasks.

**Type**: New Spec | Spec Update  
**Feature ID**: 007-closing-checklist  
**Status**: Ready for Review

**Checklist**:

- [x] All required sections filled
- [x] Spec adheres to writing standards
- [x] Canonical field names used
- [x] No framework/tech names mentioned
- [x] Scenarios and FRs are clear and testable
- [x] Cross-references are valid
- [ ] Spell-check passed

**Dependencies**:

- Depends on: 001-dashboard (activity log), 000-foundation (design tokens)
- Blocks: None (optional feature)

**Design Notes**: Closing checklist is a simplified screen focused on final verification tasks before closing day.
```

---

### Step 6: Request Reviewers

GitHub will auto-request reviewers based on [CODEOWNERS](.github/CODEOWNERS):

- **Product Lead** — Reviews for clarity, business value, user-centricity
- **Technical Architect** — Reviews for feasibility, consistency, data model compliance

If CODEOWNERS isn't configured yet, manually request:

- Product lead (@product-pm or author's manager)
- Tech lead (@tech-architect or engineering lead)

---

### Step 7: Address Review Feedback

Reviewers will request changes, suggest clarifications, or approve:

| Feedback                        | Action                                                     |
| ------------------------------- | ---------------------------------------------------------- |
| "This requirement is ambiguous" | Clarify with specific examples or testable criteria        |
| "This conflicts with spec 001"  | Resolve conflict by coordinating with dependent spec owner |
| "This is out of scope"          | Move to Non-Goals or create a separate spec                |
| "Missing edge case"             | Add to Edge Cases section                                  |
| "Approved" ⭐                   | Move to next step when all reviewers approve               |

---

### Step 8: Update and Re-request Review

Make requested changes:

```bash
# Edit spec.md
git add .specify/specs/NNN-short-name/spec.md
git commit -m "Review feedback: clarified FR-NNN-XX requirement"
git push origin feature/007-closing-checklist
```

GitHub will auto-notify reviewers of updates. Re-request review if needed.

---

### Step 9: Merge & Approval

Once **both** Product and Tech leads approve:

1. Reviewers will merge the PR to `main`
2. Spec status changes to "Approved" in `spec.md`
3. Issue is closed with "Approved" label
4. Spec enters planning phase (next: creating `plan.md`)

---

## ✏️ Updating Existing Specs

### Minor Updates (Clarifications, Typos)

For small corrections (clarity, typos, link fixes):

1. Create branch: `feature/update-NNN-short-name`
2. Edit spec.md
3. Update CHANGELOG.md in same directory (add patch entry)
   ```markdown
   ## v1.0.1 (2026-04-15)

   - Fixed typo in FR-01-03
   - Clarified data type for `upload_timestamp`
   ```
4. PR title: `[SPEC UPDATE] 007 — Fix typo in FR-01-XX`
5. Request review (product only; often auto-approved for typos)

### Major Updates (New Requirements, Breaking Changes)

For significant changes (new FRs, scope changes, data model changes):

1. Create issue using [spec-update.md](.github/ISSUE_TEMPLATE/spec-update.md)
2. Describe change, rationale, and impact
3. Product Lead approves change
4. Follow the same review process as new specs (product + tech)
5. Update changelog (minor or major version bump)
6. Update cross-referencing specs if affected

---

## 🔄 Supporting Artifacts

Once a spec is approved and moving to planning, create supporting artifacts in the same feature directory:

- **changelog.md** — Version history (use [changelog-template.md](/.specify/templates/changelog-template.md))
- **validation-schema.json** — Data contracts (use [validation-schema-template.json](/.specify/templates/validation-schema-template.json))
- **test-scenarios.md** — Test matrix and edge cases (use [test-scenarios-template.md](/.specify/templates/test-scenarios-template.md))
- **decisions.md** or `adr/` — Architecture decisions (use [adr-template.md](/.specify/templates/adr-template.md))
- **rollout.md** — Feature flag and release plan (use [rollout-template.md](/.specify/templates/rollout-template.md))
- **metrics.md** — Success KPIs (use [metrics-template.md](/.specify/templates/metrics-template.md))
- **risks.md** — Risk register (use [risks-template.md](/.specify/templates/risks-template.md))

**Timeline**: Create these during planning phase, not required for spec approval. But if you want to include them with your spec, that's great!

---

## 🎯 Review Guidelines (for Reviewers)

When reviewing specs, verify:

### Completeness

- [ ] All required sections present (Overview, Goals, FRs, Scenarios, etc.)
- [ ] No TODOs or placeholders
- [ ] Success Criteria are measurable
- [ ] Open Questions section clarifies remaining decisions

### Clarity

- [ ] Language is clear (avoid jargon, dense paragraphs)
- [ ] Examples aid understanding
- [ ] Acronyms are defined
- [ ] Cross-references are helpful and correct

### Consistency

- [ ] Terminology matches GLOSSARY.md
- [ ] Data fields use canonical names from constitution
- [ ] Role names match constitution
- [ ] Design system terms (badges, alerts) are accurate
- [ ] Dependencies are complete and acyclic

### Feasibility

- [ ] Requirements are implementable (no impossible constraints)
- [ ] Data model is reasonable (not requiring joins across 5 tables, etc.)
- [ ] Performance targets are achievable
- [ ] Dependencies exist or are planned

### Compliance

- [ ] No technology names (React, GraphQL, Postgres, etc.)
- [ ] No implementation assumptions
- [ ] Aligns with 7 core principles (P-01 through P-07)
- [ ] Doesn't duplicate existing specs

### Sign-Off Note

Add a review comment:

```markdown
## ✅ Product Review Approved

**Reviewer**: @pm-name  
**Date**: 2026-04-15

This spec is clear, well-scoped, and aligns with our product roadmap.
```

Or for technical review:

```markdown
## ✅ Technical Review Approved

**Reviewer**: @tech-lead-name  
**Date**: 2026-04-15

Data model is sound; no blockers for implementation. Suggests considering caching for activity log retrieval.
```

---

## 📞 Questions While Writing?

- **Terminology**: Check [GLOSSARY.md](GLOSSARY.md)
- **Structure**: Review [spec-template.md](/.specify/templates/spec-template.md) and [STANDARDS.md](STANDARDS.md)
- **Portal Design**: Read [ARCHITECTURE.md](ARCHITECTURE.md)
- **Examples**: Look at approved specs (001–006) for patterns
- **Process Questions**: See [FAQ.md](FAQ.md) or [GOVERNANCE.md](GOVERNANCE.md)

Still stuck? Open a question issue via [.github/ISSUE_TEMPLATE/question.md](.github/ISSUE_TEMPLATE/question.md).

---

## 🚀 Quick Reference

| Task                 | Template                                                 | Guide                                                   |
| -------------------- | -------------------------------------------------------- | ------------------------------------------------------- |
| Propose new spec     | [spec-new.md](.github/ISSUE_TEMPLATE/spec-new.md)        | Step-by-step above                                      |
| Update existing spec | [spec-update.md](.github/ISSUE_TEMPLATE/spec-update.md)  | See [Updating Existing Specs](#updating-existing-specs) |
| Report issue         | [bug-report.md](.github/ISSUE_TEMPLATE/bug-report.md)    | Use when you find inconsistency in spec                 |
| Ask question         | [question.md](.github/ISSUE_TEMPLATE/question.md)        | For general Q&A                                         |
| Write spec           | [spec-template.md](/.specify/templates/spec-template.md) | Follow [STANDARDS.md](STANDARDS.md)                     |
| Create plan          | [plan-template.md](/.specify/templates/plan-template.md) | Use after spec approved                                 |

---

## 💝 Code of Conduct

All contributors must follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). We value:

- **Respect** — Assume good intent; be kind in feedback
- **Clarity** — Ask clarifying questions before criticizing
- **Collaboration** — Specs are written together, not in isolation
- **Inclusivity** — Specs should be understandable to all stakeholders

---

## 🎓 Getting Help

- **Q: How do I create a branch?** — See [Step 2](#step-2-create-a-feature-branch) above
- **Q: What should my spec look like?** — See [spec.md examples](/.specify/specs/) (001–006)
- **Q: How long should a spec be?** — Typically 2–4 pages; can be longer if complex
- **Q: Can I work on multiple specs?** — Yes, use separate branches
- **Q: How do I know my spec is good?** — Use [Completeness Checklist](STANDARDS.md#-specification-completeness-checklist)

---

**Thank you for contributing to clearer, more intentional product development!**

---

**Version**: 1.0  
**Last Updated**: April 10, 2026  
**Authority**: Product + Engineering Leadership
