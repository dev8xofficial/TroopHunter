"""
Flask web interface for the Selenium pagination scraper.

Run with:
    python web_app.py

Then open:
    http://127.0.0.1:5000/
"""

from __future__ import annotations

from pathlib import Path

from flask import Flask, flash, redirect, render_template_string, request, url_for

import config
from main import normalise_max_pages, run_scraper, validate_url


app = Flask(__name__)
app.secret_key = "change-me-in-production"


INDEX_TEMPLATE = """
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Selenium Pagination Scraper</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        --bg: #050816;
        --card-bg: #0f172a;
        --accent: #38bdf8;
        --accent-soft: rgba(56, 189, 248, 0.15);
        --text: #e5e7eb;
        --muted: #9ca3af;
        --danger: #f97373;
        --radius: 14px;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: radial-gradient(circle at top, #1d293b 0, var(--bg) 45%, #020617 100%);
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      .shell {
        width: 100%;
        max-width: 720px;
        background: linear-gradient(135deg, rgba(148, 163, 184, 0.16), transparent);
        padding: 1px;
        border-radius: calc(var(--radius) + 1px);
        box-shadow:
          0 32px 80px rgba(15, 23, 42, 0.9),
          0 0 0 1px rgba(15, 23, 42, 0.9);
      }
      .card {
        border-radius: var(--radius);
        background:
          radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.08), transparent 55%),
          radial-gradient(circle at 100% 0, rgba(94, 234, 212, 0.06), transparent 50%),
          var(--card-bg);
        padding: 24px 24px 20px;
        position: relative;
        overflow: hidden;
      }
      .card::before {
        content: "";
        position: absolute;
        inset: -80px;
        background: radial-gradient(circle at 0 0, rgba(56, 189, 248, 0.06), transparent 65%);
        opacity: 0.8;
        pointer-events: none;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 18px;
        position: relative;
        z-index: 1;
      }
      .title {
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: #e5e7eb;
      }
      .subtitle {
        font-size: 0.9rem;
        color: var(--muted);
        margin-top: 4px;
      }
      .pill {
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(15, 23, 42, 0.9);
        border: 1px solid rgba(148, 163, 184, 0.3);
        font-size: 0.75rem;
        color: var(--muted);
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .pill-dot {
        width: 7px;
        height: 7px;
        border-radius: 999px;
        background: #22c55e;
        box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.18);
      }
      form {
        margin-top: 10px;
        display: grid;
        gap: 16px;
        position: relative;
        z-index: 1;
      }
      label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.09em;
        color: var(--muted);
        margin-bottom: 6px;
        display: inline-block;
      }
      .field-group {
        display: grid;
        gap: 6px;
      }
      .inline-fields {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        gap: 12px;
      }
      input[type="text"],
      input[type="number"] {
        width: 100%;
        border-radius: 999px;
        border: 1px solid rgba(148, 163, 184, 0.45);
        padding: 9px 14px;
        background: rgba(15, 23, 42, 0.96);
        color: var(--text);
        font-size: 0.9rem;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
      }
      input[type="text"]:focus,
      input[type="number"]:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.25);
        background: rgba(15, 23, 42, 0.98);
      }
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        opacity: 0.35;
      }
      .hint {
        font-size: 0.75rem;
        color: var(--muted);
      }
      .switch-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-top: 2px;
      }
      .switch-label {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .switch-title {
        font-size: 0.8rem;
        color: var(--text);
      }
      .switch-subtitle {
        font-size: 0.72rem;
        color: var(--muted);
      }
      .switch {
        position: relative;
        width: 44px;
        height: 24px;
      }
      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: rgba(15, 23, 42, 0.95);
        border-radius: 999px;
        border: 1px solid rgba(148, 163, 184, 0.6);
        transition: 0.2s ease;
      }
      .slider:before {
        content: "";
        position: absolute;
        height: 18px;
        width: 18px;
        left: 3px;
        top: 2px;
        background-color: #e5e7eb;
        border-radius: 999px;
        box-shadow: 0 3px 10px rgba(15, 23, 42, 0.65);
        transition: 0.2s ease;
      }
      .switch input:checked + .slider {
        background: radial-gradient(circle at 0 50%, rgba(56, 189, 248, 0.2), rgba(15, 23, 42, 0.95));
        border-color: rgba(56, 189, 248, 0.8);
      }
      .switch input:checked + .slider:before {
        transform: translateX(18px);
        background-color: #f9fafb;
      }
      .footer-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-top: 10px;
      }
      .submit-btn {
        border: none;
        border-radius: 999px;
        padding: 9px 18px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        color: #0b1120;
        background: linear-gradient(135deg, #38bdf8, #22c55e);
        box-shadow:
          0 12px 25px rgba(56, 189, 248, 0.3),
          0 0 0 1px rgba(15, 23, 42, 0.9);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;
      }
      .submit-btn span {
        font-size: 1.1rem;
      }
      .submit-btn:hover {
        transform: translateY(-1px);
        filter: brightness(1.03);
        box-shadow:
          0 18px 32px rgba(56, 189, 248, 0.38),
          0 0 0 1px rgba(15, 23, 42, 1);
      }
      .submit-btn:active {
        transform: translateY(0);
        box-shadow:
          0 10px 20px rgba(56, 189, 248, 0.3),
          0 0 0 1px rgba(15, 23, 42, 0.9);
      }
      .footer-note {
        font-size: 0.72rem;
        color: var(--muted);
      }
      .flash {
        margin: 0 0 10px;
        padding: 8px 12px;
        border-radius: 10px;
        font-size: 0.8rem;
        border: 1px solid rgba(248, 250, 252, 0.06);
      }
      .flash-error {
        background: rgba(248, 113, 113, 0.08);
        border-color: rgba(248, 113, 113, 0.5);
        color: #fecaca;
      }
      .flash-success {
        background: rgba(34, 197, 94, 0.08);
        border-color: rgba(52, 211, 153, 0.5);
        color: #bbf7d0;
      }
      .result {
        margin-top: 12px;
        padding: 10px 12px;
        border-radius: 12px;
        background: var(--accent-soft);
        font-size: 0.8rem;
        border: 1px solid rgba(56, 189, 248, 0.5);
      }
      .result a {
        color: #7dd3fc;
        text-decoration: none;
      }
      .result a:hover {
        text-decoration: underline;
      }
      @media (max-width: 640px) {
        .card { padding: 18px 18px 16px; }
        .header { flex-direction: column; align-items: flex-start; }
        .inline-fields { grid-template-columns: minmax(0, 1fr); }
        .footer-row { flex-direction: column-reverse; align-items: stretch; }
        .submit-btn { width: 100%; justify-content: center; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <div class="card">
        <div class="header">
          <div>
            <div class="title">Selenium Pagination Scraper</div>
            <div class="subtitle">Scrape up to 50 pages into a single Markdown report.</div>
          </div>
          <div class="pill">
            <span class="pill-dot"></span>
            <span>Ready</span>
          </div>
        </div>

        {% with messages = get_flashed_messages(with_categories=true) %}
          {% if messages %}
            {% for category, message in messages %}
              <div class="flash {% if category == 'error' %}flash-error{% else %}flash-success{% endif %}">
                {{ message }}
              </div>
            {% endfor %}
          {% endif %}
        {% endwith %}

        <form method="post">
          <div class="field-group">
            <label for="start_url">Start URL</label>
            <input
              type="text"
              id="start_url"
              name="start_url"
              placeholder="https://example.com/sitemap.xml or first list page"
              required
              value="{{ request.form.get('start_url', '') }}"
            />
            <div class="hint">The scraper will auto-discover the sitemap and visit each page.</div>
          </div>

          <div class="inline-fields">
            <div class="field-group">
              <label for="max_pages">Max pages</label>
              <input
                type="number"
                id="max_pages"
                name="max_pages"
                min="1"
                max="{{ max_pages }}"
                value="{{ request.form.get('max_pages', default_max) }}"
              />
              <div class="hint">Between 1 and {{ max_pages }} (hard limit enforced).</div>
            </div>

            <div class="field-group">
              <span style="height: 18px;"></span>
              <div class="switch-row">
                <div class="switch-label">
                  <span class="switch-title">Headless mode</span>
                  <span class="switch-subtitle">Run Chrome without a window</span>
                </div>
                <label class="switch">
                  <input
                    type="checkbox"
                    name="headless"
                    value="1"
                    {% if request.form.get('headless', default_headless) %}checked{% endif %}
                  />
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="footer-row">
            <div class="footer-note">
              The scraper uses a generic “next” selector from <code>config.py</code>.<br/>
              Update it there if your site uses a custom pagination control.
            </div>
            <button class="submit-btn" type="submit">
              <span>⟳</span>
              Run scrape
            </button>
          </div>
        </form>

        {% if output_path %}
          <div class="result">
            Scrape complete. Markdown saved at:<br/>
            <strong>{{ output_path }}</strong>
          </div>
        {% endif %}
      </div>
    </div>
  </body>
</html>
"""


@app.route("/", methods=["GET", "POST"])
def index():
    output_path = None

    if request.method == "POST":
        start_url = (request.form.get("start_url") or "").strip()
        raw_max = request.form.get("max_pages") or ""
        headless_flag = request.form.get("headless")

        try:
            max_pages = int(raw_max) if raw_max else config.DEFAULT_MAX_PAGES
        except ValueError:
            max_pages = config.DEFAULT_MAX_PAGES

        max_pages = normalise_max_pages(max_pages)
        headless = bool(headless_flag) if headless_flag is not None else config.HEADLESS

        try:
            validated_url = validate_url(start_url)
            output_path = run_scraper(
                start_url=validated_url,
                max_pages=max_pages,
                headless=headless,
            )
            flash("Scrape completed successfully.", "success")
        except Exception as exc:  # noqa: BLE001
            flash(str(exc), "error")

    return render_template_string(
        INDEX_TEMPLATE,
        request=request,
        max_pages=config.MAX_PAGES,
        default_max=config.DEFAULT_MAX_PAGES,
        default_headless="checked" if config.HEADLESS else "",
        output_path=output_path,
    )


if __name__ == "__main__":
    app.run(debug=True)

