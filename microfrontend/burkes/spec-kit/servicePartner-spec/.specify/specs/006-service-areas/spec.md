# Feature Specification: Service Areas

> **Feature ID**: `006-service-areas`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Service Areas

---

## Overview

The Service Areas screen enables partners to manage their geographic coverage by adding, pausing, and monitoring zip code-based service areas. It displays active areas with performance metrics (referrals/month, earnings), recommended areas based on demand analytics, an "Add New Service Area" form, and strategic tips for optimising area coverage. This screen directly controls which referrals the partner receives.

---

## Problem Statement

Partners need precise control over their service coverage. Without a dedicated management screen, partners cannot see which zip codes generate the most referrals or revenue, cannot strategically expand to high-demand areas, and cannot pause areas during capacity constraints. The Service Areas screen provides data-driven area management.

---

## Goals

- Display active service areas with referral and earnings metrics per zip code
- Recommend high-demand areas near existing coverage for strategic expansion
- Provide an "Add New Service Area" form for zip code registration
- Display tips and best practices for service area optimisation
- Enable pausing/resuming areas for capacity management

## Non-Goals

- Automated area optimisation
- Competitor density analysis
- Route planning between job sites

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Manages service areas, adds/pauses areas, reviews performance |
| Admin | AD | Approves new area registrations if verification required (indirect) |

---

## User Scenarios

### Scenario 1: Partner Adds a New Service Area

- **Actor**: SP
- **Goal**: Expand coverage to a new zip code
- **Flow**:
  1. Partner navigates to Service Areas
  2. Partner enters zip code "77384" in the Add form
  3. Partner selects service types available in that area
  4. Partner clicks "Add Service Area"
  5. New area appears in Active Areas grid
- **Success**: Partner is now eligible to receive referrals in zip code 77384

### Scenario 2: Partner Reviews Area Performance

- **Actor**: SP
- **Goal**: Identify best-performing zip codes
- **Flow**:
  1. Partner views Active Areas grid
  2. Partner compares referrals/month and earnings across areas
  3. Partner notices 77380 has highest volume (8 referrals, $12,400)
- **Success**: Partner identifies top-performing area for potential resource focus

---

## Functional Requirements

### FR-06-01 — Active Service Areas Grid

The screen displays a grid of the partner's active service areas.

**Acceptance Criteria**:
- Each area card: Zip code (large text), city name, referrals per month, total earned, Active badge
- Reference: 77380 (The Woodlands, 8 refs, $12,400), 77381 (The Woodlands, 5 refs, $7,800), 77382 (Spring, 3 refs, $4,200)
- 3-column grid at ≥1200px, stacking at smaller widths

### FR-06-02 — Recommended Service Areas

The screen displays recommended areas for expansion.

**Acceptance Criteria**:
- Each recommendation: Zip code, city, demand level (High/Growing/Medium), avg earnings per referral
- Reference: 77384 (Conroe, High demand, $850/ref), 77385 (Conroe, Growing, $720/ref), 77386 (Spring, Medium, $680/ref)
- "Add" button on each recommended area

### FR-06-03 — Add New Service Area Form

The screen provides a form to add a new service area.

**Acceptance Criteria**:
- Zip code input (5-digit validation)
- Service types checkboxes
- "Add Service Area" submit button
- Activity log event: service_area_added

### FR-06-04 — Service Area Tips

The screen displays best practice tips for area management.

**Acceptance Criteria**:
- Tips card with recommendations (e.g., "Focus on areas with high demand", "Monitor earnings per referral")
- Uses info-style card with `accent-blue` accent

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| zip_code | string | Yes | 5 digits | "77380" |
| city | string | Yes | — | "The Woodlands" |
| referrals_per_month | number | Yes | min 0 | 8 |
| total_earned | number | Yes | USD, min 0 | 12400 |
| area_status | string | Yes | enum: active, paused | "active" |
| demand_level | string | No | enum: high, growing, medium, low | "high" |
| avg_earnings_per_referral | number | No | USD | 850 |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| Invalid zip code format | Validation: "Please enter a valid 5-digit zip code" |
| Duplicate area addition | Warning: "You're already registered in zip code XXXXX" |
| No active areas | Banner: "Add your first service area to start receiving referrals" |
| No recommended areas | Section hidden if no recommendations available |

---

## Success Criteria

1. Active areas grid displays with correct metrics per zip code
2. Recommended areas show demand levels and earnings data
3. Add form validates zip code and creates new area
4. Tips card provides actionable guidance
5. Activity log events fire on area changes

---

## Dependencies

**Depends on**: [000-foundation](../000-foundation/spec.md)
**Required by**: [001-dashboard](../001-dashboard/spec.md) — service areas grid
**Cross-links**: [constitution.md](../../memory/constitution.md) — Section 10

---

**Version**: 1.0
**Last Updated**: 2026-04-12
