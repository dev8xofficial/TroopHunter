# State Machines — 007 Earnings

## SM-EARNINGS · Payment Status

An earnings record is created by the system when a job transitions to `completed`.

### States

| State | Description |
|---|---|
| `awaiting_payment` | Earnings record created; payment processing initiated |
| `paid` | Net earnings disbursed to partner (terminal) |
| `failed` | Payment processing encountered an unrecoverable error |

### Transition Table

| From State | To State | Trigger | Actor | Guard | Side Effects |
|---|---|---|---|---|---|
| _(new)_ | `awaiting_payment` | `payment_initiated` | `system` | Job status `completed` | Activity log: `payment_initiated`; record created with `job_value`, `platform_fee_amount`, `partner_net_earnings` |
| `awaiting_payment` | `paid` | `payment_disbursed` | `system` | Payment processor confirms success | Activity log: `payment_disbursed`; `paid_at` set; notification to partner |
| `awaiting_payment` | `failed` | `payment_failed` | `system` | Payment processor returns failure | Activity log: `payment_failed`; admin alert triggered; retry scheduled |
| `failed` | `awaiting_payment` | `payment_retried` | `system` | Admin triggers retry within policy window | Activity log: `payment_retried` |

### Invariants

- `partner_net_earnings = job_value − platform_fee_amount`. This is always
  computed server-side at record creation; cannot be overridden.
- `platform_fee_amount` is immutable from record creation.
- `job_value` is locked from the accepted quote; immutable after job creation.
- `paid` is terminal; no regression from `paid` to any other state.
- `platform_fee_rate` is set by admin at the time of job completion calculation;
  partners cannot read or modify it.
- YTD earnings (`total_earnings` for `ytd` period) are computed on read from
  `paid` earnings records; not stored as a separate field.
