/**
 * Burkes Group CRM — Insurance Screen
 * Source: .specify/specs/011-insurance/spec.md, screens/insurance.yaml
 * Batch: 6 of 7 — Department Workspaces + Video Meetings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.insurance = {
  _view: 'list',        // 'list' | 'board' | 'renewals'
  _filters: {
    status: '',
    line: '',
    search: '',
    missingData: false
  },

  render() {
    const { insuranceRecords, contacts, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const filtered  = this.getFiltered();
    const quoted    = insuranceRecords.filter(r => r.status === 'quoted').length;
    const bound     = insuranceRecords.filter(r => r.status === 'bound').length;
    const issued    = insuranceRecords.filter(r => r.status === 'issued').length;
    const missing   = insuranceRecords.filter(r => r.missing_fields.length > 0).length;
    const renewals  = insuranceRecords.filter(r => {
      if (!r.renewal_at) return false;
      const days = (new Date(r.renewal_at) - new Date()) / 86400000;
      return days >= -30 && days <= 60;
    }).length;

    return `
      <!-- Insurance Header -->
      <div class="dept-workspace-header insurance">
        <div class="dept-workspace-icon" style="background:var(--dept-insurance-bg)">🛡️</div>
        <div class="dept-workspace-info">
          <div class="dept-workspace-title" style="color:var(--dept-insurance-text)">
            Insurance Workspace
          </div>
          <div class="dept-workspace-sub">
            ${insuranceRecords.length} records · Policy quoting, binding, and renewal management
          </div>
        </div>
        <div style="display:flex;gap:var(--space-2)">
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')">
            ${Icons.users} All Contacts
          </button>
          <button class="btn btn-primary btn-sm" onclick="Router.quickAction('new-lead')">
            ${Icons.plus} New Lead
          </button>
        </div>
      </div>

      <!-- §2.2 G-02: Per-Department Compliance Notice (T2-02) -->
      ${window.Compliance ? window.Compliance.deptComplianceBanner('insurance') : ''}

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Records', value: insuranceRecords.length, accent:'navy', icon: Icons.shield })}
        ${StatCard({ label:'Quoted', value: quoted, accent:'gold', icon: Icons.activity })}
        ${StatCard({ label:'Bound', value: bound, accent:'blue', icon: Icons.check })}
        ${StatCard({ label:'Issued', value: issued, accent:'green', icon: Icons.check })}
        ${StatCard({ label:'Missing Data', value: missing, accent: missing > 0 ? 'gold' : 'navy', icon: Icons.alertTriangle })}
      </div>

      <!-- Renewal Alert -->
      ${renewals > 0 ? `
      <div class="degraded-banner" style="border-color:var(--dept-insurance);background:var(--dept-insurance-bg);
                                           margin-bottom:var(--space-5)">
        <span style="font-size:16px">🔔</span>
        <span style="color:var(--dept-insurance-text);font-weight:var(--weight-medium)">
          <strong>${renewals} renewal${renewals !== 1 ? 's' : ''}</strong> due within the next 60 days — review renewal watchlist
        </span>
        <button class="btn btn-secondary btn-sm" style="margin-left:auto"
                onclick="Screens.insurance._view='renewals';Screens.insurance.rerender()">
          View Renewals
        </button>
      </div>` : ''}

      <!-- Legacy Sync Notice -->
      <div class="degraded-banner" style="border-color:var(--neutral-300);background:var(--neutral-50);
                                           margin-bottom:var(--space-5)">
        <span style="font-size:16px">🔗</span>
        <span style="color:var(--neutral-600);font-weight:var(--weight-medium)">
          Agency Zoom sync: <strong style="color:${this._getSyncStatusColor()}">
          ${this._getSyncStatus()}</strong>
          ${this._getSyncStatusText()}
        </span>
        <button class="btn btn-ghost btn-sm" style="margin-left:auto"
                onclick="Router.navigate('integrations')">
          Manage Integrations
        </button>
      </div>

      <!-- Filter Bar + View Toggle -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input type="text" placeholder="Search contacts, carriers, lines…"
                 value="${this._filters.search}"
                 oninput="Screens.insurance._filters.search=this.value;Screens.insurance.refreshContent()">
        </div>
        <select class="filter-select"
                onchange="Screens.insurance._filters.status=this.value;Screens.insurance.refreshContent()">
          <option value="">All Statuses</option>
          <option value="prospect" ${this._filters.status === 'prospect' ? 'selected' : ''}>Prospect</option>
          <option value="quoted"   ${this._filters.status === 'quoted'   ? 'selected' : ''}>Quoted</option>
          <option value="bound"    ${this._filters.status === 'bound'    ? 'selected' : ''}>Bound</option>
          <option value="issued"   ${this._filters.status === 'issued'   ? 'selected' : ''}>Issued</option>
          <option value="expired"  ${this._filters.status === 'expired'  ? 'selected' : ''}>Expired</option>
        </select>
        <select class="filter-select"
                onchange="Screens.insurance._filters.line=this.value;Screens.insurance.refreshContent()">
          <option value="">All Lines</option>
          <option value="Auto"       ${this._filters.line === 'Auto'       ? 'selected' : ''}>Auto</option>
          <option value="Home"       ${this._filters.line === 'Home'       ? 'selected' : ''}>Home</option>
          <option value="Commercial" ${this._filters.line === 'Commercial' ? 'selected' : ''}>Commercial</option>
          <option value="Life"       ${this._filters.line === 'Life'       ? 'selected' : ''}>Life</option>
          <option value="Umbrella"   ${this._filters.line === 'Umbrella'   ? 'selected' : ''}>Umbrella</option>
        </select>
        <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);
                      cursor:pointer;white-space:nowrap">
          <input type="checkbox" ${this._filters.missingData ? 'checked' : ''}
                 onchange="Screens.insurance._filters.missingData=this.checked;Screens.insurance.refreshContent()">
          Missing data
        </label>
        <button class="filter-clear" onclick="Screens.insurance.clearFilters()">Clear</button>
        <div class="pipeline-view-toggle" style="margin-left:auto">
          <button class="view-toggle-btn ${this._view === 'list'     ? 'active' : ''}"
                  onclick="Screens.insurance.setView('list')">List</button>
          <button class="view-toggle-btn ${this._view === 'board'    ? 'active' : ''}"
                  onclick="Screens.insurance.setView('board')">Board</button>
          <button class="view-toggle-btn ${this._view === 'renewals' ? 'active' : ''}"
                  onclick="Screens.insurance.setView('renewals')">Renewals</button>
        </div>
      </div>

      <!-- Content Area -->
      <div id="ins-content">
        ${this.renderContent(filtered)}
      </div>`;
  },

  _getSyncStatus() {
    const c = window.MockData.connectors.find(c => c.id === 'conn-agency-zoom');
    return c ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : 'Unknown';
  },

  _getSyncStatusColor() {
    const c = window.MockData.connectors.find(c => c.id === 'conn-agency-zoom');
    if (!c) return 'var(--neutral-400)';
    return { healthy: 'var(--color-success)', degraded: 'var(--color-danger)',
             pending: 'var(--color-warning)', planned: 'var(--neutral-400)' }[c.status] || 'var(--neutral-400)';
  },

  _getSyncStatusText() {
    const c = window.MockData.connectors.find(c => c.id === 'conn-agency-zoom');
    if (!c) return '';
    if (c.status === 'pending') return ' — Awaiting connection. Data may be incomplete.';
    if (c.status === 'degraded') return ' — Sync errors detected. Review integration.';
    return ' — Records synced from legacy system.';
  },

  getFiltered() {
    let data = window.MockData.insuranceRecords;
    const { status, line, search, missingData } = this._filters;
    if (status)      data = data.filter(r => r.status === status);
    if (line)        data = data.filter(r => r.line_of_business === line);
    if (missingData) data = data.filter(r => r.missing_fields.length > 0);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        r.contact_name.toLowerCase().includes(q) ||
        (r.carrier || '').toLowerCase().includes(q) ||
        r.line_of_business.toLowerCase().includes(q)
      );
    }
    return data;
  },

  renderContent(filtered) {
    if (this._view === 'board')    return this.renderBoard(filtered);
    if (this._view === 'renewals') return this.renderRenewals();
    return this.renderList(filtered);
  },

  renderList(filtered) {
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    if (!filtered.length) {
      return `
        <div class="card" style="padding:var(--space-10);text-align:center">
          <div style="font-size:40px;margin-bottom:var(--space-3)">🛡️</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;
                      color:var(--color-primary-navy)">No insurance records match filters</div>
          <div style="color:var(--neutral-400);font-size:var(--text-sm);margin-top:var(--space-2)">
            Try adjusting filters or creating a new lead.
          </div>
        </div>`;
    }

    return `
      <div class="table-wrapper">
        <div class="table-toolbar">
          <span class="table-toolbar-title">Insurance Records</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${filtered.length} records</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Contact</th>
                <th>Line of Business</th>
                <th>Status</th>
                <th>Carrier</th>
                <th>Premium</th>
                <th>Renewal</th>
                <th>Missing</th>
                <th>Sync</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(r => {
                const daysToRenewal = r.renewal_at
                  ? Math.ceil((new Date(r.renewal_at) - new Date()) / 86400000)
                  : null;
                const renewalClass = daysToRenewal !== null && daysToRenewal <= 30
                  ? 'color:var(--color-danger);font-weight:var(--weight-semibold)'
                  : daysToRenewal !== null && daysToRenewal <= 60
                    ? 'color:var(--color-warning-text);font-weight:var(--weight-semibold)'
                    : '';
                return `
                  <tr onclick="Screens.insurance.openRecordDrawer('${r.id}')" style="cursor:pointer">
                    <td>
                      <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">
                        ${r.contact_name}
                      </div>
                      <div style="font-size:var(--text-xs);color:var(--neutral-400)">${r.id}</div>
                    </td>
                    <td>
                      <span class="badge badge-gold">${r.line_of_business}</span>
                    </td>
                    <td>${this.renderStatusBadge(r.status)}</td>
                    <td style="font-size:var(--text-sm)">${r.carrier || '—'}</td>
                    <td style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">
                      ${r.premium ? helpers.formatCurrency(r.premium) : '—'}
                    </td>
                    <td style="font-size:var(--text-xs);${renewalClass}">
                      ${r.renewal_at
                        ? `${helpers.formatDate(r.renewal_at)}${daysToRenewal !== null ? ` (${daysToRenewal}d)` : ''}`
                        : '—'}
                    </td>
                    <td>
                      ${r.missing_fields.length > 0
                        ? `<span class="badge badge-gold" title="${r.missing_fields.join(', ')}">
                             ⚠ ${r.missing_fields.length} field${r.missing_fields.length !== 1 ? 's' : ''}
                           </span>`
                        : `<span class="badge badge-green">Complete</span>`}
                    </td>
                    <td>
                      <span class="sync-badge ${r.sync_state.status === 'healthy' ? 'healthy' : 'stale'}">
                        ${r.sync_state.status === 'healthy' ? '● Synced' : '⚠ Stale'}
                      </span>
                    </td>
                    <td onclick="event.stopPropagation()">
                      <div style="display:flex;gap:4px">
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Router.navigate('calls')" title="Call">📞</button>
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Router.navigate('sms')"   title="SMS">💬</button>
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Router.navigate('email')" title="Email">✉️</button>
                      </div>
                    </td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  },

  renderBoard(filtered) {
    const stages = ['prospect', 'quoted', 'bound', 'issued', 'expired'];
    const stageLabels = {
      prospect: 'Prospect', quoted: 'Quoted', bound: 'Bound',
      issued: 'Issued', expired: 'Expired'
    };
    const stageColors = {
      prospect: 'var(--neutral-400)', quoted: 'var(--dept-insurance)',
      bound: 'var(--color-primary-navy)', issued: 'var(--color-success)',
      expired: 'var(--color-danger)'
    };

    const byStage = {};
    stages.forEach(s => { byStage[s] = []; });
    filtered.forEach(r => { if (byStage[r.status]) byStage[r.status].push(r); });

    return `
      <div style="display:flex;gap:var(--space-4);overflow-x:auto;padding-bottom:var(--space-4)">
        ${stages.map(stage => `
          <div style="min-width:220px;width:220px;flex-shrink:0">
            <!-- Stage Header -->
            <div style="display:flex;align-items:center;justify-content:space-between;
                        padding:var(--space-3) var(--space-4);background:var(--neutral-100);
                        border-radius:var(--radius-md);border:1px solid var(--neutral-200);
                        margin-bottom:var(--space-3)">
              <span style="font-size:var(--text-xs);font-weight:var(--weight-semibold);
                           text-transform:uppercase;letter-spacing:.05em;color:${stageColors[stage]}">
                ${stageLabels[stage]}
              </span>
              <span style="background:${stageColors[stage]};color:white;font-size:var(--text-xs);
                           font-weight:700;border-radius:99px;width:20px;height:20px;
                           display:flex;align-items:center;justify-content:center">
                ${byStage[stage].length}
              </span>
            </div>
            <!-- Stage Cards -->
            <div style="display:flex;flex-direction:column;gap:var(--space-2)">
              ${byStage[stage].length
                ? byStage[stage].map(r => `
                  <div onclick="Screens.insurance.openRecordDrawer('${r.id}')"
                       style="background:white;border:1px solid var(--neutral-200);
                              border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);
                              cursor:pointer;box-shadow:var(--shadow-xs);transition:var(--transition-fast)"
                       onmouseover="this.style.boxShadow='var(--shadow-md)';this.style.transform='translateY(-1px)'"
                       onmouseout="this.style.boxShadow='var(--shadow-xs)';this.style.transform=''">
                    <div style="font-weight:var(--weight-semibold);color:var(--neutral-800);
                                margin-bottom:var(--space-2);font-size:var(--text-sm);
                                white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                      ${r.contact_name}
                    </div>
                    <div style="font-size:11px;color:var(--neutral-500);margin-bottom:var(--space-2)">
                      ${r.line_of_business} · ${r.carrier || 'No carrier'}
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between">
                      ${r.premium
                        ? `<span style="font-size:var(--text-xs);font-weight:700;color:var(--color-primary-navy)">
                             ${window.MockData.helpers.formatCurrency(r.premium)}
                           </span>`
                        : `<span style="font-size:var(--text-xs);color:var(--neutral-400)">No premium</span>`}
                      ${r.missing_fields.length > 0
                        ? `<span style="font-size:9px;background:var(--color-warning-bg);
                                       color:var(--color-warning-text);padding:1px 5px;border-radius:99px;
                                       font-weight:700">
                             ⚠ ${r.missing_fields.length}
                           </span>`
                        : ''}
                    </div>
                  </div>`).join('')
                : `<div style="padding:var(--space-4);color:var(--neutral-300);font-size:var(--text-xs);
                              text-align:center;border:1.5px dashed var(--neutral-200);border-radius:var(--radius-md)">
                     No records
                   </div>`}
            </div>
          </div>`).join('')}
      </div>`;
  },

  renderRenewals() {
    const { helpers } = window.MockData;
    const now = new Date();
    const records = window.MockData.insuranceRecords
      .filter(r => {
        if (!r.renewal_at) return false;
        const days = (new Date(r.renewal_at) - now) / 86400000;
        return days >= -30 && days <= 90;
      })
      .sort((a, b) => new Date(a.renewal_at) - new Date(b.renewal_at));

    if (!records.length) {
      return `
        <div class="card" style="padding:var(--space-10);text-align:center">
          <div style="font-size:40px;margin-bottom:var(--space-3)">🔔</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;
                      color:var(--color-primary-navy)">No upcoming renewals</div>
          <div style="color:var(--neutral-400);font-size:var(--text-sm);margin-top:var(--space-2)">
            No renewals due within the next 90 days.
          </div>
        </div>`;
    }

    return `
      <div class="card" style="overflow:hidden">
        <div class="card-header">
          <span class="card-title">🔔 Renewal Watchlist</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${records.length} records · Next 90 days</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${records.map((r, idx) => {
            const days = Math.ceil((new Date(r.renewal_at) - now) / 86400000);
            const urgency = days < 0 ? 'overdue' : days <= 14 ? 'critical' : days <= 30 ? 'warning' : 'ok';
            const urgencyColors = {
              overdue:  { bg: 'var(--color-danger-bg)',  text: 'var(--color-danger-text)',  label: `⚠ Overdue (${Math.abs(days)}d)` },
              critical: { bg: 'var(--color-danger-bg)',  text: 'var(--color-danger-text)',  label: `🔴 ${days}d` },
              warning:  { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-text)', label: `🟡 ${days}d` },
              ok:       { bg: 'transparent',              text: 'var(--neutral-400)',         label: `${days}d` }
            }[urgency];
            return `
              <div onclick="Screens.insurance.openRecordDrawer('${r.id}')"
                   style="display:flex;align-items:center;gap:var(--space-4);padding:var(--space-4) var(--space-5);
                          border-bottom:${idx < records.length - 1 ? '1px solid var(--neutral-100)' : 'none'};
                          cursor:pointer;transition:background .1s"
                   onmouseover="this.style.background='var(--neutral-50)'"
                   onmouseout="this.style.background=''">
                <!-- Urgency indicator -->
                <div style="width:48px;text-align:center;flex-shrink:0">
                  <div style="padding:var(--space-1) var(--space-2);background:${urgencyColors.bg};
                              border-radius:var(--radius-md);font-size:10px;font-weight:700;
                              color:${urgencyColors.text}">
                    ${urgencyColors.label}
                  </div>
                </div>
                <!-- Record info -->
                <div style="flex:1;min-width:0">
                  <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">
                    ${r.contact_name}
                  </div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400);margin-top:2px">
                    ${r.line_of_business} · ${r.carrier} · ${helpers.formatCurrency(r.premium || 0)}/yr
                  </div>
                </div>
                <!-- Renewal date -->
                <div style="text-align:right;flex-shrink:0">
                  <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">
                    ${helpers.formatDate(r.renewal_at)}
                  </div>
                  ${this.renderStatusBadge(r.status)}
                </div>
                <!-- Quick actions -->
                <div style="display:flex;gap:var(--space-1);flex-shrink:0" onclick="event.stopPropagation()">
                  <button class="btn btn-ghost btn-sm btn-icon" onclick="Router.navigate('calls')" title="Call">📞</button>
                  <button class="btn btn-ghost btn-sm btn-icon" onclick="Router.navigate('email')" title="Email">✉️</button>
                </div>
              </div>`;
          }).join('')}
        </div>
      </div>`;
  },

  renderStatusBadge(status) {
    const config = {
      prospect: { cls: 'badge-gray',  label: 'Prospect' },
      quoted:   { cls: 'badge-gold',  label: 'Quoted'   },
      bound:    { cls: 'badge-navy',  label: 'Bound'    },
      issued:   { cls: 'badge-green', label: 'Issued'   },
      expired:  { cls: 'badge-red',   label: 'Expired'  }
    }[status] || { cls: 'badge-gray', label: status };
    return `<span class="badge ${config.cls}">${config.label}</span>`;
  },

  openRecordDrawer(recordId) {
    const r = window.MockData.insuranceRecords.find(x => x.id === recordId);
    if (!r) return;
    const { helpers } = window.MockData;
    const { Icons } = window.Components;

    const contact = window.MockData.contacts.find(c => c.id === r.contact_id);
    const recentActs = window.MockData.activities
      .filter(a => a.contact_id === r.contact_id)
      .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at))
      .slice(0, 4);

    const daysToRenewal = r.renewal_at
      ? Math.ceil((new Date(r.renewal_at) - new Date()) / 86400000)
      : null;

    Components.openDrawer({
      title: r.contact_name,
      subtitle: `${r.line_of_business} · ${r.id}`,
      body: `
        <!-- Status Row -->
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          <span class="badge badge-gold">Insurance</span>
          ${this.renderStatusBadge(r.status)}
          <span class="badge badge-gray">${r.line_of_business}</span>
          ${r.missing_fields.length > 0
            ? `<span class="badge badge-gold">⚠ Missing ${r.missing_fields.length} field${r.missing_fields.length !== 1 ? 's' : ''}</span>`
            : `<span class="badge badge-green">Quote-ready</span>`}
        </div>

        <!-- Policy Details -->
        <div class="profile-section">
          <div class="profile-section-title">Policy Summary</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Line of Business</span>
              <span class="profile-field-value">${r.line_of_business}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Carrier</span>
              <span class="profile-field-value">${r.carrier || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Annual Premium</span>
              <span class="profile-field-value">${r.premium ? helpers.formatCurrency(r.premium) : '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Status</span>
              <span class="profile-field-value">${r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
            </div>
            ${r.renewal_at ? `
            <div class="profile-field">
              <span class="profile-field-label">Renewal Date</span>
              <span class="profile-field-value" style="${daysToRenewal !== null && daysToRenewal <= 30 ? 'color:var(--color-warning-text);font-weight:var(--weight-semibold)' : ''}">
                ${helpers.formatDate(r.renewal_at)}
                ${daysToRenewal !== null ? ` (${daysToRenewal > 0 ? daysToRenewal + 'd' : 'Overdue'})` : ''}
              </span>
            </div>` : ''}
          </div>
        </div>

        <!-- Missing Data Checklist -->
        ${r.missing_fields.length > 0 ? `
        <div class="profile-section">
          <div class="profile-section-title">⚠️ Missing Intake — Required for Quote</div>
          <div class="missing-items-list">
            ${r.missing_fields.map(f => `
              <div class="missing-item">
                <span>📋</span>
                <span style="flex:1">${f}</span>
                <button class="btn btn-ghost btn-sm" style="padding:0 var(--space-2);height:24px;font-size:10px"
                        onclick="Components.Toast('Navigating to contact profile to add ${f}','info')">
                  Add
                </button>
              </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- Legacy Sync Context -->
        <div class="profile-section">
          <div class="profile-section-title">Legacy Sync</div>
          <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
              <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">Agency Zoom</span>
              <span class="sync-badge ${r.sync_state.status === 'healthy' ? 'healthy' : 'stale'}">
                ${r.sync_state.status === 'healthy' ? '● Synced' : '⚠ Stale'}
              </span>
            </div>
            <div style="font-size:var(--text-xs);color:var(--neutral-400)">
              Source ID: ${r.sync_state.source_id} ·
              Last synced: ${helpers.formatRelative(r.sync_state.last_synced_at)}
            </div>
          </div>
        </div>

        <!-- Status Progression -->
        <div class="profile-section">
          <div class="profile-section-title">Update Status</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${['prospect', 'quoted', 'bound', 'issued'].map(s => `
              <button class="btn btn-${r.status === s ? 'primary' : 'secondary'} btn-sm"
                      onclick="Screens.insurance.updateStatus('${r.id}', '${s}')">
                ${s.charAt(0).toUpperCase() + s.slice(1)}
              </button>`).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="profile-section">
          <div class="profile-section-title">Communication Shortcuts</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('calls')">${Icons.phone} Call</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('sms')">${Icons.message} SMS</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('email')">${Icons.mail} Email</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('activities')">${Icons.activity} Activities</button>
            ${contact ? `
            <button class="btn btn-secondary btn-sm"
                    onclick="Components.closeDrawer();Screens.contacts.openProfile('${contact.id}')">
              ${Icons.users} Profile
            </button>` : ''}
          </div>
        </div>

        <!-- Recent Activity -->
        ${recentActs.length ? `
        <div class="profile-section">
          <div class="profile-section-title">Recent Activity</div>
          <div class="activity-feed">
            ${recentActs.map(a => Components.ActivityItem({
              icon: a.icon, iconClass: a.iconClass,
              title: a.label, actor: a.actor_name, time: a.occurred_at
            })).join('')}
          </div>
        </div>` : ''}
      `,
      footer: `
        <button class="btn btn-secondary"
                onclick="Screens.insurance.openTransferModal('${r.id}')">Transfer</button>
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>
        <button class="btn btn-primary"
                onclick="Screens.insurance.promoteStatus('${r.id}')">Advance Status →</button>`
    });
  },

  updateStatus(recordId, newStatus) {
    const r = window.MockData.insuranceRecords.find(x => x.id === recordId);
    if (r) {
      r.status = newStatus;
      Components.Toast(`Status updated to "${newStatus}"`, 'success');
      Components.closeDrawer();
      this.refreshContent();
    }
  },

  promoteStatus(recordId) {
    const r = window.MockData.insuranceRecords.find(x => x.id === recordId);
    if (!r) return;
    const order = ['prospect', 'quoted', 'bound', 'issued'];
    const idx = order.indexOf(r.status);
    if (idx < order.length - 1) {
      this.updateStatus(recordId, order[idx + 1]);
    } else {
      Components.Toast('Record is already at the final active status', 'info');
      Components.closeDrawer();
    }
  },

  openTransferModal(recordId) {
    const r = window.MockData.insuranceRecords.find(x => x.id === recordId);
    if (!r) return;
    const { Icons, Modal } = window.Components;
    Components.closeDrawer();
    Components.openModal(Modal({
      id: 'ins-transfer',
      title: 'Transfer Insurance Record',
      subtitle: r.contact_name,
      body: `
        <div class="form-group">
          <label class="form-label required">New Owner (Insurance Agent)</label>
          <select class="form-select">
            ${window.MockData.users
              .filter(u => u.departments.includes('insurance'))
              .map(u => `<option>${u.full_name} · ${window.MockData.helpers.roleName(u.role)}</option>`)
              .join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Transfer Note</label>
          <textarea class="form-input" rows="3" style="height:auto;padding:var(--space-3)"
            placeholder="Context for the new owner…"></textarea>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('ins-transfer')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('ins-transfer');Components.Toast('Record transferred','success')">
          ${Icons.arrowRight} Transfer
        </button>`
    }));
  },

  setView(view) {
    this._view = view;
    this.refreshContent();
  },

  refreshContent() {
    const el = document.getElementById('ins-content');
    if (el) el.innerHTML = this.renderContent(this.getFiltered());
  },

  clearFilters() {
    this._filters = { status: '', line: '', search: '', missingData: false };
    this.rerender();
  },

  rerender() {
    const content = document.getElementById('content');
    if (content) {
      content.innerHTML = `<div class="screen-wrapper">${this.render()}</div>`;
      this.init();
    }
  },

  init() {}
};