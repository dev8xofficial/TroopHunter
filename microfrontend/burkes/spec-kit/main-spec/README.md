# The Burkes Group Main Portal — Specification Kit

Welcome to the authoritative specification repository for The Burkes Group's **Main Portal** — the central authentication and routing hub designed to verify users and securely route them to their respective specialized portals (Client, Attorney, CPA, Agent, Lender, Service Partner, Admin).

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

- **[.specify/specs/](/.specify/specs/)** — Feature specifications (000-foundation through 004-password-reset)
- **[.specify/templates/](/.specify/templates/)** — Templates for specs, plans, tasks, and supporting artifacts
- **[CHANGELOG.md](CHANGELOG.md)** — Spec-kit evolution and version history

### For Knowledge

- **[.specify/memory/constitution.md](/.specify/memory/constitution.md)** — Project constitution (principles, roles, lifecycle, data vocab)
- **[.specify/decisions/](/.specify/decisions/)** — Architecture Decision Records (why we chose X over Y)
- **[.specify/research/](/.specify/research/)** — User research, competitive analysis, rationale

---

## 🎯 What Is This?

This specification kit implements **Spec-Driven Development (SDD)** for the Main Portal. In SDD:

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
├── SPEC-DRIVEN.md                      SDD philosophy and methodology
│
├── .specify/
│   ├── memory/
│   │   └── constitution.md             Project charter (principles, roles, stages, vocab)
│   │
│   ├── specs/
│   │   ├── 000-foundation/             Global styles, base components, alerts
│   │   │   ├── spec.md
│   │   │   ├── changelog.md
│   │   │   ├── validation-schema.json
│   │   │   ├── test-scenarios.md
│   │   │   ├── rollout.md
│   │   │   ├── metrics.md
│   │   │   └── risks.md
│   │   ├── 001-authentication/         Login form, email/password logic, session manager
│   │   ├── 002-mfa/                    Two-factor authentication logic
│   │   ├── 003-role-routing/           Role selection cards and environment navigation
│   │   └── 004-password-reset/         Password recovery workflows
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

The portal consists of **4 modules** serving the authentication and routing workflow:

| Screen                   | Purpose                                                    | Primary Focus              |
| ------------------------ | ---------------------------------------------------------- | -------------------------- |
| **Authentication** (001) | Role-based login gateway for all users                     | User identity verification |
| **Two-Factor MFA** (002) | Secondary verification stage and device trust              | Enhanced security          |
| **Role Routing** (003)   | Navigation capabilities defining what each role can access | System delegation          |
| **Password Reset** (004) | Account recovery mechanism                                 | Access restoration         |

All built on a shared **Foundation** (000) providing:

- Design token system (colours, typography, spacing)
- Container classes and responsive structure
- Brand identity configuration
- Common alerts and badges

---

## 👤 Portal User

The Main Portal is designed for **All User Roles** attempting to access The Burkes Group platform.

- Client
- Attorney
- CPA
- Real Estate Agent
- Mortgage Lender
- Service Partner
- Administrator

---

## 📚 Key Principles

Every spec in this kit adheres to these principles (from the constitution):

- **P-01: Identity First** — The system must establish absolute certainty of user identity before routing
- **P-02: Single Source of Truth** — The portal is the authoritative routing gateway
- **P-03: Total Isolation** — The routing ensures users never accidentally access alternative portal environments
- **P-04: Graceful Degradation** — Authentication errors provide clear but security-conscious feedback
- **P-05: Technology-Agnostic Specs** — Specs describe _what_ and _why_; never _how_ or with framework names
- **P-06: Maximum Security** — Authentication involves standard industry practices such as encryption and session expiries

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
