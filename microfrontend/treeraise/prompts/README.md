# Document Generation Pipeline

This pipeline converts raw business data into structured context files, then uses
those files to generate professional documents: a Business Operations Manual, a
Business Report, a Technical Specifications document, Implementation outputs,
Sales outreach plans, and Outcome-Based sales reports.

**Token limit per Claude session: 190k**

---

## Pipeline Overview

```
Raw Data  →  Steps 1–3 (Clean & Structure)  →  context/ files (.md)
context/ files  →  Step 4 (Synthesise)  →  Operations Manual (.docx)
Operations Manual  →  Step 5 (Analyse)  →  Business Report (.docx)
Operations Manual + Business Report  →  Step 6 (Specify)  →  Tech Spec (.docx)
Tech Spec  →  Step 7 (Implement)  →  HTML / Code outputs
Target CEO Profile + Operations Manual  →  Step 8 (Warm)  →  Lead Warming Plan
Business Report + Operations Manual  →  Step 9 (Pitch)  →  Outcome Report (.html)
```

Steps 1–3 strip noise and compress raw data into token-efficient Markdown.
Each downstream step builds on the distilled output of the step before it —
**never re-attach raw context files to Steps 5, 6, 7, 8, or 9.**

---

## Folder Structure

```
treeraise/
├── prompts/
│   ├── README.md                              ← this file
│   ├── 1_Website.md
│   ├── 2a_Linkedin_Company.md
│   ├── 2b_Linkedin_Owner.md                   ← separate prompt for person profiles
│   ├── 3a_Document.md                         ← for PDF / DOCX company documents
│   ├── 3b_Job_Posting.md                      ← for Upwork / LinkedIn job postings
│   ├── 4_Business_Operations_Doc_Generator.md
│   ├── 5_Business_Report_Doc_Generator.md
│   ├── 6_Tech_Spec_Doc_Generator.md
│   ├── 7_TreeRaise_Implementation_Changes.md
│   ├── 8_Lead_Warming.md                      ← 3-comment LinkedIn warming plan
│   └── 9_Outcome_Report.md                    ← visual HTML report for sales video
│
├── context/                                   ← all cleaned inputs AND generated outputs
│   ├── 1_Website.md                           ← output of Step 1
│   ├── 2a_Company.md                          ← output of Step 2a
│   ├── 2b_Owner.md                            ← output of Step 2b
│   ├── 3a_Faith_Based_Guide.md                ← output of Step 3a
│   ├── 3a_Nonprofit_Guide.md                  ← output of Step 3a
│   ├── 3a_School_Guide.md                     ← output of Step 3a
│   ├── 3b_Job_Posting.md                      ← output of Step 3b
│   ├── TreeRaise_System_Feature_Benefits.docx ← raw company document → run Step 3a
│   ├── upwork.md                              ← raw job posting → run Step 3b
│   ├── 4_Business_Operations_Manual.docx      ← output of Step 4
│   ├── 5_TreeRaise_Company_Report.docx        ← output of Step 5
│   └── 6_Tech_Spec_TreeRaise.docx             ← output of Step 6
│
├── admin.html                                 ← output of Step 7
└── partner-portal.html                        ← output of Step 7
```

> **Note — two unprocessed raw files in context/:**
> - `upwork.md` is a raw job posting scrape. Run Step 3b on it to produce a
>   cleaned `3b_Job_Posting.md` before using it in Step 4.
> - `TreeRaise_System_Feature_Benefits.docx` is a raw company document. Run
>   Step 3a on it to produce a cleaned `3a_System_Feature_Benefits.md` before
>   using it in Step 4.

---

## Steps

### Step 1 — Website Context

**Purpose:** Strip navigation, footers, and HTML noise from the scraped website.
Convert multi-page content into a single clean, deduplicated Markdown file.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/1_Website.md` | Prompt |
| Raw scraped website file | Input |

**Save output as:** `context/1_Website.md`

---

### Step 2a — Company LinkedIn Context

**Purpose:** Strip LinkedIn UI chrome and extract the company profile, About text,
and posts into clean structured Markdown.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/2a_Linkedin_Company.md` | Prompt |
| Raw scraped company LinkedIn page | Input |

**Save output as:** `context/2a_Company.md`

---

### Step 2b — Owner / Person LinkedIn Context

**Purpose:** Extract a personal LinkedIn profile — summary, full work history,
education, skills, certifications, recommendations, and posts — into clean
structured Markdown. Uses a dedicated prompt with person-specific sections.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/2b_Linkedin_Owner.md` | Prompt |
| Raw LinkedIn profile page | Input |

**Save output as:** `context/2b_<PersonName>.md`

> This prompt is reused for any person profile — the owner, a target lead CEO,
> or any individual. Name the output file to match the person.

---

### Step 3a — Company Document Context (repeat per document)

**Purpose:** Convert a PDF or DOCX company document into clean Markdown.
Run once per document. Name the output to match its content.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/3a_Document.md` | Prompt |
| One PDF or DOCX file | Input |

**Save output as:** `context/3a_<DocumentName>.md`

Examples:
- `context/3a_Faith_Based_Guide.md`
- `context/3a_Nonprofit_Guide.md`
- `context/3a_School_Guide.md`
- `context/3a_System_Feature_Benefits.md` ← pending (raw .docx exists in context/)

---

### Step 3b — Job Posting Context (repeat per posting)

**Purpose:** Strip platform chrome from a scraped Upwork or LinkedIn job posting
and extract role, responsibilities, requirements, and client profile into clean
structured Markdown.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/3b_Job_Posting.md` | Prompt |
| Raw job posting file (e.g. `context/upwork.md`) | Input |

**Save output as:** `context/3b_<Company>_Job.md`

Example: `context/3b_Job_Posting.md` ← already generated from `context/upwork.md`

---

### Step 4 — Business Operations Manual

**Purpose:** Synthesise all context files into a single comprehensive operations
document. This is the master reference used by Steps 5, 6, 7, 8, and 9.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/4_Business_Operations_Doc_Generator.md` | Prompt |
| `context/1_Website.md` | Website content |
| `context/2a_Company.md` | Company LinkedIn |
| `context/2b_Owner.md` | Owner LinkedIn |
| `context/3a_Faith_Based_Guide.md` | Customer guide |
| `context/3a_Nonprofit_Guide.md` | Customer guide |
| `context/3a_School_Guide.md` | Customer guide |
| `context/3a_System_Feature_Benefits.md` | Product detail ← process raw .docx first |
| `context/3b_Job_Posting.md` | Hiring context |

> **Attach all context files here — this is the only step that reads them all.**
> Estimated token usage: 60k–130k depending on content volume.

**Save output as:** `context/4_Business_Operations_Manual.docx`

---

### Step 5 — Business Report

**Purpose:** Analyse the business and identify digital transformation opportunities.
The Operations Manual already contains all business context — do not re-attach
context files.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/5_Business_Report_Doc_Generator.md` | Prompt |
| `context/4_Business_Operations_Manual.docx` | Full synthesised business context |

> **Do not attach context/ files here.** The Operations Manual is a complete
> synthesis of all of them. Re-attaching them doubles token usage with no benefit.
> Estimated token usage: 30k–70k.

**Save output as:** `context/5_TreeRaise_Company_Report.docx`

---

### Step 6 — Technical Specifications Document

**Purpose:** Translate business operations and digital opportunities into a full
technical specification for the development team.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/6_Tech_Spec_Doc_Generator.md` | Prompt |
| `context/4_Business_Operations_Manual.docx` | Operational detail, workflows, team structure |
| `context/5_TreeRaise_Company_Report.docx` | Digital opportunities, pain points, priorities |

> **Do not attach context/ files here.** Steps 4 and 5 already cover all business
> context. Adding raw context files would push the session over the 190k token limit.
> Estimated token usage: 60k–120k.

**Save output as:** `context/6_Tech_Spec_TreeRaise.docx`

---

### Step 7 — Implementation

**Purpose:** Generate working HTML, code, or other implementation outputs from
the technical specification. Current outputs: `admin.html`, `partner-portal.html`.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/7_TreeRaise_Implementation_Changes.md` | Prompt |
| `context/6_Tech_Spec_TreeRaise.docx` | Technical requirements and architecture |

> The tech spec is the authoritative source for what to build — do not re-attach
> earlier documents. If a specific implementation change requires business context,
> attach `context/4_Business_Operations_Manual.docx` as well.
> Estimated token usage: 40k–100k.

**Save outputs to:** project root (e.g. `admin.html`, `partner-portal.html`)

---

### Step 8 — Lead Warming Plan

**Purpose:** Generate a 3-comment LinkedIn engagement plan to warm a target CEO
toward accepting a connection request from the seller's CEO. Run once per lead.
Each plan covers post selection, a staged 5-day comment sequence (Comments 1, 2,
and 3 on Days 1, 3, and 5), and an optional connection request note.

**Preparation — run Step 2b on the target CEO first:**
Before running Step 8, scrape the target CEO's LinkedIn profile and pass it
through `prompts/2b_Linkedin_Owner.md` to produce their cleaned context file.
Save it as `context/2b_<TargetCEOName>.md`. Then use that file as the input
for Step 8.

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/8_Lead_Warming.md` | Prompt |
| `context/2b_<TargetCEOName>.md` | Target CEO's posts, summary, and background |
| `context/4_Business_Operations_Manual.docx` | Seller's business context for finding genuine overlap |

> If the Operations Manual is not yet generated, attach `context/1_Website.md`
> and `context/2a_Company.md` as a fallback — less overlap detail, but functional.
> Estimated token usage: 20k–50k.

**Save output as:** `context/8_Lead_Warming_<TargetCEOName>.md`

---

### Step 9 — Outcome-Based Report

**Purpose:** Generate a personalised, visual HTML report showing the prospect
exactly what changes in their business, with every outcome quantified in time,
cost, and effort. This report is screen-recorded as a 2–3 minute walkthrough
video and sent to the prospect CEO in the first outreach touchpoint to move them
toward a demo.

**The report includes:**
- Three headline impact numbers (hours saved, monthly cost impact, workflows
  automated) calculated from the prospect's actual pain points
- A current-state challenge table drawn from their real operations
- 4–7 solution cards, each with Time Saved / Cost Impact / Effort Reduction and
  a before/after comparison
- A projected annual impact section with Chart.js bar charts
- A deliverables checklist showing what specifically gets built
- A CTA section with a "Watch the Demo →" button the sender replaces with a link

**Attach to Claude:**
| File | Role |
|------|------|
| `prompts/9_Outcome_Report.md` | Prompt |
| `context/5_<Company>_Report.docx` | Primary source — pain points and transformation opportunities |
| `context/4_Business_Operations_Manual.docx` | Workflow detail for quantifying outcomes |

> The Business Report (Step 5) is the primary source. The Operations Manual
> provides the workflow granularity needed to put real numbers on each outcome.
> Do not attach raw context/ files — Steps 4 and 5 already synthesise them.
> Estimated token usage: 30k–60k.

**Save output as:** `context/9_Outcome_Report_<CompanyName>.html`

> Before sending the video, open the HTML file and replace the `href="#"` on the
> "Watch the Demo" button with the real demo video link.

---

## Sales Sequence — How Steps 8 and 9 Work Together

Steps 8 and 9 are both sales tools that run in parallel, not in sequence.
They serve different moments in the same outreach campaign:

```
Step 8 — Lead Warming     →  LinkedIn comments over 5 days  →  Connection accepted
Step 9 — Outcome Report   →  Screen-recorded video sent     →  Demo booked
```

**Typical usage pattern for a new prospect:**
1. Run Step 2b on the prospect CEO's LinkedIn profile → `context/2b_<Name>.md`
2. Run Step 8 → start the 5-day LinkedIn comment sequence
3. Run Step 9 → record the video walkthrough of the outcome report
4. After connection is accepted (Step 8 succeeds), send the video (Step 9 output)
   as the first direct message
5. Follow up with the demo link if they watch but don't respond within 3 days

---

## Token Budget Summary

| Step | Inputs | Estimated tokens |
|------|--------|-----------------|
| 1–3 | Prompt + one raw file | 10k–40k |
| 4 | Prompt + all context/ .md files | 60k–130k |
| 5 | Prompt + Operations Manual only | 30k–70k |
| 6 | Prompt + Operations Manual + Business Report | 60k–120k |
| 7 | Prompt + Tech Spec | 40k–100k |
| 8 | Prompt + Target CEO LinkedIn + Operations Manual | 20k–50k |
| 9 | Prompt + Business Report + Operations Manual | 30k–60k |

Steps 5–9 are kept lean by design. Each receives only the distilled output of
the previous step — not the original source files. This keeps every session
within the 190k limit and reduces noise in the context window.
