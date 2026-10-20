"""Generate web-optimized image variants.

Run from the project root after adding or replacing photos:
    python scripts/optimize_images.py

- public/graduates/thumbs/*.webp : 600px-wide thumbnails for cards/marquee
  (full-size photos stay in public/graduates for modal, profile and export).
- public/bg1.webp, public/logo.webp : resized from the originals in data/assets/img.
- public/staff/*.jpg : capped at 1280px tall (originals kept in data/assets/img/staff).
"""
import os
import shutil

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
ORIGINALS = os.path.join(ROOT, "data", "assets", "img")

THUMB_WIDTH = 600
BG_WIDTH = 2560
LOGO_SIZE = 512
STAFF_MAX_HEIGHT = 1280


def kb(path):
    return f"{os.path.getsize(path) / 1024:.0f} KB"


def make_thumbs():
    src_dir = os.path.join(PUBLIC, "graduates")
    out_dir = os.path.join(src_dir, "thumbs")
    os.makedirs(out_dir, exist_ok=True)
    count = 0
    for name in sorted(os.listdir(src_dir)):
        src = os.path.join(src_dir, name)
        if not os.path.isfile(src) or not name.lower().endswith((".webp", ".jpg", ".jpeg", ".png")):
            continue
        out = os.path.join(out_dir, os.path.splitext(name)[0] + ".webp")
        if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
            continue
        im = Image.open(src).convert("RGB")
        if im.width > THUMB_WIDTH:
            im = im.resize((THUMB_WIDTH, round(im.height * THUMB_WIDTH / im.width)), Image.LANCZOS)
        im.save(out, "WEBP", quality=80, method=6)
        count += 1
    print(f"thumbs: {count} generated in {out_dir}")


def make_bg():
    src = os.path.join(ORIGINALS, "bg1.jpeg")
    out = os.path.join(PUBLIC, "bg1.webp")
    im = Image.open(src).convert("RGB")
    if im.width > BG_WIDTH:
        im = im.resize((BG_WIDTH, round(im.height * BG_WIDTH / im.width)), Image.LANCZOS)
    # Shown at 20% opacity behind the hero, so stronger compression is invisible.
    im.save(out, "WEBP", quality=60, method=6)
    print(f"bg1.webp: {kb(src)} -> {kb(out)}")


def make_logo():
    src = os.path.join(ORIGINALS, "logo.png")
    out = os.path.join(PUBLIC, "logo.webp")
    im = Image.open(src).convert("RGBA").resize((LOGO_SIZE, LOGO_SIZE), Image.LANCZOS)
    im.save(out, "WEBP", quality=90, method=6)
    print(f"logo.webp: {kb(src)} -> {kb(out)}")


def cap_staff():
    staff_dir = os.path.join(PUBLIC, "staff")
    backup_dir = os.path.join(ORIGINALS, "staff")
    for name in sorted(os.listdir(staff_dir)):
        path = os.path.join(staff_dir, name)
        if not name.lower().endswith((".jpg", ".jpeg")):
            continue
        im = Image.open(path)
        if im.height <= STAFF_MAX_HEIGHT:
            continue
        os.makedirs(backup_dir, exist_ok=True)
        backup = os.path.join(backup_dir, name)
        if not os.path.exists(backup):
            shutil.copy2(path, backup)
        before = kb(path)
        im = im.convert("RGB")
        im = im.resize((round(im.width * STAFF_MAX_HEIGHT / im.height), STAFF_MAX_HEIGHT), Image.LANCZOS)
        im.save(path, "JPEG", quality=85, optimize=True, progressive=True)
        print(f"staff/{name}: {before} -> {kb(path)} (original in {backup})")


if __name__ == "__main__":
    make_thumbs()
    make_bg()
    make_logo()
    cap_staff()
