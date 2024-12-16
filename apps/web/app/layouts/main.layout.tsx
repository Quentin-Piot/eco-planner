import { Outlet } from "react-router";

import { Box, Text } from "@chakra-ui/react";
import { Background } from "@/components/ui/background";

import { ItineraryProvider } from "@/contexts/itinerary.context";

export default function MainLayout() {
  return (
    <ItineraryProvider>
      <Box
        as={"main"}
        w="100vw"
        h="100vh"
        position={"relative"}
        overflowX="hidden"
      >
        <Box
          width={"100%"}
          minHeight={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          py={10}
        >
          <Outlet />
        </Box>
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
      </Box>
    </ItineraryProvider>
  );
}
