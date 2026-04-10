# Test Scenarios: Calendar (06)

## Overview

Calendar view with today/upcoming appointments and Schedule Appointment form.

---

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-06-01 | Page loads correctly | Navigate to Calendar | Page header, subtitle, and all components render | P0 |
| T-06-02 | Responsive layout | Resize to 768px | Layout collapses to single column | P1 |
| T-06-03 | Mobile layout | Resize to 375px | All content accessible via scroll | P1 |

## Functional Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-06-04 | Primary action | Perform main feature action | Action completes successfully; activity log event created | P0 |
| T-06-05 | Filter/search | Apply filters or enter search term | Results update correctly and quickly | P0 |
| T-06-06 | Empty state | No data available | Appropriate empty state message displayed | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-06-07 | Network error during action | Graceful error message; no data loss; retry option | P0 |
| T-06-08 | Session expired mid-action | Redirect to login; work-in-progress preserved if possible | P1 |
| T-06-09 | Concurrent modifications | Data consistency maintained; latest version wins | P1 |

## Accessibility Tests

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-06-10 | Keyboard navigation | All interactive elements reachable via Tab; logical order | P1 |
| T-06-11 | Screen reader | Semantic HTML; ARIA labels on all controls and status indicators | P1 |
| T-06-12 | Colour contrast | WCAG AA compliance (minimum 4.5:1 for text) | P1 |
