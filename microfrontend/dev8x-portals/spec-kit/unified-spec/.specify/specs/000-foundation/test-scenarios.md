# Foundation — Test Scenarios
> **Module ID**: `000-foundation`

### TS-000-01: Error Response Format (Positive)
**Steps**: Trigger any 400 error
**Expected**: Response matches `{ error, message, details, request_id }` schema

### TS-000-02: UUID Generation (Positive)
**Steps**: Create any entity
**Expected**: ID is valid UUID v4 format

### TS-000-03: Audit Event Immutability (Negative)
**Steps**: Attempt to UPDATE or DELETE an audit event record
**Expected**: Operation rejected (append-only enforcement)

### TS-000-04: Notification Scoping (Authorization)
**Steps**: User A reads User B's notifications
**Expected**: 403 Forbidden
