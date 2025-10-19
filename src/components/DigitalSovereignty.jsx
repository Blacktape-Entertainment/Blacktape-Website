import React from "react";
import mockup1 from "../assets/images/mockup-1.png";
import mockup2 from "../assets/images/mockup-2.png";
import mockup3 from "../assets/images/mockup-3.png";

const sections = [
  {
    subtitle: "Pitch & Propose",
    title: "From Concept to Contract, All in One Place.",
    description:
      "Move beyond static PDFs and scattered email chains. Our collaborative platform allows you to present your creative concepts through interactive mood boards and dynamic proposals. Clients can easily compare different options side-by-side, whether it's venues, vendors, or design schemes. Transparent, line-item budgets can be reviewed, adjusted, and approved in real-time, ensuring everyone is aligned and confident before moving forward.",
    image: mockup1,
    imageAlt: "Pitch & Propose Mockup",
  },
  {
    subtitle: "Sign & Seal",
    title: "Secure Your Vendors in an Instant.",
    description:
      "Eliminate the paper chase and lock in your top choices without delay. Our integrated system allows for the creation and distribution of legally-binding digital contracts. All parties can review and sign electronically from any device with a single tap. You'll receive instant notifications upon signing, so you can move from agreement to execution in minutes, not days. It's faster, more secure, and completely paperless.",
    image: mockup2,
    imageAlt: "Sign & Seal Mockup",
    reverse: true,
  },
  {
    subtitle: "Track & Tweak",
    title: "Your Event's Live Command Center.",
    description:
      "Maintain a bird's-eye view of every moving part. Our real-time dashboard tracks task progress through shared checklists and dynamic timelines, so you always know what's done and what's next. Collaborate effortlessly by leaving feedback directly on tasks, tagging team members, and attaching relevant files. When plans inevitably change, you can adjust priorities on the fly, ensuring your entire team stays agile and focused on what truly matters.",
    image: mockup3,
    imageAlt: "Track & Tweak Mockup",
  },
];

const DigitalSovereignty = () => {
  return (
    <div className="w-full bg-white">
      {/* Main Title Section */}
      <section className="w-full flex flex-col items-center justify-center px-4 pt-5">
        <div className="text-center max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold text-black leading-tight mb-1">
            Digital Sovereignty
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-light text-black font-text">
            All at once, all in one, all in between your hands
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          className="w-full min-h-screen flex items-center justify-center pb-8 md:pb-12 lg:pb-16"
        >
          <div
            className={`w-full flex flex-col ${
              section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center gap-0`}
          >
            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-4 max-w-lg px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24">
              <div className="flex flex-col items-start">
                <p className="text-xs md:text-sm font-text font-light text-[#030706] mb-1">
                  {section.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-header font-bold text-black leading-tight mb-2">
                  {section.title}
                </h2>
                <p className="text-xs md:text-sm font-text font-light text-[#686a6a] leading-relaxed">
                  {section.description}
                </p>
              </div>
              <button className="px-5 md:px-7 lg:px-12 py-1.5 md:py-3 text-xs sm:text-sm text-[#f6f6f6] bg-[#9a9c9b] font-semibold hover:bg-[#858785] transition-all duration-300  self-start">
                App Coming Soon
              </button>
            </div>

            {/* Image Content */}
            <div className="flex-1 flex items-center justify-end max-w-none h-full px-0">
              <img
                src={section.image}
                alt={section.imageAlt}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default DigitalSovereignty;
