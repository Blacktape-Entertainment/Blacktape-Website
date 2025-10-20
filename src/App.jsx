import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WhoAreWe from "./components/WhoAreWe";
import DevicesMockups from "./components/DevicesMockups";
import WhatIsIncluded from "./components/WhatIsIncluded";
import OurTeam from "./components/OurTeam";
import ItsYourTurn from "./components/ItsYourTurn";
import DigitalSovereignty from "./components/DigitalSovereignty";
import TrustedClients from "./components/TrustedClients";
import InstantAIConnect from "./components/InstantAIConnect";
import BlacktapeFooter from "./components/BlacktapeFooter";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    if (showIntro || !navbarRef.current) return;

    // Sections where navbar should be visible
    const visibleSections = [
      "hero-wrapper",
      "whatisincluded",
      "ourteam",
      "trustedclients",
      "instantaiconnect",
      "footer",
    ];

    let isNavbarVisible = false;

    const checkSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let shouldShowNavbar = false;

      for (const sectionId of visibleSections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;

          if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            shouldShowNavbar = true;
            break;
          }
        }
      }

      // Animate navbar in/out
      if (shouldShowNavbar && !isNavbarVisible) {
        isNavbarVisible = true;
        gsap.to(navbarRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else if (!shouldShowNavbar && isNavbarVisible) {
        isNavbarVisible = false;
        gsap.to(navbarRef.current, {
          opacity: 0,
          y: -100,
          duration: 0.6,
          ease: "power3.in",
        });
      }
    };

    // Check on scroll
    window.addEventListener("scroll", checkSection);

    // Initial check
    checkSection();

    return () => {
      window.removeEventListener("scroll", checkSection);
    };
  }, [showIntro]);

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
        <div className="bg-white overflow-x-hidden">
          {/* Navbar */}
          <nav
            ref={navbarRef}
            className="fixed top-0 left-0 mt-10 w-full z-50"
            style={{ opacity: 0, transform: "translateY(-100px)" }}
          >
            <Navbar />
          </nav>

          {/* Hero Section */}
          <section
            id="hero-wrapper"
            className="relative w-full px-2.5 pt-1.5 pb-6 md:pb-2.5 overflow-x-hidden"
          >
            <Hero navbarRef={navbarRef} />
          </section>

          {/* Who Are We */}
          <section id="whoarewe-wrapper" className="w-full">
            <WhoAreWe />
          </section>

          {/* Company Goals & Studio */}
          <section
            id="devicesmockups"
            className="w-full h-screen flex flex-col items-center justify-center py-10"
          >
            <DevicesMockups />
          </section>

          {/* What Is Included */}
          <section
            id="whatisincluded"
            className="w-full gap-8 md:pb-24 md:px-20 px-2.5 pb-12 pt-20"
          >
            <WhatIsIncluded />
          </section>

          {/* Our Team */}
          <section id="ourteam" className="w-full">
            <OurTeam />
          </section>

          {/* It's Your Turn */}
          <section id="itsyourturn" className="w-full h-full px-4">
            <ItsYourTurn />
          </section>

          {/* Digital Sovereignty */}
          <section id="digitalsovereignty" className="w-full">
            <DigitalSovereignty />
          </section>

          <section id="trustedclients" className="w-full">
            <TrustedClients />
          </section>

          {/* Instant AI Connect - Merged component with scroll animation */}
          <section id="instantaiconnect" className="w-full">
            <InstantAIConnect />
          </section>

          {/* Footer */}
          <footer id="footer">
            <BlacktapeFooter />
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
