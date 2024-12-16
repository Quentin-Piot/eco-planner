import { useContext } from "react";

import { ItineraryContext } from "@/contexts/itinerary.context";

export const useItinerary = () => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error("useItinerary must be used within a ItineraryProvider");
  }
  return context;
};
