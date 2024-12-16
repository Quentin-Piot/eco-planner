import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Container } from "@chakra-ui/react";
import { GlassCard } from "@/components/ui/glass-card";

import ItineraryDisplay from "@/components/itinerary/simple-itinerary";
import { useItinerary } from "@/hooks/itinerary.hook";

import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: "Itinéraire | Eco Planner",
      description: "Générer un itinéraire avec Eco Planner",
    },
  ];
}

export default function ItineraryPage() {
  const { classicItinerary, originalItinerary } = useItinerary();

  const navigate = useNavigate();

  useEffect(() => {
    if (!classicItinerary || !originalItinerary) {
      navigate("/");
    }
  }, [navigate, classicItinerary, originalItinerary]);

  if (!classicItinerary || !originalItinerary) {
    return;
  }
  return (
    <Container
      width="6xl"
      display={"flex"}
      gap={10}
      height={"100%"}
      flexDirection={{ base: "column", lg: "row" }}
    >
      <GlassCard title={""} footer={""} flex={1}>
        <ItineraryDisplay itinerary={classicItinerary} type={"classic"} />
      </GlassCard>
      <GlassCard title={""} footer={""} flex={1}>
        <ItineraryDisplay itinerary={originalItinerary} type={"original"} />
      </GlassCard>
    </Container>
  );
}
