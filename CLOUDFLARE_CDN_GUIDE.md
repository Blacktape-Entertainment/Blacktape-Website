# How to Upload Assets to Cloudflare R2 (CDN)

This guide explains how to host your optimized assets (images and videos) on Cloudflare R2 to improve performance.

## Why Cloudflare R2?
- **Fast:** Assets are served via Cloudflare's global CDN.
- **Cheap:** No egress fees (you don't pay for bandwidth).
- **Easy:** Compatible with S3 tools.

## Step 1: Create an R2 Bucket
1.  Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2.  Go to **R2** in the sidebar.
3.  Click **Create Bucket**.
4.  Name it something like `blacktape-assets`.
5.  Click **Create Bucket**.

## Step 2: Enable Public Access
1.  Click on your new bucket (`blacktape-assets`).
2.  Go to the **Settings** tab.
3.  Scroll down to **Public Access**.
4.  Click **Connect Domain** (if you want `assets.blacktape.com`) OR click **Allow Access** under "R2.dev subdomain" to get a free `pub-xxxxxxxx.r2.dev` URL.
    *   *Recommendation:* Using a custom domain looks more professional, but the free R2.dev URL works fine for testing.

## Step 3: Upload Your Optimized Assets
1.  Go to the **Objects** tab in your bucket.
2.  Click **Upload**.
3.  Drag and drop your **optimized** files (WebP images, compressed MP4/WebM video).
    *   `output.mp4` (Compressed version)
    *   `radio.webp` (Converted from radio.png)
    *   `hero.webp`
    *   etc.

## Step 4: Update Your Code
Once uploaded, you will get a URL for each file. It will look like:
`https://pub-xxxxxxxx.r2.dev/output.mp4`
OR
`https://assets.blacktape.com/output.mp4`

You need to update your code to point to these new URLs.

### Example: Updating `Hero.jsx`

**Before:**
```jsx
<video src="/output.mp4" ... />
```

**After:**
```jsx
<video src="https://assets.blacktape.com/output.mp4" ... />
```

### Example: Updating `constants.js` or Component Files
For images, you can create a helper function or base URL constant.

**In `src/constants.js`:**
```javascript
export const ASSET_URL = "https://assets.blacktape.com";
```

**In Components:**
```jsx
import { ASSET_URL } from "../constants";

<img src={`${ASSET_URL}/radio.webp`} ... />
```

## Checklist for Upload
- [ ] `output.mp4` (Compressed)
- [ ] `radio.png` -> `radio.webp`
- [ ] `Footer Picture.png` -> `footer-bg.webp`
- [ ] `team-bg.jpg` -> `team-bg.webp`
- [ ] All other large assets from the Optimization List.
