# Test Scenarios: Foundation (000)

## Overview

Foundation is the base layer — tests focus on **availability, rendering, responsiveness, security, and audit integrity**.

---

## 1. Navigation Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-01 | Nav bar renders on load | Load portal | Sticky top nav with logo, 6 screen buttons, notification bell, user chip visible | P0 |
| T-00-02 | Screen switching | Click each of 6 nav items | Correct screen displays; previous hidden; nav item shows active state | P0 |
| T-00-03 | Active state styling | Click "Users" nav item | "Users" has navy background + white text; others have transparent background | P0 |
| T-00-04 | Scroll-to-top on switch | Scroll down on Dashboard, click "Documents" | Documents screen starts at top | P1 |
| T-00-05 | Notification bell dot | Unread notifications exist | Red dot visible on bell icon | P1 |
| T-00-06 | User chip display | Authenticated as Sarah Burke | Shows "SB" initials + "Sarah Burke" text | P0 |

## 2. Design Token Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-07 | Primary navy usage | Inspect page title colour | Matches `#1a3a52` | P1 |
| T-00-08 | Typography enforcement | Inspect heading font | Archivo; body text: Manrope | P1 |
| T-00-09 | Card component | Inspect any card | White bg, 16px border-radius, shadow-md | P1 |
| T-00-10 | Badge variants | Inspect active/pending/completed/error badges | Correct colours and text for each variant | P1 |

## 3. Responsive Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-11 | Full width (≥1200px) | Resize to 1400px | Stat grid fills, 2-column content layout | P0 |
| T-00-12 | Tablet (768–1199px) | Resize to 900px | Stats stack to 2 columns, content single-column | P1 |
| T-00-13 | Mobile (<768px) | Resize to 375px | Single column stack, reduced padding | P1 |

## 4. Session Context Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-14 | Session persists | Navigate between screens | Admin remains authenticated; no re-login | P0 |
| T-00-15 | Session timeout | Leave portal idle for session TTL | Graceful redirect to login; no data loss | P1 |
| T-00-16 | Role context | Authenticate as TC | TC role reflected in session; admin-only actions hidden | P0 |

## 5. Audit Log Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-17 | Event creation | Approve a user account | Audit log event created with USER_CREATED action_type, actor_id, timestamp | P0 |
| T-00-18 | Event immutability | Attempt to modify existing event | Operation rejected; event remains unchanged | P0 |
| T-00-19 | Rejection reason | Reject a document without reason | Validation prevents the action; reason required | P0 |

## 6. Modal System Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-20 | Modal open | Click "+ Add New User" | Modal overlay appears with blur backdrop; form visible | P0 |
| T-00-21 | Modal close (X) | Click ✕ button | Modal closes; no scroll lock | P0 |
| T-00-22 | Modal close (overlay) | Click outside modal | Modal dismisses | P1 |
| T-00-23 | Modal close (ESC) | Press Escape key | Modal dismisses | P1 |

## 7. Accessibility Tests

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-00-24 | Keyboard navigation | Tab through all nav items and interactive elements | Logical focus order; visible focus indicators | P1 |
| T-00-25 | Screen reader | Navigate with screen reader | All nav items have accessible labels; landmarks identified | P1 |
| T-00-26 | Colour contrast | Audit all text/background combos | WCAG AA compliance (≥4.5:1 for normal text) | P1 |
