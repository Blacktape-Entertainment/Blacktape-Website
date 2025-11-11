import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

// Components
import AssetPrefetch from "./components/AssetPrefetch";
import Intro from "./components/Intro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoAreWe from "./components/WhoAreWe";
import DevicesMockups from "./components/DevicesMockups";
import WhatIsIncluded from "./components/WhatIsIncluded";
import DigitalSovereignty from "./components/DigitalSovereignty";
import TrustedClients from "./components/TrustedClients";
import InstantAIConnect from "./components/InstantAIConnect";
import BlacktapeFooter from "./components/BlacktapeFooter";
import OurTeam from "./components/OurTeam";

gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  const navbarRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [layoutType] = useState(isMobile ? "mobile" : "desktop");

  const [showIntro, setShowIntro] = useState(true);
  const [assetsReady, setAssetsReady] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  // Reload the page if layout type changes (to avoid mismatched animations/layouts)
  useEffect(() => {
    const currentLayout = isMobile ? "mobile" : "desktop";
    if (layoutType !== currentLayout) window.location.reload();
  }, [isMobile, layoutType]);

  // Hide intro only when both intro animation finished AND all assets are ready
  useEffect(() => {
    if (introFinished && assetsReady) {
      setShowIntro(false);
    }
  }, [introFinished, assetsReady]);

  return (
    <main className="w-full overflow-hidden">
      {/* Prefetch all assets */}
      <AssetPrefetch onAssetsReady={() => setAssetsReady(true)} />

      {/* Intro screen - stays until assets are ready */}
      {showIntro ? (
        <Intro onFinish={() => setIntroFinished(true)} />
      ) : (
        <>
          <Navbar ref={navbarRef} />
          <Hero navbarRef={navbarRef} />
          <WhoAreWe navbarRef={navbarRef} />
          <DevicesMockups navbarRef={navbarRef} />
          <WhatIsIncluded />
          <OurTeam />
          <DigitalSovereignty />
          <TrustedClients navbarRef={navbarRef} />
          <InstantAIConnect />
          <BlacktapeFooter navbarRef={navbarRef} />
        </>
      )}
    </main>
  );
}

export default App;
