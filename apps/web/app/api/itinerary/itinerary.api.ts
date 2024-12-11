import { GenerateItineraryDto, ItineraryResponse } from "@quentinpiot/dtos";

import api from "@/api/helpers/api";

export const generateItinerary = async (
  itineraryInfos: GenerateItineraryDto,
) => {
  return api.post<ItineraryResponse>("itinerary/generate", itineraryInfos);
};
