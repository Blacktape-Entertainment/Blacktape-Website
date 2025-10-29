import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mockups from "/images/Mockups.png";
import { items } from "../constants";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
      className="w-full h-screen flex flex-col items-center md:gap-5 gap-10 justify-center text-center overflow-hidden px-4 md:px-8 py-4 md:py-10"
    >
      {/* Company Goals */}
      <div
        ref={companyGoalsRef}
        className="w-full flex md:flex-row flex-col md:items-center items-center justify-between gap-8 md:gap-2 lg:gap-4"
      >
        {items.map(({ id, icon, alt, title, desc }) => (
          <div
            key={id}
            className="flex flex-col items-center w-full justify-center flex-1 text-center gap-2"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <img src={icon} alt={alt} className="w-3 h-3 lg:w-5 lg:h-5" />
              <h1 className="font-header text-sm lg:text-base">{title}</h1>
            </div>
            <p className="font-text text-xs lg:text-sm text-black/70 leading-relaxed max-w-[90%]">
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Text Content */}
      <div
        ref={textContentRef}
        className="flex flex-col items-center justify-center text-center max-w-3xl gap-2 md:gap-3 lg:gap-4"
      >
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-header font-semibold leading-snug md:leading-tight">
          From 2018 to the Forefront of Experience
        </h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-black/70 font-text max-w-md sm:max-w-lg md:max-w-2xl px-2">
          Our journey began with a deep commitment to creativity and technical
          excellence. Today, we continue to push boundaries and redefine
          entertainment through immersive storytelling and cultural innovation.
        </p>
        <a
          className="mt-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-black font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300 rounded-md"
          href="#instantaiconnect"
        >
          Explore the Blacktape Vision
        </a>
      </div>

      {/* Mockup Image */}
      <div
        ref={imageRef}
        className="relative w-full flex justify-center items-center "
      >
        <img
          src={Mockups}
          alt="Device Mockups"
          className="md:w-[55%] w-[100%] h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default DevicesMockups;
