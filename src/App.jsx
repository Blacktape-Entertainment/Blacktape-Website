import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import WhoAreWe from "./components/WhoAreWe";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const navbarRef = useRef(null);

  const handleIntroFinish = () => {
    gsap.to(".intro-screen", {
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setShowIntro(false);
        setShowHero(true);
      },
    });
  };

  useEffect(() => {
    if (!showHero || !navbarRef.current) return;

    const navbar = navbarRef.current;

    // Set initial state - navbar off screen
    gsap.set(navbar, { opacity: 0, y: -200, visibility: "visible" });

    // Animate navbar in after intro ends - smoother animation
    gsap.to(navbar, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [showHero]);

  return (
    <>
      <div
        className={`relative w-full h-screen ${
          showIntro ? "bg-black" : "bg-white"
        }`}
      >
        {showIntro && (
          <div className="intro-screen absolute inset-0 z-50 bg-black">
            <Intro onFinish={handleIntroFinish} />
          </div>
        )}

        {/* NAVBAR */}
        {showHero && (
          <div
            ref={navbarRef}
            className="fixed top-0 left-0 mt-10 w-full z-50 opacity-0"
            style={{ transform: "translateY(-200px)" }}
          >
            <Navbar />
          </div>
        )}

        {/* HERO */}
        {showHero && (
          <div className="hero-section absolute inset-0 m-2.5">
            <Hero />
          </div>
        )}
      </div>

      {/* Who Are We section */}
      {!showIntro && (
        <div id="whoarewe">
          <WhoAreWe />
        </div>
      )}
    </>
  );
}

export default App;
