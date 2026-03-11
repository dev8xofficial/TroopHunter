"""
CLI entry point for the Selenium web scraper.

Usage (basic):
    python main.py "https://example.com"

Usage (custom max pages and windowed browser):
    python main.py "https://example.com" --max-pages 10 --no-headless
"""

from __future__ import annotations

import argparse
import sys
import time
from typing import List
from urllib.parse import urlparse

from selenium.common.exceptions import WebDriverException

import config
from helpers import browser, extraction, navigation, output_md, sitemap


def parse_args(argv: List[str]) -> argparse.Namespace:
    """Parse command-line arguments for the scraper."""
    parser = argparse.ArgumentParser(
        description="Scrape a website using its sitemap (auto-discovered). "
        "Each page opens in a separate browser tab."
    )
    parser.add_argument("start_url", help="Website URL to scrape.")
    parser.add_argument(
        "--max-pages",
        type=int,
        default=config.DEFAULT_MAX_PAGES,
        help=f"Maximum number of pages to scrape (1-{config.MAX_PAGES}, default {config.DEFAULT_MAX_PAGES}).",
    )
    headless_group = parser.add_mutually_exclusive_group()
    headless_group.add_argument(
        "--headless",
        dest="headless",
        action="store_true",
        help="Force headless browser mode.",
    )
    headless_group.add_argument(
        "--no-headless",
        dest="headless",
        action="store_false",
        help="Force visible (non-headless) browser window.",
    )
    parser.set_defaults(headless=config.HEADLESS)
    return parser.parse_args(argv)


def normalise_max_pages(raw_value: int) -> int:
    """Clamp the requested maximum pages to a safe range."""
    if raw_value < 1:
        return 1
    if raw_value > config.MAX_PAGES:
        return config.MAX_PAGES
    return raw_value


def validate_url(url: str) -> str:
    """
    Perform a basic sanity check on the provided URL.

    Ensures that a scheme and network location are present so Selenium
    can navigate to it reliably.
    """
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(
            f"Invalid URL {url!r}. Please provide an absolute URL starting with http:// or https://."
        )
    return url


def _scrape_urls_in_tabs(driver, urls: List[str]) -> list:
    """
    Open each URL in a separate browser tab, extract content, and close the tab.

    The first URL reuses the main tab; subsequent URLs open new tabs.
    """
    pages_data = []
    main_tab = driver.current_window_handle

    for page_index, url in enumerate(urls, start=1):
        if page_index == 1:
            # Use the existing (main) tab for the first page.
            driver.get(url)
        else:
            # Open a new tab and switch to it.
            driver.execute_script("window.open(arguments[0], '_blank');", url)
            new_tab = [h for h in driver.window_handles if h != main_tab and h not in _seen]
            if new_tab:
                driver.switch_to.window(new_tab[0])
            else:
                # Fallback: switch to the last handle.
                driver.switch_to.window(driver.window_handles[-1])

        # Track which handles we've already used.
        _seen.add(driver.current_window_handle)

        navigation.wait_for_page_ready(driver)

        page_data = extraction.extract_page_data(
            driver=driver,
            page_number=page_index,
        )
        pages_data.append(page_data)
        print(f"[info] Scraped page {page_index}/{len(urls)}: {url}")

        # Close the tab (unless it's the main one) and switch back.
        if driver.current_window_handle != main_tab:
            driver.close()
            driver.switch_to.window(main_tab)

        # Small pause between pages.
        if page_index < len(urls):
            time.sleep(config.REQUEST_PAUSE_SECONDS)

    return pages_data


# Module-level set used by _scrape_urls_in_tabs for tab tracking.
_seen: set = set()


def run_scraper(
    start_url: str,
    max_pages: int,
    headless: bool,
) -> str:
    """
    Run the scraping loop and return the path to the generated Markdown file.

    1. Auto-discover the sitemap to get page URLs.
    2. Fall back to scraping just the start URL if no sitemap is found.
    3. Open each page in a separate browser tab.
    """
    global _seen
    _seen = set()  # Reset for each run.

    max_pages = normalise_max_pages(max_pages)

    # --- Discover pages via sitemap ---
    urls = sitemap.discover_sitemap_urls(start_url, limit=max_pages)
    if not urls:
        urls = [start_url]

    # --- Scrape in browser tabs ---
    driver = browser.create_driver(headless=headless)
    try:
        pages_data = _scrape_urls_in_tabs(driver, urls)

        markdown_content = output_md.render_markdown(
            pages_data=pages_data,
            start_url=start_url,
        )
        output_path = output_md.save_markdown(
            content=markdown_content,
            output_dir=config.OUTPUT_DIR,
            start_url=start_url,
        )
        return output_path
    finally:
        try:
            driver.quit()
        except WebDriverException:
            pass


def main(argv: List[str] | None = None) -> int:
    """Program entry point."""
    if argv is None:
        argv = sys.argv[1:]

    args = parse_args(argv)
    try:
        start_url = validate_url(args.start_url)
        output_path = run_scraper(
            start_url=start_url,
            max_pages=args.max_pages,
            headless=bool(args.headless),
        )
    except WebDriverException as exc:
        print(f"[error] Selenium/WebDriver error: {exc}", file=sys.stderr)
        return 1
    except ValueError as exc:
        print(f"[error] {exc}", file=sys.stderr)
        return 2
    except KeyboardInterrupt:
        print("\n[info] Interrupted by user.", file=sys.stderr)
        return 1

    print(f"[info] Scraping complete. Results written to: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
