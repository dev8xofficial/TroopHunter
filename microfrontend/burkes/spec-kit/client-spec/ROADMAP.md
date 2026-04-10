# Feature Roadmap & Release Timeline

This document outlines the planned specs, prioritization, and estimated delivery timeline for The Burkes Group Client Portal.

---

## 📅 Release Phases

### Phase 1: MVP (Foundation + Core Screens) — _Launched Q2 2026_

**Status**: ✅ **LIVE**

| Feature ID | Feature Name                           | Status   | Est. Launch |
| ---------- | -------------------------------------- | -------- | ----------- |
| 000        | Foundation (Nav, Tokens, Auth Context) | Approved | Q2 2026 ✅  |
| 001        | Dashboard                              | Approved | Q2 2026 ✅  |
| 002        | Documents                              | Approved | Q2 2026 ✅  |
| 003        | Messages                               | Approved | Q2 2026 ✅  |
| 004        | Insurance                              | Approved | Q2 2026 ✅  |
| 005        | Mortgage Application                   | Approved | Q2 2026 ✅  |
| 006        | Partner Services                       | Approved | Q2 2026 ✅  |

**Deliverables**: Single-page portal with 6 screens, activity logging, role-based access, document management.

**Success Metrics**:

- Client adoption: 80% of portal-invited clients log in
- Average session time: > 10 minutes
- Document upload success rate: > 95%
- Message send latency: < 1 second
- Zero critical data loss incidents

---

### Phase 2: Advanced Workflows — _Q3–Q4 2026_

**Status**: 📋 **PLANNED**

| Feature ID | Feature Name                  | Status | Priority | Est. Launch |
| ---------- | ----------------------------- | ------ | -------- | ----------- |
| 007        | Closing Checklist             | Ready  | High     | Q3 2026     |
| 008        | Task Delegation (TC)          | Draft  | Medium   | Q4 2026     |
| 009        | Conditional Approval Workflow | Draft  | High     | Q3 2026     |
| 010        | Audit Report & Compliance     | Draft  | Low      | Q4 2026     |

**Planned Features**:

- **007 Closing Checklist**: Final countdown checklist for closing day (walkthrough items, signature verification, funds confirmation)
- **008 Task Delegation**: TC can assign tasks to team members and track completion
- **009 Conditional Approvals**: Lender sends conditional approvals; client can respond inline
- **010 Audit Report**: Generate/download comprehensive audit trail of all actions

**Success Metrics**:

- Closing coordinator time reduction: 20% faster closeout
- Task completion SLA adherence: > 90%
- Audit report generation time: < 30 seconds

---

### Phase 3: Analytics & Insights — _Q1 2027_

**Status**: 🔮 **EXPLORATORY**

| Feature ID | Feature Name                      | Status    | Priority |
| ---------- | --------------------------------- | --------- | -------- |
| 011        | Portal Analytics Dashboard        | Conceived | Medium   |
| 012        | Transaction Insights (Agent View) | Conceived | Medium   |
| 013        | Bottleneck Detection              | Conceived | Low      |

**Planned Features**:

- **011 Portal Analytics Dashboard**: Portal usage metrics, screen engagement, drop-off rates (for ops team)
- **012 Transaction Insights**: Agent can see their transaction funnel—how many buyers start/drop/complete
- **013 Bottleneck Detection**: Automated alerts if a transaction is stuck at one stage > X days

---

### Phase 4: Mobile & External APIs — _2027+_

**Status**: 🔮 **LONG-TERM VISION**

- Native iOS/Android app with core portal features
- Public API for integration partners (inspectors, appraisers, service providers)
- Webhook notifications for external systems
- Advanced reporting/BI integration

---

## 🎯 Prioritization Framework

Specs are prioritized by:

1. **User Impact**: Does it solve a critical user problem?
2. **Frequency**: How often will users need this?
3. **Effort**: How much work is it?
4. **Dependencies**: What other features must exist first?
5. **Strategic Alignment**: Does it match business goals?

**Priority Levels**:

- **🔴 Critical**: Blocks launch; no workaround available
- **🟠 High**: Important for MVP or post-launch satisfaction
- **🟡 Medium**: Nice-to-have; can be deferred
- **🟢 Low**: Future enhancement; exploratory

---

## 📊 Current Roadmap Status

**Phase 1 (MVP): 100% Complete**

- All 6 core screens launched
- Activity logging working
- Role-based access implemented
- Feature flag rollout completed (now always-on)

**Phase 2 (Advanced Workflows): 20% Complete**

- 007-Closing Checklist spec: Ready for planning
- 008–010 specs: In Draft stage, awaiting product review

**Phase 3 (Analytics): 0% Complete**

- Concepts exist; no specs drafted yet
- Awaiting stakeholder alignment on metrics

**Phase 4 (Mobile/APIs): 0% Complete**

- Blocked on Phase 2 and 3 completion
- High effort; deferred to 2027+

---

## 🗓️ Release Timeline (Tentative)

```
Q2 2026      Q3 2026        Q4 2026       Q1 2027       2027+
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│ ✅ Phase 1   📍 007 Spec   📍 008–010     📍 Analytics    🔮 Mobile
│    MVP        Approved     Approved        Specs Out         & APIs
│ LIVE NOW
│                                                               │
│ 001–006   Plan & Dev    Testing &      Spec/Plan        Long-term
│ Launched  (4 weeks)     Rollout        Phase (6 weeks)    Research
│                        (4 weeks)
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Spec Status Definitions

- **Conceived**: Idea exists; not yet formalized into spec
- **Draft**: Spec written; awaiting review
- **Ready**: Spec approved by product; awaiting tech review
- **Approved**: Spec approved by both product and tech; ready for planning
- **In Planning**: Plan being created
- **Planned**: Plan approved; awaiting development
- **In Development**: Active dev work on tasks
- **Testing**: QA phase
- **Live**: Shipped to production
- **Deprecated**: Feature retired; backward compatibility period ongoing

---

## 🚀 How to Request a Feature

1. **Check current roadmap** — Is it already planned?
2. **Open an issue** using [spec-new.md](.github/ISSUE_TEMPLATE/spec-new.md)
3. **Describe the problem** — Who needs it? Why? What's the impact?
4. **Product lead triages** — Prioritizes against other requests
5. **Spec is drafted** (if approved) → Enters roadmap above

---

## 📞 Questions About Roadmap?

- Check [FAQ.md](FAQ.md) for general questions
- Contact Product Lead for prioritization discussions
- Check [GOVERNANCE.md](GOVERNANCE.md) for decision-making process

---

**Version**: 1.0  
**Last Updated**: April 10, 2026 (MVP launch baseline)  
**Next Review**: July 15, 2026 (post-MVP retrospective)
