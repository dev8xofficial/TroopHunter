# Feature Specification: Agent Portal Foundation

**Feature ID**: 000-foundation
**Status**: approved
**Created**: 2026-04-11
**Screen / Module**: Global — applies to all screens

---

## Overview

The Foundation spec defines the shared infrastructure that every screen in The Burkes Group Agent Portal depends on: authenticated agent session context, top navigation, design system tokens, role model, activity logging, notification system, and the global layout shell. All feature specs (001–008) inherit and must not contradict the constraints defined here.

---

## Problem Statement

Without a well-defined foundation layer, individual screen specs risk defining conflicting navigation patterns, inconsistent role models, duplicated design decisions, and incompatible data vocabularies. The Foundation spec eliminates this drift by establishing one canonical reference.

---

## Goals

- Define the authenticated agent session model and how identity flows through every screen.
- Establish the canonical top navigation bar and screen routing contract.
- Document all design tokens (colours, typography, spacing, shadows, badges) so each screen spec can reference them by name.
- Define the global activity log contract that all screens write to.
- Define the notification system interface that all screens trigger.

---

## Non-Goals

- This spec does not define the authentication mechanism (sign-in, password reset) — that is a separate infrastructure concern.
- It does not define any per-screen content or business logic.

---

## Actors

| Actor                                | Role in Foundation                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| Real Estate Agent (AG)               | Primary authenticated user; consumes all navigation, session context, and activity log |
| Admin / Transaction Coordinator (TC) | Approves stage updates submitted by agents; portal administrator                       |

---

## User Scenarios

### Scenario 1 — Agent Lands on Portal After Sign-In

**Actor**: Agent (Sarah Anderson)
**Precondition**: Agent has authenticated via the external auth provider.
**Flow**:

1. Portal resolves the agent's identity and active dashboard state from the session context.
2. Top navigation renders with all eight screen links visible.
3. The Dashboard screen is shown as the default landing screen.
4. The user chip in the top-right shows the agent's initials (SA) and first name (Sarah Anderson).
5. The notification bell shows a red dot if there are unread notifications.

**Success**: Agent sees a personalised dashboard within 2 seconds of successful authentication, with their name and correct notification state.

---

### Scenario 2 — Agent Navigates Between Screens

**Actor**: Agent
**Precondition**: Agent is on any screen.
**Flow**:

1. Agent clicks a navigation button in the top bar.
2. The active nav button updates its visual state (white text on `primary-navy` background).
3. The target screen becomes visible; all other screens are hidden.
4. The viewport scrolls to the top of the new screen.

**Success**: Screen transition is instantaneous; active state and scroll position are always correct.

---

### Scenario 3 — Activity Event Is Written

**Actor**: Agent (system-triggered)
**Precondition**: A meaningful state change has occurred (document uploaded, client created, stage update submitted, referral sent, appointment scheduled).
**Flow**:

1. The originating feature writes an activity event with: label, icon, timestamp, description, and actor role.
2. The activity feed on the Dashboard reflects the new event within the same session.
3. The event persists across sessions.

**Success**: Every meaningful action in the portal produces a visible, timestamped activity entry.

---

## Functional Requirements

### FR-00-01 — Authenticated Session Context

The portal must make the following identity context available to every screen:

- Agent full name and initials (reference: "Sarah Anderson", initials "SA")
- Agent role identifier (`AG`)
- Active brokerage name ("The Burkes Group")
- List of the agent's active transaction IDs
- Unread notification count

### FR-00-02 — Top Navigation Bar

- The nav bar must be sticky (always visible at the top of the viewport while scrolling).
- Height: 72 px.
- Left section: Logo icon (44×44 px, `primary-navy` background, `primary-gold` text "B") + wordmark "The Burkes Group" in `font-display`.
- Centre section: Eight navigation buttons in this order: Dashboard, Transactions, Documents, Clients, Messages, Calendar, Partner Referrals, Reports.
- Right section: Notification bell (40×40 px rounded button) + User menu chip (agent initials avatar + agent name).
- Exactly one navigation button must be in the active state at all times (active = `primary-navy` background, white text, `border-radius: 8px`).
- Inactive nav items: `neutral-600` text; hover state: `neutral-100` background, `primary-navy` text.
- Clicking an active nav button has no effect (no reload or flicker).

### FR-00-03 — Notification Bell

- A red indicator dot (`error-red`, 8 px circle with 2 px white border) must be shown when one or more unread notifications exist.
- The bell button must display a hover state (`neutral-200` background).
- Reference implementation shows 🔔 emoji as the bell icon.

### FR-00-04 — User Menu Chip

- Displays as a rounded container (`neutral-100` background, `border-radius: 10px`, `padding: 8px 16px`).
- Inside: agent avatar (36×36 px circle, `primary-navy` background, white initials, `font-size: 14px`, `font-weight: 600`) + agent name ("Sarah Anderson") at `font-size: 15px`, `font-weight: 600`.

### FR-00-05 — Design Token System

**Colour Tokens**

| Token Name       | Value     | Usage                                                           |
| ---------------- | --------- | --------------------------------------------------------------- |
| `primary-navy`   | `#1a3a52` | Primary actions, headings, active nav, card headers             |
| `primary-gold`   | `#fdb913` | Accent highlights, logo text, featured badges, gold CTA buttons |
| `accent-blue`    | `#2d5a7b` | Hover states on primary buttons, transaction ID links           |
| `success-green`  | `#10b981` | Completed status badges, positive indicators, progress fills    |
| `warning-orange` | `#f59e0b` | Pending/delayed status badges, in-progress indicators           |
| `error-red`      | `#ef4444` | Errors, overdue items, notification dot                         |
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

Badges are used throughout all screens to communicate transaction and document status. They must render as inline-flex elements with `padding: 5px 11px`, `border-radius: 6px`, `font-size: 11px`, `font-weight: 700`.

| Badge Class | Background | Text Colour | Usage                                               |
| ----------- | ---------- | ----------- | --------------------------------------------------- |
| `active`    | `#d1fae5`  | `#065f46`   | On Track, Closing Soon, Approved, active stages     |
| `pending`   | `#fef3c7`  | `#92400e`   | Delayed, Under Review, Needs Review, pending stages |
| `completed` | `#dbeafe`  | `#1e40af`   | Completed transactions and documents                |

### FR-00-07 — Activity Log Contract

Every screen that writes a meaningful state change must emit an activity event with the following fields:

| Field         | Type     | Required | Description                                          |
| ------------- | -------- | -------- | ---------------------------------------------------- |
| `event_id`    | string   | Yes      | Unique identifier for the event                      |
| `event_type`  | string   | Yes      | Canonical event type (see Section 8 of constitution) |
| `timestamp`   | datetime | Yes      | ISO 8601 timestamp                                   |
| `actor_role`  | string   | Yes      | One of: `AG`, `TC`, `CL`, `LN`, `AT`, `CP`           |
| `icon`        | string   | Yes      | Emoji icon (e.g., ✅, 📄, 🏡)                        |
| `label`       | string   | Yes      | Short human-readable event name                      |
| `description` | string   | Yes      | Full description text visible to agent               |

### FR-00-08 — Button System

| Class                         | Background     | Text           | Padding     | Usage                                |
| ----------------------------- | -------------- | -------------- | ----------- | ------------------------------------ |
| `.btn-primary`                | `primary-navy` | white          | `14px 28px` | Primary CTA (Upload, Create, Submit) |
| `.btn-secondary`              | `neutral-100`  | `neutral-700`  | `14px 28px` | Cancel, secondary actions            |
| `.btn-gold`                   | `primary-gold` | `primary-navy` | `14px 28px` | Featured CTA (Send Referral)         |
| `.table-action-btn`           | `primary-navy` | white          | `6px 12px`  | Table row View action                |
| `.table-action-btn.secondary` | white          | `primary-navy` | `6px 12px`  | Table row for completed items        |
| `.table-action-btn.stage`     | white          | `accent-blue`  | `6px 12px`  | Update Stage action in tables        |

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
| `agent.name`                 | string | Authenticated agent full name ("Sarah Anderson") |
| `agent.initials`             | string | Two-letter initials ("SA")                       |
| `agent.role`                 | string | Always `AG` for this portal                      |
| `agent.brokerage`            | string | "The Burkes Group"                               |
| `notifications.unread_count` | number | Count of unread notifications                    |
| `active_nav`                 | string | Current screen ID (e.g., "dashboard")            |

---

## Edge Cases & Error States

- **Session expires mid-session**: The portal must redirect to the authentication screen without data loss where possible.
- **Navigation to unknown route**: Redirect to Dashboard; log error.
- **Notification count overflows**: Cap display at "99+" to avoid layout breaks.

---

## Success Criteria

1. The top nav bar renders correctly on all eight screen views with correct active state.
2. All design tokens are applied consistently across all screens — no raw hex values in implementation.
3. Every modal opens and closes correctly; clicking outside dismisses; no scroll lock remains after closing.
4. Activity log events are written for all meaningful actions across all eight screens.
5. The notification dot appears and disappears correctly based on unread count.

---

## Dependencies

- **Required by**: All specs 001–008 inherit this foundation.
- **Depends on**: External authentication service (out of scope for this spec-kit).
