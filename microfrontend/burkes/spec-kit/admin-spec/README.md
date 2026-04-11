# The Burkes Group Admin Portal — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's **Admin Portal** — a single-page web application designed to empower Transaction Coordinators and Administrators to manage users, service partners, real estate transactions, documents, and platform analytics end-to-end.

This repository is the **single source of truth** for all product decisions, designs, and implementation guidance for the Admin Portal. Code serves these specifications, not the reverse.

---

## 📋 Quick Navigation

### For New Contributors

- **[STANDARDS.md](STANDARDS.md)** — How to write specs (tone, structure, naming)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to propose changes and submit PRs
- **[GLOSSARY.md](GLOSSARY.md)** — Business and technical vocabulary
- **[FAQ.md](FAQ.md)** — Common questions about portal design and admin roles

### For Product & Architecture Review

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Portal architecture, data flow, integration points
- **[ROADMAP.md](ROADMAP.md)** — Feature prioritization and release timeline
- **[GOVERNANCE.md](GOVERNANCE.md)** — Decision-making process and approval gates

### For Implementation

- **[.specify/specs/](/.specify/specs/)** — Feature specifications (000-foundation through 006-analytics)
- **[.specify/templates/](/.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle, data vocab)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](/.specify/research/)** — User research, competitive analysis, rationale

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the Admin Portal. In SDD:

- **Specifications are the source of truth** — they describe _what_ the system does and _why_, in technology-agnostic language
- **Code is the manifestation** — developers translate specs into working systems
- **Plans bridge the gap** — implementation plans translate specs into technical architecture before coding begins

---

## 📁 Repository Structure

```
.
├── README.md
├── STANDARDS.md
├── ARCHITECTURE.md
├── GLOSSARY.md
├── FAQ.md
├── ROADMAP.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── CODE_OF_CONDUCT.md
├── SPEC-DRIVEN.md
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md
│   ├── specs/
│   │   ├── 000-foundation/
│   │   ├── 001-dashboard/
│   │   ├── 002-users/
│   │   ├── 003-partners/
│   │   ├── 004-transactions/
│   │   ├── 005-documents/
│   │   └── 006-analytics/
│   ├── templates/
│   ├── schemas/
│   ├── decisions/
│   └── research/
│
└── .github/
    ├── workflows/
    ├── ISSUE_TEMPLATE/
    ├── pull_request_template.md
    ├── CODEOWNERS
    └── dependabot.yml
```

---

## 🎨 Portal Architecture at a Glance

The Admin Portal consists of **6 screens** serving the full administrative workflow:

| Screen                 | Purpose                                                               | Primary Focus              |
| ---------------------- | --------------------------------------------------------------------- | -------------------------- |
| **Dashboard** (001)    | KPI overview, recent activity, pending approvals, quick admin actions | Daily admin command centre |
| **Users** (002)        | Manage all user accounts, roles, permissions, and approval queue      | User lifecycle management  |
| **Partners** (003)     | Service partner directory, approvals, zip code coverage               | Partner network management |
| **Transactions** (004) | All transactions across all clients, stage management, approvals      | Full transaction oversight |
| **Documents** (005)    | Platform-wide document review, approval, and rejection queue          | Document compliance        |
| **Analytics** (006)    | Revenue, user growth, transaction volume, partner performance         | Business intelligence      |

---

## 👤 Portal User

The Admin Portal is designed for the **Administrator / Transaction Coordinator (TC)** role. For the reference implementation, the admin is:

- **Name**: Sarah Burke
- **Initials**: SB
- **Role**: Administrator
- **Organization**: The Burkes Group

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from the constitution):

- **P-01: Admin-First Oversight** — Every screen surfaces actionable items needing attention within 30 seconds
- **P-02: Centralized Authority** — The Admin Portal is the single point of control for all platform entities
- **P-03: Role-Gated Operations** — All destructive or approval actions require admin confirmation
- **P-04: Audit Completeness** — Every admin action is logged with actor, timestamp, and outcome
- **P-05: Progressive Action** — Complex admin workflows (add user, add partner) use modal forms
- **P-06: Technology-Agnostic Specs** — Specs describe _what_ and _why_; never _how_
- **P-07: Platform Integrity** — Admin actions that affect end users trigger notifications

---

**Version**: 1.0
**Last Updated**: April 11, 2026
**Maintained by**: The Burkes Group Platform Team
