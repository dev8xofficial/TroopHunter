# Transition Plan: Spec-Kit Adoption Playbook

## Overview

This document outlines how a **new team (developers, PMs, designers, QA)** should adopt the Burkes spec-kit. Designed for teams transitioning from traditional requirements (email, Jira comments, Slack threads) to specification-driven development.

Estimated onboarding time: **1-2 weeks** for full fluency.

---

## Phase 0: Pre-Boarding (Day -1 to Day 0)

### What to Do

1. **Clone the spec-kit repository**

   ```bash
   git clone https://github.com/burkes-group/spec-kit.git
   cd spec-kit
   ```

2. **Set up your environment**
   - Install any tools mentioned in README.md (Node.js, Python, etc.)
   - Configure your IDE (recommended: VS Code with Markdown preview plugins)

3. **Quick file scan** (15 minutes)
   - Skim README.md (overview)
   - Skim CONTRIBUTING.md (workflow quick-start)
   - Skim GLOSSARY.md (terminology you'll see repeated)

### Time Estimate

30 minutes total

### Success Criteria

- ✅ Repository cloned locally
- ✅ Can open spec files in IDE with Markdown preview
- ✅ Know what "spec" vs "plan" vs "task" means

---

## Phase 1: Foundation (Days 1-2)

### Day 1 Morning: Constitution & Principles (2 hours)

**Read in order**:

1. **constitution.md** (15 min): Understand the 7 principles (P-01 through P-07) and why they exist
   - Example: "P-04 Progressive Disclosure = show only what's needed on UI"
2. **STANDARDS.md** (15 min): Learn the writing standards
   - All specs must have sections: Actors, User Scenarios, Functional Requirements, Data & State, Edge Cases, Success Criteria, Dependencies
   - FR-NNN-NN format (Feature ID with spec number + sequence)
   - Plain English (no jargon)

3. **GLOSSARY.md** (15 min): Skim (don't memorize); know where to reference
   - Example: "transaction_id", "activity_log_event", "role", "stage", "milestone"

4. **FAQ.md** (15 min): Q&A on common questions
   - Question: "What's the difference between a spec and a plan?"
   - Answer: Spec = what to build (business requirements); Plan = how to build (architecture)

### Day 1 Afternoon: Architecture & Design (2.5 hours)

**Read in order**: 5. **ARCHITECTURE.md** (30 min): Understand the portal design

- 6 canonical roles (CL, AG, LN, AT, CP, TC)
- 11-stage transaction lifecycle
- Screen inventory (dashboard, documents, messages, insurance, mortgage, services)
- Data model overview (transaction → activity log design)

6. **ADR files** in `.specify/decisions/` (60 min):
   - adr-001-role-model.md (Why 6 roles? Why immutable?)
   - adr-002-activity-log.md (Why append-only?)
   - adr-003-progressive-disclosure.md (Why show only what's needed?)
   - adr-004-role-scoped-writes.md (Why no overwrites across roles?)
   - adr-005-tech-agnostic.md (Why no framework names in specs?)
   - **Key takeaway**: Understand the WHY behind each decision

7. **GOVERNANCE.md** (20 min): Learn approval process
   - Specs reviewed by: PM → Tech Architect → Finance (if costs impact)
   - Review SLO: 48 hours
   - Approval authority per role

### Day 1 Summary

- You understand the **constitution** (7 principles)
- You understand the **architecture** (6 roles, 11 stages, 4 major flows)
- You understand the **WHY** (ADRs explain decisions)

### Success Criteria

- ✅ Can explain the 7 principles to a colleague
- ✅ Can name the 6 roles + their key responsibilities
- ✅ Can name the 11 transaction stages
- ✅ Understand why tech-agnostic (P-06) matters

---

## Phase 2: Spec System (Day 3-4)

### Day 2: Spec Deep Dive (3 hours)

**Read a full spec** (pick one):

1. **000-foundation/spec.md** (45 min): Foundation layer
   - Global navigation bar
   - Session context (what data must persist browser-wide)
   - Activity log contract (structure, immutability)
   - Design system (tokens, badges, typography)

   **Focus on structure**:
   - Actors: CL, AG, LN, AT, CP, TC (which roles touch this feature?)
   - User Scenarios: "AG updates client on progress" (how does the feature get used?)
   - Functional Requirements: FR-001-01 (what must the system do?)
   - Data & State: (database model; activity events)
   - Edge Cases: (what if user has no role? what if context lost?)
   - Success Criteria: (how do we validate it works?)

2. **001-dashboard/spec.md** (30 min): Dashboard feature spec
   - Similar structure as 000-foundation
   - Specific to dashboard (widgets, activity feed, stats)
   - Notice: Written in plain English; no React/Vue/Angular mentioned

3. **Review a supporting artifact** (30 min):
   - Open `001-dashboard/validation-schema.json`
     - Why? Specs define WHAT; schema validates the DATA
     - Notice: Data model matches spec description
   - Open `001-dashboard/test-scenarios.md`
     - Why? Specs define WHAT; tests validate WORKS
     - Notice: Test matrix (role × action × expected outcome)

### Day 3: Spec Review & Feedback (2 hours)

**Hands-on practice**:

1. **Find an issue/question** in an existing spec
   - Example: "000-foundation: How are activity events pruned (storage growth)?"
   - Open GitHub issue using the spec-question template

2. **Propose a clarification** in another spec
   - Example: "001-dashboard: Test scenario for 'feed with 500 events' missing?"
   - Submit PR with 2-3 line clarification

3. **Review a spec PR** (play the role of reviewer)
   - Run through checklist in pull_request_template.md
   - Comment on: clarity, completeness, dependencies, acceptance criteria

### New Skills This Phase

- ✅ Read and understand a spec
- ✅ Validate spec completeness (all sections present?)
- ✅ Write GitHub issue in spec context
- ✅ Review a spec PR

### Success Criteria

- ✅ Can explain what a spec IS (what to build) vs what it ISN'T (how to build)
- ✅ Can identify if a spec is complete (has all 9 sections)
- ✅ Can spot when someone tries to sneak implementation details into a spec

---

## Phase 3: Planning & Implementation (Days 5-7)

### Day 4: From Spec → Plan → Tasks (2 hours)

Now you understand specs. How do they connect to your day job?

**Document Hierarchy**:

```
Spec (WHAT)
  ↓
Plan (HOW)
  ↓
Tasks (WHO, WHEN)
  ↓
Code (IMPLEMENTATION)
```

1. **Read a Plan** (30 min):
   - Pick any `*/plan.md` (e.g., `001-dashboard/plan.md`)
   - Notice: References the spec ("see spec FR-001-03")
   - Lists tech decisions ("We'll use React 18, React Query, Redux Toolkit")
   - Defines build strategy ("Phase 1: MVP dashboard, Phase 2: real-time updates")

2. **Understand Tasks** (30 min):
   - Pick `*/tasks.md` (task breakdown for implementation)
   - Each task references the plan and spec
   - Task example: "Implement Dashboard widget component" (references spec FR-001-02, plan section 2.3)

3. **See how they connect** (30 min):
   - Query: "How does feature FR-001-02 flow from spec → plan → task → code?"
   - Trace: Spec → Plan (which tech?) → Task (who codes it?) → PR

### Day 5: Build Something Small (Full Day)

**Pick a small feature** (something doable in 2-4 hours):

- Example: "Add a new badge variant to Design System"

**Follow the SDD workflow**:

1. Check spec (000-foundation): What badge variants should exist?
2. Check plan: How are badges implemented?
3. Check tasks: Is there a task for new badge? If not, create one.
4. Implement (code)
5. Test (check test-scenarios.md to ensure coverage)
6. PR with reference back to task/spec

### Skills Achieved

- ✅ Can connect spec requirements to code
- ✅ Can structure work properly (tasks → code)
- ✅ Understand how SDD works end-to-end

### Success Criteria

- ✅ Small feature implemented and merged
- ✅ PR references spec + task
- ✅ Code passes test scenarios from spec

---

## Phase 4: Expertise (Week 2+)

### Ongoing Responsibilities

Once Phase 1-3 complete, you're spec-kit fluent. Ongoing:

1. **Spec Changes** (1 day/sprint):
   - As you implement, you'll find specs unclear or incomplete
   - Submit spec clarifications
   - Attend spec review meeting (Fridays 10 AM)

2. **Adding specs** for new features (as PM assigns):
   - Use spec-template.md
   - Follow constitution (7 principles)
   - Get reviewed by tech architect
   - Implement once approved

3. **Tech Decisions** (as architect or senior engineer):
   - Create/update plan.md with architecture decisions
   - Reference ADRs for context

---

## Common Mistakes & Corrections

### ❌ Mistake 1: Mixing Spec & Implementation

**Example**: "The dashboard uses React hooks..."
**Fix**: "The dashboard fetches activity feed (no tech specified; that's the plan)"
**Why**: Specs must survive tech changes

### ❌ Mistake 2: Writing Tasks Before Spec

**Flow**: ("Let me just code the dashboard...") → (Realizes you implemented wrong thing)
**Fix**: Always read spec → understand requirements → THEN code
**Why**: SDD workflow: specs → plans → tasks → code (never code-first)

### ❌ Mistake 3: Ignoring Edge Cases

**Example**: You test dashboard with 20 events; production has 500
**Fix**: Read test-scenarios.md BEFORE coding; ensure you test all edge cases
**Why**: Specs define success criteria including edge cases

### ❌ Mistake 4: Skipping PR Checklist

**Example**: Submit PR without running lint/spell-check/link validation
**Fix**: Use pull_request_template.md; verify all checks pass
**Why**: Automation catches 90% of issues before review

---

## Metric: Are You Spec-Fluent?

You're ready when:

| Capability                   | Definition                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------ |
| ✅ **Read a spec**           | Can understand any spec.md in 15 minutes; identify missing sections            |
| ✅ **Find issues**           | Can spot spec ambiguities and write clear GitHub issues                        |
| ✅ **Write a spec**          | Can draft new spec using template; includes all 9 sections + validation schema |
| ✅ **Validate completeness** | Can review spec PR; ensure it covers all requirements, actors, scenarios       |
| ✅ **Map to code**           | Can take a spec requirement and write code that satisfies it                   |
| ✅ **Contribute back**       | Can propose spec improvements based on implementation experience               |

---

## Training Resources

### Videos (If Available)

- [ ] Spec-Kit Walkthrough (5 min overview)
- [ ] Spec Review Process (10 min demo)
- [ ] SDD Workflow (15 min tutorial)

### Documentation

- [x] README.md (overview)
- [x] CONTRIBUTING.md (workflow)
- [x] STANDARDS.md (writing standards)
- [x] constitution.md (principles)
- [x] ARCHITECTURE.md (system design)
- [x] GLOSSARY.md (terminology)
- [x] FAQ.md (Q&A)
- [x] All ADRs (decision rationale)

### Hands-On

- [ ] Clone repository
- [ ] Read 2-3 full specs
- [ ] Find + propose 1 spec clarification
- [ ] Implement 1 small feature (following SDD)

---

## Support & Escalation

### If You Get Stuck

1. **"What does this term mean?"** → GLOSSARY.md
2. **"Why was this decision made?"** → ADRs in `.specify/decisions/`
3. **"How do I write a spec?"** → spec-template.md + STANDARDS.md
4. **"What's my role in approval?"** → GOVERNANCE.md
5. **"How do I file an issue?"** → CONTRIBUTING.md + issue templates

### Escalation Path

- Questions about existing specs → Slack #spec-kit or GitHub issue
- Help writing new spec → DM tech architect (review 1:1)
- Process questions → Attend Friday spec review meeting (Slack for link)
- Urgent blockers → Ping @spec-kit-leads on Slack

---

## Success Indicators (Week 1 Review)

By end of week 1, you should:

- ✅ Understand the 7 principles (can explain to others)
- ✅ Know the 6 roles + 11 stages (can draw from memory)
- ✅ Read a spec without confusion
- ✅ Spot missing sections / ambiguities in specs
- ✅ Write a GitHub issue in proper format
- ✅ Know what NOT to put in a spec (implementation details)

If you can check all boxes → **You're spec-fluent!**

---

## Feedback Loop

After 2 weeks in the role:

1. Schedule retro with your manager
2. Discuss: "What was confusing about spec-kit? What would help?"
3. Contribute feedback to improve onboarding (update this doc!)

---

## Appendix: Quick Navigation

**Governance & Process**:

- Approval workflow: GOVERNANCE.md
- Contribution process: CONTRIBUTING.md
- Standards: STANDARDS.md

**Learning Resources**:

- Principles: constitution.md
- Architecture: ARCHITECTURE.md
- Decisions: .specify/decisions/ (5 ADRs)
- Terminology: GLOSSARY.md

**Templates**:

- Spec template: spec-template.md
- Plan template: plan-template.md
- Task template: task-template.md
- ADR template: adr-template.md

**Exemplars** (working examples):

- 000-foundation/spec.md ← Read this first
- 001-dashboard/spec.md ← Reference before writing your own
- .specify/decisions/adr-001-role-model.md ← Example ADR

**For Help**:

- Glossary: GLOSSARY.md
- FAQ: FAQ.md
- Issues/questions: GitHub issue tracker
- Slack: #spec-kit channel

---

## Timeline Summary

| Phase       | Days    | Key Activities                                   | Estimated Hours |
| ----------- | ------- | ------------------------------------------------ | --------------- |
| **Phase 0** | -1 to 0 | Clone repo, environment setup                    | 0.5             |
| **Phase 1** | 1-2     | Read constitution, architecture, ADRs            | 4.5             |
| **Phase 2** | 3-4     | Deep dive into specs, practice reviews           | 5               |
| **Phase 3** | 5-7     | Understand spec→plan→task→code flow              | 6               |
| **Phase 4** | Week 2+ | Ongoing: spec updates, new specs, tech decisions | Variable        |
|             |         | **TOTAL ONBOARDING**                             | **~16 hours**   |

---

**Questions?** File a GitHub issue or Slack #spec-kit. Welcome aboard! 🎉
