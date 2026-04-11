# Feature Specification: Company Profile

> **Feature ID**: `008-profile`
> **Status**: `approved`
> **Version**: `1.0`
> **Created**: 2026-04-12
> **Last Updated**: 2026-04-12
> **Parent Spec**: [000-foundation](../000-foundation/spec.md)
> **Screen / Module**: Profile

---

## Overview

The Profile screen enables the service partner to manage their company information, service categories, notification preferences, and account status. It contains a comprehensive business information form (company name, contact details, address, license, insurance), service category checkboxes, notification preference toggles, and an account status card showing membership type, member since date, and verification status. This screen is the partner's administrative hub for maintaining their professional profile within the platform.

---

## Problem Statement

Partners need to maintain accurate business information for compliance, referral routing, and homeowner trust. Without a dedicated profile screen, business details are scattered across sign-up forms and support tickets. License numbers, insurance policies, and service categories must be kept current to maintain platform eligibility and referral routing accuracy. The Profile screen centralises all partner configuration in one place.

---

## Goals

- Provide a comprehensive business information form with all required fields
- Enable partners to manage their service category selections
- Offer notification preference controls
- Display account status with membership type and verification status
- Enable profile updates with activity log tracking

## Non-Goals

- Payment method configuration
- Subscription/membership tier changes
- Partner-to-partner messaging
- Public profile preview

---

## Actors

| Actor | Role | Responsibility in This Feature |
|-------|------|-------------------------------|
| Service Partner | SP | Updates profile, manages categories, configures notifications |
| Admin | AD | Verifies license/insurance information (indirect) |

---

## User Scenarios

### Scenario 1: Partner Updates Business Information

- **Actor**: SP
- **Goal**: Update company phone number and insurance details
- **Flow**:
  1. Partner navigates to Profile screen
  2. Partner updates phone number field
  3. Partner updates insurance coverage amount
  4. Partner clicks "Save Changes"
  5. Changes saved; activity log event: profile_updated
- **Success**: Profile reflects updated information

### Scenario 2: Partner Manages Service Categories

- **Actor**: SP
- **Goal**: Add "Water Treatment Systems" to service categories
- **Flow**:
  1. Partner scrolls to Service Categories section
  2. Partner checks "Water Treatment Systems" checkbox
  3. Partner clicks "Save Changes"
  4. Partner is now eligible for water treatment referrals
- **Success**: Service categories updated; referral routing adjusted

---

## Functional Requirements

### FR-08-01 — Business Information Form

The Profile screen displays a form with business details.

**Acceptance Criteria**:
- Fields: Company Name, Contact Name, Phone Number, Email Address, Business Address, License Number, Years in Business
- Insurance section: Policy Type, Coverage Amount, Policy Number
- All fields pre-populated with current values
- "Save Changes" button (`primary-navy` background)
- Reference data from constitution Section 12

### FR-08-02 — Service Categories

The screen displays checkboxes for service category selection.

**Acceptance Criteria**:
- Categories: Emergency Repairs, Installations, Inspections, Maintenance, Water Treatment Systems
- Checkboxes reflect current settings (pre-checked where active)
- At least one category must be selected (validation)

### FR-08-03 — Notification Preferences

The screen displays toggles for notification settings.

**Acceptance Criteria**:
- Preferences: Email notifications for new referrals, SMS alerts for urgent requests, Weekly performance reports
- Each toggle reflects current state
- Changes saved with profile update

### FR-08-04 — Account Status Card

The screen displays a read-only card showing account information.

**Acceptance Criteria**:
- Membership Type (e.g., "Premium Partner"), Member Since (e.g., "January 2024"), Account Status (e.g., "Active & Verified")
- Status badges: Active & Verified (green), Pending Verification (orange), Suspended (red)
- Card is informational only — no editable fields

---

## Data & State

| Field | Type | Required | Constraints | Example |
|-------|------|----------|-------------|---------|
| company_name | string | Yes | max 100 chars | "Woodlands Plumbing Pro" |
| contact_name | string | Yes | max 100 chars | "Marcus Rivera" |
| phone_number | string | Yes | US phone format | "(281) 555-0606" |
| email_address | string | Yes | valid email | "marcus@woodlandsplumbing.com" |
| business_address | string | Yes | full address | "512 Commerce Park Drive, The Woodlands, TX 77380" |
| license_number | string | Yes | — | "TX-PLB-48830" |
| years_in_business | number | Yes | min 0 | 15 |
| insurance_policy_type | string | Yes | — | "General Liability + Workers Comp" |
| coverage_amount | number | Yes | USD | 2000000 |
| policy_number | string | Yes | — | "WC-789456" |
| service_categories | array | Yes | min 1 item | ["Emergency Repairs", "Installations"] |
| notification_email | boolean | Yes | — | true |
| notification_sms | boolean | Yes | — | true |
| notification_weekly | boolean | Yes | — | true |
| membership_type | string | Yes | enum | "Premium Partner" |
| member_since | date | Yes | — | "2024-01" |
| account_status | string | Yes | enum | "Active & Verified" |

---

## Edge Cases & Error States

| Scenario | Handling |
|----------|---------|
| Invalid email format | Validation: "Please enter a valid email address" |
| Invalid phone format | Validation: "Please enter a valid US phone number" |
| No service categories selected | Validation: "At least one service category must be selected" |
| License number format invalid | Soft warning — no hard block (per P-05) |
| Profile save failure | Error banner: "Unable to save. Please try again." with retry button |

---

## Success Criteria

1. Business information form pre-populates with current data
2. Profile updates save successfully with activity log event
3. Service categories checkboxes reflect current state and update correctly
4. Notification preferences toggle correctly
5. Account status card displays correct membership and verification status

---

## Dependencies

**Depends on**: [000-foundation](../000-foundation/spec.md)
**Required by**: [001-dashboard](../001-dashboard/spec.md) — "Update Profile" quick action
**Cross-links**: [constitution.md](../../memory/constitution.md) — Section 12

---

**Version**: 1.0
**Last Updated**: 2026-04-12
