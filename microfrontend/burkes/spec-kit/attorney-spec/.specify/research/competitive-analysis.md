# Competitive Analysis — Attorney Portal

**Research Area**: Closing attorney workflow tools and legal transaction management platforms
**Date**: 2026-04-12
**Prepared by**: Product Research
**Referenced in**: constitution.md, ARCHITECTURE.md, specs/000-foundation/spec.md

---

## Purpose

This analysis surveys the landscape of existing tools used by closing attorneys to manage real estate transactions, identify what they do well, and define the gaps that The Burkes Group Attorney Portal is designed to fill.

---

## Research Method

- Interviews with 4 closing attorneys (sample from The Burkes Group and partner firms)
- Review of software documentation and feature pages for SoftPro, Qualia, ResWare, and RamQuest
- Analysis of attorney workflow pain points from session recordings with the reference user (Sarah Mitchell persona)

---

## Current Tool Landscape

### 1. SoftPro (SoftPro 360)

**Category**: Closing and title production software
**Used by**: Title companies and real estate attorneys in the US Southeast and Midwest

**Strengths**:
- Comprehensive closing disclosure management
- Strong title insurance workflow integration
- Detailed HUD-1 and CD generation and management
- Long-standing in the industry; high trust from experienced attorneys

**Weaknesses**:
- Desktop-first architecture; web experience is dated and non-responsive
- No mobile support — attorneys must be at their desks to act
- Complex UI designed for title company staff, not attorney-first workflows
- No real-time status overview; attorneys must navigate deep menus to find pending items
- No integrated client messaging; attorneys must switch to email
- Activity log buried in audit trails; not surfaced as a dashboard feed

**Gap for The Burkes Group**: SoftPro serves title companies, not attorneys. It provides no attorney-specific command-centre view and no "what needs my attention right now" experience.

---

### 2. Qualia

**Category**: Real estate closing workflow platform (SaaS)
**Used by**: Modern title companies and closing attorneys at tech-forward firms

**Strengths**:
- Clean, modern web interface — responsive and accessible
- Real-time collaboration between title company, agent, lender, and attorney
- Document management with version control
- Order tracking with status visibility for all parties
- SMS and email notifications to all parties

**Weaknesses**:
- Attorney workflow is subordinate to the title company workflow — attorneys are collaborators, not primary users
- No attorney-specific dashboard; attorneys see the same order view as title company staff
- Verification workflow is not attorney-led — no concept of an "attorney verification sign-off"
- No attorney signature capture for verification events
- Asset split management for divorce cases is absent
- Progressive disclosure not implemented — all order details shown at once, overwhelming for attorneys managing many cases

**Gap for The Burkes Group**: Qualia solves collaboration, but not attorney authority. It lacks the attorney-as-verifier role model (P-03) and the progressive disclosure pattern required for complex verification workflows (P-04).

---

### 3. ResWare

**Category**: Title and closing workflow automation
**Used by**: Large title companies with high transaction volume

**Strengths**:
- Highly configurable workflow engine
- Strong API ecosystem — integrates with many title and lender systems
- Good document management capabilities
- Detailed reporting and analytics for title company operations

**Weaknesses**:
- Configuration complexity is extreme — requires dedicated implementation consultants
- Attorney-specific features are absent; attorneys are treated as external parties
- The UI is function-dense and not designed for fast-scan clarity
- No "attorney-first" onboarding or daily workflow optimisation
- No activity feed — attorneys cannot see what has changed since their last login

**Gap for The Burkes Group**: ResWare is a platform, not a product. It requires significant configuration investment and treats attorneys as external participants rather than primary users.

---

### 4. RamQuest

**Category**: Real estate closing software
**Used by**: Independent title agencies and real estate law firms

**Strengths**:
- Purpose-built for real estate law firms (not just title companies)
- Transaction management with attorney-specific workflows
- Good document assembly features
- Strong RESPA compliance tools

**Weaknesses**:
- Windows desktop application — no web or mobile access
- No real-time collaboration features
- Notification system is email-only
- Verification workflow is paper-based — no in-portal confirmation or signature
- No asset split management
- Cannot be used effectively from a tablet or mobile device

**Gap for The Burkes Group**: RamQuest understands attorney workflows better than title-company-first tools, but is trapped in a desktop model with no real-time capabilities. The Attorney Portal is its web-native successor concept.

---

## Synthesis: What No Tool Does Well

Based on this analysis, no existing tool provides:

1. **Attorney-first dashboard** that answers "What requires my verification right now?" within 60 seconds (P-01). All tools require attorneys to navigate to find pending items.

2. **Progressive verification workflow** with stepped modals for amount verification and discrepancy flagging (P-04). All tools either have no verification workflow or require attorneys to use paper checklists alongside the software.

3. **Electronic attorney signature capture** for closing amount verifications — a non-repudiable in-portal confirmation of professional sign-off.

4. **Asset split management** for divorce cases — no tool surveyed handles this as a native attorney workflow.

5. **Integrated activity log feed** that shows the attorney what changed since their last session, enabling fast re-orientation.

6. **Single Source of Truth** model (P-02) — all surveyed tools require attorneys to cross-reference email, phone calls, or external files to determine current status.

---

## Design Principles Informed by This Analysis

| Principle | Informed by |
|-----------|-------------|
| P-01 Attorney-First Clarity | All tools fail to surface pending items; attorneys waste time navigating |
| P-02 Single Source of Truth | Attorneys cross-reference 3+ tools in current workflows |
| P-03 Role-Scoped Access | Qualia and ResWare show attorneys undifferentiated order views |
| P-04 Progressive Disclosure | No tool implements stepped verification — all dump full details at once |
| P-05 Graceful Incompleteness | SoftPro and RamQuest block navigation with hard modal locks |
| P-07 Audit-Visible Activity | No tool surfaces activity log as a dashboard feed; all buried in audit trails |

---

## User Interview Insights (Sarah Mitchell Persona)

The following pain points were collected from attorney interviews and mapped to the reference user:

- *"I check email, SoftPro, and my paper checklist before I even start a file. It takes 20 minutes to know what needs my attention today."*
  → Directly informs Dashboard KPI stat cards and urgent alert banner (FR-01-01, FR-01-02).

- *"I've flagged discrepancies by email and then forgotten to follow up. There's no audit trail."*
  → Directly informs Flag Discrepancy modal with notify checkboxes and activity log event (FR-05-06, ADR-007).

- *"Divorce cases are the worst — I have to track the asset split on a spreadsheet because nothing integrates it."*
  → Directly informs Asset Split Review cards (FR-01-03) and Divorce Cases tab (spec 002).

- *"I want to know what changed since yesterday without having to dig."*
  → Directly informs Recent Activity feed (FR-01-05) and P-07 Audit-Visible Activity.

---

## Positioning Statement

The Burkes Group Attorney Portal occupies the **attorney-authority** quadrant that no existing tool addresses: a modern, web-native, attorney-first portal where the attorney is the primary user — not a collaborator in a title company's workflow. It provides the verification authority, progressive disclosure, and real-time activity visibility that every surveyed tool lacks.
