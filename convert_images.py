from PIL import Image
import os

files = [
    "public/assets/samoan-pattern.png",
    "public/assets/ulafala.png",
    "public/assets/erc-logo.png",
    "public/assets/polymath/rice-paper.png"
]

for f in files:
    if os.path.exists(f):
        print(f"Converting {f}...")
        try:
            img = Image.open(f)
            out = f.replace(".png", ".webp")
            img.save(out, "WEBP", quality=80)
            print(f"Success: {out}")
        except Exception as e:
            print(f"Error converting {f}: {e}")
    else:
        print(f"File not found: {f}")
