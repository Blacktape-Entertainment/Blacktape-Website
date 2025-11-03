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

const AssetPrefetch = () => {
  useEffect(() => {
    console.log("🚀 Asset Prefetch Started");
    console.log(
      `📦 Prefetching ${imageAssets.length} images and ${videoAssets.length} video(s)`
    );

    let prefetchCount = 0;
    let preloadCount = 0;

    // Prefetch images
    imageAssets.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
      prefetchCount++;
    });

    // Prefetch videos
    videoAssets.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "video";
      link.href = src;
      document.head.appendChild(link);
      prefetchCount++;
    });

    console.log(`✅ Added ${prefetchCount} prefetch links to <head>`);

    // Optional: Preload critical assets (show immediately)
    const criticalAssets = [
      { src: "images/logo.svg", type: "image" }, // Navbar logo
      { src: "images/ai-antenna-2.png", type: "image" }, // InstantAIConnect phone
    ];

    criticalAssets.forEach(({ src, type }) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = type;
      link.href = src;
      document.head.appendChild(link);
      preloadCount++;
    });

    // For video, use a different approach - create video element to trigger preload
    const videoPreload = document.createElement("link");
    videoPreload.rel = "prefetch"; // Use prefetch instead of preload for video
    videoPreload.as = "video";
    videoPreload.href = "/Blacktape-Website/output.mp4";
    document.head.appendChild(videoPreload);
    prefetchCount++;

    console.log(`⚡ Added ${preloadCount} preload links for critical assets`);
    console.log(`🎬 Added video prefetch for hero video`);
    console.log(
      "🎯 Asset Prefetch Complete - Check Network tab to see requests"
    );

    // Log the links added to head
    console.group("📋 Prefetch/Preload Links Details");
    console.log("Prefetch links:", prefetchCount);
    console.log("Preload links:", preloadCount);
    console.log("Total links added:", prefetchCount + preloadCount);
    console.groupEnd();
  }, []);

  return null; // This component doesn't render anything
};

export default AssetPrefetch;
