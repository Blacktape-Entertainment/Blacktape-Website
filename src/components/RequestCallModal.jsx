import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const RequestCallModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    if (!isOpen || !modalRef.current || !contentRef.current) return;

    // Set initial state
    gsap.set(contentRef.current, { x: "100%", opacity: 0 });
    gsap.set(modalRef.current, { opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline();

    // Fade in backdrop
    tl.to(modalRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Slide in modal content from right
    tl.to(
      contentRef.current,
      {
        x: "0%",
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
      "-=0.1"
    );
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
          aria-label="Close modal"
        >
          <img
            src="images/x-image.png"
            alt="Clutch mechanism"
            className="w-20 h-20 object-contain max-w-sm"
          />
        </button>

        {/* Modal content - split layout */}
        <div className="flex flex-col md:flex-row">
          {/* Left side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-10">
            <h3 className="font-header font-bold text-2xl md:text-3xl text-black mb-2">
              Why the wait ..
            </h3>
            <h2 className="font-header font-bold text-3xl md:text-4xl text-[#B8A668] mb-6">
              PRESS THE CLUTCH
            </h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name *"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-[#B8A668] focus:outline-none font-text text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-[#B8A668] focus:outline-none font-text text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone number"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-[#B8A668] focus:outline-none font-text text-sm"
                />
              </div>

              <div>
                <label htmlFor="source" className="sr-only">
                  How did you find us?
                </label>
                <select
                  id="source"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-[#B8A668] focus:outline-none font-text text-sm text-gray-600"
                >
                  <option value="">How did you find us?</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-6 py-3 bg-[#B8A668] text-white font-semibold text-sm tracking-wide hover:bg-[#a89659] transition-all duration-300"
              >
                SEND
              </button>
            </form>
          </div>

          {/* Right side - Image */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-10">
            <img
              src="images/modal.png"
              alt="Clutch mechanism"
              className="w-full h-full object-contain max-w-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCallModal;
