# State Machines — 001 Dashboard

The dashboard module is read-only; it aggregates states from other entities.
No state transitions originate in this module. The authoritative state machines
are defined in:

- `000-foundation/state-machines.md` — Account status, referral lifecycle
- `002-referrals/state-machines.md` — Referral status details
- `003-active-jobs/state-machines.md` — Job status details
- `007-earnings/state-machines.md` — Payment status details

## Dashboard Data Freshness Invariants

| Invariant | Rule |
|---|---|
| INV-DASH-01 | `new_referral_count` must equal the count of referrals with `referral_status = new_lead` assigned to this partner |
| INV-DASH-02 | `active_job_count` must count jobs with `job_status` in `{scheduled, in_progress}` |
| INV-DASH-03 | `average_rating` must be computed from all non-deleted reviews for this partner |
| INV-DASH-04 | `current_month_revenue` must sum `partner_net_earnings` for `paid` earnings records in the current calendar month |
| INV-DASH-05 | Dashboard response must reflect the latest committed database state at time of request; no stale cache older than 60 seconds |
