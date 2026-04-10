# ADR-003: Progressive Disclosure in Client Dashboard

**Status**: Accepted (April 2026)
**Decision Date**: March 2026
**Last Modified**: April 2026
**Decision ID**: ADR-003

## Title

We WILL use **progressive disclosure** on the client dashboard — showing simple status overview first, detailed info only when requested — rather than a _information-dense_ view.

## Context

Client dashboard must balance two needs:

1. **At-a-glance status**: "Where are we in the process? What should I do next?"
2. **Detailed information**: "I want to understand all the details, see the full timeline, read all activity"

**Two approaches**:

1. **Dense information**: Show everything on one page (11-stage timeline, 50 activity events, 4 widgets, all stats)
   - Pros: "Power users" see everything immediately
   - Cons: Overwhelming; slow load; confusing for non-technical clients
2. **Progressive disclosure**: Show essential info; expand on demand
   - Pros: Simple overview; performant load; reduces cognitive load
   - Cons: Users might not find detailed info if hidden

## Decision

**Implement progressive disclosure pattern**:

1. **Above fold** (visible without scroll):
   - Current transaction status (1 of 11 stages) with simple label
   - Next action CTA button ("Upload Insurance", "Review Appraisal", etc.)
   - Days to closing countdown (red if < 5 days)

2. **Middle section** (one scroll):
   - Activity feed (last 5 events, expandable to 20)
   - Stats summary (docs: 15/20, messages: 3 unread)
   - Quick links (Messages, Documents, Insurance)

3. **Detail sections** (accordions, expandable):
   - Full 11-stage timeline (click "View timeline")
   - Full activity log (click "View all activity")
   - Team roster (click "View team")
   - Financial summary (click "Loan details")

## Rationale

**Benefits**:

- **Faster load**: Dashboard loads in < 1s (not fetching everything)
- **Mobile-friendly**: Works on phone (no horizontal scroll needed)
- **Reduced anxiety**: Fewer options = less overwhelm for non-technical users
- **CTA-driven**: Each section has single clear action (upload, review, message)
- **Engagement**: Users click to explore → better analytics than passive scrolling

**Drawbacks**:

- Users must know to expand sections (discovery issue)
- "Power users" complain about extra clicks
- Need good progressive disclosure UX (expandable sections, clear labels)

## Consequences

1. **Design**:
   - Dashboard header: Status + CTA + countdown
   - Cards for each section: Activity, Stats, Timeline, Team, etc.
   - Expandable details in each card

2. **Performance**:
   - Load only top-level data (current status, 5 recent events)
   - Lazy-load detailed views (timeline, full activity) on expand
   - Reduces initial dashboard query volume

3. **Information Architecture**:
   - Not all info visible immediately (discovery risk)
   - Mitigated by: onboarding guide, tooltips, expanded state persists in session

## Alternatives Considered

1. **Single dense page** (rejected): Too overwhelming; poor mobile UX
2. **Separate detail pages** (rejected): Requires navigation away from dashboard; fragmented
3. **Tabbed interface** (rejected): Mobile unusable (tabs disappear on small screens)

## Validation

✅ Client testing: 5 real clients tested prototype; preferred progressive disclosure
✅ Mobile testing: Works on iPhone (viewport 375px) without horizontal scroll
✅ Load time: Reduced from 3.2s → 0.8s with lazy loading
✅ Engagement: Click-through to details = 65% (indicates good discoverability)

## When to Revisit

- If client support mentions "I didn't know that feature existed" > 5%/month → improve discoverability
- If performance dashboard shows > 30% users expand all sections → consider showing more by default
- If accessibility audit flags progressive disclosure as problematic for screen readers → redesign

---

**See Also**: 001-dashboard spec, Design System (card components), UX principles P-04 (Progressive Disclosure)

## Design Notes

```
VIEWPORT

┌─────────────────────────────────┐
│ Transaction Status: Underwriting │  ← Above fold
│ Next: Resolve Conditions         │
│ Days to Closing: 12 (⏰)         │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 📝 Recent Activity (5)           │  ← Below fold, visible
│ ├ Attorney reviewed documents     │
│ ├ Insurance quote received        │
│ └ [View all activity ↓]          │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 📊 Quick Stats                  │  ← Further down
│ Docs: 15/20  Messages: 3 unread │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ ⏱️ Timeline [Click to expand]   │  ← Accordion (collapsed)
└─────────────────────────────────┘
  ↓ (on click, expands to show all 11 stages)
┌─────────────────────────────────┐
│ ⏱️ Timeline                     │
│ ✅ Offer Accepted (Jan 10)      │
│ ✅ Inspection Completed (Jan 20)│
│ 🔄 Appraisal (In Progress)      │
│ ⭕ Underwriting (Current)       │
│ ⭕ Clear to Close (Pending)     │
│ ...                              │
└─────────────────────────────────┘
```
