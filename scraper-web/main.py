"""
CLI entry point for the Selenium web scraper.

Usage (basic):
    python main.py "https://example.com"

Usage (custom max pages and windowed browser):
    python main.py "https://example.com" --max-pages 10 --no-headless
"""

from __future__ import annotations

import argparse
import sys
import time
from typing import List
from urllib.parse import urlparse

from selenium.common.exceptions import WebDriverException

import config
from helpers import browser, extraction, navigation, output_md, sitemap, crawler


def parse_args(argv: List[str]) -> argparse.Namespace:
    """Parse command-line arguments for the scraper."""
    parser = argparse.ArgumentParser(
        description="Scrape a website using its sitemap (auto-discovered). "
        "Each page opens in a separate browser tab."
    )
    parser.add_argument("start_url", help="Website URL to scrape.")
    parser.add_argument(
        "--max-pages",
        type=int,
        default=config.DEFAULT_MAX_PAGES,
        help=f"Maximum number of pages to scrape (1-{config.MAX_PAGES}, default {config.DEFAULT_MAX_PAGES}).",
    )
    parser.add_argument(
        "--concurrent-tabs",
        type=int,
        default=config.CONCURRENT_TABS,
        help=f"Number of tabs to load concurrently (default {config.CONCURRENT_TABS}).",
    )
    headless_group = parser.add_mutually_exclusive_group()
    headless_group.add_argument(
        "--headless",
        dest="headless",
        action="store_true",
        help="Force headless browser mode.",
    )
    headless_group.add_argument(
        "--no-headless",
        dest="headless",
        action="store_false",
        help="Force visible (non-headless) browser window.",
    )
    parser.set_defaults(headless=config.HEADLESS)
    return parser.parse_args(argv)


def normalise_max_pages(raw_value: int) -> int:
    """Clamp the requested maximum pages to a safe range."""
    if raw_value < 1:
        return 1
    if raw_value > config.MAX_PAGES:
        return config.MAX_PAGES
    return raw_value


def validate_url(url: str) -> str:
    """
    Perform a basic sanity check on the provided URL.

    Ensures that a scheme and network location are present so Selenium
    can navigate to it reliably.
    """
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError(
            f"Invalid URL {url!r}. Please provide an absolute URL starting with http:// or https://."
        )
    return url


def _scrape_urls_in_tabs(driver, urls: List[str], concurrent_tabs: int) -> list:
    """
    Load a batch of URLs into separate browser tabs concurrently,
    then extract content sequentially from each tab.
    """
    from selenium.common.exceptions import StaleElementReferenceException, NoSuchWindowException
    
    pages_data = []
    main_tab = driver.current_window_handle
    
    # Process URLs in chunks of size `concurrent_tabs`
    for batch_start in range(0, len(urls), concurrent_tabs):
        batch_urls = urls[batch_start:batch_start + concurrent_tabs]
        batch_handles = []  # Maps a window handle to its page info: (url, page_index)
        
        # 1. Open all tabs for this batch
        for i, url in enumerate(batch_urls):
            page_index = batch_start + i + 1
            try:
                if page_index == 1:
                    # The very first page loads in the existing main tab
                    if not crawler.safe_navigate(driver, url):
                        print(f"[warn] Skipping first page {url} after retries")
                        continue
                    batch_handles.append((main_tab, url, page_index))
                else:
                    # Open a new tab with a slight delay to ensure stability
                    time.sleep(0.3)
                    driver.execute_script("window.open(arguments[0], '_blank');", url)
                    # Find the newly created handle
                    new_tabs = [h for h in driver.window_handles if h != main_tab and h not in _seen]
                    if new_tabs:
                        handle = new_tabs[0]
                        _seen.add(handle)
                        batch_handles.append((handle, url, page_index))
                    else:
                        # Fallback
                        handle = driver.window_handles[-1]
                        _seen.add(handle)
                        batch_handles.append((handle, url, page_index))
            except Exception as e:
                print(f"[warn] Failed to open tab for {url}: {e}")
                continue
        
        # 2. Iterate through opened tabs, wait for ready, and extract
        for handle, url, page_index in batch_handles:
            try:
                driver.switch_to.window(handle)
            except NoSuchWindowException:
                print(f"[warn] Tab for page {page_index} no longer exists, skipping")
                continue
            
            try:
                # Wait for page to be ready before extracting
                navigation.wait_for_page_ready(driver)
                # Additional wait to ensure DOM is stable
                time.sleep(0.5)
                
                page_data = extraction.extract_page_data(
                    driver=driver,
                    page_number=page_index,
                )
                pages_data.append(page_data)
                print(f"[info] Scraped page {page_index}/{len(urls)}: {url}")
            
            except (StaleElementReferenceException, Exception) as e:
                print(f"[warn] Error extracting page {page_index}: {e}. Retrying...")
                try:
                    # Retry once after a brief wait
                    time.sleep(1)
                    page_data = extraction.extract_page_data(
                        driver=driver,
                        page_number=page_index,
                    )
                    pages_data.append(page_data)
                    print(f"[info] Scraped page {page_index}/{len(urls)}: {url} (retry)")
                except Exception as retry_error:
                    print(f"[error] Failed to extract page {page_index} on retry: {retry_error}")
            
            finally:
                # Close the tab (unless it's the reusable main tab)
                if handle != main_tab:
                    try:
                        driver.close()
                    except Exception:
                        pass
                
        # Switch back to the main tab for the next batch
        try:
            driver.switch_to.window(main_tab)
        except NoSuchWindowException:
            print(f"[warn] Main tab closed unexpectedly")
            return pages_data
        
        # Small pause between batches
        if batch_start + concurrent_tabs < len(urls):
            time.sleep(config.REQUEST_PAUSE_SECONDS)

    return pages_data


# Module-level set used by _scrape_urls_in_tabs for tab tracking.
_seen: set = set()


def run_scraper(
    start_url: str,
    max_pages: int,
    concurrent_tabs: int,
    headless: bool,
) -> str:
    """
    Run the scraping loop and return the path to the generated Markdown file.

    1. Auto-discover the sitemap to get page URLs.
    2. Fall back to link-based crawling if no sitemap is found.
    3. Open each page in a separate browser tab.
    """
    global _seen
    _seen = set()  # Reset for each run.

    max_pages = normalise_max_pages(max_pages)

    # --- Discover pages via sitemap ---
    urls = sitemap.discover_sitemap_urls(start_url, limit=max_pages)

    # --- If sitemap is missing or sparse, augment with internal-link crawl ---
    min_sitemap_urls = getattr(config, "MIN_SITEMAP_URLS_BEFORE_CRAWL", 3)
    should_augment_with_crawl = len(urls) < min_sitemap_urls or len(urls) < max_pages
    if should_augment_with_crawl:
        if not urls:
            print("[info] No sitemap found. Starting link discovery crawl...")
        else:
            print(
                f"[info] Sitemap returned {len(urls)} URL(s). "
                "Running link discovery to capture missing pages..."
            )

        discovery_driver = browser.create_driver(headless=headless)
        try:
            discovered_urls = crawler.crawl_website_batch(
                discovery_driver,
                start_url,
                max_pages=max_pages,
                discovery_phase_pages=10,
            )

            # Preserve sitemap priority, then append newly discovered URLs.
            seen = set()
            merged_urls = []
            for item in urls + discovered_urls:
                if item and item not in seen:
                    seen.add(item)
                    merged_urls.append(item)
                if len(merged_urls) >= max_pages:
                    break
            urls = merged_urls
            print(f"[info] Total URLs after merge: {len(urls)}")
        except Exception as e:
            if urls:
                print(f"[warn] Crawl augmentation failed: {e}. Using sitemap URLs only.")
            else:
                print(f"[warn] Crawl failed: {e}. Falling back to start URL only.")
                urls = [start_url]
        finally:
            try:
                discovery_driver.quit()
            except WebDriverException:
                pass
    
    if not urls:
        print("[info] No pages discovered. Using start URL.")
        urls = [start_url]

    # --- Scrape in browser tabs ---
    driver = browser.create_driver(headless=headless)
    try:
        pages_data = _scrape_urls_in_tabs(driver, urls, concurrent_tabs)

        markdown_content = output_md.render_markdown(
            pages_data=pages_data,
            start_url=start_url,
        )
        output_path = output_md.save_markdown(
            content=markdown_content,
            output_dir=config.OUTPUT_DIR,
            start_url=start_url,
        )
        return output_path
    finally:
        try:
            driver.quit()
        except WebDriverException:
            pass


def main(argv: List[str] | None = None) -> int:
    """Program entry point."""
    if argv is None:
        argv = sys.argv[1:]

    args = parse_args(argv)
    try:
        start_url = validate_url(args.start_url)
        output_path = run_scraper(
            start_url=start_url,
            max_pages=args.max_pages,
            concurrent_tabs=args.concurrent_tabs,
            headless=bool(args.headless),
        )
    except WebDriverException as exc:
        print(f"[error] Selenium/WebDriver error: {exc}", file=sys.stderr)
        return 1
    except ValueError as exc:
        print(f"[error] {exc}", file=sys.stderr)
        return 2
    except KeyboardInterrupt:
        print("\n[info] Interrupted by user.", file=sys.stderr)
        return 1

    print(f"[info] Scraping complete. Results written to: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
