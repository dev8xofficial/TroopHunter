"""
Flask web interface for the LinkedIn Public Profile Scraper.

Run with:
    python web_app.py

Then open:
    http://127.0.0.1:5000/
"""

from __future__ import annotations

from flask import Flask, flash, render_template_string, request

import config
from main import run_scraper, validate_url

app = Flask(__name__)
app.secret_key = "change-me-in-production"

INDEX_TEMPLATE = """
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>LinkedIn Profile Scraper</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      :root {
        --bg: #0f172a;
        --card-bg: #1e293b;
        --accent: #0ea5e9;
        --accent-soft: rgba(14, 165, 233, 0.15);
        --text: #f8fafc;
        --muted: #94a3b8;
        --radius: 12px;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        font-family: system-ui, sans-serif;
        background: var(--bg);
        color: var(--text);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      .card {
        width: 100%;
        max-width: 600px;
        border-radius: var(--radius);
        background: var(--card-bg);
        padding: 30px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      }
      .title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 5px;
      }
      .subtitle {
        font-size: 0.9rem;
        color: var(--muted);
        margin-bottom: 25px;
      }
      form {
        display: grid;
        gap: 20px;
      }
      label {
        font-size: 0.85rem;
        font-weight: 600;
        text-transform: uppercase;
        color: var(--muted);
        margin-bottom: 8px;
        display: block;
      }
      input[type="text"],
      input[type="number"] {
        width: 100%;
        border-radius: 8px;
        border: 1px solid #334155;
        padding: 12px;
        background: #0f172a;
        color: var(--text);
        font-size: 1rem;
        outline: none;
      }
      input[type="text"]:focus,
      input[type="number"]:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 1px var(--accent-soft);
      }
      .hint {
        font-size: 0.8rem;
        color: var(--muted);
        margin-top: 6px;
      }
      .switch-row {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .switch {
        position: relative;
        width: 44px;
        height: 24px;
        display: inline-block;
      }
      .switch input { opacity: 0; width: 0; height: 0; }
      .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background-color: #334155;
        border-radius: 999px;
        transition: 0.2s;
      }
      .slider:before {
        content: "";
        position: absolute;
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        border-radius: 50%;
        transition: 0.2s;
      }
      input:checked + .slider { background-color: var(--accent); }
      input:checked + .slider:before { transform: translateX(20px); }
      
      .submit-btn {
        border: none;
        border-radius: 8px;
        padding: 14px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        color: white;
        background: var(--accent);
        transition: opacity 0.2s;
      }
      .submit-btn:hover { opacity: 0.9; }
      
      .flash {
        margin-bottom: 20px;
        padding: 12px;
        border-radius: 8px;
        font-size: 0.9rem;
      }
      .flash-error { background: rgba(248, 113, 113, 0.1); border: 1px solid rgba(248,113,113,0.3); color: #fca5a5; }
      .flash-success { background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52,211,153,0.3); color: #6ee7b7; }
      .result {
        margin-top: 20px;
        padding: 15px;
        border-radius: 8px;
        background: var(--accent-soft);
        border: 1px solid rgba(14,165,233,0.3);
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="title">LinkedIn Public Profile Scraper</div>
      <div class="subtitle">Extract text and posts via human-like scrolling. No login required.</div>

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
        <div>
          <label for="url">LinkedIn URL</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="https://pk.linkedin.com/company/developers-inc"
            required
            value="{{ request.form.get('url', '') }}"
          />
        </div>

        <div>
          <label for="max_scrolls">Max Scroll Increments</label>
          <input
            type="number"
            id="max_scrolls"
            name="max_scrolls"
            min="1"
            max="100"
            value="{{ request.form.get('max_scrolls', default_scrolls) }}"
          />
          <div class="hint">How many times the bot should scroll down to force lazy-loaded posts to render.</div>
        </div>

        <div class="switch-row">
          <label class="switch">
            <input
              type="checkbox"
              name="headless"
              value="1"
              {% if request.form.get('headless', default_headless) %}checked{% endif %}
            />
            <span class="slider"></span>
          </label>
          <span style="font-size: 0.9rem; font-weight: 500;">Run Headless (Invisible Browser)</span>
        </div>

        <button class="submit-btn" type="submit">Start Scraping</button>
      </form>

      {% if output_path %}
        <div class="result">
          Scrape complete. Markdown saved at:<br/>
          <strong>{{ output_path }}</strong>
        </div>
      {% endif %}
    </div>
  </body>
</html>
"""


@app.route("/", methods=["GET", "POST"])
def index():
    output_path = None

    if request.method == "POST":
        url = (request.form.get("url") or "").strip()
        raw_scrolls = request.form.get("max_scrolls") or ""
        headless_flag = request.form.get("headless")

        try:
            max_scrolls = int(raw_scrolls) if raw_scrolls else config.MAX_SCROLLS
        except ValueError:
            max_scrolls = config.MAX_SCROLLS

        headless = bool(headless_flag) if headless_flag is not None else config.HEADLESS

        try:
            validated_url = validate_url(url)
            output_path = run_scraper(
                url=validated_url,
                max_scrolls=max_scrolls,
                headless=headless,
            )
            flash("Scrape completed successfully.", "success")
        except Exception as exc:  # noqa: BLE001
            flash(str(exc), "error")

    return render_template_string(
        INDEX_TEMPLATE,
        request=request,
        default_scrolls=config.MAX_SCROLLS,
        default_headless="checked" if config.HEADLESS else "",
        output_path=output_path,
    )


if __name__ == "__main__":
    app.run(debug=True)
