"""
Page content extraction helpers.

These helpers walk the DOM in document order so that the scraped output
preserves the natural top-to-bottom reading flow of the original page.
"""

from __future__ import annotations

from typing import Any, Dict, List
from urllib.parse import urljoin

from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver


# Elements we care about, queried in one shot so Selenium returns them
# in DOM (document) order.
_CONTENT_SELECTOR = "h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote"


def _visible_text(element) -> str:
    """Return stripped visible text of an element, or empty string."""
    return (element.text or "").strip()


def extract_sequential_content(driver: WebDriver) -> List[Dict[str, Any]]:
    """
    Walk the page's DOM top-to-bottom and return a flat list of content blocks.

    Each block is a dict with at least a ``type`` key:
      - heading:  {"type": "heading", "level": "h2", "text": "..."}
      - text:     {"type": "text", "text": "..."}
      - list:     {"type": "list", "items": ["...", "..."]}
    """
    from selenium.common.exceptions import StaleElementReferenceException
    
    elements = driver.find_elements(By.CSS_SELECTOR, _CONTENT_SELECTOR)
    blocks: List[Dict[str, Any]] = []
    seen_texts: set = set()  # Deduplicate identical content

    for el in elements:
        try:
            tag = (el.tag_name or "").lower()
            text = _visible_text(el)
        except StaleElementReferenceException:
            continue

        if not text:
            continue

        # --- Headings ---
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            if text not in seen_texts:
                seen_texts.add(text)
                blocks.append({"type": "heading", "level": tag, "text": text})

        # --- Lists (ul / ol) ---
        elif tag in ("ul", "ol"):
            items = []
            try:
                for li in el.find_elements(By.CSS_SELECTOR, ":scope > li"):
                    try:
                        li_text = _visible_text(li)
                        if li_text and li_text not in seen_texts:
                            seen_texts.add(li_text)
                            items.append(li_text)
                    except StaleElementReferenceException:
                        continue
            except StaleElementReferenceException:
                pass
                
            if items:
                blocks.append({"type": "list", "items": items})

        # --- Paragraphs / blockquotes → plain text ---
        else:
            if text not in seen_texts:
                seen_texts.add(text)
                blocks.append({"type": "text", "text": text})

    return blocks


def get_meta_description(driver: WebDriver) -> str | None:
    """Return the page's meta description content if present."""
    elements = driver.find_elements(By.CSS_SELECTOR, "meta[name='description']")
    for el in elements:
        content = el.get_attribute("content")
        if content:
            content = content.strip()
            if content:
                return content
    return None


def extract_page_data(driver: WebDriver, page_number: int) -> Dict[str, Any]:
    """
    Extract a structured snapshot of the current page.

    Returns sequential content blocks that preserve the page's reading order.
    """
    url = driver.current_url
    title = (driver.title or "").strip()

    content = extract_sequential_content(driver)
    meta_description = get_meta_description(driver)

    return {
        "page_number": page_number,
        "url": url,
        "title": title or url,
        "meta_description": meta_description,
        "content": content,
    }
