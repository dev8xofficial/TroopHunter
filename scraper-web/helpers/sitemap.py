"""
Sitemap discovery and URL extraction helpers.

Automatically finds and parses XML sitemaps from a website, supporting both
simple <urlset> sitemaps and <sitemapindex> files.
"""

from __future__ import annotations

from typing import List
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError
import xml.etree.ElementTree as ET

_UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0 Safari/537.36"
)

# Common sitemap paths to probe, in priority order.
_SITEMAP_PATHS = ["/sitemap.xml", "/sitemap_index.xml"]


def _fetch_xml(url: str) -> ET.Element | None:
    """Fetch a URL and return the parsed XML root, or None on failure."""
    try:
        req = Request(url, headers={"User-Agent": _UA})
        with urlopen(req, timeout=15) as response:
            data = response.read()
        return ET.fromstring(data)
    except (HTTPError, URLError, ET.ParseError, OSError):
        return None


def _extract_urls_from_urlset(root: ET.Element, limit: int) -> List[str]:
    """Pull <loc> entries from a <urlset> element."""
    urls: List[str] = []
    for url_el in root.findall(".//{*}url"):
        loc_el = url_el.find("{*}loc")
        if loc_el is None or not (loc_el.text or "").strip():
            continue
        urls.append(loc_el.text.strip())
        if len(urls) >= limit:
            break
    return urls


def _extract_urls_from_sitemapindex(root: ET.Element, limit: int) -> List[str]:
    """Fetch child sitemaps from a <sitemapindex> and collect URLs."""
    urls: List[str] = []
    for sm_el in root.findall(".//{*}sitemap"):
        loc_el = sm_el.find("{*}loc")
        if loc_el is None or not (loc_el.text or "").strip():
            continue
        child_url = loc_el.text.strip()
        child_root = _fetch_xml(child_url)
        if child_root is None:
            continue
        remaining = limit - len(urls)
        if remaining <= 0:
            break
        urls.extend(_extract_urls_from_urlset(child_root, remaining))
    return urls[:limit]


def fetch_sitemap_urls(sitemap_url: str, limit: int | None = None) -> List[str]:
    """
    Download a sitemap XML document and return a list of page URLs.

    Handles both <urlset> and <sitemapindex> formats.
    """
    effective_limit = limit or 9999
    root = _fetch_xml(sitemap_url)
    if root is None:
        return []

    tag = root.tag.lower()

    if tag.endswith("sitemapindex"):
        return _extract_urls_from_sitemapindex(root, effective_limit)
    if tag.endswith("urlset"):
        return _extract_urls_from_urlset(root, effective_limit)

    return []


def discover_sitemap_urls(start_url: str, limit: int) -> List[str]:
    """
    Automatically discover and extract page URLs from a website's sitemap.

    Probes common sitemap paths (``/sitemap.xml``, ``/sitemap_index.xml``)
    at the site's origin.  Returns the discovered URLs (up to *limit*), or
    an empty list if no sitemap is found.
    """
    parsed = urlparse(start_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"

    for path in _SITEMAP_PATHS:
        candidate = origin + path
        print(f"[info] Trying sitemap: {candidate}")
        urls = fetch_sitemap_urls(candidate, limit=limit)
        if urls:
            print(f"[info] Found {len(urls)} URL(s) from sitemap.")
            return urls

    print("[info] No sitemap found; will scrape start URL only.")
    return []
