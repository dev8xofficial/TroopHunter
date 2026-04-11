# The Burkes Group Service Partner Portal — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's **Service Partner Portal** — a single-page web application designed to empower home service providers (plumbers, electricians, roofers, inspectors) to manage their referral pipeline, active jobs, quotes, customer reviews, service areas, earnings, and company profile end-to-end.

This repository is the **single source of truth** for all product decisions, designs, and implementation guidance. Code serves these specifications, not the reverse.

---

## 📋 Quick Navigation

### For New Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write specs (tone, structure, naming)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business and technical vocabulary
- **[FAQ.md](FAQ.md)** — Common questions about portal design and partner roles

### For Product & Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Portal architecture, data flow, integration points
- **[ROADMAP.md](ROADMAP.md)** — Feature prioritization and release timeline
- **[GOVERNANCE.md](GOVERNANCE.md)** — Decision-making process and approval gates

### For Implementation

- **[.specify/specs/](/.specify/specs/)** — Feature specifications (000-foundation through 008-profile)
- **[.specify/templates/](/.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle, data vocab)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](/.specify/research/)** — User research, competitive analysis, rationale

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the Service Partner Portal. In SDD:

- **Specifications are the source of truth** — they describe _what_ the system does and _why_, in technology-agnostic language
- **Code is the manifestation** — developers translate specs into working systems
- **Plans bridge the gap** — implementation plans translate specs into technical architecture before coding begins

Every feature in this portal is governed by:

1. A **Feature Specification** (what the partner experiences, what the system does)
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
│   │   ├── 001-dashboard/              Partner dashboard overview
│   │   ├── 002-referrals/              Referral pipeline management
│   │   ├── 003-active-jobs/            Job tracking and management
│   │   ├── 004-quotes/                 Quote creation and management
│   │   ├── 005-reviews/                Customer review management
│   │   ├── 006-service-areas/          Service area configuration
│   │   ├── 007-earnings/               Earnings and payment tracking
│   │   └── 008-profile/                Company profile management
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

The portal consists of **8 screens** serving the full service partner workflow:

| Screen                      | Purpose                                                         | Primary Focus                |
| --------------------------- | --------------------------------------------------------------- | ---------------------------- |
| **Dashboard** (001)         | KPI overview, new referral requests, service areas, quick actions | Daily partner command centre |
| **Referrals** (002)         | Full referral list, filtering, status tracking                  | Lead pipeline management     |
| **Active Jobs** (003)       | Job tracking, scheduling, scope details                         | In-progress work management  |
| **Quotes** (004)            | Quote creation, sent quotes, statistics                         | Pricing and estimation       |
| **Reviews** (005)           | Customer reviews, ratings, response management                  | Reputation management        |
| **Service Areas** (006)     | Active zip codes, recommended areas, area management            | Coverage configuration       |
| **Earnings** (007)          | Revenue tracking, payment history, platform fees                | Financial management         |
| **Profile** (008)           | Business info, service categories, notifications, account status | Company configuration        |

All built on a shared **Foundation** (000) providing:

- Authenticated partner session context
- Sticky top navigation with "Service Partner" badge
- Design token system (colours, typography, spacing)
- Status badge and alert systems
- Activity logging

---

## 👤 Portal User

The Service Partner Portal is designed for the **Service Partner (SP)** role. For the reference implementation, the partner is:

- **Name**: Marcus Rivera
- **Initials**: MR
- **Role**: Service Partner
- **Company**: Woodlands Plumbing Pro
- **Service Category**: Plumbing Services

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from the constitution):

- **P-01: Partner-First Clarity** — Every screen answers "What do I need to action right now?" within 60 seconds
- **P-02: Single Source of Truth** — The portal is the authoritative record; no cross-referencing external tools
- **P-03: Role-Scoped Access** — Partner owns their referral data; agent and admin portals are separate
- **P-04: Progressive Disclosure** — Complex flows (quote creation, profile updates) use stepped forms
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
**Last Updated**: April 12, 2026
**Maintained by**: [See CODEOWNERS](.github/CODEOWNERS)

> **The power is in the clarity of intent.** When specifications are precise, unambiguous, and discoverable, implementation becomes a mechanical transformation. This repo ensures that transformation happens right the first time.
