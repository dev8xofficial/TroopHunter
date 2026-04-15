# Dashboard Module Spec

**Feature ID**: 001-dashboard  
**Status**: Draft  
**Created**: 2026-04-15  

## Overview
The Dashboard module aggregates cross-domain transaction data, presenting key metrics, system notifications, recent documents, activity logs, and the 11-stage transaction sequence to the Client.

## Problem Statement
The Client requires unified visibility into their multi-stage property purchase to understand current responsibilities, assess progress, and quickly intercept critical updates (like missing insurance or unsigned documents).

## Actors and Permissions
- `ROLE_CLIENT`: Can read `DashboardMetrics`, `ActivityFeed`, and their assigned `Notification`s. Can update `Notification` status (e.g. read, dismiss).

## User Scenarios
1. **Scenario**: Missing requirements trigger action required alert.
   - Precondition: `MortgageApplication.is_complete` == `false`.
   - System Event: Client retrieves metrics payload.
   - Postcondition: Notification payload includes `ACTION_REQUIRED` for Mortgage Application.

2. **Scenario**: Transaction stage progress.
   - Precondition: Real estate agent uploads signed Purchase Agreement.
   - System Event: Backend transitions `Transaction` state to `UNDER_CONTRACT`.
   - Postcondition: Dashboard Timeline payloads reflect updated `UNDER_CONTRACT` completion timestamp.

## Functional Requirements
- **FR-001-01**: The system MUST return an aggregated metrics object encompassing transaction completion percentage, pending signature count, insurance completion ratio, and next appointment date.
- **FR-001-02**: The system MUST return the 11-stage timeline mapping each stage to its current status (`COMPLETED`, `IN_PROGRESS`, `PENDING`).
- **FR-001-03**: The system MUST return a chronological feed of recent `activity_log_event` items visible to `ROLE_CLIENT`.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|-------|------|------------|-------------|
| `transaction_progress` | integer | SYSTEM | 0-100 |
| `transaction_stage_id` | string | SYSTEM | Enum [1-11] |
| `docs_needing_signature` | integer | SYSTEM | >= 0 |
| `insurance_completed` | integer | SYSTEM | 0-3 |

## Success Criteria
- Time-to-retrieval for the aggregate dashboard endpoint `< 300ms`.
- Client engagement with 'Action Required' notifications resolves dependencies correctly.
