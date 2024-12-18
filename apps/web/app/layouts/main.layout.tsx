import { useMemo } from "react";
import { Outlet } from "react-router";

import { Box, Text } from "@chakra-ui/react";
import { Background } from "@/components/ui/background";

import { ItineraryProvider } from "@/contexts/itinerary.context";
export const loader = async () => {
  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

  // Récupère une image aléatoire depuis Unsplash avec un mot-clé "nature".
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=nature&client_id=${UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await fetch(unsplashUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const data = await response.json();
    return { imageUrl: data.urls.full };
  } catch {
    return { error: "Failed to fetch image", status: 500 };
  }
};
export default function MainLayout({ loaderData }: any) {
  const imageUrl = useMemo(() => loaderData.imageUrl, []);
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
        <Background imageUrl={imageUrl} />
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
