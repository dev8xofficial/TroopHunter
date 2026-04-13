# Authentication — Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Brute Force Attacks | High | Rate limit requests per IP and email. Implement reCAPTCHA if threshold exceeded. |
| Role Mismatching | Medium | Backend must independently verify the user's role array before serving tokens. The UI selection is UX only. |
