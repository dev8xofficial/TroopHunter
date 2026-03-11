"""
Navigation helpers.

This module contains utilities for waiting until a page is ready for
scraping.
"""

from __future__ import annotations

from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import config


def wait_for_page_ready(driver: WebDriver) -> None:
    """
    Block until the current page is reasonably ready for scraping.

    This waits for the browser's document.readyState to become 'complete'
    and for the main content selector to be present in the DOM.
    """
    try:
        WebDriverWait(driver, config.PAGE_LOAD_TIMEOUT).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
    except TimeoutException:
        # Continue anyway; some sites never report 'complete' cleanly.
        pass

    try:
        WebDriverWait(driver, config.ELEMENT_WAIT_TIMEOUT).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, config.MAIN_CONTENT_SELECTOR)
            )
        )
    except TimeoutException:
        # If the main selector never appears, we still proceed with whatever is available.
        pass
