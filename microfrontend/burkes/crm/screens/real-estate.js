/**
 * Burkes Group CRM — Real Estate Screen
 * Source: .specify/specs/013-real-estate/spec.md, screens/real-estate.yaml
 * Batch: 6 of 7 — Department Workspaces + Video Meetings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.realEstate = {
  _view: 'list',    // 'list' | 'board'
  _filters: {
    stage: '',
    agent: '',
    search: '',
    riskOnly: false
  },

  render() {
    const { realEstateRecords, users, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const filtered       = this.getFiltered();
    const active         = realEstateRecords.filter(r => !['closed', 'cancelled'].includes(r.status)).length;
    const pendingClose   = realEstateRecords.filter(r => r.status === 'pending_close').length;
    const overdueMilestone = realEstateRecords.filter(r => this._hasOverdueMilestone(r)).length;
    const missingLinks   = realEstateRecords.filter(r => r.external_link_state.status !== 'linked').length;

    return `
      <!-- Real Estate Header -->
      <div class="dept-workspace-header real_estate">
        <div class="dept-workspace-icon" style="background:var(--dept-real-estate-bg)">🏘️</div>
        <div class="dept-workspace-info">
          <div class="dept-workspace-title" style="color:var(--dept-real-estate-text)">
            Real Estate Workspace
          </div>
          <div class="dept-workspace-sub">
            ${realEstateRecords.length} transactions · Listings, closings, HAR and DotLoop readiness
          </div>
        </div>
        <div style="display:flex;gap:var(--space-2)">
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')">
            ${Icons.users} All Contacts
          </button>
          <button class="btn btn-primary btn-sm" onclick="Router.quickAction('new-lead')">
            ${Icons.plus} New Transaction
          </button>
        </div>
      </div>

      <!-- §2.2 G-02: Per-Department Compliance Notice (T2-02) -->
      ${window.Compliance ? window.Compliance.deptComplianceBanner('real_estate') : ''}

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Transactions', value: realEstateRecords.length, accent:'navy', icon: Icons.home })}
        ${StatCard({ label:'Active Deals', value: active, accent:'green', icon: Icons.activity })}
        ${StatCard({ label:'Pending Close', value: pendingClose, accent:'blue', icon: Icons.check })}
        ${StatCard({ label:'Overdue Milestones', value: overdueMilestone, accent: overdueMilestone > 0 ? 'gold' : 'navy', icon: Icons.alertTriangle })}
        ${StatCard({ label:'Missing Links', value: missingLinks, accent: missingLinks > 0 ? 'gold' : 'navy', icon: Icons.link })}
      </div>

      <!-- Risk Alert -->
      ${overdueMilestone > 0 ? `
      <div class="degraded-banner" style="margin-bottom:var(--space-5)">
        <span class="degraded-banner-icon">⚠️</span>
        <span class="degraded-banner-text">
          <strong>${overdueMilestone} deal${overdueMilestone !== 1 ? 's' : ''}</strong> have overdue milestones.
          Review them to prevent closing slippage.
        </span>
        <button class="btn btn-secondary btn-sm" style="margin-left:auto"
                onclick="Screens.realEstate._filters.riskOnly=true;Screens.realEstate.rerender()">
          Show At-Risk Only
        </button>
      </div>` : ''}

      <!-- External Link Status Row -->
      <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-5);flex-wrap:wrap">
        ${this.renderExternalLinkRow()}
      </div>

      <!-- Filter Bar + View Toggle -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input type="text" placeholder="Search contacts, addresses, agents…"
                 value="${this._filters.search}"
                 oninput="Screens.realEstate._filters.search=this.value;Screens.realEstate.refreshContent()">
        </div>
        <select class="filter-select"
                onchange="Screens.realEstate._filters.stage=this.value;Screens.realEstate.refreshContent()">
          <option value="">All Stages</option>
          <option value="lead"           ${this._filters.stage === 'lead'           ? 'selected' : ''}>Lead</option>
          <option value="under_contract" ${this._filters.stage === 'under_contract' ? 'selected' : ''}>Under Contract</option>
          <option value="pending_close"  ${this._filters.stage === 'pending_close'  ? 'selected' : ''}>Pending Close</option>
          <option value="closed"         ${this._filters.stage === 'closed'         ? 'selected' : ''}>Closed</option>
          <option value="cancelled"      ${this._filters.stage === 'cancelled'      ? 'selected' : ''}>Cancelled</option>
        </select>
        <select class="filter-select"
                onchange="Screens.realEstate._filters.agent=this.value;Screens.realEstate.refreshContent()">
          <option value="">All Agents</option>
          ${users.filter(u => u.departments.includes('real_estate'))
            .map(u => `<option value="${u.id}" ${this._filters.agent === u.id ? 'selected' : ''}>${u.full_name}</option>`)
            .join('')}
        </select>
        <label style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);
                      cursor:pointer;white-space:nowrap">
          <input type="checkbox" ${this._filters.riskOnly ? 'checked' : ''}
                 onchange="Screens.realEstate._filters.riskOnly=this.checked;Screens.realEstate.refreshContent()">
          At-risk only
        </label>
        <button class="filter-clear" onclick="Screens.realEstate.clearFilters()">Clear</button>
        <div class="pipeline-view-toggle" style="margin-left:auto">
          <button class="view-toggle-btn ${this._view === 'list'  ? 'active' : ''}"
                  onclick="Screens.realEstate.setView('list')">List</button>
          <button class="view-toggle-btn ${this._view === 'board' ? 'active' : ''}"
                  onclick="Screens.realEstate.setView('board')">Board</button>
        </div>
      </div>

      <!-- Content -->
      <div id="re-content">
        ${this.renderContent(filtered)}
      </div>`;
  },

  renderExternalLinkRow() {
    const { realEstateRecords, helpers } = window.MockData;
    const harConnector = window.MockData.connectors.find(c => c.id === 'conn-har');
    const harStatus    = harConnector?.status || 'unknown';

    const dotLoopLinked  = realEstateRecords.filter(r => r.external_link_state.status === 'linked').length;
    const dotLoopPending = realEstateRecords.filter(r => r.external_link_state.status === 'pending').length;
    const dotLoopMissing = realEstateRecords.filter(r => r.external_link_state.status === 'missing').length;

    return `
      <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);
                  background:white;border:1px solid var(--neutral-200);border-radius:var(--radius-full);
                  box-shadow:var(--shadow-xs)">
        <span style="font-size:16px">📄</span>
        <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">DotLoop</span>
        <span class="badge badge-green">${dotLoopLinked} linked</span>
        ${dotLoopPending > 0 ? `<span class="badge badge-gold">${dotLoopPending} pending</span>` : ''}
        ${dotLoopMissing > 0 ? `<span class="badge badge-red">${dotLoopMissing} missing</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-4);
                  background:white;border:1px solid var(--neutral-200);border-radius:var(--radius-full);
                  box-shadow:var(--shadow-xs)">
        <span style="font-size:16px">🏘️</span>
        <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">HAR (Houston MLS)</span>
        <span class="sync-badge ${harStatus === 'healthy' ? 'healthy' : 'stale'}">
          ${harStatus === 'healthy' ? '● Connected' : '⚠ ' + harStatus}
        </span>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto"
              onclick="Router.navigate('integrations')">
        Manage Integrations
      </button>`;
  },

  getFiltered() {
    let data = window.MockData.realEstateRecords;
    const { stage, agent, search, riskOnly } = this._filters;
    if (stage)    data = data.filter(r => r.status === stage);
    if (agent)    data = data.filter(r => r.agent_id === agent);
    if (riskOnly) data = data.filter(r => this._hasOverdueMilestone(r));
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r =>
        r.contact_name.toLowerCase().includes(q) ||
        (r.property_address || '').toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      );
    }
    return data;
  },

  _hasOverdueMilestone(r) {
    if (!r.milestones) return false;
    const now = new Date();
    return r.milestones.some(m => !m.completed && m.due_at && new Date(m.due_at) < now);
  },

  renderContent(filtered) {
    return this._view === 'board' ? this.renderBoard(filtered) : this.renderList(filtered);
  },

  renderList(filtered) {
    const { helpers, users } = window.MockData;

    if (!filtered.length) {
      return `
        <div class="card" style="padding:var(--space-10);text-align:center">
          <div style="font-size:40px;margin-bottom:var(--space-3)">🏘️</div>
          <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;
                      color:var(--color-primary-navy)">No transactions match filters</div>
          <div style="color:var(--neutral-400);font-size:var(--text-sm);margin-top:var(--space-2)">
            Try adjusting filters or creating a new transaction.
          </div>
        </div>`;
    }

    return `
      <div class="table-wrapper">
        <div class="table-toolbar">
          <span class="table-toolbar-title">Transactions</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">${filtered.length} records</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Contact</th>
                <th>Property</th>
                <th>Type</th>
                <th>Stage</th>
                <th>Closing Date</th>
                <th>Agent</th>
                <th>DotLoop</th>
                <th>Risk</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(r => {
                const agent = users.find(u => u.id === r.agent_id);
                const closingDays = r.closing_date
                  ? Math.ceil((new Date(r.closing_date) - new Date()) / 86400000)
                  : null;
                const isAtRisk = this._hasOverdueMilestone(r);
                return `
                  <tr onclick="Screens.realEstate.openRecordDrawer('${r.id}')" style="cursor:pointer;
                       ${isAtRisk ? 'background:rgba(239,68,68,0.04)' : ''}">
                    <td>
                      <div style="font-weight:var(--weight-semibold);color:var(--neutral-800)">${r.contact_name}</div>
                      <div style="font-size:var(--text-xs);color:var(--neutral-400)">${r.id}</div>
                    </td>
                    <td style="font-size:var(--text-xs);color:var(--neutral-600);max-width:160px;
                               white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                      ${r.property_address || '—'}
                    </td>
                    <td><span class="badge badge-green">${r.transaction_type}</span></td>
                    <td>${this.renderStageBadge(r.status)}</td>
                    <td style="font-size:var(--text-xs);
                               color:${closingDays !== null && closingDays < 7 && closingDays >= 0
                                 ? 'var(--color-warning-text)' : 'var(--neutral-600)'}">
                      ${r.closing_date ? helpers.formatDate(r.closing_date) : '—'}
                      ${closingDays !== null && closingDays >= 0 && closingDays < 14
                        ? `<span style="font-size:9px;font-weight:700">(${closingDays}d)</span>` : ''}
                    </td>
                    <td style="font-size:var(--text-sm)">${agent?.full_name || '—'}</td>
                    <td>
                      ${this.renderDotLoopBadge(r.external_link_state.status)}
                    </td>
                    <td>
                      ${isAtRisk
                        ? `<span class="badge badge-red">⚠ At Risk</span>`
                        : `<span class="badge badge-green">On Track</span>`}
                    </td>
                    <td onclick="event.stopPropagation()">
                      <div style="display:flex;gap:4px">
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Router.navigate('calls')" title="Call">📞</button>
                        <button class="btn btn-ghost btn-sm btn-icon"
                                onclick="Router.navigate('calendar')" title="Calendar">📅</button>
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
    const stages = ['lead', 'under_contract', 'pending_close', 'closed', 'cancelled'];
    const stageLabels = {
      lead: 'Lead', under_contract: 'Under Contract', pending_close: 'Pending Close',
      closed: 'Closed', cancelled: 'Cancelled'
    };
    const stageColors = {
      lead: 'var(--neutral-400)', under_contract: 'var(--dept-real-estate)',
      pending_close: 'var(--color-primary-navy)', closed: 'var(--color-success)',
      cancelled: 'var(--color-danger)'
    };
    const byStage = {};
    stages.forEach(s => { byStage[s] = []; });
    filtered.forEach(r => { if (byStage[r.status]) byStage[r.status].push(r); });

    return `
      <div style="display:flex;gap:var(--space-4);overflow-x:auto;padding-bottom:var(--space-4)">
        ${stages.map(stage => `
          <div style="min-width:220px;width:220px;flex-shrink:0">
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
            <div style="display:flex;flex-direction:column;gap:var(--space-2)">
              ${byStage[stage].length
                ? byStage[stage].map(r => {
                    const isAtRisk = this._hasOverdueMilestone(r);
                    return `
                      <div onclick="Screens.realEstate.openRecordDrawer('${r.id}')"
                           style="background:white;border:1px solid ${isAtRisk ? 'var(--color-danger)' : 'var(--neutral-200)'};
                                  border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);
                                  cursor:pointer;box-shadow:var(--shadow-xs)"
                           onmouseover="this.style.boxShadow='var(--shadow-md)'"
                           onmouseout="this.style.boxShadow='var(--shadow-xs)'">
                        <div style="font-weight:var(--weight-semibold);color:var(--neutral-800);font-size:var(--text-sm);
                                    margin-bottom:var(--space-1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                          ${r.contact_name}
                        </div>
                        <div style="font-size:10px;color:var(--neutral-400);margin-bottom:var(--space-2);
                                    white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                          ${r.property_address || 'No property'}
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between">
                          <span class="badge badge-green" style="font-size:9px">${r.transaction_type}</span>
                          ${isAtRisk ? `<span style="font-size:9px;color:var(--color-danger);font-weight:700">⚠ Risk</span>` : ''}
                        </div>
                      </div>`;
                  }).join('')
                : `<div style="padding:var(--space-4);color:var(--neutral-300);font-size:var(--text-xs);
                              text-align:center;border:1.5px dashed var(--neutral-200);border-radius:var(--radius-md)">
                     No deals
                   </div>`}
            </div>
          </div>`).join('')}
      </div>`;
  },

  renderStageBadge(status) {
    const config = {
      lead:           { cls: 'badge-gray',  label: 'Lead'           },
      under_contract: { cls: 'badge-green', label: 'Under Contract' },
      pending_close:  { cls: 'badge-navy',  label: 'Pending Close'  },
      closed:         { cls: 'badge-green', label: 'Closed'         },
      cancelled:      { cls: 'badge-red',   label: 'Cancelled'      }
    }[status] || { cls: 'badge-gray', label: status };
    return `<span class="badge ${config.cls}">${config.label}</span>`;
  },

  renderDotLoopBadge(status) {
    const config = {
      linked:  { cls: 'badge-green', label: '● Linked'  },
      pending: { cls: 'badge-gold',  label: '◑ Pending' },
      missing: { cls: 'badge-red',   label: '○ Missing' }
    }[status] || { cls: 'badge-gray', label: status };
    return `<span class="badge ${config.cls}" style="font-size:10px">${config.label}</span>`;
  },

  openRecordDrawer(recordId) {
    const r = window.MockData.realEstateRecords.find(x => x.id === recordId);
    if (!r) return;
    const { helpers, users } = window.MockData;
    const { Icons } = window.Components;

    const agent   = users.find(u => u.id === r.agent_id);
    const contact = window.MockData.contacts.find(c => c.id === r.contact_id);
    const isAtRisk = this._hasOverdueMilestone(r);
    const closingDays = r.closing_date
      ? Math.ceil((new Date(r.closing_date) - new Date()) / 86400000)
      : null;

    const recentActs = window.MockData.activities
      .filter(a => a.contact_id === r.contact_id)
      .sort((a, b) => new Date(b.occurred_at) - new Date(a.occurred_at))
      .slice(0, 4);

    Components.openDrawer({
      title: r.contact_name,
      subtitle: `${r.transaction_type} · ${r.id}`,
      body: `
        <!-- Status Row -->
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-5)">
          <span class="badge badge-green">Real Estate</span>
          ${this.renderStageBadge(r.status)}
          <span class="badge badge-gray">${r.transaction_type}</span>
          ${isAtRisk ? `<span class="badge badge-red">⚠ At Risk</span>` : ''}
          ${closingDays !== null && closingDays < 7 && closingDays >= 0
            ? `<span class="badge badge-gold">🔴 Closing in ${closingDays}d</span>` : ''}
        </div>

        <!-- Risk Banner -->
        ${isAtRisk ? `
        <div style="padding:var(--space-3) var(--space-4);background:var(--color-danger-bg);
                    border-radius:var(--radius-md);margin-bottom:var(--space-4);
                    font-size:var(--text-sm);color:var(--color-danger-text);font-weight:var(--weight-medium)">
          ⚠️ This deal has overdue milestones. Review and take action before closing slips.
        </div>` : ''}

        <!-- Property & Transaction -->
        <div class="profile-section">
          <div class="profile-section-title">Property &amp; Transaction</div>
          <div class="profile-fields-grid">
            <div class="profile-field">
              <span class="profile-field-label">Property Address</span>
              <span class="profile-field-value">${r.property_address || '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Transaction Type</span>
              <span class="profile-field-value" style="text-transform:capitalize">${r.transaction_type}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Closing Date</span>
              <span class="profile-field-value"
                    style="${closingDays !== null && closingDays < 7 && closingDays >= 0 ? 'color:var(--color-warning-text);font-weight:var(--weight-semibold)' : ''}">
                ${r.closing_date ? helpers.formatDate(r.closing_date) : '—'}
                ${closingDays !== null ? ` (${closingDays >= 0 ? closingDays + 'd' : 'Overdue'})` : ''}
              </span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Commission</span>
              <span class="profile-field-value">${r.commission_amount ? helpers.formatCurrency(r.commission_amount) : '—'}</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Assigned Agent</span>
              <div>
                <span class="profile-field-value">${agent?.full_name || '—'}</span>
                <!-- §2.3 G-04: TREC license number (T2-05) -->
                ${agent?.license_number
                  ? `<div style="font-family:monospace;font-size:10px;color:var(--color-success-text);
                                margin-top:2px;display:flex;align-items:center;gap:4px">
                       <span>✓</span>
                       <span>${agent.license_number}</span>
                       <span style="font-family:var(--font-body);color:var(--neutral-400)">TREC Verified</span>
                     </div>`
                  : agent
                  ? `<div style="font-size:10px;color:var(--color-warning-text);margin-top:2px">
                       ⚠ No TREC license on file
                     </div>`
                  : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- §2.6 G-07: Document Auto-Extraction (OCR) -->
        <div class="profile-section">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2)">
            <div class="profile-section-title" style="margin-bottom:0">TREC Contract Documents</div>
            <button class="btn btn-secondary btn-sm" onclick="Screens.realEstate.autoExtractData('${r.id}')" title="Extract key terms via OCR">
               🪄 Auto-Extract (OCR)
            </button>
          </div>
          <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);font-size:var(--text-sm)">
            <div style="display:flex;align-items:center;gap:var(--space-2);color:var(--neutral-600)">
              <span>📄</span> <span>purchase_agreement_signed.pdf</span>
              <span class="badge badge-gray" style="margin-left:auto">Pending Data Extraction</span>
            </div>
            <div id="ocr-results-${r.id}" style="display:none;margin-top:var(--space-3);border-top:1px dashed var(--neutral-200);padding-top:var(--space-3)">
              <!-- OCR Data dynamically populated -->
            </div>
          </div>
        </div>

        <!-- Closing Milestones -->
        <div class="profile-section">
          <div class="profile-section-title">Closing Milestones</div>
          <div class="milestone-list">
            ${(r.milestones || []).map(m => {
              const overdue = !m.completed && m.due_at && new Date(m.due_at) < new Date();
              return `
                <div class="milestone-item ${m.completed ? 'done' : overdue ? 'pending' : 'pending'}"
                     style="${overdue ? 'border-left:3px solid var(--color-danger);' : ''}">
                  <div class="milestone-check">${m.completed ? '✓' : overdue ? '⚠' : ''}</div>
                  <div style="flex:1">
                    <span style="font-size:var(--text-sm);
                                 ${m.completed ? 'color:var(--color-success-text)' : overdue ? 'color:var(--color-danger-text)' : 'color:var(--neutral-600)'}">
                      ${m.name}
                    </span>
                    ${m.due_at ? `
                    <div style="font-size:10px;color:${overdue ? 'var(--color-danger)' : 'var(--neutral-400)'}">
                      Due: ${helpers.formatDate(m.due_at)}${overdue ? ' — OVERDUE' : ''}
                    </div>` : ''}
                  </div>
                  ${!m.completed ? `
                  <button class="btn btn-ghost btn-sm" style="padding:0 var(--space-2);height:22px;font-size:10px"
                          onclick="Screens.realEstate.completeMilestone('${r.id}','${m.name}')">
                    Mark Done
                  </button>` : ''}
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- External Link Status -->
        <div class="profile-section">
          <div class="profile-section-title">External Contract Readiness</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-3)">
            <!-- DotLoop -->
            <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-1)">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                  <span>📄</span>
                  <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">DotLoop</span>
                </div>
                ${this.renderDotLoopBadge(r.external_link_state.status)}
              </div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">
                ${r.dotloop_id
                  ? `Loop ID: <code style="font-family:monospace">${r.dotloop_id}</code> · Last checked: ${helpers.formatRelative(r.external_link_state.last_checked_at)}`
                  : 'No DotLoop loop linked. Link a loop to enable contract sync.'}
              </div>
              ${r.external_link_state.status !== 'linked' ? `
              <button class="btn btn-secondary btn-sm" style="margin-top:var(--space-2)"
                      onclick="Screens.realEstate.linkDotLoop('${r.id}')">
                ${r.external_link_state.status === 'pending' ? 'Review Pending Link' : '+ Link DotLoop Loop'}
              </button>` : ''}
            </div>
            <!-- HAR -->
            <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-1)">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                  <span>🏘️</span>
                  <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">HAR (Houston MLS)</span>
                </div>
                <span class="sync-badge healthy">● Connected</span>
              </div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">
                Agent license verification active via HAR integration.
              </div>
            </div>
          </div>
        </div>

        <!-- Stage Advancement -->
        <div class="profile-section">
          <div class="profile-section-title">Update Stage</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${['lead', 'under_contract', 'pending_close', 'closed'].map(s => `
              <button class="btn btn-${r.status === s ? 'primary' : 'secondary'} btn-sm"
                      onclick="Screens.realEstate.updateStage('${r.id}','${s}')">
                ${{ lead: 'Lead', under_contract: 'Under Contract', pending_close: 'Pending', closed: 'Closed' }[s]}
              </button>`).join('')}
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="profile-section">
          <div class="profile-section-title">Communication &amp; Navigation</div>
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('calls')">${Icons.phone} Call</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('sms')">${Icons.message} SMS</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('email')">${Icons.mail} Email</button>
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('calendar')">${Icons.calendar} Calendar</button>
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
                onclick="Screens.realEstate.openTransferModal('${r.id}')">Transfer</button>
        <div style="flex:1"></div>
        <button class="btn btn-ghost" onclick="Components.closeDrawer()">Close</button>
        <button class="btn btn-primary"
                onclick="Screens.realEstate.promoteStage('${r.id}')">Advance Stage →</button>`
    });
  },

  // §2.6 G-07: Document auto-extraction (OCR)
  autoExtractData(recordId) {
    Components.Toast('Initiating Optical Character Recognition (OCR) Engine...', 'info');
    const btn = event.currentTarget;
    btn.disabled = true;
    btn.innerHTML = `<span style="opacity:0.5">🪄 Extracting...</span>`;

    setTimeout(() => {
      const resultsDiv = document.getElementById(`ocr-results-${recordId}`);
      if (resultsDiv) {
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
          <div style="color:var(--color-success-text);font-weight:700;margin-bottom:var(--space-2)">✓ Extraction Complete</div>
          <div class="profile-fields-grid" style="grid-template-columns:1fr 1fr">
            <div class="profile-field">
              <span class="profile-field-label">Purchase Price</span>
              <span class="profile-field-value" style="font-family:monospace">$415,000.00</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Earnest Money</span>
              <span class="profile-field-value" style="font-family:monospace">$4,150.00</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Option Period</span>
              <span class="profile-field-value">10 Days</span>
            </div>
            <div class="profile-field">
              <span class="profile-field-label">Closing Date</span>
              <span class="profile-field-value">11/30/2026</span>
            </div>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top:var(--space-3);width:100%" onclick="Components.Toast('Data mapped to deal structure','success'); this.disabled=true; this.innerText='Applied to Deal'">Apply Extracted Data</button>
        `;
      }
      Components.Toast('Document key terms successfully extracted.', 'success');
      btn.style.display = 'none';
      
      const badge = resultsDiv.parentElement.querySelector('.badge');
      if (badge) {
        badge.className = 'badge badge-green';
        badge.innerText = 'OCR Verified';
      }
    }, 1500);
  },

  completeMilestone(recordId, milestoneName) {
    const r = window.MockData.realEstateRecords.find(x => x.id === recordId);
    if (!r) return;
    const m = r.milestones.find(ms => ms.name === milestoneName);
    if (m) {
      m.completed = true;
      Components.Toast(`Milestone "${milestoneName}" completed`, 'success');
      // Re-open the drawer to refresh
      Components.closeDrawer();
      setTimeout(() => this.openRecordDrawer(recordId), 100);
    }
  },

  updateStage(recordId, newStage) {
    const r = window.MockData.realEstateRecords.find(x => x.id === recordId);
    if (r) {
      r.status = newStage;
      Components.Toast(`Stage updated to "${{ lead: 'Lead', under_contract: 'Under Contract', pending_close: 'Pending Close', closed: 'Closed' }[newStage]}"`, 'success');
      Components.closeDrawer();
      this.refreshContent();
    }
  },

  promoteStage(recordId) {
    const order = ['lead', 'under_contract', 'pending_close', 'closed'];
    const r = window.MockData.realEstateRecords.find(x => x.id === recordId);
    if (!r) return;
    const idx = order.indexOf(r.status);
    if (idx < order.length - 1) this.updateStage(recordId, order[idx + 1]);
    else { Components.Toast('Transaction is already closed', 'info'); Components.closeDrawer(); }
  },

  linkDotLoop(recordId) {
    const r = window.MockData.realEstateRecords.find(x => x.id === recordId);
    if (!r) return;
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 're-dotloop',
      title: '📄 Link DotLoop Loop',
      subtitle: r.contact_name,
      body: `
        <div class="form-group">
          <label class="form-label required">DotLoop Loop ID</label>
          <input class="form-input" id="dl-id" placeholder="e.g. DL-123456">
          <div class="form-helper">Find this in your DotLoop dashboard under the transaction.</div>
        </div>
        <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-info-text)">
          ℹ️ Linking a DotLoop loop enables contract-status visibility and future automation.
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('re-dotloop')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('re-dotloop');
                         (function(){
                           const r = window.MockData.realEstateRecords.find(x=>x.id==='${r.id}');
                           if(r){r.external_link_state.status='linked';r.dotloop_id=document.getElementById('dl-id')?.value||'DL-NEW';}
                           Components.Toast('DotLoop loop linked','success');
                           Screens.realEstate.refreshContent();
                         })()">
          ${Icons.link} Link Loop
        </button>`
    }));
  },

  openTransferModal(recordId) {
    const r = window.MockData.realEstateRecords.find(x => x.id === recordId);
    if (!r) return;
    const { Icons, Modal } = window.Components;
    Components.closeDrawer();
    Components.openModal(Modal({
      id: 're-transfer',
      title: 'Transfer Transaction',
      subtitle: r.contact_name,
      body: `
        <div class="form-group">
          <label class="form-label required">New Agent</label>
          <select class="form-select">
            ${window.MockData.users
              .filter(u => u.departments.includes('real_estate'))
              .map(u => `<option>${u.full_name} · ${window.MockData.helpers.roleName(u.role)}</option>`)
              .join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Transfer Note</label>
          <textarea class="form-input" rows="3" style="height:auto;padding:var(--space-3)"
            placeholder="Context for the new agent…"></textarea>
        </div>

        <!-- §2.2 G-03: Partner Services Disclosure (T2-14) -->
        ${window.Compliance ? window.Compliance.partnerDisclosureHTML() : ''}`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('re-transfer')">Cancel</button>
        <button class="btn btn-primary"
                onclick="Components.closeModal('re-transfer');Components.Toast('Transaction transferred','success')">
          ${Icons.arrowRight} Transfer
        </button>`
    }));
  },

  setView(view) { this._view = view; this.refreshContent(); },

  refreshContent() {
    const el = document.getElementById('re-content');
    if (el) el.innerHTML = this.renderContent(this.getFiltered());
  },

  clearFilters() {
    this._filters = { stage: '', agent: '', search: '', riskOnly: false };
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