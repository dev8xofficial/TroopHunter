# 002-Users Module Specification
Feature ID: 002-users
Status: Draft
Created: 2026-04-16

## Overview
The Users module handles the creation, identity resolution, global tracking, and state mitigation (approval, suspension) of individuals participating on the platform. It tracks six distinct roles (`admin`, `client`, `agent`, `attorney`, `cpa`, `lender`) with unique domain identifiers across the entire system.

## Problem Statement
A fragmented identity across multiple micro-frontends creates data inconsistency and security mapping flaws. A unified, central identity model is required so administrators can forcefully revoke or approve platform access globally, tracking the precise status and onboarding date of every participant.

## Actors & Permissions
- **Admin**: Has explicit CREATE, READ, UPDATE, and soft-DELETE constraints over all users globally.
- **Client/Agent/Attorney/Lender/CPA**: Implicilty managed by the system states governed by this domain.

## User Scenarios
- **Approve Pending User**: Admin opens verification queue → Selects user in `pending_approval` state → Submits approval payload → User state transitions to `active`, unblocking their login workflow.
- **Create New User**: Admin fills payload mapping ID, email, and role type → Submits payload → User identity created in `active` state and dispatched via email hook.

## Functional Requirements
- **FR-002-01**: The system must enforce unique constraints on email addresses; no two active/suspended identity vertices may share an email.
- **FR-002-02**: The system must expose the ability to transition a User from `pending_approval` to `active` via explicit Admin RPC.
- **FR-002-03**: The system must support paginated indexing, filtering by `role` and `status`, and free-text searching by `name` or `email`.

## Data & State Table
| Field Name | Type | Owner Role | Constraints |
| --- | --- | --- | --- |
| `user_id` | UUID | System | Unique primary key |
| `display_id` | String | System | Formatted `USR-[TYPE]-[NNN]` |
| `full_name` | String | Admin | Length [2, 100] |
| `email` | String | Admin | Valid email format, globally unique |
| `role` | Enum | Admin | `admin`, `client`, `agent`, `attorney`, `cpa`, `lender` |
| `status` | Enum | Admin | `active`, `pending_approval`, `suspended`, `inactive` |
| `joined_at` | DateTime | System | Immutable once created |

## Edge Cases
- Admin altering an Attorney's role to Agent while they are bound to an active Transaction. (Invariants must forbid role transitions while active bindings exist).

## Success Criteria
- User search queries resolve under 300ms.
- Role transitions trigger appropriate domain activity logs.

## Dependencies
- 000-foundation
