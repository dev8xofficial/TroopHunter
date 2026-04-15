# 004-Clients

**Feature ID:** 004-clients
**Status:** Draft
**Created Date:** 2026-04-15

## Overview
The Clients module handles identity references, contact information, and internal messaging mappings for individuals tied to real estate cases.

## Problem Statement
Attorneys and Agents need to communicate securely with buyers/sellers and view associated transactional histories under a unified profile without duplicating personal data across multiple independent transactions.

## Actors and Permissions
* **closing_attorney**: `READ` any client attached to an assigned transaction.
* **admin**: `CREATE`, `UPDATE` client core identities.
* **client**: `READ` own profile, `UPDATE` contact information.

## User Scenarios
* **Precondition:** Attorney is viewing a list of transactions.
  * **System Event Sequence:** Attorney fetches client profile via `client_id`. System evaluates if Attorney is mapped to any transaction owned by `client_id`. System returns client details.
  * **Postcondition:** Client identity details surfaced to Attorney securely.

## Functional Requirements
* **FR-CLI-01:** System MUST store the authoritative contact details for each client securely.
* **FR-CLI-02:** System MUST allow secure, transactional message delivery routing from `closing_attorney` to `client`.
* **FR-CLI-03:** System MUST prevent traversal. An attorney cannot fetch a `client` payload if they share zero active transactions.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|---|---|---|---|
| `client_id` | string | System | UUID |
| `first_name` | string | admin/client | Max 100 |
| `last_name` | string | admin/client | Max 100 |
| `email` | string | admin/client | Unique, valid format |
| `phone_number` | string | admin/client | E.164 format |

## State Transition Table
N/A - Client identity details do not flow through a state machine comparable to a transaction.

## Edge Cases
* **Repeat Clients:** A client engaging in a sale then a purchase 3 years later should utilize the same `client_id` with an appended `transaction_id` list.

## Success Criteria
* PII (email, phone) is encrypted at rest.
* Messaging payload traces clearly to a specific `transaction_id`.
