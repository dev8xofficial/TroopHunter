# Selenium Web Scraper

A small, ready-to-run Python project that uses Selenium to scrape a website by **auto-discovering its sitemap**, visiting each page in a **separate browser tab**, and saving all results into a single **Markdown** file named after the website domain.

## Features

- **Automatic sitemap discovery** — probes `/sitemap.xml` and `/sitemap_index.xml`.
- **Separate browser tabs** — each page opens in its own tab (visible in `--no-headless` mode).
- **Sequential content extraction** — preserves the page's top-to-bottom reading order.
- **Domain-based output** — one file per website (e.g. `output/treeraise.com.md`), overwritten on re-run.
- Handles sites with **loading delays** via explicit waits.

## Project Structure

- `main.py` – CLI entry point.
- `config.py` – Central configuration (limits, timeouts, output paths).
- `helpers/`
  - `browser.py` – Selenium WebDriver creation and teardown.
  - `navigation.py` – Page load waiting.
  - `extraction.py` – Content extraction in DOM order.
  - `output_md.py` – Markdown rendering and file writing.
  - `sitemap.py` – Sitemap auto-discovery and URL extraction.
- `web_app.py` – Optional Flask web interface.
- `requirements.txt` – Python dependencies.

## Prerequisites

- **Python** 3.9 or newer.
- **Google Chrome** installed.
- Ability to install Python packages from PyPI (internet access).

The project uses `webdriver-manager` to download and manage the matching ChromeDriver automatically, so you do **not** need to install ChromeDriver manually.

## Installation

From the project root:

```bash
python3 -m venv venv

# Windows: Use CMD terminal
venv\Scripts\activate.bat

# Unix / macOS
source venv/bin/activate

pip install -r requirements.txt
```

## Configuration

Open `config.py` to adjust behavior:

- **Scraping limits**
  - `MAX_PAGES` – Hard upper bound (default `100`).
  - `DEFAULT_MAX_PAGES` – Default when `--max-pages` is omitted.
  - `CONCURRENT_TABS` – Default number of tabs to open simultaneously for faster scraping.
- **Browser settings**
  - `HEADLESS` – Default headless mode (`True` or `False`).
  - `WINDOW_SIZE` – Window size string like `"1600,900"`.
- **Timing**
  - `PAGE_LOAD_TIMEOUT` – Page load timeout in seconds.
  - `ELEMENT_WAIT_TIMEOUT` – Explicit wait timeout for elements.
  - `REQUEST_PAUSE_SECONDS` – Pause between tab opens to reduce rate limiting.
- **Content**
  - `MAIN_CONTENT_SELECTOR` – CSS selector waited on to consider the page "ready" (defaults to `"body"`).

## Usage (CLI)

Activate your virtual environment, then run:

```bash
python3 main.py "https://example.com"
```

The scraper will:

1. Try to find the site's sitemap at `/sitemap.xml` or `/sitemap_index.xml`.
2. If found, visit each listed page (up to `--max-pages`).
3. If no sitemap exists, scrape just the start URL.
4. Each page opens in a separate browser tab.

Optional flags:

- `--max-pages N` – Maximum pages to scrape (clamped between 1 and 100).
- `--concurrent-tabs N` – Number of pages to load concurrently in browser tabs.
- `--headless` – Force headless mode.
- `--no-headless` – Force visible (non-headless) browser window.

Examples:

```bash
# Scrape up to 10 pages in headless mode, loading 5 at a time
python3 main.py "https://example.com" --max-pages 10 --concurrent-tabs 5 --headless

# Scrape up to 15 pages with a visible browser window
python main.py "https://www.jollydeck.com/" --max-pages 15 --concurrent-tabs 5 --no-headless

# Simple crawl: discover & scrape
python main.py "https://www.jollydeck.com/" --max-pages 50 --concurrent-tabs 5 --no-headless
```

## Usage (Web page)

You can also drive the scraper through a small web page instead of the CLI.

From the project root (after activating your virtual environment and installing dependencies):

```bash
python3 web_app.py
```

Then open `http://127.0.0.1:5000/` in your browser.

The page lets you:

- Enter the **website URL**.
- Choose **max pages** (clamped between 1 and 100).
- Choose **concurrent tabs** to load pages in batches.
- Toggle **headless mode**.

The scraper auto-discovers the sitemap and runs the same logic as the CLI.

## Output

After a run, the scraper writes a Markdown file to the `output/` directory:

- Directory: `output/` (configurable via `OUTPUT_DIR` in `config.py`).
- File name: derived from the website domain (e.g. `treeraise.com.md`).
- Re-running the scraper for the same site **overwrites** the previous file.

Content is written in **top-to-bottom document order** — headings are followed by their related paragraphs, preserving the page's natural reading flow.

## Notes

- The scraper automatically discovers sitemaps; no manual configuration needed.
- The script respects a hard maximum of **50 pages**, even if you request more.
