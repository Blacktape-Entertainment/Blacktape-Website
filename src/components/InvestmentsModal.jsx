import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const InvestmentsModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll
      document.body.style.overflow = "hidden";

      // Animate modal entrance
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
    } else {
      // Re-enable body scroll when modal closes
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    // Animate modal exit
    gsap.to(modalRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
      onClick={handleClose}
      style={{ pointerEvents: "auto", zIndex: 100 }}
    >
      <div
        ref={modalRef}
        className="bg-[#EEF0EE] rounded-lg relative p-2 sm:p-3 md:p-4 shadow-lg 
                   w-full sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[60%]
                   max-h-[95vh] overflow-y-auto
                   flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="images/modal-know-more.png"
          alt="Know More"
          className="w-full md:w-[40%] max-h-[30vh] md:max-h-full object-cover rounded hidden md:block"
        />

        <div className="flex flex-col flex-1 items-start p-2 sm:p-3 md:p-4 gap-3 sm:gap-4">
          <div className="flex justify-between items-center w-full">
            <img
              src="images/Logo3.svg"
              alt=""
              className="w-24 sm:w-32 md:w-40 lg:w-44 h-auto"
            />
            <img
              src="images/x-image.png"
              alt="Close"
              className="w-8 sm:w-10 md:w-12 lg:w-16 h-auto cursor-pointer hover:opacity-70 transition-opacity"
              onClick={handleClose}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="list-disc pl-4 font-text text-xs sm:text-sm md:text-base text-black/70 leading-relaxed flex flex-col gap-2 sm:gap-2.5 md:gap-3">
              <li>The financial backbone and growth arm of BlackTape.</li>
              <li>
                Focuses on culture-forward startups, real estate, creative
                talent, and technology ventures
              </li>
              <li>
                Ensures long-term expansion of the BlackTape ecosystem beyond
                projects.
              </li>
              <li>
                Builds partnerships that align with our vision of sustainable
                cultural legacy.
              </li>
              <li>Every investment becomes part of the creative dynasty</li>
            </ul>
          </div>

          <a
            className="w-full py-2 sm:py-2.5 md:py-3 bg-gold hover:bg-gold/90 text-white font-text 
                       text-xs sm:text-sm md:text-base text-center tracking-widest 
                       transition-all duration-300 cursor-pointer"
            href="#instantaiconnect"
            onClick={handleClose}
          >
            REQUEST AN AI CALL
          </a>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsModal;
