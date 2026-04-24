/**
 * Burkes Group CRM — HR Module Screen
 * Implements §2.9 G-13 (Human Resources internal routing module)
 */

window.Screens = window.Screens || {};

window.Screens.hr = {
  render() {
    const { Icons, StatCard } = window.Components;

    return `
      <div class="screen-header">
        <div class="screen-title">
          <h1>Human Resources</h1>
          <p>Internal personnel directory · Onboarding logic · Payroll stubs access</p>
        </div>
        <div class="screen-actions">
           <button class="btn btn-primary btn-sm" onclick="Components.Toast('Initiating onboarding workflow...', 'info')">
             ${Icons.plus} Onboard Employee
           </button>
        </div>
      </div>

      <!-- KPI Row -->
      <div class="stat-cards-grid" style="grid-template-columns:repeat(3,1fr);margin-bottom:var(--space-5)">
        ${StatCard({ label:'Total Employees', value: 24, accent:'navy', icon: Icons.users })}
        ${StatCard({ label:'Pending Outbound Offers', value: 2, accent:'gold', icon: Icons.mail })}
        ${StatCard({ label:'Next Payroll Run', value: 'April 30', accent:'green', icon: Icons.bank })}
      </div>

      <!-- Placeholder Views -->
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:var(--space-5)">
        
        <div class="card">
          <div class="card-header">
            <span class="card-title">Employee Directory</span>
            <span style="font-size:var(--text-xs);color:var(--neutral-400)">Searchable Staff List</span>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr><th>Employee</th><th>Department</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                <tr>
                   <td>
                     <div style="display:flex;align-items:center;gap:var(--space-3)">
                        <div style="width:32px;height:32px;border-radius:50%;background:var(--color-primary-gold);color:var(--color-primary-navy);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">AB</div>
                        <div>
                          <div style="font-weight:600;color:var(--neutral-800)">Abdul Burkes</div>
                          <div style="font-size:11px;color:var(--neutral-400)">Managing Director</div>
                        </div>
                     </div>
                   </td>
                   <td><span class="badge badge-gray">Platform Admin</span></td>
                   <td><span class="badge badge-green">Active</span></td>
                   <td><button class="btn btn-ghost btn-sm" style="padding:4px" onclick="Components.Toast('Loading HR File', 'info')">${Icons.externalLink}</button></td>
                </tr>
                <tr>
                   <td>
                     <div style="display:flex;align-items:center;gap:var(--space-3)">
                        <div style="width:32px;height:32px;border-radius:50%;background:var(--color-primary-navy);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px">SM</div>
                        <div>
                          <div style="font-weight:600;color:var(--neutral-800)">Sarah Mitchell</div>
                          <div style="font-size:11px;color:var(--neutral-400)">Senior Loan Officer</div>
                        </div>
                     </div>
                   </td>
                   <td><span class="badge badge-blue">Mortgage</span></td>
                   <td><span class="badge badge-green">Active</span></td>
                   <td><button class="btn btn-ghost btn-sm" style="padding:4px" onclick="Components.Toast('Loading HR File', 'info')">${Icons.externalLink}</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style="padding:var(--space-3);text-align:center;border-top:1px solid var(--neutral-100)">
            <button class="btn btn-ghost btn-sm">View All 24 Employees</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:var(--space-5)">
           <div class="card">
             <div class="card-header">
               <span class="card-title">My Payroll / W2</span>
             </div>
             <div style="padding:var(--space-5);text-align:center;color:var(--neutral-500)">
                <div style="font-size:32px;margin-bottom:var(--space-2)">💵</div>
                <div style="font-size:var(--text-sm);margin-bottom:var(--space-3)">Access your most recent pay stubs and tax documents via the Gusto integration.</div>
                <button class="btn btn-secondary" style="width:100%" onclick="Components.Toast('Redirecting to Gusto SSO portal...','success')">Access Payroll Portal</button>
             </div>
           </div>

           <div class="card">
             <div class="card-header">
               <span class="card-title">Open Req Tickers</span>
             </div>
             <div style="padding:var(--space-4)">
               <div style="display:flex;justify-content:space-between;border-bottom:1px solid var(--neutral-100);padding-bottom:var(--space-2);margin-bottom:var(--space-2)">
                  <span style="font-size:var(--text-sm);font-weight:600;color:var(--neutral-800)">Real Estate Agent (Buyer specialized)</span>
                  <span class="badge badge-gold">Sourcing</span>
               </div>
               <div style="display:flex;justify-content:space-between">
                  <span style="font-size:var(--text-sm);font-weight:600;color:var(--neutral-800)">Processor (Insurance)</span>
                  <span class="badge badge-blue">Interviewing</span>
               </div>
             </div>
           </div>
        </div>
      </div>
    `;
  }
};
