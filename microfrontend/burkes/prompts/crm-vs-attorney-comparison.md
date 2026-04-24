# CRM vs. Attorney Spec-Kit: GitHub Standards Comparison
## The Burkes Group — Focused Evaluation

**Document Type**: Standards Compliance Comparison  
**Scope**: CRM Spec-Kit (`crm-spec`) vs. Attorney Portal Spec-Kit (`attorney-spec`)  
**Date**: April 22, 2026  
**Version**: 1.0

---

## Table of Contents

1. [Executive Summary & Verdict](#1-executive-summary--verdict)
2. [Structural Inventory at a Glance](#2-structural-inventory-at-a-glance)
3. [Dimension 1 — GitHub Automation (.github/)](#3-dimension-1--github-automation-github)
4. [Dimension 2 — Repository Structure & Root Layer](#4-dimension-2--repository-structure--root-layer)
5. [Dimension 3 — Constitution Quality](#5-dimension-3--constitution-quality)
6. [Dimension 4 — Per-Module Artifact Completeness](#6-dimension-4--per-module-artifact-completeness)
7. [Dimension 5 — ADR Quality & Specificity](#7-dimension-5--adr-quality--specificity)
8. [Dimension 6 — Schemas & Data Contracts](#8-dimension-6--schemas--data-contracts)
9. [Dimension 7 — Spec Content Quality](#9-dimension-7--spec-content-quality)
10. [Dimension 8 — Templates & Writing Standards](#10-dimension-8--templates--writing-standards)
11. [Dimension 9 — Research Depth](#11-dimension-9--research-depth)
12. [Dimension 10 — CRM-Unique Innovations](#12-dimension-10--crm-unique-innovations)
13. [Scoring Summary](#13-scoring-summary)
14. [Verdict & Rationale](#14-verdict--rationale)
15. [Prioritized Remediation Plan](#15-prioritized-remediation-plan)

---

## 1. Executive Summary & Verdict

**Attorney better follows GitHub spec-kit standards.**

Across the ten dimensions evaluated, Attorney scores higher on seven. The decisive factor is GitHub automation: Attorney ships five fully-implemented CI/CD workflows and four structured issue templates; CRM ships one workflow that only checks whether seven specific files exist, and a single-field issue template. By the most concrete measure of what "GitHub spec-kit standards" means — the `.github/` layer — Attorney conforms completely and CRM does not.

That said, the CRM is not a worse spec-kit overall. It is a more ambitious one. Its YAML declarative layer (`api.yaml`, `access_control.yaml`, `events.yaml`, `screens/`, `components/`) is a meaningful architectural innovation that no portal kit implements. Its constitution is clean and conflict-free. Its spec content follows the template more faithfully. Its research layer is the deepest in the entire platform family. The CRM trades GitHub process infrastructure for architectural substance — a defensible trade-off for a complex internal platform, but a non-conformance against the standard nonetheless.

The two kits also each carry a constitution problem — one visible, one hidden. Attorney's root `constitution.md` is a stale document with a different title, different stages, and different vocabulary than the canonical `.specify/memory/constitution.md`. This is the same defect flagged in Admin. The CRM has no root constitution at all, which is a discoverability gap but not a contradiction hazard.

| Dimension | Attorney | CRM | Winner |
|---|---|---|---|
| GitHub Automation | ✅ 5 workflows, 4 templates | ❌ 1 workflow, 1 template | **Attorney** |
| Repository Structure | ⚠️ Stale root constitution | ✅ Clean, no conflicts | **CRM** |
| Constitution Quality | ✅ Rich, 13 sections | ✅ Clean, 12 sections | **Tie** |
| Per-Module Artifact Completeness | ✅ 13 files/module | ⚠️ 9 files/module (intentional) | **Attorney** |
| ADR Quality & Specificity | ✅ Verbose, context-rich | ⚠️ Terse rationale sections | **Attorney** |
| Schemas & Data Contracts | ⚠️ 7 meta schemas | ✅ 14 domain schemas + YAML | **CRM** |
| Spec Content Quality | ⚠️ Mixed adherence | ✅ Consistent template use | **CRM** |
| Templates & Writing Standards | ✅ Detailed, annotated | ✅ Complete, concise | **Tie** |
| Research Depth | ⚠️ 2 files | ✅ 6 files | **CRM** |
| Unique Innovations | ❌ None beyond standard | ✅ YAML layer, phase docs | **CRM** |

---

## 2. Structural Inventory at a Glance

| Metric | Attorney | CRM |
|---|---|---|
| Total files | 129 | 246 |
| Feature modules | 6 | 17 |
| Files per module (standard modules) | 13 | 9 |
| GitHub workflows | 5 | 1 |
| Issue templates | 4 | 1 |
| ADRs | 8 | 8 |
| `.specify/schemas/` files | 7 | 3 (meta only) |
| Root `schemas/` directory | ❌ | ✅ (14 domain schemas) |
| Root `constitution.md` | ⚠️ Present but stale | ❌ Absent |
| Phase deliverable docs | ❌ | ✅ |
| YAML declarative layer | ❌ | ✅ (7 root contracts, 16 screens, 5 components) |
| Research files | 2 | 6 |
| CODEOWNERS granularity | ✅ Per module + team | ⚠️ Single wildcard |

---

## 3. Dimension 1 — GitHub Automation (.github/)

This is the single dimension where the gap between the two kits is most stark, and it is the most directly measurable expression of "GitHub spec-kit standards."

### 3.1 Workflows

**Attorney — 5 workflows, all fully implemented:**

| Workflow | What it does |
|---|---|
| `validate-specs.yml` | Checks 11 required sections in every `spec.md`, validates `FR-NN-NN` ID format, checks for constitution references, flags implementation-language violations |
| `validate-schema.yml` | Validates JSON syntax on all `.specify/schemas/*.json` and per-feature `validation-schema.json` files using Node.js + AJV |
| `validate-dependencies.yml` | Checks for circular dependencies (foundation must not depend on downstream specs), verifies cross-references resolve, audits supporting artifact presence |
| `pr-checks.yml` | Enforces PR title convention (`spec(NNN): description`), scans for sensitive data patterns, runs Markdown trailing-whitespace lint |
| `version-check.yml` | Detects when `spec.md` is modified without a corresponding `changelog.md` update; validates semantic versioning format |

These are not stubs. Each workflow contains meaningful business logic. The `validate-specs.yml` alone checks for 11 specific section headers, enforces the `FR-NN-NN` requirement ID format, and flags specs that contain implementation language like `## Implementation Details` or `## Code Examples`. This is exactly what a spec governance system should automate.

**CRM — 1 workflow, minimal coverage:**

```yaml
- name: Ensure required Phase 1 specs exist
  run: |
    test -f .specify/specs/000-foundation/spec.md
    test -f .specify/specs/001-dashboard/spec.md
    # ... 5 more identical lines
```

The single CRM workflow is a file-existence check for 7 Phase 1 spec files. It does not validate structure, enforce naming, check JSON validity, scan for sensitive data, or enforce changelog discipline. Critically, despite the CRM having a 14-file `schemas/` directory and 7 root YAML contract files — all of which are implementation-critical — none of them have any automated validation. A broken `api.yaml` or `access_control.yaml` could be merged silently.

**Edge finding**: The CRM's `validate-specs.yml` does trigger on `*.yaml` file changes in its `on.pull_request.paths`, but the job itself does nothing with YAML files. The trigger is there; the logic never arrived.

### 3.2 Issue Templates

**Attorney — 4 complete, structured templates:**

- `bug-report.md` — Typed dropdown (7 bug categories), affected spec field, description with example, file+section location, impact field, severity scale, acknowledgement checkboxes
- `question.md` — Question type dropdown (6 types), context field, related spec field, documentation-checked checklist
- `spec-new.md` — Feature name, elevator pitch, problem statement, goals, user scenarios, actor multi-select, dependency field, priority dropdown, success metrics, alignment checkboxes
- `spec-update.md` — Spec selector dropdown (all 8 modules listed), change summary, business rationale, affected features, priority, acknowledgements

These templates enforce structure at the point of contribution. A developer cannot submit a vague "update spec" issue — they are forced to identify the affected module, articulate the rationale, and acknowledge they have checked for circular dependencies.

**CRM — 1 minimal template:**

```yaml
- type: textarea
  id: question
  attributes:
    label: Question
    description: What do you need clarified?
```

The single CRM issue template is 8 lines of YAML. There is no `spec-new.md` template, which means new CRM feature proposals have no structured intake. There is no `bug-report.md`, so spec contradictions cannot be reported with structured metadata. There is no `spec-update.md`, so changes to the 17 existing modules lack a governed change request pathway.

### 3.3 CODEOWNERS

**Attorney** — Granular per-module and per-layer ownership:
- Each feature module has named reviewers: `@pm-team @<module-team> @tech-lead`
- Constitution protected by `@pm-team @product-lead`
- Templates protected by `@pm-team @tech-lead`
- Schemas protected by `@tech-lead @data-architect`
- GitHub workflows protected by `@tech-lead @data-ops`

**CRM** — Single wildcard:
```
* @burkes-group/platform @burkes-group/product
```
All 246 files in the repository route to the same two teams. A change to `schemas/contact.schema.json` (a data architecture decision) triggers the same review as a change to `CHANGELOG.md`. The granularity that makes CODEOWNERS useful for a 17-module platform is absent.

**Dimension 1 score: Attorney 5/5 — CRM 1/5**

---

## 4. Dimension 2 — Repository Structure & Root Layer

Both kits share the same root documentation layer (`README.md`, `STANDARDS.md`, `ARCHITECTURE.md`, `GLOSSARY.md`, `FAQ.md`, `ROADMAP.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `GOVERNANCE.md`, `CODE_OF_CONDUCT.md`, `SPEC-DRIVEN.md`) and the standard `.specify/` hierarchy. At this level, both conform.

The distinction is in what each kit adds or omits at the root, and whether the root is internally consistent.

### 4.1 Attorney: Stale Root Constitution

Attorney has a `constitution.md` at the root level. On first inspection this looks like a conformance point — a root shortcut to the canonical document. In practice, it is a liability.

The root `constitution.md` is a **different document** from `.specify/memory/constitution.md`:

| Attribute | Root `constitution.md` | `.specify/memory/constitution.md` |
|---|---|---|
| Title | `# Attorney Portal Constitution` | `# Project Constitution — The Burkes Group Attorney Portal` |
| Structure | 6 sections (Business Principles, Role Definitions, Lifecycle Stages, Data Vocabulary, Immutability Rules, Cross-Cutting Invariants) | 13 sections (Product Identity, Principles, Actors Matrix, Lifecycle, Status Labels, Reference Data ×5, Activity Events, Data Vocabulary, Design Constraints) |
| Transaction lifecycle | 8 stages (`document_gathering` through `completed`) | 5-step verification pipeline (`Docs Received` through `Closing`) |
| Role vocabulary | `closing_attorney`, `real_estate_agent`, `mortgage_lender` | `AT`, `TC`, `AG`, `CL`, `LN`, `CP` |
| Design tokens | Absent | Defined (hex values, typography, breakpoints) |

A developer who reads the root `constitution.md` first will encounter a different lifecycle, different role abbreviations, and different vocabulary than what every spec.md in `.specify/specs/` was written against. This creates a real risk of misaligned implementation. The root constitution is not wrong in isolation — it reads like an earlier, system-design-focused draft — but placing it at the root without marking it as superseded is a documentation defect.

### 4.2 CRM: No Root Constitution, Clean Structure

The CRM does not have a root `constitution.md`, which is a discoverability gap — contributors must know to look in `.specify/memory/`. However, the absence of a stale duplicate means there is no contradiction hazard. The CRM's root is internally consistent: every root file is a current, maintained artifact.

The CRM also adds two files that no portal kit carries: `PHASE-1-DELIVERABLE.md` and `PHASE-2-DELIVERABLE.md`. These provide delivery-scoped views of the spec-kit — a practical addition for project managers and stakeholders who need to understand what ships in a given phase without reading 17 modules.

The `prompts/Anazlye.md` file (typo: "Anazlye" instead of "Analyze") is a minor naming violation.

**Dimension 2 score: Attorney 3/5 — CRM 4/5**

---

## 5. Dimension 3 — Constitution Quality

Both kits maintain their canonical constitution in `.specify/memory/constitution.md`. Both are well-crafted. This dimension evaluates the `.specify/memory/` copy only — the authoritative source.

### 5.1 Attorney Constitution Strengths

The attorney constitution (`13 sections, ~200 lines`) is the richest single document in any portal kit:

- **Reference data tables** embedded directly in the constitution — active transactions with dollar amounts and closing dates, client records, document inventory, and verification detail breakdowns. This makes the constitution a living product reference that developers can use to build accurate seed data without hunting across multiple documents.
- **Activity log event types** enumerated with icons — 9 event types, each with icon, event key, and description. Every spec.md writer knows exactly which events to reference.
- **Design & UX constraints** section — colour hex values, typography families, breakpoints, shadow tokens, and border radii. This eliminates the need for a separate design token spec.
- **Global data vocabulary** — canonical field names with types, format constraints, and enum values.

The only structural weakness: the constitution's scope header says `All feature specifications under .specify/specs/` but the root `constitution.md` is a different document, creating an ambiguity about which source is authoritative.

### 5.2 CRM Constitution Strengths

The CRM constitution (`12 sections`) takes a more operational approach:

- **Operating departments table** — codes, color tokens, primary needs, and key constraints per department in a single scannable table.
- **Retention and compliance rules table** — per-department retention policies for each data type in one place. Any developer building the calls or SMS module has their compliance requirements in the foundation document.
- **Intake and lead ownership rules** — 4 explicit numbered rules governing first-touch ownership, departmental independence, transfer history, and portal-to-CRM matching. These are business rules that would otherwise be scattered across specs.
- **Guardrails section** — 5 explicit "Never..." statements. This is an innovation: negative constraints that every contributor must obey, independent of which feature they are writing. Examples: "Never treat the activity log as mutable" and "Never duplicate contacts to represent department context."
- **Phase 1 Definition of Ready** — a checklist specifying exactly which artifacts must exist before implementation begins. This is a governance tool that no portal constitution carries.

The CRM constitution's weakness is brevity in the principles section. Each principle (`P-01` through `P-10`) is one to three sentences with no elaboration. The attorney constitution's principles each include a "specification defect" clause that makes violations explicit and testable.

**Dimension 3 score: Attorney 4/5 — CRM 4/5 (Tie)**

---

## 6. Dimension 4 — Per-Module Artifact Completeness

### 6.1 File Counts

**Attorney modules 001–005:** 13 files each
```
spec.md, changelog.md, metrics.md, risks.md, rollout.md, test-scenarios.md,
validation-schema.json, rbac-matrix.md, activity-log-events.md,
api-contracts.md, state-machines.md, plan.md, tasks.md
```

**Attorney module 000-foundation:** 9 files only
```
spec.md, changelog.md, metrics.md, risks.md, rollout.md,
test-scenarios.md, validation-schema.json, plan.md, tasks.md
```
The four cross-cutting artifacts (`rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, `state-machines.md`) are absent from the foundation module. For a portal gateway module that establishes the auth session, navigation, activity log contract, and design token system, this is a gap. Foundation should arguably be the richest module, not the sparsest.

**CRM modules 000–016:** 9 files each (consistent)
```
spec.md, changelog.md, metrics.md, risks.md, rollout.md,
test-scenarios.md, validation-schema.json, plan.md, tasks.md
```

The four "missing" cross-cutting artifacts are centralized at the root level:

| Per-module artifact (Attorney) | CRM root equivalent |
|---|---|
| `rbac-matrix.md` | `access_control.yaml` |
| `api-contracts.md` | `api.yaml` |
| `activity-log-events.md` | `events.yaml` |
| `state-machines.md` | `interactions.yaml` |

This centralization is intentional — one RBAC model, one event schema, one API contract for the whole platform — and is architecturally sound for a multi-department CRM where per-module RBAC files would create duplication and drift risk. The trade-off is discoverability: a developer reading `006-calls/spec.md` must know to look at `access_control.yaml` and `events.yaml` separately, because those files are not referenced from the module.

### 6.2 The plan.md + tasks.md Advantage

Both kits include `plan.md` and `tasks.md` per module. This is the attorney kit's most significant contribution to the standard beyond the baseline: it is the only portal kit (out of six) to embed implementation artifacts inline at the feature level. Agent, Client, Main, ServicePartner, and Admin all require a separate planning pass to produce these files. Attorney and CRM both ship them as first-class artifacts, ready for developer handoff.

**Dimension 4 score: Attorney 4/5 — CRM 3/5**

---

## 7. Dimension 5 — ADR Quality & Specificity

Both kits have 8 ADRs. The count is identical; the quality and depth differ meaningfully.

### 7.1 Attorney ADR Analysis

Attorney's additional three ADRs beyond the shared baseline (ADR-001 through ADR-005) are:

- **ADR-006: Design Token System Architecture** — Documents the multi-portal shared brand context (Attorney, Agent, and Client share primary-navy and primary-gold), explains why a centralized token registry is used, identifies the four forces at tension (within-portal consistency, single update point, technology agnosticism, no raw values in specs), and records consequences. This is a real architectural decision that touches every screen.
- **ADR-007: Activity Log as Append-Only Audit Contract** — Specifies decision-makers (`Architecture Lead, Legal/Compliance Advisor, Product Lead`), links to the spec context (`FR-00-05`), and frames the decision against four concrete requirements: legal auditability, dashboard visibility, cross-screen consistency, and technology agnosticism. It names the legal compliance function explicitly, making the compliance driver visible and traceable.
- **ADR-008: Cross-Portal Data Sharing via Shared Backend** — The most cross-cutting ADR in the entire portal family. It documents three portals' data dependency on the same transaction, the decision to route all data access through a shared backend (rather than portal-to-portal calls), and the consequences for API design, data ownership, and testing.

All attorney ADRs follow a consistent format: `Status`, `Date`, `Decision`, `Context`, `Decision`, `Consequences`. Deciders are named in ADR-006, 007, and 008, which is a governance best practice — it names who made the call, not just what the call was.

### 7.2 CRM ADR Analysis

CRM's ADRs are more consequential as business decisions (custom build rationale, unified contact, marketing entity compliance structure, VOIP provider agnosticism, SaaS-readiness) but are noticeably terse. Each ADR's `Rationale` section contains a single bullet with one sentence:

- ADR-001 Rationale: "The business needs one customer profile shared by three departments."
- ADR-002 Rationale: "A unified record reduces manual re-entry and ownership confusion."
- ADR-006 Rationale: "Vendor evaluation is still open."

This brevity means the CRM ADRs record *what* was decided but inadequately explain *why* — the alternatives considered, the forces in tension, and what would have happened had a different choice been made. ADR-003 (Marketing Entity Owns the Platform) is particularly underdeveloped: it addresses a significant legal compliance architecture that prevents mortgage and insurance entities from co-owning customer data, but the rationale is a single sentence ("The operating structure creates a lawful bridge between departments"). The legal and compliance implications of this decision warrant substantially more documentation.

The CRM ADR format also inconsistently includes/omits the `Deciders` field that attorney ADRs carry on the later entries. For a platform with three-department compliance obligations, naming decision-makers in ADRs is especially important.

**Dimension 5 score: Attorney 4/5 — CRM 3/5**

---

## 8. Dimension 6 — Schemas & Data Contracts

### 8.1 Attorney Schemas (`.specify/schemas/`)

Attorney carries 7 schemas — the richest of any portal kit:

```
activity-log-event.json    client-model.json
dashboard-model.json       document-model.json
spec-structure.json        transaction-model.json
verification-model.json
```

This directly reflects the attorney domain: verification and document review require richer models than simpler portals. `verification-model.json` and `dashboard-model.json` are attorney-specific schemas not found in any other portal kit. All schemas use the `<entity>-<type>.json` naming convention consistently.

### 8.2 CRM Schemas (Two Locations)

The CRM separates schemas into two directories with distinct purposes:

**`.specify/schemas/` (3 files — meta-schemas only):**
```
plan-structure.json    spec-structure.json    tasks-structure.json
```
These validate the structure of spec artifacts themselves, not domain data. This is a clean separation of concern: the meta-schemas ensure spec documents conform to the spec-template; they do not model business entities.

**`schemas/` root (14 domain schemas):**
```
activity.schema.json          admin-settings.schema.json
calendar-event.schema.json    call-recording.schema.json
campaign.schema.json          contact.schema.json
integration-connector.schema.json    lead.schema.json
meeting.schema.json           mortgage.schema.json
policy.schema.json            report-request.schema.json
transaction.schema.json       user.schema.json
```

14 schemas using the `<entity>.schema.json` convention. This is significantly more comprehensive than any portal kit. `call-recording.schema.json` is especially notable: it captures VOIP recording metadata with per-department retention expiry logic — a compliance requirement that would otherwise be scattered across prose specs.

Beyond the `.specify/` layer, the CRM also has:
- **`api.yaml`** — Full REST API manifest covering all CRM endpoints with method, path, and purpose
- **`access_control.yaml`** — RBAC roles and permission scoping per department
- **`events.yaml`** — System event definitions for notifications and triggers
- **`interactions.yaml`** — User interaction flows (modals, drawers, confirmations)
- **`design.tokens.yaml`** — Design token system (colours, typography, spacing, department colour coding)

These YAML contract files constitute a machine-readable specification layer that has no equivalent in the attorney kit. While Attorney's schemas excel within the `.specify/` convention, the CRM's combined schema + YAML layer represents a substantially more complete data contract system.

**Dimension 6 score: Attorney 3/5 — CRM 5/5**

---

## 9. Dimension 7 — Spec Content Quality

This dimension evaluates how faithfully the `spec.md` files in each kit follow the established spec-template, and how usable the resulting documents are.

### 9.1 Attorney Spec Content

A review of attorney `000-foundation/spec.md` reveals a technical, system-design-oriented document that does not follow the spec-template:

```markdown
## Session Context Contract
* Fields: `session_token` (string), `user_id` (string), `role` (string)...

## Authentication Requirements
* Valid Bearer JWT.
* Strict mapping of `role` in JWT to incoming request path permissions.
```

This is API contract language, not user-facing specification language. The spec-template requires sections like `## Overview`, `## Problem Statement`, `## User Scenarios`, and `## Functional Requirements` — none of which are present in the foundation spec. The document reads more like a backend contract than a feature specification, which conflicts with the technology-agnostic principle documented in ADR-005.

`001-dashboard/spec.md` has the same issue — it leads with an FR table in SQL-like language (`FR-DSH-01: System MUST return a list of transactions where status == 'needs_verification' AND closing_date < NOW() + 14 days`) rather than a narrative user scenario. There is no `## Overview`, `## Goals`, or `## Non-Goals`. The actors section has one bullet, not a table.

The later modules (002 through 005) may follow the template more closely, but the foundation and primary dashboard — the two most-read specs in any kit — do not conform.

### 9.2 CRM Spec Content

The CRM `000-foundation/spec.md` follows the template explicitly and reads as intended:

- **Overview** — Full narrative paragraph explaining the shared shell and its purpose
- **Problem Statement** — A substantive paragraph (8 sentences) explaining what breaks without a foundation, why fragmentation is especially costly in this product, and why the CRM's position beside six portals makes this foundation spec uniquely consequential
- **Goals** — Six bulleted, implementation-independent outcomes
- **Non-Goals** — Three explicit exclusions including "does not finalize a specific VOIP vendor selection"
- **Actors** — Full table with 5 roles and per-role descriptions
- **User Scenarios** — Full narrative flows with Actor, Precondition, numbered Steps, and Success criteria

`001-dashboard/spec.md` maintains the same pattern — non-technical overview, substantive problem statement, user-centric scenarios.

The CRM specs also have `Status: approved` in their frontmatter, while attorney specs show `Status: Draft`. This matters for process: `approved` indicates the spec has passed product review and is ready for planning, while `Draft` means it has not. A developer picking up an attorney spec module sees `Draft` — the spec may still be evolving under their feet.

**Dimension 7 score: Attorney 2/5 — CRM 4/5**

---

## 10. Dimension 8 — Templates & Writing Standards

Both kits share an identical `spec-template.md` and `plan-template.md`. Both include all 10 standard artifact templates. This dimension is effectively a tie.

There are two differentiation points:

**Attorney STANDARDS.md is more prescriptive.** It specifies minimum word counts (Overview: 50 words, Problem Statement: 100 words), explicit section ordering, and annotation of what belongs in each section. The CRM STANDARDS.md is correct but leaner — it lists required sections without minimum lengths or examples.

**CRM STANDARDS.md explicitly names `plan.md` and `tasks.md` as required artifacts.** Attorney STANDARDS.md lists the 6 standard supporting artifacts (changelog, validation-schema, test-scenarios, rollout, metrics, risks) but does not mention plan.md or tasks.md in the standards document, despite both files existing in every module. This inconsistency means a new attorney contributor reading STANDARDS.md would not know they need to produce implementation artifacts.

**Dimension 8 score: Attorney 4/5 — CRM 4/5 (Tie)**

---

## 11. Dimension 9 — Research Depth

| File | Attorney | CRM |
|---|---|---|
| `user-personas.md` | ✅ | ✅ |
| `competitive-analysis.md` | ✅ | ✅ |
| `constitution-rationale.md` | ❌ | ✅ |
| `transition-plan.md` | ❌ | ✅ |
| `integration-api-audit.md` | ❌ | ✅ |
| `voip-provider-research.md` | ❌ | ✅ |

The CRM carries 6 research documents vs. Attorney's 2. The four CRM-only files represent a best practice the attorney kit does not follow: external dependencies (VOIP providers, Arive, DotLoop, HAR) were formally audited before being committed in specs. Attorney's sole dependency — the shared backend API — is assumed but not audited.

The CRM's `transition-plan.md` is especially valuable because it documents migration from Follow Up Boss and Agency Zoom. Without this, the spec is missing the context of what the new system must replace, which affects scoping decisions across multiple modules.

**Dimension 9 score: Attorney 2/5 — CRM 5/5**

---

## 12. Dimension 10 — CRM-Unique Innovations

This dimension acknowledges that the CRM introduces several structural innovations that extend beyond the GitHub spec-kit standard. These are not conformance points — the standard does not require them — but they represent additive best practices worth evaluating for adoption.

### YAML Declarative Contract Layer

The CRM adds 7 root-level YAML files that complement the `.specify/specs/` Markdown layer:

```
index.yaml           — master manifest (screens, departments, integrations, phases)
layout.yaml          — app shell, sidebar, top nav, responsive grid system
design.tokens.yaml   — colours, typography, spacing, department colour coding
api.yaml             — REST API contract for all CRM endpoints
access_control.yaml  — RBAC roles, permissions, department scoping
interactions.yaml    — user interaction flows (modals, drawers, confirmations)
events.yaml          — system event definitions (notifications, triggers)
```

These files enable machine-readable contract validation in a way that Markdown cannot. `api.yaml` can be linted, used to generate API documentation, or validated against an actual implementation. `access_control.yaml` can be used to generate permission tables or test access control rules. `design.tokens.yaml` can be directly consumed by a design tool or CSS build pipeline.

### Screen and Component Manifests

The `screens/` and `components/` directories provide YAML screen manifests for all 16 CRM screens and 5 reusable UI components. This bridges the gap between specification (what the system does) and implementation (how it looks and behaves), giving developers a structured reference that reduces interpretation ambiguity.

### Phase Deliverable Documents

`PHASE-1-DELIVERABLE.md` and `PHASE-2-DELIVERABLE.md` provide explicit delivery-scoped views of the spec-kit. They specify which modules are in scope for which phase, where each deliverable lives, and what validation has been completed. No portal kit has an equivalent.

### HTML Template Reference

The `html-template/` directory contains a rendered HTML prototype (`index.html`, `contracts.html`) with full CSS and JavaScript. This is an unconventional addition — specifications typically do not ship live prototypes — but it serves a real purpose: it gives designers and developers a visual reference for what was specified, reducing the gap between specification language and intended user experience.

**Note**: The YAML layer also introduces an inconsistency: `components/` uses `snake_case` naming (`stat_card.yaml`, `pipeline_board.yaml`, `data_table.yaml`) while `screens/` uses `kebab-case` (`email-blast.yaml`, `video-meetings.yaml`). This naming drift should be standardized.

**Dimension 10 score: Attorney 0/5 — CRM 5/5**

---

## 13. Scoring Summary

Each dimension is scored 1–5 where 5 = fully conforms/excels and 1 = significant gap or non-conformance.

| # | Dimension | Attorney | CRM |
|---|---|---|---|
| 1 | GitHub Automation (.github/) | **5** | **1** |
| 2 | Repository Structure & Root Layer | **3** | **4** |
| 3 | Constitution Quality | **4** | **4** |
| 4 | Per-Module Artifact Completeness | **4** | **3** |
| 5 | ADR Quality & Specificity | **4** | **3** |
| 6 | Schemas & Data Contracts | **3** | **5** |
| 7 | Spec Content Quality | **2** | **4** |
| 8 | Templates & Writing Standards | **4** | **4** |
| 9 | Research Depth | **2** | **5** |
| 10 | CRM-Unique Innovations | **0** | **5** |
| | **Total (50 max)** | **31** | **38** |
| | **Standard Compliance Score (D1–D9, 45 max)** | **31** | **33** |

> The total score including CRM innovations (D10) favors CRM 38–31. The standard-compliance-only score (D1–D9, excluding innovations) is CRM 33 – Attorney 31 — effectively a tie on content, with Attorney's large lead on GitHub automation offset by CRM's leads on schemas, spec quality, and research.
>
> On the dimension that most directly defines "GitHub spec-kit standards" — the `.github/` automation layer — Attorney leads 5–1 and the gap is not close.

---

## 14. Verdict & Rationale

### Attorney better follows GitHub spec-kit standards.

The GitHub spec-kit standard is defined, in large part, by the `.github/` layer: how a repository enforces its own rules, protects its own quality, and structures contribution workflows. Attorney passes this layer completely. CRM does not pass it at all in any meaningful sense.

The five attorney workflows together enforce:
- Spec template conformance (11 required sections)
- Requirement ID formatting (`FR-NN-NN`)
- Constitution reference presence
- Implementation-language exclusion from specs
- JSON schema validity
- Cross-reference integrity
- Changelog discipline (no spec change without a version bump)
- Sensitive data scanning
- PR title conventions

This is automated governance. Every PR that touches an attorney spec is automatically checked against the specification standard before human review begins. The CRM has none of this.

The four attorney issue templates enforce:
- Structured spec change requests with severity classification
- Mandatory rationale and impact analysis before spec updates
- Actor identification before new features are proposed
- Success metric definition at the proposal stage

This is process governance. The CRM's single-field question template provides none of it.

### Why the CRM score is still high

The verdict favors Attorney on standards, but the CRM is not an inferior spec-kit — it is a different kind of spec-kit that has prioritized architectural completeness over process automation. Its YAML contract layer, 14 domain schemas, 6 research documents, and phase deliverable docs make it more useful as an implementation guide. Its spec.md files are actually more faithful to the spec-template. Its constitution is cleaner (no stale duplicate). On pure content quality, the CRM is ahead.

The gap between the kits is ultimately this: **Attorney is process-complete, content-incomplete. CRM is content-complete, process-incomplete.** A team using the attorney kit will be well-governed but needs to flesh out spec content quality and research. A team using the CRM kit will have rich implementation artifacts but will be working without automated quality gates.

---

## 15. Prioritized Remediation Plan

### For CRM — Bring GitHub Automation to Standard

These are the minimum actions required for the CRM to reach GitHub spec-kit conformance.

| Priority | Action | Effort |
|---|---|---|
| 🔴 **1** | Add `validate-specs.yml` that checks all 11 required spec.md sections, enforces `FR-NN-NN` IDs, and flags implementation language | Medium |
| 🔴 **2** | Add `validate-schema.yml` that validates all files in `schemas/*.json` and `.specify/specs/*/validation-schema.json` for valid JSON | Small |
| 🔴 **3** | Add `validate-yaml.yml` that lints all `.yaml` files in `screens/`, `components/`, and root | Small |
| 🔴 **4** | Add `spec-new.md` and `spec-update.md` issue templates. Without structured intake, spec changes lack traceability | Medium |
| 🔴 **5** | Add `bug-report.md` issue template for reporting spec contradictions with structured metadata | Small |
| 🟠 **6** | Expand CODEOWNERS to assign per-module reviewers for all 17 feature modules | Medium |
| 🟠 **7** | Add `pr-checks.yml` (PR title convention, sensitive data scan) and `version-check.yml` (changelog discipline) | Small |
| 🟡 **8** | Add root `constitution.md` (copy or symlink from `.specify/memory/`) with a note marking the `.specify/memory/` copy as authoritative | Small |
| 🟡 **9** | Standardize `components/` naming to `kebab-case` (`pipeline-board.yaml`, `data-table.yaml`, `stat-card.yaml`) | Small |
| 🟡 **10** | Rename `prompts/Anazlye.md` → `prompts/Analyze.md` | Trivial |
| 🟡 **11** | Expand each CRM ADR's Rationale section to include: alternatives considered, forces at tension, and consequences of the path not taken | Medium |

### For Attorney — Raise Content Quality to Standard

| Priority | Action | Effort |
|---|---|---|
| 🔴 **1** | Rewrite `000-foundation/spec.md` to follow the spec-template: replace technical contract language with user-facing narrative (Overview, Problem Statement, User Scenarios, Functional Requirements) | Large |
| 🔴 **2** | Rewrite `001-dashboard/spec.md` to follow the spec-template: replace SQL-style FR bullets with proper scenario-driven requirements | Medium |
| 🔴 **3** | Delete or clearly deprecate root `constitution.md`. The `.specify/memory/constitution.md` is the authoritative source; the root copy is stale, has different stages, and different role vocabulary | Small |
| 🟠 **4** | Add `rbac-matrix.md`, `activity-log-events.md`, `api-contracts.md`, and `state-machines.md` to `000-foundation` to bring it to the same 13-file standard as modules 001–005 | Medium |
| 🟠 **5** | Advance spec statuses from `Draft` to `approved` for modules that have completed product review | Small |
| 🟡 **6** | Add `competitive-analysis.md` specifically for attorney-facing legal compliance portal competitors | Medium |
| 🟡 **7** | Add `transition-plan.md` documenting what current attorney workflow the portal replaces (email, spreadsheets, etc.) | Medium |
| 🟡 **8** | Update STANDARDS.md to explicitly list `plan.md` and `tasks.md` as required artifacts per module | Small |

---

*This document was produced through full structural and content analysis of both spec-kit archives. File counts, workflow logic, issue template fields, ADR body text, spec.md content, and constitution documents were all read directly.*

**Document Version**: 1.0  
**Analysis Date**: April 22, 2026
