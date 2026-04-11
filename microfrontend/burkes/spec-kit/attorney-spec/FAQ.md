# Frequently Asked Questions — Attorney Portal Spec-Kit

## General

### What is a spec-kit?

A spec-kit is a structured repository of feature specifications, supporting artifacts, schemas, and governance documents that together define *what* a product does and *why*. It is the single source of truth for product requirements.

### How is the Attorney Portal different from the Agent Portal?

The Attorney Portal is built for closing attorneys (role: AT) who verify transaction amounts, review legal documents, and ensure closing compliance. The Agent Portal is built for real estate agents (role: AG) who manage the full transaction lifecycle. Each has its own spec-kit, but they share the same transaction data and design system foundations.

### How many screens does the Attorney Portal have?

Five screens plus a foundation layer:

| # | Screen |
|---|--------|
| 000 | Foundation (global infrastructure) |
| 001 | Dashboard |
| 002 | Transactions |
| 003 | Documents |
| 004 | Clients |
| 005 | Verification |

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

### What is the difference between AT and AG?

- **AT (Attorney)**: The primary portal user. Verifies closing amounts, reviews and approves documents, flags discrepancies, manages client cases, and generates verification reports.
- **AG (Agent)**: A real estate agent who submits transactions and documents for attorney review. Uses the separate Agent Portal.

### Why is verification the attorney's primary function?

The closing attorney acts as the independent verifier of all dollar amounts in a real estate transaction. Sale prices, loan amounts, closing costs, and cash-to-close figures must be confirmed accurate before a closing can proceed. This is a legal compliance requirement.

### What happens when the attorney flags a discrepancy?

Flagging pauses the closing process and notifies all parties (agent, lender, title company, and optionally the client). The flag includes the discrepancy type, description, and notification preferences. The transaction cannot proceed to closing until the discrepancy is resolved.

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
