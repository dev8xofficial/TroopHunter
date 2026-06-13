const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, LevelFormat, BorderStyle,
  WidthType, ShadingType, VerticalAlign, PageNumber, PageBreak,
  TableOfContents, TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// ─── COLOURS ────────────────────────────────────────────────────────────────
const NAVY   = "1F3864";
const BLUE   = "2E5FA3";
const STEEL  = "4472C4";
const LGRAY  = "F2F2F2";
const MGRAY  = "D9D9D9";
const DGRAY  = "404040";
const WHITE  = "FFFFFF";
const ALTROW = "EBF3FB";
const HEAD_BG= "1F3864";

// ─── BORDERS ────────────────────────────────────────────────────────────────
const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const allBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
const noBorder   = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders  = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// ─── HELPERS ────────────────────────────────────────────────────────────────
const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  pageBreakBefore: true,
  children: [new TextRun({ text, font: "Arial", size: 36, bold: true, color: NAVY })]
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun({ text, font: "Arial", size: 28, bold: true, color: BLUE })]
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun({ text, font: "Arial", size: 24, bold: true, color: DGRAY })]
});

const body = (text, opts = {}) => new Paragraph({
  spacing: { after: 120 },
  children: [new TextRun({ text, font: "Arial", size: 22, ...opts })]
});

const bodyBold = (text) => body(text, { bold: true });

const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 80 },
  children: [new TextRun({ text, font: "Arial", size: 22 })]
});

const bulletBold = (label, rest) => new Paragraph({
  numbering: { reference: "bullets", level: 0 },
  spacing: { after: 80 },
  children: [
    new TextRun({ text: label, font: "Arial", size: 22, bold: true }),
    new TextRun({ text: rest, font: "Arial", size: 22 })
  ]
});

const sub = (text) => new Paragraph({
  numbering: { reference: "sub-bullets", level: 0 },
  spacing: { after: 60 },
  children: [new TextRun({ text, font: "Arial", size: 20, color: "555555" })]
});

const spacer = (pts = 120) => new Paragraph({ spacing: { after: pts }, children: [] });

const inferred = (text) => new Paragraph({
  spacing: { after: 100 },
  children: [
    new TextRun({ text: "[Inferred] ", font: "Arial", size: 20, bold: true, italics: true, color: BLUE }),
    new TextRun({ text, font: "Arial", size: 20, italics: true, color: "555555" })
  ]
});

const notApplicable = (reason) => new Paragraph({
  spacing: { after: 100 },
  children: [new TextRun({ text: `[Not applicable — ${reason}]`, font: "Arial", size: 20, italics: true, color: "888888" })]
});

const devNote = (reason) => new Paragraph({
  spacing: { after: 100 },
  children: [new TextRun({ text: `[Stack Deviation — Reason: ${reason}]`, font: "Arial", size: 20, bold: true, italics: true, color: "C00000" })]
});

const sectionDivider = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } },
  spacing: { after: 200 },
  children: []
});

// ─── TABLE BUILDERS ─────────────────────────────────────────────────────────
function makeHeaderRow(cols, widths) {
  return new TableRow({
    tableHeader: true,
    children: cols.map((col, i) => new TableCell({
      borders: allBorders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: HEAD_BG, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        children: [new TextRun({ text: col, bold: true, color: WHITE, font: "Arial", size: 20 })]
      })]
    }))
  });
}

function makeBodyRow(cells, widths, shade = false) {
  return new TableRow({
    children: cells.map((cell, i) => new TableCell({
      borders: allBorders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: shade ? ALTROW : WHITE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        children: [new TextRun({ text: String(cell), font: "Arial", size: 20 })]
      })]
    }))
  });
}

function makeBodyRowBold(cells, widths, boldCol = 0, shade = false) {
  return new TableRow({
    children: cells.map((cell, i) => new TableCell({
      borders: allBorders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: { fill: shade ? ALTROW : WHITE, type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        children: [new TextRun({ text: String(cell), font: "Arial", size: 20, bold: i === boldCol })]
      })]
    }))
  });
}

function makeTable(cols, widths, rows) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      makeHeaderRow(cols, widths),
      ...rows.map((r, idx) => makeBodyRow(r, widths, idx % 2 === 0))
    ]
  });
}

// ─── COVER PAGE ─────────────────────────────────────────────────────────────
function coverPage() {
  return [
    spacer(1440),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: "TECHNICAL SPECIFICATIONS &", font: "Arial", size: 56, bold: true, color: NAVY })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: "REQUIREMENTS DOCUMENT", font: "Arial", size: 56, bold: true, color: NAVY })]
    }),
    sectionDivider(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
      children: [new TextRun({ text: "Washington Smiles Complete Health Dentistry", font: "Arial", size: 36, bold: true, color: BLUE })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [new TextRun({ text: "Digital Transformation Platform", font: "Arial", size: 28, color: STEEL })]
    }),
    spacer(400),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "Version: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "1.0", font: "Arial", size: 22 })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "Date: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "June 2026", font: "Arial", size: 22 })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "Prepared for: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Development Team", font: "Arial", size: 22 })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [new TextRun({ text: "Status: ", font: "Arial", size: 22, bold: true }), new TextRun({ text: "Draft", font: "Arial", size: 22, color: "C00000" })]
    }),
    spacer(400),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "CONFIDENTIAL — FOR INTERNAL DEVELOPMENT USE ONLY", font: "Arial", size: 18, bold: true, color: "888888" })]
    }),
    new Paragraph({ children: [new PageBreak()] })
  ];
}

// ─── SECTION 1 ───────────────────────────────────────────────────────────────
function section1() {
  const goalWidths = [800, 5600, 2960];
  const goalRows = [
    ["G-01", "Reduce appointment booking friction by enabling 24/7 online self-scheduling", "P1"],
    ["G-02", "Eliminate paper intake forms and replace with pre-visit digital submission", "P1"],
    ["G-03", "Reduce no-show and last-minute cancellation rate by 20–30%", "P1"],
    ["G-04", "Increase treatment plan acceptance rate by 15–25% via digital presentation", "P2"],
    ["G-05", "Reduce AR aging days by 15% through automated billing and eligibility verification", "P2"],
    ["G-06", "Increase monthly new patient volume by 20–40% via SEO and conversion funnel", "P2"],
    ["G-07", "Build a referral tracking system that grows referral volume by 30%", "P3"],
    ["G-08", "Deliver real-time revenue, production, and collections dashboards to practice leadership", "P2"],
    ["G-09", "Achieve HIPAA-compliant data storage and transmission across all digital touchpoints", "P1"],
    ["G-10", "Establish a fully owned digital ecosystem — no critical dependency on third-party SaaS", "P1"],
  ];

  const scopeWidths = [4680, 4680];
  const scopeRows = [
    ["Practice management software replacement", "The platform integrates with existing PMS via API/webhooks. It does not replace the PMS."],
    ["Insurance billing clearinghouse", "The dashboard consumes clearinghouse data; it does not act as a clearinghouse."],
    ["Clinical imaging software (PACS)", "Digital X-ray and CBCT systems remain separate; no imaging data is stored in this platform."],
    ["Multi-location rollout (Phase 1)", "This specification covers Washington Smiles only. Integrity Dental Group expansion is out of scope for v1.0."],
    ["EHR / full electronic health records", "The platform stores treatment plan data and patient preferences; it is not a certified EHR."],
    ["Telehealth / video consultations", "No real-time video consultation features are included in v1.0."],
  ];

  return [
    h1("Section 1 — Project Overview"),
    sectionDivider(),

    h2("1.1 Purpose of This Document"),
    body("This document defines the complete technical specifications and requirements for designing, building, and deploying the Washington Smiles Digital Transformation Platform. It is intended for use by development team leads, full-stack engineers, DevOps engineers, and QA engineers. The document provides sufficient detail for sprint planning, role assignment, timeline estimation, and immediate development commencement."),
    spacer(),

    h2("1.2 Business Summary"),
    body("Washington Smiles Complete Health Dentistry is a full-service dental practice located at 1111 E 6th St, Washington, MO 63090. Owned and led by Dr. Melissa A. Smith, DDS since 2004, the practice operates as one of five locations within the Integrity Dental Group. Washington Smiles provides general, cosmetic, and oral surgery dental services to individual patients of all ages in Washington, MO and the surrounding Franklin County region."),
    spacer(80),
    body("The practice generates revenue through fee-for-service dental procedures, a monthly membership subscription plan for uninsured patients, CareCredit and Invisalign financing plans, and an Amazon affiliate product store. It operates a zero-balance payment policy — all payments are collected at the time of service. The clinical team includes five dentists with specializations spanning general dentistry, Invisalign, oral surgery, implants, Botox/TMJ, and systemic health."),
    spacer(),

    h2("1.3 Problem This Platform Solves"),
    bodyBold("Business problems:"),
    bullet("Front desk staff are overwhelmed by inbound scheduling calls with no 24/7 self-service alternative."),
    bullet("No-shows and last-minute cancellations create unrecovered chair time worth thousands of dollars monthly."),
    bullet("Paper-based intake forms introduce HIPAA risk, data-entry delays, and patient experience friction."),
    bullet("Treatment plan acceptance suffers without structured digital follow-up and visual presentation tools."),
    bullet("Manual insurance eligibility verification is time-intensive and error-prone."),
    bullet("Revenue cycle visibility is limited to periodic manual reports — no real-time dashboard exists."),
    bullet("Patient acquisition depends on third-party platforms without owned conversion infrastructure."),
    spacer(80),
    bodyBold("Patient problems:"),
    bullet("Patients cannot book appointments outside business hours — a leading cause of lost new-patient leads."),
    bullet("Patients receive inconsistent communication — reminders are manual, follow-up is ad hoc."),
    bullet("Treatment plan costs and options are communicated verbally or via printed paper — hard to review later."),
    bullet("Patients with dental anxiety are underserved by impersonal or bureaucratic digital experiences."),
    spacer(),

    h2("1.4 Platform Goals"),
    makeTable(
      ["Goal ID", "Platform Goal", "Priority"],
      goalWidths,
      goalRows
    ),
    spacer(),

    h2("1.5 Success Criteria"),
    bullet("Online booking rate reaches 35% or more of all new appointment requests within 90 days of launch."),
    bullet("No-show and cancellation rate decreases by a minimum of 20% within 60 days of automated reminder launch."),
    bullet("100% of new patient intake forms are completed digitally before the appointment within 30 days of go-live."),
    bullet("Treatment plan acceptance rate increases by a minimum of 15% within two billing cycles of portal launch."),
    bullet("AR aging days reduce by 15% within one quarter of revenue cycle dashboard deployment."),
    bullet("Platform passes HIPAA technical safeguards audit before any patient data is stored."),
    bullet("All pages achieve Lighthouse performance score of 90 or above on mobile."),
    bullet("Core Web Vitals pass: LCP under 2.5 seconds, CLS under 0.1, FID under 100ms."),
    spacer(),

    h2("1.6 Out of Scope"),
    makeTable(
      ["Out-of-Scope Item", "Reason / Boundary"],
      scopeWidths,
      scopeRows
    ),
    spacer(),
  ];
}

// ─── SECTION 2 ───────────────────────────────────────────────────────────────
function section2() {
  const roleWidths = [1500, 1400, 2500, 3960];
  const roleRows = [
    ["Guest / Visitor", "Public", "None (read-only)", "Browse service pages, submit contact form, view offers, read blog"],
    ["Patient", "Authenticated", "Own data only", "Book appointments, fill digital intake forms, view treatment plans, make payments, send messages, view records, manage membership"],
    ["Front Desk Coordinator", "Authenticated Staff", "Patient records (read/write), schedule management", "View/edit schedule, manage waitlist, check in patients, process payments, verify insurance, send communications"],
    ["Dental Hygienist", "Authenticated Staff", "Patient clinical notes (read)", "View patient chart, update periodontal notes, flag recall due dates"],
    ["Dental Assistant", "Authenticated Staff", "Patient chart (read)", "View procedure notes, update treatment status, access imaging orders"],
    ["Associate Dentist", "Authenticated Staff", "Assigned patient records (read/write)", "Create and update treatment plans, add clinical notes, sign consent forms, view patient history"],
    ["Billing Coordinator", "Authenticated Staff", "Financial records (read/write)", "Submit insurance claims, post payments, manage AR, run billing reports"],
    ["Office Manager", "Authenticated Staff", "All records (read/write), staff management", "All front desk and billing functions plus schedule oversight, staff metrics, and operational KPI dashboards"],
    ["Marketing Lead", "Authenticated Staff", "Analytics (read), content (read/write)", "View acquisition funnel reports, manage referral program, publish content hub articles"],
    ["Practice Owner / Admin", "Super Admin", "Full system access", "All functions, plus system configuration, user management, financial dashboards, and BI reports"],
  ];

  return [
    h1("Section 2 — User Types & Roles"),
    sectionDivider(),

    h2("2.1 User Role Matrix"),
    body("The following roles exist in the system. Each role maps to a distinct access level and set of permitted actions."),
    spacer(80),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: roleWidths,
      rows: [
        makeHeaderRow(["Role", "Access Level", "Key Permissions", "Primary Actions"], roleWidths),
        ...roleRows.map((r, idx) => makeBodyRow(r, roleWidths, idx % 2 === 0))
      ]
    }),
    spacer(),
    body("Note: Role-based access control (RBAC) is enforced at both the API middleware layer and the frontend route guard layer. No client-side RBAC logic should be trusted as a security boundary."),
    spacer(),
  ];
}

// ─── SECTION 3 ───────────────────────────────────────────────────────────────
function section3() {
  const frWidths = [800, 2000, 2800, 1200, 700, 1860];

  function fr(id, name, desc, users, priority, ac) {
    return makeBodyRow([id, name, desc, users, priority, ac], frWidths, false);
  }

  const authRows = [
    ["FR-001", "Patient Registration", "New patient creates an account with name, email, date of birth, and password. Email verification required.", "Patient", "P1", "Account created; verification email sent; patient can log in after verification"],
    ["FR-002", "Staff Account Provisioning", "Admin creates staff accounts with assigned role. Staff receives invite email to set password.", "Admin", "P1", "Staff account active; role permissions enforced on first login"],
    ["FR-003", "Login / Logout", "Email + password login with JWT access token issuance. Session refresh handled silently.", "All authenticated", "P1", "Token issued; protected routes accessible; logout clears all tokens"],
    ["FR-004", "Password Reset", "Forgot-password flow via email link with time-limited token (15 minutes).", "All authenticated", "P1", "New password accepted; old token invalidated"],
    ["FR-005", "MFA — Staff Only", "TOTP-based two-factor authentication required for all staff roles.", "All Staff", "P1", "Login fails without valid TOTP code; backup codes available"],
    ["FR-006", "Session Timeout", "Inactivity timeout of 15 minutes for staff; 60 minutes for patients. Warning shown at 2 minutes before expiry.", "All authenticated", "P1", "Session invalidated after timeout; user must re-authenticate"],
  ];

  const schedRows = [
    ["FR-010", "Real-Time Availability Lookup", "Patient selects service type, preferred provider, and date range. System queries PMS API and returns available slots.", "Patient, Front Desk", "P1", "Available slots returned within 2 seconds; conflicts not shown; real-time sync with PMS"],
    ["FR-011", "Online Appointment Booking", "Patient selects slot and confirms booking. Confirmation email and SMS sent instantly.", "Patient", "P1", "Appointment created in PMS; confirmation sent; slot removed from availability"],
    ["FR-012", "Staff Scheduling Dashboard", "Front desk views daily, weekly, and provider-specific schedule views. Can create, move, or cancel appointments.", "Front Desk, Office Manager", "P1", "Changes reflected in PMS within 5 seconds; audit log updated"],
    ["FR-013", "Automated Reminders", "Multi-channel reminders sent 72h, 24h, and 2h before appointment via SMS and email. Patient can confirm or cancel via link.", "Patient", "P1", "Confirmation status updated in schedule; no-show flag set if no response"],
    ["FR-014", "Smart Waitlist", "Cancelled slot triggers waitlist check. System auto-offers slot to next matched patient via SMS/email.", "Patient, Front Desk", "P2", "Slot backfilled or returned to open pool; waitlist patient receives offer within 2 minutes of cancellation"],
    ["FR-015", "Recall Campaigns", "System triggers automated recall outreach when a patient's hygiene due date passes. Multi-channel: SMS, email, portal notification.", "Patient", "P1", "Recall message sent; booking link included; response logged"],
    ["FR-016", "Provider Preference Selection", "Patient can specify preferred provider when booking. System shows availability for that provider first.", "Patient", "P2", "Preferred provider's slots shown first; fallback to any provider if no availability"],
    ["FR-017", "No-Show Predictive Flagging", "System scores each appointment for no-show risk based on patient history. High-risk appointments flagged for proactive outreach.", "Front Desk, Office Manager", "P3", "High-risk flag visible on schedule; manual outreach triggered by coordinator"],
  ];

  const intakeRows = [
    ["FR-020", "Digital Intake Form", "Patient completes new patient intake form (medical history, medications, allergies, insurance info) online before the visit.", "Patient", "P1", "Form submitted and stored in patient record before appointment; HIPAA-compliant storage"],
    ["FR-021", "Medical History Versioning", "Patient's medical history is versioned. At each visit, patient is prompted to review and update. Changes are diff-logged.", "Patient, Dentist", "P1", "Version history accessible to clinical team; updates timestamped"],
    ["FR-022", "Digital Consent Forms", "E-signature for consent forms (treatment consent, financial responsibility, HIPAA notice). Stored as signed PDF.", "Patient", "P1", "Signed consent attached to patient record; timestamp and IP logged"],
    ["FR-023", "Insurance Card Upload", "Patient uploads front/back of insurance card. Stored securely. Used by billing for verification.", "Patient", "P1", "Images stored; linked to patient record; billing team can access"],
  ];

  const treatRows = [
    ["FR-030", "Treatment Plan Builder", "Dentist creates a digital treatment plan from procedure codes. Each item includes description, cost estimate, insurance coverage estimate, and priority.", "Dentist", "P1", "Plan saved; patient notified via portal and email"],
    ["FR-031", "Treatment Plan Patient View", "Patient views their treatment plan in the portal with visual breakdowns, procedure descriptions, and educational videos embedded.", "Patient", "P1", "Plan renders on mobile and desktop; patient can ask questions inline"],
    ["FR-032", "Treatment Plan Acceptance", "Patient reviews plan options and clicks to accept. Triggers scheduling flow for first treatment appointment.", "Patient", "P1", "Acceptance recorded; scheduling link displayed; staff notified"],
    ["FR-033", "Unaccepted Plan Follow-Up", "Automated follow-up sequence sent to patients with unaccepted treatment plans at 3, 7, and 14 days. Sequence stops on acceptance.", "Patient", "P2", "Sequence triggers on schedule; stops on acceptance or patient opt-out"],
    ["FR-034", "Treatment Option Comparison", "Dentist can add multiple treatment options (e.g., crown vs. extraction with implant). Patient sees side-by-side cost and benefit breakdown.", "Dentist, Patient", "P2", "Both options display correctly; patient selects preferred option"],
    ["FR-035", "Post-Procedure Instructions", "After procedure is completed, system sends digital post-op instructions (per procedure type) via portal and email.", "Patient", "P1", "Instructions delivered within 1 hour of appointment completion flag"],
  ];

  const billingRows = [
    ["FR-040", "Insurance Eligibility Check", "System triggers automated eligibility check via clearinghouse API at booking and 48h pre-appointment. Results stored on patient record.", "Billing Coordinator, Front Desk", "P1", "Coverage data stored; out-of-pocket estimate available before appointment"],
    ["FR-041", "Claims Submission", "Billing coordinator submits claims from the dashboard. System formats and transmits to clearinghouse. Status tracked.", "Billing Coordinator", "P1", "Claim submitted; confirmation number stored; status visible in AR dashboard"],
    ["FR-042", "AR Aging Dashboard", "Real-time view of outstanding claims by payer, age bucket (0–30, 31–60, 61–90, 90+ days), and amount. Drill-down to individual claim.", "Billing Coordinator, Office Manager", "P1", "Dashboard refreshes within 5 minutes of new data; buckets correctly calculated"],
    ["FR-043", "Patient Payment Portal", "Patient views their balance and can pay via credit card, debit card, or ACH. Payment receipt emailed automatically.", "Patient", "P1", "Payment processed; balance updated; receipt sent; PMS balance synced"],
    ["FR-044", "Payment Plan Enrollment", "Patient applies for a payment plan. System calculates installments and presents terms. Patient e-signs agreement.", "Patient", "P2", "Agreement signed; installment schedule created; recurring charges set up"],
    ["FR-045", "Revenue Cycle Dashboard", "Practice owner and office manager view production vs. collection KPIs, daily collections, monthly trends, and provider productivity.", "Office Manager, Practice Owner", "P1", "Data refreshed daily; all KPIs defined and accurate"],
  ];

  const notifRows = [
    ["FR-050", "Email Notifications", "Transactional emails for appointment confirmation, reminders, treatment plan updates, billing receipts, and recall campaigns.", "All users", "P1", "Emails delivered within 30 seconds; DKIM/SPF signed; unsubscribe link on marketing emails"],
    ["FR-051", "SMS Notifications", "SMS for appointment reminders, waitlist offers, and recall outreach. Patient can opt out.", "Patient", "P1", "SMS delivered; opt-out processed within 1 message; compliance with TCPA"],
    ["FR-052", "Portal Notifications", "In-portal notification bell for new messages, treatment plan updates, upcoming appointments, and recall reminders.", "Patient, Staff", "P2", "Unread count shown; notifications marked read on view"],
    ["FR-053", "Secure Patient Messaging", "Two-way secure messaging between patient and clinical/admin team. Not for medical emergencies (disclaimer shown).", "Patient, All Staff", "P2", "Messages stored encrypted; staff response within 1 business day per policy"],
  ];

  const adminRows = [
    ["FR-060", "User Management", "Admin creates, edits, suspends, and deletes staff accounts. Assigns and changes roles.", "Admin", "P1", "Role changes take effect on next login; suspended accounts cannot log in"],
    ["FR-061", "System Configuration", "Admin configures practice settings: business hours, provider list, service types, reminder timing, SMS templates.", "Admin", "P1", "Changes take effect within 5 minutes; version history maintained"],
    ["FR-062", "Audit Log", "System logs all CRUD operations on patient data, including user, timestamp, IP, and action type. Log is read-only.", "Admin", "P1", "All PHI access logged; log accessible to admin only; retained for 6 years per HIPAA"],
    ["FR-063", "Provider Productivity Dashboard", "Admin views production per provider per hour, cancellation rate per provider, and case mix.", "Office Manager, Admin", "P2", "Data accurate; filters by date range and provider"],
  ];

  const marketRows = [
    ["FR-070", "Referral Tracking Portal", "Patient generates a unique referral link. When a referred patient books and completes a visit, the referring patient earns a reward.", "Patient", "P3", "Referral link unique per patient; conversion tracked end-to-end; rewards credited to loyalty account"],
    ["FR-071", "Review Solicitation", "Post-visit, system sends automated request for Google review via SMS and email. Timing: 2 hours after appointment end.", "Patient", "P2", "Message sent on schedule; Google review deep-link included; opt-out honored"],
    ["FR-072", "SEO Content Hub", "Staff publishes oral health articles and FAQs. Each article has metadata fields (title, description, slug, structured data).", "Marketing Lead", "P2", "Articles indexed by search engines; structured data validates in Google Rich Results Test"],
    ["FR-073", "Landing Page Lead Capture", "Service-specific landing pages (Invisalign, Implants, Whitening) include a lead capture form. Submissions create a new patient lead record.", "Guest / Visitor", "P2", "Submission stored; auto-reply email sent; lead assigned to front desk queue"],
  ];

  const analyticsRows = [
    ["FR-080", "Patient Acquisition Funnel Metrics", "Tracks lead source, website-to-booking conversion rate, and cost per new patient acquisition.", "Marketing Lead, Admin", "P3", "Metrics displayed in dashboard; source attribution accurate"],
    ["FR-081", "Recall Compliance Report", "Monthly report showing patients overdue for hygiene recall, segmented by overdue duration.", "Office Manager", "P2", "Report generates correctly; CSV export available"],
    ["FR-082", "Membership Plan Report", "Tracks active membership enrollments, monthly revenue, and renewal rates.", "Office Manager, Admin", "P2", "Data accurate; accessible in the admin dashboard"],
  ];

  return [
    h1("Section 3 — Functional Requirements"),
    sectionDivider(),
    body("Each requirement is assigned a Feature ID, name, description, target user type(s), priority (P1 = must have, P2 = should have, P3 = nice to have), and acceptance criteria."),
    spacer(),

    h2("3.1 Authentication & Authorization"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...authRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.2 Appointment Scheduling & Recall Engine"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...schedRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.3 Patient Intake & Clinical Records"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...intakeRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.4 Treatment Planning & Patient Education"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...treatRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.5 Billing, Payments & Revenue Cycle"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...billingRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.6 Notifications & Messaging"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...notifRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.7 Admin Panel & Reporting"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...adminRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.8 Marketing, Referrals & Content Hub"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...marketRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.9 Analytics & Business Intelligence"),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: frWidths,
      rows: [makeHeaderRow(["ID","Feature","Description","Users","Priority","Acceptance Criteria"], frWidths), ...analyticsRows.map((r,i) => makeBodyRow(r, frWidths, i%2===0))] }),
    spacer(),

    h2("3.10 Mobile Features"),
    body("The platform is mobile-first responsive web. A native mobile application is not required for v1.0. All patient-facing features must function fully in iOS Safari and Android Chrome. Progressive Web App (PWA) capabilities are included for home-screen installation and push notifications."),
    inferred("Native Flutter mobile app deferred to v2.0. PWA provides sufficient mobile reach for v1.0 without additional build overhead."),
    spacer(),
  ];
}

// ─── SECTION 4 ───────────────────────────────────────────────────────────────
function section4() {
  const browserWidths = [2400, 2200, 2200, 2560];
  const browserRows = [
    ["Chrome", "Latest 2 versions", "Full support", "Yes"],
    ["Safari (iOS)", "iOS 15+", "Full support", "Yes — primary mobile target"],
    ["Firefox", "Latest 2 versions", "Full support", "Yes"],
    ["Edge", "Latest 2 versions", "Full support", "Yes"],
    ["Samsung Internet", "Latest 2 versions", "Full support", "Yes"],
    ["Safari (macOS)", "Latest 2 versions", "Full support", "Yes"],
    ["IE 11", "Not supported", "Not supported", "No"],
  ];

  return [
    h1("Section 4 — Non-Functional Requirements"),
    sectionDivider(),

    h2("4.1 Performance"),
    bullet("Largest Contentful Paint (LCP): under 2.5 seconds on mobile (4G equivalent)."),
    bullet("First Input Delay (FID): under 100 milliseconds."),
    bullet("Cumulative Layout Shift (CLS): under 0.1."),
    bullet("API response time: median under 200ms, 95th percentile under 500ms for all authenticated endpoints."),
    bullet("Scheduling availability query: under 2 seconds including PMS API round-trip."),
    bullet("Concurrent user load: platform must support 500 concurrent authenticated sessions without degradation."),
    inferred("Uptime SLA target: 99.9% monthly (approximately 44 minutes downtime per month). Maintenance windows scheduled outside 6 AM–10 PM Central Time."),
    spacer(),

    h2("4.2 Security"),
    bullet("All HTTP traffic redirected to HTTPS. TLS 1.2 minimum; TLS 1.3 preferred."),
    bullet("Authentication: JWT access tokens (15-minute expiry) + refresh tokens (7-day expiry, rotated on use). Stored in httpOnly cookies — not localStorage."),
    bullet("Staff roles require TOTP multi-factor authentication (RFC 6238)."),
    bullet("RBAC enforced at API middleware layer on every protected route. Role claims embedded in JWT payload."),
    bullet("All PHI (Protected Health Information) encrypted at rest using AES-256. In transit: TLS only."),
    bullet("OWASP Top 10 mitigations implemented: SQL injection prevention via parameterised queries (Sequelize), XSS prevention via content security policy and output encoding, CSRF tokens on all state-changing forms, SSRF prevention on webhook handlers."),
    bullet("API rate limiting: 100 requests per minute per authenticated user; 20 requests per minute per IP for unauthenticated endpoints."),
    bullet("Dependency scanning: npm audit run in CI pipeline on every merge. Critical vulnerabilities block deployment."),
    bullet("Secrets managed via environment variables; no secrets in source code. Production secrets stored in cloud secrets manager."),
    inferred("HIPAA Business Associate Agreements (BAAs) required with all cloud vendors that store or process PHI — including email provider, SMS provider, and cloud host."),
    spacer(),

    h2("4.3 Scalability"),
    bullet("Application services deployed as Docker containers orchestrated by Kubernetes. Horizontal pod autoscaling enabled for API and scheduling services."),
    bullet("Database: PostgreSQL with read replicas for reporting queries. Connection pooling via PgBouncer."),
    bullet("Static assets served via CDN (Cloudflare or AWS CloudFront). Cache-Control headers set per asset type."),
    bullet("Target: platform architecture supports 10x current patient volume without infrastructure redesign."),
    inferred("Initial deployment on AWS (EKS for Kubernetes, RDS for PostgreSQL, S3 for file storage). Region: us-east-1."),
    spacer(),

    h2("4.4 Accessibility"),
    bullet("WCAG 2.1 Level AA compliance required for all patient-facing pages."),
    bullet("All interactive elements keyboard-navigable with visible focus indicators."),
    bullet("All images include meaningful alt text. Decorative images have empty alt attributes."),
    bullet("Colour contrast ratio: minimum 4.5:1 for normal text, 3:1 for large text."),
    bullet("All forms include associated labels. Error messages linked to form fields via aria-describedby."),
    bullet("Screen reader support tested with NVDA (Windows) and VoiceOver (iOS/macOS)."),
    bullet("Animated content includes a prefers-reduced-motion media query fallback."),
    spacer(),

    h2("4.5 SEO"),
    bullet("Public-facing pages (home, service pages, blog articles) use Next.js static generation (SSG) or incremental static regeneration (ISR) for crawlability."),
    bullet("Authenticated portal pages use client-side rendering — not indexed."),
    bullet("Each page includes: unique title tag (under 60 characters), meta description (under 160 characters), canonical URL, Open Graph tags."),
    bullet("Automated sitemap.xml generated and submitted to Google Search Console."),
    bullet("JSON-LD structured data on service pages (LocalBusiness, Dentist, Service schemas)."),
    bullet("Core Web Vitals targets met on all public pages (see 4.1)."),
    bullet("No duplicate content — canonical tags enforced on all paginated or parameter-filtered pages."),
    spacer(),

    h2("4.6 Browser & Device Support"),
    makeTable(
      ["Browser", "Version Target", "Support Level", "Mobile"],
      browserWidths,
      browserRows
    ),
    spacer(80),
    body("Responsive breakpoints: 320px (small mobile), 375px (standard mobile), 768px (tablet), 1024px (small desktop), 1280px (standard desktop), 1440px (wide desktop). Mobile-first CSS approach: styles written for mobile first, enhanced with min-width media queries."),
    spacer(),
  ];
}

// ─── SECTION 5 ───────────────────────────────────────────────────────────────
function section5() {
  return [
    h1("Section 5 — System Architecture"),
    sectionDivider(),

    h2("5.1 Architecture Overview"),
    body("The Washington Smiles platform is a multi-tier web application built on a microservices backend, a Next.js frontend monorepo, and a PostgreSQL relational database. The system is designed as a Monorepo using TurboRepo, containing distinct applications (patient portal, staff dashboard, public website, admin panel) sharing common packages (UI components, API clients, data models, utility functions)."),
    spacer(80),
    body("External integrations connect the platform to the existing Practice Management Software (PMS), a dental clearinghouse for insurance eligibility and claims, a payment processor (Stripe), an SMS provider (Twilio), and an email delivery service (SendGrid). All integrations use webhook or REST API communication with clearly defined fallback strategies."),
    spacer(),

    h2("5.2 Architecture Pattern"),
    bullet("Pattern: Microservices with an API Gateway entry point."),
    bullet("Services are independently deployable, versioned, and testable."),
    bullet("Inter-service communication: synchronous REST for request/response flows; asynchronous message queue (BullMQ / Redis) for background jobs and event-driven workflows (reminders, recall campaigns, follow-up sequences)."),
    bullet("All services share a single PostgreSQL database cluster in v1.0, using schema-level service isolation. Full database-per-service migration is planned for v2.0."),
    inferred("Justification for shared database in v1.0: reduces operational complexity for a single-location practice with a small team. Migration path is documented and schema isolation is enforced from day one."),
    spacer(),

    h2("5.3 Monorepo Structure"),
    body("Repository managed with TurboRepo. Directory structure:"),
    spacer(60),
    new Paragraph({
      spacing: { after: 120 },
      children: [new TextRun({ text:
`washington-smiles/
├── apps/
│   ├── web/                   # Next.js public website (SSG/ISR)
│   ├── portal/                # Next.js patient portal (CSR/SSR)
│   ├── staff/                 # Next.js staff dashboard (CSR)
│   └── admin/                 # Next.js admin panel (CSR)
├── services/
│   ├── api-gateway/           # Express.js — routing, auth middleware, rate limiting
│   ├── auth-service/          # Express.js — registration, login, JWT, MFA
│   ├── patient-service/       # Express.js — patient records, intake, medical history
│   ├── scheduling-service/    # Express.js — appointments, availability, recall engine
│   ├── treatment-service/     # Express.js — treatment plans, consent forms
│   ├── billing-service/       # Express.js — claims, payments, AR dashboard
│   ├── notification-service/  # Express.js — email, SMS, portal notifications
│   ├── analytics-service/     # Express.js — BI dashboards, reports
│   └── content-service/       # Express.js — blog, SEO content, landing pages
├── packages/
│   ├── ui/                    # Shared React component library (Tailwind CSS)
│   ├── types/                 # Shared TypeScript interfaces and enums
│   ├── api-client/            # Shared Axios client with auth interceptors
│   ├── config/                # Shared ESLint, Prettier, TypeScript configs
│   └── utils/                 # Shared utility functions
├── infra/
│   ├── terraform/             # Cloud resource definitions
│   ├── k8s/                   # Kubernetes manifests
│   └── ansible/               # Configuration management playbooks
├── scripts/                   # Developer utilities
├── turbo.json
└── package.json`,
        font: "Courier New", size: 18, color: DGRAY })]
    }),
    spacer(),

    h2("5.4 Frontend Architecture"),
    bodyBold("Rendering strategy per application:"),
    bullet("web (public site): Next.js with SSG for static pages (home, services, team, about) and ISR (revalidate: 3600) for blog/content hub."),
    bullet("portal (patient portal): Next.js with CSR for authenticated routes. SSR on the initial page load for SEO-safe portal home."),
    bullet("staff (staff dashboard): Pure CSR — not indexed by search engines. Route guards enforce role-based access."),
    bullet("admin: Pure CSR. Access restricted to admin role only."),
    spacer(80),
    bodyBold("State management:"),
    bullet("Redux Toolkit + Redux Thunk: global application state — auth session, user profile, notifications count, appointment calendar data."),
    bullet("TanStack Query (React Query): server state — API data fetching, caching, background refetching. Stale time: 5 minutes for non-critical data, 0 for availability queries."),
    bullet("Local React state (useState, useReducer): form state, UI toggles, modal visibility."),
    spacer(80),
    bodyBold("Component architecture:"),
    bullet("Atomic design: atoms (Button, Input, Badge), molecules (FormField, AppointmentCard), organisms (BookingModal, TreatmentPlanView), templates (DashboardLayout), pages."),
    bullet("All shared components reside in packages/ui. App-specific components in their respective apps/*/components directory."),
    spacer(80),
    bodyBold("Styling:"),
    bullet("TailwindCSS utility classes as primary styling approach. Custom design tokens defined in tailwind.config.js (brand colors: Washington Smiles navy #1F3864, blue #2E5FA3; dental white #F8FAFC)."),
    bullet("SCSS modules used for complex component animations and stateful styles not easily expressed in Tailwind."),
    bullet("BEM naming convention applied within SCSS modules."),
    spacer(80),
    bodyBold("Animation:"),
    bullet("Framer Motion: page transitions, modal animations, treatment plan card reveals."),
    bullet("GSAP + ScrollTrigger: scroll-driven animations on the public website (service pages, hero sections)."),
    bullet("Lenis: smooth scroll behavior on the public website only."),
    bullet("Animation budget: cumulative animation JavaScript under 50KB gzipped per page. All animations respect prefers-reduced-motion."),
    spacer(),

    h2("5.5 Backend Architecture"),
    bodyBold("Service responsibilities:"),
    bullet("api-gateway: Receives all inbound requests. Validates JWT, enforces rate limits, routes to downstream services. No business logic."),
    bullet("auth-service: User registration, login, JWT issuance, token refresh, MFA enrollment and verification, password reset."),
    bullet("patient-service: Patient profile CRUD, intake form storage, medical history versioning, document storage (insurance cards, consent forms)."),
    bullet("scheduling-service: Appointment CRUD, PMS availability sync, waitlist logic, recall engine, no-show scoring, reminder job scheduling."),
    bullet("treatment-service: Treatment plan CRUD, consent form generation, e-signature workflow, unaccepted-plan follow-up sequences."),
    bullet("billing-service: Insurance eligibility checks, claims submission, AR dashboard data, patient payment processing (Stripe), payment plan management."),
    bullet("notification-service: Email (SendGrid), SMS (Twilio), portal notification delivery. Receives events from other services via message queue."),
    bullet("analytics-service: Aggregates data from other services for BI dashboards. Runs scheduled report generation jobs."),
    bullet("content-service: Blog article CRUD, SEO metadata management, landing page lead capture form submissions."),
    spacer(80),
    bodyBold("REST conventions:"),
    bullet("Base URL: https://api.washingtonsmiles.com/v1"),
    bullet("Resource naming: plural nouns (/patients, /appointments, /treatment-plans)."),
    bullet("Standard HTTP methods: GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE (soft delete)."),
    bullet("Consistent error response format: { error: { code, message, details } }."),
    spacer(80),
    bodyBold("Background jobs:"),
    bullet("BullMQ (Redis-backed) queue for: appointment reminder dispatch, recall campaign triggers, unaccepted plan follow-up sequences, insurance eligibility pre-checks, post-visit review solicitation."),
    spacer(),

    h2("5.6 Database Architecture"),
    bodyBold("Primary database: PostgreSQL 15"),
    bullet("All tables use UUID primary keys."),
    bullet("Soft deletes: deleted_at timestamp column on all patient-data tables. Hard deletes prohibited."),
    bullet("Timestamps: created_at and updated_at on every table, auto-managed by Sequelize hooks."),
    bullet("PHI columns encrypted at the application layer before write using AES-256-GCM."),
    spacer(80),
    bodyBold("Core schema overview (abbreviated):"),
    bullet("users: id, email, password_hash, role, mfa_secret, last_login, created_at, deleted_at"),
    bullet("patients: id, user_id (FK), first_name, last_name, dob, phone, address, insurance_info (encrypted), created_at"),
    bullet("medical_histories: id, patient_id (FK), version, content (encrypted JSON), submitted_at"),
    bullet("appointments: id, patient_id (FK), provider_id (FK), service_type, scheduled_at, status, confirmation_sent, no_show_score"),
    bullet("treatment_plans: id, patient_id (FK), provider_id (FK), status, total_estimated_cost, accepted_at, created_at"),
    bullet("treatment_plan_items: id, plan_id (FK), procedure_code, description, cost_estimate, insurance_estimate, priority"),
    bullet("payments: id, patient_id (FK), amount, method, status, stripe_payment_intent_id, created_at"),
    bullet("claims: id, patient_id (FK), appointment_id (FK), clearinghouse_id, status, submitted_at, paid_at, amount"),
    bullet("notifications: id, user_id (FK), type, channel, status, sent_at"),
    bullet("audit_logs: id, user_id (FK), action, resource_type, resource_id, ip_address, timestamp"),
    spacer(80),
    bodyBold("Indexing strategy:"),
    bullet("appointments: index on patient_id, provider_id, scheduled_at, status."),
    bullet("claims: index on patient_id, status, submitted_at."),
    bullet("audit_logs: index on user_id, resource_type, timestamp. Partition by month."),
    bullet("medical_histories: index on patient_id, version for efficient history retrieval."),
    spacer(80),
    bodyBold("Migration strategy:"),
    bullet("Sequelize migrations for all schema changes. Migrations are version-controlled and run in CI before deployment."),
    bullet("No destructive migrations in production without a roll-back migration paired."),
    spacer(),

    h2("5.7 Infrastructure Architecture"),
    bodyBold("Environments: dev, staging, production"),
    bullet("dev: Local Docker Compose stack. Developers run all services locally."),
    bullet("staging: Kubernetes cluster (AWS EKS) mirroring production. Deployed on every merge to main. Used for QA and UAT."),
    bullet("production: AWS EKS. Deployed on tagged release only."),
    spacer(80),
    bodyBold("Kubernetes design:"),
    bullet("Namespaces: washington-smiles-prod, washington-smiles-staging, monitoring."),
    bullet("Each microservice: 1 Deployment, 1 Service, 1 HorizontalPodAutoscaler."),
    bullet("HPA targets: CPU utilization 70%; min replicas 2, max replicas 10 for API gateway and scheduling service."),
    bullet("Ingress: NGINX Ingress Controller with TLS termination (cert-manager with Let's Encrypt)."),
    inferred("Kubernetes chosen over simpler alternatives (e.g., ECS, App Runner) because multi-service architecture and HIPAA compliance benefit from fine-grained network policy and secret management via Kubernetes Secrets + AWS Secrets Manager integration."),
    spacer(80),
    bodyBold("CI/CD pipeline (GitHub Actions):"),
    bullet("Trigger: push to any feature branch runs lint, type-check, unit tests, and integration tests."),
    bullet("Merge to main: all tests + Docker build + push to ECR + deploy to staging."),
    bullet("Release tag (vX.Y.Z): promote staging image to production after manual approval gate."),
    spacer(80),
    bodyBold("Terraform resources provisioned:"),
    bullet("AWS EKS cluster, node groups (on-demand + spot mix)."),
    bullet("AWS RDS PostgreSQL (Multi-AZ in production), read replica for analytics."),
    bullet("AWS ElastiCache Redis (for BullMQ and session cache)."),
    bullet("AWS S3 buckets: patient documents (private, server-side encryption), static assets (public), deployment artifacts."),
    bullet("AWS CloudFront distribution for static asset CDN."),
    bullet("AWS Secrets Manager for all production credentials."),
    bullet("AWS SES (backup email) + SendGrid primary."),
    spacer(),

    h2("5.8 External Integrations"),
    makeTable(
      ["Service", "Purpose", "Method", "Data Exchanged", "Fallback"],
      [1800, 1600, 1200, 2360, 2400],
      [
        ["PMS (Dentrix / Eaglesoft)", "Source of truth for appointment schedule and patient records", "REST API + Webhooks", "Availability slots, appointments, patient IDs", "Queue appointment locally; sync when API recovers"],
        ["Dental Clearinghouse (Change Healthcare)", "Insurance eligibility + claims submission", "REST API", "Patient insurance data, claim data, ERA responses", "Manual verification workflow triggered for staff"],
        ["Stripe", "Patient payment processing", "Stripe SDK + Webhooks", "Payment intents, charges, refunds, dispute events", "Display error; patient instructed to call office"],
        ["Twilio", "SMS notifications and reminders", "REST API", "Phone number, message body, delivery status", "Fall back to email if SMS delivery fails"],
        ["SendGrid", "Transactional and marketing email", "REST API + Webhooks", "Email content, delivery status, unsubscribe events", "AWS SES as backup SMTP relay"],
        ["Google Business Profile API", "Post review solicitation links", "REST API", "Review link generation", "Send direct link to Google search URL"],
      ]
    ),
    spacer(),
  ];
}

// ─── SECTION 6 ───────────────────────────────────────────────────────────────
function section6() {
  const epWidths = [1200, 900, 900, 1300, 2500, 2560];
  const endpoints = [
    ["POST", "/auth/register", "No", "{ email, password, firstName, lastName, dob }", "{ userId, message }", "400 validation, 409 email exists"],
    ["POST", "/auth/login", "No", "{ email, password, totpCode? }", "{ accessToken, refreshToken }", "401 invalid credentials, 403 MFA required"],
    ["POST", "/auth/refresh", "No", "{ refreshToken }", "{ accessToken }", "401 expired/invalid"],
    ["POST", "/auth/logout", "Yes", "{ refreshToken }", "{ message }", "401 not authenticated"],
    ["POST", "/auth/forgot-password", "No", "{ email }", "{ message }", "200 always (prevent enumeration)"],
    ["GET", "/patients/:id", "Yes (own or staff)", "—", "Patient profile object", "401, 403, 404"],
    ["PATCH", "/patients/:id", "Yes (own or staff)", "Partial patient fields", "Updated patient object", "400, 401, 403"],
    ["GET", "/patients/:id/medical-history", "Yes", "—", "Array of versioned history objects", "401, 403"],
    ["POST", "/patients/:id/medical-history", "Yes", "{ content: MedHistoryObject }", "{ version, submittedAt }", "400, 401"],
    ["GET", "/appointments/availability", "Yes", "{ serviceType, providerId?, dateFrom, dateTo }", "Array of available slots", "400, 503 PMS unavailable"],
    ["POST", "/appointments", "Yes", "{ slotId, patientId, serviceType, providerId }", "Appointment object", "400, 409 slot taken"],
    ["PATCH", "/appointments/:id/cancel", "Yes", "{ reason? }", "{ status: cancelled }", "400, 403"],
    ["GET", "/appointments/:id", "Yes", "—", "Appointment object", "401, 403, 404"],
    ["GET", "/treatment-plans/:patientId", "Yes", "—", "Array of treatment plans", "401, 403"],
    ["POST", "/treatment-plans", "Yes (dentist+)", "{ patientId, items[] }", "Treatment plan object", "400, 401, 403"],
    ["PATCH", "/treatment-plans/:id/accept", "Yes (patient)", "{ selectedOptionId? }", "{ status: accepted }", "403, 404"],
    ["POST", "/billing/eligibility-check", "Yes (staff)", "{ patientId, appointmentId }", "Coverage data object", "400, 503 clearinghouse down"],
    ["GET", "/billing/ar-dashboard", "Yes (billing+)", "{ dateFrom?, dateTo? }", "AR aging buckets + claim list", "401, 403"],
    ["POST", "/billing/payments", "Yes (patient)", "{ amount, paymentMethodId }", "Payment confirmation object", "400, 402, 503"],
    ["GET", "/analytics/revenue-cycle", "Yes (admin)", "{ period }", "KPI metrics object", "401, 403"],
  ];

  return [
    h1("Section 6 — API Specification"),
    sectionDivider(),

    h2("6.1 API Design Standards"),
    bullet("Base URL: https://api.washingtonsmiles.com/v1"),
    bullet("Versioning: URL path prefix (/v1). Breaking changes increment the version."),
    bullet("Format: JSON only. Content-Type: application/json required on all requests with a body."),
    bullet("Authentication header: Authorization: Bearer <accessToken> on all protected endpoints."),
    bullet("Pagination: cursor-based for lists with potential large result sets (appointments, claims). Parameters: limit (default 20, max 100), cursor."),
    bullet("Error format: { error: { code: string, message: string, details?: object } }"),
    bullet("HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests, 500 Internal Server Error, 503 Service Unavailable."),
    spacer(),

    h2("6.2 Core Endpoints"),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: epWidths,
      rows: [
        makeHeaderRow(["Method", "Path", "Auth", "Request", "Response", "Errors"], epWidths),
        ...endpoints.map((r, i) => makeBodyRow(r, epWidths, i % 2 === 0))
      ]
    }),
    spacer(),
  ];
}

// ─── SECTION 7 ───────────────────────────────────────────────────────────────
function section7() {
  return [
    h1("Section 7 — Data Models"),
    sectionDivider(),
    body("All entities use PostgreSQL. Primary keys are UUIDs (uuid_generate_v4()). created_at and updated_at are auto-managed. deleted_at enables soft deletes. PHI columns are marked [PHI] — these are encrypted at the application layer before persistence."),
    spacer(),

    h2("7.1 users"),
    makeTable(
      ["Field", "Type", "Constraints", "Description"],
      [2000, 1800, 1800, 3760],
      [
        ["id", "UUID", "PK, NOT NULL", "Unique user identifier"],
        ["email", "VARCHAR(255)", "UNIQUE, NOT NULL", "Login email address"],
        ["password_hash", "VARCHAR(255)", "NOT NULL", "bcrypt hash (cost 12)"],
        ["role", "ENUM", "NOT NULL", "patient | front_desk | hygienist | assistant | dentist | billing | office_manager | marketing | admin"],
        ["mfa_secret", "VARCHAR(255)", "NULLABLE", "TOTP secret (staff only), encrypted"],
        ["mfa_enabled", "BOOLEAN", "DEFAULT false", "Whether MFA is active for this user"],
        ["status", "ENUM", "DEFAULT active", "active | suspended | pending_verification"],
        ["last_login", "TIMESTAMP", "NULLABLE", "Timestamp of last successful login"],
        ["created_at", "TIMESTAMP", "NOT NULL", "Auto-set on insert"],
        ["deleted_at", "TIMESTAMP", "NULLABLE", "Soft delete timestamp"],
      ]
    ),
    spacer(),

    h2("7.2 patients"),
    makeTable(
      ["Field", "Type", "Constraints", "Description"],
      [2000, 1800, 1800, 3760],
      [
        ["id", "UUID", "PK, NOT NULL", "Unique patient identifier"],
        ["user_id", "UUID", "FK → users.id, NULLABLE", "Linked portal account (null if patient has no portal login)"],
        ["first_name", "VARCHAR(100)", "NOT NULL [PHI]", "Patient first name"],
        ["last_name", "VARCHAR(100)", "NOT NULL [PHI]", "Patient last name"],
        ["date_of_birth", "DATE", "NOT NULL [PHI]", "Used for identity verification"],
        ["phone", "VARCHAR(20)", "NOT NULL [PHI]", "Primary contact phone"],
        ["email", "VARCHAR(255)", "NULLABLE [PHI]", "Contact email (may differ from login email)"],
        ["address", "JSONB", "NULLABLE [PHI]", "{ street, city, state, zip }"],
        ["insurance_info", "JSONB", "NULLABLE [PHI]", "{ carrier, memberId, groupNumber, front_image_url, back_image_url }"],
        ["preferred_provider_id", "UUID", "FK → providers.id, NULLABLE", "Patient's preferred dentist"],
        ["membership_plan_active", "BOOLEAN", "DEFAULT false", "Whether patient has an active membership plan"],
        ["created_at", "TIMESTAMP", "NOT NULL", "Auto-set on insert"],
        ["deleted_at", "TIMESTAMP", "NULLABLE", "Soft delete timestamp"],
      ]
    ),
    spacer(),

    h2("7.3 appointments"),
    makeTable(
      ["Field", "Type", "Constraints", "Description"],
      [2000, 1800, 1800, 3760],
      [
        ["id", "UUID", "PK, NOT NULL", "Unique appointment identifier"],
        ["patient_id", "UUID", "FK → patients.id, NOT NULL", "Associated patient"],
        ["provider_id", "UUID", "FK → providers.id, NOT NULL", "Assigned dentist or hygienist"],
        ["service_type", "VARCHAR(100)", "NOT NULL", "e.g., cleaning, implant_consult, emergency"],
        ["scheduled_at", "TIMESTAMP", "NOT NULL", "Appointment date and time (UTC)"],
        ["duration_minutes", "INTEGER", "NOT NULL", "Expected duration"],
        ["status", "ENUM", "NOT NULL", "scheduled | confirmed | completed | cancelled | no_show"],
        ["pms_appointment_id", "VARCHAR(100)", "UNIQUE, NULLABLE", "ID in practice management software"],
        ["confirmation_sent_at", "TIMESTAMP", "NULLABLE", "When confirmation email/SMS was sent"],
        ["no_show_score", "DECIMAL(3,2)", "NULLABLE", "0.00 to 1.00 — predicted no-show probability"],
        ["cancellation_reason", "TEXT", "NULLABLE", "Reason provided on cancellation"],
        ["waitlist_filled", "BOOLEAN", "DEFAULT false", "Whether this slot was filled from waitlist"],
        ["created_at", "TIMESTAMP", "NOT NULL", "Auto-set on insert"],
      ]
    ),
    spacer(),

    h2("7.4 treatment_plans"),
    makeTable(
      ["Field", "Type", "Constraints", "Description"],
      [2000, 1800, 1800, 3760],
      [
        ["id", "UUID", "PK, NOT NULL", "Unique plan identifier"],
        ["patient_id", "UUID", "FK → patients.id, NOT NULL", "Associated patient"],
        ["provider_id", "UUID", "FK → providers.id, NOT NULL", "Dentist who created the plan"],
        ["status", "ENUM", "NOT NULL", "draft | presented | accepted | declined | expired"],
        ["total_estimated_cost", "DECIMAL(10,2)", "NOT NULL", "Sum of all item estimates"],
        ["total_insurance_estimate", "DECIMAL(10,2)", "NOT NULL", "Estimated insurance coverage"],
        ["patient_responsibility", "DECIMAL(10,2)", "NOT NULL", "Estimated patient out-of-pocket"],
        ["accepted_at", "TIMESTAMP", "NULLABLE", "When patient accepted the plan"],
        ["accepted_option_id", "UUID", "FK → treatment_plan_options.id, NULLABLE", "Which option patient selected (if multiple options)"],
        ["follow_up_sequence_active", "BOOLEAN", "DEFAULT false", "Whether automated follow-up is running"],
        ["created_at", "TIMESTAMP", "NOT NULL", "Auto-set on insert"],
      ]
    ),
    spacer(),

    h2("7.5 claims"),
    makeTable(
      ["Field", "Type", "Constraints", "Description"],
      [2000, 1800, 1800, 3760],
      [
        ["id", "UUID", "PK, NOT NULL", "Unique claim identifier"],
        ["patient_id", "UUID", "FK → patients.id, NOT NULL", "Associated patient"],
        ["appointment_id", "UUID", "FK → appointments.id, NOT NULL", "Associated appointment"],
        ["clearinghouse_claim_id", "VARCHAR(100)", "UNIQUE, NULLABLE", "ID returned by clearinghouse on submission"],
        ["payer_id", "VARCHAR(100)", "NOT NULL", "Insurance payer identifier"],
        ["status", "ENUM", "NOT NULL", "draft | submitted | acknowledged | paid | denied | appealed"],
        ["submitted_at", "TIMESTAMP", "NULLABLE", "When claim was transmitted to clearinghouse"],
        ["paid_at", "TIMESTAMP", "NULLABLE", "When payment was received"],
        ["billed_amount", "DECIMAL(10,2)", "NOT NULL", "Amount billed to insurance"],
        ["paid_amount", "DECIMAL(10,2)", "NULLABLE", "Amount paid by insurance"],
        ["denial_reason", "TEXT", "NULLABLE", "Reason provided on denial"],
        ["created_at", "TIMESTAMP", "NOT NULL", "Auto-set on insert"],
      ]
    ),
    spacer(),
  ];
}

// ─── SECTION 8 ───────────────────────────────────────────────────────────────
function section8() {
  const pageWidths = [1600, 1400, 1200, 1200, 1960, 1800 + 200];
  const pages = [
    ["Home", "/", "Guest", "SSG", "HeroBanner, ServicesGrid, TestimonialsCarousel, CTASection", "Practice highlights, offers, testimonials"],
    ["Services — Index", "/services", "Guest", "SSG", "ServiceCard list, FilterBar", "Service list from CMS"],
    ["Service Detail", "/services/[slug]", "Guest", "ISR (1hr)", "ServiceHero, ProcedureDetail, FAQAccordion, BookingCTA", "Service detail, JSON-LD"],
    ["Team", "/team", "Guest", "SSG", "ProviderCard list, ProviderBio modal", "Provider list"],
    ["Book Appointment", "/book", "Guest + Auth", "CSR", "ServiceSelector, ProviderPicker, CalendarPicker, TimeSlotGrid, ConfirmationForm", "Availability API"],
    ["Patient Portal — Home", "/portal", "Patient", "SSR", "AppointmentUpcoming, TreatmentPlanAlert, MessageBadge, RecallNotice", "Appointments, plans, messages"],
    ["Portal — My Appointments", "/portal/appointments", "Patient", "CSR", "AppointmentList, AppointmentCard, CancelModal", "Appointment history and upcoming"],
    ["Portal — Treatment Plan", "/portal/treatment-plans/:id", "Patient", "CSR", "PlanOverview, ProcedureItem, CostBreakdown, AcceptButton, VideoEmbed", "Plan details, cost estimates"],
    ["Portal — Payments", "/portal/payments", "Patient", "CSR", "BalanceSummary, PaymentForm, PaymentHistory", "Patient balance, Stripe"],
    ["Portal — Medical History", "/portal/health-history", "Patient", "CSR", "MedHistoryForm, VersionHistory", "Current and past versions"],
    ["Portal — Messages", "/portal/messages", "Patient", "CSR", "MessageThread, ComposeForm", "Message threads"],
    ["Staff — Schedule", "/staff/schedule", "Staff", "CSR", "DayView, WeekView, AppointmentBlock, WaitlistPanel", "PMS schedule data"],
    ["Staff — Patient Record", "/staff/patients/:id", "Staff", "CSR", "PatientHeader, TreatmentPlanList, MedHistory, ClaimList, ActivityLog", "Full patient data"],
    ["Staff — Treatment Builder", "/staff/treatment-plans/new", "Dentist", "CSR", "ProcedureSearch, PlanBuilder, CostCalculator, ConsentSelector", "Procedure codes, fee schedules"],
    ["Billing — AR Dashboard", "/billing/ar", "Billing+", "CSR", "AgingBuckets, ClaimList, ClaimDetail, FilterPanel", "Claims and AR data"],
    ["Admin — Users", "/admin/users", "Admin", "CSR", "UserTable, RoleAssigner, InviteModal, SuspendAction", "All staff accounts"],
    ["Admin — BI Dashboard", "/admin/analytics", "Admin", "CSR", "RevenueChart, ProductionVsCollection, NewPatientTrend, ProviderMetrics", "Analytics service data"],
    ["Content — Blog", "/blog", "Guest", "ISR (1hr)", "ArticleGrid, CategoryFilter", "Published articles"],
    ["Content — Blog Post", "/blog/[slug]", "Guest", "ISR (1hr)", "ArticleBody, RelatedPosts, AuthorCard", "Article content, JSON-LD"],
    ["Landing — Invisalign", "/invisalign", "Guest", "SSG", "HeroBanner, BeforeAfterSlider, LeadCaptureForm, PricingSection", "Lead capture, offer details"],
    ["Landing — Implants", "/dental-implants", "Guest", "SSG", "HeroBanner, ImplantProcess, ConsultCTA, LeadCaptureForm", "Lead capture, consult CTA"],
    ["Landing — Whitening", "/teeth-whitening", "Guest", "SSG", "WhiteningHero, OptionComparison, BookingCTA", "Service info"],
  ];

  return [
    h1("Section 8 — Frontend Pages & Components"),
    sectionDivider(),

    h2("8.1 Page Inventory"),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: pageWidths,
      rows: [
        makeHeaderRow(["Page Name", "Route", "User Type", "Render", "Key Components", "Data Fetched"], pageWidths),
        ...pages.map((r, i) => makeBodyRow(r, pageWidths, i % 2 === 0))
      ]
    }),
    spacer(),

    h2("8.2 Component Library"),
    body("All shared components reside in packages/ui. Key components documented below:"),
    spacer(80),
    bullet("AppointmentCard: Displays a single appointment. Props: appointment (Appointment), onCancel, onReschedule. States: upcoming | today | past | cancelled."),
    bullet("BookingCalendar: Interactive calendar for slot selection. Props: availableSlots (Slot[]), selectedDate, onDateSelect, onSlotSelect. Fetches availability via TanStack Query."),
    bullet("TreatmentPlanView: Renders a treatment plan with procedure items, cost breakdown, and accept CTA. Props: plan (TreatmentPlan), onAccept, readonly?."),
    bullet("DigitalIntakeForm: Multi-step form for medical history collection. Props: existingData?, onSubmit. Uses React Hook Form with Zod schema validation."),
    bullet("InsuranceEligibilityBadge: Displays real-time eligibility status. Props: patientId, appointmentId. States: pending | verified | failed."),
    bullet("ARAgingTable: Sortable, filterable table of AR claims. Props: claims (Claim[]), onFilterChange, onClaimSelect."),
    bullet("MessageThread: Displays a secure message conversation. Props: threadId. Polls for new messages every 30 seconds."),
    bullet("PaymentForm: Stripe Elements-powered payment card input. Props: amount, patientId, onSuccess, onError."),
    bullet("ConsentEsignature: E-signature pad with drawn or typed signature option. Props: documentId, onSigned. Outputs base64 PNG."),
    spacer(),

    h2("8.3 Animation & Motion Spec"),
    body("Animation is applied only on the public website (apps/web). The portal and staff applications use minimal transitions for performance and accessibility."),
    spacer(80),
    bullet("GSAP + ScrollTrigger: Scroll-driven entrance animations on service pages. Maximum 3 animated elements per viewport section. Performance budget: GSAP animation code under 30KB gzipped."),
    bullet("Framer Motion: Page transitions (opacity/slide, 0.3s duration) and modal mount/unmount animations. Used across all four apps."),
    bullet("Lenis: Smooth scroll applied to public website only. Disabled on mobile devices where native scroll is preferred."),
    bullet("All animations disabled when prefers-reduced-motion: reduce media query is active."),
    bullet("No CSS animations or transforms that cause layout recalculations (avoid animating width, height, top, left — use transform and opacity only)."),
    spacer(),
  ];
}

// ─── SECTION 9 ───────────────────────────────────────────────────────────────
function section9() {
  return [
    h1("Section 9 — State Management"),
    sectionDivider(),

    h2("9.1 Redux Store Shape"),
    new Paragraph({
      spacing: { after: 120 },
      children: [new TextRun({
        text: `{
  auth: {
    user: User | null,
    accessToken: string | null,
    role: UserRole | null,
    isLoading: boolean,
    error: string | null
  },
  notifications: {
    unreadCount: number,
    items: Notification[]
  },
  scheduling: {
    selectedDate: string | null,
    selectedProvider: Provider | null,
    selectedServiceType: string | null,
    currentView: 'day' | 'week' | 'month'
  },
  ui: {
    sidebarOpen: boolean,
    activeModal: string | null,
    toastQueue: Toast[]
  }
}`,
        font: "Courier New", size: 18, color: DGRAY
      })]
    }),
    spacer(),

    h2("9.2 Redux Slices"),
    bullet("authSlice: Manages user session. Actions: loginSuccess, logout, refreshToken, setLoading. Populated on app load from refresh token cookie."),
    bullet("notificationsSlice: Tracks portal notification count. Actions: setUnreadCount, markAllRead, appendNotification. Updated by WebSocket or polling."),
    bullet("schedulingSlice: UI state for the scheduling flow. Actions: setDate, setProvider, setServiceType, clearSelection."),
    bullet("uiSlice: Global UI state. Actions: openModal, closeModal, pushToast, popToast, toggleSidebar."),
    spacer(),

    h2("9.3 TanStack Query — Queries and Mutations"),
    bullet("usePatientAppointments(patientId): GET /appointments?patientId=... — staleTime: 2 min, cacheTime: 10 min."),
    bullet("useAvailableSlots(params): GET /appointments/availability — staleTime: 0 (always fresh), refetchInterval: 30s while calendar open."),
    bullet("useTreatmentPlan(planId): GET /treatment-plans/:id — staleTime: 5 min."),
    bullet("usePatientBalance(patientId): GET /billing/balance/:patientId — staleTime: 1 min."),
    bullet("useARDashboard(filters): GET /billing/ar-dashboard — staleTime: 5 min, enabled only for billing+ roles."),
    bullet("useCreateAppointment: POST /appointments mutation — onSuccess: invalidate useAvailableSlots and usePatientAppointments."),
    bullet("useAcceptTreatmentPlan: PATCH /treatment-plans/:id/accept mutation — onSuccess: invalidate useTreatmentPlan."),
    bullet("useSubmitPayment: POST /billing/payments mutation — onSuccess: invalidate usePatientBalance."),
    spacer(),

    h2("9.4 State Rules"),
    bullet("Use Redux: global application state that multiple components across different pages need — auth session, notification count, UI modal state, sidebar state."),
    bullet("Use TanStack Query: all server data (API responses). Never store server data in Redux."),
    bullet("Use local React state: form inputs (via React Hook Form), component-local toggles, hover/focus states."),
    bullet("Do not derive state: compute from existing state in selectors (Reselect) rather than storing computed values."),
    spacer(),
  ];
}

// ─── SECTION 10 ──────────────────────────────────────────────────────────────
function section10() {
  return [
    h1("Section 10 — Authentication & Authorization"),
    sectionDivider(),

    h2("10.1 Auth Flow"),
    bodyBold("Patient registration:"),
    bullet("Patient submits email, password, first name, last name, date of birth."),
    bullet("auth-service validates input, checks for duplicate email, hashes password (bcrypt cost 12)."),
    bullet("User record created with status pending_verification."),
    bullet("Verification email sent with a time-limited signed URL (24-hour expiry)."),
    bullet("On link click: status updated to active. Patient redirected to portal."),
    spacer(80),
    bodyBold("Login:"),
    bullet("Patient or staff submits email + password."),
    bullet("auth-service validates credentials. If staff: checks MFA is enabled; requires TOTP code."),
    bullet("On success: access token (JWT, 15-min expiry) and refresh token (opaque, 7-day expiry) issued."),
    bullet("Access token returned in response body. Refresh token set as httpOnly SameSite=Strict cookie."),
    spacer(80),
    bodyBold("Token refresh:"),
    bullet("Frontend sends POST /auth/refresh with refresh token cookie (automatic via browser)."),
    bullet("Server validates refresh token, issues new access token. Refresh token rotated on each use."),
    bullet("Silent refresh attempted 60 seconds before access token expiry via Axios interceptor."),
    spacer(80),
    bodyBold("Logout:"),
    bullet("Frontend sends POST /auth/logout."),
    bullet("Server invalidates refresh token in database. Refresh token cookie cleared."),
    bullet("Frontend clears Redux auth state and redirects to login page."),
    spacer(),

    h2("10.2 Token Strategy"),
    bullet("Access token: JWT signed with RS256 (asymmetric). Payload: { sub: userId, role, exp, iat }. Stored in memory (Redux state) only — never in localStorage or sessionStorage."),
    bullet("Refresh token: opaque random string (128-bit entropy), stored in database with user_id, expiry, and revoked flag."),
    bullet("Refresh token cookie: httpOnly, SameSite=Strict, Secure, Path=/auth/refresh."),
    bullet("Token rotation: each refresh call issues a new refresh token; the old one is immediately revoked."),
    bullet("Refresh token family tracking: if a revoked refresh token is used, all tokens for that user are revoked (replay attack protection)."),
    spacer(),

    h2("10.3 RBAC — Role Permissions Matrix"),
    makeTable(
      ["Resource", "Patient", "Front Desk", "Dentist", "Billing", "Office Manager", "Admin"],
      [2000, 1100, 1100, 1100, 1100, 1200, 1760],
      [
        ["Own patient record", "R/W", "R/W", "R", "R", "R/W", "R/W"],
        ["Other patient records", "—", "R/W", "R/W (assigned)", "R", "R/W", "R/W"],
        ["Appointments — own", "R/W", "—", "—", "—", "—", "R/W"],
        ["Appointments — all", "—", "R/W", "R", "R", "R/W", "R/W"],
        ["Treatment plans — own", "R (accept only)", "R", "R/W", "R", "R/W", "R/W"],
        ["Billing / claims", "Own only (R)", "R", "—", "R/W", "R/W", "R/W"],
        ["Staff accounts", "—", "—", "—", "—", "R", "R/W"],
        ["System configuration", "—", "—", "—", "—", "R", "R/W"],
        ["Audit logs", "—", "—", "—", "—", "R", "R/W"],
        ["Analytics dashboards", "—", "R (own KPIs)", "R (own)", "R (billing KPIs)", "R/W", "R/W"],
      ]
    ),
    spacer(),

    h2("10.4 OAuth / SSO"),
    inferred("SSO via Google Workspace is deferred to v2.0 for staff. Patient-facing social login (Google) may be added in v1.1 if registration conversion data warrants it. No OAuth providers in v1.0 scope."),
    spacer(),
  ];
}

// ─── SECTION 11 ──────────────────────────────────────────────────────────────
function section11() {
  return [
    h1("Section 11 — Payment System"),
    sectionDivider(),

    h2("11.1 Payment Flow"),
    bullet("Patient navigates to portal /portal/payments and views outstanding balance."),
    bullet("Patient clicks Pay Now and selects amount (full balance or custom amount)."),
    bullet("Stripe PaymentIntent created server-side via billing-service with amount and patient metadata."),
    bullet("Frontend renders Stripe Elements card input. Patient enters card details (never touches Washington Smiles servers)."),
    bullet("Stripe confirms payment. Webhook fires payment_intent.succeeded to billing-service."),
    bullet("billing-service updates patient balance in database, logs payment record, and triggers receipt email via notification-service."),
    bullet("PMS balance updated via API/webhook sync."),
    spacer(),

    h2("11.2 Payment Events & Webhooks"),
    makeTable(
      ["Stripe Event", "System Action"],
      [3600, 5760],
      [
        ["payment_intent.succeeded", "Post payment to patient account; send receipt email; sync PMS balance"],
        ["payment_intent.payment_failed", "Log failure; send failure notification to patient with retry link"],
        ["charge.dispute.created", "Flag claim in AR dashboard; notify billing coordinator; pause follow-up sequences"],
        ["customer.subscription.renewed", "Record membership plan renewal; update patient membership_plan_active flag"],
        ["customer.subscription.deleted", "Deactivate membership plan; send lapse notice to patient"],
      ]
    ),
    spacer(),

    h2("11.3 Revenue Split Logic"),
    notApplicable("Washington Smiles is a single-practice owner model. No revenue split between parties is required."),
    spacer(),

    h2("11.4 Refund & Dispute Handling"),
    bullet("Refunds initiated by billing coordinator via admin dashboard. billing-service calls Stripe Refund API."),
    bullet("Partial and full refunds supported."),
    bullet("Dispute (chargeback) notification received via Stripe webhook. Billing coordinator alerted. Evidence submission handled manually via Stripe dashboard."),
    bullet("All payment and refund events logged in audit_logs table."),
    spacer(),
  ];
}

// ─── SECTION 12 ──────────────────────────────────────────────────────────────
function section12() {
  return [
    h1("Section 12 — Testing Strategy"),
    sectionDivider(),

    h2("12.1 Testing Levels"),
    makeTable(
      ["Level", "Scope", "Tool", "What Is Tested"],
      [1400, 2400, 1600, 3960],
      [
        ["Unit", "Individual functions and components", "Vitest + React Testing Library", "Business logic, utility functions, Redux slices, component render and interactions"],
        ["Integration", "Service-to-service and API-to-database", "Vitest + Supertest + test DB", "API endpoints, database queries, auth middleware, webhook handlers"],
        ["E2E", "Full user flows in browser", "Playwright", "Patient booking flow, intake form submission, treatment plan acceptance, payment flow, staff scheduling"],
        ["Performance", "Frontend Core Web Vitals and API latency", "Lighthouse CI, k6", "LCP, CLS, FID targets; API response time under load"],
        ["Security", "OWASP Top 10 and dependency vulnerabilities", "OWASP ZAP, npm audit, Snyk", "Injection, XSS, auth bypass, rate limiting"],
        ["Accessibility", "WCAG 2.1 AA compliance", "axe-core, manual screen reader testing", "Colour contrast, keyboard navigation, ARIA correctness"],
      ]
    ),
    spacer(),

    h2("12.2 Coverage Targets"),
    bullet("Unit test coverage: minimum 80% line coverage across all service packages."),
    bullet("Integration test coverage: all API endpoints with at least one success case and one failure case."),
    bullet("E2E coverage: all P1 user flows must have an E2E test before release."),
    bullet("Accessibility: axe-core automated scan must return zero violations before deployment."),
    spacer(),

    h2("12.3 Test Data Strategy"),
    bullet("Unit and integration tests use an isolated PostgreSQL test database spun up via Docker in CI."),
    bullet("Test data is generated via factory functions (Faker.js). No production data used in any test environment."),
    bullet("Test database is reset between test suites. Migrations run fresh before each suite."),
    bullet("E2E tests use a seeded staging environment with synthetic patient records. No real PHI in staging."),
    spacer(),

    h2("12.4 CI Test Gate"),
    bullet("All unit and integration tests must pass before any PR can be merged to main."),
    bullet("Lighthouse CI score below 85 on any public page blocks deployment to staging."),
    bullet("npm audit with critical or high vulnerabilities blocks deployment."),
    bullet("E2E tests run on staging post-deploy. Failure triggers rollback alert to on-call engineer."),
    spacer(),
  ];
}

// ─── SECTION 13 ──────────────────────────────────────────────────────────────
function section13() {
  return [
    h1("Section 13 — DevOps & Deployment"),
    sectionDivider(),

    h2("13.1 Git Workflow"),
    bullet("Strategy: GitHub Flow. main is always deployable. Feature branches off main; PR required to merge."),
    bullet("Branch naming: feature/FR-001-patient-registration, fix/AR-dashboard-rounding, chore/upgrade-node."),
    bullet("Commit convention: Conventional Commits (feat:, fix:, chore:, docs:, test:, ci:)."),
    bullet("PR requirements: at least 1 reviewer approval, all CI checks passing, no merge conflicts."),
    bullet("Protected branches: main and release/*. Direct pushes blocked."),
    spacer(),

    h2("13.2 CI/CD Pipeline"),
    makeTable(
      ["Stage", "Trigger", "Actions", "Pass Criteria"],
      [1600, 1800, 3200, 2760],
      [
        ["Lint & Type Check", "Every push", "ESLint, TypeScript tsc --noEmit", "Zero errors"],
        ["Unit & Integration Tests", "Every push", "Vitest, Supertest, test DB spin-up", "All tests pass, 80% coverage"],
        ["Security Scan", "Every push", "npm audit, Snyk", "No critical/high vulnerabilities"],
        ["Docker Build", "Merge to main", "Build all service images, tag with commit SHA", "All images build successfully"],
        ["Push to Registry", "Merge to main", "Push to AWS ECR", "All images pushed"],
        ["Deploy to Staging", "Merge to main", "kubectl apply with new image tags", "All pods healthy, health checks pass"],
        ["E2E Tests on Staging", "Post staging deploy", "Playwright suite", "All P1 E2E tests pass"],
        ["Lighthouse CI", "Post staging deploy", "Lighthouse against staging URL", "Score >= 85 on all public pages"],
        ["Production Deploy", "Release tag vX.Y.Z", "Manual approval → kubectl apply to prod", "All pods healthy in production"],
      ]
    ),
    spacer(),

    h2("13.3 Environment Strategy"),
    makeTable(
      ["Environment", "Purpose", "Deploy Trigger", "Infrastructure", "Access Control"],
      [1400, 1800, 1800, 2360, 2000],
      [
        ["dev", "Local development", "Manual (Docker Compose)", "Local machine", "Developer only"],
        ["staging", "QA, UAT, E2E testing", "Every merge to main", "AWS EKS (smaller node group), RDS single-AZ", "Dev team only"],
        ["production", "Live application", "Tagged release + manual approval", "AWS EKS (Multi-AZ), RDS Multi-AZ, CloudFront", "Restricted to release manager"],
      ]
    ),
    spacer(),

    h2("13.4 Docker & Kubernetes"),
    bullet("Each service has its own Dockerfile. Base image: node:20-alpine (smallest stable LTS)."),
    bullet("Multi-stage Docker builds: build stage installs all dependencies and compiles; production stage copies only dist/ and node_modules (production only)."),
    bullet("Each service has a Kubernetes Deployment, Service (ClusterIP), and HorizontalPodAutoscaler."),
    bullet("Inter-service communication via Kubernetes internal DNS (http://auth-service.washington-smiles-prod.svc.cluster.local)."),
    bullet("Ingress NGINX routes external traffic: /api/* → api-gateway; /* → Next.js web app."),
    spacer(),

    h2("13.5 Terraform Plan"),
    bullet("AWS EKS: managed node group (t3.medium spot + on-demand mix), Kubernetes version pinned."),
    bullet("AWS RDS PostgreSQL 15: db.t3.medium staging, db.r6g.large production Multi-AZ."),
    bullet("AWS ElastiCache Redis: cache.t3.micro staging, cache.r6g.large production."),
    bullet("AWS S3: patient-documents bucket (private, KMS encryption), assets bucket (CloudFront origin)."),
    bullet("AWS Route 53: DNS management for washingtonsmiles.com and api.washingtonsmiles.com."),
    bullet("AWS ACM: TLS certificate for all domains."),
    bullet("AWS Secrets Manager: database credentials, API keys, JWT private key."),
    spacer(),

    h2("13.6 Monitoring & Alerting"),
    bullet("Metrics: Prometheus + Grafana. Key metrics: API error rate, response time P95, pod CPU/memory, database connection pool usage, queue depth."),
    bullet("Alerts: PagerDuty integration. Alert thresholds: API error rate > 1% (P1), pod restart loop (P1), RDS CPU > 80% (P2), queue depth > 1000 (P2)."),
    inferred("Application performance monitoring: Datadog APM or AWS X-Ray for distributed tracing across services."),
    spacer(),

    h2("13.7 Logging Strategy"),
    bullet("Structured JSON logging using Winston. Log levels: error, warn, info, debug."),
    bullet("All PHI fields are redacted or masked before logging. Patient IDs are logged; PHI values are not."),
    bullet("Logs aggregated to AWS CloudWatch Logs. Retention: 90 days application logs, 6 years audit logs (HIPAA requirement)."),
    bullet("Log shipping to a SIEM (e.g., AWS Security Hub or Datadog Logs) for security event correlation."),
    spacer(),
  ];
}

// ─── SECTION 14 ──────────────────────────────────────────────────────────────
function section14() {
  return [
    h1("Section 14 — Performance Optimization Plan"),
    sectionDivider(),

    h2("14.1 Frontend"),
    bullet("Images: WebP format with AVIF fallback. next/image component handles responsive sizing, lazy loading, and format conversion automatically."),
    bullet("Fonts: Self-hosted variable fonts with font-display: swap. Preloaded in <head> using next/font."),
    bullet("Bundle size budget: initial JS bundle under 150KB gzipped per page. Monitored in CI with bundlewatch."),
    bullet("Critical CSS: Next.js extracts critical CSS automatically. No render-blocking stylesheets."),
    bullet("Prefetching: next/link prefetches linked pages on hover. Top-level navigation links prefetched on mount."),
    bullet("Code splitting: dynamic imports (next/dynamic) for heavy components — calendar, PDF viewer, Stripe Elements, GSAP animations."),
    bullet("Third-party scripts: loaded with next/script strategy='lazyOnload' to prevent blocking main thread."),
    spacer(),

    h2("14.2 Backend"),
    bullet("N+1 prevention: Sequelize eager loading (include: []) for all endpoints that join related models. Query plans reviewed in code review."),
    bullet("Caching layer: Redis cache for frequently read, rarely updated data — provider list, service types, fee schedule, system config. Cache TTL: 1 hour. Cache invalidated on admin config update."),
    bullet("Connection pooling: PgBouncer between application services and RDS. Pool size per service: 10 connections."),
    bullet("Background jobs: computationally heavy operations (report generation, eligibility batch checks) offloaded to BullMQ workers — never run in the API request path."),
    spacer(),

    h2("14.3 Database"),
    bullet("Slow query threshold: log all queries exceeding 100ms. Review weekly."),
    bullet("Index rationale documented in migration files. Unused indexes removed on each quarterly review."),
    bullet("audit_logs table: range partitioned by month (PostgreSQL declarative partitioning). Partitions older than 2 years moved to cold storage (AWS S3 via pg_dump) while retaining HIPAA-required retention."),
    bullet("VACUUM and ANALYZE scheduled via AWS RDS maintenance window. Table bloat monitored via pgstats."),
    spacer(),
  ];
}

// ─── SECTION 15 ──────────────────────────────────────────────────────────────
function section15() {
  return [
    h1("Section 15 — Mobile Application"),
    sectionDivider(),
    notApplicable("A dedicated native mobile application is not in scope for v1.0. All patient-facing functionality is accessible via a Progressive Web App (PWA) built into apps/portal. The PWA supports home-screen installation, service workers for offline handling of static content, and push notifications via the Web Push API. Native iOS and Android applications using Flutter are planned for v2.0."),
    spacer(),
    body("PWA requirements for v1.0:"),
    bullet("Service worker registered for offline static caching (app shell)."),
    bullet("Web App Manifest configured with Washington Smiles branding, icons, and theme color."),
    bullet("Web Push API notifications for appointment reminders and treatment plan alerts (requires patient opt-in)."),
    bullet("Install prompt shown on second visit after patient has booked an appointment."),
    spacer(),
  ];
}

// ─── SECTION 16 ──────────────────────────────────────────────────────────────
function section16() {
  return [
    h1("Section 16 — Accessibility & Internationalisation"),
    sectionDivider(),

    h2("16.1 Accessibility Checklist"),
    bodyBold("Semantic HTML:"),
    bullet("Use correct HTML elements: <nav>, <main>, <section>, <article>, <aside>, <header>, <footer>."),
    bullet("One <h1> per page. Heading hierarchy: h1 → h2 → h3 with no skipped levels."),
    spacer(80),
    bodyBold("ARIA:"),
    bullet("All form inputs have associated <label> elements or aria-label attributes."),
    bullet("Error messages linked to inputs via aria-describedby."),
    bullet("Modal dialogs: role='dialog', aria-modal='true', aria-labelledby pointing to modal title."),
    bullet("Custom interactive components (calendar, accordion) use appropriate ARIA patterns from WAI-ARIA Authoring Practices."),
    bullet("Live regions: aria-live='polite' on notification toast container."),
    spacer(80),
    bodyBold("Focus management:"),
    bullet("Visible focus indicator on all interactive elements (2px solid offset ring in brand color)."),
    bullet("Focus trapped inside modals while open. Focus returned to trigger element on close."),
    bullet("Skip-to-main-content link as first focusable element on every page."),
    spacer(80),
    bodyBold("Colour and contrast:"),
    bullet("Normal text (under 18pt): minimum contrast ratio 4.5:1."),
    bullet("Large text (18pt bold or 24pt): minimum contrast ratio 3:1."),
    bullet("No colour used as the sole means of conveying information."),
    spacer(),

    h2("16.2 Internationalisation"),
    body("Washington Smiles serves a primarily English-speaking patient base in Washington, MO. The practice notes multilingual staff (Polish-speaking per Dr. Mertz). For v1.0, the platform is English-only."),
    inferred("i18n architecture built in from day one using next-intl. Translation keys extracted to /locales/en.json. Polish (pl) translation added in v1.1 if patient data confirms sufficient demand. All date, time, and currency formatting handled via Intl API (no hardcoded format strings)."),
    spacer(),
  ];
}

// ─── SECTION 17 ──────────────────────────────────────────────────────────────
function section17() {
  return [
    h1("Section 17 — Security Checklist"),
    sectionDivider(),
    body("Each item must be verified before production deployment."),
    spacer(),

    h2("Frontend"),
    bullet("Content Security Policy header set on all pages. Script sources whitelisted."),
    bullet("X-Frame-Options: DENY on all pages."),
    bullet("X-Content-Type-Options: nosniff on all responses."),
    bullet("Referrer-Policy: strict-origin-when-cross-origin."),
    bullet("All user-generated content sanitised with DOMPurify before render."),
    bullet("No sensitive data (access tokens, PHI) stored in localStorage or sessionStorage."),
    bullet("HTTPS enforced. HTTP requests redirected to HTTPS with 301."),
    spacer(),

    h2("Backend"),
    bullet("All SQL queries use parameterised statements via Sequelize. Raw queries prohibited."),
    bullet("Input validation on all API endpoints using Zod schemas. Validation runs before business logic."),
    bullet("Authentication middleware applied to all protected routes. No route can be accessed without a valid JWT."),
    bullet("Rate limiting: express-rate-limit middleware on all endpoints. Configurable per route."),
    bullet("CORS: whitelisted origins only (washingtonsmiles.com and portal subdomain). Wildcard (*) never used."),
    bullet("Request size limit: 1MB on all endpoints; 10MB on file upload endpoints."),
    bullet("Helmet.js middleware applied to set all security headers automatically."),
    spacer(),

    h2("Database"),
    bullet("PostgreSQL access restricted to application service users only. No public internet access."),
    bullet("Database credentials rotated every 90 days. Credentials in AWS Secrets Manager."),
    bullet("All PHI columns encrypted at application layer (AES-256-GCM) before storage."),
    bullet("RDS encryption at rest enabled (AES-256)."),
    bullet("Automated backups enabled. Point-in-time recovery for last 35 days."),
    bullet("Database user permissions scoped to minimum required (no SUPERUSER, no DROP TABLE)."),
    spacer(),

    h2("Infrastructure"),
    bullet("All Kubernetes pods run as non-root user (securityContext: runAsNonRoot: true)."),
    bullet("Kubernetes Network Policies restrict inter-pod communication to explicitly defined routes."),
    bullet("AWS VPC: application subnets are private. Only load balancer has public IP."),
    bullet("AWS IAM roles follow least-privilege principle. No wildcard action permissions."),
    bullet("CloudTrail logging enabled for all AWS API calls."),
    spacer(),

    h2("Dependency Management"),
    bullet("npm audit run in CI pipeline. Critical and high vulnerabilities block merge."),
    bullet("Snyk or Dependabot configured for automated PR creation on dependency updates."),
    bullet("Dependency updates reviewed weekly. Security patches applied within 24 hours of disclosure."),
    spacer(),

    h2("Secrets Management"),
    bullet("No secrets, credentials, or API keys committed to source code. .gitignore and pre-commit hooks enforce this."),
    bullet("All production secrets in AWS Secrets Manager. Injected as environment variables at runtime."),
    bullet("Secret rotation automated for database passwords and third-party API keys where provider supports it."),
    bullet("Developers use .env.local files for local development only. .env.local is gitignored."),
    spacer(),
  ];
}

// ─── SECTION 18 ──────────────────────────────────────────────────────────────
function section18() {
  const phaseWidths = [800, 1400, 1800, 3560, 1000, 800];
  const phases = [
    ["Phase 1", "Foundation", "Months 1–3",
     "FR-001 to FR-006 (Auth), FR-010 to FR-013 (Scheduling), FR-020 to FR-023 (Intake), FR-050 to FR-051 (Email/SMS), public website (SSG), Section 5.3 infrastructure setup, CI/CD pipeline, HIPAA compliance audit",
     "10 weeks", "Auth live; patients can self-schedule online; digital intake forms collected pre-visit; automated reminders active; HIPAA technical safeguards verified"],
    ["Phase 2", "Engagement", "Months 4–6",
     "FR-030 to FR-035 (Treatment Planning), FR-052 to FR-053 (Portal Notifications, Messaging), FR-071 (Review Solicitation), FR-014 (Smart Waitlist), patient portal complete",
     "10 weeks", "Treatment plans presented and accepted digitally; automated review solicitation live; secure messaging available; waitlist backfill operational"],
    ["Phase 3", "Revenue", "Months 7–9",
     "FR-040 to FR-045 (Billing, Payments, AR Dashboard), FR-070 (Referral Tracking), FR-072 to FR-073 (SEO Content Hub, Lead Capture), staff scheduling dashboard complete",
     "10 weeks", "Patient payments processed online; AR dashboard live; insurance eligibility automated; referral tracking operational; SEO content hub published"],
    ["Phase 4", "Intelligence", "Months 10–12",
     "FR-015 (Predictive Recall), FR-017 (No-Show Scoring), FR-080 to FR-082 (Analytics), PWA capabilities, performance optimisation pass, full BI dashboard",
     "10 weeks", "Predictive no-show scoring active; full BI dashboard available to leadership; PWA installable; platform performance meets all Lighthouse targets"],
  ];

  return [
    h1("Section 18 — Project Phases & Milestones"),
    sectionDivider(),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: phaseWidths,
      rows: [
        makeHeaderRow(["Phase", "Name", "Timeline", "Features Included (FR IDs)", "Duration", "Done When"], phaseWidths),
        ...phases.map((r, i) => makeBodyRow(r, phaseWidths, i % 2 === 0))
      ]
    }),
    spacer(80),
    body("Total estimated duration: 12 months from development start to Phase 4 completion, assuming a full-stack development team of 4–6 engineers. Phase 1 is the critical path — no later phase begins until Phase 1 is in production."),
    spacer(),
  ];
}

// ─── SECTION 19 ──────────────────────────────────────────────────────────────
function section19() {
  return [
    h1("Section 19 — Open Questions & Assumptions"),
    sectionDivider(),

    h2("19.1 Open Questions"),
    bullet("PMS API availability: Which practice management software does Washington Smiles currently use (Dentrix, Eaglesoft, Curve, other)? The scheduling-service integration design depends on the specific PMS API capabilities."),
    bullet("Clearinghouse vendor: Which dental clearinghouse is currently used for claims submission? Integration endpoints differ per vendor (Change Healthcare, Availity, Emdeon)."),
    bullet("Existing patient data migration: Should historical patient records be migrated from the PMS into the new platform, or does the platform start fresh and sync only going forward?"),
    bullet("Membership plan billing: Is the current membership plan billed via an external system (e.g., Kleer)? If so, should the platform integrate with that system or replace it?"),
    bullet("Loyalty rewards: The operations manual references a loyalty rewards app. Is this an existing third-party app (to be integrated) or a new feature to be built from scratch?"),
    bullet("Hosting compliance: Has a Business Associate Agreement been executed with the chosen cloud provider (AWS) for HIPAA compliance?"),
    bullet("After-hours AI phone answering: The operations manual mentions AI phone answering as an opportunity. Is this in scope for v1.0 or a future enhancement?"),
    bullet("Integrity Dental Group multi-tenancy: Should the platform architecture support multi-tenancy for other Integrity Dental Group locations from the start, or is a single-tenant design acceptable for v1.0?"),
    spacer(),

    h2("19.2 Assumptions Made"),
    inferred("The existing practice management software exposes a REST API or supports webhook-based event notifications. If only HL7/FHIR interfaces are available, the scheduling-service integration will require an additional adapter layer."),
    inferred("Washington Smiles does not currently have a custom patient portal. The platform described in this document is a greenfield build, not a migration or enhancement of an existing system."),
    inferred("HIPAA compliance scope: the platform is in scope for HIPAA as a Business Associate. A BAA will be executed with all cloud vendors before any PHI is stored."),
    inferred("The development team has experience with the preferred tech stack. No stack deviation is made due to unfamiliarity."),
    inferred("Stripe is the approved payment processor for patient-facing transactions. CareCredit continues to be handled externally (patient applies on CareCredit website; no integration required for v1.0)."),
    inferred("The practice operates in the US Central Time Zone (America/Chicago). All scheduling UI and notifications display in CT by default."),
    inferred("There are no existing automated tests for any current digital systems. The test suite described in Section 12 is built from scratch."),
    inferred("Dr. Melissa A. Smith and the office manager will serve as primary stakeholders for requirements validation and UAT approval at each phase boundary."),
    spacer(),
  ];
}

// ─── SECTION 20 ──────────────────────────────────────────────────────────────
function section20() {
  const glossary = [
    ["API Gateway", "A single entry point service that receives all inbound API requests, validates authentication, and routes to downstream microservices."],
    ["AR (Accounts Receivable)", "Outstanding insurance claims and patient balances owed to the practice. AR aging measures how long claims have been outstanding."],
    ["BullMQ", "A Redis-backed job queue library for Node.js, used to process background tasks asynchronously."],
    ["BAA (Business Associate Agreement)", "A HIPAA-required contract between a covered entity (the dental practice) and a vendor that processes Protected Health Information."],
    ["Clearinghouse", "An intermediary service that receives dental insurance claims from providers and routes them to payers (insurance companies) in the correct format."],
    ["CLS (Cumulative Layout Shift)", "A Core Web Vital measuring visual stability — how much page elements shift unexpectedly during load. Target: under 0.1."],
    ["CSR (Client-Side Rendering)", "A Next.js rendering mode where the page HTML is generated in the browser after JavaScript loads. Used for authenticated, non-indexed pages."],
    ["DXA (Device-independent pixels in OOXML)", "A unit of measurement used in Word/OOXML documents: 1440 DXA = 1 inch."],
    ["ERA (Electronic Remittance Advice)", "An electronic document from an insurance payer explaining which claims were paid, denied, or adjusted."],
    ["FID (First Input Delay)", "A Core Web Vital measuring interactivity — time from first user interaction to browser response. Target: under 100ms."],
    ["HPA (HorizontalPodAutoscaler)", "A Kubernetes resource that automatically scales the number of pod replicas based on CPU/memory usage."],
    ["HIPAA (Health Insurance Portability and Accountability Act)", "US federal law governing the privacy and security of Protected Health Information. The platform must comply with HIPAA Security and Privacy Rules."],
    ["ISR (Incremental Static Regeneration)", "A Next.js feature that regenerates static pages in the background at a defined interval (revalidate), serving cached versions to users."],
    ["JWT (JSON Web Token)", "A compact, signed token used to represent authenticated user claims. Validated on each API request."],
    ["LCP (Largest Contentful Paint)", "A Core Web Vital measuring loading performance — time for the largest visible content element to render. Target: under 2.5 seconds."],
    ["MFA / TOTP", "Multi-factor authentication using a Time-based One-Time Password (RFC 6238). Required for all staff logins."],
    ["Monorepo", "A single Git repository containing multiple related applications and packages. Managed with TurboRepo."],
    ["PMS (Practice Management Software)", "The existing dental office software (e.g., Dentrix, Eaglesoft) used to manage appointments, patient records, and billing. The platform integrates with, but does not replace, the PMS."],
    ["PHI (Protected Health Information)", "Any patient health information that can identify an individual. HIPAA mandates specific controls for PHI storage and transmission."],
    ["RBAC (Role-Based Access Control)", "An access control model where permissions are assigned to roles, and users are assigned to roles. Enforced at the API middleware layer."],
    ["SSG (Static Site Generation)", "A Next.js rendering mode where HTML is generated at build time. Used for public pages that do not change per user."],
    ["SSR (Server-Side Rendering)", "A Next.js rendering mode where HTML is generated on the server for each request. Used for SEO-critical authenticated pages."],
    ["TanStack Query", "Also known as React Query. A library for managing server state (API data) in React, providing caching, background refetching, and mutation handling."],
    ["TurboRepo", "A build system optimisation tool for JavaScript/TypeScript monorepos. Enables caching of build outputs and parallel task execution."],
    ["Webhook", "An HTTP callback sent by a third-party service (e.g., Stripe, PMS) to notify the platform of an event in near-real-time."],
    ["Zero-Balance Policy", "Washington Smiles practice policy: all patient payments are collected at the time of service. No outstanding patient balances are carried after a visit."],
  ];

  return [
    h1("Section 20 — Glossary"),
    sectionDivider(),
    makeTable(
      ["Term", "Definition"],
      [2800, 6560],
      glossary
    ),
    spacer(),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE, space: 4 } },
      children: [new TextRun({ text: "— End of Document —", font: "Arial", size: 22, bold: true, color: DGRAY })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Washington Smiles Complete Health Dentistry  |  washmosmiles.com  |  Washington, MO", font: "Arial", size: 18, color: "888888" })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Technical Specifications & Requirements Document — v1.0 — June 2026", font: "Arial", size: 18, color: "888888" })]
    }),
  ];
}

// ─── ASSEMBLE ────────────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 22 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: NAVY },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: DGRAY },
        paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 2 }
      },
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
      {
        reference: "sub-bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u25e6",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
        }]
      },
      {
        reference: "numbered",
        levels: [{
          level: 0, format: LevelFormat.DECIMAL, text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BLUE, space: 2 } },
          spacing: { after: 80 },
          children: [
            new TextRun({ text: "Washington Smiles — Technical Specifications & Requirements Document  |  v1.0  |  CONFIDENTIAL", font: "Arial", size: 16, color: "888888" })
          ]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: BLUE, space: 2 } },
          spacing: { before: 80 },
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          children: [
            new TextRun({ text: "Washington Smiles Complete Health Dentistry", font: "Arial", size: 16, color: "888888" }),
            new TextRun({ text: "\tPage ", font: "Arial", size: 16, color: "888888" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 16, color: "888888" }),
          ]
        })]
      })
    },
    children: [
      ...coverPage(),
      new TableOfContents("Table of Contents", { headingStyleRange: "1-3", hyperlink: true }),
      new Paragraph({ children: [new PageBreak()] }),
      ...section1(),
      ...section2(),
      ...section3(),
      ...section4(),
      ...section5(),
      ...section6(),
      ...section7(),
      ...section8(),
      ...section9(),
      ...section10(),
      ...section11(),
      ...section12(),
      ...section13(),
      ...section14(),
      ...section15(),
      ...section16(),
      ...section17(),
      ...section18(),
      ...section19(),
      ...section20(),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/tech_spec.docx', buffer);
  console.log('Generated: /home/claude/tech_spec.docx');
}).catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});