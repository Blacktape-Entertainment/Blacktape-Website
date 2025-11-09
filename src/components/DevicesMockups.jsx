import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mockups from "/images/Mockups.png";
import { items } from "../constants";
import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "../constants";
import { useMediaQuery } from "react-responsive";

const DevicesMockups = ({ navbarRef }) => {
  const sectionRef = useRef(null);
  const companyGoalsRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      const section = sectionRef.current;
      const companyGoals = companyGoalsRef.current;
      const textContent = textContentRef.current;
      const image = imageRef.current;

      if (!section || !textContent || !image) return;

      if (isMobile) {
        // Mobile: Simple scroll-triggered animation without pinning
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "center center",
              end: "bottom top",
              scrub: 1,
            },
          })
          .to([companyGoals, textContent, image], {
            y: "-100vh",
            ease: "power1.out",
            duration: 3,
            delay: 1,
          });
      } else {
        // Desktop: Pinned scroll animation
        gsap.set([companyGoals, textContent, image], {
          opacity: 1,
          y: 0,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            pinSpacing: true,
          },
        });

        // Add a hold period before animations start
        tl.to({}, { duration: 2 })
          .to(companyGoals, {
            y: "-120vh",
            ease: "power1.inOut",
            duration: 3,
          })
          .to(
            textContent,
            {
              y: "-120vh",
              ease: "power1.inOut",
              duration: 3,
            },
            "<0.2"
          )
          .to(
            image,
            {
              width: "150%",
              opacity: 0,
              y: "-120vh",
              ease: "power1.inOut",
              duration: 3,
            },
            "<0.2"
          );

        // Hide navbar if ref exists
        if (navbarRef?.current) {
          tl.to(navbarRef.current, ANIMATION_CONFIG.navbarHide);
        }
      }
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      id="devicesmockups"
      className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden 
             text-center px-3 sm:px-4 md:px-6 py-6 md:py-8 gap-15 md:gap-8 md:pt-24"
    >
      {/* Company Goals */}
      <div
        ref={companyGoalsRef}
        className="w-full flex flex-col md:flex-row items-center justify-between 
               gap-4 md:gap-4 lg:gap-6 flex-shrink-0"
      >
        {items.map(({ id, icon, alt, title, desc }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center text-center 
                   w-full md:w-auto flex-1 gap-1 sm:gap-2"
          >
            <div className="flex flex-row items-center justify-center gap-1.5 sm:gap-2">
              <img
                src={icon}
                alt={alt}
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
              <h1 className="font-header text-xs sm:text-sm md:text-base lg:text-lg">
                {title}
              </h1>
            </div>
            <p className="font-text text-[0.65rem] sm:text-xs md:text-sm lg:text-base text-black/70 leading-relaxed max-w-[90%] md:max-w-[80%]">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div
        ref={textContentRef}
        className="flex flex-col items-center justify-center text-center 
               max-w-3xl gap-2 sm:gap-3 md:gap-4 flex-shrink-0"
      >
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-header leading-snug md:leading-tight">
          From 2018 to the Forefront of Experience
        </h1>
        <p
          className="text-[0.7rem] sm:text-xs md:text-sm lg:text-lg font-light text-black/70 font-text 
                  max-w-xs sm:max-w-md md:max-w-2xl px-2"
        >
          Our journey began with a deep commitment to creativity and technical
          excellence. Today, we continue to push boundaries and redefine
          entertainment through immersive storytelling and cultural innovation.
        </p>
        <a
          className="mt-2 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 text-[0.7rem] sm:text-xs md:text-sm lg:text-base 
                 text-black font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all 
                 duration-300 rounded-md"
          href="#instantaiconnect"
        >
          Explore the Blacktape Vision
        </a>
      </div>

      {/* Mockup Image */}
      <div
        ref={imageRef}
        className="relative w-full flex justify-center items-center flex-grow-0 flex-shrink-0"
      >
        <img
          src={Mockups}
          alt="Device Mockups"
          className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[60%] xl:w-[60%] h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default DevicesMockups;
