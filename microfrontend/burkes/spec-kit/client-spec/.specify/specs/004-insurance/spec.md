# Insurance Module Spec

**Feature ID**: 004-insurance  
**Status**: Draft  
**Created**: 2026-04-15  

## Overview
The Insurance module manages the capture and verification of the client's home, auto, and home warranty insurance details. It tracks the completion state of each policy type and aggregates them into an overall insurance compliance metric required before closing.

## Problem Statement
The Lender and Attorney both require proof of insurance before underwriting and closing can be finalized. The client needs a structured format to provide policyholder data, carrier information, and upload verification documents without having to email unencrypted PDFs to different parties.

## Actors and Permissions
- `ROLE_CLIENT`: Can create/update their insurance policy details and upload supporting documents.
- `ROLE_LENDER`: Can read the Home and Auto insurance policies to verify coverage for mortgage underwriting.
- `ROLE_ATTORNEY`: Can read Home and Warranty policies for the final closing disclosure.

## User Scenarios
1. **Scenario**: Client updates Auto Insurance details.
   - Precondition: Auto Insurance policy status is `PENDING`.
   - System Event: Client submits `PUT /insurance/auto` payload with VIN and policyholder details.
   - Postcondition: Policy status updates to `COMPLETED`, triggering an activity log event.

2. **Scenario**: Overall Insurance compliance check.
   - Precondition: System evaluates Stage 6 (`INSURANCE_SETUP`).
   - System Event: Verification hook checks if `Home`, `Auto`, and `Warranty` statuses are all `COMPLETED`.
   - Postcondition: Stage 6 marks completed and dashboard metric returns `3/3`.

## Functional Requirements
- **FR-004-01**: The system MUST store `InsurancePolicy` entities categorically defined as `HOME`, `AUTO`, or `WARRANTY`.
- **FR-004-02**: The system MUST enforce specific validation rules per category (e.g. 17-character VIN constraint for `AUTO`).
- **FR-004-03**: The system MUST relate uploaded `document_id`s directly to the respective `InsurancePolicy`.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|-------|------|------------|-------------|
| `policy_id` | string(uuid) | SYSTEM | PK |
| `transaction_id` | string(uuid) | SYSTEM | FK |
| `policy_type` | string | SYSTEM | Enum [HOME, AUTO, WARRANTY] |
| `status` | string | SYSTEM | Enum [NOT_STARTED, PENDING, COMPLETED] |
| `policyholder_name` | string | Client | Max 255 |
| `dob` | date | Client | Format YYYY-MM-DD |
| `property_address`| string | Client | Required for HOME/WARRANTY |
| `vin_number` | string | Client | Length 17, Required for AUTO |
| `additional_info` | string | Client | Max 1000 chars |

## Success Criteria
- 100% of required fields pass validation prior to allowing a `COMPLETED` state.
- Lenders can successfully retrieve the structured insurance JSON alongside the raw document PDF.
