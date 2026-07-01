from __future__ import annotations

from typing import Set, List, Optional
from urllib.parse import urljoin, urlparse
from collections import deque
import time

from selenium.common.exceptions import TimeoutException, WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver

from helpers import navigation
import config


def _recover_after_navigation_timeout(driver: WebDriver) -> bool:
    """
    Attempt to recover the current tab/session after a navigation timeout.

    Returns True when the tab is still usable, False if it appears broken.
    """
    try:
        # Stop the current page load if the renderer is still busy.
        driver.execute_script("window.stop();")
    except Exception:
        pass

    try:
        # Quick sanity check that we can still talk to the renderer.
        driver.execute_script("return document.readyState")
        return True
    except Exception:
        return False

_EXCLUDE_PATTERNS = {
    "/admin",
    "/api/",
    "/cdn-cgi/",
    "/cdn/",
    "#",
    "javascript:",
    "tel:",
    "mailto:",
    "/logout",
    "/login",
    "/register",
    "/search",
    "page=?",
    ".pdf",
    ".zip",
    ".jpg",
    ".png",
}


def _is_internal_link(url: str, origin: str) -> bool:
    try:
        parsed_url = urlparse(url)
        parsed_origin = urlparse(origin)
        return parsed_url.netloc == parsed_origin.netloc
    except Exception:
        return False


def _should_exclude_link(url: str) -> bool:
    url_lower = url.lower()
    for pattern in _EXCLUDE_PATTERNS:
        if pattern in url_lower:
            return True
    return False


def _normalize_url(url: str, origin: str) -> Optional[str]:
    try:
        if "#" in url:
            url = url.split("#")[0]
        
        url = url.strip()
        if not url:
            return None
        
        absolute_url = urljoin(origin, url)
        
        if not _is_internal_link(absolute_url, origin):
            return None
        
        if _should_exclude_link(absolute_url):
            return None
        
        return absolute_url.rstrip("/")
    
    except Exception:
        return None


def safe_navigate(driver: WebDriver, url: str) -> bool:
    """Navigate safely with retries for transient timeout errors."""
    retries = getattr(config, "PAGE_LOAD_RETRIES", 3)
    delay = getattr(config, "PAGE_LOAD_RETRY_DELAY", 2.0)

    for attempt in range(1, retries + 1):
        try:
            driver.get(url)
            return True
        except (TimeoutException, WebDriverException) as exc:
            print(f"[warn] Timeout/navigate failed ({attempt}/{retries}) for {url}: {exc}")
            recover_ok = _recover_after_navigation_timeout(driver)
            if not recover_ok:
                try:
                    # Recreate a healthy tab if the current one got stuck.
                    current = driver.current_window_handle
                    driver.execute_script("window.open('about:blank', '_blank');")
                    new_handle = driver.window_handles[-1]
                    driver.switch_to.window(new_handle)
                    try:
                        driver.switch_to.window(current)
                        driver.close()
                    except Exception:
                        pass
                    driver.switch_to.window(new_handle)
                except Exception:
                    pass
            if attempt == retries:
                return False
            time.sleep(delay * attempt)
        except Exception as exc:
            print(f"[warn] Navigation failed for {url}: {exc}")
            return False

    return False


def extract_links_from_page(driver: WebDriver, current_url: str, origin: str) -> List[str]:
    """
    Extract all internal links from the current page.
    Uses JavaScript to avoid stale element reference errors.
    """
    links = []
    
    try:
        # Use JavaScript to extract all hrefs at once to avoid stale element references
        # This is more reliable than finding elements and then getting attributes
        script = """
        return Array.from(document.querySelectorAll('a[href]')).map(a => a.href).filter(h => h && h.length > 0);
        """
        hrefs = driver.execute_script(script)
        
        if not hrefs:
            return []
        
        for href in hrefs:
            if not href:
                continue
            
            normalized = _normalize_url(href, origin)
            if normalized:
                links.append(normalized)
        
        # Remove duplicates while preserving order
        seen = set()
        unique_links = []
        for link in links:
            if link not in seen:
                seen.add(link)
                unique_links.append(link)
        
        return unique_links
    
    except Exception as e:
        print(f"[warn] Error extracting links from {current_url}: {e}")
        # Fallback to element-based extraction with retry logic
        return _extract_links_fallback(driver, current_url, origin)


def _extract_links_fallback(driver: WebDriver, current_url: str, origin: str) -> List[str]:
    """
    Fallback method for extracting links using element-based approach with retry logic.
    Handles stale element references gracefully.
    """
    from selenium.common.exceptions import StaleElementReferenceException
    
    links = []
    max_retries = 3
    
    for attempt in range(max_retries):
        try:
            # Re-find elements on each attempt to get fresh references
            link_elements = driver.find_elements(By.CSS_SELECTOR, "a[href]")
            
            for element in link_elements:
                try:
                    href = element.get_attribute("href")
                    if not href:
                        continue
                    
                    normalized = _normalize_url(href, origin)
                    if normalized:
                        links.append(normalized)
                
                except StaleElementReferenceException:
                    # Skip stale elements and continue with the next one
                    continue
            
            # If we got here, dedup and return
            seen = set()
            unique_links = []
            for link in links:
                if link not in seen:
                    seen.add(link)
                    unique_links.append(link)
            
            return unique_links
        
        except StaleElementReferenceException:
            if attempt < max_retries - 1:
                # Wait a bit before retrying
                import time
                time.sleep(0.5)
                continue
    
    return []


def crawl_website(
    driver: WebDriver,
    start_url: str,
    max_pages: int,
    on_discover: Optional[callable] = None,
) -> List[str]:
    from selenium.common.exceptions import StaleElementReferenceException
    import time
    
    parsed = urlparse(start_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    
    discovered: List[str] = []
    visited: Set[str] = set()
    queue: deque = deque([start_url])
    
    print(f"[info] Starting crawl from {start_url}")
    print(f"[info] Domain: {origin}")
    print(f"[info] Max pages: {max_pages}")
    
    while queue and len(discovered) < max_pages:
        current_url = queue.popleft()
        if current_url in visited:
            continue
        
        visited.add(current_url)
        discovered.append(current_url)
        
        page_count = len(discovered)
        print(f"[info] Discovered page {page_count}: {current_url}")
        
        if on_discover:
            on_discover(current_url, page_count)
        try:
            if not safe_navigate(driver, current_url):
                print(f"[warn] Skipping {current_url} after navigation retries.")
                continue
            navigation.wait_for_page_ready(driver)
            # Add wait for DOM stability
            time.sleep(0.5)
            
            links = extract_links_from_page(driver, current_url, origin)
            for link in links:
                if link not in visited and len(discovered) + len(queue) < max_pages:
                    queue.append(link)
            
            print(f"[info]   Found {len(links)} internal links on this page")
        
        except StaleElementReferenceException as e:
            print(f"[warn] Stale element error on {current_url}, retrying: {e}")
            # Re-add to queue for retry
            queue.appendleft(current_url)
            visited.discard(current_url)
            discovered.pop()
            time.sleep(1)
        except Exception as e:
            print(f"[warn] Error loading {current_url}: {e}")
            continue
    
    print(f"[info] Crawl complete. Found {len(discovered)} pages.")
    return discovered


def crawl_website_batch(
    driver: WebDriver,
    start_url: str,
    max_pages: int,
    discovery_phase_pages: int = 20,
) -> List[str]:
    import time
    
    parsed = urlparse(start_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    
    discovered: List[str] = []
    visited: Set[str] = set()
    queue: deque = deque([start_url])
    pages_loaded = 0
    
    print(f"[info] Starting batch crawl from {start_url}")
    print(f"[info] Discovery phase: loading up to {discovery_phase_pages} pages")
    print(f"[info] Max total discoveries: {max_pages}")
    
    while queue and len(discovered) < max_pages:
        current_url = queue.popleft()
        
        if current_url in visited:
            continue
        
        visited.add(current_url)
        discovered.append(current_url)
        page_count = len(discovered)
        
        should_load = pages_loaded < discovery_phase_pages
        
        if should_load:
            print(f"[info] Loading page {page_count}: {current_url}")
            try:
                if not safe_navigate(driver, current_url):
                    print(f"[warn] Skipping {current_url} after navigation retries.")
                    continue
                navigation.wait_for_page_ready(driver)
                # Add wait for DOM stability
                time.sleep(0.5)
                pages_loaded += 1
                links = extract_links_from_page(driver, current_url, origin)
                
                for link in links:
                    if link not in visited and len(discovered) + len(queue) < max_pages:
                        queue.append(link)
                
                print(f"[info]   Found {len(links)} links")
            
            except Exception as e:
                print(f"[warn] Error loading {current_url}: {e}")
        else:
            print(f"[info] Queued page {page_count}: {current_url} (not loaded yet)")
    
    print(f"[info] Batch discovery complete. Found {len(discovered)} URLs.")
    print(f"[info] Pages loaded during discovery: {pages_loaded}")
    return discovered
