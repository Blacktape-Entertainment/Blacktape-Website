import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Mockups from "../assets/images/Mockups.png";

gsap.registerPlugin(ScrollTrigger);

const DevicesMockups = () => {
  const imageRef = useRef(null);

  return (
    <section className="w-full flex flex-col items-center text-center overflow-hidden">
      {/* Text Content */}
      <div className="max-w-3xl flex flex-col items-center gap-4 mb-10 md:mb-14">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-semibold leading-tight">
          From 2018 to the Forefront of Experience
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-light text-black/70 font-text">
          Our journey began with a deep commitment to creativity and technical
          excellence. Today, we continue to push boundaries and redefine
          entertainment through immersive storytelling and cultural innovation.
        </p>
        <button className="mt-4 px-6 py-3 text-black font-semibold border-gold border-2  hover:bg-[#d6cfab] transition-all duration-300">
          Explore the Blacktape Vision
        </button>
      </div>

      {/* Mockup Image */}
      <div ref={imageRef} className="relative w-full flex justify-center">
        <img
          src={Mockups}
          alt="Device Mockups"
          className="w-3/4 max-w-6xl h-auto"
        />
      </div>
    </section>
  );
};

export default DevicesMockups;
