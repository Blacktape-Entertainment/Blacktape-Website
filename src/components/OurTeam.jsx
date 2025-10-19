import React from "react";
import teamBg from "../assets/images/team-bg.jpg";
import leftImage from "../assets/images/left-image-our-team.png";

const OurTeam = () => (
  <section className="w-full relative bg-[#685A51] h-screen">
    <div className="absolute left-0 top-0 h-full flex flex-col items-center md:items-start px-15 py-10 max-w-xl w-full z-10 text-center md:text-left">
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-header font-bold leading-snug text-white mb-0 w-full whitespace-nowrap py-10">
        Your Vision is the Blueprint.
      </h1>
      <p className="text-sm sm:text-base font-light text-[#dddddd] font-text max-w-xs">
        We believe every great event, film, or album already exists within a
        core idea. Our role is to provide the international standards and
        technical excellence required to breathe life into it.
      </p>
      <button className="mt-4 px-6 py-2.5 text-sm sm:text-base text-black bg-gold font-semibold border-gold border-2 hover:bg-[#d6cfab] transition-all duration-300">
        Explore Our World
      </button>
    </div>
    <div className="flex relative h-full">
      <img
        src={leftImage}
        className="flex-none h-full w-auto object-contain"
        alt=""
      />
      <div className="flex-1 relative h-full">
        <img src={teamBg} className="w-full h-full object-cover" alt="" />
        <div className="hidden md:flex flex-col justify-end items-start absolute bottom-[0%] right-[35%] w-[39%] h-2/3 bg-opacity-95 border-10 border-white border-b-0 shadow-2xl p-5 z-20">
          <div className="bg-white p-3 w-full">
            <div className="flex items-center gap-2 font-text text-lg font-light mb-2">
              <span className="text-black">Ahmed Samir</span>
              <span className="text-[#686a6a]">CEO</span>
            </div>
            <div className="w-full h-px bg-[#e0e0e0] my-2" />
            <ul className="list-disc list-inside text-[#686a6a] font-text text-base font-light space-y-1 mt-auto px-2">
              <li>Guiding the Blacktape Legacy.</li>
              <li>Architect of Visionary Experiences.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OurTeam;
