# Feature Specification: Customer Reviews

> **Feature ID**: `005-reviews`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Reviews

---

## Overview

The Reviews screen provides the service partner with a centralised view of all customer reviews, rating statistics, and response management tools. It displays three KPI cards (Overall Rating, Total Reviews, Response Rate), followed by individual review cards showing the reviewer's name, star rating, date, review text, and the partner's response (if any). Partners can respond to reviews that haven't been addressed yet, helping maintain high response rates and strong customer relationships.

---

## Problem Statement

Customer reviews are a critical factor in the partner's reputation and referral flow. Without a dedicated reviews screen, partners must check multiple platforms or wait for email notifications to see feedback. They have no aggregated rating data and no easy way to respond to reviews. This leads to low response rates, missed positive feedback opportunities, and slow response to negative reviews. The Reviews screen centralises all review activity in one place.

---

## Goals

- Display aggregate review KPIs (rating, count, response rate)
- Show individual review cards with star ratings and text
- Enable partners to respond to reviews directly
- Track response rate to encourage timely responses

## Non-Goals

- Requesting reviews from clients
- Review moderation or dispute resolution
- Review analytics trends over time

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Views reviews, responds to reviews |
| Client | CL | Submits reviews after job completion (indirect) |

---

## User Scenarios

### Scenario 1: Partner Reviews Ratings

- **Actor**: SP
- **Goal**: Check overall rating and recent feedback
- **Flow**:
  1. Partner navigates to Reviews screen
  2. Partner views 3 KPI cards: Overall Rating (4.8), Total Reviews (14), Response Rate (100%)
  3. Partner scrolls through review cards
- **Success**: Partner understands their reputation status

### Scenario 2: Partner Responds to a Review

- **Actor**: SP
- **Goal**: Respond to a customer review
- **Flow**:
  1. Partner sees a review without a response
  2. Partner clicks "Respond to Review"
  3. Partner types response
  4. Response is saved and displayed under the review
- **Success**: Review now shows partner's response; response rate maintained

---

## Functional Requirements

### FR-05-01 — Review Statistics KPI Cards

The Reviews screen displays 3 KPI stat cards at the top.

**Acceptance Criteria**:
- Card 1: "Overall Rating" — value with star icon (e.g., 4.8 ⭐)
- Card 2: "Total Reviews" — count (e.g., 14)
- Card 3: "Response Rate" — percentage (e.g., 100%)
- Cards display in a 3-column grid at ≥ 1200px, stacking at smaller widths

### FR-05-02 — Review Cards

The screen displays individual review cards sorted by most recent.

**Acceptance Criteria**:
- Each card shows: reviewer name, star rating (1-5 stars visual), date, review text
- If partner has responded, response text displayed below review
- If not responded, "Respond to Review" button displayed
- Reference data from constitution Section 9

### FR-05-03 — Review Response Action

Partners can respond to reviews that haven't been addressed.

**Acceptance Criteria**:
- "Respond to Review" button opens a text area
- Partner submits response; it appears under the review
- Activity log event created: review_responded
- Response Rate KPI updates after response

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| reviewer_name | string | Yes | max 100 chars | "Michael Brown" |
| rating | number | Yes | 1-5 integer | 5 |
| review_date | date | Yes | — | "2026-02-10" |
| review_text | string | Yes | min 10 chars | "Excellent service!" |
| response_text | string | No | max 500 chars | "Thank you for the kind words!" |
| overall_rating | number | Yes | 1.0-5.0, 1 decimal | 4.8 |
| total_reviews | number | Yes | min 0 | 14 |
| response_rate | number | Yes | 0-100 percentage | 100 |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| No reviews yet | Display: "No reviews yet. Complete your first job to start receiving feedback." |
| 1-star review received | Display normally; no suppression of negative reviews |
| Empty response submitted | Validation error: "Response cannot be empty" |

---

## Success Criteria

1. Review KPI cards display accurate aggregate data
2. Review cards show correct star ratings, text, and dates
3. Partner can respond to un-responded reviews
4. Response Rate updates after a response is submitted
5. Activity log event fires on review response

---

## Dependencies

**Depends on**: [000-foundation](../000-foundation/spec.md)
**Required by**: [001-dashboard](../001-dashboard/spec.md) — recent reviews section
**Cross-links**: [constitution.md](../../memory/constitution.md) — Section 9

---

**Version**: 1.0
**Last Updated**: 2026-04-12
