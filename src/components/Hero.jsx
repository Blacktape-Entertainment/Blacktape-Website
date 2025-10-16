import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/videos/hero.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    gsap.set(content, {
      opacity: 0,
      visibility: "hidden",
      transformStyle: "preserve-3d",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      content,
      {
        opacity: 0,
        y: 200,
        z: -600,
        visibility: "visible",
        transformPerspective: 1000,
      },
      {
        opacity: 1,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power3.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden rounded-xl"
    >
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-6 mt-15 opacity-0"
      >
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-header font-bold">
            Beyond Entertainment.
          </h1>
          <h1 className="text-4xl md:text-6xl font-header font-bold">
            A Realm of Experience.
          </h1>
        </div>

        <p className="max-w-2xl text-base md:text-lg font-light mt-6 font-header leading-relaxed">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>

        <button className="mt-8 py-4 px-10 bg-gold text-blacktape font-medium text-sm md:text-base tracking-wide hover:bg-[#d6cfab] transition-all duration-300">
          Explore Our World
        </button>
      </div>
    </section>
  );
};

export default Hero;
