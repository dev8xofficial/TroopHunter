from __future__ import annotations

from typing import Set, List, Optional
from urllib.parse import urljoin, urlparse
from collections import deque

from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webdriver import WebDriver

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


def extract_links_from_page(driver: WebDriver, current_url: str, origin: str) -> List[str]:
    links = []
    
    try:
        link_elements = driver.find_elements(By.CSS_SELECTOR, "a[href]")
        
        for element in link_elements:
            href = element.get_attribute("href")
            if not href:
                continue
            
            normalized = _normalize_url(href, origin)
            if normalized:
                links.append(normalized)
        seen = set()
        unique_links = []
        for link in links:
            if link not in seen:
                seen.add(link)
                unique_links.append(link)
        
        return unique_links
    
    except Exception as e:
        print(f"[warn] Error extracting links from {current_url}: {e}")
        return []


def crawl_website(
    driver: WebDriver,
    start_url: str,
    max_pages: int,
    on_discover: Optional[callable] = None,
) -> List[str]:
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
            driver.get(current_url)
            links = extract_links_from_page(driver, current_url, origin)
            for link in links:
                if link not in visited and len(discovered) + len(queue) < max_pages:
                    queue.append(link)
            
            print(f"[info]   Found {len(links)} internal links on this page")
        
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
                driver.get(current_url)
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
