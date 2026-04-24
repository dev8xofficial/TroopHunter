# Spec-Kit Comparison Analysis
## The Burkes Group — Portal Spec-Kits vs. CRM Spec-Kit

**Document Type**: Architectural Review & Standards Evaluation  
**Prepared By**: Senior System Architect  
**Date**: April 22, 2026  
**Version**: 1.0  
**Scope**: All seven spec-kits — Admin, Agent, Attorney, Client, Main, ServicePartner (portals) and CRM (internal platform)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Evaluation Criteria](#2-evaluation-criteria)
3. [Structural Inventory](#3-structural-inventory)
4. [Criterion 1 — Structure & Organization](#4-criterion-1--structure--organization)
5. [Criterion 2 — Naming Conventions](#5-criterion-2--naming-conventions)
6. [Criterion 3 — Modularity & Scalability](#6-criterion-3--modularity--scalability)
7. [Criterion 4 — Clarity & Completeness](#7-criterion-4--clarity--completeness)
8. [Criterion 5 — GitHub Integration & CI/CD](#8-criterion-5--github-integration--cicd)
9. [Cross-Kit Comparison Matrix](#9-cross-kit-comparison-matrix)
10. [Per-Kit Strengths, Weaknesses & Gaps](#10-per-kit-strengths-weaknesses--gaps)
11. [Final Ranking & Recommendation](#11-final-ranking--recommendation)
12. [Actionable Improvement Plan](#12-actionable-improvement-plan)
13. [Reference: GitHub Spec-Kit Standard Checklist](#13-reference-github-spec-kit-standard-checklist)

---

## 1. Executive Summary

Seven spec-kits were extracted, inventoried, and evaluated against a defined set of GitHub spec-kit standards. The kits divide into two architectural families:

- **Portal family** (6 kits): Admin, Agent, Attorney, Client, Main, ServicePartner — external-facing portals built on a shared `.specify/` spec pattern.
- **CRM kit** (1 kit): The internal operational platform — follows the `.specify/` pattern but extends it with a parallel declarative YAML layer covering screens, components, layout, API contracts, and design tokens.

**Key findings**:

- **Agent** and **ServicePartner** are the closest to the GitHub spec-kit gold standard for portal-class kits, with perfect per-module file sets and consistent structure.
- **Attorney** exceeds the standard portal spec pattern by adding `plan.md` and `tasks.md` per feature module — the most implementation-ready portal kit.
- **CRM** is the most sophisticated kit overall, adding 8 ADRs, 6 research documents, a 17-module feature scope, and a fully-declarative YAML contract layer unprecedented in the portal kits. However, it has the weakest GitHub automation (1 workflow, 1 issue template vs. 5 and 4 for portals).
- **Admin** has a structural defect: a duplicate, stale `constitution.md` at the root that diverges from the canonical copy in `.specify/memory/`, and root-level feature directories (`001-dashboard/`, `002-users/`, etc.) that shadow the `.specify/specs/` hierarchy with an inconsistent file set.
- **Client** has an empty, uncompleted module (`007-transactions`) and is the only kit with a missing `validation-schema.json` in a feature module.
- **Main** is appropriately scoped (authentication gateway only) but is the only portal kit without a root-level `constitution.md` symlink, and its spec modules do not include the full 11-file artifact set.

---

## 2. Evaluation Criteria

The following criteria are derived from GitHub spec-kit community standards, Spec-Driven Development (SDD) best practices, and consistency observations across this kit family.

### C-1: Structure & Organization
A conforming spec-kit must have:
- A clearly defined root-level documentation layer (`README.md`, `STANDARDS.md`, `ARCHITECTURE.md`, `GLOSSARY.md`, `FAQ.md`, `ROADMAP.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `CODE_OF_CONDUCT.md`, `SPEC-DRIVEN.md`).
- A `.specify/` directory containing: `memory/`, `specs/`, `templates/`, `schemas/`, `decisions/`, `research/`.
- A `.github/` directory containing: `workflows/`, `ISSUE_TEMPLATE/`, `pull_request_template.md`, `CODEOWNERS`, `dependabot.yml`, and AI-assist prompt files (`specify.prompt.md`, `plan.prompt.md`, `tasks.prompt.md`).
- No conflicting or duplicated structural artifacts at the root level.

### C-2: Naming Conventions
- Feature modules named with zero-padded numeric prefix (`000-`, `001-`, `002-`, …) followed by a kebab-case slug.
- Root documents in `SCREAMING_SNAKE_CASE` (e.g., `README.md`, `STANDARDS.md`).
- Artifact files inside modules in `kebab-case` with `.md` or `.json` extension.
- Schema files in the `.specify/schemas/` directory named `<entity>-<type>.json` (e.g., `transaction-model.json`, `activity-log-event.json`).
- No camelCase, PascalCase, or mixed patterns in file or directory names.

### C-3: Modularity & Scalability
- Each feature module must be self-contained and include a consistent, complete artifact set.
- The standard portal artifact set (11 files) is: `spec.md`, `changelog.md`, `metrics.md`, `risks.md`, `rollout.md`, `test-scenarios.md`, `validation-schema.json`, `rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, `state-machines.md`.
- Templates must exist for every artifact type so new modules can be seeded consistently.
- Foundation module (`000-foundation`) must be present and complete in every kit.

### C-4: Clarity & Completeness
- `constitution.md` must exist in `.specify/memory/` and be the single authoritative source.
- Each ADR file should address a distinct architectural decision.
- Research files should include at minimum a `user-personas.md`.
- No stub modules (a module directory that exists but contains only a single file).
- No empty module directories.

### C-5: GitHub Integration & CI/CD
- Minimum 4 GitHub Actions workflows: `validate-specs.yml`, `validate-schema.yml`, `validate-dependencies.yml`, `pr-checks.yml`.
- Minimum 4 issue templates: `bug-report.md`, `question.md`, `spec-new.md`, `spec-update.md`.
- `CODEOWNERS` file present.
- `dependabot.yml` present.
- Pull request template present.
- AI-assist prompt files present (`specify.prompt.md`, `plan.prompt.md`, `tasks.prompt.md`).

---

## 3. Structural Inventory

### 3.1 File Count & Module Count

| Spec-Kit | Total Files | Feature Modules | Files/Module (avg) | Unique Layer |
|---|---|---|---|---|
| Admin | 139 | 8 (.specify) + 7 (root duplicate) | 7 | Root-level duplicate dirs |
| Agent | 146 | 9 | 11 | — |
| Attorney | 129 | 6 | 13 | plan.md + tasks.md per module |
| Client | 123 | 8 | 11 (7 stub) | — |
| CRM | 246 | 17 | 9 | YAML declarative layer, root schemas/ |
| Main | 81 | 5 | 7 | — |
| ServicePartner | 146 | 9 | 11 | — |

### 3.2 Per-Module Artifact Availability

The table below maps which artifact files are present in each kit's feature modules. ✅ = present in all modules, ⚠️ = present in most (with exceptions), ❌ = absent.

| Artifact File | Admin | Agent | Attorney | Client | CRM | Main | ServicePartner |
|---|---|---|---|---|---|---|---|
| `spec.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `changelog.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `metrics.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `risks.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `rollout.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `test-scenarios.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `validation-schema.json` | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ |
| `rbac-matrix.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `activity-log-events.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `api-contracts.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `state-machines.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `plan.md` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `tasks.md` | ❌ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ |

> **Note on CRM**: The four missing per-module artifacts (`rbac-matrix`, `activity-log-events`, `api-contracts`, `state-machines`) are replaced by root-level YAML contract files (`access_control.yaml`, `events.yaml`, `api.yaml`, `interactions.yaml`). This is an intentional architectural trade-off, not an oversight — see Section 6.

### 3.3 Support Infrastructure Inventory

| Metric | Admin | Agent | Attorney | Client | CRM | Main | ServicePartner |
|---|---|---|---|---|---|---|---|
| ADR Count | 5 | 5 | 8 | 5 | 8 | 5 | 5 |
| Research Files | 1 | 1 | 2 | 4 | 6 | 1 | 1 |
| `.specify/schemas/` | 3 | 3 | 7 | 3 | 3 (meta) | 3 | 3 |
| Root `schemas/` dir | ❌ | ❌ | ❌ | ❌ | ✅ (14) | ❌ | ❌ |
| GitHub Workflows | 5 | 5 | 5 | 5 | 1 | 5 | 5 |
| Issue Templates | 4 | 4 | 4 | 4 | 1 | 4 | 4 |
| Root `constitution.md` | ⚠️ (stale) | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| Phase Deliverable Docs | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |
| YAML Contract Layer | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ |

---

## 4. Criterion 1 — Structure & Organization

### 4.1 Portal Kits (Admin, Agent, Attorney, Client, Main, ServicePartner)

All six portal kits follow a consistent two-tier directory pattern:

```
<kit-root>/
├── README.md, STANDARDS.md, ARCHITECTURE.md, ...   ← Root documentation layer
├── .specify/
│   ├── memory/constitution.md                       ← Single source of truth
│   ├── specs/NNN-<feature>/                         ← Feature modules
│   ├── templates/                                   ← Reusable scaffolding
│   ├── schemas/                                     ← JSON schema validation
│   ├── decisions/                                   ← Architecture Decision Records
│   └── research/                                    ← User personas, analysis
└── .github/
    ├── workflows/                                   ← CI/CD automation
    ├── ISSUE_TEMPLATE/                              ← Structured issue forms
    └── *.prompt.md, pull_request_template.md        ← AI-assist prompts
```

This pattern is well-organized, with a clear separation between governance (`root`), specification content (`.specify/`), and automation (`.github/`). It scores highly on this criterion.

**Notable deviations:**

- **Admin** introduces a structural anomaly: root-level feature directories (`001-dashboard/`, `002-users/`, etc.) that mirror the `.specify/specs/` hierarchy but with a different and smaller file set (7 files vs. 7 files, but non-overlapping concerns). This creates navigational confusion — a developer encountering the root does not know which layer is authoritative.

- **Main** does not expose a root `constitution.md`. All other portal kits provide this shortcut for rapid orientation. The canonical copy exists at `.specify/memory/constitution.md`, but the absence of a root symlink breaks the discoverability expected of the standard.

**Score**: Agent ✅ Excellent | ServicePartner ✅ Excellent | Attorney ✅ Good | Client ✅ Good | Admin ⚠️ Partial (dual-layer conflict) | Main ⚠️ Partial (missing root shortcuts)

### 4.2 CRM Kit

The CRM kit implements a three-tier structure:

```
crm-spec/
├── README.md, STANDARDS.md, ARCHITECTURE.md, ...   ← Root documentation (standard)
├── .specify/                                        ← Spec layer (standard)
│   ├── memory/constitution.md
│   ├── specs/NNN-<feature>/
│   ├── templates/
│   ├── schemas/                                     ← Meta-schemas only (plan, spec, tasks)
│   ├── decisions/
│   └── research/
├── .github/                                         ← GitHub layer (reduced)
├── screens/                                         ← YAML screen manifests (UNIQUE)
├── components/                                      ← YAML component definitions (UNIQUE)
├── schemas/                                         ← Data schemas (UNIQUE)
├── index.yaml                                       ← Master manifest (UNIQUE)
├── layout.yaml, design.tokens.yaml, api.yaml        ← Declarative contracts (UNIQUE)
├── access_control.yaml, interactions.yaml, events.yaml
├── PHASE-1-DELIVERABLE.md, PHASE-2-DELIVERABLE.md  ← Delivery tracking (UNIQUE)
└── prompts/Analyze.md                               ← AI-assist prompts (UNIQUE)
```

This is the most architecturally ambitious kit. The YAML declarative layer — covering screens, components, API contracts, design tokens, access control, and events — is a meaningful innovation that enables tooling, automated validation, and machine-readable contracts beyond what Markdown alone can provide.

However, the three-tier structure also raises a discoverability concern: developers must understand which layer (`spec.md`, `screens/*.yaml`, or `api.yaml`) governs which aspect of behavior. This is partially addressed by the README's role-specific onboarding sections, but is not formalized in `STANDARDS.md`.

**Score**: CRM ✅ Excellent (with onboarding complexity noted)

---

## 5. Criterion 2 — Naming Conventions

### 5.1 Directory and File Naming

All seven kits conform to the following naming conventions without exception:

- Feature module directories: `NNN-kebab-case` (e.g., `001-dashboard`, `007-partner-referrals`)
- Root documentation: `SCREAMING_SNAKE.md` (e.g., `README.md`, `SPEC-DRIVEN.md`)
- Spec artifact files: `kebab-case.md` or `kebab-case.json` (e.g., `api-contracts.md`, `validation-schema.json`)
- Decision records: `adr-NNN-kebab-slug.md`
- GitHub templates: `kebab-case.md` (e.g., `spec-new.md`, `bug-report.md`)

**One exception** is in the CRM's `prompts/` directory where the file is named `Anazlye.md` — a typo (`Anazlye` instead of `Analyze`). This is a minor but real naming violation.

The CRM's YAML layer introduces new naming patterns that are not covered by any `STANDARDS.md` in the kit:

- Root-level system contracts: `lowercase.yaml` (e.g., `index.yaml`, `api.yaml`, `layout.yaml`)
- Screen manifests: `screens/kebab-case.yaml`
- Component manifests: `components/snake_case.yaml` (e.g., `stat_card.yaml`, `pipeline_board.yaml`, `data_table.yaml`)

The use of `snake_case` for component YAML files is inconsistent with the `kebab-case` convention used everywhere else. The screens use `kebab-case` (`email-blast.yaml`), but components use `snake_case` (`pipeline_board.yaml`, `data_table.yaml`). This inconsistency should be standardized.

**Score**: All portal kits ✅ Excellent | CRM ⚠️ Good (snake_case/kebab-case inconsistency in components, typo in prompts/)

### 5.2 Schema Naming

Portal kit schemas follow the pattern `<entity>-<type>.json`:
- `activity-log-event.json`, `transaction-model.json`, `spec-structure.json`

Attorney adds richer domain schemas: `client-model.json`, `dashboard-model.json`, `document-model.json`, `verification-model.json`.

CRM's root `schemas/` directory follows a different pattern: `<entity>.schema.json`:
- `contact.schema.json`, `lead.schema.json`, `activity.schema.json`

Both patterns are internally consistent, but they differ across the kit family. Given the portals and CRM share a backend, this schema naming divergence could cause confusion during cross-kit integration work. A unified naming convention should be chosen.

---

## 6. Criterion 3 — Modularity & Scalability

### 6.1 Portal Kits

The portal kits demonstrate strong modularity. Each feature module is self-contained, independently versioned via `changelog.md`, and carries its own `risks.md`, `rollout.md`, `metrics.md`, and `validation-schema.json`. Adding a new feature requires only creating a new numbered directory and populating from `.specify/templates/` — a low-friction, scalable pattern.

**Agent and ServicePartner** achieve the gold standard: 11 files per module, across every module without exception. This uniform density means no module is missing any artifact type, and the kit is immediately ready for implementation handoff.

**Attorney** exceeds the standard by including `plan.md` and `tasks.md` in every module (13 files total), making it the most implementation-ready portal kit. This pattern bridges specification and implementation directly within the spec-kit, eliminating a hand-off ambiguity.

**Client** has a critical scalability defect: `007-transactions` is completely empty — no files whatsoever. This is not a stub; it is a dead module. Any automated tooling or CI validation that iterates over spec modules will fail silently or produce errors when it encounters this directory.

**Main** is appropriately scoped (5 modules covering authentication, MFA, role routing, and password reset) but its modules contain only 7 artifact files — notably absent are `rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, and `state-machines.md`. Given Main is the authentication gateway for all other portals, the absence of RBAC matrix documentation is a gap with security implications.

**Admin** has a scalability anti-pattern: the root-level duplicate directories shadow `.specify/specs/` with a non-overlapping but partial artifact set. Future contributors editing `002-users/spec.md` may update the wrong copy. The root-level copies appear to be production/delivery artifacts that were committed alongside the spec-kit without being cleaned up or formally designated as the authoritative source.

### 6.2 CRM Kit

The CRM kit is the most scalable by feature surface area: 17 modules covering the entire internal operations platform. The consistent 9-file pattern per module (spec, changelog, metrics, risks, rollout, test-scenarios, validation-schema, plan, tasks) represents a deliberate trade-off — the cross-cutting concerns that portal kits capture per-module (`rbac-matrix`, `api-contracts`, `activity-log-events`, `state-machines`) are instead centralized at the root level:

| Portal Module Artifact | CRM Equivalent |
|---|---|
| `rbac-matrix.md` | `access_control.yaml` (root) |
| `api-contracts.md` | `api.yaml` (root) |
| `activity-log-events.md` | `events.yaml` (root) |
| `state-machines.md` | `interactions.yaml` (root) |

This centralization is architecturally sound for a system-wide CRM (one RBAC model, one event log contract) but would benefit from explicit cross-references in each module's `spec.md` pointing to the relevant root-level contract sections. Currently, a developer reading `006-calls/spec.md` must know to check `access_control.yaml` and `events.yaml` separately.

The CRM's `PHASE-1-DELIVERABLE.md` and `PHASE-2-DELIVERABLE.md` files are an innovative addition that no portal kit includes. These provide delivery-scoped views of the spec-kit — invaluable for project managers and stakeholders who need to understand what ships in a given phase without reading all 17 modules.

**Score**: Agent ✅ | ServicePartner ✅ | Attorney ✅ | CRM ✅ | Admin ⚠️ | Client ⚠️ | Main ⚠️

---

## 7. Criterion 4 — Clarity & Completeness

### 7.1 Constitution Quality

The constitution (`constitution.md`) is the single most important document in a spec-kit. It defines principles, roles, lifecycle vocabulary, and the behavioral contract that all feature specs must honor.

| Kit | Constitution Location | Principles | Role Matrix | Lifecycle Stages | Notes |
|---|---|---|---|---|---|
| Agent | `.specify/memory/` + root | 7 (P-01–P-07) | 6 actors | 11 transaction stages | Gold standard |
| Attorney | `.specify/memory/` + root | Inherits agent pattern | 5 actors | Matches agent | Adds verification workflow |
| ServicePartner | `.specify/memory/` + root | 5 principles | 3 actors | Referral lifecycle | Appropriate scope |
| Client | `.specify/memory/` + root | 5 principles | 3 actors | 11 transaction stages | Appropriate scope |
| CRM | `.specify/memory/` only | 10 (P-01–P-10) | 5 roles × 3 depts | 6 pipeline stages | Most complete |
| Admin | `.specify/memory/` + root (stale duplicate) | 4 (minimal) | 3 roles | None defined | Root version is stale and different |
| Main | `.specify/memory/` only | Not clearly quantified | Implicit | Auth flow | Too thin for cross-portal gateway role |

The **Admin** kit's root `constitution.md` is a significant clarity defect. It is different from the canonical `.specify/memory/constitution.md` — the root version uses a different title ("The Burkes Group Admin System Constitution" vs. "Project Constitution — The Burkes Group Admin Portal"), different section structure, and different language. A developer reading only the root would receive an outdated description of the Admin system.

The **CRM** constitution is the strongest in the family: 10 principles, a full department-scoped RBAC definition, a 6-stage pipeline with per-department interpretation, and compliance retention policies. It also correctly scopes its coverage to all layers ("all artifacts under `.specify/`, root contracts, and screen definitions") — accurately reflecting the multi-tier architecture.

### 7.2 ADR Depth

Architecture Decision Records are the institutional memory of design choices. The standard minimum is 5 ADRs.

- **Attorney (8 ADRs)** and **CRM (8 ADRs)** lead the field. Attorney's additions cover `adr-006-design-token-system`, `adr-007-activity-log-contract`, and `adr-008-cross-portal-data-sharing` — the last being the most cross-cutting and valuable for the entire platform.
- **Admin, Agent, Client, Main, ServicePartner (5 ADRs each)** all share what appears to be a common ADR template set: role model, activity log design, progressive disclosure, role-scoped writes, tech-agnostic specs. These are necessary baseline decisions but do not capture kit-specific architectural choices.
- **CRM's additional ADRs** cover decisions that are genuinely CRM-specific and consequential: custom CRM vs. off-the-shelf, unified contact model, marketing entity data ownership (compliance), Outlook email strategy, PWA-first, VOIP provider strategy, append-only log, and SaaS-readiness.

### 7.3 Research Depth

| Kit | Research Files | Coverage |
|---|---|---|
| CRM | 6 | user-personas, competitive-analysis, constitution-rationale, integration-api-audit, voip-provider-research, transition-plan |
| Client | 4 | user-personas, competitive-analysis, constitution-rationale, transition-plan |
| Attorney | 2 | user-personas, competitive-analysis |
| Admin | 1 | admin-personas (only) |
| Agent | 1 | user-personas (only) |
| Main | 1 | user-personas (only) |
| ServicePartner | 1 | user-personas (only) |

The **CRM** research layer is significantly deeper than all portal kits. The `integration-api-audit.md` and `voip-provider-research.md` files demonstrate that external dependencies were formally evaluated before committing to them in the spec — a best practice the portal kits do not replicate.

**Admin** is particularly thin on research given its role as the platform control plane. A competitive analysis and security-threat model would strengthen it substantially.

### 7.4 Stub & Incomplete Modules

| Kit | Stub / Incomplete Modules | Details |
|---|---|---|
| Admin | `007-settings` (1 file only) | Only `spec.md` present; missing 10 of 11 standard artifacts |
| Client | `007-transactions` (0 files) | Empty directory — nothing at all |
| All others | None | All modules complete to their respective standards |

Both of these represent specification debt that must be resolved before implementation begins on those features.

**Score**: CRM ✅ Excellent | Attorney ✅ Good | Agent ✅ Good | ServicePartner ✅ Good | Client ⚠️ Partial | Admin ⚠️ Partial | Main ⚠️ Partial

---

## 8. Criterion 5 — GitHub Integration & CI/CD

### 8.1 Workflow Coverage

| Workflow | Admin | Agent | Attorney | Client | CRM | Main | ServicePartner |
|---|---|---|---|---|---|---|---|
| `validate-specs.yml` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `validate-schema.yml` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| `validate-dependencies.yml` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| `pr-checks.yml` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| `version-check.yml` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |

The CRM's single workflow (`validate-specs.yml`) is critically under-automated relative to its complexity. It only checks that 7 specific Phase 1 `spec.md` files exist — no YAML schema validation, no JSON schema validation, no PR checks, no version enforcement. Given the CRM has a 14-file root-level YAML layer and a separate `schemas/` directory, the absence of YAML lint and JSON Schema validation workflows is a significant CI/CD gap.

The portal kits' 5-workflow setup is exemplary for spec repositories: it validates structure, validates schemas, checks cross-file dependencies, enforces PR quality, and tracks version consistency.

### 8.2 Issue Templates

| Template | Admin | Agent | Attorney | Client | CRM | Main | ServicePartner |
|---|---|---|---|---|---|---|---|
| `bug-report.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| `question.md` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `spec-new.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| `spec-update.md` | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |

The CRM is missing 3 of 4 issue templates. The absence of `spec-new.md` and `spec-update.md` is especially concerning — these templates enforce structured specification changes through GitHub Issues, which is a core workflow in Spec-Driven Development. Without them, spec changes may be submitted as unstructured text, breaking traceability.

### 8.3 AI-Assist Prompt Files

All portal kits include `specify.prompt.md`, `plan.prompt.md`, and `tasks.prompt.md` under `.github/`. The CRM kit also includes all three. This is a full pass across the board.

**Score**: All portal kits ✅ Excellent | CRM ⚠️ Weak (1 of 5 workflows, 1 of 4 issue templates)

---

## 9. Cross-Kit Comparison Matrix

The following matrix scores each kit against each criterion on a 1–5 scale (5 = fully conforms, 1 = significant gap).

| Criterion | Admin | Agent | Attorney | Client | CRM | Main | ServicePartner |
|---|---|---|---|---|---|---|---|
| C-1: Structure & Organization | 3 | 5 | 5 | 4 | 5 | 4 | 5 |
| C-2: Naming Conventions | 4 | 5 | 5 | 5 | 4 | 5 | 5 |
| C-3: Modularity & Scalability | 3 | 5 | 5 | 3 | 5 | 3 | 5 |
| C-4: Clarity & Completeness | 3 | 4 | 5 | 4 | 5 | 3 | 4 |
| C-5: GitHub Integration & CI/CD | 5 | 5 | 5 | 5 | 2 | 5 | 5 |
| **Total (25 max)** | **18** | **24** | **25** | **21** | **21** | **20** | **24** |

> **CRM note**: Its score of 21 reflects CI/CD gaps only. By content, research depth, and architectural sophistication, it is the most complete kit in the family. Its overall maturity exceeds its score if CI/CD is weighted separately.

---

## 10. Per-Kit Strengths, Weaknesses & Gaps

### 10.1 Admin Spec-Kit

**Purpose**: Platform-wide control plane — user management, approval queues, partner coverage, analytics.

**Strengths**
- Full 5-workflow GitHub CI/CD pipeline.
- 4 issue templates — well-prepared for community spec contribution.
- Rich module coverage: 8 modules covering dashboard, users, partners, transactions, documents, analytics, and settings.
- All modules in `.specify/specs/` have consistent 7-file sets.

**Weaknesses**
- **Critical**: Root-level feature directories (`000-foundation/` through `006-analytics/`) shadow `.specify/specs/` with a different, non-standard file set. The two layers are not reconciled and serve different concerns without clear documentation.
- **Significant**: Root `constitution.md` is stale — title, structure, and content differ materially from `.specify/memory/constitution.md`. A developer reading the root gets incorrect context.
- **Significant**: `007-settings` is a stub with only `spec.md` present. All 10 other standard artifacts are absent.
- Research layer is minimal (1 file). A system this critical deserves competitive analysis and a threat model.

**Gaps**
- Root-level architecture documentation does not explain the dual-layer directory structure.
- No `constitution.md` synchronization mechanism between root and `.specify/memory/`.

---

### 10.2 Agent Spec-Kit

**Purpose**: Real estate agent workflow portal — transactions, documents, clients, messages, calendar, partner referrals, reports.

**Strengths**
- Gold standard compliance: 9 modules × 11 files each = 99 artifact files with zero exceptions.
- Full 5-workflow CI/CD and 4 issue templates.
- Strong constitution: 7 principles, 6 actor RBAC matrix, 11-stage transaction lifecycle.
- Root `constitution.md` and `.specify/memory/constitution.md` are in sync.
- README is exemplary — role-specific onboarding, full directory tree, architecture table.

**Weaknesses**
- Research layer is thin (only `user-personas.md`). Competitive analysis and a transition plan would strengthen strategic context.
- No `plan.md` or `tasks.md` per module. Unlike Attorney, Agent specs require a separate implementation planning step.
- Only 5 ADRs — all shared from the baseline template. No Agent-specific architectural decisions are recorded.

**Gaps**
- Missing competitive analysis (agents use many competing portals — this matters for UX decisions).
- ADRs do not address agent-specific concerns (e.g., how reports are scoped to individual agents vs. team leads).

---

### 10.3 Attorney Spec-Kit

**Purpose**: Legal review portal — document review, transaction access, client visibility, verification workflows.

**Strengths**
- **Highest file density in the family**: 13 files per module — the only portal kit to include `plan.md` and `tasks.md` inline, making it immediately ready for developer handoff without a separate planning phase.
- Strongest ADR set among portal kits (8 ADRs), including `adr-008-cross-portal-data-sharing` — the most architecturally significant cross-cutting decision in the entire family.
- 7 schemas in `.specify/schemas/` — the richest domain model of all portal kits.
- Competitive analysis and user-personas present in research.

**Weaknesses**
- Fewer modules (6) than Agent or ServicePartner. The `005-verification` module is present, but there is no calendar, messaging, or reports module — these may be legitimate scope decisions but should be documented as explicit exclusions in the ROADMAP.
- No `constitution.md` at root (relies on `.specify/memory/` only — a minor discoverability issue).

**Gaps**
- The absence of communication modules (messages/calendar) is undocumented. ROADMAP.md should explicitly state these are deferred or out of scope.

---

### 10.4 Client Spec-Kit

**Purpose**: Homebuyer/seller transaction portal — document access, messages, insurance, mortgage, services.

**Strengths**
- Good research depth (4 files including `constitution-rationale.md` and `transition-plan.md`).
- Comprehensive feature scope: insurance, mortgage, and services modules alongside the core transaction flow.
- Full GitHub CI/CD and issue template setup.

**Weaknesses**
- **Critical**: `007-transactions` module directory is completely empty. This is the most fundamental feature module in a client transaction portal. The absence of any content here represents a significant specification debt that blocks implementation.
- `validation-schema.json` is missing from `007-transactions` (consequence of it being empty).
- Only 5 ADRs — all inherited baseline; no client-specific architectural decisions recorded.

**Gaps**
- `007-transactions` must be fully populated before any development work begins on client-side transaction visibility.
- No ADR addressing client data privacy or what transaction data clients can see vs. agents (critical for a consumer-facing portal).

---

### 10.5 CRM Spec-Kit

**Purpose**: Internal operational CRM — contacts, pipeline, calls, SMS, email, calendar, department workspaces, reporting, admin governance.

**Strengths**
- **Most architecturally complete kit in the family**: 246 files, 17 modules, YAML declarative layer.
- **Unique YAML contract layer**: `index.yaml` (master manifest), `api.yaml` (REST contracts), `access_control.yaml` (RBAC), `design.tokens.yaml`, `layout.yaml`, `events.yaml`, `interactions.yaml`. These enable machine-readable validation and tooling integration beyond Markdown.
- **Root schemas directory**: 14 domain schemas covering all key entities (`contact`, `lead`, `activity`, `user`, `policy`, `transaction`, `mortgage`, `call-recording`) with full JSON Schema format.
- **Deepest research layer** (6 files) including `integration-api-audit.md`, `voip-provider-research.md`, and `transition-plan.md` from legacy systems.
- **8 ADRs** with CRM-specific decisions covering custom build rationale, data ownership compliance, and SaaS architecture.
- `PHASE-1-DELIVERABLE.md` and `PHASE-2-DELIVERABLE.md` provide delivery-scoped views unavailable in any other kit.
- Constitution has 10 principles — the most expansive, covering SaaS-readiness and compliance-by-default.
- `.specify/schemas/` appropriately contains only meta-schemas (plan-structure, spec-structure, tasks-structure), separating meta from domain schemas cleanly.

**Weaknesses**
- **Critical CI/CD gap**: Only 1 GitHub workflow (`validate-specs.yml`), which only checks that 7 spec files exist. The YAML layer, root schemas, and screen manifests have zero automated validation.
- Only 1 issue template (`question.md`). Missing `bug-report.md`, `spec-new.md`, and `spec-update.md` — critical for structured spec governance.
- Per-module artifacts (`rbac-matrix`, `api-contracts`, `activity-log-events`, `state-machines`) are centralized in root YAML files without explicit cross-references in module specs.
- The 4-file `components/` directory uses `snake_case` naming inconsistent with the broader `kebab-case` convention.
- `prompts/Anazlye.md` contains a typo in the filename.
- No `constitution.md` at root (only in `.specify/memory/`).

**Gaps**
- YAML validation workflows must be added for `screens/*.yaml`, `components/*.yaml`, and root contract files.
- Each module's `spec.md` should explicitly reference the relevant sections of `access_control.yaml`, `api.yaml`, and `events.yaml` to avoid reader confusion.
- Component YAML naming should be standardized to `kebab-case`.

---

### 10.6 Main Spec-Kit

**Purpose**: Authentication gateway — login, MFA, role routing, password reset — entry point for all portals.

**Strengths**
- Appropriately scoped: 5 modules for an authentication-only gateway is the right level of specificity.
- Full 5-workflow CI/CD and all 4 issue templates.
- Consistent module structure.

**Weaknesses**
- **Scope concern**: As the authentication gateway for 6 portals and the CRM, Main's modules are under-documented. Each module has only 7 artifact files — notably missing `rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, and `state-machines.md`.
- No root `constitution.md`. Main's constitution should define the role-routing contracts for all downstream portals — this is arguably the most cross-cutting constitution in the system.
- Only 5 baseline ADRs. No Main-specific decision records for session management, JWT strategy, MFA provider selection, or role-routing logic.
- Research is limited to `user-personas.md`. No security threat model or authentication competitive analysis.

**Gaps**
- Role-routing specification should explicitly enumerate all downstream portals and the role → portal mappings.
- Session token contracts (expiry, refresh, scope) should be in a dedicated schema.
- Security-specific ADR for authentication design choices.

---

### 10.7 ServicePartner Spec-Kit

**Purpose**: Service partner portal — referrals, active jobs, quotes, reviews, service areas, earnings, profile management.

**Strengths**
- Gold standard compliance matching Agent: 9 modules × 11 files each = zero gaps.
- Well-scoped domain (8 feature modules beyond foundation).
- Full GitHub CI/CD and issue templates.
- Domain-specific schema: `referral-model.json` captures the core business entity.
- ADR set includes `adr-001-referral-centric-model` and `adr-003-quote-workflow` — kit-specific decisions absent from most other portal kits.

**Weaknesses**
- Research is thin (only `user-personas.md`). Partner-specific research (competitive analysis of partner management platforms) would strengthen strategic grounding.
- No `plan.md` or `tasks.md` per module — requires separate implementation planning like Agent.

**Gaps**
- Earnings and billing mechanics could benefit from a dedicated financial schema alongside the `referral-model.json`.
- No competitive analysis despite partner portals being a mature product category.

---

## 11. Final Ranking & Recommendation

### 11.1 Standards Alignment Ranking (Portal Class)

| Rank | Kit | Score | Verdict |
|---|---|---|---|
| 🥇 1 | **Attorney** | 25/25 | Fully conforms to GitHub spec-kit standards and exceeds them with `plan.md` + `tasks.md` per module. Reference implementation for portal kits. |
| 🥈 2 | **Agent** | 24/25 | Gold standard module completeness. Weak only on research depth and lack of inline implementation artifacts. |
| 🥈 2 | **ServicePartner** | 24/25 | Matches Agent in structure and completeness. Slightly richer ADRs with kit-specific decisions. |
| 🥉 4 | **Client** | 21/25 | Strong overall but critically blocked by empty `007-transactions` module. |
| 5 | **Main** | 20/25 | Appropriately minimal scope but under-documented for its cross-portal role. |
| 6 | **Admin** | 18/25 | Structural conflicts and stale duplicates reduce reliability. Needs root cleanup before use as reference. |

### 11.2 CRM Separate Assessment

The CRM kit operates in a different design space — it is not a "portal" but a full internal platform with multi-department scope, third-party integrations, compliance requirements, and a SaaS roadmap. Comparing it to portal kits on the same 1–5 scale would misrepresent its value.

**Holistic CRM assessment**:

| Dimension | Assessment |
|---|---|
| Spec-Kit Core Standards | ✅ Fully conforms to `.specify/` structure and root documentation layer |
| Content Completeness | ✅ Deepest research, most ADRs, most modules, most schemas |
| Innovation | ✅ YAML contract layer, phase deliverable docs, PWA/SaaS architecture |
| GitHub Automation | ❌ Critical gap — 1 workflow vs. 5; 1 issue template vs. 4 |
| Cross-Kit Reference | ✅ Explicitly references all 6 portal spec-kits in README |
| Overall Verdict | **Most complete spec-kit by content; least automated by GitHub standards** |

**Recommendation**: The CRM kit should be treated as the **architectural reference** for the platform as a whole. Its YAML contract layer and phase deliverable structure are innovations that should be evaluated for backporting to portal kits. However, GitHub automation must be upgraded as the first priority before any developer begins implementation work against it.

---

## 12. Actionable Improvement Plan

Issues are ordered by severity: 🔴 Critical (blocks development), 🟠 Important (reduces quality), 🟡 Recommended (improves standards alignment).

### 12.1 Immediate Actions (Before Any Development Begins)

| # | Severity | Kit | Action |
|---|---|---|---|
| 1 | 🔴 | Client | Populate `007-transactions` with all 11 standard artifacts. This is the primary client-facing feature and cannot be developed without a spec. |
| 2 | 🔴 | Admin | Remove or clearly demarcate the root-level feature directories (`000-foundation/` through `006-analytics/`). If they are delivery artifacts, move them to a `delivery/` directory. If they are deprecated, delete them. |
| 3 | 🔴 | Admin | Delete or update root `constitution.md` to match `.specify/memory/constitution.md`. The two documents must not diverge. |
| 4 | 🔴 | Admin | Populate `007-settings` with all 10 missing artifacts (`changelog.md`, `metrics.md`, `risks.md`, `rollout.md`, `test-scenarios.md`, `rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, `state-machines.md`, `validation-schema.json`). |
| 5 | 🔴 | CRM | Add `validate-schema.yml` workflow for JSON Schema validation of all files in `schemas/` and `.specify/schemas/`. |
| 6 | 🔴 | CRM | Add `validate-yaml.yml` workflow to lint all `.yaml` files in `screens/`, `components/`, and the root. |
| 7 | 🔴 | CRM | Add `spec-new.md` and `spec-update.md` issue templates. Without these, spec changes lack structured traceability. |

### 12.2 Short-Term Improvements (Sprint 1–2)

| # | Severity | Kit | Action |
|---|---|---|---|
| 8 | 🟠 | CRM | Standardize component YAML naming to `kebab-case` (`pipeline-board.yaml`, `data-table.yaml`, `stat-card.yaml`). Update all references in `index.yaml`. |
| 9 | 🟠 | CRM | Rename `prompts/Anazlye.md` to `prompts/Analyze.md`. |
| 10 | 🟠 | CRM | Add cross-reference comments in each module's `spec.md` pointing to the relevant sections of `access_control.yaml`, `api.yaml`, and `events.yaml`. |
| 11 | 🟠 | CRM | Add `pr-checks.yml` and `version-check.yml` workflows to match portal kit CI/CD coverage. |
| 12 | 🟠 | Admin | Add `competitive-analysis.md` and a security threat model to `.specify/research/`. |
| 13 | 🟠 | Main | Add `rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, and `state-machines.md` to all 5 feature modules. |
| 14 | 🟠 | Main | Add a root `constitution.md` (symlink or copy) and include explicit role → portal routing contract. |
| 15 | 🟠 | Main | Add a security ADR covering session management, JWT claims, and MFA provider selection. |
| 16 | 🟠 | Agent | Add `competitive-analysis.md` to `.specify/research/`. |
| 17 | 🟠 | ServicePartner | Add `competitive-analysis.md` to `.specify/research/`. |

### 12.3 Standards & Governance Improvements (Ongoing)

| # | Severity | Kit | Action |
|---|---|---|---|
| 18 | 🟡 | All | Adopt a unified schema naming convention across portal and CRM kits. Recommend: `<entity>.schema.json` (CRM pattern) as the standard going forward. |
| 19 | 🟡 | CRM | Document the YAML layer naming conventions in `STANDARDS.md` so contributors know the difference between `screens/`, `components/`, and the root contract files. |
| 20 | 🟡 | Agent, ServicePartner | Evaluate adopting Attorney's pattern of `plan.md` + `tasks.md` per module to reduce the implementation hand-off friction. |
| 21 | 🟡 | CRM | Evaluate backporting the `PHASE-N-DELIVERABLE.md` pattern to portal kits, where phased delivery is also relevant. |
| 22 | 🟡 | All | Audit ADR sets across kits for coverage of kit-specific decisions (Admin: approval-queue design; Agent: report scoping; Client: data privacy; Main: session architecture). |
| 23 | 🟡 | All | Establish a cross-kit glossary (currently each kit maintains its own `GLOSSARY.md`). For terms shared across portals and CRM, a central definition reduces drift. |

---

## 13. Reference: GitHub Spec-Kit Standard Checklist

Use this checklist to verify conformance for any new or existing spec-kit.

### Root Documentation Layer
- [ ] `README.md` — with quick navigation, directory tree, architecture summary, and role-based onboarding
- [ ] `STANDARDS.md` — writing standards, tone, file naming conventions
- [ ] `ARCHITECTURE.md` — system overview and data flow
- [ ] `GLOSSARY.md` — business and technical vocabulary
- [ ] `FAQ.md` — common contributor questions
- [ ] `ROADMAP.md` — feature prioritization and release timeline
- [ ] `CHANGELOG.md` — spec-kit evolution and version history
- [ ] `CONTRIBUTING.md` — how to propose changes and submit PRs
- [ ] `GOVERNANCE.md` — decision-making process and approval gates
- [ ] `CODE_OF_CONDUCT.md` — community standards
- [ ] `SPEC-DRIVEN.md` — SDD philosophy and methodology
- [ ] Root `constitution.md` in sync with `.specify/memory/constitution.md`

### `.specify/` Directory
- [ ] `memory/constitution.md` — complete principles, RBAC matrix, lifecycle stages
- [ ] `specs/000-foundation/` — foundation module present and complete
- [ ] `specs/NNN-<feature>/` — all planned features have modules
- [ ] No empty or stub modules (single-file directories)
- [ ] `templates/` — all standard artifact templates present
- [ ] `schemas/` — domain model schemas and/or meta-schemas
- [ ] `decisions/` — minimum 5 ADRs; kit-specific decisions covered
- [ ] `research/user-personas.md` — always required

### Per-Module Artifact Set (Standard 11-File Pattern)
- [ ] `spec.md`
- [ ] `changelog.md`
- [ ] `metrics.md`
- [ ] `risks.md`
- [ ] `rollout.md`
- [ ] `test-scenarios.md`
- [ ] `validation-schema.json`
- [ ] `rbac-matrix.md`
- [ ] `activity-log-events.md`
- [ ] `api-contracts.md`
- [ ] `state-machines.md`

### `.github/` Directory
- [ ] `workflows/validate-specs.yml`
- [ ] `workflows/validate-schema.yml`
- [ ] `workflows/validate-dependencies.yml`
- [ ] `workflows/pr-checks.yml`
- [ ] `workflows/version-check.yml`
- [ ] `ISSUE_TEMPLATE/bug-report.md`
- [ ] `ISSUE_TEMPLATE/question.md`
- [ ] `ISSUE_TEMPLATE/spec-new.md`
- [ ] `ISSUE_TEMPLATE/spec-update.md`
- [ ] `pull_request_template.md`
- [ ] `CODEOWNERS`
- [ ] `dependabot.yml`
- [ ] `specify.prompt.md`
- [ ] `plan.prompt.md`
- [ ] `tasks.prompt.md`

---

*This document was produced through full structural analysis of all seven spec-kit archives. It is intended as a living reference: re-run this analysis after each major spec-kit update to track progress against the standards defined in Section 2.*

**Document Version**: 1.0  
**Analysis Date**: April 22, 2026  
**Next Review**: After completion of immediate actions (Section 12.1)
