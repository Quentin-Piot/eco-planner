export const Background = ({ imageUrl }: any) => {
  return (
    <>
      <div
        style={{
          zIndex: -2,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(to right, #868f96 0%, #596164 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      />
    </>
  );
};
