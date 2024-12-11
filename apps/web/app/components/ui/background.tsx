import { Box } from "@chakra-ui/react";

export const Background = () => (
  <Box
    position="absolute"
    width="100vw"
    height="100vw"
    filter="blur(calc(70vw / 5))"
    backgroundImage="linear-gradient(120deg, #196f3d 0%, #95d8b1 60%)"
    animation="rotate 50s alternate infinite"
    borderRadius="10% 10% 10% 10% / 10% 10% 10% 10%"
  />
);
