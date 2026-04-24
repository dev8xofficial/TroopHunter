/* =============================================================
   DOCUMENTS SCREEN — 002-documents spec
   Role-scoped document repository with signatures, upload,
   category filtering, and audit-visible activity.
   ============================================================= */

const DocumentsScreen = (() => {
  // ── State ─────────────────────────────────────────────────
  let _activeCategory = 'ALL';
  let _activeStatus = 'ALL';
  let _searchQuery = '';

  const CATEGORIES = ['ALL', 'PURCHASE', 'FINANCIAL', 'LEGAL', 'OTHER'];
  const STATUSES = ['ALL', 'NEEDS_SIGNATURE', 'UNDER_REVIEW', 'APPROVED'];

  // Role → visible categories (RBAC from documents RBAC matrix)
  const ROLE_CATEGORY_ACCESS = {
    CL: ['ALL', 'PURCHASE', 'FINANCIAL', 'LEGAL', 'OTHER'],
    AG: ['ALL', 'PURCHASE', 'OTHER'],
    LN: ['ALL', 'FINANCIAL', 'OTHER'],
    AT: ['ALL', 'LEGAL', 'OTHER'],
    CP: ['ALL', 'FINANCIAL', 'LEGAL'],
    TC: ['ALL', 'PURCHASE', 'FINANCIAL', 'LEGAL', 'OTHER'],
  };

  // ── Helpers ───────────────────────────────────────────────
  function _canUpload() {
    return Session.role !== 'CP';
  }
  function _canSign(doc) {
    return Session.role === 'CL' && ['needs-signature', 'NEEDS_SIGNATURE'].includes(doc.status);
  }

  function _fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function _fmtBytes(bytes) {
    if (!bytes) return '';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }

  function _fmtLabel(s) {
    return s.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function _getDocId(d) {
    return d.id || d.document_id;
  }

  function _getFilteredDocs() {
    const role = Session.role;
    let docs = (window.MockData?.documents || []).filter((d) => {
      const vis = d.visible_to;
      return !vis || vis.includes(role);
    });

    if (_activeCategory !== 'ALL') {
      docs = docs.filter((d) => d.category === _activeCategory);
    }
    if (_activeStatus !== 'ALL') {
      docs = docs.filter((d) => {
        const norm = (d.status || '').replace(/-/g, '_').toUpperCase();
        return norm === _activeStatus;
      });
    }
    if (_searchQuery.trim()) {
      const q = _searchQuery.toLowerCase();
      docs = docs.filter((d) => (d.filename || '').toLowerCase().includes(q));
    }
    return docs;
  }

  function _getSignatureCount() {
    return (window.MockData?.getDocumentsForRole?.(Session.role) || window.MockData?.documents || []).filter((d) => ['needs-signature', 'NEEDS_SIGNATURE'].includes(d.status)).length;
  }

  // ── Render ────────────────────────────────────────────────
  function render(outlet) {
    if (!outlet) return;

    const role = Session.role;
    const allowedCats = ROLE_CATEGORY_ACCESS[role] || CATEGORIES;
    const docs = _getFilteredDocs();
    const sigCount = _getSignatureCount();

    outlet.innerHTML = `
      <div class="screen">

        <div class="page-header">
          <div class="page-header-left">
            <h1 class="page-title">Documents</h1>
            <p class="page-subtitle">Secure document repository for your transaction</p>
          </div>
          <div class="page-actions">
            ${
              _canUpload()
                ? `
              <button class="btn btn-primary" id="btn-doc-upload" type="button">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                  <line x1="7" y1="1" x2="7" y2="11"/><polyline points="2,5 7,1 12,5"/>
                  <line x1="1" y1="13" x2="13" y2="13"/>
                </svg>
                Upload Document
              </button>`
                : ''
            }
          </div>
        </div>

        ${
          sigCount > 0 && role === 'CL'
            ? `
          <div class="alert-banner alert-banner-error" role="alert" style="margin-bottom:var(--space-5);border-radius:var(--radius-lg)">
            <svg class="alert-banner-icon" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="9" cy="9" r="8"/><line x1="9" y1="6" x2="9" y2="10"/><circle cx="9" cy="12.5" r=".75" fill="currentColor" stroke="none"/></svg>
            <div class="alert-banner-body">
              <div class="alert-banner-title">Action Required — ${sigCount} document${sigCount > 1 ? 's' : ''} need your signature</div>
              <div class="alert-banner-desc">Review and sign before your closing deadline to keep the transaction on track.</div>
            </div>
          </div>`
            : ''
        }

        <div class="tab-bar" id="doc-cat-tabs">
          ${allowedCats
            .map(
              (c) => `
            <button class="tab-item${_activeCategory === c ? ' active' : ''}" data-cat="${c}" type="button">
              ${c === 'ALL' ? 'All Documents' : _fmtLabel(c)}
              ${c !== 'ALL' ? `<span style="margin-left:4px;font-weight:400;opacity:.6">(${(window.MockData?.documents || []).filter((d) => d.category === c && (!d.visible_to || d.visible_to.includes(role))).length})</span>` : ''}
            </button>`,
            )
            .join('')}
        </div>

        <div class="filter-bar">
          <div class="filter-search">
            <div class="filter-search-icon">
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="6" r="4.5"/><line x1="9.5" y1="9.5" x2="13" y2="13"/></svg>
            </div>
            <input type="search" id="doc-search" placeholder="Search by filename…" value="${_searchQuery}" autocomplete="off"/>
          </div>
          <select class="filter-select" id="doc-status-filter">
            ${STATUSES.map((s) => `<option value="${s}" ${_activeStatus === s ? 'selected' : ''}>${s === 'ALL' ? 'All Statuses' : _fmtLabel(s)}</option>`).join('')}
          </select>
          <div style="margin-left:auto;font-size:var(--text-xs);color:var(--neutral-500);white-space:nowrap">
            ${docs.length} document${docs.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div class="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th style="width:40%">Document</th>
                <th>Category</th>
                <th>Status</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th style="text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody id="doc-tbody">
              ${
                docs.length === 0
                  ? `<tr><td colspan="6"><div class="empty-state" style="padding:var(--space-10)">
                    <div style="font-size:2rem;margin-bottom:var(--space-2)">📄</div>
                    <div class="empty-state-title">No documents found</div>
                    <div class="empty-state-desc">Try adjusting your filters, or upload a document to get started.</div>
                   </div></td></tr>`
                  : docs.map(_renderRow).join('')
              }
            </tbody>
          </table>
        </div>

      </div>`;

    _bindEvents(outlet);
  }

  function _renderRow(d) {
    const id = _getDocId(d);
    const date = _fmtDate(d.created_at || d.date);
    const size = _fmtBytes(d.size_bytes) || (d.size_mb ? d.size_mb + ' MB' : '');
    const canSign = Session.role === 'CL' && ['needs-signature', 'NEEDS_SIGNATURE'].includes(d.status);
    const uploader = d.uploaded_by_role || d.uploader || '—';

    return `
      <tr class="doc-row" data-doc-id="${id}" style="cursor:pointer">
        <td>
          <div class="td-filename">
            <div class="td-filename-icon">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6L9 1z"/>
                <polyline points="9,1 9,6 14,6"/>
              </svg>
            </div>
            <div style="min-width:0">
              <div class="td-filename-name" title="${d.filename}">${d.filename}</div>
              ${size ? `<div style="font-size:var(--text-xs);color:var(--neutral-400)">${size}</div>` : ''}
            </div>
          </div>
        </td>
        <td>${Badge.category(d.category)}</td>
        <td>${Badge.status(d.status)}</td>
        <td>${Badge.role(uploader)}</td>
        <td style="font-size:var(--text-xs);color:var(--neutral-500);white-space:nowrap">${date}</td>
        <td>
          <div class="td-actions" style="justify-content:flex-end" onclick="event.stopPropagation()">
            ${canSign ? `<button class="btn btn-sm btn-primary" data-sign-id="${id}" type="button">✍️ Sign</button>` : ''}
            <button class="btn btn-sm btn-secondary" data-preview-id="${id}" type="button">Preview</button>
            <button class="btn btn-sm btn-ghost" data-download-id="${id}" title="Download" type="button">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><line x1="6.5" y1="1" x2="6.5" y2="9"/><polyline points="2,5.5 6.5,10 11,5.5"/><line x1="1" y1="12" x2="12" y2="12"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  }

  // ── Drawer ────────────────────────────────────────────────
  function _openPreview(docId) {
    const all = window.MockData?.documents || [];
    const d = all.find((x) => _getDocId(x) === docId);
    if (!d) return;

    const date = _fmtDate(d.created_at || d.date);
    const size = _fmtBytes(d.size_bytes) || (d.size_mb ? d.size_mb + ' MB' : '—');
    const canSign = _canSign(d);

    Drawer.open({
      title: d.filename,
      body: `
        <div style="display:flex;flex-direction:column;gap:var(--space-5)">

          <div style="background:var(--neutral-100);border-radius:var(--radius-lg);aspect-ratio:3/4;max-height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--space-3);border:var(--border-light)">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" stroke="var(--neutral-300)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M30 5H12a2 2 0 0 0-2 2v38a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V18L30 5z"/><polyline points="30,5 30,18 42,18"/><line x1="16" y1="28" x2="36" y2="28"/><line x1="16" y1="35" x2="28" y2="35"/></svg>
            <div style="font-size:var(--text-sm);color:var(--neutral-400);font-weight:500">Document Preview</div>
            <div style="font-size:var(--text-xs);color:var(--neutral-300);text-align:center;padding:0 var(--space-4)">${d.filename}</div>
          </div>

          <div class="card">
            <div class="card-bd" style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
              ${_meta('Category', Badge.category(d.category))}
              ${_meta('Status', Badge.status(d.status))}
              ${_meta('Uploaded By', Badge.role(d.uploaded_by_role || d.uploader))}
              ${_meta('File Size', `<span style="font-size:var(--text-sm);color:var(--neutral-700)">${size}</span>`)}
              ${_meta('Date', `<span style="font-size:var(--text-sm);color:var(--neutral-700)">${date}</span>`)}
            </div>
          </div>

          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${canSign ? `<button class="btn btn-primary" style="width:100%;justify-content:center" id="drawer-sign-btn" data-doc-id="${docId}" type="button">✍️ Sign Document</button>` : ''}
            <button class="btn btn-secondary" style="width:100%;justify-content:center" id="drawer-dl-btn" type="button">
              ⬇️ Download ${d.filename}
            </button>
          </div>

        </div>`,
    });

    setTimeout(() => {
      document.getElementById('drawer-sign-btn')?.addEventListener('click', () => _confirmSign(docId));
      document.getElementById('drawer-dl-btn')?.addEventListener('click', () => Toast.info('Download started…'));
    }, 80);
  }

  function _meta(label, valueHtml) {
    return `<div>
      <div style="font-size:var(--text-xs);color:var(--neutral-500);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px">${label}</div>
      ${valueHtml}
    </div>`;
  }

  // ── Sign flow ─────────────────────────────────────────────
  function _confirmSign(docId) {
    const all = window.MockData?.documents || [];
    const d = all.find((x) => _getDocId(x) === docId);
    const nm = d?.filename || 'this document';

    Modal.confirm({
      title: 'Confirm Signature',
      message: `By signing <strong>${nm}</strong>, you confirm you have read and agree to its contents. This action is permanent and creates an audit trail.`,
      confirmLabel: 'Sign Document',
      cancelLabel: 'Cancel',
      variant: 'primary',
      onConfirm: () => {
        if (d) {
          d.status = 'APPROVED';
          d['status'] = 'approved';
        }
        Drawer.close();
        Toast.success('Document signed — confirmation recorded.');
        const outlet = document.getElementById('screen-outlet');
        if (outlet) render(outlet);
      },
    });
  }

  // ── Upload modal ──────────────────────────────────────────
  function _showUploadModal() {
    const allowedCats = (ROLE_CATEGORY_ACCESS[Session.role] || CATEGORIES).filter((c) => c !== 'ALL');

    Modal.open({
      title: 'Upload Document',
      body: `
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label" for="ul-cat">Document Category</label>
            <select class="form-select" id="ul-cat">
              ${allowedCats.map((c) => `<option value="${c}">${_fmtLabel(c)}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">File</label>
            <div class="upload-zone" id="ul-zone" role="button" tabindex="0" aria-label="Upload area — click to browse">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="var(--neutral-400)" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
                <line x1="16" y1="4" x2="16" y2="22"/><polyline points="8,12 16,4 24,12"/>
                <path d="M4 26h24"/>
              </svg>
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--neutral-600)" id="ul-label">Click or drag file here</div>
              <div style="font-size:var(--text-xs);color:var(--neutral-400)">PDF, Word, JPEG, PNG — max 25 MB</div>
              <input type="file" id="ul-input" accept=".pdf,.docx,.jpg,.jpeg,.png" style="display:none" aria-hidden="true"/>
            </div>
          </div>
        </div>`,
      actions: [
        { label: 'Cancel', variant: 'secondary' },
        { label: 'Upload', variant: 'primary', closeOnClick: true, onClick: () => Toast.success('Document uploaded successfully!') },
      ],
    });

    setTimeout(() => {
      const zone = document.getElementById('ul-zone');
      const input = document.getElementById('ul-input');
      const label = document.getElementById('ul-label');
      if (!zone || !input) return;
      zone.addEventListener('click', () => input.click());
      zone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') input.click();
      });
      input.addEventListener('change', () => {
        if (input.files[0]) {
          label.textContent = input.files[0].name;
          zone.style.borderColor = 'var(--color-accent-blue)';
        }
      });
    }, 60);
  }

  // ── Event binding ─────────────────────────────────────────
  function _bindEvents(outlet) {
    // Category tabs
    outlet.querySelectorAll('[data-cat]').forEach((btn) =>
      btn.addEventListener('click', () => {
        _activeCategory = btn.dataset.cat;
        render(outlet);
      }),
    );

    // Status filter
    outlet.querySelector('#doc-status-filter')?.addEventListener('change', (e) => {
      _activeStatus = e.target.value;
      render(outlet);
    });

    // Search
    outlet.querySelector('#doc-search')?.addEventListener('input', (e) => {
      _searchQuery = e.target.value;
      render(outlet);
    });

    // Row click → preview
    outlet.querySelectorAll('.doc-row').forEach((row) => row.addEventListener('click', () => _openPreview(row.dataset.docId)));

    // Preview buttons
    outlet.querySelectorAll('[data-preview-id]').forEach((btn) => btn.addEventListener('click', () => _openPreview(btn.dataset.previewId)));

    // Sign buttons
    outlet.querySelectorAll('[data-sign-id]').forEach((btn) => btn.addEventListener('click', () => _confirmSign(btn.dataset.signId)));

    // Download buttons
    outlet.querySelectorAll('[data-download-id]').forEach((btn) => btn.addEventListener('click', () => Toast.info('Download started…')));

    // Upload button
    outlet.querySelector('#btn-doc-upload')?.addEventListener('click', _showUploadModal);
  }

  return { render };
})();

window.DocumentsScreen = DocumentsScreen;
