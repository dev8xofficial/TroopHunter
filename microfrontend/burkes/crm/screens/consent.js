/**
 * Burkes Group CRM — Compliance & Consent Module
 * Gap Analysis §2.2 — G-01, G-02, G-03
 * Source: Meeting Transcripts (T2-01, T2-02, T2-14, T4-19)
 * Implements:
 *   1. First-login consent overlay (T2-01 — "like Disney+")
 *   2. Per-department compliance notices (T2-02)
 *   3. Partner services non-obligation disclosure (T2-14)
 *   4. Data ownership enforcement banner (T4-19)
 */

window.Compliance = (() => {
  'use strict';

  const CONSENT_KEY       = 'bg_crm_consent_v1';
  const DEPT_NOTICE_KEY   = 'bg_crm_dept_notices_v1';

  // ── Department-specific compliance copy ────────────────────────────────────
  const DEPT_COMPLIANCE = {
    insurance: {
      icon: '🛡️',
      label: 'Insurance — Compliance Notice',
      color: 'var(--dept-insurance)',
      bg: 'var(--dept-insurance-bg)',
      text: 'var(--dept-insurance-text)',
      body: 'All insurance-related communications and records in this workspace are managed by <strong>Burkes Group Marketing LLC</strong>. Data is retained for a minimum of <strong>18 months</strong> per regulatory requirements. Call recordings are subject to compliance review.'
    },
    mortgage: {
      icon: '🏦',
      label: 'Mortgage — Compliance Notice',
      color: 'var(--dept-mortgage)',
      bg: 'var(--dept-mortgage-bg)',
      text: 'var(--dept-mortgage-text)',
      body: 'All mortgage-related records are retained for a minimum of <strong>24 months</strong> per CFPB and state requirements. Data is owned by <strong>Burkes Group Marketing LLC</strong>. Mortgage Liaison access is scoped to this department only.'
    },
    real_estate: {
      icon: '🏡',
      label: 'Real Estate — Compliance Notice',
      color: 'var(--dept-real-estate)',
      bg: 'var(--dept-real-estate-bg)',
      text: 'var(--dept-real-estate-text)',
      body: 'All real estate transaction records are retained for a minimum of <strong>4 years</strong> per TREC requirements. Agents must hold a valid Texas real estate license. Data is owned by <strong>Burkes Group Marketing LLC</strong>. All agents accessing this workspace have agreed to our compliance terms.'
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. First-Login Consent Overlay
  // ─────────────────────────────────────────────────────────────────────────
  function hasConsented() {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) return false;
      const { version, ts } = JSON.parse(stored);
      return version === '1' && !!ts;
    } catch { return false; }
  }

  function recordConsent(userId) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      version: '1',
      ts: new Date().toISOString(),
      user_id: userId || 'USR-OW-001'
    }));
  }

  function showConsentOverlay() {
    // Inject overlay HTML into body
    const overlay = document.createElement('div');
    overlay.id = 'consent-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Compliance Agreement — Required');

    overlay.innerHTML = `
      <style>
        #consent-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(10, 20, 35, 0.92);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          animation: consent-fade-in 0.3s ease;
        }
        @keyframes consent-fade-in { from { opacity:0 } to { opacity:1 } }

        #consent-box {
          background: white; border-radius: 16px; max-width: 680px; width: 100%;
          box-shadow: 0 32px 64px rgba(0,0,0,0.45);
          display: flex; flex-direction: column;
          max-height: 90vh; overflow: hidden;
        }

        #consent-header {
          padding: 28px 32px 20px;
          border-bottom: 1px solid var(--neutral-200, #e5e5e5);
          flex-shrink: 0;
        }
        #consent-header-brand {
          display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
        }
        #consent-header-logo {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--color-primary-navy, #1a3a52);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Archivo', sans-serif; font-weight: 800;
          font-size: 16px; color: var(--color-primary-gold, #fdb913);
          flex-shrink: 0;
        }
        #consent-header h2 {
          font-family: 'Archivo', sans-serif; font-size: 20px;
          font-weight: 800; color: var(--color-primary-navy, #1a3a52);
          margin: 0; letter-spacing: -0.02em;
        }
        #consent-header p {
          font-size: 13px; color: var(--neutral-500, #737373); margin: 0;
        }
        #consent-subtitle {
          font-size: 13px; color: var(--neutral-600, #525252);
          line-height: 1.5;
        }

        #consent-body {
          overflow-y: auto; padding: 24px 32px;
          flex: 1;
        }
        #consent-body::-webkit-scrollbar { width: 6px; }
        #consent-body::-webkit-scrollbar-thumb { background: var(--neutral-300,#d4d4d4); border-radius: 3px; }

        .consent-section {
          margin-bottom: 20px;
          padding: 16px 18px;
          border-radius: 10px;
          border: 1.5px solid var(--neutral-200, #e5e5e5);
          background: var(--neutral-50, #fafafa);
        }
        .consent-section-title {
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.07em; color: var(--neutral-500, #737373);
          margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .consent-section p {
          font-size: 13px; color: var(--neutral-700, #404040);
          line-height: 1.6; margin: 0;
        }
        .consent-section p + p { margin-top: 8px; }

        .consent-retention-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;
          margin-top: 12px;
        }
        .consent-ret-cell {
          padding: 10px 12px; border-radius: 8px; text-align: center;
          background: white; border: 1px solid var(--neutral-200, #e5e5e5);
        }
        .consent-ret-cell-dept {
          font-size: 11px; font-weight: 700; text-transform: uppercase;
          letter-spacing: .05em; margin-bottom: 4px;
        }
        .consent-ret-cell-val {
          font-size: 15px; font-weight: 800;
          font-family: 'Archivo', sans-serif;
          color: var(--color-primary-navy, #1a3a52);
        }
        .consent-ret-cell-key {
          font-size: 10px; color: var(--neutral-400, #a3a3a3); margin-top: 2px;
        }

        #consent-footer {
          padding: 20px 32px 24px;
          border-top: 1px solid var(--neutral-200, #e5e5e5);
          flex-shrink: 0;
          background: var(--neutral-50, #fafafa);
        }
        #consent-ack-row {
          display: flex; align-items: flex-start; gap: 10px;
          margin-bottom: 16px; cursor: pointer;
        }
        #consent-ack-row input[type=checkbox] {
          width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
          accent-color: var(--color-primary-navy, #1a3a52); cursor: pointer;
        }
        #consent-ack-row label {
          font-size: 13px; color: var(--neutral-700, #404040);
          line-height: 1.5; cursor: pointer;
        }
        #consent-submit {
          width: 100%; padding: 14px;
          background: var(--color-primary-navy, #1a3a52);
          color: white; border: none; border-radius: 10px;
          font-family: 'Archivo', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: background 0.15s, opacity 0.15s;
          opacity: 0.45; pointer-events: none;
          letter-spacing: -0.01em;
        }
        #consent-submit.active {
          opacity: 1; pointer-events: all;
        }
        #consent-submit.active:hover {
          background: #14304a;
        }
        #consent-scroll-prompt {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--neutral-400, #a3a3a3);
          margin-bottom: 14px; justify-content: center;
        }
      </style>

      <div id="consent-box">

        <!-- Header -->
        <div id="consent-header">
          <div id="consent-header-brand">
            <div id="consent-header-logo">BG</div>
            <div>
              <h2>Burkes Group CRM</h2>
              <p>Platform Access & Compliance Agreement</p>
            </div>
          </div>
          <div id="consent-subtitle">
            Before accessing the CRM, you must review and acknowledge the following compliance terms.
            This agreement covers data handling, call recording, and your responsibilities as a platform user.
          </div>
        </div>

        <!-- Scrollable Body -->
        <div id="consent-body" onscroll="window.Compliance.onConsentScroll(this)">

          <!-- Data Ownership -->
          <div class="consent-section">
            <div class="consent-section-title">🏢 Data Ownership</div>
            <p>
              All customer data, call recordings, documents, and operational records created or accessed through
              this platform are the <strong>exclusive property of Burkes Group Marketing LLC</strong>.
            </p>
            <p>
              Individual departments (Insurance, Mortgage, Real Estate) access this platform under a
              subscription arrangement. Agents are granted access within their department scope and must
              not share, export, or distribute records outside of authorized workflows.
            </p>
          </div>

          <!-- Call Recording Consent -->
          <div class="consent-section">
            <div class="consent-section-title">🎙️ Call Recording Notice</div>
            <p>
              All inbound and outbound calls made through this CRM platform are <strong>automatically recorded</strong>
              for compliance, quality assurance, and dispute resolution purposes. By accessing the call features,
              you confirm you have obtained appropriate consent from all parties in jurisdictions that require it.
            </p>
            <p>
              Recordings are retained according to department-specific policies (see below) and are owned by
              Burkes Group Marketing LLC. Unauthorized playback or distribution of recordings is strictly prohibited.
            </p>
          </div>

          <!-- Data Retention -->
          <div class="consent-section">
            <div class="consent-section-title">📋 Data Retention Policies</div>
            <p>Records are retained for the minimum periods required by regulation:</p>
            <div class="consent-retention-grid">
              <div class="consent-ret-cell">
                <div class="consent-ret-cell-dept" style="color:var(--dept-insurance,#fdb913)">Insurance</div>
                <div class="consent-ret-cell-val">18 mo</div>
                <div class="consent-ret-cell-key">Call recordings</div>
              </div>
              <div class="consent-ret-cell">
                <div class="consent-ret-cell-dept" style="color:var(--dept-mortgage,#3b82f6)">Mortgage</div>
                <div class="consent-ret-cell-val">24 mo</div>
                <div class="consent-ret-cell-key">Call recordings</div>
              </div>
              <div class="consent-ret-cell">
                <div class="consent-ret-cell-dept" style="color:var(--dept-real-estate,#10b981)">Real Estate</div>
                <div class="consent-ret-cell-val">4 yr</div>
                <div class="consent-ret-cell-key">Call recordings</div>
              </div>
              <div class="consent-ret-cell">
                <div class="consent-ret-cell-dept" style="color:var(--dept-insurance,#fdb913)">Insurance</div>
                <div class="consent-ret-cell-val">3 yr</div>
                <div class="consent-ret-cell-key">Policy documents</div>
              </div>
              <div class="consent-ret-cell">
                <div class="consent-ret-cell-dept" style="color:var(--dept-mortgage,#3b82f6)">Mortgage</div>
                <div class="consent-ret-cell-val">2 yr</div>
                <div class="consent-ret-cell-key">Loan documents</div>
              </div>
              <div class="consent-ret-cell">
                <div class="consent-ret-cell-dept" style="color:var(--dept-real-estate,#10b981)">Real Estate</div>
                <div class="consent-ret-cell-val">4 yr</div>
                <div class="consent-ret-cell-key">Transaction records</div>
              </div>
            </div>
          </div>

          <!-- Partner Services Disclosure (T2-14) -->
          <div class="consent-section">
            <div class="consent-section-title">🤝 Partner Services Disclosure</div>
            <p>
              Burkes Group may refer clients to partner businesses (credit repair, title companies,
              plumbing, roofing, etc.) through this platform. <strong>Clients are never obligated to use
              any partner or affiliated service.</strong>
            </p>
            <p>
              Agents must not present partner referrals as requirements for receiving primary services
              (insurance, mortgage, real estate). Any such misrepresentation is a violation of platform
              policy and applicable consumer protection laws.
            </p>
          </div>

          <!-- Department Scope -->
          <div class="consent-section">
            <div class="consent-section-title">🔐 Role & Department Scope</div>
            <p>
              Your access is limited to the departments assigned to your role. Reading contact records
              across departments is permitted; writing is restricted to your assigned department(s).
              Violations of data access policy will result in immediate account suspension.
            </p>
            <p>
              Activity logs are <strong>immutable</strong> — all actions you take are permanently recorded
              and attributable to your user account.
            </p>
          </div>

          <!-- Video Meeting Recordings -->
          <div class="consent-section">
            <div class="consent-section-title">🎬 Video Meeting Recordings</div>
            <p>
              Video meetings conducted through this platform (Microsoft Teams, Google Meet) may be recorded.
              Recordings are retained for <strong>90 days</strong> and then automatically purged unless exported.
              Agents are responsible for notifying meeting participants of recording at the start of each session.
            </p>
          </div>

        </div>

        <!-- Footer -->
        <div id="consent-footer">
          <div id="consent-scroll-prompt">
            ↕ Please scroll through all terms above before confirming
          </div>
          <div id="consent-ack-row">
            <input type="checkbox" id="consent-ack-check"
                   onchange="window.Compliance.onConsentCheck(this.checked)">
            <label for="consent-ack-check">
              I have read and agree to the Burkes Group CRM compliance terms, including data ownership,
              call recording policies, data retention schedules, and the partner services disclosure.
              I understand my access is scoped to my assigned role and department.
            </label>
          </div>
          <button id="consent-submit"
                  onclick="window.Compliance.submitConsent()">
            Confirm & Access CRM
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);
  }

  function onConsentScroll(el) {
    // Once user scrolls near the bottom, show scroll prompt as done
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    const prompt = document.getElementById('consent-scroll-prompt');
    if (prompt && atBottom) {
      prompt.textContent = '✓ All terms reviewed';
      prompt.style.color = 'var(--color-success, #10b981)';
      prompt.style.fontWeight = '600';
    }
  }

  function onConsentCheck(checked) {
    const btn = document.getElementById('consent-submit');
    if (btn) btn.classList.toggle('active', checked);
  }

  function submitConsent() {
    if (!document.getElementById('consent-ack-check')?.checked) return;
    recordConsent('USR-OW-001');
    const overlay = document.getElementById('consent-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      setTimeout(() => overlay.remove(), 320);
    }
    // Show welcome toast after consent
    setTimeout(() => {
      if (window.Components && window.Components.Toast) {
        Components.Toast('Compliance agreement accepted — Welcome to Burkes Group CRM', 'success');
      }
    }, 400);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Per-Department Compliance Notices (T2-02)
  // Shown as a dismissible inline banner the first time a user visits each dept
  // ─────────────────────────────────────────────────────────────────────────
  function getDismissedNotices() {
    try { return JSON.parse(localStorage.getItem(DEPT_NOTICE_KEY) || '{}'); }
    catch { return {}; }
  }

  function dismissDeptNotice(dept) {
    const dismissed = getDismissedNotices();
    dismissed[dept] = true;
    localStorage.setItem(DEPT_NOTICE_KEY, JSON.stringify(dismissed));
    const el = document.getElementById(`dept-compliance-notice-${dept}`);
    if (el) {
      el.style.maxHeight = el.scrollHeight + 'px';
      el.style.overflow = 'hidden';
      el.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease';
      requestAnimationFrame(() => {
        el.style.maxHeight = '0';
        el.style.opacity = '0';
        el.style.marginBottom = '0';
      });
      setTimeout(() => el.remove(), 320);
    }
  }

  /**
   * Returns the HTML for a per-department compliance banner.
   * Call this from within each department workspace screen's render().
   */
  function deptComplianceBanner(dept) {
    const dismissed = getDismissedNotices();
    if (dismissed[dept]) return '';

    const cfg = DEPT_COMPLIANCE[dept];
    if (!cfg) return '';

    return `
      <div id="dept-compliance-notice-${dept}"
           style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-4) var(--space-5);
                  background:${cfg.bg};border:1.5px solid ${cfg.color};border-radius:var(--radius-lg);
                  margin-bottom:var(--space-5)">
        <span style="font-size:20px;flex-shrink:0;margin-top:1px">${cfg.icon}</span>
        <div style="flex:1">
          <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:.06em;
                      color:${cfg.color};margin-bottom:var(--space-1)">${cfg.label}</div>
          <div style="font-size:var(--text-sm);color:${cfg.text};line-height:1.5">${cfg.body}</div>
          <div style="margin-top:var(--space-3);display:flex;align-items:center;gap:var(--space-3)">
            <span style="font-size:var(--text-xs);color:${cfg.text};opacity:.7">
              🔒 Platform owned by Burkes Group Marketing LLC · Data retained per regulatory schedule
            </span>
          </div>
        </div>
        <button onclick="window.Compliance.dismissDeptNotice('${dept}')"
                style="flex-shrink:0;background:none;border:none;cursor:pointer;
                       color:${cfg.text};opacity:.6;font-size:16px;line-height:1;padding:0;
                       margin-top:2px"
                title="Dismiss compliance notice"
                aria-label="Dismiss">✕</button>
      </div>`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Partner Services Disclosure (T2-14)
  // Returns HTML snippet for injection into lead transfer modals
  // ─────────────────────────────────────────────────────────────────────────
  function partnerDisclosureHTML() {
    return `
      <div style="display:flex;align-items:flex-start;gap:var(--space-2);padding:var(--space-3) var(--space-4);
                  background:var(--color-info-bg,#eff6ff);border:1px solid var(--color-info,#3b82f6);
                  border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-info-text,#1e40af)">
        <span style="flex-shrink:0;font-size:15px;margin-top:1px">⚖️</span>
        <div>
          <strong>Partner Services Disclosure:</strong> Clients are <u>not obligated</u> to use any
          referred partner service (title companies, credit repair, insurance, etc.).
          Partner referrals must be presented as optional to the client.
        </div>
      </div>`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Boot — check and show consent on app load
  // ─────────────────────────────────────────────────────────────────────────
  function boot() {
    if (!hasConsented()) {
      // Delay slightly so the loading splash can finish its exit animation
      setTimeout(showConsentOverlay, 420);
    }
  }

  return {
    boot,
    hasConsented,
    showConsentOverlay,
    submitConsent,
    onConsentScroll,
    onConsentCheck,
    deptComplianceBanner,
    dismissDeptNotice,
    partnerDisclosureHTML,
    // Expose for dev reset
    resetConsent() { localStorage.removeItem(CONSENT_KEY); localStorage.removeItem(DEPT_NOTICE_KEY); }
  };

})();
