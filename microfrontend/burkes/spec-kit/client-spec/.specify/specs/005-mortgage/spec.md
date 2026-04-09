# Feature Specification: Mortgage Application

**Feature ID**: 005-mortgage
**Status**: Ready
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Mortgage screen

---

## Overview

The Mortgage screen guides the client through completing their mortgage application directly within the portal. The application is split into five sequential sections: Personal Information, Property Details, Employment History, Financial Documents, and Review & Submit. Completed sections are saved persistently and displayed in a read-only collapsed state with an edit option. Upon full completion, the application package is automatically shared with the assigned lender. The screen also shows the lender's contact details and tracks the status of each required document submission.

---

## Problem Statement

Mortgage applications are complex, multi-step processes that clients typically abandon or submit incomplete because there is no clear progress indicator and no way to save partial work. This leads to lenders receiving incomplete data, delays in underwriting, and back-and-forth follow-ups. The Mortgage screen solves this by providing a structured, section-by-section form with persistent saving, clear progress visibility, and automatic transmission to the lender upon completion.

---

## Goals

- Allow the client to complete the mortgage application in one or multiple sessions without losing progress.
- Show clear, section-level progress so the client always knows what remains.
- Prevent submission of incomplete applications to the lender.
- Automatically notify the lender when the application is complete without requiring the client to take a manual transmission step.
- Provide a document checklist so the client knows exactly which files to upload.

---

## Non-Goals

- The portal does not calculate mortgage affordability, run credit checks, or provide rate quotes — those are the lender's responsibility.
- It does not submit the application to any government or regulatory system.
- It does not manage co-applicants (joint applications are out of scope for this release).
- It does not collect tax returns, bank statements, or W-2s directly through this form — those are uploaded as documents in the Financial Documents section.

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Completes all five application sections; uploads financial documents |
| Mortgage Lender | Receives completed application; reads-only via lender portal (out of scope) |
| Transaction Coordinator | Can view application progress and prompt client if overdue |

---

## User Scenarios

### Scenario 1 — Client Resumes an Incomplete Application

**Actor**: Client
**Precondition**: Personal Info and Property Details are saved (60% complete); Employment History is outstanding.
**Flow**:
1. Client navigates to the Mortgage screen.
2. Progress overview card shows 60%, a progress bar, and section badges: Personal Info ✓, Property Details ✓, Employment History ⚡, Financial Documents —, Review & Submit —.
3. Personal Information and Property Details sections render in a completed, read-only state with an "Edit" button.
4. Employment History section renders as an active, open form with an action-required alert inside.
5. Client fills in employer name, position/title, start date, and annual income.
6. Client clicks "Save Employment Info".
7. Section badge updates to ✓; progress bar advances.

**Success**: Employment section is saved; progress increases; section transitions to completed state.

---

### Scenario 2 — Client Adds a Previous Employer

**Actor**: Client
**Precondition**: Current employer is saved in Employment History.
**Flow**:
1. Client scrolls to the Employment History section.
2. Clicks "+ Add Previous Employer".
3. A second employer form block appears below the first.
4. Client fills in the previous employer's details.
5. Client saves; both employer records are persisted.

**Success**: Both employer entries are saved and visible in the section.

---

### Scenario 3 — Client Uploads Bank Statements

**Actor**: Client
**Precondition**: Employment History is complete; Financial Documents section is open.
**Flow**:
1. Client locates the Financial Documents section.
2. An upload zone inside the section shows "Upload Bank Statements — Last 2 months required".
3. Client drags two PDF files onto the zone.
4. Files are validated (PDF, ≤ 25 MB each) and uploaded.
5. The Application Documents tracker table shows the bank statements row updating from "Pending" to "Received".
6. If the remaining required documents are also complete, the "Review & Submit" section becomes accessible.

**Success**: Bank statement uploads reflected in tracker; section progress updates.

---

### Scenario 4 — Client Reviews and Submits the Application

**Actor**: Client
**Precondition**: All five sections are complete; all required documents uploaded.
**Flow**:
1. Client clicks into the "Review & Submit" section.
2. A summary of all entered data is displayed read-only.
3. Client reviews and confirms accuracy.
4. Client clicks "Submit Application".
5. Portal confirms submission; the lender receives the complete application package automatically.
6. Application status updates to "Submitted"; the Mortgage mini-card on the Dashboard reflects 100%.
7. Activity log entry is written: "🏦 Mortgage Submitted — Application sent to lender James Carter".

**Success**: Application is transmitted to lender; client sees a confirmation state; Dashboard reflects submission.

---

## Functional Requirements

### FR-05-01 — Progress Overview Card

- Displayed at the top of the Mortgage screen above all sections.
- Must show: "Application Progress" heading, subtitle, overall percentage (large numeric display), progress bar (gradient fill, 10 px height), and five section-level badges.
- Section badge states:
  - Complete: `bdg-green` with ✓
  - In Progress: `bdg-yellow` with ⚡
  - Not Started: `bdg-gray` with no icon
- The percentage must reflect the ratio of completed sections to total sections (each section = 20%).

### FR-05-02 — Section Layout

- Sections are displayed in a two-column grid on desktop: Personal Information + Property Details (left column), Employment History + Financial Documents (right column). Review & Submit spans full width.
- On viewports below 768 px, columns stack to a single column in section order.
- Each section is a card with a header containing: section title, subtitle, and a status badge.

### FR-05-03 — Personal Information Section

Required fields:

| Field | Type | Notes |
|-------|------|-------|
| First Name | Text | Pre-filled from session |
| Last Name | Text | Pre-filled from session |
| Email Address | Email | Pre-filled from session |
| Phone Number | Tel | Pre-filled if available |
| Date of Birth | Date picker | Pre-filled if available |
| Social Security Number | Text | Masked (show last 4 digits only after initial entry) |

- Section includes an "Edit Information" button when in Completed state.
- SSN must be masked after entry (e.g., `***-**-4892`); an unmask toggle is optional.

### FR-05-04 — Property Details Section

Required fields:

| Field | Type | Notes |
|-------|------|-------|
| Property Address | Text | Pre-filled from `transaction.property_address` |
| Purchase Price | Currency text | Pre-filled from `transaction.purchase_price` |
| Down Payment | Currency text + percentage | |
| Loan Amount Requested | Currency text | |
| Property Type | Dropdown | Options: Single Family Home, Condominium, Townhouse, Multi-Family |

- Section includes an "Edit Property Info" button when in Completed state.

### FR-05-05 — Employment History Section

Required fields (per employer entry):

| Field | Type | Notes |
|-------|------|-------|
| Current Employer | Text | Company name |
| Position / Title | Text | Job title |
| Start Date | Date picker | |
| Annual Income | Currency text | |

- An action-required alert (`bdg-yellow` variant) must appear inside the card when the section is incomplete.
- A "+ Add Previous Employer" button must append a second identical form block below the first (for clients who have changed jobs).
- Previous employer entries must also include an "End Date" field and an "Is Current" toggle.
- There is no hard limit on the number of employer entries, but a practical UI limit of 5 is recommended with a warning if exceeded.

### FR-05-06 — Financial Documents Section

- An upload zone inside the section must support PDF/Word/JPEG/PNG, max 25 MB per file.
- Required upload: "Bank Statements — Last 2 months".
- A bulleted list of optional additional documents must be shown:
  - Tax returns (last 2 years)
  - Pay stubs (last 2 months)
  - W-2 forms (last 2 years)
  - Investment account statements
- The section badge updates to ✓ only when the required bank statements are uploaded.

### FR-05-07 — Application Documents Tracker Table

- A table at the bottom of the screen tracks the status of all required document types.
- Rows (fixed):
  1. Purchase Agreement — status driven by Documents screen (spec 002)
  2. Bank Statements (2 months) — status driven by FR-05-06 upload
  3. Employment Verification — status driven by FR-05-05 completion
- Columns: Document Type, Status badge, Date (upload date or "—"), Actions (View / Upload / Complete Form based on status).

### FR-05-08 — Review & Submit Section

- This section is not accessible until all four preceding sections are Complete.
- Before it is accessible, it shows a locked/greyed state with a note: "Complete all sections above to unlock".
- When unlocked, it shows a read-only summary of all submitted data across all sections.
- A single "Submit Application" button transmits the completed package to the lender.
- After submission, all sections become read-only; a confirmation state is shown.

### FR-05-09 — Lender Information Card

- Displayed below all application sections.
- Shows: lender avatar (role-coloured, 54 px), lender name, title, institution, email, and phone.
- Includes a status message: "Your application will be automatically shared with [Lender Name] once you complete all sections. They'll review and reach out within 1 business day."
- Includes a "Message [Lender Name]" button that navigates to the lender's thread in the Messages screen.

### FR-05-10 — Section Edit After Completion

Any completed section (Personal Info, Property Details, Employment History) must have an "Edit" button that returns the section to an editable state. Saving re-locks it to Completed. Editing a section after the application has been submitted is not permitted without explicit confirmation.

### FR-05-11 — Activity Log on Save and Submit

- Each section save writes: "🏦 Mortgage Updated — [Section name] saved"
- Application submission writes: "🏦 Mortgage Submitted — Application sent to [Lender Name]"

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `mortgage.completion_percentage` | number | 0–100 (increments of 20 per section) |
| `mortgage.sections.personal_info.status` | enum | not-started / in-progress / complete |
| `mortgage.sections.property_details.status` | enum | not-started / in-progress / complete |
| `mortgage.sections.employment_history.status` | enum | not-started / in-progress / complete |
| `mortgage.sections.financial_documents.status` | enum | not-started / in-progress / complete |
| `mortgage.sections.review_submit.status` | enum | not-started / complete (submitted) |
| `mortgage.personal_info` | object | First name, last name, email, phone, DOB, SSN (masked) |
| `mortgage.property_details` | object | Address, price, down payment, loan amount, property type |
| `mortgage.employment_history[]` | array | { employer, title, start_date, end_date, is_current, annual_income } |
| `mortgage.uploaded_documents[]` | array | { doc_type, status, uploaded_date } |
| `mortgage.submitted_at` | datetime | Null until submission; set on submit |

---

## Edge Cases & Error States

- **Required field left blank on save**: Field highlighted with red border + inline error; section does not save; badge does not change.
- **SSN entered with wrong format**: Inline format validation error before save is attempted.
- **Bank statements uploaded but one is corrupt or unreadable**: System shows a file-error indicator in the upload zone; requires re-upload.
- **Application submitted but lender transmission fails**: Client sees a "Submission failed — please try again" message; application data is not lost.
- **Client edits a section after submission**: A confirmation modal warns that resubmission will be required; client must confirm.

---

## Assumptions

1. The five sections are always shown in the same order; there is no branching logic (e.g., self-employed applicants do not get a different form).
2. Co-applicant (joint borrower) support is not in scope.
3. Each section save is independent — saving one section does not trigger a save of others.
4. Lender transmission is automatic and immediate upon the client clicking "Submit Application". The portal does not schedule or delay this.

---

## Success Criteria

1. A client can complete all sections in a single session without losing any previously saved data.
2. The progress bar reflects the correct percentage after each section is saved, with no manual refresh required.
3. The "Review & Submit" section is locked until all four prior sections are complete — verified by attempting to access it with incomplete sections.
4. Application submission triggers an activity log entry and updates the Dashboard mortgage mini-card to 100% within the same session.
5. Pre-filled fields (name, address, price) are populated correctly on first open of the Mortgage screen, sourced from session and transaction data.

---

## Open Questions

1. Should the Employment History section distinguish between W-2 employees and self-employed applicants? Self-employed users need different fields (business name, years in business, business income vs. gross salary).
2. Is there a maximum number of employer entries? Five is the suggested practical limit but needs product confirmation.
3. After submission, should the client be able to view the transmitted application as a PDF, or only the individual section summaries?

---

## Dependencies

- **Depends on**: 000-foundation (tokens, badges, alert banners, activity log); 002-documents (Purchase Agreement status feeds the tracker table)
- **Required by**: 001-dashboard (mortgage mini-card reads `mortgage.*` data); Activity log feeds the Dashboard activity feed
