import { useMemo } from "react";
import { createCookie, Outlet } from "react-router";

import { Box, Text } from "@chakra-ui/react";
import { Background } from "@/components/ui/background";

import { ItineraryProvider } from "@/contexts/itinerary.context";

const imageCookie = createCookie("unsplash_image", {
  maxAge: 24 * 60 * 60,
  httpOnly: true,
  secure: true,
  sameSite: "strict",
});
export const loader = async ({ request }: any) => {
  if (typeof process.env.UNSPLASH_ACCESS_KEY === "undefined") {
    throw new Error("Unsplash access key is required but not set.");
  }

  const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=nature&client_id=${UNSPLASH_ACCESS_KEY}`;

  // Parse the existing cookie
  const cookieHeader = request.headers.get("Cookie");
  const imageData = await imageCookie.parse(cookieHeader);

  // Check if the image is less than 1 day old
  if (
    imageData &&
    imageData.imageUrl &&
    new Date().getTime() - new Date(imageData.timestamp).getTime() <
      24 * 60 * 60 * 1000
  ) {
    return { imageUrl: imageData.imageUrl };
  }

  // Fetch a new image from Unsplash
  try {
    const response = await fetch(unsplashUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const data = await response.json();
    const newImageUrl = data.urls.full;

    // Save the new image data in the cookie
    const newImageData = {
      imageUrl: newImageUrl,
      timestamp: new Date().toISOString(),
    };
    const newCookie = await imageCookie.serialize(newImageData);

    return new Response(JSON.stringify({ imageUrl: newImageUrl }), {
      headers: {
        "Set-Cookie": newCookie,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching or saving image:", error);
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
