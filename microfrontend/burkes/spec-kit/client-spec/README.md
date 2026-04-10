# The Burkes Group Client Portal — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's Client Portal — a single-page web application designed to empower homebuyers to manage their real estate transaction from offer acceptance through closing day.

This repository is the **single source of truth** for all product decisions, designs, and implementation guidance. Code serves these specifications, not the reverse.

---

## 📋 Quick Navigation

### For New Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write specs (tone, structure, naming)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business and technical vocabulary
- **[FAQ.md](FAQ.md)** — Common questions about portal design and roles

### For Product & Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Portal architecture, data flow, integration points
- **[ROADMAP.md](ROADMAP.md)** — Feature prioritization and release timeline
- **[GOVERNANCE.md](GOVERNANCE.md)** — Decision-making process and approval gates

### For Implementation

- **[.specify/specs/](/.specify/specs/)** — Feature specifications (000-foundation through 006-services)
- **[.specify/templates/](/.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle, data vocab)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](/.specify/research/)** — User research, competitive analysis, rationale

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the portal. In SDD:

- **Specifications are the source of truth** — they describe _what_ the system does and _why_, in technology-agnostic language
- **Code is the manifestation** — developers translate specs into working systems
- **Plans bridge the gap** — implementation plans translate specs into technical architecture before coding begins

Every feature in this portal is governed by:

1. A **Feature Specification** (what the user experiences, what the system does)
2. An **Implementation Plan** (technical architecture, phases, integration points)
3. **Developer Tasks** (granular, assignable work with acceptance criteria)
4. **Supporting Artifacts** (decisions, validation schemas, test scenarios, rollout plans)

---

## 📁 Repository Structure

```
.
├── README.md                           ⬅ You are here
├── STANDARDS.md                        Writing standards and conventions
├── ARCHITECTURE.md                     Portal overview and data flow
├── GLOSSARY.md                         Vocabulary (business + technical)
├── FAQ.md                              Common questions
├── ROADMAP.md                          Feature timeline and priorities
├── CHANGELOG.md                        Spec-kit evolution
├── CONTRIBUTING.md                     How to propose changes
├── GOVERNANCE.md                       Approval process and decision-making
├── CODE_OF_CONDUCT.md                  Community standards
│
├── SPEC-DRIVEN.md                      SDD philosophy and methodology
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md             Project charter (principles, roles, stages, vocab)
│   │
│   ├── specs/
│   │   ├── 000-foundation/
│   │   │   ├── spec.md                 Global nav, design tokens, session context
│   │   │   ├── changelog.md            Version history
│   │   │   ├── validation-schema.json  Data structures and validation rules
│   │   │   ├── test-scenarios.md       Test matrix and edge cases
│   │   │   ├── rollout.md              Feature flag and phased release plan
│   │   │   ├── metrics.md              Success KPIs and measurement
│   │   │   └── risks.md                Risk register and mitigations
│   │   ├── 001-dashboard/              [Same 8-file structure]
│   │   ├── 002-documents/              [Same 8-file structure]
│   │   ├── 003-messages/               [Same 8-file structure]
│   │   ├── 004-insurance/              [Same 8-file structure]
│   │   ├── 005-mortgage/               [Same 8-file structure]
│   │   └── 006-services/               [Same 8-file structure]
│   │
│   ├── templates/
│   │   ├── spec-template.md            Feature specification template
│   │   ├── plan-template.md            Implementation plan template (used with /speckit.plan)
│   │   ├── tasks-template.md           Developer tasks template (used with /speckit.tasks)
│   │   ├── adr-template.md             Architecture Decision Record template
│   │   ├── changelog-template.md       Version history template
│   │   ├── validation-schema-template.json  JSON Schema template
│   │   ├── test-scenarios-template.md  Test matrix and edge cases template
│   │   ├── rollout-template.md         Feature flag and release plan template
│   │   ├── metrics-template.md         KPI definition template
│   │   └── risks-template.md           Risk register template
│   │
│   ├── schemas/
│   │   ├── spec-structure.json         Validates spec.md required fields and types
│   │   ├── activity-log-event.json     Validates activity log event structure
│   │   └── transaction-model.json      Validates transaction core data model
│   │
│   ├── decisions/                      Architecture Decision Records
│   │   ├── adr-001-role-model.md       Why 6 roles? Why hierarchical?
│   │   ├── adr-002-activity-log-design.md  Why append-only? Why visible?
│   │   ├── adr-003-progressive-disclosure.md  Why avoid hard locks?
│   │   ├── adr-004-role-scoped-writes.md  Why data ownership?
│   │   └── adr-005-tech-agnostic-specs.md  Why hide implementation?
│   │
│   └── research/
│       ├── constitution-rationale.md   Why these principles?
│       ├── user-personas.md            Who uses the portal? What do they need?
│       ├── competitive-analysis.md     How do competitors solve this?
│       └── transition-plan.md          Data migration and cutover strategy
│
└── .github/
    ├── workflows/
    │   ├── validate-specs.yml          Lint specs for format and completeness
    │   ├── validate-schema.yml         Validate JSON schemas
    │   ├── validate-dependencies.yml   Detect circular dependencies
    │   ├── version-check.yml           Ensure changelog updated
    │   └── pr-checks.yml               Composite validation on every PR
    ├── ISSUE_TEMPLATE/
    │   ├── spec-update.md              Propose spec change
    │   ├── spec-new.md                 Request new feature spec
    │   ├── bug-report.md               Report spec issue
    │   └── question.md                 Ask about portal design
    ├── pull_request_template.md        PR checklist for spec changes
    ├── CODEOWNERS                      Who owns which specs
    └── dependabot.yml                  Dependency updates
```

---

## 🚀 Getting Started

### As a Product Manager/Designer

1. Read **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** to understand project principles, roles, and the 11-stage transaction lifecycle
2. Pick a feature spec from **[.specify/specs/](/.specify/specs/)** (e.g., `001-dashboard/spec.md`)
3. Follow the [User Scenarios](#) and [Functional Requirements](#) to understand what the portal does
4. Check **[ARCHITECTURE.md](ARCHITECTURE.md)** to see how screens connect and data flows

### As a Developer

1. Read **[STANDARDS.md](STANDARDS.md)** and **[CONTRIBUTING.md](CONTRIBUTING.md)**
2. Find your feature in **[.specify/specs/](/.specify/specs/)**
3. Read the feature's `spec.md` to understand requirements
4. Read `plan.md` for implementation architecture and phases
5. Read `tasks.md` for your specific work
6. Check `validation-schema.json` for data contracts

### As an Architect

1. Start with **[ARCHITECTURE.md](ARCHITECTURE.md)** and **[GLOSSARY.md](GLOSSARY.md)**
2. Dive into **[.specify/decisions/](/.specify/decisions/)** to understand why design choices were made
3. Review **[.specify/specs/000-foundation/spec.md](/.specify/specs/000-foundation/spec.md)** (foundation layer)
4. Check **[.specify/research/](/.specify/research/)** for user research and competitive context

---

## ✍️ Writing a New Spec

Use the `/speckit.specify` command in GitHub Copilot Chat:

```
/speckit.specify
Create a new feature spec for [FEATURE DESCRIPTION]
```

This command will:

- Auto-number the feature (001, 002, etc.)
- Create a branch with semantic naming
- Populate the spec template with your description
- Ensure constitution compliance

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for detailed instructions.

---

## 🔄 Creating an Implementation Plan

Once a spec is approved, use `/speckit.plan`:

```
/speckit.plan
Create implementation plan for spec at [SPEC_FILE_PATH]
```

This translates the spec into:

- Technical architecture (components, layers, services)
- Phased delivery plan (what ships in v1, v1.1, etc.)
- Integration points with existing screens
- Data design and contracts

---

## 📋 Generating Developer Tasks

Once a plan is approved, use `/speckit.tasks`:

```
/speckit.tasks
Generate developer tasks for plan at [PLAN_FILE_PATH]
```

This produces:

- Granular, independently assignable tasks
- Dependency-ordered (data → UI → integration → testing)
- Clear acceptance criteria for each task

---

## 🎨 Portal Architecture at a Glance

The portal consists of **6 screens** serving the **11-stage transaction lifecycle**:

| Screen              | Purpose                                                   | Stage Focus            |
| ------------------- | --------------------------------------------------------- | ---------------------- |
| **Dashboard** (001) | Transaction overview, outstanding actions, activity log   | All stages at a glance |
| **Documents** (002) | All transaction documents, organized by category and role | Throughout all stages  |
| **Messages** (003)  | Secure communication with agent, lender, attorney, CPA    | Throughout all stages  |
| **Insurance** (004) | Homeowner, title, and home warranty info collection       | Stage 6 focus          |
| **Mortgage** (005)  | Mortgage application progress, pre-approval, underwriting | Stage 5 focus          |
| **Services** (006)  | Partner services (inspectors, appraisers, movers)         | Stage 8 focus          |

All built on a shared **Foundation** (000) that provides:

- Authenticated session context
- Sticky top navigation
- Design token system (colours, typography, spacing)
- Badge and alert systems
- Activity logging

---

## 👥 Roles & Permissions

The portal supports 6 roles:

| Role                    | Abbrev | Can Upload           | Can Message   | Can Edit  | Portal Admin |
| ----------------------- | ------ | -------------------- | ------------- | --------- | ------------ |
| Client (Buyer)          | CL     | Insurance, Financial | ✓             | Own forms | ✗            |
| Real Estate Agent       | AG     | Purchase & Sale      | ✓             | ✗         | ✗            |
| Mortgage Lender         | LN     | Mortgage & Financial | ✓             | ✗         | ✗            |
| Closing Attorney        | AT     | Legal & Closing      | ✓             | ✗         | ✗            |
| CPA / Tax Advisor       | CP     | (read-only)          | ✓             | ✗         | ✗            |
| Transaction Coordinator | TC     | Any                  | ✓ (broadcast) | ✓ (admin) | ✓            |

See **[GLOSSARY.md](GLOSSARY.md)** for detailed role definitions.

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from constitution):

- **P-01: Client-First Clarity** — Every screen answers "What do I need to do right now?" within 60 seconds
- **P-02: Single Source of Truth** — Portal is the authoritative record; no cross-referencing external tools
- **P-03: Role-Scoped Access** — Each role owns their data; no overwrites without audit trail
- **P-04: Progressive Disclosure** — Complex workflows show what's needed next; completed sections collapse
- **P-05: Graceful Incompleteness** — No hard locks; use badges and banners to indicate incomplete state
- **P-06: Technology-Agnostic Specs** — Specs describe _what_ and _why_; never _how_ or with framework names
- **P-07: Audit-Visible Activity** — Every meaningful state change produces a visible activity log entry

---

## 🔗 Cross-References

- **Spec-Driven Development Philosophy**: [SPEC-DRIVEN.md](SPEC-DRIVEN.md)
- **Global Project Constitution**: [.specify/memory/constitution.md](/.specify/memory/constitution.md)
- **Implementation Standards**: [STANDARDS.md](STANDARDS.md)
- **Portal Architecture**: [ARCHITECTURE.md](ARCHITECTURE.md)
- **Contributing Guidelines**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📞 Questions?

- Check [FAQ.md](FAQ.md) for common questions
- See [GLOSSARY.md](GLOSSARY.md) for terminology
- Open an issue using [.github/ISSUE_TEMPLATE/question.md](.github/ISSUE_TEMPLATE/question.md)

---

## 📄 License & Attribution

This specification kit is maintained by The Burkes Group Product and Engineering teams. All specifications are proprietary; external sharing requires explicit approval.

**Version**: 1.0  
**Last Updated**: April 10, 2026  
**Maintained by**: [See CODEOWNERS](.github/CODEOWNERS)

---

> **The power is in the clarity of intent.** When specifications are precise, unambiguous, and discoverable, implementation becomes a mechanical transformation. This repo ensures that transformation happens right the first time.
