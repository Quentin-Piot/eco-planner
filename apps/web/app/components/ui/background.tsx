import { useEffect, useState } from "react";

import { TreeShadow } from "@/components/ui/tree-shadow";

export const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        style={{
          zIndex: 0,
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundImage: "linear-gradient(180deg, #196f3d 0%, #95d8b1 60%)",
        }}
      />

      {!isMobile && (
        <div
          style={{
            zIndex: 0,
            position: "fixed",
            width: "100vw",
            height: "100vw",
            top: "100px",
            opacity: 0.5,
          }}
        >
          <TreeShadow />
        </div>
      )}
    </>
  );
};
