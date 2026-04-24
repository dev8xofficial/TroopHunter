Based on both documents, here's a direct answer.

## Does the Attorney spec-kit follow GitHub standards?

**Yes — on the dimension that matters most.** The `.github/` automation layer is the most concrete measure of GitHub spec-kit conformance, and Attorney passes it completely. Its five workflows enforce spec template conformance, JSON schema validity, cross-reference integrity, changelog discipline, sensitive data scanning, and PR title conventions. Its four issue templates enforce structured intake for every change type. No other portal kit in the family matches this.

The formal scores from your comparison analysis tell the story clearly:

| Dimension             | Attorney | Notes                                                                 |
| --------------------- | -------- | --------------------------------------------------------------------- |
| GitHub Automation     | **5/5**  | 5 workflows, 4 issue templates — fully implemented                    |
| Repository Structure  | 3/5      | One structural defect (stale root `constitution.md`)                  |
| Constitution Quality  | 4/5      | Rich, 13 sections                                                     |
| Per-Module Artifacts  | 4/5      | 13 files/module — most complete of all portal kits                    |
| ADR Quality           | 4/5      | Verbose, context-rich, 8 records                                      |
| Schemas               | 3/5      | 7 meta schemas; lacks domain-level depth                              |
| Spec Content Quality  | 2/5      | Biggest weakness — `000` and `001` don't follow the template properly |
| Templates & Standards | 4/5      | Detailed, annotated, reusable                                         |
| Research Depth        | 2/5      | Only 2 research files; no competitive analysis                        |

**Standard compliance total: 31/45.** The verdict from your own analysis document: _"Attorney is process-complete, content-incomplete."_

---

## Is it reusable across multiple projects?

The foundation is solid for reuse. The `.github/` layer, template system, and per-module artifact pattern are exactly the kind of portable scaffolding that scales across projects. However, three specific issues need to be fixed before you adopt it as a cross-project template.

**Fix before reusing — critical:**

**1. Delete the stale root `constitution.md`.** There are two constitutions: the root-level one and `.specify/memory/constitution.md`. They have different role vocabulary and different lifecycle stages. Any team onboarding to a new project from this template will read the wrong one. Either delete it or replace it with a symlink pointing to `.specify/memory/` as authoritative.

**2. Rewrite `000-foundation/spec.md` and `001-dashboard/spec.md`.** These two files use technical contract language (JWT fields, SQL-style requirements) instead of the scenario-driven, technology-agnostic format defined in the spec template. Your own CI workflow (`validate-specs.yml`) will flag them on every PR. A new team copying this template inherits broken specs that fail their own validation.

**3. Advance spec statuses from `Draft` to `approved`.** All six modules are still marked `Draft`. A template distributed to future projects should ship with at least the foundation module marked `approved` to signal that the scaffold itself is signed off.

**Fix soon — important for scalability:**

**4. Update `STANDARDS.md`** to explicitly list `plan.md` and `tasks.md` as required module artifacts. They exist in every module but aren't mentioned in the writing standards, so future contributors won't know to create them.

**5. Add `competitive-analysis.md`** to `.specify/research/`. The `user-personas.md` is present and good; the research layer is incomplete without it. When other teams adapt this template, they'll need to know what the research layer is supposed to contain.

---

## Bottom line

The Attorney spec-kit is the **right choice as a reusable template** — it's the only portal kit with complete GitHub automation, the highest per-module artifact count (13 files), and the strongest implementation guidance (`plan.md` + `tasks.md`). The gaps are fixable and well-understood. Address the five items above — particularly the stale constitution and the two non-conforming spec files — and you have a production-ready template that will enforce its own standards automatically across any project that adopts it.
