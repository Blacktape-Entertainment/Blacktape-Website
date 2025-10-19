import React from "react";
import bookIcon from "../assets/images/Book Icon.svg";
import eyeIcon from "../assets/images/Eye Icon.svg";
import statusIcon from "../assets/images/Statue Icon.svg";

const items = [
  {
    id: "quality",
    icon: statusIcon,
    alt: "status icon",
    title: "Excellence, Artistry, and Impact",
    desc: "Focusing on the high quality of the final product.",
  },
  {
    id: "process",
    icon: bookIcon,
    alt: "book icon",
    title: "Strategic, Scientific, and Meticulous",
    desc: "Focusing on their unique and careful process.",
  },
  {
    id: "scope",
    icon: eyeIcon,
    alt: "eye icon",
    title: "Comprehensive, Full-Service, and Visionary",
    desc: "Focusing on their ability to handle everything.",
  },
];

const CompanyGoals = () => {
  return (
    <section className="w-full flex sm:flex-row items-center justify-between gap-6">
      {items.map(({ id, icon, alt, title, desc }) => (
        <div
          key={id}
          className="flex flex-col items-center justify-center flex-1 text-center gap-4"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4">
            <img
              src={icon}
              alt={alt}
              className="w-5 h-5  md:w-3 md:h-3 object-contain"
            />
            <h1 className="font-header font-semibold text-base leading-snug text-center lg:text-left">
              {title}
            </h1>
          </div>
          <p className="font-text text-base text-black/70 max-w-[80%] sm:max-w-none leading-relaxed">
            {desc}
          </p>
        </div>
      ))}
    </section>
  );
};

export default CompanyGoals;
