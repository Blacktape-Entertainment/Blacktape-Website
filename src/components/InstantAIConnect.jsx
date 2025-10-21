import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import antennaSmall from "../assets/images/ai-antenna-1.png";
import antennaLarge from "../assets/images/ai-antenna-2.png";

gsap.registerPlugin(ScrollTrigger);

const InstantAIConnect = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const phoneSmallRef = useRef(null);
  const phoneLargeRef = useRef(null);
  const textContentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const subtitle = subtitleRef.current;
    const phoneSmall = phoneSmallRef.current;
    const phoneLarge = phoneLargeRef.current;
    const textContent = textContentRef.current;

    if (
      !section ||
      !header ||
      !subtitle ||
      !phoneSmall ||
      !phoneLarge ||
      !textContent
    )
      return;

    // Initial states
    gsap.set(header, {
      opacity: 1,
      y: 0,
    });

    gsap.set(subtitle, {
      opacity: 1,
      y: 0,
    });

    gsap.set(phoneSmall, {
      opacity: 1,
      scale: 1,
    });

    gsap.set(phoneLarge, {
      opacity: 0,
      scale: 0.5,
    });

    gsap.set(textContent, {
      opacity: 0,
      x: -200,
    });

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#instantaiconnect",
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Auto-scroll to next section
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#footer");

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

    // Phase 1: Header and subtitle move up and fade out (0-30%)
    timeline.to(
      header,
      {
        opacity: 0,
        y: -100,
        ease: "power2.in",
        duration: 0.3,
      },
      0
    );

    timeline.to(
      subtitle,
      {
        opacity: 0,
        y: -50,
        ease: "power2.in",
        duration: 0.3,
      },
      0
    );

    // Phase 2: Small phone scales up and transitions to large phone (20-50%)
    timeline.to(
      phoneSmall,
      {
        opacity: 0,
        scale: 1.5,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0.2
    );

    timeline.to(
      phoneLarge,
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.3,
      },
      0.35
    );

    // Phase 3: Text content slides in from left (50-80%)
    timeline.to(
      textContent,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.3,
      },
      0.5
    );

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill(true);
      }
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instantaiconnect"
      className="w-full h-screen bg-white flex items-center justify-center relative overflow-hidden"
    >
      {/* Header and Subtitle - Phase 1 */}
      <div className="absolute top-16 md:top-20 left-0 right-0 text-center px-4 z-10">
        <h2
          ref={headerRef}
          className="font-header font-extrabold text-black leading-tight text-5xl sm:text-6xl md:text-7xl"
        >
          Instant AI Connect
        </h2>
        <p
          ref={subtitleRef}
          className="font-text text-black font-light text-base sm:text-lg md:text-xl mt-1"
        >
          Request a call, and your personal AI liaison will connect with you
          momentarily.
        </p>
      </div>

      {/* Small Phone - Initial State */}
      <div
        ref={phoneSmallRef}
        className="absolute flex items-center justify-center mt-32 md:mt-40"
      >
        <div className="relative">
          <img src={antennaSmall} alt="antenna" className="h-100" />
          <div className="absolute top-[42%] left-[31%] bg-[#A8B2AA] rounded-sm p-[0.3rem] w-fit scale-[0.38] origin-bottom shadow-sm">
            <p className="text-[0.45rem] text-black font-text mb-[0.2rem]">
              Enter your phone number:
            </p>
            <div className="border-2 border-white rounded-sm px-[0.4rem] py-[0.25rem] bg-transparent">
              <p className="text-[0.4rem] text-[#686a6a] font-text">
                Phone number *
              </p>
            </div>
            <button className="bg-[#353938] text-white rounded-sm w-full py-[0.25rem] mt-[0.3rem] text-[0.45rem] font-text">
              REQUEST A CALL
            </button>
          </div>
        </div>
      </div>

      {/* Layout Container for Large Phone and Text */}
      <div className="absolute inset-0 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-7xl flex flex-row items-center justify-between gap-12">
          {/* Left Text Content - Phase 3 */}
          <div ref={textContentRef} className="max-w-md flex-shrink-0">
            <h3 className="font-header font-extrabold text-black leading-tight text-3xl sm:text-4xl md:text-5xl">
              Instant AI Connect
            </h3>
            <p className="font-text text-black font-light text-sm sm:text-base md:text-lg mt-1">
              Request a call, and your personal AI liaison will connect with you
              momentarily.
            </p>
            <p className="font-text text-black font-light text-xs sm:text-sm md:text-base mt-3">
              In our commitment to providing exceptional and effortless service,
              we invite you to connect with us directly. We understand that your
              time is valuable, which is why we've eliminated hold times and
              complexities. Simply provide your telephone number in the field
              below.
            </p>
            <p className="font-text text-black font-light text-xs sm:text-sm md:text-base mt-2">
              Prefer the Human touch?{" "}
              <span className="underline text-[#7c680d] cursor-pointer">
                Press Here
              </span>
            </p>
          </div>

          {/* Large Phone - Phase 2 */}
          <div ref={phoneLargeRef} className="flex-shrink-0">
            <div className="relative w-64 sm:w-72 md:w-96 lg:w-[28rem]">
              <img src={antennaLarge} alt="antenna" className="w-full h-auto" />
              <div className="absolute top-[21%] left-[22%] bg-[#f5f5f5] rounded-lg p-[0.5rem] w-[59%] h-[17%] origin-bottom shadow-md flex flex-col justify-center gap-1.5">
                <p className="text-[1rem] text-black font-text mb-[0.4rem] tracking-normal">
                  Enter your phone number:
                </p>
                <div className="border border-[#d0d0d0] rounded px-[0.8rem] py-[0.5rem] mb-[0.5rem] bg-white">
                  <p className="text-[0.85rem] text-[#9ca3af] font-text">
                    Phone number *
                  </p>
                </div>
                <button className="bg-[#c3b896] text-[#2d2d2d] rounded-sm w-full py-[0.65rem] text-[0.9rem] font-semibold tracking-wide">
                  REQUEST A CALL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstantAIConnect;
