# Activity Log Events — 001 Dashboard

The dashboard module is read-only and does not generate activity log events
directly. All events visible in the dashboard feed are sourced from other modules:

| Source Module | Event Name | When Visible in Dashboard |
|---|---|---|
| 002-referrals | `referral_routed` | On receipt of new lead |
| 002-referrals | `referral_contacted` | On partner contacting homeowner |
| 003-active-jobs | `job_scheduled` | On scheduler confirmation |
| 005-reviews | `review_submitted` | On new client review |
| 007-earnings | `payment_disbursed` | On earnings record updated to `paid` |

No events are inserted by the dashboard read path.
