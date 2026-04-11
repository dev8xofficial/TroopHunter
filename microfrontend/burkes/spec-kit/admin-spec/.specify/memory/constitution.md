# Project Constitution — The Burkes Group Admin Portal

**Version**: 1.0
**Last Updated**: 2026-04-11
**Scope**: All feature specifications under `.specify/specs/`

---

## 1. Product Identity

**Product Name**: The Burkes Group — Admin Portal
**Domain**: Residential real estate platform administration
**Primary User**: Administrator / Transaction Coordinator (TC) overseeing users, service partners, transactions, documents, and business analytics.
**Operator**: The Burkes Group real estate brokerage.

---

## 2. Core Principles

These principles govern every feature specification in this project.

### P-01 — Admin-First Oversight
Every screen must surface actionable items within 30 seconds of loading. Pending approvals, urgent documents, and flagged users must always be visible above the fold.

### P-02 — Centralized Authority
The Admin Portal is the single point of control for all platform entities. No user account, partner listing, transaction record, or document status can be created or modified without either admin action or admin-approved workflow.

### P-03 — Role-Gated Operations
All destructive actions (suspend user, reject partner, reject document) and approval actions (approve user, activate partner) must be explicit admin gestures — never automatic. Buttons are present only for admins.

### P-04 — Audit Completeness
Every admin action is logged with: actor identity, action type, target entity, timestamp, and outcome. Audit logs are append-only and immutable.

### P-05 — Progressive Action
Complex admin workflows — adding a user, registering a service partner, creating a transaction — use stepped modal forms with section grouping. Required fields are clearly marked.

### P-06 — Technology-Agnostic Specification
Specifications describe *what* and *why*; never *how*. No framework names, API names, database technologies, or code patterns appear in specs.

### P-07 — Platform Integrity
Admin actions that affect end-user experience (account approval, document rejection, transaction changes) must trigger notifications to the affected parties.

---

## 3. Actors & Permission Matrix

| Actor                  | Abbrev | Users   | Partners | Transactions | Documents | Analytics |
|------------------------|--------|---------|----------|--------------|-----------|-----------|
| Administrator / TC     | TC     | Full    | Full     | Full         | Full      | Full      |
| Real Estate Agent      | AG     | Own     | Read     | Own          | Own       | Own data  |
| Client (Buyer/Seller)  | CL     | Own     | Read     | Own only     | Own       | None      |
| Mortgage Lender        | LN     | None    | None     | Linked       | Linked    | None      |
| Closing Attorney       | AT     | None    | None     | Linked       | Linked    | None      |
| CPA / Tax Advisor      | CP     | None    | None     | Linked       | Read      | None      |

---

## 4. User Roles Managed by Admin

| Role                 | Badge Label        | Portal Access          | Admin Can              |
|----------------------|--------------------|------------------------|------------------------|
| Client               | 🏠 Client          | Client Portal          | Create, approve, suspend |
| Real Estate Agent    | 🏡 Agent           | Agent Portal           | Create, approve, suspend |
| Attorney             | ⚖️ Attorney        | Agent Portal (linked)  | Create, approve, suspend |
| CPA                  | 💼 CPA             | Agent Portal (linked)  | Create, approve, suspend |
| Mortgage Lender      | 🏦 Lender          | Agent Portal (linked)  | Create, approve, suspend |
| Administrator        | ⚙️ Administrator   | Admin Portal           | Create only (TC)       |

---

## 5. Transaction Lifecycle — 12 Canonical Stages

| #  | Stage Name                                | Admin Visibility |
|----|-------------------------------------------|-----------------|
| 1  | Initial Consultation                      | Read + Edit      |
| 2  | Property Search / Listing                 | Read + Edit      |
| 3  | Offer / Negotiation                       | Read + Edit      |
| 4  | Under Contract                            | Read + Edit      |
| 5  | Mortgage Application / Pre-Approval       | Read + Edit      |
| 6  | Insurance Information / Documentation     | Read + Edit      |
| 7  | Attorney / Title Company Review           | Read + Edit      |
| 8  | Inspection / Appraisal                    | Read + Edit      |
| 9  | Closing Preparation                       | Read + Edit      |
| 10 | Mortgage Underwriting / Final Approval    | Read + Edit      |
| 11 | Final Walkthrough / Document Signing      | Read + Edit      |
| 12 | Completed                                 | Read + Archive   |

---

## 6. Transaction Status Labels

| Label        | Description                                         |
|--------------|-----------------------------------------------------|
| On Track     | Proceeding normally toward closing date             |
| Closing Soon | Within 14 days of closing date                      |
| Delayed      | Behind schedule but still active                    |
| At Risk      | Critical blocker identified                         |
| Pending      | Awaiting initial action                             |
| Completed    | Transaction closed                                  |

---

## 7. Reference Data — Dashboard KPIs (Source: admin.html)

| KPI                     | Value  | Breakdown                                           |
|-------------------------|--------|-----------------------------------------------------|
| Total Users             | 1,247  | Clients: 856 · Attorneys: 142 · CPAs: 89            |
| Active Transactions     | 324    | 89 Closing Soon · 12 Delayed                        |
| Service Partners        | 156    | Plumbing: 42 · Roofing: 38 · Electrical: 35         |
| Documents Pending       | 47     | 8 Urgent · 39 Standard                              |

**Today's Stats**

| Metric                  | Value |
|-------------------------|-------|
| New Users               | 12    |
| Documents Processed     | 87    |
| Transactions Closed     | 5     |

---

## 8. Reference Data — Users (Source: admin.html)

| Name            | ID             | Email                                   | Role     | Status           | Joined         |
|-----------------|----------------|-----------------------------------------|----------|------------------|----------------|
| John Smith      | USR-CLT-001    | john.smith@gmail.com                    | Client   | Active           | Jan 15, 2026   |
| Sarah Anderson  | USR-AGT-001    | sarah.anderson@burkesgroup.com          | Agent    | Active           | Oct 28, 2023   |
| Sarah Mitchell  | USR-ATT-001    | sarah.mitchell@mitchelllawgroup.com     | Attorney | Active           | Jan 15, 2024   |
| James Carter    | USR-LND-001    | james.carter@firstnationalbank.com      | Lender   | Active           | Sep 12, 2023   |
| David Thompson  | USR-CPA-001    | david.thompson@thompsonfinancial.com    | CPA      | Active           | Dec 3, 2023    |
| Lisa Anderson   | USR-CLT-005    | lisa.anderson.client@gmail.com          | Client   | Pending Approval | Feb 10, 2026   |

**User Statistics**

| Role                | Count |
|---------------------|-------|
| Total Users         | 1,247 |
| Clients             | 856   |
| Attorneys           | 142   |
| CPAs                | 89    |
| Real Estate Agents  | 67    |
| Mortgage Lenders    | 22    |

---

## 9. Reference Data — Service Partners (Source: admin.html)

| Company Name             | Category     | Contact            | Phone          | Service Areas             | Rating | Status           |
|--------------------------|--------------|--------------------|----------------|---------------------------|--------|------------------|
| ABC Plumbing Co.         | Plumbing     | John Smith         | (555) 123-4567 | 77380, 77381, 77382       | New    | Pending Approval |
| Premium Roofing Solutions| Roofing      | Sarah Brown        | (555) 234-5678 | 77380–77384               | 4.9    | Active           |
| Lightning Fast Electric  | Electrical   | David Lee          | (555) 345-6789 | 77380, 77381              | 4.8    | Active           |
| Credit Solutions Plus    | Credit Repair| Lisa Anderson      | (555) 456-7890 | All (Virtual)             | 5.0    | Active           |
| Elite Plumbing Services  | Plumbing     | Robert Johnson     | (555) 567-8901 | 77380–77383               | 4.7    | Active           |
| Budget Roofing Inc.      | Roofing      | James Wilson       | (555) 678-9012 | 77380, 77381              | 3.2    | Suspended        |

**Partner Statistics by Category**

| Category      | Count |
|---------------|-------|
| Total         | 156   |
| Plumbing      | 42    |
| Roofing       | 38    |
| Electrical    | 35    |
| Credit Repair | 24    |
| Other         | 17    |

---

## 10. Reference Data — Transactions (Source: admin.html)

| ID        | Client                  | Property                                    | Type              | Amount    | Stage                | Closing      | Status       |
|-----------|-------------------------|---------------------------------------------|-------------------|-----------|----------------------|--------------|--------------|
| TRX-10247 | John Smith              | 123 Main Street, The Woodlands, TX 77380    | Purchase          | $485,000  | Closing Preparation  | Feb 15, 2026 | Closing Soon |
| TRX-10198 | Sarah Williams          | 789 Pine Road, The Woodlands, TX 77381      | Sale              | $389,500  | Under Contract       | Mar 1, 2026  | On Track     |
| TRX-10156 | Michael Brown           | 321 Elm Street, Spring, TX 77382            | Purchase          | $512,000  | Inspection/Appraisal | Mar 15, 2026 | Delayed      |
| TRX-10134 | Robert Johnson / Emily Johnson | 456 Oak Avenue, The Woodlands, TX 77380 | Divorce–Asset Split | —      | Offer/Negotiation    | Mar 20, 2026 | On Track     |
| TRX-10089 | Lisa Anderson           | 654 Maple Drive, Tomball, TX 77375          | Sale              | $467,500  | Completed            | Feb 15, 2026 | Completed    |

---

## 11. Reference Data — Documents (Source: admin.html)

| Document Name                          | Category                  | Transaction | Uploaded By             | Date         | Status       |
|----------------------------------------|---------------------------|-------------|-------------------------|--------------|--------------|
| Purchase & Sales Agreement – Smith     | Purchase & Sales Agreement| TRX-10247   | Agent Sarah Anderson    | Feb 1, 2026  | Needs Review |
| Mortgage Application – Williams        | Mortgage Documents        | TRX-10198   | Lender James Carter     | Feb 5, 2026  | Under Review |
| Home Inspection Report – Brown         | Inspection Report         | TRX-10156   | Attorney Sarah Mitchell | Feb 8, 2026  | Approved     |
| Closing Disclosure – Brown             | Closing Disclosure        | TRX-10134   | CPA David Thompson      | Feb 10, 2026 | Needs Review |

---

## 12. Reference Data — Analytics KPIs (Source: admin.html)

**Key Performance Indicators (Last 90 Days)**

| KPI                    | Value   | Change vs Prior Period   |
|------------------------|---------|--------------------------|
| Total Revenue          | $3.2M   | ↑ 23.5%                  |
| Closed Transactions    | 147     | ↑ 18.2%                  |
| Avg Transaction Value  | $412K   | ↑ 5.8%                   |
| New Users (90 days)    | 284     | ↑ 31.4%                  |
| Avg Close Time         | 42 days | ↓ 12.5%                  |
| Partner Referrals      | 523     | ↑ 45.3%                  |

**Revenue by Transaction Type**

| Type        | Transactions | Revenue | Share  |
|-------------|-------------|---------|--------|
| Purchase    | 68          | $1.8M   | 56.2%  |
| Sale        | 53          | $1.1M   | 34.4%  |
| Refinance   | 26          | $300K   | 9.4%   |

**User Growth (90 Days)**

| Role           | New Users | Growth |
|----------------|-----------|--------|
| Clients        | 124       | ↑ 35%  |
| Attorneys      | 47        | ↑ 28%  |
| CPAs           | 31        | ↑ 42%  |
| Agents         | 52        | ↑ 18%  |
| Lenders        | 19        | ↑ 52%  |
| Partners       | 11        | ↑ 22%  |

**Top Performing Partners**

| Partner                   | Rating | Referrals Completed |
|---------------------------|--------|---------------------|
| Premium Roofing Solutions | 4.9    | 89                  |
| Elite Plumbing Services   | 4.8    | 76                  |
| Credit Solutions Plus     | 5.0    | 64                  |

---

## 13. Reference Data — Pending Approvals (Source: admin.html)

| Category              | Count |
|-----------------------|-------|
| Urgent Documents      | 8     |
| Partner Applications  | 15    |
| User Registrations    | 24    |

---

## 14. Reference Data — Recent Activity (Source: admin.html)

| Event                                                              | Status            | Time         |
|--------------------------------------------------------------------|-------------------|--------------|
| New User Registration: Lisa Anderson (Client Portal)              | Action Required   | 5 min ago    |
| Document Uploaded: Purchase Agreement – 123 Main Street (TRX-10247)| Pending Review   | 22 min ago   |
| New Service Partner Application: ABC Plumbing Co.                 | Pending Approval  | 1h ago       |
| Transaction Completed: 654 Maple Drive – TRX-10089                | Completed         | 3h ago       |

---

## 15. Design & UX Constraints

- **Navigation**: Sticky top nav, 6 active items (Dashboard, Users, Partners, Transactions, Documents, Analytics)
- **Colour System**: Primary Navy `#1a3a52`, Primary Gold `#fdb913`, Accent Blue `#2d5a7b`, Success Green `#10b981`, Warning Orange `#f59e0b`, Error Red `#ef4444`, Neutrals `#fafafa`–`#262626`
- **Typography**: Archivo (headings, labels, stat values), Manrope (body, UI controls, buttons)
- **Breakpoints**: Full layout ≥ 1200 px; two-column collapses ≥ 768 px; single-column mobile below 768 px
- **Shadow tokens**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Border radius**: Cards `16px`, buttons `10px`, badges `6px`, inputs `8px`

---

## 16. Global Data Vocabulary

- **user_id** — format `USR-[ROLE]-[NNN]`; unique identifier per user
- **partner_id** — unique identifier per service partner
- **transaction_id** — format `TRX-NNNNN`
- **document_status** — one of: `needs-review`, `under-review`, `approved`, `rejected`
- **user_status** — one of: `active`, `pending-approval`, `suspended`, `inactive`
- **partner_status** — one of: `active`, `pending-approval`, `suspended`, `inactive`
- **partner_category** — one of: `plumbing`, `roofing`, `electrical`, `credit-repair`, `hvac`, `other`
- **transaction_type** — one of: `purchase`, `sale`, `refinance`, `divorce-asset-split`
- **transaction_status** — one of: `on-track`, `closing-soon`, `delayed`, `at-risk`, `pending`, `completed`
