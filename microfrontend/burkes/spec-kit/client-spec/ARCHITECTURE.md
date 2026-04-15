# Portal Backend Architecture Overview

This document provides a high-level view of The Burkes Group Client Portal's backend architecture: how microservices connect, how data flows, where role-based access intersect, and how the core event definitions support the 11-stage transaction lifecycle.

---

## 🏗️ Architectural Principles

The backend system is designed around these core principles:

1. **API-First Design** — All functionality is exposed via a RESTful/JSON API Gateway consumed by client applications.
2. **Role-Based Data Isolation** — Strict RBAC is enforced at the gateway and service levels; users can only query/mutate authorized records.
3. **Event-Driven Audit Trail** — Every mutation (create, update, delete) publishes an immutable event to a central Activity topic.
4. **Finite State Machines** — Business logic relies on explicit state transitions rather than derived, loosely coupled statuses.
5. **Distributed Storage** — Heavy binary data (documents, avatars) is stored in cloud blobs (e.g., S3) via pre-signed URLs; databases store pure metadata.
6. **Stateless Operations** — All API servers are stateless; sessions are verified via JWT matching against a fast token-store middleware.

---

## 🖥️ System Architecture

The ecosystem consists of **6 API Service Domains** sharing a common **Foundation** layer (Gateway and Cross-Cutting Concerns):

```
┌─────────────────────────────── FOUNDATION LAYER ───────────────────────────────┐
│                                                                                  │
│  • API Gateway & Routing (Reverse proxy, rate limiting, payload sanitization)    │
│  • Authentication Middleware (JWT validation, session scope parsing)             │
│  • Global Event Bus (Pub/Sub for the append-only audit trail)                    │
│  • RBAC Evaluation Engine (Validates actor permissions per endpoint)             │
│                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────┘

┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐
│ Dashboard  │  │ Documents  │  │ Messages   │  │ Insurance  │  │ Mortgage   │  │ Services   │
│ Aggregator │  │ API Service│  │ Websockets │  │ Forms API  │  │ Underwrite │  │ Partner Lnk│
│    001     │  │    002     │  │    003     │  │    004     │  │    005     │  │    006     │
└────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘  └────────────┘
      │               │               │               │               │               │
      │               │               │               │               │               │
      └───────────────┴───────────────┴───────────────┴───────────────┴───────────────┘
                                      │
                              ACTIVITY EVENT BUS (Pub/Sub)
                              PRIMARY CLUSTER DATABASE (Read/Write)
                              CACHE / MESSAGE BROKER (Redis/RabbitMQ)
```

---

## 🎯 Domain Service Responsibilities

### 001 — Dashboard Aggregator Service

**Purpose**: Acts as an API Composition layer to fetch parallel data streams for client overviews.
**Primary Clients**: Frontend Client applications (Read-Only)
**Stage Focus**: All stages at a glance

**Key Endpoints**:
- `GET /api/v1/dashboard/summary`: Aggegrates transaction completion, document counts, and next-appointment stats.
- `GET /api/v1/dashboard/feed`: Fetches the latest 6 events from the foundation's event log.
- `GET /api/v1/dashboard/action-items`: Calculates the most pressing outstanding items combining mortgage, insurance, and document APIs.

**Data Operations**: Read-Only composition.

---

### 002 — Documents Service

**Purpose**: Core CRUD API for document metadata, orchestrating uploads with Cloud Storage and managing e-signature handoffs.
**Primary Clients**: All authorized roles

**Key Endpoints**:
- `POST /api/v1/documents/upload-url`: Returns an S3 pre-signed URL for direct binary upload.
- `POST /api/v1/documents`: Commits the newly uploaded document's metadata to the database.
- `GET /api/v1/documents/download/{id}`: Generates a short-lived download link.
- `PATCH /api/v1/documents/{id}/status`: Transitions a document state (e.g. `needs-signature` to `approved`).

**Data Writes**: Database inserts, S3 bucket mutations, Activity Log generation.

---

### 003 — Messages Service

**Purpose**: Manages secure, real-time message exchange and thread indexing. Supports WebSocket lifecycle.
**Primary Clients**: All authorized roles

**Key Endpoints**:
- `GET /api/v1/messages/threads`: Retrieves threads associated with the authenticated context.
- `POST /api/v1/messages/emit`: Dispatches a new message.
- `WS /ws/v1/messages`: Upgrades connection for real-time pushing of new message events to clients.

**Data Writes**: Message appending, thread "last-read" timestamp updates.

---

### 004 — Insurance Forms API

**Purpose**: Handles validation, normalization, and persistence of nested insurance information packets.
**Primary Clients**: Client (Mutator), Lender/Admin (Reader)

**Key Endpoints**:
- `GET /api/v1/insurance/{transaction_id}`: Retrieves all linked insurance records.
- `PUT /api/v1/insurance/{transaction_id}/{type}`: Updates specific policy data.

**Data Writes**: Policy updates, metadata links, status recalculations.

---

### 005 — Mortgage Underwriting Service

**Purpose**: Manages the strict state machine of mortgage application progression, pre-approval details, and conditional requirements.
**Primary Clients**: Lender (Mutator), Client (Consumer)

**Key Endpoints**:
- `PATCH /api/v1/mortgage/application/step`: Advances the client application process.
- `PUT /api/v1/mortgage/pre-approval`: Lender interface to inject rate, lock dates, and amounts.
- `POST /api/v1/mortgage/conditions`: Generates specific underwriting tasks mapped to required documents.

**Data Writes**: Mortgage step progression, conditional stipulations.

---

### 006 — Services & Partners API

**Purpose**: Exposes third-party integration routing and vendor directory data logic.
**Primary Clients**: Agent (Admin/Setup), Client (Execution)

**Key Endpoints**:
- `GET /api/v1/services/directory`: Fetches available vendors filtered by property geolocation radius.
- `POST /api/v1/services/schedule`: Emits scheduling requests, sometimes delegating to third-party Webhooks.

**Data Writes**: Appointment inserts, vendor status mutations.

---

## 🔄 Data Flow

### Scenario 1: Pre-Signed Document Upload Workflow

```text
Client Application
    │
    ├─1. Request Upload URL ─► `POST /documents/upload-url` 
    │    (Returns: AWS S3 signed URL & strict CORS headers)
    │
    ├─2. Direct PUT to S3 ───► Cloud Storage Bucket
    │    (Bypasses application gateway for bandwidth offload)
    │
    └─3. Commit Metadata ────► `POST /documents`
         │
         ├─► Validate user role & transaction scope
         ├─► Database Write (metadata row: `under-review`)
         └─► Event Bus Publish (Topic: `doc.uploaded`, Event: 📄 Insurance Document)
             │
             └─► Notification Worker (Sends Push/Email async)
```

### Scenario 2: Mortgage Underwriting Stage Transition

```text
Lender API Client
    │
    └─► `PUT /mortgage/pre-approval` (Payload: { status: "approved", amount: 400000 })
         │
         ├─► RBAC Engine verifies `role === "lender"`
         ├─► State Machine validation (Must be in valid underwriting status)
         ├─► Database Write
         └─► Event Bus Publish (Topic: `mortgage.updated`, Event: ✅ Pre-Approval Granted)
             │
             └─► Aggregator Cache Invalidation Work
```

### Scenario 3: Real-Time Communication Pipeline

```text
Message Service (WebSocket Node)
    │
    ├─► `POST /messages/emit` (Receiver logic)
    │    │
    │    ├─► Write to DB (Message Record, Attachments pointer)
    │    ├─► Event Bus Publish (`message.received`)
    │    └─► WS Distributor 
    │        │
    │        └─► Push JSON payload to active sockets for intended recipients
```

---

## 🗂️ Core Data Model (Schemas)

The following entities represent JSON representations across the APIs.

### Transaction
```json
{
  "transaction_id": "uuid",
  "client_id": "uuid",
  "property_address": "string",
  "purchase_price": "numeric",
  "current_stage": "integer(1-11)",
  "created_at": "iso8601",
  "updated_at": "iso8601"
}
```

### Document Metadata
```json
{
  "document_id": "uuid",
  "transaction_id": "uuid",
  "category": "enum(purchase-sale, mortgage, legal, insurance)",
  "filename": "string",
  "file_size": "integer",
  "mime_type": "string",
  "uploader_role": "enum",
  "status": "enum(needs-signature, under-review, approved)",
  "uploaded_at": "iso8601",
  "storage_path": "string (internal S3 key)"
}
```

### Activity Event
```json
{
  "event_id": "uuid",
  "transaction_id": "uuid",
  "timestamp": "iso8601",
  "actor_role": "enum",
  "event_type": "string (e.g. doc.uploaded)",
  "payload": {
     "description": "string",
     "entity_id": "uuid"
  }
}
```

---

## 🔐 Access Control & Authorization Checks

Every API request passes through the **RBAC Evaluation Engine**.
Permissions are typically modeled per endpoint and method:

| Domain Namespace     | Client | Agent | Lender | Attorney | CPA | TC  |
| -------------------- | ------ | ----- | ------ | -------- | --- | --- |
| `GET /transaction`   | ✓      | ✓     | ✓      | ✓        | ✓   | ✓   |
| `POST /documents`    | Cntxt  | Cntxt | Cntxt  | Cntxt    | -   | ✓   |
| `GET /documents`     | ✓      | ✓     | ✓      | ✓        | ✓   | ✓   |
| `GET /activity`      | ✓      | ✓     | ✓      | ✓        | ✓   | ✓   |
| `PUT /insurance`     | ✓      | -     | -      | -        | -   | ✓   |
| `PUT /mortgage`      | ✓      | -     | ✓      | -        | -   | ✓   |
| `POST /messages`     | ✓      | ✓     | ✓      | ✓        | ✓   | ✓   |

*(Cntxt: Role context validation applies, e.g. Client can only upload into permitted categories).*

---

## 📡 Integration Points

### With External Systems

1. **Authentication Provider (Auth0/Okta)**
   - API verifies RS256 JWT signatures for every incoming request.

2. **Lender APIs (Loan Origination Systems - LOS)**
   - Bidirectional Webhooks for mortgage progression syncing.
   - External LOS pushes JSON updates to `/api/v1/webhooks/lender`.

3. **Cloud Object Storage (AWS S3)**
   - Application generates pre-signed PUT/GET URLs. Traffic does not bottleneck through the Node servers.

4. **E-Signature Provider Webhooks (DocuSign/PandaDoc)**
   - Exposes `/api/v1/webhooks/signatures` to listen for envelope completion events resulting in document `approved` state transitions.

---

## 🔄 Finite State Machines

### Transaction Lifecycle Workflow (Background Orchestration)

State transitions are strictly linear and validated by the backend.

```text
STAGE_1_CONSULTATION
    ↓ (Event: property.identified)
STAGE_2_SEARCH
    ↓ (Event: offer.accepted)
STAGE_3_CONTRACT
    ↓ (Logic: Docs threshold met)
STAGE_4_DOCS
    ↓ (Event: mortgage.pre_approval_issued)
STAGE_5_MORTGAGE
    ↓ (Event: insurance.binder_received)
STAGE_6_INSURANCE
    ↓ (Event: legal.clear_to_close)
(...)
```

### Document Verification State

```text
[HTTP POST to /documents] ---> UNDER_REVIEW
                                   ↓ (Admin explicitly flags)
                               NEEDS_SIGNATURE
                                   ↓ (Webhook: Signature Complete)
                               APPROVED
```

---

## 📊 Performance & Scale Targets

| Metric                           | Target      |
| -------------------------------- | ----------- |
| API p95 Latency                  | < 150 ms    |
| Aggregator Endpoint Response     | < 250 ms    |
| Presigned URL Generation         | < 50 ms     |
| WebSocket broadcast lag          | < 100 ms    |
| Concurrent Websocket connections | 10k per node|
| Gateway Rate Limit Target        | 500 req/min |

---

**Version**: 2.0 (Backend Specification Edition)  
**Last Updated**: April 15, 2026  
**Authority**: Backend Architecture Team
