# Architecture Overview — Attorney Portal

This document describes the high-level architecture of The Burkes Group Attorney Portal, its screen structure, data flow, and integration points.

---

## 1. System Context

The Attorney Portal is a **single-page web application** serving closing attorneys at The Burkes Group. It is part of a multi-portal system:

- **Agent Portal** (separate spec-kit): Used by real estate agents to manage transactions, documents, clients, communications, calendar, partner referrals, and analytics.
- **Attorney Portal** (this spec-kit): Used by closing attorneys to verify transaction amounts, review documents, manage client cases, and ensure closing compliance.
- **Client Portal** (separate spec-kit): Used by homebuyers to track their purchase transaction.

All portals share the same underlying transaction data and communicate through a shared backend. This spec-kit governs only the Attorney Portal.

---

## 2. Portal Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      ATTORNEY PORTAL (SPA)                          │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 Foundation Layer (000)                       │   │
│  │  ┌──────┐  ┌────────┐  ┌──────────┐  ┌─────────────────┐  │   │
│  │  │ Auth │  │Top Nav │  │  Design  │  │  Activity Log   │  │   │
│  │  │Context│  │  Bar   │  │  Tokens  │  │   Contract      │  │   │
│  │  └──────┘  └────────┘  └──────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Screen Layer                             │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────────┐  ┌───────────┐             │   │
│  │  │Dashboard │  │ Transactions │  │ Documents │             │   │
│  │  │  (001)   │  │    (002)     │  │   (003)   │             │   │
│  │  └──────────┘  └──────────────┘  └───────────┘             │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────────┐                             │   │
│  │  │ Clients  │  │ Verification │                             │   │
│  │  │  (004)   │  │    (005)     │                             │   │
│  │  └──────────┘  └──────────────┘                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Modal Layer                              │   │
│  │  Verify Confirm │ Flag Discrepancy │ Add Client │ Report   │   │
│  │  Approve Split  │ Modify Split     │ Client Det │ Reject   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌──────────────┐
│  Auth       │    │   Backend API   │    │   Agent      │
│  Provider   │    │  (Transactions, │    │   Portal     │
│  (External) │    │   Documents,    │    │   (Cross-    │
│             │    │   Activity Log) │    │    portal)   │
└─────────────┘    └─────────────────┘    └──────────────┘
```

---

## 3. Screen Inventory

| # | Screen | Route ID | Purpose | Primary Actions |
|---|--------|----------|---------|--------------------|
| 000 | Foundation | `—` | Global infrastructure (nav, tokens, auth, activity log) | N/A — consumed by all screens |
| 001 | Dashboard | `dashboard` | KPI command centre, asset split reviews, transaction table, activity feed | View transactions, review splits |
| 002 | Transactions | `transactions` | Full transaction list, filtering, tabbed views | Review, verify, flag transactions |
| 003 | Documents | `documents` | Document review, approval, rejection, upload | Review, approve, reject, upload |
| 004 | Clients | `clients` | Client profiles, case management, messaging | Add client, view details, send message |
| 005 | Verification | `verification` | Closing amount verification, progress steps, flagging | Verify amounts, flag discrepancies, generate reports |

---

## 4. Data Flow

### 4.1 Verification Lifecycle

The attorney verification workflow is the core data flow:

1. **Agent submits** transaction documents and closing amounts
2. **Attorney reviews** documents on the Documents screen (003)
3. **Attorney verifies** closing amounts on the Verification screen (005)
4. **Attorney flags** discrepancies or **approves** amounts
5. **Verification record** is created and shared with all parties

### 4.2 Activity Log

Every meaningful state change writes to the append-only activity log:

```
Attorney Action → Activity Event Created → Dashboard Feed Updated
                                          → Notification Bell Updated
```

Event types include: document_reviewed, document_approved, document_rejected, transaction_verified, discrepancy_flagged, client_created, report_generated.

### 4.3 Cross-Screen Navigation

| From Screen | Action | Navigates To |
|-------------|--------|--------------|
| Dashboard | Click "Review Now" on alert | Verification screen |
| Dashboard | Click "Verify" on table row | Verify Confirm modal |
| Dashboard | Click "View All" on transactions | Transactions screen |
| Dashboard | Quick Action: Review Transactions | Transactions screen |
| Dashboard | Quick Action: Manage Verifications | Verification screen |
| Dashboard | Quick Action: View All Documents | Documents screen |
| Transactions | Click "Verify" on row | Verify Confirm modal |
| Transactions | Click "Flag" on row | Flag Discrepancy modal |
| Documents | Click "Review" on document | Document detail view |
| Documents | Click "Approve" on document | Approval confirmation |
| Clients | Click "Verify Transaction" | Verification screen |
| Clients | Click "View Documents" | Documents screen |
| Verification | Click "Verify All Amounts" | Verify Confirm modal |
| Verification | Click "Flag Discrepancy" | Flag Discrepancy modal |
| Verification | Click "Generate Report" | Report modal |

---

## 5. Authentication & Session

- Attorney authenticates via external auth provider (out of scope for this spec-kit).
- Session context provides: attorney name, initials, role (AT), firm name, assigned transaction IDs, unread notification count.
- Session persists across screen switches (single-page app model).
- No per-screen re-authentication required.

---

## 6. Design System

The portal uses a shared design token system defined in Foundation spec (000):

- **Colours**: 16 canonical tokens (primary-navy, primary-gold, accent-blue, semantic colours, neutral scale)
- **Typography**: Archivo (display/headings) + Manrope (body/UI)
- **Shadows**: 4 levels (sm, md, lg, xl)
- **Spacing**: Container max-width 1400px, 32px padding, 12px card radius
- **Components**: Buttons (primary, secondary, gold, success, danger), badges (success, warning, error, info, neutral), modals, cards, forms, tables, upload zones, verification panels

---

## 7. Integration Points

| Integration | Direction | Purpose |
|-------------|-----------|---------|
| Auth Provider | Inbound | Attorney identity and session token |
| Transaction API | Bidirectional | Read transactions, submit verifications |
| Document Store | Bidirectional | Review, approve, reject, upload documents |
| Activity Log | Outbound | Write audit events from all screens |
| Notification Service | Inbound | Unread count for notification bell |
| Agent Portal | Indirect | Shared transaction data (not direct integration) |
| Client Portal | Indirect | Shared transaction data (not direct integration) |
| Title Company API | Outbound | Share verification reports |
| Lender API | Bidirectional | Verify loan amounts, communicate with lenders |

---

## 8. Responsive Layout

| Breakpoint | Behaviour |
|-----------|-----------|
| ≥ 1200 px | Full multi-column layouts (4-column stats, 2-column content + sidebar) |
| 768 px – 1199 px | Reduced columns (stats 2-col, single-column content) |
| < 768 px | Single-column stack; nav hidden; reduced padding |

---

## 9. Security Model

- **Role-scoped access**: Attorney (AT) sees only transactions assigned to them.
- **Verification authority**: Only attorneys can verify closing amounts and approve/reject documents.
- **Audit trail**: All verifications, approvals, rejections, and flags produce immutable activity log entries.
- **Document access**: Attorneys can review all document types; upload limited to court orders, settlement agreements, and closing verifications.

---

**Version**: 1.0
**Last Updated**: April 12, 2026
