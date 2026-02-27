import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import RequestCallModal from "./RequestCallModal";
import { ASSETS_URL } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const InstantAIConnect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const phoneRef = useRef(null);
  const textRef = useRef(null);
  const antennaRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const subtitle = subtitleRef.current;
    const phone = phoneRef.current;
    const text = textRef.current;
    const antenna = antennaRef.current;

    if (!section || !header || !subtitle || !phone || !text || !antenna) return;

    let mm = gsap.matchMedia();

    // DESKTOP (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(phone, { opacity: 1, scale: 0.6, x: "50vw", y: "70vh", xPercent: -50, yPercent: -50 });
      gsap.set(text, { opacity: 0, x: "8vw", y: "55vh", xPercent: 0, yPercent: -50 });
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

      tl.to([header, subtitle], { y: -150, opacity: 0, ease: "power2.inOut", duration: 0.3 }, 0);
      tl.to(antenna, { top: "-21%", ease: "power2.inOut", duration: 0.3 }, 0);
      tl.to(phone, { scale: 1.2, x: "75vw", y: "70vh", ease: "power2.out", duration: 0.5 }, 0.3);
      tl.to(text, { opacity: 1, x: "8vw", y: "50vh", ease: "power2.out", duration: 0.4 }, 0.5);
    });

    // TABLET (768px - 1023px)
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(phone, { opacity: 1, scale: 0.6, x: "50vw", y: "87vh", xPercent: -50, yPercent: -50 });
      gsap.set(text, { opacity: 0, x: "5vw", y: "55vh", xPercent: 0, yPercent: -50 });
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

      tl.to([header, subtitle], { y: -150, opacity: 0, ease: "power2.inOut", duration: 0.3 }, 0);
      tl.to(antenna, { top: "-21%", ease: "power2.inOut", duration: 0.3 }, 0);
      tl.to(phone, { scale: 0.9, x: "75vw", y: "70vh", ease: "power2.out", duration: 0.5 }, 0.3);
      tl.to(text, { opacity: 1, x: "5vw", y: "50vh", ease: "power2.out", duration: 0.4 }, 0.5);
    });

    // MOBILE (< 768px)
    mm.add("(max-width: 767px)", () => {
      gsap.set(header, { opacity: 1, y: 0 });
      gsap.set(subtitle, { opacity: 1, y: 0 });
      gsap.set(phone, { opacity: 1, scale: 0.5, x: "50vw", y: "65vh", xPercent: -50, yPercent: -50 });
      gsap.set(text, { opacity: 0, x: "50vw", y: "20vh", xPercent: -50, yPercent: 0 });
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

      tl.to([header, subtitle], { y: -150, opacity: 0, ease: "power2.inOut", duration: 0.3 }, 0);
      tl.to(antenna, { top: "-21%", ease: "power2.inOut", duration: 0.3 }, 0);
      tl.to(phone, { scale: 0.75, x: "50vw", y: "75vh", ease: "power2.out", duration: 0.5 }, 0.3);
      tl.to(text, { opacity: 1, x: "50vw", y: "12vh", ease: "power2.out", duration: 0.4 }, 0.5);
    });

    return () => mm.revert();
  }, []);

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
        className="absolute top-0 left-0 z-10 opacity-0"
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
        className="absolute top-0 left-0 w-[90%] sm:w-[85%] md:w-[45%] lg:w-auto lg:max-w-md xl:max-w-xl z-20 lg:z-30 text-center md:text-left opacity-0"
      >
        <h3 className="font-header text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl pointer-events-none">
          Instant AI Connect
        </h3>
        <p className="font-text text-black font-light text-xs sm:text-sm md:text-base lg:text-xl mt-1 pointer-events-none">
          Request a call, and our AI liaison will connect with you momentarily.
        </p>
        <p className="font-text text-black text-[11px] sm:text-xs md:text-sm lg:text-lg mt-2 md:mt-3 pointer-events-none">
          In our commitment to providing exceptional and effortless service, we
          invite you to connect with us directly. We understand that your time
          is valuable, which is why we've eliminated hold times and
          complexities. Simply provide your telephone number in the field below.
        </p>
        <p className="font-text text-black font-light text-[11px] sm:text-xs md:text-sm lg:text-lg mt-1.5 md:mt-2">
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
