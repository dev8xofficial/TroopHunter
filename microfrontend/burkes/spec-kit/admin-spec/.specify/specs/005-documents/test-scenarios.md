# Test Scenarios: Documents (005)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-05-01 | Documents table render | Load Documents | 4 reference documents with correct names, category badges, TRX IDs, uploaders, dates, status badges | P0 |
| T-05-02 | Approve document | Click "✅ Approve" on Purchase & Sales Agreement – Smith | Status changes to Approved; action buttons change to "👁️ View" only; audit log updated | P0 |
| T-05-03 | Reject document | Click "❌ Reject" on Mortgage Application – Williams | Textarea appears; enter reason; status changes to Rejected; lender notified | P0 |
| T-05-04 | Approved doc actions | Inspect Home Inspection Report – Brown | Shows only "👁️ View" (no approve/reject) | P0 |
| T-05-05 | Category filter | Select "Mortgage Documents" | Only Mortgage Application – Williams shown | P0 |
| T-05-06 | Status filter | Select "Needs Review" | Only 2 Needs Review documents shown | P0 |
| T-05-07 | Search by TRX ID | Enter "TRX-10247" | Purchase & Sales Agreement – Smith shown | P0 |
| T-05-08 | Approve button styling | Inspect "✅ Approve" | Green background (tbl-btn-success), white text | P1 |
| T-05-09 | Reject button styling | Inspect "❌ Reject" | White background, red border and text (tbl-btn-danger) | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-05-10 | Reject without reason | Click reject, try to submit empty textarea | Validation: blocked until reason provided | P0 |
| T-05-11 | No documents pending | All documents approved | "No documents pending review. All documents are up to date." | P1 |
| T-05-12 | No documents match filter | Apply category + status with no results | "No documents match your search" | P1 |
| T-05-13 | Approve fails | Server error on approve | Inline error on row; retry option | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-05-14 | Keyboard navigation | Tab through filter bar, table rows, approve/reject buttons | Logical focus order | P1 |
| T-05-15 | Screen reader | Navigate documents table | Table headers, document names, and status badges announced correctly | P1 |
