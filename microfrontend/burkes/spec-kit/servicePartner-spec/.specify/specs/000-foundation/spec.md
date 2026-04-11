# Feature Specification: Foundation

> **Feature ID**: `000-foundation`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: None (root)
> **Screen / Module**: Global Infrastructure

---

## Overview

The Foundation specification defines the shared infrastructure layer consumed by all eight screens of The Burkes Group Service Partner Portal. It establishes the authenticated session context, the sticky top navigation bar with partner badge, the design token system for colours, typography, shadows, and spacing, the canonical status badge system used throughout the portal, and the append-only activity log contract that enforces audit-visible state changes across every screen.

---

## Problem Statement

Without a centralised foundation layer, each screen would independently define its navigation, colour system, typography, status badges, and session handling. This leads to inconsistent user experiences, duplicated design decisions, and maintenance overhead when design tokens change. Partners would encounter different button styles, badge colours, and navigation patterns across screens, eroding trust and increasing cognitive load. The foundation ensures a single, authoritative source for all shared infrastructure.

---

## Goals

- Define the global design token system (colours, typography, shadows, spacing) that all screens inherit
- Establish the sticky top navigation bar with 8 screen links, notification bell, partner badge, and user chip
- Define the authenticated session context (partner company name, contact name, role, service categories)
- Create the canonical badge system for referral/job/payment statuses
- Establish the append-only activity log event contract
- Define the button system (primary, secondary, gold, success, table-action variants)
- Set responsive breakpoint rules for all screen layouts

## Non-Goals

- Screen-specific content (handled by specs 001–008)
- Implementation details for authentication provider
- Backend API contract definitions
- Mobile native app considerations

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Authenticates, navigates between screens, views notifications |
| Admin | AD | Not directly visible; manages session tokens and partner verification status |

---

## User Scenarios

### Scenario 1: Partner Navigates Between Screens

- **Actor**: SP
- **Goal**: Switch from Dashboard to Referrals screen
- **Flow**:
  1. Partner views the Dashboard screen
  2. Partner clicks "Referrals" in the top navigation bar
  3. Dashboard content hides; Referrals content displays
  4. "Referrals" nav item shows active state (gold background)
- **Success**: Partner sees the Referrals screen with the nav bar indicating the active screen

### Scenario 2: Partner Views Notification Indicator

- **Actor**: SP
- **Goal**: Check if there are unread notifications
- **Flow**:
  1. Partner views any screen
  2. Partner looks at the notification bell icon in the nav bar
  3. If unread notifications exist, a red dot appears on the bell
- **Success**: Partner can see at a glance whether action is required

---

## Functional Requirements

### FR-00-01 — Navigation Bar Structure

The portal displays a sticky top navigation bar containing: (1) the Burkes Group logo with gold "SERVICE PARTNER" badge, (2) eight navigation buttons (Dashboard, Referrals, Active Jobs, Quotes, Reviews, Service Areas, Earnings, Profile), (3) a notification bell icon, and (4) a user chip showing the partner's initials and company name.

**Acceptance Criteria**:
- Nav bar remains fixed at the top during scrolling
- Exactly 8 navigation items are displayed
- Gold "SERVICE PARTNER" badge appears next to the logo
- Active screen's nav button has `primary-gold` background with `primary-navy` text
- Inactive nav buttons have white text on `primary-navy` background

### FR-00-02 — Design Token System

The portal uses a canonical set of design tokens for colours, typography, shadows, and spacing. All components reference tokens by name, never by raw hex/pixel values.

**Acceptance Criteria**:
- Colour tokens defined: `primary-navy`, `primary-gold`, `accent-blue`, `success-green`, `warning-orange`, `error-red`, plus neutral scale
- Typography: Archivo for headings/display, Manrope for body/UI
- Shadow tokens: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
- Spacing: Container max-width 1600px, 32px padding, 16px card border-radius

### FR-00-03 — Session Context

The portal maintains an authenticated session providing partner identity data to all screens.

**Acceptance Criteria**:
- Session provides: company_name, contact_name, initials, role (SP), service_categories, active_service_areas, unread_notification_count
- Session persists across screen switches (SPA model)
- No per-screen re-authentication required

### FR-00-04 — Badge System

The portal uses a canonical set of status badges across all screens. Badges have consistent colours and rounded styling.

**Acceptance Criteria**:
- Badge variants: `new` (blue), `contacted` (orange), `quoted` (blue), `scheduled` (blue), `completed` (green), `declined` (red), `processing` (orange), `paid` (green), `active` (green), `pending` (orange)
- All badges use `font-body`, 12px font size, 6px border-radius, bold weight

### FR-00-05 — Button System

The portal uses a canonical set of button variants with consistent styling.

**Acceptance Criteria**:
- Primary button: `primary-navy` background, white text, 10px border-radius
- Secondary button: white background, `primary-navy` text, `primary-navy` border
- Gold button: `primary-gold` background, `primary-navy` text
- Success button: `success-green` background, white text
- Table action button: Compact, `accent-blue` text, no background

### FR-00-06 — Responsive Layout Rules

The portal adapts its layout based on viewport width.

**Acceptance Criteria**:
- ≥ 1200px: Full multi-column layouts (4-column stat grids, 2-column content areas)
- 768px – 1199px: Reduced columns (2-column stat grids, single-column content)
- < 768px: Single-column stack, reduced padding, mobile-optimised navigation

### FR-00-07 — Activity Log Contract

Every meaningful state change across all screens produces an immutable activity log event.

**Acceptance Criteria**:
- Events follow the schema defined in `.specify/schemas/activity-log-event.json`
- Events are append-only (no updates, no deletes)
- Each event includes: event_id, referral_id, actor_role, event_type, timestamp, description, visibility
- Dashboard activity feed consumes events for display

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| company_name | string | Yes | max 100 chars | "Woodlands Plumbing Pro" |
| contact_name | string | Yes | max 100 chars | "Marcus Rivera" |
| initials | string | Yes | 2 uppercase letters | "MR" |
| role | string | Yes | enum: SP | "SP" |
| service_categories | array | Yes | min 1 item | ["Emergency Repairs", "Installations"] |
| active_service_areas | array | No | list of 5-digit zip codes | ["77380", "77381", "77382"] |
| unread_notification_count | number | Yes | min 0 | 3 |
| membership_type | string | Yes | enum: standard, premium, enterprise | "Premium Partner" |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| Session expires during navigation | Display re-authentication prompt; preserve current screen state |
| No service categories configured | Show banner on Dashboard: "Complete your profile to start receiving referrals" |
| Zero unread notifications | Notification bell displays without red dot indicator |
| Browser width below 320px | Minimum supported width; horizontal scrollbar permitted |

---

## Assumptions

1. The authentication provider is external and out of scope for this spec.
2. All portals (Agent, Service Partner, Client, Admin) share the same design token values.
3. The partner's session is established before any screen renders.

---

## Success Criteria

1. Navigation bar is visible and functional on all 8 screens with correct active state highlighting
2. Design tokens are referenced consistently — no raw hex values in any screen spec
3. Badge system renders correctly for all referral/job/payment status values
4. Activity log events follow the canonical schema on every state change
5. Session context provides all required fields to every screen

---

## Dependencies

**Depends on**:
- None (this is the root spec)

**Required by**:
- All specs (001–008)

**Cross-links**:
- [constitution.md](../../memory/constitution.md)

---

**Version**: 1.0
**Last Updated**: 2026-04-12
