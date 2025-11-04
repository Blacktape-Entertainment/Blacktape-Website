import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Toast = ({ type, message, isVisible, onClose }) => {
  const toastRef = useRef(null);
  const iconRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!toastRef.current) return;

    if (isVisible) {
      // Animate toast in from top with bounce
      gsap.fromTo(
        toastRef.current,
        {
          y: -150,
          opacity: 0,
          scale: 0.8,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.6,
          ease: "back.out(2)",
        }
      );

      // Animate icon with rotation and scale
      gsap.fromTo(
        iconRef.current,
        {
          scale: 0,
          rotate: -180,
        },
        {
          scale: 1,
          rotate: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Progress bar animation
      gsap.fromTo(
        progressRef.current,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 4,
          ease: "none",
        }
      );

      // Auto hide after 4 seconds
      const timer = setTimeout(() => {
        gsap.to(toastRef.current, {
          y: -150,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (onClose) onClose();
          },
        });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10000] w-[90%] max-w-lg perspective-1000">
      <div
        ref={toastRef}
        className={`relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-md border-2 ${
          isSuccess
            ? "bg-gradient-to-br from-gold/95 to-navbar-active/95 border-gold"
            : "bg-gradient-to-br from-blacktape/95 to-olive/95 border-olive"
        }`}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className={`absolute top-0 left-0 h-1 origin-left ${
            isSuccess ? "bg-navbar-active" : "bg-gold"
          }`}
          style={{ width: "100%" }}
        />

        <div className="p-5 flex items-center gap-4">
          <div
            ref={iconRef}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              isSuccess
                ? "bg-navbar-active/30 ring-2 ring-navbar-active"
                : "bg-gold/30 ring-2 ring-gold"
            }`}
          >
            {isSuccess ? (
              <svg
                className="w-7 h-7 text-blacktape"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-7 h-7 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h4
              className={`font-header font-bold text-base md:text-lg tracking-wide ${
                isSuccess ? "text-blacktape" : "text-gold"
              }`}
            >
              {isSuccess ? "Perfect!" : "Hold On!"}
            </h4>
            <p
              className={`font-text text-sm md:text-base mt-0.5 ${
                isSuccess ? "text-blacktape/80" : "text-navbar/90"
              }`}
            >
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              gsap.to(toastRef.current, {
                y: -150,
                opacity: 0,
                scale: 0.8,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                  if (onClose) onClose();
                },
              });
            }}
            className={`flex-shrink-0 p-2 rounded-full transition-all duration-300 ${
              isSuccess
                ? "hover:bg-blacktape/20 text-blacktape"
                : "hover:bg-gold/20 text-gold"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Decorative gradient overlay */}
        <div
          className={`absolute inset-0 pointer-events-none opacity-20 ${
            isSuccess
              ? "bg-gradient-to-tr from-transparent via-white to-transparent"
              : "bg-gradient-to-tr from-transparent via-gold/30 to-transparent"
          }`}
        />
      </div>
    </div>
  );
};

export default Toast;
