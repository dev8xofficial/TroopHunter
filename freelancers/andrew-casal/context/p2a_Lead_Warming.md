## Lead Warming Plan — Andrew Casal / Solo Freelancer (Upwork + LinkedIn)

---

### Analysis

#### Target — Key Themes

- **"The last 30%"** — his entire positioning is built on this phrase: AI tools (Bolt, Lovable, Cursor, Claude Code) get you 70% there; he lives in the gap between "demos well" and "works in production." This is his core identity statement, not a marketing line.
- **Security as craft** — RLS policies, auth hardening, row-level data isolation; he treats security not as a checkbox but as evidence of whether a developer actually understands what they shipped. He audits this checklist in the same order every time.
- **Transparency and honest tradeoffs** — work-log updates every few hours, honest about limits upfront; he uses "I explain technical decisions in plain English" as a differentiator, and his posts echo this — he shares failures and lessons, not just wins.
- **Resilience through uncertainty** — multiple recent posts document layoffs, difficult personal circumstances, and restarting his freelancing career at a lower rate than six years prior. He frames these with reflection, not complaint. He writes about the emotional cost of the process.
- **Building in public** — ships personal tools (Cassian habit app, interview prep tool, Todoist companion), posts about what works and what doesn't, actively asks his network for feedback and testers.
- **Freelancing as a craft to be learned** — wrote a Substack documenting repeatable Upwork workflows, mentors other devs entering freelancing, treats the meta-skill of freelancing with the same rigor as the technical skill.

#### Target — Tech Stack and Work Type

- **React + TypeScript** — primary frontend language across client work, mentioned in every role and almost every post; his core.
- **Supabase (Postgres, RLS, Auth, Edge Functions)** — the tool he learned by doing; his security audits and most hardening work live here.
- **Next.js** — listed in Upwork skills and contracts ("Next JS UI" project) — overlaps directly with Abdul's primary framework.
- **Stripe (Connect, Subscriptions, webhooks)** — multi-tenant payment work; a common layer on the client projects he handles.
- **AI toolchain integration** — n8n, ElevenLabs, OpenAI/Claude APIs, Firecrawl; he builds the agentic layer on top of Supabase + React foundations.

#### Target — Overflow Signals

- **14 simultaneous active contracts** — the single clearest signal; at $65–$110/hr across 14 projects, he is operating at a pace that demands compartmentalisation. Some of these are clearly long-running (Faith Journey App: 113 hours billed; React/TypeScript/Supabase Bolt.new app: 70 hours and counting).
- **Returned to full-time freelancing after a failed startup stint** — his April 2026 post explicitly says "their funding round didn't close... so I'm back to freelancing full-time" — he re-entered the market and already has 14 open contracts, which means he is taking on volume without necessarily having capacity to handle it all.
- **Rate escalation pattern** — contracts show rates climbing from $60/hr → $65/hr → $75/hr → $100/hr → $110/hr across different clients simultaneously; he is trying to raise rates but can't yet afford to cut lower-rate clients loose, compressing his time further.
- **UI-layer work is not his primary identity** — his Upwork overview and LinkedIn summary both de-emphasise pure frontend UI work; the "Next JS UI" and "Lovable Platform Build" contracts are present but not his calling card. A React/Next.js UI specialist as a subcontractor takes exactly that layer off his plate.
- **Mentor role adds to load** — he runs mentoring sessions, built a Codementor business, and still actively advises new freelancers. This is time he spends not billing clients.

#### Shared Ground

Both Abdul and Andrew are React + TypeScript + Next.js developers who have shipped real client products, not demos — and both work in environments where AI-generated scaffolding needs a skilled developer to finish and harden it. Andrew's explicit niche (finishing Lovable/Bolt MVPs) creates a natural handoff: when he has a client who needs the React/Next.js UI layer built or polished and his queue is already full, Abdul is the exact kind of developer he can route that work to without losing the client.

---

### Post Selection

#### Post 1
**Post excerpt:** "I'm flying by the seat of my pants. I picked up Supabase in January last year because I kept seeing it on Upwork. That's the whole strategy. Take the projects, watch what shows up over and over, try to turn the patterns into a routine... Now I have a short list of constants I check first, every project: RLS policies first, auth: sign-in and sign-up actually work, secrets aren't sitting in the frontend..."
**Why selected:** This post is about the discipline of developing personal engineering constants — it invites a substantive response about Abdul's own default checklist, and directly connects to the technical layer they share (React, auth, frontend security). It has 2 comments, so the thread is not crowded.
**Comment timing:** Day 0

#### Post 2
**Post excerpt:** "The most common bug I find in AI-built apps isn't what you'd think. It's that there's no real difference between a normal user and an admin. The login works. The dashboard loads. It demos great. Then someone changes an ID in a request and they're looking at data that was never theirs... AI writes the happy path. 'Make absolutely sure they can only see their stuff' is the boring, invisible 30%."
**Why selected:** This is his most technically specific original post on his core positioning — the "invisible 30%" — and it ends with an open question ("what's the one thing you're least sure about?"). A short reply about the frontend side of that same problem (how easy it is to expose data through state mismanagement on the React side) will feel like a genuine peer addition, not a compliment.
**Comment timing:** Day 2

#### Post 3
**Post excerpt:** "One of my freelancing hacks: use AI to scaffold apps in minutes. It gets me 70% there fast, so I can spend my time on the last 30% — polishing UI, integrating APIs like Stripe and Supabase, refactoring, and making it seamless... Do you prefer starting fresh, or extending what's in place?"
**Why selected:** He directly mentions "polishing UI" as one of the things he does in the last 30% — this is the handoff zone. A comment here that naturally introduces Abdul's relevant context (React/Next.js UI work), then closes with a connection ask, is the most natural transition point in the sequence.
**Comment timing:** Day 4

---

### Comments

#### Comment 1 — Day 0

The constants list is the right frame. Mine looks similar — I end up checking whether client-side state can accidentally expose data the user shouldn't see before anything else. React makes that invisible until someone's in DevTools.

**Stage:** Establish Presence
**What this does:** Adds a specific, laterally-placed observation about the frontend side of the same security discipline Andrew described — signals genuine technical peer, not a follower leaving a reaction.

---

#### Comment 2 — Day 2

The ID-swap attack is almost always where it breaks first. On the React side, it compounds — if the client fetches all rows and filters locally instead of trusting the query, the data's already in the browser. Saw it on a Next.js dashboard project; the RLS was fine, the component wasn't.

**Stage:** Deepen the Thread
**What this does:** Extends the exact technical thread from Comment 1 into the React/Next.js layer, adds a concrete scenario from Abdul's own work in a single clause, and brings him from "interesting commenter" to "developer who works on the same layer I work on."

---

#### Comment 3 — Day 4

That split is real — the scaffolding gets you the structure, but the UI polish and the state that drives it is still manual every time. That's most of what I do in React/Next.js. Sending a connection request — seems like a conversation worth having.

**Stage:** The Ask
**What this does:** Lands Abdul's React/Next.js context naturally as a contribution to Andrew's post about the 70/30 split, then makes the connection ask feel like a logical peer move rather than a cold close.

---

### Connection Request Note

**When to send:** Immediately if Andrew replies to Comment 1 or Comment 2. Day 5 if no reply was received.

**Request message (if reply received — reference the specific thread):**

> Appreciated the thread on the constants checklist — the frontend/state angle doesn't get enough attention alongside RLS. I do React and Next.js; similar layer to what you described in the "polishing UI" part of the 30%. Worth connecting.

**Request message (if no reply — cold connection on Day 5):**

> Been following your posts on AI-built app security and the 70/30 split. I work in React and Next.js — the UI side of the same layer. Worth connecting.

---

### Execution Notes

| Day | Action | Post to Comment On |
|-----|---------|--------------------|
| Day 0 | Comment 1 | Post 2 in scrape — "I'm flying by the seat of my pants" (constants checklist post) |
| Day 2 | Comment 2 | Post 3 in scrape — "The most common bug I find in AI-built apps" |
| Day 4 | Comment 3 | Post 8 in scrape — "One of my freelancing hacks: use AI to scaffold apps in minutes" |
| Day 5 | LinkedIn connection request (if no reply to any comment) | — |

> [!NOTE]
> If Andrew replies to Comment 1 or 2 before Day 4, skip the remaining scheduled comment, send the connection request the same day, and move directly to Phase 3 outreach. His reply cadence on posts is low (1–2 comments per post) but the threads are open — a reply is plausible.
