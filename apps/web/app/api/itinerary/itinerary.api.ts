import { GenerateItineraryBody, ItineraryResponse } from "@quentinpiot/shared";

import api from "@/api/helpers/api";

export const generateItinerary = async (
  itineraryInfos: GenerateItineraryBody,
) => {
  return api.post<ItineraryResponse>("itinerary/generate", itineraryInfos);
};
