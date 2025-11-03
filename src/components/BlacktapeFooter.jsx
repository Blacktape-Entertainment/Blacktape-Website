import { useGSAP } from "@gsap/react";
import { ANIMATION_CONFIG } from "../constants";
import { useMediaQuery } from "react-responsive";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BlacktapeFooter = ({ navbarRef }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  useGSAP(() => {
    // Animate navbar when entering footer section
    if (navbarRef?.current && !isMobile) {
      gsap.to(navbarRef.current, {
        ...ANIMATION_CONFIG.entry,
        y: 0,
        scrollTrigger: {
          trigger: "#footer",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <section
      id="footer"
      className="relative w-full h-[100vh] flex flex-col justify-end overflow-hidden"
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
      <footer
        className="
          absolute bottom-0 left-0 bg-white w-full 
          flex justify-center items-center 
          rounded-t-[10px] z-10 shadow-lg overflow-hidden
          p-2 sm:p-4
        "
      >
        <img
          src="images/Blacktape Footer.png"
          alt="Blacktape Logo"
          className="
            w-full 
            h-15 sm:h-36 md:h-48 lg:h-56 xl:h-64 
            object-cover object-center
            transition-all duration-300
          "
        />
      </footer>
    </section>
  );
};

export default BlacktapeFooter;
