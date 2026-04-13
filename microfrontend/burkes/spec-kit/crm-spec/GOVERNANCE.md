# Governance - CRM Spec-Kit

## Decision Framework

The CRM spec-kit uses a structured approval model so business scope, compliance obligations, and technical feasibility stay aligned.

---

## 1. Roles and Authorities

| Role | Authority | Scope |
| --- | --- | --- |
| Product Manager | Feature scope, release priority, acceptance of business value | All feature specs |
| Product Lead | Constitutional changes and phase boundary approval | Constitution, roadmap, governance |
| Technical Architect | Integration design, system fit, implementation planning | Architecture, plans, contracts |
| Data/Compliance Reviewer | Retention, consent, audit, and ownership review | Schemas, access, events, compliance text |
| Feature Author | Writes and updates artifacts within assigned area | Individual feature directories |

---

## 2. Approval Requirements

| Change type | Required approvers | Minimum approvals |
| --- | --- | --- |
| New Phase 1 feature spec | Product Manager + Technical Architect | 2 |
| Schema or API change | Technical Architect + Data/Compliance Reviewer | 2 |
| Non-breaking wording update | Any designated reviewer | 1 |
| Constitution or governance update | Product Lead + Product Manager + Technical Architect | 3 |
| ADR | Product Manager + Technical Architect | 2 |

---

## 3. Breaking Changes

A change is considered breaking if it:

- changes the unified contact record semantics
- changes the six-stage pipeline lifecycle
- alters data ownership or compliance language
- removes a Phase 1 communication pillar
- introduces backwards-incompatible schema or event changes

Breaking changes require impact analysis, linked rollout notes, and coordinated updates to affected artifacts.

---

## 4. Review Service Levels

| Priority | Target review time |
| --- | --- |
| P0 | 1 business day |
| P1 | 2 business days |
| P2 | 5 business days |
| P3 | 10 business days |

---

## 5. Escalation

If reviewers disagree:

1. Resolve in writing on the pull request where possible.
2. If unresolved, schedule a focused decision review.
3. Record the final decision in an ADR when the topic changes architecture, compliance, or workflow behavior.

---

**Version**: 1.0
**Last Updated**: 2026-04-13
