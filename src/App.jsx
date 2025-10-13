import { useState } from "react";
import Intro from "./components/Intro";
import Hero from "./components/Hero";
import { gsap } from "gsap";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showHero, setShowHero] = useState(false);

  const handleIntroFinish = () => {
    setTimeout(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
      });

      // 🕶️ Fade out intro
      tl.to(".intro-screen", {
        opacity: 0,
        duration: 0.8,
      }).eventCallback("onComplete", () => {
        // ⏳ Once intro is gone
        setShowIntro(false);
        setShowHero(true);
      });
    }, 400); // delay after intro completes
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* INTRO */}
      {showIntro && (
        <div className="intro-screen absolute inset-0 z-50 bg-black">
          <Intro onFinish={handleIntroFinish} />
        </div>
      )}

      {/* HERO */}
      {showHero && (
        <div className="hero-section absolute inset-0">
          <Hero />
        </div>
      )}
    </div>
  );
}

export default App;
