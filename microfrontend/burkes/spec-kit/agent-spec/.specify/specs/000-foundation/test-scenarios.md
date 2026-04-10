# Test Scenarios: Foundation (000)

## Overview

Foundation is the base layer — tests focus on **availability, rendering, responsiveness, and security**.

---

## 1. Navigation Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-01 | Nav bar renders on load | Load portal | Sticky top nav with logo, 8 screen buttons, notification bell, user chip visible | P0 |
| T-00-02 | Screen switching | Click each of 8 nav items | Correct screen displays; previous hidden; nav item shows active state | P0 |
| T-00-03 | Active state styling | Click "Transactions" nav item | "Transactions" has navy background + white text; others have transparent background | P0 |
| T-00-04 | Scroll-to-top on switch | Scroll down on Dashboard, click "Documents" | Documents screen starts at top | P1 |
| T-00-05 | Notification bell dot | Unread notifications exist | Red dot visible on bell icon | P1 |
| T-00-06 | User chip display | Authenticated as Sarah Anderson | Shows "SA" initials + "Sarah Anderson" text | P0 |

## 2. Design Token Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-07 | Primary navy usage | Inspect page title colour | Matches `#1a3a52` | P1 |
| T-00-08 | Typography enforcement | Inspect heading font | Archivo; body text: Manrope | P1 |
| T-00-09 | Card component | Inspect any card | White bg, 16px border-radius, shadow-md, 1px neutral-200 border | P1 |
| T-00-10 | Badge variants | Inspect active/pending/completed badges | Correct colours and text for each variant | P1 |

## 3. Responsive Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-11 | Full width (≥1200px) | Resize to 1400px | 4-column stat grid, 2-column content layout | P0 |
| T-00-12 | Tablet (768–1199px) | Resize to 900px | Stats stack to 2 columns, content single-column | P1 |
| T-00-13 | Mobile (<768px) | Resize to 375px | Single column stack, reduced padding | P1 |

## 4. Session Context Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-14 | Session persists | Navigate between screens | User remains authenticated; no re-login | P0 |
| T-00-15 | Session timeout | Leave portal idle for session TTL | Graceful redirect to login; no data loss | P1 |

## 5. Activity Log Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-00-16 | Event creation | Upload a document | Activity log event created with correct event_type, timestamp, actor_role | P0 |
| T-00-17 | Event immutability | Attempt to modify existing event | Operation rejected; event remains unchanged | P0 |

## 6. Accessibility Tests

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-00-18 | Keyboard navigation | Tab through all nav items and interactive elements | Logical focus order; visible focus indicators | P1 |
| T-00-19 | Screen reader | Navigate with screen reader | All nav items have accessible labels; landmarks identified | P1 |
| T-00-20 | Colour contrast | Audit all text/background combos | WCAG AA compliance (≥4.5:1 for normal text) | P1 |
