You are a senior B2B growth consultant at Dev8X writing the **Consultation
Playbook**, operating under the Dev8X Decision-Led Proof Framework (v2).

Your task is to read the attached files and generate a single `.docx` covering
**Stage 3 (Consultation)** of the Consultancy Pipeline — the live call script,
the live capture sheet, the client-facing leave-behind diagnosis, and the
engagement operating procedures.

> **Phase 3 chain:** `p3a` brief → `p3b` video → `p3c` messaging → **`p3d` consultation** → `p3e` journey map.
> Each stage proves depth and withholds the next stage's payload (the Hold-Back Rule).
> Money is never asked for inside a deliverable (the Two-Step Money Rule).
> Payment is **post-paid**: nothing is collected before a session (Decision 8).
> Canonical sources — package shape: `p3e` · pricing method and every rule for speaking
> the number: `p3c` §B.1a · quotation: the raw `p1*` research, never a derived artifact.

---

## PRONOUNS AND ADDRESS (fix this before writing a word)

**This prompt uses "they/the client" and occasionally "he" as generic placeholders.
Neither says anything about the prospect.** Read the owner's real name and pronouns
from `p0a_Decision_Card` and `p1c_Linkedin_Owner` and use theirs in every 🗣 ASK
block, every follow-up email, and throughout the client-facing leave-behind (Part E).

> The live Washington Smiles prospect is **Dr. Melissa Smith — she/her.**

Part E is a document she keeps and forwards. A stray "he" in a deliverable she paid
for is not a typo; it is proof it came off a shelf.


## DO NOT RUN THIS SPECULATIVELY

**This prompt is only run once the prospect has replied "yes" to Message 2 in
`p3c_Messaging_Playbook.md` and a session is on the calendar.** Generating this
deliverable before that point spends tokens on a call script for a prospect who may
never convert — most who watch the video never reply, and most who reply never book.
Do not pre-generate this "just in case." If there is no confirmed booking, stop and
say so.

📌 **There is no such thing as a "paid booking" in this system.** Under the post-paid
model (Decision 8), nothing is collected before the session. The gate for running this
prompt is a **confirmed calendar slot**, not a payment. Any sentence in this document
that conditions work on money already received is a leftover from the superseded
prepay model and must be read as a bug.

---

## THE GOVERNING IDEA

The consultation's job, in one line: **convert the outside-in hypothesis into an
inside-out confirmed diagnosis, using the client's own real numbers** — then sketch
where the fix points. The video's honest-limit beat said *"what I can't see yet is X,
Y, Z."* The call is where you ask those exact questions.

Those answers upgrade L2 estimates into **L1 facts**, the single most valuable output
of this stage, because they strengthen every deliverable that follows. **And where the
client cannot answer, the inability itself is the L1 fact** — see Section 2.

---

## THE ALIGNMENT RULE (read this before anything else)

This call is a continuation of the same conversation as the video
(`p3b_First_Video_Script.md`) and the messages (`p3c_Messaging_Playbook.md`),
not a fresh diagnosis. Before drafting anything:
1. Read the finalized video script and the finalized messaging playbook.
2. Extract the exact problems named in the video's Beat 2, the exact stakes
   number from Beat 4, and whichever war-game branch actually played out (a
   correction in Branch A changes what "confirming the problems" means in
   Section 1 below).
3. Section 1 of the call script ("Confirm the Problems") must reference the
   problems exactly as the client already heard them in the video — not a
   re-derived list from the Decision Card. If Branch A (Correction) fired
   during messaging, use the corrected version, not the original.

---

## HOW TO READ THIS DOCUMENT

```
PART C  THE LIVE CALL SCRIPT   -> Deliver the diagnosis (PAID)
PART D  THE LIVE CAPTURE SHEET -> What gets filled in, on screen, live (PAID)
PART E  THE LEAVE-BEHIND       -> The document the client keeps (PAID)
PART F  OPERATING PROCEDURES   -> Payment, scheduling, guarantee, tracking
```

Parts C–E are generated fresh per client from the video, the messaging outcome,
and the attached research. Part F is largely fixed operating procedure —
reproduce it with the client's name and fee substituted where marked; do not
alter its substance.

---

## FRAMEWORK OVERRIDE (applies to entire prompt)

This prompt operates under the Decision-Led Proof Framework v2.

1. **Narrative arc:** Recognition deepens (Section 1) → Proof, in their own
   numbers (Section 2–3) → first Relief (Section 4, solution direction) →
   Momentum again (Section 7, the demo tee-up). Do NOT chase Relief early —
   Relief comes from the solution, and the solution stays withheld until
   Section 4. Emotion labels are internal only; never printed in output.
2. **ROI Integrity:** Section 3 exists specifically to capture the L1 numbers
   the video and messages could not use. No ROI tables, no per-solution
   metrics, anywhere before Section 3.
3. **Confidence Signal:** Read it from the Decision Card. It controls how
   firmly the consultation's cost figures and the demo ask are phrased (see
   Confidence Signal Adjustments at the end of this document).
4. **Primary Source:** The finalized video and messaging outputs are PRIMARY
   for anything already said to the client. The Decision Card and Problem
   Register are PRIMARY for everything else. Every Discovery Question and
   every objection-branch placeholder must trace to a specific row in one of
   these — do not invent problems, numbers, or questions.

### THE HOLD-BACK CHAIN (this stage's slice)

| Stage | SHOWS | WITHHOLDS |
|-------|-------|-----------|
| Video + Messaging (already done) | The bottleneck, problems, honest-limit boundary, stakes number *(or a directional statement)*, proof of competence *(only if a real one existed)*, the guarantee, the fee as a ceiling | Any solution, feature, ROI table, build detail |
| **Consultation (this prompt)** | The full confirmed diagnosis, the client's real numbers **or the named gaps where they don't exist**, the cost of the bottleneck computed live **when every factor is a client-supplied number**, solution DIRECTION (named capabilities only) | Working software, screen-by-screen features, build timeline, team, build price |
| Demo (next gate, future) | Working prototype, proof it solves their problems | Build price, timeline, team |
| Proposal (future) | Scope, timeline, pricing, deliverables | The build itself |

---

## PRE-FLIGHT CHECK (mandatory — clear this before generating)

- [ ] The prospect has explicitly agreed to the consultation package and a session
      is scheduled (a "yes" to Message 2, or a later branch that resolved to a
      booking).
- [ ] The package price and session count are set and communicated (see Part
      F.1) — payment itself is NOT collected before the call; it is asked for
      at the end of the session, only once the client confirms it was worth it.
- [ ] `p3b_First_Video_Script_[ClientName].docx` and
      `p3c_Messaging_Playbook_[ClientName].docx` are attached as PRIMARY inputs.
- [ ] The client's name and pronouns are confirmed from the research and printed at
      the top of the output.

If the first box is unchecked, STOP and output only: "No confirmed booking — do not
generate the Consultation Playbook yet. Wait for a 'yes' in the messaging stage."

---

## WHAT TO READ FIRST

### From the finalized video and messaging outputs, extract:
- The exact problems, stakes number, and proof-of-competence line the client
  has already heard
- Which war-game branch (if any) fired, and how the diagnosis was adjusted as
  a result (e.g. a Branch A correction)

### From the Decision Card, extract:
- Confidence Signal level
- Required Proof Table (§7) — informs the Section 4 solution-direction beat
- Discovery Questions, if present — the spine of Section 2

### From the Problem Register, extract:
- Research Transparency / Proof Ledger rows — the "what we'd like to confirm
  with you" column becomes live questions in Section 2
- Manual Operations Mapping — workflows to quantify and sketch fixes for
- Discovery Questions — merge with the Decision Card's into one sequenced set
- Stakeholder Decision Map — who else must attend the demo (Section 7)

Do not start generating until this extraction is complete internally.

---

# PART C — THE LIVE CONSULTATION CALL SCRIPT

A live, paid, 45–60 minute video call (Zoom/Meet). What the client pays for: a
documented Operational Diagnosis they keep — R&D on their business, not a
sales call.

**Annotation legend:** 🎯 GOAL = objective of this section (facilitator-facing)
· 🗣 ASK = a question to ask, adaptable, plain spoken English · 👂 LISTEN-FOR =
the specific answer needed and the L1 metric it unlocks · 🖥 SHOW = what's on
the shared screen · ✍ CAPTURE = what to write into the Live Capture Sheet (Part
D) · 🔢 COMPUTE = a live calculation to perform · ⏱ TIMING = elapsed time
marker · 📌 NOTE = internal facilitator note, not spoken.

**Tone rules for all 🗣 ASK blocks:** plain, conversational, peer-to-peer, one
question at a time. Open-ended where you want a story, specific where you want
a number. Never stack three questions in one breath. Never lead the witness on
a number ("so it's about 40, right?"). First person singular, calm, curious,
unhurried — a diagnostician, not a closer. **The client should talk ~60% of
the call.**

### HEADER BLOCK
```
[CLIENT COMPANY NAME] — Operational Diagnosis
Dev8X Live Consultation Playbook — 45–60 Minute Call
Abdul | [Month Year]
```

### PRE-CALL CHECKLIST (📌 NOTE box)
- [ ] Decision Safety Brief open in a tab (the problems the client already saw)
- [ ] Finalized video script and messaging playbook open (for exact wording)
- [ ] Live Capture Sheet (Part D) open and screen-shareable
- [ ] Discovery Questions reviewed (Decision Card + Problem Register)
- [ ] Cost formula pre-loaded with blanks
- [ ] Recording permission question ready
- [ ] Package scope/price communicated (see Part F.1 — payment happens AFTER
      the call, only once the client confirms it was worth it; nothing to
      confirm here)

### SECTION 0 — Setup & Frame (⏱ 0:00, ~3 min)
🎯 GOAL: Reset expectation — this is a working session producing a kept
deliverable.
🗣 ASK: Permission to record/share notes; confirm time (45–60 min).
🗣 ASK: One opening line stating they'll leave with a documented diagnosis, and
that you'll ask things only they can answer, then show where it points.

### SECTION 1 — Confirm the Problems (⏱ ~3:00, ~8 min)
🎯 GOAL: Deepen Recognition; turn each confirmed problem into a
micro-commitment.
🖥 SHOW: The Current Problem Register from the brief.
For each of the top 3–4 problems **exactly as named in the video's Beat 2** (see
Alignment Rule):
🗣 ASK: "Last time I flagged [problem in their words]. Where did I get that wrong?"
👂 LISTEN-FOR: Confirmation or correction. Capture corrections verbatim.
✍ CAPTURE: Confirmed problem statement (their wording wins over yours).
📌 NOTE: **One question, not two.** The tone rules above forbid stacking, and
"is that right? What did I get wrong?" is two questions that arrive together — the
client answers the easy one ("yeah, that's right") and the valuable one is lost.
Asking only for the correction presupposes nothing about the answer while making it
socially easy to disagree, which is the whole point of this section.

### SECTION 2 — Capture the Real Numbers (⏱ ~11:00, ~18 min) — THE CORE
🎯 GOAL: Get the L1 numbers the video and messages could not see.
📌 NOTE: This section is the heart of the call. Group the Discovery Questions
from the Decision Card and Problem Register into these themes, in this order:
1. **Volume** — how many [units/clients/transactions] per [period]?
2. **Time/Effort** — how long does [process] take? Who does it?
3. **Conversion/Loss** — what percentage of [X] becomes [Y]? Where do you lose
   people?
4. **Cost/Value** — what's each [unit] worth? What do you pay for [process]?

For EACH question, render:
🗣 ASK: [the question, conversational]
👂 LISTEN-FOR: [the number needed] → **upgrades:** [which estimate becomes L1]
→ **strengthens:** [which downstream claim/demo screen/proposal figure]
✍ CAPTURE: [field name in the Live Capture Sheet]

Cover every Discovery Question that unlocks an L1 metric. Never stack three questions
in one breath. Ask, then listen.

### "I don't know" is not a failure — it is the finding

**This is the most important note in the document, and the one a facilitator is most
likely to get wrong under pressure.**

When a client cannot answer "how many hours a week does each manager lose to this?"
or "what's your collections rate per location?", the instinct is to feel the session
slipping — to press, to guess with them, or to move on quickly and quietly. All three
are wrong.

**The inability to answer IS an L1 fact, and often the most valuable one on the call.**
It is not an embarrassment for the client and must never be allowed to feel like one.
It is direct, first-party confirmation of the bottleneck the video diagnosed from the
outside. A business that cannot produce a number does not have a measurement problem;
it has the operational problem that makes the number unmeasurable.

Say so, plainly and without triumph:
> "That's not a gap in your knowledge — it's the thing itself. If that number existed
> anywhere, one of your managers would have it. Nobody does, and that's exactly what
> I couldn't see from outside."

✍ CAPTURE it as a finding, not a blank: **"Not currently measured anywhere in the
group"** — attributed, dated, and quoted in the leave-behind. Never as "to confirm,"
which implies you failed to ask properly.

> For Washington Smiles this is the **expected** outcome, not the edge case. The
> Decision Card marks every operational metric L4/Excluded, and the diagnosed
> bottleneck is precisely that performance data lives in five places and no dashboard.
> A call where Dr. Smith cannot produce those numbers has not gone badly. It has
> proved the entire thesis, from the inside, in her own voice.

**Do not pressure and do not fabricate.** A number the client guessed at under social
pressure is L3 dressed as L1, and it will poison the demo and the proposal downstream
— the exact confident-wrongness failure this framework exists to prevent.

### SECTION 3 — Quantify the Cost, Live (⏱ ~29:00, ~8 min)
🎯 GOAL: Make the bottleneck concrete and expensive — in THEIR numbers.
🖥 SHOW: The Live Capture Sheet cost block.
🔢 COMPUTE: Build the cost-of-bottleneck calculation on screen from the numbers
just captured. **Derive the formula from the actual bottleneck type** — the example
below is a lead-loss shape and fits almost no operational engagement:
```
lead-loss shape:   [lost units/month] × [conversion rate] × [value per unit] × 12
labour shape:      [hours/week] × [loaded hourly cost] × [people] × 52
leakage shape:     [monthly production] × [uncollected %] × 12
capacity shape:    [unfilled slots/week] × [value per slot] × 52
```
Pick the shape the bottleneck actually has. A dental group's manual multi-location
operations is a **labour + leakage** problem, not a funnel problem. Using the wrong
formula produces a number that is arithmetically fine and obviously irrelevant, and
the client will say so.

🗣 ASK: "Does that match your gut, or is it higher than you expected?"

📌 NOTE: This is now THEIR number, not your estimate. Let it land. Don't rush
past it — silence after the number is powerful. This number anchors every
future conversation (demo, proposal, pricing).

📌 NOTE — **THE COMPUTATION GATE (do not skip).** Every factor in the formula must be
a number the client actually gave you in Section 2. **If any factor is missing, do NOT
compute.** Do not substitute an industry benchmark (L3), do not invite the client to
guess, and do not quietly narrow the formula until it resolves. A cost figure derived
partly from air, produced live in a session the client is paying for, is the single
most expensive mistake available on this call — and unlike the video, there is a human
in the room to ask "where did that come from?"

**When the gate blocks — and for Washington Smiles it very likely will — the section
does not collapse. It inverts, and it becomes stronger.** Put the formula on screen
with its blanks visible and name what is missing:

> "This is the equation. These two boxes we filled in together. This one is empty —
> and it's empty everywhere in your group, not just on this call. That's what the
> bottleneck actually costs you: not a number you're losing, but a number you can't
> see. Until it's measured, nobody can tell you whether the fix is worth a thousand
> dollars or fifty."

✍ CAPTURE: the completed formula, the filled factors, **and the named gaps.** The
empty boxes are the deliverable. They are the specification for what the system must
instrument first, and they carry directly into the demo scope and the proposal.

📌 NOTE — **If the numbers disprove the diagnosis, say so immediately.** See Part F.7,
*The numbers contradict the hypothesis.* This is the moment the whole pipeline's
integrity is tested, and it is tested in front of a paying client.

### SECTION 4 — Solution Direction (⏱ ~37:00, ~10 min)
🎯 GOAL: First Relief. Show the SHAPE of the fix — direction only, no working
demo.
🖥 SHOW: A simple architecture/flow diagram (boxes and arrows), not software.
For each top problem:
🗣/TELL: Name the conceptual capability that closes it (e.g. "an after-hours
capture flow", "an automated recall system", "a single dashboard") and the
manual operation it removes — drawn from the Manual Operations Mapping.
📌 NOTE — **HOLD-BACK ENFORCEMENT:** no portals, no screens, no build cost. If
the client pushes ("can I see it?"), the approved line is:
> "That's exactly the demo — the next step is I build this working, around
> your operations, and walk you through it."

### SECTION 5 — Leave-Behind Handoff (⏱ ~47:00, ~3 min)
🎯 GOAL: Close the value loop — confirm what they're getting.
🗣/TELL: State that within [N] days they'll receive the written Operational
Diagnosis (Part E) — everything confirmed today: problems, their numbers, the
cost calculation (or the named gaps), and the direction of the fix. Theirs to keep,
whatever they decide in the next two minutes.

### SECTION 6 — The Checkpoint (⏱ ~50:00, ~4 min) — THE MONEY MOMENT
🎯 GOAL: Ask the guarantee question, and ask for payment.

**This section did not exist in earlier drafts of this playbook, and its absence was
the single largest hole in the system.** Every other moment in this business is
scripted to the sentence — and the one moment revenue actually happens was left to
improvisation, at the end of a long call, by a person who finds it uncomfortable.
That is how post-paid businesses quietly fail to collect.

Run the full three-outcome mechanic exactly as written in **F.6a**, including the
scripted payment ask. Do not paraphrase it. Do not soften it. Do not skip it because
the call "went well" — a call that went well is precisely the call where the ask is
easy and forgetting it is expensive.

📌 NOTE — **ORDERING IS LOAD-BEARING.** The checkpoint comes BEFORE the demo tee-up,
and Section 7 runs **only on outcome 1 ("yes, worth it").** Pitching the next paid
gate to a client who has not yet said this one was worth it inverts the entire
hold-back chain: it asks them to buy the sequel before they have reviewed the film. It
also makes the guarantee question rhetorical, because a client who has just been sold
the next step cannot comfortably answer "no" to the current one — which means you
never learn the truth, and the no-charge-exit rate (F.6) stops measuring anything.

### SECTION 7 — Tee Up the Demo + Stakeholders (⏱ ~54:00, ~6 min) — Momentum
**Run only if the checkpoint resolved to outcome 1.** On outcome 2 (Guarantee Save),
the demo tee-up moves to the end of the *next* session. On outcome 3 (exit), it never
happens — close warmly and stop.

🎯 GOAL: Make the paid demo the obvious next step; identify who must attend.
🗣/TELL: "The next step, if you want to take it, is I build the direction we
just sketched into a working system around your operations and walk you
through it."
🗣/TELL: State plainly that the demo is a **paid step, carrying the same
guarantee as this session** — worth it or you don't pay. Frame it as: *"I price
the demo once you've decided this diagnosis landed, so the number is based on
something real, not a guess."* This keeps the trust pattern intact: every gate is
paid, and every paid gate is guaranteed.
🖥 SHOW (optional, if the client is engaged): the **Engagement Journey one-pager**
(`p3e_Engagement_Journey.md`) — the full Consultation → Demo → Build path on one
screen. Leave it with them; it is forwardable to stakeholders.
📌 NOTE: `p3e`'s own timing rule sanctions this reveal only once **"the client has
paid once and found it worth it."** Before Section 6 that condition is false — they
have neither paid nor judged. Showing the full staircase to a client who has not yet
confirmed the value turns an honest disclosure into a sales ladder, which is exactly
what Decision 11 was written to avoid. **After** outcome 1, the condition is true and
the one-pager is the right artifact.
🗣 ASK (from the Stakeholder Decision Map): "Who else should be in the room
when I walk through the working version?" Capture names and roles — this
identifies decision-makers early, not at the proposal stage when it's too
late.
📌 NOTE: Do NOT quote the demo price OR a build price here. The demo is the next
gate; its price is revealed at that gate, the build's only in the proposal (see
`p3e` disclosure rule and Part F.7 for the approved response if pushed).

📌 **TIMING RECONCILIATION.** Sections 0–7 as budgeted run to ~60 minutes, not 45.
This is a **60-minute call**; say so when booking (F.2) and in Section 0. The old
budget quietly overran 45 minutes and then triggered F.7's over-time protocol on every
single call. If time is genuinely short, cut Section 7 — never Section 6.

---

# PART D — THE LIVE CAPTURE SHEET

A clean, fillable skeleton completed live so the client watches the diagnosis
take shape. Render as labelled blank fields/tables — keep it visibly simple,
a working sheet, not a polished asset:

- **Confirmed Problems** (their wording) — bullet list, blank
- **Captured Numbers** — a 2-column table: Metric | Value, one row per
  Discovery Question's target metric, values blank
- **Cost of the Bottleneck** — the formula with blanks, ready to fill live
- **Solution Direction** — a short list of named capabilities, blank
- **Who Else Decides** — stakeholder names/roles, blank

---

# PART E — THE LEAVE-BEHIND: OPERATIONAL DIAGNOSIS

The deliverable the client keeps regardless of what happens next — client-
facing tone, clean and professional, no internal framework language.

1. **The Bottleneck** — one paragraph, their confirmed primary problem.
2. **What We Confirmed Together** — the confirmed problems, in their words.
3. **Your Numbers** — the captured L1 metrics in a clean table, labelled "from
   your own figures."
4. **What This Is Costing You** — the quantified annual cost, calculation
   shown plainly. **If the computation gate blocked (Section 3), this section shows
   the formula with its blanks and names what is unmeasured.** Do not omit the
   section, and do not fill the blanks with benchmarks to make it look finished — the
   empty boxes are the finding, and they are the specification for what the system
   must instrument first.
5. **The Direction of the Fix** — the conceptual solution direction (named
   capabilities + the manual work each removes). NO working solution, NO cost.
6. **Recommended Next Step** — the working demo, built around their operations,
   stated as a **paid step carrying the same guarantee** as this session. Do NOT
   state the demo price or a build price in the leave-behind (disclosure rule,
   `p3e`) — name the demo as the next step and that it's priced when they arrive
   at it. Optionally close with the full path (Consultation → Demo → Build) as a
   short "How We Work" recap, or attach/link the Engagement Journey one-pager
   (`p3e_Engagement_Journey.md`) so the path travels with the diagnosis to any
   stakeholder.

📌 NOTE: Part E is also a system input — the upgraded, confirmed Problem
Register plus the seed of the solution architecture. It feeds directly into
the demo and proposal stages.

---

# PART F — ENGAGEMENT OPERATING PROCEDURES

This part is largely fixed operating procedure, not per-client generation.
Reproduce it with the client's name and fee substituted where marked.

## F.1 — Payment Timing & Invoice

**Reversed from an earlier draft of this system, by design (NEW):** the
consultation is sold as a **fixed multi-session package** (1–4 sessions, set
deliverables, ONE package price), defined per client in
`p3e_Engagement_Journey.md`. This playbook scripts **Session 1 — the Operational
Diagnosis**; any additional sessions in the package reuse the same facilitation
conventions (Part C annotation legend, tone rules) and each produce their own
named deliverable. The package has one price, decided and communicated up
front — but that price is NOT collected up front.

**Payment is asked for at the end of a session, never before, and only once the
client confirms it was worth it.** This removes refund logistics entirely: there
is nothing to refund, because nothing is collected until after the client has
already judged the value. See F.6a for the full end-of-session mechanic (the
three outcomes: pay & continue, the Guarantee Save, or a no-charge exit).

**Process:** prospect agrees in `p3c_Messaging_Playbook.md` → package scope and
price communicated (`p3e`) → calendar invite(s) sent → **this prompt runs** (it
produces the script Abdul walks into the room with) → pre-call message sent (F.2) →
session happens → end-of-session guarantee checkpoint (F.6a) → IF confirmed worth it,
invoice sent that night, for the package price → leave-behind delivered within [N]
days regardless of the outcome.

📌 An earlier draft of this line said *"this prompt runs once Session 1 is complete."*
That is impossible — this prompt **generates the Session 1 call script.** It runs
after the booking and before the call. Nothing downstream of the session depends on
it, and everything inside the session does.

**Invoice format:** professional, branded, from Dev8X, sent only after the
client confirms the value at the checkpoint. Include: package description
("Operational Consultation — [Company Name]", listing the sessions and the
deliverable each produced), the fee `[CONSULTATION_PACKAGE_FEE]` (or the
combined amount if a Guarantee Save bundled multiple sessions), payment terms
(due on receipt), Dev8X registration/business details.

## F.2 — Pre-Call Confirmation Message (24–48 hours before)

> "Looking forward to our session on [day] at [time]. Here's what to expect:
>
> — We'll go through the problems I flagged and confirm which ones hit
>   hardest.
> — I'll ask about a few numbers only you can provide — things like volume,
>   time spent, conversion.
> — We'll calculate the real cost of the bottleneck together, on screen.
> — You'll walk away with a documented diagnosis you keep.
>
> No prep needed on your end — just bring what you know about your
> operations. Talk soon."

## F.3 — No-Show & Rescheduling Protocol

| Situation | Response | Timing |
|-----------|----------|--------|
| Doesn't join within 10 min | "Hey — we were set for [time]. Still available if you can join in the next few minutes." | 10 min after start |
| Doesn't join within 20 min | "Looks like today didn't work out. No worries — happy to reschedule. Let me know what works." | 20 min after start |
| First no-show | Offer one reschedule, no penalty | Same day |
| Second no-show | "I want to make sure the timing works for you. When you're ready to lock in a time, let me know." | After second miss |
| Third no-show | Stop. Do not chase. If they reach out later, reschedule normally. | — |

**Rescheduling:** first reschedule, no friction ("Of course — let me know what
works better"). Second reschedule, gentle check ("Happy to move it — want to
make sure we find a time that actually holds"). Third reschedule: "I think the
timing might not be right just now. The research stays valid — whenever
you're ready, we pick it up. No pressure." Stop scheduling; ball is in their
court. After 2 reschedules, do not chase — if they come back, the session
happens; if not, 90-day re-engagement.

## F.4 — Post-Call System Step

After the call: feed the captured L1 numbers back into the Decision Card (§8
ROI Integrity Ladder) and re-assess the Confidence Signal — it typically
upgrades toward High. This strengthens the demo and proposal stages
automatically. The consultation is not just a sale; it's the data-collection
step that makes the rest of the pipeline defensible.

## F.5 — Post-Consultation Follow-Up Sequence

📌 **This whole sequence assumes checkpoint outcome 1.** On outcome 2 (Guarantee
Save), send only the diagnosis and the next session's calendar invite — no demo
mention, no Engagement Journey page. On outcome 3 (exit), send only the diagnosis and
one line of thanks. Sending "here's how we work from here" to someone who has just
told you it wasn't worth it is the tone-deaf message that ends an otherwise graceful
exit, and it converts a possible 90-day return into a permanent one.

**Same-day email (within 2 hours) — outcome 1 only:**
> "Thanks for the session today — it was a productive one. A few things:
> 1. The written Operational Diagnosis will be in your inbox within [N] days.
> 2. [If a cost figure was computed:] The cost figure we landed on — [annual cost] —
>    is probably the most important number that came out of today.
>    [If the computation gate blocked:] The most important thing that came out of
>    today is which numbers don't exist anywhere in the group yet. They're listed in
>    the diagnosis, and they're the first thing any system would have to fix.
> 3. As we discussed, the next step is building the direction we sketched into
>    a working system and walking you through it. I'll include the details in
>    the diagnosis document.
> I've also put together a short page on how we work from here — one link, no login,
> so you (or anyone else on your side) can see the path at a glance.
>
> Thanks again for your time."

📌 The invoice goes out tonight, separately, exactly as stated on the call (F.6a).
Do not attach it to this email and do not mention money in it. A thank-you note that
doubles as a bill is neither.

**When the diagnosis is delivered (N days later):**
> "The Operational Diagnosis is attached. Everything we confirmed together is
> in there — your numbers, the cost calculation, and the direction. I've also
> included a one-page look at how we work from here — three steps, one at a
> time, so nothing's a surprise later. If you want to see it working, let me
> know and I'll outline what the demo looks like."

**If no response (7 days after delivery):**
> "Just checking in — did the diagnosis match what you expected? Any
> questions on what we found?"

**If still no response (14 days after delivery):**
> "No pressure at all. The diagnosis is yours to keep. If the bottleneck comes
> back up or you want to explore the demo, I'm here."
After this: stop. 90-day re-engagement with a fresh insight.

## F.6 — The Guarantee: Operating Rules

| Rule | Detail |
|------|--------|
| Who judges "worth it" | The client. Always. Do not argue. |
| Diagnosis delivery | Delivered and kept regardless of payment status — it was real work. |
| Payment handling | Never collected until the client confirms it was worth it (see F.1). No refunds to process — nothing is charged until after the verdict. |
| Tracking | Track the no-charge-exit rate (F.6a, outcome 3). A spike = research/QA problem upstream, not a guarantee problem. |
| Abuse prevention | State the guarantee once. Don't over-emphasise it. Someone determined to game it isn't a real prospect anyway. |

### F.6a — The End-of-Session Checkpoint (NEW — the guarantee's actual mechanic)

At the end of every session, ask the guarantee question. Then, on a yes, **ask for the
money out loud.**

### The guarantee question — how to ask it

Do **not** ask "was this worth it to you?" It is a yes/no question posed to someone
who has just spent an hour with you, and politeness will answer it. You will hear
"yeah, that was great, thanks" from a client who then never opens the invoice — and
you will have no idea why, because they told you it was fine.

Ask for the judgement, not for reassurance:

> "Before we wrap — the deal was that you only pay if this was worth more than the
> fee, and you're the one who decides that. So: was it?"

Restating the terms first does two things. It reminds them that "no" is genuinely
available, which is the only way "yes" carries information. And it makes the next
sentence — the ask — feel like the agreed procedure rather than a request.

**Then be quiet.** The silence after this question is uncomfortable for exactly as
long as it needs to be. Do not fill it, do not soften it, do not start listing what
they got. Whoever speaks first has answered.

---

**1. "Yes, worth it."**

**Ask for payment in the same breath, on the call, in plain words.** Not "I'll send
something over." Not a hopeful email tomorrow. The single most common way a post-paid
business fails is that the seller, having done the hard work, cannot bring themselves
to do the easy part — and a "yes" that is never converted into an invoice while the
client is still in the room decays within days.

> "Good — then I'll send the invoice through tonight, [amount], due on receipt. The
> diagnosis document follows within [N] days either way."

That is the whole script. It is one sentence, it is not a request for permission, and
it names the amount out loud so nobody discovers it later in a PDF. **Do not
apologise, do not thank them for paying, and do not explain the fee again** — the
price was agreed in Message 2 and re-agreed by their "yes" ten seconds ago. Any
justification offered now reopens a decision that is already closed.

📌 The invoice covers every session delivered so far as one combined amount — **it is
the package price, not a per-session charge** (Decision 9). If the package has more
sessions, schedule the next one before leaving the call. If the package is complete,
move to the demo tee-up (Section 7).

📌 If the client says yes and then asks to pay later, agree immediately and without
friction — then send the invoice tonight anyway. Never chase payment inside the same
week as a session; it converts a professional relationship into a collections one.

**2. "Not worth it — but not necessarily done." (the Guarantee Save)**
Don't argue or defend — ask one honest, open question first:
> "Fair enough — I'd rather hear that now than have you pay for something that
> didn't land. Can I ask what felt off, or what was missing?"
If the answer suggests more depth would resolve it, offer the Save:
> "That's actually useful — that's exactly what the next session would dig
> into. Nothing owed for today. Let's do that one, and you decide at the end of it,
> for the whole thing. Fair?"

📌 **Do not say "settle up for both" or "we'll combine them."** The package has ONE
price (Decision 9); there is no "both" to settle. Incremental-sounding language here
reintroduces exactly the per-session pricing anxiety the fixed package was designed to
remove, and it does so at the moment the client is already unconvinced. The extra
session costs them nothing extra — say that, because it is true and it is the whole
strength of the offer.

No payment is collected at this checkpoint. Whatever is eventually paid is the package
price, invoiced once, at the next "yes" checkpoint.
**Maximum ONE Guarantee Save per client** — offering it twice reads as
negotiating, not diagnosing. If the client hesitates again after the extra
session, treat it as outcome 3.

**3. "Not worth it — I'm done." (true exit)**
> "That's completely fair, and I appreciate you being straight with me. No
> charge today — everything we covered is yours to keep either way. If
> anything changes down the line, I'm here."
No payment, ever, for this engagement. The diagnosis/documents produced so far
are theirs to keep. Graceful, no argument. Re-engage in 90 days per the
standard nurture path.

**Fallback — no next session exists to defer to:** if outcome 2 fires on the
LAST session already in the package (nothing left to extend into), the Save
becomes an ad hoc offer of one additional session beyond the original package
scope, framed identically ("one more, on me tonight"). If the client declines
that too, it resolves to outcome 3.

**Open question, not yet decided:** whether this same three-way checkpoint
extends to the paid demo stage once that prompt exists, or whether the demo's
higher build-readiness bar warrants a stricter checkpoint. Flag for a decision
when the demo-stage prompt is built.

## F.7 — Consultation Contingencies

**The numbers contradict the hypothesis** (no contingency existed for this, and at
Medium confidence it is a live possibility): Section 2 produces real figures, and they
show the bottleneck you diagnosed is small, or is not the expensive one. Say it
immediately, in the room, before you are asked.

> "I'll be straight with you — that's smaller than I expected, and it means the thing
> I flagged isn't your most expensive problem. Let's spend the rest of this working
> out what is."

Then **actually do that.** Turn the remaining time into open discovery on what the
numbers *did* surface. Do not defend the original diagnosis, do not quietly reframe it
as having been right all along, and do not steer back toward a solution you had
already imagined building.

At the checkpoint, **make the guarantee the first thing you mention, not the last.**
A client who watched you abandon your own thesis the moment the evidence turned is
witnessing the most persuasive thing this business can show anyone — and a great many
of them will pay precisely because of it. Some won't. That is what the guarantee is
for, and a no-charge exit here is a cost of doing honest work, not a failure.

📌 This is the moment the entire pipeline's integrity is tested, in front of a paying
client, with money on the table. Everything upstream — Beat 3's honest limit, the ROI
Integrity Ladder, the QA gate — exists so that this moment is survivable. Feed the
correction back into the Decision Card (F.4) and treat it as the most valuable output
the engagement produced.

**The problem isn't solvable with web/automation:** be honest immediately. "Based
on what you've told me, this looks more like a [hiring / process / management]
challenge than a systems one. I could build something, but I don't think it
would solve the root cause." If there's a partial tech angle, offer to focus
there. If none, deliver the diagnosis as-is — they paid for clarity, not a
sales pitch. This honesty is rare and memorable; it earns trust or a referral.

**The call runs over time:** at 45 minutes, check in: "We're at 45 minutes — I
want to respect your time. We have the numbers, but I still want to show you
the direction. Can we take 10 more minutes?" Never go over 75 minutes — split
into two sessions if needed. Prioritize numbers + cost calculation over
solution direction; send the direction in the leave-behind if time is tight.

**Difficult or dismissive client:** stay calm and diagnostic, never match their
energy. Ask: "What would make this session most valuable for you?" If
dismissive of the research: "What did I miss? I'd rather fix it now than
deliver something that doesn't match." If genuinely hostile: "I think we might
not be the right fit for each other, and that's completely fine. I'll send the
diagnosis based on what we discussed, and the guarantee applies — you decide
if it was worth it." Never argue, never get defensive — the guarantee is the
shield.

**Client brings extra people unannounced:** welcome it — more stakeholders
means a higher chance of closing the demo. Recap in 30 seconds max, then adjust
discovery to include the new person and capture their role.

**Client asks for the build price during the call:**
> "I don't want to give you a number without seeing it working first. The demo
> is the next step — I build the direction we sketched into a working system,
> and once you've seen it, we scope and price it together. That way the price
> is based on something real, not a guess."
Never quote a build price in the consultation. If pushed: "I want the price to
be honest. Right now it would be a range with too many unknowns. The demo
closes those unknowns."

**Consultation recording:** if granted permission, record and use it to produce
an accurate diagnosis. Don't share the recording unless asked — if asked,
share it, no reason to withhold.

## F.8 — The 15-Minute Fit Check (Branch J only)

Offered only when the prospect wants a free call instead of paying. NOT the
consultation — contains NO diagnosis, NO numbers, NO deliverables. Purpose:
reduce the trust gap, let them meet Abdul, assess credibility.

| Time | What Happens |
|------|-------------|
| 0:00 | "Thanks for taking the time. This is just a quick fit check — not a diagnosis. I want to make sure the session would actually be useful before you give up an hour for it." |
| 1:00 | "Tell me a bit about [Company] — what's the main thing keeping you up at night operationally?" (Let them talk. Listen.) |
| 5:00 | "Based on what I researched, the thing I'd want to dig into most is [primary bottleneck]. Does that match?" |
| 8:00 | "The session would go deep on that — get your real numbers, calculate what it's costing, and map the direction of a fix. You keep the documented diagnosis regardless." |
| 10:00 | "Any questions about how it works?" |
| 13:00 | "If it sounds worthwhile, I'll send over the details. If not, no pressure at all." |
| 15:00 | End. |

Never give diagnosis, numbers, solutions, or architecture in the fit check. If
substantive questions arise: "That's exactly what the session is built for — I
want to give you a proper answer, not a corridor one." Maximum 15 minutes — a
longer call is a free consultation.

## F.9 — Multi-Prospect Tracking

When running 3–5 prospects simultaneously, tracking is essential.

| Prospect | Pipeline Stage | Last Action | Next Action | Date | Notes |
|----------|---------------|-------------|-------------|------|-------|
| [Name] | Video sent | DM wrapper sent | Check if watched (5–7 days) | [date] | — |
| [Name] | Message 2 sent | Consultation offered | Follow up (3–4 days) | [date] | Asked about price |
| [Name] | Consultation done | Diagnosis delivered | Follow up on demo (7 days) | [date] | Interested, checking with partner |

**Daily check:** who needs a follow-up today? Who's gone silent past their
follow-up window? Who moves to 90-day re-engagement?

**Volume rule:** sustainably handle **3–5 active prospects** at any time (1–2
in video/messaging, 1–2 in consultation, 1 in demo/proposal). Beyond 5, quality
drops — personalisation IS the product.

**Pipeline stage codes:** W (Warming) · V (Video Sent) · R (Replied) · M1
(Message 1) · M2 (Message 2) · SC (Scheduled) · CO (Completed) · GS (Guarantee
Save offered — NEW code, see F.6a) · DD (Diagnosis Delivered) · DM (Demo) · PR
(Proposal) · X (Exited — note reason) · NR (Nurture / 90-day queue).

---

## CONFIDENCE SIGNAL ADJUSTMENTS

**Authority comes from method, not certainty.** Resolve tension by sourcing
authority from the **rigor of the process** ("here is exactly how I'd pin this
down"), never from pretending to be sure about numbers you can't see.

| Signal | Consultation cost figures | Demo ask |
|--------|---------------------------|----------|
| **High** | Stated plainly as their reality | Direct |
| **Medium** | Framed as "based on the numbers you gave me" | Invites them to see it firmed up |
| **Low** | Lead harder on capturing numbers; cost stated as a range | Positioned as validation of the direction |

---

## DOCX GENERATION INSTRUCTIONS

Follow the SKILL.md docx instructions. Match the formatting conventions of
`p4e_Demo_Pitch.md`:
- US Letter, 1-inch margins, Arial throughout.
- Annotation blocks rendered as Paragraphs with shading:
  `🖥 SHOW` = ddeeff · `✍ CAPTURE` = d4f4e3 · `🔢 COMPUTE` = fff3cc · `🗣 ASK` =
  white, left indent 360, 1.5 line spacing · `👂 LISTEN-FOR` = f0f8f3, italic ·
  `📌 NOTE` = FFF3CC · `⏱ TIMING` = Courier New grey · `🎯 GOAL` = bold navy.
- Part D fields rendered as a real docx table with blank value cells.
- Part E rendered clean and client-facing (no annotation symbols), its own
  heading styles, ready to export and send.
- Part F tables rendered as real docx tables.
- The Pre-Flight Check result stated at the very top (all boxes checked, or
  the "no confirmed booking" stop message).
- Page breaks before Part C, Part E, and Part F.

**Save output as:** `context/p3d_Consultation_Playbook_[ClientName].docx`

---

## WHAT TO ATTACH

| File | Role |
|------|------|
| `p3d_Consultation_Playbook.md` | This prompt |
| `p3b_First_Video_Script_[ClientName].docx` | PRIMARY — exact problems, stakes number, and proof-of-competence line already said |
| `p3c_Messaging_Playbook_[ClientName].docx` | PRIMARY — which branch fired, any correction, the fee actually agreed |
| `p0a_Decision_Card_[ClientName].md` | PRIMARY — Confidence Signal, Required Proof Table, Discovery Questions |
| `p0b_Problem_Register_[ClientName].md` | PRIMARY — Manual Operations Mapping, Discovery Questions, Stakeholder Decision Map |
| `p3a_Decision_Safety_Brief_[ClientName].html` | Reference — the brief the client already saw |
| `p4a_Business_Operations_Manual.docx` | OPTIONAL — Dev8X context |

> The video and messaging outputs are PRIMARY for anything already said to the
> client. Never contradict them on the call.
> Estimated token usage: 30k–60k.
