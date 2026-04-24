# Client Dashboard — API Contracts
> **Module ID**: `300-client-dashboard`

### GET /api/v1/client/dashboard/kpis

| Field | Value |
|-------|-------|
| **Description** | Retrieve aggregated KPIs for the client dashboard |
| **Auth** | Bearer token (`client`, `manager`, `super_admin`) |
| **Rate Limit** | 60 requests/minute |

**Response (200 OK):**

```json
{
  "active_projects": 3,
  "total_budget_burn_pct": 65.5,
  "unpaid_invoices": {
    "count": 2,
    "total_amount": 4500.00
  },
  "open_tickets": 1,
  "projects_health": {
    "on_track": 2,
    "at_risk": 1,
    "delayed": 0
  }
}
```

### GET /api/v1/client/dashboard/activity

| Field | Value |
|-------|-------|
| **Description** | Retrieve chronological activity feed for the client |
| **Auth** | Bearer token (`client`, `manager`, `super_admin`) |

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": "uuid",
      "type": "invoice_generated",
      "title": "New Invoice #1042",
      "timestamp": "2026-04-24T10:00:00Z",
      "link": "/client/invoices/1042"
    }
  ],
  "meta": {
    "total": 15,
    "limit": 10
  }
}
```
