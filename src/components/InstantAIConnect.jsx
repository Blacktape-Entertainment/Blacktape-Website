import React from "react";
import antenna from "../assets/images/ai-antenna-1.png";

const PhoneMock = () => (
  <div className="relative">
    {/* Antenna pieces */}
    <img src={antenna} alt="antenna" className="h-100" />

    <div className="absolute top-[42%] left-[31%] bg-[#A8B2AA] rounded-sm p-[0.3rem] w-fit scale-[0.38] origin-bottom shadow-sm">
      <p className="text-[0.45rem] text-black font-text mb-[0.2rem]">
        Enter your phone number:
      </p>
      <div className="border-2 border-white rounded-sm px-[0.4rem] py-[0.25rem] bg-transparent">
        <p className="text-[0.4rem] text-[#686a6a] font-text">Phone number *</p>
      </div>
      <button className="bg-[#353938] text-white rounded-sm w-full py-[0.25rem] mt-[0.3rem] text-[0.45rem] font-text">
        REQUEST A CALL
      </button>
    </div>
  </div>
);

const InstantAIConnect = () => {
  return (
    <section className="w-full flex flex-col items-center gap-5 sm:gap-6 md:gap-8 px-4 py-10 bg-white">
      <div className="text-center max-w-4xl">
        <h2 className="font-header font-extrabold text-black leading-tight text-5xl sm:text-6xl md:text-7xl">
          Instant AI Connect
        </h2>
        <p className="font-text text-black font-light text-base sm:text-lg md:text-xl mt-1">
          Request a call, and your personal AI liaison will connect with you
          momentarily.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <PhoneMock />
      </div>
    </section>
  );
};

export default InstantAIConnect;
