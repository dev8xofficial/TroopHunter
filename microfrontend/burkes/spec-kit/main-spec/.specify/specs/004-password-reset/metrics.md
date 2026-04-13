# Password Reset — Metrics

## KPIs

- **Reset Initiation Rate**: Percentage of login sessions where a user triggers the "Forgot your password?" flow — a proxy for authentication friction.
- **Reset Completion Rate**: Percentage of reset requests where the user successfully creates a new password and returns to the login screen.
- **Email Delivery Time**: Median time between reset request submission and email receipt by the user (target: under 60 seconds).
- **Link Click-Through Rate**: Percentage of dispatched reset emails where the user clicks the reset link within the 1-hour validity window.
- **Resend Request Rate**: Percentage of Stage 2 sessions where the user clicks "Resend Email" — a signal of delivery failures or user confusion.
- **Token Expiry Rate**: Percentage of reset links that expire before being used — indicates friction in the recovery flow or email deliverability issues.

## Alerting Thresholds

| Metric                | Warning      | Critical    |
| --------------------- | ------------ | ----------- |
| Email Delivery Time   | > 90 seconds | > 5 minutes |
| Reset Completion Rate | < 60%        | < 40%       |
| Resend Request Rate   | > 25%        | > 50%       |
