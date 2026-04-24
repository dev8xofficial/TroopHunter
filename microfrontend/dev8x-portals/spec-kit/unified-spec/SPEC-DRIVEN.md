# Spec-Driven Development (SDD)

> The methodology governing how specifications are authored, validated, and evolved in this repository.

---

## What is SDD?

Spec-Driven Development is a methodology where **functional specifications are written before implementation begins**. The spec-kit serves as the single source of truth for what the system does, how entities behave, who can access what, and what business rules govern operations.

Implementation code is derived from specs — never the reverse.

---

## Core Tenets

### 1. Specs Before Code

Every feature, endpoint, state machine, and access rule is defined in the spec-kit before any code is written. The spec is the contract between product, engineering, and QA.

### 2. Technology Agnostic

Specs describe _what_ happens, not _how_. No framework names, library references, database engines, or language-specific constructs appear in spec files.

### 3. Single Source of Truth

Each fact lives in exactly one file. Other files reference it. Duplication is a spec defect.

### 4. Append-Only Evolution

Specs evolve through versioned changelog entries. Historical decisions are preserved, never retroactively deleted.

### 5. Validation as CI

Spec structure, naming, cross-references, and JSON schemas are validated automatically via GitHub Actions on every PR.

---

## Workflow

```
1. IDENTIFY     → Feature or change request received
2. RESEARCH     → Domain analysis, user personas, competitive review
3. SPECIFY      → Create/update module artifacts (13 files)
4. REVIEW       → PR review by domain owner + spec reviewer
5. VALIDATE     → CI runs structural + schema + cross-ref checks
6. MERGE        → Spec enters main branch as authoritative
7. IMPLEMENT    → Engineering builds against merged spec
8. VERIFY       → QA validates implementation against spec
9. EVOLVE       → Changelog updated, version bumped
```

---

## Module Lifecycle

| Phase | Artifacts Created | Gate |
|-------|------------------|------|
| **Draft** | `spec.md`, `plan.md`, `tasks.md` | Domain owner review |
| **Specified** | All 13 artifacts complete | CI validation passes |
| **Approved** | PR merged to main | Two approvals required |
| **Implementing** | No spec changes (code in progress) | — |
| **Verified** | `metrics.md` updated with actuals | QA sign-off |

---

## Quality Gates

1. **Structural**: Every module has exactly 13 files with correct names
2. **Naming**: All IDs follow `FR-DDD-NN` / `BR-DDD-NN` format
3. **Referential**: All cross-module references resolve to valid paths
4. **Schema**: All `validation-schema.json` files pass JSON Schema lint
5. **RBAC**: All `rbac-matrix.md` files cover all 6 platform roles
6. **No-UI**: Zero CSS, color, layout, or design references in any file
