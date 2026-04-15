# Feature Specification: Messages Service

**Feature ID**: 003-messages
**Status**: approved
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**API Boundary**: Messaging Service

---

## Overview

The Messages Service provides backend coordination for real-time, threaded communication between transaction participants. It exposes REST endpoints for fetching message histories and creating new threads, while maintaining a bidirectional WebSocket (or Server-Sent Events) channel for real-time dispatch.

---

## Problem Statement

Stateless HTTP polling for message updates incurs massive unneeded load on the database. A dedicated pub/sub messaging microservice is required to push events statefully to connected clients, index message search efficiently, and manage attachment storage links without bloating the main `transactions` table.

---

## Goals

- Establish real-time JSON push mechanisms over WebSockets.
- Persist an immutable ledger of messages into a dedicated table/store.
- Maintain a highly efficient "unread count" aggregator per thread and user.
- Handle document attachment arrays (linking to `document_id` references from spec 002).

---

## Non-Goals

- The service does not process or transcode attachments directly; it only stores UUID references to the Documents Service blobs.
- It does not define frontend chat UI bubbles or typing animations natively, it only emits the events (`USER_TYPING`).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Sends `POST /messages`; receives via WS |
| Professionals | Sends `POST /messages`; receives via WS |
| Admin / System | Broadcasts read-only announcement cards |

---

## API Scenarios

### Scenario 1 — Establishing a Real-Time Session

**Actor**: Client App
**Precondition**: Client has a valid JWT.
**Flow**:
1. Client initiates a WebSocket connection to `wss://api.burkes.com/v1/messages/stream?token=<jwt>`.
2. Connection upgrade request hits the Gateway.
3. Gateway strips token and proxies connection to the message node.
4. Message node verifies identity and adds connection ID to the in-memory Pub/Sub channel for `transaction_id:<uuid>`.

**Success**: The socket remains open with a heartbeat interval (30s) and is ready to push events.

---

### Scenario 2 — Emitting a New Message

**Actor**: Real Estate Agent
**Precondition**: Socket connection active.
**Flow**:
1. Agent POSTs JSON payload to `/api/v1/messages/emit`.
2. Controller sanitizes content (XSS protection) and writes the row to the database.
3. Controller updates the `thread` record `last_message_at`.
4. Controller drops an event onto the Redis Pub/Sub bus.
5. All websocket nodes serving active clients subbed to `transaction_id:<uuid>` push the serialized JSON message to the connections.

**Success**: The database is persisted, and connected clients receive the update in <100ms.

---

## Functional Requirements

### FR-03-01 — Thread Queries (`GET /api/v1/messages/threads`)

- Returns all threads associated with the authenticated context.
- Payload MUST list participants and the `last_message_preview`.
- MUST compute the `unread_count` for the requesting actor based on their `last_read_timestamp`.

### FR-03-02 — Message History (`GET /api/v1/messages/threads/{id}/history`)

- MUST implement cursor-based pagination (e.g. `?before=<uuid>&limit=50`).
- Returns full message bodies and attachment metadata arrays.

### FR-03-03 — Mutation Endpoint (`POST /api/v1/messages/emit`)

- Accepts the `thread_id`, `body`, and optional `attachment_ids`.
- Validates the user has permission to post to the `thread_id`.
- Validates that `attachment_ids` referenced are actually authorized and exist in the Documents DB.

### FR-03-04 — Typing Indicators (Ephemeral Events)

- An endpoint `POST /api/v1/messages/typing` accepts a `thread_id` and boolean.
- This endpoint DOES NOT interact with the database. It purely publishes a short-lived transient event (`sys.typing`) over the WebSocket channel.

---

## Data & State (Contract Schemas)

### Thread Payload Schema
```json
{
  "thread_id": "uuid",
  "transaction_id": "uuid",
  "topic": "string",
  "participants": [
    { "user_id": "uuid", "role": "ROLE_AGENT" },
    { "user_id": "uuid", "role": "ROLE_CLIENT" }
  ],
  "last_message_preview": "string",
  "last_message_at": "iso8601",
  "unread_count": "integer"
}
```

### Message Emission Event (Pushed over WS)
```json
{
  "event_type": "MESSAGE_CREATED",
  "data": {
    "message_id": "uuid",
    "thread_id": "uuid",
    "sender_id": "uuid",
    "sender_role": "string",
    "body": "Hi there, please review this.",
    "attachments": [ "uuid" ],
    "created_at": "iso8601"
  }
}
```

---

## Edge Cases & Error States

- **WebSocket Drops**: Clients MUST gracefully detect disconnected sockets and perform a rest-level `GET /history` catchup before re-subscribing.
- **Cross-Site Scripting**: The `POST /emit` endpoint must strict-clean HTML inputs prior to database write to prevent XSS.

---

## Success Criteria

1. WebSockets can scale horizontally (via Redis pub/sub backplane) supporting 10,000 concurrent sockets without dropping messages.
2. `unread_count` aggregations remain accurate even if messages are consumed out-of-order over unreliable networks.
