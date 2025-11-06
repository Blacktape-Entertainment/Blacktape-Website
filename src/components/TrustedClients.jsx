import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ANIMATION_CONFIG } from "../constants";
import { useMediaQuery } from "react-responsive";
import { clientLogos } from "../constants";
import { useGSAP } from "@gsap/react";

const TrustedClients = ({ navbarRef }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsContainerRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const rowsContainer = rowsContainerRef.current;

    if (!section || !header || !rowsContainer) return;

    const rows = rowsContainer.querySelectorAll(".client-row");
    if (rows.length === 0) return;

    // Calculate based on mobile or desktop grid
    const columnsPerRow = isMobile ? 3 : 4;
    const rowHeight = isMobile ? 100 : 120; // Smaller row height on mobile
    const totalRows = Math.ceil(clientLogos.length / columnsPerRow);
    const visibleRows = isMobile ? 2.5 : 3; // Show fewer rows on mobile
    const scrollMultiplier = isMobile ? 40 : 50; // Faster scroll on mobile

    // Animate navbar immediately when entering section with smooth animation
    if (navbarRef?.current && !isMobile) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalRows * scrollMultiplier}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });

    // Animate rows scrolling up - ensure we scroll to show ALL rows
    timeline.to(
      rowsContainer,
      {
        y: -(rowHeight * (totalRows - visibleRows + 1)),
        ease: "none",
      },
      0
    );

    // Hide navbar if ref exists - fast exit
    if (navbarRef?.current) {
      timeline.to(navbarRef.current, {
        opacity: 0,
        y: -100,
        ease: "power2.in",
        duration: 0.3,
      });
    }
  }, [isMobile]);

  // Use all logos from clientLogos
  const logoItems = clientLogos.map((logoPath, i) => ({
    logo: logoPath,
    id: i,
  }));

  // Split into rows based on device type
  const columnsPerRow = isMobile ? 3 : 4;
  const clientRows = [];
  for (let i = 0; i < logoItems.length; i += columnsPerRow) {
    clientRows.push(logoItems.slice(i, i + columnsPerRow));
  }

  return (
    <section
      ref={sectionRef}
      id="trustedclients"
      className="w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center max-w-2xl mb-8 px-4 z-10">
        <h2 className="font-header font-extrabold text-black text-4xl md:text-4xl lg:text-5xl leading-tight mb-2 tracking-tight">
          Trusted Clients
        </h2>
        <p className="font-text text-xs sm:text-sm md:text-base text-black font-light">
          All at once, all in one, all in between your hands
        </p>
      </div>

      {/* Scrolling Rows Container with mask */}
      <div className="relative w-full max-w-6xl mx-auto h-[400px] overflow-hidden">
        {/* Top blur mask */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/50 to-transparent z-10 pointer-events-none" />

        {/* Bottom blur mask */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent z-10 pointer-events-none" />

        {/* Rows Container */}
        <div
          ref={rowsContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-start pt-24"
        >
          {clientRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="client-row w-full grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 px-4 md:px-8 py-4 justify-items-center"
              style={{
                filter: "blur(0px)",
              }}
            >
              {row.map((client, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2 sm:gap-2.5 md:gap-3 text-[#111827] opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  <div className="w-24 sm:w-28 md:w-32 lg:w-36 h-12 md:h-16 flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={`client-logo-${client.id}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
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
