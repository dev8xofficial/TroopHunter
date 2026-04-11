# Test Scenarios: Analytics (006)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-06-01 | KPI cards render | Load Analytics | 6 stat cards: Revenue ($3.2M/+23.5%), Closed (147/+18.2%), Avg Value ($412K/+5.8%), New Users (284/+31.4%), Avg Close (42d/-12.5%), Referrals (523/+45.3%) | P0 |
| T-06-02 | Time period default | Load Analytics | "Last 90 Days" selected by default | P0 |
| T-06-03 | Time period switch | Select "Last 30 Days" | All data on page updates | P0 |
| T-06-04 | Revenue breakdown | Inspect breakdown card | 3 rows: Purchase (56.2%), Sale (34.4%), Refinance (9.4%) with gradient bars at correct widths | P0 |
| T-06-05 | User growth grid | Inspect growth card | 6 role cells: Clients (124/+35%), Attorneys (47/+28%), CPAs (31/+42%), Agents (52/+18%), Lenders (19/+52%), Partners (11/+22%) | P0 |
| T-06-06 | Top Partners sidebar | Inspect sidebar | 3 partners: Premium Roofing (4.9/89), Elite Plumbing (4.8/76), Credit Solutions (5.0/64) | P0 |
| T-06-07 | 24h Activity sidebar | Inspect sidebar | 4 metrics: Active Users (847), Docs Uploaded (142), New Transactions (8, green), Referrals (23) | P0 |
| T-06-08 | Generate Reports | Click "Monthly Summary" | Report generation initiated | P0 |
| T-06-09 | Chart placeholder | Inspect chart card | Shows 📊 icon + "Chart Visualization" text + description | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-06-10 | No data for period | Select "Last 7 Days" with no data | KPI cards show "—"; breakdown shows "No data available" | P1 |
| T-06-11 | Report generation fails | Simulate server error | Inline error on button; retry option | P1 |
| T-06-12 | Partner data unavailable | Partner API slow | "Partner data is loading" message | P1 |
| T-06-13 | New Transactions colour | Inspect "8" value | Rendered in success-green (#10b981) | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-06-14 | Keyboard navigation | Tab through time selector, cards, report buttons | Logical focus order | P1 |
| T-06-15 | Screen reader | Navigate KPI cards and growth grid | Values and labels announced correctly | P1 |
