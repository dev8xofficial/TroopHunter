# Feature Specification: Admin Portal Foundation

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-11
**Screen / Module**: Global — applies to all admin screens

---

## Overview

The Foundation spec defines the shared infrastructure that every screen in The Burkes Group Admin Portal depends on: authenticated admin session context, top navigation, design system tokens, admin role model, audit logging, notification system, and the global layout shell. All feature specs (001–006) inherit and must not contradict the constraints defined here.

---

## Problem Statement

Without a well-defined foundation layer, individual screen specs risk defining conflicting navigation patterns, inconsistent role models, duplicated design decisions, and incompatible data vocabularies. The Foundation spec eliminates this drift by establishing one canonical reference for the Admin Portal.

---

## Goals

- Define the authenticated admin session model and how identity flows through every screen.
- Establish the canonical top navigation bar and screen routing contract.
- Document all design tokens (colours, typography, spacing, shadows, badges) so each screen spec can reference them by name.
- Define the global audit log contract that all screens write to.
- Define the notification system interface that all screens trigger.

---

## Non-Goals

- This spec does not define the authentication mechanism (sign-in, password reset) — that is a separate infrastructure concern.
- It does not define any per-screen content or business logic.
- Agent Portal foundation is defined separately in the agent-spec.

---

## Actors

| Actor                                | Role in Foundation                                                                              |
| ------------------------------------ | ----------------------------------------------------------------------------------------------- |
| System Administrator (ADMIN)         | Primary authenticated user; full platform control, user management, partner management          |
| Transaction Coordinator (TC)         | Secondary admin role; consumes navigation, approves transactions, reviews documents              |

---

## User Scenarios

### Scenario 1 — Admin Lands on Portal After Sign-In

**Actor**: Administrator (Sarah Burke)
**Precondition**: Admin has authenticated via the external auth provider.
**Flow**:

1. Portal resolves the admin's identity and active dashboard state from the session context.
2. Top navigation renders with all six screen links visible.
3. The Dashboard screen is shown as the default landing screen.
4. The user chip in the top-right shows the admin's initials (SB) and name (Sarah Burke).
5. The notification bell shows a red dot if there are unread notifications.

**Success**: Admin sees a personalised dashboard within 2 seconds of successful authentication, with their name and correct notification state.

---

### Scenario 2 — Admin Navigates Between Screens

**Actor**: Administrator
**Precondition**: Admin is on any screen.
**Flow**:

1. Admin clicks a navigation button in the top bar.
2. The active nav button updates its visual state (white text on `primary-navy` background).
3. The target screen becomes visible; all other screens are hidden.
4. The viewport scrolls to the top of the new screen.

**Success**: Screen transition is instantaneous; active state and scroll position are always correct.

---

### Scenario 3 — Audit Event Is Written

**Actor**: Administrator (system-triggered)
**Precondition**: A meaningful state change has occurred (user approved, document reviewed, partner activated, transaction created).
**Flow**:

1. The originating feature writes an audit event with: action_type, actor_id, target_entity_id, timestamp, and reason_text (if applicable).
2. The activity feed on the Dashboard reflects the new event within the same session.
3. The event persists immutably across sessions.

**Success**: Every meaningful admin action produces a visible, timestamped, immutable audit entry.

---

## Functional Requirements

### FR-00-01 — Authenticated Session Context

The portal must make the following identity context available to every screen:

- Admin full name and initials (reference: "Sarah Burke", initials "SB")
- Admin role identifier (`ADMIN` or `TC`)
- Active organisation name ("The Burkes Group")
- Pending approval counts (documents, partners, users)
- Unread notification count

### FR-00-02 — Top Navigation Bar

- The nav bar must be sticky (always visible at the top of the viewport while scrolling).
- Height: 72 px.
- Left section: Logo icon (44×44 px, `primary-navy` background, `primary-gold` text "B") + wordmark "The Burkes Group" in `font-display`.
- Centre section: Six navigation buttons in this order: Dashboard, Users, Partners, Transactions, Documents, Analytics.
- Right section: Notification bell (40×40 px rounded button) + User menu chip (admin initials avatar + admin name).
- Exactly one navigation button must be in the active state at all times (active = `primary-navy` background, white text, `border-radius: 8px`).
- Inactive nav items: `neutral-600` text; hover state: `neutral-100` background, `primary-navy` text.
- Clicking an active nav button has no effect (no reload or flicker).

### FR-00-03 — Notification Bell

- A red indicator dot (`error-red`, 8 px circle with 2 px white border) must be shown when one or more unread notifications exist.
- The bell button must display a hover state (`neutral-200` background).
- Reference implementation shows 🔔 emoji as the bell icon.

### FR-00-04 — User Menu Chip

- Displays as a rounded container (`neutral-100` background, `border-radius: 10px`, `padding: 8px 16px`).
- Inside: admin avatar (36×36 px circle, `primary-navy` background, white initials, `font-size: 14px`, `font-weight: 600`) + admin name ("Sarah Burke") at `font-size: 15px`, `font-weight: 600`.

### FR-00-05 — Design Token System

**Colour Tokens**

| Token Name       | Value     | Usage                                                           |
| ---------------- | --------- | --------------------------------------------------------------- |
| `primary-navy`   | `#1a3a52` | Primary actions, headings, active nav, card headers             |
| `primary-gold`   | `#fdb913` | Accent highlights, logo text, featured badges, gold CTA buttons |
| `accent-blue`    | `#2d5a7b` | Hover states on primary buttons, transaction ID links           |
| `success-green`  | `#10b981` | Completed status badges, positive indicators, progress fills    |
| `warning-orange` | `#f59e0b` | Pending/delayed status badges, in-progress indicators           |
| `error-red`      | `#ef4444` | Errors, overdue items, notification dot, reject actions         |
| `neutral-50`     | `#fafafa` | Page background, card interiors                                 |
| `neutral-100`    | `#f5f5f5` | Input backgrounds, user chip, hover states                      |
| `neutral-200`    | `#e5e5e5` | Borders, dividers, progress bar backgrounds                     |
| `neutral-300`    | `#d4d4d4` | Upload zone border dashed                                       |
| `neutral-400`    | `#a3a3a3` | Placeholder text, search icon, notification bell                |
| `neutral-500`    | `#737373` | Secondary text, timestamps, meta labels                         |
| `neutral-600`    | `#525252` | Body text secondary, inactive nav items                         |
| `neutral-700`    | `#404040` | Form labels, secondary body text                                |
| `neutral-800`    | `#262626` | Primary body text, activity titles                              |
| `neutral-900`    | `#171717` | Headings, client names, high-contrast text                      |

**Typography Tokens**

| Token          | Font    | Usage                                                                                           |
| -------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `font-display` | Archivo | Page titles (32px/700), card titles (22px/700), stat values (36px/700), modal titles (28px/700) |
| `font-body`    | Manrope | Body text (14–16px), labels (14px/600), buttons (15px/600), inputs, descriptions                |

**Shadow Tokens**

| Token       | Value                              | Usage                   |
| ----------- | ---------------------------------- | ----------------------- |
| `shadow-sm` | `0 1px 2px 0 rgba(0,0,0,0.05)`     | Nav bar, quiet surfaces |
| `shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1)`   | Standard card elevation |
| `shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1)` | Hovered cards           |
| `shadow-xl` | `0 20px 25px -5px rgba(0,0,0,0.1)` | Modals, overlays        |

**Spacing & Shape Tokens**

| Token                | Value  | Usage                              |
| -------------------- | ------ | ---------------------------------- |
| Container max-width  | 1600px | Main content wrapper               |
| Container padding    | 32px   | Left/right page margin             |
| Card border-radius   | 16px   | All `.card` and `.table-container` |
| Button border-radius | 10px   | Primary, secondary, gold buttons   |
| Badge border-radius  | 6px    | All status badges                  |
| Input border-radius  | 8px    | Form inputs and selects            |

### FR-00-06 — Status Badge System

Badges are used throughout all screens to communicate entity status. They must render as inline-flex elements with `padding: 5px 11px`, `border-radius: 6px`, `font-size: 11px`, `font-weight: 700`.

| Badge Class | Background | Text Colour | Usage                                                     |
| ----------- | ---------- | ----------- | --------------------------------------------------------- |
| `active`    | `#d1fae5`  | `#065f46`   | Active accounts, approved docs, on-track transactions     |
| `pending`   | `#fef3c7`  | `#92400e`   | Pending approval, under review, closing soon              |
| `completed` | `#dbeafe`  | `#1e40af`   | Completed transactions, processed items                   |
| `error`     | `#fee2e2`  | `#991b1b`   | Suspended accounts, rejected documents, needs review      |

### FR-00-07 — Audit Log Contract

Every screen that writes a meaningful state change must emit an audit event with the following fields:

| Field              | Type     | Required | Description                                                    |
| ------------------ | -------- | -------- | -------------------------------------------------------------- |
| `log_id`           | string   | Yes      | Unique identifier for the action log                           |
| `action_type`      | string   | Yes      | Canonical action (USER_CREATED, DOCUMENT_APPROVED, etc.)       |
| `actor_id`         | string   | Yes      | Admin/TC user ID performing the action                         |
| `target_entity_id` | string   | Yes      | ID of affected User, Partner, Document, or Transaction         |
| `timestamp`        | datetime | Yes      | ISO 8601 timestamp                                             |
| `reason_text`      | string   | No       | Mandatory for rejections and overrides; optional for approvals |

### FR-00-08 — Button System

| Class                         | Background     | Text           | Padding     | Usage                                   |
| ----------------------------- | -------------- | -------------- | ----------- | --------------------------------------- |
| `.btn-primary`                | `primary-navy` | white          | `14px 28px` | Primary CTA (Create, Approve, Submit)   |
| `.btn-secondary`              | `neutral-100`  | `neutral-700`  | `14px 28px` | Cancel, secondary actions, Apply Filter |
| `.btn-gold`                   | `primary-gold` | `primary-navy` | `14px 28px` | Featured CTA (Generate Report)          |
| `.table-action-btn`           | `primary-navy` | white          | `6px 12px`  | Table row View/Edit action              |
| `.table-action-btn.secondary` | white          | `primary-navy` | `6px 12px`  | Table row secondary action              |
| `.tbl-btn-success`            | `success-green`| white          | `6px 12px`  | Approve action (documents, partners)    |
| `.tbl-btn-danger`             | white          | `error-red`    | `6px 12px`  | Reject action (red border + text)       |

### FR-00-09 — Modal / Overlay System

All data-entry forms open in overlay modals following this structure:

- Overlay: `position: fixed`, full viewport, `rgba(0,0,0,0.5)` backdrop with `backdrop-filter: blur(4px)`, `z-index: 10000`.
- Modal container: `background: white`, `border-radius: 16px`, `max-width: 900px` (600px for compact modals), `max-height: 90vh`, scrollable body.
- Header section: `padding: 32px 32px 24px`, title (24px/700 `primary-navy`), subtitle (14px `neutral-600`), close button (✕, `font-size: 28px`).
- Body section: `padding: 32px`, scrollable.
- Footer section: `padding: 24px 32px`, `neutral-50` background, right-aligned buttons.
- Clicking outside the modal (on the overlay) dismisses it.
- ESC key must dismiss the modal (implementation note).

### FR-00-10 — Form Section Pattern

Inside modals, related form fields are grouped into sections:

- Section title: 16px/700 `primary-navy`, emoji prefix icon, bottom margin 20px.
- Form row variants: `form-row-2` (two columns), `form-row-3` (three columns), collapses to 1 column below 768 px.
- Required field indicator: `*` in `error-red` after the label.
- Help text: 13px `neutral-600`, displayed below the input.

### FR-00-11 — Page Layout Shell

Every screen must use:

- Container: `max-width: 1600px`, `margin: 0 auto`, `padding: 32px`.
- Page header: `margin-bottom: 32px`; page title `font-size: 32px`, `font-weight: 700`, `font-family: Archivo`, `color: primary-navy`; page subtitle `font-size: 16px`, `color: neutral-600`.
- Two-column content layout: primary column (flex: 1) + sidebar (380px fixed); stacks vertically below 1200px.

---

## Data & State

| Field                        | Type   | Description                                      |
| ---------------------------- | ------ | ------------------------------------------------ |
| `admin.name`                 | string | Authenticated admin full name ("Sarah Burke")    |
| `admin.initials`             | string | Two-letter initials ("SB")                       |
| `admin.role`                 | string | `ADMIN` or `TC` for this portal                  |
| `admin.organisation`         | string | "The Burkes Group"                               |
| `notifications.unread_count` | number | Count of unread notifications                    |
| `active_nav`                 | string | Current screen ID (e.g., "dashboard")            |
| `pending.documents`          | number | Count of documents awaiting review               |
| `pending.partners`           | number | Count of partner applications pending            |
| `pending.users`              | number | Count of user registrations pending              |

---

## Edge Cases & Error States

- **Session expires mid-session**: The portal must redirect to the authentication screen without data loss where possible.
- **Navigation to unknown route**: Redirect to Dashboard; log error.
- **Notification count overflows**: Cap display at "99+" to avoid layout breaks.
- **Admin with TC role attempts admin-only action**: Show "Insufficient permissions" error.

---

## Success Criteria

1. The top nav bar renders correctly on all six screen views with correct active state.
2. All design tokens are applied consistently across all screens — no raw hex values in implementation.
3. Every modal opens and closes correctly; clicking outside dismisses; no scroll lock remains after closing.
4. Audit log events are written for all meaningful actions across all six screens.
5. The notification dot appears and disappears correctly based on unread count.

---

## Dependencies

- **Required by**: All specs 001–006 inherit this foundation.
- **Depends on**: External authentication service (out of scope for this spec-kit).
