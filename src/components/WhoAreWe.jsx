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
  useGSAP(
    () => {
      const header = headerRef.current;
      const radio = radioRef.current;
      const dynamicText = dynamicContentRef.current;

      if (!header || !radio || !dynamicText) return;

      gsap.set(header, { scale: isMobile ? 1.2 : 1.5, y: "30vh" });
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
    },
    { scope: sectionRef.current, dependencies: [] }
  );

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
      duration: 0.2,
      ease: "power2.out",
    });
  }, [activeValue]);

  useGSAP(() => {
    if (!dynamicContentRef.current) return;

    // Wait for fonts to be loaded before running SplitText
    const runSplitAnimation = () => {
      // Make sure the elements exist
      const headerEl = dynamicContentRef.current.querySelector(".header");
      const paragraphEl = dynamicContentRef.current.querySelector(".paragraph");
      if (!headerEl || !paragraphEl) return;

      // Create new splits
      const splitH1 = new SplitText(headerEl, { type: "chars" });
      const splitP = new SplitText(paragraphEl, { type: "words" });

      // Animate header
      gsap.from(splitH1.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate paragraph
      gsap.from(splitP.words, {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.2,
      });
    };

    // Ensure fonts are ready first
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(runSplitAnimation));
    } else {
      // Fallback for older browsers
      window.addEventListener("load", runSplitAnimation, { once: true });
    }
  }, [current]);

  return (
    <section
      ref={sectionRef}
      id="whoarewe"
      className="relative h-screen flex flex-col items-center bg-white overflow-hidden"
    >
      {/* Header - Flex: 1 unit (shrinks/grows as needed) */}
      <div
        ref={headerRef}
        className="flex-1 min-h-[15vh] max-h-[25vh] flex flex-col text-center items-center justify-center w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3"
      >
        <h1 className="font-header font-bold leading-tight text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
          So, Who Are We
        </h1>
        <p className="font-header font-light text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg max-w-[90%] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl mt-0.5 sm:mt-1 md:mt-2">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      <div
        ref={radioRef}
        className="flex-[3] min-h-0 relative flex items-center justify-center w-full overflow-hidden"
      >
        {/* Radio Image Container */}
        <div className="relative w-full h-auto flex items-center justify-center">
          <div
            className="relative w-full"
            style={{ aspectRatio: isMobile ? "1/0.9" : "16/9" }}
          >
            <img
              src={isMobile ? radioMobile : radioDesktop}
              alt="Radio"
              className="w-full h-full object-contain"
            />

            {/* Tuner (Mobile only) */}
            {isMobile && (
              <img
                ref={tunerBtnRef}
                src={tuner}
                alt="Tuner"
                className="absolute w-[19%] top-[13%] right-[41%]"
              />
            )}

            {/* Desktop knobs */}
            {!isMobile && (
              <>
                <img
                  ref={valueBtnRef}
                  src={value}
                  alt="Value button"
                  className="absolute w-[14.3%] left-[10.2%] top-[38%] transition-all duration-300"
                />
                <img
                  ref={selectBtnRef}
                  src={select}
                  alt="Select button"
                  className="absolute w-[14%] right-[9%] top-[38%] transition-all duration-300"
                />
              </>
            )}

            {/* Value Box */}
            <div
              className={`absolute bg-black shadow-lg flex items-center justify-center 
              ${
                isMobile
                  ? "top-[35%] left-[36%] w-[25%] h-[14%]"
                  : "top-[39%] left-[30%] w-[41%] h-[10%]"
              }`}
            >
              <ul className="flex items-center justify-evenly w-full h-full flex-wrap">
                {VALUES.map((item) => (
                  <li
                    key={item.id}
                    className="cursor-pointer flex flex-col items-center justify-center relative"
                  >
                    <img
                      src={item.logo}
                      alt={item.id}
                      className={`transition-all duration-300 w-auto max-w-[1.5rem] sm:max-w-[2.5rem] md:max-w-[3.5rem] lg:max-w-[4rem]
                      ${
                        activeValue === item.id
                          ? "opacity-100 brightness-125 scale-110"
                          : "opacity-60 brightness-90"
                      }`}
                    />
                    {activeValue === item.id && (
                      <span className="absolute -bottom-1 w-1 h-1 bg-orange-500 rounded-full" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* "Know More" Button (Desktop only) */}
            {!isMobile && (
              <a
                href="#instantaiconnect"
                className="absolute bottom-[37%] right-[29.5%] w-[39.5%] h-[11%]
                bg-[#DCD9BA] rounded-md flex items-center justify-center 
                text-black text-base md:text-lg lg:text-xl font-semibold 
                hover:bg-[#e6e3c8] transition-colors duration-300"
              >
                Know More
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic text - Flex: 1 unit (shrinks/grows as needed) */}
      <div
        ref={dynamicContentRef}
        className="flex-1 min-h-[15vh] max-h-[25vh] flex flex-col items-center justify-center text-center w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3"
      >
        <h1 className="header font-header font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          Blacktape{" "}
          <span className="span font-light uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg">
            {current?.span}
          </span>
        </h1>
        <p className="paragraph font-header font-light text-[10px] sm:text-xs md:text-sm lg:text-base max-w-[90%] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mt-0.5 sm:mt-1 md:mt-2">
          {current?.text}
        </p>
      </div>
    </section>
  );
};

export default WhoAreWe;
