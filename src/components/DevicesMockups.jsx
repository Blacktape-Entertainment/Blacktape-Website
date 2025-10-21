import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mockups from "../assets/images/Mockups.png";
import bookIcon from "../assets/images/Book Icon.svg";
import eyeIcon from "../assets/images/Eye Icon.svg";
import statusIcon from "../assets/images/Statue Icon.svg";

gsap.registerPlugin(ScrollTrigger);

const items = [
  {
    id: "quality",
    icon: statusIcon,
    alt: "status icon",
    title: "Excellence, Artistry, and Impact",
    desc: "Focusing on the high quality of the final product.",
  },
  {
    id: "process",
    icon: bookIcon,
    alt: "book icon",
    title: "Strategic, Scientific, and Meticulous",
    desc: "Focusing on their unique and careful process.",
  },
  {
    id: "scope",
    icon: eyeIcon,
    alt: "eye icon",
    title: "Comprehensive, Full-Service, and Visionary",
    desc: "Focusing on their ability to handle everything.",
  },
];

const DevicesMockups = () => {
  const sectionRef = useRef(null);
  const companyGoalsRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    const companyGoals = companyGoalsRef.current;
    const textContent = textContentRef.current;
    const image = imageRef.current;

    if (!section || !textContent || !image) return;

    // Set initial states
    gsap.set([companyGoals, textContent, image], {
      opacity: 1,
      y: 0,
    });

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#devicesmockups",
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Auto-scroll to next section
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#whatisincluded");

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

    // Company Goals exit up
    if (companyGoals) {
      timeline.to(
        companyGoals,
        {
          opacity: 0,
          y: "-100vh",
          ease: "power3.in",
          duration: 0.3,
        },
        0
      );
    }

    // Text Content exit up
    timeline.to(
      textContent,
      {
        opacity: 0,
        y: "-100vh",
        ease: "power3.in",
        duration: 0.3,
      },
      0.1
    );

    // Image exit up
    timeline.to(
      image,
      {
        opacity: 0,
        y: "-100vh",
        ease: "power3.in",
        duration: 0.3,
      },
      0.2
    );

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill(true);
      }
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-full flex flex-col items-center max-sm:justify-center text-center overflow-visible gap-20 md:gap-6"
    >
      {/* Company Goals */}
      <div
        ref={companyGoalsRef}
        className="w-full hidden md:flex flex-row items-center justify-between gap-4 px-4 md:px-8"
      >
        {items.map(({ id, icon, alt, title, desc }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center flex-1 text-center gap-2"
          >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-2">
              <img src={icon} alt={alt} className="w-4 h-4 object-contain" />
              <h1 className="font-header font-semibold text-sm leading-snug text-center lg:text-left">
                {title}
              </h1>
            </div>
            <p className="font-text text-xs text-black/70 max-w-[90%] leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div
        ref={textContentRef}
        className="max-w-3xl flex flex-col items-center gap-2 px-4"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-header font-semibold leading-tight">
          From 2018 to the Forefront of Experience
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-light text-black/70 font-text">
          Our journey began with a deep commitment to creativity and technical
          excellence. Today, we continue to push boundaries and redefine
          entertainment through immersive storytelling and cultural innovation.
        </p>
        <button className="mt-2 px-4 py-2 text-sm text-black font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300">
          Explore the Blacktape Vision
        </button>
      </div>

      {/* Mockup Image */}
      <div
        ref={imageRef}
        className="relative w-full flex  justify-center md:flex-1"
      >
        <img
          src={Mockups}
          alt="Device Mockups"
          className="w-3/4 max-w-4xl h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default DevicesMockups;
