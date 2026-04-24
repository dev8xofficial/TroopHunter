# FAQ

> Frequently asked questions about the Dev8X Unified Spec-Kit.

---

## General

### What is this repository?

This is the **unified functional specification** for the Dev8X Talent Management & CRM Platform. It defines what the system does — business logic, data models, API contracts, state machines, access control, and audit events — without prescribing how it is built.

### Why a spec-kit instead of code comments or a wiki?

Spec-kits are version-controlled, CI-validated, and review-gated. Wikis drift. Code comments are scattered. The spec-kit is the single source of truth with automated quality enforcement.

### How do I find the spec for a specific feature?

1. Identify the domain (Auth, Admin, Candidate, Client, CRM)
2. Look up the module in [ARCHITECTURE.md](ARCHITECTURE.md)
3. Navigate to `.specify/specs/[module-id]/spec.md`

### What are the 13 files per module?

See [STANDARDS.md](STANDARDS.md#module-standard) for the full list. In brief: spec, plan, tasks, changelog, metrics, risks, rollout, test-scenarios, validation-schema, rbac-matrix, activity-log-events, api-contracts, state-machines.

---

## Content Rules

### Can I include UI mockups or wireframes?

No. This spec-kit is strictly functional. No CSS, layouts, color values, typography, design tokens, or visual specifications are permitted.

### Can I reference specific technologies?

No. Specs must be technology-agnostic. Write "the system shall validate the TOTP code" — not "use the `speakeasy` npm package to validate."

### What if I need to describe how something looks?

You don't. Describe what the user _can do_ and what the system _does in response_. Visual design is handled by a separate design system.

---

## Process

### How do I add a new module?

1. File a [spec-new issue](.github/ISSUE_TEMPLATE/spec-new.md)
2. Create a numbered directory under `.specify/specs/`
3. Generate all 13 artifacts from templates
4. Submit a PR

### How do I update an existing spec?

1. File a [spec-update issue](.github/ISSUE_TEMPLATE/spec-update.md)
2. Edit the affected artifacts
3. Add a changelog entry
4. Submit a PR

### What happens if CI fails?

Fix the validation error. Common causes:
- Missing artifact file (need exactly 13)
- Invalid JSON schema syntax
- Broken cross-reference link
- Naming convention violation
