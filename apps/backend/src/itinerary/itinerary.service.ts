import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";

import { GoogleApiService } from "@/external-api/google/google-api.service";
import { MistralApiService } from "@/external-api/mistral/mistral-api.service";
import { GenerateItineraryDto } from "@/itinerary/dtos/generate-itinerary.dto";
import { Journey } from "@/itinerary/dtos/get-journeys-details.dto";

@Injectable()
export class ItineraryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly googleApiService: GoogleApiService,
    private readonly mistralApiService: MistralApiService,
  ) {}

  generateItinerary(generateItineraryDto: GenerateItineraryDto) {
    return this.mistralApiService.generateItinerary(generateItineraryDto);
  }

  getJourneysDetails(journeys: Journey[]) {
    return this.googleApiService.getJourneysDetails(journeys);
  }
}
