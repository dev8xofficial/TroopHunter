# ADR-008: Clockify Integration Strategy

> **Status**: Accepted
> **Date**: 2026-04-22
> **Decision Makers**: Platform Architect, Client Services Domain Owner

---

## Context

The Client Portal includes a "Working Hours" feature (Module 304) that provides:

- Weekly bar charts showing hours logged per day
- Daily time log table with task descriptions and team member attribution
- Team breakdown showing hours distribution across team members
- Budget burn bar tracking percentage of allocated budget consumed
- Score ring showing overall project health based on time utilization

The `client-portal.html` prototype references "Clockify" — an external time tracking service — as the data source. The question is whether the spec should define a Clockify-specific integration or an abstracted time tracking interface.

---

## Decision

Define an **abstracted time tracking interface** with Clockify as the reference implementation:

1. **Spec-level**: Module 304 defines time tracking as an abstract capability with entities (`TimeEntry`, `BudgetBurn`) and operations (list, aggregate, filter)
2. **Contract-level**: `api.yaml` defines `/client/time-entries` endpoints without mentioning Clockify
3. **Implementation-level**: The implementation may use Clockify API, Toggl API, Harvest API, or a custom time tracking system — the spec doesn't prescribe
4. **Integration boundary**: The spec defines what data the platform needs (date, hours, task, team_member), not where it comes from

### Data Contract

```yaml
TimeEntry:
  id: uuid
  project_id: uuid
  date: date
  hours: number (0-24)
  task: string
  team_member_id: uuid
  source: string (optional — e.g., "clockify", "manual")
  created_at: datetime
```

The `source` field allows mixed data sources without breaking the spec.

---

## Consequences

### Positive

- **Vendor-neutral**: Platform isn't locked to Clockify
- **Consistent API**: Clients see the same `/client/time-entries` endpoint regardless of backend source
- **Testable**: Unit tests don't need Clockify credentials
- **Migratable**: Switching from Clockify to Toggl is an implementation change, not a spec change

### Negative

- **Abstraction gap**: Clockify-specific features (e.g., project templates, billable/non-billable flags) may not be captured in the abstract model
- **Implementation burden**: Each time tracking provider needs an adapter

---

## Alternatives Considered

### Alternative 1: Clockify-Specific Integration

**Description**: Spec defines Clockify API endpoints, webhook formats, and data mapping.
**Rejected Because**: Violates ADR-005 (technology-agnostic specs). Tightly couples specs to a third-party vendor.

### Alternative 2: No Integration — Manual Time Entry Only

**Description**: Users manually log time entries in the platform.
**Rejected Because**: The client-portal prototype explicitly shows Clockify integration as a key feature. Manual-only would be a significant downgrade.

---

## References

- [304-client-working-hours](../specs/304-client-working-hours/spec.md)
- [ADR-005: Technology-Agnostic Specifications](adr-005-tech-agnostic-specs.md)
- [schemas/time-entry.schema.json](../../schemas/time-entry.schema.json)
