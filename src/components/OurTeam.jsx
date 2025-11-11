import React from "react";
import { useMediaQuery } from "react-responsive";
import { teamMembers } from "../constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const OurTeam = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const sectionRef = React.useRef(null);
  const header1Ref = React.useRef(null);
  const header2Ref = React.useRef(null);
  const middleCardRef = React.useRef(null);
  const leftCardRef = React.useRef(null);
  const rightCardRef = React.useRef(null);
  const whiteBg = React.useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const header2 = header2Ref.current;
      const leftCard = leftCardRef.current;
      const rightCard = rightCardRef.current;
      const whiteBgEl = whiteBg.current;

      if (!isMobile) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            pinSpacing: true,
            markers: true,
            triggerActions: "play reverse play reverse",
          },
        });
        tl.to(whiteBgEl, {
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          right: "0",
          translateX: "0",
          duration: 0.1,
          delay: 0.2,
        });
        tl.to(header2, { opacity: 1, y: 0 });
        tl.to(
          leftCard,
          {
            x: 0,
            right: "none",
            left: "7%",
          },
          "<"
        );
        tl.to(
          rightCard,
          {
            x: 0,
            right: "3%",
          },
          "<"
        );
      } else {
        const middleCard = middleCardRef.current;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=400%",
            pin: true,
            scrub: 1,
            pinSpacing: true,
            triggerActions: "play reverse play reverse",
          },
        });

        // Step 1: Show white background
        tl.to(whiteBgEl, {
          backgroundColor: "white",
          width: "100%",
          height: "100%",
          right: "0",
          top: "0",
          translateX: "0",
          duration: 0.1,
          delay: 0.2,
        });

        // Step 3: Move middle card to center-top
        tl.to(middleCard, {
          top: "18%",
          left: "50%",
          right: "auto",
          x: "-50%",
          y: 0,
          duration: 0.4,
        });

        // Step 4: Move left card below middle
        tl.to(
          leftCard,
          {
            top: "48%",
            left: "50%",
            right: "auto",
            x: "-50%",
            y: 0,
            duration: 0.3,
          },
          "-=0.1"
        );

        // Step 5: Move right card below left
        tl.to(
          rightCard,
          {
            top: "75%",
            left: "50%",
            right: "auto",
            x: "-50%",
            y: 0,
            duration: 0.3,
          },
          "-=0.1"
        );

        // Step 2: Show header at top
        tl.to(header2, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        });
      }
    },
    { scope: sectionRef.current, dependencies: [isMobile] }
  );

  return (
    <div>
      {/* Our Team Section */}
      <section
        ref={sectionRef}
        id="ourteam"
        className="relative h-screen w-full"
      >
        {isMobile ? (
          <>
            <img
              src="images/team-bg-mobile.jpg"
              alt="Team Background Mobile"
              className="w-full h-full object-cover z-0"
            />
            <div
              ref={header1Ref}
              className="absolute p-2 top-0 z-10 flex flex-col w-full items-start gap-1"
            >
              <h1 className="text-white font-header text-3xl">
                Your Vision is the Blueprint.
              </h1>
              <p className="text-gray-300 font-text font-light text-[0.1rem] text-right">
                We believe every great event, film, or album already exists
                within a core idea. Our role is to provide the international
                standards and technical excellence required to breathe life into
                it.
              </p>
              <a
                href="#instantaiconnect"
                className="bg-gold py-2 px-2 font-text text-[0.1rem] self-end"
              >
                Explore Our World
              </a>
            </div>

            <div
              ref={middleCardRef}
              className="z-50 absolute right-[62%] flex flex-col justify-end translate-x-1/2 top-[16%] border-r-5 border-t-8 border-l-5 border-b-8 border-white w-[56%] h-fit"
            >
              <img
                src="images/team-ahmed-mobile.png"
                className="w-full h-full object-contain"
                alt="Ahmed Samir"
              />
              <div className="bg-white bg-opacity-90 p-1 flex flex-col gap-0.5 font-text font-light absolute bottom-2 w-[90%] right-1/2 translate-x-1/2 ">
                <div className="flex gap-1 border-b border-gray-300 pb-0.5">
                  <h3 className="text-[0.5rem]">Ahmed Samir</h3>
                  <p className="text-gray-500 text-[0.5rem]">CEO</p>
                </div>
                <ul className="list-disc list-inside text-gray-500 font-text font-light text-[0.4rem] p-0.5 leading-tight">
                  <li>Guiding the Blacktape Legacy.</li>
                  <li>Architect of Visionary Experiences.</li>
                </ul>
              </div>
            </div>

            <div
              ref={whiteBg}
              className="z-30 absolute right-[62%] top-[16%] translate-x-1/2 bg-transparent w-[56%] h-[28%]"
            ></div>

            <div
              ref={header2Ref}
              className="absolute z-40 opacity-0 inset-0 flex flex-col w-full items-center gap-1 pt-2"
            >
              <h1 className="font-header font-semibold text-3xl ">
                It's Your Turn.
              </h1>
              <p className="font-text font-light text-sm text-center">
                From cinematic productions to transformative events, we apply
                our commitment to artistry and technical excellence to every
                project.
              </p>
              <a
                href="#instantaiconnect"
                className="bg-gold py-2 px-8 font-text"
              >
                Explore Our World
              </a>
            </div>

            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={index === 1 ? rightCardRef : leftCardRef}
                className="absolute z-40 right-[62%] top-[16%] flex flex-col justify-end translate-x-1/2 bottom-10 w-[56%] h-[25%]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover-top"
                />
                <div className=" bg-white bg-opacity-90 p-1 flex flex-col gap-0.5 font-text font-light absolute bottom-2 w-[90%] right-1/2 translate-x-1/2 ">
                  <div className="flex gap-1 border-b border-gray-300 pb-0.5">
                    <h3 className="text-[0.5rem]">{member.name}</h3>
                    <p className="text-gray-500 text-[0.5rem]">
                      {member.position}
                    </p>
                  </div>

                  <ul className="list-disc list-inside text-gray-500 font-text font-light text-[0.4rem] p-0.5 leading-tight">
                    {member.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="w-full z-0">
              <img
                src="images/team-bg.jpg"
                alt="Team Background"
                className="object-cover w-full h-full"
              />
            </div>
            <div
              ref={header1Ref}
              className="absolute left-10 top-20 z-10 flex flex-col items-start gap-3"
            >
              <h1 className="text-white font-header sm:text-6xl ">
                Your Vision is the Blueprint.
              </h1>
              <p className="text-gray-300 font-text font-light sm:text-base max-w-[16rem]">
                We believe every great event, film, or album already exists
                within a core idea. Our role is to provide the international
                standards and technical excellence required to breathe life into
                it.
              </p>
              <a
                href="#instantaiconnect"
                className="bg-gold py-2 px-8 font-text"
              >
                Explore Our World
              </a>
            </div>

            <div
              ref={middleCardRef}
              className="z-50 absolute right-[48%] flex flex-col justify-end translate-x-1/2 bottom-0 border-r-10 border-t-15 border-l-10 border-white w-[34%] h-[70%]"
            >
              <img
                src="images/team-ahmed.jpg"
                className="w-full h-full object-cover"
                alt="Ahmed Samir"
              />
              <div className="bg-white bg-opacity-90 p-3 flex flex-col gap-2 font-text font-light absolute bottom-5 w-[90%] right-1/2 translate-x-1/2">
                <div className="flex gap-2 border-b-2 border-gray-300 pb-2">
                  <h3>Ahmed Samir</h3>
                  <p className="text-gray-500">CEO</p>
                </div>
                <ul className="list-disc list-inside text-gray-500 font-text font-light text-base p-1.5">
                  <li>Guiding the Blacktape Legacy.</li>
                  <li>Architect of Visionary Experiences.</li>
                </ul>
              </div>
            </div>

            {/* right-[48%] translate-x-1/2 */}
            <div
              ref={whiteBg}
              className="z-30 absolute right-[48%] translate-x-1/2 bg-transparent bottom-0 w-[34%] h-[70%]"
            ></div>

            <div
              ref={header2Ref}
              className="absolute z-40 opacity-0 inset-0 flex flex-col w-full items-center gap-2 pt-4"
            >
              <h1 className="font-header font-semibold sm:text-5xl ">
                It's Your Turn.
              </h1>
              <p className="font-text font-light sm:text-base max-w-[25rem] text-center">
                From cinematic productions to transformative events, we apply
                our commitment to artistry and technical excellence to every
                project.
              </p>
              <a
                href="#instantaiconnect"
                className="bg-gold py-2 px-8 font-text"
              >
                Explore Our World
              </a>
            </div>

            {teamMembers.map((member, index) => (
              <div
                key={index}
                ref={index === 1 ? rightCardRef : leftCardRef}
                className="absolute z-40 right-[45%] flex flex-col justify-end translate-x-1/2 bottom-10 w-[25%] h-[50%]"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover-top"
                />
                <div className=" bg-white bg-opacity-90 p-3 flex flex-col gap-2 font-text font-light absolute bottom-5 w-[90%] right-1/2 translate-x-1/2">
                  <div className="flex gap-2 border-b-2 border-gray-300 pb-2">
                    <h3>{member.name}</h3>
                    <p className="text-gray-500">{member.position}</p>
                  </div>

                  <ul className="list-disc list-inside text-gray-500 font-text font-light font-base p-1.5">
                    {member.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default OurTeam;
