import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG, ASSETS_URL } from "../constants";

const Hero = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const canvasRef = useRef(null);

  const frameCount = 160;
  const currentFrame = (index) => (
    `${ASSETS_URL.replace('/images', '')}/hero-video/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`
  );

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const images = [];
      const heroVideo = {
        frame: 0
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          if (Math.round(heroVideo.frame) === i) {
            render();
          }
        };
        images.push(img);
      }

      const initCanvas = () => {
        canvas.width = images[0].width;
        canvas.height = images[0].height;
        render();
      };

      if (images[0].complete) {
        initCanvas();
      } else {
        images[0].onload = initCanvas;
      }

      function render() {
        const frameIndex = Math.round(heroVideo.frame);
        if (!images[frameIndex] || !images[frameIndex].complete) return;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[frameIndex], 0, 0);
      }

      // Hero scroll-based animation
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // Increased scroll distance for sequential animations
          pin: sectionRef.current,
          scrub: true,
        },
      });

      // 1. Video frames scroll-based animation
      timeline.to(heroVideo, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        onUpdate: render,
        duration: 2 // Relative duration in the timeline
      });

      // 2. Animate hero content in after video finishes
      timeline.to(contentRef.current, ANIMATION_CONFIG.entry, ">");

      // Hold hero visible briefly before unpinning
      timeline.addLabel("hold", ">+=0.5");
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full px-2.5 pt-1.5 pb-6 md:pb-6 lg:pb-2.5 overflow-x-hidden"
    >
      <div className="relative w-full h-screen overflow-hidden rounded-xl bg-black">
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
          className="relative z-20 flex flex-col items-center justify-center text-center text-white h-full px-6 mt-15 perspective-distant opacity-0 translate-z-[-2000px] scale-[0.3]"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-header font-bold">
            Beyond Entertainment.
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-header font-bold">
            A Realm of Experience.
          </h1>
          <p className="max-w-2xl text-base md:text-lg lg:text-xl font-light mt-6 font-header leading-relaxed">
            From cinematic productions to transformative events, we apply our
            commitment to artistry and technical excellence to every project.
          </p>
          <a
            className="mt-8 py-2 md:py-4 px-10 bg-gold text-blacktape font-medium text-sm md:text-base tracking-wide hover:bg-[#d6cfab] transition-all duration-300"
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
