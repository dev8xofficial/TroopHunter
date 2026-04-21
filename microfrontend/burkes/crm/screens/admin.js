/**
 * Burkes Group CRM — Admin Settings Screen
 * Source: .specify/specs/016-admin-settings/spec.md, screens/admin.yaml
 * Batch: 7 of 7 — Integrations + Reports + Admin Settings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.admin = {
  _activeTab: 'users',  // 'users' | 'roles' | 'retention' | 'entitlements' | 'audit'

  render() {
    const { Icons } = window.Components;

    return `
      <!-- Admin Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Admin Settings</h1>
          <p>User management · Role scoping · Retention policies · Feature governance</p>
        </div>
        <div class="screen-actions">
          ${this._activeTab === 'users' ? `
          <button class="btn btn-primary btn-sm" onclick="Screens.admin.openInviteUser()">
            ${Icons.plus} Invite User
          </button>` : ''}
        </div>
      </div>

      <!-- Access Notice -->
      <div class="degraded-banner" style="border-color:var(--color-primary-navy);
           background:rgba(26,58,82,0.05);margin-bottom:var(--space-5)">
        <span class="degraded-banner-icon">🔒</span>
        <span class="degraded-banner-text" style="color:var(--color-primary-navy)">
          Admin Settings are restricted to <strong>Platform Administrators (PA)</strong>.
          All changes are automatically recorded in the audit trail.
        </span>
        <span style="margin-left:auto;font-size:var(--text-xs);color:var(--neutral-500)">
          Session: Platform Admin (PA) · Burkes Group Marketing LLC
        </span>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        ${[
          ['users',        '👥 Users'],
          ['roles',        '🔑 Roles & Scope'],
          ['retention',    '📋 Retention'],
          ['security',     '🔒 Security / 2FA'],
          ['billing',      '💳 Billing'],
          ['branding',     '🎨 White-Label'],
          ['entitlements', '⚙️ Entitlements'],
          ['audit',        '📜 Audit Log']
        ].map(([v, l]) => `
          <div class="tab ${this._activeTab === v ? 'active' : ''}"
               onclick="Screens.admin._activeTab='${v}';Screens.admin.refreshContent()">
            ${l}
          </div>`).join('')}
      </div>

      <!-- Content -->
      <div id="admin-content">
        ${this.renderTabContent()}
      </div>`;
  },

  renderTabContent() {
    switch (this._activeTab) {
      case 'roles':        return this.renderRoles();
      case 'retention':    return this.renderRetention();
      case 'security':     return this.renderSecurity();
      case 'billing':      return this.renderBilling();
      case 'branding':     return this.renderBranding();
      case 'entitlements': return this.renderEntitlements();
      case 'audit':        return this.renderAudit();
      default:             return this.renderUsers();
    }
  },

  /* ── USERS ──────────────────────────────────────────── */
  renderUsers() {
    const { adminSettings } = window.MockData;
    const { Icons } = window.Components;

    const roleConfig = {
      OW: { label: 'Dept. Owner',     cls: 'badge-navy'   },
      IA: { label: 'Insurance Agent', cls: 'badge-gold'   },
      ML: { label: 'Mortgage Liaison',cls: 'badge-blue'   },
      RA: { label: 'RE Agent',        cls: 'badge-green'  },
      PA: { label: 'Platform Admin',  cls: 'badge-red'    },
      AT: { label: 'Attorney (Ext.)', cls: 'badge-purple' }
    };

    return `
      <div class="table-wrapper">
        <div class="table-toolbar">
          <span class="table-toolbar-title">CRM Users</span>
          <div class="table-toolbar-right">
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">${adminSettings.users.length} users</span>
            <button class="btn btn-primary btn-sm" onclick="Screens.admin.openInviteUser()">
              ${Icons.plus} Invite User
            </button>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Department Scope</th>
                <!-- §2.3 G-04 & G-05: License / Bar verification (T2-05, T2-06) -->
                <th>Credential</th>
                <th>Verified</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${adminSettings.users.map(u => {
                const user = window.MockData.users.find(x => x.id === u.user_id);
                const rc   = roleConfig[u.role] || { label: u.role, cls: 'badge-gray' };
                return `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:var(--space-3)">
                        <div style="width:34px;height:34px;border-radius:50%;background:var(--color-primary-navy);
                                    color:white;display:flex;align-items:center;justify-content:center;
                                    font-size:11px;font-weight:700;flex-shrink:0">
                          ${user?.initials || u.role[0]}
                        </div>
                        <div>
                          <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${user?.full_name || 'Unknown'}</div>
                          <div style="font-size:var(--text-xs);color:var(--neutral-400)">${user?.email || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td><span class="badge ${rc.cls}">${rc.label}</span></td>
                    <td>
                      <div style="display:flex;gap:4px;flex-wrap:wrap">
                        ${(u.department_scope || []).length > 0
                          ? u.department_scope.map(d => `
                              <span class="badge badge-${d === 'insurance' ? 'gold' : d === 'mortgage' ? 'blue' : 'green'}" style="font-size:10px">
                                ${window.MockData.helpers.departmentLabel(d)}
                              </span>`).join('')
                          : `<span style="font-size:var(--text-xs);color:var(--neutral-400)">All departments</span>`}
                      </div>
                    </td>
                    <td>
                      ${u.role === 'RA' || u.role === 'OW' && user?.license_number
                        ? `<div style="font-family:monospace;font-size:11px;color:var(--neutral-700)">${u.license_number || '<span style="color:var(--color-danger-text);font-size:10px">⚠ Not provided</span>'}</div>
                           <div style="font-size:10px;color:var(--neutral-400)">TREC License</div>`
                        : u.role === 'AT'
                        ? `<div style="font-family:monospace;font-size:11px;color:var(--neutral-700)">${u.bar_number || '<span style="color:var(--color-danger-text);font-size:10px">⚠ Not provided</span>'}</div>
                           <div style="font-size:10px;color:var(--neutral-400)">TX Bar Number</div>`
                        : `<span style="font-size:var(--text-xs);color:var(--neutral-300)">N/A</span>`}
                    </td>
                    <td>
                      ${(u.role === 'RA' && u.license_number) || (u.role === 'OW' && u.license_number)
                        ? `<span class="badge badge-green" style="font-size:10px">✓ Verified</span>`
                        : u.role === 'AT' && u.bar_number
                        ? `<span class="badge badge-green" style="font-size:10px">✓ Verified</span>`
                        : (u.role === 'RA' || u.role === 'AT')
                        ? `<span class="badge badge-red" style="font-size:10px">⚠ Missing</span>`
                        : `<span style="color:var(--neutral-300);font-size:10px">—</span>`}
                    </td>
                    <td>
                      <span class="badge badge-${u.status === 'active' ? 'green' : u.status === 'invited' ? 'blue' : 'red'}">
                        ${u.status}
                      </span>
                    </td>
                    <td>
                      <div style="display:flex;gap:var(--space-1)">
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Screens.admin.openEditUser('${u.user_id}')" title="Edit user">✏️</button>
                        ${u.role !== 'PA' ? `
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Components.Toast('User suspended — change logged to audit','warning')" title="Suspend">⏸</button>` : ''}
                      </div>
                    </td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ── ROLES ──────────────────────────────────────────── */
  renderRoles() {
    const roles = [
      { abbrev:'OW', label:'Department Owner',  read:'All departments', write:'Own dept. + approvals', transfer:'✅', admin:'Limited',  credential:'TREC License (if RE)' },
      { abbrev:'IA', label:'Insurance Agent',   read:'All departments', write:'Insurance only',          transfer:'✅', admin:'—',        credential:'—'                  },
      { abbrev:'ML', label:'Mortgage Liaison',  read:'All departments', write:'Mortgage only',           transfer:'—',  admin:'—',        credential:'—'                  },
      { abbrev:'RA', label:'Real Estate Agent', read:'All departments', write:'Real Estate only',        transfer:'✅', admin:'—',        credential:'TREC License ✅ Req.'  },
      { abbrev:'AT', label:'Attorney (External)',read:'Client files (portal)', write:'Notes only',       transfer:'—',  admin:'—',        credential:'TX Bar Number ✅ Req.' },
      { abbrev:'PA', label:'Platform Admin',    read:'All departments', write:'All departments',         transfer:'✅', admin:'Full',     credential:'—'                  }
    ];

    const actions = [
      ['contact.create',          [true,  true,  false, true,  false, true]],
      ['contact.edit',            [true,  true,  true,  true,  false, true]],
      ['contact.transfer',        [true,  true,  false, true,  false, true]],
      ['lead.stage_update',       [true,  true,  true,  true,  false, true]],
      ['call.place',              [true,  true,  true,  true,  false, true]],
      ['call.play_recording',     [true,  false, false, false, false, true]],
      ['sms.send',                [true,  true,  true,  true,  false, true]],
      ['campaign.send',           [true,  false, false, false, false, true]],
      ['meeting.launch',          [true,  true,  true,  true,  true,  true]],
      ['file.annotate',           [false, false, false, false, true,  true]],
      ['integrations.manage',     [false, false, false, false, false, true]],
      ['admin.settings.manage',   [false, false, false, false, false, true]],
      ['retention_policy.edit',   [false, false, false, false, false, true]]
    ];

    return `
      <!-- Role Definitions Table -->
      <div class="card" style="overflow:hidden;margin-bottom:var(--space-5)">
        <div class="card-header">
          <span class="card-title">Role Definitions</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">source: access_control.yaml</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr><th>Role</th><th>Read</th><th>Write</th><th>Transfer</th><th>Admin</th><th>Required Credential</th></tr>
            </thead>
            <tbody>
              ${roles.map(r => `
                <tr>
                  <td>
                    <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${r.label}</div>
                    <code style="font-size:10px;color:var(--neutral-400)">${r.abbrev}</code>
                  </td>
                  <td style="font-size:var(--text-sm);color:var(--neutral-600)">${r.read}</td>
                  <td style="font-size:var(--text-sm);color:var(--neutral-600)">${r.write}</td>
                  <td style="text-align:center;font-size:var(--text-md)">${r.transfer}</td>
                  <td style="font-size:var(--text-sm);color:${r.admin === '—' ? 'var(--neutral-300)' : 'var(--color-primary-navy)'}">
                    ${r.admin}
                  </td>
                  <!-- §2.3 G-04 & G-05: credential requirement column -->
                  <td style="font-size:var(--text-xs);font-weight:var(--weight-semibold);
                              color:${r.credential.includes('Req.') ? 'var(--color-success-text)' : 'var(--neutral-300)'}">
                    ${r.credential}
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Permission Matrix -->
      <div class="card" style="overflow:hidden">
        <div class="card-header">
          <span class="card-title">Permission Matrix</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Action × Role</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Action</th>
                ${roles.map(r => `<th style="text-align:center">${r.abbrev}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${actions.map(([action, allowed]) => `
                <tr>
                  <td><code style="font-size:11px;background:var(--neutral-100);padding:2px 6px;border-radius:4px">${action}</code></td>
                  ${allowed.map(a => `
                    <td style="text-align:center;font-size:14px">
                      ${a
                        ? '<span style="color:var(--color-success)">✓</span>'
                        : '<span style="color:var(--neutral-200)">—</span>'}
                    </td>`).join('')}
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  /* ── SECURITY / 2FA (Section 2.7) ───────────────────── */
  renderSecurity() {
    return `
      <!-- §2.7 G-15: Two-Factor Authentication -->
      <div class="card" style="margin-bottom:var(--space-5)">
        <div class="card-header">
          <span class="card-title">Global Security Policies</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Authentication & Compliance</span>
        </div>
        <div style="padding:var(--space-5)">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--neutral-100);padding-bottom:var(--space-4);margin-bottom:var(--space-4)">
            <div>
              <div style="font-weight:var(--weight-semibold);font-size:var(--text-base);color:var(--neutral-800);margin-bottom:var(--space-1)">
                Enforce Two-Factor Authentication (2FA)
              </div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500);max-width:500px;line-height:1.5">
                Require all users to verify logins via an authenticator app (TOTP) or SMS to their registered mobile device.
              </div>
            </div>
            <div>
              <input type="checkbox" id="toggle-2fa" checked onchange="Components.Toast(this.checked ? '2FA globally enforced across CRM' : '2FA enforcement disabled', 'info'); Screens.admin.logAudit('Toggled global 2FA policy to ' + this.checked);">
              <label for="toggle-2fa" style="font-size:var(--text-sm);font-weight:600;margin-left:6px;cursor:pointer">Required</label>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-weight:var(--weight-semibold);font-size:var(--text-base);color:var(--neutral-800);margin-bottom:var(--space-1)">
                Session Timeout
              </div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500);max-width:500px;line-height:1.5">
                Idle minutes before an agent is forcefully logged out of the application.
              </div>
            </div>
            <select class="form-select" onchange="Components.Toast('Session timeout updated','success'); Screens.admin.logAudit('Updated session timeout to ' + this.value)">
              <option value="15">15 Minutes</option>
              <option value="30">30 Minutes</option>
              <option value="60" selected>1 Hour</option>
              <option value="480">8 Hours</option>
            </select>
          </div>
        </div>
      </div>
    `;
  },

  /* ── RETENTION ──────────────────────────────────────── */
  renderRetention() {
    const { adminSettings } = window.MockData;

    const deptConfig = {
      insurance:   { cls: 'badge-gold',  label: 'Insurance'    },
      mortgage:    { cls: 'badge-blue',  label: 'Mortgage'     },
      real_estate: { cls: 'badge-green', label: 'Real Estate'  },
      platform:    { cls: 'badge-gray',  label: 'Platform-Wide'}
    };

    return `
      <div class="table-wrapper">
        <div class="table-toolbar">
          <span class="table-toolbar-title">Retention Policies</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${adminSettings.retention_policies.length} policies</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr><th>Data Type</th><th>Department</th><th>Retention Window</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              ${adminSettings.retention_policies.map(p => {
                const dc = deptConfig[p.department] || { cls: 'badge-gray', label: p.department };
                return `
                  <tr>
                    <td><span style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${p.data_type}</span></td>
                    <td><span class="badge ${dc.cls}">${dc.label}</span></td>
                    <td>
                      <span style="font-family:var(--font-heading);font-size:var(--text-lg);font-weight:700;
                                   color:var(--color-primary-navy)">${p.retention_window}</span>
                    </td>
                    <td><span class="badge badge-green">Active</span></td>
                    <td>
                      <button class="btn btn-secondary btn-sm"
                              onclick="Screens.admin.openUpdateRetention('${p.data_type.replace(/'/g,'')}','${p.department}')">
                        Edit
                      </button>
                    </td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div style="margin-top:var(--space-4);padding:var(--space-4);background:var(--color-info-bg);
                  border-radius:var(--radius-md);font-size:var(--text-sm);color:var(--color-info-text)">
        ℹ️ Retention policy changes require confirmation and are immediately logged to the audit trail.
        Changes affect new records only; existing records retain their original policy period.
      </div>`;
  },

  /* ── ENTITLEMENTS ───────────────────────────────────── */
  renderEntitlements() {
    const { adminSettings } = window.MockData;

    const stateConfig = {
      enabled:      { cls: 'badge-green', label: 'Enabled',      icon: '✅', desc: 'Fully active for all users.' },
      limited:      { cls: 'badge-gold',  label: 'Limited',      icon: '⚠️', desc: 'Active with usage constraints.' },
      future_gated: { cls: 'badge-gray',  label: 'Future Gated', icon: '🔮', desc: 'Planned for a future phase.' },
      disabled:     { cls: 'badge-red',   label: 'Disabled',     icon: '❌', desc: 'Not available.' }
    };

    const groups = {
      'Core Communications': ['crm_calls','crm_sms','crm_email'],
      'Extended Features':   ['crm_email_blast','crm_video','crm_reports'],
      'Department Workspaces':['crm_insurance','crm_mortgage','crm_real_estate'],
      'Future Capabilities': ['crm_ai_assist','white_label','multi_tenant']
    };

    return `
      ${Object.entries(groups).map(([group, codes]) => {
        const items = adminSettings.entitlements.filter(e => codes.includes(e.code));
        return `
          <div class="card" style="margin-bottom:var(--space-4);overflow:hidden">
            <div class="card-header">
              <span class="card-title">${group}</span>
              <span style="font-size:var(--text-xs);color:var(--neutral-400)">
                ${items.filter(e => e.state === 'enabled').length} of ${items.length} enabled
              </span>
            </div>
            <div style="padding:var(--space-5);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3)">
              ${items.map(e => {
                const cfg = stateConfig[e.state] || stateConfig.disabled;
                return `
                  <div style="padding:var(--space-4);border:1.5px solid var(--neutral-200);border-radius:var(--radius-lg);
                              transition:var(--transition-fast)"
                       onmouseover="this.style.boxShadow='var(--shadow-sm)'"
                       onmouseout="this.style.boxShadow=''">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
                      <span style="font-size:22px">${cfg.icon}</span>
                      <span class="badge ${cfg.cls}" style="font-size:10px">${cfg.label}</span>
                    </div>
                    <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--neutral-800);margin-bottom:2px">
                      ${e.label}
                    </div>
                    <div style="font-family:monospace;font-size:10px;color:var(--neutral-400);margin-bottom:var(--space-2)">${e.code}</div>
                    <div style="font-size:10px;color:var(--neutral-500)">${cfg.desc}</div>
                    ${e.state !== 'future_gated' ? `
                    <button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:var(--space-3);font-size:10px"
                            onclick="Components.Toast('Entitlement settings are managed at the subscription level','info')">
                      Configure
                    </button>` : ''}
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('')}`;
  },

  /* ── AUDIT LOG ──────────────────────────────────────── */
  renderAudit() {
    const events = [
      { actor:'Platform Admin',      action:'Updated retention policy: Real Estate Recordings → 4 years',        time:'2026-04-14 09:12 AM', type:'retention'   },
      { actor:'Platform Admin',      action:'Invited user: Marcus Webb — Insurance Agent (IA)',                   time:'2026-04-13 03:45 PM', type:'user'        },
      { actor:'Platform Admin',      action:'Reconnect action initiated: Arive connector',                        time:'2026-04-13 11:20 AM', type:'integration' },
      { actor:'Platform Admin',      action:'Role scope updated: Sandra Pham — Mortgage write access enabled',    time:'2026-04-12 02:15 PM', type:'role'        },
      { actor:'Jaquarian Bonilla',   action:'Reviewed feature entitlements — read-only access',                   time:'2026-04-12 10:00 AM', type:'entitlement' },
      // §2.3 G-04 & G-05: Credential verification audit events
      { actor:'Platform Admin',      action:'TREC License verified: Derek Okafor (RA) — TREC-TX-519034 ✓',       time:'2026-04-11 05:10 PM', type:'credential'  },
      { actor:'Platform Admin',      action:'TX Bar Number added: Michael Torres (AT) — TX-BAR-24083156 ✓',       time:'2026-04-11 04:55 PM', type:'credential'  },
      { actor:'Platform Admin',      action:'User status confirmed active: Lisa Chen (RA)',                        time:'2026-04-11 04:30 PM', type:'user'        },
      { actor:'Platform Admin',      action:'Retention policy reviewed: Mortgage recordings — 24 months confirmed',time:'2026-04-10 09:00 AM', type:'retention'  }
    ];

    const typeConfig = {
      retention:   { icon:'📋', color:'var(--color-warning)'       },
      user:        { icon:'👤', color:'var(--color-info)'          },
      integration: { icon:'🔌', color:'var(--color-danger)'        },
      role:        { icon:'🔑', color:'var(--color-primary-navy)'  },
      entitlement: { icon:'⚙️', color:'var(--neutral-500)'        },
      // §2.3: credential verification events
      credential:  { icon:'🪪', color:'var(--color-success)'       }
    };

    return `
      <div class="card" style="overflow:hidden">
        <div class="card-header">
          <span class="card-title">Audit Log</span>
          <div style="display:flex;gap:var(--space-2);align-items:center">
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">Administrative changes only · Append-only</span>
            <button class="btn btn-ghost btn-sm" onclick="Components.Toast('Audit log exported','success')">Export</button>
          </div>
        </div>
        <div style="padding:var(--space-5)">
          ${events.map((e, i) => {
            const cfg = typeConfig[e.type] || { icon:'📝', color:'var(--neutral-400)' };
            return `
              <div style="display:flex;align-items:flex-start;gap:var(--space-4);
                          ${i < events.length - 1 ? 'border-bottom:1px solid var(--neutral-100);padding-bottom:var(--space-4);margin-bottom:var(--space-4)' : ''}">
                <div style="width:36px;height:36px;border-radius:50%;background:var(--neutral-100);
                            display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">
                  ${cfg.icon}
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-sm);color:var(--neutral-700);margin-bottom:2px">${e.action}</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400)">
                    By <strong style="color:var(--neutral-600)">${e.actor}</strong> · ${e.time}
                  </div>
                </div>
                <div style="width:8px;height:8px;border-radius:50%;background:${cfg.color};flex-shrink:0;margin-top:6px"></div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  /* ── MODALS ─────────────────────────────────────────── */
  openInviteUser() {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'invite-user',
      title: '👤 Invite CRM User',
      subtitle: 'Grant platform access to a team member',
      steps: [
        { label: 'Identity',   active: true },
        { label: 'Role & Scope' },
        { label: 'Confirm' }
      ],
      body: `
        <div class="form-row">
          <div class="form-group">
            <label class="form-label required">First Name</label>
            <input class="form-input" placeholder="First name">
          </div>
          <div class="form-group">
            <label class="form-label required">Last Name</label>
            <input class="form-input" placeholder="Last name">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label required">Email Address</label>
          <input class="form-input" type="email" placeholder="user@burkesgroup.com">
        </div>
        <div class="form-group">
          <label class="form-label required">Role</label>
          <select class="form-select" id="invite-role"
                  onchange="Screens.admin.onInviteRoleChange(this.value)">
            <option value="OW">Department Owner (OW)</option>
            <option value="IA">Insurance Agent (IA)</option>
            <option value="ML">Mortgage Liaison (ML)</option>
            <option value="RA">Real Estate Agent (RA)</option>
            <option value="AT">Attorney — External (AT)</option>
            <option value="PA">Platform Administrator (PA)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">Department Scope</label>
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
        </div>

        <!-- §2.3 G-04 & G-05: Role-conditional credential fields (hidden by default) -->
        <div id="invite-credential-block" style="display:none">
          <div id="invite-license-group" class="form-group" style="display:none">
            <label class="form-label required" style="display:flex;align-items:center;gap:var(--space-2)">
              TREC License Number
              <span style="font-size:10px;background:var(--color-success-bg);color:var(--color-success-text);
                           padding:1px 6px;border-radius:99px;font-weight:700">Required for RA</span>
            </label>
            <input class="form-input" id="invite-license-input"
                   placeholder="e.g. TREC-TX-519034"
                   style="font-family:monospace">
            <div class="form-helper">
              Agents cannot activate the Real Estate workspace until a valid TREC license is recorded.
            </div>
          </div>
          <div id="invite-bar-group" class="form-group" style="display:none">
            <label class="form-label required" style="display:flex;align-items:center;gap:var(--space-2)">
              Texas Bar Number
              <span style="font-size:10px;background:var(--color-success-bg);color:var(--color-success-text);
                           padding:1px 6px;border-radius:99px;font-weight:700">Required for AT</span>
            </label>
            <input class="form-input" id="invite-bar-input"
                   placeholder="e.g. TX-BAR-24083156"
                   style="font-family:monospace">
            <div class="form-helper">
              Attorneys must verify their Texas State Bar number before accessing client files.
            </div>
          </div>
        </div>`,
      footerLeft: `<span style="font-size:var(--text-xs);color:var(--neutral-400)">Invitation and access grant are logged to audit trail</span>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('invite-user')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('invite-user');Components.Toast('Invitation sent — user will receive setup email','success')">
          ${Icons.send} Send Invitation
        </button>`
    }));
  },

  openEditUser(userId) {
    const user = window.MockData.users.find(u => u.id === userId);
    if (!user) return;
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'edit-user',
      title: `Edit User — ${user.full_name}`,
      subtitle: 'Update role, department scope, or status',
      body: `
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input class="form-input" value="${user.full_name}" readonly
                 style="background:var(--neutral-50);color:var(--neutral-500)">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" value="${user.email}" readonly
                 style="background:var(--neutral-50);color:var(--neutral-500)">
        </div>
        <div class="form-group">
          <label class="form-label required">Role</label>
          <select class="form-select">
            ${['OW','IA','ML','RA','AT','PA'].map(r =>
              `<option ${user.role === r ? 'selected' : ''}>${r}</option>`).join('')}
          </select>
        </div>

        <!-- §2.3 G-04: TREC License (RA / RE-scope OW) -->
        ${user.role === 'RA' || (user.role === 'OW' && user.departments.includes('real_estate')) ? `
        <div class="form-group">
          <label class="form-label required" style="display:flex;align-items:center;gap:var(--space-2)">
            TREC License Number
            <span style="font-size:10px;background:var(--color-success-bg);color:var(--color-success-text);
                         padding:1px 6px;border-radius:99px;font-weight:700">Required</span>
          </label>
          <input class="form-input" id="edit-license" value="${user.license_number || ''}"
                 placeholder="e.g. TREC-TX-519034"
                 style="font-family:monospace">
          <div class="form-helper">
            Real estate agents must provide a valid Texas Real Estate Commission (TREC) license number
            before accessing the Real Estate workspace.
          </div>
        </div>` : ''}

        <!-- §2.3 G-05: TX Bar Number (AT) -->
        ${user.role === 'AT' ? `
        <div class="form-group">
          <label class="form-label required" style="display:flex;align-items:center;gap:var(--space-2)">
            Texas Bar Number
            <span style="font-size:10px;background:var(--color-success-bg);color:var(--color-success-text);
                         padding:1px 6px;border-radius:99px;font-weight:700">Required</span>
          </label>
          <input class="form-input" id="edit-bar" value="${user.bar_number || ''}"
                 placeholder="e.g. TX-BAR-24083156"
                 style="font-family:monospace">
          <div class="form-helper">
            Attorneys must provide a valid Texas State Bar number. This is stored and visible
            to Platform Admins for compliance verification.
          </div>
        </div>` : ''}

        <div class="form-group">
          <label class="form-label required">Status</label>
          <select class="form-select">
            <option selected>Active</option>
            <option>Suspended</option>
          </select>
        </div>
        <div style="padding:var(--space-3);background:var(--color-warning-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-warning-text)">
          ⚠️ Role changes take effect immediately and are logged to the audit trail.
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('edit-user')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('edit-user');Components.Toast('User updated — change logged to audit trail','success')">
          ${Icons.check} Save Changes
        </button>`
    }));
  },

  openUpdateRetention(dataType, department) {
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'update-retention',
      title: '📋 Update Retention Policy',
      subtitle: `${dataType} · ${department}`,
      body: `
        <div style="padding:var(--space-4);background:var(--color-danger-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-danger-text);margin-bottom:var(--space-4)">
          ⚠️ <strong>Sensitive change.</strong> Retention policy changes affect regulatory compliance obligations.
          This action will be logged and cannot be silently undone.
        </div>
        <div class="form-group">
          <label class="form-label">Data Type</label>
          <input class="form-input" value="${dataType}" readonly style="background:var(--neutral-50)">
        </div>
        <div class="form-group">
          <label class="form-label">Department</label>
          <input class="form-input" value="${department}" readonly style="background:var(--neutral-50)">
        </div>
        <div class="form-group">
          <label class="form-label required">New Retention Window</label>
          <select class="form-select">
            <option>90 days</option>
            <option>6 months</option>
            <option>12 months</option>
            <option>18 months</option>
            <option>24 months</option>
            <option>3 years</option>
            <option>4 years</option>
            <option>7 years</option>
            <option>Indefinite</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label required">Reason for Change</label>
          <textarea class="form-input" rows="3" style="height:auto;padding:var(--space-3)"
                    placeholder="Regulatory requirement, audit finding, legal instruction…"></textarea>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('update-retention')">Cancel</button>
        <button class="btn btn-danger"
                onclick="Components.closeModal('update-retention');Components.Toast('Retention policy updated — change logged to audit trail','success')">
          Confirm Policy Change
        </button>`
    }));
  },

  /* ── BILLING & SUBSCRIPTION (Section 2.8) ──────────────── */
  renderBilling() {
    return `
      <!-- §2.8 G-17: Subscription Billing System -->
      <div class="card" style="margin-bottom:var(--space-5)">
        <div class="card-header">
          <span class="card-title">SaaS Subscription & Billing</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Burkes Group LLC Enterprise</span>
        </div>
        <div style="padding:var(--space-5)">
          <div style="display:flex;gap:var(--space-5);border-bottom:1px solid var(--neutral-100);padding-bottom:var(--space-5);margin-bottom:var(--space-5)">
            <div style="flex:1">
              <div style="color:var(--neutral-500);font-size:var(--text-sm);margin-bottom:var(--space-1)">Current Plan</div>
              <div style="font-size:24px;font-weight:700;color:var(--color-primary-navy);display:flex;align-items:center;gap:var(--space-2)">
                Diamond Edition 💎
                <span class="badge badge-green">Active</span>
              </div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500);margin-top:var(--space-2)">
                Unlimited multitenant seats, white-label environment, and priority API rate limits.
              </div>
            </div>
            <div style="flex:1">
              <div style="color:var(--neutral-500);font-size:var(--text-sm);margin-bottom:var(--space-1)">Next Invoice</div>
              <div style="font-size:24px;font-weight:700;color:var(--neutral-800)">
                $850.00 <span style="font-size:14px;font-weight:400;color:var(--neutral-400)">/ mo</span>
              </div>
              <div style="font-size:var(--text-sm);color:var(--neutral-500);margin-top:var(--space-2)">
                Renews on May 1st, 2026. Payment via Visa ending in 4242.
              </div>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-3)">
            <button class="btn btn-primary" onclick="Components.Toast('Portal redirecting to Stripe Billing...','info')">Manage Payment Methods</button>
            <button class="btn btn-secondary" onclick="Components.Toast('Viewing historical invoices...','info')">Download Invoices</button>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <span class="card-title">Tenant Quotas</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr><th>Resource</th><th>Usage</th><th>Limit</th><th>Health</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Active Users</td>
                <td>24</td>
                <td>Unlimited</td>
                <td><span class="badge badge-green">Healthy</span></td>
              </tr>
              <tr>
                <td>Monthly API Syncs (Agency Zoom / Arive)</td>
                <td>41,209</td>
                <td>100,000</td>
                <td><span class="badge badge-green">Healthy</span></td>
              </tr>
              <tr>
                <td>Storage (Contracts / IDs / Audio)</td>
                <td>42 GB</td>
                <td>500 GB</td>
                <td><span class="badge badge-green">Healthy</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /* ── BRANDING (Section 2.8) ───────────────────────── */
  renderBranding() {
    return `
      <!-- §2.8 G-16: White-labelling Implementation -->
      <div class="card" style="margin-bottom:var(--space-5)">
        <div class="card-header">
          <span class="card-title">Instance White-Labeling</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Brand Configuration</span>
        </div>
        <div style="padding:var(--space-5)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-5)">
            <div>
              <div class="form-group">
                <label class="form-label">Company / Trading Name</label>
                <input type="text" class="form-input" value="Burkes Group CRM">
              </div>
              <div class="form-group">
                <label class="form-label">Support Email (Automations & Billing)</label>
                <input type="text" class="form-input" value="info@burkeshq.com">
              </div>
              <div class="form-group" style="margin-top:var(--space-4)">
                <label class="form-label">Primary Brand Color</label>
                <div style="display:flex;gap:var(--space-2);align-items:center">
                  <input type="color" value="#1a3a52" style="border:none;width:40px;height:40px;padding:0;cursor:pointer">
                  <input type="text" class="form-input" value="#1a3a52" style="width:100px;font-family:monospace">
                </div>
              </div>
            </div>
            <div>
              <div class="form-group">
                <label class="form-label">Platform Logo</label>
                <div style="border:2px dashed var(--neutral-200);border-radius:var(--radius-md);height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--neutral-50);cursor:pointer" onclick="Components.Toast('Initiating file upload for logo...','info')">
                  <span style="font-size:32px;margin-bottom:8px">🖼️</span>
                  <span style="font-size:var(--text-sm);font-weight:600;color:var(--color-primary-navy)">Upload SVG or PNG</span>
                  <span style="font-size:11px;color:var(--neutral-400)">Max 2MB. Transparent background recommended.</span>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top:var(--space-4);padding-top:var(--space-4);border-top:1px solid var(--neutral-100);display:flex;justify-content:flex-end">
             <button class="btn btn-primary" onclick="Components.Toast('Brand configurations successfully queued for cache flush.','success')">Save Brand Settings</button>
          </div>
        </div>
      </div>
    `;
  },

  // §2.3 G-04 & G-05: Toggle credential fields in invite modal based on selected role
  onInviteRoleChange(role) {
    const block   = document.getElementById('invite-credential-block');
    const license = document.getElementById('invite-license-group');
    const bar     = document.getElementById('invite-bar-group');
    if (!block || !license || !bar) return;

    if (role === 'RA') {
      block.style.display   = '';
      license.style.display = '';
      bar.style.display     = 'none';
    } else if (role === 'AT') {
      block.style.display   = '';
      license.style.display = 'none';
      bar.style.display     = '';
    } else {
      block.style.display   = 'none';
      license.style.display = 'none';
      bar.style.display     = 'none';
    }
  },

  refreshContent() {
    const el = document.getElementById('admin-content');
    if (el) el.innerHTML = this.renderTabContent();
    // Refresh header actions too
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML = `<div class="screen-wrapper">${this.render()}</div>`;
    }
  },

  init() {}
};