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
  const list = outlet.querySelector('[data-client-invoices]');
  const summary = outlet.querySelector('[data-client-summary]');

  if (list && data.invoices?.list) {
    list.innerHTML = data.invoices.list
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
}

function initMessaging(outlet, data) {
  const threads = outlet.querySelector('[data-client-threads]');
  const conversation = outlet.querySelector('[data-client-conversation]');

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

  if (conversation && data.messaging?.conversation) {
    conversation.innerHTML = data.messaging.conversation
      .map(
        (msg) => `
          <div class="note-card">
            <p class="note-card__title">${msg.sender}</p>
            <p class="note-card__copy">${msg.copy}</p>
          </div>
        `
      )
      .join('');
  }
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

  if (agreements && data.contracts?.agreements) {
    agreements.innerHTML = data.contracts.agreements
      .map(
        (a) => `
          <tr>
            <td>${a.name}</td>
            <td>${a.project}</td>
            <td><span class="status-pill status-pill--${a.statusTone}">${a.statusLabel}</span></td>
            <td>${a.date}</td>
          </tr>
        `
      )
      .join('');
  }

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
