import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import select from "../assets/images/select.png";
import radio from "../assets/images/radio.png";
import value from "../assets/images/value.png";
import logo1 from "../assets/images/Logo1.svg";
import logo2 from "../assets/images/Logo2.svg";
import logo3 from "../assets/images/Logo3.svg";
import logo4 from "../assets/images/Logo4.svg";

const WhoAreWe = () => {
  const [activeValue, setActiveValue] = useState("value1");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const radioRef = useRef(null);
  const dynamicContentRef = useRef(null);
  const valueBtnRef = useRef(null);
  const selectBtnRef = useRef(null);
  const isFirstChoiceRef = useRef(true);
  const scrollAnimationRef = useRef(false);

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

  // Multi-phase scroll animation
  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const radio = radioRef.current;
    const dynamicText = dynamicContentRef.current;

    if (!section || !header || !radio || !dynamicText) return;

    // Calculate responsive scale
    const getResponsiveScale = () => {
      const width = window.innerWidth;
      if (width < 640) return 0.6; // Small mobile
      if (width < 768) return 0.8; // Mobile
      if (width < 1024) return 1; // Tablet
      return 1.5; // Desktop
    };

    // Initial states
    gsap.set(header, {
      scale: getResponsiveScale(),
      y: "30vh",
    });

    gsap.set([radio, dynamicText], {
      opacity: 0,
      y: "100vh",
    });

    let hasScrolled = false;
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#whoarewe-wrapper",
        start: "top top",
        end: "+=500%",
        pin: "#whoarewe",
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Phase 1: Header shrink + Radio/Text enter (0-20%)
          if (progress < 0.2) {
            scrollAnimationRef.current = false;
          }
          // Phase 2: Selection changes (20-80%)
          else if (progress >= 0.2 && progress < 0.8) {
            scrollAnimationRef.current = true;
            const selectionProgress = (progress - 0.2) / 0.6;

            if (selectionProgress < 0.25) {
              setActiveValue("value1");
            } else if (selectionProgress < 0.5) {
              setActiveValue("value2");
            } else if (selectionProgress < 0.75) {
              setActiveValue("value3");
            } else {
              setActiveValue("value4");
            }
          }

          // Auto-scroll to next section
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#devicesmockups");

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

    // Phase 1: Header shrink to normal size and move to center
    masterTimeline.to(
      header,
      {
        scale: 1,
        y: 0,
        ease: "power3.out",
        duration: 0.2,
      },
      0
    );

    // Phase 1: Radio enters from bottom
    masterTimeline.to(
      radio,
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 0.2,
      },
      0
    );

    // Phase 1: Dynamic text enters from bottom
    masterTimeline.to(
      dynamicText,
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 0.2,
      },
      0
    );

    // Phase 2: Hold for selection changes
    masterTimeline.to({}, { duration: 0.6 }, ">");

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      scrollAnimationRef.current = false;
    };
  }, []);

  // Button rotation animation on value change
  useEffect(() => {
    if (isFirstChoiceRef.current) {
      isFirstChoiceRef.current = false;
      return;
    }

    if (!scrollAnimationRef.current) return;

    gsap.to([valueBtnRef.current, selectBtnRef.current], {
      rotate: "+=120",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [activeValue]);

  // Content fade transition on value change
  useEffect(() => {
    if (!dynamicContentRef.current || !scrollAnimationRef.current) return;

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
      className="relative h-screen flex flex-col items-center justify-center gap-4 md:gap-6 bg-white overflow-hidden"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col gap-1.5 md:gap-2 items-center text-center w-full max-w-[90vw] md:max-w-5xl px-4"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold leading-tight w-full">
          So, Who Are We
        </h1>
        <p className="max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl text-xs sm:text-sm md:text-base lg:text-lg font-light font-header">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      {/* Radio Section */}
      <div
        ref={radioRef}
        className="relative w-full flex items-center justify-center flex-1 max-h-[50vh]"
      >
        <img src={radio} alt="Radio" className="w-full h-auto object-contain" />

        <img
          ref={valueBtnRef}
          src={value}
          alt="Value button"
          className="w-[15%] absolute left-[10%] top-[22%]"
        />
        <img
          ref={selectBtnRef}
          src={select}
          alt="Select button"
          className="w-[15%] absolute right-[8.5%] top-[23%]"
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
                  className={`w-8 md:w-12 lg:w-16 transition-all duration-300 ${
                    activeValue === item.id
                      ? "opacity-100 brightness-150 scale-105"
                      : "opacity-70 brightness-90"
                  }`}
                />
                {activeValue === item.id && (
                  <span className="absolute -bottom-0.5 md:-bottom-1 h-0.5 md:h-1 w-0.5 bg-orange-500 rounded-sm"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-[23%] right-[30%] w-[39%] h-[22%] bg-[#DCD9BA] font-header rounded-sm flex items-center justify-center text-black text-[10px] md:text-sm lg:text-base tracking-wide cursor-pointer hover:bg-[#e6e3c8] transition">
          Know More
        </div>
      </div>

      {/* Dynamic Text */}
      <div className="flex flex-col gap-1.5 md:gap-2 items-center text-center max-w-5xl px-4">
        <div ref={dynamicContentRef}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-header font-bold">
            Blacktape{" "}
            <span className="font-light text-sm md:text-base lg:text-lg">
              {current?.span}
            </span>
          </h1>
          <p className="max-w-sm md:max-w-lg lg:max-w-xl text-xs md:text-sm lg:text-base font-light font-header px-2 mt-1.5 md:mt-2">
            {current?.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
