import { Box, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";


const Gradient = () => (
  <Box
    position="absolute"
    width="100vw"
    height="100vw"
    filter="blur(calc(70vw / 5))"
    backgroundImage="linear-gradient(120deg, #196f3d 0%, #95d8b1 60%)"
    animation="rotate 50s alternate infinite"
    borderRadius="10% 10% 10% 10% / 10% 10% 10% 10%"

  />);

const App = ({ children }: PropsWithChildren) => {
  return (
    <Box
      w="100vw"
      h="100vh"
      display={"flex"}
      justifyContent={"center"}
      bgColor={"#ffffff"}
      alignItems={"center"}
      position={"relative"}
      overflow="hidden"
    >
      <Gradient />
      <Text position={"fixed"} bottom={2} left={2} fontSize={"xs"}>
        {APP_VERSION}
      </Text>
      {children}
    </Box>
  );
};

export default App;
