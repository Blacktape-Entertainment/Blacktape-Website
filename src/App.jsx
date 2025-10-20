import { useState, useRef } from "react";
import { gsap } from "gsap";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WhoAreWe from "./components/WhoAreWe";
import CompanyGoals from "./components/CompanyGoals";
import DevicesMockups from "./components/DevicesMockups";
import WhatIsIncluded from "./components/WhatIsIncluded";
import OurTeam from "./components/OurTeam";
import ItsYourTurn from "./components/ItsYourTurn";
import DigitalSovereignty from "./components/DigitalSovereignty";
import TrustedClients from "./components/TrustedClients";
import InstantAIConnect from "./components/InstantAIConnect";
import InstantAICalls from "./components/InstantAICalls";
import BlacktapeFooter from "./components/BlacktapeFooter";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const navbarRef = useRef(null);

  const handleIntroFinish = () => {
    // Set showIntro to false immediately so content renders behind the fading intro
    setShowIntro(false);

    // Fade out the intro screen
    gsap.to(".intro-screen", {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <>
      {/* Intro Screen */}
      {showIntro && (
        <section className="intro-screen fixed inset-0 z-[100] w-full h-screen bg-black flex items-center justify-center p-4">
          <Intro onFinish={handleIntroFinish} />
        </section>
      )}

      {/* Main Content - Only render after intro */}
      {!showIntro && (
        <div className="bg-white">
          {/* Navbar */}
          <nav
            ref={navbarRef}
            className="fixed top-0 left-0 mt-10 w-full z-50 opacity-0"
          >
            <Navbar />
          </nav>

          {/* Hero Section */}
          <section
            id="hero-wrapper"
            className="relative w-full px-2.5 pt-1.5 pb-6 md:pb-2.5"
          >
            <Hero navbarRef={navbarRef} />
          </section>

          {/* Who Are We */}
          <section className="w-full flex justify-center pt-16 pb-7 md:pb-24">
            <WhoAreWe />
          </section>

          {/* Company Goals */}
          <section className="w-full hidden md:flex items-center justify-center pb-5 md:pb-20">
            <CompanyGoals />
          </section>

          {/* Devices Mockups */}
          <section className="w-full text-center flex flex-col justify-center pb-6 md:pb-20">
            <DevicesMockups />
          </section>

          {/* What Is Included */}
          <section className="w-full gap-8 md:pb-24 md:px-20 px-2.5 pb-12">
            <WhatIsIncluded />
          </section>

          {/* Our Team */}
          <section className="w-full">
            <OurTeam />
          </section>

          {/* It's Your Turn */}
          <section className="w-full h-full px-4 pt-10">
            <ItsYourTurn />
          </section>

          {/* Digital Sovereignty */}
          <section className="w-full">
            <DigitalSovereignty />
          </section>
          <TrustedClients />

          {/* Instant AI Connect (big title + phone) */}
          <section className="w-full">
            <InstantAIConnect />
          </section>

          {/* Instant AI Calls (left text + phone) */}
          <section className="w-full">
            <InstantAICalls />
          </section>

          {/* Footer */}
          <BlacktapeFooter />
        </div>
      )}
    </>
  );
}

export default App;
