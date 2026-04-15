# Mortgage Module Spec

**Feature ID**: 005-mortgage  
**Status**: Draft  
**Created**: 2026-04-15  

## Overview
The Mortgage module facilitates the collection of the comprehensive loan application payload from the client. It aggregates personal information, property details, employment history, and financial documents, securely transmitting the finalized package to the assigned Lender.

## Problem Statement
Mortgage applications require vast amounts of sensitive PII and financial documentation. Clients need a guided, section-by-section progress tracker to submit this data, and lenders need a guaranteed complete payload before they can begin underwriting.

## Actors and Permissions
- `ROLE_CLIENT`: Can iteratively read and update the application sections. Owns the data.
- `ROLE_LENDER`: Can read the completed application sections and associated financial documents. Cannot modify the client's self-reported data.

## User Scenarios
1. **Scenario**: Iterative application completion.
   - Precondition: Application is `INCOMPLETE`. Client updates "Employment History".
   - System Event: Client sends `PATCH` payload with employment details.
   - Postcondition: System validates the payload. Updates employment section status. If all sections complete, it can be formally submitted.

2. **Scenario**: Formal submission to Lender.
   - Precondition: All 4 sections (Personal, Property, Employment, Forms) are complete.
   - System Event: Client explicitly submits application.
   - Postcondition: Application state shifts to `SUBMITTED`. Lender is notified and granted read access.

## Functional Requirements
- **FR-005-01**: The system MUST store the application as a composite of distinctly tracked sections (Personal, Property, Employment, FinancialDocs).
- **FR-005-02**: The system MUST allow saving partial progress in any given section without enforcing strict validation across the entire application simultaneously.
- **FR-005-03**: The system MUST NOT allow the `SUBMITTED` state transition unless all composite sections are internally marked complete with valid schemas.
- **FR-005-04**: The system MUST compute and return an overall "Application Progress" percentage (`0-100%`) based on section completion states.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|-------|------|------------|-------------|
| `application_id` | string(uuid)| SYSTEM | PK |
| `transaction_id` | string(uuid)| SYSTEM | FK |
| `status` | string | SYSTEM | Enum [INCOMPLETE, IN_PROGRESS, SUBMITTED] |
| `personal_info` | jsonb | Client | Specific schema |
| `property_details`| jsonb | Client | Specific schema |
| `employment_history`| jsonb array | Client | Array of employer objects |
| `progress_percent`| integer | SYSTEM | 0-100 |

## Success Criteria
- The percentage completion metric accurately reflects underlying data states.
- Lenders receive a 100% structurally complete JSON payload upon submission.
