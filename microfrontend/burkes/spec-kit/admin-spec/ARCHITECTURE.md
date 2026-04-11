# Architecture Overview — Admin Portal

This document describes the high-level architecture of The Burkes Group Admin Portal, its screen structure, data flow, and integration points.

---

## 1. System Context

The Admin Portal is a **single-page web application** serving Administrators and Transaction Coordinators (TCs) at The Burkes Group. It provides platform-wide oversight and management.

---

## 2. Portal Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        ADMIN PORTAL (SPA)                           │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                 Foundation Layer (000)                      │   │
│  │  ┌──────┐  ┌────────┐  ┌──────────┐  ┌─────────────────┐  │   │
│  │  │ Auth │  │Top Nav │  │  Design  │  │  Action Logs    │  │   │
│  │  │Context│  │  Bar   │  │  Tokens  │  │   Contract      │  │   │
│  │  └──────┘  └────────┘  └──────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Screen Layer                            │   │
│  │                                                             │   │
│  │  ┌──────────┐  ┌──────────────┐  ┌───────────┐             │   │
│  │  │Dashboard │  │    Users     │  │ Partners  │             │   │
│  │  │  (001)   │  │    (002)     │  │   (003)   │             │   │
│  │  └──────────┘  └──────────────┘  └───────────┘             │   │
│  │                                                             │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │   │
│  │  │ Trans-   │  │ Documents│  │ Analytics│                  │   │
│  │  │ actions  │  │  (005)   │  │  (006)   │                  │   │
│  │  │  (004)   │  └──────────┘  └──────────┘                  │   │
│  │  └──────────┘                                              │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                     Modal Layer                             │   │
│  │  Add User           │ View Details    │ Review Stage    │        │
│  │  Add Partner        │                 │ Update          │        │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌──────────────┐
│  Auth       │    │   Backend API   │    │  Analytics   │
│  Provider   │    │  (Users, Trx,   │    │   Engine     │
│  (External) │    │   Docs, Logs)   │    │              │
└─────────────┘    └─────────────────┘    └──────────────┘
```

---

## 3. Screen Inventory

| # | Screen | Route ID | Purpose | Primary Actions |
|---|--------|----------|---------|-----------------|
| 000 | Foundation | `—` | Global infrastructure (nav, tokens, auth, activity log) | N/A — consumed by all screens |
| 001 | Dashboard | `dashboard` | KPI command centre, recent activity, pending approvals, quick admin actions | View pending approvals, add users/partners |
| 002 | Users | `users` | Manage all user accounts, roles, permissions | Add user, deactivate user, reset password |
| 003 | Partners | `partners` | Service partner directory, approvals, zip code coverage | Approve partner, edit coverage |
| 004 | Transactions | `transactions` | All transactions across all clients, stage management | Approve stage updates, override stage |
| 005 | Documents | `documents` | Platform-wide document review, approval queue | Approve/reject document |
| 006 | Analytics | `analytics` | Revenue, user growth, transaction volume | View platform KPIs |

---

## 4. Data Flow & Integrations

The Admin portal interacts with the global API and writes to an immutable Audit Log for every action. Role-Gated operations guarantee only users with `ADMIN` and `TC` roles can issue commands or execute destructive writes.

---

**Version**: 1.0
**Last Updated**: April 11, 2026
