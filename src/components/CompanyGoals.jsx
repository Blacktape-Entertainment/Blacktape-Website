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
    desc: "Focusing on the high quality of the final product",
  },
  {
    id: "process",
    icon: bookIcon,
    alt: "book icon",
    title: "Strategic, Scientific, and Meticulous",
    desc: "Focusing on their unique and careful process",
  },
  {
    id: "scope",
    icon: eyeIcon,
    alt: "eye icon",
    title: "Comprehensive, Full-Service, and Visionary",
    desc: "Focusing on their ability to handle everything",
  },
];

const CompanyGoals = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map(({ id, icon, alt, title, desc }) => (
        <div key={id} className="flex flex-col gap-1">
          <h1 className="text-center font-header flex items-center justify-center gap-2">
            <img src={icon} alt={alt} />
            {title}
          </h1>
          <p className="font-text text-black/70">{desc}</p>
        </div>
      ))}
    </section>
  );
};

export default CompanyGoals;
