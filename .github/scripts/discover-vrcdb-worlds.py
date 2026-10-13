#!/usr/bin/env python3
"""Discover public VRChat world IDs indexed for DedZedOffishal on VRCDB.

VRCDB uses a server-side Blazor UI rather than a simple public JSON search route,
so this script drives that public search page in headless Chrome and resolves the
returned VRChat links. The Node updater independently verifies author ID and
releaseStatus with VRChat before anything is published.
"""

import json
import re
import subprocess
import sys
import time
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait

AUTHOR_NAME = "DedZedOffishal"
WORLD_ID_RE = re.compile(r"wrld_[0-9a-fA-F-]{36}")
OUTPUT = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/vrcdb-world-ids.json")


def resolve_world_id(url: str) -> str | None:
    try:
        final = subprocess.check_output(
            ["curl", "-LsS", "-o", "/dev/null", "-w", "%{url_effective}", url],
            text=True,
            timeout=20,
        ).strip()
    except Exception:
        return None
    match = WORLD_ID_RE.search(final)
    return match.group(0) if match else None


def discover() -> list[str]:
    options = webdriver.ChromeOptions()
    for arg in (
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--window-size=1440,1600",
    ):
        options.add_argument(arg)

    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 35)
    try:
        driver.get("https://vrcdb.com/worlds")
        # Give the Blazor Server circuit time to become interactive. The page is
        # prerendered first, so clicking immediately can hit inert markup.
        time.sleep(5)
        form = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "form.search-form-card")))
        author = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".search-btn-author")))
        if "search-btn-author--active" not in (author.get_attribute("class") or ""):
            driver.execute_script("arguments[0].click()", author)
            wait.until(
                lambda d: "search-btn-author--active"
                in (d.find_element(By.CSS_SELECTOR, ".search-btn-author").get_attribute("class") or "")
            )

        box = driver.find_element(By.CSS_SELECTOR, ".search-input")
        box.clear()
        box.send_keys(AUTHOR_NAME)

        selects = form.find_elements(By.CSS_SELECTOR, ".search-page-size-wrap select")
        if selects:
            Select(selects[0]).select_by_value("100")

        submit = form.find_element(By.CSS_SELECTOR, ".search-btn-submit")
        driver.execute_script("arguments[0].click()", submit)
        wait.until(lambda d: "result(s)" in (d.find_element(By.TAG_NAME, "body").text or ""))
        time.sleep(2)

        redirect_urls = []
        seen = set()
        for link in driver.find_elements(By.CSS_SELECTOR, 'a[href*="/go/world/"]'):
            url = link.get_attribute("href") or ""
            if url and url not in seen:
                seen.add(url)
                redirect_urls.append(url)

        ids = []
        for url in redirect_urls:
            world_id = resolve_world_id(url)
            if world_id and world_id not in ids:
                ids.append(world_id)
        return ids
    finally:
        driver.quit()


def main() -> int:
    try:
        ids = discover()
        OUTPUT.write_text(json.dumps(ids, indent=2) + "\n", encoding="utf-8")
        print(f"VRCDB author search found {len(ids)} candidate world(s).")
        for world_id in ids:
            print(world_id)
    except Exception as exc:
        # Discovery is additive. A third-party outage must never stop the normal
        # VRChat metadata refresh or remove previously verified worlds.
        OUTPUT.write_text("[]\n", encoding="utf-8")
        print(f"VRCDB discovery unavailable: {exc}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
