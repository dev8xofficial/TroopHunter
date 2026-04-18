/* =============================================================
   INSURANCE SCREEN — 004-insurance spec
   Client-owned policy forms (HOME / AUTO / WARRANTY) with
   state-machine-driven UI and role-scoped access.
   ============================================================= */

const InsuranceScreen = (() => {
  // ── Policy config ─────────────────────────────────────────
  const POLICY_META = {
    HOME: {
      icon: '🏠',
      label: 'Homeowners Insurance',
      desc: 'Required by your lender before closing. Covers structural damage, liability, and personal property.',
      required: true,
      fields: [
        { id: 'policyholder_name', label: 'Policyholder Name', type: 'text', placeholder: 'Full legal name', required: true },
        { id: 'policy_number', label: 'Policy Number', type: 'text', placeholder: 'e.g. HO-123456', required: false },
        { id: 'provider_name', label: 'Insurance Provider', type: 'text', placeholder: 'e.g. State Farm', required: false },
        { id: 'property_address', label: 'Property Address', type: 'text', placeholder: 'Pre-filled from transaction', required: true },
        { id: 'coverage_amount', label: 'Coverage Amount ($)', type: 'number', placeholder: '500000', required: false },
        { id: 'annual_premium', label: 'Annual Premium ($)', type: 'number', placeholder: '1200', required: false },
        { id: 'effective_date', label: 'Effective Date', type: 'date', placeholder: '', required: false },
        { id: 'additional_info', label: 'Notes (optional)', type: 'textarea', placeholder: 'Any additional information', required: false },
      ],
    },
    AUTO: {
      icon: '🚗',
      label: 'Auto Insurance',
      desc: 'Verification of current auto coverage as required by your mortgage agreement.',
      required: true,
      fields: [
        { id: 'policyholder_name', label: 'Policyholder Name', type: 'text', placeholder: 'Full legal name', required: true },
        { id: 'dob', label: 'Date of Birth', type: 'date', placeholder: '', required: true },
        { id: 'vin_number', label: 'Vehicle VIN', type: 'text', placeholder: '17-character VIN', required: true, maxlength: 17 },
        { id: 'policy_number', label: 'Policy Number', type: 'text', placeholder: 'e.g. AU-88821', required: false },
        { id: 'provider_name', label: 'Insurance Provider', type: 'text', placeholder: 'e.g. Geico', required: false },
        { id: 'additional_info', label: 'Notes (optional)', type: 'textarea', placeholder: 'Any additional information', required: false },
      ],
    },
    WARRANTY: {
      icon: '🛡️',
      label: 'Home Warranty',
      desc: 'Optional protection plan covering home systems and appliances for the first year.',
      required: false,
      fields: [
        { id: 'policyholder_name', label: 'Policyholder Name', type: 'text', placeholder: 'Full legal name', required: false },
        { id: 'provider_name', label: 'Warranty Provider', type: 'text', placeholder: 'e.g. American Home Shield', required: false },
        { id: 'property_address', label: 'Property Address', type: 'text', placeholder: '', required: false },
        { id: 'coverage_term', label: 'Coverage Term', type: 'text', placeholder: 'e.g. 1 year', required: false },
        { id: 'additional_info', label: 'Notes (optional)', type: 'textarea', placeholder: 'Covered systems, appliances…', required: false },
      ],
    },
  };

  // ── Helpers ───────────────────────────────────────────────
  function _getPolicies() {
    return window.MockData?.insurance?.policies || [];
  }

  function _getPolicy(type) {
    return _getPolicies().find((p) => p.type === type) || { type, status: 'NOT_STARTED', data: {} };
  }

  function _isReadOnly() {
    // Only CL can edit; others read-only
    return Session.role !== 'CL';
  }

  function _statusBadge(status) {
    const map = {
      NOT_STARTED: { variant: 'gray', label: 'Not Started' },
      PENDING: { variant: 'amber', label: 'In Progress' },
      COMPLETED: { variant: 'green', label: 'Verified' },
    };
    const s = map[status] || map.NOT_STARTED;
    return `<span class="badge badge-${s.variant}">${s.label}</span>`;
  }

  function _complianceSummary(policies) {
    const required = policies.filter((p) => POLICY_META[p.type]?.required);
    const completed = required.filter((p) => p.status === 'COMPLETED');
    const total = required.length;
    const count = completed.length;
    const allDone = count === total;

    return { count, total, allDone };
  }

  // ── Render ────────────────────────────────────────────────
  function render(outlet) {
    if (!outlet) return;

    const policies = _getPolicies();
    const { count, total, allDone } = _complianceSummary(policies);
    const readOnly = _isReadOnly();
    const role = Session.role;

    // Roles that can see insurance data
    const canView = ['CL', 'LN', 'AT', 'TC'].includes(role);
    if (!canView) {
      outlet.innerHTML = `
        <div class="screen">
          <div class="page-header">
            <h1 class="page-title">Insurance</h1>
          </div>
          <div class="card" style="max-width:560px;margin:0 auto">
            <div class="card-bd" style="text-align:center;padding:var(--space-12)">
              <div style="font-size:2.5rem;margin-bottom:var(--space-3)">🔒</div>
              <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-navy);margin-bottom:var(--space-2)">Access Restricted</div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500)">Your role does not have access to insurance policy information.</div>
            </div>
          </div>
        </div>`;
      return;
    }

    outlet.innerHTML = `
      <div class="screen">

        <div class="page-header">
          <div class="page-header-left">
            <h1 class="page-title">Insurance</h1>
            <p class="page-subtitle">Policy verification required before closing</p>
          </div>
          <div class="page-actions">
            <span class="badge badge-${allDone ? 'green' : 'amber'}" style="font-size:13px;padding:6px 14px">
              ${count}/${total} Required Policies Complete
            </span>
          </div>
        </div>

        ${
          !allDone
            ? `
          <div class="alert-banner alert-banner-warning" style="margin-bottom:var(--space-5);border-radius:var(--radius-lg)" role="status">
            <svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M9 1L17 16H1L9 1z"/><line x1="9" y1="7" x2="9" y2="11"/><circle cx="9" cy="13.5" r=".75" fill="currentColor" stroke="none"/></svg>
            <div class="alert-banner-body">
              <div class="alert-banner-title">Insurance verification pending</div>
              <div class="alert-banner-desc">Complete and verify all required policies before your closing date to avoid delays.</div>
            </div>
          </div>`
            : `
          <div class="alert-banner alert-banner-success" style="margin-bottom:var(--space-5);border-radius:var(--radius-lg)" role="status">
            <svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="8"/><polyline points="5,9 8,12 13,6"/></svg>
            <div class="alert-banner-body">
              <div class="alert-banner-title">All required insurance verified</div>
              <div class="alert-banner-desc">Your lender and attorney have the coverage details they need for closing.</div>
            </div>
          </div>`
        }

        <!-- Compliance bar -->
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-6)">
          ${policies
            .filter((p) => POLICY_META[p.type]?.required)
            .map(
              (p) => `
            <div style="flex:1;height:6px;border-radius:var(--radius-full);background:${p.status === 'COMPLETED' ? 'var(--color-success)' : p.status === 'PENDING' ? 'var(--color-warning)' : 'var(--neutral-200)'}; transition:background .3s"></div>
          `,
            )
            .join('')}
        </div>

        <div class="insurance-grid" id="insurance-grid">
          ${Object.entries(POLICY_META)
            .map(([type, meta]) => _renderPolicyCard(type, meta, _getPolicy(type), readOnly))
            .join('')}
        </div>

      </div>`;

    _bindEvents(outlet);
  }

  function _renderPolicyCard(type, meta, policy, readOnly) {
    const status = policy.status || 'NOT_STARTED';
    const data = policy.data || {};
    const docs = policy.document_ids || (policy.data?.document_id ? [policy.data.document_id] : []);
    const isComplete = status === 'COMPLETED';
    const isPending = status === 'PENDING';
    const isNew = status === 'NOT_STARTED';

    const headerAccent = isComplete ? 'var(--color-success)' : isPending ? 'var(--color-warning)' : 'var(--neutral-300)';

    return `
      <div class="card" style="position:relative;overflow:hidden" id="policy-card-${type}">
        <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${headerAccent}"></div>

        <div class="card-hdr">
          <div class="card-hdr-left">
            <div class="card-icon" style="font-size:20px;background:${isComplete ? 'var(--color-success-bg)' : 'var(--neutral-100)'}">
              ${meta.icon}
            </div>
            <div>
              <div class="card-title">${meta.label}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-500);margin-top:2px">
                ${meta.required ? '⚡ Required' : '✦ Optional'}
              </div>
            </div>
          </div>
          ${_statusBadge(status)}
        </div>

        <div class="card-bd">

          ${
            !isNew
              ? ''
              : `
            <p style="font-size:var(--text-sm);color:var(--neutral-500);margin-bottom:var(--space-4);line-height:1.6">${meta.desc}</p>
          `
          }

          ${
            isNew && !readOnly
              ? `
            <button class="btn btn-secondary" style="width:100%;justify-content:center" data-start-policy="${type}" type="button">
              ${meta.icon} Start ${meta.label}
            </button>
          `
              : isNew && readOnly
                ? `
            <p style="font-size:var(--text-sm);color:var(--neutral-400);text-align:center;padding:var(--space-4) 0">${meta.desc}</p>
            <div style="text-align:center">${_statusBadge('NOT_STARTED')}</div>
          `
                : `
            <form data-policy-form="${type}" novalidate>
              <div class="form-grid-2">
                ${meta.fields.map((f) => _renderField(f, data[f.id] || _getPrefill(f.id), readOnly)).join('')}
              </div>

              ${
                docs.length > 0
                  ? `
                <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-success-bg);border-radius:var(--radius-md);display:flex;align-items:center;gap:var(--space-2)">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-success-dark)" stroke-width="2" stroke-linecap="round" aria-hidden="true"><polyline points="2,7 5,10 12,3"/></svg>
                  <span style="font-size:var(--text-xs);color:var(--color-success-dark);font-weight:500">Policy document on file</span>
                </div>
              `
                  : !readOnly
                    ? `
                <div style="margin-top:var(--space-4)">
                  <label class="form-label">Policy Document</label>
                  <div class="upload-zone" style="padding:var(--space-4)" data-policy-upload="${type}" role="button" tabindex="0" aria-label="Upload policy document">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--neutral-400)" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><line x1="10" y1="3" x2="10" y2="14"/><polyline points="5,8 10,3 15,8"/><path d="M2 17h16"/></svg>
                    <div style="font-size:var(--text-xs);color:var(--neutral-500)">Click to upload proof of insurance (PDF, JPG, PNG)</div>
                  </div>
                </div>
              `
                    : ''
              }

              ${
                !readOnly
                  ? `
                <div style="margin-top:var(--space-5);display:flex;gap:var(--space-3)">
                  <button class="btn btn-primary" data-save-policy="${type}" type="button" style="flex:1;justify-content:center">
                    ${isComplete ? '✓ Saved — Update' : 'Save Policy'}
                  </button>
                  ${isPending ? `<button class="btn btn-secondary" data-mark-complete="${type}" type="button">Mark Complete</button>` : ''}
                </div>
              `
                  : ''
              }
            </form>
          `
          }

        </div>
      </div>`;
  }

  function _renderField(field, value, readOnly) {
    const colSpan = field.type === 'textarea' ? 'grid-column:1/-1' : '';

    if (readOnly) {
      return `
        <div style="${colSpan}">
          <div class="form-label" style="margin-bottom:4px">${field.label}</div>
          <div style="font-size:var(--text-sm);color:${value ? 'var(--neutral-800)' : 'var(--neutral-400)'};padding:var(--space-2) 0">
            ${value || '—'}
          </div>
        </div>`;
    }

    const attrs = [`id="field-${field.id}"`, `name="${field.id}"`, `placeholder="${field.placeholder}"`, field.required ? 'required' : '', field.maxlength ? `maxlength="${field.maxlength}"` : '', value ? `value="${value}"` : ''].filter(Boolean).join(' ');

    if (field.type === 'textarea') {
      return `
        <div class="form-group" style="${colSpan};margin-bottom:0">
          <label class="form-label" for="field-${field.id}">${field.label}${field.required ? ' <span style="color:var(--color-error)">*</span>' : ''}</label>
          <textarea class="form-textarea" ${attrs} style="min-height:72px">${value || ''}</textarea>
        </div>`;
    }

    return `
      <div class="form-group" style="${colSpan};margin-bottom:0">
        <label class="form-label" for="field-${field.id}">${field.label}${field.required ? ' <span style="color:var(--color-error)">*</span>' : ''}</label>
        <input class="form-input" type="${field.type}" ${attrs}/>
      </div>`;
  }

  function _getPrefill(fieldId) {
    const tx = window.MockData?.transaction;
    if (!tx) return '';
    if (fieldId === 'property_address') {
      const a = tx.property_address;
      return a ? `${a.street}, ${a.city}, ${a.state} ${a.postal_code}` : '';
    }
    if (fieldId === 'policyholder_name') return tx.client_name || '';
    return '';
  }

  // ── Event binding ─────────────────────────────────────────
  function _bindEvents(outlet) {
    // Start policy
    outlet.querySelectorAll('[data-start-policy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.startPolicy;
        const policy = _getPolicy(type);
        policy.status = 'PENDING';
        render(outlet);
      });
    });

    // Save policy
    outlet.querySelectorAll('[data-save-policy]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.savePolicy;
        const form = outlet.querySelector(`[data-policy-form="${type}"]`);
        const policy = _getPolicies().find((p) => p.type === type) || { type, status: 'PENDING', data: {} };

        if (form) {
          if (!policy.data) policy.data = {};
          form.querySelectorAll('input, textarea, select').forEach((el) => {
            if (el.name) policy.data[el.name] = el.value;
          });
          if (policy.status === 'NOT_STARTED') policy.status = 'PENDING';
        }

        // Validate required VIN length for AUTO
        if (type === 'AUTO') {
          const vin = policy.data?.vin_number || '';
          if (vin && vin.length !== 17) {
            Toast.error('VIN must be exactly 17 characters.');
            return;
          }
        }

        Toast.success(`${POLICY_META[type]?.label} saved successfully.`);
        render(outlet);
      });
    });

    // Mark complete
    outlet.querySelectorAll('[data-mark-complete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.markComplete;
        const policy = _getPolicies().find((p) => p.type === type);
        if (policy) {
          Modal.confirm({
            title: `Verify ${POLICY_META[type]?.label}`,
            message: 'Confirm that all policy details are accurate and a document has been uploaded. This status will be visible to your lender and attorney.',
            confirmLabel: 'Mark as Complete',
            cancelLabel: 'Review Again',
            variant: 'primary',
            onConfirm: () => {
              policy.status = 'COMPLETED';
              Toast.success(`${POLICY_META[type]?.label} marked as verified!`);
              render(outlet);
            },
          });
        }
      });
    });

    // Upload zones
    outlet.querySelectorAll('[data-policy-upload]').forEach((zone) => {
      zone.addEventListener('click', () => {
        Toast.info('Document upload — attach file to this policy.');
      });
      zone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') zone.click();
      });
    });
  }

  return { render };
})();

window.InsuranceScreen = InsuranceScreen;
