import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GenerateItineraryDto } from "@quentinpiot/dtos";

@Injectable()
export class ItineraryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }


  generateItinerary(generateItineraryDto: GenerateItineraryDto) {

    return generateItineraryDto
  }
}
