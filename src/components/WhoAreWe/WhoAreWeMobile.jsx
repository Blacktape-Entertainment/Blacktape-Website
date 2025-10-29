import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import radioMobile from "/images/radio-mobile.png";
import { VALUES } from "./constants";
import tuner from "/images/tuner.png";
gsap.registerPlugin(ScrollTrigger);

const WhoAreWeMobile = () => {
  const [activeValue, setActiveValue] = useState("value1");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const radioRef = useRef(null);
  const dynamicContentRef = useRef(null);
  const tunerBtnRef = useRef(null);
  const isFirstChoiceRef = useRef(true);
  const scrollAnimationRef = useRef(false);

  const current = VALUES.find((item) => item.id === activeValue);

  useEffect(() => {
    const header = headerRef.current;
    const radio = radioRef.current;
    const dynamicText = dynamicContentRef.current;

    if (!header || !radio || !dynamicText) return;

    gsap.set(header, { scale: 1.5, y: "30vh" });
    gsap.set([radio, dynamicText], { opacity: 0, y: "100vh" });

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#whoarewe",
        start: "top top",
        end: "+=500%",
        pin: "#whoarewe",
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const { progress, direction } = self;

          if (progress < 0.2) {
            scrollAnimationRef.current = false;
          } else if (progress >= 0.2 && progress < 0.8) {
            scrollAnimationRef.current = true;
            const selectionProgress = (progress - 0.2) / 0.6;

            if (selectionProgress < 0.25) setActiveValue("value1");
            else if (selectionProgress < 0.5) setActiveValue("value2");
            else if (selectionProgress < 0.75) setActiveValue("value3");
            else setActiveValue("value4");
          }

          if (progress >= 0.99 && direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.getElementById("devicesmockups");

            if (nextSection) {
              setTimeout(() => {
                window.scrollTo({
                  top: nextSection.getBoundingClientRect().top + window.scrollY,
                  behavior: "smooth",
                });
              }, 300);
            }
          }

          if (progress < 0.99) hasScrolled = false;
        },
      },
    });

    timeline.to(
      header,
      { scale: 1, y: 0, ease: "power3.out", duration: 0.2 },
      0
    );
    timeline.to(
      radio,
      { opacity: 1, y: 0, ease: "power3.out", duration: 0.2 },
      0
    );
    timeline.to(
      dynamicText,
      { opacity: 1, y: 0, ease: "power3.out", duration: 0.2 },
      0
    );
    timeline.to({}, { duration: 0.6 }, ">");

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill(true);
      }
      timeline.kill();
      scrollAnimationRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isFirstChoiceRef.current) {
      isFirstChoiceRef.current = false;
      return;
    }

    if (!scrollAnimationRef.current) return;

    gsap.to(tunerBtnRef.current, {
      rotate: "+=120",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [activeValue]);

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
      className="relative h-screen flex flex-col items-center justify-between bg-white overflow-hidden py-4 px-3"
    >
      <div
        ref={headerRef}
        className="flex flex-col gap-1 items-center text-center w-full flex-shrink-0"
      >
        <h1 className="text-2xl font-header font-bold leading-tight">
          So, Who Are We
        </h1>
        <p className="max-w-xs text-xs font-light font-header px-2">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      <div ref={radioRef} className="relative">
        <img
          src={radioMobile}
          alt="Radio Mobile"
          className="w-full max-w-[320px] object-contain"
        />

        <img
          ref={tunerBtnRef}
          src={tuner}
          alt="Tuner button"
          className="w-[40%] absolute right-[32%] top-[14%]"
        />

        <div className="absolute top-[35%] left-[17%] w-[60%] h-[14%] bg-black rounded-sm flex items-center justify-center">
          <ul className="flex justify-evenly items-center w-full h-full">
            {VALUES.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveValue(item.id)}
                className="cursor-pointer flex flex-col items-center justify-center relative"
              >
                <img
                  src={item.logo}
                  alt={item.id}
                  className={`w-6 transition-all duration-300 ${
                    activeValue === item.id
                      ? "opacity-100 brightness-150 scale-105"
                      : "opacity-70 brightness-90"
                  }`}
                />
                {activeValue === item.id && (
                  <span className="absolute -bottom-1 h-1 w-0.5 bg-orange-500 rounded-sm"></span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center text-center w-full flex-shrink-0">
        <div ref={dynamicContentRef}>
          <h1 className="text-xl font-header font-bold">
            Blacktape{" "}
            <span className="font-light text-sm uppercase tracking-wider">
              {current?.span}
            </span>
          </h1>
          <p className="max-w-xs text-[11px] font-light font-header px-3 mt-1 leading-relaxed">
            {current?.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWeMobile;
