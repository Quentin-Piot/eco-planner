import {
  GenerateItinerariesResponse,
  GenerateItineraryBody,
} from "@quentinpiot/shared";

import api from "@/api/helpers/api";

export const generateItinerary = async (
  itineraryInfos: GenerateItineraryBody,
) => {
  return api.post<GenerateItinerariesResponse>(
    "itinerary/generate",
    itineraryInfos,
  );
};
