import React from "react";
import antenna from "../assets/images/ai-antenna-2.png";

const PhoneMockLarge = () => (
  <div className="relative w-64 sm:w-72 md:w-96 lg:w-[28rem]">
    {/* Antenna pieces */}
    <img src={antenna} alt="antenna" className="w-full h-auto" />

    <div className="absolute top-[21%] left-[22%] bg-[#f5f5f5] rounded-lg p-[0.5rem] w-[59%] h-[17%] origin-bottom shadow-md flex flex-col justify-center gap-1.5">
      {/* Label */}
      <p className="text-[1rem] text-black font-text mb-[0.4rem] tracking-normal">
        Enter your phone number:
      </p>

      {/* Input field */}
      <div className="border border-[#d0d0d0] rounded px-[0.8rem] py-[0.5rem] mb-[0.5rem] bg-white">
        <p className="text-[0.85rem] text-[#9ca3af] font-text">
          Phone number *
        </p>
      </div>

      {/* Button */}
      <button className="bg-[#c3b896] text-[#2d2d2d] rounded-sm w-full py-[0.65rem] text-[0.9rem] font-semibold tracking-wide">
        REQUEST A CALL
      </button>
    </div>
  </div>
);

const InstantAICalls = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12 pl-8 md:pl-12 py-12 bg-white ">
      {/* Left Text */}
      <div className="max-w-md">
        <h3 className="font-header font-extrabold text-black leading-tight text-3xl sm:text-4xl md:text-5xl">
          Instant AI Connect
        </h3>
        <p className="font-text text-black font-light text-sm sm:text-base md:text-lg mt-1">
          Request a call, and your personal AI liaison will connect with you
          momentarily.
        </p>
        <p className="font-text text-black font-light text-xs sm:text-sm md:text-base mt-3">
          In our commitment to providing exceptional and effortless service, we
          invite you to connect with us directly. We understand that your time
          is valuable, which is why we've eliminated hold times and
          complexities. Simply provide your telephone number in the field below.
        </p>
        <p className="font-text text-black font-light text-xs sm:text-sm md:text-base mt-2">
          Prefer the Human touch ?{" "}
          <span className="underline text-[#7c680d]">Press Here</span>
        </p>
      </div>

      {/* Right Phone */}
      <PhoneMockLarge />
    </section>
  );
};

export default InstantAICalls;
