# Project Constitution — The Burkes Group Agent Portal

**Version**: 1.0
**Last Updated**: 2026-04-11
**Scope**: All feature specifications under `.specify/specs/`

---

## 1. Product Identity

**Product Name**: The Burkes Group — Agent Portal
**Domain**: Residential real estate transaction management
**Primary User**: Real Estate Agent (AG) managing client transactions, documents, communications, appointments, partner referrals, and business analytics.
**Operator**: The Burkes Group real estate brokerage.

---

## 2. Core Principles

These principles govern every feature specification in this project. Any requirement that conflicts with them must be flagged and resolved before planning.

### P-01 — Agent-First Clarity
Every screen must answer the question: *"What do I need to action right now?"* within 60 seconds of the agent loading it. Ambiguous status, hidden actions, or buried CTAs are specification defects.

### P-02 — Single Source of Truth
The portal is the authoritative record for transaction status, documents, client profiles, and communications. No feature may require the agent to cross-reference external email, spreadsheets, or phone calls to determine transaction status.

### P-03 — Role-Scoped Access
The Agent Portal is scoped to the agent role (AG). Client-visible data is managed through the corresponding Client Portal. Stage updates submitted by the agent are routed through admin approval before being applied.

### P-04 — Progressive Disclosure
Complex workflows (new transaction creation, client onboarding, stage updates) use stepped modal forms. The agent sees only what is required at each step; advanced options are revealed progressively.

### P-05 — Graceful Incompleteness
The portal must never block navigation because a form is incomplete. Incomplete state is communicated via badges, banners, and progress indicators — never via hard locks.

### P-06 — Technology-Agnostic Specification
Specifications describe *what* the system does and *why*, never *how* it is implemented. No framework names, API names, database technologies, or code patterns belong in a spec.

### P-07 — Audit-Visible Activity
Every meaningful state change (document upload, stage update, client creation, referral sent, appointment scheduled) must produce a visible activity log entry.

---

## 3. Actors & Permission Matrix

| Actor                   | Abbrev | Transactions | Documents   | Clients | Stage Updates | Reports |
|-------------------------|--------|--------------|-------------|---------|---------------|---------|
| Real Estate Agent       | AG     | Own only     | Upload P&S  | Own     | Submit (pending admin approval) | Own data |
| Admin / TC              | TC     | All          | Any         | All     | Approve/Reject | All     |
| Client (Buyer/Seller)   | CL     | Own only     | Own uploads | Own     | Read-only     | None    |
| Mortgage Lender         | LN     | Linked only  | Mortgage    | None    | None          | None    |
| Closing Attorney        | AT     | Linked only  | Legal       | None    | None          | None    |
| CPA / Tax Advisor       | CP     | Linked only  | Read-only   | None    | None          | None    |

---

## 4. Transaction Lifecycle — 11 Stages

All screen specifications must treat the following as the canonical stage sequence. Stage numbers are fixed.

| #  | Stage Name                                | Owner Role | Status Variants                   |
|----|-------------------------------------------|------------|-----------------------------------|
| 1  | Initial Consultation                      | AG         | completed / pending               |
| 2  | Property Search / Listing                 | AG         | completed / pending               |
| 3  | Offer / Negotiation                       | AG         | completed / pending               |
| 4  | Under Contract                            | AG         | completed / pending               |
| 5  | Mortgage Application / Pre-Approval       | LN + CL    | in-progress / completed / pending |
| 6  | Insurance Information / Documentation     | CL         | in-progress / completed / pending |
| 7  | Attorney / Title Company Review           | AT         | in-progress / completed / pending |
| 8  | Inspection / Appraisal                    | AG         | scheduled / completed / pending   |
| 9  | Closing Preparation                       | AG + AT    | in-progress / completed / pending |
| 10 | Mortgage Underwriting / Final Approval    | LN         | in-progress / completed / pending |
| 11 | Final Walkthrough / Document Signing      | CL + AT    | scheduled / completed / pending   |
| 12 | Completed                                 | TC         | completed                         |

---

## 5. Transaction Status Labels

| Label        | Description                                         |
|--------------|-----------------------------------------------------|
| On Track     | Proceeding normally toward closing date             |
| Closing Soon | Within 14 days of closing date                      |
| Delayed      | Behind schedule but still active                    |
| At Risk      | Critical blocker identified                         |
| Pending      | Awaiting initial action                             |
| Completed    | Transaction closed                                  |

---

## 6. Reference Data — Active Transactions (Source from agent.html)

The following transactions represent the canonical seed data for the reference implementation:

| Transaction ID | Client Name         | Property Address                              | Type               | Amount    | Stage                        | Closing Date | Status       |
|----------------|---------------------|-----------------------------------------------|--------------------|-----------|------------------------------|--------------|--------------|
| TRX-10247      | John Smith          | 123 Main Street, The Woodlands, TX 77380      | Purchase           | $485,000  | Attorney / Title Review      | Feb 15, 2026 | Closing Soon |
| TRX-10198      | Sarah Williams      | 789 Pine Road, The Woodlands, TX 77381        | Sale               | $389,500  | Under Contract               | Mar 1, 2026  | On Track     |
| TRX-10156      | Michael Brown       | 789 Pine Road, The Woodlands, TX 77381        | Purchase           | $512,000  | Inspection / Appraisal       | Mar 8, 2026  | Delayed      |
| TRX-10134      | Johnson vs. Johnson | 456 Oak Avenue, The Woodlands, TX 77380       | Divorce–Asset Split | —        | Offer / Negotiation          | Mar 20, 2026 | On Track     |
| TRX-10089      | Lisa Anderson       | 654 Maple Drive, Tomball, TX 77375            | Sale               | $467,500  | Completed                    | Dec 20, 2025 | Completed    |

---

## 7. Reference Data — Clients (Source from agent.html)

| Client Name     | Email                        | Phone          | Property Address                         | Type     | Property Value |
|-----------------|------------------------------|----------------|------------------------------------------|----------|----------------|
| John Smith      | john.smith@gmail.com         | (555) 210-4738 | 123 Main Street, The Woodlands, TX 77380 | Purchase | $485,000       |
| Sarah Williams  | sarah.williams@gmail.com     | (555) 387-9021 | 789 Pine Road, The Woodlands, TX 77381   | Sale     | $389,500       |
| Michael Brown   | michael.brown@gmail.com      | (555) 502-6184 | 789 Pine Road, The Woodlands, TX 77381   | Purchase | $512,000       |
| Lisa Anderson   | (prospective)                | —              | 654 Maple Drive, Tomball, TX 77375       | Sale     | $467,500       |

---

## 8. Reference Data — Documents (Source from agent.html)

| Document Name                         | Category                  | Transaction           | Date         | Status       |
|---------------------------------------|---------------------------|-----------------------|--------------|--------------|
| Purchase_Agreement_Smith.pdf          | Purchase & Sales Agreement| 123 Main St (TRX-10247) | Feb 1, 2026 | Approved     |
| Mortgage_Application_Williams.pdf     | Mortgage Documents        | 789 Pine Rd (TRX-10198) | Feb 5, 2026 | Under Review |
| Inspection_Report_Brown.pdf           | Inspection Report         | 321 Elm St (TRX-10156)  | Feb 8, 2026 | Under Review |
| Closing_Disclosure_Brown.pdf          | Closing Documents         | 555 Oak Ave (TRX-10155) | Feb 10, 2026| Needs Review |
| Title_Insurance_Smith.pdf             | Title Documents           | 123 Main St (TRX-10247) | Feb 5, 2026 | Approved     |

---

## 9. Reference Data — Partner Directory (Source from agent.html)

| Partner Name                  | Category              | Rating | Reviews | Tags                                          |
|-------------------------------|-----------------------|--------|---------|-----------------------------------------------|
| Chicago Elite Plumbing        | Plumbing Services     | 4.9    | 127     | Emergency Service, Licensed & Insured, 24/7   |
| Premium Roofing Solutions     | Roofing & Repair      | 4.9    | 89      | Free Estimates, Warranty Included, 25 Years   |
| Lightning Fast Electric       | Electrical Services   | 4.8    | 156     | Licensed Electricians, Residential & Commercial, Same-Day |
| Credit Solutions Plus         | Credit Repair         | 5.0    | 203     | Fast Results, Money-Back Guarantee, Certified |
| HomePro Inspection Services   | Home Inspection       | 5.0    | 74      | Certified Inspectors, Same-Day Reports, Thermal |
| Elite Plumbing Services       | Plumbing              | 4.7    | 112     | Full Service, Emergency Calls, Insured & Bonded |

---

## 10. Reference Data — Messages (Source from agent.html)

| Sender                          | Subject                                   | Time          | Unread |
|---------------------------------|-------------------------------------------|---------------|--------|
| John Smith                      | Re: Inspection Results – TRX-10247        | 10 minutes ago| Yes    |
| Sarah Mitchell – Attorney       | Purchase Agreement Review – TRX-10247     | 2 hours ago   | Yes    |
| Sarah Williams                  | Offer Update – TRX-10198                  | 5 hours ago   | No     |
| James Carter – First National Bank | Pre-Approval Confirmed – TRX-10156    | Yesterday     | No     |
| Title Company                   | Title Search Complete – TRX-10134         | 2 days ago    | No     |

---

## 11. Reference Data — Calendar (Source from agent.html)

### Today's Appointments (February 2026)

| Time              | Title                          | Details                                                               |
|-------------------|--------------------------------|-----------------------------------------------------------------------|
| 10:00 AM–11:00 AM | Property Showing – 789 Pine Rd | Client: Michael Brown · Location: 321 Elm St, Spring, TX · TRX-10156 |
| 2:00 PM–3:00 PM   | Closing Meeting – 123 Main St  | Client: John Smith · Attorney: Sarah Mitchell – Mitchell Law Group    |
| 4:30 PM–5:30 PM   | Client Consultation – New Buyer| Prospective Client: Lisa Anderson · Phone Meeting                     |

### Upcoming This Week

| Date/Time              | Title                          | Details                                                                |
|------------------------|--------------------------------|------------------------------------------------------------------------|
| Thu, Feb 19 – 11:00 AM | Home Inspection – 123 Main St  | Client: John Smith · Inspector: HomePro Inspection Services · TRX-10247|
| Fri, Feb 20 – 3:00 PM  | Mortgage Application Meeting   | Client: Michael Brown · Lender: James Carter – First National Bank · TRX-10156 |
| Mon, Feb 23 – 10:00 AM | Final Walkthrough – 456 Oak Ave| Client: Sarah Williams · Property: 789 Pine Rd · TRX-10198             |

---

## 12. Dashboard KPI Reference (Source from agent.html)

| KPI                     | Value   | Description          |
|-------------------------|---------|----------------------|
| Active Transactions     | 8       | 2 under contract     |
| Pending Offers          | 3       | Awaiting response    |
| This Month Sales        | $1.2M   | 4 properties sold    |
| Commission Earned       | $36K    | This month           |

---

## 13. Reports KPI Reference (Source from agent.html)

| KPI                     | Value   | Description              |
|-------------------------|---------|--------------------------|
| Total Sales (YTD)       | $5.2M   | 18 properties closed     |
| Total Commission        | $156K   | +23% from last year      |
| Avg. Days to Close      | 42      | 5 days faster than Q4    |
| Client Satisfaction     | 4.9     | Based on 47 reviews      |

### Top Performing Areas

| Area                  | Sales Volume | Progress |
|-----------------------|--------------|----------|
| The Woodlands, TX     | $1.8M        | 90%      |
| Spring, TX            | $1.2M        | 70%      |
| Conroe / Tomball, TX  | $950K        | 55%      |

---

## 14. Global Data Vocabulary

All feature specs must use these canonical field names:

- **transaction_id** — format `TRX-NNNNN`; unique identifier for a purchase/sale transaction
- **property_address** — full street address of the property
- **client_name** — full name of the buyer or seller
- **transaction_type** — one of: `purchase`, `sale`, `refinance`, `divorce-asset-split`
- **transaction_stage** — one of the 12 canonical stage names from Section 4
- **transaction_status** — one of: `on-track`, `closing-soon`, `delayed`, `at-risk`, `pending`, `completed`
- **document_status** — one of: `approved`, `under-review`, `needs-review`, `needs-signature`
- **document_category** — one of: `purchase-sale-agreement`, `mortgage-documents`, `insurance`, `inspection-report`, `title-documents`, `closing-documents`, `legal-documents`, `other`
- **stage_update_status** — one of: `pending-approval`, `approved`, `rejected`
- **partner_category** — one of: `plumbing`, `roofing`, `electrical`, `credit-repair`, `home-inspection`, `moving-services`

---

## 15. Design & UX Constraints

- **Navigation**: Sticky top nav, 8 items maximum, active item highlighted
- **Colour System**: Primary Navy `#1a3a52`, Primary Gold `#fdb913`, Accent Blue `#2d5a7b`, Success Green `#10b981`, Warning Orange `#f59e0b`, Error Red `#ef4444`, Neutrals `#fafafa`–`#262626`
- **Typography**: Archivo (headings, labels, stat values), Manrope (body, UI controls, buttons)
- **Breakpoints**: Full layout ≥ 1200 px; two-column collapses to one ≥ 768 px; single-column mobile below 768 px
- **Shadow tokens**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Border radius**: Cards `16px`, buttons `10px`, badges `6px`, inputs `8px`
