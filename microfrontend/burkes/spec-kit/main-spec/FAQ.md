# Frequently Asked Questions — Agent Portal Spec-Kit

## General

### What is a spec-kit?

A spec-kit is a structured repository of feature specifications, supporting artifacts, schemas, and governance documents that together define *what* a product does and *why*. It is the single source of truth for product requirements.

### How is the Agent Portal different from the Client Portal?

The Agent Portal is built for real estate agents (role: AG) who manage multiple transactions, clients, and professional relationships. The Client Portal is built for homebuyers (role: CL) who track a single transaction. Each has its own spec-kit, but they share the same transaction data and design system foundations.

### How many screens does the Agent Portal have?

Eight screens plus a foundation layer:

| # | Screen |
|---|--------|
| 000 | Foundation (global infrastructure) |
| 001 | Dashboard |
| 002 | Transactions |
| 003 | Documents |
| 004 | Clients |
| 005 | Messages |
| 006 | Calendar |
| 007 | Partner Referrals |
| 008 | Reports |

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

Global JSON schemas that apply across all features (e.g., transaction data model, activity log event structure, spec file structure). These are the canonical data contracts.

### What are ADRs?

Architecture Decision Records (in `.specify/decisions/`) document significant design choices, their rationale, and consequences. They explain *why* we made a decision — not just *what* we decided.

---

## Roles

### What is the difference between AG and TC?

- **AG (Agent)**: The primary portal user. Manages their own transactions, uploads documents, communicates with clients and professionals, schedules appointments, refers partners.
- **TC (Transaction Coordinator / Admin)**: Has access to all transactions. Approves or rejects stage update requests from agents. Can upload any document type.

### Why do stage updates require admin approval?

Stage updates affect the transaction lifecycle visible to all parties (clients, lenders, attorneys). To maintain data integrity, the agent submits a stage change request with a reason, and the TC admin reviews and approves or rejects it. This is documented in ADR-004.

---

## Design System

### Can I use hex colour values in a spec?

No. Always reference design tokens by name (e.g., `primary-navy`, `success-green`). See the Foundation spec (000) for the complete token list.

### What fonts does the portal use?

- **Archivo** — Headings, card titles, stat values, modal titles (display weight)
- **Manrope** — Body text, labels, buttons, inputs, descriptions (body weight)

---

**Version**: 1.0
**Last Updated**: April 11, 2026
