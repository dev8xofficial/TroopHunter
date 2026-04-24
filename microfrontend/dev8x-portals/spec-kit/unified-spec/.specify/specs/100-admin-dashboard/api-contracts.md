# Admin Dashboard - API Contracts
> **Module ID**: `100-admin-dashboard`

### GET /api/v1/admin/dashboard/kpis
Returns the 4 core KPI values with delta trends.
**Auth**: Bearer token (`hr_admin`, `super_admin`, `manager`)

### GET /api/v1/admin/dashboard/funnel
Returns the 5-stage funnel with conversion rates.
**Query Params**: `period` (enum: 7d, 30d, 90d, all)

### GET /api/v1/admin/dashboard/pipeline-summary
Returns per-stage applicant counts for the pipeline bar.
