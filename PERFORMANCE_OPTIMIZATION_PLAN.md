# Performance Optimization Plan for Blacktape-Website

## 1. Diagnosis: Why Assets Load Multiple Times
Based on the inspection of `src/components/AssetPrefetch.jsx`, `src/App.jsx`, and `src/components/Hero.jsx`, here is why you are seeing multiple requests (e.g., video loading 5 times):

1.  **Strict Mode Double Invocation:** In `src/main.jsx`, `<StrictMode>` is enabled. In development, this runs `useEffect` twice to check for side effects. Since `AssetPrefetch.jsx` has **no cleanup function**, it starts downloading assets twice immediately.
2.  **Explicit JS Preloading:** `AssetPrefetch.jsx` creates a `document.createElement("video")` and calls `.load()`. This triggers a network request.
3.  **HTML Tag Loading:** When the preloading finishes and `Hero.jsx` renders, it contains a `<video src="...">` tag. The browser often treats this as a separate request from the JS-created video element, especially if the first one hasn't fully finished or if caching headers aren't perfect.
4.  **GSAP Scrubbing:** The `Hero.jsx` component uses GSAP to scrub the video (`currentTime`). Manipulating `currentTime` can sometimes trigger partial content requests (206 Partial Content) which look like multiple requests in the network tab.

## 2. Actionable Task List

### Phase 1: Immediate Code Fixes (Stop the Double Loading)

- [ ] **Fix `AssetPrefetch.jsx` Cleanup:**
    - Add a cleanup function to the `useEffect` in `AssetPrefetch.jsx` to cancel/ignore ongoing loads if the component unmounts (or re-runs in Strict Mode).
    - *Better yet:* Refactor `AssetPrefetch` to **only** preload critical assets (Logo, Hero background). Do not preload images that are below the fold (e.g., Footer, Our Team).

- [ ] **Optimize Loading Strategy (Critical):**
    - **Remove Video from Blocking Prefetch:** Do not make the user wait for the entire video to download before showing the site.
    - Remove `"/output.mp4"` from the `videoAssets` array in `AssetPrefetch.jsx`.
    - Instead, use a **Poster Image** for the video in `Hero.jsx`. The site will load instantly, show the poster, and the video will play when ready.

- [ ] **Implement Lazy Loading:**
    - For components like `OurTeam`, `DevicesMockups`, `WhatIsIncluded`, and `DigitalSovereignty`, do not import images at the top level or prefetch them.
    - Use the native `loading="lazy"` attribute on `<img>` tags.
    - Example: `<img src="..." loading="lazy" alt="..." />`

### Phase 2: Asset Optimization (Reduce Size)

- [ ] **Compress the Hero Video (`output.mp4`):**
    - The current video is likely too large.
    - **Action:** Convert it to **WebM** format (better compression for web) and a fallback **MP4**.
    - **Action:** Reduce the bitrate. For a background video, 720p at 1-2 Mbps is usually sufficient.
    - **Tool:** Use Handbrake or FFmpeg.
    - *Target size:* Under 5MB (ideally under 2MB).

- [ ] **Compress Images:**
    - Convert PNGs to **WebP** or **AVIF**.
    - Many images in `public/logos` and `public/images` can be significantly smaller.
    - **Tool:** Use [Squoosh.app](https://squoosh.app/) or a batch script.

### Phase 3: Infrastructure (CDN)

- [ ] **Move Assets to a CDN:**
    - Serving large assets from the `public/` folder in a basic host is slow.
    - **Option A (Easiest):** If hosting on Vercel/Netlify, they handle some caching, but a dedicated CDN is better for media.
    - **Option B (Cloudinary/ImageKit):** Upload images/videos to Cloudinary. They automatically optimize format and size based on the user's device.
    - **Action:** Replace local paths (e.g., `src="/output.mp4"`) with CDN URLs (e.g., `src="https://res.cloudinary.com/.../video.mp4"`).

## 3. Recommended Code Changes

### A. Refactor `AssetPrefetch.jsx`
Change the strategy to only block for the **absolute essentials**.

```jsx
// Only prefetch the logo and maybe the first hero frame
const criticalImages = [
  "images/logo.svg",
  // Add only the first image user sees
];

// Remove video from prefetch entirely
```

### B. Update `Hero.jsx` for Performance
Use a poster image so the layout is stable immediately.

```jsx
<video
  ref={videoRef}
  src="/output.mp4" // Or CDN URL
  poster="/hero-poster.jpg" // Lightweight image
  muted
  playsInline
  // ...
/>
```

### C. Fix Strict Mode Issues
In `src/main.jsx`, you can temporarily remove `<StrictMode>` to see if the "5 requests" issue drops to 2 or 3, confirming the diagnosis. However, the real fix is proper cleanup in `useEffect`.

## 4. Summary of "Why it loads 5 times"
1.  **Prefetch (Strict Mode Run 1)** -> Request #1
2.  **Prefetch (Strict Mode Run 2)** -> Request #2
3.  **Hero Component Mount (Strict Mode Run 1)** -> Request #3
4.  **Hero Component Mount (Strict Mode Run 2)** -> Request #4
5.  **Browser Range Request / Metadata Check** -> Request #5

**Solution:** Stop prefetching the video manually. Let the `<video>` tag handle it, and use a poster image for immediate visual feedback.
