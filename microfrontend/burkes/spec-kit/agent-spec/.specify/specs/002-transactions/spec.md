# 002-transactions: Transaction State Machine

**Status:** Draft
**Generated:** 2026-04-16

## Overview
Core finite state machine managing the real estate lifecycle, invariant enforcement across stages, and multi-actor coordination.

## Problem Statement
The system requires rigid boundary enforcement when handling transaction state machine logic. Without a strictly defined finite state machine and ownership boundaries, cross-tenant data leakage and invalid lifecycle progression could occur. This module enforces invariant constraints.

## Actors & Boundaries
- **Agent**: Mutable authority over owned transaction state machine entities.
- **Client**: Read-only observation with restricted mutability over specific consent fields.
- **System**: Enforces time-bound triggers and asynchronous background tasks.

## User Scenarios
- **Scenario A**: `PRECONDITION` Agent authenticated, entity exists -> `EVENT` Mutation requested -> `POSTCONDITION` System validates invariance, applies change, emits audit.
- **Scenario B**: `PRECONDITION` Missing prerequisites -> `EVENT` Stage progression requested -> `POSTCONDITION` System rejects transaction, returns invariant failure code.

## Functional Requirements
- **FR-ons-01**: System MUST synchronously validate all request payloads against the JSON Schema definition.
- **FR-ons-02**: System MUST reject unauthorized mutations with HTTP 403, accompanied by an audit ingestion.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|---|---|---|---|
| `id` | uuid | system | Immutable |
| `owner_id` | uuid | agent | Must valid relation |
| `status` | enum | agent | FSM constrained |

## State Transition Rules
| Entity | From | To | Trigger | Guard |
|---|---|---|---|---|
| Primary | PENDING | ACTIVE | `activation_event` | All required fields present |
| Primary | ACTIVE | CLOSED | `closure_event` | Balances resolved zero |

## Edge Cases
- Concurrency collisions during simultaneous mutations.
- Network timeouts during external API validations.
- Invalid state transition requests.

## Success Criteria
- Sustained latency under 200ms for read operations.
- 100% adherence to defined invariant guards.
