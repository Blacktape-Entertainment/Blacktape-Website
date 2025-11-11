import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ANIMATION_CONFIG } from "../constants";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { clientLogos } from "../constants";
const TrustedClients = () => {
  const sectionRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const rowsContainer = rowsContainerRef.current;
    if (!section || !rowsContainer) return;

    const rowHeight =
      rowsContainer.querySelector(".client-row").offsetHeight + 32;
    const totalScrollHeight =
      (rowHeight * clientLogos.length) / (isMobile ? 3 : 4);

    gsap.set(rowsContainer, { y: 0 });

    // Main scroll animation for logos
    gsap.to(rowsContainer, {
      y: -(totalScrollHeight - section.offsetHeight + rowHeight),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        pin: true,
        scrub: 1,
        pinSpacing: true,
      },
    });
  }, [isMobile]);

  // Group logos into rows automatically
  const columnsPerRow = isMobile ? 3 : 4;
  const clientRows = [];
  for (let i = 0; i < clientLogos.length; i += columnsPerRow) {
    clientRows.push(clientLogos.slice(i, i + columnsPerRow));
  }

  return (
    <section
      ref={sectionRef}
      id="trustedclients"
      className="w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative"
    >
      <div className="text-center max-w-2xl mb-8 px-4 z-10">
        <h2 className="font-header font-extrabold text-black text-5xl leading-tight mb-2">
          Trusted Clients
        </h2>
        <p className="font-text text-base text-black font-light">
          All at once, all in one, all in between your hands
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto h-[400px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={rowsContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-start pt-12"
        >
          {clientRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="client-row w-full grid grid-cols-3 md:grid-cols-4 gap-6 px-8 py-4 justify-items-center"
            >
              {row.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
                >
                  <img
                    src={logo}
                    alt={`client-logo-${idx}`}
                    className="max-h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedClients;
