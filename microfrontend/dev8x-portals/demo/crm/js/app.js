import bootstrapSurface from '../../shared/js/surface-app.js';
import {
  fmtCurrency,
  fmtDate,
  fmtNumber,
  fmtRelative
} from '../../shared/js/mock-data.js';

const DATASET_KEY = 'data/mock-crm-data.json';
const HEATMAP_LEVELS = [
  { min: 8, level: '4' },
  { min: 5, level: '3' },
  { min: 2, level: '2' },
  { min: 1, level: '1' },
  { min: 0, level: '0' }
];

const STAGE_LABELS = {
  new_lead: 'New lead',
  contacted: 'Contacted',
  meeting_set: 'Meeting',
  proposal: 'Proposal',
  won: 'Won',
  lost: 'Lost'
};

const state = {
  segment: 'b2b',
  contactSearch: '',
  contactTemperature: 'all',
  contactState: 'all',
  templateChannel: 'all',
  templateStatus: 'all',
  selectedTemplateId: null,
  stackStatus: 'all',
  scoreStatus: 'all',
  selectedScoreId: null,
  archiveOutcome: 'won'
};

function getCrmData(datasets) {
  return datasets?.[DATASET_KEY] || {};
}

function titleCase(value = '') {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

function scoreTone(status) {
  switch (status) {
    case 'current':
    case 'approved':
    case 'applied':
    case 'active':
    case 'won':
    case 'qualified':
    case 'positive':
      return 'success';
    case 'stale':
    case 'draft':
    case 'tested':
    case 'warm':
    case 'proposed':
    case 'new':
    case 'nurturing':
      return 'warning';
    case 'overridden':
    case 'info':
      return 'info';
    case 'lost':
    case 'retired':
    case 'archived':
    case 'disqualified':
    case 'negative':
    case 'burned':
      return 'danger';
    default:
      return 'neutral';
  }
}

function statusPill(label, tone) {
  return `<span class="status-pill status-pill--${tone}">${label}</span>`;
}

function setToggleState(buttons, selectedValue, key) {
  buttons.forEach((button) => {
    button.dataset.selected = String(button.dataset[key] === selectedValue);
  });
}

function heatLevel(value) {
  return HEATMAP_LEVELS.find((entry) => value >= entry.min)?.level || '0';
}

function renderMetricCards(container, cards = []) {
  if (!container) return;
  container.innerHTML = cards
    .map(
      (card, index) => `
        <article class="metric-card ${index === 0 ? 'crm-highlight' : ''}">
          <div class="metric-card__label">${card.label}</div>
          <div class="metric-card__value">${card.value}</div>
          <div class="metric-card__meta">${card.meta}</div>
        </article>
      `,
    )
    .join('');
}

function renderMiniStats(container, items = []) {
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
        <div class="crm-mini-stat">
          <div class="crm-mini-stat__label">${item.label}</div>
          <div class="crm-mini-stat__value">${item.value}</div>
          <div class="crm-mini-stat__meta">${item.meta}</div>
        </div>
      `,
    )
    .join('');
}

function applyTemplatePreview(template, sampleValues = {}) {
  const subject = template?.subject || 'No template selected.';
  const body = template?.body || 'Choose a template from the list to preview it here.';
  const combined = `${subject}\n\n${body}`;

  return combined.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, key) => {
    return sampleValues[key.trim()] || `{{${key.trim()}}}`;
  });
}

function initDashboard(outlet, data) {
  const buttons = Array.from(outlet.querySelectorAll('[data-crm-segment]'));
  const metrics = outlet.querySelector('[data-crm-dashboard-metrics]');
  const funnel = outlet.querySelector('[data-crm-funnel]');
  const hotLeads = outlet.querySelector('[data-crm-hot-leads]');
  const activity = outlet.querySelector('[data-crm-activity]');
  const snapshot = outlet.querySelector('[data-crm-dashboard-snapshot]');

  if (!data.dashboard?.segments?.[state.segment]) {
    state.segment = Object.keys(data.dashboard?.segments || {})[0] || 'b2b';
  }

  const render = () => {
    const segment = data.dashboard?.segments?.[state.segment];
    if (!segment) return;

    setToggleState(buttons, state.segment, 'crmSegment');
    renderMetricCards(metrics, [
      {
        label: `${segment.label} open deals`,
        value: fmtNumber(segment.openDealCount),
        meta: `Snapshot ${fmtDate(segment.snapshotTime, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`
      },
      {
        label: 'Pipeline value',
        value: fmtCurrency(segment.pipelineValue),
        meta: 'Only the visible segment contributes to this number.'
      },
      {
        label: 'Hot leads',
        value: fmtNumber(segment.hotLeadCount),
        meta: 'Lead count using current scoring thresholds.'
      },
      {
        label: 'Reply rate',
        value: `${segment.replyRate}%`,
        meta: 'Recent outreach performance for the selected segment.'
      }
    ]);

    snapshot.textContent = `${segment.label} segment · Refreshed ${fmtRelative(segment.snapshotTime)}`;

    const peakCount = Math.max(...segment.funnel.map((entry) => entry.count), 1);
    funnel.innerHTML = segment.funnel
      .map(
        (entry) => `
          <div class="list-item">
            <div class="list-item__content" style="width:100%">
              <p class="list-item__title">${entry.stage}</p>
              <div class="progress">
                <div class="progress__bar" style="width:${Math.round((entry.count / peakCount) * 100)}%"></div>
              </div>
            </div>
            <span class="tag">${fmtNumber(entry.count)}</span>
          </div>
        `,
      )
      .join('');

    hotLeads.innerHTML = segment.hotLeads
      .map(
        (lead) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${lead.name} · ${lead.company}</p>
              <p class="list-item__meta">Score ${lead.score} · ${lead.nextStep}</p>
              <p class="list-item__caption">Last contact ${fmtRelative(lead.lastContact)} · ${fmtCurrency(lead.value)}</p>
            </div>
            ${statusPill(titleCase(lead.temperature), scoreTone(lead.temperature))}
          </div>
        `,
      )
      .join('');

    activity.innerHTML = segment.activity
      .map(
        (item) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${item.title}</p>
              <p class="list-item__meta">${item.meta}</p>
            </div>
            <span class="tag">${fmtRelative(item.timestamp)}</span>
          </div>
        `,
      )
      .join('');
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      state.segment = button.dataset.crmSegment;
      render();
    });
  });

  render();
}

function initContacts(outlet, data) {
  const searchInput = outlet.querySelector('[data-crm-contact-search]');
  const temperatureSelect = outlet.querySelector('[data-crm-contact-temperature]');
  const stateSelect = outlet.querySelector('[data-crm-contact-state]');
  const stats = outlet.querySelector('[data-crm-contact-stats]');
  const rows = outlet.querySelector('[data-crm-contact-rows]');
  const contacts = data.contacts || [];

  const filterContacts = () =>
    contacts.filter((contact) => {
      const haystack = `${contact.name} ${contact.companyName} ${contact.jobTitle}`.toLowerCase();
      const matchesSearch = !state.contactSearch || haystack.includes(state.contactSearch.toLowerCase());
      const matchesTemperature =
        state.contactTemperature === 'all' || contact.temperature === state.contactTemperature;
      const matchesQualification =
        state.contactState === 'all' || contact.qualificationState === state.contactState;
      return matchesSearch && matchesTemperature && matchesQualification;
    });

  const render = () => {
    const filtered = filterContacts();
    const decisionMakers = filtered.filter((contact) => contact.decisionMaker).length;
    const hotContacts = filtered.filter((contact) => contact.temperature === 'hot').length;
    const archived = filtered.filter((contact) => contact.qualificationState === 'archived').length;

    renderMiniStats(stats, [
      { label: 'Visible contacts', value: fmtNumber(filtered.length), meta: 'Current filters applied.' },
      { label: 'Decision makers', value: fmtNumber(decisionMakers), meta: 'Decision-maker flag stays visible per record.' },
      { label: 'Hot contacts', value: fmtNumber(hotContacts), meta: 'High-temperature leads worth immediate follow-up.' },
      { label: 'Archived', value: fmtNumber(archived), meta: 'Historical-only contacts excluded from active qualification work.' }
    ]);

    rows.innerHTML = filtered
      .map(
        (contact) => `
          <tr>
            <td>
              <strong>${contact.name}</strong><br />
              <span class="panel__meta">${contact.jobTitle}${contact.decisionMaker ? ' · Decision maker' : ''}</span>
            </td>
            <td>${contact.companyName}<br /><div style="margin-top:4px"><span class="tag">${titleCase(contact.channel)}</span></div></td>
            <td>${contact.healthScore}</td>
            <td>${statusPill(titleCase(contact.temperature), scoreTone(contact.temperature))}</td>
            <td>${statusPill(titleCase(contact.sentiment), scoreTone(contact.sentiment))}</td>
            <td>${statusPill(titleCase(contact.qualificationState), scoreTone(contact.qualificationState))}</td>
            <td>${fmtRelative(contact.lastContactAt)}</td>
          </tr>
        `,
      )
      .join('');
  };

  searchInput.value = state.contactSearch;
  temperatureSelect.value = state.contactTemperature;
  stateSelect.value = state.contactState;

  searchInput.addEventListener('input', () => {
    state.contactSearch = searchInput.value.trim();
    render();
  });

  temperatureSelect.addEventListener('change', () => {
    state.contactTemperature = temperatureSelect.value;
    render();
  });

  stateSelect.addEventListener('change', () => {
    state.contactState = stateSelect.value;
    render();
  });

  render();
}

function initPipeline(outlet, data) {
  const deals = data.pipeline?.deals || [];
  const metrics = outlet.querySelector('[data-crm-pipeline-metrics]');
  const board = outlet.querySelector('[data-crm-pipeline-board]');
  const orderedStages = ['new_lead', 'contacted', 'meeting_set', 'proposal', 'won', 'lost'];

  const openDeals = deals.filter((deal) => !['won', 'lost'].includes(deal.stage));
  const staleDeals = deals.filter((deal) => Boolean(deal.staleLevel));
  const proposalValue = deals
    .filter((deal) => deal.stage === 'proposal')
    .reduce((total, deal) => total + deal.value, 0);

  renderMetricCards(metrics, [
    { label: 'Open deals', value: fmtNumber(openDeals.length), meta: 'Deals in active, non-terminal stages.' },
    { label: 'Open value', value: fmtCurrency(openDeals.reduce((total, deal) => total + deal.value, 0)), meta: 'Combined value across visible open deals.' },
    { label: 'Stale deals', value: fmtNumber(staleDeals.length), meta: 'Age threshold exceeded in the current stage.' },
    { label: 'Proposal value', value: fmtCurrency(proposalValue), meta: 'Near-closing value currently sitting in proposal.' }
  ]);

  board.innerHTML = orderedStages
    .map((stage) => {
      const stageDeals = deals.filter((deal) => deal.stage === stage);
      return `
        <article class="kanban-column">
          <div class="kanban-column__title">
            <span>${STAGE_LABELS[stage]}</span>
            <span class="tag">${fmtNumber(stageDeals.length)}</span>
          </div>
          ${stageDeals
            .map(
              (deal) => `
                <div class="kanban-card">
                  <p class="kanban-card__title">${deal.name}</p>
                  <p class="kanban-card__meta">${deal.company} · ${fmtCurrency(deal.value)} · ${deal.owner}</p>
                  <div class="tag-row">
                    <span class="tag">${deal.ageDays}d in stage</span>
                    ${deal.staleLevel ? statusPill(`Stale ${deal.staleLevel}`, scoreTone('stale')) : ''}
                  </div>
                  <p class="kanban-card__meta">${deal.nextStep}</p>
                </div>
              `,
            )
            .join('')}
        </article>
      `;
    })
    .join('');
}

function initAnalytics(outlet, data) {
  const analytics = data.analytics || {};
  const range = outlet.querySelector('[data-crm-analytics-range]');
  const metrics = outlet.querySelector('[data-crm-analytics-metrics]');
  const rows = outlet.querySelector('[data-crm-channel-rows]');
  const recommendations = outlet.querySelector('[data-crm-recommendations]');
  const heatmap = outlet.querySelector('[data-crm-heatmap]');
  const channels = analytics.channels || [];
  const bestChannel = [...channels].sort((left, right) => right.replyRate - left.replyRate)[0];
  const totalSent = channels.reduce((total, channel) => total + channel.sentCount, 0);

  range.textContent = analytics.range || 'Current range';
  renderMetricCards(metrics, [
    { label: 'Messages sent', value: fmtNumber(totalSent), meta: 'Total outbound attempts in the visible range.' },
    { label: 'Best reply channel', value: titleCase(bestChannel?.channel || 'n/a'), meta: bestChannel ? `${bestChannel.replyRate}% reply rate` : 'No channel data available.' },
    { label: 'Best meeting rate', value: bestChannel ? `${bestChannel.meetingRate}%` : '-', meta: 'Channel with the strongest meeting conversion.' },
    { label: 'Tracked channels', value: fmtNumber(channels.length), meta: 'Email, LinkedIn, WhatsApp, Upwork, and cold call.' }
  ]);

  rows.innerHTML = channels
    .map(
      (channel) => `
        <tr>
          <td>${titleCase(channel.channel)}</td>
          <td>${fmtNumber(channel.sentCount)}</td>
          <td>${channel.replyRate}%</td>
          <td>${channel.meetingRate}%</td>
        </tr>
      `,
    )
    .join('');

  recommendations.innerHTML = (analytics.recommendations || [])
    .map(
      (item) => `
        <div class="list-item">
          <div class="list-item__content">
            <p class="list-item__title">${item.title}</p>
            <p class="list-item__meta">${item.detail}</p>
          </div>
          <span class="tag">Read-only</span>
        </div>
      `,
    )
    .join('');

  const timeBlocks = analytics.heatmap?.timeBlocks || [];
  const heatmapRows = analytics.heatmap?.rows || [];
  heatmap.innerHTML = `
    <div class="crm-heatmap">
      <div class="crm-heatmap__header">
        <div class="crm-heatmap__label">Time</div>
        ${timeBlocks.map((block) => `<div class="crm-heatmap__time">${block}</div>`).join('')}
      </div>
      ${heatmapRows
        .map(
          (row) => `
            <div class="crm-heatmap__row">
              <div class="crm-heatmap__label">${row.day}</div>
              ${row.values
                .map(
                  (value, index) => `
                    <div class="crm-heatmap__cell" data-level="${heatLevel(value)}">
                      <strong>${value}</strong>
                      <span>${timeBlocks[index]}</span>
                    </div>
                  `,
                )
                .join('')}
            </div>
          `,
        )
        .join('')}
    </div>
  `;
}

function initTemplates(outlet, data) {
  const templateChannel = outlet.querySelector('[data-crm-template-channel]');
  const templateStatus = outlet.querySelector('[data-crm-template-status]');
  const templateList = outlet.querySelector('[data-crm-template-list]');
  const previewName = outlet.querySelector('[data-crm-template-preview-name]');
  const previewChannel = outlet.querySelector('[data-crm-template-preview-channel]');
  const previewStatus = outlet.querySelector('[data-crm-template-preview-status]');
  const previewSubject = outlet.querySelector('[data-crm-template-preview-subject]');
  const previewBody = outlet.querySelector('[data-crm-template-preview-body]');
  const previewRendered = outlet.querySelector('[data-crm-template-preview-rendered]');
  const variableCatalog = outlet.querySelector('[data-crm-variable-catalog]');
  const templates = data.templates?.items || [];
  const sampleValues = data.templates?.sampleValues || {};

  variableCatalog.textContent = (data.templates?.variableCatalog || []).join(', ');
  templateChannel.value = state.templateChannel;
  templateStatus.value = state.templateStatus;

  const getFilteredTemplates = () =>
    templates.filter((template) => {
      const matchesChannel =
        state.templateChannel === 'all' || template.channel === state.templateChannel;
      const matchesStatus =
        state.templateStatus === 'all' || template.status === state.templateStatus;
      return matchesChannel && matchesStatus;
    });

  const renderPreview = (template) => {
    previewName.textContent = template?.name || 'Template preview';
    previewChannel.textContent = template ? titleCase(template.channel) : 'No channel';
    previewStatus.textContent = template ? titleCase(template.status) : 'No status';
    previewStatus.className = `status-pill status-pill--${scoreTone(template?.status)}`;
    previewSubject.textContent = template?.subject || 'No subject selected.';
    previewBody.textContent = template?.body || 'Choose a template from the list to view the body.';
    previewRendered.textContent = applyTemplatePreview(template, sampleValues);
  };

  const render = () => {
    const filtered = getFilteredTemplates();
    if (!filtered.some((template) => template.id === state.selectedTemplateId)) {
      state.selectedTemplateId = filtered[0]?.id || null;
    }

    templateList.innerHTML = filtered.length
      ? filtered
          .map(
            (template) => `
              <button class="crm-template-item ${template.id === state.selectedTemplateId ? 'is-active' : ''}" type="button" data-crm-template-id="${template.id}">
                <strong>${template.name}</strong>
                <span class="panel__meta">${titleCase(template.channel)} · ${template.replyRate}% reply rate</span>
                <div class="chip-row">
                  ${statusPill(titleCase(template.status), scoreTone(template.status))}
                  <span class="tag">${template.variableNames.length} variables</span>
                </div>
              </button>
            `,
          )
          .join('')
      : '<p class="crm-empty-copy">No templates match the current filters.</p>';

    templateList.querySelectorAll('[data-crm-template-id]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedTemplateId = button.dataset.crmTemplateId;
        render();
      });
    });

    const selected = filtered.find((template) => template.id === state.selectedTemplateId) || null;
    renderPreview(selected);
  };

  templateChannel.addEventListener('change', () => {
    state.templateChannel = templateChannel.value;
    render();
  });

  templateStatus.addEventListener('change', () => {
    state.templateStatus = templateStatus.value;
    render();
  });

  render();
}

function initLeadStacks(outlet, data) {
  const buttons = Array.from(outlet.querySelectorAll('[data-crm-stack-status]'));
  const metrics = outlet.querySelector('[data-crm-stack-metrics]');
  const list = outlet.querySelector('[data-crm-stack-list]');
  const stacks = data.leadStacks || [];

  const render = () => {
    setToggleState(buttons, state.stackStatus, 'crmStackStatus');
    const filtered = stacks.filter((stack) => state.stackStatus === 'all' || stack.status === state.stackStatus);
    const active = stacks.filter((stack) => stack.status === 'active').length;
    const assigned = stacks.filter((stack) => Boolean(stack.owner)).length;
    const totalLeads = stacks.reduce((total, stack) => total + stack.leadCount, 0);

    renderMetricCards(metrics, [
      { label: 'Visible stacks', value: fmtNumber(filtered.length), meta: 'Current status filter applied.' },
      { label: 'Active stacks', value: fmtNumber(active), meta: 'Only active stacks should be assigned.' },
      { label: 'Assigned stacks', value: fmtNumber(assigned), meta: 'Stacks already attached to an owner or campaign.' },
      { label: 'Leads covered', value: fmtNumber(totalLeads), meta: 'Total historical lead members across all stacks.' }
    ]);

    list.innerHTML = filtered
      .map(
        (stack) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${stack.name}</p>
              <p class="list-item__meta">${stack.description}</p>
              <div class="chip-row">
                ${stack.platforms.map((platform) => `<span class="tag">${platform}</span>`).join('')}
                <span class="tag">${fmtNumber(stack.leadCount)} leads</span>
                <span class="tag">${stack.campaign}</span>
              </div>
            </div>
            <div class="list-item__content" style="align-items:flex-end">
              ${statusPill(titleCase(stack.status), scoreTone(stack.status))}
              <p class="list-item__caption">${stack.owner ? `${stack.owner} · assigned ${fmtDate(stack.assignedAt)}` : 'Unassigned'}</p>
            </div>
          </div>
        `,
      )
      .join('');
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      state.stackStatus = button.dataset.crmStackStatus;
      render();
    });
  });

  render();
}

function initScoring(outlet, data) {
  const buttons = Array.from(outlet.querySelectorAll('[data-crm-score-status]'));
  const metrics = outlet.querySelector('[data-crm-score-metrics]');
  const list = outlet.querySelector('[data-crm-score-list]');
  const name = outlet.querySelector('[data-crm-score-name]');
  const meta = outlet.querySelector('[data-crm-score-meta]');
  const priority = outlet.querySelector('[data-crm-score-priority]');
  const statusBadge = outlet.querySelector('[data-crm-score-status-badge]');
  const summary = outlet.querySelector('[data-crm-score-summary]');
  const dimensions = outlet.querySelector('[data-crm-score-dimensions]');
  const override = outlet.querySelector('[data-crm-score-override]');
  const scores = data.scoring?.queue || [];

  const render = () => {
    setToggleState(buttons, state.scoreStatus, 'crmScoreStatus');
    const filtered = scores.filter((score) => state.scoreStatus === 'all' || score.status === state.scoreStatus);
    if (!filtered.some((score) => score.id === state.selectedScoreId)) {
      state.selectedScoreId = filtered[0]?.id || null;
    }

    const avgScore = filtered.length
      ? Math.round(filtered.reduce((total, score) => total + score.totalScore, 0) / filtered.length)
      : 0;

    renderMetricCards(metrics, [
      { label: 'Visible scores', value: fmtNumber(filtered.length), meta: 'Current freshness filter applied.' },
      { label: 'Average score', value: avgScore ? String(avgScore) : '-', meta: 'Composite score across the visible queue.' },
      { label: 'Stale entries', value: fmtNumber(scores.filter((score) => score.status === 'stale').length), meta: 'Do not use stale scores as current guidance.' },
      { label: 'Overrides', value: fmtNumber(scores.filter((score) => score.status === 'overridden').length), meta: 'Manual overrides remain auditable and explainable.' }
    ]);

    list.innerHTML = filtered.length
      ? filtered
          .map(
            (score) => `
              <button class="crm-score-item ${score.id === state.selectedScoreId ? 'is-active' : ''}" type="button" data-crm-score-id="${score.id}">
                <strong>${score.contact} · ${score.company}</strong>
                <span class="panel__meta">${score.owner} · ${fmtRelative(score.calculatedAt)}</span>
                <div class="chip-row">
                  <span class="tag">${score.priority}</span>
                  ${statusPill(titleCase(score.status), scoreTone(score.status))}
                  <span class="tag">Score ${score.totalScore}</span>
                </div>
              </button>
            `,
          )
          .join('')
      : '<p class="crm-empty-copy">No scores match the selected freshness filter.</p>';

    list.querySelectorAll('[data-crm-score-id]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedScoreId = button.dataset.crmScoreId;
        render();
      });
    });

    const selected = filtered.find((score) => score.id === state.selectedScoreId) || null;
    if (!selected) {
      name.textContent = 'No scored lead selected';
      meta.textContent = 'Adjust the filters to surface at least one score.';
      priority.textContent = 'No priority';
      statusBadge.textContent = 'No status';
      summary.innerHTML = '';
      dimensions.innerHTML = '';
      override.textContent = 'No override note is available.';
      return;
    }

    name.textContent = `${selected.contact} · ${selected.company}`;
    meta.textContent = `Owner ${selected.owner} · Refreshed ${fmtRelative(selected.calculatedAt)}`;
    priority.textContent = selected.priority;
    statusBadge.textContent = titleCase(selected.status);
    statusBadge.className = `status-pill status-pill--${scoreTone(selected.status)}`;

    renderMiniStats(summary, [
      { label: 'Composite score', value: String(selected.totalScore), meta: 'Range 0-100 from the current scoring model.' },
      { label: 'Freshness', value: titleCase(selected.status), meta: `Calculated ${fmtDate(selected.calculatedAt, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}` },
      { label: 'Priority', value: selected.priority, meta: 'Highest-value follow-up queues rise to the top.' }
    ]);

    dimensions.innerHTML = Object.entries(selected.dimensions || {})
      .map(
        ([key, value]) => `
          <div class="crm-dimension-row">
            <div class="panel__meta">${titleCase(key)}</div>
            <div class="progress">
              <div class="progress__bar" style="width:${value}%"></div>
            </div>
            <div class="panel__meta">${value}/100</div>
          </div>
        `,
      )
      .join('');

    override.textContent = selected.overrideNote || 'Current scores follow the automated model unless a manual override is recorded.';
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      state.scoreStatus = button.dataset.crmScoreStatus;
      render();
    });
  });

  render();
}

function initArchive(outlet, data) {
  const buttons = Array.from(outlet.querySelectorAll('[data-crm-archive-outcome]'));
  const metrics = outlet.querySelector('[data-crm-archive-metrics]');
  const rows = outlet.querySelector('[data-crm-archive-rows]');
  const reasons = outlet.querySelector('[data-crm-archive-reasons]');

  const render = () => {
    setToggleState(buttons, state.archiveOutcome, 'crmArchiveOutcome');
    const items = data.archive?.[state.archiveOutcome] || [];
    const totalValue = items.reduce((total, item) => total + item.value, 0);
    const avgValue = items.length ? Math.round(totalValue / items.length) : 0;

    renderMetricCards(metrics, [
      { label: `Closed ${state.archiveOutcome}`, value: fmtNumber(items.length), meta: 'Read-only outcome records in the archive view.' },
      { label: 'Total archived value', value: fmtCurrency(totalValue), meta: 'Combined value across the visible archive set.' },
      { label: 'Average deal value', value: avgValue ? fmtCurrency(avgValue) : '-', meta: 'Useful for comparing won and lost deal quality.' },
      { label: 'Terminal state', value: 'Read only', meta: 'Archive blocks deal reactivation by design.' }
    ]);

    rows.innerHTML = items
      .map(
        (item) => `
          <tr>
            <td>${item.contact}</td>
            <td>${item.company}</td>
            <td>${item.owner}</td>
            <td>${fmtDate(item.closeDate)}</td>
            <td>${fmtCurrency(item.value)}</td>
          </tr>
        `,
      )
      .join('');

    reasons.innerHTML = items
      .map(
        (item) => `
          <div class="list-item">
            <div class="list-item__content">
              <p class="list-item__title">${item.company}</p>
              <p class="list-item__meta">${item.closeReason}</p>
            </div>
            ${statusPill(titleCase(state.archiveOutcome), scoreTone(state.archiveOutcome))}
          </div>
        `,
      )
      .join('');
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      state.archiveOutcome = button.dataset.crmArchiveOutcome;
      render();
    });
  });

  render();
}

function initSettings(outlet, data) {
  const settingList = outlet.querySelector('[data-crm-setting-list]');
  const userRows = outlet.querySelector('[data-crm-user-rows]');
  const approvalList = outlet.querySelector('[data-crm-approval-list]');
  const settings = data.settings?.items || [];
  const users = data.settings?.users || [];
  const approvals = data.settings?.approvals || [];

  settingList.innerHTML = settings
    .map(
      (item) => `
        <div class="crm-setting-row">
          <div class="list-item__content">
            <p class="list-item__title">${item.label}</p>
            <p class="list-item__meta">${item.description}</p>
            <p class="list-item__caption">Updated by ${item.updatedBy} · ${fmtRelative(item.updatedAt)}</p>
          </div>
          <div class="crm-setting-row__value">
            <strong>${item.value}</strong>
            ${statusPill(titleCase(item.status), scoreTone(item.status))}
          </div>
        </div>
      `,
    )
    .join('');

  userRows.innerHTML = users
    .map(
      (user) => `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${statusPill(titleCase(user.role), scoreTone(user.role))}</td>
          <td>${statusPill(titleCase(user.status), scoreTone(user.status))}</td>
        </tr>
      `,
    )
    .join('');

  approvalList.innerHTML = approvals
    .map(
      (item) => `
        <div class="list-item">
          <div class="list-item__content">
            <p class="list-item__title">${item.title}</p>
            <p class="list-item__meta">${item.detail}</p>
          </div>
          <div class="list-item__content" style="align-items:flex-end">
            ${statusPill(titleCase(item.status), scoreTone(item.status))}
            <p class="list-item__caption">${item.owner}</p>
          </div>
        </div>
      `,
    )
    .join('');
}

function initCrmRoute({ outlet, route, datasets }) {
  const data = getCrmData(datasets);

  switch (route.id) {
    case 'dashboard':
      initDashboard(outlet, data);
      break;
    case 'contacts':
      initContacts(outlet, data);
      break;
    case 'pipeline':
      initPipeline(outlet, data);
      break;
    case 'analytics':
      initAnalytics(outlet, data);
      break;
    case 'templates':
      initTemplates(outlet, data);
      break;
    case 'lead-stacks':
      initLeadStacks(outlet, data);
      break;
    case 'scoring':
      initScoring(outlet, data);
      break;
    case 'archive':
      initArchive(outlet, data);
      break;
    case 'settings':
      initSettings(outlet, data);
      break;
    case 'companies':
      break;
    case 'jobs':
      break;
    default:
      break;
  }
}

bootstrapSurface({ onRouteInit: initCrmRoute }).catch((error) => {
  const root = document.getElementById('d8x-shell');
  if (root) {
    root.innerHTML = `
      <div class="empty-state" style="margin:2rem">
        <h1 class="empty-state__title">CRM surface failed to load</h1>
        <p class="empty-state__desc">${error.message}</p>
      </div>
    `;
  }
});
