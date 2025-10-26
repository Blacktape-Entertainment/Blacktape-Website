import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const TOTAL_FRAMES = 192; // total number of frames for canvas animation
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
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);

  // Preload all frames for canvas animation
  useEffect(() => {
    const imgs = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src =
        import.meta.env.BASE_URL +
        `frames/frame_${i.toString().padStart(4, "0")}.jpg`; // path with BASE_URL
      imgs.push(img);
    }
    setImages(imgs);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!canvas || !content) return;

    const ctx = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1; // handle retina screens
    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;
    ctx.scale(scale, scale);

    // Draw first frame immediately
    images[0].onload = () => {
      ctx.drawImage(
        images[0],
        0,
        0,
        canvas.width / scale,
        canvas.height / scale
      );
    };
    if (images[0].complete) {
      ctx.drawImage(
        images[0],
        0,
        0,
        canvas.width / scale,
        canvas.height / scale
      );
    }

    // Set initial state of content and navbar
    gsap.set(content, { opacity: 0, z: -2000, scale: 0.3 });
    if (navbarRef?.current)
      gsap.set(navbarRef.current, { opacity: 0, y: -300 });

    let frameState = { frame: 0 };

    // Render the current frame on the canvas
    const renderFrame = () => {
      const img = images[frameState.frame];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width / scale, canvas.height / scale);
    };

    // Animate frames based on scroll progress
    gsap.to(frameState, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: "#hero-wrapper",
        start: "top top",
        end: "+=100%", // slower frame scroll
        markers: true,
        pinSpacing: true,
        scrub: 1.5,
      },
      onUpdate: renderFrame,
    });

    // Animate hero content and navbar
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-wrapper",
        start: "top top",
        end: "+=100%", // longer scroll duration
        pin: "#hero-wrapper",
        pinSpacing: true,
        scrub: 1.5,
      },
    });

    timeline.to(content, ANIMATION_CONFIG.entry, 0);
    if (navbarRef?.current)
      timeline.to(navbarRef.current, { ...ANIMATION_CONFIG.entry, y: 0 }, 0);

    timeline.addLabel("hold", ">+=0.5"); // hold hero visible briefly

    timeline.to(content, ANIMATION_CONFIG.exit, "hold+=0.3");
    if (navbarRef?.current)
      timeline.to(navbarRef.current, ANIMATION_CONFIG.navbarHide, "hold+=0.3");

    // Smooth scroll to next section after hero finishes
    timeline.eventCallback("onComplete", () => {
      const nextSection = document.getElementById("whoarewe-wrapper");
      if (nextSection) {
        gsap.to(window, {
          duration: 2, // smoother transition
          scrollTo: { y: nextSection, offsetY: 0 },
          ease: "power2.inOut",
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      timeline.kill();
    };
  }, [images, navbarRef]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden rounded-xl"
    >
      {/* Canvas for frame animation */}
      <canvas
        ref={canvasRef}
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
        <button className="mt-8 py-4 px-10 bg-gold text-blacktape font-medium text-sm md:text-base tracking-wide hover:bg-[#d6cfab] transition-all duration-300">
          Explore Our World
        </button>
      </div>
    </div>
  );
};

export default Hero;
