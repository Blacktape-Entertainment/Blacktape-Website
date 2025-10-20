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

    // Pause video initially
    video.pause();

    // Set initial state for content (deep in z-space, below viewport)
    gsap.set(content, {
      opacity: 0,
      y: "100vh",
      z: -1000,
      scale: 0.5,
    });

    // Set initial state for navbar
    if (navbarRef && navbarRef.current) {
      gsap.set(navbarRef.current, {
        opacity: 0,
        y: -300,
      });
    }

    // Create a master timeline that will be controlled by scroll
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrapper",
        start: "top top",
        end: "+=300%", // Extended for entry + scroll animations
        pin: "#hero-wrapper",
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          // Scrub video playback based on scroll progress
          if (video.duration) {
            const progress = self.progress;
            // Video plays during middle section (0.2 to 0.7 of total timeline)
            if (progress >= 0.2 && progress <= 0.7) {
              const videoProgress = (progress - 0.2) / 0.5;
              video.currentTime = videoProgress * video.duration;
            }
          }
        },
      },
    });

    // Phase 1: Entry animations (0-20% of scroll)
    // Animate content from bottom with z-depth
    masterTimeline.to(
      content,
      {
        opacity: 1,
        y: 0,
        z: 0,
        scale: 1,
        ease: "power3.out",
      },
      0
    );

    // Animate navbar from top (synchronized with content)
    if (navbarRef && navbarRef.current) {
      masterTimeline.to(
        navbarRef.current,
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        0 // Start at the same time as content
      );
    }

    // Phase 2: Hold position while video plays (20-70% of scroll)
    // Add a pause/hold by adding a label
    masterTimeline.addLabel("videoPlaying", ">");

    // Phase 3: Exit animations (70-100% of scroll)
    // Animate text in reverse (back into z-space and down)
    masterTimeline.to(
      content,
      {
        opacity: 0,
        y: "100vh",
        z: -1000,
        scale: 0.5,
        ease: "power3.in",
      },
      ">"
    );

    // Animate navbar in reverse (back up) at the same time
    if (navbarRef && navbarRef.current) {
      masterTimeline.to(
        navbarRef.current,
        {
          opacity: 0,
          y: -300,
          ease: "power3.in",
        },
        "<" // Start at the same time as content exit
      );
    }

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
      {/* Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideo}
        muted
        playsInline
        preload="auto"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

      {/* Content */}
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
