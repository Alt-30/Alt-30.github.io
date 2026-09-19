"""Fetch the PoliMetrics Substack feed and write assets/data/polimetrics.json.

Run weekly by .github/workflows/polimetrics.yml. Substack sits behind
Cloudflare, which sometimes rejects requests from GitHub's runners, so this
script tries the RSS feed, then the JSON API, each with retries, and on total
failure leaves the last good file in place and exits cleanly with a warning.
"""
import json, re, html, sys, time, urllib.request, urllib.error
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
import xml.etree.ElementTree as ET

SITE = "https://polimetrics.substack.com"
OUT = "assets/data/polimetrics.json"
LIMIT = 12
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36",
    "Accept": "application/rss+xml, application/json, application/xml;q=0.9, */*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

def get(url, tries=3):
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=30) as r:
                return r.read()
        except Exception as e:
            last = e
            print(f"attempt {i + 1} for {url}: {e}")
            time.sleep(4 * (i + 1))
    raise last

def clean(text, limit=170):
    text = re.sub(r"<[^>]+>", " ", text or "")
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > limit:
        text = text[:limit].rsplit(" ", 1)[0].rstrip(".,;:") + "..."
    return text

def from_rss():
    root = ET.fromstring(get(SITE + "/feed"))
    ch = root.find("channel")
    posts = []
    for it in ch.findall("item")[:LIMIT]:
        g = lambda k: (it.findtext(k) or "").strip()
        enc = it.find("enclosure")
        try:
            dt = parsedate_to_datetime(g("pubDate")).astimezone(timezone.utc)
        except Exception:
            dt = datetime.now(timezone.utc)
        posts.append({"title": html.unescape(g("title")), "link": g("link"), "date": dt.strftime("%Y-%m-%d"),
                      "excerpt": clean(g("description")), "image": enc.get("url") if enc is not None else ""})
    return {"publication": html.unescape((ch.findtext("title") or "PoliMetrics").strip()),
            "tagline": html.unescape((ch.findtext("description") or "").strip()), "posts": posts}

def from_api():
    items = json.loads(get(f"{SITE}/api/v1/posts?limit={LIMIT}"))
    posts = []
    for p in items[:LIMIT]:
        dt = p.get("post_date", "")[:10] or datetime.now(timezone.utc).strftime("%Y-%m-%d")
        posts.append({"title": p.get("title", ""), "link": p.get("canonical_url", ""), "date": dt,
                      "excerpt": clean(p.get("subtitle") or p.get("description") or ""),
                      "image": p.get("cover_image") or ""})
    return {"publication": "PoliMetrics", "tagline": "Evidence over Ideology. Data-driven insights on current policy issues.", "posts": posts}

data = None
for name, fn in (("RSS feed", from_rss), ("JSON API", from_api)):
    try:
        data = fn()
        print(f"fetched via {name}")
        break
    except Exception as e:
        print(f"{name} failed: {e}")

if not data or not data["posts"]:
    print("::warning::PoliMetrics feed unreachable this run; keeping the previous polimetrics.json")
    sys.exit(0)

data["url"] = SITE
data["updated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print(f"wrote {OUT}: {len(data['posts'])} posts, latest {data['posts'][0]['date']}")
