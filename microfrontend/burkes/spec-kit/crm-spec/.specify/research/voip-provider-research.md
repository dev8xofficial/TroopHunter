# VOIP Provider Research

## Evaluation Criteria

- Supports calling, SMS, and call recording
- Provides reliable webhooks or APIs for communication events
- Allows retention-aware storage references
- Reasonable operating cost for a growing multi-department team

## Candidate Summary

| Provider | Strength | Concern |
| --- | --- | --- |
| Twilio | Broad developer tooling and SMS/call support | Cost can rise quickly at scale |
| Telnyx | Competitive telephony pricing and flexible APIs | Team familiarity may be lower |
| GoTo | Strong business telephony footprint | Custom CRM embedding flexibility may be lower |
| RingCentral | Mature enterprise telephony | Commercial packaging may be heavier than needed |

## Recommendation for specification work

Keep the CRM contracts provider-agnostic until procurement is finalized. Phase 1 artifacts should define the CRM behavior, not a vendor-specific UI or payload shape.

