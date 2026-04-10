# Feature Specification: Messages

**Feature ID**: 003-messages
**Status**: review
**Created**: 2026-04-09
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Messages screen

---

## Overview

The Messages screen is a secure, threaded communication hub that lets the client exchange messages with every professional on their transaction team — real estate agent, mortgage lender, closing attorney, CPA, and the Burkes Group admin — from a single interface. Each professional has a dedicated conversation thread. Threads support plain text messages, document attachments, and system-generated announcement cards. The client never needs to leave the portal or dig through their email inbox to communicate about their transaction.

---

## Problem Statement

Transaction communications currently scatter across email, phone calls, and individual professional portals. Clients lose context, miss requests, and cannot quickly find what was agreed or what was sent. A unified messaging screen centralises all professional communications, maintains a persistent searchable history, and ensures nothing falls through the cracks.

---

## Goals

- Give the client one place to read and send messages to all transaction team members.
- Make unread conversations immediately obvious so nothing is missed.
- Allow document attachments to be shared and accessed within the conversation context.
- Preserve the full message history per thread for reference throughout the transaction lifecycle.

---

## Non-Goals

- This spec does not cover professional-to-professional messaging (agent to lender, etc.).
- It does not cover group/broadcast threads (admin announcements are one-way cards, not group chats).
- It does not define push notifications for incoming messages (deferred to the notification spec).
- It does not cover voice or video calling (phone buttons in the UI are future-scope).

---

## Actors

| Actor | Role in This Feature |
|-------|---------------------|
| Client | Reads and sends messages in all threads; marks threads read |
| Real Estate Agent | Sends and receives messages; shares document links |
| Mortgage Lender | Sends and receives messages; shares document links |
| Closing Attorney | Sends and receives messages; shares document links |
| CPA / Tax Advisor | Sends and receives messages |
| Transaction Coordinator (Admin) | Sends onboarding and announcement messages |

---

## User Scenarios

### Scenario 1 — Client Reads an Unread Message from Agent

**Actor**: Client
**Precondition**: Agent has sent two new messages; the agent thread is marked unread.
**Flow**:
1. Client opens the Messages screen.
2. The agent thread in the sidebar shows a bold name and an unread dot.
3. Client clicks the agent thread.
4. The thread becomes active (highlighted left border); unread indicators are cleared.
5. The chat panel shows full message history in chronological order with date separators.
6. The two new messages are visible at the bottom.
7. A typing indicator appears if the agent is actively composing.

**Success**: Unread state is cleared; client can read all messages; typing indicator is visible when relevant.

---

### Scenario 2 — Client Sends a Message

**Actor**: Client
**Precondition**: Any thread is active.
**Flow**:
1. Client types a message in the compose textarea.
2. The textarea auto-expands up to a maximum height as the client types.
3. Client presses the send button (or Enter if applicable).
4. The message appears in the chat panel right-aligned with the current timestamp.
5. The compose textarea clears.

**Success**: Sent message appears immediately in the chat panel; compose area is ready for the next message.

---

### Scenario 3 — Client Views a Document Attachment in a Message

**Actor**: Client
**Precondition**: Lender has sent a message containing a document attachment card.
**Flow**:
1. Client opens the lender thread.
2. Within a message bubble, a document attachment card is visible showing file name, file size, and a "View" button.
3. Client clicks "View".
4. The document opens for viewing (via the Documents screen or inline preview).

**Success**: Document is accessible directly from the message without navigating to the Documents screen.

---

### Scenario 4 — Client Searches for a Conversation

**Actor**: Client
**Precondition**: Five threads exist.
**Flow**:
1. Client types a contact name (e.g., "Sarah") in the thread search input.
2. The thread list filters in real time to show only threads matching the query.
3. Client clicks the matching thread.
4. Client clears the search to restore the full thread list.

**Success**: Thread search reduces list accurately; clearing restores all threads.

---

## Functional Requirements

### FR-03-01 — Thread Sidebar Layout

- The sidebar must occupy a fixed width (approximately 300 px on desktop) to the left of the chat panel.
- The sidebar must contain: a header with "Conversations" title and a "+ New" button; a thread search input; and the scrollable thread list.
- On viewports below 768 px, the sidebar and chat panel must switch to a single-column view (sidebar visible by default; selecting a thread shows the chat panel full-width with a back button).

### FR-03-02 — Thread List Item

Each thread in the sidebar must display:
- Role-coloured avatar (circle with initials and colour from the role colour system in the constitution)
- Contact full name
- Role label (e.g., "Real Estate Agent", "Mortgage Lender · First National Bank")
- Last message preview (truncated to fit one line)
- Relative timestamp of the last message
- Unread dot (right-aligned) when there are unread messages

### FR-03-03 — Unread State

- Threads with unread messages must show: bold contact name + unread dot indicator.
- Opening a thread must immediately clear both the bold state and the unread dot for that thread.
- The notification bell count in the top nav must decrement when a thread is opened and its messages are marked read.

### FR-03-04 — Thread List Order

Threads must be sorted by most recent activity (most recent message at the top). The order must update if a new message arrives during the session.

### FR-03-05 — Thread Search

- Search filters threads by contact name (case-insensitive).
- Filtering is real-time (no submit required).
- The thread list updates immediately as the client types.

### FR-03-06 — Chat Panel Header

The active chat panel must display:
- Contact avatar (role-coloured, 40 px)
- Contact full name and role/institution label
- Availability status badge: "Active now" (green dot + text) / "Away" (grey badge) / "Offline" (grey badge)
- Action buttons: "📋 Files" (navigates to Documents filtered to that contact's uploads) and "📞 Call" (deferred/placeholder)

### FR-03-07 — Message History

- Messages must be displayed in chronological order (oldest at top, newest at bottom).
- Date separators must divide messages by calendar date (e.g., "January 28, 2026", "Today").
- The chat body must auto-scroll to the bottom when opening a thread or receiving a new message.
- Sufficient chat history must be loaded to cover the entire transaction period.

### FR-03-08 — Message Bubble Styling

- **Outgoing messages (client)**: Right-aligned; `primary-navy` background; white text; bottom-right corner radius reduced.
- **Incoming messages (contact)**: Left-aligned; white background with `neutral-200` border; `neutral-800` text; bottom-left corner radius reduced; subtle shadow.
- A "from" label (contact name + role) must appear above the first bubble in each incoming group.
- Timestamp must appear below each bubble group.
- Maximum bubble width: ~62% of the chat panel width.

### FR-03-09 — Document Attachment Card

When a message contains a document attachment, it must render as a styled card within or below the message bubble:
- File emoji icon + file name + file size
- A "View" button
- The card must adopt the colour of its parent bubble (slightly contrasted background for visibility).

### FR-03-10 — System Announcement Card

The portal must support a distinct announcement card format for milestone events (e.g., offer accepted, under contract):
- Navy-to-accent-blue gradient background
- Large emoji icon + bold title + description text
- Full width within the chat body, not constrained to a bubble

### FR-03-11 — Typing Indicator

When a contact is actively composing a reply, a typing indicator must appear below the latest message bubble:
- Three animated dots (sequential vertical bounce)
- Contact name + "is typing…" label
- Disappears within 3 seconds of the contact stopping

### FR-03-12 — Compose Area

The compose area at the bottom of the chat panel must include:
- A toolbar row with buttons for: attach file (📎), attach image (🖼️), add calendar invite (📅)
- An auto-resizing textarea (min 1 row, max ~4 rows / 110 px height)
- A send button (navy, right-aligned)
- Pressing send with an empty textarea must have no effect.

### FR-03-13 — Five Default Threads

At transaction setup, the following threads must be pre-created and visible in the sidebar (even if no messages have been exchanged yet):
1. Real Estate Agent
2. Mortgage Lender
3. Closing Attorney
4. CPA / Tax Advisor
5. Burkes Group Team (Admin / Transaction Coordinator)

### FR-03-14 — New Conversation Button

The "+ New" button in the sidebar header is a placeholder for future functionality (adding a new contact to the transaction). In this release, clicking it may show a "Coming soon" tooltip or be visually present but inactive.

---

## Data & State

| Field | Type | Description |
|-------|------|-------------|
| `thread.thread_id` | string | Unique identifier |
| `thread.contact_name` | string | Professional's full name |
| `thread.contact_role` | string | Role label |
| `thread.contact_institution` | string | Company/institution (optional) |
| `thread.avatar_colour` | string | Hex colour from role colour system |
| `thread.is_unread` | boolean | Whether thread has unread messages |
| `thread.last_message_preview` | string | Truncated last message |
| `thread.last_message_timestamp` | datetime | For sorting and display |
| `thread.availability_status` | enum | active / away / offline |
| `message.message_id` | string | Unique identifier |
| `message.thread_id` | string | Parent thread |
| `message.sender_role` | string | client / agent / lender / attorney / cpa / admin |
| `message.content` | string | Message body |
| `message.timestamp` | datetime | Sent at |
| `message.attachments[]` | array | { name, size_bytes, type } |
| `message.is_read` | boolean | Read receipt |
| `active_thread_id` | string | Currently selected thread |
| `search_query` | string | Thread search input |

---

## Edge Cases & Error States

- **Thread with no messages yet**: Shows empty state in the chat body ("No messages yet. Send a message to get started.").
- **Send fails (network error)**: Message shows a failed-send indicator with a retry option.
- **Attachment upload fails**: Inline error in the compose area; compose area remains open.
- **Contact is offline**: Availability shows "Offline" badge; typing indicator never appears.
- **All threads read**: No unread dots; notification bell shows zero (no dot).

---

## Assumptions

1. Message delivery and real-time updates are handled by the backend. The portal consumes these via websocket or polling; the mechanism is an implementation detail.
2. All five default threads are created at transaction onboarding. The client does not need to "add" contacts — they are pre-configured.
3. Message history is retained for the duration of the transaction and a reasonable period afterward (data retention policy is deferred).
4. The "+ New" button for adding ad-hoc contacts is a future feature; it is present in the UI but non-functional in this release.

---

## Success Criteria

1. Client can open any conversation thread and read the full message history within 2 seconds.
2. Sending a message causes it to appear in the chat panel within 1 second (optimistic rendering is acceptable).
3. Unread indicators are cleared immediately upon opening a thread — never persist after the thread is viewed.
4. Thread search filters the list accurately for any substring of a contact name.
5. Document attachments within messages are accessible (viewable) without leaving the Messages screen.

---

## Open Questions

1. Should the portal support inline image previews for attached images, or only link-based access?
2. When a professional sends a document attachment from the Documents screen, does it appear as an attachment card in the relevant message thread automatically?
3. Is there a message character limit? If so, what is the limit and how should overflow be communicated to the client?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, role colour system, notification bell)
- **Required by**: 001-dashboard (Transaction Team "Message" buttons navigate here; activity log may include message events)
