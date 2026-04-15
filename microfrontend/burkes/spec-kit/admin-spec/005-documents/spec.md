# 005-Documents Module Specification
Feature ID: 005-documents
Status: Draft
Created: 2026-04-16

## Overview
The Documents module serves as the central clearinghouse for digital artifacts uploaded across all portals. It binds physical files to validation workflows, enforcing strict categorisation and secondary approval loops by Administration before a document is considered valid.

## Problem Statement
Real estate transactions possess stringent compliance demands. An agent uploading a "Closing Disclosure" does not make it legally valid. The system needs an oversight abstraction where Administrators explicitly transition documents from `needs_review` to `approved` before upstream systems (like the Transactions stage machine) accept them as verified prerequisites.

## Actors & Permissions
- **Admin**: Has global READ over all documents. Has terminal UPDATE authority on document statuses locally in the unified review queue.
- **Agent/Client/Attorney/Lender/CPA**: Uploader roles, acting strictly as document originators based on domain assignments. 

## User Scenarios
- **Approve Transaction Artifact**: Admin views global document queue → Filters by `needs_review` → Reviews a "Purchase & Sales Agreement" → Submits payload setting status to `approved` → System commits state → Dependent transaction evaluates if its stage constraints are now met.

## Functional Requirements
- **FR-005-01**: A document uploaded by a participant must default strictly to `needs_review`.
- **FR-005-02**: An Administrator attempting to set document status to `rejected` must provide a non-empty `rejection_reason` string.
- **FR-005-03**: The system must enforce category constraints mapping directly to real estate artifact types (`purchase_agreement`, `closing_disclosure`, `mortgage_docs`, `insurance_docs`, `title_docs`, `divorce_agreement`, `inspection_report`).

## Data & State Table
| Field Name | Type | Owner Role | Constraints |
| --- | --- | --- | --- |
| `document_id` | UUID | System | Unique primary key |
| `filename` | String | Submitter| Length [1, 255] |
| `category` | Enum | Submitter| Enumerated doc types |
| `transaction_id` | String | System | Maps to `TRX-[0-9]{5}` (if applicable) |
| `uploaded_by` | UUID | System | Maps to `user_id` of submitter |
| `status` | Enum | Admin | `needs_review`, `under_review`, `approved`, `rejected` |
| `rejection_reason` | String | Admin | Required if status == `rejected` |

## Edge Cases
- **Orphan Documents**: A document uploaded independent of a transaction (e.g. Identity Verification). The `transaction_id` property must be strictly permitted to be null.

## Success Criteria
- Global queue lookups encompassing thousands of pending documents across all active transactions filter in under 150ms.

## Dependencies
- 000-foundation
- 002-users (for `uploaded_by`)
- 004-transactions (for `transaction_id`)
