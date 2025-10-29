import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import select from "/images/select.png";
import radio from "/images/radio.png";
import value from "/images/value.png";
import { VALUES } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const WhoAreWeDesktop = () => {
  const [activeValue, setActiveValue] = useState("value1");
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const radioRef = useRef(null);
  const dynamicContentRef = useRef(null);
  const valueBtnRef = useRef(null);
  const selectBtnRef = useRef(null);
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

    gsap.to([valueBtnRef.current, selectBtnRef.current], {
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
      className="relative h-screen flex flex-col items-center justify-center gap-6 bg-white overflow-hidden"
    >
      <div
        ref={headerRef}
        className="flex flex-col gap-2 items-center text-center w-full max-w-5xl px-4"
      >
        <h1 className="text-5xl font-header font-bold leading-tight w-full">
          So, Who Are We
        </h1>
        <p className="max-w-2xl text-lg font-light font-header">
          From cinematic productions to transformative events, we apply our
          commitment to artistry and technical excellence to every project.
        </p>
      </div>

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
            {VALUES.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveValue(item.id)}
                className="cursor-pointer flex flex-col items-center justify-center relative"
              >
                <img
                  src={item.logo}
                  alt={item.id}
                  className={`w-16 transition-all duration-300 ${
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

        <div className="absolute bottom-[23%] right-[30%] w-[39%] h-[22%] bg-[#DCD9BA] font-header rounded-sm flex items-center justify-center text-black text-base tracking-wide cursor-pointer hover:bg-[#e6e3c8] transition">
          Know More
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center text-center max-w-5xl px-4">
        <div ref={dynamicContentRef}>
          <h1 className="text-3xl font-header font-bold">
            Blacktape{" "}
            <span className="font-light text-lg">{current?.span}</span>
          </h1>
          <p className="max-w-xl text-base font-light font-header px-2 mt-2">
            {current?.text}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWeDesktop;
