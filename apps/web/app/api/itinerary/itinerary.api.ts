import api from "@/api/helpers/api";
import { GenerateItineraryDto, ItineraryResponse } from "@quentinpiot/dtos";


export const generateItinerary = async (
  itineraryInfos: GenerateItineraryDto,
)=> {
  return api.post<ItineraryResponse>("itinerary/generate", itineraryInfos);
};
