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
  const dynamicContentRef = useRef(null); // New ref for inner content
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

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { scale: 1.5, transformOrigin: "center" });
      gsap.set(radioRef.current, { autoAlpha: 0, y: 80 });
      gsap.set(dynamicTextRef.current, { autoAlpha: 0, y: 30 });

      gsap.to(headerRef.current, {
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(radioRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 45%",
          scrub: true,
        },
      });

      // Animate the container, not the content
      gsap.to(dynamicTextRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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

  // Fixed: Animate the inner content, not the container
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
      ref={sectionRef}
      id="whoarewe"
      className="relative pt-20 pb-16 md:pt-24 md:pb-20 text-center flex flex-col gap-12 overflow-hidden "
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col gap-3 items-center px-4 sm:px-6 md:px-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-header font-bold">
          So, Who Are We
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg font-light font-header">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      {/* Radio Section */}
      <div
        ref={radioRef}
        className="relative w-full flex items-center justify-center overflow-visible"
      >
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
                  className={`w-16 md:w-20 transition-all duration-300 ${
                    activeValue === item.id
                      ? "opacity-100 brightness-150 scale-105"
                      : "opacity-70 brightness-90"
                  }`}
                />
                {activeValue === item.id && (
                  <span className="absolute -bottom-2 h-2 w-1 bg-orange-500 rounded-sm"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-[23%] right-[30%] w-[39%] h-[22%] bg-[#DCD9BA] font-header rounded-sm flex items-center justify-center text-black text-lg md:text-xl tracking-wide cursor-pointer hover:bg-[#e6e3c8] transition">
          Know More
        </div>
      </div>

      {/* Dynamic Text */}
      <div
        ref={dynamicTextRef}
        className="flex flex-col gap-3 items-center px-4 sm:px-6 md:px-10"
      >
        {/* Inner content that fades independently */}
        <div ref={dynamicContentRef}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold">
            Blacktape{" "}
            <span className="font-light text-lg sm:text-xl md:text-2xl">
              {current?.span}
            </span>
          </h1>
          <p className="max-w-2xl text-sm sm:text-base md:text-lg font-light font-header px-2 sm:px-4 mt-3">
            {current?.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
