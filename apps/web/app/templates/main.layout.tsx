import { PropsWithChildren } from "react";

import { Box, Text } from "@chakra-ui/react";
import { Background } from "@/components/ui/background";

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
      <Background />
      <Text position={"fixed"} bottom={2} left={2} fontSize={"xs"}>
        {APP_VERSION}
      </Text>
      {children}
    </Box>
  );
};

export default App;
