import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamBg from "../assets/images/team-bg.jpg";
import teamBgMobile from "../assets/images/team-bg-mobile.jpg";
import leftImage from "../assets/images/left-image-our-team.png";

gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let hasScrolled = false;

    if (isMobile) {
      // Mobile: Add wheel scroll listener to jump to next section
      const handleWheel = (e) => {
        const sectionRect = section.getBoundingClientRect();
        // Check if section is currently in viewport
        const isInView = sectionRect.top <= 100 && sectionRect.bottom > 100;

        // If scrolling down while section is in view
        if (isInView && e.deltaY > 0 && !hasScrolled) {
          e.preventDefault();
          hasScrolled = true;
          const nextSection = document.querySelector("#itsyourturn");

          if (nextSection) {
            const targetY =
              nextSection.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: targetY, behavior: "smooth" });
            // Reset after scroll completes
            setTimeout(() => {
              hasScrolled = false;
            }, 1000);
          }
        }
      };

      window.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        window.removeEventListener("wheel", handleWheel);
      };
    } else {
      // Desktop: ScrollTrigger with pin
      const scrollTrigger = ScrollTrigger.create({
        trigger: "#ourteam",
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Auto-scroll to next section
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#itsyourturn");

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
      });

      return () => {
        if (scrollTrigger) {
          scrollTrigger.kill(true);
        }
      };
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="ourteam"
      className="w-full relative bg-[#685A51] h-screen overflow-hidden"
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
                standards and technical excellence required to breathe life into
                it.
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
              We believe every great event, film, or album already exists within
              a core idea. Our role is to provide the international standards
              and technical excellence required to breathe life into it.
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
              <img src={teamBg} className="w-full h-full object-cover" alt="" />
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
  );
};

export default OurTeam;
