# Feature Specification: Service Partners Management

**Feature ID**: 003-partners
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Partners — service partner directory management

---

## Overview

The Service Partners Management screen is the administrator's interface for managing the platform's curated network of service providers — plumbers, roofers, electricians, credit repair specialists, and other home-service contractors. It provides category-based statistics, multi-dimensional filtering (category, zip code, status), a comprehensive partner table with ratings and service area coverage, and modals for adding new partners and viewing or editing existing partner records.

---

## Problem Statement

Agents refer clients to service partners throughout the transaction lifecycle. Without a managed partner directory, the platform cannot guarantee partner quality, verify licensing, or track service area coverage. The Partners screen gives administrators full control over which partners are visible to agents, ensuring clients only receive referrals to vetted, active providers.

---

## Goals

- Display all service partners in a filterable table with category, service areas, ratings, and status.
- Show aggregate partner counts broken down by service category.
- Allow admins to approve pending partner applications.
- Allow admins to suspend or activate partner listings.
- Allow admins to add new partners via a comprehensive modal form.
- Allow admins to view and edit existing partner records.

---

## Non-Goals

- Partner-facing portal (partner self-registration) is a separate product concern.
- Client-visible partner ratings and reviews are sourced externally and displayed read-only.
- Commission or payment tracking is out of scope for v1.

---

## Actors

| Actor              | Role in This Feature                                       |
| ------------------ | ---------------------------------------------------------- |
| Administrator (TC) | Adds, approves, suspends, and manages all service partners |

---

## User Scenarios

### Scenario 1 — Admin Approves a Pending Partner Application

**Actor**: Administrator
**Precondition**: ABC Plumbing Co. has applied and appears with "Pending Approval" status.
**Flow**:

1. Admin navigates to Partners.
2. Table renders; ABC Plumbing Co. shows "Pending Approval" and "Approve" action button.
3. Admin clicks "Approve" on ABC Plumbing Co.'s row.
4. Status changes to "Active"; audit log records the approval.

**Success**: Partner is approved; agents can now see ABC Plumbing Co. in the referral directory.

---

### Scenario 2 — Admin Adds a New Service Partner

**Actor**: Administrator
**Precondition**: A new electrician has submitted an application by email.
**Flow**:

1. Admin clicks "+ Add New Partner."
2. "Add New Service Partner" modal opens.
3. Admin fills Company Name, selects Category "⚡ Electrical," enters License Number.
4. Admin fills Contact Person, Phone, Email.
5. Admin fills Business Address.
6. Admin adds zip codes: types "77380" and clicks "+ Add Zip Code"; repeats for 77381, 77382.
7. Admin uploads Business License and Insurance Certificate files.
8. Admin sets Status to "Pending Approval."
9. Admin clicks "Add Service Partner."
10. Partner record is created; audit log updated.

**Success**: Partner record exists; admin can approve after verifying documentation.

---

### Scenario 3 — Admin Suspends a Low-Rated Partner

**Actor**: Administrator
**Precondition**: Budget Roofing Inc. has a 3.2 rating and multiple complaints.
**Flow**:

1. Admin locates Budget Roofing Inc. (currently "Suspended") in the table.
2. Admin clicks "View" to review the partner record.
3. Admin confirms the suspension is appropriate.
4. Audit log records the review.

**Success**: Partner remains suspended; agents cannot refer clients to Budget Roofing Inc.

---

## Functional Requirements

### FR-03-01 — Page Header and Action Button

- Title: "Service Partners Management" (28px/700 Archivo `primary-navy`).
- Subtitle: "Manage service providers across plumbing, roofing, electrical, and other categories."
- Right-aligned: "+ Add New Partner" `.btn-primary` button.

### FR-03-02 — Partner Statistics Grid

- Six stat cards in `repeat(auto-fit, minmax(280px, 1fr))`.

**Reference Partner Stats**:

| Label          | Value | Description           | Icon |
| -------------- | ----- | --------------------- | ---- |
| Total Partners | 156   | All categories        | 🤝   |
| Plumbing       | 42    | Licensed plumbers     | 🔧   |
| Roofing        | 38    | Roofing contractors   | 🏠   |
| Electrical     | 35    | Licensed electricians | ⚡   |
| Credit Repair  | 24    | Credit specialists    | 💳   |
| Other Services | 17    | HVAC, painting, etc.  | 🛠️   |

### FR-03-03 — Filter Bar

- `grid-template-columns: 1fr 1fr 1fr 1fr auto`, `gap: 16px`.
- **Search Partners**: placeholder "Search by name or company..."
- **Filter by Category**: All Categories, Plumbing, Roofing, Electrical, Credit Repair, HVAC, Other.
- **Filter by Zip Code**: placeholder "Enter zip code..."
- **Filter by Status**: All Status, Active, Pending Approval, Suspended.
- **"Apply Filters"** `.btn-secondary`.

### FR-03-04 — Partners Table

**Columns**: Partner Company (name + contact + phone), Category, Service Areas (Zip Codes), Rating, Status, Actions.

**Reference Partners Table**:

| Company                   | Category Badge                 | Zip Codes           | Rating         | Status Badge                     | Actions         |
| ------------------------- | ------------------------------ | ------------------- | -------------- | -------------------------------- | --------------- |
| ABC Plumbing Co.          | `badge-info` 🔧 Plumbing       | 77380, 77381, 77382 | ⭐⭐⭐⭐⭐ New | `badge-warning` Pending Approval | Approve · View  |
| Premium Roofing Solutions | `badge-error` 🏠 Roofing       | 77380–77384         | ⭐⭐⭐⭐⭐ 4.9 | `badge-success` Active           | Edit · View     |
| Lightning Fast Electric   | `badge-yellow` ⚡ Electrical   | 77380, 77381        | ⭐⭐⭐⭐⭐ 4.8 | `badge-success` Active           | Edit · View     |
| Credit Solutions Plus     | `badge-green` 💳 Credit Repair | All (Virtual)       | ⭐⭐⭐⭐⭐ 5.0 | `badge-success` Active           | Edit · View     |
| Elite Plumbing Services   | `badge-info` 🔧 Plumbing       | 77380–77383         | ⭐⭐⭐⭐⭐ 4.7 | `badge-success` Active           | Edit · View     |
| Budget Roofing Inc.       | `badge-neutral` 🏠 Roofing     | 77380, 77381        | ⭐⭐⭐ 3.2     | `badge-error` Suspended          | Activate · View |

- Contact row below company name: "Contact: [Name] · [Phone]" in 12px `neutral-500`.
- Rating: gold star ⭐ characters + rating number in 13px/600 `neutral-600`.
- Suspended row: company name in `neutral-500`; contact in `neutral-400`.

### FR-03-05 — Pagination

- "Showing 1-6 of 156 partners" (left).
- Page buttons: Previous · 1 (active) · 2 · 3 · … · 26 · Next.

### FR-03-06 — Add New Service Partner Modal

- Title: "Add New Service Partner"; subtitle: "Register a new service provider for your network."

**Section 1 — 🏢 Company Information**

- **Company/Business Name** (required): placeholder "ABC Plumbing Co."; help "Legal business name as it appears on license."
- **Service Category** (required, select): 🔧 Plumbing, 🏠 Roofing, ⚡ Electrical, ❄️ HVAC, 💳 Credit Repair, 🎨 Painting, 🌳 Landscaping, 📐 Flooring, 🛠️ Other Services.
- **Business License Number** (required): `form-row-2` with Service Category.
- **Tax ID / EIN** · **Years in Business** · **Insurance Verified** (select: Pending/Yes/No): `form-row-3`.

**Section 2 — 📞 Primary Contact Information**

- **Contact Person Name** (required) · **Position/Title**: `form-row-2`.
- **Phone Number** (required) · **Email Address** (required): `form-row-2`.
- **Website URL** · **Emergency Contact Number**: `form-row-2`.

**Section 3 — 🏢 Business Address**

- **Street Address** (required): full width.
- **City** (required) · **State** (required, select: TX, CA, NY, FL…) · **Zip Code** (required): `form-row-3`.

**Section 4 — 📍 Service Coverage Areas (Zip Codes)**

- **Zip Codes Served** (required): tag-input component.
  - Existing tags rendered as `.zip-tag` (navy background, white text, ✕ remove button).
  - Input row: 5-digit zip input + "+ Add Zip Code" button (green).
  - Enter key also adds zip code.
  - Help: "Tip: Add '00000' for virtual services available everywhere."
- **Service Radius (miles)** · **Service Type** (On-Site Only / Virtual / Both): `form-row-2`.

**Section 5 — 💰 Pricing & Service Details**

- **Hourly Rate Range** · **Minimum Service Charge** · **Free Estimates?** (Yes/No/Conditional): `form-row-3`.
- **Emergency Services Available?** (No / Yes-24/7 / Limited) · **Typical Response Time** (Same Day / 24h / 48h / Week): `form-row-2`.

**Section 6 — 📄 Required Documentation**

- **Business License** (required): file upload zone (📄 icon, "Click to upload business license", PDF/JPG/PNG up to 10MB).
- **Insurance Certificate** (required): file upload zone (🛡️ icon).
- **Company Logo** (optional): file upload zone (🖼️ icon, PNG/JPG up to 5MB, square format recommended).

**Section 7 — ⚙️ Account Status & Notes**

- **Partner Status** (required, select): Pending Approval (default), Active, Suspended, Inactive. Help: "Set to 'Pending' for new partners requiring verification."
- **Initial Rating** (select): New Partner (No Rating), ⭐⭐⭐⭐⭐ (5.0), ⭐⭐⭐⭐ (4.5/4.0), ⭐⭐⭐ (3.5): `form-row-2`.
- **Internal Notes** textarea.
- **Partnership Agreement** checkboxes: "Partner has read and accepted terms & conditions" (required) · "Commission/referral agreement signed" · "Background check completed."

Footer: "Cancel" `.btn-secondary` + "Add Service Partner" `.btn-primary`.

### FR-03-07 — View/Edit Partner Modal

- Title: "View Partner Details" (switches to "Edit Partner Details" in edit mode).
- **Section 1 — 🏢 Company Information**: Company Name · Contact Person · Phone · Email · Service Category (all read-only by default).
- **Section 2 — 📍 Service Areas**: Zip Codes text input · Rating · Status: `form-row-2` for rating + status.
- Footer: "Close" `.btn-secondary` + "Enable Edit" `.btn-primary`; in edit mode: "Save Changes."

---

## Data & State

| Field                        | Type    | Description                                                           |
| ---------------------------- | ------- | --------------------------------------------------------------------- |
| `partners[]`                 | array   | All service partners                                                  |
| `partner.company_name`       | string  | Legal business name                                                   |
| `partner.category`           | string  | `plumbing`, `roofing`, `electrical`, `credit-repair`, `hvac`, `other` |
| `partner.contact_name`       | string  | Primary contact person                                                |
| `partner.phone`              | string  | Contact phone                                                         |
| `partner.email`              | string  | Contact email                                                         |
| `partner.license_number`     | string  | Business license number                                               |
| `partner.service_zips[]`     | array   | List of 5-digit zip codes served                                      |
| `partner.rating`             | number  | Average rating (1 decimal, null = "New")                              |
| `partner.status`             | string  | `active`, `pending-approval`, `suspended`, `inactive`                 |
| `partner.insurance_verified` | boolean | Insurance certificate validated                                       |
| `filter.category`            | string  | Currently selected category filter                                    |
| `filter.zip_code`            | string  | Currently entered zip code filter                                     |
| `filter.status`              | string  | Currently selected status filter                                      |
| `zip_code_tags[]`            | array   | Tags in the zip code input component                                  |

---

## Edge Cases & Error States

- **Duplicate zip code in tag input**: Alert "This zip code has already been added."
- **Invalid zip code format**: Alert "Please enter a valid 5-digit zip code."
- **No zip codes added on submit**: Validation error "Please add at least one service area zip code."
- **No partners match filter**: "No partners found for this filter combination."
- **Approve action fails**: Inline error on row; retry option.

---

## Success Criteria

1. All 6 reference partners render with correct category badges, zip codes, ratings, status badges, and action buttons.
2. ABC Plumbing Co. shows "Approve" action; Premium Roofing Solutions shows "Edit"; Budget Roofing Inc. shows "Activate."
3. Category filter reduces table to matching partners only.
4. Zip code tag input adds and removes tags correctly; prevents duplicates.
5. All three file upload zones accept drag-and-drop and click-to-browse.
6. Status defaults to "Pending Approval" in the Add Partner modal.

---

## Open Questions

1. Should approved partners be immediately visible to agents, or is there an additional quality review step?
2. Should zip code "00000" be treated as a special case displaying "All (Virtual)"?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, modal pattern, badge system, table pattern)
- **Cross-links**: 001-dashboard (partner counts, partner applications in pending approvals)
