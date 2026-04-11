# Test Scenarios: Users (002)

## Component Tests

| ID | Scenario | Steps | Expected Result | Priority |
|----|----------|-------|-----------------|----------|
| T-02-01 | User stats render | Load Users | 6 stat cards: Total (1,247), Clients (856), Attorneys (142), CPAs (89), Agents (67), Lenders (22) | P0 |
| T-02-02 | Users table render | Load Users | 6 reference users with correct avatars, names, IDs, emails, role badges, status badges | P0 |
| T-02-03 | Approve pending user | Click "Approve" on Lisa Anderson | Status changes to Active; audit log updated | P0 |
| T-02-04 | Role filter | Select "Attorneys" | Table shows only attorney accounts | P0 |
| T-02-05 | Status filter | Select "Pending Approval" | Table shows only pending users | P0 |
| T-02-06 | Search users | Type "lisa" in search | Lisa Anderson row appears | P0 |
| T-02-07 | Add New User modal | Click "+ Add New User" | Modal opens with role selector | P0 |
| T-02-08 | Role-adaptive form | Select "Attorney" role | Professional Information section appears with Bar Number field | P0 |
| T-02-09 | Password auto-generate | Click auto-generate link | 16-char password with all required character types | P0 |
| T-02-10 | Permission auto-config | Select "Client" role | Only "View Documents," "Upload Documents," and "Messaging" checked | P0 |

## Edge Cases

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-02-11 | Duplicate email | Create user with existing email | Error: "A user with this email already exists" | P0 |
| T-02-12 | No users match filter | Apply role + status filter with no results | "No users match your filters" message | P1 |
| T-02-13 | Suspend user with transactions | Suspend user with active transactions | Warning about N active transactions | P1 |
| T-02-14 | Pagination | Navigate to page 2 | Correct next 6 users displayed | P1 |

## Accessibility

| ID | Scenario | Expected Result | Priority |
|----|----------|-----------------|----------|
| T-02-15 | Keyboard navigation | Tab through filter bar, table rows, action buttons | Logical focus order | P1 |
| T-02-16 | Screen reader | Navigate users table | Table headers and cells read correctly | P1 |
