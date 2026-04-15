# 002-Transactions

**Feature ID:** 002-transactions
**Status:** Draft
**Created Date:** 2026-04-15

## Overview
The Transactions module owns the core `transaction` entity. It handles lifecycle transition rules, fetching filtered sets based on case type or status, and tracking the property contract amount across its multi-month closing period.

## Problem Statement
Real estate closings are stateful and multi-party processes. The system must enforce that a transaction cannot close until the attorney completely verifies the financial aspects, preventing liability in multi-million dollar deals.

## Actors and Permissions
* **closing_attorney**: Full ownership over transactions they are assigned to.
* **real_estate_agent**: Creates `purchase` and `sale` transactions.
* **title_company**: Only reads after transaction reaches `title_review` or `verified`.

## User Scenarios
* **Precondition:** Transaction is in `needs_verification`.
  * **System Event Sequence:** Attorney calls verification API. System checks if `closing_date` is valid. System transitions state to `verified`.
  * **Postcondition:** Transaction is locked from further document modifications.

## Functional Requirements
* **FR-TRX-01:** System MUST store the canonical `contract_amount` and `closing_date` for every transaction.
* **FR-TRX-02:** System MUST allow filtering transactions by `case_type` (purchase, sale, divorce) and `transaction_status`.
* **FR-TRX-03:** System MUST reject transitions from `needs_verification` to `verified` if any documents are in `needs_review` state (checked synchronously).

## Data & State Table
| Field | Type | Owner Role | Constraints |
|---|---|---|---|
| `transaction_id` | string | System | UUID |
| `client_id` | string | agent/attorney | Valid foreign key to client |
| `property_address` | string | agent | Max 255 chars |
| `case_type` | enum | agent | `purchase_closing`, `sale_closing`, `divorce_asset_split` |
| `contract_amount` | number | agent | `> 0` |
| `closing_date` | string | agent | Future date upon creation |
| `transaction_status` | enum | attorney | Starts at `document_gathering` |

## State Transition Table
See `state-machines.md`.

## Edge Cases
* **Divorce Case Without Split:** A `divorce` transaction without an associated asset split should block verification.
* **Closing Date Lapses:** If a transaction exceeds the closing date without being `completed`, it should automatically be `flagged`.

## Success Criteria
* 100% of state transitions are recorded in the Activity Log.
* Transaction status acts as a strict write-barrier for document upload API endpoints.

## Dependencies
* Depends on 004-clients.
* Blocking dependency for 003-documents and 005-verification.
