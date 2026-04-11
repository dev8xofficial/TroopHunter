# The Burkes Group Attorney Portal — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's **Attorney Portal** — a single-page web application designed to empower closing attorneys to manage real estate transaction verification, document review, client oversight, and closing compliance end-to-end.

This repository is the **single source of truth** for all product decisions, designs, and implementation guidance. Code serves these specifications, not the reverse.

---

## 📋 Quick Navigation

### For New Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write specs (tone, structure, naming)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business and technical vocabulary
- **[FAQ.md](FAQ.md)** — Common questions about portal design and attorney roles

### For Product & Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Portal architecture, data flow, integration points
- **[ROADMAP.md](ROADMAP.md)** — Feature prioritization and release timeline
- **[GOVERNANCE.md](GOVERNANCE.md)** — Decision-making process and approval gates

### For Implementation

- **[.specify/specs/](/.specify/specs/)** — Feature specifications (000-foundation through 005-verification)
- **[.specify/templates/](/.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle, data vocab)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](/.specify/research/)** — User research, competitive analysis, rationale

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the Attorney Portal. In SDD:

- **Specifications are the source of truth** — they describe _what_ the system does and _why_, in technology-agnostic language
- **Code is the manifestation** — developers translate specs into working systems
- **Plans bridge the gap** — implementation plans translate specs into technical architecture before coding begins

Every feature in this portal is governed by:

1. A **Feature Specification** (`spec.md`) — what the attorney experiences, what the system does
2. An **Implementation Plan** (`plan.md`) — technical architecture, phases, components, integration points
3. **Developer Tasks** (`tasks.md`) — granular, assignable work with acceptance criteria and dependency ordering
4. **Supporting Artifacts** — decisions, validation schemas, test scenarios, rollout plans, metrics, risks, changelog

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
├── SPEC-DRIVEN.md                      SDD philosophy and methodology
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md             Project charter (principles, roles, stages, vocab, reference data)
│   │
│   ├── specs/
│   │   ├── 000-foundation/             Global nav, design tokens, session context, activity log
│   │   │   ├── spec.md                 Feature specification
│   │   │   ├── plan.md                 Implementation plan (phases, components, data design)
│   │   │   ├── tasks.md                Developer tasks with acceptance criteria
│   │   │   ├── changelog.md            Version history for this spec
│   │   │   ├── validation-schema.json  JSON Schema for this spec's data
│   │   │   ├── test-scenarios.md       Acceptance test scenarios
│   │   │   ├── rollout.md              Deployment and rollout strategy
│   │   │   ├── metrics.md              Success metrics and KPIs
│   │   │   └── risks.md                Risk register for this feature
│   │   │
│   │   ├── 001-dashboard/              Attorney dashboard (KPIs, splits, table, activity)
│   │   │   └── [same 9 files as above]
│   │   │
│   │   ├── 002-transactions/           Full transaction list, filtering, tabbed views
│   │   │   └── [same 9 files as above]
│   │   │
│   │   ├── 003-documents/              Document review, approval, rejection, upload
│   │   │   └── [same 9 files as above]
│   │   │
│   │   ├── 004-clients/                Client profile management and messaging
│   │   │   └── [same 9 files as above]
│   │   │
│   │   └── 005-verification/           Closing verification workflow
│   │       └── [same 9 files as above]
│   │
│   ├── templates/                      Reusable spec templates
│   │   ├── spec-template.md
│   │   ├── plan-template.md
│   │   ├── tasks-template.md
│   │   ├── changelog-template.md
│   │   ├── metrics-template.md
│   │   ├── risks-template.md
│   │   ├── rollout-template.md
│   │   ├── test-scenarios-template.md
│   │   ├── adr-template.md
│   │   └── validation-schema-template.json
│   │
│   ├── schemas/                        JSON Schema validation files
│   │   ├── spec-structure.json         Schema for spec.md metadata
│   │   ├── activity-log-event.json     Schema for activity log events (all screens write to this)
│   │   ├── transaction-model.json      Schema for transaction records
│   │   ├── client-model.json           Schema for client records
│   │   ├── document-model.json         Schema for document records
│   │   ├── verification-model.json     Schema for verification records (attorney sign-off)
│   │   └── dashboard-model.json        Schema for dashboard data payload
│   │
│   ├── decisions/                      Architecture Decision Records
│   │   ├── adr-001-role-model.md                   Attorney (AT) as primary portal role
│   │   ├── adr-002-verification-workflow.md         5-step pipeline design
│   │   ├── adr-003-progressive-disclosure.md        Stepped modal pattern for complex flows
│   │   ├── adr-004-document-review-authority.md     Attorney as document approver
│   │   ├── adr-005-tech-agnostic-specs.md           No framework references in specs
│   │   ├── adr-006-design-token-system.md           Two-tier token architecture
│   │   ├── adr-007-activity-log-contract.md         Append-only audit event stream
│   │   └── adr-008-cross-portal-data-sharing.md     Shared backend, no direct portal coupling
│   │
│   └── research/                       User research and competitive analysis
│       ├── user-personas.md            Attorney persona (Sarah Mitchell reference user)
│       └── competitive-analysis.md     Survey of SoftPro, Qualia, ResWare, RamQuest
│
└── .github/
    ├── workflows/                      CI/CD validation pipelines
    │   ├── validate-specs.yml
    │   ├── validate-schema.yml
    │   ├── validate-dependencies.yml
    │   ├── pr-checks.yml
    │   └── version-check.yml
    ├── ISSUE_TEMPLATE/
    │   ├── bug-report.md
    │   ├── question.md
    │   ├── spec-new.md
    │   └── spec-update.md
    ├── pull_request_template.md
    ├── plan.prompt.md
    ├── specify.prompt.md
    ├── tasks.prompt.md
    ├── CODEOWNERS
    └── dependabot.yml
```

---

## 🎨 Portal Architecture at a Glance

The portal consists of **5 screens** serving the full attorney closing workflow:

| Screen | Purpose | Primary Focus |
|--------|---------|---------------|
| **Dashboard** (001) | KPI overview, asset split reviews, transaction table, deadlines | Daily attorney command centre |
| **Transactions** (002) | Full transaction list, filtering, tabbed views, status tracking | All transaction types |
| **Documents** (003) | Document review, approval, rejection, upload | Legal document management |
| **Clients** (004) | Client profiles, case management, messaging | Relationship management |
| **Verification** (005) | Closing amount verification, progress steps, flagging | Compliance & accuracy |

All built on a shared **Foundation** (000) providing:

- Authenticated attorney session context
- Sticky top navigation (72px, 5 screens)
- Design token system (16 colour tokens, Archivo + Manrope, 4 shadow levels)
- Badge and alert systems (5 badge variants, 4 alert types)
- Activity logging (7 canonical event types, append-only)
- Modal / overlay system (8 named modals across all screens)

---

## 📐 Per-Spec File Reference

Every spec folder contains exactly **9 files**:

| File | Purpose | Who Reads It |
|------|---------|-------------|
| `spec.md` | Feature specification: what, why, scenarios, functional requirements, success criteria | Everyone |
| `plan.md` | Implementation plan: architecture, phases, data design, integration points | Engineers, Architects |
| `tasks.md` | Developer task list with acceptance criteria and dependency order | Engineers |
| `changelog.md` | Version history for this spec's changes | Product, Engineers |
| `validation-schema.json` | JSON Schema validating this feature's primary data shape | CI/CD, Engineers |
| `test-scenarios.md` | Acceptance test scenarios mapped to functional requirements | QA, Engineers |
| `rollout.md` | Deployment strategy, feature flags, phasing | DevOps, Product |
| `metrics.md` | Success metrics and KPIs to measure post-launch | Product, Analytics |
| `risks.md` | Risk register with likelihood, impact, and mitigations | Product, Engineering Lead |

---

## 🗂 Schema Index

| Schema | Used By | Validates |
|--------|---------|----------|
| `spec-structure.json` | CI validate-specs workflow | spec.md frontmatter |
| `activity-log-event.json` | All screens, Foundation service | Every activity log event |
| `transaction-model.json` | 001-dashboard, 002-transactions, 005-verification | Transaction records |
| `client-model.json` | 004-clients | Client records |
| `document-model.json` | 003-documents | Document records |
| `verification-model.json` | 005-verification | Verification sign-off records |
| `dashboard-model.json` | 001-dashboard | Dashboard API payload |

---

## 🏛 Architecture Decision Record Index

| ADR | Decision | Status |
|-----|---------|--------|
| ADR-001 | Attorney (AT) as the primary portal user role | Accepted |
| ADR-002 | 5-step verification pipeline as the canonical workflow | Accepted |
| ADR-003 | Progressive disclosure via stepped modals for complex flows | Accepted |
| ADR-004 | Attorney as the exclusive document approver/rejector | Accepted |
| ADR-005 | Technology-agnostic spec language (no framework names in specs) | Accepted |
| ADR-006 | Two-tier design token system (primitives + semantic tokens) | Accepted |
| ADR-007 | Activity log as an append-only, schema-validated audit contract | Accepted |
| ADR-008 | Cross-portal data sharing via shared backend (no direct portal coupling) | Accepted |

---

## 👤 Portal User

The Attorney Portal is designed for the **Closing Attorney (AT)** role. For the reference implementation, the attorney is:

- **Name**: Sarah Mitchell
- **Initials**: SM
- **Role**: Closing Attorney
- **Firm**: The Burkes Group (legal counsel)

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from the constitution):

- **P-01: Attorney-First Clarity** — Every screen answers "What requires my verification right now?" within 60 seconds
- **P-02: Single Source of Truth** — The portal is the authoritative record; no cross-referencing external tools
- **P-03: Role-Scoped Access** — Attorney sees only transactions assigned to them; can verify, flag, review
- **P-04: Progressive Disclosure** — Complex flows (verification, flagging) use stepped modals
- **P-05: Graceful Incompleteness** — No hard locks; badges and banners indicate pending state
- **P-06: Technology-Agnostic Specs** — Specs describe _what_ and _why_; never _how_ or with framework names
- **P-07: Audit-Visible Activity** — Every verification, approval, and flag produces a visible activity log entry

---

## 📞 Questions?

- Check [FAQ.md](FAQ.md) for common questions
- See [GLOSSARY.md](GLOSSARY.md) for terminology
- Open an issue using [.github/ISSUE_TEMPLATE/question.md](.github/ISSUE_TEMPLATE/question.md)

---

**Version**: 1.1
**Last Updated**: April 12, 2026
**Maintained by**: [See CODEOWNERS](.github/CODEOWNERS)

> **The power is in the clarity of intent.** When specifications are precise, unambiguous, and discoverable, implementation becomes a mechanical transformation. This repo ensures that transformation happens right the first time.
