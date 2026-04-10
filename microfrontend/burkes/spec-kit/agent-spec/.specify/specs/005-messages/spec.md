# Feature Specification: Messages

**Feature ID**: 005-messages
**Status**: approved
**Created**: 2026-04-11
**Parent Spec**: [000-foundation](../000-foundation/spec.md)
**Screen / Module**: Messages — inbox and compose center

---

## Overview

The Messages screen is the agent's secure communication hub within the portal. It provides an inbox of all incoming messages from clients and professional partners (attorneys, mortgage lenders, title companies), a compose pane for new messages, and filter/search capabilities. Messages are tied to transactions to maintain contextual clarity.

---

## Problem Statement

Agents communicate with multiple parties per transaction simultaneously — clients, attorneys, mortgage lenders, CPAs, and title companies. Mixing these communications in general email creates disorganisation and audit risk. The Messages screen centralises all transaction-related communications, making it easy to track conversations, respond promptly, and reference context.

---

## Goals

- Display all incoming messages in a scannable inbox with sender, subject, preview, and timestamp.
- Visually distinguish unread messages from read ones.
- Provide filter options to scope the inbox by sender type.
- Provide a compose form to send a new message to any transaction-linked contact.
- Preserve all reference message data from agent.html exactly.

---

## Non-Goals

- This spec does not define real-time messaging/WebSocket behaviour (implementation concern).
- Threaded reply chains are deferred to a future spec revision.
- File attachment in messages is out of scope for v1.

---

## Actors

| Actor                 | Role in This Feature                                 |
| --------------------- | ---------------------------------------------------- |
| Agent (AG)            | Primary inbox user; sends and receives messages      |
| Clients (CL)          | Send messages to agent; receive agent replies        |
| Attorneys (AT)        | Send messages to agent regarding transaction reviews |
| Mortgage Lenders (LN) | Send pre-approval and mortgage update messages       |
| Title Company         | Sends title search and closing prep messages         |

---

## User Scenarios

### Scenario 1 — Agent Reviews Morning Messages

**Actor**: Agent
**Precondition**: Two unread messages exist in the inbox.
**Flow**:

1. Agent navigates to Messages.
2. Inbox renders 5 messages; 2 have the `.message-item.unread` style (blue background, navy border).
3. Agent reads the subject and preview of each unread message.
4. Agent identifies the John Smith message about HVAC as requiring urgent follow-up.

**Success**: Agent can see unread vs. read messages at a glance without opening each one.

---

### Scenario 2 — Agent Sends a Message to a Client

**Actor**: Agent
**Precondition**: Agent wants to update John Smith on inspection results.
**Flow**:

1. Agent is on the Messages screen; the compose pane is visible on the right.
2. Agent selects "John Smith" from the "To" dropdown (under the Clients optgroup).
3. Agent enters subject: "Inspection Update – TRX-10247."
4. Agent types the message body.
5. Agent clicks "Send Message."
6. Activity event written: "Message Sent – John Smith."

**Success**: Message is sent; activity log updated; compose form resets.

---

### Scenario 3 — Agent Filters Inbox to Attorney Messages

**Actor**: Agent
**Precondition**: Multiple message types exist in inbox.
**Flow**:

1. Agent selects "From Attorneys" from the filter dropdown.
2. Inbox reduces to show only the Sarah Mitchell message.
3. Agent selects "All Messages" to restore full inbox.

**Success**: Filter applies immediately without clearing message state.

---

## Functional Requirements

### FR-05-01 — Filter Bar

- **Message Type** dropdown: All Messages, Unread, From Clients, From Attorneys, From Mortgage Lenders.
- **Search bar**: 🔍 icon prefix, placeholder "Search messages..."
- **"+ New Message"** `.btn-primary` button (right-aligned).

### FR-05-02 — Inbox Message List

- Container: white card with title "Inbox."
- Each message rendered as a `.message-item` (white background, `border: 2px solid neutral-200`, `border-radius: 12px`, `padding: 20px`; hover: `primary-navy` border + `shadow-md`).
- **Unread state**: `.message-item.unread` has background `#eff6ff`, border `primary-navy`.
- Message structure:
  - Header row: sender name (16px/700 `neutral-900`) left, timestamp (13px `neutral-500`) right.
  - Subject line: 15px/600 `neutral-800`.
  - Preview text: 14px `neutral-600`, `line-height: 1.5`.

**Reference Messages (from agent.html, in display order)**:

| #   | Sender                             | Subject                               | Preview (truncated)                                                                                                                       | Time           | Unread |
| --- | ---------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------ |
| 1   | John Smith                         | Re: Inspection Results – TRX-10247    | Hi Sarah, I reviewed the inspection report and have some questions about the HVAC system at 123 Main Street. Can we discuss this today?   | 10 minutes ago | Yes    |
| 2   | Sarah Mitchell – Attorney          | Purchase Agreement Review – TRX-10247 | The purchase agreement for 123 Main Street has been reviewed. I found a few minor items that need clarification before closing on Feb 15. | 2 hours ago    | Yes    |
| 3   | Sarah Williams                     | Offer Update – TRX-10198              | Thank you for the update on the 789 Pine Road listing. I'd like to proceed with the counteroffer we discussed yesterday.                  | 5 hours ago    | No     |
| 4   | James Carter – First National Bank | Pre-Approval Confirmed – TRX-10156    | We've received all necessary documentation and the pre-approval letter has been issued for your client Michael Brown for 321 Elm Street.  | Yesterday      | No     |
| 5   | Title Company                      | Title Search Complete – TRX-10134     | The title search for 321 Elm Street has been completed. No issues found. Attached is the preliminary title report.                        | 2 days ago     | No     |

### FR-05-03 — Compose New Message Form (Sidebar)

- Container: white card with title "Compose New Message."
- Displayed as a vertical flex form inside the sidebar column.

**Form Fields**:

1. **To** (label: "To"): select dropdown with optgroups:
   - Optgroup "Clients": John Smith, Sarah Williams, Michael Brown, Michael Brown, Lisa Anderson.
   - Optgroup "Attorneys": Sarah Mitchell – Mitchell Law Group.
   - Optgroup "Mortgage Lenders": James Carter – First National Bank.
   - Optgroup "CPAs": David Thompson – Thompson Financial Group.
   - First option (default): "Select Recipient."

2. **Subject** (label: "Subject"): text input, placeholder "Enter subject."

3. **Message** (label: "Message"): textarea, placeholder "Type your message...", `min-height: 120px`.

4. **"Send Message"** `.btn-primary` submit button (full width).

---

## Data & State

| Field                 | Type   | Description                                         |
| --------------------- | ------ | --------------------------------------------------- |
| `messages[]`          | array  | All messages in the agent's inbox                   |
| `message.sender`      | string | Sender display name                                 |
| `message.sender_type` | string | `client`, `attorney`, `lender`, `title`, `cpa`      |
| `message.subject`     | string | Message subject line                                |
| `message.preview`     | string | First 150 characters of message body                |
| `message.timestamp`   | string | Relative time string (e.g., "10 minutes ago")       |
| `message.is_unread`   | bool   | Whether the message has been read                   |
| `compose.recipient`   | string | Selected recipient from dropdown                    |
| `compose.subject`     | string | Composed subject line                               |
| `compose.body`        | string | Composed message body                               |
| `contacts[]`          | array  | All transaction-linked contacts (for "To" dropdown) |

---

## Edge Cases & Error States

- **Empty inbox**: Show empty state "No messages yet. Your clients and partners will appear here."
- **Compose form sent without recipient**: Validation error "Please select a recipient."
- **Compose form sent without subject or body**: Warn agent but allow send (subjects and bodies may be optional for quick follow-ups — confirm at implementation).
- **Filter returns no messages**: Show "No messages match this filter."
- **New message arrives while agent is on screen**: Unread count badge in nav updates; inbox prepends the new message (implementation behaviour, not spec-blocking).

---

## Success Criteria

1. All 5 reference messages render in exact order with correct sender names, subjects, previews, and timestamps.
2. Messages 1 and 2 (John Smith and Sarah Mitchell) render with the `.unread` visual state (blue background, navy border).
3. Messages 3–5 render as read (white background, neutral border).
4. The "To" dropdown contains all 8 reference contacts organised into correct optgroups.
5. Filter "From Attorneys" reduces inbox to the Sarah Mitchell message only.
6. Filter "Unread" reduces inbox to the John Smith and Sarah Mitchell messages.
7. Send Message button is present and functional in the compose pane.

---

## Open Questions

1. When an agent clicks on a message item, does it open a full thread view or just mark it as read?
2. Should the compose "To" dropdown also allow free-text entry for external contacts not yet in the system?

---

## Dependencies

- **Depends on**: 000-foundation (nav, tokens, sidebar layout)
- **Supplies data to**: All other screens that include a "Message Client" button (001, 004)
- **Cross-links**: 004-clients (Send Message navigates here with pre-selected client)
