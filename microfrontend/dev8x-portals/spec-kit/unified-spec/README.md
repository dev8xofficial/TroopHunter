# Dev8X Unified Spec-Kit

> **Single source of truth** for the Dev8X Talent Management & CRM Platform — functional specifications, API contracts, state machines, RBAC, and business logic.

[![Spec Validation](https://img.shields.io/badge/specs-validated-brightgreen)](#) [![Schema Validation](https://img.shields.io/badge/schemas-valid-blue)](#) [![Modules](https://img.shields.io/badge/modules-39-orange)](#)

---

## Platform Overview

Dev8X is a multi-portal talent management and client services platform. It serves **three external portal audiences** (Candidates, Clients, Admins) and an **internal CRM/Sales platform** — all unified through a shared authentication layer.

| Domain | Code | Modules | Description |
|--------|------|---------|-------------|
| **Authentication** | `0xx` | 5 | Login, registration, MFA, SSO, password recovery |
| **HR Admin** | `1xx` | 9 | Applicant tracking, pipeline, jobs, interviews, evaluations |
| **Candidate** | `2xx` | 7 | Application timeline, interview scheduling, onboarding |
| **Client** | `3xx` | 8 | Projects, invoices, files, working hours, support |
| **CRM/Sales** | `4xx` | 9 | Contacts, deals pipeline, outreach, templates, scoring |

**Total: 39 modules × 13 artifacts = 507 specification files**

---

## Quick Navigation

### Root Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Unified system architecture and domain map |
| [STANDARDS.md](STANDARDS.md) | Writing standards and spec conventions |
| [GLOSSARY.md](GLOSSARY.md) | Cross-domain vocabulary |
| [SPEC-DRIVEN.md](SPEC-DRIVEN.md) | Spec-Driven Development (SDD) methodology |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Contribution guidelines |
| [GOVERNANCE.md](GOVERNANCE.md) | Decision-making process |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community standards |
| [ROADMAP.md](ROADMAP.md) | Platform-wide feature roadmap |
| [CHANGELOG.md](CHANGELOG.md) | Spec-kit evolution log |
| [FAQ.md](FAQ.md) | Frequently asked questions |

### Delivery Phases

| Phase | Scope |
|-------|-------|
| [PHASE-1-DELIVERABLE.md](PHASE-1-DELIVERABLE.md) | Auth + Admin + Candidate domains |
| [PHASE-2-DELIVERABLE.md](PHASE-2-DELIVERABLE.md) | Client + CRM domains |

### Centralized Contracts

| Contract | Purpose |
|----------|---------|
| [contracts/api.yaml](contracts/api.yaml) | Unified REST API manifest |
| [contracts/access-control.yaml](contracts/access-control.yaml) | RBAC matrix (all roles × all domains) |
| [contracts/events.yaml](contracts/events.yaml) | System-wide audit events |
| [contracts/interactions.yaml](contracts/interactions.yaml) | State machines & interaction flows |

### Module Specs

All modules live under `.specify/specs/` with domain-prefixed numbering. Each module contains exactly **13 artifacts**:

```
spec.md · plan.md · tasks.md · changelog.md · metrics.md · risks.md
rollout.md · test-scenarios.md · validation-schema.json · rbac-matrix.md
activity-log-events.md · api-contracts.md · state-machines.md
```

---

## Getting Started

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) for the system overview
2. Read [STANDARDS.md](STANDARDS.md) for spec writing conventions
3. Browse [.specify/specs/](.specify/specs/) for module-level specifications
4. Check [contracts/](contracts/) for cross-cutting platform contracts
5. Review [.specify/decisions/](.specify/decisions/) for architectural decisions

---

## Repository Structure

```
unified-spec/
├── README.md                      ← You are here
├── ARCHITECTURE.md                # System architecture
├── STANDARDS.md                   # Writing conventions
├── GLOSSARY.md                    # Vocabulary
├── contracts/                     # Centralized YAML contracts
│   ├── api.yaml
│   ├── access-control.yaml
│   ├── events.yaml
│   └── interactions.yaml
├── schemas/                       # JSON Schema definitions
├── .specify/
│   ├── memory/constitution.md     # Platform constitution
│   ├── specs/                     # 39 module directories
│   ├── templates/                 # Artifact templates
│   ├── decisions/                 # ADR registry
│   ├── research/                  # User research & analysis
│   └── schemas/                   # Meta-schemas
├── .github/                       # CI/CD automation
│   ├── workflows/                 # 5 validation workflows
│   └── ISSUE_TEMPLATE/            # 4 issue templates
└── reference/                     # Source HTML archive
```

---

## License

This specification kit is proprietary to Dev8X. All rights reserved.
