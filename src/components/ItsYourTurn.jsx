import React from "react";
import teamAmmar from "../assets/images/team-ammar.jpg";
import teamAhmed from "../assets/images/team-ahmed.jpg";
import teamMohammed from "../assets/images/team-mohammed.jpg";

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
  return (
    <section className="w-full bg-white h-screen flex flex-col justify-center items-center relative">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center gap-2 md:gap-3 mb-5 md:mb-6 px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold text-black leading-tight mb-2">
            It's Your Turn.
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-light text-black font-text mb-2 md:mb-3">
            From cinematic productions to transformative events, we apply our
            commitment to artistry and technical excellence to every project.
          </p>
        </div>
        <button className="px-5 md:px-7 lg:px-9 py-1.5 md:py-2 text-xs sm:text-sm text-black bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300 rounded">
          Explore Our World
        </button>
      </div>

      {/* Team Cards Section */}
      <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-4 px-4">
        {teamMembers.map((member, index) => (
          <div
            key={index}
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
        ))}
      </div>
    </section>
  );
};

export default ItsYourTurn;
