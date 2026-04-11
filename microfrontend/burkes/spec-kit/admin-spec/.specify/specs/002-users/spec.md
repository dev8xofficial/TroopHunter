# Feature Specification: Users Management

**Feature ID**: 002-users
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Users — platform-wide user account management

---

## Overview

The Users Management screen is the administrator's authoritative interface for managing all user accounts across the platform. It provides role-based filtering and search, a comprehensive user table with status badges and action buttons, aggregate statistics by role, and the ability to create new user accounts via a structured modal form with role-adaptive fields.

---

## Problem Statement

The platform serves six distinct user roles (Clients, Agents, Attorneys, CPAs, Lenders, Admins), each with different permission sets and registration workflows. Without a unified user management interface, administrators cannot efficiently approve registrations, audit account status, manage permissions, or onboard new users. The Users screen eliminates this by providing a single pane of glass for all user accounts.

---

## Goals

- Display all platform users in a searchable, filterable, paginated table.
- Show aggregate user counts broken down by role.
- Allow admins to filter by role and status.
- Allow admins to approve pending user registrations directly from the table.
- Allow admins to view and edit any user account via a modal.
- Allow admins to create new users via a structured, role-adaptive modal form.

---

## Non-Goals

- Password reset on behalf of users is an auth service concern.
- Bulk user operations are deferred to a future spec.
- User activity logs are surfaced in the Analytics screen (006).

---

## Actors

| Actor              | Role in This Feature                                            |
| ------------------ | --------------------------------------------------------------- |
| Administrator (TC) | Creates, views, edits, approves, and suspends all user accounts |

---

## User Scenarios

### Scenario 1 — Admin Approves a Pending Registration

**Actor**: Administrator
**Precondition**: Lisa Anderson has registered and appears with "Pending Approval" status.
**Flow**:

1. Admin navigates to Users.
2. Table renders 6 reference users; Lisa Anderson shows "Pending Approval" status.
3. Admin clicks "Approve" on Lisa Anderson's row.
4. Status changes to "Active"; audit log records the approval.

**Success**: Registration is approved; user gains portal access; audit log updated.

---

### Scenario 2 — Admin Creates a New Attorney Account

**Actor**: Administrator
**Precondition**: A new attorney has joined the platform and needs an account.
**Flow**:

1. Admin clicks "+ Add New User."
2. "Add New User" modal opens.
3. Admin selects Role: "⚖️ Attorney - Closing/Divorce."
4. Form adapts: Professional Information section appears with Bar Number and Attorney Type fields.
5. Admin fills First Name, Last Name, Email, Phone, auto-generates a password.
6. Admin fills Bar Number, selects Attorney Type "Closing," enters law firm name.
7. Admin clicks "Create User Account."
8. Account is created; welcome email sent; audit log updated.

**Success**: Attorney account exists with correct role permissions; audit log records creation.

---

### Scenario 3 — Admin Filters Users by Role

**Actor**: Administrator
**Precondition**: 1,247 users exist across all roles.
**Flow**:

1. Admin selects "Attorneys" from the Filter by Role dropdown.
2. Table reduces to show only attorney accounts.
3. Admin resets to "All Roles"; full list returns.

**Success**: Role filter applies without page reload; count in pagination updates correctly.

---

## Functional Requirements

### FR-02-01 — Page Header and Action Button

- Title: "Users Management" (28px/700 Archivo `primary-navy`).
- Subtitle: "Manage users, roles, and permissions across the platform."
- Right-aligned: "+ Add New User" `.btn-primary` button with ➕ icon.

### FR-02-02 — User Statistics Grid

- Six stat cards in `repeat(auto-fit, minmax(280px, 1fr))` layout.

**Reference User Stats**:

| Label              | Value | Description           | Icon |
| ------------------ | ----- | --------------------- | ---- |
| Total Users        | 1,247 | All active users      | 👥   |
| Clients            | 856   | Active homeowners     | 🏠   |
| Attorneys          | 142   | Closing & divorce     | ⚖️   |
| CPAs               | 89    | Certified accountants | 💼   |
| Real Estate Agents | 67    | Licensed agents       | 🏡   |
| Mortgage Lenders   | 22    | Active lenders        | 🏦   |

### FR-02-03 — Filter Bar

- `grid-template-columns: 1fr 1fr 1fr auto`, `gap: 16px`, `align-items: end`.
- **Search Users** text input: placeholder "Search by name, email, or ID..."
- **Filter by Role** select: All Roles, Clients, Attorneys, CPAs, Real Estate Agents, Mortgage Lenders, Administrators.
- **Filter by Status** select: All Status, Active, Pending Approval, Suspended, Inactive.
- **"Apply Filters"** `.btn-secondary` button.

### FR-02-04 — Users Table

**Columns**: User (avatar + name + ID), Email, Role, Status, Joined, Actions.

- User cell: 44×44 avatar (navy gradient or role-colour override) + name (16px/600 `primary-navy`) + ID (12px `neutral-500`).
- Role cell: badge with role emoji and label.
- Status cell: badge.
- Actions cell: centred `.tbl-actions` container.

**Reference Users Table**:

| Name           | ID          | Email                                | Role Badge                 | Status Badge                     | Joined       | Actions        |
| -------------- | ----------- | ------------------------------------ | -------------------------- | -------------------------------- | ------------ | -------------- |
| John Smith     | USR-CLT-001 | john.smith@gmail.com                 | `badge-neutral` 🏠 Client  | `badge-success` Active           | Jan 15, 2026 | Edit · View    |
| Sarah Anderson | USR-AGT-001 | sarah.anderson@burkesgroup.com       | `badge-info` 🏡 Agent      | `badge-success` Active           | Oct 28, 2023 | Edit · View    |
| Sarah Mitchell | USR-ATT-001 | sarah.mitchell@mitchelllawgroup.com  | `badge-purple` ⚖️ Attorney | `badge-success` Active           | Jan 15, 2024 | Edit · View    |
| James Carter   | USR-LND-001 | james.carter@firstnationalbank.com   | `badge-warning` 🏦 Lender  | `badge-success` Active           | Sep 12, 2023 | Edit · View    |
| David Thompson | USR-CPA-001 | david.thompson@thompsonfinancial.com | `badge-green` 💼 CPA       | `badge-success` Active           | Dec 3, 2023  | Edit · View    |
| Lisa Anderson  | USR-CLT-005 | lisa.anderson.client@gmail.com       | `badge-neutral` 🏠 Client  | `badge-warning` Pending Approval | Feb 10, 2026 | Approve · View |

- Avatar background colours: JS (default navy), SA (`#3b82f6`), SM (`#7c3aed`), JC (`#f59e0b`), DT (`success-green`), LA (`neutral-400`).
- Pending users: name in `neutral-500`, ID in `neutral-400`, avatar in `neutral-400`.

### FR-02-05 — Pagination

- "Showing 1-6 of 1,247 users" count (left, 14px `neutral-600`).
- Page buttons: Previous · 1 (active) · 2 · 3 · … · 208 · Next.
- Active page: `.btn-primary`; others: `.btn-secondary` with `padding: 8px 16px`.

### FR-02-06 — Add New User Modal

- Modal title: "Add New User"; subtitle: "Create a new user account with role-based permissions."
- Close button: ✕.

**Section 1 — 🔐 Role & Access Permissions** (shown first)

- **User Role** (required, select): ⚙️ Administrator, 🏡 Real Estate Agent, 🏠 Client - Homeowner/Buyer, ⚖️ Attorney - Closing/Divorce, 💼 CPA - Certified Public Accountant, 🏦 Mortgage Lender. Help text: "Select role first - form fields will adapt automatically."
- **Account Status** (required, select): Active (default), Pending Approval, Suspended, Inactive.
- **Access Permissions** checkboxes (auto-configured by role, manually overridable):
  - View Documents · Upload Documents · Create Clients · View Transactions · Manage Transactions · Review & Verify Documents · Share with Title Company · Secure Messaging · Access Mortgage Integration · Manage Users · View Reports · System Settings.

**Section 2 — 👤 Personal Information**

- First Name (required) · Last Name (required): `form-row-2`.
- Email Address (required, help: "User will receive login credentials at this email") · Phone Number (required): `form-row-2`.
- Password field (auto-generate link: "Click to auto-generate secure password") · Status: `form-row-2`.
  - Auto-generate: 16-character password (uppercase, lowercase, digit, special char); briefly shown in plain text then masked after 3s.

**Section 3 — 💼 Professional Information** (shown for Agent, Attorney, CPA, Lender roles only)

- License/Bar/CPA License/NMLS Number (required, label adapts by role) · Attorney Type (for Attorney only: Closing / Divorce): `form-row-2`.
- Company/Firm/Brokerage Name (required, label adapts) · Office Address: `form-row-2`.
- Service Area (Zip Codes): full-width text input.

**Section 4 — 🏠 Transaction Information** (shown for Client role only)

- Property Address · Transaction Type (Purchase/Sale/Refinance/Buyer & Seller): `form-row-2`.
- Assigned Agent: select dropdown.

**Section 5 — 🛡️ Insurance Information** (shown for Client role only, optional)

- Auto Insurance Provider · VIN Number: `form-row-2`.
- Home Insurance Provider · Home Warranty Provider: `form-row-2`.

**Section 6 — 📝 Additional Notes**

- Internal Notes textarea: "Add any internal notes about this user (not visible to the user)."

Footer: "Cancel" `.btn-secondary` + "Create User Account" `.btn-primary` (label adapts by role).

**Role-Based Permission Auto-Configuration**:

| Role          | Auto-Checked Permissions                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Administrator | View/Upload Docs, Create Clients, View/Manage Transactions, Review Docs, Messaging, Mortgage, Manage Users, Reports, Settings |
| Agent         | View/Upload Docs, Create Clients, View Transactions, Messaging                                                                |
| Client        | View/Upload Docs, Messaging                                                                                                   |
| Attorney      | View/Upload Docs, View/Manage Transactions, Review Docs, Messaging                                                            |
| CPA           | View Docs, View Transactions, Messaging                                                                                       |
| Lender        | View/Upload Docs, Share with Title, Messaging, Mortgage Access                                                                |

### FR-02-07 — View/Edit User Modal

- Modal title: "View User Details" (switches to "Edit User Details" in edit mode).
- **Section 1 — 👤 Personal Information**: First Name · Last Name, Email · Phone, User ID · Join Date (all `form-row-2`, read-only by default).
- **Section 2 — 🔐 Role & Status**: User Role (select, disabled) · Account Status (select, disabled): `form-row-2`.
- Footer: "Close" `.btn-secondary` + "Enable Edit" `.btn-primary`; in edit mode: "Save Changes" `.btn-primary` replaces "Enable Edit."

---

## Data & State

| Field                  | Type   | Description                                             |
| ---------------------- | ------ | ------------------------------------------------------- |
| `users[]`              | array  | All platform users                                      |
| `user.id`              | string | Format `USR-[ROLE]-[NNN]`                               |
| `user.first_name`      | string | First name                                              |
| `user.last_name`       | string | Last name                                               |
| `user.email`           | string | Email address                                           |
| `user.phone`           | string | Phone number                                            |
| `user.role`            | string | `client`, `agent`, `attorney`, `cpa`, `lender`, `admin` |
| `user.status`          | string | `active`, `pending-approval`, `suspended`, `inactive`   |
| `user.joined_date`     | date   | Account creation date                                   |
| `user.avatar_initials` | string | Two-letter initials                                     |
| `user.avatar_bg`       | string | CSS colour for avatar background                        |
| `filter.role`          | string | Currently selected role filter                          |
| `filter.status`        | string | Currently selected status filter                        |
| `filter.search`        | string | Current search query                                    |
| `pagination.total`     | number | Total user count (1,247)                                |
| `pagination.page`      | number | Current page                                            |

---

## Edge Cases & Error States

- **No users match filters**: Table shows "No users match your filters."
- **Email already exists on create**: Inline error "A user with this email already exists."
- **Approve action fails**: Inline error on the row; retry option.
- **Suspend active user with open transactions**: Warn admin "This user has N active transactions. Suspending will restrict their access."

---

## Success Criteria

1. All 6 reference users render correctly with correct avatar colours, initials, role badges, and status badges.
2. "Approve" action on Lisa Anderson's row changes status to Active.
3. Role filter reduces table to only users of that role.
4. Add New User modal shows/hides Professional and Client sections based on role selection.
5. Permission checkboxes auto-configure correctly for each of the 6 roles.
6. Password auto-generate produces a 16-character password meeting all character requirements.
7. View/Edit modal toggles between read-only and edit mode correctly.

---

## Open Questions

1. Should role changes on an existing user trigger a re-onboarding email?
2. Should "Inactive" users be hidden from the default view?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, modal pattern, badge system, table pattern)
- **Cross-links**: 004-transactions (user assigned to transactions), 005-documents (documents uploaded by user)
