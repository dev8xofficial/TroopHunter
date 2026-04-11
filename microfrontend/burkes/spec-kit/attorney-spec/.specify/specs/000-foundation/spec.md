# Feature Specification: Attorney Portal Foundation

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-12
**Screen / Module**: Global — applies to all screens

---

## Overview

The Foundation spec defines the shared infrastructure that every screen in The Burkes Group Attorney Portal depends on: authenticated attorney session context, top navigation, design system tokens, role model, activity logging, notification system, modal/overlay system, and the global layout shell. All feature specs (001–005) inherit and must not contradict the constraints defined here.

---

## Problem Statement

Without a well-defined foundation layer, individual screen specs risk defining conflicting navigation patterns, inconsistent role models, duplicated design decisions, and incompatible data vocabularies. The Foundation spec eliminates this drift by establishing one canonical reference for the Attorney Portal's shared infrastructure.

---

## Goals

- Define the authenticated attorney session model and how identity flows through every screen.
- Establish the canonical top navigation bar and screen routing contract.
- Document all design tokens (colours, typography, spacing, shadows, badges) so each screen spec can reference them by name.
- Define the global activity log contract that all screens write to.
- Define the notification system interface that all screens trigger.
- Define the modal/overlay system used by all screens.

---

## Non-Goals

- This spec does not define the authentication mechanism (sign-in, password reset) — that is a separate infrastructure concern.
- It does not define any per-screen content or business logic.

---

## Actors

| Actor                                | Role in Foundation                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| Closing Attorney (AT)                | Primary authenticated user; consumes all navigation, session context, and activity log |
| Admin / Transaction Coordinator (TC) | Portal administrator; may view attorney portal in oversight mode                       |

---

## User Scenarios

### Scenario 1 — Attorney Lands on Portal After Sign-In

**Actor**: Attorney (Sarah Mitchell)
**Precondition**: Attorney has authenticated via the external auth provider.
**Flow**:

1. Portal resolves the attorney's identity and active dashboard state from the session context.
2. Top navigation renders with all five screen links visible.
3. The Dashboard screen is shown as the default landing screen.
4. The user chip in the top-right shows the attorney's initials (SM) and name (Sarah Mitchell).
5. The notification bell shows a red dot if there are unread notifications.

**Success**: Attorney sees a personalised dashboard within 2 seconds of successful authentication, with their name and correct notification state.

---

### Scenario 2 — Attorney Navigates Between Screens

**Actor**: Attorney
**Precondition**: Attorney is on any screen.
**Flow**:

1. Attorney clicks a navigation button in the top bar.
2. The active nav button updates its visual state (white text on `primary-navy` background).
3. The target screen becomes visible; all other screens are hidden.
4. The viewport scrolls to the top of the new screen.
5. A fade-in animation plays on the new screen content.

**Success**: Screen transition is instantaneous; active state and scroll position are always correct.

---

## Functional Requirements

### FR-00-01 — Authenticated Session Context

The portal must make the following identity context available to every screen:

- Attorney full name and initials (reference: "Sarah Mitchell", initials "SM")
- Attorney role identifier (`AT`)
- Active firm name ("The Burkes Group")
- List of the attorney's assigned transaction IDs
- Unread notification count

### FR-00-02 — Top Navigation Bar

- The nav bar must be sticky (always visible at the top of the viewport while scrolling).
- Height: 72 px.
- Left section: Logo icon (44×44 px, `primary-navy` background, `primary-gold` text "B") + wordmark "The Burkes Group" in `font-display`.
- Centre section: Five navigation buttons in this order: Dashboard, Transactions, Documents, Clients, Verification.
- Right section: Notification bell (40×40 px rounded button) + User menu chip (attorney initials avatar + attorney name).
- Exactly one navigation button must be in the active state at all times (active = `primary-navy` background, white text, `border-radius: 8px`).
- Inactive nav items: `neutral-600` text; hover state: `neutral-100` background, `primary-navy` text.

### FR-00-03 — Notification Bell

- A red indicator dot (`error-red`, 8 px circle with 2 px white border) must be shown when one or more unread notifications exist.
- The bell button must display a hover state (`neutral-200` background).
- Reference implementation shows 🔔 emoji as the bell icon.

### FR-00-04 — User Menu Chip

- Displays as a rounded container (`neutral-100` background, `border-radius: 10px`, `padding: 8px 16px`).
- Inside: attorney avatar (36×36 px circle, `primary-navy` background, white initials, `font-size: 14px`, `font-weight: 600`) + attorney name ("Sarah Mitchell") at `font-size: 15px`, `font-weight: 600`.

### FR-00-05 — Design Token System

**Colour Tokens**

| Token Name       | Value     | Usage                                                           |
| ---------------- | --------- | --------------------------------------------------------------- |
| `primary-navy`   | `#1a3a52` | Primary actions, headings, active nav, card headers             |
| `primary-gold`   | `#fdb913` | Accent highlights, logo text, gold CTA buttons                  |
| `accent-blue`    | `#2d5a7b` | Hover states on primary buttons, transaction ID links           |
| `success-green`  | `#10b981` | Verified status badges, positive indicators, progress fills     |
| `warning-orange` | `#f59e0b` | Pending/needs verification badges, in-progress indicators       |
| `error-red`      | `#ef4444` | Errors, overdue items, notification dot, urgent badges          |
| `neutral-50`     | `#fafafa` | Page background, card interiors                                 |
| `neutral-100`    | `#f5f5f5` | Input backgrounds, user chip, hover states                      |
| `neutral-200`    | `#e5e5e5` | Borders, dividers                                               |
| `neutral-300`    | `#d4d4d4` | Upload zone border dashed                                       |
| `neutral-400`    | `#a3a3a3` | Placeholder text                                                |
| `neutral-500`    | `#737373` | Secondary text, timestamps, meta labels                         |
| `neutral-600`    | `#525252` | Body text secondary, inactive nav items                         |
| `neutral-700`    | `#404040` | Form labels                                                     |
| `neutral-800`    | `#262626` | Primary body text, activity titles                              |
| `neutral-900`    | `#171717` | Headings, client names                                          |

**Typography Tokens**

| Token          | Font    | Usage                                                      |
| -------------- | ------- | ---------------------------------------------------------- |
| `font-display` | Archivo | Page titles (30px/800), card titles (18px/700), stat values (34px/800), modal titles (20px/700) |
| `font-body`    | Manrope | Body text (14–15px), labels (12px/700), buttons (13px/700), inputs |

**Shadow Tokens**

| Token       | Value                              | Usage                   |
| ----------- | ---------------------------------- | ----------------------- |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`      | Nav bar, quiet surfaces |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)`  | Standard card elevation |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)`| Hovered cards           |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)`| Modals, overlays        |

### FR-00-06 — Status Badge System

| Badge Class    | Background | Text Colour | Usage                                               |
| -------------- | ---------- | ----------- | --------------------------------------------------- |
| `badge-success`| `#d1fae5`  | `#065f46`   | Verified, Approved, Completed                       |
| `badge-warning`| `#fef3c7`  | `#92400e`   | Needs Verification, In Progress, Needs Review       |
| `badge-error`  | `#fee2e2`  | `#991b1b`   | Urgent, Flagged, Overdue                            |
| `badge-info`   | `#dbeafe`  | `#1e40af`   | Under Review, In Progress (informational)           |
| `badge-neutral`| `neutral-100`| `neutral-700`| General count displays                             |

### FR-00-07 — Activity Log Contract

Every screen that writes a meaningful state change must emit an activity event with the following fields:

| Field         | Type     | Required | Description                                          |
| ------------- | -------- | -------- | ---------------------------------------------------- |
| `event_id`    | string   | Yes      | Unique identifier for the event                      |
| `event_type`  | string   | Yes      | Canonical event type (see constitution Section 11)   |
| `timestamp`   | datetime | Yes      | ISO 8601 timestamp                                   |
| `actor_role`  | string   | Yes      | One of: `AG`, `TC`, `CL`, `LN`, `AT`, `CP`           |
| `icon`        | string   | Yes      | Emoji icon (e.g., ✅, 📄, 🚩)                        |
| `label`       | string   | Yes      | Short human-readable event name                      |
| `description` | string   | Yes      | Full description text visible to attorney            |

### FR-00-08 — Button System

| Class           | Background       | Text            | Usage                                |
| --------------- | ---------------- | --------------- | ------------------------------------ |
| `.btn-primary`  | `primary-navy`   | white           | Primary CTA (Verify, Review)         |
| `.btn-secondary`| white            | `primary-navy`  | Cancel, secondary actions            |
| `.btn-gold`     | `primary-gold`   | `primary-navy`  | Featured CTA                         |
| `.btn-success`  | `success-green`  | white           | Verify, Approve                      |
| `.btn-danger`   | `error-red`      | white           | Flag, Reject                         |
| `.btn-sm`       | —                | —               | Small variant (6px 12px padding)     |

### FR-00-09 — Modal / Overlay System

- Overlay: `position: fixed`, full viewport, `rgba(0,0,0,0.45)` backdrop, `z-index: 500`.
- Modal container: `background: white`, `border-radius: 16px`, `max-width: 560px` (95vw cap), `max-height: 90vh`, scrollable body.
- Header: `padding: 24px`, title (20px/700 `primary-navy`), close button (32×32 px, ✕).
- Body: `padding: 24px`.
- Footer: `padding: 20px 24px`, right-aligned buttons.
- Clicking outside the modal (on the overlay) dismisses it.

### FR-00-10 — Page Layout Shell

- Container: `max-width: 1400px`, `margin: 0 auto`, `padding: 32px`.
- Page header: `margin-bottom: 28px`; page title `font-size: 30px`, `font-weight: 800`, `font-family: Archivo`, `color: primary-navy`.
- Two-column content layout: primary column (flex: 1) + sidebar (360px fixed); stacks vertically below 1200px.
- Page transition animation: `fadeIn` 0.25s ease.

---

## Data & State

| Field                        | Type   | Description                                      |
| ---------------------------- | ------ | ------------------------------------------------ |
| `attorney.name`              | string | Authenticated attorney full name ("Sarah Mitchell") |
| `attorney.initials`          | string | Two-letter initials ("SM")                       |
| `attorney.role`              | string | Always `AT` for this portal                      |
| `attorney.firm`              | string | "The Burkes Group"                               |
| `notifications.unread_count` | number | Count of unread notifications                    |
| `active_nav`                 | string | Current screen ID (e.g., "dashboard")            |

---

## Edge Cases & Error States

- **Session expires mid-session**: The portal must redirect to the authentication screen without data loss where possible.
- **Navigation to unknown route**: Redirect to Dashboard; log error.
- **Notification count overflows**: Cap display at "99+" to avoid layout breaks.

---

## Success Criteria

1. The top nav bar renders correctly on all five screen views with correct active state.
2. All design tokens are applied consistently across all screens — no raw hex values in implementation.
3. Every modal opens and closes correctly; clicking outside dismisses; no scroll lock remains after closing.
4. Activity log events are written for all meaningful actions across all five screens.
5. The notification dot appears and disappears correctly based on unread count.

---

## Dependencies

- **Required by**: All specs 001–005 inherit this foundation.
- **Depends on**: External authentication service (out of scope for this spec-kit).
