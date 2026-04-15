# 004-Transactions Module Specification
Feature ID: 004-transactions
Status: Draft
Created: 2026-04-16

## Overview
The Transactions module is the core orchestrator of the real estate lifecycle. It defines the central `Transaction` entity that links clients, agents, attorneys, and properties together through a strict 12-stage sequential progression.

## Problem Statement
Real estate transactions involve heterogeneous participants pushing state simultaneously. The system needs a rigorous, centralized state machine governed by the Admin portal to ensure transitions (like moving to closing) cannot be falsified by a single participant or stalled without visibility.

## Actors & Permissions
- **Admin**: Has explicit global READ and override UPDATE access to unblock stalled stages if heuristic rules fail.
- **Agent/Client/Attorney/Lender**: Participants with scoped READ/UPDATE actions depending on the current stage and RBAC bindings.

## User Scenarios
- **Monitor Transaction SLA**: Admin views Transactions endpoint → System computes SLA flags (`on_track`, `delayed`, `closing_soon`, `at_risk`) based on `closing_date` proximity and current stage → Admin intercepts delayed closings.
- **Force Stage Progression**: Escrow attorney is offline. Admin receives out-of-band verification → Admin submits `UpdateTransactionStage` payload to manually bypass Stage 7 guard → Transaction enters Stage 8.

## Functional Requirements
- **FR-004-01**: The system must enforce a linear, unidirectional progression through defined enum stages (1 to 12).
- **FR-004-02**: The system must dynamically compute and project a `health_status` enum (`on_track`, `closing_soon`, `delayed`, `at_risk`) based on predefined time-to-close deltas.
- **FR-004-03**: The system must allow querying transactions by `stage`, `type`, and `health_status`.
- **FR-004-04**: Only individuals with an `admin` role may forcefully bypass document prerequisite guards between stages.

## Data & State Table
| Field Name | Type | Owner Role | Constraints |
| --- | --- | --- | --- |
| `transaction_id` | String | System | Format `TRX-[0-9]{5}` |
| `client_id` | UUID | System | Foreign Key to User |
| `property_address` | String | Agent/Admin| Length [10, 255] |
| `transaction_type`| Enum | Agent/Admin| `purchase`, `sale`, `refinance`, `divorce` |
| `contract_amount` | Decimal | Agent/Admin| Nullable until `offer_negotiation` |
| `stage` | Enum | System | 12 fixed lifecycle steps |
| `health_status` | Enum | System | `on_track`, `closing_soon`, `delayed`, `at_risk` |
| `closing_date` | Date | Admin/Agent| Future-dated required |

## Edge Cases
- A transaction type of `divorce` does not necessarily contain a `contract_amount`. Numeric validations must be bypassed for this type enum.
- A stage rollback. Business logic strictly prohibits moving from stage 9 back to stage 3. If a deal falls through, the system state moves to a terminal `cancelled` state (implied, though not in the happy path).

## Success Criteria
- Transactions list filters combine cleanly across millions of rows with sub-200ms latency.

## Dependencies
- 000-foundation
- 002-users (for `client_id`)
