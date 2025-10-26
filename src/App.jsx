import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WhoAreWe from "./components/WhoAreWe/WhoAreWe";
import DevicesMockups from "./components/DevicesMockups";
import WhatIsIncluded from "./components/WhatIsIncluded";
import OurTeam from "./components/OurTeam";
import ItsYourTurn from "./components/ItsYourTurn";
import DigitalSovereignty from "./components/DigitalSovereignty";
import TrustedClients from "./components/TrustedClients";
import InstantAIConnect from "./components/InstantAIConnect";
import BlacktapeFooter from "./components/BlacktapeFooter";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const navbarRef = useRef(null);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  // useGSAP handles navbar show/hide on scroll
  useGSAP(
    () => {
      if (showIntro || !navbarRef.current) return;

      const isMobile = window.innerWidth < 768;
      const visibleSections = [
        "whatisincluded",
        ...(isMobile ? [] : ["ourteam"]),
        "trustedclients",
        "instantaiconnect",
        "footer",
      ];

      let isNavbarVisible = false;

      const checkSection = () => {
        const scrollY = window.scrollY + window.innerHeight / 2;
        const hero = document.getElementById("hero-wrapper");
        if (hero) {
          const { top, height } = hero.getBoundingClientRect();
          const heroTop = top + window.scrollY;
          if (scrollY >= heroTop && scrollY <= heroTop + height) return;
        }

        const shouldShow = visibleSections.some((id) => {
          const section = document.getElementById(id);
          if (!section) return false;
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          return scrollY >= sectionTop && scrollY <= sectionTop + height;
        });

        if (shouldShow !== isNavbarVisible) {
          isNavbarVisible = shouldShow;
          gsap.to(navbarRef.current, {
            opacity: shouldShow ? 1 : 0,
            y: shouldShow ? 0 : -100,
            duration: 0.6,
            ease: shouldShow ? "power3.out" : "power3.in",
          });
        }
      };

      window.addEventListener("scroll", checkSection);
      window.addEventListener("resize", checkSection);
      checkSection();

      return () => {
        window.removeEventListener("scroll", checkSection);
        window.removeEventListener("resize", checkSection);
      };
    },
    { dependencies: [showIntro] }
  );

  return (
    <>
      {showIntro && (
        <section className="intro-screen fixed inset-0 z-[100] w-full h-screen bg-black flex items-center justify-center p-4">
          <Intro onFinish={handleIntroFinish} />
        </section>
      )}

      {!showIntro && (
        <div className="bg-white overflow-x-hidden">
          <nav
            ref={navbarRef}
            className="fixed top-0 left-0 mt-7 w-full z-50"
            style={{ opacity: 0, transform: "translateY(-100px)" }}
          >
            <Navbar />
          </nav>

          <section
            id="hero-wrapper"
            className="relative w-full px-2.5 pt-1.5 pb-6 md:pb-2.5 overflow-x-hidden"
          >
            <Hero navbarRef={navbarRef} />
          </section>

          <section id="whoarewe-wrapper" className="w-full">
            <WhoAreWe />
          </section>

          <section
            id="devicesmockups"
            className="w-full h-screen flex flex-col items-center justify-center py-10"
          >
            <DevicesMockups />
          </section>

          <section
            id="whatisincluded"
            className="w-full gap-8 md:pb-24 md:px-20 px-2.5 pb-12 h-screen pt-20"
          >
            <WhatIsIncluded />
          </section>

          <section id="ourteam" className="w-full">
            <OurTeam />
          </section>

          <section id="itsyourturn" className="w-full h-full px-4">
            <ItsYourTurn />
          </section>

          <section id="digitalsovereignty" className="w-full">
            <DigitalSovereignty />
          </section>

          <section id="trustedclients" className="w-full">
            <TrustedClients />
          </section>

          <section id="instantaiconnect" className="w-full">
            <InstantAIConnect />
          </section>

          <footer id="footer">
            <BlacktapeFooter />
          </footer>
        </div>
      )}
    </>
  );
}

export default App;
