import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mockups from "/images/Mockups.png";
import { items } from "../constants";
import { useGSAP } from "@gsap/react";


const DevicesMockups = () => {
  const sectionRef = useRef(null);
  const companyGoalsRef = useRef(null);
  const textContentRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const companyGoals = companyGoalsRef.current;
      const textContent = textContentRef.current;
      const image = imageRef.current;

      if (!section || !textContent || !image) return;

      gsap.set([companyGoals, textContent, image], {
        opacity: 1,
        y: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      tl.to(companyGoals, {
        opacity: 0,
        y: "-40vh",
        ease: "power3.inOut",
        duration: 0.6,
      })
        .to(
          textContent,
          {
            opacity: 0,
            y: "-40vh",
            ease: "power3.inOut",
            duration: 0.6,
          },
          "<0.1"
        )
        .to(
          image,
          {
            opacity: 0,
            y: "-40vh",
            ease: "power3.inOut",
            duration: 0.6,
          },
          "<0.1"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="devicesmockups"
      className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden 
             text-center px-3 sm:px-4 md:px-6 py-6 md:py-8 gap-6 md:gap-8"
    >
      {/* Company Goals */}
      <div
        ref={companyGoalsRef}
        className="w-full flex flex-col md:flex-row items-center justify-between 
               gap-6 md:gap-4 lg:gap-6 flex-shrink-0"
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
        <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-header font-semibold leading-snug md:leading-tight">
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
          className="w-[90%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[45%] h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default DevicesMockups;
