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

1. A **Feature Specification** (what the attorney experiences, what the system does)
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
├── SPEC-DRIVEN.md                      SDD philosophy and methodology
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md             Project charter (principles, roles, stages, vocab)
│   │
│   ├── specs/
│   │   ├── 000-foundation/             Global nav, design tokens, session context
│   │   │   ├── spec.md
│   │   │   ├── changelog.md
│   │   │   ├── validation-schema.json
│   │   │   ├── test-scenarios.md
│   │   │   ├── rollout.md
│   │   │   ├── metrics.md
│   │   │   └── risks.md
│   │   ├── 001-dashboard/              Attorney dashboard overview
│   │   ├── 002-transactions/           Transaction management
│   │   ├── 003-documents/              Document review and management
│   │   ├── 004-clients/                Client profile management
│   │   └── 005-verification/           Closing verification workflow
│   │
│   ├── templates/                      Reusable spec templates
│   ├── schemas/                        JSON Schema validation files
│   ├── decisions/                      Architecture Decision Records
│   └── research/                       User research and competitive analysis
│
└── .github/
    ├── workflows/                      CI/CD validation pipelines
    ├── ISSUE_TEMPLATE/                 Structured issue templates
    ├── pull_request_template.md
    ├── CODEOWNERS
    └── dependabot.yml
```

---

## 🎨 Portal Architecture at a Glance

The portal consists of **5 screens** serving the full attorney closing workflow:

| Screen                      | Purpose                                                        | Primary Focus               |
| --------------------------- | -------------------------------------------------------------- | --------------------------- |
| **Dashboard** (001)         | KPI overview, asset split reviews, transaction table, deadlines | Daily attorney command centre |
| **Transactions** (002)      | Full transaction list, filtering, status tracking              | All transaction types        |
| **Documents** (003)         | Document review, approval, rejection, upload                   | Legal document management    |
| **Clients** (004)           | Client profiles, case management, messaging                    | Relationship management      |
| **Verification** (005)      | Closing amount verification, progress steps, flagging          | Compliance & accuracy        |

All built on a shared **Foundation** (000) providing:

- Authenticated attorney session context
- Sticky top navigation
- Design token system (colours, typography, spacing)
- Badge and alert systems
- Activity logging
- Modal / overlay system

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

**Version**: 1.0
**Last Updated**: April 12, 2026
**Maintained by**: [See CODEOWNERS](.github/CODEOWNERS)

> **The power is in the clarity of intent.** When specifications are precise, unambiguous, and discoverable, implementation becomes a mechanical transformation. This repo ensures that transformation happens right the first time.