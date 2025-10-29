import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { VALUES } from "../constants";
import radioMobile from "/images/radio-mobile.png";
import radioDesktop from "/images/radio.png";
import tuner from "/images/tuner.png";
import value from "/images/value.png";
import select from "/images/select.png";

gsap.registerPlugin(ScrollTrigger, SplitText);

const WhoAreWe = () => {
  const [activeValue, setActiveValue] = useState("value1");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const radioRef = useRef(null);
  const dynamicContentRef = useRef(null);
  const tunerBtnRef = useRef(null);
  const valueBtnRef = useRef(null);
  const selectBtnRef = useRef(null);
  const isFirstChoiceRef = useRef(true);
  const scrollAnimationRef = useRef(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const current = VALUES.find((item) => item.id === activeValue);

  // 🧭 Handle resize responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 📜 Scroll + intro animation
  useGSAP(() => {
    const header = headerRef.current;
    const radio = radioRef.current;
    const dynamicText = dynamicContentRef.current;

    if (!header || !radio || !dynamicText) return;

    gsap.set(header, { scale: 1.5, y: "30vh" });
    gsap.set([radio, dynamicText], { opacity: 0, y: "100vh" });

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: sectionRef.current,
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
  }, []);

  // 🎛️ Animate buttons when value changes
  useGSAP(() => {
    if (isFirstChoiceRef.current) {
      isFirstChoiceRef.current = false;
      return;
    }

    if (!scrollAnimationRef.current) return;

    const targets = isMobile
      ? [tunerBtnRef.current]
      : [valueBtnRef.current, selectBtnRef.current];

    gsap.to(targets, {
      rotate: "+=120",
      duration: 0.5,
      ease: "power2.out",
    });
  }, [activeValue]);

  // ✨ SplitText animation for content
  useGSAP(() => {
    if (!dynamicContentRef.current) return;

    const splitH1 = new SplitText(".header", { type: "chars" });
    const splitP = new SplitText(".paragraph", { type: "words" });

    gsap.from(splitH1.chars, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
    });

    gsap.from(splitP.words, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.2,
    });
  }, [current]);

  return (
    <section
      ref={sectionRef}
      id="whoarewe"
      className={`relative h-screen flex flex-col items-center ${
        isMobile ? "gap-4 py-4 px-3" : "gap-6 justify-center"
      } bg-white overflow-hidden`}
    >
      {/* Header */}
      <div
        ref={headerRef}
        className={`flex flex-col text-center items-center ${
          isMobile ? "gap-1 w-full" : "gap-2 max-w-5xl px-4"
        }`}
      >
        <h1
          className={`font-header font-bold leading-tight ${
            isMobile ? "text-2xl" : "text-5xl"
          }`}
        >
          So, Who Are We
        </h1>
        <p
          className={`font-header font-light ${
            isMobile ? "text-xs max-w-xs" : "text-lg max-w-2xl"
          }`}
        >
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      {/* Radio Section */}
      <div
        ref={radioRef}
        className={`relative flex items-center justify-center ${
          isMobile ? "flex-col w-full" : "flex-1 w-full max-h-[50vh] mt-4"
        }`}
      >
        <img
          src={isMobile ? radioMobile : radioDesktop}
          alt="Radio"
          className={`object-contain ${
            isMobile ? "max-w-[320px]" : "w-full h-auto"
          }`}
        />

        {/* Mobile tuner */}
        {isMobile && (
          <img
            ref={tunerBtnRef}
            src={tuner}
            alt="Tuner"
            className="w-[30%] absolute right-[36%] top-[13%]"
          />
        )}

        {/* Desktop knobs */}
        {!isMobile && (
          <>
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
          </>
        )}

        {/* Value logos */}
        <div
          className={`absolute bg-black rounded-sm flex items-center justify-center ${
            isMobile
              ? "top-[35%] left-[27%] w-[42%] h-[14%]"
              : "top-[26%] left-[30%] w-[41%] h-[19%]"
          }`}
        >
          <ul
            className={`flex items-center justify-between w-full h-full ${
              isMobile ? "p-2 flex-wrap" : "justify-evenly"
            }`}
          >
            {VALUES.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer flex flex-col items-center justify-center relative"
              >
                <img
                  src={item.logo}
                  alt={item.id}
                  className={`transition-all duration-300 ${
                    isMobile ? "w-13" : "w-16"
                  } ${
                    activeValue === item.id
                      ? "opacity-100 brightness-150 scale-105"
                      : "opacity-70 brightness-90"
                  }`}
                />
                {activeValue === item.id && (
                  <span className="absolute -bottom-1 h-1 w-0.5 bg-orange-500 rounded-sm" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop button */}
        {!isMobile && (
          <a
            className="absolute bottom-[21%] right-[29.9%] w-[39%] h-[24%] bg-[#DCD9BA] font-text rounded-sm flex items-center justify-center text-black text-2xl tracking-wide cursor-pointer hover:bg-[#e6e3c8] transition"
            href="#instantaiconnect"
          >
            Know More
          </a>
        )}
      </div>

      {/* Dynamic text */}
      <div
        ref={dynamicContentRef}
        className={`flex flex-col items-center text-center ${
          isMobile ? "gap-1 w-full" : "gap-2 max-w-5xl px-4"
        }`}
      >
        <h1
          className={`header font-header font-bold ${
            isMobile ? "text-xl" : "text-3xl"
          }`}
        >
          Blacktape{" "}
          <span
            className={`span font-light uppercase tracking-wider ${
              isMobile ? "text-sm" : "text-lg"
            }`}
          >
            {current?.span}
          </span>
        </h1>
        <p
          className={`paragraph font-header font-light ${
            isMobile
              ? "text-[11px] max-w-xs px-3 mt-1"
              : "text-base max-w-xl px-2 mt-2"
          }`}
        >
          {current?.text}
        </p>
      </div>
    </section>
  );
};

export default WhoAreWe;
