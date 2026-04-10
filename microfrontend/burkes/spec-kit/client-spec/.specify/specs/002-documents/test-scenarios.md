# Test Scenarios: Documents Spec

## Overview

Tests verify document upload/download, status transitions, and role-based access control.

## Test Matrix

| Role | Action                    | Expected                              | Status |
| ---- | ------------------------- | ------------------------------------- | ------ |
| CL   | Upload Identification doc | File stored; status "pending_review"  | ✅     |
| AT   | Review & approve          | Status → "approved"; email sent to CL | ✅     |
| AG   | View all docs             | Can see all categories (full access)  | ✅     |
| CL   | View rejected doc         | Sees rejection reason; can re-upload  | ✅     |

## Edge Cases

1. **Upload oversized file (> 100MB)**
   - Expected: Rejected with clear error message
   - Acceptance: File not stored; user notified

2. **Duplicate upload (same doc name)**
   - Expected: Prevented or versioned automatically
   - Acceptance: No confusion; audit trail clear

3. **Rejected doc > 7 days old**
   - Expected: Auto-delete or archive (per retention policy)
   - Acceptance: Space managed; compliance met

## Success Criteria

✅ All uploads stored securely (encrypted, scanned for viruses)
✅ Status transitions accurate (uploaded → pending → approved/rejected)
✅ Role-based access enforced (no unauthorized downloads)
✅ Audit trail complete (who, what, when logged)
