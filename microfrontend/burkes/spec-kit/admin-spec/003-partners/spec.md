# 003-Partners Module Specification
Feature ID: 003-partners
Status: Draft
Created: 2026-04-16

## Overview
The Partners module governs the intake, categorisation, and performance tracking of third-party service providers (e.g., plumbers, inspectors, electricians) who supply corollary services required to close real estate transactions.

## Problem Statement
Third-party vendors require authorization before being dispatchable within specific geographic zones during a real estate closing. Administrator oversight is required to ratify their credentials and suspend them if their service quality degrades.

## Actors & Permissions
- **Admin**: Has explicit CREATE, READ, UPDATE, and DELETE operations. Owns the approval and suspension state transitions.
- **Service Partner**: Indirectly impacted by state boundaries configured within this domain.

## User Scenarios
- **Approve Service Partner**: Admin authenticates → Views partner queue → Clicks Pending partner → Validates off-system credentials → Submits approval payload → System updates Partner status to `active` → Partner is eligible for routing logic.
- **Update Coverage Area**: Admin authenticates → Queries active partner → Appends or removes zip codes from `service_areas` → Partner indexing reflects new territory constraints.

## Functional Requirements
- **FR-003-01**: A partner cannot be transitioned to `active` unless at least one valid US zip code exists in their `service_areas` property.
- **FR-003-02**: The system must enforce enum constraints on partner categories (`plumbing`, `roofing`, `electrical`, `credit_repair`, `hvac`, `other`).
- **FR-003-03**: The system must support aggregating partners by zip code intersection.

## Data & State Table
| Field Name | Type | Owner Role | Constraints |
| --- | --- | --- | --- |
| `partner_id` | UUID | System | Unique primary key |
| `company_name` | String | Admin | Length [2, 100] |
| `primary_contact`| String | Admin | Valid email or phone format |
| `category` | Enum | Admin | Enumerated trades |
| `service_areas` | Array(String)| Admin | Array of 5-digit US Zip Codes |
| `status` | Enum | Admin | `active`, `pending_approval`, `suspended` |
| `rating` | Float | System | Range 0.0 - 5.0 |

## Edge Cases
- Partner attempts dispatch routing while status is `suspended` due to UI desync. The backend must explicitly reject any reference queries targeting non-active partners.

## Success Criteria
- Partner zip code indexing resolves geospatial intersections in under 100ms.

## Dependencies
- 000-foundation
