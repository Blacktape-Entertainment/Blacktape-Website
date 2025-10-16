import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import img1 from "../assets/images/card1.png";
import img2 from "../assets/images/card2.png";
import img3 from "../assets/images/card3.png";
import img4 from "../assets/images/card4.png";
import img5 from "../assets/images/card5.png";
import img6 from "../assets/images/card6.png";

gsap.registerPlugin(Draggable);

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
  const carouselWrapperRef = useRef(null);
  const carouselRef = useRef(null);

  useLayoutEffect(() => {
    // Only run on mobile
    if (window.innerWidth >= 768) return;

    const wrapper = carouselWrapperRef.current;
    const carousel = carouselRef.current;
    if (!wrapper || !carousel) return;

    const cards = carousel.querySelectorAll(".card-item");
    const cardWidth = 280 + 24;
    const totalWidth = cardWidth * cards.length;
    gsap.set(carousel, { width: totalWidth, position: "relative" }); // ✅ position added

    const maxDrag = -(totalWidth - wrapper.offsetWidth);

    const draggable = Draggable.create(carousel, {
      type: "x",
      bounds: { minX: maxDrag, maxX: 0 },
      edgeResistance: 0.85,
      inertia: true, // ✅ smooth motion
      cursor: "grab",
      activeCursor: "grabbing",
      dragResistance: 0.2,
      throwProps: true, // ✅ ensures momentum
    })[0];

    return () => draggable.kill();
  }, []);

  return (
    <section className="w-full flex flex-col md:flex-row items-center justify-center gap-10 px-4 md:px-10 overflow-hidden select-none">
      {/* Text side */}
      <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-4 text-center md:text-left max-w-md">
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
        {/* Fade edges for mobile */}
        <div className="md:hidden pointer-events-none absolute left-0 top-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="md:hidden pointer-events-none absolute right-0 top-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10" />

        {/* Mobile Carousel */}
        <div ref={carouselWrapperRef} className="md:hidden overflow-hidden">
          <div
            ref={carouselRef}
            className="flex gap-6 px-4 pb-4 will-change-transform"
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="card-item flex-shrink-0 w-[280px] flex flex-col items-center text-center"
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

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 gap-10 w-full max-w-2xl mx-auto">
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
