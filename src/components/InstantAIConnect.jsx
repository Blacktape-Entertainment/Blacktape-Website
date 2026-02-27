import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import RequestCallModal from "./RequestCallModal";
import { ASSETS_URL } from "../constants";

const InstantAIConnect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const phoneRef = useRef(null);
  const textRef = useRef(null);
  const antennaRef = useRef(null);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });

  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const subtitle = subtitleRef.current;
    const phone = phoneRef.current;
    const text = textRef.current;
    const antenna = antennaRef.current;

    if (!section || !header || !subtitle || !phone || !text || !antenna) return;

    if (isLargeScreen) {
      // LARGE SCREENS: Phone moves right, text comes from left

      // Initial states
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(phone, { opacity: 1, scale: 0.5, x: 0, y: "70vh", xPercent: -50, yPercent: -50 });
      gsap.set(text, { opacity: 0, x: -200, xPercent: 0 });
      gsap.set(antenna, { top: "-2%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Header + subtitle move up
      tl.to(
        [header, subtitle],
        {
          y: -150,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.3,
        },
        0
      );

      // Phase 2: Antenna moves up at same time
      tl.to(
        antenna,
        {
          top: "-21%",
          ease: "power2.inOut",
          duration: 0.3,
        },
        0
      );

      // Phase 3: Phone scales up and moves to right edge
      tl.to(
        phone,
        {
          scale: 1.2,
          x: "30vw",
          y: "70vh",
          ease: "power2.out",
          duration: 0.5,
        },
        0.3
      );

      // Phase 4: Text slides in from left
      tl.to(
        text,
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          duration: 0.4,
        },
        0.5
      );
    } else {
      // SMALL SCREENS: Phone at bottom center, scales up in place

      // Initial states
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(phone, { opacity: 1, scale: 0.8, x: 0, y: "55vh", xPercent: -50, yPercent: -50 });
      gsap.set(text, { opacity: 0, y: 20, xPercent: -50, left: "50%" });
      gsap.set(antenna, { top: "-2%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1: Header + subtitle move up
      tl.to(
        [header, subtitle],
        {
          y: -150,
          opacity: 0,
          ease: "power2.inOut",
          duration: 0.3,
        },
        0
      );

      // Phase 2: Antenna moves up at same time
      tl.to(
        antenna,
        {
          top: "-21%",
          ease: "power2.inOut",
          duration: 0.3,
        },
        0
      );

      // Phase 3: Phone moves up slightly and scales
      tl.to(
        phone,
        {
          scale: 1,
          y: "40vh",
          ease: "power2.out",
          duration: 0.5,
        },
        0.3
      );

      // Phase 4: Text fades in at the top
      tl.to(
        text,
        {
          opacity: 1,
          y: 0,
          top: "15%",
          left: "50%",
          xPercent: -50,
          ease: "power2.out",
          duration: 0.4,
        },
        0.5
      );
    }
  }, [isLargeScreen]);

  return (
    <section
      ref={sectionRef}
      id="instantaiconnect"
      className="w-full h-screen bg-white relative overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-6 md:top-8 left-0 right-0 text-center px-4 z-10">
        <h2
          ref={headerRef}
          className="font-header font-extrabold text-black leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          Instant AI Connect
        </h2>
        <p
          ref={subtitleRef}
          className="font-text text-black font-light text-sm sm:text-base md:text-lg lg:text-xl mt-1"
        >
          Request a call, and your personal AI liaison will connect with you
          momentarily.
        </p>
      </div>

      {/* Phone */}
      <div
        ref={phoneRef}
        className="absolute top-1/3 md:top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[28rem]">
          {/* Phone base */}
          <img
            src={`${ASSETS_URL}/ai-antenna-2.webp`}
            alt="antenna"
            className="w-full h-auto relative z-10"
          />

          {/* Antenna Part 1 (shadow layer) */}
          <img
            src={`${ASSETS_URL}/Part-1.png`}
            alt="antenna part 1"
            className="absolute top-[0.2%] right-[9%] -translate-y-[100%] w-[13%] sm:w-[13%] md:w-[13%] z-[5]"
          />

          {/* Antenna Part 2 (main antenna) */}
          <img
            src={`${ASSETS_URL}/Part-2.png`}
            alt="antenna part 2"
            className="antenna absolute top-[-2%] right-[9%] -translate-y-[100%] w-[13%] sm:w-[13%] md:w-[13%] z-[3]"
            ref={antennaRef}
          />

          {/* Phone screen form */}
          <div className="absolute top-[21%] w-[63%] right-[18%] h-[18%] bg-white p-1.5 sm:p-2 md:p-3 shadow-lg z-50 flex flex-col rounded-xl sm:rounded-2xl justify-center gap-1 sm:gap-2">
            <label
              htmlFor="phone-number"
              className="font-text text-[9px] sm:text-[10px] md:text-xs"
            >
              Enter your phone number:
            </label>
            <input
              type="text"
              id="phone-number"
              className="border rounded border-gray-300 p-1 sm:p-1.5 w-full text-[9px] sm:text-[10px] md:text-xs"
              placeholder="Phone Number *"
            />
            <button className="p-1 sm:p-1.5 mt-0.5 bg-gold text-blacktape text-[9px] sm:text-[10px] md:text-xs font-text tracking-wide hover:bg-[#d6cfab] transition-all duration-300 text-center relative z-[60] rounded">
              Request a Call
            </button>
          </div>
        </div>
      </div>

      {/* Text - positioned differently based on screen size */}
      <div
        ref={textRef}
        className="absolute lg:left-[8%] lg:top-1/2 lg:-translate-y-1/2 
                   top-1/2 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:bottom-auto lg:right-auto
                   w-[90%] sm:w-[80%] md:max-w-lg lg:max-w-xl z-20 lg:z-30 text-center lg:text-left"
      >
        <h3 className="font-header text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl pointer-events-none">
          Instant AI Connect
        </h3>
        <p className="font-text text-black font-light text-xs sm:text-sm md:text-lg lg:text-xl mt-1 pointer-events-none">
          Request a call, and our AI liaison will connect with you momentarily.
        </p>
        <p className="font-text text-black text-[11px] sm:text-xs md:text-base lg:text-lg mt-2 md:mt-3 pointer-events-none">
          In our commitment to providing exceptional and effortless service, we
          invite you to connect with us directly. We understand that your time
          is valuable, which is why we've eliminated hold times and
          complexities. Simply provide your telephone number in the field below.
        </p>
        <p className="font-text text-black font-light text-[11px] sm:text-xs md:text-base lg:text-lg mt-1.5 md:mt-2">
          Prefer the Human touch?{" "}
          <span
            className="underline text-[#7c680d] cursor-pointer pointer-events-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Press Here
          </span>
        </p>
      </div>

      {/* Modal */}
      <RequestCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default InstantAIConnect;
