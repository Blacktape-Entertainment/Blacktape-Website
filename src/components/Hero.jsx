import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/videos/hero.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ navbarRef }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const video = videoRef.current;

    if (!section || !content || !video) return;

    video.pause();

    // Initial states: text hidden deep inside, navbar hidden above
    gsap.set(content, {
      opacity: 0,
      z: -2000,
      scale: 0.3,
    });

    if (navbarRef?.current) {
      gsap.set(navbarRef.current, {
        opacity: 0,
        y: -300,
      });
    }

    // Auto-scroll flag
    let hasScrolled = false;

    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrapper",
        start: "top top",
        end: "+=200%",
        pin: "#hero-wrapper",
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Sync video with scroll
          if (video.duration) {
            video.currentTime = progress * video.duration;
          }

          // Auto-scroll to next section at end
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#whoarewe");

            if (nextSection) {
              setTimeout(() => {
                const targetY =
                  nextSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: targetY, behavior: "smooth" });
              }, 300);
            }
          }

          if (progress < 0.99) {
            hasScrolled = false;
          }
        },
      },
    });

    // Phase 1: Entry animations (text from inside, navbar from top)
    masterTimeline.to(
      content,
      {
        opacity: 1,
        z: 0,
        scale: 1,
        ease: "power3.out",
        duration: 0.3,
      },
      0
    );

    if (navbarRef?.current) {
      masterTimeline.to(
        navbarRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.3,
        },
        0
      );
    }

    // Phase 2: Hold while video plays
    masterTimeline.addLabel("hold", ">");

    // Phase 3: Exit animation (text back inside, navbar stays)
    masterTimeline.to(
      content,
      {
        opacity: 0,
        z: -2000,
        scale: 0.3,
        ease: "power3.in",
        duration: 0.3,
      },
      0.7
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [navbarRef]);

  return (
    <div
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden rounded-xl"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-6 mt-15"
        style={{ perspective: "1000px" }}
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
    </div>
  );
};

export default Hero;
