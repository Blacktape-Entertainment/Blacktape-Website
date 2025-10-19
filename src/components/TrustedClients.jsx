import React from "react";

const clients = [
  "Alpha Media",
  "Skyline Group",
  "Nova Labs",
  "Orion Studios",
  "Vertex Events",
  "Pulse Digital",
  "Echo Partners",
  "Nimbus Co.",
  "Horizon Film",
  "Quartz Tech",
  "Aether Co.",
  "Lumen Agency",
];

const TrustedIcon = ({ className = "h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

const TrustedClients = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 bg-white">
      <div className="text-center max-w-2xl mb-6 md:mb-8">
        <h2 className="font-header font-extrabold text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2 tracking-tight">
          Trusted Clients
        </h2>
        <p className="font-text text-xs sm:text-sm md:text-base text-black font-light">
          All at once, all in one, all in between your hands
        </p>
      </div>
      <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-2 md:px-8 justify-items-center">
        {clients.map((name, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 text-[#111827] opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            <span className="text-[#6b7280]">
              <TrustedIcon />
            </span>
            <span className="font-text text-xs sm:text-sm md:text-base font-light tracking-wide whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedClients;
