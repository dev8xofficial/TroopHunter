# LinkedIn Public Profile Scraper

A Selenium-based Python scraper designed to extract information and recent posts from public LinkedIn company pages **without needing to log in**.

Because LinkedIn uses infinite scrolling and lazy-loads content, this scraper simulates a human reading the page (randomized downward scrolling, pauses) to force the DOM to render posts naturally before extracting the underlying text sequentially.

## Features

- **No login required** — operates on public-facing URLs.
- **Human-like scrolling** — randomly sized scrolls and pauses to trigger lazy-loaded posts and bypass basic bot checks.
- **Sequential content extraction** — preserves the page's top-to-bottom reading order in a flat Markdown file.
- **Domain-based output** — cleanly saved to `output/linkedin.com.md`.

## Prerequisites

- **Python** 3.9 or newer.
- **Google Chrome** installed.

> **Note**: This tool utilizes `webdriver-manager` to fetch matching ChromeDrivers automatically.

## Installation

```bash
python -m venv venv

# Windows: Use CMD terminal

venv\Scripts\activate.bat

# Unix / macOS
source venv/bin/activate

pip install -r requirements.txt

```

## Usage (CLI)

Activate your virtual environment, then run:

```bash
python main.py "https://www.linkedin.com/company/sicklecell101/" --max-scrolls 30 --no-headless
```

The scraper will:
1. Open the specified public LinkedIn URL.
2. Scroll downward in random increments, waiting seconds in between.
3. Stop when it reaches the absolute bottom OR the `--max-scrolls` limit.
4. Extract all paragraphs, headings, blockquotes, and lists in reading order.

Optional flags:

- `--max-scrolls N` – How many times to issue a scroll-down command (default `15`).
- `--headless` – Force headless mode.
- `--no-headless` – Force visible browser window (highly recommended to visually confirm LinkedIn doesn't throw a generic Auth wall).

## Usage (Web page)

You can also run this via a simple local Flask app:

```bash
python3 web_app.py
```

Then visit `http://127.0.0.1:5000/`. Enter the LinkedIn URL and your max-scroll count and let the tool do the rest.

## Why Sequential DOM Extraction?

By grabbing exactly what the browser paints (`h1`-`h6`, `p`, `ul`, `ol` tags) from top-to-bottom, we sidestep the need to maintain fragile, highly specific CSS selectors (`.feed-shared-update-v2__description` etc.) which LinkedIn frequently obfuscates and rotates. 

The resulting Markdown resembles a clean article summarizing the company description, headers, and any visible posts.
