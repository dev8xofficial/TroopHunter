# Glossary — Service Partner Portal Spec-Kit

All spec authors and reviewers must use these terms consistently. If a term is missing, submit a PR to add it.

---

## Business Terms

| Term | Definition |
|------|-----------|
| **Active Job** | A job that has been scheduled or is in progress. Appears on the Dashboard and Active Jobs screens. |
| **Admin** | A platform administrator (role: AD) who manages partner accounts, verifies credentials, and oversees operations. |
| **Agent** | A licensed real estate professional (role: AG) who submits referrals for homeowners needing service work. |
| **Budget** | The homeowner's stated price range for the requested service, provided at referral submission. |
| **Client** | A homeowner (role: CL) who receives service work from the partner. Also called "Homeowner." |
| **Completed Job** | A job that has been finished and is awaiting or has received payment. |
| **Earnings** | The partner's revenue from completed jobs, after platform fees are deducted. |
| **Job** | A scheduled or in-progress service engagement resulting from an accepted referral/quote. |
| **Job Value** | The agreed price for a job, derived from the accepted quote amount. |
| **KPI** | Key Performance Indicator — a measurable value displayed on the Dashboard and Earnings screens. |
| **Lead** | A new referral that has not yet been responded to. Also called "New Lead." |
| **License Number** | The partner's professional trade license identifier, submitted for admin verification. |
| **Partner** | A home service provider (role: SP) who uses this portal. The primary user. Also called "Service Partner." |
| **Platform Fee** | A percentage deducted from the job value by The Burkes Group platform (typically 10%). |
| **Premium Partner** | A membership tier indicating verified credentials and priority referral placement. |
| **Quote** | A formal price estimate sent by the partner to a homeowner, including labor, materials, and timeline. |
| **Referral** | A service request submitted by an agent on behalf of a homeowner, routed to partners in the relevant service area. |
| **Referral ID** | A unique identifier in the format `TRX-NNNNN` (e.g., TRX-10247). Shared with the Agent Portal. |
| **Response Time** | The average time between receiving a referral and first contacting the homeowner. |
| **Review** | A customer rating and comment left by a homeowner after job completion. |
| **Service Area** | A zip code where the partner is registered to receive referrals. |
| **Service Category** | The type of service the partner provides (e.g., Emergency Repairs, Installations, Inspections, Maintenance). |
| **Service Partner** | A licensed, insured home service professional (plumber, electrician, roofer, inspector) operating within The Burkes Group ecosystem. |

---

## Technical Terms

| Term | Definition |
|------|-----------|
| **Activity Log** | An append-only, immutable audit trail of all meaningful state changes across all screens. |
| **Activity Event** | A single entry in the activity log, containing: event_id, event_type, timestamp, actor_role, icon, label, description. |
| **Badge** | A coloured status indicator (new, contacted, quoted, scheduled, completed, declined, processing) used throughout the portal to communicate state. |
| **Design Token** | A named value (colour, shadow, spacing) from the design system. Specs reference tokens by name, never by raw value. |
| **Feature ID** | A zero-padded identifier for a spec (e.g., `000-foundation`, `001-dashboard`). |
| **Foundation** | The base layer (spec 000) that all other specs inherit — navigation, tokens, session, activity log. |
| **FR** | Functional Requirement — a numbered requirement in a spec (format: `FR-NN-NN`). |
| **Nav Bar** | The sticky top navigation bar containing the logo, partner badge, 8 screen buttons, notification bell, and user chip. |
| **Notification Bell** | A button in the nav bar that shows a red dot when unread notifications exist. |
| **Partner Badge** | A gold tag ("SERVICE PARTNER") displayed next to the logo in the nav bar identifying the portal type. |
| **Screen** | One of the 8 primary views in the portal (Dashboard, Referrals, Active Jobs, Quotes, Reviews, Service Areas, Earnings, Profile). |
| **Session Context** | The authenticated partner's identity data (company name, contact name, initials, role, service categories, notification count). |
| **SPA** | Single-Page Application — the portal architecture where only one screen is visible at a time, without full page reloads. |
| **Spec-Kit** | This repository — the complete specification package for the Service Partner Portal. |
| **SDD** | Spec-Driven Development — the methodology where specifications are the source of truth and code serves them. |
| **User Chip** | The avatar + name display in the nav bar's right section showing the authenticated partner. |

---

## Design System Terms

| Term | Token Name | Value | Usage |
|------|-----------|-------|-------|
| Primary Navy | `primary-navy` | `#1a3a52` | Primary actions, headings, active nav, card headers |
| Primary Gold | `primary-gold` | `#fdb913` | Accent highlights, logo text, partner badge, gold CTA |
| Accent Blue | `accent-blue` | `#2d5a7b` | Hover states on primary buttons, referral ID links |
| Success Green | `success-green` | `#10b981` | Completed status, positive indicators, paid badges |
| Warning Orange | `warning-orange` | `#f59e0b` | Pending/processing badges, in-progress indicators |
| Error Red | `error-red` | `#ef4444` | Errors, declined items, notification dot |
| Font Display | `font-display` | Archivo | Page titles, card titles, stat values |
| Font Body | `font-body` | Manrope | Body text, labels, buttons, inputs, descriptions |

---

**Version**: 1.0
**Last Updated**: April 12, 2026
