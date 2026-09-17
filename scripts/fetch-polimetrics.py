"""Fetch the PoliMetrics Substack RSS feed and write assets/data/polimetrics.json.

Run by .github/workflows/polimetrics.yml on a schedule. The site reads the JSON,
so the feed renders without a browser-side request to Substack.
"""
import json, re, html, sys, urllib.request
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
import xml.etree.ElementTree as ET

FEED = "https://polimetrics.substack.com/feed"
OUT = "assets/data/polimetrics.json"
LIMIT = 12

def clean(text, limit=170):
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > limit:
        cut = text[:limit].rsplit(" ", 1)[0]
        text = cut.rstrip(".,;:") + "..."
    return text

req = urllib.request.Request(FEED, headers={"User-Agent": "alt-30.com feed sync"})
with urllib.request.urlopen(req, timeout=30) as r:
    root = ET.fromstring(r.read())
ch = root.find("channel")
posts = []
for it in ch.findall("item")[:LIMIT]:
    g = lambda k: (it.findtext(k) or "").strip()
    enc = it.find("enclosure")
    try:
        dt = parsedate_to_datetime(g("pubDate")).astimezone(timezone.utc)
    except Exception:
        dt = datetime.now(timezone.utc)
    posts.append({
        "title": html.unescape(g("title")),
        "link": g("link"),
        "date": dt.strftime("%Y-%m-%d"),
        "excerpt": clean(g("description")),
        "image": enc.get("url") if enc is not None else "",
    })

data = {
    "publication": html.unescape((ch.findtext("title") or "PoliMetrics").strip()),
    "tagline": html.unescape((ch.findtext("description") or "").strip()),
    "url": (ch.findtext("link") or "https://polimetrics.substack.com").strip(),
    "updated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "posts": posts,
}
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print(f"wrote {OUT}: {len(posts)} posts, latest {posts[0]['date'] if posts else 'n/a'}")
