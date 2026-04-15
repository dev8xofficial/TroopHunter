# 001-Dashboard

**Feature ID:** 001-dashboard
**Status:** Draft
**Created Date:** 2026-04-15

## Overview
Aggregates urgent entity states (transactions nearing deadlines) and transactional KPIs for the logged-in attorney. It queries cross-module data to produce prioritized exception reports.

## Problem Statement
Attorneys need a consolidated view of urgent items across hundreds of cases. Real estate transactions have strict closing date liabilities; missing verification prior to closing introduces severe compliance and financial risk.

## Actors and Permissions
* **closing_attorney**: `READ` access to aggregate endpoints scoped to `assigned_transaction_ids`.

## User Scenarios
* **Precondition:** Attorney has 3 transactions with `transaction_status = needs_verification` and `closing_date < NOW() + 5 days`.
  * **System Event Sequence:** Attorney fetches priority queue. System calculates delta between `closing_date` and `NOW()`. System returns sorted list of transactions.
  * **Postcondition:** System delivers a filtered payload of high-risk transactions.

## Functional Requirements
* **FR-DSH-01:** System MUST return a list of transactions where `status == 'needs_verification'` AND `closing_date < NOW() + 14 days`, ordered descending by proximity to deadline.
* **FR-DSH-02:** System MUST aggregate `contract_amount` of all active (`in_progress`, `split_pending`, `needs_verification`) assigned transactions to produce `total_value_managed`.
* **FR-DSH-03:** System MUST fetch the 5 most recent `activity_log_event` records linked to the attorney's `assigned_transaction_ids`.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|---|---|---|---|
| `active_transactions_count` | integer | System | `>= 0` |
| `pending_verification_count` | integer | System | `>= 0` |
| `asset_splits_count` | integer | System | `>= 0` |
| `total_value_managed` | number | System | `>= 0.00` |

## State Transition Table
N/A - The dashboard primarily aggregates state from the Transaction and Document modules. It does not own state apart from caching.

## Edge Cases
* **Zero Assigned Cases:** System must return empty arrays and `.00` values safely.
* **Overwhelming Volume:** If a lawyer has > 10,000 active transactions, aggregation queries could time out. System must utilize materialized views for aggregations.

## Success Criteria
* Time to calculate priority queue < 150ms.
* Zero data leakage (Attorney A cannot see Attorney B's aggregate stats).

## Dependencies
* 002-transactions (queries transaction table)
* 003-documents (queries latest uploads)
