# 10e — Failure Modes: Security, Legal, Production Parity & Operations

> Part of the failure-mode catalogue. **Start at [10-failure-modes.md](./10-failure-modes.md)** for the index, mitigation primitives (MP-n), and how to use this document — this file holds the full 8-field entries added in the pre-implementation **red-team pass (v0.3)**: everything that matters before this ships, scales, or runs unattended, but wasn't covered by the original design-quality/loop-mechanics catalogue.

---

## Security

### F-SEC-01 — Untrusted code execution in the render harness
**Level:** impl · **Severity:** High · **Area:** Security
- **Description:** The harness renders model-generated `.tsx` — it **executes untrusted code** on the build machine; a malicious or hallucinated component can run arbitrary JS (network, resource abuse, tooling-mediated file access).
- **Root cause:** Generated code is executed without isolation; the harness is implicitly trusted.
- **Detection:** Unexpected outbound network during a render; anomalous CPU/file activity; static scan of candidates.
- **Impact:** Machine compromise, data exfiltration, poisoned screenshots.
- **Mitigation:** Treat all generated code as untrusted — network-isolated, resource-capped, ephemeral sandbox, no secrets in scope [MP-14]; import/resource allowlist [MP-16].
- **Recovery:** Kill the sandbox; discard the candidate; rotate any exposed secret.
- **Validation:** Inject a component that attempts `fetch`/exfiltration; assert the sandbox blocks it.

### F-SEC-02 — Indirect prompt injection via references or retrieved memory
**Level:** spec+impl · **Severity:** High · **Area:** Security
- **Description:** Injected instructions arrive not in the brief (F-INP-06) but inside a **reference image** (embedded text) or a **retrieved Library entry**, and the Generator/Critic obey them.
- **Root cause:** Soft inputs (refs, memory) are trusted as data but can carry adversarial instructions; only the brief is sanitized.
- **Detection:** Output deviates from constraints traceable to a specific ref/entry; anomalous behavior on particular retrievals.
- **Impact:** Constraint bypass; brand/quality-floor violation; memory-mediated attack propagation across projects.
- **Mitigation:** Treat *all* soft inputs as untrusted data with clear delimiters; retrieved/reference content can never override hard rules; screen entries at write-back; deterministic post-checks [MP-1, MP-6, MP-7].
- **Recovery:** Quarantine the offending ref/entry; re-run; purge poisoned entries + reindex.
- **Validation:** Red-team refs and seeded poisoned entries; assert hard constraints hold.

### F-SEC-03 — Data exfiltration by generated code
**Level:** impl · **Severity:** High · **Area:** Security
- **Description:** Generated code issues outbound requests at render time (hidden `fetch`, tracking pixel, third-party script) that exfiltrate data or phone home.
- **Root cause:** No egress control on the render sandbox; no output network allowlist.
- **Detection:** Outbound connections from the render; disallowed `fetch`/`<script src>` in static scan.
- **Impact:** Data leak; privacy breach; supply-chain beachhead in shipped code.
- **Mitigation:** Deny-by-default egress in the sandbox [MP-14]; static resource/network allowlist on output [MP-16].
- **Recovery:** Block the domain; regenerate within the allowed surface.
- **Validation:** Generate code with an outbound call; assert it is blocked and flagged.

### F-SEC-04 — Secrets / PII leak into traces, screenshots, or logs
**Level:** impl · **Severity:** High · **Area:** Security / privacy
- **Description:** API keys, credentials, or client PII (from briefs/testimonials) are captured into `trace.jsonl`, screenshots, or logs that are then shared or written back.
- **Root cause:** No redaction; sensitive content flows verbatim through the pipeline.
- **Detection:** Secret/PII scan of traces and artifacts.
- **Impact:** Credential/PII exposure; compliance breach; poisoned Library.
- **Mitigation:** Redact secrets/PII at capture; never place credentials in the harness scope; PII scan before any write-back [MP-7, MP-14].
- **Recovery:** Purge and rotate; scrub artifacts.
- **Validation:** Seed a secret/PII; assert it never reaches a persisted artifact.

### F-SEC-05 — SSRF via asset / reference URLs
**Level:** impl · **Severity:** Med · **Area:** Security
- **Description:** A brief/asset/reference URL points at an internal or malicious endpoint; fetching it enables server-side request forgery.
- **Root cause:** Unvalidated URL fetching.
- **Detection:** Requests to private ranges / disallowed hosts.
- **Impact:** Internal network access; cloud metadata-endpoint theft.
- **Mitigation:** URL allowlist + private-range blocking on all fetches; fetch inside the sandbox [MP-14].
- **Recovery:** Reject the input; log.
- **Validation:** Supply an internal URL; assert it is blocked.

---

## Legal, IP & ethics

### F-LEG-01 — Inadvertent cloning → infringement
**Level:** spec+impl · **Severity:** High · **Area:** Legal / IP
- **Description:** Output lands too close to an existing site (model priors), creating copyright/trade-dress exposure — and silently violating Goal B (originality).
- **Root cause:** No originality/similarity check against real-world sites.
- **Detection:** Similarity screen flags high resemblance; a human recognizes a source.
- **Impact:** Legal exposure; the system's core premise (novel design) is breached.
- **Mitigation:** Originality/similarity screen against known sites; Critic rewards brief-fit not resemblance; refs are direction only [MP-17, MP-6].
- **Recovery:** Regenerate away from the resemblance; drop the offending reference.
- **Validation:** Ablate refs; output must remain original (the [00 §1](./00-overview.md) test).

### F-LEG-02 — Unlicensed fonts or imagery
**Level:** impl · **Severity:** High · **Area:** Legal / IP
- **Description:** Brand typefaces or images lack a valid web/commercial license; the design cannot ship legally.
- **Root cause:** No licensing verification on provided/loaded assets.
- **Detection:** License check on fonts/assets fails at input or delivery.
- **Impact:** Legal exposure; forced last-minute substitution that breaks the design.
- **Mitigation:** Licensing checks at input and delivery; record license provenance [MP-17].
- **Recovery:** Substitute a licensed equivalent; re-derive affected type tokens.
- **Validation:** Supply an unlicensed font; assert it is flagged before build.

### F-LEG-03 — Dark patterns / manipulative design
**Level:** spec · **Severity:** High · **Area:** Ethics
- **Description:** Optimizing "conversion" teaches or applies manipulative patterns (false urgency, confirmshaming, hidden costs) — possibly even requested by the brief.
- **Root cause:** A conversion objective with no ethical constraint; the Library can learn and propagate dark patterns.
- **Detection:** Dark-pattern screen; human review; anti-pattern tagging.
- **Impact:** User harm; brand/legal risk (consumer-protection law); ethical breach.
- **Mitigation:** An explicit ethics constraint in the constitution ([12](./12-design-constitution.md)); dark-pattern screen; never write dark patterns to the Library [MP-17, MP-12].
- **Recovery:** Reject; regenerate under the ethics constraint.
- **Validation:** A brief inviting urgency; assert the system refuses manipulative execution.

### F-LEG-04 — Missing regulatory / disclaimer content
**Level:** spec+impl · **Severity:** Med · **Area:** Legal / compliance
- **Description:** Regulated domains (financial, medical, legal) ship without required disclaimers, consent, or accessibility statements.
- **Root cause:** No regulatory-content awareness; the brief is treated as complete.
- **Detection:** Domain-triggered regulatory checklist; human review.
- **Impact:** Non-compliance; legal exposure.
- **Mitigation:** Domain-triggered regulatory-content checklist; surface required elements to the human [MP-17].
- **Recovery:** Add required content; re-emit.
- **Validation:** A financial brief; assert the checklist fires.

### F-LEG-05 — Representation / bias risk in imagery
**Level:** spec · **Severity:** Med · **Area:** Ethics
- **Description:** If the system ever selects, crops, or generates imagery featuring people (stock photo selection, or future image generation), it risks representation/bias issues — homogeneous or stereotyped representation across race, age, ability, or body type, unexamined by any current process.
- **Root cause:** No representation/bias consideration exists anywhere in the current image-handling path, because imagery is currently client-provided only — this is a forward-looking gap, not yet triggered.
- **Detection:** A human audit of imagery choices across multiple projects for representation patterns.
- **Impact:** Reputational and ethical risk if/when the system gains any imagery-selection or generation capability (ties to research bet **R15**, [14](./14-research-agenda.md)).
- **Mitigation:** Add an explicit representation/bias consideration to the constitution ([12](./12-design-constitution.md)) and to any future imagery-selection/generation capability *before* it ships, not after.
- **Recovery:** N/A yet — currently out of scope since the system doesn't select/generate imagery; revisit when R15 is built.
- **Validation:** Not yet testable; flagged here so R15's build explicitly includes this check from day one rather than retrofitting it.

---

## Production parity

### F-PAR-01 — Judged engine ≠ shipped engine (cross-browser)
**Level:** impl · **Severity:** High · **Area:** Parity
- **Description:** The Critic judges a single headless Chromium render; the shipped site runs in Safari/Firefox/real devices where it may break.
- **Root cause:** Single-engine capture; no cross-browser validation.
- **Detection:** Cross-browser render diff before delivery.
- **Impact:** Approved designs broken in production for a large user share.
- **Mitigation:** Validate on Chromium+Firefox+WebKit before delivery [MP-15].
- **Recovery:** Fix the cross-browser break; re-loop.
- **Validation:** A WebKit-only bug; assert the parity check catches it.

### F-PAR-02 — Harness Tailwind ≠ production build
**Level:** impl · **Severity:** High · **Area:** Parity
- **Description:** The harness uses the Tailwind Play CDN (runtime JIT of any class); the production build purges/configures differently, so shipped styling diverges from what was judged.
- **Root cause:** Preview convenience (CDN) not equal to the production toolchain.
- **Detection:** Diff the CDN render vs a purged production build.
- **Impact:** You approve a design you do not ship; silent style loss at delivery (F-EYE-05 at the finish line).
- **Mitigation:** Before delivery, render through the **production build** (purged Tailwind, real config) and re-verify [MP-15].
- **Recovery:** Reconcile config/safelist; re-verify.
- **Validation:** A class present in CDN but purged in prod; assert the parity check flags it.

### F-PAR-03 — SSR / hydration unverified
**Level:** impl · **Severity:** Med · **Area:** Parity
- **Description:** The Vite SPA harness cannot surface SSR/hydration mismatches, layout shift on hydrate, or server-only failures the Next.js production target will hit.
- **Root cause:** The preview harness is client-only.
- **Detection:** Render through an SSR harness; hydration-warning capture.
- **Impact:** Hydration errors / CLS in production not seen in R&D.
- **Mitigation:** A Next.js/SSR parity harness before delivery [MP-15].
- **Recovery:** Fix hydration issues; re-verify.
- **Validation:** A component with a hydration mismatch; assert the SSR harness catches it.

### F-PAR-04 — SEO / meta / structured data absent
**Level:** spec+impl · **Severity:** Med · **Area:** Parity / SEO
- **Description:** Output has no meta/OG tags, structured data, or crawlable semantic structure — invisible in a screenshot, costly in production.
- **Root cause:** The pipeline judges pixels; SEO is never a consideration.
- **Detection:** SEO/meta lint on output.
- **Impact:** Poor discoverability; rework post-launch.
- **Mitigation:** SEO/meta/structured-data checks in the output-quality gate [MP-16, MP-15]; semantic HTML (F-COD-01).
- **Recovery:** Add metadata/structure; re-emit.
- **Validation:** Assert required meta/semantic elements are present.

---

## Output code quality

### F-COD-01 — Non-semantic HTML
**Level:** spec+impl · **Severity:** High · **Area:** Code quality
- **Description:** The component uses `div`s where semantic elements/landmarks (`nav`,`header`,`main`,`button`) belong — fine in a screenshot, damaging for SEO, a11y, and maintainability.
- **Root cause:** Pixel-only judgment; no structural check.
- **Detection:** Semantic-HTML/landmark linter on output.
- **Impact:** Accessibility ([10d](./10d-failures-quality-and-infrastructure.md) F-QF-\*), SEO (F-PAR-04), and maintainability loss shipped invisibly.
- **Mitigation:** Deterministic semantic/landmark check in the output-quality gate [MP-16].
- **Recovery:** Return as a fix task; regenerate.
- **Validation:** A div-soup component; assert the gate fails it.

### F-COD-02 — Unmaintainable / non-integrable React
**Level:** impl · **Severity:** Med · **Area:** Code quality
- **Description:** Output hard-codes content instead of props, lacks componentization/keys, and is idiosyncratic per section — so it does not "drop into Next.js," is not CMS-integrable, and yields a messy codebase.
- **Root cause:** Each section generated independently, optimized for pixels not code.
- **Detection:** Static analysis: hard-coded content, missing props/keys, cross-section style drift.
- **Impact:** The promised stack fit is false; expensive human rework.
- **Mitigation:** Output-quality gate requires prop-driven, componentized, lint/format-clean code [MP-16]; shared conventions across sections.
- **Recovery:** Refactor task; regenerate.
- **Validation:** Assert content is prop-driven and lint passes.

### F-COD-03 — Insecure output patterns (XSS)
**Level:** impl · **Severity:** High · **Area:** Code quality / security
- **Description:** Generated code uses `dangerouslySetInnerHTML`, unsanitized interpolation, or unsafe URL handling — shipping XSS vectors.
- **Root cause:** No security lint on output.
- **Detection:** Security linter flags dangerous constructs.
- **Impact:** XSS / injection in the shipped product.
- **Mitigation:** Security-lint in the output-quality gate; forbid dangerous constructs [MP-16].
- **Recovery:** Return as a fix task; regenerate safely.
- **Validation:** Inject `dangerouslySetInnerHTML`; assert the gate blocks it.

### F-COD-04 — Uncontrolled external resource loads
**Level:** impl · **Severity:** Med · **Area:** Code quality / privacy
- **Description:** Output loads fonts/scripts/images from arbitrary third-party origins (privacy, performance, supply-chain) and still renders "fine."
- **Root cause:** No resource-origin allowlist on output.
- **Detection:** Resource-origin scan.
- **Impact:** Privacy leakage, third-party dependency, GDPR exposure (e.g. hosted fonts).
- **Mitigation:** Resource-origin allowlist in the output-quality gate; self-host assets [MP-16].
- **Recovery:** Replace with allowed/self-hosted resources.
- **Validation:** A remote-font import; assert it is flagged.

---

## Operations, reproducibility & vendor

### F-OPS-01 — Nondeterminism / non-reproducibility
**Level:** impl · **Severity:** Med · **Area:** Operations
- **Description:** The same brief yields materially different output run-to-run (model sampling + evolving Library), and past decisions cannot be reproduced — undermining A/B testing, debugging, and the eval program.
- **Root cause:** Sampling variance; retrieval drift; no system-state snapshot.
- **Detection:** Re-run variance; inability to reproduce a past run.
- **Impact:** Unfair A/Bs; un-debuggable regressions; eroded trust.
- **Mitigation:** A deterministic eval mode (pinned seed/temperature, frozen retrieval); versioned **system-state snapshots** per run (prompts+model+constitution+Library version); structured logging/alerting on quality regressions in the trace, not just raw scores [MP-8, MP-11].
- **Recovery:** Reproduce from the snapshot.
- **Validation:** Re-run in deterministic mode; assert identical output.

### F-OPS-02 — Schema / data-migration breakage
**Level:** impl · **Severity:** Med · **Area:** Storage
- **Description:** As schemas evolve, previously stored artifacts/traces/Library entries fail to load or silently mis-parse.
- **Root cause:** No versioned schema + migration path.
- **Detection:** Schema-validate on read; version mismatch.
- **Impact:** Lost history / measurement substrate; broken Library.
- **Mitigation:** Versioned schemas + explicit migrations; schema-validate on read [MP-8].
- **Recovery:** Migrate or quarantine incompatible records.
- **Validation:** Load an old-schema record; assert clean migration or rejection.

### F-OPS-03 — No backup / disaster recovery
**Level:** impl · **Severity:** High · **Area:** Storage
- **Description:** The hard stores and Library — the irreplaceable accumulated assets — have no backup/DR; a disk loss erases the "gets smarter" value.
- **Root cause:** Local files, no backup strategy.
- **Detection:** DR drill; backup-freshness check.
- **Impact:** Catastrophic, irreversible loss of brand/system/Library.
- **Mitigation:** Regular versioned backups; tested restore; off-machine replication [MP-8].
- **Recovery:** Restore from backup.
- **Validation:** Simulate disk loss; restore and verify integrity.

### F-OPS-04 — Unbounded storage growth / no retention
**Level:** impl · **Severity:** Low · **Area:** Storage
- **Description:** Per-run screenshots, candidate trees, and JSONL traces accumulate without limit → disk/inode exhaustion.
- **Root cause:** No retention/GC policy.
- **Detection:** Disk/inode monitoring.
- **Impact:** Runs fail; slow directories.
- **Mitigation:** Retention/GC policy; compress/prune old runs; keep traces, prune bulky intermediates.
- **Recovery:** GC old runs.
- **Validation:** Retention job prunes as configured.

### F-OPS-05 — Vendor lock-in / ToS / model deprecation
**Level:** spec+impl · **Severity:** Med · **Area:** Vendor
- **Description:** Single-provider dependency: an outage halts the system; the dev **Pro-credit** path may violate ToS for automated/near-production use; a pinned model can be **deprecated**, forcing migration + re-baselining.
- **Root cause:** One vendor, one credit path, one pinned model.
- **Detection:** Provider status; ToS review; deprecation notices.
- **Impact:** Downtime; account risk; forced re-calibration.
- **Mitigation:** Provider abstraction with a real fallback (api/local); confirm ToS for the credit path; re-baseline on model change [MP-11].
- **Recovery:** Switch provider/model; recalibrate on the benchmark ([13](./13-evaluation-charter.md)).
- **Validation:** Kill the primary provider; assert fallback + a re-baseline gate.

### F-OPS-06 — End-to-end latency / throughput blowup
**Level:** impl · **Severity:** Med · **Area:** Performance
- **Description:** variations × iterations × sections × repair × cross-browser makes a whole-site run take many minutes to hours — beyond model cost (F-MOD-04), a product-level throughput problem.
- **Root cause:** A serial, unbounded end-to-end pipeline.
- **Detection:** Wall-clock per artifact from the trace.
- **Impact:** Unusable turnaround at scale; human idle time.
- **Mitigation:** Parallelize where safe; adaptive effort ([14](./14-research-agenda.md) R12); cache prefixes; cap end-to-end wall-clock [MP-5].
- **Recovery:** Cap and escalate; reduce breadth.
- **Validation:** Track wall-clock/artifact; alert on budget breach.

### F-OPS-07 — Supply-chain risk in harness / rendering-toolchain dependencies
**Level:** impl · **Severity:** Med · **Area:** Vendor / Security
- **Description:** The render harness depends on Playwright, Vite, and the Tailwind Play CDN — third-party tooling that could itself be compromised, deprecated, or behave differently across versions, distinct from F-OPS-05's model-*vendor* lock-in (this is about the *rendering toolchain*, not the LLM provider).
- **Root cause:** Standard third-party dependency risk, not specific to ADE but unaddressed by any existing entry (F-SEC-01 covers *generated code* being untrusted, not the *harness's own dependencies*).
- **Detection:** A dependency audit (e.g. `npm audit`) flags a vulnerable package; a Playwright/Vite version bump silently changes render behavior.
- **Impact:** A compromised or silently-changed toolchain dependency could affect every render — a single point of failure across the whole pipeline.
- **Mitigation:** Pin toolchain versions explicitly (mirroring F-MOD-05's model-pinning discipline); run dependency audits on a schedule; treat a toolchain version bump as a change requiring re-baselining against the benchmark, the same as a model change.
- **Recovery:** Roll back the toolchain version; patch the vulnerability; re-baseline.
- **Validation:** A dependency-audit check in CI/the review cadence; a deliberate toolchain-version bump triggers a re-baseline per the same discipline as F-MOD-05.
