import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mockup1 from "../assets/images/mockup-1.png";
import mockup2 from "../assets/images/mockup-2.png";
import mockup3 from "../assets/images/mockup-3.png";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    subtitle: "Pitch & Propose",
    title: "From Concept to Contract, All in One Place.",
    description:
      "Move beyond static PDFs and scattered email chains. Our collaborative platform allows you to present your creative concepts through interactive mood boards and dynamic proposals. Clients can easily compare different options side-by-side, whether it's venues, vendors, or design schemes. Transparent, line-item budgets can be reviewed, adjusted, and approved in real-time, ensuring everyone is aligned and confident before moving forward.",
    image: mockup1,
    imageAlt: "Pitch & Propose Mockup",
  },
  {
    subtitle: "Sign & Seal",
    title: "Secure Your Vendors in an Instant.",
    description:
      "Eliminate the paper chase and lock in your top choices without delay. Our integrated system allows for the creation and distribution of legally-binding digital contracts. All parties can review and sign electronically from any device with a single tap. You'll receive instant notifications upon signing, so you can move from agreement to execution in minutes, not days. It's faster, more secure, and completely paperless.",
    image: mockup2,
    imageAlt: "Sign & Seal Mockup",
    reverse: true,
  },
  {
    subtitle: "Track & Tweak",
    title: "Your Event's Live Command Center.",
    description:
      "Maintain a bird's-eye view of every moving part. Our real-time dashboard tracks task progress through shared checklists and dynamic timelines, so you always know what's done and what's next. Collaborate effortlessly by leaving feedback directly on tasks, tagging team members, and attaching relevant files. When plans inevitably change, you can adjust priorities on the fly, ensuring your entire team stays agile and focused on what truly matters.",
    image: mockup3,
    imageAlt: "Track & Tweak Mockup",
  },
];

const DigitalSovereignty = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const row1TextRef = useRef(null);
  const row1ImageRef = useRef(null);
  const row2TextRef = useRef(null);
  const row2ImageRef = useRef(null);
  const row3TextRef = useRef(null);
  const row3ImageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const row1Text = row1TextRef.current;
    const row1Image = row1ImageRef.current;
    const row2Text = row2TextRef.current;
    const row2Image = row2ImageRef.current;
    const row3Text = row3TextRef.current;
    const row3Image = row3ImageRef.current;

    if (
      !section ||
      !header ||
      !row1Text ||
      !row1Image ||
      !row2Text ||
      !row2Image ||
      !row3Text ||
      !row3Image
    )
      return;

    // Initial states
    gsap.set(header, {
      scale: 2.5,
      y: "0vh",
    });

    gsap.set([row1Text, row2Text, row3Text], {
      opacity: 0,
      x: -200,
    });

    gsap.set([row1Image, row2Image, row3Image], {
      opacity: 0,
      x: 200,
    });

    let hasScrolled = false;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#digitalsovereignty",
        start: "top top",
        end: "+=600%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Auto-scroll to next section
          if (progress >= 0.99 && self.direction === 1 && !hasScrolled) {
            hasScrolled = true;
            const nextSection = document.querySelector("#trustedclients");

            if (nextSection) {
              setTimeout(() => {
                const targetY =
                  nextSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: targetY, behavior: "smooth" });
              }, 300);
            }
          }

          if (progress < 0.99) {
            hasScrolled = false;
          }
        },
      },
    });

    // Phase 1: Header shrinks and moves (0-15%)
    timeline.to(
      header,
      {
        scale: 1,
        y: "-35vh",
        ease: "power2.out",
        duration: 0.15,
      },
      0
    );

    // Phase 2: Row 1 appears (15-30%)
    timeline.to(
      row1Text,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.15,
      },
      0.15
    );

    timeline.to(
      row1Image,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.15,
      },
      0.15
    );

    // Phase 3: Row 1 disappears (30-40%)
    timeline.to(
      row1Text,
      {
        opacity: 0,
        x: -200,
        ease: "power2.in",
        duration: 0.1,
      },
      0.3
    );

    timeline.to(
      row1Image,
      {
        opacity: 0,
        x: 200,
        ease: "power2.in",
        duration: 0.1,
      },
      0.3
    );

    // Phase 4: Row 2 appears (40-55%)
    timeline.to(
      row2Text,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.15,
      },
      0.4
    );

    timeline.to(
      row2Image,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.15,
      },
      0.4
    );

    // Phase 5: Row 2 disappears (55-65%)
    timeline.to(
      row2Text,
      {
        opacity: 0,
        x: -200,
        ease: "power2.in",
        duration: 0.1,
      },
      0.55
    );

    timeline.to(
      row2Image,
      {
        opacity: 0,
        x: 200,
        ease: "power2.in",
        duration: 0.1,
      },
      0.55
    );

    // Phase 6: Row 3 appears (65-80%)
    timeline.to(
      row3Text,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.15,
      },
      0.65
    );

    timeline.to(
      row3Image,
      {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        duration: 0.15,
      },
      0.65
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      id="digitalsovereignty"
      className="w-full bg-white h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Header - starts large, then shrinks */}
      <div ref={headerRef} className="absolute text-center max-w-3xl px-4 z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-header font-bold text-black leading-tight mb-1">
          Digital Sovereignty
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-light text-black font-text">
          All at once, all in one, all in between your hands
        </p>
      </div>

      {/* Row 1: Pitch & Propose */}
      <div className="absolute w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="w-full flex flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-7xl">
          <div
            ref={row1TextRef}
            className="flex-1 flex flex-col gap-2 md:gap-3 max-w-lg"
          >
            <div className="flex flex-col items-start">
              <p className="text-[10px] md:text-xs font-text font-light text-[#030706] mb-0.5">
                {sections[0].subtitle}
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-header font-bold text-black leading-tight mb-1 md:mb-2">
                {sections[0].title}
              </h2>
              <p className="text-[10px] md:text-xs lg:text-sm font-text font-light text-[#686a6a] leading-relaxed line-clamp-6">
                {sections[0].description}
              </p>
            </div>
            <button className="px-4 md:px-6 lg:px-8 py-1 md:py-1.5 text-[10px] md:text-xs text-[#f6f6f6] bg-[#9a9c9b] font-semibold hover:bg-[#858785] transition-all duration-300 self-start">
              App Coming Soon
            </button>
          </div>
          <div
            ref={row1ImageRef}
            className="flex-1 flex items-center justify-center"
          >
            <img
              src={sections[0].image}
              alt={sections[0].imageAlt}
              className="w-full h-auto object-contain max-w-lg max-h-[70vh]"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Sign & Seal */}
      <div className="absolute w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="w-full flex flex-row-reverse items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-7xl">
          <div
            ref={row2TextRef}
            className="flex-1 flex flex-col gap-2 md:gap-3 max-w-lg"
          >
            <div className="flex flex-col items-start">
              <p className="text-[10px] md:text-xs font-text font-light text-[#030706] mb-0.5">
                {sections[1].subtitle}
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-header font-bold text-black leading-tight mb-1 md:mb-2">
                {sections[1].title}
              </h2>
              <p className="text-[10px] md:text-xs lg:text-sm font-text font-light text-[#686a6a] leading-relaxed line-clamp-6">
                {sections[1].description}
              </p>
            </div>
            <button className="px-4 md:px-6 lg:px-8 py-1 md:py-1.5 text-[10px] md:text-xs text-[#f6f6f6] bg-[#9a9c9b] font-semibold hover:bg-[#858785] transition-all duration-300 self-start">
              App Coming Soon
            </button>
          </div>
          <div
            ref={row2ImageRef}
            className="flex-1 flex items-center justify-center"
          >
            <img
              src={sections[1].image}
              alt={sections[1].imageAlt}
              className="w-full h-auto object-contain max-w-lg max-h-[70vh]"
            />
          </div>
        </div>
      </div>

      {/* Row 3: Track & Tweak */}
      <div className="absolute w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="w-full flex flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 max-w-7xl">
          <div
            ref={row3TextRef}
            className="flex-1 flex flex-col gap-2 md:gap-3 max-w-lg"
          >
            <div className="flex flex-col items-start">
              <p className="text-[10px] md:text-xs font-text font-light text-[#030706] mb-0.5">
                {sections[2].subtitle}
              </p>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-header font-bold text-black leading-tight mb-1 md:mb-2">
                {sections[2].title}
              </h2>
              <p className="text-[10px] md:text-xs lg:text-sm font-text font-light text-[#686a6a] leading-relaxed line-clamp-6">
                {sections[2].description}
              </p>
            </div>
            <button className="px-4 md:px-6 lg:px-8 py-1 md:py-1.5 text-[10px] md:text-xs text-[#f6f6f6] bg-[#9a9c9b] font-semibold hover:bg-[#858785] transition-all duration-300 self-start">
              App Coming Soon
            </button>
          </div>
          <div
            ref={row3ImageRef}
            className="flex-1 flex items-center justify-center"
          >
            <img
              src={sections[2].image}
              alt={sections[2].imageAlt}
              className="w-full h-auto object-contain max-w-lg max-h-[70vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSovereignty;
