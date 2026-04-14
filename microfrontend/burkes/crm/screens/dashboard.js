/**
 * Burkes Group CRM — Dashboard Screen
 * Source: .specify/specs/001-dashboard/spec.md, screens/dashboard.yaml
 * Batch: 2 of 7 — Dashboard + Contacts (Phase 2)
 * Status: COMPLETE
 */

window.Screens = window.Screens || {};

window.Screens.dashboard = {
  render() {
    const { helpers, dashboardSummary, activities, calendarEvents, connectors, users } = window.MockData;
    const { StatCard, Icons, ActivityItem, DeptBadge } = window.Components;
    const { kpi, pipeline_funnel, integrations_status, tasks_today } = dashboardSummary;

    // Today's upcoming events
    const today = new Date();
    const todayEvents = calendarEvents
      .filter(e => {
        const d = new Date(e.starts_at);
        return d.getDate() === today.getDate() &&
               d.getMonth() === today.getMonth() &&
               d >= today;
      })
      .sort((a,b) => new Date(a.starts_at) - new Date(b.starts_at))
      .slice(0, 5);

    const recentActivities = [...activities]
      .sort((a,b) => new Date(b.occurred_at) - new Date(a.occurred_at))
      .slice(0, 8);

    return `
      <!-- Dashboard Header -->
      <div class="screen-header">
        <div class="screen-title">
          <h1>Dashboard</h1>
          <p>Tuesday, ${today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Jaquarian Bonilla</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-secondary btn-sm">
            ${Icons.refresh} Refresh
          </button>
          <button class="btn btn-primary btn-sm" onclick="Router.quickAction('new-lead')">
            ${Icons.plus} New Lead
          </button>
        </div>
      </div>

      <!-- KPI Cards Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr)">
        ${StatCard({ label: 'Active Leads', value: kpi.active_leads, delta: 12, accent: 'navy',
          icon: Icons.activity })}
        ${StatCard({ label: 'Calls Today', value: kpi.calls_today, delta: -3, accent: 'blue',
          icon: Icons.phone })}
        ${StatCard({ label: 'SMS Sent', value: kpi.sms_sent_today, delta: 8, accent: 'green',
          icon: Icons.message })}
        ${StatCard({ label: 'Emails Today', value: kpi.emails_today, delta: 5, accent: 'purple',
          icon: Icons.mail })}
      </div>
      <div class="stat-cards-grid" style="grid-template-columns:repeat(4,1fr)">
        ${StatCard({ label: 'Policies Quoted', value: kpi.policies_quoted, delta: 22, accent: 'gold',
          icon: Icons.shield })}
        ${StatCard({ label: 'Mortgages Active', value: kpi.mortgages_in_process, delta: 0, accent: 'blue',
          icon: Icons.bank })}
        ${StatCard({ label: 'Transactions Active', value: kpi.transactions_active, delta: 11, accent: 'green',
          icon: Icons.home })}
        ${StatCard({ label: 'Revenue MTD', value: helpers.formatCurrency(kpi.revenue_mtd), delta: 18, accent: 'gold',
          icon: Icons.chart })}
      </div>

      <!-- Main Grid: Pipeline Funnel + Activity Feed -->
      <div class="grid-2" style="margin-bottom:var(--space-5)">

        <!-- Pipeline Funnel Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Pipeline Funnel</span>
            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('pipeline')">
              View Pipeline ${Icons.externalLink}
            </button>
          </div>
          <div class="card-body">
            <div class="funnel-stages">
              ${pipeline_funnel.map((s, i) => {
                const maxVal = Math.max(...pipeline_funnel.map(x => x.count));
                const pct = Math.round((s.count / maxVal) * 80);
                return `
                  <div class="funnel-stage" onclick="Router.navigate('pipeline')">
                    <div class="funnel-bar-wrapper">
                      <div class="funnel-bar" style="height:${Math.max(pct, 10)}px"></div>
                    </div>
                    <div class="funnel-count">${s.count}</div>
                    <div class="funnel-label">${s.stage}</div>
                  </div>`;
              }).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid var(--neutral-100)">
              <div style="display:flex;gap:var(--space-4)">
                <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs)">
                  <span class="dept-dot dept-dot-insurance"></span> Insurance: 23
                </div>
                <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs)">
                  <span class="dept-dot dept-dot-mortgage"></span> Mortgage: 14
                </div>
                <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs)">
                  <span class="dept-dot dept-dot-real-estate"></span> Real Estate: 10
                </div>
              </div>
              <span style="font-size:var(--text-xs);color:var(--neutral-400)">Conversion: 25.5%</span>
            </div>
          </div>
        </div>

        <!-- Activity Feed Card -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Activity Feed</span>
            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('activities')">
              All Activity ${Icons.externalLink}
            </button>
          </div>
          <div class="card-body" style="padding:0">
            <div class="activity-feed" style="padding:var(--space-2) var(--space-4)">
              ${recentActivities.map(a => ActivityItem({
                icon: a.icon,
                iconClass: a.iconClass,
                title: `<strong>${a.contact_name}</strong> — ${a.label}${a.notes ? ': ' + a.notes : ''}`,
                actor: a.actor_name,
                time: a.occurred_at,
                dept: a.department
              })).join('')}
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Grid: Schedule + Tasks + Calls + Integrations -->
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-4)">

        <!-- Today's Schedule -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Today's Schedule</span>
            <button class="btn btn-ghost btn-sm" onclick="Router.navigate('calendar')">
              ${Icons.calendar} Calendar
            </button>
          </div>
          <div class="card-body" style="padding:0">
            ${todayEvents.length ? todayEvents.map(ev => `
              <div style="display:flex;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-bottom:1px solid var(--neutral-100);cursor:pointer" onclick="Router.navigate('calendar')">
                <div style="flex-shrink:0;text-align:center;min-width:44px">
                  <div style="font-size:var(--text-xs);font-weight:var(--weight-bold);color:var(--color-primary-navy)">${new Date(ev.starts_at).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}</div>
                  <div style="font-size:10px;color:var(--neutral-400)">${ev.provider === 'outlook' ? '📧' : '📅'}</div>
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-sm);font-weight:var(--weight-medium);color:var(--neutral-800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ev.title}</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400)">${ev.contact_name || 'No linked contact'}</div>
                </div>
                <span class="badge badge-${ev.status === 'scheduled' ? 'blue' : 'gold'}">${ev.status}</span>
              </div>`).join('')
            : `<div style="padding:var(--space-7);text-align:center;color:var(--neutral-400);font-size:var(--text-sm)">
                <div style="font-size:28px;margin-bottom:var(--space-2)">📅</div>
                <div>Nothing scheduled for today</div>
              </div>`}
          </div>
        </div>

        <!-- Today's Tasks -->
        <div class="card">
          <div class="card-header">
            <span class="card-title">Today's Tasks</span>
            <button class="btn btn-gold btn-sm" onclick="Router.quickAction('new-lead')">
              ${Icons.plus} Task
            </button>
          </div>
          <div class="card-body" style="padding:0">
            ${tasks_today.map(t => `
              <div style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-bottom:1px solid var(--neutral-100);cursor:pointer">
                <div onclick="event.stopPropagation()" style="margin-top:2px;flex-shrink:0">
                  <div style="width:16px;height:16px;border-radius:50%;border:2px solid ${t.done ? 'var(--color-success)' : 'var(--neutral-300)'};background:${t.done ? 'var(--color-success)' : 'white'};display:flex;align-items:center;justify-content:center;cursor:pointer">
                    ${t.done ? `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                  </div>
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:var(--text-sm);${t.done ? 'text-decoration:line-through;color:var(--neutral-400)' : 'color:var(--neutral-800)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${t.title}</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400)">${t.due}</div>
                </div>
                <span class="badge badge-${t.priority === 'high' ? 'red' : t.priority === 'medium' ? 'gold' : 'gray'}" style="font-size:10px">${t.priority}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Calls & Compliance + Integrations -->
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">

          <!-- Calls & Compliance Panel -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">Calls & Compliance</span>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('calls')">
                ${Icons.phone} View
              </button>
            </div>
            <div class="card-body" style="padding:var(--space-4)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-3)">
                <div style="text-align:center;padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
                  <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:var(--weight-bold);color:var(--color-primary-navy)">${kpi.calls_today}</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400)">Calls Today</div>
                </div>
                <div style="text-align:center;padding:var(--space-3);background:var(--neutral-50);border-radius:var(--radius-md)">
                  <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:var(--weight-bold);color:var(--color-success)">97%</div>
                  <div style="font-size:var(--text-xs);color:var(--neutral-400)">Record Rate</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;gap:var(--space-2)">
                <div style="display:flex;justify-content:space-between;font-size:var(--text-xs)">
                  <span style="color:var(--neutral-500)">Insurance retention</span>
                  <span style="font-weight:var(--weight-semibold)">18 months</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-xs)">
                  <span style="color:var(--neutral-500)">Mortgage retention</span>
                  <span style="font-weight:var(--weight-semibold)">24 months</span>
                </div>
                <div style="display:flex;justify-content:space-between;font-size:var(--text-xs)">
                  <span style="color:var(--neutral-500)">Real estate retention</span>
                  <span style="font-weight:var(--weight-semibold)">4 years</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Integrations Status -->
          <div class="card" style="flex:1">
            <div class="card-header">
              <span class="card-title">Integrations</span>
              <button class="btn btn-ghost btn-sm" onclick="Router.navigate('integrations')">
                All ${Icons.externalLink}
              </button>
            </div>
            <div class="card-body" style="padding:var(--space-3)">
              ${connectors.map(c => `
                <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-2) var(--space-2);border-radius:var(--radius-md);transition:background 0.1s;cursor:pointer" onmouseover="this.style.background='var(--neutral-50)'" onmouseout="this.style.background=''" onclick="Router.navigate('integrations')">
                  <span style="font-size:18px;flex-shrink:0">${c.icon}</span>
                  <div style="flex:1;min-width:0">
                    <div style="font-size:var(--text-xs);font-weight:var(--weight-semibold);color:var(--neutral-700);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${c.provider}</div>
                    ${c.last_synced_at ? `<div style="font-size:10px;color:var(--neutral-400)">${window.MockData.helpers.formatRelative(c.last_synced_at)}</div>` : '<div style="font-size:10px;color:var(--neutral-300)">Not connected</div>'}
                  </div>
                  <span class="badge badge-dot ${window.MockData.helpers.statusBadgeClass(c.status)}" style="font-size:10px">${c.status}</span>
                </div>`).join('')}
            </div>
          </div>

        </div>

      </div>`;
  },

  init() {
    // No additional initialization needed for dashboard
  }
};