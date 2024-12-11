import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { ExternalApiModule } from "@/external-api/external-api.module";

import { ItineraryController } from "./itinerary.controller";
import { ItineraryService } from "./itinerary.service";

@Module({
  imports: [CqrsModule, ExternalApiModule],
  controllers: [ItineraryController],
  providers: [ItineraryService],
})
export class ItineraryModule {}
