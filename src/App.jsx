import { useState } from "react";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import { gsap } from "gsap";
import WhoAreWe from "./components/WhoAreWe";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);

  const handleIntroFinish = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    tl.to(".intro-screen", {
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      onComplete: () => {
        setShowIntro(false);
        setShowHero(true);
      },
    });
  };

  return (
    <>
      <div
        className={`relative w-full h-screen ${
          showIntro ? "bg-black" : "bg-white"
        }`}
      >
        {/* INTRO */}
        {showIntro && (
          <div className="intro-screen absolute inset-0 z-50 bg-black">
            <Intro onFinish={handleIntroFinish} />
          </div>
        )}

        {/* HERO */}
        {showHero && (
          <div className="hero-section absolute inset-0 m-3">
            <Hero />
          </div>
        )}
      </div>

      {/* Who Are We section */}
      {!showIntro && <WhoAreWe />}
    </>
  );
}

export default App;
