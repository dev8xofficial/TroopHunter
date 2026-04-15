# Messages Module Spec

**Feature ID**: 003-messages  
**Status**: Draft  
**Created**: 2026-04-15  

## Overview
The Messages module enables secure, in-platform communication between the `ROLE_CLIENT` and associated transaction professionals (Agent, Lender, Attorney, CPA). It supports text-based chatting, document attachments referencing existing `Document` entities, and system announcements.

## Problem Statement
Third-party texting or emailing leaks transaction context and compromises secure document transmission. A centralized messaging hub is required to confine all property discussions within the authenticated boundaries of the transaction.

## Actors and Permissions
- `ROLE_CLIENT`: Can initiate and respond to conversations with any assigned professional.
- Professional Roles (`ROLE_AGENT`, `ROLE_LENDER`, `ROLE_ATTORNEY`, `ROLE_CPA`): Can communicate with the client.
- Note: Peer-to-peer professional communication (e.g., Agent to Lender) is NOT a functional requirement derived from the Client portal HTML; the client HTML only shows Client-to-Professional threads.

## User Scenarios
1. **Scenario**: Receiving a critical document via message.
   - Precondition: Agent sends a message containing a `document_id`.
   - System Event: Client views message payload containing document metadata.
   - Postcondition: Client can read message and transition the thread to `READ`.

2. **Scenario**: Active conversation polling.
   - Precondition: Client has thread open.
   - System Event: Client periodically polls and retrieves new messages in thread.
   - Postcondition: New messages appended to thread.

## Functional Requirements
- **FR-003-01**: The system MUST store `Conversation` threads representing a 1-to-1 mapping between the Client and a specific professional role.
- **FR-003-02**: The system MUST store `Message` entities linked to a `Conversation`, preserving order and timestamp.
- **FR-003-03**: The system MUST allow a document reference (`document_id`) to be embedded within a message, while continuing to respect document-level RBAC matrices.
- **FR-003-04**: The system MUST track `read_at` timestamps for messages to support unread indicators.

## Data & State Table
| Field | Type | Owner Role | Constraints |
|-------|------|------------|-------------|
| `conversation_id` | string(uuid) | SYSTEM | PK |
| `transaction_id` | string(uuid) | SYSTEM | FK |
| `participant_1_id` | string(uuid) | SYSTEM | Typically the Client |
| `participant_2_id` | string(uuid) | SYSTEM | Typically the Professional |
| `message_id` | string(uuid) | SYSTEM | PK |
| `sender_id` | string(uuid) | SYSTEM | -> User |
| `bodytext` | string | Actor | Max 2000 chars |
| `attachment_document_id`| string | SYSTEM | Nullable FK to Documents |
| `read_at` | timestamp | SYSTEM | Nullable |

## Success Criteria
- Messages are transmitted and persisted reliably.
- Embedded documents correctly resolve metadata without violating RBAC.
