import { useState, useEffect } from "react";
import WhoAreWeDesktop from "./WhoAreWeDesktop";
import WhoAreWeMobile from "./WhoAreWeMobile";

const WhoAreWe = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <WhoAreWeMobile key="mobile" />
  ) : (
    <WhoAreWeDesktop key="desktop" />
  );
};

export default WhoAreWe;
