# Admin Pipeline - API Contracts
> **Module ID**: `102-admin-pipeline`

### GET /api/v1/admin/pipeline
Returns all applicants grouped by stage for Kanban rendering.
**Query**: department, position, urgency

### PATCH /api/v1/admin/pipeline/{applicant_id}/move
Move applicant to new stage (alias for status change).
**Body**: `{ "target_stage": "interview" }`
