"""Convert a capture master into true sRGB before it is encoded for the web.

A Mac screenshot carries the display's own profile and an iPhone screenshot
carries Display P3. Dropping that tag does not convert anything — it just
relabels the same numbers as sRGB, which is why two captures of the same screen
can end up with different tones. Transform, don't strip.
"""
import io
import sys
from PIL import Image, ImageCms


def to_srgb(path):
    im = Image.open(path)
    icc = im.info.get("icc_profile")
    if im.mode not in ("RGB", "RGBA"):
        im = im.convert("RGB")
    if im.mode == "RGBA":
        im = im.convert("RGB")  # screenshots are fully opaque
    if not icc:
        return im, "untagged — assumed sRGB, passed through"
    src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
    name = ImageCms.getProfileDescription(src).strip()
    dst = ImageCms.createProfile("sRGB")
    out = ImageCms.profileToProfile(
        im, src, dst, renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC,
        outputMode="RGB",
    )
    return out, f"{name} → sRGB"


if __name__ == "__main__":
    src_path, out_path = sys.argv[1], sys.argv[2]
    box = None
    if len(sys.argv) > 3 and sys.argv[3] != "-":
        box = tuple(int(v) for v in sys.argv[3].split(","))
    img, how = to_srgb(src_path)
    if box:
        img = img.crop(box)
    img.save(out_path)
    print(f"  {src_path.split('/')[-1]:<28} {how}")
