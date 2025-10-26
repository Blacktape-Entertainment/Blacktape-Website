import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import teamAmmar from "../assets/images/team-ammar.jpg";
import teamAhmed from "../assets/images/team-ahmed.jpg";
import teamMohammed from "../assets/images/team-mohammed.jpg";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    name: "Mohammed Walid",
    position: "Tech Lead",
    image: teamMohammed,
    points: [
      "Guiding the Blacktape Legacy.",
      "Architect of Visionary Experiences.",
    ],
  },
  {
    name: "Ahmed Samir",
    position: "CEO",
    image: teamAhmed,
    points: [
      "Guiding the Blacktape Legacy.",
      "Architect of Visionary Experiences.",
    ],
    isCenter: true,
  },
  {
    name: "Ammar Ayman",
    position: "Art Director",
    image: teamAmmar,
    points: [
      "Guiding the Blacktape Legacy.",
      "Architect of Visionary Experiences.",
    ],
  },
];

const ItsYourTurn = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const leftCardRef = useRef(null);
  const centerCardRef = useRef(null);
  const rightCardRef = useRef(null);
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
    const header = headerRef.current;
    const leftCard = leftCardRef.current;
    const centerCard = centerCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !header) return;

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
          const nextSection = document.querySelector("#digitalsovereignty");

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

      // Mobile animations - stagger in cards
      let tl;
      if (leftCard && centerCard && rightCard) {
        gsap.set(header, { opacity: 0, y: 50 });
        gsap.set([leftCard, centerCard, rightCard], { opacity: 0, y: 30 });

        tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.to(header, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
          .to(
            leftCard,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3"
          )
          .to(
            centerCard,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          )
          .to(
            rightCard,
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.4"
          );
      }

      return () => {
        window.removeEventListener("wheel", handleWheel);
        if (tl) {
          if (tl.scrollTrigger) {
            tl.scrollTrigger.kill(true);
          }
          tl.kill();
        }
      };
    } else {
      // Desktop: Original card spreading animation
      if (!leftCard || !centerCard || !rightCard) return;

      // Get center card position for alignment
      const centerCardRect = centerCard.getBoundingClientRect();
      const leftCardRect = leftCard.getBoundingClientRect();
      const rightCardRect = rightCard.getBoundingClientRect();

      // Calculate distances to center
      const leftCardOffset = centerCardRect.left - leftCardRect.left;
      const rightCardOffset = centerCardRect.left - rightCardRect.left;

      // Initial states
      gsap.set(header, {
        opacity: 0,
        y: "100vh",
      });

      // Cards start stacked at center
      gsap.set(leftCard, {
        opacity: 0,
        x: leftCardOffset,
        scale: 0.95,
        zIndex: 0,
      });

      gsap.set(rightCard, {
        opacity: 0,
        x: rightCardOffset,
        scale: 0.95,
        zIndex: 0,
      });

      gsap.set(centerCard, {
        opacity: 1,
        x: 0,
        scale: 1,
        zIndex: 10,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#itsyourturn",
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
              const nextSection = document.querySelector("#digitalsovereignty");

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

      // Phase 1: Header enters from bottom (0-20%)
      timeline.to(
        header,
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.2,
        },
        0
      );

      // Phase 2: Cards appear and start moving (20-40%)
      timeline.to(
        leftCard,
        {
          opacity: 1,
          x: leftCardOffset * 0.6, // Move 40% of the way
          scale: 0.97,
          ease: "power2.inOut",
          duration: 0.2,
        },
        0.2
      );

      timeline.to(
        rightCard,
        {
          opacity: 1,
          x: rightCardOffset * 0.6, // Move 40% of the way
          scale: 0.97,
          ease: "power2.inOut",
          duration: 0.2,
        },
        0.2
      );

      // Phase 3: Cards move to halfway (40-60%)
      timeline.to(
        leftCard,
        {
          x: leftCardOffset * 0.3, // Move to 70% of the way
          scale: 0.99,
          ease: "power2.inOut",
          duration: 0.2,
        },
        0.4
      );

      timeline.to(
        rightCard,
        {
          x: rightCardOffset * 0.3, // Move to 70% of the way
          scale: 0.99,
          ease: "power2.inOut",
          duration: 0.2,
        },
        0.4
      );

      // Phase 4: Cards reach final positions (60-80%)
      timeline.to(
        leftCard,
        {
          x: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.2,
        },
        0.6
      );

      timeline.to(
        rightCard,
        {
          x: 0,
          scale: 1,
          ease: "power2.out",
          duration: 0.2,
        },
        0.6
      );

      return () => {
        if (timeline.scrollTrigger) {
          timeline.scrollTrigger.kill(true);
        }
        timeline.kill();
      };
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="itsyourturn"
      className="w-full bg-white h-screen flex flex-col justify-center items-center relative py-[1rem] md:py-0"
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
                  <span className="text-black font-normal">{member.name}</span>
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
  );
};

export default ItsYourTurn;
