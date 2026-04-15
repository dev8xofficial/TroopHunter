# GLOSSARY — Service Partner Portal
**Burkes Group Platform · Service Partner Domain**
Version: 1.0.0 | Date: 2026-04-16

All terms are defined as business concepts, not UI elements.

---

## A

**Account Status**
The lifecycle state of a service partner's platform membership. Valid values:
`pending_verification`, `active_verified`, `suspended`, `deactivated`.

**Active Job**
A referral that has progressed past `quote_accepted` and has not yet reached a
terminal state (`completed`, `cancelled`). Active jobs are billable and appear in
the partner's workload.

**Activity Log**
An immutable, append-only record of every state-changing event in the system.
Used for audit, dispute resolution, and compliance.

**Average Rating**
The arithmetic mean of all `review.rating` values for a given service partner.
Recomputed on every new review submission.

---

## B

**Budget Range**
A client-stated financial range for the referral, expressed as `budget_min` and
`budget_max` in USD. Used by the partner to assess quote feasibility. Not a
binding commitment.

---

## C

**Cancellation**
The termination of a referral or job record before work commences. Results in
`referral_status = cancelled`. Triggers an activity log event.

**Client**
A homeowner who has submitted a service request via a real-estate agent or
directly through the platform.

**Completion Confirmation**
The service partner's formal assertion that a job has been finished. Transitions
`job_status` to `completed` and triggers payment processing.

**Coverage Amount**
The dollar limit of the service partner's insurance policy. Must meet platform
minimum thresholds to pass admin verification.

---

## D

**Dashboard**
The aggregated performance view for a service partner, summarising new referral
counts, active job counts, average rating, and current-month revenue. Data is
computed from live records, not cached snapshots.

**Decline**
The service partner's refusal of a referral. Transitions `referral_status` to
`declined`. Repeated declines degrade `routing_priority_score`.

---

## E

**Earnings Record**
The financial record for a single completed job, containing `job_value`,
`platform_fee_amount`, and `partner_net_earnings`. Immutable once payment
is disbursed.

**Estimated Completion Time**
A service partner's declared timeframe for completing a quoted job. Enum values:
`same_day`, `1_2_days`, `3_5_days`, `1_2_weeks`, `2_4_weeks`.

---

## I

**Insurance Policy Type**
The class of insurance coverage held by the service partner. Valid values:
`general_liability_and_workers_comp`, `general_liability_only`,
`workers_comp_only`.

---

## J

**Job**
The operational record for work being performed under an accepted quote. Inherits
from the parent referral. Has its own status lifecycle independent of the quote's.

**Job Value**
The total amount the homeowner pays for the completed service. Equals
`labor_cost + materials_cost` as quoted and accepted.

---

## L

**License Number**
A state-issued contractor licence identifier submitted by the service partner and
verified by an administrator before the account reaches `active_verified`.

---

## M

**Membership Type**
The service partner's platform tier, determining fee rates and routing priority.
Valid values: `standard`, `premium`.

---

## N

**New Lead**
A referral that has been routed to a service partner but has not yet received any
response. The initial state in the referral lifecycle.

**Notification Preference**
A partner-controlled configuration that governs the delivery channel and trigger
for platform notifications (email, SMS, weekly digest). Does not suppress
system-mandated transactional alerts.

---

## P

**Partner**
Short form for *service partner*. A licensed trade vendor registered on the
platform to receive and fulfil homeowner service referrals.

**Platform Fee**
The percentage-based charge deducted from `job_value` upon payment. Computed
server-side; immutable after computation.

**Property Address**
The full street address of the homeowner's property for which service is
requested. Must include street, city, state, and zip code.

---

## Q

**Quote**
A formal cost estimate submitted by a service partner in response to a referral.
Contains `labor_cost`, `materials_cost`, `total_quote_amount`,
`estimated_completion_time`, and `service_description`.

**Quote Acceptance Rate**
The ratio of accepted quotes to total quotes sent by a service partner over a
rolling period. A performance metric, not a binding constraint.

---

## R

**Referral**
A pre-qualified service request routed by the platform from a homeowner (via an
agent) to one or more service partners in the matching service area.

**Response Rate**
The percentage of referrals to which a service partner has responded (contacted
or quoted) within the platform's response window. Influences routing priority.

**Review**
A structured rating and text evaluation submitted by a client after job
completion. Contains `rating` (integer 1–5), `review_text`, and
`review_date`. Immutable after 72 hours.

**Review Response**
The service partner's textual reply to a client review. One response per review.
Immutable once submitted.

**Routing Priority Score**
An internal platform score that determines which service partners receive a
referral first when multiple partners cover the same zip code. Influenced by
`average_rating`, `response_rate`, and `acceptance_rate`. Not exposed to the
partner.

---

## S

**Service Area**
A zip-code-level geographic registration that declares where a service partner is
willing to receive referrals. Must be in `active` status for routing eligibility.

**Service Category**
The specific type of work a service partner is qualified to perform. Used to
match referrals. Valid values: `emergency_repairs`, `installations`,
`inspections`, `maintenance`, `water_treatment_systems`.

**Service Type**
The requested trade category on a referral, matched against the partner's
registered service categories.

**Suspension**
An administrative or self-initiated hold on a partner account. While suspended,
no referrals are routed. Transitions `account_status` to `suspended`.

---

## T

**Timeline Urgency**
The client's urgency level for service delivery. Valid values: `asap`,
`within_1_week`, `within_2_weeks`, `flexible`, `specific_date`.

**Transaction Reference**
A human-readable cross-system identifier for a referral-to-job lifecycle
(e.g., `TRX-10247`). Immutable after assignment.

---

## V

**Verification**
The administrative review of a service partner's license number, insurance policy
type, and coverage amount before the account is marked `active_verified`.

---

## Y

**Year-to-Date (YTD) Earnings**
The cumulative `partner_net_earnings` across all `paid` earnings records for the
current calendar year. Computed on read; not stored as a separate field.
