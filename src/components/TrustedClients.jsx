import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MdMovie,
  MdBusiness,
  MdScience,
  MdCameraAlt,
  MdEvent,
  MdTrendingUp,
  MdPeople,
  MdCloud,
  MdVideocam,
  MdMemory,
  MdPublic,
  MdLightbulb,
} from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Alpha Media", icon: "film" },
  { name: "Skyline Group", icon: "building" },
  { name: "Nova Labs", icon: "flask" },
  { name: "Orion Studios", icon: "camera" },
  { name: "Vertex Events", icon: "calendar" },
  { name: "Pulse Digital", icon: "chart" },
  { name: "Echo Partners", icon: "users" },
  { name: "Nimbus Co.", icon: "cloud" },
  { name: "Horizon Film", icon: "video" },
  { name: "Quartz Tech", icon: "cpu" },
  { name: "Aether Co.", icon: "globe" },
  { name: "Lumen Agency", icon: "lightbulb" },
  { name: "Stellar Productions", icon: "film" },
  { name: "Zenith Group", icon: "building" },
  { name: "Fusion Labs", icon: "flask" },
  { name: "Pixel Studios", icon: "camera" },
  { name: "Prime Events", icon: "calendar" },
  { name: "Digital Wave", icon: "chart" },
  { name: "Synergy Partners", icon: "users" },
  { name: "Cloud Nine", icon: "cloud" },
  { name: "Motion Pictures", icon: "video" },
  { name: "Nexus Tech", icon: "cpu" },
  { name: "Global Reach", icon: "globe" },
  { name: "Bright Ideas", icon: "lightbulb" },
  { name: "Apex Media", icon: "film" },
  { name: "Summit Corp", icon: "building" },
  { name: "Innovation Labs", icon: "flask" },
  { name: "Focus Studios", icon: "camera" },
  { name: "Elite Events", icon: "calendar" },
  { name: "Growth Digital", icon: "chart" },
  { name: "Unity Partners", icon: "users" },
  { name: "Sky High Co.", icon: "cloud" },
  { name: "Frame Films", icon: "video" },
  { name: "Logic Tech", icon: "cpu" },
  { name: "World Vision", icon: "globe" },
  { name: "Spark Agency", icon: "lightbulb" },
];

const IconComponent = ({ type, className = "h-5 w-5 md:h-6 md:w-6" }) => {
  const icons = {
    film: MdMovie,
    building: MdBusiness,
    flask: MdScience,
    camera: MdCameraAlt,
    calendar: MdEvent,
    chart: MdTrendingUp,
    users: MdPeople,
    cloud: MdCloud,
    video: MdVideocam,
    cpu: MdMemory,
    globe: MdPublic,
    lightbulb: MdLightbulb,
  };

  const Icon = icons[type] || MdPublic;
  return <Icon className={className} />;
};

const TrustedClients = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const rowsContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const rowsContainer = rowsContainerRef.current;

    if (!section || !header || !rowsContainer) return;

    const rows = rowsContainer.querySelectorAll(".client-row");
    if (rows.length === 0) return;

    // Split clients into rows of 4
    const rowHeight = 80; // Approximate height per row
    const totalRows = Math.ceil(clients.length / 4);

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#trustedclients",
        start: "top top",
        end: `+=${totalRows * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Auto-scroll to next section
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#instantaiconnect");

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

    // Animate rows scrolling up
    timeline.to(
      rowsContainer,
      {
        y: -(rowHeight * (totalRows - 2)), // Scroll through all rows
        ease: "none",
        duration: 1,
      },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Split clients into rows of 4
  const clientRows = [];
  for (let i = 0; i < clients.length; i += 4) {
    clientRows.push(clients.slice(i, i + 4));
  }

  return (
    <section
      ref={sectionRef}
      id="trustedclients"
      className="w-full h-screen flex flex-col items-center justify-center bg-white overflow-hidden relative"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center max-w-2xl mb-8 px-4 z-10">
        <h2 className="font-header font-extrabold text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2 tracking-tight">
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
              className="client-row w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8 py-4 justify-items-center"
              style={{
                filter: "blur(0px)",
              }}
            >
              {row.map((client, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 text-[#111827] opacity-80 hover:opacity-100 transition-opacity duration-200"
                >
                  <span className="text-[#6b7280]">
                    <IconComponent type={client.icon} />
                  </span>
                  <span className="font-text text-xs sm:text-sm md:text-base font-light tracking-wide whitespace-nowrap">
                    {client.name}
                  </span>
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
