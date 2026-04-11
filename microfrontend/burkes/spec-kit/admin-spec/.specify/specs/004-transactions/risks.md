# Risk Register — 004-transactions

**Feature ID**: [NNN-short-name]  
**Spec**: [Link to spec.md]  
**Owner**: @pm-feature  
**Last Updated**: [YYYY-MM-DD]

---

## Overview

This document identifies risks that could prevent this feature from delivering its intended value. Risks are categorized by:

- **Type**: Technical, Business, UX, Security, Operational, Dependency
- **Status**: Identified, Mitigating, Mitigated, Accepted, Occurred
- **Priority**: Critical, High, Medium, Low

---

## Risk Register

### Risk-1: [RISK TITLE]

**Risk ID**: R-NNN-01  
**Type**: [Technical / Business / UX / Security / Operational / Dependency]  
**Status**: Identified | Mitigating | Mitigated | Accepted | Occurred

**Description**:
[What could go wrong? Be specific.]

**Example**: "If the document upload API is slow (> 5 sec), clients may think it's broken and close the browser, leaving their upload incomplete. Retries could lead to duplicate documents."

---

#### Probability

**Likelihood (1–5)**: [1 = unlikely, 5 = almost certain]  
**Rationale**: [Why is this likely or unlikely?]

**Example**: "Probability = 3 (Medium). Our current file upload API handles 10 concurrent uploads, but peak usage shows 4 concurrent. However, during Closing Week (high usage), we could hit limits."

---

#### Impact

**Business Impact (1–5)**: [1 = negligible, 5 = catastrophic]  
**Technical Impact (1–5)**: [1 = minor workaround, 5 = system down]  
**User Experience Impact (1–5)**: [1 = minor annoyance, 5 = unusable]

**Risk Score**: (Probability × avg(Business,Tech,UX)) / 5 = [X/25 score]

**Example**:

- Business: 4 (clients can't close; delays closing)
- Tech: 3 (duplicate documents; data cleanup needed)
- UX: 4 (frustrating; users don't know why upload is hanging)
- Score: (3 × 3.67) / 5 = **2.2 / 5 (HIGH)**

---

#### Mitigation Strategy

**Primary Mitigation**: [What will we do to reduce probability or impact?]

**Example**: "Scale upload API to handle 50 concurrent uploads; implement upload queue with status indicator ('Your upload is queued, position 3 of 5'); set timeout at 30 sec with retry logic."

**Secondary Mitigation** [If primary fails]: [What's the fallback?]

**Example**: "If upload still times out, show error message: 'Upload is taking longer than usual. Would you like to retry or try again in 10 minutes?' Store upload state in localStorage; resume from where user left off."

---

#### Acceptance Criteria (Risk is "Mitigated")

- [ ] Upload API load-tested to 50 concurrent
- [ ] Queue UI implemented and UX-tested
- [ ] Timeout handling implemented
- [ ] Retry logic tested (no duplicates)
- [ ] Error messaging clear to users

---

#### Owner & Review

- **Risk Owner**: @backend-engineer
- **Monitor Frequency**: Weekly (during rollout); then monthly
- **Review Date**: [When will we reassess this risk?]

---

---

### Risk-2: [SECURITY: Data Exposure]

**Risk ID**: R-NNN-02  
**Type**: Security  
**Status**: Identified

**Description**:
Documents uploaded by one role (e.g., Client) could be visible to wrong role (e.g., CPA sees mortgage financial forms). This violates P-03 (Role-Scoped Access) and causes privacy breach.

**Probability**: 2 (Unlikely if access control is tested)  
**Business Impact**: 5 (Regulatory fines, lawsuits, trust destroyed)  
**Tech Impact**: 4 (Database query logic error)  
**UX Impact**: 1 (User wouldn't know; no direct impact)  
**Score**: (2 × 3.3) / 5 = **1.3 / 5 (MEDIUM-HIGH)**

#### Mitigation

**Primary**:

- Write access control policy in code review checklist
- Unit tests for each role × document type combination
- Manual QA testing: loop through all 6 roles; verify they see only their data
- Automated security testing: attempt to fetch docs belonging to other roles; should be rejected with 403

**Secondary**:

- If breach occurs, audit log will show who accessed what
- Notify affected users; offer identity protection
- Regulatory notification

#### Acceptance Criteria

- [ ] Access control unit tests (100% coverage)
- [ ] Security testing via OWASP checklist
- [ ] Manual QA sign-off on role access
- [ ] Code review by security specialist

---

---

### Risk-3: [OPERATIONAL: Dependent Service Down]

**Risk ID**: R-NNN-03  
**Type**: Dependency  
**Status**: Identified

**Description**:
Document upload feature depends on cloud storage service (AWS S3, Google Drive, etc.). If that service is down, clients can't upload documents.

**Probability**: 2 (AWS has 99.99% uptime; rare)  
**Business Impact**: 4 (Clients can't close transaction; revenue impact)  
**Tech Impact**: 2 (Workaround exists; graceful degradation)  
**UX Impact**: 4 (Feature completely unavailable)  
**Score**: (2 × 3.3) / 5 = **1.3 / 5 (MEDIUM-HIGH)**

#### Mitigation

**Primary**:

- Monitor cloud service status (subscribe to AWS health dash, set up alerts)
- Implement retry logic: if upload fails, queue it and retry in 30 sec
- Show status message: "Cloud service is temporarily slow. Please wait..." with progress bar

**Secondary**:

- If persistent: store file locally in browser (localStorage) temporarily; sync to cloud when storage recovers
- Manual upload: if all else fails, support team can manually accept files via email/Dropbox and upload to portal

#### Acceptance Criteria

- [ ] Retry logic implemented (exponential backoff)
- [ ] Status monitoring dashboard created
- [ ] Alerts configured for ops team
- [ ] UI tested with simulated service outage

---

---

### Risk-4: [BUSINESS: Low Feature Adoption]

**Risk ID**: R-NNN-04  
**Type**: Business  
**Status**: Identified

**Description**:
Feature launches but clients don't use it; they continue uploading via email instead. Feature provides no value; wastes resources.

**Probability**: 3 (Medium; we haven't launched anything like this before)  
**Business Impact**: 4 (Sunk cost; no value delivered)  
**Tech Impact**: 1 (Code is written; low cost to maintain)  
**UX Impact**: 1 (Users aren't affected if they don't use it)  
**Score**: (3 × 2) / 5 = **1.2 / 5 (MEDIUM)**

#### Mitigation

**Primary**:

- Onboarding: Clients see tutorial on first login; feature is highlighted
- In-app incentive: Badge/congratulations when client uploads first document
- Email campaign: Send existing clients a "Try the Portal" email with benefits listed
- Support training: Support team actively guides clients to use portal

**Secondary**:

- If adoption is low (< 20% by day 30), conduct user research: why aren't they using it?
- Redesign feature based on feedback
- Consider mandatory portal use (Admins must not accept email documents)

#### Acceptance Criteria

- [ ] Onboarding tutorial created and tested
- [ ] Email campaign drafted and approved
- [ ] Support runbook created
- [ ] Analytics dashboard tracking adoption
- [ ] Decision point: if adoption < 20% at day 30, conduct usability research

---

---

### Risk-5: [UX: Confusing Workflow]

**Risk ID**: R-NNN-05  
**Type**: UX  
**Status**: Identified

**Description**:
Clients don't understand multi-step upload process (choose file → select category → add metadata → confirm). Too many steps; high abandonment.

**Probability**: 3 (Medium; complex workflows have high abandonment)  
**Business Impact**: 3 (Clients frustrated; low adoption)  
**Tech Impact**: 1 (UX issue, not technical)  
**UX Impact**: 5 (High friction; users abandon)  
**Score**: (3 × 3) / 5 = **1.8 / 5 (HIGH)**

#### Mitigation

**Primary**:

- Wizard-style flow: One step at a time (not all at once)
- Clear labels: Change "metadata" to simpler language (e.g., "Notes (optional)")
- Smart defaults: Auto-detect document category based on filename
- Help text: Tooltips explain why each step is needed

**Secondary**:

- If users abandon, show exit survey: "Why did you leave? (Too complicated, wrong category, etc.)"
- Feedbackused to simplify next version

#### Acceptance Criteria

- [ ] Wireframes reviewed by UX lead and 2 users (user testing)
- [ ] Wizard implemented
- [ ] Help text added
- [ ] QA tested with different file types/categories
- [ ] Abandonment tracked; target < 10%

---

---

## Risk Heatmap

```
        Low         Medium        High      Critical
        (P=1-2)     (P=3)         (P=4)     (P=5)
        ───────     ──────        ──────    ────────

High    □           ◆ R-NNN-04    ◆ R-NNN-02  □
Impact  □           (Adoption)    (Security)
(I=4-5)

Medium  □           ◆ R-NNN-05    □           □
Impact  □           (UX Friction)
(I=3)

Low     □           □             □           □
Impact
(I=1-2)
```

**Legend**: ◆ = Identified, ▲ = Mitigating, ✓ = Mitigated

---

## Risk Tracking

| Risk ID  | Title          | Status     | Owner           | Review Date | Notes                               |
| -------- | -------------- | ---------- | --------------- | ----------- | ----------------------------------- |
| R-NNN-01 | Upload latency | Mitigating | @backend-eng    | 2026-04-24  | Scaling in progress                 |
| R-NNN-02 | Data exposure  | Mitigated  | @security       | 2026-04-20  | Tests all pass                      |
| R-NNN-03 | Service down   | Mitigating | @infrastructure | 2026-04-25  | Monitoring dashboard built          |
| R-NNN-04 | Low adoption   | Monitoring | @pm-feature     | 2026-05-07  | Decision point: 30 days post-launch |
| R-NNN-05 | Confusing UX   | Mitigating | @designer       | 2026-04-22  | User testing scheduled for Friday   |

---

## Risk Review Schedule

| Frequency                   | Attendees               | Purpose                              |
| --------------------------- | ----------------------- | ------------------------------------ |
| **Weekly** (during dev)     | Tech Lead + PM          | Status update; escalate blockers     |
| **Before Launch**           | Tech + Product + Design | Final risk review; go/no-go decision |
| **Weekly** (during rollout) | On-call Engineer + PM   | Monitor mitigation effectiveness     |
| **Monthly** (post-launch)   | PM + Leadership         | Business and operational risks       |

---

## Decision: Accept or Mitigate?

### Accepted Risks (Conscious Trade-offs)

**None yet** (all identified risks will be mitigated before launch)

### Mitigated Risks (Actively Addressed)

**All identified risks above** will have mitigations complete before launch

---

**Version**: 1.0  
**Last Risk Assessment**: 2026-04-10  
**Next Assessment**: 2026-04-20 (pre-launch); then weekly during rollout

See also: [rollout-template.md](./rollout-template.md) for operational risks during rollout; [metrics-template.md](./metrics-template.md) for tracking outcomes.

