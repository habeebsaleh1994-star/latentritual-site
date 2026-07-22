# Public media manifest

The record of what every capture on the site *is* — so the next product
milestone can answer "what became visually stale?" without opening every page.

**Masters live outside the repo** (per the media truth plan), in two gitignored
folders on the owner's machine: `original assets/` and `docs/captures/`. Back
them up separately; only the encoded derivatives in `public/` ship.

## Current — every frame on the site

| Asset | Product · surface | Page · section | Master | Derivatives |
|---|---|---|---|---|
| Darkroom, a portrait developing on Supra Endura | Ritual · Mac | `/ritual` hero **and** rooms tile 04; `/` Ritual row | `Darkroom.png` | `ritual-darkroom-{640,1280,2560}.webp` |
| Studio — the temporal spine | Ritual · Mac | `/ritual` rooms tile 01 | `Studio.png` | `ritual-studio-{640,1280}.webp` |
| Workbench — today's work, and the archive's truth | Ritual · Mac | `/ritual` rooms tile 02 | `Workbench.png` | `ritual-workbench-{640,1280}.webp` |
| Light Table — a rated grid beside one frame held large | Ritual · Mac | `/ritual` rooms tile 03 | `Lighttable.png` | `ritual-lighttable-{640,1280}.webp` |
| Print Room — a print on Kodak 2393 over a seven-step test strip | Ritual · Mac | `/ritual` Print Room | `Print Room.png` | `ritual-printroom-{1080,2160}.webp` |
| Story canvas — spreads arranged into a sequence | Ritual · Mac | `/ritual` Stories | `Story Mode V1.mov` (4096×2304, 60 fps, 109.5 s, 72 MB) | `ritual-story-canvas.{webm,mp4}` + `-poster.webp` (11.9 s, 436 KB) |
| Darkroom, the Youssef portrait — Mac | Ritual · Mac | `/ritual` Mac and iPad | `Darkroom Mac.png` | `ritual-device-mac-{640,1280}.webp` |
| Darkroom, the same portrait — iPad | Ritual · iPad | `/ritual` Mac and iPad | `Darkroom iPad.PNG` (full screen — no window to crop) | `ritual-device-ipad-{450,900}.webp` |
| Viewfinder at First Light | Moment · iPhone | `/moment` hero | `IMG_1032.jpeg` | `moment-firstlight-{600,900}.webp` |
| Pocket darkroom — Film shelf open, ColorPlus 200 | Moment · iPhone | `/moment` pocket darkroom | `Screenshot … 1.29.39 PM.png` | `moment-darkroom-{600,900}.webp` |
| A day in the journal (Friday, 17 July) | Moment · iPhone | `/moment` journal; `/` Moment row | `Screenshot … 1.15.00 PM.png` | `moment-journal-{600,900}.webp` |
| The Cut room — timeline, music lane, 2.39:1 at 24 fps | Lab · iPhone | `/lab` the pocket lab | `The Lab Cut Room.png` | `lab-cut-{600,900}.webp` |
| The Colour room — raw negative against the Portra 400 grade | Lab · iPhone | `/lab` the pocket lab | `The Lab Grading Room.png` | `lab-color-{600,900}.webp` |
| The reel — moving images through the engine | Lab · engine output | `/lab` hero; `/` Lab row | 4K master (retired from `public/`) | `lab-reel-1920.{webm,mp4}`, `lab-reel-1280.{webm,mp4}`, `lab-reel-poster.webp` |
| Frame × emulsion fixture — 3 scenes × (RAW + 3 paths) | Lab · engine output | `/lab` the material | rendered 10 Jun 2026 | `lab/*.webp` (12 files) |

### Why these particular frames

**All six Ritual masters share an identical window bounding box** — one build,
one library, one window, one sitting. Keep that discipline for any recapture;
the rooms are read as a set and a mismatched window breaks them.

**The Mac and iPad pair is the same photograph in the same develop state** —
DSCF8447 at 4,906 K, tint +19, on Supra Endura. That is what makes the section's
"not a lite edition" claim visible rather than asserted. If either half is ever
recaptured, recapture both from the same frame and the same settings.

**The Moment is shown as both halves of what it is** — a camera and a journal.
The camera leads `/moment`; the journal, the half a visitor would not assume,
carries the homepage row and the journal section.

**The two Lab phone captures are one session** — the same film, the same shot,
in the order the film moves through the rooms: Cut, then Colour. One frame could
not carry "the whole lab travels". They also tie the house together on their
own: the Colour room's Looks are the same house emulsions as the `/ritual`
Materials grid, and its paper is Supra Endura — the paper the Youssef portrait
is printed on two pages away.

**The Darkroom is the one capture shown twice** on `/ritual`: full width as the
hero, then again as rooms tile 04. A distinct Darkroom view (the Light or
Retouch stage) would remove that repetition if one is ever captured.

## Ageing — still true, but older than the rest

| Asset | Page · section | Note |
|---|---|---|
| `story-mode-reader.{webm,mp4}` + poster | `/ritual` Stories, full-bleed reader | Captured 28 May 2026; authorized by the handoff as temporary. It happens to show the same body of work as the canvas timelapse above it, so the two still read as one story. |
| `lab-reel-*` (all sizes) | `/lab` hero; `/` Lab row | Derived from the 14 Jun reel. Re-derive both sizes whenever the reel is re-rendered. |
| `lab/*.webp` — 12 fixture frames | `/lab` the material | Rendered 10 Jun 2026. Engine output, not UI, so it cannot misstate the product's shape — but the media plan asks for these to be re-rendered as **one current fixture set**. The switcher reads its list from the `frames` array in `lab.astro`; replacing the twelve files needs no other change. |

## Slots — space held, capture still needed

**None.** Every frame on the site is current product. `CaptureSlot.astro` is no
longer imported anywhere; keep the component for the next unbuilt surface.

The Lab is one instrument on two surfaces — a node inside DaVinci Resolve, and
the whole lab on iPhone — the way The Ritual is one instrument on Mac and iPad.
The phone side was a technical alpha as of 12 Jul 2026, so the page states the
capability and lets `truth.ts` carry the release status.

### Kept but unplaced

| Asset | Master | Note |
|---|---|---|
| Viewfinder, Portra 400 chosen | `IMG_1033.jpeg` | Held the homepage Moment row until the journal replaced it. Derivatives removed in the sweep; regenerable from the master. |
| Studio, scrolled to the years spine | `Studio 2.png` | An alternative Studio tile. The placed capture wins for having a focal point and the room's own name visible at tile size. |
| Light Table on Mac and on iPad | `Light Table {Mac.png,iPad.PNG}` | A second complete Mac/iPad pair. The Darkroom pair was placed instead: the doubt that section answers is whether the tablet is cut down, and the Darkroom is where that doubt lives. |

## Video encoding

Motion is the Lab's alone: the homepage's only moving element sits in the Lab
row because that instrument is the one that carries the process through motion.
Keep it that way — a second moving thing would make it decoration.

```bash
# web-weight derivative from the 4K master
ffmpeg -i MASTER.webm -an -vf "scale=1280:-2" -c:v libvpx-vp9 \
       -crf 36 -b:v 0 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p OUT.webm
ffmpeg -i MASTER.webm -an -vf "scale=1280:-2" -c:v libx264 \
       -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart OUT.mp4
```

**Do not compress harder than CRF 36** on engine output. At CRF 42 the file
halves but the photographic grain smears — destroying the exact quality the
engine exists to produce. Compare a still crop against the master before
accepting any setting. Screen recordings are UI, not grain, and take CRF 32
(VP9) / 23 (H.264) without visible harm to their text.

### Turning a screen recording into a loop

A raw capture is a session, not a loop. Measure it, don't guess: find where
motion actually starts and stops, then trim to that and speed the remainder
until it lands in the 6–12 s the media plan asks for.

```bash
# where is the motion? sample 2 fps and diff consecutive frames
ffmpeg -i MASTER.mov -vf "fps=2,scale=320:180" /tmp/mo/m%04d.png
# …then compare each frame to the one before it and report first/last movement.

# trim to the active range and compress the pauses
ffmpeg -ss <first> -to <last> -i MASTER.mov -an \
       -vf "setpts=PTS/<N>,scale=1920:-2,fps=30" -c:v libvpx-vp9 -crf 32 -b:v 0 \
       -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p OUT.webm
```

The Story canvas ran 109.5 s: motion began at 3 s, ended at 84.5 s — the last
25 seconds were a still frame — and six thinking-pauses of 3–7 s sat in the
middle. Trimmed to 2.5–86 s and run at 7×, it became an 11.9 s timelapse of a
sequence forming, which is what that section is about. 72 MB → 436 KB.

A process loop restarts from few prints to many; that reset is inherent and
reads as a new story beginning. Don't ping-pong it to hide the seam.

Below-the-fold loops carry `data-autoplay` + `preload="none"`, **not** the real
`autoplay` attribute: Chrome fetches an `autoplay` video regardless of
`preload`, so the attribute would defeat the deferral. `quiet.js` observes both
forms, starts them on entry, pauses them on exit, and swaps them for
poster-plus-controls under `prefers-reduced-motion`. Without JS the poster
simply stands.

## Colour: convert, never strip

Screen captures are not born in sRGB. A Mac screenshot carries the display's own
profile, an iPhone screenshot carries Display P3, and an iPad screenshot may
carry nothing at all. `cwebp` drops that tag by default and PIL's
`.convert("RGB")` drops it too — which does **not** convert anything. It leaves
the original numbers in place and relabels them sRGB, so the browser renders the
wrong colour. Two captures of the same screen then disagree, purely because they
came from different devices.

Always transform to sRGB first. `scripts/tosrgb.py` does it, and takes an
optional crop box so a Mac capture can be window-cropped in the same pass:

```bash
python3 scripts/tosrgb.py "original assets/Studio.png" /tmp/studio.png 112,76,5232,2674
```

```python
icc = im.info.get("icc_profile")
if icc:
    im = ImageCms.profileToProfile(
        im, ImageCms.ImageCmsProfile(io.BytesIO(icc)),
        ImageCms.createProfile("sRGB"),
        renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC, outputMode="RGB")
```

sRGB is the house standard — the six hero photographs are already sRGB, and the
page's own colours are sRGB hex, so a wide-gamut image beside them would not
match. Video needs no equivalent step: the screen recordings are already bt709.

Measured on the Mac/iPad Darkroom pair, stripping the tag left the Mac about
four levels cooler in the reds than the iPad shot of the same screen — enough to
see side by side. The iPhone captures barely moved, because their content sits
inside the sRGB gamut anyway.

## Encoding recipe

```bash
# phone stills (frame renders at min(300px, 70vw) → 3× = 900px)
cwebp -q 88 -resize 900 0 MASTER.jpeg -o public/NAME-900.webp
cwebp -q 88 -resize 600 0 MASTER.jpeg -o public/NAME-600.webp

# wide Mac stills (frame renders up to 1240px → 2× = 2480, round to 2560)
cwebp -q 82 -resize 2560 0 WINDOW.png -o public/NAME-2560.webp
cwebp -q 82 -resize 1280 0 WINDOW.png -o public/NAME-1280.webp
```

**Mac captures are cropped to the window first.** A full-screen grab carries a
black desktop margin; the page frame already supplies the radius and shadow, so
a second window edge inside it reads as a screenshot of a desktop rather than
the app. Detect the bounds instead of eyeballing them — the desktop is pure
black, so the window's bounding box is exact:

```python
from PIL import Image
im = Image.open(MASTER); g = im.convert("L"); W, H = g.size
row = lambda y: max(g.crop((0, y, W, y+1)).getdata()) > 8
col = lambda x: max(g.crop((x, 0, x+1, H)).getdata()) > 8
top    = next(y for y in range(H)        if row(y))
bottom = next(y for y in range(H-1,-1,-1) if row(y))
left   = next(x for x in range(W)        if col(x))
right  = next(x for x in range(W-1,-1,-1) if col(x))
im.crop((left, top, right+1, bottom+1)).save(WINDOW)
```

Then set the frame's `aspect-ratio` and the `<img>` `width`/`height` to the
**cropped** dimensions, so the frame and the image agree exactly and
`object-fit: cover` has nothing to trim.

This is why the `/ritual` hero, rooms and Print Room frames all carry
`aspect-ratio: 5120 / 2598` rather than the 4832:2580, 3:2 and 16:9 the design
drew: those were drawn before there were captures, and a Mac window is 1.97:1.
At 3:2 the rooms grid would have shaved a quarter off every window — taking the
Studio's own title with it. Where the design's geometry and the capture's
geometry disagree, the capture wins; a cropped window misrepresents the app.

macOS names screenshots with a narrow no-break space (U+202F) before AM/PM —
shell globs work, hand-typed paths silently don't.

Every `<img>` carries explicit `width`/`height` (no CLS), a `srcset`/`sizes`
pair, and alt text that describes **only what the capture actually shows** — a
label may never claim more of the product than the frame proves.

## Social cards

One card per page, 1200×630, built from that page's own capture: a graded scrim
over the art, the wordmark top-left, the page's eyebrow and title bottom-left in
the site's real fonts.

| Card | Art | Used by |
|---|---|---|
| `og.png` | `develop-6-after` — the photograph the one-engine passage uses | `/`, and every page without its own |
| `og-ritual.png` | the Darkroom capture, zoomed past the app's own wordmark | `/ritual` |
| `og-moment.png` | the journal, inset as a phone on the house ground | `/moment` |
| `og-lab.png` | `lab/garden-1-vision3-250d-fuji-eterna` — engine output | `/lab` |

The type is drawn in a browser canvas against the live site so it uses the real
Outfit / Lora / JetBrains Mono, then composited over the art in Pillow — the
woff2 fonts can't be read directly without a brotli extension. Bump the `?v=`
in the page's `ogImage` whenever a card is redrawn, or the networks keep the old
one indefinitely.

## Video weights

The `/lab` hero once served the 4K master: 31 MB across three formats, with
`preload="auto"`, before a visitor had read a line. It now serves 1920-wide
derivatives — 4.7 MB (VP9 CRF 37) and 5.4 MB (H.264 CRF 28), measured at RMS
3.95 against the master, grain intact. 2560 was tried first and rejected: at
this grain level it came out no smaller than the source. The homepage row uses
the 1280 pair for the same reason at its smaller size.

## Retired — swept 22 Jul 2026

48 files (59 MB) of old-product media were removed from `public/`: the previous
hero and panel loops, the old Moment recordings and stills, the Print Room and
Retouch clips, the 4K `resolve-reel.*` set now superseded by its 1920
derivatives, and `og-resolve.png`. All were tracked in git, so they remain in
history if one is ever wanted back.

Two untracked files of yours — `kit-darkroom.webp`, `kit-lighttable.webp`, plus
`kit-darkroom-p.webp` — were **moved, not deleted**, into `_sketches/postkit/`
alongside the three social-post templates that use them. Those templates used to
sit in `public/` and so deployed as real pages at `/_postkit.html`; they are out
of the deploy now, with their asset paths rewritten so they still open locally.

The deploy went from 116 MB to 64 MB.
