# Problem Register — A Human Sanctuary

## Metadata
```
prospect: A Human Sanctuary
provider: Dev8X
generated: 2026-05-21
source_decision_card: p0a_Decision_Card_a_human_sanctuary.md
version: d0_v2
```

---

## Current Problem Register

| # | Current Problem | Research Source | Who Feels It | What It Blocks | Demo Proof Screen | Can Demo Prove It |
|---|---|---|---|---|---|---|
| 1 | The website has 20+ empty or duplicate pages, 4 active 404 errors, and a placeholder pricing table showing $10–$20/mo instead of actual $180–$250 session fees — making the site structurally non-functional as a client acquisition or program delivery tool | p1a_Website.md — Pages 5, 8–11, 13, 16–17, 26, 29, 31–32, 35, 37–38, 40–42, 45, 49–52 | Julie Anne Steiger (founder); prospective clients who land on broken or empty pages | Primary Goal: compliant, optimized site that converts visitors and supports program delivery | Annotated page inventory — 52-page gap matrix showing empty/duplicate/404 status per URL | Yes |
| 2 | No HIPAA-conscious audit of forms, integrations, or data flows has been completed, and the insurance intake form (contact-7) collects PHI including insurance card images without documented HIPAA-compliant handling confirmation — creating regulatory exposure | p1a_Website.md §7 (insurance form), §20 (privacy practices); p1e_Job_Posting.md (HIPAA audit listed as Phase 1 requirement) | Julie Anne Steiger (licensed LCSW PC, HIPAA-governed); prospective clients submitting insurance data | Primary Goal: HIPAA-compliant site; Secondary: ability to launch digital programs without legal exposure | Compliance audit checklist — annotated form/data flow review showing current gaps vs. required controls | Yes |
| 3 | Core program pages — Modalities, Our Team, Intensives & Immersives, Children & Their Adults, Youth Leaders, Events, and the root homepage — are entirely unpopulated, meaning prospective clients cannot discover, understand, or self-select into AHS's primary service offerings | p1a_Website.md — Pages 8, 17, 26, 29, 31, 32, 35, 37, 38, 40, 42 (all flagged EMPTY) | Prospective clients; referral sources; associate therapist candidates researching the practice | Primary Goal: client acquisition and conversion; Supporting Goal: clinician onboarding and course delivery | Before/after content wireframes — current empty page state vs. populated page structure with content blocks defined | Yes |
| 4 | The self-led coursework platform — targeted for launch July 2025 and now 10+ months overdue — has no populated landing page, no enrollment mechanism, and no infrastructure visible on the site, blocking the second-highest scored goal from generating any revenue | p1a_Website.md §14–15 ("Coursework Launching Soon — sign up for updates"); p1c_Linkedin_Owner.md ("currently creating coursework in Deep Adaptation Therapy") | Julie Anne Steiger; prospective course enrollees; future cohort participants | Supporting Goal #2: launch self-led coursework platform; directly blocks eco-resiliency revenue stream | Course launch readiness checklist — current site state vs. required infrastructure (landing page, enrollment form, payment, delivery) | Yes |
| 5 | The AHS Membership / Acorn Circle pages are either empty or contain only a fragment of positioning copy with no enrollment path, pricing, or member benefits — making it impossible to convert community interest into recurring revenue despite the program being publicly positioned as live | p1a_Website.md §28 (copy-of-ahs-membership — partial copy only), §41 (ahs-membership — EMPTY); p1b_Linkedin_Company.md (Acorn Circle described as an active live program) | Julie Anne Steiger; prospective Acorn Circle members | Supporting Goal #4: Acorn Circle recurring revenue stream | Membership page gap review — current state vs. required enrollment/payment infrastructure | Yes |
| 6 | The insurance verification intake process relies on a manual 1–2 business day response window with no automated acknowledgment, status tracking, or triage routing — creating friction that may cause prospective clients to disengage before onboarding begins | p1a_Website.md §7 ("A member of our Client Onboarding team will respond to you within 1–2 business days") | Prospective clients submitting insurance information; Julie Anne (sole responder, bandwidth-constrained) | Primary Goal: client acquisition and intake conversion | No visible proof — discovery question: "What percentage of insurance inquiries result in a scheduled first session, and what is the average time to first appointment?" | No — discovery question |
| 7 | The website has no ADA accessibility audit trail and contains four 404 errors at /join, /privacy, /terms, and /accessibility — the last of which means the site is unreachable at the URL most commonly linked when declaring accessibility compliance | p1a_Website.md §49–52 (four 404 error pages confirmed); p1e_Job_Posting.md (ADA review listed as Phase 1 requirement) | Prospective clients with disabilities; Julie Anne (ADA liability); any referral source that checks compliance | Primary Goal: ADA-accessible, compliant website | ADA gap audit — 404 log + accessibility checklist showing missing alt text, contrast ratios, keyboard navigation, and /accessibility 404 | Partial — 404s are provable; full ADA audit requires tool-assisted scan |
| 8 | The clinician team infrastructure — Our Team, Meet Our Clinicians, and Facilitators & Guides pages — is entirely empty, blocking associate therapist recruitment, client-to-clinician matching, and the credibility signals that support referral relationships | p1a_Website.md §8, §16, §19, §29, §32, §46 (all EMPTY or blank); p1e_Job_Posting.md (clinician onboarding listed as Phase 2 ongoing task) | Associate therapist candidates; referral sources; prospective clients seeking specialty match | Supporting Goal #3: expand clinician roster and onboard associates | Team page gap review — current empty state vs. required bio/photo/specialty structure | Yes |

---

### Manual Operations Mapping

| Problem # | Manual Operation | Why It Blocks Primary Goal | Solution Response | Demo Proof Screen |
|---|---|---|---|---|
| 1 | Founder or contractor must manually identify, audit, and update 52 pages individually with no structured inventory or content management workflow | Unstructured page sprawl means compliance fixes, content population, and SEO optimization cannot be systematically executed — every update is ad hoc and incomplete | Dev8X delivers a structured 52-page gap matrix with fix-status tracking, ownership assignments, and completion checkpoints | Annotated page inventory — gap matrix with status per URL, fix plan, and sign-off column |
| 2 | PHI collection via insurance intake form routes to an unverified email/manual inbox without documented HIPAA-compliant data handling, BAA confirmation, or encrypted transmission audit | Any unaudited PHI flow is a HIPAA exposure point — a finding in a breach or complaint investigation would trace directly to the intake form | Dev8X conducts a HIPAA-conscious form audit: maps every data field, integration, and transmission path; documents required controls; flags BAA gaps | Compliance audit checklist — annotated form/data flow review with gap/remediation columns |
| 3 | Core program pages are manually empty — no content has been drafted, structured, or published for 11+ pages representing AHS's primary service offerings | Prospective clients who navigate to Modalities, Intensives, or Children & Adults find blank pages — defeating SEO, referral credibility, and conversion before any clinical relationship begins | Dev8X produces a content architecture for each empty page: section structure, copy scaffolding, and SEO-optimized headline framework delivered in Phase 1 | Before/after content wireframes — current empty page state vs. populated page structure |
| 4 | Course launch infrastructure — landing page, enrollment form, payment integration, and delivery pathway — has never been built on the Wix platform despite a July 2025 public launch commitment | Without a functional course enrollment and delivery infrastructure, the coursework revenue stream cannot open regardless of how much content Julie Anne creates | Dev8X scopes and builds the course landing page, enrollment flow, and payment integration in Phase 1; delivery pathway configured in Phase 2 | Course launch readiness checklist — current site state vs. required infrastructure with build timeline |
| 5 | Membership/Acorn Circle enrollment is not actionable — no pricing, no sign-up flow, no member benefit structure exists on any accessible URL | Community members who want to join have no pathway to convert, and AHS cannot begin generating recurring revenue from a program already being publicly marketed as live | Dev8X builds the membership enrollment page with pricing tiers, benefit descriptions, and recurring payment integration | Membership page gap review — current partial copy vs. required enrollment/payment infrastructure |
| 8 | Clinician profiles are manually absent — no bio, photo, specialty, or credential content has been published for any associate or team member | Referral sources cannot match clients to clinicians; prospective associates cannot evaluate the practice; the site signals a solo operation, not a growing multi-clinician sanctuary | Dev8X delivers a standardized clinician onboarding template (photo specs, bio structure, specialty tags) and populates Phase 2 additions without founder involvement | Team page gap review — empty state vs. populated template with onboarding workflow |

**Problems without proof screen mapping (become discovery questions):**

- **Problem #6 — Insurance intake drop-off rate:** "What percentage of insurance verification form submissions result in a scheduled first appointment? How long does the average intake process take from form submission to first session? Who currently manages the manual response queue?"
- **Problem #7 — ADA full audit scope:** "Has an accessibility scan ever been run on the site (automated or manual)? Are there known complaints or accommodation requests from current or prospective clients? Is the /accessibility 404 the result of a removed page or a planned-but-never-built page?"

---

### Manual Operations Validation Rule

| Check | Required Answer | Validation |
|-------|-----------------|------------|
| 1. Why does this manual operation block the primary goal? | Specific operational connection, not generic | Cited against Primary Goal: "Scale client intake & content delivery through a compliant, optimized website" (Decision Card §1) |
| 2. What does the solution specifically do to remove/automate it? | Concrete platform capability | All five proof-mapped problems have a specific Dev8X deliverable named: gap matrix, compliance audit, content wireframes, course infrastructure, membership enrollment build |
| 3. Which screen proves the removal has happened? | Exact screen name | All five have named proof screens; Problems 6 and 7 are correctly flagged as discovery questions where proof cannot yet be constructed |

**Enforcement outcomes:**
- Problems 1–5 and 8: PASS all three checks — eligible as lead claims
- Problem 6 (intake drop-off): FAILS Check 3 — demoted to discovery question; may appear as supporting context
- Problem 7 (ADA audit): PARTIAL — 404 evidence passes Checks 1–3; full accessibility audit scope demoted to discovery question pending tool-assisted scan results

---

## Future Problem Register

| # | Future Problem | Why It Will Happen | Leading Indicator Already Visible | Business Risk If Not Solved | Preventive Narrative |
|---|---|---|---|---|---|
| 1 | As AHS adds associate therapists and expands program offerings, the Wix site will become unmaintainable without a structured content management and onboarding workflow — creating a bottleneck where every new clinician or course requires founder time to publish | The current site has no content templates, no clinician onboarding workflow, and no structured page architecture — every addition will require from-scratch work without a system built in Phase 1 | Phase 2 of the job posting explicitly scopes "add new clinicians, add new offerings" as recurring tasks — confirming the founder anticipates this growth but has no workflow for it yet | Without a repeatable onboarding system, clinician expansion stalls, course launches are delayed, and the founder remains the operational bottleneck indefinitely — directly contradicting the Phase 2 support model AHS is paying for | "Every clinician you add without a template costs you a week of founder time — build the system once in Phase 1 and onboard forever without touching it yourself." |
| 2 | A HIPAA or CCPA enforcement action, client complaint, or insurance audit will expose the current unaudited PHI intake flow and lack of documented privacy controls — creating liability that grows with every new form submission and client record | The insurance intake form collects PHI (insurance card photos, personal health information) with no documented BAA, no confirmed encrypted transmission, and no audit trail; the practice is already governed by HIPAA as an LCSW Professional Corporation | The Upwork job posting explicitly names HIPAA-conscious review and CCPA/CPRA audit as Phase 1 requirements — confirming the founder is aware of the exposure but has not yet resolved it | A single HIPAA finding in the context of a complaint or breach investigation could trigger fines up to $50,000 per violation category (industry benchmark) and reputational damage that would be catastrophic for a trust-based trauma therapy practice | "Every month the intake form runs without a HIPAA-conscious audit is a month of documented exposure — the form doesn't know the audit hasn't happened, but a regulator will." |
| 3 | The eco-therapy and collapse-aware niche AHS is building will attract growing organic search demand as climate anxiety becomes a mainstream clinical category — but if the site remains SEO-dark, that demand will route to competitors who show up first | Julie Anne is actively creating Deep Adaptation Therapy coursework and running eco-anxiety groups; the LinkedIn profile and website copy both use niche-specific language ("collapse-aware," "eco-resiliency," "poly-crisis") that has zero on-page SEO structure or keyword targeting currently | The self-led coursework page has a "sign up for updates" CTA but no SEO-optimized landing page, no keyword targeting, and no content that would surface in a search for "eco-anxiety therapy California" or "climate grief counseling" | If a competitor claims the eco-anxiety + somatic therapy SEO position in California before AHS publishes structured content, AHS will pay for that traffic through ads or simply lose the category — a niche advantage that took years to build clinically will generate no organic discovery | "Julie Anne is building the clinical depth for a category no one else owns yet — the only question is whether the site is ready to be found when people start searching for it." |
| 4 | The Acorn Circle membership community, currently positioned as a live program with no enrollment infrastructure, will generate growing social proof and interest through LinkedIn and word-of-mouth that the site cannot convert — creating an audience that attrites because there is no join pathway | LinkedIn company profile actively describes Acorn Circle as a live, functioning community ("nurturing small, intentional pockets of connection") with no link to an enrollment page; the membership page is either empty or contains only philosophical copy | The AHS LinkedIn company page has only 3 followers but is already framing Acorn Circle as an operational program — any amplification of that framing (speaking engagements, referrals, press) will drive traffic to a dead end | Community-based recurring revenue is the most durable revenue stream in the AHS model; an audience that arrives and cannot convert does not wait — it disappears and does not return | "You're marketing a membership community that doesn't have a door yet — every person who finds it and can't join is a recurring revenue relationship that never starts." |

---

## Proof Ledger

| Claim | Evidence | Proof Condition | Proof Location | Remaining Doubt | Backup Language |
|---|---|---|---|---|---|
| The AHS website has 20+ broken or empty pages | p1a_Website.md — 52 pages catalogued; 20+ flagged EMPTY, duplicate, or 404 | Buyer sees the full 52-page inventory with empty/broken status column | Annotated page gap matrix | "Maybe some of those pages are intentionally unpublished" | "Whether intentional or not, they are indexed or linked — Google sees them, and so do visitors who land there" |
| Four live 404 errors exist including /privacy and /accessibility | p1a_Website.md §49–52 — four 404 URLs confirmed in scrape | Buyer sees the 404 log with live URL confirmation | 404 error log with timestamped scrape evidence | "Those might have been fixed since the scrape" | "We will confirm live status in the audit — if they've been fixed, that's one item resolved; 19+ remain" |
| The pricing table shows $10–$20/mo for a $180–$250/hr practice | p1a_Website.md §5 (Plans & Pricing: $10/$15/$20); §44 (Book Online: $180–$250/hr) | Buyer sees both pages side by side | Side-by-side screenshot: /pricing-plans vs. /book-online | "That might be a placeholder for future coursework pricing" | "Regardless of intent, a prospective client who lands on the pricing page before booking will see $10/month — that is a credibility gap that requires a fix" |
| Coursework launch is 10+ months overdue | p1a_Website.md §15 ("Coursework Launching July 2025"); generated date 2026-05-21 | Buyer sees the "launching July 2025" CTA alongside today's date | Screenshot of §15 meta + current date | "The launch date may have been intentionally pushed" | "Whether delayed by choice or circumstance, the revenue gap is the same — every month without enrollment is a month of course revenue not collected" |
| Prior Upwork engagement produced limited results (3.9 rating, $789.70 spent) | p1e_Job_Posting.md — client profile: 3.9 rating, 2 reviews, $789.70 total spend, 3 hires | N/A — this is a framing point, not shown to buyer directly | Internal strategy only — use to position Dev8X as structured alternative | "She might be satisfied with prior contractors" | "The fact that a fourth job posting was created — with a more detailed scope than the prior three — suggests the prior engagements did not fully resolve the gaps" |
| HIPAA exposure exists in the current insurance intake form | p1a_Website.md §7 — form collects PHI including insurance card photos; p1e_Job_Posting.md — HIPAA review is Phase 1 requirement | Buyer sees the intake form annotated against HIPAA-conscious checklist | Compliance audit checklist with gap/remediation columns | "We might already have BAA coverage through Wix" | "Wix offers some data processing protections, but HIPAA-conscious design requires auditing every integration, form field, and transmission path — a BAA with Wix alone does not cover the full data flow" |
| SEO optimization can generate 2–4 new organic clients/month | Estimated — based on $180–$250/hr fee range and typical therapy practice SEO benchmarks | Buyer sees keyword gap analysis for Idyllwild + telehealth CA + eco-anxiety niche | SEO audit with keyword opportunity table | "SEO doesn't work for small rural practices" | "[Estimated] — actual lift depends on competition, content quality, and indexing timeline; we will show you the keyword opportunity before projecting outcomes" |

---

## Claim-to-Proof Validation

| Step | Question | Answer |
|------|----------|--------|
| **Claim 1** | What are we asserting? | The AHS website cannot support client acquisition, course launch, or clinician onboarding in its current state |
| | Why do we believe it? | 20+ empty/duplicate pages, 4 404 errors, and a broken pricing table confirmed in p1a_Website.md |
| | What will the buyer see? | 52-page gap matrix with empty/broken/duplicate status, annotated against fix plan |
| | What would make them doubt it? | "Some pages are intentionally hidden" — reframe: hidden or broken, they are still gaps in the conversion funnel |
| **Claim 2** | What are we asserting? | The current insurance intake form creates HIPAA exposure |
| | Why do we believe it? | Form collects PHI (insurance card images) with no documented HIPAA-compliant handling confirmed in public materials; HIPAA audit is the first item in the Upwork Phase 1 scope |
| | What will the buyer see? | Annotated form audit showing data fields, transmission path, and gap-to-control mapping |
| | What would make them doubt it? | "We have a BAA with Wix" — acknowledge Wix's data processing terms, but clarify that full HIPAA compliance requires auditing every integration point, not just the platform |
| **Claim 3** | What are we asserting? | Coursework revenue is 10+ months delayed and the cost is measurable |
| | Why do we believe it? | §15 of website states "Launching July 2025"; current date is May 2026; no enrollment infrastructure exists on the site |
| | What will the buyer see? | Side-by-side: "Launching July 2025" CTA vs. empty course infrastructure + cost-of-delay table at $180–$250/session equivalent |
| | What would make them doubt it? | "The delay was intentional" — reframe: intentional or not, the revenue gap is the same; the question is when to close it |
| **Claim 4** | What are we asserting? | SEO optimization will increase organic client discovery |
| | Why do we believe it? | Estimated — based on fee benchmarks and keyword opportunity in eco-anxiety/somatic therapy niche |
| | What will the buyer see? | Keyword gap analysis for Idyllwild + telehealth CA + eco-anxiety terms |
| | What would make them doubt it? | "SEO doesn't work for rural practices" — show telehealth CA keyword volume; AHS serves CA + TX statewide, not only walk-ins |

**Enforcement outcomes:**
- Claims 1–3: PASS all four steps — eligible as lead claims
- Claim 4 (SEO lift): PASSES with L2 label "[Estimated]" — cannot be headlined without qualification

---

## Stakeholder Decision Map

| Stakeholder Role | What They Want | What They Fear | Likely Support Level | Notes |
|---|---|---|---|---|
| Julie Anne Steiger — Founder, Sole Licensed Provider, Sole Decision-Maker | A site that works without her having to manage it; compliance resolved; course revenue unlocked; not being burned by another contractor | Wasting the budget again (3.9 Upwork rating signals prior dissatisfaction); being overwhelmed by onboarding a new vendor while managing clinical load | High — she posted the job, scoped the work, and set the budget | She is the only stakeholder; no procurement layer, no board, no partner. Decision will be made on trust + demonstrated competence + speed |
| Prospective Clients (indirect) | Clear service descriptions, easy booking, trusted-looking site | Landing on empty pages, seeing $10/month pricing for a therapy practice, or finding broken links | N/A — not a direct stakeholder in the buying decision | Their experience is the downstream consequence of every problem in this register; framing client impact sharpens Julie Anne's motivation |
| Associate Therapists / Clinical Supervisees (indirect) | A professional-looking practice to join; visibility for their specialties | No team page, no credibility signals, no professional infrastructure | N/A — not a direct stakeholder | Their absence from the site is a recruiting liability; framing this as "the site is currently recruiting-dark" may resonate |

**Critical stakeholders with Low support:** None identified — Julie Anne is the sole decision-maker and is already in active procurement mode.

---

## Discovery Questions

1. **Intake conversion rate (L1 upgrade for Problem #6):** "What percentage of insurance verification form submissions result in a scheduled first session? How many inquiries per week does the team currently process manually, and how long does the average intake take from form submission to first appointment?"

2. **Bottleneck validation — bandwidth:** "How many hours per week are you currently spending on website-related tasks — updating pages, responding to intake inquiries, troubleshooting broken links — versus clinical work and course development?"

3. **Course pricing and enrollment targets (L1 upgrade for L3 course revenue metric):** "What is the intended pricing for the self-led eco-resiliency coursework? Do you have an enrollment target for the first cohort? Is the July 2025 launch date being actively rescheduled, or is the course still in development?"

4. **ADA / HIPAA prior work:** "Has any formal HIPAA-conscious review or ADA accessibility scan been done on the site at any point — either by a prior Upwork contractor or internally? Are there any known BAAs currently in place with Wix or any form/scheduling integrations?"

5. **Upwork hiring status — timing risk:** "Is the Upwork posting still active? Have you received proposals you're evaluating, or is the position still open? We want to make sure our proposal timeline is useful to you — not arriving after a decision has already been made."

6. **Acorn Circle membership model:** "Is the Acorn Circle currently taking members, or is it in a soft-launch / waitlist phase? What is the intended pricing structure — monthly subscription, sliding scale, cohort-based? This will determine whether Phase 1 needs a full membership enrollment build or a waitlist capture page."

7. **Associate therapist pipeline:** "Do you have associate therapists currently working under your supervision, or is expansion still in the hiring/recruiting phase? If there are active associates, do they have bios and photos ready to publish?"