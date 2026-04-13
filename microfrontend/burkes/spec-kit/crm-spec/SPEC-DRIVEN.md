# Spec-Driven Development

## What SDD means in this repository

Spec-Driven Development treats specifications as the source of truth for product intent. Engineering work begins only after the business behavior, architecture, and delivery sequence are explicit enough to implement with confidence.

## Artifact chain

```text
Constitution -> Specs -> Plans -> Tasks -> Code -> Tests -> Release
```

## CRM-specific expectations

1. Specs define operator experience and business rules.
2. Plans define system boundaries, integrations, and delivery phases.
3. Tasks break implementation into dependency-ordered work.
4. Schemas, events, and access-control contracts anchor shared behavior.
5. Research and ADRs capture why the system is shaped the way it is.

## Why this matters here

The CRM sits at the center of a compliance-sensitive, multi-department business. Ambiguous requirements create rework, compliance risk, and poor integration outcomes. This repository exists so implementation can become a precise translation exercise rather than a discovery exercise.

---

**Version**: 1.0
**Last Updated**: 2026-04-13
