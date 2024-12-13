import { TreeShadow } from "@/components/ui/tree-shadow";

import { useIsMobile } from "@/hooks/is-mobile.hook";

export const Background = () => {
  const { isMobile } = useIsMobile();

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
      <div
        style={{
          zIndex: 0,
          position: "fixed",
          width: "100vw",
          height: "100vw",
          ...(isMobile === true && {
            bottom: "-150px",
          }),
          ...(isMobile === false && {
            top: "60px",
          }),
          opacity: isMobile === undefined ? 0 : 0.1,
          transition: "opacity 5s ease-out",
        }}
      >
        <TreeShadow />
      </div>
    </>
  );
};
