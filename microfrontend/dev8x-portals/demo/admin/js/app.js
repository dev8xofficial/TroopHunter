import bootstrapSurface from '../../shared/js/surface-app.js';

const DATASET_KEY = 'data/mock-admin-data.json';

function getAdminData(datasets) {
  return datasets?.[DATASET_KEY] || {};
}

function initDashboard(outlet, data) {
  const metrics = outlet.querySelector('[data-admin-metrics]');
  const funnel = outlet.querySelector('[data-admin-funnel]');
  const highlights = outlet.querySelector('[data-admin-highlights]');
  const movement = outlet.querySelector('[data-admin-movement]');
  const reminders = outlet.querySelector('[data-admin-reminders]');

  if (metrics && data.dashboard?.metrics) {
    metrics.innerHTML = data.dashboard.metrics
      .map(
        (card) => `
          <article class="metric-card">
            <div class="metric-card__label">${card.label}</div>
            <div class="metric-card__value">${card.value}</div>
            <div class="metric-card__${card.trend ? 'trend is-' + card.trend : 'meta'}">${card.meta}</div>
          </article>
        `
      )
      .join('');
  }

  if (funnel && data.dashboard?.funnel) {
    funnel.innerHTML = data.dashboard.funnel
      .map(
        (item) => `
          <div>
            <div class="auth-inline auth-inline--between"><strong>${item.stage}</strong><span>${item.count}</span></div>
            <div class="progress"><div class="progress__bar" style="width:${item.percent}%"></div></div>
          </div>
        `
      )
      .join('');
  }

  if (highlights && data.dashboard?.highlights) {
    highlights.innerHTML = data.dashboard.highlights
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

  if (movement && data.dashboard?.recentMovement) {
    movement.innerHTML = data.dashboard.recentMovement
      .map(
        (row) => `
          <tr>
            <td>${row.candidate}</td>
            <td>${row.role}</td>
            <td>${row.change}</td>
            <td>${row.owner}</td>
            <td>${row.time}</td>
          </tr>
        `
      )
      .join('');
  }

  if (reminders && data.dashboard?.reminders) {
    reminders.innerHTML = data.dashboard.reminders
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

function initApplicants(outlet, data) {
  const list = outlet.querySelector('[data-admin-applicants-list]');
  const cues = outlet.querySelector('[data-admin-applicants-cues]');
  const notes = outlet.querySelector('[data-admin-applicants-notes]');

  if (list && data.applicants?.list) {
    list.innerHTML = data.applicants.list
      .map(
        (app) => `
          <tr>
            <td>${app.name}</td>
            <td>${app.role}</td>
            <td><span class="status-pill status-pill--${app.statusTone}">${app.statusLabel}</span></td>
            <td>${app.source}</td>
            <td>${app.applied}</td>
            <td>${app.nextAction}</td>
          </tr>
        `
      )
      .join('');
  }

  if (cues && data.applicants?.cues) {
    cues.innerHTML = data.applicants.cues
      .map(
        (cue) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${cue.title}</p>
              <p class="list-item__meta">${cue.meta}</p>
            </div>
            <span class="status-pill status-pill--${cue.status}">${cue.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (notes && data.applicants?.notes) {
    notes.innerHTML = data.applicants.notes
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

function initPipeline(outlet, data) {
  const board = outlet.querySelector('[data-admin-pipeline-board]');
  if (board && data.pipeline?.columns) {
    board.innerHTML = data.pipeline.columns
      .map(
        (col) => `
          <article class="kanban-column">
            <div class="kanban-column__title"><span>${col.title}</span><span class="tag">${col.count}</span></div>
            ${col.cards
              .map(
                (card) => `
                  <div class="kanban-card">
                    <p class="kanban-card__title">${card.title}</p>
                    <p class="kanban-card__meta">${card.meta}</p>
                    ${
                      card.tags?.length > 0
                        ? `<div class="tag-row">${card.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>`
                        : ''
                    }
                  </div>
                `
              )
              .join('')}
          </article>
        `
      )
      .join('');
  }
}

function initJobs(outlet, data) {
  const cards = outlet.querySelector('[data-admin-jobs-cards]');
  const lifecycle = outlet.querySelector('[data-admin-jobs-lifecycle]');

  if (cards && data.jobs?.cards) {
    cards.innerHTML = data.jobs.cards
      .map(
        (job) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${job.title}</p>
              <p class="list-item__meta">${job.meta}</p>
            </div>
            <span class="status-pill status-pill--${job.statusTone}">${job.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (lifecycle && data.jobs?.lifecycle) {
    lifecycle.innerHTML = data.jobs.lifecycle
      .map(
        (step) => `
          <div class="timeline__item">
            <div class="timeline__dot ${step.state === 'complete' ? 'is-complete' : step.state === 'active' ? 'is-active' : ''}">${step.step}</div>
            <h3 class="timeline__title">${step.title}</h3>
            <p class="timeline__copy">${step.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initInterviews(outlet, data) {
  const upcoming = outlet.querySelector('[data-admin-interviews-upcoming]');
  const risks = outlet.querySelector('[data-admin-interviews-risks]');

  if (upcoming && data.interviews?.upcoming) {
    upcoming.innerHTML = data.interviews.upcoming
      .map(
        (item) => `
          <tr>
            <td>${item.candidate}</td>
            <td>${item.role}</td>
            <td>${item.slot}</td>
            <td>${item.interviewer}</td>
            <td><span class="status-pill status-pill--${item.statusTone}">${item.statusLabel}</span></td>
          </tr>
        `
      )
      .join('');
  }

  if (risks && data.interviews?.risks) {
    risks.innerHTML = data.interviews.risks
      .map(
        (risk) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${risk.title}</p>
              <p class="list-item__meta">${risk.meta}</p>
            </div>
            <span class="status-pill status-pill--${risk.status}">${risk.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }
}

function initEvaluations(outlet, data) {
  const scorecards = outlet.querySelector('[data-admin-evals-scorecards]');
  const dimensions = outlet.querySelector('[data-admin-evals-dimensions]');

  if (scorecards && data.evaluations?.scorecards) {
    scorecards.innerHTML = data.evaluations.scorecards
      .map(
        (card) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${card.title}</p>
              <p class="list-item__meta">${card.meta}</p>
            </div>
            <span class="status-pill status-pill--${card.statusTone}">${card.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (dimensions && data.evaluations?.dimensions) {
    dimensions.innerHTML = data.evaluations.dimensions
      .map(
        (dim) => `
          <div class="note-card">
            <p class="note-card__title">${dim.title}</p>
            <p class="note-card__copy">${dim.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initDocuments(outlet, data) {
  const recent = outlet.querySelector('[data-admin-docs-recent]');
  const reminders = outlet.querySelector('[data-admin-docs-reminders]');

  if (recent && data.documents?.recent) {
    recent.innerHTML = data.documents.recent
      .map(
        (doc) => `
          <tr>
            <td>${doc.name}</td>
            <td>${doc.candidate}</td>
            <td>${doc.type}</td>
            <td>${doc.uploadedBy}</td>
            <td><span class="status-pill status-pill--${doc.statusTone}">${doc.statusLabel}</span></td>
          </tr>
        `
      )
      .join('');
  }

  if (reminders && data.documents?.reminders) {
    reminders.innerHTML = data.documents.reminders
      .map(
        (rem) => `
          <div class="note-card">
            <p class="note-card__title">${rem.title}</p>
            <p class="note-card__copy">${rem.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initTemplates(outlet, data) {
  const active = outlet.querySelector('[data-admin-templates-active]');
  const guidance = outlet.querySelector('[data-admin-templates-guidance]');

  if (active && data.templates?.active) {
    active.innerHTML = data.templates.active
      .map(
        (tpl) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${tpl.title}</p>
              <p class="list-item__meta">${tpl.meta}</p>
            </div>
            <span class="status-pill status-pill--${tpl.statusTone}">${tpl.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (guidance && data.templates?.guidance) {
    guidance.innerHTML = data.templates.guidance
      .map(
        (guide) => `
          <div class="note-card">
            <p class="note-card__title">${guide.title}</p>
            <p class="note-card__copy">${guide.copy}</p>
          </div>
        `
      )
      .join('');
  }
}

function initSettings(outlet, data) {
  const controls = outlet.querySelector('[data-admin-settings-controls]');
  const users = outlet.querySelector('[data-admin-settings-users]');

  if (controls && data.settings?.controls) {
    controls.innerHTML = data.settings.controls
      .map(
        (ctrl) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${ctrl.title}</p>
              <p class="list-item__meta">${ctrl.meta}</p>
            </div>
            <span class="status-pill status-pill--${ctrl.statusTone}">${ctrl.statusLabel}</span>
          </div>
        `
      )
      .join('');
  }

  if (users && data.settings?.users) {
    users.innerHTML = data.settings.users
      .map(
        (user) => `
          <tr>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.scope}</td>
          </tr>
        `
      )
      .join('');
  }
}

function initAdminRoute({ outlet, route, datasets }) {
  const data = getAdminData(datasets);

  switch (route.id) {
    case 'dashboard':
      initDashboard(outlet, data);
      break;
    case 'applicants':
      initApplicants(outlet, data);
      break;
    case 'pipeline':
      initPipeline(outlet, data);
      break;
    case 'jobs':
      initJobs(outlet, data);
      break;
    case 'interviews':
      initInterviews(outlet, data);
      break;
    case 'evaluations':
      initEvaluations(outlet, data);
      break;
    case 'documents':
      initDocuments(outlet, data);
      break;
    case 'email-templates':
      initTemplates(outlet, data);
      break;
    case 'settings':
      initSettings(outlet, data);
      break;
    default:
      break;
  }
}

bootstrapSurface({ onRouteInit: initAdminRoute }).catch((error) => {
  const root = document.getElementById('d8x-shell');
  if (root) {
    root.innerHTML = \`
      <div class="empty-state" style="margin:2rem">
        <h1 class="empty-state__title">Admin surface failed to load</h1>
        <p class="empty-state__desc">\${error.message}</p>
      </div>
    \`;
  }
});
