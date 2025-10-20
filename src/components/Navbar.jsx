import React, { forwardRef, useState, useEffect } from "react";
import logo from "../assets/images/logo.svg";

const Navbar = forwardRef((props, ref) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Home", id: "hero-wrapper" },
    { name: "About", id: "whoarewe-wrapper" },
    { name: "Services", id: "devicesmockups" },
    { name: "Team", id: "ourteam" },
    { name: "Contact", id: "footer" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector("#hero-wrapper");

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        setIsScrolled(heroRect.bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      const targetY = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={ref}
      className="w-full flex justify-between lg:justify-center px-8 lg:px-12 gap-3"
    >
      {/* Logo */}
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:scale-105 transition-all duration-300 ${
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
            isScrolled ? "bg-black" : "bg-navbar"
          }`}
        />
        <ul
          className={`relative flex items-center gap-8 py-2 px-8 font-header text-[15px] tracking-wide z-10 transition-colors duration-500 ${
            isScrolled ? "text-white" : "text-gold"
          }`}
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              onClick={() => {
                setActiveLink(link.name);
                scrollToSection(link.id);
              }}
              className={`cursor-pointer transition-all duration-300 ${
                activeLink === link.name
                  ? "text-navbar-active font-semibold"
                  : "hover:text-navbar-active/70"
              }`}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden relative">
        <button
          onClick={toggleMenu}
          className={`flex items-center gap-2 py-2 px-2 font-header text-xl tracking-wide transition-colors duration-300 ${
            isScrolled ? "text-white" : "text-white"
          }`}
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
            isScrolled ? "bg-black text-white" : "bg-navbar text-gold"
          } ${
            isMenuOpen
              ? "opacity-100 translate-y-0 scale-100 z-40"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
        >
          <ul className="py-2">
            {navLinks.map((link) => (
              <li
                key={link.name}
                onClick={() => {
                  handleLinkClick(link.name);
                  scrollToSection(link.id);
                }}
                className={`px-6 py-3 cursor-pointer whitespace-nowrap transition-all duration-200 font-header text-[15px] tracking-wide ${
                  activeLink === link.name
                    ? "text-navbar-active font-semibold bg-navbar-active/10"
                    : "hover:text-navbar-active/70 hover:bg-navbar-active/5"
                }`}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
