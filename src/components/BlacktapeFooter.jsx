import React from "react";
import footerBg from "/images/Footer Picture.png";
import footerLogo from "/images/footer-logo.svg";
import blacktape from "/images/Blacktape Footer.png";

const BlacktapeFooter = () => {
  return (
    <section id="footer">
      {/* Full Viewport Image Section */}
      <div className="w-full">
        <img
          src={footerBg}
          alt="footer background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer Content */}
      <footer className="w-full flex justify-center bg-white">
        <div className="max-w-[1400px] pt-12 pb-8">
          {/* Top Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-6 lg:gap-x-8 gap-y-8 mb-16">
            {/* Company Description */}
            <div className="lg:col-span-2">
              <p className="font-text text-black text-sm leading-relaxed">
                From cinematic productions to transformative events, we apply
                our commitment to artistry and technical excellence to every
                project.
              </p>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-header text-[#b8a672] text-base font-medium mb-3">
                Products
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    Android App
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    IOS App
                  </a>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-header text-[#b8a672] text-base font-medium mb-3">
                Address
              </h4>
              <p className="font-text text-gray-500 text-sm mb-1">
                22 Lorem Ipsum
              </p>
              <p className="font-text text-gray-500 text-sm mb-6">Egypt</p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-header text-[#b8a672] text-base font-medium mb-3">
                Contact Info
              </h4>
              <p className="font-text text-gray-500 text-sm mb-1 break-words">
                blacktape@bussiness.egy.com
              </p>
              <p className="font-text text-gray-500 text-sm mb-4 break-words">
                +35546789997
              </p>
              <button className="bg-[#b8a672] text-white font-text text-sm px-5 py-2 hover:bg-[#a08f5f] transition-colors whitespace-nowrap">
                Request an AI Call
              </button>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-header text-[#b8a672] text-base font-medium mb-3">
                Support
              </h4>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    Getting started
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    Help center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    Server status
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    Report a bug
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-text text-gray-500 text-sm hover:text-[#b8a672] transition-colors"
                  >
                    Chat support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Logo and Branding */}
          <div className="flex items-center justify-between mb-8">
            {/* Blacktape Logo */}
            <div className="flex-1">
              <img
                src={blacktape}
                alt="Blacktape"
                className="h-24 md:h-32 lg:h-40 w-auto object-contain"
              />
            </div>

            {/* Circular Logo */}
            <div className="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center flex-shrink-0 ml-8">
              <img
                src={footerLogo}
                alt="Blacktape Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <p className="font-text text-gray-400 text-xs">
                Copyright © 2022 Blacktape
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-text text-gray-400">
                  All Rights Reserved
                </span>
                <span className="text-gray-400">|</span>
                <a
                  href="#"
                  className="font-text text-gray-400 hover:text-[#b8a672] transition-colors underline"
                >
                  Terms and Conditions
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="#"
                  className="font-text text-gray-400 hover:text-[#b8a672] transition-colors underline"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default BlacktapeFooter;
