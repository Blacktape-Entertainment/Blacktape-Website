import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  entry: { opacity: 1, z: 0, scale: 1, ease: "power3.out", duration: 1.2 },
  exit: {
    opacity: 0,
    z: -2000,
    scale: 0.3,
    ease: "power3.inOut",
    duration: 1.2,
  },
  navbarHide: { opacity: 0, y: -100, ease: "power3.inOut", duration: 1 },
};

const Hero = ({ navbarRef }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);
  const videoTimelineRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(navbarRef?.current, { y: -100, opacity: 0 });

      // Hero scroll-based animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=90%",
          pin: sectionRef.current,
          scrub: true,
        },
      });

      // Video scroll-based animation
      videoTimelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top top",
          end: "+=90%",
          scrub: true,
        },
      });

      // Wait until video metadata is loaded (so we know duration)
      videoRef.current.onloadedmetadata = () => {
        if (videoTimelineRef.current && videoRef.current) {
          videoTimelineRef.current.to(videoRef.current, {
            currentTime: videoRef.current.duration,
            ease: "none",
          });
        }
      };

      // Animate hero content
      timeline.to(contentRef.current, ANIMATION_CONFIG.entry, 0);

      // Animate navbar if ref exists
      if (navbarRef?.current) {
        timeline.to(navbarRef.current, { ...ANIMATION_CONFIG.entry, y: 0 }, 0);
      }

      // Hold hero visible briefly
      timeline.addLabel("hold", ">+=0.5");

      // Exit animation
      timeline.to(contentRef.current, ANIMATION_CONFIG.exit, "hold+=0.3");

      // Hide navbar if ref exists
      if (navbarRef?.current) {
        timeline.to(
          navbarRef.current,
          ANIMATION_CONFIG.navbarHide,
          "hold+=0.3"
        );
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full px-2.5 pt-1.5 pb-6 md:pb-2.5 overflow-x-hidden"
    >
      <div className="relative w-full h-screen overflow-hidden rounded-xl">
        {/* Video for frame animation */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/Blacktape-Website/output.mp4" // ✅ Use base path (based on vite.config.js)
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />

        {/* Hero content */}
        <div
          ref={contentRef}
          className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-6 mt-15"
          style={{
            perspective: "1000px",
            opacity: 0,
            transform: "translateZ(-2000px) scale(0.3)",
          }}
        >
          <h1 className="text-4xl md:text-6xl font-header font-bold">
            Beyond Entertainment.
          </h1>
          <h1 className="text-4xl md:text-6xl font-header font-bold">
            A Realm of Experience.
          </h1>
          <p className="max-w-2xl text-base md:text-lg font-light mt-6 font-header leading-relaxed">
            From cinematic productions to transformative events, we apply our
            commitment to artistry and technical excellence to every project.
          </p>
          <a
            className="mt-8 py-4 px-10 bg-gold text-blacktape font-medium text-sm md:text-base tracking-wide hover:bg-[#d6cfab] transition-all duration-300"
            href="#instantaiconnect"
          >
            Explore Our World
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
