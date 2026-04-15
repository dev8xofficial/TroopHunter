# 000-foundation

**Status:** Draft
**Created Date:** 2026-04-15

## Session Context Contract
* Fields: `session_token` (string), `user_id` (string), `role` (string), `expires_at` (integer timestamp), `assigned_transaction_ids` (array of strings).
* Lifetime: 12 hours from issuance.
* Refresh Rules: Token sliding window of +12h on active requests.

## Authentication Requirements
* Valid Bearer JWT.
* Strict mapping of `role` in JWT to incoming request path permissions.
* Session invalidation upon forced sign-out or password modifications.

## Role Model
* **closing_attorney**: Full CRUD on assigned transactions. Verify amounts. Approve/Reject documents. Modify splits.
* **real_estate_agent**: Read transaction status. Upload real-estate documents.
* **mortgage_lender**: Read transaction amount and status. Upload mortgage docs.
* **client**: Read-only profile view. Send messages.
* **title_company**: Read verified state, upload title commitment.

## Global Data Vocabulary
| Field | Type | Description |
|-------|------|-------------|
| `transaction_id` | string (UUID) | Unique trace ID for real estate exchange |
| `transaction_status` | string (enum) | `needs_verification`, `in_progress`, `split_pending`, `verified`, `completed`, `flagged` |
| `case_type` | string (enum) | `purchase`, `sale`, `divorce` |

## Activity Log Contract
* Schema includes `event_id`, `actor_id`, `actor_role`, `event_type`, `payload`, `created_at`.
* Immutability Rule: All entries are append-only. No deletion.
* Visibility: `closing_attorney` can read all events linked to assigned transactions. `client` only sees document approvals.

## Notification Event Contract
* Triggers: Closing deadline < 5 days, new document upload, verification flag.
* Recipients: Roles subscribed via the transaction relations.
* Payload: `event_type`, `transaction_id`, `priority_level`, `text_description`.
