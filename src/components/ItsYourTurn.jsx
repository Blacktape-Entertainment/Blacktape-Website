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

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const leftCard = leftCardRef.current;
    const centerCard = centerCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !header || !leftCard || !centerCard || !rightCard) return;

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

    let hasScrolled = false;

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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white h-screen flex flex-col justify-center items-center relative"
    >
      {/* Header Section */}
      <div
        ref={headerRef}
        className="w-full flex flex-col items-center gap-2 md:gap-3 mb-5 md:mb-6 px-4"
      >
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold text-black leading-tight mb-2">
            It's Your Turn.
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-light text-black font-text mb-2 md:mb-3">
            From cinematic productions to transformative events, we apply our
            commitment to artistry and technical excellence to every project.
          </p>
        </div>
        <button className="px-5 md:px-7 lg:px-9 py-1.5 md:py-2 text-xs sm:text-sm text-black bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300">
          Explore Our World
        </button>
      </div>

      {/* Team Cards Section */}
      <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-4 px-4">
        {teamMembers.map((member, index) => {
          let cardRef;
          if (index === 0) cardRef = leftCardRef;
          else if (index === 1) cardRef = centerCardRef;
          else cardRef = rightCardRef;

          return (
            <div
              key={index}
              ref={cardRef}
              className={`p-2.5 md:p-3 relative flex flex-col justify-end shadow-xl ${
                member.isCenter
                  ? "w-52 sm:w-60 md:w-72 lg:w-80 h-60 sm:h-72 md:h-80 lg:h-96"
                  : "w-44 sm:w-52 md:w-60 lg:w-72 h-52 sm:h-60 md:h-72 lg:h-80"
              }`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative bg-white p-2.5 md:p-3 z-10 border-t-6 md:border-t-8 border-white">
                <div className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base lg:text-lg font-light">
                  <span className="text-black font-normal">{member.name}</span>
                  <span className="text-[#686a6a]">{member.position}</span>
                </div>
                <div className="w-full h-px bg-[#e0e0e0] my-1.5 md:my-2" />
                <ul className="list-disc list-inside text-[#686a6a] text-xs md:text-sm font-light space-y-0.5 md:space-y-1">
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
