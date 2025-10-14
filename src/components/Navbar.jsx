import React, { forwardRef, useState } from "react";
import logo from "../assets/images/logo.svg";

const Navbar = forwardRef((_, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("The Method");

  const navLinks = ["The Method", "Experience", "Studio", "Work", "Contact"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  return (
    <nav
      ref={ref}
      className="fixed top-10 left-0 w-full flex justify-between lg:justify-center px-8 lg:px-12 z-50 gap-3"
    >
      {/* Logo */}
      <div className="flex items-center justify-center w-10 h-10 bg-navbar lg:rounded-full rounded shadow-md border border-navbar hover:scale-105 transition-transform duration-300">
        <img
          src={logo}
          alt="Logo"
          className="w-5 h-5 object-contain opacity-80 "
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center gap-8 bg-navbar text-gold rounded py-2 px-8 shadow-md border border-navbar backdrop-blur-sm font-header text-[15px] tracking-wide">
        {navLinks.map((link) => (
          <li
            key={link}
            onClick={() => setActiveLink(link)}
            className={`relative cursor-pointer transition-all duration-300 ${
              activeLink === link
                ? "text-navbar-active font-semibold"
                : "hover:text-navbar-active/70"
            }`}
          >
            {link}
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <div className="lg:hidden relative">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 text-white py-2 px-2 font-header text-xl tracking-wide transition-colors duration-300"
        >
          Menu
          <span
            className={`transition-transform duration-300 ${
              isMenuOpen ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        {/* Dropdown */}
        <div
          className={`absolute right-0 mt-2 w-56 bg-navbar text-gold rounded shadow-lg border border-navbar backdrop-blur-sm overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0 scale-100 z-40"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <ul className="py-2">
            {navLinks.map((link) => (
              <li
                key={link}
                onClick={() => handleLinkClick(link)}
                className={`px-6 py-3 cursor-pointer whitespace-nowrap transition-all duration-200 font-header text-[15px] tracking-wide ${
                  activeLink === link
                    ? "text-navbar-active font-semibold bg-navbar-active/10"
                    : "hover:text-navbar-active/70 hover:bg-navbar-active/5"
                }`}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
