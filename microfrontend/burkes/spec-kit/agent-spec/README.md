# The Burkes Group Agent Portal — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's **Agent Portal** — a single-page web application designed to empower real estate agents to manage their client transactions, documents, communications, calendar, partner referrals, and performance analytics end-to-end.

This repository is the **single source of truth** for all product decisions, designs, and implementation guidance. Code serves these specifications, not the reverse.

---

## 📋 Quick Navigation

### For New Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write specs (tone, structure, naming)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business and technical vocabulary
- **[FAQ.md](FAQ.md)** — Common questions about portal design and agent roles

### For Product & Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Portal architecture, data flow, integration points
- **[ROADMAP.md](ROADMAP.md)** — Feature prioritization and release timeline
- **[GOVERNANCE.md](GOVERNANCE.md)** — Decision-making process and approval gates

### For Implementation

- **[.specify/specs/](/.specify/specs/)** — Feature specifications (000-foundation through 008-reports)
- **[.specify/templates/](/.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle, data vocab)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](/.specify/research/)** — User research, competitive analysis, rationale

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the Agent Portal. In SDD:

- **Specifications are the source of truth** — they describe _what_ the system does and _why_, in technology-agnostic language
- **Code is the manifestation** — developers translate specs into working systems
- **Plans bridge the gap** — implementation plans translate specs into technical architecture before coding begins

Every feature in this portal is governed by:

1. A **Feature Specification** (what the agent experiences, what the system does)
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
│   │   ├── 001-dashboard/              Agent dashboard overview
│   │   ├── 002-transactions/           Transaction management
│   │   ├── 003-documents/              Document upload and management
│   │   ├── 004-clients/                Client profile management
│   │   ├── 005-messages/               Messaging center
│   │   ├── 006-calendar/               Calendar and appointments
│   │   ├── 007-partner-referrals/      Partner directory and referral flow
│   │   └── 008-reports/                Analytics and performance reports
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

The portal consists of **8 screens** serving the full agent workflow:

| Screen                      | Purpose                                                        | Primary Focus               |
| --------------------------- | -------------------------------------------------------------- | --------------------------- |
| **Dashboard** (001)         | KPI overview, active transactions, recent activity, quick actions | Daily agent command centre  |
| **Transactions** (002)      | Full transaction list, stage management, status tracking       | All 11 transaction stages   |
| **Documents** (003)         | Document upload, categorisation, assignment to transactions    | Throughout all stages       |
| **Clients** (004)           | Client profile creation, account management, transaction links | Relationship management     |
| **Messages** (005)          | Inbox, compose, multi-party communication                      | Client + professional comms |
| **Calendar** (006)          | Appointment scheduling, today's agenda, upcoming events        | Scheduling & showings       |
| **Partner Referrals** (007) | Partner directory search, referral submission                  | Service partner ecosystem   |
| **Reports** (008)           | Sales performance, pipeline, commission, area analytics        | Business intelligence       |

All built on a shared **Foundation** (000) providing:

- Authenticated agent session context
- Sticky top navigation
- Design token system (colours, typography, spacing)
- Badge and alert systems
- Activity logging

---

## 👤 Portal User

The Agent Portal is designed for the **Real Estate Agent (AG)** role. For the reference implementation, the agent is:

- **Name**: Sarah Anderson
- **Initials**: SA
- **Role**: Real Estate Agent
- **Brokerage**: The Burkes Group

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from the constitution):

- **P-01: Agent-First Clarity** — Every screen answers "What do I need to action right now?" within 60 seconds
- **P-02: Single Source of Truth** — The portal is the authoritative record; no cross-referencing external tools
- **P-03: Role-Scoped Access** — Agent owns their workflow data; client portal views are separate
- **P-04: Progressive Disclosure** — Complex flows (new transaction, stage updates) use stepped modals
- **P-05: Graceful Incompleteness** — No hard locks; use badges and banners to indicate incomplete state
- **P-06: Technology-Agnostic Specs** — Specs describe _what_ and _why_; never _how_ or with framework names
- **P-07: Audit-Visible Activity** — Every meaningful state change produces a visible activity log entry

---

## 📞 Questions?

- Check [FAQ.md](FAQ.md) for common questions
- See [GLOSSARY.md](GLOSSARY.md) for terminology
- Open an issue using [.github/ISSUE_TEMPLATE/question.md](.github/ISSUE_TEMPLATE/question.md)

---

**Version**: 1.0
**Last Updated**: April 11, 2026
**Maintained by**: [See CODEOWNERS](.github/CODEOWNERS)

> **The power is in the clarity of intent.** When specifications are precise, unambiguous, and discoverable, implementation becomes a mechanical transformation. This repo ensures that transformation happens right the first time.
