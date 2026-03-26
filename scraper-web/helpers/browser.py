"""
Browser / WebDriver setup utilities.

This module is responsible for creating a configured Selenium WebDriver
instance using Chrome and webdriver-manager so that users do not need to
manage ChromeDriver manually.
"""

from __future__ import annotations

from typing import Final

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.remote.webdriver import WebDriver
from webdriver_manager.chrome import ChromeDriverManager

import config


CHROME_PAGE_LOAD_TIMEOUT: Final[int] = config.PAGE_LOAD_TIMEOUT


def create_driver(headless: bool = True) -> WebDriver:
    """
    Create and configure a Chrome WebDriver instance.

    The returned driver is configured for headless or headed mode, sets a
    window size, and applies sensible timeouts suitable for scraping.
    """
    chrome_options = Options()
    # Don't block on all subresources; enough for scraping while reducing renderer timeouts.
    chrome_options.page_load_strategy = "eager"

    if headless:
        # Use the modern headless mode where supported.
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
    else:
        # Headed mode: make the window visible and prominent.
        chrome_options.add_argument("--start-maximized")

    chrome_options.add_argument(f"--window-size={config.WINDOW_SIZE}")
    
    # Additional stability improvements for concurrent tab handling
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--enable-features=NetworkService,NetworkServiceInProcess")
    chrome_options.add_argument("--disable-background-networking")
    chrome_options.add_argument("--disable-renderer-backgrounding")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Increase timeouts for stability with concurrent tabs
    driver.set_page_load_timeout(CHROME_PAGE_LOAD_TIMEOUT)
    driver.set_script_timeout(CHROME_PAGE_LOAD_TIMEOUT)
    # Remove implicit wait as it can cause issues with concurrent operations
    # Instead, use explicit waits where needed
    driver.implicitly_wait(0)

    return driver

