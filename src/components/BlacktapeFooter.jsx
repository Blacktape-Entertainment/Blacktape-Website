const BlacktapeFooter = () => {
  return (
    <section
      id="footer"
      className="relative w-full h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="images/Footer Picture.png"
          alt="footer background"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Bottom White Section */}
      <footer className="absolute bottom-0 left-0 bg-white w-full flex flex-col justify-center  items-center rounded-t-[10px] z-10 shadow-lg">
        <div className="w-full max-w-[1400px] md:px-12 py-5 md:pt-16 md:pb-5">
          {/* Branding */}
          <div className="flex flex-col md:flex-row items-center justify-between md:mb-10">
            {/* Blacktape logo */}
            <img
              src="images/Blacktape Footer.png"
              alt="Blacktape Logo"
              className="h-20 md:h-32 lg:h-40 object-contain"
            />

            {/* Circular logo */}
            <img
              src="images/footer-logo.svg"
              alt="Blacktape Emblem"
              className="h-20 md:h-35 lg:h-40 object-contain mt-6 md:mt-0 hidden md:block"
            />
          </div>
          {/* Copyright */}
          <div className="flex-col md:flex-row items-center justify-between gap-2 hidden md:flex">
            <p className="font-text text-gray-400 text-xs text-center md:text-left">
              Copyright © 2022 Blacktape
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-text ">
              <span className="text-gray-400">All Rights Reserved</span>
              <span>|</span>
              <a
                href="#"
                className="hover:text-[#b8a672] underline transition-colors text-gold"
              >
                Terms and Conditions
              </a>
              <span>|</span>
              <a
                href="#"
                className="hover:text-[#b8a672] underline transition-colors text-gold"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default BlacktapeFooter;
