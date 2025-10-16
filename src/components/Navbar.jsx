import React, { forwardRef, useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";

const Navbar = forwardRef((_, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = ["Home", "Who Are We", "Studio", "Work", "Contact"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.querySelector("#home");
      if (!homeSection) return;
      const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
      setIsScrolled(window.scrollY > homeBottom - 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={ref}
      className="fixed top-0 left-0 w-full flex justify-between lg:justify-center px-8 lg:px-12 z-50 gap-3 transition-all duration-700 "
    >
      {/* Logo */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:scale-105 transition-transform duration-300 ${
          isScrolled ? "bg-black" : "bg-navbar"
        }`}
      >
        <img
          src={logo}
          alt="Logo"
          className="w-5 h-5 object-contain opacity-80"
        />
      </div>

      {/* Desktop Menu */}
      <div className="relative hidden lg:flex items-center rounded shadow-md backdrop-blur-sm">
        <div
          className={`absolute inset-0 rounded transition-colors duration-700 ${
            isScrolled ? "bg-black/90" : "bg-navbar"
          }`}
        />
        <ul
          className={`relative flex items-center gap-8 py-2 px-8 font-header text-[15px] tracking-wide z-10 transition-colors duration-500 ${
            isScrolled ? "text-white" : "text-gold"
          }`}
        >
          {navLinks.map((link) => (
            <li
              key={link}
              onClick={() => setActiveLink(link)}
              className={`cursor-pointer transition-all duration-300 ${
                activeLink === link
                  ? "text-navbar-active font-semibold"
                  : isScrolled
                  ? "hover:text-gray-300"
                  : "hover:text-navbar-active/70"
              }`}
            >
              <a href={`#${link.toLowerCase().replace(/\s+/g, "")}`}>{link}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden relative">
        <button
          onClick={toggleMenu}
          className={`flex items-center gap-2 ${
            isScrolled ? "text-black" : "text-white"
          } py-2 px-2 font-header text-xl tracking-wide transition-colors duration-300`}
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

        <div
          className={`absolute right-0 mt-2 w-56 rounded shadow-lg backdrop-blur-sm overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0 scale-100 z-40"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          } ${isScrolled ? "bg-black text-white" : "bg-navbar text-gold"}`}
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
