/**
 * Burkes Group CRM — Contacts Screen
 * Source: .specify/specs/002-contacts/spec.md, screens/contacts.yaml
 * Batch: 2 of 7 — Dashboard + Contacts (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.contacts = {
  render() {
    const { contacts, helpers } = window.MockData;
    const { Icons, DataTable, DeptBadge, StageBadge, Avatar } = window.Components;

    const columns = [
      {
        key: 'name', label: 'Contact',
        render: (v, row) => `
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            ${Avatar({ initials: row.first_name[0] + row.last_name[0], size: 30 })}
            <div>
              <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${row.first_name} ${row.last_name}
                ${row.missing_data ? '<span title="Missing data" style="margin-left:4px;font-size:9px;background:#fef3c7;color:#92400e;padding:1px 5px;border-radius:99px;font-weight:600">INCOMPLETE</span>' : ''}
              </div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">${row.email}</div>
            </div>
          </div>`
      },
      { key: 'phone', label: 'Phone', render: (v) => `<span style="font-size:var(--text-sm);font-family:monospace">${v}</span>` },
      {
        key: 'departments', label: 'Departments',
        render: (v) => `<div style="display:flex;gap:4px;flex-wrap:wrap">${v.map(d => DeptBadge(d)).join('')}</div>`
      },
      {
        key: 'pipeline_stage', label: 'Stage',
        render: (v, row) => {
          const dept = row.departments[0];
          return StageBadge(v[dept] || '—');
        }
      },
      { key: 'source', label: 'Source', render: v => `<span class="badge badge-gray">${v}</span>` },
      {
        key: 'created_at', label: 'Created',
        render: v => `<span style="font-size:var(--text-xs);color:var(--neutral-400)">${helpers.formatDate(v)}</span>`
      },
      {
        key: '_actions', label: '',
        render: (v, row) => `
          <div style="display:flex;gap:var(--space-1);opacity:0" class="row-actions">
            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Screens.contacts.callContact('${row.id}')" title="Call">${Icons.phone}</button>
            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Screens.contacts.smsContact('${row.id}')" title="SMS">${Icons.message}</button>
            <button class="btn btn-ghost btn-sm btn-icon" onclick="event.stopPropagation();Screens.contacts.emailContact('${row.id}')" title="Email">${Icons.mail}</button>
          </div>`
      }
    ];

    // Add full_name for search indexing
    const tableRows = contacts.map(c => ({ ...c, name: `${c.first_name} ${c.last_name}` }));

    return `
      <!-- Contacts Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Contacts</h1>
          <p>${contacts.length} contacts · Unified customer directory</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Screens.contacts.openImportModal()">
            ${Icons.externalLink} Import
          </button>
          <button class="btn btn-primary btn-sm" onclick="Screens.contacts.openNewContactModal()">
            ${Icons.plus} New Contact
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input id="contacts-search" type="text" placeholder="Search by name, email, or phone…">
        </div>
        <select class="filter-select" id="contacts-dept-filter">
          <option value="">All Departments</option>
          <option value="insurance">Insurance</option>
          <option value="mortgage">Mortgage</option>
          <option value="real_estate">Real Estate</option>
        </select>
        <select class="filter-select" id="contacts-stage-filter">
          <option value="">All Stages</option>
          <option>New Inquiry</option>
          <option>Contacted</option>
          <option>Quoted / Offer</option>
          <option>Under Contract</option>
          <option>Pending Close</option>
          <option>Closed</option>
        </select>
        <select class="filter-select" id="contacts-source-filter">
          <option value="">All Sources</option>
          <option>portal</option><option>manual</option><option>import</option><option>referral</option><option>partner</option>
        </select>
        <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);color:var(--neutral-600);cursor:pointer;white-space:nowrap">
          <input type="checkbox" id="contacts-missing-filter" style="accent-color:var(--color-primary-navy)"> Missing data
        </label>
        <button class="filter-clear" onclick="Screens.contacts.clearFilters()">Clear filters</button>
      </div>

      <!-- Contacts Table -->
      ${DataTable({
        id: 'contacts',
        columns,
        rows: tableRows,
        pageSize: 12,
        searchable: false,
        emptyMsg: 'No contacts match your filters',
        onRowClick: (row) => window.Screens.contacts.openProfile(row.id)
      })}
    `;
  },

  init() {
    // Add hover effects to table rows
    setTimeout(() => {
      const style = document.createElement('style');
      style.textContent = `
        tbody tr:hover .row-actions { opacity: 1 !important; }
      `;
      document.head.appendChild(style);

      // Bind filter controls
      const searchEl = document.getElementById('contacts-search');
      const deptEl = document.getElementById('contacts-dept-filter');
      const stageEl = document.getElementById('contacts-stage-filter');
      const sourceEl = document.getElementById('contacts-source-filter');
      const missingEl = document.getElementById('contacts-missing-filter');

      const applyFilters = () => {
        const q = searchEl?.value.toLowerCase() || '';
        const dept = deptEl?.value || '';
        const stage = stageEl?.value || '';
        const source = sourceEl?.value || '';
        const missingOnly = missingEl?.checked || false;

        const state = window._tables?.['table-contacts'];
        if (!state) return;

        state.filtered = state.allRows.filter(row => {
          const nameMatch = !q || `${row.first_name} ${row.last_name} ${row.email} ${row.phone}`.toLowerCase().includes(q);
          const deptMatch = !dept || row.departments.includes(dept);
          const stageMatch = !stage || Object.values(row.pipeline_stage || {}).includes(stage);
          const sourceMatch = !source || row.source === source;
          const missingMatch = !missingOnly || row.missing_data;
          return nameMatch && deptMatch && stageMatch && sourceMatch && missingMatch;
        });
        state.page = 1;
        const renderer = window._tableRenderers?.['table-contacts'];
        if (renderer) renderer(state);
      };

      [searchEl, deptEl, stageEl, sourceEl].forEach(el => el?.addEventListener('input', applyFilters));
      if (missingEl) missingEl.addEventListener('change', applyFilters);
    }, 100);
  },

  clearFilters() {
    ['contacts-search','contacts-dept-filter','contacts-stage-filter','contacts-source-filter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const missing = document.getElementById('contacts-missing-filter');
    if (missing) missing.checked = false;

    const state = window._tables?.['table-contacts'];
    if (state) {
      state.filtered = [...state.allRows];
      state.search = '';
      state.page = 1;
      const renderer = window._tableRenderers?.['table-contacts'];
      if (renderer) renderer(state);
    }
  },

  openProfile(contactId) {
    const contact = window.MockData.contacts.find(c => c.id === contactId);
    if (!contact) return;
    const { helpers, activities } = window.MockData;
    const { Icons, DeptBadge, StageBadge, Avatar, ActivityItem } = window.Components;

    const contactActivities = activities
      .filter(a => a.contact_id === contactId)
      .sort((a,b) => new Date(b.occurred_at) - new Date(a.occurred_at))
      .slice(0, 6);

    const depts = contact.departments;

    window.Components.openDrawer({
      title: `${contact.first_name} ${contact.last_name}`,
      subtitle: contact.email,
      wide: true,
      body: `
        <!-- Contact Header -->
        <div style="display:flex;align-items:center;gap:var(--space-4);padding-bottom:var(--space-5);border-bottom:1px solid var(--neutral-100);margin-bottom:var(--space-5)">
          ${Avatar({ initials: contact.first_name[0] + contact.last_name[0], size: 52 })}
          <div style="flex:1">
            <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:var(--weight-bold);color:var(--color-primary-navy)">${contact.first_name} ${contact.last_name}</div>
            <div style="font-size:var(--text-sm);color:var(--neutral-500);margin-bottom:var(--space-2)">${contact.email} · ${contact.phone}</div>
            <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
              ${depts.map(d => DeptBadge(d)).join('')}
              <span class="badge badge-gray">${contact.source}</span>
              ${contact.missing_data ? '<span class="badge badge-gold badge-dot">Missing data</span>' : '<span class="badge badge-green">Complete</span>'}
              ${contact.portal_origin ? '<span class="badge badge-blue">Portal intake</span>' : ''}
              <!-- §2.4 G-02: LinkedIn Sales Navigator (T4-03) -->
              <span class="badge badge-gray" style="background:#e0f2fe;color:#0369a1">💼 Sales Nav Linked</span>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-2)">
            <!-- §2.5 G-03: Contact card sharing (T4-14) -->
            <button class="btn btn-secondary btn-sm" onclick="Screens.contacts.shareContact('${contact.id}')" title="Share Contact Card">
              📤 Share
            </button>
            <!-- §2.9 G-10: QR Code Portal Intake (M4 28:54) -->
            <button class="btn btn-secondary btn-sm" onclick="Components.Toast('Client Intake QR Code generated & copied to clipboard.', 'success')" title="Generate Portal Intake QR">
              📱 QR Intake
            </button>
            <div style="width:1px;background:var(--neutral-200);margin:0 4px"></div>
            <!-- §2.4 G-02: LinkedIn Sales Navigator (T4-03) -->
            <button class="btn btn-secondary btn-sm" onclick="Components.Toast('Opening LinkedIn Sales Navigator profile…', 'info')" title="View in Sales Navigator">
              💼 LinkedIn
            </button>
            <button class="btn btn-secondary btn-sm" onclick="Screens.contacts.callContact('${contact.id}')" title="Call">${Icons.phone}</button>
            <button class="btn btn-secondary btn-sm" onclick="Screens.contacts.smsContact('${contact.id}')" title="SMS">${Icons.message}</button>
            <button class="btn btn-secondary btn-sm" onclick="Screens.contacts.emailContact('${contact.id}')" title="Email">${Icons.mail}</button>
          </div>
        </div>

        <!-- Pipeline Status per Department -->
        ${depts.map(d => `
          <div style="padding:var(--space-3) var(--space-4);background:var(--neutral-50);border-radius:var(--radius-md);margin-bottom:var(--space-3);border-left:3px solid var(--dept-${d === 'insurance' ? 'insurance' : d === 'mortgage' ? 'mortgage' : 'real-estate'})">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <span class="dept-dot dept-dot-${d}"></span>
                <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">${helpers.departmentLabel(d)}</span>
              </div>
              ${StageBadge(contact.pipeline_stage[d] || '—')}
            </div>
            <div style="font-size:var(--text-xs);color:var(--neutral-400);margin-top:var(--space-1)">
              Agent: ${(() => { const u = window.MockData.users.find(u => u.id === (contact.assigned_agents[d] || '')); return u ? u.full_name : 'Unassigned'; })()}
            </div>
          </div>`).join('')}

        <!-- Identity Details -->
        <div class="profile-section">
          <div class="profile-section-title">Identity</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Phone</span>
              <span class="profile-field-value">${contact.phone}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Email</span>
              <span class="profile-field-value">${contact.email}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Address</span>
              <span class="profile-field-value">${contact.address || '—'}, ${contact.city}, ${contact.state}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Created</span>
              <span class="profile-field-value">${helpers.formatDate(contact.created_at)}</span>
            </div>
          </div>
        </div>

        <!-- Consent -->
        <div class="profile-section">
          <div class="profile-section-title">Consent & Compliance</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Consented At</span>
              <span class="profile-field-value">${helpers.formatDate(contact.consent?.consented_at)}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Consent Source</span>
              <span class="profile-field-value">${contact.consent?.source || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Document ID</span>
              <span class="profile-field-value">${contact.consent?.consent_document_id || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Contact ID</span>
              <span class="profile-field-value" style="font-family:monospace">${contact.id}</span>
            </div>
          </div>
        </div>

        <!-- §2.5 G-11: Family Members (T4-34) -->
        ${contact.family_members && contact.family_members.length ? `
        <div class="profile-section">
          <div class="profile-section-title">Family / Household</div>
          ${contact.family_members.map(f => `
            <div style="display:flex;align-items:center;padding:var(--space-2) var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);margin-bottom:var(--space-2)">
              <div style="width:28px;height:28px;border-radius:50%;background:var(--neutral-200);display:flex;align-items:center;justify-content:center;margin-right:var(--space-3);font-size:12px">
                ${f.relationship === 'spouse' ? '💍' : f.relationship === 'child' ? '🧒' : '👥'}
              </div>
              <div style="flex:1">
                <div style="font-weight:var(--weight-semibold);font-size:var(--text-sm);color:var(--neutral-800)">${f.name}</div>
                <div style="font-size:var(--text-xs);color:var(--neutral-500);text-transform:capitalize">${f.relationship} ${f.dob ? `· DOB: ${helpers.formatDate(f.dob)}` : ''}</div>
              </div>
            </div>`).join('')}
        </div>` : ''}

        ${contact.vehicles?.length ? `
        <!-- Vehicles -->
        <div class="profile-section">
          <div class="profile-section-title">Vehicles</div>
          ${contact.vehicles.map(v => `
            <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-sm)">
              <span style="font-weight:var(--weight-semibold)">${v.year} ${v.make} ${v.model}</span>
              <span style="color:var(--neutral-400);font-size:var(--text-xs);margin-left:var(--space-2)">VIN: ${v.vin}</span>
            </div>`).join('')}
        </div>` : ''}

        <!-- §2.5 G-12: Document Upload (T4-27) -->
        <div class="profile-section">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3)">
            <div class="profile-section-title" style="margin-bottom:0">Documents</div>
            <button class="btn btn-secondary btn-sm" onclick="Screens.contacts.triggerCameraUpload('${contact.id}')" title="Scan or Upload Document">
               📸 Scan / Upload
            </button>
          </div>
          <div style="padding:var(--space-4);border:2px dashed var(--neutral-200);border-radius:var(--radius-md);text-align:center;color:var(--neutral-400);font-size:var(--text-sm)">
            No documents uploaded yet.
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="profile-section">
          <div class="profile-section-title">Recent Activity</div>
          ${contactActivities.length
            ? `<div class="activity-feed">${contactActivities.map(a => ActivityItem({ icon: a.icon, iconClass: a.iconClass, title: a.label, actor: a.actor_name, time: a.occurred_at, dept: a.department })).join('')}</div>`
            : `<div style="color:var(--neutral-400);font-size:var(--text-sm);text-align:center;padding:var(--space-5)">No activity recorded yet</div>`}
        </div>
      `,
      footer: `
        <button class="btn btn-secondary" onclick="Screens.contacts.transferLead('${contact.id}')">Transfer Lead</button>
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>
        <button class="btn btn-primary" onclick="Components.closeDrawer()">Edit Contact</button>
      `
    });
  },

  openNewContactModal() {
    const { Icons } = window.Components;
    const steps = [
      { label: 'Identity', active: true },
      { label: 'Department', active: false },
      { label: 'Enrichment', active: false }
    ];

    window.Components.openModal(window.Components.Modal({
      id: 'new-contact',
      title: 'New Contact',
      subtitle: 'Create a contact with minimal data — enrich over time',
      steps,
      body: `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">First Name</label>
            <input class="form-input" id="nc-first" placeholder="First name">
          </div>
          <div class="form-group">
            <label class="form-label required">Last Name</label>
            <input class="form-input" id="nc-last" placeholder="Last name">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label required">Phone</label>
          <input class="form-input" id="nc-phone" placeholder="(555) 000-0000">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" id="nc-email" type="email" placeholder="email@example.com">
          <div class="form-helper">Optional at intake — add later as you enrich the record</div>
        </div>
        <div class="form-group">
          <label class="form-label required">Contact Source</label>
          <select class="form-select" id="nc-source">
            <option value="manual">Manual entry</option>
            <option value="referral">Referral</option>
            <option value="partner">Partner</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">Department(s)</label>
          <div class="checkbox-group">
            <div class="checkbox-item dept-insurance" onclick="this.classList.toggle('selected')">
              <span class="dept-dot dept-dot-insurance"></span> Insurance
            </div>
            <div class="checkbox-item dept-mortgage" onclick="this.classList.toggle('selected')">
              <span class="dept-dot dept-dot-mortgage"></span> Mortgage
            </div>
            <div class="checkbox-item dept-real-estate" onclick="this.classList.toggle('selected')">
              <span class="dept-dot dept-dot-real-estate"></span> Real Estate
            </div>
          </div>
        </div>`,
      footerLeft: `<span style="font-size:var(--text-xs);color:var(--neutral-400)">Fields marked * are required</span>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal()">Cancel</button>
        <button class="btn btn-primary" onclick="Screens.contacts.saveNewContact()">
          Create Contact ${Icons.check}
        </button>`
    }));
  },

  saveNewContact() {
    const first = document.getElementById('nc-first')?.value;
    const last = document.getElementById('nc-last')?.value;
    const phone = document.getElementById('nc-phone')?.value;
    if (!first || !last || !phone) {
      alert('Please fill in required fields: First Name, Last Name, Phone');
      return;
    }
    window.Components.closeModal();
    // Show success toast
    Screens.contacts.showToast(`Contact "${first} ${last}" created successfully`);
  },

  openImportModal() {
    window.Components.openModal(window.Components.Modal({
      id: 'import-contacts',
      title: 'Import Contacts',
      subtitle: 'Bring in contacts from legacy sources',
      body: `
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div style="padding:var(--space-4);border:2px dashed var(--neutral-300);border-radius:var(--radius-md);text-align:center;cursor:pointer" onclick="">
            <div style="font-size:32px;margin-bottom:var(--space-2)">📁</div>
            <div style="font-weight:var(--weight-semibold);color:var(--neutral-700)">Drop CSV file or click to browse</div>
            <div style="font-size:var(--text-xs);color:var(--neutral-400);margin-top:var(--space-1)">Supports Follow Up Boss export format</div>
          </div>
          <div class="form-group">
            <label class="form-label">Import Source</label>
            <select class="form-select">
              <option>Follow Up Boss</option>
              <option>Agency Zoom</option>
              <option>Custom CSV</option>
            </select>
          </div>
          <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-info-text)">
            ℹ️ Duplicate contacts will be flagged for review before import completes.
          </div>
        </div>`
    }));
  },

  transferLead(contactId) {
    window.Components.closeDrawer();
    const contact = window.MockData.contacts.find(c => c.id === contactId);
    window.Components.openModal(window.Components.Modal({
      id: 'transfer-lead',
      title: 'Transfer Lead',
      subtitle: `Reassign ${contact?.first_name} ${contact?.last_name} to a new owner`,
      body: `
        <div class="form-group">
          <label class="form-label required">Department</label>
          <select class="form-select">
            <option>Insurance</option><option>Mortgage</option><option>Real Estate</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">New Owner</label>
          <select class="form-select">
            ${window.MockData.users.map(u => `<option value="${u.id}">${u.full_name} (${window.MockData.helpers.roleName(u.role)})</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Transfer Note</label>
          <textarea class="form-input" rows="3" placeholder="Optional note for the new owner…" style="height:auto;padding:var(--space-2) var(--space-3)"></textarea>
        </div>
        <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-info-text)">
          ℹ️ The new owner will be notified and all activity history will be preserved.
        </div>
        <!-- §2.2 G-03: Partner Services Disclosure (T2-14) -->
        ${window.Compliance ? window.Compliance.partnerDisclosureHTML() : ''}`
    }));
  },

  callContact(contactId) {
    Router.navigate('calls');
  },
  smsContact(contactId) {
    Router.navigate('sms');
  },
  emailContact(contactId) {
    Router.navigate('email');
  },
  shareContact(contactId) {
    const contact = window.MockData.contacts.find(c => c.id === contactId);
    if (!contact) return;

    // Generate standard vCard (VCF) format
    const vCard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${contact.last_name || ''};${contact.first_name || ''};;;`,
      `FN:${contact.first_name || ''} ${contact.last_name || ''}`,
      `TEL;TYPE=CELL:${contact.phone || ''}`,
      `EMAIL;TYPE=WORK:${contact.email || ''}`,
      'END:VCARD'
    ].join('\\n');

    const file = new File([vCard], `${contact.first_name}_${contact.last_name}.vcf`, { type: 'text/vcard' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: `Contact Card: ${contact.first_name} ${contact.last_name}`,
        text: 'Shared from Burkes Group CRM',
        files: [file]
      }).catch(err => console.log('Share aborted', err));
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`Name: ${contact.first_name} ${contact.last_name}\nPhone: ${contact.phone}\nEmail: ${contact.email}`)
        .then(() => window.Components.Toast('Contact details copied to clipboard', 'success'))
        .catch(() => window.Components.Toast('Failed to share contact', 'error'));
    }
  },
  
  // §2.5 G-12: Camera-based document upload
  triggerCameraUpload(contactId) {
    // Create a hidden file input that prefers the device's rear camera if on mobile (PWA behavior)
    let input = document.getElementById('camera-upload-input');
    if (!input) {
      input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,application/pdf';
      // 'capture' attribute triggers the camera directly on mobile devices
      input.setAttribute('capture', 'environment');
      input.id = 'camera-upload-input';
      input.style.display = 'none';
      
      input.onchange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          window.Components.Toast(`Document scanned and uploaded for contact.`, 'success');
        }
      };
      document.body.appendChild(input);
    }
    input.click();
  },

  showToast(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:24px;right:24px;background:var(--neutral-800);color:white;padding:12px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:9999;box-shadow:var(--shadow-lg);animation:slideUp 0.2s ease`;
    toast.textContent = '✓ ' + msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
};