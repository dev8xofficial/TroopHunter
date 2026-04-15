# Spec — 000 Foundation
**Feature ID**: 000-foundation
**Portal**: Service Partner Portal
**Status**: draft | **Created**: 2026-04-16

---

## Overview

The foundation module defines the session context contract, authentication
requirements, role model, global data vocabulary, activity log schema, and the
referral-to-job transaction lifecycle that all other feature modules depend upon.
It has no API surface of its own; it provides the shared contracts that all other
modules reference.

---

## Problem Statement

Without a shared, authoritative contract for session, role, and event schemas,
individual feature modules define their own assumptions, leading to drift in field
names, permission logic, and audit behaviour. The foundation module closes this
gap by establishing canonical definitions across the platform.

---

## Actors and Permissions

| Actor | Permission Scope |
|---|---|
| `service_partner` | Read own session context; cannot modify roles or lifecycle states |
| `admin` | Transition account status; write verification fields |
| `system` | Assign `routing_priority_score`; generate activity log events; dispatch notifications |

---

## Session Context Contract

| Field | Type | Required | Constraint |
|---|---|---|---|
| `partner_id` | UUID | yes | immutable after assignment |
| `company_name` | string | yes | max 150 chars |
| `membership_type` | enum | yes | `standard`, `premium` |
| `account_status` | enum | yes | see lifecycle below |
| `service_area_zip_codes` | string[] | yes | 1–50 entries; each 5-digit numeric |
| `service_categories` | enum[] | yes | min 1 entry |
| `session_issued_at` | ISO 8601 | yes | UTC |
| `session_expires_at` | ISO 8601 | yes | UTC; max 8h from issued |
| `routing_priority_score` | integer | yes | 0–100; system-assigned |

Session tokens must be refreshed before expiry. Expired sessions return HTTP 401.
The session context is re-evaluated on each refresh to pick up account status
changes.

---

## Role Model

| Role | Scope | Description |
|---|---|---|
| `service_partner` | Own records | Licensed trade vendor receiving platform referrals |
| `admin` | Platform-wide | Verifies credentials, manages partner accounts |
| `system` | Internal | Automated routing, payout, notification engine |
| `client` | Own transactions | Homeowner submitting referral requests |
| `agent` | Own client portfolio | Real-estate agent routing client referrals |

---

## Account Status Lifecycle

| From | To | Trigger | Guard |
|---|---|---|---|
| — | `pending_verification` | Partner self-registers | Registration form complete |
| `pending_verification` | `active_verified` | Admin approves credentials | License + insurance both verified |
| `active_verified` | `suspended` | Admin suspends OR partner self-suspends | Account must be `active_verified` |
| `suspended` | `active_verified` | Admin reinstates | Admin confirms reinstatement |
| `active_verified` | `deactivated` | Admin permanently removes | Irreversible |
| `suspended` | `deactivated` | Admin permanently removes | Irreversible |

---

## Activity Log Contract

| Field | Type | Required | Constraint |
|---|---|---|---|
| `event_id` | UUID | yes | system-generated; immutable |
| `event_name` | string | yes | snake_case; see event catalogue |
| `actor_role` | enum | yes | role enum |
| `actor_id` | UUID | yes | partner_id, admin_id, or system |
| `entity_type` | string | yes | e.g. `referral`, `job`, `quote` |
| `entity_id` | UUID | yes | FK to the affected entity |
| `payload` | object | yes | event-specific fields |
| `occurred_at` | ISO 8601 | yes | UTC; server-assigned |

**Immutability rule**: No UPDATE or DELETE is permitted on activity log rows.
Insert-only via append. Visible to: `service_partner` (own events), `admin` (all events).

---

## Notification Event Contract

| Field | Type | Required |
|---|---|---|
| `notification_id` | UUID | yes |
| `trigger_event` | string | yes |
| `recipient_partner_id` | UUID | yes |
| `channel` | enum | yes | `email`, `sms`, `in_app` |
| `payload` | object | yes |
| `sent_at` | ISO 8601 | yes |
| `delivery_status` | enum | yes | `pending`, `sent`, `failed` |

Transactional notifications (new referral, payment disbursed) are always sent
regardless of preference settings. Preference settings apply to digest and
marketing-type notifications only.

---

## Referral-to-Job Transaction Lifecycle (11 Stages)

| Stage | State | Description |
|---|---|---|
| 1 | `new_lead` | Referral routed; awaiting partner response |
| 2 | `contacted` | Partner contacted homeowner |
| 3 | `quoted` | Formal quote submitted |
| 4 | `quote_accepted` | Homeowner accepted quote |
| 5 | `scheduled` | Appointment confirmed |
| 6 | `in_progress` | Work underway |
| 7 | `completed` | Partner marks job done |
| 8 | `awaiting_payment` | Payment initiated by platform |
| 9 | `paid` | Partner net earnings disbursed |
| 10 | `declined` | Terminal — partner or client declined |
| 11 | `cancelled` | Terminal — cancelled before start |

---

## Functional Requirements

| ID | Requirement |
|---|---|
| FR-00-01 | Session context MUST include `account_status`; any request from a `suspended` or `deactivated` account MUST return HTTP 403 |
| FR-00-02 | Token refresh MUST re-evaluate `account_status` at the time of refresh |
| FR-00-03 | Activity log events MUST be persisted before the triggering API call returns HTTP 2xx |
| FR-00-04 | `routing_priority_score` MUST be recomputed by the system after every referral response, review submission, or status change |
| FR-00-05 | Session lifetime MUST NOT exceed 8 hours; clients MUST refresh before expiry |

---

## Edge Cases

- A partner whose account is suspended mid-session: next request returns 403;
  session is invalidated server-side regardless of client-held token.
- A partner with zero active service areas remains `active_verified` but receives
  no referral routing until at least one area is re-activated.

---

## Success Criteria

- Zero API calls succeed from `suspended` or `deactivated` accounts.
- Activity log has ≥1 event per every state-changing API call within the same
  database transaction.
- `routing_priority_score` recomputed within 30 seconds of triggering event.

---

## Dependencies

All feature modules (001–008) depend on this foundation.
