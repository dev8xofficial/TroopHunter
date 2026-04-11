# Test Scenarios: Partners (003)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-03-01 | Partner stats render | Load Partners | 6 stat cards: Total (156), Plumbing (42), Roofing (38), Electrical (35), Credit Repair (24), Other (17) | P0 |
| T-03-02 | Partners table render | Load Partners | 6 reference partners with correct company names, contacts, category badges, zip codes, ratings, status badges | P0 |
| T-03-03 | Approve pending partner | Click "Approve" on ABC Plumbing Co. | Status changes to Active; audit log updated | P0 |
| T-03-04 | Category filter | Select "Plumbing" | Table shows only plumbing partners | P0 |
| T-03-05 | Zip code filter | Enter "77380" | Table shows only partners serving 77380 | P0 |
| T-03-06 | Add Partner modal | Click "+ Add New Partner" | Modal opens with 7 sections | P0 |
| T-03-07 | Zip code tag input | Type "77380", click "+ Add Zip Code" | Tag appears; duplicate rejected | P0 |
| T-03-08 | File upload | Drag PDF to Business License zone | File accepted; filename displayed | P0 |
| T-03-09 | Activate suspended partner | Click "Activate" on Budget Roofing Inc. | Status changes to Active; audit log updated | P0 |
| T-03-10 | Star rating display | Inspect ABC Plumbing Co. rating | Shows "⭐⭐⭐⭐⭐ New" | P1 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-03-11 | Duplicate zip code | Add "77380" when already in list | Alert: "This zip code has already been added" | P0 |
| T-03-12 | Invalid zip code | Enter "ABCDE" | Alert: "Please enter a valid 5-digit zip code" | P0 |
| T-03-13 | No zip codes on submit | Submit form without zip codes | Validation error | P0 |
| T-03-14 | File too large | Upload 15MB file | Error: "File must be under 10MB" | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-03-15 | Keyboard navigation | Tab through filter bar, table, zip code tags | Logical focus order | P1 |
| T-03-16 | Screen reader | Navigate partners table | Table headers and cells read correctly | P1 |
