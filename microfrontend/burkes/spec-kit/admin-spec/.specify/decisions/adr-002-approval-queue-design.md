# ADR 002: Continuous Approval Queue Design

## Status
Accepted

## Context
Agents submit multiple documents and stage updates daily. When these transitions occur, management must approve them to maintain compliance (Platform Integrity). If an admin had to open every transaction manually to find pending items, operation scale would be impossible.

## Decision
We are implementing a centralized "Approval Queue" data pattern. 
All pending transitions (Document Uploads, Stage Update Requests, New Partner or User Requests) are surfaced globally in a single stream. The `admin.html` sidebar includes quick actions and a specific "queue" mentality where an Admin can quickly process these pending items without context-switching into deep transaction details unless explicitly needed.

## Consequences
- **Positive**: Massive reduction in Click-Time-To-Action (CTTA) for TCs.
- **Positive**: Admin dashboard becomes a highly actionable "Inbox".
- **Negative**: The API needs specific aggregation endpoints to fetch all "PENDING" items across the entire platform database efficiently.
