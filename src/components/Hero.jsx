import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "../assets/videos/hero.mp4";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  entry: { opacity: 1, z: 0, scale: 1, ease: "power3.out", duration: 0.5 },
  exit: { opacity: 0, z: -2000, scale: 0.3, ease: "power3.in", duration: 0.5 },
  navbarHide: { opacity: 0, y: -100, ease: "power3.in", duration: 0.5 },
};

const Hero = ({ navbarRef }) => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const content = contentRef.current;
    const video = videoRef.current;

    if (!content || !video) return;

    video.pause();

    gsap.set(content, { opacity: 0, z: -2000, scale: 0.3 });
    if (navbarRef?.current) {
      gsap.set(navbarRef.current, { opacity: 0, y: -300 });
    }

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrapper",
        start: "top top",
        end: "+=200%",
        pin: "#hero-wrapper",
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const { progress, direction } = self;

          if (video.duration) {
            video.currentTime = progress * video.duration;
          }

          if (progress >= 0.99 && direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.getElementById("whoarewe");

            if (nextSection) {
              setTimeout(() => {
                window.scrollTo({
                  top: nextSection.getBoundingClientRect().top + window.scrollY,
                  behavior: "smooth",
                });
              }, 300);
            }
          }

          if (progress < 0.99) hasScrolled = false;
        },
      },
    });

    timeline.to(content, ANIMATION_CONFIG.entry, 0);

    if (navbarRef?.current) {
      timeline.to(navbarRef.current, { ...ANIMATION_CONFIG.entry, y: 0 }, 0);
    }

    timeline.addLabel("hold", ">");
    timeline.to(content, ANIMATION_CONFIG.exit, 0.7);

    if (navbarRef?.current) {
      timeline.to(navbarRef.current, ANIMATION_CONFIG.navbarHide, 0.7);
    }

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill(true);
      }
      timeline.kill();
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
        style={{
          perspective: "1000px",
          opacity: 0,
          transform: "translateZ(-2000px) scale(0.3)",
        }}
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
