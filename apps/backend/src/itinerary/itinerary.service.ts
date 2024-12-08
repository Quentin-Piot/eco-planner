import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GenerateItineraryDto } from "@quentinpiot/dtos";
import { GoogleApiService } from "@/external-api/google/google-api.service";
import { MistralApiService } from "@/external-api/mistral/mistral-api.service";
import { Journey } from "@quentinpiot/dtos/dist/itinerary/get-journeys-details.dto";

@Injectable()
export class ItineraryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly googleApiService: GoogleApiService,
    private readonly mistralApiService: MistralApiService,
  ) {
  }


  generateItinerary(generateItineraryDto: GenerateItineraryDto) {

    return this.mistralApiService.generateItinerary(generateItineraryDto);
  }

  getJourneysDetails(journeys:Journey[]) {
    return this.googleApiService.getJourneysDetails(journeys)
  }
}
