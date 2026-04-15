# State Machines — 005 Reviews

## SM-REVIEW · Review State

### States

| State | Description |
|---|---|
| `published` | Review submitted by client and visible to partner |
| `responded` | Partner has submitted a response to the review |

> Note: Reviews have no terminal deletion state from the partner's perspective.
> `admin` may flag or suppress reviews through a separate moderation workflow
> not exposed in the partner portal.

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `published` | `review_submitted` | `client` | Job `completed`; client is the job's homeowner | Activity log: `review_submitted`; `average_rating` recomputed; notification to partner |
| `published` | `responded` | `partner_responds_to_review` | `service_partner` | Review in `published` state; no existing response (one response per review) | Activity log: `review_response_submitted`; `response_rate` recomputed |

### Invariants

- A review can only be submitted by the `client` associated with the completed job.
- `rating` must be an integer between 1 and 5 inclusive.
- `review_text` is immutable after the 72-hour client edit window closes.
- `partner_response` is immutable once submitted; no amendments permitted.
- A partner cannot respond more than once to the same review.
- `average_rating` is recomputed atomically with each new `review_submitted` event.

## SM-REVIEW-RESPONSE · Response Immutability

The response lifecycle is binary:

| State | Description |
|---|---|
| `none` | No response submitted |
| `submitted` | Response submitted; immutable |

Transition: `none` → `submitted` triggered by `partner_responds_to_review`.
No further transitions permitted.
