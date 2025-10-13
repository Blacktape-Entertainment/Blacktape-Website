import React, { forwardRef } from "react";
import logo from "../assets/images/logo.svg";

const Navbar = forwardRef((_, ref) => {
  const navLinks = [
    { name: "The Method", active: true },
    { name: "Experience" },
    { name: "Studio" },
    { name: "Work" },
    { name: "Contact" },
  ];

  return (
    <nav ref={ref} className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3">
        {/* 🦅 Logo */}
        <div className="flex items-center justify-center w-10 h-10 bg-navbar rounded-full shadow-md border border-navbar hover:scale-105 transition-transform duration-300">
          <img
            src={logo}
            alt="Logo"
            className="w-5 h-5 object-contain opacity-80"
          />
        </div>

        {/* 🌿 Navigation */}
        <div className="flex items-center gap-8 bg-navbar text-gold rounded py-2 px-8 shadow-md border border-navbar backdrop-blur-sm">
          <ul className="flex items-center gap-8 font-header text-[15px] tracking-wide">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className={`relative cursor-pointer whitespace-nowrap transition-all duration-300 ${
                  link.active
                    ? "text-navbar-active font-semibold"
                    : "hover:text-navbar-active/70"
                }`}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
