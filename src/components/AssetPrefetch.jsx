import { useEffect } from "react";

// All image assets used across the application
const imageAssets = [
  // InstantAIConnect
  "images/ai-antenna-2.png",
  "images/Part-1.png",
  "images/Part-2.png",

  // BlacktapeFooter
  "images/Footer Picture.png",
  "images/Blacktape Footer.png",

  // RequestCallModal
  "images/x-image.png",
  "images/modal.png",

  // Navbar
  "images/logo.svg",

  // WhoAreWe (VALUES from constants)
  "images/Logo1.svg",
  "images/Logo2.svg",
  "images/Logo3.svg",
  "images/Logo4.svg",
  "images/radio.png",
  "images/radio-mobile.png",
  "images/tuner.png",
  "images/value.png",
  "images/select.png",

  // DevicesMockups (items from constants)
  "images/Statue Icon.svg",
  "images/Book Icon.svg",
  "images/Eye Icon.svg",
  "images/Mockups.png",

  // WhatIsIncluded (cards from constants)
  "images/card1.png",
  "images/card2.png",
  "images/card3.png",
  "images/card4.png",
  "images/card5.png",
  "images/card6.png",

  // DigitalSovereignty (sections from constants)
  "images/mockup-1.png",
  "images/mockup-2.png",
  "images/mockup-3.png",

  // OurTeam
  "images/team-bg.jpg",
  "images/team-bg-mobile.jpg",
  "images/left-image-our-team.png",
  "images/team-mohammed.jpg",
  "images/team-ahmed.jpg",
  "images/team-ammar.jpg",
];

// Video assets
const videoAssets = [
  "/Blacktape-Website/output.mp4", // Hero video
];

// Critical assets that must load before showing content
const criticalAssets = [
  "images/logo.svg", // Navbar logo
  "/Blacktape-Website/output.mp4", // Hero video
  "images/ai-antenna-2.png", // InstantAIConnect phone
];

const AssetPrefetch = ({ onAssetsReady }) => {
  useEffect(() => {
    let loadedCount = 0;
    const totalCritical = criticalAssets.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalCritical && onAssetsReady) {
        onAssetsReady();
      }
    };

    // Preload critical assets and track when they're loaded
    criticalAssets.forEach((src) => {
      if (src.endsWith(".mp4")) {
        // For video - wait until it can play through without buffering
        const video = document.createElement("video");
        video.preload = "auto";
        video.src = src;
        video.muted = true; // Muted videos load faster
        video.playsInline = true;

        // Wait for enough data to play through
        video.oncanplaythrough = checkAllLoaded;
        video.onerror = checkAllLoaded; // Continue even if error

        // Start loading
        video.load();
      } else {
        // For images
        const img = new Image();
        img.src = src;
        img.onload = checkAllLoaded;
        img.onerror = checkAllLoaded; // Continue even if error
      }
    });

    // Prefetch remaining images in background
    imageAssets.forEach((src) => {
      if (!criticalAssets.includes(src)) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      }
    });

    // Prefetch videos in background
    videoAssets.forEach((src) => {
      if (!criticalAssets.includes(src)) {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.as = "video";
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }, [onAssetsReady]);

  return null; // This component doesn't render anything
};

export default AssetPrefetch;
