# Feature Specification: Portal Foundation

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-09
**Screen / Module**: Global — applies to all screens

---

## Overview

The Foundation spec defines the shared infrastructure that every screen in The Burkes Group Client Portal depends on: authentication context, top navigation, design system tokens, role model, activity logging, notification system, and the global layout shell. All feature specs (001–006) inherit and must not contradict the constraints defined here.

---

## Problem Statement

Without a well-defined foundation layer, individual screen specs risk defining conflicting navigation patterns, inconsistent role models, duplicated design decisions, and incompatible data vocabularies. The Foundation spec eliminates this drift by establishing one canonical reference.

---

## Goals

- Define the authenticated user session model and how identity flows through every screen.
- Establish the canonical top navigation bar and screen routing contract.
- Document all design tokens (colours, typography, spacing, shadows, badges) so each screen spec can reference them by name.
- Define the global activity log contract that all screens write to.
- Define the notification system interface that all screens trigger.

---

## Non-Goals

- This spec does not define the authentication mechanism (sign-in, password reset, SSO) — that is a separate infrastructure concern.
- It does not define any per-screen content or business logic.

---

## Actors

| Actor | Role in Foundation |
|-------|-------------------|
| All roles | Consume navigation, session context, design system, and activity log |
| Transaction Coordinator | Only role that can modify portal-wide settings and user access |

---

## User Scenarios

### Scenario 1 — Client Lands on the Portal After Sign-In

**Actor**: Client
**Precondition**: Client has authenticated via the external auth provider.
**Flow**:
1. Portal resolves the client's identity and active transaction from the session context.
2. Top navigation renders with all six screen links visible.
3. The Dashboard screen is shown as the default landing screen.
4. The user chip in the top-right shows the client's initials and first name.
5. The notification bell shows a red dot if there are unread notifications.

**Success**: Client sees a personalised dashboard within 2 seconds of successful authentication, with their name and correct notification state.

---

### Scenario 2 — Client Navigates Between Screens

**Actor**: Client
**Precondition**: Client is on any screen.
**Flow**:
1. Client clicks a navigation button in the top bar.
2. The active nav button updates its visual state.
3. The target screen becomes visible; all other screens are hidden.
4. The viewport scrolls to the top of the new screen.

**Success**: Screen transition is instantaneous; active state and scroll position are always correct.

---

### Scenario 3 — Activity Event Is Written

**Actor**: Any role (system-triggered)
**Precondition**: A meaningful state change has occurred (document uploaded, data saved, message sent, etc.).
**Flow**:
1. The originating feature writes an activity event with: label, icon, timestamp, description, and actor role.
2. The activity feed on the Dashboard reflects the new event within the same session.
3. The event persists across sessions.

**Success**: Every meaningful action in the portal produces a visible, timestamped activity entry that the client can read.

---

## Functional Requirements

### FR-00-01 — Authenticated Session Context

The portal must make the following identity context available to every screen without requiring re-authentication per screen:

- Client full name and initials
- Active transaction ID
- Client's role (`client`)
- List of assigned professional contacts (name, role, avatar colour)

### FR-00-02 — Top Navigation Bar

- The nav bar must be sticky (always visible at the top of the viewport while scrolling).
- It must contain: logo icon + wordmark on the left; six navigation buttons (Dashboard, Documents, Messages, Insurance, Mortgage, Services) in the centre; notification bell + user chip on the right.
- Exactly one navigation button must be in the active state at all times.
- Clicking an active nav button has no effect (no reload or flicker).
- On viewports below 768 px, the wordmark may be hidden but all six nav buttons must remain accessible (e.g., via overflow or icon-only mode).

### FR-00-03 — Notification Bell

- A red indicator dot must be shown on the bell when one or more unread notifications exist.
- Clicking the bell must surface a notification panel (design details deferred to a future notification spec).
- The dot must be removed once all notifications are marked read.

### FR-00-04 — User Chip

- Displays the logged-in client's initials in a styled avatar and their first name.
- Clicking the chip must surface account/session options (sign out, profile — deferred to auth spec).

### FR-00-05 — Design Token System

The following tokens are canonical. All screens must use these names, not raw hex values.

**Colour Tokens**

| Token Name | Value | Usage |
|-----------|-------|-------|
| `primary-navy` | `#1a3a52` | Primary actions, headings, active states |
| `primary-gold` | `#fdb913` | Accent highlights, in-progress indicators |
| `accent-blue` | `#2d5a7b` | Hover states, secondary links |
| `success-green` | `#10b981` | Completed status, positive indicators |
| `warning-orange` | `#f59e0b` | Pending/in-progress status |
| `error-red` | `#ef4444` | Errors, overdue items, notification dot |
| `neutral-50` through `neutral-800` | `#fafafa`–`#262626` | Surface, border, text hierarchy |

**Typography Tokens**

| Token | Font | Usage |
|-------|------|-------|
| `font-display` | Archivo | Page headings (h1–h3), card titles, stat values |
| `font-body` | Manrope | Body text, labels, buttons, inputs, all UI copy |

**Shadow Tokens**

| Token | Usage |
|-------|-------|
| `shadow-sm` | Subtle elevation (nav bar, quiet cards) |
| `shadow-md` | Standard card elevation |
| `shadow-lg` | Hovered / focused cards |
| `shadow-xl` | Modals, overlays |

### FR-00-06 — Badge System

All status badges across all screens must use the following canonical colour mappings:

| Badge Variant | Background | Text | Semantic Meaning |
|--------------|------------|------|-----------------|
| `bdg-green` | `#d1fae5` | `#065f46` | Complete / Approved |
| `bdg-yellow` | `#fef3c7` | `#92400e` | Pending / In Progress / Needs Review |
| `bdg-blue` | `#dbeafe` | `#1e40af` | Action Required (signature, input needed) |
| `bdg-red` | `#fee2e2` | `#991b1b` | Error / Overdue |
| `bdg-gray` | `neutral-100` | `neutral-600` | Not Started / Inactive |
| `bdg-navy` | `#e0eaf1` | `primary-navy` | Informational / Count |

### FR-00-07 — Alert Banner System

- **Warning variant** (amber left border): Used when client action is required. Must include a heading, description, and at least one navigation CTA button.
- **Info variant** (blue left border): Used for informational messages requiring no immediate action.
- Alert banners must appear at the top of screen content, below the nav bar.
- Multiple simultaneous alerts on one screen are allowed; they stack vertically.

### FR-00-08 — Card Component

All content panels must use the standard card:
- White background
- `12px` border-radius
- `shadow-md` by default; `shadow-lg` on hover where the card is interactive
- `1px` solid `neutral-200` border
- Optional card header (title + subtitle + right-aligned actions)
- Card body with `22px` padding (or `14px` for compact/sidebar cards)

### FR-00-09 — Role Colour System

Professional avatars and role indicators must consistently use:

| Role | Colour | Abbreviation |
|------|--------|-------------|
| Real Estate Agent | `#6366f1` (indigo) | SA (example) |
| Mortgage Lender | `#3b82f6` (blue) | JC (example) |
| Closing Attorney | `#7c3aed` (purple) | SM (example) |
| CPA / Tax Advisor | `#059669` (emerald) | DT (example) |
| Transaction Coordinator | `primary-gold` with `primary-navy` text | BG |
| Client | `success-green` | JS (example) |

### FR-00-10 — Activity Log Contract

Every screen that produces a state change must write an activity event containing:

- **label**: Short display label (e.g., "📄 New Document", "🛡️ Insurance Updated")
- **description**: Human-readable sentence describing the event
- **actor_role**: The role that triggered the event
- **timestamp**: ISO 8601 datetime
- **screen_source**: Which screen originated the event (dashboard / documents / messages / insurance / mortgage / services)

The activity feed on the Dashboard (spec 001) consumes these events and displays the six most recent.

### FR-00-11 — Responsive Layout Breakpoints

| Breakpoint | Behaviour |
|-----------|-----------|
| ≥ 1100 px | Full multi-column layouts (4-column stats, 2-column dash grid) |
| 768 px – 1099 px | Reduced columns (2-column stats, single-column dash grid) |
| < 768 px | Single-column stack; reduced horizontal padding (14 px); logo wordmark hidden |

### FR-00-12 — Screen Routing

The portal uses a single-page screen-switching model. Only one screen is active at a time. The active screen is determined by the navigation state. Routing must:

- Support direct navigation via in-screen CTA buttons (e.g., "Continue Mortgage" from Dashboard navigates to Mortgage screen).
- Preserve the correct active nav button state regardless of how navigation was triggered.
- Reset scroll position to top on every screen switch.

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `session.client_name` | string | Full name of the logged-in client |
| `session.client_initials` | string | Two-letter initials |
| `session.transaction_id` | string | Active transaction identifier |
| `session.unread_notification_count` | number | Drives the notification bell dot |
| `activity_log[]` | array | Ordered list of activity events (newest first) |
| `active_screen` | string | Current screen ID: dashboard / documents / messages / insurance / mortgage / services |

---

## Assumptions

1. Authentication is handled before the portal loads; the portal receives a valid session token and does not manage sign-in flows.
2. All six screens are always available in the nav; there is no permission-based hiding of nav items for the client role.
3. The activity log is an append-only feed; events are never edited or deleted.

---

## Success Criteria

1. Top navigation renders correctly on all supported breakpoints; no nav item is ever inaccessible.
2. Screen transitions complete without visible flicker or scroll-position residue.
3. Every state-change action in specs 001–006 produces a correctly formed activity log entry within the same user session.
4. All badge, colour, and typography tokens are applied consistently — zero visual divergence between screens when inspected side-by-side.

---

## Dependencies

- **Depends on**: External authentication system (out of scope)
- **Required by**: 001-dashboard, 002-documents, 003-messages, 004-insurance, 005-mortgage, 006-services
