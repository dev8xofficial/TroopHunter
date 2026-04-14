/**
 * Burkes Group CRM — Email Blast Screen
 * Source: .specify/specs/009-email-blast/spec.md, screens/email-blast.yaml
 * Batch: 5 of 7 — Activities + Calendar + Email Blast (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.emailBlast = {
  _selectedCampaign: null,
  _view: 'list',  // 'list' | 'detail'
  _draftFilters: {
    dept: 'insurance',
    stage: '',
    missingData: false
  },
  _draftContent: {
    subject: '',
    body: ''
  },

  render() {
    const { campaigns, contacts, helpers } = window.MockData;
    const { Icons, StatCard } = window.Components;

    const sentCampaigns      = campaigns.filter(c => c.status === 'sent');
    const scheduledCampaigns = campaigns.filter(c => c.status === 'scheduled');
    const draftCampaigns     = campaigns.filter(c => c.status === 'draft');
    const failedCampaigns    = campaigns.filter(c => c.status === 'failed');

    const totalSent = sentCampaigns.reduce((n, c) => n + (c.metrics?.sent || 0), 0);
    const totalOpen = sentCampaigns.reduce((n, c) => n + (c.metrics?.opened || 0), 0);
    const avgOpenRate = totalSent > 0 ? Math.round((totalOpen / totalSent) * 100) : 0;

    const selectedCampaign = this._selectedCampaign
      ? campaigns.find(c => c.id === this._selectedCampaign)
      : null;

    return `
      <!-- Email Blast Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Email Blast</h1>
          <p>CRM-targeted campaigns · Provider-linked delivery · Exclusion-safe sending</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-primary btn-sm" onclick="Screens.emailBlast.openCreateWizard()">
            ${Icons.plus} New Campaign
          </button>
        </div>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Campaigns', value: campaigns.length, accent:'navy', icon: Icons.send })}
        ${StatCard({ label:'Emails Sent', value: totalSent.toLocaleString(), accent:'green', icon: Icons.mail })}
        ${StatCard({ label:'Avg Open Rate', value: avgOpenRate+'%', delta: 4, accent:'gold', icon: Icons.chart })}
        ${StatCard({ label:'Scheduled', value: scheduledCampaigns.length, accent:'blue', icon: Icons.calendar })}
      </div>

      <!-- Provider Status -->
      <div class="degraded-banner" style="border-color:var(--color-success);background:var(--color-success-bg);margin-bottom:var(--space-5)">
        <span style="font-size:16px">📤</span>
        <span style="color:var(--color-success-text);font-weight:var(--weight-medium)">
          Email delivery provider connected · Send capacity: <strong>unlimited</strong> · Opt-out enforcement: <strong>active</strong>
        </span>
        <span style="margin-left:auto;font-size:var(--text-xs);color:var(--color-success-text);opacity:.7">Outlook-linked delivery</span>
      </div>

      <!-- Two-Panel Layout -->
      <div style="display:grid;grid-template-columns:${selectedCampaign?'380px 1fr':'1fr'};gap:var(--space-5)">

        <!-- Campaign List Panel -->
        <div>
          <div class="card" style="overflow:hidden">
            <div class="card-header">
              <span class="card-title">Campaigns</span>
              <div style="display:flex;gap:var(--space-2)">
                ${[['all','All'],['draft','Draft'],['sent','Sent'],['scheduled','Scheduled']].map(([v,l]) =>
                  `<button class="btn btn-ghost btn-sm" style="font-size:10px;height:22px;padding:0 var(--space-2);"
                           onclick="Screens.emailBlast.filterList('${v}')">${l}</button>`
                ).join('')}
              </div>
            </div>
            <div id="campaign-list">
              ${this.renderCampaignList(campaigns, selectedCampaign?.id)}
            </div>
          </div>
        </div>

        <!-- Detail Panel -->
        ${selectedCampaign
          ? `<div>${this.renderCampaignDetail(selectedCampaign)}</div>`
          : this.renderEmptyDetail()}

      </div>`;
  },

  renderCampaignList(campaigns, activeId) {
    const { helpers } = window.MockData;

    const statusConfig = {
      sent:      { label:'Sent',      bg:'var(--color-success-bg)',  text:'var(--color-success-text)',  icon:'✅' },
      draft:     { label:'Draft',     bg:'var(--neutral-100)',       text:'var(--neutral-600)',          icon:'📝' },
      scheduled: { label:'Scheduled', bg:'var(--color-info-bg)',     text:'var(--color-info-text)',      icon:'🕒' },
      sending:   { label:'Sending',   bg:'var(--color-warning-bg)',  text:'var(--color-warning-text)',   icon:'📡' },
      failed:    { label:'Failed',    bg:'var(--color-danger-bg)',   text:'var(--color-danger-text)',    icon:'❌' },
      cancelled: { label:'Cancelled', bg:'var(--neutral-100)',       text:'var(--neutral-400)',          icon:'🚫' }
    };

    const deptColors = {
      insurance:'var(--dept-insurance)', mortgage:'var(--dept-mortgage)',
      real_estate:'var(--dept-real-estate)', platform:'var(--neutral-400)'
    };

    return campaigns.map(campaign => {
      const cfg = statusConfig[campaign.status] || statusConfig.draft;
      const isActive = campaign.id === activeId;

      return `
        <div onclick="Screens.emailBlast.selectCampaign('${campaign.id}')"
             style="padding:var(--space-4) var(--space-5);border-bottom:1px solid var(--neutral-100);
                    cursor:pointer;transition:background .1s;
                    ${isActive?'background:rgba(26,58,82,0.05);border-left:3px solid var(--color-primary-navy)':''};"
             onmouseover="if(!${isActive})this.style.background='var(--neutral-50)'"
             onmouseout="if(!${isActive})this.style.background=''">

          <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
            <div style="width:36px;height:36px;border-radius:var(--radius-md);
                        background:${cfg.bg};display:flex;align-items:center;justify-content:center;
                        font-size:18px;flex-shrink:0">
              ${cfg.icon}
            </div>
            <div style="flex:1;min-width:0">
              <div style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--neutral-800);
                          white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:3px">
                ${campaign.subject}
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-2);flex-wrap:wrap">
                <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;
                             color:${deptColors[campaign.department]||'var(--neutral-400)'}">
                  ${window.MockData.helpers.departmentLabel(campaign.department)}
                </span>
                <span style="font-size:10px;color:var(--neutral-400)">·</span>
                <span style="font-size:10px;color:var(--neutral-400)">
                  ${campaign.status === 'sent' && campaign.scheduled_at
                    ? helpers.formatRelative(campaign.scheduled_at)
                    : campaign.status === 'scheduled' && campaign.scheduled_at
                    ? 'Sends ' + helpers.formatDate(campaign.scheduled_at)
                    : campaign.status}
                </span>
              </div>
            </div>
            <span style="padding:2px 7px;border-radius:var(--radius-full);font-size:10px;font-weight:700;
                         background:${cfg.bg};color:${cfg.text};white-space:nowrap">
              ${cfg.label}
            </span>
          </div>

          ${campaign.status === 'sent' && campaign.metrics?.sent ? `
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-2);margin-top:var(--space-3)">
            ${[
              ['Sent', campaign.metrics.sent, '📤'],
              ['Opened', campaign.metrics.opened||0, '👁'],
              ['Clicked', campaign.metrics.clicked||0, '🖱']
            ].map(([lbl, val, icon]) => `
              <div style="text-align:center;padding:var(--space-1);background:var(--neutral-50);border-radius:var(--radius-sm)">
                <div style="font-size:10px;color:var(--neutral-400)">${icon} ${lbl}</div>
                <div style="font-family:var(--font-heading);font-size:var(--text-md);font-weight:700;color:var(--color-primary-navy)">${val}</div>
              </div>`).join('')}
          </div>` : ''}
        </div>`;
    }).join('');
  },

  renderEmptyDetail() {
    return `
      <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                                min-height:400px;gap:var(--space-4)">
        <div style="font-size:48px">📧</div>
        <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-primary-navy)">
          Select a campaign
        </div>
        <div style="color:var(--neutral-400);font-size:var(--text-sm);text-align:center;max-width:260px">
          Choose a campaign to view details, metrics, or manage audience and content.
        </div>
        <button class="btn btn-primary" onclick="Screens.emailBlast.openCreateWizard()">
          Create New Campaign
        </button>
      </div>`;
  },

  renderCampaignDetail(campaign) {
    const { contacts, helpers } = window.MockData;
    const { Icons } = window.Components;

    const statusConfig = {
      sent:      { label:'Sent',      color:'var(--color-success)',  bg:'var(--color-success-bg)' },
      draft:     { label:'Draft',     color:'var(--neutral-400)',    bg:'var(--neutral-100)' },
      scheduled: { label:'Scheduled', color:'var(--color-info)',     bg:'var(--color-info-bg)' },
      failed:    { label:'Failed',    color:'var(--color-danger)',   bg:'var(--color-danger-bg)' }
    };
    const cfg = statusConfig[campaign.status] || statusConfig.draft;

    const sender = window.MockData.users.find(u => u.id === campaign.created_by);
    const openRate = campaign.metrics?.sent
      ? Math.round(((campaign.metrics.opened||0)/campaign.metrics.sent)*100)
      : null;
    const clickRate = campaign.metrics?.opened
      ? Math.round(((campaign.metrics.clicked||0)/campaign.metrics.opened)*100)
      : null;

    return `
      <div class="card" style="overflow:hidden">
        <!-- Campaign Detail Header -->
        <div style="padding:var(--space-5) var(--space-6);border-bottom:1px solid var(--neutral-200)">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3)">
            <div style="flex:1;min-width:0">
              <div style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;
                          color:var(--color-primary-navy);margin-bottom:var(--space-2)">
                ${campaign.subject}
              </div>
              <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
                <span style="padding:2px 8px;background:${cfg.bg};color:${cfg.color};border-radius:var(--radius-full);font-size:11px;font-weight:700">
                  ${cfg.label}
                </span>
                <span class="badge badge-${campaign.department==='insurance'?'gold':campaign.department==='mortgage'?'blue':'green'}">
                  ${helpers.departmentLabel(campaign.department)}
                </span>
                ${sender ? `<span class="badge badge-gray">by ${sender.full_name}</span>` : ''}
              </div>
            </div>
            <button onclick="Screens.emailBlast._selectedCampaign=null;Screens.emailBlast.rerender()"
                    class="btn btn-ghost btn-sm btn-icon">✕</button>
          </div>
        </div>

        <div style="padding:var(--space-5) var(--space-6)">

          <!-- Audience Summary -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-bottom:var(--space-5)">
            ${[
              ['Recipients', campaign.audience_count, 'var(--color-primary-navy)', '📬'],
              ['Excluded', campaign.excluded_count, 'var(--color-warning)', '🚫'],
              ['Net Sent', campaign.audience_count - campaign.excluded_count, 'var(--color-success)', '📤']
            ].map(([lbl,val,color,icon])=>`
              <div style="padding:var(--space-4);background:var(--neutral-50);border-radius:var(--radius-lg);text-align:center">
                <div style="font-size:22px;margin-bottom:var(--space-1)">${icon}</div>
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;color:${color}">${val}</div>
                <div style="font-size:var(--text-xs);color:var(--neutral-500);font-weight:600;text-transform:uppercase;letter-spacing:.05em">${lbl}</div>
              </div>`).join('')}
          </div>

          <!-- Performance Metrics (if sent) -->
          ${campaign.status === 'sent' && campaign.metrics?.sent ? `
          <div style="margin-bottom:var(--space-5)">
            <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:.07em;
                        color:var(--neutral-400);margin-bottom:var(--space-3)">Campaign Performance</div>
            <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:var(--space-3)">
              ${[
                ['Sent',      campaign.metrics.sent,               null,        'var(--color-primary-navy)'],
                ['Delivered', campaign.metrics.delivered||0,       null,        'var(--color-accent-blue)'],
                ['Opened',    campaign.metrics.opened||0,          openRate,    'var(--color-success)'],
                ['Clicked',   campaign.metrics.clicked||0,         clickRate,   'var(--color-primary-gold)']
              ].map(([lbl,val,rate,color])=>`
                <div style="padding:var(--space-3);border:1.5px solid var(--neutral-200);border-radius:var(--radius-md);text-align:center">
                  <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;color:${color}">${val}</div>
                  ${rate !== null ? `<div style="font-size:var(--text-xs);color:var(--neutral-400)">${rate}% rate</div>` : ''}
                  <div style="font-size:var(--text-xs);color:var(--neutral-500);font-weight:600;margin-top:2px">${lbl}</div>
                </div>`).join('')}
            </div>

            <!-- Funnel Bar -->
            <div style="margin-top:var(--space-4)">
              ${[
                ['Sent',       campaign.metrics.sent,               'var(--color-primary-navy)'],
                ['Delivered',  campaign.metrics.delivered||0,       'var(--color-accent-blue)'],
                ['Opened',     campaign.metrics.opened||0,          'var(--color-success)'],
                ['Clicked',    campaign.metrics.clicked||0,         'var(--color-primary-gold)']
              ].map(([lbl,val,color])=>{
                const pct = Math.round((val/campaign.metrics.sent)*100);
                return `
                  <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2)">
                    <span style="font-size:var(--text-xs);width:60px;color:var(--neutral-500);text-align:right;flex-shrink:0">${lbl}</span>
                    <div style="flex:1;height:8px;background:var(--neutral-100);border-radius:var(--radius-full);overflow:hidden">
                      <div style="height:100%;width:${pct}%;background:${color};border-radius:var(--radius-full);transition:width .3s"></div>
                    </div>
                    <span style="font-size:var(--text-xs);width:40px;color:var(--neutral-600);font-weight:600">${pct}%</span>
                  </div>`;
              }).join('')}
            </div>
          </div>` : ''}

          <!-- Timing Info -->
          <div style="padding:var(--space-3) var(--space-4);background:var(--neutral-50);border-radius:var(--radius-md);
                      font-size:var(--text-sm);margin-bottom:var(--space-5)">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="color:var(--neutral-500)">
                ${campaign.status === 'sent' && campaign.scheduled_at
                  ? `📅 Sent ${helpers.formatDate(campaign.scheduled_at)}`
                  : campaign.status === 'scheduled' && campaign.scheduled_at
                  ? `🕒 Scheduled for ${helpers.formatDateTime(campaign.scheduled_at)}`
                  : campaign.status === 'draft'
                  ? '📝 Draft — not yet scheduled'
                  : campaign.status === 'failed'
                  ? '❌ Delivery failed — check provider'
                  : '—'}
              </span>
              <span style="font-size:var(--text-xs);color:var(--neutral-400)">Campaign ID: ${campaign.id}</span>
            </div>
          </div>

          <!-- Actions -->
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${campaign.status === 'draft' ? `
              <button class="btn btn-primary btn-sm" onclick="Screens.emailBlast.openSendReview('${campaign.id}')">
                ${Icons.send} Review & Send
              </button>
              <button class="btn btn-secondary btn-sm" onclick="Screens.emailBlast.openEditCampaign('${campaign.id}')">
                Edit Campaign
              </button>` : ''}
            ${campaign.status === 'scheduled' ? `
              <button class="btn btn-danger btn-sm" onclick="Screens.emailBlast.cancelCampaign('${campaign.id}')">
                Cancel Scheduled
              </button>` : ''}
            ${campaign.status === 'sent' ? `
              <button class="btn btn-secondary btn-sm" onclick="Components.Toast('Report exported','success')">
                ${Icons.download} Export Report
              </button>` : ''}
            <button class="btn btn-secondary btn-sm" onclick="Router.navigate('contacts')">
              ${Icons.users} View Audience
            </button>
          </div>
        </div>
      </div>`;
  },

  selectCampaign(id) {
    this._selectedCampaign = this._selectedCampaign === id ? null : id;
    this.rerender();
  },

  filterList(statusFilter) {
    const { campaigns } = window.MockData;
    const filtered = statusFilter === 'all' ? campaigns : campaigns.filter(c => c.status === statusFilter);
    const list = document.getElementById('campaign-list');
    if (list) list.innerHTML = this.renderCampaignList(filtered, this._selectedCampaign);
  },

  openCreateWizard() {
    const { Icons, Modal } = window.Components;
    const { contacts, helpers } = window.MockData;

    // Calculate audience preview
    const insContacts = contacts.filter(c => c.departments.includes('insurance')).length;

    Components.openModal(Modal({
      id: 'create-campaign',
      title: '📧 New Email Campaign',
      subtitle: 'Build audience, compose content, review before send',
      large: true,
      steps: [
        { label: 'Audience', active: true },
        { label: 'Content' },
        { label: 'Review & Send' }
      ],
      body: `
        <!-- Step 1: Audience Builder -->
        <div id="campaign-step-1">
          <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);
                      font-size:var(--text-sm);color:var(--color-info-text);margin-bottom:var(--space-4)">
            💡 Audience is built from CRM contact data. Opt-out and send-blocked contacts are excluded automatically.
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label required">Department</label>
              <select class="form-select" id="camp-dept"
                      onchange="Screens.emailBlast.updateAudiencePreview()">
                <option value="">All Departments</option>
                <option value="insurance" selected>Insurance</option>
                <option value="mortgage">Mortgage</option>
                <option value="real_estate">Real Estate</option>
                <option value="platform">All (Platform)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Pipeline Stage</label>
              <select class="form-select" id="camp-stage"
                      onchange="Screens.emailBlast.updateAudiencePreview()">
                <option value="">Any Stage</option>
                <option>New Inquiry</option>
                <option>Contacted</option>
                <option>Quoted / Offer</option>
                <option>Under Contract</option>
                <option>Pending Close</option>
                <option>Closed</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label style="display:flex;align-items:center;gap:var(--space-2);cursor:pointer;font-size:var(--text-sm)">
              <input type="checkbox" id="camp-complete-only"> Only contacts with complete data (no missing fields)
            </label>
          </div>

          <!-- Audience Preview -->
          <div id="audience-preview" style="padding:var(--space-4);background:var(--neutral-50);
                border-radius:var(--radius-lg);border:1.5px solid var(--neutral-200)">
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);text-align:center">
              <div>
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;
                            color:var(--color-primary-navy)" id="aud-total">${insContacts}</div>
                <div style="font-size:var(--text-xs);color:var(--neutral-500)">Eligible contacts</div>
              </div>
              <div>
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;
                            color:var(--color-warning)" id="aud-excluded">4</div>
                <div style="font-size:var(--text-xs);color:var(--neutral-500)">Excluded (opt-out / blocked)</div>
              </div>
              <div>
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;
                            color:var(--color-success)" id="aud-net">${insContacts - 4}</div>
                <div style="font-size:var(--text-xs);color:var(--neutral-500)">Will receive email</div>
              </div>
            </div>
          </div>
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Components.closeModal('create-campaign')">Cancel</button>
        <button class="btn btn-primary" onclick="Screens.emailBlast.gotoContentStep()">
          Next: Content ${Icons.arrowRight}
        </button>`
    }));
  },

  updateAudiencePreview() {
    const { contacts } = window.MockData;
    const dept  = document.getElementById('camp-dept')?.value || '';
    const stage = document.getElementById('camp-stage')?.value || '';

    let audience = contacts;
    if (dept && dept !== 'platform') audience = audience.filter(c => c.departments.includes(dept));
    if (stage) audience = audience.filter(c => Object.values(c.pipeline_stage||{}).includes(stage));

    const excluded = Math.floor(audience.length * 0.05) + 1;
    const net = audience.length - excluded;

    const totalEl = document.getElementById('aud-total');
    const exclEl  = document.getElementById('aud-excluded');
    const netEl   = document.getElementById('aud-net');
    if (totalEl) totalEl.textContent = audience.length;
    if (exclEl)  exclEl.textContent  = excluded;
    if (netEl)   netEl.textContent   = Math.max(0, net);
  },

  gotoContentStep() {
    Components.closeModal('create-campaign');
    const { Icons, Modal } = window.Components;
    Components.openModal(Modal({
      id: 'campaign-content',
      title: '✍️ Campaign Content',
      subtitle: 'Compose email for your audience',
      large: true,
      steps: [
        { label: 'Audience', active: false },
        { label: 'Content',  active: true },
        { label: 'Review & Send' }
      ],
      body: `
        <div class="form-group">
          <label class="form-label required">Subject Line</label>
          <input class="form-input" id="camp-subject" placeholder="e.g. Your policy renewal is coming up · Q2 Rate Update">
          <div class="form-helper">Keep under 60 characters for best mobile display</div>
        </div>
        <div class="form-group">
          <label class="form-label required">Preview Text</label>
          <input class="form-input" id="camp-preview-text" placeholder="Short text shown in inbox preview (optional)">
        </div>
        <div class="form-group">
          <label class="form-label required">Email Body</label>
          <textarea class="form-input" id="camp-body" rows="10" style="height:auto;padding:var(--space-3)"
            placeholder="Write your email content here…

Hi {{first_name}},

I wanted to follow up on…

Best regards,
{{agent_name}}
Burkes Group"></textarea>
          <div class="form-helper">Use {{first_name}} and {{agent_name}} for personalization</div>
        </div>
        <div style="padding:var(--space-3);background:var(--color-info-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-info-text)">
          📧 Emails are sent via Microsoft Outlook integration. An unsubscribe link will be automatically appended.
        </div>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Screens.emailBlast.openCreateWizard()">← Back</button>
        <button class="btn btn-primary" onclick="Screens.emailBlast.gotoReviewStep()">
          Next: Review ${Icons.arrowRight}
        </button>`
    }));
  },

  gotoReviewStep() {
    const subject = document.getElementById('camp-subject')?.value || 'Campaign Subject';
    Components.closeModal('campaign-content');
    const { Icons, Modal } = window.Components;
    const { contacts } = window.MockData;

    Components.openModal(Modal({
      id: 'campaign-review',
      title: '🔍 Review & Send',
      subtitle: subject,
      large: true,
      steps: [
        { label: 'Audience', active: false },
        { label: 'Content',  active: false },
        { label: 'Review & Send', active: true }
      ],
      body: `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);margin-bottom:var(--space-4)">
          <div style="padding:var(--space-4);background:var(--color-success-bg);border-radius:var(--radius-lg);text-align:center">
            <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:700;color:var(--color-success-text)">
              ${contacts.filter(c=>c.departments.includes('insurance')).length - 4}
            </div>
            <div style="font-size:var(--text-sm);color:var(--color-success-text);font-weight:600">Contacts will receive this email</div>
          </div>
          <div style="padding:var(--space-4);background:var(--color-warning-bg);border-radius:var(--radius-lg);text-align:center">
            <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:700;color:var(--color-warning-text)">4</div>
            <div style="font-size:var(--text-sm);color:var(--color-warning-text);font-weight:600">Contacts excluded (opt-out or blocked)</div>
          </div>
        </div>

        <!-- Excluded Contacts List -->
        <div style="margin-bottom:var(--space-4)">
          <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:.07em;
                      color:var(--neutral-400);margin-bottom:var(--space-2)">Exclusion Reasons</div>
          ${[
            ['Linda Brown',       'Opted out of email marketing'],
            ['Barbara Wilson',    'Send-blocked: missing consent'],
            ['Susan Thomas',      'Opted out of email marketing'],
            ['Stephanie Robinson','Bounced email address']
          ].map(([name, reason]) => `
            <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) var(--space-3);
                        background:var(--color-warning-bg);border-radius:var(--radius-md);margin-bottom:var(--space-2)">
              <span style="font-size:12px">🚫</span>
              <span style="font-size:var(--text-sm);font-weight:var(--weight-medium)">${name}</span>
              <span style="font-size:var(--text-xs);color:var(--color-warning-text);margin-left:auto">${reason}</span>
            </div>`).join('')}
        </div>

        <!-- Subject Preview -->
        <div style="padding:var(--space-4);background:white;border:1.5px solid var(--neutral-200);border-radius:var(--radius-lg)">
          <div style="font-size:var(--text-xs);color:var(--neutral-400);margin-bottom:var(--space-2)">Subject line preview</div>
          <div style="font-weight:var(--weight-semibold)">${subject}</div>
        </div>

        <div style="padding:var(--space-3);background:var(--color-danger-bg);border-radius:var(--radius-md);
                    font-size:var(--text-sm);color:var(--color-danger-text);margin-top:var(--space-4)">
          ⚠️ <strong>This action cannot be undone.</strong> Once sent, all eligible contacts in the audience will receive this email via Outlook.
        </div>`,
      footerLeft: `
        <label style="display:flex;align-items:center;gap:6px;font-size:var(--text-sm);cursor:pointer">
          <input type="checkbox" id="review-confirm"> I confirm audience and content are correct
        </label>`,
      footerRight: `
        <button class="btn btn-secondary" onclick="Screens.emailBlast.gotoContentStep()">← Back</button>
        <button class="btn btn-primary" onclick="Screens.emailBlast.sendCampaign('${subject}')">
          ${Icons.send} Send Campaign
        </button>`
    }));
  },

  sendCampaign(subject) {
    const confirmed = document.getElementById('review-confirm')?.checked;
    if (!confirmed) {
      Components.Toast('Please confirm the campaign details before sending', 'warning');
      return;
    }
    Components.closeModal('campaign-review');
    // Add new sent campaign to mock data
    const newCampaign = {
      id: `CMP-NEW-${Date.now()}`,
      department: 'insurance',
      status: 'sent',
      subject: subject || 'New Campaign',
      audience_count: window.MockData.contacts.filter(c=>c.departments.includes('insurance')).length,
      excluded_count: 4,
      created_by: 'USR-OW-001',
      scheduled_at: new Date().toISOString(),
      metrics: {
        sent: window.MockData.contacts.filter(c=>c.departments.includes('insurance')).length - 4,
        delivered: 0, opened: 0, clicked: 0
      }
    };
    window.MockData.campaigns.unshift(newCampaign);
    Components.Toast(`Campaign "${subject}" sent successfully to ${newCampaign.metrics.sent} contacts`, 'success');
    this.rerender();
  },

  openSendReview(campaignId) {
    const campaign = window.MockData.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    this.gotoReviewStep();
  },

  openEditCampaign(campaignId) {
    this.gotoContentStep();
  },

  cancelCampaign(campaignId) {
    const campaign = window.MockData.campaigns.find(c => c.id === campaignId);
    if (!campaign) return;
    campaign.status = 'cancelled';
    Components.Toast('Campaign cancelled', 'warning');
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