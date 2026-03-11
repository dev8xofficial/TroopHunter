"""
Navigation helpers for LinkedIn profile scraping.

Contains utilities for waiting until a page is ready and simulating human scrolling
to trigger lazy-loaded posts and components.
"""

from __future__ import annotations

import random
import time

from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

import config


def wait_for_page_ready(driver: WebDriver) -> None:
    """
    Block until the current page is reasonably ready.
    """
    try:
        WebDriverWait(driver, config.PAGE_LOAD_TIMEOUT).until(
            lambda d: d.execute_script("return document.readyState") == "complete"
        )
    except TimeoutException:
        pass

    try:
        WebDriverWait(driver, config.ELEMENT_WAIT_TIMEOUT).until(
            EC.presence_of_element_located(
                (By.CSS_SELECTOR, config.MAIN_CONTENT_SELECTOR)
            )
        )
    except TimeoutException:
        pass


def scroll_like_human(driver: WebDriver, max_scrolls: int) -> None:
    """
    Scroll down the page incrementally to trigger data loading, mimicking human reading speeds.
    """
    print("[info] Simulating human scrolling to load dynamic content...")
    last_height = driver.execute_script("return document.body.scrollHeight")
    consecutive_no_change = 0

    for i in range(1, max_scrolls + 1):
        # Scroll down by a somewhat random large step (half to full screen height approx)
        scroll_step = random.randint(300, 800)
        driver.execute_script(f"window.scrollBy(0, {scroll_step});")

        # Pause randomly to let content load and look human
        pause = random.uniform(config.MIN_SCROLL_PAUSE, config.MAX_SCROLL_PAUSE)
        time.sleep(pause)

        # Periodically check if we hit the actual bottom bounds
        if i % 3 == 0:
            new_height = driver.execute_script("return document.body.scrollHeight")
            # Account for slight floating shifts, padding, etc.
            current_y = driver.execute_script("return window.scrollY + window.innerHeight")
            
            if current_y >= new_height - 50:
                consecutive_no_change += 1
                if consecutive_no_change >= 2:
                    print(f"[info] Reached bottom of page after {i} scrolls.")
                    break
            else:
                consecutive_no_change = 0

            last_height = new_height
