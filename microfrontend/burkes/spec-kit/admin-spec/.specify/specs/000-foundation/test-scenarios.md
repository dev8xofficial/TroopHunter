# Test Scenarios — 000-foundation

**Feature ID**: [NNN-short-name]  
**Spec**: [Link to spec.md]  
**Last Updated**: [YYYY-MM-DD]

This document defines all test scenarios for this feature. Use this for QA, acceptance testing, and UAT planning.

---

## Test Matrix: Role × Action × Expected Outcome

Test all combinations below to ensure full coverage:

| Role     | Action       | Precondition | Expected Outcome               | Status            |
| -------- | ------------ | ------------ | ------------------------------ | ----------------- |
| Client   | **Action 1** | State X      | Client sees Y, system does Z   | ✅ Pass / ❌ Fail |
| Client   | **Action 2** | State X      | Client sees Y, system does Z   | ✅ Pass / ❌ Fail |
| Admin    | **Action 1** | State X      | Admin sees Y, system does Z    | ✅ Pass / ❌ Fail |
| Lender   | **Action 1** | State X      | Lender sees Y, system does Z   | ✅ Pass / ❌ Fail |
| Attorney | **Action 1** | State X      | Attorney sees Y, system does Z | ✅ Pass / ❌ Fail |
| CPA      | **Action 1** | State X      | CPA sees Y, system does Z      | ✅ Pass / ❌ Fail |
| TC       | **Action 1** | State X      | TC sees Y, system does Z       | ✅ Pass / ❌ Fail |

---

## Scenario 1: [Happy Path Scenario Name]

**Description**: [What is this test verifying?]  
**Actors**: [Which roles participate?]  
**Precondition**: [What must be true before test starts?]

### Steps

1. [Step 1: Action by Actor A]
2. [Step 2: Action by Actor B]
3. [Step 3: System response]
4. [Step 4: Verification]

### Expected Outcome

- ✅ [Verifiable condition 1]
- ✅ [Verifiable condition 2]
- ✅ Activity log shows "[Label]"
- ✅ Response time < X seconds

### Test Data

```json
{
  "transaction_id": "txn-001-happy-path",
  "client_name": "John Doe",
  "status_before": "not-started",
  "status_after": "completed",
  "timestamp": "2026-04-10T14:00:00Z"
}
```

---

## Scenario 2: [Edge Case: Boundary Condition]

**Description**: What happens at the boundary?  
**Example**: User uploads document exactly at 10 MB limit (max file size)  
**Actors**: Client  
**Precondition**: File is exactly 10,000,000 bytes

### Steps

1. Client initiates document upload
2. System validates file size
3. Upload completes

### Expected Outcome

- ✅ File upload succeeds
- ✅ No error message
- ✅ Document appears in table

### Test Data

```json
{
  "filename": "document.pdf",
  "file_size_bytes": 10000000,
  "file_type": "application/pdf"
}
```

---

## Scenario 3: [Error Case: Invalid Input]

**Description**: What happens with invalid input?  
**Example**: User tries to upload non-PDF file  
**Actors**: Client  
**Precondition**: Selected file is .exe (executable)

### Steps

1. Client selects .exe file
2. Click upload
3. System validates file type

### Expected Outcome

- ❌ Error message: "Only PDF, Word, and image files are supported"
- ❌ File is rejected (not queued for upload)
- ❌ No activity log entry created
- ✅ User can retry with valid file

### Test Data

```json
{
  "filename": "malware.exe",
  "file_type": "application/octet-stream",
  "expected_error_code": "INVALID_FILE_TYPE"
}
```

---

## Scenario 4: [Permission Edge Case]

**Description**: Does role-based access work correctly?  
**Example**: CPA tries to upload document (should fail)  
**Actors**: CPA  
**Precondition**: CPA logged in, on Documents screen

### Steps

1. CPA clicks "Upload Document" button
2. Button is disabled/hidden OR clicking shows error

### Expected Outcome

- ❌ Upload button is disabled (greyed out) OR
- ❌ Clicking shows error: "Your role cannot upload documents"
- ❌ No file picker opens
- ✅ CPA can still view and download existing documents

### Test Data

```json
{
  "actor_role": "cpa",
  "action": "upload",
  "expected_status": "forbidden"
}
```

---

## Scenario 5: [Concurrent Action]

**Description**: What if two users act simultaneously?  
**Example**: Admin and Lender both upload documents at same time  
**Actors**: Admin (thread 1), Lender (thread 2)  
**Precondition**: Both logged in to same transaction

### Steps

1. Admin starts upload (don't wait for completion)
2. Lender starts upload (simultaneously)
3. Both uploads complete

### Expected Outcome

- ✅ Both documents appear in table
- ✅ Both activity log entries created (timestamped correctly, in order)
- ✅ No data corruption
- ✅ Document counts incremented correctly

### Test Data

```json
{
  "concurrent_uploads": 2,
  "doc_1": { "filename": "Admin-doc.pdf", "uploader": "Admin" },
  "doc_2": { "filename": "lender-doc.pdf", "uploader": "lender" },
  "expected_outcome": "both_succeed"
}
```

---

## Scenario 6: [Recovery from Error]

**Description**: Can user recover if something fails midway?  
**Example**: User uploads document, upload fails at 50%, user retries  
**Actors**: Client  
**Precondition**: Network connectivity issue simulated

### Steps

1. Client starts uploading 10 MB file
2. At 50%, network fails (simulate connection timeout)
3. User sees error: "Upload failed. Click Retry."
4. Click Retry
5. Upload completes successfully

### Expected Outcome

- ✅ Clear error message shown immediately
- ✅ Retry button is available
- ✅ Second attempt succeeds
- ✅ Only one document appears in table (no duplicate)
- ✅ One activity log entry (not two)

---

## Edge Cases to Test

| Edge Case           | Precondition                                 | Expected Outcome                                           |
| ------------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Empty input         | User leaves text field blank                 | Error: "Field is required"                                 |
| Whitespace only     | User enters " " (spaces)                     | Error: "Field cannot be empty"                             |
| Max length exceeded | User enters 101 characters in 100-char field | Error: "Max 100 characters"                                |
| XSS attempt         | User enters `<script>alert('xss')</script>`  | Input is sanitized; no script runs                         |
| Unicode / emoji     | User enters "🔔 Notification Updated"        | Text displays correctly                                    |
| Very large number   | User enters 999,999,999,999 for amount       | Error: "Must be ≤ 10,000,000" or accepted if max is higher |
| Null/undefined      | Data field is missing from API response      | Error or default value applied                             |
| Expired session     | Session token expires mid-action             | User redirected to login; no data lost                     |
| High latency        | Network is slow (2–5 sec response)           | UI shows loading spinner; timeout after 30 sec             |
| Offline             | User goes offline mid-action                 | Error: "No connection. Please retry when online."          |

---

## Performance Benchmarks

| Action                  | Target      | Method                                     |
| ----------------------- | ----------- | ------------------------------------------ |
| Document upload (10 MB) | < 5 seconds | Measure end-to-end time in browser console |
| Search results          | < 500 ms    | Measure query + UI render time             |
| Activity log load       | < 1 second  | Measure time to display first 20 events    |
| Form submission         | < 1 second  | Measure POST request + page update         |

---

## Accessibility Checklist

- [ ] All inputs have associated `<label>` elements
- [ ] Form can be completed using keyboard only (Tab, Enter)
- [ ] Error messages are announced to screen readers
- [ ] Colour is not sole indicator of status (e.g., red for error; also use text)
- [ ] Focus visible on interactive elements
- [ ] Images have alt text

---

## Test Data Fixtures

Use these common test data values across scenarios to reduce setup time:

```json
{
  "transactions": [
    {
      "id": "txn-001",
      "client_name": "John Doe",
      "property_address": "123 Main St, Austin, TX 78701",
      "estimated_close_date": "2026-05-15"
    }
  ],
  "roles": ["client", "Admin", "lender", "attorney", "cpa", "tc"],
  "documents": [
    {
      "id": "doc-001",
      "filename": "purchase_agreement.pdf",
      "size_mb": 2.5,
      "uploader": "Admin",
      "status": "needs-signature"
    }
  ],
  "statuses": ["not-started", "in-progress", "completed", "under-review", "needs-signature"]
}
```

---

## Known Issues / Deferred Tests

| Issue                                                             | Impact | Workaround                          | When Fixed            |
| ----------------------------------------------------------------- | ------ | ----------------------------------- | --------------------- |
| [Issue #123] File upload > 50 MB causes timeout                   | Medium | Tell QA to test only < 50 MB files  | Phase 1.1 (June 2026) |
| [Issue #456] Search doesn't find documents uploaded while offline | Low    | Upload documents while online first | Phase 1.2 (July 2026) |

---

## Sign-Off

| Role    | Name        | Date       | Status                   |
| ------- | ----------- | ---------- | ------------------------ |
| QA Lead | @qa-lead    | 2026-04-XX | ✅ All scenarios covered |
| Product | @pm-feature | 2026-04-XX | ✅ Approved              |
| Tech    | @architect  | 2026-04-XX | ✅ Feasible              |

---

**Version**: 1.0  
**Test Framework**: [Cypress / Playwright / Selenium / Manual QA]  
**Regression Test Frequency**: Every PR merge

See also: [spec.md](./spec.md) for functional requirements; [validation-schema.json](./validation-schema.json) for data contracts.

