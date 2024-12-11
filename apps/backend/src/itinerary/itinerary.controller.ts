import { Body, Controller, Post } from "@nestjs/common";
import { GenerateItineraryDto } from "@quentinpiot/dtos";
import { GetJourneysDetailsDto } from "@quentinpiot/dtos/dist/itinerary/get-journeys-details.dto";

import { ItineraryService } from "@/itinerary/itinerary.service";

@Controller("itinerary")
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Post("/generate")
  generateItinerary(@Body() generateItineraryDto: GenerateItineraryDto) {
    return this.itineraryService.generateItinerary(generateItineraryDto);
  }

  @Post("/journey")
  getJourneysDetails(@Body() getJourneysDetailsDtos: GetJourneysDetailsDto) {
    return this.itineraryService.getJourneysDetails(
      getJourneysDetailsDtos.journeys,
    );
  }
}
