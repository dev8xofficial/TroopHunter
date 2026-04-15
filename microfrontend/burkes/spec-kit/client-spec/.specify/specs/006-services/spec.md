# Feature Specification: Service Partners API

**Feature ID**: 006-services
**Status**: approved
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**API Boundary**: Vendor Directory & Third-Party Integrations

---

## Overview

The Service Partners API serves as a search engine and routing layer for preferred vendors (plumbers, inspectors, movers). It executes geographic radius searches (Geo-Routing) against the directory database and facilitates asynchronous appointment scheduling by delegating requests to vendor APIs.

---

## Problem Statement

Clients need vetted local professionals rapidly, but vendor directories are highly dependent on exact geographic overlaps. Performing complex geographic filtering or managing constantly updating vendor availability inside a monolithic frontend creates massive performance overhead. The backend must orchestrate location-based queries and abstract third-party vendor APIs behind a unified internal gateway.

---

## Goals

- Expose a performant, Geo-Spatial directory search API.
- Maintain vendor rating aggregations and cache them efficiently.
- Standardize a "Schedule Request" payload that can be transformed into vendor-specific Webhook formats.

---

## Non-Goals

- The service does not compute or store real-time calendar availability (e.g., checking if a plumber is free at 3 PM) unless a specific vendor API supports it via sync.
- It does not process payments for vendors.

---

## API Scenarios

### Scenario 1 — Geographic Vendor Search

**Actor**: Client App
**Precondition**: Client transmits their current physical location or transaction property location.
**Flow**:
1. Client GETs `/api/v1/services/search?category=plumbing&zip=77380`.
2. The Database executes a PostGIS/Geo-spatial query (or indexed zip-code lookup) to find intersection matches.
3. Backend filters the results by `is_active=true` and sorts by `is_recommended` descending, then rating.
4. Response payload is returned.

**Success**: Client quickly receives a curated list of vendors servicing their exact coordinates.

### Scenario 2 — Outbound Scheduling Request

**Actor**: Client App
**Precondition**: Client selects a vendor to schedule via the API.
**Flow**:
1. Client POSTs to `/api/v1/services/schedule` with the `provider_id`.
2. Service writes a `ServiceRequest` log to the DB.
3. System determines if the vendor supports automated API endpoints (e.g. a Home Inspector software like Spectora).
4. If yes, it transforms the payload and fires an outbound Webhook to the vendor. If no, it delegates to an asynchronous Email Worker to notify the vendor.
5. Event `service.requested` fires.

**Success**: Vendor is notified via their preferred technical medium.

---

## Functional Requirements

### FR-06-01 — Directory Querying API

- Endpoint MUST accept `category`, `zip_code` (or Lat/Long), and `limit` parameters.
- Response payload MUST NOT include internal admin metadata (e.g. contract renewal dates).
- System SHOULD cache generic category queries for busy zip codes in Redis (TTL: 1 hour) since vendor lists change infrequently.

### FR-06-02 — Category Taxonomy Enforcement

- The backend MUST enforce an explicit enum of allowed categories to prevent fragmented database indexes. (`hvac`, `plumbing`, `inspection`, `roofing`, etc.)

### FR-06-03 — Vendor Sync Automation (Internal Cron)

- A background worker MUST periodically sync rating integers (if configured with external APIs) and re-sort the primary caching layers for the `Recommended` flag logic.

---

## Data & State (Contract Schemas)

### Provider Query Response
```json
{
  "results": [
    {
      "provider_id": "uuid",
      "category": "plumbing",
      "name": "Texas Pipes",
      "contact_phone": "+1-800-555-0199",
      "features": {
        "rating": 4.8,
        "is_recommended": true
      },
      "supported_zip_codes": ["77380", "77381"]
    }
  ],
  "meta": { "total_matches": 1 }
}
```

### Scheduling Dispatch Payload
```json
{
  "request_id": "uuid",
  "transaction_id": "uuid",
  "provider_id": "uuid",
  "property_address": "string",
  "requested_service_date": "iso8601 (Optional)"
}
```

---

## Success Criteria

1. Geo-spatial or Zip-Code indexed queries resolve in <50ms even if the directory contains thousands of providers.
2. The endpoint successfully abstracts varying vendor contact methodologies (API vs Email) from the calling client.
