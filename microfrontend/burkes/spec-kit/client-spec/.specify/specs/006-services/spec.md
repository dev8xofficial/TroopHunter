# Feature Specification: Partner Services

**Feature ID**: 006-services
**Status**: review
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Services screen

---

## Overview

The Partner Services screen surfaces pre-vetted local service providers to the client, organised by service category and filtered to the zip code of their transaction property. The client can view provider details (ratings, services, contact info) and initiate contact with a single click. A secondary grid gives access to additional service categories beyond the four featured ones. Providers are curated by the Burkes Group — the client cannot submit or review providers.

---

## Problem Statement

After closing, homeowners typically scramble to find trustworthy plumbers, electricians, roofers, and other tradespeople with no local context. During the transaction itself, clients often need these services for inspection repairs and move-in prep. By surfacing vetted providers at the right moment — within the transaction portal — the Burkes Group removes the friction of searching externally and differentiates its service offering.

---

## Goals

- Surface high-quality, location-relevant service providers without the client leaving the portal.
- Make the "Recommended" provider in each category immediately obvious.
- Allow the client to contact a provider in under 2 minutes from opening the screen.
- Provide access to a broad range of service categories beyond the four featured ones.

---

## Non-Goals

- The portal does not manage appointments, job scheduling, or quotes between clients and providers.
- It does not allow clients to submit new providers or write reviews.
- It does not track provider performance metrics or update ratings automatically.
- It does not handle provider onboarding or vetting — that is a Burkes Group admin function.
- It does not display pricing information.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Browses and contacts service providers |
| Transaction Coordinator (Admin) | Manages the provider directory (add, remove, mark recommended) — admin function, out of scope for this spec |

---

## User Scenarios

### Scenario 1 — Client Finds and Contacts a Plumber

**Actor**: Client
**Precondition**: Transaction property is at 123 Main Street, The Woodlands, TX 77380.
**Flow**:
1. Client opens the Services screen.
2. A location context card at the top confirms the property address and zip code (77380).
3. Client scrolls to the Plumbing Services card.
4. Two providers are listed; the first has a "Recommended" badge.
5. Client reads provider details: name, years serving the area, star rating, services list, and phone number.
6. Client clicks "Contact Provider".
7. The portal initiates the contact action (phone link or pre-filled message — see Open Questions).

**Success**: Client can identify and initiate contact with a recommended plumber within 2 minutes.

---

### Scenario 2 — Client Explores an Additional Service Category

**Actor**: Client
**Precondition**: Client needs an HVAC provider not shown in the featured grid.
**Flow**:
1. Client scrolls to the "Looking for Other Services?" card at the bottom.
2. Client clicks the "❄️ HVAC" icon button.
3. The portal shows HVAC providers (either in the same screen or a filtered view — see Open Questions).

**Success**: Client can access HVAC providers from the additional categories grid.

---

### Scenario 3 — Client Changes the Service Location

**Actor**: Client
**Precondition**: Client wants to find services for a different address (e.g., their current home before selling).
**Flow**:
1. Client clicks "Change Location" in the location context card.
2. Client enters a different address or zip code.
3. Provider listings refresh to show providers serving the new area.

**Success**: Provider listings update to reflect the new location; original transaction address is not overwritten.

---

## Functional Requirements

### FR-06-01 — Location Context Card

- Displayed at the top of the Services screen, above all provider categories.
- Must show: a location pin icon, label "Your Property Location", and the full transaction property address.
- Must include an explanatory text: "All recommended providers serve the [zip code] area and are pre-vetted partners of The Burkes Group."
- Must include a "Change Location" button that allows the client to temporarily browse providers for a different address without modifying the transaction record.

### FR-06-02 — Featured Service Category Grid

- Four featured categories must be displayed in a 2×2 grid on desktop (stacks to 1-column below 768 px).
- Featured categories: Plumbing Services, Roofing Services, Electrical Services, Credit Repair Services.
- Each category card header must display: category emoji + title + provider count badge (`bdg-navy`).

### FR-06-03 — Provider Listing Card (Within Category)

Each provider card within a category must display:

| Element | Description |
|---------|-------------|
| Company name | Bold, `neutral-800` |
| Descriptor | Certification, years serving, or notable attribute |
| Star rating | Visual gold stars + numeric rating (e.g., 4.7) |
| Review count | Count in parentheses (e.g., "(127 reviews)") |
| Services list | Comma-separated key services, prefixed with "Services:" |
| Phone number | With 📞 emoji prefix |
| Contact name | "Contact: [Name]" |
| Recommended badge | `bdg-green` — shown on the top provider in the category |
| Contact button | Primary (`btn-primary`) for Recommended; Secondary (`btn-secondary`) for others |

### FR-06-04 — Maximum Two Featured Providers Per Category

Each featured category card must display a maximum of two provider cards to keep the screen scannable. A "View All [Category] Providers" ghost button at the bottom of each card links to the full provider list for that category.

### FR-06-05 — Recommended Provider Highlighting

- The first (recommended) provider in each category must have a `bdg-green` "Recommended" badge in its card header.
- The recommended provider's contact button must use the primary style (navy fill); other providers use the secondary (outlined) style.
- There must be exactly one "Recommended" provider per category.

### FR-06-06 — "View All" Link

Each category card must include a full-width ghost button at the bottom: "View All [Category] Providers". Clicking it navigates to a full provider list for that category (design of this view is deferred to a future spec; for now, a placeholder page or modal is acceptable).

### FR-06-07 — Additional Services Grid

A card at the bottom of the screen labelled "🔍 Looking for Other Services?" must display eight service category icon buttons:

| Category | Emoji |
|----------|-------|
| Painting | 🎨 |
| Cleaning | 🧹 |
| Landscaping | 🌳 |
| HVAC | ❄️ |
| Moving | 🚚 |
| Locksmith | 🔒 |
| Windows | 🪟 |
| Handyman | 🛠️ |

- Buttons are arranged in a 4×2 grid on desktop.
- Each button shows the emoji (large, centred) and a category label below it.
- Clicking a category button loads providers for that category (deferred full-list view or placeholder).

### FR-06-08 — Provider Count Badges

Each featured category card header must display a `bdg-navy` count badge showing the total number of available providers in that category (not just the two shown).

### FR-06-09 — Change Location Behaviour

- "Change Location" must not overwrite `transaction.property_address`.
- The temporary location must apply only to the current session's Services screen view.
- When the client navigates away and returns, the default transaction address must be restored.
- If the entered location has no available providers, a clear empty state must be shown.

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `service_location.address` | string | Displayed property address (defaults to `transaction.property_address`) |
| `service_location.zip_code` | string | Used to filter providers |
| `service_location.is_temporary` | boolean | True when "Change Location" has been used |
| `provider.provider_id` | string | Unique identifier |
| `provider.name` | string | Company name |
| `provider.category` | enum | plumbing / roofing / electrical / credit-repair / painting / hvac / etc. |
| `provider.zip_codes_served[]` | array | Determines which providers show for a given zip |
| `provider.rating` | number | 1.0–5.0 |
| `provider.review_count` | number | |
| `provider.services[]` | array | List of service descriptions |
| `provider.phone` | string | Primary contact phone |
| `provider.contact_name` | string | Primary contact name |
| `provider.is_recommended` | boolean | Whether this provider is the category's featured pick |
| `provider.descriptor` | string | E.g., "Serving 77380 for 15+ years", "GAF Master Elite Contractor" |

---

## Edge Cases & Error States

- **No providers in a category for the transaction zip code**: Category card shows an empty state ("No providers currently listed for this area — contact your agent for referrals.").
- **Changed location has no providers**: Empty state message with a prompt to return to the original address.
- **Provider phone number is missing**: Phone row is omitted from the provider card (no blank field displayed).
- **Category has only one provider**: The "View All" button is hidden or shows "1 Provider" with no link needed.
- **More than one recommended provider exists in data** (data error): Only the first one encountered is shown as recommended; the rest are shown as standard providers.

---

## Assumptions

1. Provider data is managed by Burkes Group administrators and is not editable by the client.
2. The "Contact Provider" button initiates a `tel:` link to the provider's phone number. Alternative contact methods (email, in-portal message) are a future enhancement.
3. Provider ratings and review counts are manually maintained by admins — not pulled from third-party review platforms in this release.
4. "View All [Category] Providers" and the additional service category buttons navigate to a list view that is designed in a future spec. Placeholder navigation is acceptable in this release.

---

## Success Criteria

1. Client can identify the recommended provider in any category and initiate contact within 2 minutes of opening the Services screen.
2. Provider listings accurately reflect only providers serving the transaction zip code.
3. The "Recommended" badge and primary button styling appear on exactly one provider per category.
4. The location context card accurately shows the transaction property address on every visit.
5. The "Change Location" function updates the displayed providers without altering the transaction address.

---

## Open Questions

1. Should "Contact Provider" open a `tel:` link (initiating a phone call), open an email compose window, or trigger an in-portal message? The current UI implies a phone call but this is not confirmed.
2. Should the portal track which providers the client contacted (for Burkes Group reporting purposes)? If so, what data is stored and for how long?
3. Should the client be able to save or bookmark providers for easy re-access later in the transaction?

---

## Dependencies

- **Depends on**: 000-foundation (tokens, card component, badge system); `transaction.property_address` for default location
- **Required by**: 001-dashboard (Quick Actions "Find Service Providers" button navigates here)
