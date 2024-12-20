import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [height, setHeight] = useState<number | undefined>(undefined);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      handleWindowSizeChange();
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return { isMobile: width ? width <= 768 : undefined, width, height };
};
