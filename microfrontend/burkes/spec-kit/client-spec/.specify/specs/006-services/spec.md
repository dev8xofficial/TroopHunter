# Services Module Spec

**Feature ID**: 006-services  
**Status**: Draft  
**Created**: 2026-04-15  

## Overview
The Services module connects clients with pre-vetted, third-party service providers (e.g., plumbers, roofers, electricians) dynamically filtered by the transaction's property zip code.

## Problem Statement
Clients moving into a new property frequently require trusted local contractors. Providing a curated directory constrained by their specific property zip code adds value and enforces quality control over who the client hires.

## Actors and Permissions
- `ROLE_CLIENT`: Can view recommended service providers and filter by category.
- `ROLE_ADMIN`: Manages the global registry of service providers (out of scope for this client module context).

## User Scenarios
1. **Scenario**: Retrieving local plumbers.
   - Precondition: Property address is `123 Main Street, The Woodlands, TX 77380`.
   - System Event: Client navigates to Services screen -> Plumbing. Client's postal code (`77380`) is determined from transaction context.
   - Postcondition: System returns service providers overlapping with service area `77380` and category `PLUMBING`.

## Functional Requirements
- **FR-006-01**: The system MUST return service providers filtered by an implicitly provided `zip_code` or explicitly requested one.
- **FR-006-02**: The system MUST categorize providers (e.g., Plumbing, Roofing, Electrical).
- **FR-006-03**: The system MUST return aggregate ratings, review counts, and contact methods per provider.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|-------|------|------------|-------------|
| `provider_id` | string(uuid) | SYSTEM | PK |
| `name` | string | SYSTEM | Max 255 |
| `category` | string | SYSTEM | Enum [PLUMBING, ROOFING, ELECTRICAL, CREDIT_REPAIR, ...] |
| `is_recommended`| boolean | SYSTEM | |
| `rating` | float | SYSTEM | 0.0 to 5.0 |
| `review_count`| integer | SYSTEM | >= 0 |
| `contact_phone`| string | SYSTEM | Valid phone format |
| `contact_name`| string | SYSTEM | Nullable |
| `service_areas`| string array | SYSTEM | Array of valid zip codes |

## Success Criteria
- Services API latency `< 150ms` using geospatial or indexed zip code querying.
- No PII is required from the client to just view the directory.
