import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import heroVideo from "../assets/videos/hero.mp4";
import Navbar from "./Navbar";

const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const navbar = navbarRef.current;

    // Hide both before animating
    gsap.set([content, navbar], { opacity: 0, visibility: "hidden" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 🌊 1️⃣ Content — fade in slowly from depth
    tl.fromTo(
      content,
      {
        opacity: 0,
        y: 120,
        z: -300,
        rotateX: 15,
        transformPerspective: 1000,
        visibility: "visible",
      },
      {
        opacity: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        duration: 2, // 🕰️ slow and cinematic
      }
    );

    // 🌿 2️⃣ Navbar — glides in from top, overlapping slightly
    tl.fromTo(
      navbar,
      {
        y: -180,
        opacity: 0,
        visibility: "visible",
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.8,
        ease: "power2.out",
      },
      "-=1.2" // 🪶 overlaps gracefully while content is still settling
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden border-t-[12px] border-l-[12px] border-r-[12px] border-white rounded-t-2xl"
    >
      {/* 🧭 Navbar — fixed near top */}
      <nav
        ref={navbarRef}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-50 opacity-0"
      >
        <Navbar />
      </nav>

      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        playsInline
        loop
      />

      {/* 🖤 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />

      {/* ✨ Hero Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col gap-8 items-center justify-center text-center text-white h-full px-6 opacity-0"
      >
        <div className="space-y-3 mt-32">
          <h1 className="text-4xl md:text-6xl font-header font-bold leading-tight tracking-tight">
            Beyond Entertainment.
          </h1>
          <h1 className="text-4xl md:text-6xl font-header font-bold leading-tight tracking-tight">
            A Realm of Experience.
          </h1>
        </div>

        <p className="max-w-2xl text-base md:text-lg font-light mb-6 font-header leading-relaxed">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>

        <button className="py-4 px-10 bg-gold text-blacktape font-medium text-sm md:text-base tracking-wide hover:bg-[#d6cfab] transition-all duration-300">
          Explore Our World
        </button>
      </div>

      {/* ✨ Vignette for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6))] z-[5]" />
    </section>
  );
};

export default Hero;
