/**
 * Burkes Group CRM — Reports Screen
 * Source: .specify/specs/015-reports/spec.md, screens/reports.yaml
 * Batch: 7 of 7 — Integrations + Reports + Admin Settings (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.reports = {
  _dept:      '',
  _dateRange: '30',
  _view:      'overview',  // 'overview' | 'department' | 'funnel' | 'communications'

  render() {
    const { Icons } = window.Components;

    return `
      <!-- Reports Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Reports</h1>
          <p>Performance analytics · Department comparisons · Operational drill-downs</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm" onclick="Components.Toast('Report export queued — download link sent via email','success')">
            ${Icons.download} Export
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar" style="margin-bottom:var(--space-5)">
        <select class="filter-select" onchange="Screens.reports._dept=this.value;Screens.reports.refreshContent()">
          <option value="">All Departments</option>
          <option value="insurance"   ${this._dept === 'insurance'   ? 'selected' : ''}>Insurance</option>
          <option value="mortgage"    ${this._dept === 'mortgage'    ? 'selected' : ''}>Mortgage</option>
          <option value="real_estate" ${this._dept === 'real_estate' ? 'selected' : ''}>Real Estate</option>
        </select>
        <select class="filter-select" onchange="Screens.reports._dateRange=this.value;Screens.reports.refreshContent()">
          <option value="7"   ${this._dateRange === '7'   ? 'selected' : ''}>Last 7 days</option>
          <option value="30"  ${this._dateRange === '30'  ? 'selected' : ''}>Last 30 days</option>
          <option value="90"  ${this._dateRange === '90'  ? 'selected' : ''}>Last 90 days</option>
          <option value="ytd" ${this._dateRange === 'ytd' ? 'selected' : ''}>Year to date</option>
        </select>
        <div style="margin-left:auto;display:flex;align-items:center;gap:var(--space-2)">
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Freshness:</span>
          <span class="sync-badge healthy">● Live · 3 min ago</span>
        </div>
      </div>

      <!-- View Tabs -->
      <div class="tabs">
        ${[
          ['overview',        '📊 Overview'],
          ['department',      '🏢 By Department'],
          ['funnel',          '📈 Funnel'],
          ['communications',  '💬 Communications']
        ].map(([v, l]) => `
          <div class="tab ${this._view === v ? 'active' : ''}"
               onclick="Screens.reports._view='${v}';Screens.reports.refreshContent()">
            ${l}
          </div>`).join('')}
      </div>

      <!-- View Content -->
      <div id="reports-content">
        ${this.renderView()}
      </div>`;
  },

  renderView() {
    const { reportData } = window.MockData;
    switch (this._view) {
      case 'department':     return this.renderDepartmentView(reportData.by_department);
      case 'funnel':         return this.renderFunnelView(reportData.funnel);
      case 'communications': return this.renderCommunicationsView(reportData.kpis);
      default:               return this.renderOverviewView(reportData.kpis, reportData.by_department, reportData.funnel);
    }
  },

  renderOverviewView(kpis, by_department, funnel) {
    const { StatCard, Icons } = window.Components;
    const { helpers } = window.MockData;
    const convRate = Math.round(kpis.conversion_rate * 100);

    return `
      <!-- Top KPIs -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Revenue MTD',      value: helpers.formatCurrency(kpis.total_revenue_mtd), delta: 18, accent:'gold',  icon: Icons.chart  })}
        ${StatCard({ label:'Leads Created',    value: kpis.leads_created_mtd,                         delta: 12, accent:'navy',  icon: Icons.activity })}
        ${StatCard({ label:'Leads Closed',     value: kpis.leads_closed_mtd,                          delta: 5,  accent:'green', icon: Icons.check   })}
        ${StatCard({ label:'Conversion Rate',  value: convRate + '%',                                  delta: 3,  accent:'blue',  icon: Icons.layouts })}
      </div>
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:var(--space-6)">
        ${StatCard({ label:'Avg Cycle Days',   value: kpis.avg_cycle_days + 'd', delta: -4, accent:'navy',  icon: Icons.calendar })}
        ${StatCard({ label:'Calls Made',       value: kpis.calls_made,           delta: 8,  accent:'blue',  icon: Icons.phone    })}
        ${StatCard({ label:'Emails Sent',      value: kpis.emails_sent,          delta: 15, accent:'green', icon: Icons.mail     })}
        ${StatCard({ label:'SMS Sent',         value: kpis.sms_sent,             delta: 11, accent:'gold',  icon: Icons.message  })}
      </div>

      <!-- Department Performance + Pipeline Funnel -->
      <div class="grid-2" style="margin-bottom:var(--space-5)">

        <!-- Department Performance -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Department Performance</span>
            <button class="btn btn-ghost btn-sm"
                    onclick="Screens.reports._view='department';Screens.reports.refreshContent()">
              Expand ${Icons.externalLink}
            </button>
          </div>
          <div class="card-body">
            ${by_department.map(dept => {
              const maxRev = Math.max(...by_department.map(d => d.revenue));
              const barW   = Math.round((dept.revenue / maxRev) * 100);
              const color  = { insurance:'var(--dept-insurance)', mortgage:'var(--dept-mortgage)', real_estate:'var(--dept-real-estate)' }[dept.dept] || 'var(--neutral-400)';
              const convPct = Math.round(dept.conversion * 100);
              return `
                <div style="margin-bottom:var(--space-4)">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
                    <div style="display:flex;align-items:center;gap:var(--space-2)">
                      <span class="dept-dot dept-dot-${dept.dept === 'real_estate' ? 'real-estate' : dept.dept}"></span>
                      <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold)">${dept.label}</span>
                    </div>
                    <div style="text-align:right">
                      <div style="font-family:var(--font-heading);font-size:var(--text-lg);font-weight:700;color:var(--color-primary-navy)">
                        ${helpers.formatCurrency(dept.revenue)}
                      </div>
                      <div style="font-size:10px;color:var(--neutral-400)">${dept.leads} leads · ${convPct}% conv.</div>
                    </div>
                  </div>
                  <div style="height:7px;background:var(--neutral-100);border-radius:var(--radius-full);overflow:hidden">
                    <div style="height:100%;width:${barW}%;background:${color};border-radius:var(--radius-full);transition:width .4s"></div>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Pipeline Funnel (compact) -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Pipeline Funnel</span>
            <button class="btn btn-ghost btn-sm"
                    onclick="Screens.reports._view='funnel';Screens.reports.refreshContent()">
              Expand ${Icons.externalLink}
            </button>
          </div>
          <div class="card-body">
            <div class="funnel-stages">
              ${funnel.map(s => {
                const maxVal = Math.max(...funnel.map(x => x.count));
                const pct    = Math.round((s.count / maxVal) * 80);
                return `
                  <div class="funnel-stage" style="cursor:default">
                    <div class="funnel-bar-wrapper">
                      <div class="funnel-bar" style="height:${Math.max(pct, 8)}px"></div>
                    </div>
                    <div class="funnel-count">${s.count}</div>
                    <div class="funnel-label">${s.stage}</div>
                  </div>`;
              }).join('')}
            </div>
          </div>
        </div>
      </div>`;
  },

  renderDepartmentView(by_department) {
    const { helpers } = window.MockData;

    return `
      <div class="grid-3">
        ${by_department.map(dept => {
          const color   = { insurance:'var(--dept-insurance)',    mortgage:'var(--dept-mortgage)',    real_estate:'var(--dept-real-estate)'    }[dept.dept] || 'var(--neutral-400)';
          const bgColor = { insurance:'var(--dept-insurance-bg)', mortgage:'var(--dept-mortgage-bg)', real_estate:'var(--dept-real-estate-bg)' }[dept.dept] || 'var(--neutral-100)';
          const txColor = { insurance:'var(--dept-insurance-text)',mortgage:'var(--dept-mortgage-text)',real_estate:'var(--dept-real-estate-text)' }[dept.dept] || 'var(--neutral-600)';
          const route   = { insurance:'insurance',                mortgage:'mortgage',               real_estate:'real-estate'                }[dept.dept];
          const convPct = Math.round(dept.conversion * 100);

          return `
            <div class="card" style="overflow:hidden">
              <!-- Dept Header Band -->
              <div style="padding:var(--space-4) var(--space-5);background:${bgColor};border-bottom:3px solid ${color}">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                  <span class="dept-dot dept-dot-${dept.dept === 'real_estate' ? 'real-estate' : dept.dept}"></span>
                  <span style="font-family:var(--font-heading);font-size:var(--text-lg);font-weight:700;color:${txColor}">
                    ${dept.label}
                  </span>
                </div>
              </div>
              <div style="padding:var(--space-5)">
                <!-- Revenue Hero -->
                <div style="text-align:center;margin-bottom:var(--space-5);padding:var(--space-4);
                            background:var(--neutral-50);border-radius:var(--radius-lg)">
                  <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;
                              color:var(--color-primary-navy)">${helpers.formatCurrency(dept.revenue)}</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400);margin-top:var(--space-1)">Revenue MTD</div>
                </div>
                <!-- Metrics 2×2 Grid -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-4)">
                  ${[
                    ['Leads',      dept.leads,          color                   ],
                    ['Closed',     dept.closed,         'var(--color-success)'  ],
                    ['Conversion', convPct + '%',        color                   ],
                    ['Avg Days',   '38d',               'var(--neutral-500)'    ]
                  ].map(([lbl, val, c]) => `
                    <div style="padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md);text-align:center">
                      <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;color:${c}">${val}</div>
                      <div style="font-size:10px;color:var(--neutral-400);text-transform:uppercase;letter-spacing:.05em">${lbl}</div>
                    </div>`).join('')}
                </div>
                <!-- Drill-Down CTA -->
                <button class="btn btn-secondary btn-sm" style="width:100%;justify-content:center"
                        onclick="Router.navigate('${route}')">
                  Open ${dept.label} Workspace →
                </button>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  },

  renderFunnelView(funnel) {
    const total = funnel[0]?.count || 1;

    return `
      <div class="card" style="margin-bottom:var(--space-5)">
        <div class="card-header">
          <span class="card-title">Lead Conversion Funnel</span>
          <span style="font-size:var(--text-xs);color:var(--neutral-400)">Current period · All departments</span>
        </div>
        <div style="padding:var(--space-6)">
          ${funnel.map((s, i) => {
            const pct     = Math.round((s.count / total) * 100);
            const dropPct = i > 0 ? Math.round(((funnel[i-1].count - s.count) / funnel[i-1].count) * 100) : 0;
            const isLast  = i === funnel.length - 1;
            return `
              <div style="margin-bottom:var(--space-4)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
                  <span style="font-size:var(--text-sm);font-weight:var(--weight-semibold);color:var(--neutral-700)">${s.stage}</span>
                  <div style="display:flex;align-items:center;gap:var(--space-4)">
                    ${i > 0 ? `<span style="font-size:var(--text-xs);color:var(--color-danger)">↓ ${dropPct}% drop-off</span>` : ''}
                    <span style="font-family:var(--font-heading);font-size:var(--text-xl);font-weight:700;color:var(--color-primary-navy)">${s.count}</span>
                    <span style="font-size:var(--text-xs);color:var(--neutral-400);min-width:36px;text-align:right">${pct}%</span>
                  </div>
                </div>
                <div style="height:12px;background:var(--neutral-100);border-radius:var(--radius-full);overflow:hidden">
                  <div style="height:100%;width:${pct}%;background:${isLast ? 'var(--color-success)' : 'var(--color-primary-navy)'};
                              border-radius:var(--radius-full);transition:width .4s ease"></div>
                </div>
              </div>`;
          }).join('')}

          <!-- Summary Totals -->
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-4);
                      margin-top:var(--space-6);padding-top:var(--space-5);border-top:1px solid var(--neutral-200)">
            <div style="text-align:center">
              <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;color:var(--color-primary-navy)">${funnel[0].count}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">Total Leads</div>
            </div>
            <div style="text-align:center">
              <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;color:var(--color-success)">${funnel[funnel.length-1].count}</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">Closed Deals</div>
            </div>
            <div style="text-align:center">
              <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:700;color:var(--color-accent-blue)">
                ${Math.round((funnel[funnel.length-1].count / funnel[0].count) * 100)}%
              </div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">Overall Conversion</div>
            </div>
          </div>
        </div>
      </div>`;
  },

  renderCommunicationsView(kpis) {
    const commData = [
      { label: 'Calls Made',   value: kpis.calls_made,   target: 150, icon: '📞', color: 'var(--color-info)',          route: 'calls'  },
      { label: 'Emails Sent',  value: kpis.emails_sent,  target: 300, icon: '✉️', color: 'var(--color-primary-navy)', route: 'email'  },
      { label: 'SMS Sent',     value: kpis.sms_sent,     target: 250, icon: '💬', color: 'var(--color-success)',       route: 'sms'    }
    ];

    return `
      <!-- Communication KPIs -->
      <div class="grid-3" style="margin-bottom:var(--space-5)">
        ${commData.map(m => {
          const pct = Math.round((m.value / m.target) * 100);
          return `
            <div class="card">
              <div style="padding:var(--space-5)">
                <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--space-4)">
                  <div>
                    <div style="font-size:28px;margin-bottom:var(--space-1)">${m.icon}</div>
                    <div style="font-size:var(--text-xs);color:var(--neutral-500);font-weight:600;text-transform:uppercase;letter-spacing:.05em">${m.label}</div>
                  </div>
                  <div style="text-align:right">
                    <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:${m.color}">${m.value}</div>
                    <div style="font-size:var(--text-xs);color:var(--neutral-400)">of ${m.target} target</div>
                  </div>
                </div>
                <div style="height:8px;background:var(--neutral-100);border-radius:var(--radius-full);overflow:hidden;margin-bottom:var(--space-2)">
                  <div style="height:100%;width:${Math.min(pct,100)}%;background:${m.color};border-radius:var(--radius-full);transition:width .4s"></div>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-xs);color:var(--neutral-400)">
                  <span>${pct}% of target</span>
                  <span>${m.target - m.value} remaining</span>
                </div>
                <button class="btn btn-ghost btn-sm" style="width:100%;justify-content:center;margin-top:var(--space-3)"
                        onclick="Router.navigate('${m.route}')">
                  Open ${m.label.split(' ')[0]} Screen →
                </button>
              </div>
            </div>`;
        }).join('')}
      </div>

      <!-- Weekly Activity Chart -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Communication Activity — Last 7 Days</span>
          <div style="display:flex;gap:var(--space-3)">
            <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);color:var(--neutral-500)">
              <div style="width:12px;height:12px;background:var(--color-info);border-radius:2px"></div> Calls
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);color:var(--neutral-500)">
              <div style="width:12px;height:12px;background:var(--color-primary-navy);border-radius:2px"></div> Emails
            </div>
            <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);color:var(--neutral-500)">
              <div style="width:12px;height:12px;background:var(--color-success);border-radius:2px"></div> SMS
            </div>
          </div>
        </div>
        <div class="card-body">
          ${this.renderBarChart()}
        </div>
      </div>`;
  },

  renderBarChart() {
    const days      = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const callsD    = [18, 24, 19, 31, 22,  8,  6];
    const emailsD   = [32, 45, 38, 52, 41, 12,  9];
    const smsD      = [15, 20, 17, 28, 19,  6,  4];
    const maxVal    = Math.max(...callsD, ...emailsD, ...smsD);
    const barW      = 16;
    const barGap    = 4;
    const groupGap  = 20;
    const groupW    = barW * 3 + barGap * 2;
    const chartH    = 130;
    const leftPad   = 40;
    const totalW    = leftPad + days.length * (groupW + groupGap);

    const gridLines = [0, 25, 50, 75, 100];

    return `
      <div style="overflow-x:auto">
        <svg width="${totalW}" height="${chartH + 50}" xmlns="http://www.w3.org/2000/svg" style="font-family:var(--font-body)">
          <!-- Grid lines -->
          ${gridLines.map(pct => {
            const y = chartH - Math.round((pct / 100) * chartH) + 10;
            const val = Math.round((pct / 100) * maxVal);
            return `
              <line x1="${leftPad}" y1="${y}" x2="${totalW - 10}" y2="${y}" stroke="var(--neutral-200)" stroke-width="1"/>
              <text x="${leftPad - 6}" y="${y + 4}" text-anchor="end" font-size="9" fill="var(--neutral-400)">${val}</text>`;
          }).join('')}

          <!-- Bars -->
          ${days.map((day, i) => {
            const x = leftPad + i * (groupW + groupGap);
            const callH  = Math.max(2, Math.round((callsD[i]  / maxVal) * chartH));
            const emailH = Math.max(2, Math.round((emailsD[i] / maxVal) * chartH));
            const smsH   = Math.max(2, Math.round((smsD[i]    / maxVal) * chartH));
            return `
              <g>
                <rect x="${x}" y="${chartH - callH + 10}" width="${barW}" height="${callH}" fill="var(--color-info)" rx="3" opacity="0.85"/>
                <rect x="${x + barW + barGap}" y="${chartH - emailH + 10}" width="${barW}" height="${emailH}" fill="var(--color-primary-navy)" rx="3" opacity="0.85"/>
                <rect x="${x + (barW + barGap) * 2}" y="${chartH - smsH + 10}" width="${barW}" height="${smsH}" fill="var(--color-success)" rx="3" opacity="0.85"/>
                <text x="${x + groupW / 2}" y="${chartH + 30}" text-anchor="middle" font-size="10" fill="var(--neutral-500)">${day}</text>
              </g>`;
          }).join('')}
        </svg>
      </div>`;
  },

  refreshContent() {
    const el = document.getElementById('reports-content');
    if (el) el.innerHTML = this.renderView();
  },

  init() {}
};