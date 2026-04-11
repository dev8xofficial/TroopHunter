# ADR-004: Service Area Management

**Status**: Accepted (April 2026)
**Decision Date**: April 2026
**Last Modified**: April 2026
**Decision ID**: ADR-004

## Title

We WILL implement zip code-based service area management where partners register specific zip codes to receive referrals, with the ability to pause and resume areas.

## Context

Referral routing must match service requests to partners who serve the relevant geographic area. Partners need flexibility to expand, contract, or temporarily pause their coverage.

## Decision

1. Service areas are managed as a list of 5-digit zip codes.
2. Each area has a status: Active or Paused.
3. Partners can add new areas, pause active areas, and resume paused areas.
4. The platform recommends high-demand areas near the partner's existing coverage.
5. Area performance metrics (referrals/month, revenue) are displayed per zip code.

## Rationale

- **Precision**: Zip codes provide granular geographic targeting.
- **Flexibility**: Pause/resume allows partners to manage capacity without losing their area registration.
- **Growth**: Recommended areas encourage partners to expand strategically.

## Consequences

1. Referral routing engine must match referral zip codes to partner service areas.
2. Area recommendations require demand analytics data.

---

**See Also**: 006-service-areas spec, constitution.md (Section 10)
