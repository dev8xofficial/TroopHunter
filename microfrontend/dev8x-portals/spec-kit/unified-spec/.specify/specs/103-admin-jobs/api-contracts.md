# Admin Jobs - API Contracts
> **Module ID**: `103-admin-jobs`

### GET /api/v1/admin/jobs
List job postings with status filter.

### POST /api/v1/admin/jobs
Create new job posting.

### PUT /api/v1/admin/jobs/{id}
Update job posting.

### PATCH /api/v1/admin/jobs/{id}/status
Transition job status (publish, pause, resume, close).
**Body**: `{ "action": "publish" }`
