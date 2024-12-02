import { Body, Controller, Post } from "@nestjs/common";
import { ItineraryService } from "@/itinerary/itinerary.service";
import { GenerateItineraryDto } from "@quentinpiot/dtos";

@Controller("itinerary")
export class ItineraryController {

  constructor(private readonly itineraryService: ItineraryService) {
  }

  @Post('/generate')
  generateItinerary(@Body() generateItineraryDto: GenerateItineraryDto) {
    return this.itineraryService.generateItinerary(generateItineraryDto)
  }

}
