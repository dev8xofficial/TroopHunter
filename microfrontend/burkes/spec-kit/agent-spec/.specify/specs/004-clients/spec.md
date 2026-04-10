# Feature Specification: Clients

**Feature ID**: 004-clients
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Clients — client profile management screen

---

## Overview

The Clients screen is the agent's client relationship management hub. It displays all client profiles assigned to the agent, allows searching, and provides a full "Add New Client" form that creates a client portal account with login credentials and associates them with a transaction type. Each client card shows key details and provides one-click navigation to their transaction or a message compose action.

---

## Problem Statement

Agents manage multiple clients simultaneously, each at different stages of the transaction lifecycle. Without a structured client view, agents cannot quickly retrieve contact details, understand a client's current transaction status, or onboard a new client into the portal with credentials in one step.

---

## Goals

- Display all agent clients in a scannable card grid with key contact and transaction details.
- Allow agents to search for clients by name or email.
- Provide a structured "Add New Client" modal that creates the client account, sets credentials, and links a transaction type.
- Provide one-click navigation to a client's transaction and message thread.

---

## Non-Goals

- The Clients screen does not manage client-specific documents (spec 003).
- It does not display message threads (spec 005).
- Client credential management after creation (password reset, deactivation) is an admin/auth concern.

---

## Actors

| Actor      | Role in This Feature                                         |
| ---------- | ------------------------------------------------------------ |
| Agent (AG) | Creates client accounts; views and manages own client roster |
| Admin (TC) | Can view and manage all clients across all agents            |

---

## User Scenarios

### Scenario 1 — Agent Reviews Client Roster

**Actor**: Agent
**Precondition**: Agent has 4 clients in the system.
**Flow**:

1. Agent navigates to Clients.
2. Four client cards render in a vertical stack.
3. Agent reads John Smith's card: email, phone, property address, transaction type, status, and property value.
4. Agent clicks "View Transaction" on John Smith's card.
5. The transaction detail modal opens for TRX-10247.

**Success**: Agent can read all key client details and access their transaction in two clicks.

---

### Scenario 2 — Agent Adds a New Client

**Actor**: Agent
**Precondition**: A new buyer has agreed to use the portal.
**Flow**:

1. Agent clicks "+ Add New Client" in the filter bar.
2. "Add New Client" modal opens.
3. Agent fills in: First Name, Last Name, Email, Phone, and clicks "Click to auto-generate secure password."
4. A 16-character secure password is generated and shown temporarily in the password field.
5. Agent selects Transaction Type "Purchase" and enters the property address.
6. Agent optionally fills insurance information (auto provider, VIN, home warranty).
7. Agent adds notes: "First-time buyer, pre-approved at $485K."
8. Agent clicks "Create Client Account."
9. Modal closes; new client card appears in the list.
10. Activity event written: "Client Account Created – John Smith."

**Success**: Client account is created with credentials; client receives portal access at their email; agent sees the client in the roster.

---

## Functional Requirements

### FR-04-01 — Filter Bar

- Full-width search bar with 🔍 icon prefix and placeholder "Search clients..."
- **"+ Add New Client"** `.btn-primary` button (right-aligned).

### FR-04-02 — Client Card Grid

Clients are displayed as a vertical list of `.client-card` elements (white cards, `border: 2px solid neutral-200`, `border-radius: 12px`, `padding: 24px`; hover: `primary-navy` border + `shadow-md`).

**Card Header**: Client avatar (56×56 px circle, `primary-navy` background [or role colour variant], white initials, 20px/700) + Client Info (name 18px/700 `neutral-900`; email + phone 14px `neutral-600`, separated by " • ").

**Card Details Section** (grid of label/value rows):

| Label             | Value (from data)     |
| ----------------- | --------------------- |
| Property:         | Full address          |
| Transaction Type: | Purchase / Sale       |
| Status:           | `.table-status` badge |
| Property Value:   | Formatted USD amount  |

**Card Footer** (two buttons): "View Transaction" (`.btn-primary`, flex: 1) + "Send Message" (`.btn-secondary`).

**Reference Client Cards (from agent.html)**:

| Client         | Avatar BG       | Initials | Email                    | Phone          | Property                                 | Type     | Status Badge                     | Value    |
| -------------- | --------------- | -------- | ------------------------ | -------------- | ---------------------------------------- | -------- | -------------------------------- | -------- |
| John Smith     | `primary-navy`  | JS       | john.smith@gmail.com     | (555) 210-4738 | 123 Main Street, The Woodlands, TX 77380 | Purchase | Under Contract (active)          | $485,000 |
| Sarah Williams | `#3b82f6`       | MC       | sarah.williams@gmail.com | (555) 387-9021 | 789 Pine Road, The Woodlands, TX 77381   | Sale     | Under Contract (active)          | $389,500 |
| Michael Brown  | `success-green` | ER       | michael.brown@gmail.com  | (555) 502-6184 | 789 Pine Road, The Woodlands, TX 77381   | Purchase | Inspection / Appraisal (pending) | $512,000 |

Note: Avatar initials "MC" and "ER" are preserved exactly from agent.html even though they do not match the displayed client names — this is a data artefact from the reference implementation.

### FR-04-03 — Add New Client Modal

Modal title: "Add New Client." Subtitle: "Create a new client profile to manage transactions and documents."

**Section 1 — 👤 Client Information**

- First Name (required), Last Name (required): `form-row-2` layout.
- Email Address (required) with help text "Client will receive portal access at this email"; Phone Number (required): `form-row-2` layout.
- Password field with help text link "Click to auto-generate secure password" (triggers `generateClientPassword()` logic); Account Status dropdown (Active / Inactive): `form-row-2` layout.

**Password Auto-Generate Logic**:

- Generated password: 16 characters, must include at least one uppercase, one lowercase, one digit, one special character (`!@#$%^&*`).
- After generation: password field briefly shows the password in plain text for 3 seconds, then reverts to masked (`type="password"`).
- Help text temporarily changes to "✓ Password generated and visible" (in `success-green`) during the 3-second window.

**Section 2 — 🏠 Transaction Information**

- Transaction Type dropdown: (empty), Purchase, Sale, Refinance, Buyer & Seller: `form-row-2` layout.
- Preferred Communication dropdown: Email, Phone, Text Message, Any Method: `form-row-2` layout.
- Property Address text input (full width): placeholder "123 Main Street, City, State ZIP"; help text "Property address for this transaction (if known)."

**Section 3 — 🛡️ Insurance Information (Optional)**

- Auto Insurance Provider text input; VIN Number text input: `form-row-2` layout.
- Home Insurance Provider text input; Home Warranty Provider text input: `form-row-2` layout.

**Section 4 — 📝 Additional Notes**

- "Current Situation / Notes" textarea: placeholder "e.g. First-time buyer looking in Lincoln Park, pre-approved at $500K, wants to close by June..."; help text "Internal notes about client needs, preferences, and situation."

Footer: "Cancel" (`.btn-secondary`) + "Create Client Account" (`.btn-primary`).

Validation: First Name, Last Name, Email, and Phone are required. Account Status defaults to "Active."

### FR-04-04 — Client Card Navigation Actions

- **"View Transaction" button**: Opens the transaction detail modal (from FR-01-04 / FR-02-05) pre-loaded with the client's associated transaction.
- **"Send Message" button**: Navigates to the Messages screen (spec 005).

---

## Data & State

| Field                     | Type   | Description                                                              |
| ------------------------- | ------ | ------------------------------------------------------------------------ |
| `clients[]`               | array  | Full list of agent's clients                                             |
| `client.first_name`       | string | Client first name                                                        |
| `client.last_name`        | string | Client last name                                                         |
| `client.email`            | string | Email address (used for portal login)                                    |
| `client.phone`            | string | Phone number                                                             |
| `client.avatar_initials`  | string | Two-letter initials (may differ from name initials — preserve as stored) |
| `client.avatar_bg`        | string | CSS colour value for avatar background                                   |
| `client.property_address` | string | Primary property address for the transaction                             |
| `client.transaction_type` | string | `purchase`, `sale`, `refinance`, `both`                                  |
| `client.status`           | string | Current transaction stage or status label                                |
| `client.property_value`   | number | Contract or listing price                                                |
| `client.auto_insurance`   | string | Auto insurance provider (optional)                                       |
| `client.vin`              | string | Vehicle identification number (optional)                                 |
| `client.home_insurance`   | string | Home insurance provider (optional)                                       |
| `client.home_warranty`    | string | Home warranty provider (optional)                                        |
| `client.notes`            | string | Internal agent notes (optional)                                          |
| `client.status_flag`      | string | `active`, `inactive`                                                     |

---

## Edge Cases & Error States

- **No clients yet**: Page shows empty state with a prominent "+ Add New Client" prompt.
- **Email already exists**: On "Create Client Account," show inline error "A client with this email already exists."
- **Password not generated before submit**: Prompt agent to generate or manually enter a password.
- **Search returns no results**: Show "No clients match your search."

---

## Success Criteria

1. All 3 reference client cards render with exact data from the constitution (including avatar colours and initials).
2. "View Transaction" opens the transaction detail modal with correct transaction data.
3. "Send Message" navigates to the Messages screen.
4. Add New Client modal validates all required fields before submission.
5. Password auto-generate produces a 16-character password with the correct character class requirements.
6. Help text toggles correctly during and after the 3-second password reveal window.
7. New client appears in the list immediately after creation.

---

## Open Questions

1. Should the agent be able to edit an existing client's details after creation?
2. Should the "Inactive" client status hide the client from the default Clients view?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, modal pattern)
- **Supplies data to**: 002-transactions (client dropdown in New Transaction modal), 005-messages (messaging a specific client)
