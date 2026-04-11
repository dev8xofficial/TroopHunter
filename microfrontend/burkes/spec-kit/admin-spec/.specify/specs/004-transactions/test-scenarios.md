# Test Scenarios: Transactions (004)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-04-01 | Transaction stats render | Load Transactions | 6 stat cards: Total (847), Active (324), Closing Soon (89), Completed (47), Delayed (12), Value ($127M) | P0 |
| T-04-02 | Pending Approvals collapse | Click section header | Section expands with animation; icon rotates; approval items visible | P0 |
| T-04-03 | Approve attorney verification | Click "✅ Approve" on TRX-10247 | Stage proceeds; audit log records approval | P0 |
| T-04-04 | Reject with reason | Click "❌ Reject" on approval item | Textarea appears; submit blocked until reason entered | P0 |
| T-04-05 | Transactions table render | Load Transactions | 5 reference transactions with correct badges and actions | P0 |
| T-04-06 | Stage filter | Select "Closing Preparation" | Table shows only transactions in that stage | P0 |
| T-04-07 | Type filter | Select "Purchase" | Table shows only purchase transactions | P0 |
| T-04-08 | Create transaction modal | Click "+ New Transaction" | Modal opens with 4 sections | P0 |
| T-04-09 | View/Edit modal | Click "View" on TRX-10247 | Modal shows pre-filled reference data | P0 |
| T-04-10 | Completed row styling | Inspect TRX-10089 | Reduced opacity (0.85); "Archive" action instead of "Edit" | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-04-11 | Divorce transaction amount | Inspect TRX-10134 | Shows "—" for Contract Amount | P0 |
| T-04-12 | No transactions after filter | Apply stage + status filter with no results | "No transactions match your filters" | P1 |
| T-04-13 | URGENT badge count | Load with 3 urgent items | Badge shows "3 URGENT" with pulsing animation | P1 |
| T-04-14 | Reject without reason | Click reject, try to submit empty | Validation: "Please provide a reason for rejection" | P0 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-04-15 | Keyboard navigation | Tab through filters, table, approval section | Logical focus order | P1 |
| T-04-16 | Screen reader | Navigate transactions table | Table headers, badges, and action buttons announced correctly | P1 |
