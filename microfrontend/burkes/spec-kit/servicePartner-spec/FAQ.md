# Frequently Asked Questions — Service Partner Portal Spec-Kit

## General

### What is a spec-kit?

A spec-kit is a structured repository of feature specifications, supporting artifacts, schemas, and governance documents that together define *what* a product does and *why*. It is the single source of truth for product requirements.

### How is the Service Partner Portal different from the Agent Portal?

The Service Partner Portal is built for home service providers (role: SP) who receive referrals from real estate agents and manage their jobs, quotes, reviews, and earnings. The Agent Portal is built for real estate agents (role: AG) who manage transactions, documents, and client relationships. Each has its own spec-kit, but they share the same referral data and design system foundations.

### How many screens does the Service Partner Portal have?

Eight screens plus a foundation layer:

| # | Screen |
|---|--------|
| 000 | Foundation (global infrastructure) |
| 001 | Dashboard |
| 002 | Referrals |
| 003 | Active Jobs |
| 004 | Quotes |
| 005 | Reviews |
| 006 | Service Areas |
| 007 | Earnings |
| 008 | Profile |

---

## Contribution

### How do I propose a new feature?

1. Open an issue using the **New Feature Specification** template (`.github/ISSUE_TEMPLATE/spec-new.md`).
2. After discussion and approval, create a draft `spec.md` using the spec template.
3. Submit a PR targeting the `main` branch.

### How do I update an existing spec?

1. Open an issue using the **Spec Update** template.
2. Make changes in a branch; update the `changelog.md` in the feature directory.
3. Submit a PR with the checklist completed.

### Who approves spec changes?

- **PM Team**: Confirms business requirements and priority.
- **Technical Architecture**: Validates implementation feasibility, dependencies, and design system compliance.
- Both must approve before merge.

### Can I add implementation details to a spec?

No. Specs are technology-agnostic per Principle P-06 in the constitution. Use `plan.md` and `tasks.md` files (generated from the `.github/plan.prompt.md` and `.github/tasks.prompt.md` prompts) for implementation guidance.

---

## Structure

### What goes in each feature directory?

Each directory under `.specify/specs/NNN-name/` contains:

| File | Purpose |
|------|---------|
| `spec.md` | The feature specification |
| `changelog.md` | Version history |
| `validation-schema.json` | JSON Schema for data validation |
| `test-scenarios.md` | Test cases, edge cases, accessibility |
| `rollout.md` | Deployment phases and feature flags |
| `metrics.md` | KPIs and success criteria |
| `risks.md` | Risk register and mitigations |

### What are the `.specify/schemas/` for?

Global JSON schemas that apply across all features (e.g., referral data model, activity log event structure, spec file structure). These are the canonical data contracts.

### What are ADRs?

Architecture Decision Records (in `.specify/decisions/`) document significant design choices, their rationale, and consequences. They explain *why* we made a decision — not just *what* we decided.

---

## Roles

### What is the difference between SP and AD?

- **SP (Service Partner)**: The primary portal user. Receives referrals, manages jobs, sends quotes, tracks earnings, maintains company profile.
- **AD (Admin)**: Platform administrator; manages partner accounts, verifies licenses and insurance, oversees platform operations.

### What role does an Agent (AG) play in this portal?

Agents are the source of referrals. They submit referral requests through the Agent Portal, which appear in the Service Partner Portal as new leads. The Service Partner does not directly interact with the Agent Portal but sees agent-originated referrals.

### What role does a Client (CL) play?

Clients (homeowners) are the end consumers of the service partner's work. They receive quotes, have their properties serviced, and leave reviews. Clients interact through the main platform, not directly through the Service Partner Portal.

---

## Design System

### Can I use hex colour values in a spec?

No. Always reference design tokens by name (e.g., `primary-navy`, `success-green`). See the Foundation spec (000) for the complete token list.

### What fonts does the portal use?

- **Archivo** — Headings, card titles, stat values, modal titles (display weight)
- **Manrope** — Body text, labels, buttons, inputs, descriptions (body weight)

---

**Version**: 1.0
**Last Updated**: April 12, 2026
