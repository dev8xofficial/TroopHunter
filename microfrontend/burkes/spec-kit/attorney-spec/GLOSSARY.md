# Glossary — Attorney Portal Spec-Kit

All spec authors and reviewers must use these terms consistently. If a term is missing, submit a PR to add it.

---

## Business Terms

| Term | Definition |
|------|-----------|
| **Active Transaction** | A transaction that is not in the "Completed" stage. Appears on the Dashboard and Transactions screens. |
| **Asset Split** | A division of property value between parties, typically in divorce cases. The attorney reviews and approves the split percentages. |
| **Attorney** | A licensed closing attorney (role: AT) who verifies transaction amounts, reviews documents, and ensures closing compliance. Reference attorney: Sarah Mitchell. |
| **Cash to Close** | The total amount the buyer must bring to closing, including down payment and closing costs minus credits. |
| **Client** | A buyer or seller (role: CL) involved in a real estate transaction assigned to the attorney. |
| **Closing Costs** | Fees and expenses (title insurance, recording fees, attorney fees) paid at closing beyond the property price. |
| **Closing Date** | The scheduled date when a transaction is finalised and ownership transfers. |
| **Closing Disclosure** | A legal document detailing all financial terms of a mortgage transaction, provided to the buyer before closing. |
| **Contract Amount** | The agreed purchase or sale price for a property, in USD. |
| **Discrepancy** | A flagged inconsistency between reported amounts (sale price, loan, closing costs) and supporting documents. |
| **Down Payment** | The difference between the sale price and the loan amount, paid by the buyer. |
| **Flag** | An action by the attorney to mark a transaction as having a discrepancy, which pauses the closing process and notifies all parties. |
| **Loan Amount** | The principal amount borrowed from the mortgage lender for the property purchase. |
| **Purchase Agreement** | A legal document outlining the terms of a property purchase, also called P&S Agreement. |
| **Sale Price** | The agreed-upon price for a property in a transaction. |
| **Title Commitment** | A document from the title company confirming the property has clear title with no liens or encumbrances. |
| **Transaction** | A real estate deal (purchase, sale, or divorce asset split) tracked through the portal. |
| **Transaction ID** | A unique identifier in the format `TRX-NNNNN` (e.g., TRX-10247). |
| **Verification** | The attorney's formal review and confirmation that all dollar amounts, documents, and terms in a closing are accurate and compliant. |

---

## Technical Terms

| Term | Definition |
|------|-----------|
| **Activity Log** | An append-only, immutable audit trail of all meaningful state changes across all screens. |
| **Activity Event** | A single entry in the activity log, containing: event_id, event_type, timestamp, actor_role, icon, label, description. |
| **Badge** | A coloured status indicator (success/warning/error/info/neutral) used throughout the portal to communicate state. |
| **Design Token** | A named value (colour, shadow, spacing) from the design system. Specs reference tokens by name, never by raw value. |
| **Feature ID** | A zero-padded identifier for a spec (e.g., `000-foundation`, `005-verification`). |
| **Foundation** | The base layer (spec 000) that all other specs inherit — navigation, tokens, session, activity log. |
| **FR** | Functional Requirement — a numbered requirement in a spec (format: `FR-NN-NN`). |
| **Modal** | A full-screen overlay containing a form or detail view. The portal uses modals for verification confirmation, flagging, client details, and report generation. |
| **Nav Bar** | The sticky top navigation bar containing the logo, 5 screen buttons, notification bell, and user chip. |
| **Notification Bell** | A button in the nav bar that shows a red dot when unread notifications exist. |
| **Progress Steps** | A visual indicator showing the transaction's position in the verification pipeline (Docs Received → Agent Reviewed → Attorney Review → Title Company → Closing). |
| **Screen** | One of the 5 primary views in the portal (Dashboard, Transactions, Documents, Clients, Verification). |
| **Session Context** | The authenticated attorney's identity data (name, initials, role, firm, assigned transactions, notification count). |
| **SPA** | Single-Page Application — the portal architecture where only one screen is visible at a time, without full page reloads. |
| **Spec-Kit** | This repository — the complete specification package for the Attorney Portal. |
| **SDD** | Spec-Driven Development — the methodology where specifications are the source of truth and code serves them. |
| **User Chip** | The avatar + name display in the nav bar's right section showing the authenticated attorney. |
| **Verification Panel** | A bordered card component displaying transaction amounts (sale price, loan, down payment, closing costs, cash to close) for attorney review and confirmation. |

---

## Design System Terms

| Term | Token Name | Value | Usage |
|------|-----------|-------|-------|
| Primary Navy | `primary-navy` | `#1a3a52` | Primary actions, headings, active nav, card headers |
| Primary Gold | `primary-gold` | `#fdb913` | Accent highlights, logo text, featured badges, gold CTA |
| Accent Blue | `accent-blue` | `#2d5a7b` | Hover states on primary buttons, transaction ID links |
| Success Green | `success-green` | `#10b981` | Verified status, positive indicators, progress fills |
| Warning Orange | `warning-orange` | `#f59e0b` | Pending/needs verification badges, in-progress indicators |
| Error Red | `error-red` | `#ef4444` | Errors, overdue items, notification dot, urgent badges |
| Font Display | `font-display` | Archivo | Page titles, card titles, stat values, modal titles |
| Font Body | `font-body` | Manrope | Body text, labels, buttons, inputs, descriptions |

---

**Version**: 1.0
**Last Updated**: April 12, 2026
