"""
CLI entry point for the LinkedIn Public Profile Scraper.

Usage:
    python main.py "https://pk.linkedin.com/company/developers-inc" --no-headless
"""

from __future__ import annotations

import argparse
import sys
from typing import List
from urllib.parse import urlparse

from selenium.common.exceptions import WebDriverException

import config
from helpers import browser, extraction, navigation, output_md


def parse_args(argv: List[str]) -> argparse.Namespace:
    """Parse command-line arguments for the LinkedIn scraper."""
    parser = argparse.ArgumentParser(
        description="Scrape a LinkedIn public profile by scrolling like a human."
    )
    parser.add_argument(
        "url", 
        help="LinkedIn URL to scrape (e.g. https://linkedin.com/company/example)"
    )
    parser.add_argument(
        "--max-scrolls",
        type=int,
        default=config.MAX_SCROLLS,
        help=f"Maximum number of scroll increments (default {config.MAX_SCROLLS}).",
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


def validate_url(url: str) -> str:
    """
    Perform a basic sanity check on the provided URL.
    """
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or "linkedin.com" not in parsed.netloc:
        print("[warn] URL doesn't look like a LinkedIn URL. Proceeding anyway...", file=sys.stderr)
    return url


def run_scraper(
    url: str,
    max_scrolls: int,
    headless: bool,
) -> str:
    """
    Run the scraping pipeline for a single LinkedIn profile.
    
    1. Open the page
    2. Scroll like a human to load dynamic content
    3. Extract DOM sequentially
    4. Save to Markdown
    """
    driver = browser.create_driver(headless=headless)
    
    try:
        print(f"[info] Navigating to: {url}")
        driver.get(url)
        navigation.wait_for_page_ready(driver)
        
        # Trigger lazy-loaded posts
        navigation.scroll_like_human(driver, max_scrolls=max_scrolls)
        
        # Extract the page DOM after scrolling
        print("[info] Extracting page content...")
        page_data = extraction.extract_page_data(driver, page_number=1)
        
        # We wrap page_data in a list because output_md expects Iterable[Dict]
        markdown_content = output_md.render_markdown(
            pages_data=[page_data],
            start_url=url,
        )
        
        output_path = output_md.save_markdown(
            content=markdown_content,
            output_dir=config.OUTPUT_DIR,
            start_url=url,
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
        url = validate_url(args.url)
        output_path = run_scraper(
            url=url,
            max_scrolls=args.max_scrolls,
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
