# Documents Module Spec

**Feature ID**: 002-documents  
**Status**: Draft  
**Created**: 2026-04-15  

## Overview
The Documents module provides secure, role-segmented file storage for the transaction. It supports categorical organization (Purchase & Sale, Mortgage & Financial, Legal & Closing), electronic signature tracking, and strict visibility rules determining which transaction partner can see which document.

## Problem Statement
Real estate transactions involve diverse, sensitive document groups. A centralized document registry is required to enforce who can read, sign, or download specific files without leaking financial artifacts to the real estate agent or legal artifacts to the lender inappropriately.

## Actors and Permissions
- `ROLE_CLIENT`: Can upload unclassified documents. Must sign documents assigned to them.
- `ROLE_AGENT`: Can upload & read 'Purchase & Sale' documents.
- `ROLE_LENDER`: Can upload & read 'Mortgage & Financial' documents.
- `ROLE_ATTORNEY`: Can upload & read 'Legal & Closing' documents.
- `ROLE_CPA`: Can read conditionally allowed financial/legal documents.

## User Scenarios
1. **Scenario**: Signature request on Purchase Agreement.
   - Precondition: `ROLE_AGENT` uploads "Purchase Agreement" and sets `status=NEEDS_SIGNATURE`.
   - System Event: Client retrieves document metadata and submits signature payload.
   - Postcondition: Document transitions to `APPROVED` and immutability is asserted.

2. **Scenario**: Filtering docs by status.
   - Precondition: Client requests documents.
   - System Event: API queried with `?status=NEEDS_SIGNATURE`.
   - Postcondition: System returns only those documents pending client's signature.

## Functional Requirements
- **FR-002-01**: The system MUST store `category` and `status` for every document.
- **FR-002-02**: The system MUST restrict visibility of certain categories from specific roles (e.g., Agents cannot see Mortgage Financials unless explicitly permitted).
- **FR-002-03**: The system MUST enforce a maximum file size limits (25MB) and allow extensions: pdf, docx, jpeg, png.
- **FR-002-04**: The system MUST generate a signed download URL when a permitted user retrieves a document.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|-------|------|------------|-------------|
| `document_id` | string(uuid) | SYSTEM | PK |
| `transaction_id` | string(uuid) | SYSTEM | FK |
| `filename` | string | Actor | Max 255 chars |
| `size_bytes` | integer | SYSTEM | Max 26214400 |
| `category` | string | SYSTEM | Enum [PURCHASE, FINANCIAL, LEGAL, OTHER] |
| `status` | string | SYSTEM | Enum [NEEDS_SIGNATURE, NEEDS_REVIEW, APPROVED] |
| `uploaded_by_id` | string(uuid) | SYSTEM | -> User |
| `uploaded_by_role` | string | SYSTEM | Enum |

## Success Criteria
- Documents are successfully signed and trigger subsequent state transitions.
- Roles cannot access unauthorized file categories via direct ID requests.
