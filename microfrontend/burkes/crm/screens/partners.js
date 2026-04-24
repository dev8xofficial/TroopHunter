/**
 * Burkes Group CRM — Service Partners Directory Screen
 * Implements §2.9 (Portal-Specific Feature: Partner services directory by zip code)
 */

window.Screens = window.Screens || {};

window.Screens.partners = {
  _search: '',
  _category: '',

  render() {
    const { Icons } = window.Components;
    
    // Mock partner data
    const partners = [
      { name: 'TexStar Title Company', category: 'Title & Escrow', phone: '(512) 555-0192', email: 'orders@texstartitle.example.com', zip: '78701', rating: 4.9, bg: 'var(--color-primary-navy)' },
      { name: 'Elite Foundation Inspectors', category: 'Inspection', phone: '(512) 555-0322', email: 'schedule@eliteinspect.example.com', zip: '78704', rating: 4.7, bg: 'var(--color-warning)' },
      { name: 'Peak Pest Control', category: 'Pest Control', phone: '(512) 555-8811', email: 'dispatch@peakpest.example.com', zip: '78701', rating: 4.8, bg: 'var(--color-success)' },
      { name: 'Capitol Area Appraisals', category: 'Appraisal', phone: '(512) 555-9011', email: 'hello@capappraisal.example.com', zip: '78745', rating: 4.6, bg: 'var(--color-info)' },
      { name: 'Signature Escrow Partners', category: 'Title & Escrow', phone: '(512) 555-1100', email: 'docs@sigescrow.example.com', zip: '78745', rating: 4.9, bg: 'var(--color-primary-navy)' },
    ];

    let filtered = partners;
    if (this._category) filtered = filtered.filter(p => p.category === this._category);
    if (this._search) {
      const q = this._search.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.zip.includes(q));
    }

    return `
      <div class="screen-header">
        <div class="screen-title">
          <h1>Service Partner Directory</h1>
          <p>Verified vendor network · Search by ZIP code · Approved for referrals</p>
        </div>
        <div class="screen-actions">
          <button class="btn btn-primary btn-sm" onclick="Components.Toast('Invite Partner modal opened', 'info')">
            ${Icons.plus} Invite Partner
          </button>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="filter-search">
          <span class="filter-search-icon">${Icons.search}</span>
          <input type="text" placeholder="Search by name, ZIP code (e.g. 78701)"
                 value="${this._search}"
                 oninput="Screens.partners._search=this.value;Screens.partners.refresh()">
        </div>
        <select class="filter-select" 
                onchange="Screens.partners._category=this.value;Screens.partners.refresh()">
          <option value="">All Categories</option>
          <option value="Title & Escrow" ${this._category === 'Title & Escrow' ? 'selected' : ''}>Title & Escrow</option>
          <option value="Inspection" ${this._category === 'Inspection' ? 'selected' : ''}>Inspection</option>
          <option value="Appraisal" ${this._category === 'Appraisal' ? 'selected' : ''}>Appraisal</option>
          <option value="Pest Control" ${this._category === 'Pest Control' ? 'selected' : ''}>Pest Control</option>
        </select>
        <button class="filter-clear" onclick="Screens.partners._search='';Screens.partners._category='';Screens.partners.refresh()">Clear Filters</button>
      </div>

      <!-- Provider Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));gap:var(--space-4);margin-top:var(--space-4)">
        ${filtered.length ? filtered.map(p => `
          <div class="card" style="padding:var(--space-4);display:flex;flex-direction:column">
            <div style="display:flex;align-items:flex-start;gap:var(--space-3);margin-bottom:var(--space-3)">
               <div style="width:40px;height:40px;border-radius:var(--radius-md);background:${p.bg};color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0">
                 ${p.name.charAt(0)}
               </div>
               <div>
                 <div style="font-weight:600;color:var(--neutral-800);margin-bottom:2px">${p.name}</div>
                 <div style="display:flex;gap:var(--space-2);align-items:center">
                   <span class="badge badge-gray" style="font-size:10px">${p.category}</span>
                   <span style="font-size:11px;color:var(--neutral-400)">⭐ ${p.rating}</span>
                 </div>
               </div>
            </div>
            
            <div style="margin-top:auto;font-size:var(--text-sm);color:var(--neutral-600);display:flex;flex-direction:column;gap:var(--space-2)">
              <div style="display:flex;align-items:center;gap:var(--space-2)"><span style="opacity:0.6">📍</span> Servicing ZIP: <strong>${p.zip}</strong></div>
              <div style="display:flex;align-items:center;gap:var(--space-2)"><span style="opacity:0.6">📞</span> ${p.phone}</div>
              <div style="display:flex;align-items:center;gap:var(--space-2)"><span style="opacity:0.6">✉️</span> ${p.email}</div>
            </div>

            <div style="margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid var(--neutral-100);display:flex;gap:var(--space-2)">
               <button class="btn btn-secondary btn-sm" style="flex:1" onclick="Components.Toast('Initiating portal referral workflow...', 'info')">Send Referral</button>
               <button class="btn btn-secondary btn-sm" style="padding:0 8px" onclick="Components.Toast('Opening partner dossier', 'info')">${Icons.externalLink}</button>
            </div>
          </div>
        `).join('') : `
          <div style="grid-column:1/-1;text-align:center;padding:var(--space-6);color:var(--neutral-400)">
            No service partners found matching those attributes.
          </div>
        `}
      </div>
    `;
  },

  refresh() {
    const el = document.getElementById('content');
    if (el) el.innerHTML = `<div class="screen-wrapper">${this.render()}</div>`;
  }
};
