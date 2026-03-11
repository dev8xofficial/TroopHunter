"""
Markdown output helpers.

This module turns structured page data into a single Markdown document and
persists it to disk.  Each website gets a single file named after its domain.
"""

from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Iterable, List
from urllib.parse import urlparse


def _name_from_url(url: str) -> str:
    """Extract a filesystem-safe name from a LinkedIn URL (e.g. 'developers-inc')."""
    parsed = urlparse(url)
    
    # E.g. /company/developers-inc/ -> 'developers-inc'
    path = parsed.path.strip("/")
    if not path:
        return parsed.netloc or "unknown"
        
    # Take the last path segment as the identifier
    segments = path.split("/")
    name = segments[-1]
    
    return name or "unknown"


def _heading_prefix(level: str) -> str:
    """Convert an HTML heading tag name to a Markdown heading prefix."""
    depth = {"h1": "###", "h2": "####", "h3": "#####", "h4": "######"}
    # h5/h6 stay at ###### (Markdown max depth)
    return depth.get(level, "######")


def render_markdown(pages_data: Iterable[Dict[str, Any]], start_url: str) -> str:
    """Render all scraped pages into a single Markdown document."""
    pages: List[Dict[str, Any]] = list(pages_data)
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    name = _name_from_url(start_url)

    lines: List[str] = []
    lines.append(f"# Scrape Results — {name}")
    lines.append("")
    lines.append(f"- **Start URL**: {start_url}")
    lines.append(f"- **Scraped at**: {timestamp}")
    lines.append(f"- **Total pages**: {len(pages)}")
    lines.append("")

    for i, page in enumerate(pages):
        page_number = page.get("page_number") or "?"
        title = page.get("title") or page.get("url") or ""
        url = page.get("url") or ""
        meta_description = page.get("meta_description")
        content = page.get("content") or []

        # Horizontal rule between pages for visual separation.
        if i > 0:
            lines.append("---")
            lines.append("")

        lines.append(f"## Page {page_number} — {title}")
        lines.append("")
        if url:
            lines.append(f"**🔗 URL:** {url}")
            lines.append("")
        if meta_description:
            lines.append(f"> {meta_description}")
            lines.append("")

        # Render content blocks in document (top-to-bottom) order.
        for block in content:
            block_type = block.get("type")

            if block_type == "heading":
                prefix = _heading_prefix(block.get("level", "h3"))
                lines.append(f"{prefix} {block['text']}")
                lines.append("")

            elif block_type == "text":
                lines.append(block["text"])
                lines.append("")

            elif block_type == "list":
                for item in block.get("items", []):
                    lines.append(f"- {item}")
                lines.append("")

    return "\n".join(lines)


def save_markdown(content: str, output_dir: str, start_url: str) -> str:
    """
    Save Markdown content to the specified directory.

    The file is named after the website domain (e.g. ``treeraise.com.md``).
    Re-running the scraper for the same site overwrites the previous file.
    """
    dir_path = Path(output_dir)
    dir_path.mkdir(parents=True, exist_ok=True)

    name = _name_from_url(start_url)
    full_name = f"{name}-linkedin.md"
    file_path = dir_path / full_name
    file_path.write_text(content, encoding="utf-8")
    return str(file_path)

