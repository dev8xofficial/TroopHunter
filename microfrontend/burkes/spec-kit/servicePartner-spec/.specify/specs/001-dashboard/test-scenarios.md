# Test Scenarios — Dashboard

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| TC-01-01 | KPI cards render with correct data | Load dashboard with known data | 4 cards show correct values and subtitles | P0 |
| TC-01-02 | New referral cards display | Load dashboard with 2 pending referrals | 2 referral cards with client details and action buttons | P0 |
| TC-01-03 | Service areas grid renders | Load dashboard with 3 active areas | 3 area cards with zip code, city, referrals/month, earnings | P0 |
| TC-01-04 | Recent reviews display | Load dashboard with reviews | Review cards with name, stars, date, excerpt | P1 |
| TC-01-05 | Quick action buttons navigate | Click each quick action button | Navigates to correct screen (Referrals, Service Areas, Reviews, Profile) | P0 |
| TC-01-06 | View Details button on referral | Click "View Details" on referral card | Navigates to Referrals screen or opens detail view | P0 |
| TC-01-07 | Provide Quote button on referral | Click "Provide Quote" on referral card | Navigates to Quotes screen with referral pre-selected | P1 |

## Edge Case Tests

| ID | Scenario | Steps | Expected Result |
|----|----------|-------|-----------------|
| EC-01-01 | Zero referrals | Load dashboard with 0 pending referrals | Empty state message displayed |
| EC-01-02 | Zero active jobs | Load dashboard with 0 active jobs | KPI shows "0" with appropriate subtitle |
| EC-01-03 | No reviews | Load dashboard with 0 reviews | "No reviews yet" message in reviews section |
| EC-01-04 | No service areas | Load dashboard with 0 areas | Banner prompting to add service areas |

## Accessibility Tests

| ID | Scenario | Expected |
|----|----------|----------|
| A11Y-01-01 | KPI cards screen reader | Cards announce label, value, and subtitle |
| A11Y-01-02 | Star ratings | Star ratings have aria-label with numeric value |
| A11Y-01-03 | Quick action focus order | Tab order follows visual layout (left-to-right, top-to-bottom) |
