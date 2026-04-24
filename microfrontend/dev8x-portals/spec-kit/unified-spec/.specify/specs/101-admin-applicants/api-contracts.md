# Admin Applicants - API Contracts
> **Module ID**: `101-admin-applicants`

### GET /api/v1/admin/applicants
List applicants with filters and pagination.
**Query**: status, department, source, page, limit, sort_by, sort_dir

### GET /api/v1/admin/applicants/{id}
Get full applicant detail including timeline and documents.

### POST /api/v1/admin/applicants
Create a new applicant.

### PUT /api/v1/admin/applicants/{id}
Update applicant info.

### PATCH /api/v1/admin/applicants/{id}/status
Transition applicant status (triggers state machine).
**Body**: `{ "status": "shortlisted", "reason": "Strong technical skills" }`
