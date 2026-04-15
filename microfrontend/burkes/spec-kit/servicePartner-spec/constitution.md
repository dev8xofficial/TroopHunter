# Constitution — Service Partner Portal
**Burkes Group Platform · Service Partner Domain**
Version: 1.0.0 | Status: Authoritative | Date: 2026-04-16

---

## 1. Core Business Principles

### 1.1 Referral Marketplace Model
The platform acts as a managed referral marketplace connecting licensed service
partners with homeowners who have been introduced through real-estate agents.
Service partners do **not** originate leads; they receive pre-qualified referrals
from the platform.

### 1.2 Quality-First Acceptance
A service partner must hold valid trade licensing and carry minimum-threshold
insurance coverage before the platform will route any referral to them. These
credentials are verified by platform administrators before the account status
reaches `active_verified`.

### 1.3 Geographic Containment
A service partner's referral eligibility is strictly governed by
`service_area_zip_code` registrations. The system MUST NOT route a referral to a
service partner whose registered service areas do not contain the property's zip
code.

### 1.4 Revenue Transparency
Every completed job is represented by an `earnings_record` that exposes
`job_value`, `platform_fee_amount`, and `partner_net_earnings`. The platform fee is
computed server-side; service partners cannot modify it.

### 1.5 Reputation as a Routing Signal
A service partner's `average_rating` and `response_rate` are persistent metrics
that influence referral priority routing. Declining referrals or slow response
times degrades routing priority.

### 1.6 Immutability of Audit Events
All state transitions, quote submissions, job completions, and review responses
generate immutable activity-log events. These records cannot be edited or deleted
by any role including administrator.

---

## 2. Canonical Role Definitions

| Role | Scope | Owns |
|---|---|---|
| `service_partner` | Own account, own jobs/quotes/reviews | Business profile, quote submissions, service area registrations, review responses |
| `admin` | Platform-wide | Credential verification, partner approval, fee configuration |
| `system` | Internal processes | Referral routing, payout calculation, notification dispatch |
| `client` | Own transactions | Review authoring, referral request origination |
| `agent` | Own client transactions | Referral creation on behalf of clients |

---

## 3. Service Partner Account Lifecycle

```
pending_verification
        │  admin verifies license + insurance
        ▼
  active_verified
        │  partner self-suspends or admin suspends
        ▼
    suspended
        │  admin reinstates
        ▼
  active_verified
        │  admin permanently removes
        ▼
  deactivated (terminal)
```

---

## 4. Referral-to-Job Transaction Lifecycle

Stage definitions for a single referral routed to one service partner:

| Stage | State Value | Description |
|---|---|---|
| 1 | `new_lead` | Referral routed to partner; awaiting first response |
| 2 | `contacted` | Partner has contacted the homeowner |
| 3 | `quoted` | Partner has submitted a formal quote |
| 4 | `quote_accepted` | Homeowner has accepted the quote |
| 5 | `scheduled` | Job appointment set |
| 6 | `in_progress` | Job has started |
| 7 | `completed` | Job finished and confirmed by partner |
| 8 | `awaiting_payment` | Platform payment processing initiated |
| 9 | `paid` | Payment disbursed to partner |
| 10 | `declined` | Partner or homeowner declined (terminal) |
| 11 | `cancelled` | Cancelled before job start (terminal) |

---

## 5. Global Data Vocabulary (Canonical Field Names)

| Canonical Name | Type | Description |
|---|---|---|
| `partner_id` | UUID | Unique service partner identifier |
| `referral_id` | UUID | Unique referral record identifier |
| `transaction_ref` | string | Human-readable cross-system reference (e.g. `TRX-10247`) |
| `job_id` | UUID | Unique job record identifier |
| `quote_id` | UUID | Unique quote submission identifier |
| `review_id` | UUID | Unique client review identifier |
| `service_area_id` | UUID | Unique service area registration identifier |
| `earnings_record_id` | UUID | Unique earnings/payment record identifier |
| `service_type` | enum | Category of service requested |
| `timeline_urgency` | enum | Client-stated urgency for service fulfilment |
| `membership_type` | enum | Partner tier (`standard`, `premium`) |
| `account_status` | enum | Current partner account state |
| `zip_code` | string(5) | US ZIP code (5-digit numeric) |
| `license_number` | string | State-issued contractor license identifier |
| `insurance_policy_type` | enum | Insurance coverage classification |
| `platform_fee_rate` | decimal | Platform's percentage fee (system-only write) |

---

## 6. Immutability Rules

1. `activity_log` records are **insert-only**. No UPDATE or DELETE is permitted on
   any activity log row regardless of role.
2. `earnings_record.platform_fee_amount` is computed at job completion and is
   **immutable** thereafter.
3. `review.rating` and `review.review_text` set by client are **immutable** after
   a 72-hour edit window closes.
4. `quote.total_quote_amount` is locked once the quote status transitions to
   `accepted`; no amendment is possible.
5. `transaction_ref` is assigned at referral creation and cannot be changed.

---

## 7. Cross-Cutting Invariants

- **INV-001**: A referral can only be in one status at any point in time per
  partner assignment.
- **INV-002**: `partner_net_earnings = job_value − platform_fee_amount`. This
  calculation must always execute server-side.
- **INV-003**: A quote cannot be submitted against a referral whose status is
  `declined` or `cancelled`.
- **INV-004**: A service area registration can only be in `active` or `paused`
  status; deletion is soft-delete only.
- **INV-005**: A partner must have at least one `active` service area to be
  eligible for referral routing.
- **INV-006**: Payment status can only advance forward; no reversal from `paid`
  to `awaiting_payment`.
- **INV-007**: A review response can only be submitted once per `review_id` by
  the service partner.
- **INV-008**: Notification preferences are partner-owned and do not affect
  system-mandated transactional notifications.
