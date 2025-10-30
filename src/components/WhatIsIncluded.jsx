import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import { cards } from "../constants";

const WhatIsIncluded = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cardsContainer = cardsContainerRef.current;

      if (!section || !cardsContainer) return;

      if (isMobile) {
        // ✅ Mobile: Horizontal scroll driven by vertical scrolling
        const scrollWidth =
          cardsContainer.scrollWidth - cardsContainer.clientWidth;

        gsap.to(cardsContainer, {
          x: () => -scrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
      } else {
        // ✅ Desktop: 3 vertical card rows scroll animation
        const cardRows = cardsContainer.querySelectorAll(".card-row");
        if (cardRows.length === 0) return;

        const rowHeight = cardRows[0].offsetHeight;
        let hasScrolled = false;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
                hasScrolled = true;
              }
              if (progress < 0.99) hasScrolled = false;
            },
          },
        });

        // Phase 2: Move up by one row
        timeline.to(
          cardsContainer,
          {
            y: -rowHeight - 40,
            ease: "none",
            duration: 0.33,
          },
          0.33
        );

        // Phase 3: Move up by two rows
        timeline.to(
          cardsContainer,
          {
            y: -(rowHeight * 2 + 80),
            ease: "none",
            duration: 0.34,
          },
          0.66
        );
      }
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      id="whatisincluded"
      className="w-full md:pb-24 md:px-20 px-2.5 pb-12 h-screen pt-20 flex flex-col md:flex-row items-start md:items-start justify-center gap-10 overflow-hidden select-none"
    >
      {/* Text side */}
      <div className="md:flex-1 flex flex-col items-center md:items-start justify-start gap-4 text-center md:text-left max-w-md">
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
      <div className="flex-1 w-full relative">
        {/* ✅ Mobile: Horizontal scroll driven by vertical scroll */}
        {isMobile && (
          <div className="w-full h-full overflow-hidden relative">
            <div
              ref={cardsContainerRef}
              className="cards-inner flex gap-4 px-4"
            >
              {cards.map((card, i) => (
                <div key={i} className="flex-shrink-0 w-[280px]">
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

        {/* ✅ Desktop: 3-row vertical scrolling cards */}
        {!isMobile && (
          <div
            ref={cardsContainerRef}
            className="flex flex-col gap-10 w-full max-w-2xl mx-auto"
          >
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
