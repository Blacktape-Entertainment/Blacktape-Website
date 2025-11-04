import { useRef } from "react";
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
        // Mobile: Horizontal scroll animation
        const scrollWidth =
          cardsContainer.scrollWidth - cardsContainer.clientWidth;

        gsap.to(cardsContainer, {
          x: () => -scrollWidth,
          ease: "power1.inOut",
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
        // Desktop: Vertical row-by-row scroll animation
        const cardRows = cardsContainer.querySelectorAll(".card-row");
        if (cardRows.length === 0) return;

        const rowHeight = cardRows[0].offsetHeight;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: 1,
          },
        });

        // Animate rows sequentially
        timeline.to(
          cardsContainer,
          {
            y: -rowHeight - 40,
            ease: "power1.inOut",
            duration: 0.33,
          },
          0.33
        );

        timeline.to(
          cardsContainer,
          {
            y: -(rowHeight * 2 + 80),
            ease: "power1.inOut",
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
      className="w-full px-2.5 sm:px-10 md:px-20 pb-12 sm:pb-12 md:pb-24 h-screen pt-20 flex flex-col sm:flex-row items-center sm:items-start justify-center gap-5 overflow-hidden select-none"
    >
      {/* Text Section */}
      <div className="flex flex-col items-center w-full sm:items-start justify-start gap-4 text-center sm:text-left sm:max-w-1/3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-header font-bold leading-snug">
          What's included in the{" "}
          <span className="max-sm:text-gold">Blacktape</span> experience
        </h1>
        <p className="text-sm sm:text-base font-light text-black/70 font-text">
          Blacktape is more than an event plan. Access an all-in-one ecosystem
          for seamless proposals, real-time tracking, and expert-led execution
          personalized to your unique vision.
        </p>
        <a
          className="mt-4 px-6 py-2.5 text-sm sm:text-base text-white bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300 hidden sm:block"
          href="#instantaiconnect"
        >
          Plan Your Event &gt;
        </a>
      </div>

      {/* Cards Section */}
      <div className="flex-1 w-full relative">
        {/* Mobile: Horizontal Scroll */}
        {isMobile && (
          <div className="w-full h-full overflow-hidden relative">
            <div
              ref={cardsContainerRef}
              className="cards-inner flex gap-4 px-4"
            >
              {cards.map((card, i) => (
                <div key={i} className="flex-shrink-0 w-48 rounded">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full h-48 overflow-hidden mb-3 shadow-lg">
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

        {/* Desktop: Vertical Rows */}
        {!isMobile && (
          <div
            ref={cardsContainerRef}
            className="flex flex-col gap-10 w-full max-w-2xl mx-auto"
          >
            {[0, 2, 4].map((startIndex, rowIndex) => (
              <div
                key={rowIndex}
                className="card-row grid grid-cols-1 sm:grid-cols-2 gap-10 rounded"
              >
                {cards.slice(startIndex, startIndex + 2).map((card, i) => (
                  <div
                    key={startIndex + i}
                    className="flex flex-col items-center md:items-start text-center md:text-left"
                  >
                    <div className="w-full h-44 overflow-hidden mb-3 shadow-lg">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhatIsIncluded;
