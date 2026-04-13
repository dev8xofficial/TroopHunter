# Role Routing — Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Dead Handoff Link | High | End-to-end integration tests must assert the physical existence of destination files in production. |
| Permission Misinformation | Medium | Text files must be strictly audited by Product to match actual sub-portal logic. |
