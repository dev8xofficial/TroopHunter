# 005-Verification

**Feature ID:** 005-verification
**Status:** Draft
**Created Date:** 2026-04-15

## Overview
The Verification module is the strict, high-risk auditing gateway of the system. It enforces that all closing values (sale price, loan amount, down payment, closing costs) mathematically reconcile before the transaction enters a final closing state. It manages Asset Split negotiations for divorce distributions.

## Problem Statement
Real estate closings frequently suffer from discrepancies between broker contracts and lender closing disclosures. The Closing Attorney must actively sign-off on a reconciled financial ledger.

## Actors and Permissions
* **closing_attorney**: `UPDATE` values, `CREATE` discrepancy flags, `CREATE` split approvals, `CREATE` mathematical confirmations.

## User Scenarios
* **Precondition:** Transaction `status = needs_verification`.
  * **System Event Sequence:** Attorney posts a verification confirmation. System evaluates checklist and asserts `contract_amount == sale_price_verification`. System transitions transaction to `verified` and emits `TransactionVerified`.
  * **Postcondition:** Case queued for Title.

## Functional Requirements
* **FR-VER-01:** System MUST restrict verification mutations exclusively to tokens holding the `closing_attorney` role.
* **FR-VER-02:** System MUST record the literal string sequence of the attorney's signature timestamp natively alongside the approval payload.
* **FR-VER-03:** System MUST allow modifications to `asset_split` distributions that pause the parent transaction state until re-verified.
* **FR-VER-04:** Flagging a discrepancy MUST transition the parent transaction to `flagged` immediately.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|---|---|---|---|
| `verification_id` | string | System | UUID |
| `transaction_id` | string | System | Valid foreign key |
| `sale_price` | number | attorney | `>= 0` |
| `loan_amount` | number | attorney | `>= 0` |
| `closing_costs` | number | attorney | `>= 0` |
| `attorney_signature` | string | attorney | Matches logged-in identity |
| `split_party_a_pct` | number | attorney | `0-100` |
| `split_party_b_pct` | number | attorney | `0-100` (A+B = 100) |

## State Transition Table
See `state-machines.md` (Integrates tightly with module 002).

## Edge Cases
* **Asymmetric Splits:** Asset splits that do not mathematically sum to exactly 100.00% MUST be rejected by the backend.

## Success Criteria
* Verification payload securely ties the payload parameters with the verifying attorney's exact session token at the moment of approval.
