# 006-Analytics Module Specification
Feature ID: 006-analytics
Status: Draft
Created: 2026-04-16

## Overview
The Analytics module provides time-bounded summation logic across the entire platform's database. It projects high-level KPIs determining platform revenue, transactional volume, user acquisition, and closing velocity.

## Problem Statement
Administrators need to analyze historical system performance without relying on operational views that strictly depict the *current* state of affairs. 

## Actors & Permissions
- **Admin**: Has implicit READ on all analytical queries globally. This domain does not support WRITE operations.

## User Scenarios
- **Filter Historical Performance**: Admin authenticates → Selects `trailing_90_days` filter → System calculates aggregations mapped against historical transaction records → Returns delta changes compared to previous 90-day block.

## Functional Requirements
- **FR-006-01**: The system must provide endpoints to aggregate metric projections based on predefined time blocks (`last_7_days`, `last_30_days`, `last_90_days`, `last_year`, `all_time`).
- **FR-006-02**: All aggregated metric returns must include a delta calculation measuring percentage variance against the equivalent preceding period.
- **FR-006-03**: The system must synthesize a continuous time-series array of transaction volume for charting purposes.

## Data & State Table
| Field Name | Type | Owner Role | Constraints |
| --- | --- | --- | --- |
| `total_revenue` | Decimal | System | Computed from `contract_amount` |
| `closed_transactions` | Integer | System | Count of `completed` stage |
| `avg_transaction_value`| Decimal | System | Mean of `contract_amount` |
| `new_users` | Integer | System | Count within time block |
| `avg_close_time` | Integer | System | Mean days, creation to `completed`|
| `partner_referrals` | Integer | System | Count of bound partners |

## Edge Cases
- Requesting `all_time` comparisons against a "preceding period". The system must return null or `0` for the delta variance property since there is no preceding block.

## Success Criteria
- Analytics queries encompassing 5+ years of historical data execute within 2 seconds using appropriate caching or materialized views.

## Dependencies
- 000-foundation
- 004-transactions (Primary aggregation source)
- 002-users
