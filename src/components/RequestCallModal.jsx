import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Toast from "./Toast";

const CDN_BASE =
  "https://cdn.jsdelivr.net/gh/Blacktape-Entertainment/Blacktape-Website@main/public";

const RequestCallModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

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

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", phone: "", source: "" });
      setErrors({});
      setToast({ show: false, type: "", message: "" });
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation (required)
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone validation (required)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation (optional but must be valid if provided)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setToast({ show: false, type: "", message: "" });

    try {
      // Example API endpoint - replace with your actual API
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setToast({
          show: true,
          type: "success",
          message: "Thank you! We'll contact you soon.",
        });
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", source: "" });
        }, 2000);
      } else {
        setToast({
          show: true,
          type: "error",
          message: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setToast({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        className="relative bg-white w-full max-w-[1000px] h-auto max-h-[95vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 w-15 h-15 md:w-20 md:h-20 lg:w-25 lg:h-25 flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
          aria-label="Close modal"
        >
          <img
            src={`${CDN_BASE}/images/x-image.png`}
            alt="Close"
            className="w-full h-full object-contain"
          />
        </button>

        {/* FORM SECTION */}
        <div className="relative flex items-center justify-start p-4 sm:p-6 md:p-8 lg:p-12 xl:p-15 flex-1">
          {/* FORM CONTENT */}
          <div className="relative w-full z-10">
            <h3 className="font-header text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[#3a3a3a] mb-1 sm:mb-2 tracking-wide">
              Why the wait ..
            </h3>
            <h2 className="font-header font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#B8A066] leading-[1.1] mb-3 sm:mb-4 md:mb-6 tracking-wide">
              PRESS THE CLUTCH
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-2 sm:space-y-3 md:space-y-4"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name *"
                  className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-xs sm:text-sm md:text-base text-[#888888] placeholder:text-[#b8b8b8] bg-transparent py-1.5 sm:py-2"
                />
                {errors.name && (
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-xs sm:text-sm md:text-base text-[#888888] placeholder:text-[#b8b8b8] bg-transparent py-1.5 sm:py-2"
                />
                {errors.email && (
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number *"
                  className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-xs sm:text-sm md:text-base text-[#888888] placeholder:text-[#b8b8b8] bg-transparent py-1.5 sm:py-2"
                />
                {errors.phone && (
                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="relative">
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full border-b border-[#d4d4d4] focus:border-[#B8A066] focus:outline-none text-xs sm:text-sm md:text-base text-[#888888] bg-transparent py-1.5 sm:py-2 appearance-none cursor-pointer"
                >
                  <option value="">How did you find us?</option>
                  <option value="search">Search Engine</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Referral</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#888888]">
                  <svg
                    className="fill-current h-3 w-3 sm:h-4 sm:w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 sm:mt-4 md:mt-5 py-2 sm:py-2.5 md:py-3 bg-[#B8A066] text-white font-semibold text-[10px] sm:text-xs md:text-sm tracking-widest hover:bg-[#a89159] disabled:bg-[#d4c9a8] disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    SENDING...
                  </span>
                ) : (
                  "SEND"
                )}
              </button>
            </form>
          </div>

          {/* IMAGE ON TOP RIGHT */}
          <img
            src={`${CDN_BASE}/images/modal.png`}
            alt="Clutch mechanism"
            className="hidden lg:block absolute z-50 bottom-0 right-0 w-[40%] xl:w-[45%] max-w-[420px] xl:max-w-[480px] object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.show}
        onClose={() => setToast({ show: false, type: "", message: "" })}
      />
    </div>
  );
};

export default RequestCallModal;
