# Standards

> Writing conventions, naming rules, and quality criteria for all spec-kit artifacts.

---

## 1. General Principles

1. **Technology-Agnostic**: Specs describe _what_ the system does, never _how_ it is built. No framework names, library references, or implementation details.
2. **Scenario-Driven**: Every feature is specified through concrete user scenarios, not abstract requirements.
3. **Append-Only History**: Changelogs and activity logs are append-only. Never delete or retroactively edit historical entries.
4. **Single Source of Truth**: Each fact appears in exactly one place. Other files reference it; they do not duplicate it.
5. **Prescriptive, Not Descriptive**: Specs state what _shall_ happen, not what _might_ happen. Use "shall" and "must," not "should" or "could."

---

## 2. File Naming

| Rule | Example |
|------|---------|
| All directory names: **kebab-case** | `001-authentication`, `crm-pipeline` |
| All file names: **kebab-case** | `api-contracts.md`, `validation-schema.json` |
| Domain prefix: **3-digit numeric** | `001`, `102`, `403` |
| No spaces, no camelCase, no PascalCase | ✗ `ApiContracts.md`, ✗ `api contracts.md` |

---

## 3. Spec Structure (spec.md)

Every `spec.md` must contain these sections in order:

```markdown
# [Module Name]

## Overview
Brief description (2-3 sentences).

## Actors
Who interacts with this module and what role they play.

## Functional Requirements
### FR-[DDD]-[NN]: [Requirement Name]
Requirement description with acceptance criteria.

## Data Model
Entity definitions with fields, types, and constraints.

## Business Rules
### BR-[DDD]-[NN]: [Rule Name]
Rule description with conditions and outcomes.

## State Machine
Reference to state-machines.md or inline transitions.

## API Surface
Reference to api-contracts.md.

## Access Control
Reference to rbac-matrix.md.

## Audit Events
Reference to activity-log-events.md.

## Dependencies
Cross-references to other modules this depends on.
```

### Requirement IDs

- Format: `FR-[DDD]-[NN]` where `DDD` = domain code, `NN` = sequence
- Example: `FR-001-01` (Authentication, requirement 1)
- Example: `FR-402-03` (CRM Pipeline, requirement 3)

### Business Rule IDs

- Format: `BR-[DDD]-[NN]`
- Example: `BR-003-01` (MFA, rule 1)

---

## 4. API Contracts (api-contracts.md)

```markdown
### [METHOD] [Path]

| Field | Value |
|-------|-------|
| **Description** | What this endpoint does |
| **Auth** | Required role(s) |
| **Rate Limit** | Requests/minute |

**Request Body:**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| field_name | string | Yes | min: 1, max: 255 |

**Response (200):**

| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Entity identifier |

**Error Codes:**

| Code | Condition |
|------|-----------|
| 400 | Validation failure |
| 401 | Not authenticated |
| 403 | Insufficient permissions |
```

---

## 5. State Machines (state-machines.md)

```markdown
## [Entity] Lifecycle

### States

| State | Description | Terminal |
|-------|-------------|---------|
| state_name | What it means | Yes/No |

### Transitions

| From | To | Trigger | Guard | Side Effects |
|------|----|---------|-------|--------------|
| state_a | state_b | action() | condition | events emitted |
```

---

## 6. RBAC Matrix (rbac-matrix.md)

```markdown
## Access Control

| Operation | super_admin | hr_admin | candidate | client | sales_rep | manager |
|-----------|-------------|----------|-----------|--------|-----------|---------|
| Create    | ✅          | ✅       | ❌        | ❌     | ❌        | ❌      |
| Read      | ✅          | ✅       | Own       | ❌     | ❌        | ✅      |
```

Use: ✅ (full), Own (own data only), ❌ (denied), — (not applicable)

---

## 7. Validation Schema (validation-schema.json)

JSON Schema draft-07. Every schema must include:

- `$schema` declaration
- `title` matching the module name
- `description` with one-line purpose
- `required` array
- Per-field: `type`, `minLength`/`maxLength`, `pattern` where applicable

---

## 8. Changelog (changelog.md)

```markdown
## [Version] — YYYY-MM-DD

### Added
- New features

### Changed
- Modifications

### Removed
- Deletions
```

Follow [Keep a Changelog](https://keepachangelog.com/) format.

---

## 9. Cross-References

- Reference centralized contracts using relative paths: `See [access-control.yaml](../../../contracts/access-control.yaml)`
- Reference other modules by ID: `Depends on [001-authentication](./../001-authentication/spec.md)`
- Never duplicate content that exists in contracts/ or another module

---

## 10. Quality Checklist

Before any spec is considered complete:

- [ ] All 13 artifacts present
- [ ] All requirement IDs follow `FR-DDD-NN` format
- [ ] All business rule IDs follow `BR-DDD-NN` format
- [ ] No UI/design/styling content (no CSS, colors, layouts, typography)
- [ ] No technology-specific references (no framework names, library calls)
- [ ] All cross-references resolve to valid targets
- [ ] Validation schema passes JSON Schema lint
- [ ] RBAC matrix covers all 6 roles
- [ ] State machine includes all terminal states
- [ ] Changelog has at least one entry
