# Feature Specification: Clients

**Feature ID**: 004-clients
**Status**: approved
**Created**: 2026-04-12
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Clients — client profile management

---

## Overview

The Clients screen enables the attorney to manage client profiles, view case details, and communicate securely with clients associated with their assigned transactions. It features a client table, Add Client modal, Client Detail modal, overview statistics sidebar, role permissions display, and a quick messaging form.

---

## Problem Statement

Attorneys handling multiple cases need quick access to client contact information, case status, and a way to communicate without leaving the portal. Without a dedicated client management screen, attorneys rely on separate email systems and contact databases, creating friction and delays.

---

## Goals

- Display all clients with their case information in a searchable table.
- Enable adding new clients with case type and property details.
- Show detailed client information in a modal with direct action buttons.
- Provide a quick secure messaging form.
- Communicate role-based access permissions clearly.

---

## Non-Goals

- This screen does not manage transactions directly (spec 002).
- It does not host document review (spec 003).

---

## Actors

| Actor | Role |
|-------|------|
| Attorney (AT) | Views clients, adds new clients, sends messages, navigates to verification |

---

## User Scenarios

### Scenario 1 — Attorney Views Client Detail

**Actor**: Attorney
**Flow**:
1. Attorney clicks on John Smith row in clients table.
2. Client Detail modal opens showing: name, email, phone, case ID, property, transaction type, amount, status.
3. Attorney clicks "✅ Verify Transaction" to navigate to Verification.
4. Or clicks "📄 View Documents" to navigate to Documents.

**Success**: Full client context accessible without leaving the Clients screen.

### Scenario 2 — Attorney Adds a New Client

**Actor**: Attorney
**Flow**:
1. Attorney clicks "+ Add Client" button.
2. Modal opens with: first name, last name, email, phone, case type, property address.
3. Attorney fills in details and clicks "+ Add Client."

**Success**: New client record created; visible in the clients table.

---

## Functional Requirements

### FR-04-01 — Client Search and Filter

- Search input: "Search clients by name, email, or case ID…"
- Case type filter: All Case Types, Purchase, Sale, Divorce.
- "+ Add Client" primary button.

### FR-04-02 — Client Table

- Card title "All Clients" with subtitle "4 active clients across 4 transactions."
- Columns: Client (avatar + name + email), Case Type, Property, Transaction ID, Attorney Status, Action.
- Rows are clickable to open Client Detail modal.

### FR-04-03 — Client Detail Modal

- Header: "👤 [Client Name]."
- Profile section: avatar, name, email, phone, status badge.
- Details grid: Case ID, Property, Transaction type, Amount.
- Action buttons: "✅ Verify Transaction", "📄 View Documents", "✉️ Send Message."

### FR-04-04 — Add Client Modal

- Fields: First Name, Last Name, Email, Phone, Case Type (dropdown), Property Address.
- Case types: Purchase – Closing, Sale – Closing, Divorce – Asset Split.

### FR-04-05 — Client Overview Sidebar

- Stats: Total Clients (5), Active Cases (3), Divorce Cases (2), Verified/Completed (1).

### FR-04-06 — Role Permissions Sidebar

- Info box: "⚖️ Attorney access: view transactions, verify closing amounts, approve/modify asset splits, review all documents."
- Additional note about access limitations.

### FR-04-07 — Quick Message Sidebar

- Client selector dropdown.
- Message textarea.
- "✉️ Send Secure Message" full-width primary button.

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `clients[]` | array | All clients assigned to attorney |
| `client_counts` | object | Counts per category |

---

## Edge Cases & Error States

- **No clients**: "No clients assigned to you."
- **Add client validation**: All required fields must be filled.
- **Message without client selected**: Validation error.

---

## Success Criteria

1. All 4 reference clients render with correct data.
2. Client Detail modal shows accurate case information.
3. Add Client modal creates new records.
4. Quick Message form sends successfully.

---

## Dependencies

- **Depends on**: 000-foundation
- **Cross-links**: 005-verification (Verify Transaction button), 003-documents (View Documents button)
