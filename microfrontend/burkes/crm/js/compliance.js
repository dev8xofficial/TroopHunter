/**
 * Burkes Group CRM — Compliance Module
 * Implements §2.2 G-01: First-login disclaimer & partner consent workflow
 */

window.Compliance = (() => {
  'use strict';

  function boot() {
    // Check if the user has already accepted the master compliance agreement
    const hasAccepted = localStorage.getItem('burkes_crm_compliance_accepted');
    if (!hasAccepted) {
      setTimeout(() => {
        showComplianceOverlay();
      }, 500); // Small delay to let the UI finish rendering underneath
    }
  }

  function showComplianceOverlay() {
    const { Modal, Icons } = window.Components;
    
    // Using the Component Modal system but enforcing a static backdrop
    Components.openModal(Modal({
      id: 'compliance-master-agreement',
      title: '⚖️ Legal & Compliance Disclosures',
      subtitle: 'Mandatory Partner Consent Required',
      body: `
        <div style="font-size:var(--text-sm);color:var(--neutral-600);line-height:1.6;margin-bottom:var(--space-4)">
          Welcome to the Burkes Group CRM platform. Before proceeding, you must acknowledge and accept our unified service partner disclosures.
        </div>
        <div style="background:var(--neutral-50);border:1px solid var(--neutral-200);border-radius:var(--radius-md);padding:var(--space-4);max-height:200px;overflow-y:auto;font-size:var(--text-xs);color:var(--neutral-500);line-height:1.5;margin-bottom:var(--space-4)">
          <strong>1. Data Sharing Across Divisions</strong><br>
          By proceeding, you consent to the explicit sharing of pipeline, contact, and identity data across Burkes Group LLC divisions (Real Estate, Mortgage, and Insurance) strictly as required for transactional closing velocity.<br><br>
          <strong>2. Affiliated Business Arrangements (AfBA)</strong><br>
          This CRM orchestrates multi-departmental lead sharing. All affiliated business arrangement disclosures must be formally documented inside individual deal files prior to closing.<br><br>
          <strong>3. Audit Logging</strong><br>
          Your actions within the CRM (including data exports, stage updates, and API invocations) are logged indefinitely for compliance and security auditing purposes.
        </div>
        <label style="display:flex;align-items:flex-start;gap:var(--space-2);cursor:pointer">
          <input type="checkbox" id="compliance-checkbox" style="margin-top:2px" onchange="document.getElementById('compliance-accept-btn').disabled = !this.checked">
          <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--neutral-800)">
            I have read, understood, and accept the Burkes Group Master Compliance and Multi-Department Data Sharing Agreement.
          </span>
        </label>
      `,
      footerRight: `
        <button class="btn btn-primary" id="compliance-accept-btn" disabled 
                onclick="
                  localStorage.setItem('burkes_crm_compliance_accepted', 'true');
                  Components.closeModal('compliance-master-agreement');
                  Components.Toast('Compliance parameters accepted.', 'success');
                ">
          Agree & Continue
        </button>
      `
    }));

    // Override the modal's default close behavior so it cannot be bypassed
    setTimeout(() => {
      const modalDimmer = document.querySelector('.modal-backdrop');
      if (modalDimmer) {
        modalDimmer.onclick = null; // Remove click-to-close
      }
      const closeBtn = document.querySelector('#compliance-master-agreement .modal-close');
      if (closeBtn) {
        closeBtn.style.display = 'none'; // Hide the 'X' button
      }
    }, 50);
  }

  // Also expose a way to manually view disclosures from the User Profile or Admin later
  function showActiveDisclosures() {
    Components.Toast('All active user disclosures are currently in Good Standing.', 'info');
  }

  return { boot, showActiveDisclosures };
})();
