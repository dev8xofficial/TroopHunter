# Feature Specification: Insurance

**Feature ID**: 004-insurance
**Status**: Ready
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Insurance screen

---

## Overview

The Insurance screen allows the client to submit and manage coverage information for three insurance types required during the home-buying process: home insurance, auto insurance, and home warranty. Each coverage type has a dedicated input card. The client fills in the relevant policy details, saves each card independently, and can upload supporting policy documents. Saved data is made available to the lender as part of the underwriting process.

---

## Problem Statement

Lenders require proof of insurance coverage before approving a mortgage. Collecting this information currently happens over email with attachments, which creates version confusion, delays underwriting, and forces the lender to chase the client for updates. This screen standardises the collection process, makes status visible to all parties, and stores the data centrally.

---

## Goals

- Collect the minimum required insurance information for all three coverage types from the client in a structured, persistent form.
- Show completion status for each coverage type clearly so the client knows what remains.
- Allow the client to upload policy documents alongside the structured form data.
- Make the saved insurance data accessible to the lender without email exchange.

---

## Non-Goals

- The portal does not broker, compare, or recommend insurance providers.
- It does not verify the accuracy of policy details entered by the client (that is the lender's responsibility).
- It does not pull data from insurance company APIs.
- Premium amounts, deductibles, or coverage limits are not collected in this release.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Fills in all three insurance cards; uploads documents |
| Mortgage Lender | Read-only access to submitted insurance data and documents |
| Transaction Coordinator | Can view and flag incomplete insurance records |

---

## User Scenarios

### Scenario 1 — Client Completes Auto Insurance Form

**Actor**: Client
**Precondition**: Home insurance is already complete; auto insurance is Pending.
**Flow**:
1. Client opens the Insurance screen.
2. Three cards are visible side-by-side: Auto Insurance (Pending), Home Insurance (Completed), Home Warranty (Not Started).
3. Client fills in the Auto Insurance card: policyholder name is pre-filled from session; client updates DOB if needed; enters the 17-character VIN; adds optional notes (policy number, provider, agent contact).
4. Client clicks "Save Auto Insurance".
5. The card's status badge updates from "Pending" to "Completed".
6. The primary "Save" button changes to a secondary "Update" button.
7. An activity log entry is written: "🛡️ Insurance Updated — Auto insurance saved".
8. The Dashboard insurance mini-card reflects the updated status.

**Success**: Auto insurance card shows "Completed"; data is persisted; activity log is updated; Dashboard reflects new status.

---

### Scenario 2 — Client Starts Home Warranty from Scratch

**Actor**: Client
**Precondition**: Home warranty is "Not Started" — all fields are empty.
**Flow**:
1. Client locates the Home Warranty card.
2. Client fills in: policyholder name, date of birth, property address (pre-fillable from transaction address), and optional notes (warranty company, coverage details, plan type).
3. Client clicks "Save Home Warranty".
4. Status badge updates from "Not Started" to "Completed".

**Success**: Home Warranty card shows "Completed"; data is persisted.

---

### Scenario 3 — Client Updates Previously Saved Home Insurance

**Actor**: Client
**Precondition**: Home insurance is already completed with policy details saved.
**Flow**:
1. Client opens the Insurance screen and views the Home Insurance card (status: Completed).
2. The "Update Home Insurance" button (secondary style) is visible.
3. Client changes the additional information (e.g., updates the agent contact number).
4. Client clicks "Update Home Insurance".
5. Data is saved; status remains "Completed".

**Success**: Updated data is persisted; status does not revert; no duplicate record is created.

---

### Scenario 4 — Client Uploads a Policy Document

**Actor**: Client
**Precondition**: Client has the home insurance policy PDF.
**Flow**:
1. Client scrolls to the Insurance Documents table at the bottom of the screen.
2. Client clicks "+ Upload Document".
3. File picker opens; client selects the PDF (≤ 25 MB).
4. Document appears in the table with status `under-review`, upload date, and View/Download actions.

**Success**: Document appears in the table immediately after upload with correct metadata.

---

## Functional Requirements

### FR-04-01 — Three Coverage-Type Cards Layout

- Three cards must be displayed in a 3-column grid on desktop (stacks to single-column below 768 px).
- Cards must be ordered: Auto Insurance (left), Home Insurance (centre), Home Warranty (right).
- Each card header must display the coverage type title, emoji icon, subtitle, and a status badge.

### FR-04-02 — Status Badges per Card

| Status | Badge Variant | Trigger |
|--------|--------------|---------|
| Not Started | `bdg-gray` | No data saved; default for new clients |
| Pending | `bdg-yellow` | Partial data entered but not yet submitted |
| Completed | `bdg-green` | Client has clicked Save/Update successfully |

Note: "Pending" in the portal context (for insurance) means the client has data in the system but hasn't confirmed it (e.g., auto insurance card was partially entered in a previous session but not saved). This is distinct from the general `pending` status in the constitution.

### FR-04-03 — Auto Insurance Card Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Policyholder Name | Text | Yes | Pre-filled from session client name |
| Date of Birth | Date picker | Yes | Pre-filled if available in session |
| VIN Number | Text (17 chars max) | Yes | Uppercase enforced; 17-character limit |
| Additional Information | Textarea | No | Policy number, provider, agent contact |

### FR-04-04 — Home Insurance Card Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Policyholder Name | Text | Yes | Pre-filled from session |
| Date of Birth | Date picker | Yes | Pre-filled if available |
| Property Address | Text | Yes | Pre-filled from `transaction.property_address` |
| Additional Information | Textarea | No | Policy number, provider, agent contact |

### FR-04-05 — Home Warranty Card Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Policyholder Name | Text | Yes | Pre-filled from session |
| Date of Birth | Date picker | Yes | Pre-filled if available |
| Property Address | Text | Yes | Pre-filled from `transaction.property_address` |
| Additional Information | Textarea | No | Warranty company, coverage details, plan type |

### FR-04-06 — Pre-fill Behaviour

- Policyholder Name must be pre-filled with the session client name on first open.
- Date of Birth must be pre-filled if previously entered in the mortgage application (spec 005) or insurance form.
- Property Address must be pre-filled with `transaction.property_address` for Home Insurance and Home Warranty cards.
- Pre-filled values must be editable.

### FR-04-07 — Save / Update Button State

- When a card is in "Not Started" or "Pending" state, the primary action button shows "Save [Coverage Type]" (navy / `btn-primary`).
- When a card is in "Completed" state, the primary button is replaced with "Update [Coverage Type]" (outlined / `btn-secondary`).
- Clicking Save validates required fields. If any required field is empty, the button must not submit and must highlight the missing field.

### FR-04-08 — Required Field Validation

- Clicking Save with one or more empty required fields must highlight those fields with a red border and display an inline error message below each missing field.
- The card must not change status until all required fields are filled.

### FR-04-09 — Informational Banner

An info-variant alert banner must appear at the top of the Insurance screen explaining:
- Why insurance information is needed.
- That only basic information is required (the insurance provider handles the rest).

### FR-04-10 — Insurance Documents Table

A card below the three coverage cards must contain a documents table with:
- Columns: Document name, Uploaded By, Date, Status badge, Actions (View + Download)
- A "+ Upload Document" button that triggers a file picker
- Supported formats and size limits identical to spec 002 (PDF/Word/JPEG/PNG, max 25 MB)
- New uploads appear with status `under-review` and "John Smith" (client) in the Uploaded By column

### FR-04-11 — Activity Log on Save

Saving or updating any insurance card must produce an activity log entry:
- Label: "🛡️ Insurance Updated"
- Description: "[Coverage type] insurance [saved/updated] by client"

### FR-04-12 — Dashboard Sync

After any save or update, the insurance mini-card on the Dashboard must reflect the new completion status for the affected coverage type within the same session.

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `insurance.auto.status` | enum | not-started / pending / completed |
| `insurance.auto.policyholder_name` | string | |
| `insurance.auto.date_of_birth` | date | |
| `insurance.auto.vin` | string | 17 chars, uppercase |
| `insurance.auto.notes` | string | Optional free text |
| `insurance.home.status` | enum | not-started / pending / completed |
| `insurance.home.policyholder_name` | string | |
| `insurance.home.date_of_birth` | date | |
| `insurance.home.property_address` | string | |
| `insurance.home.notes` | string | Optional free text |
| `insurance.warranty.status` | enum | not-started / pending / completed |
| `insurance.warranty.policyholder_name` | string | |
| `insurance.warranty.date_of_birth` | date | |
| `insurance.warranty.property_address` | string | |
| `insurance.warranty.notes` | string | Optional free text |
| `insurance_documents[]` | array | Uploaded policy documents (see spec 002 document model) |

---

## Edge Cases & Error States

- **VIN entered with wrong length**: Inline validation error before save is attempted ("VIN must be exactly 17 characters").
- **Date of birth is in the future**: Inline validation error ("Date of birth must be in the past").
- **Session pre-fill unavailable**: Fields show placeholder text; client fills manually with no degradation.
- **Document upload exceeds 25 MB**: Inline error in upload zone; document not saved.
- **Save fails due to network error**: Toast or inline error on the card; data is not lost from the form; retry is possible.

---

## Assumptions

1. The lender can access submitted insurance data via their own portal view (out of scope for this spec). The client's data is stored in a shared transaction record accessible by the lender role.
2. Insurance data is tied to the transaction, not the client's global profile. If the client starts a new transaction in the future, they fill it out again.
3. The "Additional Information" free-text field is intentionally flexible — it handles any policy detail the client wants to include without requiring a rigid field schema.

---

## Success Criteria

1. All three insurance cards can be individually completed in under 3 minutes each.
2. Required field validation prevents saving with empty required fields; the client receives clear feedback about which fields are missing.
3. After saving, the card status badge updates immediately without a page reload.
4. The Dashboard insurance mini-card reflects updated coverage status within the same session.
5. A client who completed home insurance in a previous session sees it pre-populated as "Completed" on their next visit.

---

## Open Questions

1. Should auto insurance require more than just the VIN — for example, the vehicle make, model, and year? The current UI only collects VIN.
2. Should there be a way for the client to indicate "I don't have this coverage" (e.g., they don't own a car and don't need auto insurance)? If so, the card should offer a "Not Applicable" option.
3. Should the insurance data submitted here be directly visible to the lender in the portal, or only transmitted as a document/data export outside the portal?

---

## Dependencies

- **Depends on**: 000-foundation (tokens, badges, alert banners, activity log)
- **Required by**: 001-dashboard (insurance mini-card reads `insurance.*.status`); 005-mortgage (lender may reference insurance status during underwriting)
