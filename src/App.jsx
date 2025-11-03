import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

import AssetPrefetch from "./components/AssetPrefetch";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WhoAreWe from "./components/WhoAreWe";
import DevicesMockups from "./components/DevicesMockups";
import WhatIsIncluded from "./components/WhatIsIncluded";
import OurTeam from "./components/OurTeam";
import DigitalSovereignty from "./components/DigitalSovereignty";
import TrustedClients from "./components/TrustedClients";
import InstantAIConnect from "./components/InstantAIConnect";
import BlacktapeFooter from "./components/BlacktapeFooter";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const navbarRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [layoutType] = useState(isMobile ? "mobile" : "desktop");

  useEffect(() => {
    const newLayout = isMobile ? "mobile" : "desktop";

    if (layoutType !== newLayout) {
      window.location.reload();
    }
  }, [isMobile, layoutType]);

  // Hide intro only when BOTH intro animation AND assets are ready
  useEffect(() => {
    if (introFinished && assetsReady) {
      setShowIntro(false);
    }
  }, [introFinished, assetsReady]);

  const handleIntroFinish = () => {
    setIntroFinished(true);
  };

  const handleAssetsReady = () => {
    setAssetsReady(true);
  };

  return (
    <main className="w-full overflow-hidden">
      {/* Prefetch all assets */}
      <AssetPrefetch onAssetsReady={handleAssetsReady} />
      {showIntro && <Intro onFinish={handleIntroFinish} />} {/* Done */}
      {!showIntro && (
        <>
          <Navbar ref={navbarRef} /> {/* Done */}
          <Hero navbarRef={navbarRef} /> {/* Done */}
          <WhoAreWe navbarRef={navbarRef} /> {/* Done */}
          <DevicesMockups navbarRef={navbarRef} /> {/* Done */}
          <WhatIsIncluded /> {/* Done */}
          {/* <OurTeam /> */}
          <DigitalSovereignty /> {/* Done */}
          <TrustedClients navbarRef={navbarRef} /> {/* Done */}
          <InstantAIConnect /> {/* Done */}
          <BlacktapeFooter navbarRef={navbarRef} /> {/* Done */}
        </>
      )}
    </main>
  );
}

export default App;
