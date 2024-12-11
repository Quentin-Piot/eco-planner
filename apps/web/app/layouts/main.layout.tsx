import { Outlet } from "react-router";

import { Box, Text } from "@chakra-ui/react";
import { Background } from "@/components/ui/background";

export default function MainLayout() {
  return (
    <Box
      as={"main"}
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
      <Text
        position={"fixed"}
        bottom={2}
        left={2}
        fontSize={"xs"}
        color={"white"}
      >
        {APP_VERSION}
      </Text>
      <Outlet />
    </Box>
  );
}
