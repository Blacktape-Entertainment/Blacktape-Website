import { useEffect } from "react";

const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/Blacktape-Entertainment/Blacktape-Website@main/public";

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

  //logos
  "images/logos/Client_0a7e07a82068437ab2ecfe1a7b044774.png",
  "images/logos/Client_0f4662df73ee4b0f8b78beed77952c73.jpeg",
  "images/logos/Client_1ffdebaccf4c416493c8aa0a85018f56.png",
  "images/logos/Client_232fa57f5aa74251a11029b69254e056.png",
  "images/logos/Client_26527ff566eb4b5bb80c837253ac454b (1).png",
  "images/logos/Client_279783299886469e8a3bdf0fbe1b6e6f (1).png",
  "images/logos/Client_2f41a8b2c4b246b6aea5be704cfe305c.jpeg",
  "images/logos/Client_33b08818f739436d98cec41b1a6e71e3.png",
  "images/logos/Client_34c2d9c317ca4af7833bfb8f6769304e.png",
  "images/logos/Client_3b447ec140f141b1b3d12e0d65304e4b.png",
  "images/logos/Client_4540aa5288ce4331b8dfb5c8cadd9ea5.jpeg",
  "images/logos/Client_466a7989574848ecac2177ec11b75c8d.png",
  "images/logos/Client_4824cdf5bfb0490dad573fc6b72f2a8d.png",
  "images/logos/Client_48f349d878c549218188e697b668152a.png",
  "images/logos/Client_4a85687a8bd440ef9b8ecc348034da01.jpeg",
  "images/logos/Client_5c61314cac9542e38a7b7f12248f1eaf.png",
  "images/logos/Client_5f65231e74f249578ab3291eafeceb9d.png",
  "images/logos/Client_61101894c42f4094bbda472f254df7fe.jpeg",
  "images/logos/Client_66b32d66f53c4bf8aebacfa41958c3ed.png",
  "images/logos/Client_68b35e5dfca34f7db7b4bc5ec1d1622c.png",
  "images/logos/Client_73dfd888c0eb47038a7254cd9110c3fd.png",
  "images/logos/Client_7ce90f610aaf4947a9c8773e1b4b9c58.jpeg",
  "images/logos/Client_815c334247004cb1aa43f7ebd2b4d28e (1).jpeg",
  "images/logos/Client_8a46400a519f4e16b7d3a3d8e459be74.png",
  "images/logos/Client_95a6af179f8d442ab06e3536b12356cf.jpg",
  "images/logos/Client_95c35183384c4316a93e27087e10f046.jpeg",
  "images/logos/Client_972032f5a900481390bc6a6129be3e4a (1).png",
  "images/logos/Client_a8987537f89b466b9cc7926cec471651.png",
  "images/logos/Client_b54c64f5f8c741058e79006e6a394fec.jpeg",
  "images/logos/Client_bc3ec43fa0e64d7593f2aa27dd53e925.png",
  "images/logos/Client_bd8cc445f63641e287c405b8f76ef9d8.jpeg",
  "images/logos/Client_c17457be96b149c2a562528c8d14344d.png",
  "images/logos/Client_c3f160135a0c4ef1ae33319f77137318.jpg",
  "images/logos/Client_cf005a69feeb40108d1445599130ce5f.jpg",
  "images/logos/Client_d320d5537271440586f4dccae9f59721.jpg",
  "images/logos/Client_d6835913d984441ba52b5d7f1e11b861.png",
  "images/logos/Client_dd1e519aadf44bc28fdd21fb6f22718d.jpeg",
  "images/logos/Client_dde462b2360243298f9d28965272abe5.png",
  "images/logos/Client_eabefdcb77fa4e6191ee5115e924c55e.png",
  "images/logos/Client_f103153de72242f18565c252c9f9bb7d.gif",
  "images/logos/Client_f667df0d82b44430a0e3ffab7a45856d.png",
  "images/logos/Client_f719198cfcf748f7889bb63c730d872f.png",
  "images/logos/Client_f8c1b7e1292f4c69acfa31e7c6168ba4.png",
];

// Video assets
const videoAssets = [
  "/Blacktape-Website/output.mp4", // Hero video
];

const AssetPrefetch = ({ onAssetsReady }) => {
  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = imageAssets.length + videoAssets.length;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalAssets && onAssetsReady) {
        onAssetsReady();
      }
    };

    // Preload all images and track when they're loaded
    imageAssets.forEach((src) => {
      const img = new Image();
      img.src = `${CDN_BASE}/${src}`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Continue even if error
    });

    // Preload all videos and track when they're loaded
    videoAssets.forEach((src) => {
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
    });
  }, [onAssetsReady]);

  return null; // This component doesn't render anything
};

export default AssetPrefetch;
