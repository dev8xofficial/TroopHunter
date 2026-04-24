# Foundation — API Contracts

> **Module ID**: `000-foundation`

---

No endpoints. Foundation defines shared data models and contracts only. All API endpoints are defined in domain-specific modules (001+).

## Shared Response Schemas

### Error Response (All Endpoints)

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "details": [
    { "field": "email", "message": "must be a valid email" }
  ],
  "request_id": "uuid"
}
```

### Pagination Response (List Endpoints)

```json
{
  "data": [],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "total_pages": 5
  }
}
```
