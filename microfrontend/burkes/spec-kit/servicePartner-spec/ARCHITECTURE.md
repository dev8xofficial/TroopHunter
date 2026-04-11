# Architecture Overview — Service Partner Portal

This document describes the high-level architecture of The Burkes Group Service Partner Portal, its screen structure, data flow, and integration points.

---

## 1. System Context

The Service Partner Portal is a **single-page web application** serving home service providers within The Burkes Group ecosystem. It is part of a multi-portal system:

- **Agent Portal** (separate spec-kit): Used by real estate agents to manage transactions, documents, and partner referrals.
- **Service Partner Portal** (this spec-kit): Used by service partners to receive referrals, manage jobs, send quotes, track earnings, and maintain their company profile.
- **Client Portal** (separate spec-kit): Used by homebuyers to track their purchase transaction.
- **Admin Portal** (separate spec-kit): Used by platform administrators to manage partners, agents, and operations.

The Service Partner Portal receives referral data from the Agent Portal and communicates back through a shared backend. This spec-kit governs only the Service Partner Portal.

---

## 2. Portal Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                  SERVICE PARTNER PORTAL (SPA)                       │
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
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────┐               │   │
│  │  │Dashboard │  │Referrals │  │ Active Jobs  │               │   │
│  │  │  (001)   │  │  (002)   │  │    (003)     │               │   │
│  │  └──────────┘  └──────────┘  └─────────────┘               │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐              │   │
│  │  │ Quotes   │  │ Reviews  │  │Service Areas │              │   │
│  │  │  (004)   │  │  (005)   │  │    (006)     │              │   │
│  │  └──────────┘  └──────────┘  └──────────────┘              │   │
│  │                                                              │   │
│  │  ┌──────────┐  ┌──────────┐                                 │   │
│  │  │ Earnings │  │ Profile  │                                 │   │
│  │  │  (007)   │  │  (008)   │                                 │   │
│  │  └──────────┘  └──────────┘                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌──────────────┐
│  Auth       │    │   Backend API   │    │   Agent      │
│  Provider   │    │  (Referrals,    │    │   Portal     │
│  (External) │    │   Jobs, Quotes, │    │  (Referral   │
│             │    │   Payments)     │    │   Source)    │
└─────────────┘    └─────────────────┘    └──────────────┘
```

---

## 3. Screen Inventory

| # | Screen | Route ID | Purpose | Primary Actions |
|---|--------|----------|---------|-----------------| 
| 000 | Foundation | `—` | Global infrastructure (nav, tokens, auth, activity log) | N/A — consumed by all screens |
| 001 | Dashboard | `dashboard` | KPI command centre, new referrals, service areas, recent reviews | View referrals, quick actions |
| 002 | Referrals | `referrals` | Full referral list, status filtering, search | Respond, send quote, follow up |
| 003 | Active Jobs | `jobs` | Scheduled and in-progress job tracking | Contact client, reschedule, view details |
| 004 | Quotes | `quotes` | Quote creation form, sent quotes, statistics | Create quote, track acceptance |
| 005 | Reviews | `reviews` | Customer review listing, rating stats, responses | Read reviews, respond to reviews |
| 006 | Service Areas | `areas` | Active zip codes, recommended areas, management | Add area, pause area, view stats |
| 007 | Earnings | `earnings` | Revenue tracking, payment history, platform fees | View history, track payments |
| 008 | Profile | `profile` | Business info, service categories, notifications | Update profile, manage preferences |

---

## 4. Data Flow

### 4.1 Referral Lifecycle

Referrals flow through 6 canonical stages (see constitution Section 4). The service partner can:

1. **Receive** referrals from agents via the platform
2. **Respond** to referral requests (contact homeowner or provide quote)
3. **Submit quotes** with labor, materials, and estimated completion time
4. **Schedule** jobs once a quote is accepted
5. **Complete** jobs and submit for payment
6. **Receive payment** minus platform fee

### 4.2 Activity Log

Every meaningful state change writes to the append-only activity log:

```
Partner Action → Activity Event Created → Dashboard Feed Updated
                                         → Notification Bell Updated
```

Event types include: referral_received, referral_responded, quote_sent, quote_accepted, quote_declined, job_scheduled, job_completed, review_received, review_responded, service_area_added, service_area_paused, profile_updated, payment_received.

### 4.3 Cross-Screen Navigation

| From Screen | Action | Navigates To |
|-------------|--------|--------------| 
| Dashboard | Click referral card "View Details" | Referrals screen |
| Dashboard | Quick Action: View All Referrals | Referrals screen |
| Dashboard | Quick Action: Manage Service Areas | Service Areas screen |
| Dashboard | Quick Action: View Reviews | Reviews screen |
| Dashboard | Quick Action: Update Profile | Profile screen |
| Dashboard | Click referral "Provide Quote" | Quotes screen |
| Referrals | Click "Respond" on table row | Referral detail / Quote flow |
| Referrals | Click "Send Quote" | Quotes screen |
| Active Jobs | Click "Contact Client" | Contact flow |
| Quotes | Click "Send Quote to Homeowner" | Quote submission |

---

## 5. Authentication & Session

- Partner authenticates via external auth provider (out of scope for this spec-kit).
- Session context provides: partner company name, contact name, initials, role (SP), service categories, active service area zip codes, unread notification count.
- Session persists across screen switches (single-page app model).
- No per-screen re-authentication required.

---

## 6. Design System

The portal uses a shared design token system defined in Foundation spec (000):

- **Colours**: 16 canonical tokens (primary-navy, primary-gold, accent-blue, semantic colours, neutral scale)
- **Typography**: Archivo (display/headings) + Manrope (body/UI)
- **Shadows**: 4 levels (sm, md, lg, xl)
- **Spacing**: Container max-width 1600px, 32px padding, 16px card radius
- **Components**: Buttons (primary, secondary, gold, success, table-action), badges (new, contacted, quoted, scheduled, completed, declined, processing), cards, forms, tables, filter sections

---

## 7. Integration Points

| Integration | Direction | Purpose |
|-------------|-----------|---------|
| Auth Provider | Inbound | Partner identity and session token |
| Referral API | Inbound | Receive referrals from agent submissions |
| Quote API | Outbound | Submit quotes to homeowners |
| Job API | Bidirectional | Track job status and scheduling |
| Payment API | Inbound | Receive payment notifications and history |
| Review API | Inbound | Receive customer reviews |
| Profile API | Outbound | Update business info and service categories |
| Service Area API | Bidirectional | Manage zip code coverage |
| Activity Log | Outbound | Write audit events from all screens |
| Notification Service | Inbound | Unread count for notification bell |
| Agent Portal | Indirect | Shared referral data (not direct integration) |

---

## 8. Responsive Layout

| Breakpoint | Behaviour |
|-----------|-----------|
| ≥ 1200 px | Full multi-column layouts (4-column stats, 2-column content + sidebar) |
| 768 px – 1199 px | Reduced columns (stats stack, single-column content) |
| < 768 px | Single-column stack; reduced padding; mobile-optimised nav |

---

## 9. Security Model

- **Role-scoped access**: Service Partner (SP) sees only their own referrals, jobs, quotes, reviews, and earnings.
- **Admin oversight**: Platform administrators can view partner performance metrics and manage partner accounts.
- **Audit trail**: All state changes produce immutable activity log entries.
- **Profile verification**: License numbers, insurance policies, and coverage amounts are submitted for admin verification.

---

**Version**: 1.0
**Last Updated**: April 12, 2026
