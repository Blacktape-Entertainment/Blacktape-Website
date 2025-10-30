import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { sections } from "../constants";

const DigitalSovereignty = () => {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);
  slidesRef.current = [];

  const addToRefs = (el) => {
    if (el && !slidesRef.current.includes(el)) slidesRef.current.push(el);
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const slides = slidesRef.current;
      if (!section || slides.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          // Initial state
          gsap.set(slides, { opacity: 0 });
          gsap.set(slides[0], { opacity: 1, zIndex: 2 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${slides.length * 150}%`,
              scrub: 1,
              pin: true,
            },
          });

          slides.forEach((slide, i) => {
            if (i === slides.length - 1) return;
            const nextSlide = slides[i + 1];

            const text = slide.querySelector(".text-block");
            const image = slide.querySelector(".image-block");
            const nextText = nextSlide.querySelector(".text-block");
            const nextImage = nextSlide.querySelector(".image-block");

            // exit current
            tl.to(
              [text, image],
              {
                x: isMobile ? 0 : i % 2 === 0 ? -100 : 100,
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
              },
              `slide${i}`
            );

            // background fade-out
            tl.to(
              slide,
              {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
              },
              `slide${i}+=0.2`
            );

            // enter next
            tl.fromTo(
              [nextText, nextImage],
              {
                x: isMobile ? 0 : i % 2 === 0 ? 100 : -100,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              `slide${i}+=0.5`
            );

            tl.to(
              nextSlide,
              { opacity: 1, zIndex: 2, duration: 0.5, ease: "power1.out" },
              `slide${i}+=0.5`
            );
          });
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      id="digitalsovereignty"
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex flex-col justify-center items-center text-center h-[20%] px-4 py-4 md:py-6 z-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold text-black leading-tight mb-1">
          Digital Sovereignty
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-light text-black font-text">
          All at once, all in one, all in between your hands
        </p>
      </div>

      {/* Slides */}
      <div className="relative flex-1 w-full overflow-hidden">
        {sections.map((sec, i) => (
          <div
            key={i}
            ref={addToRefs}
            className={`absolute w-full flex flex-col md:flex-row ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center justify-center px-6 md:px-12 lg:px-24 gap-8 md:gap-12 transition-colors duration-500`}
          >
            {/* Text */}
            <div className="text-block flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3 md:gap-4 max-w-md md:max-w-lg">
              <p className="text-[10px] sm:text-xs md:text-sm font-header text-[#030706] mb-0.5">
                {sec.subtitle}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-bold text-black leading-tight mb-1 md:mb-2">
                {sec.title}
              </h2>
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-text font-light text-[#686a6a] leading-relaxed max-w-xs sm:max-w-sm md:max-w-md line-clamp-3">
                {sec.description}
              </p>
              <a
                href="#instantaiconnect"
                className="px-6 py-3 text-[10px] sm:text-xs md:text-sm text-[#f6f6f6] bg-[#9a9c9b] font-semibold hover:bg-[#858785] transition-all duration-300 mt-4 rounded-none"
              >
                App Coming Soon
              </a>
            </div>

            {/* Image */}
            <div className="image-block flex items-center justify-center mt-6 md:mt-0 w-full md:w-auto">
              <img
                src={sec.image}
                alt={sec.imageAlt}
                className="w-60 sm:w-72 md:w-80 lg:w-[400px] h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalSovereignty;
