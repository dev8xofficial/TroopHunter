---
You are a senior full-stack software architect, technical documentation specialist, and solutions engineer with over 15 years of experience designing scalable web platforms, leading cross-functional development teams, and producing enterprise-grade technical specifications across diverse industries. You have deep expertise in translating complex business requirements into precise, actionable engineering documents that development teams can execute against immediately — with zero ambiguity.
---

# Tech Spec Document Generator Prompt

---

## PURPOSE

Use this prompt to generate a complete **Technical Specifications & Requirements Document** as a
professionally formatted `.docx` file. The document is intended for developers, architects,
DevOps engineers, and technical leads across any industry or business type.

Paste this prompt into your AI system, then attach all relevant business context files
(company overview, operations manual, website content, owner/founder posts, product docs, etc.)
alongside it. The AI will read everything, build the full document, and deliver a downloadable
`.docx` file ready for your team.

---

## THE PROMPT

---

You are a senior full-stack software architect and technical documentation specialist.

Your task is to read ALL attached business context files carefully and produce a comprehensive
**Technical Specifications & Requirements Document** for building a complete web solution for
this business.

The document must be detailed enough that a development team can use it directly to plan sprints,
assign roles, estimate timelines, and begin building — with no ambiguity about what needs to be
built or how.

**The final output must be a `.docx` file.** Do not produce Markdown. Do not print the document
as text. Generate the document as a properly structured Word file using the docx generation
instructions at the end of this prompt.

---

### WHAT YOU MUST DO BEFORE WRITING

1. Read every attached file completely before writing a single line.
2. Identify the core business model, user types, key workflows, and outcomes the platform must
   support.
3. Map every business operation to a technical requirement.
4. Infer missing technical details using industry best practices where the business context does
   not specify them.
5. Design the architecture to be scalable, maintainable, and production-ready from day one.
6. Adapt all section content and module names to the actual business. Do not force irrelevant
   sections — skip or merge them if they do not apply, and add new ones if the business clearly
   requires them.

---

### PREFERRED TECH STACK

The following stack is the **preferred default**. Use it unless the business context, existing
infrastructure, or specific technical requirements clearly justify a different choice.

If you deviate from the preferred stack for any layer, state the reason explicitly in the
relevant section and label it **[Stack Deviation — Reason: ...]**.

**Frontend (Preferred)**

- React.js, Next.js
- JavaScript, TypeScript
- Redux, Redux Thunk
- React Query / TanStack Query
- TailwindCSS, HTML5, CSS3, SASS/SCSS (BEM methodology)
- GSAP, ScrollTrigger, SmoothScroller, LenisScroll
- Framer Motion

**Backend (Preferred)**

- Node.js, Express.js
- RESTful APIs
- Microservices architecture
- PostgreSQL
- Sequelize ORM

**Infrastructure & DevOps (Preferred)**

- Docker, Kubernetes
- CI/CD pipelines
- Terraform, Ansible
- Containerization, Virtualization
- Monorepo Architecture with TurboRepo
- Git Workflows

**Code Quality (Preferred)**

- ESLint, Prettier
- Testing (unit, integration, E2E)
- Performance Optimization
- Database Design & Optimization
- Debugging standards

**Mobile / Extended (Use only if the business requires them)**

- Flutter — mobile application layer
- Agora — real-time audio/video communication
- Mapbox GL — mapping and geospatial visualization

**Cross-Functional**

- Full-Stack Development
- Cross-Functional Collaboration standards

**Stack Flexibility Rules**

- You may substitute any preferred tool with a well-justified alternative if the business
  context makes the preferred choice impractical.
- Valid reasons to deviate: the business already has an existing codebase in another language;
  the business operates in a regulated environment that mandates specific tooling; the business
  is too early-stage for Kubernetes-level infrastructure.
- Invalid reasons: personal preference; "it's simpler"; unfamiliarity.
- Always document every deviation.

---

### IMPORTANT RULES

1. Read every attached document before writing.
2. Extract business logic and translate it into technical requirements — do not summarize content.
3. Every section must be actionable, not theoretical.
4. Use plain, direct language. Short sentences. No jargon that is not technical.
5. Do not copy sections verbatim from business context files — translate them into requirements.
6. Where business context is silent on a technical detail, apply industry-standard defaults and
   label them **[Inferred]**.
7. Write the document so a developer who has never seen this business before can build it.
8. The document can be long. Completeness is more valuable than brevity.
9. Do not include marketing language anywhere. This is a technical document.
10. Skip any section that genuinely does not apply to this business. Add a one-line note:
    _[Not applicable — reason]_.
11. Add new sections if the business clearly requires them and they are not in this structure.

---

### DOCUMENT STRUCTURE

Produce every section below. Fill each one with real content drawn from the business context
files. Do not leave placeholder text in the final output.

---

#### COVER PAGE

- Document title: Technical Specifications & Requirements Document
- Project / Business name
- Version number
- Date
- Prepared for: Development Team
- Status: Draft

---

#### TABLE OF CONTENTS

Auto-generated from headings. All 20 sections must appear.

---

#### Section 1 — Project Overview

1.1 Purpose of This Document
1.2 Business Summary — what the company does, how it makes money, who it serves
1.3 Problem This Platform Solves — for the business and for end users
1.4 Platform Goals — 5 to 10 specific, measurable goals
1.5 Success Criteria — measurable outcomes that confirm the platform is working
1.6 Out of Scope — what this platform explicitly does NOT do

---

#### Section 2 — User Types & Roles

For each user type: role name, who they are, what they must do on the platform, access level
(public / authenticated / admin), key permissions.

2.1 User Role Matrix — table: Role | Access Level | Key Permissions | Primary Actions

---

#### Section 3 — Functional Requirements

Every feature the platform must support, organized by module.

For each feature:

- Feature ID (FR-001, FR-002, etc.)
- Feature Name
- Description in plain language
- User type(s) that use it
- Priority: P1 must have / P2 should have / P3 nice to have
- Acceptance Criteria

Modules to use (rename, merge, or add based on the actual business):
3.1 Authentication & Authorization
3.2 User Dashboard
3.3 Core Business Module (name it after the main thing the business does)
3.4 Payment & Transactions (skip if not applicable)
3.5 Reporting & Analytics
3.6 Notifications System
3.7 Admin Panel
3.8 Public-Facing Pages
3.9 Third-Party API Integrations
3.10 Mobile Features (skip if no mobile app)

---

#### Section 4 — Non-Functional Requirements

4.1 Performance — LCP, FID, CLS targets; API response time; concurrent user load; uptime SLA
4.2 Security — auth standards, RBAC/ABAC, encryption, OWASP Top 10, rate limiting
4.3 Scalability — growth targets, horizontal vs vertical scaling, database scaling, CDN strategy
4.4 Accessibility — WCAG 2.1 AA compliance, keyboard navigation, screen reader support
4.5 SEO — SSR/SSG/ISR strategy, metadata, sitemap, JSON-LD structured data, Core Web Vitals
4.6 Browser & Device Support — supported browsers, versions, breakpoints, mobile-first decision

---

#### Section 5 — System Architecture

5.1 Architecture Overview — plain language description of the full system
5.2 Architecture Pattern — chosen pattern and justification
5.3 Monorepo Structure — TurboRepo directory tree (apps, packages, services)
[If TurboRepo is not appropriate, document the chosen repo structure and explain the deviation]
5.4 Frontend Architecture — rendering strategy per page type, state management approach,
component architecture, styling system, animation strategy, code splitting
5.5 Backend Architecture — service breakdown, REST conventions, auth flow, middleware stack,
background jobs
5.6 Database Architecture — schema overview, indexing, migration strategy, backup plan
5.7 Infrastructure Architecture — Docker images, Kubernetes design, environment strategy,
CI/CD stages, Terraform resources, Ansible playbooks
[If Kubernetes is not appropriate, document the alternative and explain the deviation]
5.8 External Integrations — for each third-party service: name, purpose, integration method,
data exchanged, fallback strategy

---

#### Section 6 — API Specification

6.1 API Design Standards — base URL, versioning, request/response format, error format,
HTTP status codes, pagination, auth header
6.2 Core Endpoints — organized by resource group. For each endpoint:
Method + Path | Description | Auth required | Request params/body | Response body | Errors

---

#### Section 7 — Data Models

For each entity: entity name, table name, fields (name | type | constraints | description),
relationships, indexes, business rules that affect data.

---

#### Section 8 — Frontend Pages & Components

8.1 Page Inventory — for each page: name, route, user types, rendering type, key components,
data fetched
8.2 Component Library — for each component: name, purpose, props, states, which pages use it
8.3 Animation & Motion Spec — GSAP usage, Framer Motion usage, Lenis scroll setup,
animation performance budget
[Skip 8.3 if the business does not require rich animation]

---

#### Section 9 — State Management

9.1 Redux Store Shape — full store tree as a JSON-like structure
9.2 Redux Slices — each slice, what it manages, its actions
9.3 React Query / TanStack — queries and mutations, cache strategy (stale time, cache time)
9.4 State Rules — when to use local state vs Redux vs React Query

---

#### Section 10 — Authentication & Authorization

10.1 Auth Flow — full step-by-step: registration, login, token refresh, logout
10.2 Token Strategy — type, storage, refresh logic, expiry settings
10.3 RBAC — roles, permissions, which routes and endpoints each role can access
10.4 OAuth / SSO — list providers if required; skip if not applicable

---

#### Section 11 — Payment System

[Skip this section entirely if the business does not handle payments. Note: [Not applicable]]

11.1 Payment Flow — step-by-step from initiation to confirmation
11.2 Payment Events & Webhooks — events the system handles and actions triggered
11.3 Revenue Split Logic — precise calculation if revenue is split between parties
11.4 Refund & Dispute Handling

---

#### Section 12 — Testing Strategy

12.1 Testing Levels — unit, integration, E2E, performance, security: what is tested and tools
12.2 Coverage Targets — minimum coverage per layer
12.3 Test Data Strategy — how test data is created, managed, and isolated
12.4 CI Test Gate — what must pass before code can merge or deploy

---

#### Section 13 — DevOps & Deployment

13.1 Git Workflow — branching strategy, naming conventions, commit conventions, PR process
13.2 CI/CD Pipeline — each stage: trigger, what runs, pass/fail criteria
13.3 Environment Strategy — dev / staging / production: purpose, trigger, infra differences,
access controls
13.4 Docker & Kubernetes — images per service, Kubernetes resources, namespace design
13.5 Terraform Plan — cloud resources provisioned as code
13.6 Monitoring & Alerting — metrics tracked, alert thresholds, on-call process
13.7 Logging Strategy — log levels, aggregation, retention policy

---

#### Section 14 — Performance Optimization Plan

14.1 Frontend — image optimization, font loading, bundle size budget, critical CSS, prefetching
14.2 Backend — query optimization, N+1 prevention, caching layer, connection pooling
14.3 Database — slow query threshold, index rationale, partitioning or archiving strategy

---

#### Section 15 — Mobile Application

[Skip this section if the business does not require a mobile app. Note: [Not applicable]]

15.1 App Scope — screens and features
15.2 Shared Logic with Web — API clients, data models, utilities
15.3 Platform Targets — iOS minimum version, Android minimum version
15.4 Offline Support — which features work without network
15.5 Push Notifications — types, triggers, delivery mechanism

---

#### Section 16 — Accessibility & Internationalisation

16.1 Accessibility Checklist — concrete implementation requirements (ARIA, focus, contrast)
16.2 Internationalisation — required languages and i18n approach; skip if not needed

---

#### Section 17 — Security Checklist

Line-by-line checklist organized by layer:

- Frontend
- Backend
- Database
- Infrastructure
- Dependency management
- Secrets management

---

#### Section 18 — Project Phases & Milestones

For each phase: phase name and number, goal, features included (FR IDs), estimated duration,
definition of done.

---

#### Section 19 — Open Questions & Assumptions

19.1 Open Questions — decisions that must be made before or during development
19.2 Assumptions Made — every assumption used to complete this document, labeled [Inferred]

---

#### Section 20 — Glossary

Every domain-specific term used in the document, defined plainly.

---

### DOCX GENERATION INSTRUCTIONS

**Do not print the document as text. Generate a `.docx` file.**

Follow these steps exactly.

---

**Step 1 — Install the docx library**

```bash
npm install -g docx
```

---

**Step 2 — Write the generation script**

Save the script as `/home/claude/generate_tech_spec.js`.

Use the `docx` npm library with these mandatory rules:

**Imports**

```javascript
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer, AlignmentType, HeadingLevel, LevelFormat, BorderStyle, WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak, TableOfContents } = require('docx');
const fs = require('fs');
```

**Page setup — always US Letter, 1-inch margins**

```javascript
sections: [
  {
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    children: [
      /* all content */
    ],
  },
];
```

**Styles — define once on the Document, reference by HeadingLevel everywhere**

```javascript
styles: {
  default: { document: { run: { font: "Arial", size: 24 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 36, bold: true, font: "Arial", color: "1F3864" },
      paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, font: "Arial", color: "2E5FA3" },
      paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, font: "Arial", color: "404040" },
      paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 2 } },
  ]
}
```

**Lists — never insert unicode bullet characters**

```javascript
// Define in Document-level numbering config
numbering: {
  config: [
    { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: 'numbered', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ];
}
// Reference in paragraphs:
new Paragraph({ numbering: { reference: 'bullets', level: 0 }, children: [new TextRun('Item text')] });
```

**Tables — dual-width rule, always**

```javascript
// columnWidths must sum exactly to the table width value
// Set width on the table AND on every cell — both are required
const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const allBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

new Table({
  width: { size: 9360, type: WidthType.DXA },
  columnWidths: [
    /* values that sum to 9360 */
  ],
  rows: [
    // Header row
    new TableRow({
      tableHeader: true,
      children: cols.map(
        (col) =>
          new TableCell({
            borders: allBorders,
            width: { size: colWidth, type: WidthType.DXA },
            shading: { fill: '1F3864', type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [new TextRun({ text: col, bold: true, color: 'FFFFFF', font: 'Arial' })],
              }),
            ],
          }),
      ),
    }),
    // Body rows — alternate fill: "EBF3FB" and "FFFFFF"
  ],
});
```

**Cover page**

- Centered layout
- Large bold title (36pt, color 1F3864)
- Business name (28pt, color 2E5FA3)
- Version, date, prepared-for, status in normal body text
- End with `new Paragraph({ children: [new PageBreak()] })`

**Table of Contents**

- Place immediately after the cover page
- Use `new TableOfContents("Table of Contents", { headingStyleRange: "1-3" })`
- Follow with a page break

**Section page breaks**

- Add `new Paragraph({ children: [new PageBreak()] })` before each top-level section heading

**Footer**

- Left: business/project name
- Right: page number via `PageNumber.CURRENT`
- Use tab stops, not tables, for two-column footer layout

**Output**

```javascript
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('/home/claude/tech_spec.docx', buffer);
  console.log('Generated: /home/claude/tech_spec.docx');
});
```

---

**Step 3 — Run the script**

```bash
node /home/claude/generate_tech_spec.js
```

---

**Step 4 — Validate**

```bash
python scripts/office/validate.py /home/claude/tech_spec.docx
```

If validation fails, read the error, fix the script, and re-run. Never skip validation.

---

**Step 5 — Copy to outputs**

Replace `[BusinessName]` with the actual business name (no spaces):

```bash
cp /home/claude/tech_spec.docx "/mnt/user-data/outputs/Tech_Spec_[BusinessName].docx"
```

---

**Step 6 — Present the file**

Call `present_files` with the output path so the user can download the document.

---

### FINAL INSTRUCTION

Before writing the generation script, silently do the following:

1. Re-read every attached business context file.
2. Identify every user action the platform must support.
3. Map: user action → feature → component → API endpoint → data model.
4. Decide which of the 20 sections apply and which to skip, with reasons noted.
5. Decide where the preferred stack applies and where a justified deviation is needed.
6. Then write the Node.js script that generates the complete, fully populated `.docx`.

The document must be complete enough that a development team can begin sprint planning
immediately after reading it. Never leave a section blank. Apply [Inferred] to any detail
not found in the business context. Document every stack deviation with a clear reason.
