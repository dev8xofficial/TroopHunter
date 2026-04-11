# Project Constitution — The Burkes Group Service Partner Portal

**Version**: 1.0
**Last Updated**: 2026-04-12
**Scope**: All feature specifications under `.specify/specs/`

---

## 1. Product Identity

**Product Name**: The Burkes Group — Service Partner Portal
**Domain**: Home service provider referral management
**Primary User**: Service Partner (SP) — a licensed, insured home service provider who receives client referrals from real estate agents, manages jobs, sends quotes, tracks earnings, and maintains their company profile.
**Operator**: The Burkes Group real estate brokerage platform.

---

## 2. Core Principles

These principles govern every feature specification in this project. Any requirement that conflicts with them must be flagged and resolved before planning.

### P-01 — Partner-First Clarity
Every screen must answer the question: *"What do I need to action right now?"* within 60 seconds of the partner loading it. Ambiguous status, hidden actions, or buried CTAs are specification defects.

### P-02 — Single Source of Truth
The portal is the authoritative record for referral status, job progress, quotes, reviews, and earnings. No feature may require the partner to cross-reference external email, spreadsheets, or phone calls to determine job status.

### P-03 — Role-Scoped Access
The Service Partner Portal is scoped to the partner role (SP). Agent-visible data is managed through the Agent Portal. Admin operations are handled through the Admin Portal.

### P-04 — Progressive Disclosure
Complex workflows (quote creation, profile updates, service area management) use structured forms with clear sections. The partner sees only what is required at each step; advanced options are revealed progressively.

### P-05 — Graceful Incompleteness
The portal must never block navigation because a form is incomplete. Incomplete state is communicated via badges, banners, and progress indicators — never via hard locks.

### P-06 — Technology-Agnostic Specification
Specifications describe *what* the system does and *why*, never *how* it is implemented. No framework names, API names, database technologies, or code patterns belong in a spec.

### P-07 — Audit-Visible Activity
Every meaningful state change (referral response, quote sent, job completed, review responded, area added) must produce a visible activity log entry.

---

## 3. Actors & Permission Matrix

| Actor                   | Abbrev | Referrals    | Jobs         | Quotes       | Reviews      | Earnings     | Profile      |
|-------------------------|--------|--------------|--------------|--------------|--------------|--------------|--------------|
| Service Partner         | SP     | Own only     | Own only     | Create/Send  | Own only     | Own only     | Own only     |
| Admin / Platform Admin  | AD     | All          | All          | All          | All          | All          | All          |
| Real Estate Agent       | AG     | Submit only  | Read-linked  | Read-linked  | None         | None         | None         |
| Client (Homeowner)      | CL     | Own request  | Read-own     | Receive/Accept | Submit review | None       | None         |

---

## 4. Referral Lifecycle — 6 Stages

All screen specifications must treat the following as the canonical stage sequence. Stage numbers are fixed.

| # | Stage Name   | Owner Role | Status Variants                    |
|---|-------------|------------|------------------------------------|
| 1 | New Lead     | SP         | new / pending                      |
| 2 | Contacted    | SP         | contacted / in-progress            |
| 3 | Quoted       | SP         | quoted / pending-acceptance        |
| 4 | Scheduled    | SP + CL    | scheduled / confirmed              |
| 5 | Completed    | SP         | completed / awaiting-payment       |
| 6 | Paid         | AD         | paid / processed                   |

---

## 5. Referral Status Labels

| Label             | Description                                              |
|-------------------|----------------------------------------------------------|
| New Lead          | Referral received, awaiting partner response              |
| Contacted         | Partner has contacted the homeowner                       |
| Quoted            | Quote has been sent to the homeowner                      |
| Scheduled         | Job date has been confirmed                               |
| Completed         | Job has been finished                                     |
| Declined          | Partner or homeowner declined the referral/quote          |
| Processing        | Payment is being processed                                |
| Paid              | Payment has been received by the partner                  |

---

## 6. Reference Data — Referrals (Source from servicePartner.html)

| Referral ID | Client Name      | Property Address                          | Service Type          | Budget       | Timeline       | Status     |
|-------------|------------------|-------------------------------------------|-----------------------|-------------|----------------|------------|
| TRX-10247   | John Smith       | 123 Main Street, The Woodlands, TX 77380  | Plumbing Inspection   | $200-$400   | Within 1 week  | New Lead   |
| TRX-10198   | Sarah Williams   | 789 Pine Road, The Woodlands, TX 77381    | Water Heater Repair   | Open        | ASAP           | New Lead   |
| —           | Michael Brown    | 321 Elm St, Spring, 77382                 | Drain Cleaning        | $150-$300   | This week      | Contacted  |
| —           | Emily Davis      | 321 Elm St, Spring, TX 77382              | Drain Cleaning        | $150-$300   | Feb 20, 2026   | Scheduled  |

---

## 7. Reference Data — Active Jobs (Source from servicePartner.html)

| Referral ID | Client Name      | Property Address                          | Service Type          | Job Value | Scheduled Date        | Status     |
|-------------|------------------|-------------------------------------------|-----------------------|-----------|----------------------|------------|
| TRX-10156   | Michael Brown    | 321 Elm Street, Spring, TX 77382          | Drain Cleaning        | $195      | Friday, Feb 20, 2026 | Scheduled  |
| TRX-10198   | Sarah Williams   | 789 Pine Road, The Woodlands, TX 77381    | Water Heater Repair   | $450      | Completed Feb 5, 2026| Completed  |
| TRX-10247   | John Smith       | 123 Main Street, The Woodlands, TX 77380  | Plumbing Inspection   | $3,200    | Completed Jan 28     | Completed  |

---

## 8. Reference Data — Quotes (Source from servicePartner.html)

| Client Name    | Service              | Amount  | Status    | Sent       |
|----------------|----------------------|---------|-----------|------------|
| Emily Davis    | Pipe Installation    | $1,100  | Accepted  | 2 days ago |
| Michael Brown  | Drain Cleaning       | $195    | Pending   | 1 day ago  |
| James Taylor   | Faucet Replacement   | $350    | Declined  | 3 days ago |

### Quote Statistics

| Metric               | Value     |
|----------------------|-----------|
| Acceptance Rate      | 94%       |
| Avg Response Time    | 4.2 hours |
| Total Quotes Sent    | 47        |

---

## 9. Reference Data — Reviews (Source from servicePartner.html)

| Client Name     | Rating | Date              | Review Excerpt                                              |
|-----------------|--------|-------------------|-------------------------------------------------------------|
| Michael Brown   | ⭐⭐⭐⭐⭐ | February 10, 2026 | "Excellent service! Fast response and fair pricing."        |
| Lisa Anderson   | ⭐⭐⭐⭐⭐ | February 8, 2026  | "Professional and knowledgeable! Highly recommend!"         |
| Robert Wilson   | ⭐⭐⭐⭐⭐ | February 5, 2026  | "Outstanding work on our bathroom renovation plumbing!"     |
| Lisa Anderson   | ⭐⭐⭐⭐☆ | February 2, 2026  | "Very good service overall. Fixed my drain issue."          |

### Review Stats

| Metric          | Value |
|-----------------|-------|
| Overall Rating  | 4.8   |
| Total Reviews   | 14    |
| Response Rate   | 100%  |

---

## 10. Reference Data — Service Areas (Source from servicePartner.html)

### Active Areas

| Zip Code | City           | Referrals/Month | Earned   | Status |
|----------|----------------|-----------------|----------|--------|
| 77380    | The Woodlands  | 8               | $12,400  | Active |
| 77381    | The Woodlands  | 5               | $7,800   | Active |
| 77382    | Spring         | 3               | $4,200   | Active |

### Recommended Areas

| Zip Code | City    | Demand       | Avg/Referral |
|----------|---------|-------------|--------------|
| 77384    | Conroe  | High demand | $850         |
| 77385    | Conroe  | Growing     | $720         |
| 77386    | Spring  | Medium      | $680         |

---

## 11. Reference Data — Earnings (Source from servicePartner.html)

### Dashboard KPIs

| KPI                 | Value   | Description              |
|---------------------|---------|--------------------------|
| New Referrals       | 1       | Awaiting response        |
| Active Jobs         | 1       | In progress              |
| Average Rating      | 4.8     | Based on 14 reviews      |
| This Month Revenue  | $9,840  | From platform            |

### Earnings KPIs

| KPI                 | Value   | Description              |
|---------------------|---------|--------------------------|
| Year to Date        | $9,840  | 14 jobs completed        |
| Average Job Value   | $703    | +12% from last month     |
| Pending Payment     | $5,200  | 2 jobs awaiting payment  |

### Payment History

| Date          | Client                    | Service              | Job Value | Platform Fee | Earnings | Status           |
|---------------|---------------------------|----------------------|-----------|-------------|----------|------------------|
| Feb 5, 2026   | Sarah Williams · TRX-10198| Water Heater Repair  | $580      | $58         | $522     | Paid             |
| Jan 28, 2026  | John Smith · TRX-10247    | Plumbing Inspection  | $250      | $25         | $225     | Paid             |
| Feb 20, 2026  | Michael Brown · TRX-10156 | Drain Cleaning       | $195      | $20         | $175     | Awaiting Payment |

---

## 12. Reference Data — Partner Profile (Source from servicePartner.html)

| Field               | Value                                                 |
|---------------------|-------------------------------------------------------|
| Company Name        | Woodlands Plumbing Pro                                |
| Contact Name        | Marcus Rivera                                         |
| Phone Number        | (281) 555-0606                                        |
| Email Address       | marcus@woodlandsplumbing.com                          |
| Business Address    | 512 Commerce Park Drive, The Woodlands, TX 77380      |
| License Number      | TX-PLB-48830                                          |
| Years in Business   | 15                                                    |
| Insurance Policy    | General Liability + Workers Comp                      |
| Coverage Amount     | $2,000,000                                            |
| Policy Number       | WC-789456                                             |
| Membership Type     | Premium Partner                                       |
| Member Since        | January 2024                                          |
| Account Status      | Active & Verified                                     |

### Service Categories

| Category               | Status  |
|------------------------|---------|
| Emergency Repairs      | ✓ Active|
| Installations          | ✓ Active|
| Inspections            | ✓ Active|
| Maintenance            | ✓ Active|
| Water Treatment Systems| Inactive|

### Notification Preferences

| Preference                           | Status  |
|--------------------------------------|---------|
| Email notifications for new referrals| ✓ On    |
| SMS alerts for urgent requests       | ✓ On    |
| Weekly performance reports           | ✓ On    |

---

## 13. Global Data Vocabulary

All feature specs must use these canonical field names:

- **referral_id** — format `TRX-NNNNN`; unique identifier for a referral
- **property_address** — full street address of the property
- **client_name** — full name of the homeowner
- **service_type** — type of service requested (e.g., Plumbing Inspection, Water Heater Repair)
- **referral_status** — one of: `new-lead`, `contacted`, `quoted`, `scheduled`, `completed`, `declined`, `processing`, `paid`
- **job_value** — agreed price for the job in USD
- **platform_fee** — percentage or amount deducted by the platform
- **partner_earnings** — job_value minus platform_fee
- **quote_status** — one of: `pending`, `accepted`, `declined`
- **review_rating** — integer 1–5 star rating
- **service_area_status** — one of: `active`, `paused`, `pending`
- **service_category** — one of: `emergency-repairs`, `installations`, `inspections`, `maintenance`, `water-treatment-systems`
- **partner_membership** — one of: `standard`, `premium`, `enterprise`

---

## 14. Design & UX Constraints

- **Navigation**: Sticky top nav, 8 items maximum, active item highlighted, "Service Partner" gold badge
- **Colour System**: Primary Navy `#1a3a52`, Primary Gold `#fdb913`, Accent Blue `#2d5a7b`, Success Green `#10b981`, Warning Orange `#f59e0b`, Error Red `#ef4444`, Neutrals `#fafafa`–`#262626`
- **Typography**: Archivo (headings, labels, stat values), Manrope (body, UI controls, buttons)
- **Breakpoints**: Full layout ≥ 1200 px; two-column collapses to one ≥ 768 px; single-column mobile below 768 px
- **Shadow tokens**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Border radius**: Cards `16px`, buttons `10px`, badges `6px`, inputs `8px`
