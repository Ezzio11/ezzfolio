from PIL import Image
import os

# 100px width for logos (Mobile optimized)
logos = [
    "public/assets/erc-logo.webp",
    "public/assets/roman-hand.webp",
    "public/assets/ssc2-logo.webp",
    "public/assets/null-logo.webp",
    "public/assets/sharkpy-logo.webp"
]

# 128px for texture
texture = "public/assets/polymath/rice-paper.webp"

print("Starting Phase 2 Optimization...")

for f in logos:
    if os.path.exists(f):
        try:
            img = Image.open(f)
            # Resize
            if img.size[0] > 100:
                width_percent = (100 / float(img.size[0]))
                h_size = int((float(img.size[1]) * float(width_percent)))
                img = img.resize((100, h_size), Image.Resampling.LANCZOS)
                img.save(f, "WEBP", quality=85)
                print(f" shrunk {f} to 100x{h_size}")
            else:
                print(f" {f} already small enough")
        except Exception as e:
            print(f"Error {f}: {e}")

if os.path.exists(texture):
    try:
        img = Image.open(texture)
        img = img.resize((128, 128), Image.Resampling.LANCZOS)
        img.save(texture, "WEBP", quality=20) # Low quality for background noise
        print(f"Crushed texture to 128x128 Q20")
    except Exception as e:
        print(f"Error texture: {e}")
