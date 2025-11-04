import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const RequestCallModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useGSAP(() => {
    if (!isOpen || !modalRef.current || !contentRef.current) return;

    gsap.set(contentRef.current, { x: "100%", opacity: 0 });
    gsap.set(modalRef.current, { opacity: 0 });

    const tl = gsap.timeline();
    tl.to(modalRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
    tl.to(
      contentRef.current,
      { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.1"
    );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 md:p-6"
      onClick={onClose}
      style={{ pointerEvents: "auto", zIndex: 100 }}
    >
      <div
        ref={contentRef}
        className="relative bg-white w-full max-w-[1100px] h-auto max-h-[95vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-15 h-15 md:w-20 md:h-20 lg:w-25 lg:h-25 flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <img
            src="images/x-image.png"
            alt="Close"
            className="w-full h-full object-contain"
          />
        </button>

        {/* FORM SECTION */}
        <div className="relative flex items-center p-15">
          {/* FORM CONTENT */}
          <div className="relative w-[70%] z-10">
            <h3 className="font-header text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#3a3a3a] mb-2 tracking-wide">
              Why the wait ..
            </h3>
            <h2 className="font-header font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#B8A066] leading-[1.1] mb-8 tracking-wide">
              PRESS THE CLUTCH
            </h2>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name *"
                className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-base text-[#888888] placeholder:text-[#b8b8b8] bg-transparent py-2"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-base text-[#888888] placeholder:text-[#b8b8b8] bg-transparent py-2"
              />
              <input
                type="tel"
                placeholder="Phone number *"
                className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-base text-[#888888] placeholder:text-[#b8b8b8] bg-transparent py-2"
                required
              />

              <div className="relative">
                <select className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-base text-[#888888] bg-transparent py-2 appearance-none cursor-pointer">
                  <option value="">How did you find us?</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#888888]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3 bg-[#B8A066] text-white font-semibold text-sm tracking-widest hover:bg-[#a89159] transition-all duration-300"
              >
                SEND
              </button>
            </form>
          </div>

          {/* IMAGE ON TOP RIGHT */}
          <img
            src="images/modal.png"
            alt="Clutch mechanism"
            className="hidden md:block absolute z-50 bottom-0 right-0 w-[45%] max-w-[480px] object-contain pointer-events-none "
          />
        </div>
      </div>
    </div>
  );
};

export default RequestCallModal;
