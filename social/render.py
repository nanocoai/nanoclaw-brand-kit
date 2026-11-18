"""Render the 1280 × 640 social card using an installed Chromium browser."""
import os
from pathlib import Path
import shutil
import subprocess
from tempfile import TemporaryDirectory

folder = Path(__file__).resolve().parent
browser = os.getenv("CHROME_BIN") or shutil.which("chromium") or shutil.which("google-chrome")
if not browser:
    browser = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if not Path(browser).is_file():
    raise SystemExit("Set CHROME_BIN to your Chrome or Chromium executable.")

with TemporaryDirectory() as profile:
    subprocess.run([
        browser, "--headless", "--disable-background-networking", "--hide-scrollbars",
        "--allow-file-access-from-files", "--window-size=1280,640", "--force-device-scale-factor=1",
        "--virtual-time-budget=5000", f"--user-data-dir={profile}",
        f"--screenshot={folder / 'social-preview.png'}", (folder / "card.html").as_uri(),
    ], check=True)
