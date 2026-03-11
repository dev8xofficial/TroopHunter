"""
Configuration values for the LinkedIn scraper.
"""

from __future__ import annotations

# Safe default for how many times to scroll down to trigger lazy loading.
MAX_SCROLLS: int = 15

# Used to randomly pause between scrolls
MIN_SCROLL_PAUSE: float = 0.5
MAX_SCROLL_PAUSE: float = 2.0

PAGE_LOAD_TIMEOUT: int = 30
ELEMENT_WAIT_TIMEOUT: int = 15

HEADLESS: bool = True
WINDOW_SIZE: str = "1600,900"

MAIN_CONTENT_SELECTOR: str = "body"

OUTPUT_DIR: str = "output"
