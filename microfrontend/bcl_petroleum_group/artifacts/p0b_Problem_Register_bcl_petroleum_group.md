# Problem Register — BCL Petroleum Group

## Metadata
```
prospect: BCL Petroleum Group (Bobby C. Lee, President/CEO)
provider: Dev8X
generated: 2026-07-05
version: d0_v2
primary_input: p0a_Decision_Card_bcl_petroleum_group.md
research_files:
  - p1a_Website.md
  - p1c_Linkedin_Owner.md
```

---

## Current Problem Register

| # | Current Problem | Research Source | Who Feels It | What It Blocks | Demo Proof Screen | Can Demo Prove It |
|---|---|---|---|---|---|---|
| 1 | Deal flow is sourced entirely through manual LinkedIn group posts — identical loan offers copy-pasted across 11+ groups with no lead capture, no CRM, no intake forms, and no automated follow-up | p1c_Linkedin_Owner.md — Posts 1–14 (cross-posted duplicates across groups) | Bobby Lee (President/CEO) | Primary Goal: Scale private lending & capital deployment across multiple sectors | Deal Intake Portal + Borrower Submission Form | Yes |
| 2 | Website is a non-functional 4-page shell with placeholder meta text ("Based in [Your Location]"), no service pages, no deal submission capability, and no content that establishes lending credibility — borrowers and brokers Googling BCL find nothing useful | p1a_Website.md — Page 1 meta tag, Pages 3–4 (only privacy/terms), overall site structure | Bobby Lee (President/CEO), potential borrowers and broker partners | Credibility & brand authority as a serious private lender; inbound deal flow from web search | Professional Landing Page with Lending Services + Deal Submission | Yes |
| 3 | No borrower qualification or screening process exists before Bobby engages — every DM and inquiry requires his personal time regardless of deal quality, size fit, or borrower readiness | p1c_Linkedin_Owner.md — Posts 6, 7, 15 (explicit borrower requirements listed but no mechanism to enforce them pre-conversation) | Bobby Lee (President/CEO) | Scaling deal volume — as inquiry count grows, unqualified leads consume more of Bobby's time with no filter | Borrower Qualification Pipeline + Pre-Screening Workflow | Yes |
| 4 | No centralized deal tracking — deals sourced from LinkedIn DMs, WhatsApp (401-601-2371), multiple email addresses (bobby@emiratesinvestmentfund.com, Bobby.blee572@gmail.com, minoritymanagementgroupllc@aol.com, minoritymanagementgroupllc@gmail.com) with no single system of record | p1c_Linkedin_Owner.md — Posts 6, 7, 14, 21, 26, 30, 32, 33 (four different email addresses used across posts) | Bobby Lee, any team members processing deals | Deal tracking, follow-up reliability, pipeline visibility | Deal Pipeline Dashboard | Yes |
| 5 | International operations in Panama (Eloy Santos), Latin America (Jesus Smith), and GCC/Saudi Arabia have no shared digital infrastructure — each regional lead presumably operates independently with no centralized deal visibility | p1a_Website.md — Leadership (Eloy Santos: BCL Panama; Jesus Smith: Latin America), p1c_Linkedin_Owner.md — Post 2 (Saudi Arabia funding offer) | Bobby Lee, Eloy Santos, Jesus Smith | International expansion goal — cannot scale across geographies without centralized pipeline | Multi-Region Deal Flow View | Partial |
| 6 | Brand identity is fragmented across three separate entities (BCL Petroleum Group, Minority Management Group LLC, Emirates Investment Fund) with no unified positioning — borrowers cannot tell which entity they are dealing with or what the relationship is | p1c_Linkedin_Owner.md — Posts alternate between BCL Petroleum, Minority Management Group, and Emirates Investment Fund contact details; p1a_Website.md — site is BCL Petroleum only | Bobby Lee, borrowers, broker partners | Credibility and trust at institutional deal sizes ($500K–$50M) | None — discovery question | No — discovery question |
| 7 | Post engagement on LinkedIn is minimal (1–7 likes typical on loan offers) suggesting the current outreach method produces near-zero measurable response despite high volume of posting effort | p1c_Linkedin_Owner.md — engagement metrics across all 35 posts (highest non-announcement post: 7 likes) | Bobby Lee | Deal flow volume and ROI on time spent sourcing | None — discovery question | No — discovery question |

### Manual Operations Mapping

| Problem # | Manual Operation | Why It Blocks Primary Goal | Solution Response | Demo Proof Screen |
|---|---|---|---|---|
| 1 | Bobby manually copy-pastes identical loan offer text into 10–15 LinkedIn groups per posting cycle, then waits for DM responses one by one | Cannot scale capital deployment when every deal starts as a cold LinkedIn group post — volume is capped by Bobby's personal posting time and group limits | A professional lending portal with a single shareable URL that replaces all group posts; borrowers self-submit deal details through an intake form | Deal Intake Portal + Borrower Submission Form |
| 2 | No website content exists to convert search traffic — the current site has zero service descriptions, zero case studies, zero deal submission capability; meta tags still contain development placeholder text | Borrowers and brokers conducting due diligence at the $500K–$50M level Google the company and find an incomplete site, destroying credibility before a conversation starts | A professionally designed landing page with lending services, loan parameters, team credentials, and an integrated deal submission form | Professional Landing Page with Lending Services |
| 3 | Bobby personally reads every DM and email inquiry, manually evaluates whether the borrower meets requirements (exit strategy, experience, cash flow, documentation), and manually responds to accept or decline | As inquiry volume grows, Bobby becomes the bottleneck — he cannot scale the number of deals he reviews because every unqualified inquiry gets the same attention as a $20M qualified deal | A pre-screening questionnaire embedded in the intake form that filters borrowers against stated requirements before Bobby sees the deal | Borrower Qualification Pipeline + Pre-Screening Workflow |
| 4 | Deals arrive through at least 5 different channels (LinkedIn DMs, WhatsApp, 4 email addresses) with no central record — follow-up depends entirely on Bobby remembering or scrolling back through message threads | Deals fall through the cracks when communication is spread across DMs, WhatsApp, and 4 email inboxes — no pipeline visibility means no ability to track deal stage, follow-up status, or close probability | A unified deal pipeline dashboard that captures all submissions in one place with stage tracking, contact history, and follow-up reminders | Deal Pipeline Dashboard |

**Problems without proof screen mapping (become discovery questions):**
- **Problem #5 (International operations):** "How do Eloy Santos in Panama and Jesus Smith in Latin America currently submit, track, and report deals to you? Do they have their own pipeline or do all deals come through your personal channels?"
- **Problem #6 (Brand fragmentation):** "When a borrower receives a loan offer, which entity are they engaging with — BCL Petroleum Group, Minority Management Group, or Emirates Investment Fund? Is there a reason you use different entity names and email addresses for different offers?"
- **Problem #7 (Low engagement):** "Of the lending offers you post on LinkedIn, approximately how many result in a DM conversation? Of those conversations, how many progress to a deal submission?"

### Manual Operations Validation Rule

| Check | Required Answer | Validation |
|-------|-----------------|------------|
| 1. Why does this manual operation block the primary goal? | Specific operational connection, not generic | All 4 mapped operations (Problems 1–4) cite the exact primary goal from Decision Card §1: "Scale private lending & capital deployment across multiple sectors" |
| 2. What does the solution specifically do to remove/automate it? | Concrete platform capability | Each mapping specifies a concrete capability: intake form, landing page, pre-screening workflow, pipeline dashboard |
| 3. Which screen proves the removal has happened? | Exact screen name | All 4 mapped operations have named screens; these must be cross-checked against the portal HTML before demo build |

**Enforcement Rule applied:**
- Problems 5, 6, and 7 CANNOT be lead claims — they have no proof screen and require discovery data
- Problems 5, 6, and 7 MAY appear as supporting context with "Partial" or "Hypothesis" labels
- Problems 5, 6, and 7 each have corresponding discovery questions listed above

**Cross-Check Before Finalizing:** Portal HTML files have not yet been built. All screen names listed above are target specifications for the demo build. Once portal HTML is available, verify each screen exists and matches the mapping.

---

## Future Problem Register

| # | Future Problem | Why It Will Happen | Leading Indicator Already Visible | Business Risk If Not Solved | Preventive Narrative |
|---|---|---|---|---|---|
| 1 | **Deal volume overwhelm** — As Emirates Investment Fund capital grows and Bobby's posting reaches more groups, unqualified inquiries will consume all of his time and qualified deals will be lost in the noise | Bobby's 35% equity position in Emirates Investment Fund is new (2 months old) and he's already posting at maximum visible velocity (~15 posts/month); more capital available = more aggressive outreach = more unqualified inbound | Post frequency has increased in the last 3 months with loan parameters shifting from $100K minimum (2yr ago) to $500K minimum (current) — deal size ambitions are scaling but infrastructure is not | Bobby becomes a full-time DM responder instead of a deal closer; qualified $5M+ deals get the same response time as unqualified $50K inquiries; deals with 7-day closing windows expire while Bobby is sorting noise | "The more capital you have to deploy, the more your inbox becomes the bottleneck — and every hour spent screening unqualified leads is an hour a $10M deal sits waiting for a response." |
| 2 | **Credibility collapse at institutional scale** — Moving from $100K–$500K deals to $5M–$50M deals will expose the gap between Bobby's ambition and his digital infrastructure to a more sophisticated borrower and broker audience | Institutional borrowers, family offices, and commercial brokers at the $5M+ level perform due diligence on lenders before engaging — they expect a professional web presence, verifiable credentials, and structured intake processes | Loan parameters have already scaled upward (from $100K to $500K minimum); website still has placeholder text; LinkedIn posts use consumer-level emoji formatting; contact info is a personal Gmail address | Sophisticated borrowers and brokers at the $5M–$50M level Google BCL, find the placeholder website, and never make contact — Bobby loses deals he never knew existed and attributes the lack of deal flow to "market conditions" rather than infrastructure | "At $100K deal sizes, your LinkedIn posts are your business card. At $10M deal sizes, your website is your first interview — and right now it's showing up with a placeholder where your address should be." |
| 3 | **International coordination breakdown** — Panama (Eloy Santos), Latin America (Jesus Smith), and potential GCC expansion will generate deals that Bobby cannot track, follow up on, or close from Houston if everything runs through personal DMs and WhatsApp | BCL already has named regional leaders in Panama and Latin America; Bobby is already posting Saudi Arabia-specific loan offers; expansion is visibly underway but all deal communication still routes through Bobby's personal channels | Three named regional operators exist on the website; one Saudi-specific LinkedIn post was made 3 weeks ago; no regional landing pages, no shared CRM, no multi-language content | Eloy Santos closes a deal in Panama that conflicts with terms Jesus Smith offered in Colombia; Bobby has no visibility into either; regional operations become siloed profit centers with no accountability to the parent entity | "International expansion without a centralized deal pipeline means your regional directors are building their own lending businesses — using your capital but without your visibility." |
| 4 | **Regulatory and compliance exposure** — Scaling from informal LinkedIn-based lending offers to institutional volume will attract scrutiny from financial regulators who expect documented processes, borrower records, and audit trails | Transition from informal private lending to structured fund deployment (Emirates Investment Fund) changes the regulatory profile; increasing deal volume and geographic expansion amplify exposure | Emirates Investment Fund equity position creates a more formal fund structure; lending offers now cite specific interest rates, LTV ratios, and terms — these are regulatory-relevant claims made on public platforms without disclaimers | A regulator or state attorney general reviews Bobby's public LinkedIn posts and finds standardized lending terms offered without proper licensing disclosures, borrower documentation, or complaint procedures — resulting in fines, cease-and-desist, or fund freezes | "Every loan offer you post publicly becomes a regulatory record — and right now those records are scattered across 11 LinkedIn groups with no documentation trail." |

---

## Proof Ledger

| Claim | Evidence | Proof Condition | Proof Location | Remaining Doubt | Backup Language |
|---|---|---|---|---|---|
| Bobby's entire deal sourcing relies on manual LinkedIn group posts | 35 LinkedIn posts over 8 years, 90%+ are lending offers, 7+ are exact duplicates cross-posted to groups, no other inbound channel visible | Buyer confirms LinkedIn is primary/only channel; or buyer does not dispute when shown the pattern | Report §2 — LinkedIn Activity Analysis | Bobby may have offline deal sources (referrals, personal network) not visible in research | "Based on your public activity, LinkedIn group posts appear to be a major deal sourcing channel — we'd like to understand what else is working for you." |
| The current website is non-functional for lead generation | 4-page site; placeholder meta text "Based in [Your Location]"; no service descriptions, no intake forms, no deal submission | Show the buyer their own meta tag with placeholder text; show 4-page site map vs. competitor lender sites | Demo — Before/After Landing Page | Bobby may not care about the website and may never intend to use web as a channel | "Your website is the first thing borrowers see when they Google your company — right now it's a 4-page placeholder. Whether or not you prioritize web, your brokers and borrowers are checking." |
| A deal intake form would reduce Bobby's time screening unqualified inquiries | Bobby lists specific borrower requirements in posts (exit strategy, experience, documentation, cash flow verification) but has no mechanism to enforce them pre-conversation | Show pre-screening form with Bobby's own stated requirements built in; show filtered vs. unfiltered pipeline | Demo — Borrower Qualification Pipeline | Bobby may prefer personal screening because it's how he evaluates "seriousness" beyond checkboxes | "This isn't replacing your judgment — it's making sure the only deals that reach your desk are the ones worth your time." |
| Multiple contact channels create deal tracking gaps | 4 different email addresses, LinkedIn DMs, and WhatsApp all used across different posts — no unified system visible | Show the 4 different emails used across posts; show deal pipeline dashboard consolidating all channels | Demo — Deal Pipeline Dashboard | Bobby may actually track deals in a spreadsheet or system not visible in research | "We found four different email addresses across your public posts — if those all feed into one system, great. If not, we've built a dashboard that brings everything together." |
| International operations lack centralized visibility | Named regional operators on website (Panama, LatAm); Saudi-specific post; no shared infrastructure visible | Show multi-region deal view; buyer confirms regional deal flow is not centralized | Demo — Multi-Region Deal Flow View | Regional operators may have their own systems that work fine independently | "As you expand into Panama, Latin America, and the GCC, a centralized view of all regional deals ensures nothing slips between your Houston desk and your team on the ground." |

---

## Claim-to-Proof Validation

| Step | Claim 1: Manual LinkedIn posting is the deal sourcing bottleneck | Claim 2: Website destroys credibility at institutional deal sizes | Claim 3: No borrower pre-screening wastes Bobby's time | Claim 4: Multiple contact channels create tracking gaps |
|------|---|---|---|---|
| 1. Claim | Bobby sources 100% of visible deal flow through manual LinkedIn group posts | The current website has placeholder meta text and zero lending content, undermining credibility with borrowers at $500K–$50M | Every inquiry gets Bobby's personal attention regardless of qualification level because no screening mechanism exists | Deals arrive through 5+ channels (DMs, WhatsApp, 4 email addresses) with no unified tracking |
| 2. Evidence | p1c_Linkedin_Owner.md: 35 posts, 28+ lending offers, 7+ exact duplicates cross-posted | p1a_Website.md: meta "Based in [Your Location]", 4 pages total (homepage, duplicate, privacy, terms) | p1c_Linkedin_Owner.md: Posts 6, 7, 15 list detailed borrower requirements but all say "Send a DM" | p1c_Linkedin_Owner.md: Posts 6 (Gmail), 7 (emiratesinvestmentfund.com), 21 (aol.com), 30 (gmail.com), 32 (gmail.com); WhatsApp in Post 7 |
| 3. Proof | Demo: Deal Intake Portal replacing group posts with single shareable URL + intake form | Demo: Before/After Landing Page showing placeholder site vs. professional lending portal | Demo: Borrower Qualification Pipeline showing pre-screening against Bobby's own stated criteria | Demo: Deal Pipeline Dashboard showing all channels in one view |
| 4. Risk | Bobby may have robust offline deal sources (personal network, phone referrals) not visible in research | Bobby may deliberately keep the website minimal and not value web presence | Bobby may view personal screening as his competitive edge and resist delegation | Bobby may actually track everything in a system not visible from public data |
| 4. Backup | "LinkedIn appears to be a primary channel — we'd like to understand what other sources work for you." | "Whether or not you prioritize web, your borrowers and brokers are checking — and right now the site has a placeholder where your location should be." | "This keeps your final decision authority intact — it just makes sure the deals that reach you are already pre-qualified against your own stated requirements." | "If you already have a system, great — if not, this brings everything into one view." |

**Enforcement applied:**
- All 4 claims pass the 4-step test → eligible as lead claims
- Claims about international operations (Problem 5) and brand fragmentation (Problem 6) do NOT pass Step 3 (no proof screen available) → demoted to supporting claims with discovery questions
- Post engagement claim (Problem 7) does NOT pass Step 2 (no direct evidence it causes deal loss, only correlation) → demoted to supporting context

---

## Stakeholder Decision Map

| Stakeholder Role | What They Want | What They Fear | Likely Support Level | Notes |
|---|---|---|---|---|
| **Bobby C. Lee** — President/CEO/Chairman, BCL Petroleum Group; President, Minority Management Group LLC; Executive Director, Emirates Investment Fund | More qualified deals reaching his desk faster; scale capital deployment without scaling his personal time | Losing personal control over deal vetting; paying for technology he doesn't use; being told his current approach is wrong | **Med** | Sole decision-maker across all three entities. His ego is tied to being the deal-maker — any pitch that implies he's doing it wrong will trigger resistance. Frame as "scaling what works" not "fixing what's broken." |
| **Bobby Lee Jr.** — President, BCL Petroleum Group (per website) | Operational excellence; HSE management; project management | Father-son dynamic disrupted by external vendor; technology imposed without his input | **Unknown — discovery required** | Website lists him as President with 23+ years experience and U.S. Navy background. Unclear if he has any role in lending/deal flow or is operations-only. Must confirm in discovery. |
| **Jesus Smith** — VP International Trade, Latin America | Successful Latin American trading operations; clear mandate and autonomy | Being monitored or constrained by centralized system; losing regional autonomy | **Unknown — discovery required** | 20+ years experience, multilingual, led operations in Mexico, Colombia, Peru, Brazil. Likely has his own deal flow methods. |
| **Eloy Santos** — Managing Director, BCL Panama | Growth of BCL Panama operations; commercial development across Americas, Europe, West Africa | Being bypassed by Houston-centric system; tools that don't accommodate his geographic scope | **Unknown — discovery required** | Covers a very wide geographic area. May or may not use any of Bobby's stated lending infrastructure. |
| **Dr. R. Gerald Bailey** — VP Business Development | Strategic partnerships; leveraging Exxon network; board-level advisory credibility | Being associated with unprofessional digital presence; technology that undermines his professional reputation | **Med–High** | Former Exxon President, Ph.D. in Chemical Engineering, sits on two other boards. This is the most credentialed person on the team — he likely has the highest standards for professional presentation. |

**Critical stakeholders with Low support — must address before proposal:**
None identified from research with confirmed Low support — but Bobby Lee Jr., Jesus Smith, and Eloy Santos have Unknown support levels. Discovery must clarify:
1. Does Bobby Lee Jr. have any role in lending/deal flow decisions?
2. Do Jesus Smith and Eloy Santos have their own deal sourcing methods?
3. Would any of them need to approve or adopt new operational tooling?

---

## Discovery Questions

**Priority 1 — Upgrade L4 metrics to L1 (unlock ROI model):**

1. "How many borrower inquiries do you receive per week from your LinkedIn posts and other channels combined?"
2. "Of those inquiries, what percentage are qualified enough to move to a term sheet or underwriting?"
3. "How many hours per week do you personally spend posting to LinkedIn groups and responding to DMs and emails about lending?"
4. "How many deals did you fund in the last 12 months, and what was the average deal size?"
5. "Do you currently use any CRM, spreadsheet, or tracking system to manage your deal pipeline?"

**Priority 2 — Validate or refute primary bottleneck:**

6. "Beyond LinkedIn, what are your other sources of deal flow? Personal referrals, broker network, phone, events?"
7. "Is the current website intentionally minimal, or has building it out been on your to-do list?"
8. "When a borrower or broker contacts you, what does your typical screening process look like before you decide to engage?"

**Priority 3 — Identify stakeholder dynamics:**

9. "When you decide to invest in a new tool or service for BCL, who else needs to weigh in — Bobby Jr., your VP team, or is that your call?"
10. "How do Eloy Santos in Panama and Jesus Smith in Latin America currently communicate deals to you? Do they have their own intake process?"

**Priority 4 — Surface decision risk and brand clarity:**

11. "When a borrower engages with you, are they working with BCL Petroleum Group, Minority Management Group, or Emirates Investment Fund — and does that distinction matter to them?"
12. "As you scale into the $5M–$50M range, have you encountered borrowers or brokers who needed to see more digital infrastructure before engaging?"

---

## What to Attach

| File | Role |
|------|------|
| `system_prompts/phase0_strategy_foundation/p0b_Problem_Register.md` | This prompt |
| `artifacts/p0a_Decision_Card_bcl_petroleum_group.md` | Primary input — Decision Card |
| `artifacts/p1a_Website.md` | Research backup |
| `artifacts/p1c_Linkedin_Owner.md` | Research backup |
