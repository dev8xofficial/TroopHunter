# Governance

> Decision-making process for the Dev8X Unified Spec-Kit.

---

## Decision Authority

| Decision Type | Authority | Process |
|---------------|-----------|---------|
| New module creation | Domain Owner + Platform Architect | ADR required |
| Module spec changes | Domain Owner | PR with 2 approvals |
| Cross-domain contract changes | Platform Architect | ADR required + all domain owners notified |
| Constitution amendments | Platform Architect + All Domain Owners | Unanimous consent |
| ADR creation | Any contributor | PR with Platform Architect approval |
| Template changes | Platform Architect | PR with rationale |
| Workflow/CI changes | Platform Architect | PR review |

---

## Domain Ownership

| Domain | Code | Owner |
|--------|------|-------|
| Authentication (0xx) | `001–005` | Platform Architect |
| HR Admin (1xx) | `100–108` | HR Domain Owner |
| Candidate (2xx) | `200–206` | HR Domain Owner |
| Client (3xx) | `300–307` | Client Services Domain Owner |
| CRM/Sales (4xx) | `400–408` | Sales Domain Owner |
| Contracts (cross-cutting) | `contracts/*` | Platform Architect |

---

## ADR Process

Architecture Decision Records document significant decisions:

1. **Propose**: Author creates ADR using template in `.specify/decisions/`
2. **Discuss**: Team reviews in PR comments
3. **Decide**: Platform Architect approves or requests revision
4. **Record**: Merged ADR becomes authoritative record
5. **Supersede**: New ADR supersedes old one (old ADR marked as superseded, never deleted)

---

## Escalation Path

```
Contributor → Domain Owner → Platform Architect → Product Lead
```
