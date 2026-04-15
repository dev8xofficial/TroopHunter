# 003-Documents

**Feature ID:** 003-documents
**Status:** Draft
**Created Date:** 2026-04-15

## Overview
The Documents module handles the immutable, persistent storage of legal records for transactions. It tracks per-document approval states to ensure all dependencies are met before a transaction is verified.

## Problem Statement
Legal closing documents are sensitive artifacts. They cannot be silently modified or deleted. An explicit state machine is required for reviewing, approving, and formally rejecting documents with required reasons, keeping the transaction state accurate.

## Actors and Permissions
* **closing_attorney**: Can `READ` all docs for their transactions, `UPDATE` status to `approved` or `rejected`, `CREATE` court orders.
* **real_estate_agent**: Can `CREATE` purchase agreements.
* **mortgage_lender**: Can `CREATE` closing disclosures, loan documents.

## User Scenarios
* **Precondition:** Real estate agent uploads a Purchase Agreement bridging state.
  * **System Event Sequence:** Document is persisted. Document status set to `needs_review`. Transaction status may be updated based on checklist rules.
  * **Postcondition:** Event logged. Document immutable.

## Functional Requirements
* **FR-DOC-01:** System MUST persist uploaded base-64 documents bridging to secured AWS S3 bucket representations.
* **FR-DOC-02:** System MUST not allow updating document contents once successfully processed.
* **FR-DOC-03:** Rejecting a document MUST require a `rejection_reason` string.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|---|---|---|---|
| `document_id` | string | System | UUID |
| `transaction_id` | string | System | Valid foreign key |
| `category` | enum | uploader | `purchase_agreement`, `closing_disclosure`, `divorce_agreement`, `legal_document`, `financial_doc` |
| `uploader_id` | string | System | Derived securely from session token |
| `status` | enum | closing_attorney | `needs_review`, `under_review`, `approved`, `needs_revision` |
| `s3_key` | string | System | Encrypted hash pointer |

## State Transition Table
See `state-machines.md`.

## Edge Cases
* **Mismatched Category Upload:** A lender attempting to upload a divorce agreement MUST return `403 Forbidden` based on domain roles.

## Success Criteria
* No direct DELETE operations exist.
* Zero occurrences of overwritten S3 keys.
