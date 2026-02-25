# Asset Optimization List

This list details **every single asset** in the project that needs review. It is sorted by size (largest to smallest).

## 🚨 Critical Priority (Must Fix)

These assets are massive and are the primary cause of the slow loading times.

| Filename | Current Format | Current Size | Recommended Format | Target Size | Instructions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `radio.png` | PNG | **5.9 MB** | WebP | < 500 KB | **Huge file.** Resize to max display width (e.g., 1920px). Convert to WebP with 80% quality. |
| `output.mp4` | MP4 | **3.9 MB** | WebM + MP4 | < 2 MB | Reduce bitrate (to ~1.5Mbps). Remove audio track if silent. Export a WebM version for modern browsers. |
| `Footer Picture.png` | PNG | **1.5 MB** | WebP / JPG | < 200 KB | This is a background/footer image. Does not need transparency? If not, use JPG. If yes, WebP. |
| `team-bg.jpg` | JPG | **1.4 MB** | WebP | < 200 KB | Background image. Reduce dimensions and quality (70-80%). |
| `x-image.png` | PNG | **1.2 MB** | WebP | < 150 KB | Likely a decorative element. Resize and compress. |
| `knowMoreDesktop.svg` | SVG | **1.1 MB** | SVG / WebP | < 50 KB | **Suspiciously large for an SVG.** Likely contains embedded high-res images. Export as a clean vector or convert to WebP if it's complex art. |
| `mockup-2.png` | PNG | **1.0 MB** | WebP | < 150 KB | Mockup image. Resize to actual rendered size. |
| `right-phone.png` | PNG | **1.0 MB** | WebP | < 100 KB | Mockup image. Resize to actual rendered size. |
| `left-phone.png` | PNG | **1.0 MB** | WebP | < 100 KB | Mockup image. Resize to actual rendered size. |
| `mockup-3.png` | PNG | **969 KB** | WebP | < 150 KB | Mockup image. Resize to actual rendered size. |
| `ai-antenna-2.png` | PNG | **736 KB** | WebP | < 100 KB | Resize and compress. |

## ⚠️ High Priority (Should Fix)

These assets are larger than necessary and contribute to the sluggish feel.

| Filename | Current Format | Current Size | Recommended Format | Target Size | Instructions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `mockup-1.png` | PNG | **602 KB** | WebP | < 100 KB | Resize and compress. |
| `modal-know-more.png` | PNG | **534 KB** | WebP | < 100 KB | Resize and compress. |
| `team-bg-mobile.jpg` | JPG | **521 KB** | WebP | < 100 KB | Mobile background. Should be much smaller. |
| `Mockups.png` | PNG | **502 KB** | WebP | < 100 KB | Resize and compress. |
| `modal.png` | PNG | **478 KB** | WebP | < 100 KB | Resize and compress. |
| `hero.png` | PNG | **416 KB** | WebP | < 100 KB | Resize and compress. |
| `team-ahmed.jpg` | JPG | **369 KB** | WebP | < 50 KB | Profile picture. Should be small (e.g., 400x400px). |
| `middle-phone.png` | PNG | **347 KB** | WebP | < 80 KB | Resize and compress. |
| `radio-mobile.png` | PNG | **266 KB** | WebP | < 80 KB | Resize and compress. |
| `left-image-our-team.png`| PNG | **158 KB** | WebP | < 50 KB | Resize and compress. |
| `Blacktape Footer.png` | PNG | **147 KB** | WebP | < 50 KB | Resize and compress. |
| `value.png` | PNG | **126 KB** | WebP | < 40 KB | Resize and compress. |
| `select.png` | PNG | **125 KB** | WebP | < 40 KB | Resize and compress. |
| `card3.png` | PNG | **107 KB** | WebP | < 30 KB | Resize and compress. |
| `footer-logo.svg` | SVG | **104 KB** | SVG | < 10 KB | Clean up SVG paths. Remove hidden layers/metadata. |
| `card2.png` | PNG | **99 KB** | WebP | < 30 KB | Resize and compress. |
| `card1.png` | PNG | **93 KB** | WebP | < 30 KB | Resize and compress. |
| `card6.png` | PNG | **93 KB** | WebP | < 30 KB | Resize and compress. |
| `card4.png` | PNG | **81 KB** | WebP | < 30 KB | Resize and compress. |
| `team-ahmed-mobile.png` | PNG | **75 KB** | WebP | < 30 KB | Resize and compress. |
| `card5.png` | PNG | **66 KB** | WebP | < 30 KB | Resize and compress. |

## ✅ Acceptable (Low Priority)

These assets are generally fine but could still benefit from WebP conversion.

| Filename | Current Format | Current Size | Recommended Format | Target Size |
| :--- | :--- | :--- | :--- | :--- |
| `team-mohammed.jpg` | JPG | 55 KB | WebP | < 20 KB |
| `knowMoreMobile.svg` | SVG | 40 KB | SVG | < 10 KB |
| `team-ammar.jpg` | JPG | 33 KB | WebP | < 20 KB |
| `tuner.png` | PNG | 23 KB | WebP | < 10 KB |
| `Client_*.png/jpg` | PNG/JPG | ~5-20 KB | WebP | < 5 KB |
| `Logo*.svg` | SVG | ~16 KB | SVG | < 5 KB |
| `logo.svg` | SVG | 13 KB | SVG | < 5 KB |
| `intro.svg` | SVG | 9 KB | SVG | < 5 KB |
| `Part-1.png` | PNG | 6 KB | WebP | < 2 KB |
| `Part-2.png` | PNG | 5 KB | WebP | < 2 KB |
| `Statue Icon.svg` | SVG | 5 KB | SVG | < 2 KB |
| `Eye Icon.svg` | SVG | 5 KB | SVG | < 2 KB |
| `Book Icon.svg` | SVG | 2 KB | SVG | < 1 KB |

## General Guidelines for Designer

1.  **Format:** Use **WebP** for all transparent images and photos. It is superior to PNG and JPG.
2.  **Dimensions:** Do not export images at 4K resolution if they are only displayed at 300px width on the website. Export at **2x the display size** (for Retina screens).
    *   *Example:* If a card is 300px wide, export the image at 600px wide.
3.  **SVGs:** Ensure SVGs are "clean". They should not contain base64 encoded images inside them. They should be pure vector paths.
4.  **Video:**
    *   Remove audio channel if not used.
    *   Use Variable Bit Rate (VBR) 2-pass encoding.
    *   Target bitrate: 1-2 Mbps for 1080p background video.
