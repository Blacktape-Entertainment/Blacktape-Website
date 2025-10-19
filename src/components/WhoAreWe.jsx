import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import select from "../assets/images/select.png";
import radio from "../assets/images/radio.png";
import value from "../assets/images/value.png";
import logo1 from "../assets/images/Logo1.svg";
import logo2 from "../assets/images/Logo2.svg";
import logo3 from "../assets/images/Logo3.svg";
import logo4 from "../assets/images/Logo4.svg";

const WhoAreWe = () => {
  const [activeValue, setActiveValue] = useState("value1");
  const dynamicContentRef = useRef(null);
  const valueBtnRef = useRef(null);
  const selectBtnRef = useRef(null);
  const isFirstChoiceRef = useRef(true);

  const values = [
    {
      id: "value1",
      logo: logo4,
      text: "We build a collective of creators united by vision and authenticity.",
      span: "PRODUCTION",
    },
    {
      id: "value2",
      logo: logo1,
      text: "Where brands are born and artists are managed. They craft striking campaigns, launch identities, and guide talent with long-term vision, strategy, and cultural fluency.",
      span: "INTENDENCY",
    },
    {
      id: "value3",
      logo: logo2,
      text: "The music division. It discovers talent, produces albums, and creates sonic identities. More than a label, it builds cultural imprints that turn music into legacy.",
      span: "RECORDS",
    },
    {
      id: "value4",
      logo: logo3,
      text: "The financial backbone of BlackTape. It invests in culture-driven startups, real estate, creative talent, and technology to expand the ecosystem and secure a lasting cultural legacy.",
      span: "INVESTMENT",
    },
  ];

  const current = values.find((item) => item.id === activeValue);

  // Button rotation animation on value change
  useEffect(() => {
    if (isFirstChoiceRef.current) {
      isFirstChoiceRef.current = false;
      return;
    }
    gsap.to([valueBtnRef.current, selectBtnRef.current], {
      rotate: "+=120",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [activeValue]);

  // Content fade transition on value change
  useEffect(() => {
    if (!dynamicContentRef.current) return;
    const tl = gsap.timeline();
    tl.to(dynamicContentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .set(dynamicContentRef.current, { y: -10 })
      .to(dynamicContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
  }, [activeValue]);

  return (
    <section
      id="whoarewe"
      className="relative min-h-screen flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12 overflow-hidden bg-white "
    >
      {/* Header */}
      <div className="flex flex-col gap-2 sm:gap-3 items-center text-center max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-header font-bold leading-tight">
          So, Who Are We
        </h1>
        <p className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl text-xs sm:text-sm md:text-base lg:text-lg font-light font-header px-2">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      {/* Radio Section */}
      <div className="relative w-full flex items-center justify-center mt-4 sm:mt-6 md:mt-10">
        <img src={radio} alt="Radio" className="w-full h-auto object-contain" />

        <img
          ref={valueBtnRef}
          src={value}
          alt="Value button"
          className="w-[15%] absolute left-[10%] top-[24%]"
        />
        <img
          ref={selectBtnRef}
          src={select}
          alt="Select button"
          className="w-[15%] absolute right-[9%] top-[25%]"
        />

        <div className="absolute top-[26%] left-[30%] w-[41%] h-[19%] bg-black rounded-sm flex items-center justify-center">
          <ul className="flex justify-evenly items-center w-full h-full">
            {values.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveValue(item.id)}
                className="cursor-pointer flex flex-col items-center justify-center relative"
              >
                <img
                  src={item.logo}
                  alt={item.id}
                  className={`w-8 sm:w-12 md:w-16 lg:w-20 transition-all duration-300 ${
                    activeValue === item.id
                      ? "opacity-100 brightness-150 scale-105"
                      : "opacity-70 brightness-90"
                  }`}
                />
                {activeValue === item.id && (
                  <span className="absolute -bottom-1 sm:-bottom-2 h-1 sm:h-2 w-0.5 sm:w-1 bg-orange-500 rounded-sm"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-[23%] right-[30%] w-[39%] h-[22%] bg-[#DCD9BA] font-header rounded-sm flex items-center justify-center text-black text-[10px] sm:text-sm md:text-base lg:text-xl tracking-wide cursor-pointer hover:bg-[#e6e3c8] transition">
          Know More
        </div>
      </div>

      {/* Dynamic Text - Now below radio */}
      <div className="flex flex-col gap-2 sm:gap-3 items-center text-center mt-4 sm:mt-6 md:mt-10 max-w-4xl">
        <div ref={dynamicContentRef}>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-header font-bold">
            Blacktape{" "}
            <span className="font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              {current?.span}
            </span>
          </h1>
          <p className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg font-light font-header px-2 sm:px-4 mt-2 sm:mt-3">
            {current?.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
