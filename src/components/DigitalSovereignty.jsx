import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { sections } from "../constants";

const DigitalSovereignty = () => {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);
  const headerRef = useRef(null);
  const leftPhoneRef = useRef(null);
  const middlePhoneRef = useRef(null);
  const rightPhoneRef = useRef(null);
  slidesRef.current = [];

  const addToRefs = (el) => {
    if (el && !slidesRef.current.includes(el)) slidesRef.current.push(el);
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const slides = slidesRef.current;
      const header = headerRef.current;
      const leftPhone = leftPhoneRef.current;
      const middlePhone = middlePhoneRef.current;
      const rightPhone = rightPhoneRef.current;
      if (
        !section ||
        slides.length === 0 ||
        !header ||
        !leftPhone ||
        !middlePhone ||
        !rightPhone
      )
        return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          // Initial state for header and phones
          if (isMobile) {
            // Mobile: no scale animation, header at normal size, phones hidden
            gsap.set(header, { scale: 1, opacity: 1 });
            gsap.set([leftPhone, middlePhone, rightPhone], {
              opacity: 0,
              display: "none",
            });
          } else {
            // Desktop/Tablet: full intro animation
            gsap.set(header, { scale: 2, opacity: 1 });
            gsap.set([leftPhone, middlePhone, rightPhone], {
              x: 0,
              y: 0,
              opacity: 1,
            });
          }

          // Initial state - set all slides invisible
          gsap.set(slides, { opacity: 0 });

          // Set initial positions for first slide elements
          const firstText = slides[0].querySelector(".text-block");
          const firstImage = slides[0].querySelector(".image-block");
          gsap.set(firstText, { x: isMobile ? -100 : -100, opacity: 0 });
          gsap.set(firstImage, {
            x: isMobile ? 0 : 100,
            y: isMobile ? 100 : 100,
            opacity: 0,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${slides.length * 150 + 100}%`,
              scrub: 1,
              pin: true,
            },
          });

          // Intro animation only for desktop/tablet
          if (!isMobile) {
            // Header scales down, phones exit in different directions (simultaneously)
            tl.to(
              header,
              {
                scale: 1,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0
            );

            // Left phone exits to bottom-left (same time as header)
            tl.to(
              leftPhone,
              {
                x: "-100vw",
                y: "100vh",
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
              },
              0
            );

            // Middle phone exits to bottom (same time as header)
            tl.to(
              middlePhone,
              {
                y: "100vh",
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
              },
              0
            );

            // Right phone exits to bottom-right (same time as header)
            tl.to(
              rightPhone,
              {
                x: "100vw",
                y: "100vh",
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
              },
              0
            );
          }

          // Show first slide after intro (or immediately on mobile)
          const firstSlideStart = isMobile ? 0 : 0.4;
          tl.to(
            slides[0],
            { opacity: 1, zIndex: 2, duration: 0.3 },
            firstSlideStart
          );

          // Animate first slide elements
          tl.to(
            firstText,
            {
              x: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            firstSlideStart + 0.1
          );

          tl.to(
            firstImage,
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            firstSlideStart + 0.2
          );

          slides.forEach((slide, i) => {
            if (i === slides.length - 1) return;
            const nextSlide = slides[i + 1];

            const text = slide.querySelector(".text-block");
            const image = slide.querySelector(".image-block");
            const nextText = nextSlide.querySelector(".text-block");
            const nextImage = nextSlide.querySelector(".image-block");

            // Exit current slide
            tl.to(
              [text, image],
              {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
              },
              `slide${i}`
            );

            // Background fade-out
            tl.to(
              slide,
              {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
              },
              `slide${i}+=0.2`
            );

            // Enter next slide with specific directions based on slide number
            let textFromX, textFromY, imageFromX, imageFromY;

            if (i === 0) {
              // Second slide (index 1): text from right (desktop) / left (mobile), image from left-bottom (desktop) / bottom (mobile)
              textFromX = isMobile ? -100 : 100;
              textFromY = 0;
              imageFromX = isMobile ? 0 : -100;
              imageFromY = 100;
            } else if (i === 1) {
              // Third slide (index 2): text from left, image from right-bottom (desktop) / bottom (mobile)
              textFromX = -100;
              textFromY = 0;
              imageFromX = isMobile ? 0 : 100;
              imageFromY = 100;
            } else {
              // Fallback for additional slides
              textFromX = -100;
              textFromY = 0;
              imageFromX = 0;
              imageFromY = 100;
            }

            tl.fromTo(
              nextText,
              {
                x: textFromX,
                y: textFromY,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              `slide${i}+=0.5`
            );

            tl.fromTo(
              nextImage,
              {
                x: imageFromX,
                y: imageFromY,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
              },
              `slide${i}+=0.7`
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
      <div
        ref={headerRef}
        className="flex flex-col justify-center items-center text-center px-[5%] py-[1.5vh] sm:py-[2vh] md:py-[3vh] lg:py-[4vh] z-[5] shrink-0"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-header font-bold text-black leading-tight mb-[0.5vh]">
          Digital Sovereignty
        </h1>
        <p className="text-[0.625rem] sm:text-xs md:text-sm lg:text-base font-light text-black font-text">
          All at once, all in one, all in between your hands
        </p>
      </div>

      {/* Phones Row - Centered (Hidden on Mobile) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[15] hidden md:flex items-center justify-center">
        <img
          ref={leftPhoneRef}
          src="images/left-phone.png"
          alt="Left Phone"
          className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto object-contain -mr-8 sm:-mr-10 md:-mr-12 lg:-mr-16"
        />
        <img
          ref={middlePhoneRef}
          src="images/middle-phone.png"
          alt="Middle Phone"
          className="h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] w-auto object-contain z-10"
        />
        <img
          ref={rightPhoneRef}
          src="images/right-phone.png"
          alt="Right Phone"
          className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto object-contain -ml-8 sm:-ml-10 md:-ml-12 lg:-ml-16"
        />
      </div>

      {/* Slides */}
      <div className="relative flex-1 w-full overflow-hidden min-h-0 z-[20]">
        {sections.map((sec, i) => (
          <div
            key={i}
            ref={addToRefs}
            className={`absolute inset-0 flex flex-col md:flex-row ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center justify-between px-[5%] sm:px-[7%] md:px-[8%] lg:px-[10%] xl:px-[12%] gap-[2vh] sm:gap-[3vh] md:gap-[4vh] lg:gap-[6vh] transition-colors duration-300`}
          >
            {/* Text */}
            <div className="text-block flex flex-col justify-center items-center md:items-start text-center md:text-left gap-[1vh] sm:gap-[1.5vh] md:gap-[2vh] w-full md:w-[45%] lg:w-[40%] shrink-0">
              <p className="text-[0.563rem] sm:text-[0.625rem] md:text-xs lg:text-sm font-header text-[#030706] mb-0">
                {sec.subtitle}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-header font-bold text-black leading-tight mb-0 sm:mb-[0.5vh]">
                {sec.title}
              </h2>
              <p className="text-[0.563rem] sm:text-[0.625rem] md:text-xs lg:text-sm xl:text-base font-text font-light text-[#686a6a] leading-relaxed line-clamp-4 md:line-clamp-5">
                {sec.description}
              </p>
              <a
                href="#instantaiconnect"
                className="px-[5%] sm:px-[6%] md:px-[7%] py-[1vh] sm:py-[1.2vh] md:py-[1.5vh] text-[0.563rem] sm:text-[0.625rem] md:text-xs lg:text-sm text-[#f6f6f6] bg-[#9a9c9b] font-semibold hover:bg-[#858785] transition-all duration-300 mt-[1vh] sm:mt-[1.5vh] md:mt-[2vh] rounded-none"
              >
                App Coming Soon
              </a>
            </div>

            {/* Image */}
            <div className="image-block flex items-center justify-center w-full md:w-[50%] lg:w-[55%] shrink-0 max-h-[60vh] md:max-h-[80vh]">
              <img
                src={sec.image}
                alt={sec.imageAlt}
                className="w-full h-auto object-contain max-h-[60vh] md:max-h-[80vh]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DigitalSovereignty;
