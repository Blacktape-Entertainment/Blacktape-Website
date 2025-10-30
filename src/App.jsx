import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

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
  const navbarRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [layoutType] = useState(isMobile ? "mobile" : "desktop");

  useEffect(() => {
    const newLayout = isMobile ? "mobile" : "desktop";

    if (layoutType !== newLayout) {
      window.location.reload();
    }
  }, [isMobile, layoutType]);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  return (
    <main className="w-full overflow-hidden">
      {showIntro && <Intro onFinish={handleIntroFinish} />}

      {!showIntro && (
        <>
          <Navbar ref={navbarRef} />
          <Hero navbarRef={navbarRef} />
          <WhoAreWe />
          <DevicesMockups />
          <WhatIsIncluded />
          <OurTeam />
          <DigitalSovereignty />
          <TrustedClients />
          <BlacktapeFooter />
          {/* 
          <InstantAIConnect />
           */}
        </>
      )}
    </main>
  );
}

export default App;
