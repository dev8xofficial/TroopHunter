# Architecture Overview — Agent Portal

This document describes the high-level architecture of The Burkes Group Agent Portal, its screen structure, data flow, and integration points.

---

## 1. System Context

The Agent Portal is a **single-page web application** serving real estate agents at The Burkes Group. It is one half of a two-portal system:

- **Agent Portal** (this spec-kit): Used by agents to manage transactions, documents, clients, communications, calendar, partner referrals, and performance analytics.
- **Client Portal** (separate spec-kit): Used by homebuyers to track their purchase transaction.

Both portals share the same underlying transaction data and communicate through a shared backend. This spec-kit governs only the Agent Portal.

---

## 2. Portal Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AGENT PORTAL (SPA)                          │
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
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │   │
│  │  │ Clients  │  │ Messages │  │ Calendar │                  │   │
│  │  │  (004)   │  │  (005)   │  │  (006)   │                  │   │
│  │  └──────────┘  └──────────┘  └──────────┘                  │   │
│  │                                                              │   │
│  │  ┌──────────────────┐  ┌──────────┐                         │   │
│  │  │Partner Referrals │  │ Reports  │                         │   │
│  │  │     (007)        │  │  (008)   │                         │   │
│  │  └──────────────────┘  └──────────┘                         │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Modal Layer                              │   │
│  │  Transaction Detail │ New Transaction │ Add Client │        │   │
│  │  Update Stage       │ (more as needed)│            │        │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌──────────────┐
│  Auth       │    │   Backend API   │    │   Partner    │
│  Provider   │    │  (Transactions, │    │   Directory  │
│  (External) │    │   Documents,    │    │    Service   │
│             │    │   Activity Log) │    │              │
└─────────────┘    └─────────────────┘    └──────────────┘
```

---

## 3. Screen Inventory

| # | Screen | Route ID | Purpose | Primary Actions |
|---|--------|----------|---------|-----------------|
| 000 | Foundation | `—` | Global infrastructure (nav, tokens, auth, activity log) | N/A — consumed by all screens |
| 001 | Dashboard | `dashboard` | KPI command centre, quick upload, active transactions, activity feed | View transactions, upload agreements |
| 002 | Transactions | `transactions` | Full transaction list, stage management, filtering | Create transaction, update stage, view details |
| 003 | Documents | `documents` | Document upload, categorisation, assignment | Upload, view, download, filter |
| 004 | Clients | `clients` | Client profiles, contact info, transaction links | Add client, view transaction, send message |
| 005 | Messages | `messages` | Inbox, compose, multi-party communication | Read, compose, filter by sender type |
| 006 | Calendar | `calendar` | Appointments, today's agenda, upcoming events | Schedule appointment, view by day/week |
| 007 | Partner Referrals | `partners` | Partner directory, search, referral submission | Search, call, email, send referral |
| 008 | Reports | `reports` | Sales performance, pipeline, commission, area analytics | Generate reports, view KPIs |

---

## 4. Data Flow

### 4.1 Transaction Lifecycle

Transactions flow through 12 canonical stages (see constitution Section 4). The agent can:

1. **Create** transactions (via New Transaction modal on Transactions screen)
2. **View** transaction details (via View button on Dashboard or Transactions table)
3. **Submit stage updates** (via Update Stage modal — requires TC admin approval)
4. **Upload documents** against transactions (via Dashboard upload zone or Documents screen)

### 4.2 Activity Log

Every meaningful state change writes to the append-only activity log:

```
Agent Action → Activity Event Created → Dashboard Feed Updated
                                       → Notification Bell Updated
```

Event types include: transaction_created, stage_update_submitted, stage_update_approved, document_uploaded, client_created, message_sent, appointment_scheduled, referral_sent.

### 4.3 Cross-Screen Navigation

| From Screen | Action | Navigates To |
|-------------|--------|--------------|
| Dashboard | Click "View" on transaction row | Transaction Detail Modal |
| Dashboard | Click "View in Transactions" in modal | Transactions screen |
| Dashboard | Click "Message Client" in modal | Messages screen |
| Dashboard | Quick Action: Upload Agreement | Dashboard upload zone (scroll) |
| Dashboard | Quick Action: Add New Listing | Transactions screen |
| Dashboard | Quick Action: Create Offer | Transactions screen |
| Dashboard | Quick Action: Message Clients | Messages screen |
| Clients | Click "View Transaction" | Transaction Detail Modal |
| Clients | Click "Send Message" | Messages screen |
| Transactions | Click "View" on row | Transaction Detail Modal |
| Transactions | Click "Update Stage" on row | Update Stage Modal |
| Transaction Modal | Click "Upload Document" | Documents screen |

---

## 5. Authentication & Session

- Agent authenticates via external auth provider (out of scope for this spec-kit).
- Session context provides: agent name, initials, role (AG), brokerage name, active transaction IDs, unread notification count.
- Session persists across screen switches (single-page app model).
- No per-screen re-authentication required.

---

## 6. Design System

The portal uses a shared design token system defined in Foundation spec (000):

- **Colours**: 16 canonical tokens (primary-navy, primary-gold, accent-blue, semantic colours, neutral scale)
- **Typography**: Archivo (display/headings) + Manrope (body/UI)
- **Shadows**: 4 levels (sm, md, lg, xl)
- **Spacing**: Container max-width 1600px, 32px padding, 16px card radius
- **Components**: Buttons (primary, secondary, gold, table-action), badges (active, pending, completed), modals, cards, forms, tables, upload zones

---

## 7. Integration Points

| Integration | Direction | Purpose |
|-------------|-----------|---------|
| Auth Provider | Inbound | Agent identity and session token |
| Transaction API | Bidirectional | CRUD transactions, stage updates |
| Document Store | Bidirectional | Upload, retrieve, categorise documents |
| Message Service | Bidirectional | Send and receive messages |
| Calendar Service | Bidirectional | Create and query appointments |
| Partner Directory | Inbound | Search and retrieve partner profiles |
| Activity Log | Outbound | Write audit events from all screens |
| Notification Service | Inbound | Unread count for notification bell |
| Client Portal | Indirect | Shared transaction data (not direct integration) |

---

## 8. Responsive Layout

| Breakpoint | Behaviour |
|-----------|-----------|
| ≥ 1200 px | Full multi-column layouts (4-column stats, 2-column content + sidebar) |
| 768 px – 1199 px | Reduced columns (stats stack, single-column content) |
| < 768 px | Single-column stack; reduced padding; mobile-optimised nav |

---

## 9. Security Model

- **Role-scoped access**: Agent (AG) sees only their own transactions, clients, and messages.
- **Admin approval gate**: Stage updates submitted by the agent require TC approval before being applied.
- **Audit trail**: All state changes produce immutable activity log entries.
- **Document access**: Agents can upload Purchase & Sales agreements; other document types are role-scoped.

---

**Version**: 1.0
**Last Updated**: April 11, 2026
