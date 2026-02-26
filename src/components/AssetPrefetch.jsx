import { useEffect } from "react";
import { ASSETS_URL } from "../constants";

// Only prefetch critical assets (Logo, Hero background if needed)
// Everything else should be lazy loaded or loaded naturally
const criticalAssets = [
  `${ASSETS_URL}/logo.svg`,
  `${ASSETS_URL.replace('/images', '')}/hero-video/ezgif-frame-001.jpg`,
];

const AssetPrefetch = ({ onAssetsReady }) => {
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const totalAssets = criticalAssets.length;

    if (totalAssets === 0) {
      onAssetsReady();
      return;
    }

    const checkAllLoaded = () => {
      if (!isMounted) return;
      loadedCount++;
      if (loadedCount >= totalAssets && onAssetsReady) {
        onAssetsReady();
      }
    };

    // Preload critical images
    criticalAssets.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Continue even if error
    });

    return () => {
      isMounted = false;
    };
  }, [onAssetsReady]);

  return null;
};

export default AssetPrefetch;
