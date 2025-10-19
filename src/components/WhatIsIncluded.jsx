import React from "react";
import img1 from "../assets/images/card1.png";
import img2 from "../assets/images/card2.png";
import img3 from "../assets/images/card3.png";
import img4 from "../assets/images/card4.png";
import img5 from "../assets/images/card5.png";
import img6 from "../assets/images/card6.png";

const cards = [
  {
    image: img1,
    title: "All your data in one place",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    image: img2,
    title: "Seamless Collaboration",
    text: "Empower your team with real-time visibility and creative tools.",
  },
  {
    image: img3,
    title: "Smart Performance",
    text: "Track results effortlessly with clear and actionable metrics.",
  },
  {
    image: img4,
    title: "Client Satisfaction",
    text: "Deliver excellence consistently with intuitive planning tools.",
  },
  {
    image: img5,
    title: "Engagement Insights",
    text: "Understand and enhance audience connection through data.",
  },
  {
    image: img6,
    title: "Post-Event Analytics",
    text: "Evaluate every success story with detailed post-event insights.",
  },
];

const WhatIsIncluded = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-start md:items-start justify-center gap-10 overflow-hidden select-none py-20">
      {/* Text side */}
      <div className="flex-1 flex flex-col items-center md:items-start justify-start gap-4 text-center md:text-left max-w-md">
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
        {/* Grid for all screen sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-2xl mx-auto">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="w-full h-[200px] rounded-2xl overflow-hidden mb-3 shadow-lg">
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
    </section>
  );
};

export default WhatIsIncluded;
