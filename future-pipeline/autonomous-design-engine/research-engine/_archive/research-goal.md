The core idea I'd communicate to Claude or GPT-4o is **not** "build a folder of research documents." It's **"build a permanent research capability for ADE."** The documents are only the implementation. The capability is the goal.

Here's the explanation I would give.

---

# Why We Are Building a Research Engine

ADE is not a normal software project.

It is a system whose objective is long-term autonomous design.

That means its architecture will continue evolving for years.

As the system grows, new failure modes will appear, new research questions will emerge, models will improve, better techniques will be invented, and assumptions that were once correct may eventually become wrong.

If research is performed ad hoc, the knowledge gained from each investigation is fragmented, inconsistent, difficult to reproduce, and eventually forgotten.

We therefore need a permanent research subsystem.

The Research Engine exists to make research itself a first-class capability inside ADE.

Just as ADE has a Generator, Critic, Eyes, Library, Orchestrator, and Learning system, it should also have a structured system dedicated to continuously improving the architecture itself.

The Research Engine is therefore responsible for discovering weaknesses, validating assumptions, exploring alternatives, importing knowledge from other domains, and proposing evidence-based improvements while preserving architectural consistency.

Its purpose is not implementation.

Its purpose is architectural evolution.

---

# What Kind of Research This Engine Performs

The engine is not limited to one subject.

It should be capable of investigating **any aspect of ADE**.

Examples include:

* Architecture
* Generator
* Critic
* Vision (Eyes)
* Learning
* Memory
* Library
* Orchestration
* Multi-agent coordination
* Evaluation
* Benchmarks
* Autonomy
* Prompt engineering
* Failure handling
* Scaling
* Performance
* User interaction
* Human oversight
* Future capabilities

Every subsystem should eventually have its own research playbook.

The engine should therefore be domain-independent rather than architecture-specific.

---

# The Core Goal

The objective is **not simply to answer questions**.

The objective is to determine whether the current architecture is actually the best architecture we can build.

Research should continuously ask questions like:

* Is this subsystem fundamentally correct?

* What assumptions are we making?

* Which assumptions have never been tested?

* Where can the system break?

* Which failure modes remain undiscovered?

* Are we solving symptoms instead of causes?

* Does another field already solve this better?

* Is there a fundamentally simpler architecture?

* What would an expert disagree with?

* What happens at ten times the current scale?

* Which parts create unnecessary orchestration?

* Which parts limit autonomy?

The objective is continuous architectural improvement.

---

# The Engine Must Think Like a Research Team

One AI should never perform the entire investigation alone.

Instead, research should simulate an actual research organization.

Different roles examine the same problem from different perspectives.

For example:

Architect

Reconstructs the system.

Explains how it works.

Identifies assumptions.

---

Advocate

Builds the strongest possible argument that the current architecture succeeds.

Attempts to prove the design is correct.

---

Skeptic

Attempts to falsify everything.

Searches for weaknesses.

Looks for hidden assumptions.

Challenges conclusions.

---

Cross-Domain Researcher

Searches outside software engineering.

Imports ideas from:

* biology
* economics
* architecture
* control theory
* robotics
* neuroscience
* aerospace
* distributed systems
* organizational design

The goal is discovering ideas ADE would never invent internally.

---

Failure Analyst

Assumes the system has already failed.

Works backwards.

Asks:

"What caused this?"

---

Systems Thinker

Looks at interactions rather than components.

Searches for:

* bottlenecks
* feedback loops
* hidden dependencies
* emergent behavior
* scaling problems

---

Synthesizer

Collects evidence.

Resolves disagreements.

Produces the final architectural assessment.

---

Research Coordinator

Ensures methodology is followed.

Maintains consistency.

Tracks evidence.

Prevents duplicated work.

---

This multi-agent process mirrors ADE's own architecture.

The Research Engine should therefore embody the same philosophy that ADE uses internally.

---

# Research Should Behave Like Science

The engine should never begin with conclusions.

It should begin with curiosity.

Every investigation should follow roughly this flow:

Understand

↓

Reconstruct

↓

Question

↓

Challenge

↓

Compare

↓

Search other disciplines

↓

Collect evidence

↓

Debate

↓

Synthesize

↓

Recommend

↓

Validate

↓

Integrate

This is fundamentally different from asking an AI:

"Review my architecture."

---

# Evidence Must Matter

The engine should distinguish between:

Facts

Evidence

Observations

Reasoning

Opinions

Speculation

Hypotheses

Unknowns

Recommendations

Every conclusion should explain:

Why do we believe this?

What evidence supports it?

How confident are we?

What assumptions remain?

What could disprove this?

---

# Research Must Improve the System

Research is not documentation.

Research changes ADE.

Every completed investigation should eventually produce:

Confirmed assumptions

New failure modes

Architectural improvements

New benchmarks

New experiments

New implementation ideas

New research questions

Documentation updates

Rejected ideas

Future work

Research therefore becomes part of ADE's evolution.

---

# The Engine Must Search Beyond ADE

One of the biggest goals is preventing architectural isolation.

The engine should actively ask:

Has another discipline already solved this problem?

Possible inspiration sources include:

Operating systems

Compilers

Distributed systems

Large-scale databases

Aviation

Medicine

Scientific research

Control systems

Robotics

Military planning

Manufacturing

Industrial engineering

Evolution

Biology

Economics

Architecture

Cognitive science

Machine learning

Organizational design

ADE should continuously absorb the best ideas from other domains.

---

# The Engine Must Prefer First Principles

Research should avoid:

"We've always done it this way."

Instead it should ask:

Why?

Could this disappear?

Could this be simplified?

Is this necessary?

What constraint created it?

Does the constraint still exist?

This keeps ADE from accumulating unnecessary complexity.

---

# Research Must Continuously Reduce Complexity

The engine should not only discover missing features.

It should also remove unnecessary architecture.

Every investigation should ask:

Can this subsystem disappear?

Can two components merge?

Can orchestration be reduced?

Can fewer agents achieve the same result?

Can this become deterministic?

Can this become a reusable capability?

Better architecture is often simpler architecture.

---

# The Engine Must Think Long-Term

Every recommendation should consider multiple horizons:

Immediate implementation

Medium-term scalability

Long-term autonomy

Future model improvements

Future research opportunities

Architectural maintenance

The engine should optimize for ADE five years from now, not just the next implementation milestone.

---

# Success Criteria

The Research Engine succeeds when it consistently produces investigations that:

* uncover previously unknown weaknesses,
* challenge architectural assumptions,
* discover better approaches,
* reduce unnecessary complexity,
* improve autonomy,
* improve robustness,
* improve scalability,
* improve maintainability,
* remain evidence-driven,
* and continuously strengthen ADE through disciplined architectural evolution.

---

## The philosophy in one sentence

> **The Research Engine exists to ensure that ADE never stops questioning itself. It provides a disciplined, evidence-driven mechanism for continuously discovering weaknesses, validating assumptions, importing knowledge from other disciplines, and evolving the architecture toward greater autonomy, simplicity, robustness, and long-term excellence.**

That philosophy should drive every document in the `research/` directory. The folder structure, methodologies, prompts, playbooks, and templates are all implementation details of this overarching capability.
