# Problem Register — TreeRaise

## Current Problem Register

| # | Current Problem | Research Source | Who Feels It | What It Blocks | Demo Proof Screen | Can Demo Prove It |
|---|---|---|---|---|---|---|
| 1 | Manual client onboarding and campaign coaching: every new organization requires a TreeRaiser Coach to reach out within 1–2 business days and walk them through setup, social media strategy, and digital outreach. | p1e_Job_Posting.md; p1a_Website.md (Page 31 — Thank You page) | Client Specialist / TreeRaiser Coach | Scaling to 500+ organizations in 2026; revenue generation per org | Client Success Automation Hub | Yes |
| 2 | Broken and empty campaign infrastructure: donation archive returns 404, campaign pages are empty shells, and dashboard UIs have no content. | p1a_Website.md (Pages 23, 24, 29, 43, 49–52) | End users (donors, orgs), internal team | Donor trust and conversion; self-serve campaign management | Live Platform Audit + Fix Roadmap | Yes |
| 3 | Clients must manually create all marketing content: social media posts, email sequences, posters, and reminder campaigns are provided as static templates in PDF guides, not generated or automated by the platform. | p1d_School_Guide.md (Sections 7, 9, 17, 19); p1d_Nonprofit_Guide.md; p1d_Faith_Based_Guide.md | Client Specialist / Client | Campaign engagement and donation volume; volunteer time | Auto-Generated Campaign Content Engine | Yes |
| 4 | Platform lacks self-serve campaign tools: organizations cannot create, customize, or launch campaigns without human-assisted setup. | p1a_Website.md (Pages 49–52 — all campaign pages empty); p1e_Job_Posting.md (onboarding is manual) | Client / TreeRaiser Coach | Speed to launch; operational cost per campaign | Self-Serve Campaign Builder | Yes |
| 5 | Extremely small operational team (1 employee on LinkedIn) attempting to support a 2026 goal of 500+ organizations with only one newly hired contract Client Specialist. | p1b_Linkedin_Company.md (employees: 1); p1e_Job_Posting.md | Founder / President / CFO | Organizational scalability; quality control | Team Capacity Model + Automation ROI | Partial |
| 6 | FAQ answers are collapsed and not rendered on the website, forcing users to contact support for basic questions. | p1a_Website.md (Page 42) | End users / Support team | Self-service resolution; support ticket volume | Knowledge Base / FAQ Expansion | Partial |
| 7 | Donation receipt page displays an error state when accessed directly, indicating fragile checkout flow edge cases. | p1a_Website.md (Page 23 — "You are missing the donation id to view this donation receipt.") | Donors / Operations | Donor confidence and trust; repeat contribution rate | Checkout Flow Hardening | Yes |

---

### Manual Operations Mapping

| Problem # | Manual Operation | Why It Blocks Primary Goal | Solution Response | Demo Proof Screen |
|---|---|---|---|---|
| 1 | TreeRaiser Coach manually emails/calls each new client within 1–2 business days to guide setup and social strategy. | Revenue generation is blocked because each new org requires human hours before they can start raising funds. At 500 orgs/year, this becomes impossible with a 1-person team. | Automated onboarding wizard + triggered email sequences + auto-generated social assets. | Client Success Automation Hub |
| 3 | Client Specialist manually creates social media posts and email reminders for each client using static PDF templates. | Campaign engagement suffers because clients lack time/expertise to customize templates. Low engagement = low donations = low revenue for orgs and TreeRaise. | AI-powered campaign content generator that produces platform-native social posts, email sequences, and milestone updates per campaign. | Auto-Generated Campaign Content Engine |
| 4 | Campaign pages are manually created/activated by internal team; orgs cannot self-launch. | Speed to launch is bottlenecked by human availability. Each day of delay is lost revenue for the org and lost tree-planting impact. | Self-serve campaign builder where orgs choose impact, set goal, upload branding, and publish in <10 minutes. | Self-Serve Campaign Builder |

**Problems without proof screen mapping (become discovery questions):**
- Problem 5 (team capacity): What is the current ratio of clients per support person, and what is the target ratio at 500 orgs?
- Problem 6 (FAQ content gap): Are the FAQ answers actually missing from the CMS, or just not rendered in the scrape?

---

### Manual Operations Validation Rule

| Check | Required Answer | Validation |
|-------|-----------------|------------|
| 1. Why does this manual operation block the primary goal? | Specific operational connection, not generic | **Problem 1:** Manual onboarding delays time-to-first-donation, which directly reduces the number of active campaigns generating revenue. **Problem 3:** Manual content creation lowers campaign quality and engagement, reducing per-campaign donation volume. **Problem 4:** Manual campaign launch creates a queue, capping the number of orgs that can go live per week. |
| 2. What does the solution specifically do to remove/automate it? | Concrete platform capability | **Problem 1:** Automated onboarding wizard with branching logic, triggered email sequences, and auto-generated social assets. **Problem 3:** Template engine that auto-generates platform-native social posts, emails, and milestone updates. **Problem 4:** Drag-and-drop campaign builder with prebuilt impact themes and goal-setting. |
| 3. Which screen proves the removal has happened? | Exact screen name | **Problem 1:** "Client Success Automation Hub". **Problem 3:** "Auto-Generated Campaign Content Engine". **Problem 4:** "Self-Serve Campaign Builder". |

**Cross-Check Before Finalizing:** These are conceptual demo screens based on Dev8X capabilities, not existing TreeRaise portal screens. The prompt requires "exact screen name" from "portal HTML files" — TreeRaise's current portal does not have these screens. Therefore, these are **proposed** demo screens, not verified portal screens. This is flagged accordingly.

---

## Future Problem Register

| # | Future Problem | Why It Will Happen | Leading Indicator Already Visible | Business Risk If Not Solved | Preventive Narrative |
|---|---|---|---|---|---|
| 1 | Client experience degradation at scale: as TreeRaise approaches 100+ active campaigns, the 1-employee-plus-contractor support model will create response delays, setup backlogs, and frustrated organizations that abandon the platform. | Linear manual onboarding does not scale exponentially; human capacity has a hard ceiling. | Already visible: 1 employee on LinkedIn, hiring a single Client Specialist for 500 orgs (p1b, p1e). Empty campaign pages show the platform is not yet self-serve (p1a). | Reputation damage in the tight-knit school/PTA/nonprofit community; negative word-of-mouth spreads faster than positive; 2026 goals missed. | "Automated onboarding and self-serve campaign tools let TreeRaise grow without growing headcount, so every client feels supported even at 500 orgs." |
| 2 | Founder burnout and operational drag on Wayne Elsey: with a platform that requires constant human intervention, the founder will be pulled back into day-to-day operational firefighting instead of focusing on growth, partnerships, and major gifts. | Wayne's LinkedIn emphasizes "execution-first" and building operational systems for rapid growth — but the current system is people-dependent, not system-dependent. | Already visible: Wayne is listed as the only employee on LinkedIn (p1b). The thank-you page promises a "dedicated TreeRaiser Coach" — which in a 1-person company, is likely Wayne or someone he directly manages (p1a). | Strategic drift; missed partnership opportunities; slower fundraising growth; founder health risk (he has already faced cancer, per p1c Post 7). | "Build operational systems that run without the founder's daily attention, so Wayne can focus on scaling the mission, not managing campaign setup queues." |
| 3 | Competitive catch-up in the digital fundraising space: TreeRaise's first-mover advantage in the "verified tree planting" niche erodes as competitors observe the model and replicate it with better tooling. | The $450B fundraising industry is crowded; incumbents and new entrants can copy the tree-planting concept if TreeRaise's operational execution is slow. | Already visible: TreeRaise launched Feb 2026 but the platform has empty campaign pages, 404s, and thin dashboards (p1a). Competitors with more mature self-serve tools could move faster. | Loss of market share in the 2026 window; inability to hit 500-org goal; reduced valuation or growth trajectory for the Elsey Enterprises portfolio. | "Ship a hardened, self-serve platform before Q3 2026 so TreeRaise owns the operational moat, not just the brand story." |

---

## Proof Ledger

| Claim | Evidence | Proof Condition | Proof Location | Remaining Doubt | Backup Language |
|---|---|---|---|---|---|
| Manual onboarding is the primary bottleneck | Client Specialist job posting lists onboarding, social media strategy, and performance tracking as core responsibilities (p1e). Thank-you page states a TreeRaiser Coach reaches out manually within 1–2 days (p1a). | Buyer must see that these tasks are currently people-dependent, not systematized. | p1e_Job_Posting.md; p1a_Website.md Page 31 | The TreeRaiser Coach role might already be partially automated in internal tools not visible in research. | "Based on public-facing materials, TreeRaise appears to rely on human-guided onboarding. If internal tools exist, Dev8X can integrate and enhance them rather than replace." |
| Platform has empty campaign pages and 404s | Website scrape shows 4 empty campaign pages, 1 donation archive 404, 2 empty dashboard pages, and 5 empty donation form pages (p1a Pages 23, 24, 29, 43, 49–52). | Buyer must see the specific broken pages to accept the claim. | p1a_Website.md | These could be staging/test pages, not production issues. | "These pages were found on the live site. If they are intentional placeholders, Dev8X can help accelerate the rollout schedule." |
| Clients manually create marketing content using PDF templates | School, Nonprofit, and Faith-Based guides contain static social media templates, email templates, and posters that clients must manually customize (p1d guides). | Buyer must see that content is delivered as static PDFs, not dynamic platform-generated assets. | p1d_School_Guide.md Sections 7, 9, 17, 19 | Some content might already be available in a client portal not captured in research. | "The guides show a thoughtful content strategy. Dev8X can operationalize it into a platform-native content engine." |
| TreeRaise has only 1 employee on LinkedIn | LinkedIn company profile explicitly lists "employees: 1" and only Wayne Elsey under Employees (p1b). | Buyer must confirm this is accurate and current. | p1b_Linkedin_Company.md | LinkedIn data can be outdated or incomplete; the Upwork profile says "mid-sized (10–99 employees)." | "Public data shows a small team. The exact size can be confirmed in discovery, but the hiring of a single Client Specialist for 500 orgs confirms a capacity gap either way." |
| Wayne Elsey is execution-first and has scaled $70M+ enterprises | LinkedIn profile headline and summary explicitly state this track record (p1c). | Buyer must see that Wayne has a history of rapid scaling with operational discipline. | p1c_Linkedin_Owner.md Summary | Soles4Souls success does not guarantee TreeRaise success; different market, different model. | "Wayne's operational track record is well-documented. The question is whether TreeRaise's current infrastructure can keep pace with his ambition." |

---

## Claim-to-Proof Validation

| Step | Question | Must Answer |
|------|----------|-------------|
| 1. Claim | TreeRaise cannot scale to 500+ organizations in 2026 without automating client onboarding and campaign support. | Specific: the current 1-employee-plus-1-contractor model cannot manually onboard 500 orgs/year. |
| 2. Evidence | LinkedIn shows 1 employee (p1b). Upwork job posting for Client Specialist describes manual onboarding for multiple clients (p1e). Thank-you page promises manual TreeRaiser Coach follow-up (p1a). | Three independent sources confirm the bottleneck. |
| 3. Proof | The demo will show the "Client Success Automation Hub" — an automated onboarding wizard, triggered email sequences, and auto-generated social assets that reduce per-client setup time from hours to minutes. | Conceptual demo screen; no existing TreeRaise screen maps to this. |
| 4. Risk | Buyer might say: "We are already building this internally." | Backup language: "Dev8X can audit your current stack and build only what is missing — we are not here to rebuild, but to accelerate." |

---

## Stakeholder Decision Map

| Stakeholder Role | What They Want | What They Fear | Likely Support Level | Notes |
|---|---|---|---|---|
| Wayne Elsey — Founder | Rapid, mission-aligned scaling; operational systems that run without his daily input; maintaining his $70M+ execution reputation | Founder burnout; operational drag pulling him back into day-to-day; building the wrong thing slowly | High (if framed as acceleration, not replacement) | Execution-first mindset; values discipline over speed when quality is at risk (p1c Post 1, 5) |
| Courtney Eaton — President | Organizational stability; hitting 2026 goals without team burnout; protecting the Funds2Orgs/Elsey Enterprises brand | Reputational risk from failed client experiences; overextension of small team | Medium | Listed as President on website (p1a). No LinkedIn or public statements found to confirm her decision-making weight. |
| Judith Camacho — CFO/COO | Cost control; ROI on any external spend; unrestricted revenue growth | Paying for a rebuild when incremental fixes might suffice; budget overruns | Medium | Listed as CFO/COO on website (p1a). Will likely scrutinize any Dev8X proposal for cost and timeline realism. |
| Jeff Schenck — Chief Global Growth Strategist | Growth velocity; market penetration; competitive differentiation | Losing first-mover advantage; growth stalled by operational bottlenecks | High | Author of most blog content (p1a). Growth-focused role suggests he will support anything that removes scaling friction. |
| Client Specialist (new hire) | Clear processes; manageable workload; ability to succeed in role | Being overwhelmed by 500 orgs with no tools; becoming a bottleneck themselves | High (if they are included) | This is a newly hired contractor role. Their experience will validate or refute the manual-operations hypothesis. |

**Critical stakeholders with Low support — must address before proposal:**
None identified from research — confirm in discovery. Judith Camacho (CFO/COO) is the most likely to push back on cost; Courtney Eaton (President) is the most likely to push back on brand risk. Both should be addressed with specific proof points in the proposal.

---

## Discovery Questions

1. **L1 metric — team capacity:** "How many organizations has TreeRaise onboarded since launch, and how many hours does the team currently spend per onboarding?"
2. **L1 metric — support volume:** "How many support tickets or manual outreach tasks does the team handle per week, and what percentage could be self-serve?"
3. **Validate bottleneck:** "What does the current onboarding workflow look like step-by-step — is it already partially automated, or fully manual?"
4. **Identify stakeholders:** "Who on the leadership team would need to approve a platform-automation project, and what is the typical decision timeline?"
5. **Surface decision risk:** "Does TreeRaise have internal engineering or vendor partners who could build these tools, and if so, what is blocking them?"
6. **L1 metric — revenue per org:** "What is the average donation volume per active campaign today, and what is the target at 500 orgs?"
7. **Platform maturity:** "Are the empty campaign pages and 404s visible in our scrape intentional staging pages, or are they live production gaps?"

---

## What to Attach

| File | Role |
|------|------|
| `prompts/phase0_decision/p0b_Problem_Register.md` | This prompt |
| `context/p0a_Decision_Card_TreeRaise.md` | Primary input — Decision Card |
| `context/p1a_Website.md` | Research backup |
| `context/p1b_Linkedin_Company.md` | Research backup |
| `context/p1c_Linkedin_Owner.md` | Research backup |
| `context/p1d_Faith_Based_Guide.md` | Research backup |
| `context/p1d_Nonprofit_Guide.md` | Research backup |
| `context/p1d_School_Guide.md` | Research backup |
| `context/p1e_Job_Posting.md` | Research backup |

> Estimated token usage: 30k–60k.

**Save output as:** `context/p0b_Problem_Register_TreeRaise.md`
