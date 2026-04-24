# Portal Routing — API Contracts
> **Module ID**: `002-portal-routing`

### GET /api/v1/portals/config
Returns public configuration for the portal selector.

**Response (200 OK)**:
```json
{
  "portals": [
    { "id": "candidate", "name": "Candidate Portal", "sso_enabled": true, "registration_enabled": true, "mfa_required": false },
    { "id": "client", "name": "Client Portal", "sso_enabled": true, "registration_enabled": false, "mfa_required": false },
    { "id": "admin", "name": "Admin Panel", "sso_enabled": false, "registration_enabled": false, "mfa_required": true }
  ]
}
```
