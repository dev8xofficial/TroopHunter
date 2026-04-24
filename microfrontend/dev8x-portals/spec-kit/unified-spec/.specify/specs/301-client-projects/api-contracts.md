# Client Projects — API Contracts
> **Module ID**: `301-client-projects`

### GET /api/v1/client/projects

| Field | Value |
|-------|-------|
| **Description** | List projects associated with the client |
| **Auth** | Bearer token (`client`, `manager`, `super_admin`) |

**Query Parameters:**
- `status`: string (enum: on_track, at_risk, delayed, completed)
- `page`: integer
- `limit`: integer

**Response (200 OK):** Returns paginated array of Project objects conforming to `project.schema.json`.

---

### GET /api/v1/client/projects/{id}

| Field | Value |
|-------|-------|
| **Description** | Retrieve specific project details |
| **Auth** | Bearer token (`client`, `manager`, `super_admin`) |

**Response (200 OK):** Returns Project object with nested `team` array and `pm` object.

---

### PUT /api/v1/client/projects/{id}/status

| Field | Value |
|-------|-------|
| **Description** | Update project health status |
| **Auth** | Bearer token (`manager`, `super_admin`) |

**Request Body:**
```json
{
  "status": "at_risk",
  "reason": "Delay in client asset delivery"
}
```

**Response (200 OK):** Returns updated Project object.
