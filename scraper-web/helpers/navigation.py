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


def _page_has_loading_overlay(driver: WebDriver) -> bool:
    script = """
    const selectors = arguments[0];
    const texts = arguments[1];
    const bodyText = (document.body && document.body.innerText || '').toLowerCase();

    for (const selector of selectors) {
        const elements = Array.from(document.querySelectorAll(selector));
        if (elements.some(el => {
            const style = window.getComputedStyle(el);
            const visible = el.offsetParent !== null && style.visibility !== 'hidden' && style.display !== 'none';
            const rect = el.getBoundingClientRect();
            return visible && rect.width > 0 && rect.height > 0;
        })) {
            return true;
        }
    }

    for (const text of texts) {
        if (bodyText.includes(text)) {
            return true;
        }
    }

    return false;
    """
    return bool(
        driver.execute_script(
            script,
            config.LOADER_INDICATOR_SELECTORS,
            config.LOADER_TEXT_PATTERNS,
        )
    )


def wait_for_page_ready(driver: WebDriver) -> None:
    """
    Block until the current page is reasonably ready for scraping.

    This waits for the browser's document.readyState to become 'complete',
    for the main content selector to be present in the DOM, and for common
    loading/verification overlays to disappear.
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

    try:
        WebDriverWait(
            driver,
            config.LOADER_WAIT_TIMEOUT,
            poll_frequency=config.PAGE_READY_POLL_INTERVAL,
        ).until_not(_page_has_loading_overlay)
    except TimeoutException:
        # If a loader stays visible beyond the timeout, proceed anyway.
        pass
