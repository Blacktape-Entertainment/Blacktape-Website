import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import teamBg from "/images/team-bg.jpg";
import teamBgMobile from "/images/team-bg-mobile.jpg";
import leftImage from "/images/left-image-our-team.png";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import { teamMembers } from "../constants";

const OurTeam = () => {
  const ourTeamRef = useRef(null);
  const itIsyourTurnRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      const itIsyourTurnSection = itIsyourTurnRef.current;
      const ourTeamSection = ourTeamRef.current;
      const container = containerRef.current;
      const header = headerRef.current;
      const left = leftCardRef.current;
      const center = centerCardRef.current;
      const right = rightCardRef.current;

      if (
        !itIsyourTurnSection ||
        !ourTeamSection ||
        !container ||
        !header ||
        !left ||
        !center ||
        !right
      )
        return;

      // Timeline setup
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
        },
      });

      /** -------------------
       * STEP 1 — Our Team out
       * ------------------- */
      tl.to(ourTeamSection, {
        opacity: 0,
        zIndex: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      /** -------------------
       * STEP 2 — It’s Your Turn in
       * ------------------- */
      tl.to(
        itIsyourTurnSection,
        {
          opacity: 1,
          zIndex: 50,
          duration: 1,
          ease: "power2.inOut",
        },
        "<+=0.1" // small overlap for smoother transition
      );

      /** -------------------
       * STEP 3 — Cards + Header animation
       * ------------------- */
      if (isMobile) {
        // Mobile simple fade up
        gsap.set([header, left, center, right], { opacity: 0, y: 50 });

        tl.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });

        tl.to(
          [left, center, right],
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        );
      } else {
        /** -------------------
         * Desktop advanced animation
         * ------------------- */

        // ✅ Measure first (before setting transforms)
        const leftRect = left.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();
        const rightRect = right.getBoundingClientRect();

        const leftOffset = centerRect.left - leftRect.left;
        const rightOffset = centerRect.left - rightRect.left;

        // Initial visual setup
        gsap.set(header, { opacity: 0, y: "100%" });
        gsap.set([left, right], { opacity: 0, scale: 0.95, zIndex: 0 });
        gsap.set(left, { x: leftOffset });
        gsap.set(right, { x: rightOffset });
        gsap.set(center, { opacity: 1, x: 0, scale: 1, zIndex: 10 });

        // Header slides in
        tl.to(header, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.3,
        });

        // Cards fade + partial move toward center
        tl.to(
          [left, right],
          {
            opacity: 1,
            x: (i, el) => (el === left ? leftOffset * 0.6 : rightOffset * 0.6),
            scale: 0.97,
            ease: "power2.inOut",
            duration: 0.3,
          },
          "-=0.1"
        );

        // Move closer again
        tl.to(
          [left, right],
          {
            x: (i, el) => (el === left ? leftOffset * 0.3 : rightOffset * 0.3),
            scale: 0.99,
            ease: "power2.inOut",
            duration: 0.3,
          },
          "+=0.1"
        );

        // Final positions
        tl.to(
          [left, right],
          {
            x: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.3,
          },
          "+=0.1"
        );
      }
    },
    { dependencies: [isMobile] }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden "
    >
      <section
        ref={ourTeamRef}
        id="ourteam"
        className="absolute inset-0 z-50 bg-[#685A51] overflow-hidden w-full h-screen opacity-100"
      >
        {/* Mobile: Background + Overlay Card */}
        {isMobile && (
          <>
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={teamBgMobile}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-start justify-start pt-[1.5rem] z-10">
              {/* Header - Left aligned, full width */}
              <h1 className="text-[1.5rem] font-header font-bold leading-[1.1] text-white mb-[0.5rem] text-left w-full pl-[1rem]">
                Your Vision is the Blueprint.
              </h1>

              {/* Description and Button Row - Right aligned */}
              <div className="w-full flex flex-col items-end mb-[1.5rem] pr-[1rem]">
                {/* Description */}
                <p className="text-[0.5rem] font-light text-white/95 font-text leading-[1.5] w-full mb-[0.5rem] text-right">
                  We believe every great event, film, or album already exists
                  within a core idea. Our role is to provide the international
                  standards and technical excellence required to breathe life
                  into it.
                </p>

                {/* Explore Button */}
                <button className="py-[0.375rem] px-[0.1rem] text-[0.5rem] text-black bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300 mr-[-0.5rem]">
                  Explore Our World
                </button>
              </div>

              {/* White Frame positioned over background - CONFIGURABLE */}
              <div
                className="absolute flex flex-col items-start"
                style={{
                  top: "16%",
                  right: "35%",
                  width: "13rem",
                  height: "19rem",
                }}
              >
                {/* White border frame - positioned to frame a person in the background */}
                <div className="border-[0.5rem] border-white flex flex-col justify-end w-full h-[20rem] mb-0 p-[0.5rem]">
                  <div className="bg-white px-[1rem] py-[0.75rem] shadow-lg w-full">
                    <div className="flex items-center gap-[0.5rem] mb-[0.5rem]">
                      <span className="text-black font-text text-[0.875rem] font-normal">
                        Ahmed Samir
                      </span>
                      <span className="text-[#686a6a] font-text text-[0.875rem] font-light">
                        CEO
                      </span>
                    </div>
                    <div className="w-full h-[0.0625rem] bg-[#e0e0e0] mb-[0.5rem]" />
                    <ul className="list-disc list-inside text-[#686a6a] font-text text-[0.75rem] font-light space-y-[0.25rem] pl-[0.25rem]">
                      <li>Guiding the Blacktape Legacy.</li>
                      <li>Architect of Visionary Experiences.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Desktop: Multi-image layout */}
        {!isMobile && (
          <>
            <div className="absolute left-0 top-0 h-full flex flex-col items-start px-15 py-10 max-w-xl w-full z-10 text-left justify-start">
              <h1 className="text-5xl font-header font-bold leading-snug text-white mb-0 w-full whitespace-nowrap py-10">
                Your Vision is the Blueprint.
              </h1>
              <p className="text-base font-light text-[#dddddd] font-text max-w-xs leading-relaxed">
                We believe every great event, film, or album already exists
                within a core idea. Our role is to provide the international
                standards and technical excellence required to breathe life into
                it.
              </p>
              <button className="mt-4 px-6 py-2.5 text-base text-black bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300">
                Explore Our World
              </button>
            </div>

            <div className="flex relative h-full">
              <img
                src={leftImage}
                className="flex-none h-full w-auto object-contain"
                alt=""
              />
              <div className="flex-1 relative h-full">
                <img
                  src={teamBg}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="hidden md:flex flex-col justify-end items-start absolute bottom-[0%] right-[35%] w-[39%] h-2/3 bg-opacity-95 border-10 border-white border-b-0 shadow-2xl p-5 z-20">
                  <div className="bg-white p-3 w-full">
                    <div className="flex items-center gap-2 font-text text-lg font-light mb-2">
                      <span className="text-black">Ahmed Samir</span>
                      <span className="text-[#686a6a]">CEO</span>
                    </div>
                    <div className="w-full h-px bg-[#e0e0e0] my-2" />
                    <ul className="list-disc list-inside text-[#686a6a] font-text text-base font-light space-y-1 mt-auto px-2">
                      <li>Guiding the Blacktape Legacy.</li>
                      <li>Architect of Visionary Experiences.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* it's your turn section */}

      <section
        ref={itIsyourTurnRef}
        id="itsyourturn"
        className="absolute opacity-0 inset-0 z-50 bg-white flex flex-col justify-center items-center w-full h-screen overflow-hidden py-[1rem] md:py-0"
      >
        {/* Header Section */}
        <div
          ref={headerRef}
          className="w-full flex flex-col items-center gap-[0.25rem] md:gap-[0.75rem] mb-[0.75rem] md:mb-[2rem] px-[1rem]"
        >
          <div className="max-w-2xl text-center">
            <h1 className="text-[1.5rem] md:text-4xl lg:text-5xl font-header font-bold text-black leading-tight mb-[0.25rem]">
              It's Your Turn.
            </h1>
            <p className="text-[0.625rem] md:text-base font-light text-black font-text mb-[0.25rem] md:mb-[0.75rem]">
              From cinematic productions to transformative events, we apply our
              commitment to artistry and technical excellence to every project.
            </p>
          </div>
          <button className="px-[1rem] md:px-[1.75rem] lg:px-[2.25rem] py-[0.25rem] md:py-[0.5rem] text-[0.625rem] md:text-sm text-black bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300">
            Explore Our World
          </button>
        </div>

        {/* Team Cards Section */}
        <div
          className={`w-full max-w-5xl mx-auto flex ${
            isMobile
              ? "flex-col justify-center items-center"
              : "flex-wrap justify-center"
          } items-center gap-[0.5rem] md:gap-[1rem] lg:gap-[1.25rem] px-[1rem]`}
        >
          {teamMembers.map((member, index) => {
            let cardRef;
            if (index === 0) cardRef = leftCardRef;
            else if (index === 1) cardRef = centerCardRef;
            else cardRef = rightCardRef;

            return (
              <div
                key={index}
                ref={cardRef}
                className={`relative flex flex-col justify-end shadow-xl p-3 ${
                  isMobile
                    ? "w-[15rem] h-[11rem] mx-auto"
                    : member.isCenter
                    ? "w-52 sm:w-60 md:w-72 lg:w-80 h-60 sm:h-72 md:h-80 lg:h-96"
                    : "w-44 sm:w-52 md:w-60 lg:w-72 h-52 sm:h-60 md:h-72 lg:h-80"
                }`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-center"
                />
                <div
                  className={`relative bg-white z-10 p-2 ${
                    isMobile ? "" : "md:p-[0.75rem]"
                  }`}
                >
                  <div
                    className={`flex items-center gap-[0.25rem] md:gap-[0.5rem] font-light ${
                      isMobile ? "text-[0.625rem]" : "md:text-base lg:text-lg"
                    }`}
                  >
                    <span className="text-black font-normal">
                      {member.name}
                    </span>
                    <span className="text-[#686a6a]">{member.position}</span>
                  </div>
                  <div
                    className={`w-full h-[0.0625rem] ${
                      isMobile ? "my-[0.25rem]" : "md:my-[0.5rem]"
                    }`}
                  />
                  <ul
                    className={`list-disc list-inside text-[#686a6a] font-light ${
                      isMobile
                        ? "text-[0.5625rem] space-y-[0.0625rem]"
                        : "md:text-sm md:space-y-[0.25rem]"
                    }`}
                  >
                    {member.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
