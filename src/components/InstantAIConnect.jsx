import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const InstantAIConnect = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const subtitleRef = useRef(null);
  const phoneRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const subtitle = subtitleRef.current;
    const phone = phoneRef.current;
    const text = textRef.current;

    if (!section || !header || !subtitle || !phone || !text) return;

    // Initial states
    gsap.set(header, { opacity: 1, y: 0 });
    gsap.set(subtitle, { opacity: 1, y: 0 });
    gsap.set(phone, { opacity: 1, scale: 0.4, yPercent: 20 });
    gsap.set(text, { opacity: 0, x: -150 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
      },
    });

    // Phase 1: Header + subtitle fade up/out
    tl.to(
      header,
      {
        opacity: 0,
        y: -100,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0
    );

    tl.to(
      subtitle,
      {
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        duration: 0.3,
      },
      0
    );

    // Phase 2: Phone scales up + moves up to right
    tl.to(
      phone,
      {
        scale: 1,
        yPercent: 0,
        xPercent: 50,
        ease: "power2.inOut",
        duration: 0.5,
      },
      0.25
    );

    // Phase 3: Text fades/slides in
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="instantaiconnect"
      className="w-full h-screen bg-white relative overflow-hidden"
    >
      {/* Header */}
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

      {/* Phone + Text */}
      <div className="absolute inset-0 flex items-center justify-center px-8 lg:px-16">
        <div className="w-full max-w-7xl flex flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div ref={textRef} className="max-w-md flex-shrink-0">
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

          {/* Phone */}
          <div
            ref={phoneRef}
            className="absolute flex-shrink-0 left-[50%] transform -translate-x-1/2 "
          >
            <div className="relative w-64 sm:w-72 md:w-96 lg:w-[28rem]">
              <img
                src="images/ai-antenna-2.png"
                alt="antenna"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstantAIConnect;
