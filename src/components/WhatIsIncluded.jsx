import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "/images/card1.png";
import img2 from "/images/card2.png";
import img3 from "/images/card3.png";
import img4 from "/images/card4.png";
import img5 from "/images/card5.png";
import img6 from "/images/card6.png";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    image: img1,
    title: "All your data in one place",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: img2,
    title: "Seamless Collaboration",
    text: "Empower your team with real-time visibility and creative tools.",
  },
  {
    image: img3,
    title: "Smart Performance",
    text: "Track results effortlessly with clear and actionable metrics.",
  },
  {
    image: img4,
    title: "Client Satisfaction",
    text: "Deliver excellence consistently with intuitive planning tools.",
  },
  {
    image: img5,
    title: "Engagement Insights",
    text: "Understand and enhance audience connection through data.",
  },
  {
    image: img6,
    title: "Post-Event Analytics",
    text: "Evaluate every success story with detailed post-event insights.",
  },
];

const WhatIsIncluded = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);
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
    const cards = cardsRef.current;

    if (!section || !cards) return;

    let hasScrolled = false;

    if (isMobile) {
      // Mobile: Manual drag carousel with scroll-to-next on wheel scroll
      const handleWheel = (e) => {
        const sectionRect = section.getBoundingClientRect();
        // Check if section is currently in viewport
        const isInView = sectionRect.top <= 100 && sectionRect.bottom > 100;

        // If scrolling down while section is in view
        if (isInView && e.deltaY > 0 && !hasScrolled) {
          e.preventDefault();
          hasScrolled = true;
          const nextSection = document.querySelector("#ourteam");

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
      // Desktop: Vertical card rows animation
      const cardRows = cards.querySelectorAll(".card-row");
      if (cardRows.length === 0) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#whatisincluded",
          start: "top top",
          end: "+=300%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Auto-scroll to next section
            if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
              hasScrolled = true;
              const nextSection = document.querySelector("#ourteam");

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

      // Calculate row height for alignment
      const rowHeight = cardRows[0].offsetHeight;

      // Phase 2: Scroll to align text with second row (33-66%)
      timeline.to(
        cards,
        {
          y: -rowHeight - 40, // Move up by one row + gap
          ease: "none",
          duration: 0.33,
        },
        0.33
      );

      // Phase 3: Scroll to align text with third row (66-100%)
      timeline.to(
        cards,
        {
          y: -(rowHeight * 2 + 80), // Move up by two rows + gaps
          ease: "none",
          duration: 0.34,
        },
        0.66
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
      id="whatisincluded"
      className="w-full md:pb-24 md:px-20 px-2.5 pb-12 h-screen pt-20 flex flex-col md:flex-row items-start md:items-start justify-center gap-10 overflow-hidden select-none"
    >
      {/* Text side */}
      <div
        ref={textRef}
        className="flex-1 flex flex-col items-center md:items-start justify-start gap-4 text-center md:text-left max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-header font-bold leading-snug">
          What's included in the Blacktape experience
        </h1>
        <p className="text-sm sm:text-base font-light text-black/70 font-text">
          Blacktape is more than an event plan. Access an all-in-one ecosystem
          for seamless proposals, real-time tracking, and expert-led execution
          personalized to your unique vision.
        </p>
        <button className="mt-4 px-6 py-2.5 text-sm sm:text-base text-white bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300 hidden sm:block">
          Plan Your Event &gt;
        </button>
      </div>

      {/* Cards side */}
      <div ref={cardsRef} className="flex-1 w-full relative">
        {/* Mobile: Horizontal scroll carousel */}
        {isMobile && (
          <div className="carousel-container w-full overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4 px-4">
              {cards.map((card, i) => (
                <div key={i} className="flex-shrink-0 w-[280px] snap-center">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full h-[280px] overflow-hidden mb-3 shadow-lg">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="text-lg font-semibold font-header text-black mb-1">
                      {card.title}
                    </h2>
                    <p className="text-sm text-black/70 font-light font-text">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Desktop: Grid layout with rows */}
        {!isMobile && (
          <div className="flex flex-col gap-10 w-full max-w-2xl mx-auto">
            {/* Row 1 */}
            <div className="card-row grid grid-cols-1 sm:grid-cols-2 gap-10">
              {cards.slice(0, 2).map((card, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-full h-[280px] overflow-hidden mb-3 shadow-lg">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <h2 className="text-lg font-semibold font-header text-black mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-black/70 font-light font-text">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="card-row grid grid-cols-1 sm:grid-cols-2 gap-10">
              {cards.slice(2, 4).map((card, i) => (
                <div
                  key={i + 2}
                  className="flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-full h-[280px] overflow-hidden mb-3 shadow-lg">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <h2 className="text-lg font-semibold font-header text-black mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-black/70 font-light font-text">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="card-row grid grid-cols-1 sm:grid-cols-2 gap-10">
              {cards.slice(4, 6).map((card, i) => (
                <div
                  key={i + 4}
                  className="flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-full h-[280px] overflow-hidden mb-3 shadow-lg">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <h2 className="text-lg font-semibold font-header text-black mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm text-black/70 font-light font-text">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatIsIncluded;
