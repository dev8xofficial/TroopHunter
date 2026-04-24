# ADR-004: 13-File Module Standard

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect

---

## Context

The Burkes Group spec-kit comparison revealed significant variation in per-module artifact counts:

| Kit | Files per Module | Quality Score |
|-----|-----------------|---------------|
| Attorney | 11–13 | Highest (GitHub-standard) |
| CRM | 8–10 | Highest (content depth) |
| Admin | 6–8 | Medium |
| Agent | 6–8 | Medium |
| Client | 7–9 | Medium |
| ServicePartner | 6–8 | Medium |
| Main | 4–6 | Lowest |

The Attorney kit's completeness correlated with the highest GitHub process standard, while missing artifacts in other kits caused gaps in test coverage, risk assessment, and rollout planning.

---

## Decision

Every module directory shall contain exactly **13 files** — no more, no less:

| # | File | Purpose | Source Pattern |
|---|------|---------|---------------|
| 1 | `spec.md` | Feature specification | Attorney |
| 2 | `plan.md` | Implementation plan | Attorney |
| 3 | `tasks.md` | Task breakdown | Attorney |
| 4 | `changelog.md` | Version history | Attorney |
| 5 | `metrics.md` | Success metrics & KPIs | CRM |
| 6 | `risks.md` | Risk assessment | New |
| 7 | `rollout.md` | Rollout strategy & feature flags | New |
| 8 | `test-scenarios.md` | Test cases & acceptance criteria | Attorney |
| 9 | `validation-schema.json` | Payload validation rules | CRM |
| 10 | `rbac-matrix.md` | Role-based access control | Attorney + CRM |
| 11 | `activity-log-events.md` | Audit event definitions | CRM |
| 12 | `api-contracts.md` | REST API endpoint contracts | Attorney + CRM |
| 13 | `state-machines.md` | State transition definitions | CRM |

This set merges the Attorney kit's process rigor (plan, tasks, changelog, test-scenarios) with the CRM kit's content innovations (validation-schema, activity-log-events, state-machines, metrics).

---

## Consequences

### Positive

- **Completeness guarantee**: CI validates exact file count — no module can be merged with missing artifacts
- **Predictable structure**: Every module has the same shape — reviewers know where to look
- **Full coverage**: Risks, rollout, and metrics ensure operational readiness beyond just functional specs
- **Best of both**: Combines Attorney process discipline with CRM content depth

### Negative

- **Overhead for simple modules**: A login page still needs 13 files, even if `risks.md` is thin
- **Stub noise**: Initial scaffold creates 507 empty stub files that need population
- **Rigidity**: Adding a 14th artifact type requires ADR and global migration

---

## Alternatives Considered

### Alternative 1: 11-File Standard (Attorney As-Is)

**Rejected Because**: Missing `risks.md`, `rollout.md`, and `metrics.md` — these were identified as critical gaps in production readiness assessment.

### Alternative 2: Flexible File Count (Variable per Module)

**Rejected Because**: The Burkes Group analysis proved that flexibility leads to inconsistency. Modules with "optional" artifacts always skip them.

### Alternative 3: 15+ File Standard (Maximum Coverage)

**Rejected Because**: Diminishing returns. Adding files like `dependencies.md`, `glossary.md`, or `migration.md` per module creates busywork without proportional value. These concerns are better handled at the root or contract level.

---

## References

- [spec-kit-comparison-analysis.md](../../../../burkes/prompts/spec-kit-comparison-analysis.md) — Attorney vs CRM file count analysis
- [comparsion-attonery.md](../../../../burkes/prompts/comparsion-attonery.md) — Attorney kit template assessment
- [STANDARDS.md](../../STANDARDS.md) — File naming and structure conventions
