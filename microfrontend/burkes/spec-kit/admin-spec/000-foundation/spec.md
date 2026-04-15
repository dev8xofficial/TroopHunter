# 000-Foundation Module Specification
Feature ID: 000-foundation
Status: Draft
Created: 2026-04-16

## Overview
The foundation module establishes the global configuration, cross-domain role boundaries, and shared architectural invariants necessary for the Admin application. It defines the core session payload structure and global state values underpinning the rest of the Administration portal operations.

## Problem Statement
A centralized system bridging multiple domains (clients, attorneys, transactions) requires an unassailable global context. The foundation dictates session limits, the canon of roles, and exactly how cross-cutting concerns like global event logging are managed before specific features are mounted.

## Actors & Permissions
- **Admin**: Has implicit READ on all global domain entities, explicit WRITE access bound by domain invariants.
- **System**: Invokes global side effects such as time-to-live evaluations on sessions or event pruning.

## Functional Requirements
- **FR-000-01**: The system must enforce a session context containing an authenticated subject GUID and `role` bounded by the global Role Enum.
- **FR-000-02**: All cross-domain state mutations must dispatch an activity log trace containing `actor_id`, `event_type`, and `timestamp`.
- **FR-000-03**: The system must support asynchronous event notification routing targeting `actor_id` references.

## Data Vocabularies
| Field Name | Type | Owner Role | Constraints |
| --- | --- | --- | --- |
| `session_token` | string | System | JWT format, 1h TTL |
| `actor_id` | uuid | System | Unique identifier |
| `role_type` | enum | Admin | `admin`, `client`, `agent`, `attorney`, `lender`, `cpa` |
| `timestamp` | UTC Date | System | Immutable once set |

## Dependency
None. Foundation precedes all other modules.
