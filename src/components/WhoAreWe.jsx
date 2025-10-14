import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import select from "../assets/images/select.png";
import radio from "../assets/images/radio.png";
import value from "../assets/images/value.png";
import logo1 from "../assets/images/Logo1.svg";
import logo2 from "../assets/images/Logo2.svg";
import logo3 from "../assets/images/Logo3.svg";
import logo4 from "../assets/images/Logo4.svg";

gsap.registerPlugin(ScrollTrigger);

const WhoAreWe = () => {
  const [activeValue, setActiveValue] = useState("value1");

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const radioRef = useRef(null);
  const dynamicTextRef = useRef(null);
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
      text: "Where brands are born and artists are managed. They craft striking campaigns, launch identities, and guide talent with long-term vision, strategy, and cultural fluency",
      span: "INTENDENCY",
    },
    {
      id: "value3",
      logo: logo2,
      text: "The music division. It discovers talent, produces albums, and creates sonic identities. More than a label, it builds cultural imprints that turn music into legacy",
      span: "RECORDS",
    },
    {
      id: "value4",
      logo: logo3,
      text: "The financial backbone of BlackTape. It invests in culture-driven startups, real estate, creative talent, and technology to expand the ecosystem and secure a lasting cultural legacy",
      span: "INVESTAMENT",
    },
  ];

  const current = values.find((item) => item.id === activeValue);
  const currentText =
    current?.text ||
    "From cinematic productions to transformative events, we apply our commitment to artistry and technical excellence to every project.";
  const currentSpan = current?.span || "";

  // Ensure proper measurements after images load
  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  // Scroll-driven animations
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(headerRef.current, {
        scale: 1.15,
        y: -10,
        opacity: 0,
        transformOrigin: "center top",
      });
      gsap.set(radioRef.current, { y: 60, opacity: 0, scale: 0.98 });
      gsap.set(dynamicTextRef.current, { y: 20, opacity: 0 });
      gsap.set([valueBtnRef.current, selectBtnRef.current], {
        transformOrigin: "50% 50%",
      });

      // Header scales to normal
      gsap.to(headerRef.current, {
        scale: 1,
        y: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });

      // Radio slides up and fades in
      gsap.to(radioRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 45%",
          scrub: true,
        },
      });

      // Dynamic text appears when radio enters view
      gsap.to(dynamicTextRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: radioRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Rotate Value and Select buttons by 120° on choice change
  useEffect(() => {
    if (isFirstChoiceRef.current) {
      isFirstChoiceRef.current = false;
      return;
    }
    const targets = [valueBtnRef.current, selectBtnRef.current].filter(Boolean);
    if (!targets.length) return;

    gsap.to(targets, { rotate: "+=120", duration: 0.5, ease: "power2.out" });

    // Optional: refresh in case height changes
    ScrollTrigger.refresh();
  }, [activeValue]);

  // Subtle content fade on selection change
  useEffect(() => {
    if (!dynamicTextRef.current) return;
    gsap.fromTo(
      dynamicTextRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [activeValue]);

  return (
    <section
      ref={sectionRef}
      className="pt-16 text-center flex-col flex gap-11"
      id="whoarewe"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col gap-3 items-center will-change-transform"
      >
        <h1 className="text-4xl md:text-6xl font-header font-bold">
          So, Who Are We
        </h1>
        <p className="max-w-2xl text-base md:text-lg font-light mb-6 font-header">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      {/* Radio Section */}
      <div
        ref={radioRef}
        className="relative w-full flex items-center justify-center will-change-transform"
      >
        <img src={radio} alt="Radio" className="w-full h-auto object-contain" />

        <div className="absolute inset-0 flex items-center justify-between px-[5%]">
          <img
            ref={valueBtnRef}
            src={value}
            alt="Value button"
            className="w-[15%] h-auto absolute left-[10%] top-[24%] will-change-transform"
          />
          <img
            ref={selectBtnRef}
            src={select}
            alt="Select button"
            className="w-[15%] h-auto absolute right-[9%] top-[25%] will-change-transform"
          />
        </div>

        {/* Black box with centered logos */}
        <div className="absolute top-[26%] left-[30%] w-[41%] h-[19%] bg-black rounded-sm flex items-center justify-center">
          <ul className="flex justify-evenly items-center w-full h-full">
            {values.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveValue(item.id)}
                className="cursor-pointer transition-all duration-300 flex flex-col items-center justify-center"
              >
                <img
                  src={item.logo}
                  alt={item.id}
                  className={`w-16 md:w-20 transition-all duration-300 ${
                    activeValue === item.id
                      ? "opacity-100 brightness-150"
                      : "opacity-70 brightness-90"
                  }`}
                />
                {activeValue === item.id && (
                  <span className="absolute bottom-[0%] h-3 w-1 bg-orange-500 rounded-sm"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Know More Button */}
        <div className="absolute bottom-[23%] right-[30%] w-[39%] h-[22%] bg-[#DCD9BA] font-header rounded-sm flex items-center justify-center text-black text-lg md:text-xl tracking-wide px-3 cursor-pointer hover:bg-[#e6e3c8] transition">
          Know More
        </div>
      </div>

      {/* Dynamic Text */}
      <div
        ref={dynamicTextRef}
        className="flex flex-col gap-3 items-center transition-all duration-500 will-change-transform"
      >
        <h1 className="text-4xl md:text-6xl font-header font-bold">
          Blacktape <span className="font-light text-2xl">{currentSpan}</span>
        </h1>
        <p className="max-w-2xl text-base md:text-lg font-light mb-6 font-header">
          {currentText}
        </p>
      </div>
    </section>
  );
};

export default WhoAreWe;
