"""
Configuration values for the Selenium web scraper.

Adjust these values to better match the structure and behavior of the site
you are scraping.
"""

from __future__ import annotations

MAX_PAGES: int = 100
DEFAULT_MAX_PAGES: int = 20

PAGE_LOAD_TIMEOUT: int = 30
ELEMENT_WAIT_TIMEOUT: int = 15

HEADLESS: bool = True
WINDOW_SIZE: str = "1600,900"

# Pause between opening tabs / requests (seconds) to reduce rate limiting risk.
REQUEST_PAUSE_SECONDS: float = 2.0

MAIN_CONTENT_SELECTOR: str = "body"

OUTPUT_DIR: str = "output"
