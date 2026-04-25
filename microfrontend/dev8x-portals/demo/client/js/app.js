import bootstrapSurface from '../../shared/js/surface-app.js';

const DATASET_KEY = 'data/mock-client-data.json';

function getClientData(datasets) {
  return datasets?.[DATASET_KEY] || {};
}

function initDashboard(outlet, data) {
  const metrics = outlet.querySelector('[data-client-metrics]');
  const projects = outlet.querySelector('[data-client-projects]');

  if (metrics && data.dashboard?.metrics) {
    metrics.innerHTML = data.dashboard.metrics
      .map(
        (card) => `
          <article class="metric-card ${card.highlight ? 'client-highlight' : ''}">
            <div class="metric-card__label">${card.label}</div>
            <div class="metric-card__value">${card.value}</div>
            <div class="metric-card__meta">${card.meta}</div>
          </article>
        `
      )
      .join('');
  }

  if (projects && data.dashboard?.projects) {
    projects.innerHTML = data.dashboard.projects
      .map(
        (item) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${item.title}</p>
              <p class="list-item__meta">${item.meta}</p>
            </div>
            <span class="status-pill status-pill--${item.status}">${item.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }
}

function initProjects(outlet, data) {
  const active = outlet.querySelector('[data-client-active-projects]');
  const cues = outlet.querySelector('[data-client-cues]');
  const chart = outlet.querySelector('[data-client-progress-chart]');

  if (active && data.projects?.active) {
    active.innerHTML = data.projects.active
      .map(
        (item) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${item.title}</p>
              <p class="list-item__meta">${item.meta}</p>
            </div>
            <span class="status-pill status-pill--${item.status}">${item.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (chart && data.projects?.active) {
    chart.innerHTML = data.projects.active
      .map((item) => {
        const pct = parseInt((item.meta.match(/(\d+)%/) || [])[1] || '50', 10);
        return `
          <div style="margin-bottom:.75rem">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem">
              <span style="font-size:.875rem;font-weight:500">${item.title}</span>
              <span class="tag">${pct}%</span>
            </div>
            <div class="progress">
              <div class="progress__bar" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  if (cues && data.projects?.cues) {
    cues.innerHTML = data.projects.cues
      .map(
        (cue) => `
          <div class="note-card">
            <p class="note-card__title">${cue.title}</p>
            <p class="note-card__copy">${cue.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initInvoices(outlet, data) {
  const filters = outlet.querySelector('[data-client-invoice-filters]');
  const list = outlet.querySelector('[data-client-invoices]');
  const summary = outlet.querySelector('[data-client-summary]');
  const allInvoices = data.invoices?.list || [];
  let activeFilter = 'all';

  const renderInvoices = () => {
    const visible = activeFilter === 'all'
      ? allInvoices
      : allInvoices.filter((inv) => inv.statusLabel === activeFilter);
    if (list) {
      list.innerHTML = visible
        .map(
          (inv) => `
            <tr>
              <td>${inv.id}</td>
              <td>${inv.project}</td>
              <td>${inv.amount}</td>
              <td><span class="status-pill status-pill--${inv.statusTone}">${inv.statusLabel}</span></td>
              <td>${inv.date}</td>
            </tr>
          `
        )
        .join('');
    }
  };

  if (filters) {
    const buttons = Array.from(filters.querySelectorAll('[data-filter-status]'));
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filterStatus;
        buttons.forEach((b) => { b.dataset.selected = String(b === btn); });
        renderInvoices();
      });
    });
  }

  renderInvoices();

  if (summary && data.invoices?.summary) {
    summary.innerHTML = data.invoices.summary
      .map(
        (item) => `
          <div class="note-card">
            <p class="note-card__title">${item.title}</p>
            <p class="note-card__copy">${item.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initFiles(outlet, data) {
  const uploads = outlet.querySelector('[data-client-uploads]');
  const guidance = outlet.querySelector('[data-client-guidance]');

  if (uploads && data.files?.uploads) {
    uploads.innerHTML = data.files.uploads
      .map(
        (file) => `
          <tr>
            <td>${file.name}</td>
            <td>${file.category}</td>
            <td>${file.version}</td>
            <td>${file.date}</td>
          </tr>
        `
      )
      .join('');
  }

  if (guidance && data.files?.guidance) {
    guidance.innerHTML = data.files.guidance
      .map(
        (item) => `
          <div class="note-card">
            <p class="note-card__title">${item.title}</p>
            <p class="note-card__copy">${item.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initWorkingHours(outlet, data) {
  const metrics = outlet.querySelector('[data-client-wh-metrics]');
  const logs = outlet.querySelector('[data-client-wh-logs]');
  const budget = outlet.querySelector('[data-client-wh-budget]');
  const chart = outlet.querySelector('[data-client-wh-chart]');

  if (metrics && data.workingHours?.metrics) {
    metrics.innerHTML = data.workingHours.metrics
      .map(
        (m) => `
          <article class="metric-card">
            <div class="metric-card__label">${m.label}</div>
            <div class="metric-card__value">${m.value}</div>
            <div class="metric-card__meta">${m.meta}</div>
          </article>
        `
      )
      .join('');
  }

  if (logs && data.workingHours?.logs) {
    logs.innerHTML = data.workingHours.logs
      .map(
        (log) => `
          <tr>
            <td>${log.member}</td>
            <td>${log.project}</td>
            <td>${log.hours}</td>
            <td>${log.focus}</td>
          </tr>
        `
      )
      .join('');
  }

  if (budget && data.workingHours?.budget) {
    const b = data.workingHours.budget;
    budget.innerHTML = `
      <div>
        <div class="auth-inline auth-inline--between"><strong>Used</strong><span>${b.used}</span></div>
        <div class="progress"><div class="progress__bar" style="width:${b.percent}"></div></div>
      </div>
      <p class="panel__copy">${b.copy}</p>
    `;
  }

  if (chart && data.workingHours?.logs) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const members = data.workingHours.logs;
    const maxHours = Math.max(...members.map((m) => Number(m.hours) || 0), 1);
    chart.innerHTML = members
      .map((member) => {
        const hrs = Number(member.hours) || 0;
        const pct = Math.round((hrs / maxHours) * 100);
        return `
          <div style="margin-bottom:.75rem">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem">
              <span style="font-size:.875rem;font-weight:500">${member.member}</span>
              <span class="tag">${hrs}h · ${member.project}</span>
            </div>
            <div class="progress">
              <div class="progress__bar" style="width:${pct}%"></div>
            </div>
          </div>
        `;
      })
      .join('');
  }
}

function initMessaging(outlet, data) {
  const threads = outlet.querySelector('[data-client-threads]');
  const conversation = outlet.querySelector('[data-client-conversation]');
  const sendBtn = outlet.querySelector('[data-client-compose-send]');
  const composeInput = outlet.querySelector('#client-compose-input');
  const messages = data.messaging?.conversation ? [...data.messaging.conversation] : [];

  const renderConversation = () => {
    if (!conversation) return;
    conversation.innerHTML = messages
      .map(
        (msg) => `
          <div class="note-card">
            <p class="note-card__title">${msg.sender}</p>
            <p class="note-card__copy">${msg.copy}</p>
          </div>
        `
      )
      .join('');
  };

  if (threads && data.messaging?.threads) {
    threads.innerHTML = data.messaging.threads
      .map(
        (thread) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${thread.title}</p>
              <p class="list-item__meta">${thread.meta}</p>
            </div>
            <span class="status-pill status-pill--${thread.status}">${thread.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (sendBtn && composeInput) {
    sendBtn.addEventListener('click', () => {
      const text = composeInput.value.trim();
      if (!text) return;
      messages.push({ sender: 'You · Just now', copy: text });
      renderConversation();
      composeInput.value = '';
    });
  }

  renderConversation();
}

function initSupport(outlet, data) {
  const tickets = outlet.querySelector('[data-client-tickets]');

  if (tickets && data.support?.tickets) {
    tickets.innerHTML = data.support.tickets
      .map(
        (t) => `
          <tr>
            <td>${t.id}</td>
            <td>${t.subject}</td>
            <td>${t.priority}</td>
            <td><span class="status-pill status-pill--${t.statusTone}">${t.statusLabel}</span></td>
            <td>${t.owner}</td>
          </tr>
        `
      )
      .join('');
  }
}

function initContracts(outlet, data) {
  const agreements = outlet.querySelector('[data-client-agreements]');
  const notes = outlet.querySelector('[data-client-notes]');

  const contractData = data.contracts?.agreements ? [...data.contracts.agreements] : [];

  const renderAgreements = () => {
    if (!agreements) return;
    agreements.innerHTML = contractData
      .map(
        (a, i) => {
          const isPending = a.statusLabel === 'Pending signature';
          const actionCell = isPending
            ? `<button class="btn btn-primary" type="button" style="font-size:.75rem;padding:.25rem .75rem" data-contract-sign="${i}">Sign now</button>`
            : `<span style="color:var(--color-text-subtle);font-size:.85rem">${a.statusLabel === 'Signed' ? '✓ Signed' : 'View'}</span>`;
          return `
            <tr>
              <td>${a.name}</td>
              <td>${a.project}</td>
              <td><span class="status-pill status-pill--${a.statusTone}">${a.statusLabel}</span></td>
              <td>${a.date}</td>
              <td>${actionCell}</td>
            </tr>
          `;
        }
      )
      .join('');

    agreements.querySelectorAll('[data-contract-sign]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.contractSign);
        contractData[idx] = { ...contractData[idx], statusTone: 'success', statusLabel: 'Signed' };
        renderAgreements();
      });
    });
  };

  renderAgreements();

  if (notes && data.contracts?.notes) {
    notes.innerHTML = data.contracts.notes
      .map(
        (note) => `
          <div class="note-card">
            <p class="note-card__title">${note.title}</p>
            <p class="note-card__copy">${note.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initClientRoute({ outlet, route, datasets }) {
  const data = getClientData(datasets);

  switch (route.id) {
    case 'dashboard':
      initDashboard(outlet, data);
      break;
    case 'projects':
      initProjects(outlet, data);
      break;
    case 'invoices':
      initInvoices(outlet, data);
      break;
    case 'files':
      initFiles(outlet, data);
      break;
    case 'working-hours':
      initWorkingHours(outlet, data);
      break;
    case 'messaging':
      initMessaging(outlet, data);
      break;
    case 'support':
      initSupport(outlet, data);
      break;
    case 'contracts':
      initContracts(outlet, data);
      break;
    case 'milestones':
      break;
    case 'payment-methods':
      break;
    case 'team':
      break;
    case 'notifications':
      break;
    case 'settings':
      break;
    default:
      break;
  }
}

bootstrapSurface({ onRouteInit: initClientRoute }).catch((error) => {
  const root = document.getElementById('d8x-shell');
  if (root) {
    root.innerHTML = `
      <div class="empty-state" style="margin:2rem">
        <h1 class="empty-state__title">Client surface failed to load</h1>
        <p class="empty-state__desc">${error.message}</p>
      </div>
    `;
  }
});
