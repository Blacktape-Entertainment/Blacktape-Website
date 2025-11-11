import { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { VALUES } from "../constants";
import radioMobile from "/images/radio-mobile.png";
import radioDesktop from "/images/radio.png";
import tuner from "/images/tuner.png";
import value from "/images/value.png";
import select from "/images/select.png";
import { useMediaQuery } from "react-responsive";
import { ANIMATION_CONFIG } from "../constants";
import InvestmentsModal from "./InvestmentsModal";

const WhoAreWe = () => {
  const [activeValue, setActiveValue] = useState("value1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const radioRef = useRef(null);
  const dynamicContentRef = useRef(null);
  const tunerBtnRef = useRef(null);
  const valueBtnRef = useRef(null);
  const selectBtnRef = useRef(null);
  const isFirstChoiceRef = useRef(true);
  const scrollAnimationRef = useRef(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const current = VALUES.find((item) => item.id === activeValue);

  // 📜 Scroll + intro animation
  useGSAP(
    () => {
      const header = headerRef.current;
      const radio = radioRef.current;
      const dynamicText = dynamicContentRef.current;

      if (!header || !radio || !dynamicText) return;

      gsap.set(header, { scale: isMobile ? 1 : 1.5, y: "30vh" });
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

    const runShuffleAnimation = () => {
      const headerEl = dynamicContentRef.current.querySelector(".header");
      const paragraphEl = dynamicContentRef.current.querySelector(".paragraph");
      if (!headerEl || !paragraphEl) return;

      // Shuffle animation function
      const shuffleText = (element, finalText, duration = 0.8) => {
        const chars =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        const textLength = finalText.length;
        let frame = 0;
        const totalFrames = duration * 60; // 60fps

        const shuffle = () => {
          if (frame >= totalFrames) {
            element.textContent = finalText;
            return;
          }

          const progress = frame / totalFrames;
          let displayText = "";

          for (let i = 0; i < textLength; i++) {
            if (progress > i / textLength) {
              displayText += finalText[i];
            } else {
              displayText += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          element.textContent = displayText;
          frame++;
          requestAnimationFrame(shuffle);
        };

        shuffle();
      };

      // Split text into characters and words
      const splitH1 = new SplitText(headerEl, { type: "chars" });
      const splitP = new SplitText(paragraphEl, { type: "words" });

      // Animate header with shuffle effect
      splitH1.chars.forEach((char, i) => {
        const originalText = char.textContent;
        gsap.from(char, {
          opacity: 0,
          duration: 0.01,
          delay: 0.3 + i * 0.05,
          onComplete: () => {
            shuffleText(char, originalText, 0.3);
          },
        });
      });

      // Animate paragraph with shuffle effect
      splitP.words.forEach((word, i) => {
        const originalText = word.textContent;
        gsap.from(word, {
          opacity: 0,
          duration: 0.01,
          delay: 0.3 + i * 0.05,
          onComplete: () => {
            shuffleText(word, originalText, 0.3);
          },
        });
      });
    };

    // Wait for fonts to be ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() =>
        requestAnimationFrame(runShuffleAnimation)
      );
    } else {
      window.addEventListener("load", runShuffleAnimation, { once: true });
    }
  }, [current]);

  return (
    <section
      ref={sectionRef}
      id="whoarewe"
      className="relative h-screen flex flex-col items-center bg-white overflow-hidden pt-8 md:pt-0"
    >
      {/* Header - Flex: 1 unit (shrinks/grows as needed) */}
      <div
        ref={headerRef}
        className="flex flex-col max-h-[20vh] text-center items-center justify-center w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-3"
      >
        <h1 className="font-header font-bold leading-tight text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl">
          So, Who Are We
        </h1>
        <p className="font-header font-light text-sm lg:text-base xl:text-lg max-w-[90%] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl mt-0.5 sm:mt-1 md:mt-2">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

      <div
        ref={radioRef}
        className="flex-1 relative flex items-center justify-center w-full overflow-hidden"
      >
        {/* Radio Image Container */}
        <div className="relative w-full h-auto flex items-center justify-center">
          <div
            className="relative w-full"
            style={{ aspectRatio: isMobile ? "1/1.2" : "16/9" }}
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
                className="absolute w-[23%] top-[14%] right-[40%]"
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
                  ? "top-[35%] left-[32%] w-[33%] h-[14%]"
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
                      className={`transition-all duration-300 w-auto max-w-[3.2rem] sm:max-w-[3rem] md:max-w-[4rem] lg:max-w-[6rem]
                      ${
                        activeValue === item.id
                          ? "opacity-100 brightness-125 scale-110"
                          : "opacity-60 brightness-90"
                      }`}
                    />
                    {activeValue === item.id && (
                      <span className="absolute -bottom-1 w-0.5 h-1 bg-orange-500 rounded" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* "Know More" Button (Desktop only) */}

            <button
              onClick={() => setIsModalOpen(true)}
              className={`absolute
                 rounded flex items-center justify-center 
                text-black text-[10px] md:text-lg lg:text-xl font-semibold 
                 transition-colors duration-300 cursor-pointer ${
                   isMobile
                     ? "bottom-[38%] right-[35.5%] w-[32.5%] h-[8%] bg-[#B7B5A9] hover:bg-[#c3c2b3]"
                     : "bottom-[37%] right-[29.5%] w-[39.5%] h-[11%] bg-[#DCD9BA] hover:bg-[#e6e3c8]"
                 }`}
            >
              Know More
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic text - Flex: 1 unit (shrinks/grows as needed) */}
      <div
        ref={dynamicContentRef}
        className="flex flex-col max-h-[20vh] items-center justify-center text-center w-full px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-3"
      >
        <h1 className="header font-header font-bold text-3xl lg:text-4xl xl:text-5xl">
          Blacktape{" "}
          <span className="span font-light uppercase tracking-wider text-sm md:text-base lg:text-lg">
            {current?.span}
          </span>
        </h1>
        <p className="paragraph font-header font-light text-sm lg:text-base max-w-[90%] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl mt-0.5 sm:mt-1 md:mt-2">
          {current?.text}
        </p>
      </div>

      {/* Investments Modal */}
      <InvestmentsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bullets={current?.bullets}
        logo={current?.logo}
      />
    </section>
  );
};

export default WhoAreWe;
