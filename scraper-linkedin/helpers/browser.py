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
    chrome_options.page_load_strategy = "eager"

    if headless:
        # Use the modern headless mode where supported.
        chrome_options.add_argument("--headless=new")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument(f"--window-size={config.WINDOW_SIZE}")
    else:
        # Headed: only maximize — combining --window-size with --start-maximized can confuse Chrome.
        chrome_options.add_argument("--start-maximized")

    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    driver.set_page_load_timeout(CHROME_PAGE_LOAD_TIMEOUT)
    driver.implicitly_wait(1)

    return driver

