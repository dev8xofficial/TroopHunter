# Feature Specification: Partner Referrals

**Feature ID**: 007-partner-referrals
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Partner Referrals — partner directory and referral submission

---

## Overview

The Partner Referrals screen allows agents to find trusted service providers for their clients and submit structured referrals on the client's behalf. Partners are displayed as cards with ratings, service tags, and contact buttons. Agents can also search by service type and zip code. A referral form at the bottom connects a specific client to a specific partner for a defined service need.

---

## Problem Statement

During real estate transactions, clients frequently need third-party services: plumbers, roofers, electricians, credit repair specialists, home inspectors, and movers. Agents who can recommend vetted, high-rated partners add significant value to their client relationships. Without a structured partner directory and referral flow, agents rely on informal recommendations and lose the ability to track which partners they've referred.

---

## Goals

- Display a curated directory of vetted partners with ratings, reviews, and service tags.
- Allow agents to filter partners by service type and zip code.
- Allow agents to submit a structured referral that links a client to a specific partner.
- Distinguish "Featured Partners" from standard listings.

---

## Non-Goals

- Partner management (adding, editing, or removing partners from the directory) is an admin-only concern.
- Partner ratings and reviews are sourced externally and displayed read-only.
- Payment or commission tracking for referrals is out of scope for v1.

---

## Actors

| Actor      | Role in This Feature                                             |
| ---------- | ---------------------------------------------------------------- |
| Agent (AG) | Searches partners, views partner cards, submits client referrals |
| Admin (TC) | Manages the partner directory (add/edit/remove)                  |

---

## User Scenarios

### Scenario 1 — Agent Searches for a Plumber for a Client

**Actor**: Agent
**Precondition**: Client Michael Brown needs a plumber after inspection revealed pipe issues.
**Flow**:

1. Agent navigates to Partner Referrals.
2. Agent selects "Plumbing" from the Service Type filter.
3. Agent enters zip code "60601" and clicks "Search Partners."
4. Results show Chicago Elite Plumbing (featured, 4.9★) and Elite Plumbing Services (4.7★).
5. Agent reviews tags: Chicago Elite has "24/7 Available"; Elite Plumbing has "Emergency Calls."
6. Agent clicks 📞 Call on Chicago Elite Plumbing to get the number.

**Success**: Agent can identify the best plumbing partner within 30 seconds.

---

### Scenario 2 — Agent Submits a Referral

**Actor**: Agent
**Precondition**: Agent has identified HomePro Inspection Services for John Smith.
**Flow**:

1. Agent scrolls to the "Refer a Client to a Partner" form at the bottom.
2. Agent selects Client: "John Smith."
3. Agent selects Service Needed: "Home Inspection."
4. Agent selects Partner: "HomePro Inspection Services" (note: dropdown lists only 3 partners initially; HomePro may need to be added).
5. Agent enters property address: "123 Main Street, The Woodlands, TX 77380."
6. Agent adds notes: "Client available Mon/Wed/Fri mornings."
7. Agent clicks "Send Referral."
8. Activity event written: "Referral Sent – John Smith → HomePro Inspection Services."

**Success**: Referral is submitted; partner receives the client connection request; activity log updated.

---

## Functional Requirements

### FR-07-01 — Filter Bar

- "Service Type:" label.
- **Service Type** dropdown: All Services, Plumbing, Roofing, Electrical, Credit Repair, Home Inspection, Moving Services.
- **Zip Code** text input: placeholder "Enter zip code...", `min-width: 200px`.
- **"Search Partners"** `.btn-primary` button.

### FR-07-02 — Partner Results Card Grid

- Container: white card with title "Recommended Partners - Chicago Area (60601)" and subtitle "Trusted professionals for your client's needs."
- Grid: `grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))`, `gap: 24px`.
- Each partner displayed as a `.partner-card` (`background: white`, `border: 2px solid neutral-200`, `border-radius: 12px`, `padding: 24px`; hover: `primary-gold` border + `shadow-lg` + translateY(-2px)).

**Partner Card Structure**:

- **Featured badge** (optional): `.partner-badge` (inline-block, `primary-gold` background, `primary-navy` text, `border-radius: 6px`, `font-size: 12px`/700, uppercase, text: "⭐ Featured Partner").
- **Partner name**: 20px/700 `primary-navy`.
- **Category**: 14px `neutral-600`.
- **Rating row**: `partner-stars` (gold ★ characters, 16px) + review count (14px `neutral-600`, format "N.N (NNN reviews)").
- **Service tags**: flex-wrap row of `.partner-service-tag` chips (`padding: 4px 10px`, `neutral-100` background, `border-radius: 6px`, 13px `neutral-700`).
- **Contact buttons**: two equal-flex buttons (`.partner-contact-btn`): "📞 Call" and "✉️ Email." Border: `2px solid primary-navy`; hover: `primary-navy` background, white text.

**Reference Partner Cards (from agent.html)**:

| Partner Name                | Featured | Category               | Stars | Reviews   | Service Tags                                                        |
| --------------------------- | -------- | ---------------------- | ----- | --------- | ------------------------------------------------------------------- |
| Chicago Elite Plumbing      | Yes      | Plumbing Services      | ★★★★★ | 4.9 (127) | Emergency Service · Licensed & Insured · 24/7 Available             |
| Premium Roofing Solutions   | Yes      | Roofing & Repair       | ★★★★★ | 4.9 (89)  | Free Estimates · Warranty Included · 25 Years Experience            |
| Lightning Fast Electric     | No       | Electrical Services    | ★★★★☆ | 4.8 (156) | Licensed Electricians · Residential & Commercial · Same-Day Service |
| Credit Solutions Plus       | No       | Credit Repair Services | ★★★★★ | 5.0 (203) | Fast Results · Money-Back Guarantee · Certified Consultants         |
| HomePro Inspection Services | No       | Home Inspection        | ★★★★★ | 5.0 (74)  | Certified Inspectors · Same-Day Reports · Thermal Imaging           |
| Elite Plumbing Services     | No       | Plumbing               | ★★★★☆ | 4.7 (112) | Full Service Plumbing · Emergency Calls · Insured & Bonded          |

Star rendering reference:

- 4.9 → ★★★★★ (5 filled)
- 4.8 → ★★★★☆ (4 filled, 1 empty)
- 5.0 → ★★★★★ (5 filled)
- 4.7 → ★★★★☆ (4 filled, 1 empty)

### FR-07-03 — Refer a Client to a Partner Form

- Container: white card with title "Refer a Client to a Partner" and subtitle "Help your clients connect with trusted service providers."
- Form grid: `grid-template-columns: 1fr 1fr`, `gap: 20px`.

**Form Fields**:

1. **Client Name** (label, select): John Smith, Sarah Williams, Michael Brown, Michael Brown, Lisa Anderson.
2. **Service Needed** (label, select): Plumbing, Roofing, Electrical, Credit Repair, Home Inspection.
3. **Partner to Refer** (label, select): Elite Plumbing Services, Premium Roofing Solutions, Lightning Fast Electric.
4. **Property Address** (label, text input): placeholder "Enter property address."
5. **Additional Notes** (label, textarea, `grid-column: 1 / -1`): placeholder "Any special requirements or details..."
6. **"Send Referral"** `.btn-gold` submit button (`grid-column: 1 / -1`, full span).

---

## Data & State

| Field                       | Type   | Description                                      |
| --------------------------- | ------ | ------------------------------------------------ |
| `partners[]`                | array  | Full partner directory listing                   |
| `partner.name`              | string | Partner business name                            |
| `partner.is_featured`       | bool   | Whether the "⭐ Featured Partner" badge is shown |
| `partner.category`          | string | Service category label                           |
| `partner.rating`            | number | Average rating (1 decimal place)                 |
| `partner.review_count`      | number | Total review count                               |
| `partner.service_tags[]`    | array  | Array of tag strings                             |
| `referral.client`           | string | Selected client name                             |
| `referral.service`          | string | Service type needed                              |
| `referral.partner`          | string | Selected partner to refer to                     |
| `referral.property_address` | string | Property address for the referral                |
| `referral.notes`            | string | Additional notes from agent                      |
| `filter.service_type`       | string | Currently selected service type filter           |
| `filter.zip_code`           | string | Entered zip code                                 |

---

## Edge Cases & Error States

- **No partners match the filter**: Show empty state "No partners found for this service type and zip code."
- **Referral sent without client selected**: Validation error.
- **Referral sent without service or partner selected**: Validation error.
- **Featured partners**: Must always appear first in the grid before non-featured partners regardless of sort order.

---

## Success Criteria

1. All 6 reference partner cards render with correct names, categories, ratings, review counts, and service tags.
2. Chicago Elite Plumbing and Premium Roofing Solutions render with the "⭐ Featured Partner" badge.
3. Star ratings render correctly: 4.9 → 5 filled stars; 4.8 and 4.7 → 4 filled + 1 empty star.
4. The partner card hover state uses `primary-gold` border (not `primary-navy`).
5. The referral form submits with the `.btn-gold` button (gold background, navy text).
6. All dropdown options in the referral form are populated with reference data.

---

## Open Questions

1. Should the "Partner to Refer" dropdown in the referral form be filtered by the selected "Service Needed" value (i.e., only show plumbers when Plumbing is selected)?
2. Should agents be able to add their own partner recommendations to the directory?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, card pattern, gold button)
- **Depends on**: 004-clients (client dropdown in referral form)
