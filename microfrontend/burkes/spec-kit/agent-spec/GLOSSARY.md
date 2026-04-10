# Glossary — Agent Portal Spec-Kit

All spec authors and reviewers must use these terms consistently. If a term is missing, submit a PR to add it.

---

## Business Terms

| Term | Definition |
|------|-----------|
| **Active Transaction** | A transaction that is not in the "Completed" stage. Appears on the Dashboard and Transactions screens. |
| **Agent** | A licensed real estate professional (role: AG) who manages client transactions through the portal. Reference agent: Sarah Anderson. |
| **Brokerage** | The real estate company the agent works for. Reference: The Burkes Group. |
| **Client** | A buyer or seller (role: CL) involved in a real estate transaction. Clients have their own portal (Client Portal). |
| **Closing Date** | The scheduled date when a transaction is finalised and ownership transfers. |
| **Closing Soon** | A transaction status indicating the closing date is within 14 days. |
| **Commission** | The agent's earnings from a completed transaction, typically a percentage of the sale price. |
| **Contract Amount** | The agreed purchase or sale price for a property, in USD. |
| **Delayed** | A transaction status indicating the deal is behind schedule but still active. |
| **KPI** | Key Performance Indicator — a measurable value displayed on the Dashboard and Reports screens. |
| **Listing** | A property that is for sale, managed by the agent on behalf of a seller client. |
| **Offer** | A formal proposal from a buyer to purchase a property at a specified price. |
| **On Track** | A transaction status indicating the deal is proceeding normally toward the closing date. |
| **Partner** | A service provider (plumber, roofer, electrician, etc.) in the partner directory that agents can refer to clients. |
| **Pipeline** | The collection of all active transactions at various stages, visualised in the Reports screen. |
| **Purchase Agreement** | A legal document outlining the terms of a property purchase, also called P&S Agreement. |
| **Referral** | A formal recommendation from the agent connecting a client with a partner service provider. |
| **Stage** | One of the 12 canonical steps in the transaction lifecycle (see constitution Section 4). |
| **Stage Update** | A request from the agent to move a transaction to a different stage. Requires admin (TC) approval. |
| **Transaction** | A real estate deal (purchase, sale, refinance, or divorce asset split) tracked through the portal. |
| **Transaction Coordinator (TC)** | An admin role that manages portal setup, approves stage updates, and has access to all transactions. |
| **Transaction ID** | A unique identifier in the format `TRX-NNNNN` (e.g., TRX-10247). |

---

## Technical Terms

| Term | Definition |
|------|-----------|
| **Activity Log** | An append-only, immutable audit trail of all meaningful state changes across all screens. |
| **Activity Event** | A single entry in the activity log, containing: event_id, event_type, timestamp, actor_role, icon, label, description. |
| **Badge** | A coloured status indicator (active/pending/completed) used throughout the portal to communicate state. |
| **Design Token** | A named value (colour, shadow, spacing) from the design system. Specs reference tokens by name, never by raw value. |
| **Feature ID** | A zero-padded identifier for a spec (e.g., `000-foundation`, `001-dashboard`). |
| **Foundation** | The base layer (spec 000) that all other specs inherit — navigation, tokens, session, activity log. |
| **FR** | Functional Requirement — a numbered requirement in a spec (format: `FR-NN-NN`). |
| **Modal** | A full-screen overlay containing a form or detail view. The portal uses modals for transaction details, new transactions, adding clients, and updating stages. |
| **Nav Bar** | The sticky top navigation bar containing the logo, 8 screen buttons, notification bell, and user chip. |
| **Notification Bell** | A button in the nav bar that shows a red dot when unread notifications exist. |
| **Screen** | One of the 8 primary views in the portal (Dashboard, Transactions, Documents, Clients, Messages, Calendar, Partner Referrals, Reports). |
| **Session Context** | The authenticated agent's identity data (name, initials, role, brokerage, active transactions, notification count). |
| **SPA** | Single-Page Application — the portal architecture where only one screen is visible at a time, without full page reloads. |
| **Spec-Kit** | This repository — the complete specification package for the Agent Portal. |
| **SDD** | Spec-Driven Development — the methodology where specifications are the source of truth and code serves them. |
| **User Chip** | The avatar + name display in the nav bar's right section showing the authenticated agent. |

---

## Design System Terms

| Term | Token Name | Value | Usage |
|------|-----------|-------|-------|
| Primary Navy | `primary-navy` | `#1a3a52` | Primary actions, headings, active nav, card headers |
| Primary Gold | `primary-gold` | `#fdb913` | Accent highlights, logo text, featured badges, gold CTA |
| Accent Blue | `accent-blue` | `#2d5a7b` | Hover states on primary buttons, transaction ID links |
| Success Green | `success-green` | `#10b981` | Completed status, positive indicators, progress fills |
| Warning Orange | `warning-orange` | `#f59e0b` | Pending/delayed badges, in-progress indicators |
| Error Red | `error-red` | `#ef4444` | Errors, overdue items, notification dot |
| Font Display | `font-display` | Archivo | Page titles, card titles, stat values, modal titles |
| Font Body | `font-body` | Manrope | Body text, labels, buttons, inputs, descriptions |

---

**Version**: 1.0
**Last Updated**: April 11, 2026
