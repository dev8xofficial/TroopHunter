"""
Configuration values for the Selenium web scraper.

Adjust these values to better match the structure and behavior of the site
you are scraping.
"""

from __future__ import annotations

MAX_PAGES: int = 100
DEFAULT_MAX_PAGES: int = 20
CONCURRENT_TABS: int = 5

PAGE_LOAD_TIMEOUT: int = 60
PAGE_LOAD_RETRIES: int = 3
PAGE_LOAD_RETRY_DELAY: float = 2.0
ELEMENT_WAIT_TIMEOUT: int = 15

# If sitemap returns fewer than this many URLs, augment with link crawling.
MIN_SITEMAP_URLS_BEFORE_CRAWL: int = 3

HEADLESS: bool = True
WINDOW_SIZE: str = "1600,900"

# Pause between opening tabs / requests (seconds) to reduce rate limiting risk.
REQUEST_PAUSE_SECONDS: float = 2.0

MAIN_CONTENT_SELECTOR: str = "body"

OUTPUT_DIR: str = "output"
